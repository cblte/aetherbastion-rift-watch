// =====================================================================
//  Tick-Kampf: jeder Trupp kämpft unabhängig in seiner Riss-Zone
// =====================================================================
import { GAME, ZONES, COMBAT, ROLES, F, HERO_BY_ID, TENT_SIZE } from './config.js';
import {
  getHero, heroStats, regenMs, lootMult, kitchenMult, gainExp, addLog, isZoneAvailable, squadOf,
} from './state.js';

// ---------- Hilfen ---------------------------------------------------
export function squadMembers(state, squad) {
  return squad.slots.map(uid => (uid != null ? getHero(state, uid) : null)).filter(Boolean);
}

export function frontOrder(state, squad, heroes) {
  return [...heroes].sort((a, b) =>
    ROLES[HERO_BY_ID[a.heroId].role].order - ROLES[HERO_BY_ID[b.heroId].role].order ||
    squad.slots.indexOf(a.uid) - squad.slots.indexOf(b.uid));
}

export function monsterTemplate(zoneId, wave) {
  const zone = ZONES[zoneId - 1];
  const boss = wave > COMBAT.WAVES_PER_ZONE;
  const d = F.difficulty(zoneId, Math.min(wave, COMBAT.WAVES_PER_ZONE));
  const mob = boss ? zone.boss : zone.mobs[(wave - 1) % zone.mobs.length];
  return {
    name: mob.name, sprite: mob.sprite, boss, d,
    maxHp: F.monsterHp(d) * (boss ? COMBAT.BOSS_HP_MULT : 1),
    atk: F.monsterAtk(d) * (boss ? COMBAT.BOSS_ATK_MULT : 1),
  };
}

export function spawnMonster(state, squad) {
  const t = monsterTemplate(squad.zone, squad.wave);
  squad.monster = { ...t, id: state.monsterSeq++, hp: t.maxHp };
}

// Erwartungswerte eines Trupps – genutzt vom Offline-Modul und für Anzeigen
export function teamProfile(state, heroes) {
  let might = 0, eile = 0;
  for (const h of heroes) {
    const d = HERO_BY_ID[h.heroId];
    if (d.role === 'support') d.buff === 'eile' ? (eile += COMBAT.EILE_BONUS) : (might += COMBAT.MIGHT_BONUS);
  }
  const atkMult = 1 + might, tempo = 1 + eile;
  let dps = 0, heal = 0, hpPool = 0;
  for (const h of heroes) {
    const st = heroStats(state, h);
    hpPool += st.maxHp;
    const a = st.atk * atkMult;
    if (st.def.role === 'healer') {
      heal += a * COMBAT.HEAL_MULT;
      dps += a * COMBAT.HEALER_ATK_FACTOR * tempo;
    } else {
      const f = st.def.role === 'support' ? COMBAT.SUPPORT_ATK_FACTOR : 1;
      dps += a * f * (1 + st.crit * (COMBAT.CRIT_MULT - 1)) * tempo;
    }
  }
  return { dps, heal, hpPool, atkMult, tempo, might, eile };
}

// ---------- Belohnungen & Wellenfortschritt (live + offline) --------
// factor: Anteil der Belohnung (Offline-Effizienz). deterministic: Scherben als Erwartungswert.
export function applyKillRewards(state, squadIdx, tmpl, heroes, factor = 1, deterministic = false) {
  const sq = state.squads[squadIdx];
  const loot = lootMult(state);
  const gold = F.goldPerKill(tmpl.d) * (tmpl.boss ? COMBAT.BOSS_GOLD_MULT : 1) * loot * factor;
  const exp = F.expPerKill(tmpl.d) * (tmpl.boss ? COMBAT.BOSS_EXP_MULT : 1) * kitchenMult(state) * factor;
  let shards = 0;
  const bossShards = tmpl.boss ? sq.zone * COMBAT.BOSS_SHARDS_PER_ZONE : 0;
  if (deterministic) {
    state.shardFrac += (COMBAT.SHARD_CHANCE * loot + bossShards) * factor;
    shards = Math.floor(state.shardFrac);
    state.shardFrac -= shards;
  } else {
    if (Math.random() < COMBAT.SHARD_CHANCE * loot) shards += 1;
    shards += bossShards;
  }
  state.gold += gold;
  state.shards += shards;
  state.stats.kills += 1;
  const levelUps = [];
  for (const h of heroes) {
    const from = h.level;
    if (gainExp(state, h, exp) > 0) levelUps.push({ uid: h.uid, from, to: h.level });
  }
  return { gold, exp, shards, levelUps };
}

// Rückgabe: true, wenn ein Boss besiegt wurde
export function advanceWave(state, squadIdx, wasBoss) {
  const sq = state.squads[squadIdx];
  if (wasBoss) {
    const first = !state.zonesCleared[sq.zone];
    state.zonesCleared[sq.zone] = true;
    state.stats.bosses += 1;
    sq.wave = 1;
    return first;
  }
  sq.wave += 1;
  return false;
}

// ---------- Tick ----------------------------------------------------
export function tick(state) {
  state.lastTickMs += GAME.TICK_MS;
  const now = state.lastTickMs;
  const ev = { hits: [], levelUps: [], kills: [] };

  for (const h of state.heroes) {
    const inSquad = squadOf(state, h.uid) !== -1;
    if (h.woundedUntil && now >= h.woundedUntil) {
      h.woundedUntil = 0;
      h.hp = heroStats(state, h).maxHp;
    } else if (!inSquad && !h.woundedUntil) {
      h.hp = heroStats(state, h).maxHp; // Reserve erholt sich im Lager
    }
  }
  for (let i = 0; i < state.squads.length; i++) tickSquad(state, i, now, ev);
  return ev;
}

function tickSquad(state, i, now, ev) {
  const sq = state.squads[i];
  if (i >= state.tentsUnlocked || state.buildings.portal < 1 || state.onboarding < 5) {
    sq.status = 'idle'; return;
  }
  const members = squadMembers(state, sq);
  if (!members.length) { sq.status = 'idle'; sq.monster = null; return; }

  if (sq.status === 'retreat') {
    if (members.some(h => h.woundedUntil)) return;
    sq.status = 'fighting';
    spawnMonster(state, sq);
    addLog(state, 'Der Trupp kehrt in den Riss zurück.', i, 'info');
  }
  if (sq.status !== 'fighting') sq.status = 'fighting';
  if (!sq.monster) spawnMonster(state, sq);

  const alive = members.filter(h => !h.woundedUntil);
  if (!alive.length) { startRetreat(state, i); return; }

  const mon = sq.monster;
  const prof = teamProfile(state, alive);

  // Helden handeln
  let dmg = 0, crit = false;
  for (const h of alive) {
    const st = heroStats(state, h);
    const a = st.atk * prof.atkMult;
    if (st.def.role === 'healer') {
      const target = alive
        .map(x => ({ x, max: heroStats(state, x).maxHp }))
        .filter(o => o.x.hp < o.max)
        .sort((p, q) => p.x.hp / p.max - q.x.hp / q.max)[0];
      if (target) target.x.hp = Math.min(target.max, target.x.hp + a * COMBAT.HEAL_MULT);
      dmg += a * COMBAT.HEALER_ATK_FACTOR;
    } else {
      const f = st.def.role === 'support' ? COMBAT.SUPPORT_ATK_FACTOR : 1;
      const hits = 1 + (Math.random() < prof.tempo - 1 ? 1 : 0);
      for (let k = 0; k < hits; k++) {
        let x = a * f;
        if (Math.random() < st.crit) { x *= COMBAT.CRIT_MULT; crit = true; }
        dmg += x;
      }
    }
  }
  mon.hp -= dmg;
  ev.hits.push({ squad: i, dmg, crit });

  if (mon.hp <= 0) {
    const r = applyKillRewards(state, i, mon, alive, 1, false);
    const firstClear = advanceWave(state, i, mon.boss);
    ev.kills.push({ squad: i, boss: mon.boss });
    const zoneName = ZONES[sq.zone - 1].name;
    if (mon.boss) {
      addLog(state, `👑 ${mon.name} besiegt! +${fmt(r.gold)}🪙 +${r.shards}🔮`, i, 'boss');
      if (firstClear) addLog(state, `${zoneName} ist befreit – die nächste Region kann geöffnet werden.`, i, 'boss');
    } else {
      addLog(state, `${mon.name} besiegt · +${fmt(r.gold)}🪙${r.shards ? ` +${r.shards}🔮` : ''}`, i);
    }
    for (const lu of r.levelUps) {
      const h = getHero(state, lu.uid);
      addLog(state, `⬆️ ${HERO_BY_ID[h.heroId].name} erreicht Lv. ${lu.to}`, i, 'level');
      ev.levelUps.push(lu);
    }
    for (const h of alive) {
      const max = heroStats(state, h).maxHp;
      h.hp = Math.min(max, h.hp + max * COMBAT.WAVE_HEAL);
    }
    spawnMonster(state, sq);
    return;
  }

  // Monster greift den vordersten lebenden Helden an
  const target = frontOrder(state, sq, alive)[0];
  target.hp -= mon.atk;
  if (target.hp <= 0) {
    target.hp = 0;
    target.woundedUntil = now + regenMs(state);
    addLog(state, `💢 ${HERO_BY_ID[target.heroId].name} ist verwundet.`, i, 'bad');
    if (members.every(h => h.woundedUntil)) startRetreat(state, i);
  }
}

function startRetreat(state, i) {
  const sq = state.squads[i];
  sq.status = 'retreat';
  sq.wave = 1;
  sq.monster = null;
  addLog(state, '🏕️ Alle Helden gefallen – Rückzug ins Lager, Welle zurückgesetzt.', i, 'bad');
}

// ---------- Aktionen ------------------------------------------------
export function setZone(state, i, zone) {
  const sq = state.squads[i];
  if (!isZoneAvailable(state, zone) || sq.zone === zone) return false;
  sq.zone = zone;
  sq.wave = 1;
  sq.monster = null;
  if (sq.status === 'fighting') spawnMonster(state, sq);
  addLog(state, `Trupp zieht nach ${ZONES[zone - 1].name}.`, i, 'info');
  return true;
}

export function reviveHero(state, uid) {
  const h = getHero(state, uid);
  if (!h || !h.woundedUntil) return false;
  const cost = F.reviveCost(h.level);
  if (state.gold < cost) return false;
  state.gold -= cost;
  h.woundedUntil = 0;
  h.hp = heroStats(state, h).maxHp;
  return true;
}

// uid = null → Platz leeren. Verwundete können nicht getauscht werden.
export function assignHero(state, squadIdx, slot, uid) {
  if (squadIdx >= state.tentsUnlocked || slot < 0 || slot >= TENT_SIZE) return false;
  const sq = state.squads[squadIdx];
  const current = sq.slots[slot] != null ? getHero(state, sq.slots[slot]) : null;
  if (current && current.woundedUntil) return false;
  if (uid != null) {
    const h = getHero(state, uid);
    if (!h || h.woundedUntil) return false;
    const from = squadOf(state, uid);
    if (from !== -1) state.squads[from].slots[state.squads[from].slots.indexOf(uid)] = null;
  }
  sq.slots[slot] = uid;
  if (!sq.slots.some(u => u != null)) { sq.status = 'idle'; sq.monster = null; }
  return true;
}

export const fmt = (n) => {
  n = Math.floor(n);
  if (n < 10_000) return String(n);
  const units = ['', 'k', 'M', 'Mrd', 'Bio'];
  let u = 0;
  while (n >= 1000 && u < units.length - 1) { n /= 1000; u++; }
  return (n < 100 ? n.toFixed(1) : Math.floor(n)).toString().replace('.', ',') + units[u];
};
