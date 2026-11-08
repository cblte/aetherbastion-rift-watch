// =====================================================================
//  Kampf: jeder Trupp kämpft unabhängig in seiner Riss-Zone.
//  Ein Trupp farmt die Schergen einer Stufe. Den Boss der Stufe fordert
//  der Spieler selbst heraus; ein Sieg schaltet die nächste Stufe frei.
//  Ein Tick (GAME.TICK_MS, 10×/s) lässt nur Zeit laufen. Jeder Kämpfer hat
//  einen Angriffs-Timer und greift erst nach seinem Intervall an (#061).
//  Gegner wählen ihr Ziel nach Angriffsart, Platz 1 ist der Anführer (#051).
// =====================================================================
import { GAME, ZONES, COMBAT, ROLES, F, HERO_BY_ID, TENT_SIZE, CYCLE_MS, RATIONS, RATION_DROP, NORMAL_STAGES } from './config.js';
import {
  getHero, heroStats, regenMs, goldMult, shardMult, kitchenMult, healMult, tempoBonus, gainExp, addLog,
  isStageAvailable, squadOf, stageBeaten, payCycle, addRations, squadTrait,
} from './state.js';
import { checkConstruction, checkShop, checkRecruits, dropWeapons } from './progress.js';

// ---------- Hilfen ---------------------------------------------------
export function squadMembers(state, squad) {
  return squad.slots.map(uid => (uid != null ? getHero(state, uid) : null)).filter(Boolean);
}

// Helden in Zelt-Reihenfolge: Platz 1 = Anführer (fällt er, ist der Nächste vorn)
export function slotOrder(squad, heroes) {
  return [...heroes].sort((a, b) => squad.slots.indexOf(a.uid) - squad.slots.indexOf(b.uid));
}
export const leaderOf = (squad, heroes) => slotOrder(squad, heroes)[0] || null;

// Erwarteter Anteil jedes Helden an einem Gegner-Treffer (#051), Summe = Gesamtschaden ÷ Treffer:
//   melee: Anführer COMBAT.LEADER_SHARE, Rest nach ROLES[…].aggro · ranged: nach aggro (live: ein Ziel)
//   magic: alle gleich, zusammen COMBAT.AREA_TOTAL
export function hitShares(squad, heroes, attack = 'melee') {
  const list = slotOrder(squad, heroes);
  const n = list.length;
  if (!n) return [];
  if (attack === 'magic') return list.map(hero => ({ hero, share: COMBAT.AREA_TOTAL / n }));
  if (n === 1) return [{ hero: list[0], share: 1 }];
  const w = (h) => ROLES[HERO_BY_ID[h.heroId].role].aggro;
  if (attack === 'ranged') {
    const sum = list.reduce((a, h) => a + w(h), 0) || 1;
    return list.map(hero => ({ hero, share: w(hero) / sum }));
  }
  const rest = list.slice(1);
  const sum = rest.reduce((a, h) => a + w(h), 0) || 1;
  return [{ hero: list[0], share: COMBAT.LEADER_SHARE },
    ...rest.map(hero => ({ hero, share: (1 - COMBAT.LEADER_SHARE) * w(hero) / sum }))];
}

const DT = GAME.TICK_MS / 1000; // Sekunden je Tick

export const stageOf = (zoneId, stage) => ZONES[zoneId - 1].stages[stage - 1];

// variant: wechselt zwischen den beiden Schergen-Typen.
// atk = Schaden je Treffer (= Schaden/s × Intervall), dps = Schaden pro Sekunde, aoe = Boss-Flächenangriff je Held
export function monsterTemplate(zoneId, stage, boss = false, variant = 0) {
  const st = stageOf(zoneId, stage);
  const d = st.d + (boss ? COMBAT.BOSS_DIFF_BONUS : 0);
  const mob = boss ? st.boss : st.minions[variant % st.minions.length];
  const interval = boss ? COMBAT.BOSS_INTERVAL : COMBAT.MINION_INTERVAL;
  const dps = F.monsterAtk(d) * (boss ? COMBAT.BOSS_ATK_MULT : 1);
  return {
    name: mob.name, sprite: mob.sprite, boss, d, attack: mob.attack || 'melee', interval,
    maxHp: F.monsterHp(d) * (boss ? COMBAT.BOSS_HP_MULT : 1),
    dps, atk: dps * interval,
    aoe: boss ? dps * COMBAT.BOSS_AOE_FACTOR : 0,
  };
}

// t = Angriffs-Timer, aoeT = Timer des Boss-Flächenangriffs, ready = Sekunden, bis der Gegner da ist
export function spawnMonster(state, squad, delay = COMBAT.SPAWN_DELAY) {
  const seq = state.monsterSeq++;
  const t = monsterTemplate(squad.zone, squad.stage, squad.mode === 'boss', seq);
  squad.monster = { ...t, id: seq, hp: t.maxHp, t: 0, aoeT: 0, ready: delay };
}

// Erwartungswerte eines Trupps – genutzt vom Offline-Modul und für Anzeigen
// attack: Angriffsart des Gegners (für teamDef/dmgFactor). Schaden/s eines Helden = ATK × (Tempo + eigenes Tempo),
// weil Treffer = ATK × Klassen-Intervall und Intervall ÷ Tempo.
export function teamProfile(state, heroes, squad = null, attack = 'melee') {
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
      heal += a * COMBAT.HEAL_MULT * healMult(state) * st.heal;
      dps += a * COMBAT.HEALER_ATK_FACTOR;
    } else {
      const f = st.def.role === 'support' ? COMBAT.SUPPORT_ATK_FACTOR : 1;
      dps += a * f * (1 + st.crit * (st.critMult - 1)) * (tempo + st.speed);
    }
  }
  // DEF des Trupps, gewichtet wie der Gegner trifft; dmgFactor = Gesamtschaden je Treffer (Fläche ≠ 1)
  const shares = squad ? hitShares(squad, heroes, attack) : heroes.map(hero => ({ hero, share: 1 / heroes.length }));
  const dmgFactor = shares.reduce((a, o) => a + o.share, 0);
  const teamDef = dmgFactor ? shares.reduce((a, o) => a + o.share * heroStats(state, o.hero).defense, 0) / dmgFactor : 0;
  return { dps, heal, hpPool, atkMult, tempo, might, eile, teamDef, dmgFactor };
}

// Was ein einzelner Held pro Sekunde tut (ohne Trupp-Buffs) – für Anzeigen
// hit = Schaden pro Angriff · heal = Heilung pro Sekunde · canCrit = Krit möglich
export function heroOutput(state, hero) {
  const st = heroStats(state, hero);
  const role = st.def.role;
  if (role === 'healer') {
    return { hit: st.atk * COMBAT.HEALER_ATK_FACTOR, heal: st.atk * COMBAT.HEAL_MULT * healMult(state) * st.heal, canCrit: false };
  }
  const f = role === 'support' ? COMBAT.SUPPORT_ATK_FACTOR : 1;
  return { hit: st.atk * f, heal: 0, canCrit: true };
}

// ---------- Belohnungen (live + offline) -----------------------------
// factor: Anteil der Belohnung (Offline-Effizienz). deterministic: Scherben als Erwartungswert.
export function applyKillRewards(state, squadIdx, tmpl, heroes, factor = 1, deterministic = false) {
  const sq = state.squads[squadIdx];
  // Lager-Eigenschaften des Trupps (TRAIT_STATS squad: true)
  const gold = F.goldPerKill(tmpl.d) * (tmpl.boss ? COMBAT.BOSS_GOLD_MULT : 1) * goldMult(state) * (1 + squadTrait(heroes, 'gold')) * factor;
  const exp = F.expPerKill(tmpl.d) * (tmpl.boss ? COMBAT.BOSS_EXP_MULT : 1) * kitchenMult(state) * (1 + squadTrait(heroes, 'exp')) * factor;
  const chance = COMBAT.SHARD_CHANCE * shardMult(state) * (1 + squadTrait(heroes, 'shards'));
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
  let rp = 0, weapons = [], lostWeapons = 0, rations = 0;
  if (tmpl.boss) {
    const r = st.rewards;
    rp = r.rp[0] + Math.floor(Math.random() * (r.rp[1] - r.rp[0] + 1));
    state.rp += rp;
    const extra = Math.random() < squadTrait(heroes, 'loot') ? 1 : 0; // Eigenschaft „Beute“
    ({ got: weapons, lost: lostWeapons } = dropWeapons(state, zone.tier, st.legend ? 'legend' : st.hard ? 'hard' : 'normal', r.weapons + extra));
    const g = Math.min(RATIONS.length, st.hard ? 6 : zone.tier + (zone.part === 2 ? 1 : 0)) - 1;
    // erster Sieg: volle Menge; danach nur mit RATION_DROP.chance 1–2 Stück (#045)
    let n = 0;
    if (!stageBeaten(state, sq.zone, sq.stage)) n = r.rations;
    else if (Math.random() < RATION_DROP.chance) {
      const [lo, hi] = RATION_DROP.amount;
      n = lo + Math.floor(Math.random() * (hi - lo + 1));
    }
    rations = addRations(state, g, n);
    state.tickets += r.tickets[0] + Math.floor(Math.random() * (r.tickets[1] - r.tickets[0] + 1));
  }
  return { gold, exp, shards, levelUps, rp, weapons, lostWeapons, rations };
}

// Herausforderung beendet (Sieg, Zeit abgelaufen, Rückzug, Abbruch) → zurück zu den Schergen, Abklingzeit startet.
// Bei einer Niederlage oder einem Abbruch wird das automatische Wiederholen ausgeschaltet.
function endBoss(state, i, failed) {
  const sq = state.squads[i];
  sq.mode = 'farm';
  sq.bossTime = 0;
  sq.bossReadyAt = state.lastTickMs + COMBAT.BOSS_COOLDOWN * 1000;
  if (failed && sq.autoBoss) {
    sq.autoBoss = false;
    addLog(state, '🔁 Automatische Herausforderung gestoppt.', i, 'info');
  }
}

// Boss besiegt → Fortschritt speichern. Rückgabe: true beim ersten Sieg
export function recordBossWin(state, squadIdx) {
  const sq = state.squads[squadIdx];
  state.stats.bosses += 1;
  const first = !stageBeaten(state, sq.zone, sq.stage);
  if (first) state.progress[sq.zone] = sq.stage;
  endBoss(state, squadIdx, false);
  return first;
}

// ---------- Tick ----------------------------------------------------
export function tick(state) {
  state.lastTickMs += GAME.TICK_MS;
  const now = state.lastTickMs;
  const ev = { hits: [], struck: [], levelUps: [], kills: [], bossWins: [], built: null, cycle: null };

  ev.built = checkConstruction(state, now);
  checkShop(state, now);
  checkRecruits(state, now);
  if (now >= state.nextCycleMs) {
    ev.cycle = payCycle(state);
    state.nextCycleMs += CYCLE_MS;
    addLog(state, `💰 Gildenkasse: +${fmt(ev.cycle.gold)}🟡`, null, 'info');
  }

  // Verwundung/Lager-Erholung reicht einmal pro Sekunde
  const newSecond = Math.floor(now / 1000) !== Math.floor((now - GAME.TICK_MS) / 1000);
  for (const h of newSecond ? state.heroes : []) {
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
    if (members.every(h => h.woundedUntil)) return; // zurück, sobald ein Held wieder fit ist
    sq.status = 'fighting';
    spawnMonster(state, sq);
    addLog(state, 'Der Trupp kehrt in den Riss zurück.', i, 'info');
  }
  if (sq.status !== 'fighting') sq.status = 'fighting';
  if (!sq.monster) spawnMonster(state, sq);

  const alive = members.filter(h => !h.woundedUntil);
  if (!alive.length) { startRetreat(state, i); return; }

  // Automatisch erneut herausfordern, sobald die Pause vorbei ist und das Gold reicht
  if (sq.autoBoss && sq.mode === 'farm' && canChallengeBoss(state, i) && state.gold >= bossCost(state, i)) {
    challengeBoss(state, i);
  }

  const mon = sq.monster;

  // Zeitlimit für Boss-Herausforderungen
  if (mon.boss) {
    sq.bossTime = (sq.bossTime || 0) + DT;
    if (sq.bossTime > COMBAT.BOSS_TIME_LIMIT) {
      addLog(state, `⌛ ${mon.name} hält stand – Zeit abgelaufen. Zurück zu den Schergen.`, i, 'bad');
      endBoss(state, i, true);
      spawnMonster(state, sq);
      return;
    }
  }

  const timers = sq.heroT || (sq.heroT = {});
  const prof = teamProfile(state, alive, sq, mon.attack);
  const order = slotOrder(sq, alive);
  const stats = new Map(order.map(h => [h.uid, heroStats(state, h)]));
  // Intervall je Held: Klasse ÷ Tempo (Eile, Forschung, Eigenschaft). Heiler im Takt ihrer Klasse.
  const interval = (st) => st.def.role === 'healer' ? st.interval : st.interval / (prof.tempo + st.speed);

  // Gegner taucht gerade auf: Helden laden nur bis zum nächsten Angriff auf
  if (mon.ready > 0) {
    mon.ready -= DT;
    for (const h of order) timers[h.uid] = Math.min(interval(stats.get(h.uid)), (timers[h.uid] || 0) + DT);
    return;
  }

  // Helden handeln, sobald ihr Timer abgelaufen ist (Rest bleibt, damit krumme Intervalle stimmen)
  let dmg = 0, crit = false;
  for (const h of order) {
    const st = stats.get(h.uid);
    const iv = interval(st);
    let t = (timers[h.uid] || 0) + DT;
    while (t >= iv && mon.hp - dmg > 0) {
      t -= iv;
      const a = st.atk * prof.atkMult;
      if (st.def.role === 'healer') {
        const target = order
          .map(x => ({ x, max: stats.get(x.uid).maxHp }))
          .filter(o => o.x.hp < o.max)
          .sort((p, q) => p.x.hp / p.max - q.x.hp / q.max)[0];
        if (target) target.x.hp = Math.min(target.max, target.x.hp + a * COMBAT.HEAL_MULT * healMult(state) * st.heal * st.interval);
        dmg += a * COMBAT.HEALER_ATK_FACTOR * st.interval;
      } else {
        const f = st.def.role === 'support' ? COMBAT.SUPPORT_ATK_FACTOR : 1;
        let x = a * f * st.interval;
        if (Math.random() < st.crit) { x *= st.critMult; crit = true; }
        dmg += x;
      }
    }
    timers[h.uid] = Math.min(t, iv);
  }
  if (dmg > 0) {
    mon.hp -= dmg;
    ev.hits.push({ squad: i, dmg, crit });
  }

  if (mon.hp <= 0) {
    const r = applyKillRewards(state, i, mon, alive, 1, false);
    ev.kills.push({ squad: i, boss: mon.boss });
    if (mon.boss) {
      const first = recordBossWin(state, i);
      ev.bossWins.push({ squad: i, first, zone: sq.zone, stage: sq.stage });
      addLog(state, `👑 ${mon.name} besiegt! +${fmt(r.gold)}🟡 +${r.shards}🔮 +${r.rp}📜${r.weapons.length ? ` · ⚒️ ${r.weapons.map(w => w.name).join(', ')}` : ''}`, i, 'boss');
      if (r.lostWeapons) addLog(state, `🗄️ Waffenkammer voll – ${r.lostWeapons === 1 ? 'eine Waffe bleibt' : `${r.lostWeapons} Waffen bleiben`} liegen. Räum im 🎒 Inventar auf.`, i, 'bad');
      if (first) {
        const zone = ZONES[sq.zone - 1];
        addLog(state, sq.stage === NORMAL_STAGES
          ? `🏆 ${zone.name} ist befreit – die nächste Region kann geöffnet werden.`
          : sq.stage < zone.stages.length ? `🔓 ${zone.name} Stufe ${sq.stage + 1} ist freigeschaltet.` : `🏆 ${zone.name}: alle Stufen gemeistert!`, i, 'boss');
      }
    } else {
      addLog(state, `${mon.name} besiegt · +${fmt(r.gold)}🟡${r.shards ? ` +${r.shards}🔮` : ''}`, i);
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

  // Gegner greift im eigenen Takt an
  mon.t += DT;
  while (mon.t >= mon.interval) {
    mon.t -= mon.interval;
    monsterAttack(state, sq, i, mon, now, ev);
  }
  if (mon.boss) {
    mon.aoeT += DT;
    if (mon.aoeT >= COMBAT.BOSS_AOE_EVERY) {
      mon.aoeT -= COMBAT.BOSS_AOE_EVERY;
      const targets = members.filter(h => !h.woundedUntil);
      if (targets.length) addLog(state, `💥 ${mon.name} trifft den ganzen Trupp!`, i, 'bad');
      for (const h of targets) hurt(state, i, h, mon.aoe, mon, now, ev);
    }
  }
  if (members.every(h => h.woundedUntil)) startRetreat(state, i);
}

// Ein Gegner-Treffer nach Angriffsart (#051): Nahkampf → Anführer + Streuung, Fernkampf → ein Ziel, Magie → Fläche
function monsterAttack(state, sq, i, mon, now, ev) {
  const alive = squadMembers(state, sq).filter(h => !h.woundedUntil);
  if (!alive.length) return;
  if (mon.attack === 'ranged' && alive.length > 1) {
    const shares = hitShares(sq, alive, 'ranged');
    let r = Math.random();
    const pick = shares.find(o => (r -= o.share) < 0) || shares[shares.length - 1];
    hurt(state, i, pick.hero, mon.atk, mon, now, ev);
    return;
  }
  for (const { hero, share } of hitShares(sq, alive, mon.attack)) hurt(state, i, hero, mon.atk * share, mon, now, ev);
}

function hurt(state, i, hero, amount, mon, now, ev) {
  const hs = heroStats(state, hero);
  hero.hp -= amount * (1 - hs.defense) * (mon.boss ? hs.bossDmg : 1);
  ev.struck?.push({ squad: i, uid: hero.uid });
  if (hero.hp <= 0) {
    hero.hp = 0;
    hero.woundedUntil = now + Math.round(regenMs(state) * hs.regen);
    addLog(state, `💢 ${HERO_BY_ID[hero.heroId].name} ist verwundet.`, i, 'bad');
  }
}

function startRetreat(state, i) {
  const sq = state.squads[i];
  const wasBoss = sq.mode === 'boss';
  if (wasBoss) endBoss(state, i, true);
  sq.status = 'retreat';
  sq.mode = 'farm';
  sq.bossTime = 0;
  sq.monster = null;
  addLog(state, wasBoss
    ? '🏕️ Der Boss war zu stark – Rückzug ins Lager.'
    : '🏕️ Alle Helden gefallen – Rückzug ins Lager.', i, 'bad');
}

// ---------- Aktionen ------------------------------------------------
export function setStage(state, i, zone, stage) {
  const sq = state.squads[i];
  if (sq.mode === 'boss') return false; // Während einer Herausforderung bleibt der Trupp, wo er ist (Abbrechen geht über abortBoss)
  if (!isStageAvailable(state, zone, stage)) return false;
  if (sq.zone === zone && sq.stage === stage) return false;
  sq.zone = zone;
  sq.stage = stage;
  sq.mode = 'farm';
  sq.bossTime = 0;
  sq.monster = null;
  if (sq.status === 'fighting') spawnMonster(state, sq);
  addLog(state, `Trupp zieht nach ${ZONES[zone - 1].name}, Stufe ${stage}.`, i, 'info');
  return true;
}

export const bossCost = (state, i) => stageOf(state.squads[i].zone, state.squads[i].stage).cost;

export function canChallengeBoss(state, i) {
  const sq = state.squads[i];
  return i < state.tentsUnlocked && sq.status === 'fighting' && sq.mode === 'farm'
    && state.lastTickMs >= (sq.bossReadyAt || 0)
    && squadMembers(state, sq).some(h => !h.woundedUntil);
}

// Restliche Abklingzeit in ms (0 = bereit)
export const bossCooldownLeft = (state, i) => Math.max(0, (state.squads[i].bossReadyAt || 0) - state.lastTickMs);

export function toggleAutoBoss(state, i) {
  const sq = state.squads[i];
  if (!sq || i >= state.tentsUnlocked) return false;
  sq.autoBoss = !sq.autoBoss;
  addLog(state, sq.autoBoss ? '🔁 Herausforderung wird automatisch wiederholt.' : '🔁 Automatische Herausforderung aus.', i, 'info');
  return true;
}

// Kostet Gold (CQHT „cost“)
export function challengeBoss(state, i) {
  if (!canChallengeBoss(state, i)) return false;
  const cost = bossCost(state, i);
  if (state.gold < cost) return 'gold';
  state.gold -= cost;
  const sq = state.squads[i];
  sq.mode = 'boss';
  sq.bossTime = 0;
  spawnMonster(state, sq);
  addLog(state, `👑 Herausforderung: ${sq.monster.name}!`, i, 'boss');
  return true;
}

export function abortBoss(state, i) {
  const sq = state.squads[i];
  if (sq.mode !== 'boss') return false;
  endBoss(state, i, true);
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
