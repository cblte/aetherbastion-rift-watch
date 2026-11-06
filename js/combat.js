// =====================================================================
//  Tick-Kampf: jeder Trupp kämpft unabhängig in seiner Riss-Zone.
//  Ein Trupp farmt die Schergen einer Stufe. Den Boss der Stufe fordert
//  der Spieler selbst heraus; ein Sieg schaltet die nächste Stufe frei.
// =====================================================================
import { GAME, ZONES, COMBAT, ROLES, F, HERO_BY_ID, TENT_SIZE, CYCLE_MS, RATIONS, NORMAL_STAGES } from './config.js';
import {
  getHero, heroStats, regenMs, goldMult, shardMult, kitchenMult, healMult, tempoBonus, gainExp, addLog,
  isStageAvailable, squadOf, stageBeaten, payCycle,
} from './state.js';
import { checkConstruction, checkShop, checkRecruits, dropWeapons } from './progress.js';

// ---------- Hilfen ---------------------------------------------------
export function squadMembers(state, squad) {
  return squad.slots.map(uid => (uid != null ? getHero(state, uid) : null)).filter(Boolean);
}

export function frontOrder(state, squad, heroes) {
  return [...heroes].sort((a, b) =>
    ROLES[HERO_BY_ID[a.heroId].role].order - ROLES[HERO_BY_ID[b.heroId].role].order ||
    squad.slots.indexOf(a.uid) - squad.slots.indexOf(b.uid));
}

export const stageOf = (zoneId, stage) => ZONES[zoneId - 1].stages[stage - 1];

// variant: wechselt zwischen den beiden Schergen-Typen
export function monsterTemplate(zoneId, stage, boss = false, variant = 0) {
  const st = stageOf(zoneId, stage);
  const d = st.d + (boss ? COMBAT.BOSS_DIFF_BONUS : 0);
  const mob = boss ? st.boss : st.minions[variant % st.minions.length];
  return {
    name: mob.name, sprite: mob.sprite, boss, d,
    maxHp: F.monsterHp(d) * (boss ? COMBAT.BOSS_HP_MULT : 1),
    atk: F.monsterAtk(d) * (boss ? COMBAT.BOSS_ATK_MULT : 1),
  };
}

export function spawnMonster(state, squad) {
  const seq = state.monsterSeq++;
  const t = monsterTemplate(squad.zone, squad.stage, squad.mode === 'boss', seq);
  squad.monster = { ...t, id: seq, hp: t.maxHp };
}

// Erwartungswerte eines Trupps – genutzt vom Offline-Modul und für Anzeigen
export function teamProfile(state, heroes, squad = null) {
  let might = 0, eile = tempoBonus(state);
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
      heal += a * COMBAT.HEAL_MULT * healMult(state);
      dps += a * COMBAT.HEALER_ATK_FACTOR * tempo;
    } else {
      const f = st.def.role === 'support' ? COMBAT.SUPPORT_ATK_FACTOR : 1;
      dps += a * f * (1 + st.crit * (st.critMult - 1)) * tempo;
    }
  }
  const front = squad && heroes.length ? frontOrder(state, squad, heroes)[0] : heroes[0];
  const frontDef = front ? heroStats(state, front).defense : 0;
  return { dps, heal, hpPool, atkMult, tempo, might, eile, frontDef };
}

// ---------- Belohnungen (live + offline) -----------------------------
// factor: Anteil der Belohnung (Offline-Effizienz). deterministic: Scherben als Erwartungswert.
export function applyKillRewards(state, squadIdx, tmpl, heroes, factor = 1, deterministic = false) {
  const sq = state.squads[squadIdx];
  const gold = F.goldPerKill(tmpl.d) * (tmpl.boss ? COMBAT.BOSS_GOLD_MULT : 1) * goldMult(state) * factor;
  const exp = F.expPerKill(tmpl.d) * (tmpl.boss ? COMBAT.BOSS_EXP_MULT : 1) * kitchenMult(state) * factor;
  const chance = COMBAT.SHARD_CHANCE * shardMult(state);
  const st = stageOf(sq.zone, sq.stage);
  const zone = ZONES[sq.zone - 1];
  const bossShards = tmpl.boss ? zone.tier * COMBAT.BOSS_SHARDS_PER_ZONE * (st.hard ? 3 : 1) : 0;
  let shards = 0;
  if (deterministic) {
    state.shardFrac += (chance + bossShards) * factor;
    shards = Math.floor(state.shardFrac);
    state.shardFrac -= shards;
  } else {
    if (Math.random() < chance) shards += 1;
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
  // Stufen-Belohnung des Bosses (aus den CQHT-Daten)
  let rp = 0, weapons = [], rations = 0;
  if (tmpl.boss) {
    const r = st.rewards;
    rp = r.rp[0] + Math.floor(Math.random() * (r.rp[1] - r.rp[0] + 1));
    state.rp += rp;
    weapons = dropWeapons(state, zone.tier, !!st.hard, r.weapons);
    const g = Math.min(RATIONS.length, st.hard ? 6 : zone.tier + (zone.part === 2 ? 1 : 0)) - 1;
    rations = r.rations;
    state.rations[g] += rations;
    state.tickets += r.tickets[0] + Math.floor(Math.random() * (r.tickets[1] - r.tickets[0] + 1));
  }
  return { gold, exp, shards, levelUps, rp, weapons, rations };
}

// Boss besiegt → Fortschritt speichern. Rückgabe: true beim ersten Sieg
export function recordBossWin(state, squadIdx) {
  const sq = state.squads[squadIdx];
  state.stats.bosses += 1;
  const first = !stageBeaten(state, sq.zone, sq.stage);
  if (first) state.progress[sq.zone] = sq.stage;
  sq.mode = 'farm';
  sq.bossTicks = 0;
  return first;
}

// ---------- Tick ----------------------------------------------------
export function tick(state) {
  state.lastTickMs += GAME.TICK_MS;
  const now = state.lastTickMs;
  const ev = { hits: [], levelUps: [], kills: [], bossWins: [], built: null, cycle: null };

  ev.built = checkConstruction(state, now);
  checkShop(state, now);
  checkRecruits(state, now);
  if (now >= state.nextCycleMs) {
    ev.cycle = payCycle(state);
    state.nextCycleMs += CYCLE_MS;
    addLog(state, `💰 Gildenkasse: +${fmt(ev.cycle.gold)}🪙${ev.cycle.rp ? ` +${ev.cycle.rp}🧪` : ''}`, null, 'info');
  }

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
  if (!members.length) { sq.status = 'idle'; sq.monster = null; sq.mode = 'farm'; return; }

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

  // Zeitlimit für Boss-Herausforderungen
  if (mon.boss) {
    sq.bossTicks += 1;
    if (sq.bossTicks > COMBAT.BOSS_TIME_LIMIT) {
      addLog(state, `⌛ ${mon.name} hält stand – Zeit abgelaufen. Zurück zu den Schergen.`, i, 'bad');
      sq.mode = 'farm'; sq.bossTicks = 0;
      spawnMonster(state, sq);
      return;
    }
  }

  const prof = teamProfile(state, alive, sq);

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
      if (target) target.x.hp = Math.min(target.max, target.x.hp + a * COMBAT.HEAL_MULT * healMult(state));
      dmg += a * COMBAT.HEALER_ATK_FACTOR;
    } else {
      const f = st.def.role === 'support' ? COMBAT.SUPPORT_ATK_FACTOR : 1;
      const extra = prof.tempo - 1;
      const hits = 1 + Math.floor(extra) + (Math.random() < extra % 1 ? 1 : 0);
      for (let k = 0; k < hits; k++) {
        let x = a * f;
        if (Math.random() < st.crit) { x *= st.critMult; crit = true; }
        dmg += x;
      }
    }
  }
  mon.hp -= dmg;
  ev.hits.push({ squad: i, dmg, crit });

  if (mon.hp <= 0) {
    const r = applyKillRewards(state, i, mon, alive, 1, false);
    ev.kills.push({ squad: i, boss: mon.boss });
    if (mon.boss) {
      const first = recordBossWin(state, i);
      ev.bossWins.push({ squad: i, first, zone: sq.zone, stage: sq.stage });
      addLog(state, `👑 ${mon.name} besiegt! +${fmt(r.gold)}🪙 +${r.shards}🔮 +${r.rp}🧪${r.weapons.length ? ` · ⚒️ ${r.weapons.map(w => w.name).join(', ')}` : ''}`, i, 'boss');
      if (first) {
        const zone = ZONES[sq.zone - 1];
        addLog(state, sq.stage === NORMAL_STAGES
          ? `🏆 ${zone.name} ist befreit – die nächste Region kann geöffnet werden.`
          : sq.stage < zone.stages.length ? `🔓 ${zone.name} Stufe ${sq.stage + 1} ist freigeschaltet.` : `🏆 ${zone.name}: alle Stufen gemeistert!`, i, 'boss');
      }
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
      h.hp = Math.min(max, h.hp + max * COMBAT.KILL_HEAL);
    }
    spawnMonster(state, sq);
    return;
  }

  // Monster greift den vordersten lebenden Helden an
  const target = frontOrder(state, sq, alive)[0];
  target.hp -= mon.atk * (1 - heroStats(state, target).defense);
  if (target.hp <= 0) {
    target.hp = 0;
    target.woundedUntil = now + regenMs(state);
    addLog(state, `💢 ${HERO_BY_ID[target.heroId].name} ist verwundet.`, i, 'bad');
    if (members.every(h => h.woundedUntil)) startRetreat(state, i);
  }
}

function startRetreat(state, i) {
  const sq = state.squads[i];
  const wasBoss = sq.mode === 'boss';
  sq.status = 'retreat';
  sq.mode = 'farm';
  sq.bossTicks = 0;
  sq.monster = null;
  addLog(state, wasBoss
    ? '🏕️ Der Boss war zu stark – Rückzug ins Lager.'
    : '🏕️ Alle Helden gefallen – Rückzug ins Lager.', i, 'bad');
}

// ---------- Aktionen ------------------------------------------------
export function setStage(state, i, zone, stage) {
  const sq = state.squads[i];
  if (!isStageAvailable(state, zone, stage)) return false;
  if (sq.zone === zone && sq.stage === stage) return false;
  sq.zone = zone;
  sq.stage = stage;
  sq.mode = 'farm';
  sq.bossTicks = 0;
  sq.monster = null;
  if (sq.status === 'fighting') spawnMonster(state, sq);
  addLog(state, `Trupp zieht nach ${ZONES[zone - 1].name}, Stufe ${stage}.`, i, 'info');
  return true;
}

export const bossCost = (state, i) => stageOf(state.squads[i].zone, state.squads[i].stage).cost;

export function canChallengeBoss(state, i) {
  const sq = state.squads[i];
  return i < state.tentsUnlocked && sq.status === 'fighting' && sq.mode === 'farm'
    && squadMembers(state, sq).some(h => !h.woundedUntil);
}

// Kostet Gold (CQHT „cost“)
export function challengeBoss(state, i) {
  if (!canChallengeBoss(state, i)) return false;
  const cost = bossCost(state, i);
  if (state.gold < cost) return 'gold';
  state.gold -= cost;
  const sq = state.squads[i];
  sq.mode = 'boss';
  sq.bossTicks = 0;
  spawnMonster(state, sq);
  addLog(state, `👑 Herausforderung: ${sq.monster.name}!`, i, 'boss');
  return true;
}

export function abortBoss(state, i) {
  const sq = state.squads[i];
  if (sq.mode !== 'boss') return false;
  sq.mode = 'farm';
  sq.bossTicks = 0;
  spawnMonster(state, sq);
  addLog(state, 'Herausforderung abgebrochen.', i, 'info');
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
  if (!sq.slots.some(u => u != null)) { sq.status = 'idle'; sq.monster = null; sq.mode = 'farm'; }
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
