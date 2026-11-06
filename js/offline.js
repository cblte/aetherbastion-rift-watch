// =====================================================================
//  Offline-Fortschritt – deterministisch, ohne Tick-Simulation.
//  Gerechnet wird Welle für Welle mit Erwartungswerten:
//    Zeit pro Welle  = Monster-HP ÷ Trupp-DPS
//    Effizienz       = min(1, (HP-Puffer + Heilung × Zeit) ÷ eingehender Schaden)
//  Effizienz < 1 heißt: Der Trupp scheitert an dieser Welle, bekommt nur
//  den Anteil der Belohnung und fängt (wie live) bei Welle 1 wieder an.
//  Offline gibt es keine Helden-Tode; alle Verwundeten sind danach fit.
// =====================================================================
import { GAME, ZONES, HERO_BY_ID } from './config.js';
import { heroStats, addLog } from './state.js';
import {
  squadMembers, teamProfile, monsterTemplate, applyKillRewards, advanceWave, spawnMonster, fmt,
} from './combat.js';

const MAX_STEPS = 200_000; // Sicherheitsnetz

export function runOffline(state, elapsedMs) {
  const cappedMs = Math.min(Math.max(0, elapsedMs), GAME.OFFLINE_MAX_MS);
  const seconds = Math.floor(cappedMs / 1000);
  const report = {
    elapsedMs, cappedMs, capped: elapsedMs > GAME.OFFLINE_MAX_MS,
    squads: [], totals: { gold: 0, shards: 0, kills: 0, levelUps: 0 },
  };

  // Alle Verwundeten regenerieren
  for (const h of state.heroes) { h.woundedUntil = 0; h.hp = heroStats(state, h).maxHp; }

  const active = state.onboarding >= 5 && state.buildings.portal >= 1;
  for (let i = 0; i < state.tentsUnlocked && active; i++) {
    const sq = state.squads[i];
    const heroes = squadMembers(state, sq);
    if (!heroes.length) continue;

    const before = new Map(heroes.map(h => [h.uid, h.level]));
    const r = {
      squad: i, zone: sq.zone, zoneName: ZONES[sq.zone - 1].name, startWave: sq.wave,
      kills: 0, gold: 0, shards: 0, expPerHero: 0, bosses: 0, minEff: 1, levelUps: [],
    };
    let t = seconds, steps = 0;

    while (t > 0 && steps++ < MAX_STEPS) {
      const prof = teamProfile(state, heroes);
      if (prof.dps <= 0) break;
      const mon = monsterTemplate(sq.zone, sq.wave);
      const ticks = Math.max(1, Math.ceil(mon.maxHp / prof.dps));
      if (ticks > t) break;
      const incoming = mon.atk * ticks;
      const eff = Math.min(1, (prof.hpPool + prof.heal * ticks) / incoming);
      r.minEff = Math.min(r.minEff, eff);
      t -= ticks;

      const res = applyKillRewards(state, i, mon, heroes, eff, true);
      r.kills += eff;
      r.gold += res.gold;
      r.shards += res.shards;
      r.expPerHero += res.exp;

      if (eff >= 1) {
        if (mon.boss) r.bosses += 1;
        const first = advanceWave(state, i, mon.boss);
        if (first) addLog(state, `${r.zoneName} wurde im Schlaf befreit!`, i, 'boss');
      } else {
        sq.wave = 1; // zu schwach: Rückzug, neuer Anlauf ab Welle 1
      }
    }

    for (const h of heroes) {
      const from = before.get(h.uid);
      if (h.level > from) r.levelUps.push({ uid: h.uid, name: HERO_BY_ID[h.heroId].name, from, to: h.level });
    }
    r.endWave = sq.wave;
    sq.status = 'fighting';
    spawnMonster(state, sq);

    report.squads.push(r);
    report.totals.gold += r.gold;
    report.totals.shards += r.shards;
    report.totals.kills += r.kills;
    report.totals.levelUps += r.levelUps.length;
  }

  if (report.squads.length) {
    addLog(state, `🌙 Offline: +${fmt(report.totals.gold)}🪙 +${report.totals.shards}🔮`, null, 'info');
  }
  return report;
}
