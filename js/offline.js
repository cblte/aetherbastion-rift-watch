// =====================================================================
//  Offline-Fortschritt – deterministisch, ohne Tick-Simulation.
//  Offline farmen die Trupps die Schergen ihrer gewählten Stufe
//  (Boss-Herausforderungen gibt es nur live). Pro Sieg:
//    Zeit       = Auftauchen (COMBAT.SPAWN_DELAY) + Monster-HP ÷ Trupp-DPS
//    Effizienz  = min(1, (HP-Puffer + Heilung × Zeit) ÷ eingehender Schaden)
//  Effizienz < 1 heißt: Die Stufe ist zu schwer, der Trupp bekommt nur
//  diesen Anteil der Beute. Offline gibt es keine Helden-Tode.
//  Außerdem: Gildenkasse je 10-Min.-Zyklus, Bauaufträge werden fertig,
//  der Laden der Charr-Schmiede füllt sich neu.
// =====================================================================
import { ZONES, HERO_BY_ID, CYCLE_MS, COMBAT } from './config.js';
import { heroStats, addLog, offlineMaxMs, payCycle, squadTrait } from './state.js';
import { checkConstruction, checkShop, checkRecruits } from './progress.js';
import { squadMembers, teamProfile, monsterTemplate, applyKillRewards, spawnMonster, fmt } from './combat.js';

const MAX_STEPS = 200_000; // Sicherheitsnetz

export function runOffline(state, elapsedMs) {
  const maxMs = offlineMaxMs(state);
  const cappedMs = Math.min(Math.max(0, elapsedMs), maxMs);
  const seconds = Math.floor(cappedMs / 1000);
  const report = {
    elapsedMs, cappedMs, maxMs, capped: elapsedMs > maxMs,
    squads: [], rp: 0, built: null, cycles: 0, cycleGold: 0, cycleRp: 0, totals: { gold: 0, shards: 0, kills: 0, levelUps: 0 },
  };

  const rpBefore = state.rp;
  // Alle Verwundeten regenerieren
  for (const h of state.heroes) { h.woundedUntil = 0; h.hp = heroStats(state, h).maxHp; }

  // Bau, Laden, Gildenkasse (echte Zeit für den Bau, Kasse bis zur Offline-Grenze)
  const start = state.lastTickMs;
  report.built = checkConstruction(state, start + elapsedMs);
  checkShop(state, start + elapsedMs);
  checkRecruits(state, start + elapsedMs);
  report.cycles = 0; report.cycleGold = 0; report.cycleRp = 0;
  while (state.nextCycleMs <= start + cappedMs) {
    const c = payCycle(state);
    report.cycles += 1; report.cycleGold += c.gold; report.cycleRp += c.rp;
    state.nextCycleMs += CYCLE_MS;
  }
  if (state.nextCycleMs <= start + elapsedMs) {
    state.nextCycleMs = start + elapsedMs + CYCLE_MS; // über die Grenze hinaus verfallen
  }

  const active = state.onboarding >= 5 && state.buildings.portal >= 1;
  for (let i = 0; i < state.tentsUnlocked && active; i++) {
    const sq = state.squads[i];
    const heroes = squadMembers(state, sq);
    if (!heroes.length) continue;

    sq.mode = 'farm';
    sq.bossTime = 0;
    const zone = ZONES[sq.zone - 1];
    const before = new Map(heroes.map(h => [h.uid, h.level]));
    const r = {
      squad: i, zone: sq.zone, zoneName: zone.name, stage: sq.stage,
      bossName: zone.stages[sq.stage - 1].boss.name,
      kills: 0, gold: 0, shards: 0, expPerHero: 0, minEff: 1, levelUps: [],
    };
    let t = seconds, steps = 0;
    // beide Schergen-Typen abwechselnd, jeder mit eigener Angriffsart (#051)
    const mons = [0, 1].map(v => monsterTemplate(sq.zone, sq.stage, false, v));
    const offBonus = 1 + squadTrait(heroes, 'offline'); // Eigenschaft „Offline“: mehr Ertrag je Sieg

    while (t > 0 && steps++ < MAX_STEPS) {
      const mon = mons[steps % 2];
      const prof = teamProfile(state, heroes, sq, mon.attack);
      if (prof.dps <= 0) break;
      const secs = COMBAT.SPAWN_DELAY + mon.maxHp / prof.dps;
      if (secs > t) break;
      const incoming = mon.dps * prof.dmgFactor * (1 - prof.teamDef) * secs;
      const eff = Math.min(1, (prof.hpPool + prof.heal * secs) / incoming);
      r.minEff = Math.min(r.minEff, eff);
      t -= secs;

      const res = applyKillRewards(state, i, mon, heroes, eff * offBonus, true);
      r.kills += eff;
      r.gold += res.gold;
      r.shards += res.shards;
      r.expPerHero += res.exp;
    }

    for (const h of heroes) {
      const from = before.get(h.uid);
      if (h.level > from) r.levelUps.push({ uid: h.uid, name: HERO_BY_ID[h.heroId].name, from, to: h.level });
    }
    sq.status = 'fighting';
    spawnMonster(state, sq);

    report.squads.push(r);
    report.totals.gold += r.gold;
    report.totals.shards += r.shards;
    report.totals.kills += r.kills;
    report.totals.levelUps += r.levelUps.length;
  }

  report.totals.gold += report.cycleGold;
  report.rp = state.rp - rpBefore; // Kasse + Level-Ups
  if (report.squads.length || report.cycles) {
    addLog(state, `🌙 Offline: +${fmt(report.totals.gold)}🟡 +${report.totals.shards}🔮${report.rp >= 1 ? ` +${fmt(report.rp)}📜` : ''}`, null, 'info');
  }
  return report;
}
