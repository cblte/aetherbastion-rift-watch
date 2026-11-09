// =====================================================================
//  Aufträge nach dem Onboarding (Daten: QUESTS in config.js)
//  Kein DOM, keine Imports aus state.js – auch in Node und in der
//  Save-Migration nutzbar.
// =====================================================================
import { QUESTS, TENT_SIZE, HERO_BY_ID } from './config.js';

// Fortschritt eines Auftrags: { have, need }
export function questProgress(state, q) {
  const g = q.goal;
  const have = (() => {
    switch (g.type) {
      case 'stage': return state.progress?.[g.zone] || 0;
      case 'heroLevel': return Math.max(0, ...(state.heroes || []).map(h => h.level));
      case 'building': return state.buildings?.[g.key] || 0;
      case 'role': return (state.heroes || []).some(h => HERO_BY_ID[h.heroId]?.role === g.role) ? 1 : 0;
      case 'freeHero': return (state.heroes || []).some(h => h.heroId === g.hero) ? 1 : 0;
      case 'weapon': return (state.heroes || []).some(h => h.weapon) ? 1 : 0;
      case 'research': return Object.values(state.research || {}).reduce((n, v) => n + v, 0);
      case 'ration': return state.stats?.rationsFed || 0;
      case 'tents': return state.tentsUnlocked || 1;
      case 'squadFull': return (state.squads?.[g.squad]?.slots || []).filter(u => u != null).length;
      default: return 0;
    }
  })();
  const need = { stage: g.stage, heroLevel: g.level, building: g.level, research: g.n, ration: g.n, tents: g.n, squadFull: TENT_SIZE }[g.type] ?? 1;
  return { have: Math.min(have, need), need };
}

export const questDone = (state, q) => { const p = questProgress(state, q); return p.have >= p.need; };

// Aktueller Auftrag = erster nicht abgeholter (erst nach dem Onboarding)
export function currentQuest(state) {
  if (state.onboarding < 5) return null;
  const done = new Set(state.questsDone || []);
  return QUESTS.find(q => !done.has(q.id)) || null;
}

export const questNumber = (q) => QUESTS.indexOf(q) + 1;

// Belohnung abholen. Rückgabe: der Auftrag oder null
export function claimQuest(state) {
  const q = currentQuest(state);
  if (!q || !questDone(state, q)) return null;
  for (const [k, v] of Object.entries(q.reward)) state[k] = (state[k] || 0) + v;
  state.questsDone.push(q.id);
  return q;
}

// Für die Migration: alle schon erfüllten Aufträge ohne Belohnung abhaken
export function markFulfilledQuests(state) {
  if (state.onboarding < 5) return [];
  return QUESTS.filter(q => questDone(state, q)).map(q => q.id);
}
