// =====================================================================
//  Spielstand: Erzeugen, Speichern, Laden, Migration + abgeleitete Werte
// =====================================================================
import {
  GAME, HERO_BY_ID, BUILDINGS, MYSTIC, F, COMBAT, ZONES, TENTS, TENT_SIZE, LEVEL_CAP_MAX,
} from './config.js';

export function createNewState(now = Date.now()) {
  return {
    version: GAME.SAVE_VERSION,
    createdAt: now,
    lastTickMs: now,
    gold: 0,
    shards: 0,
    shardFrac: 0,          // Bruchteile für deterministische Offline-Scherben
    coins: 0,
    onboarding: 0,         // 0..4 = Quest-Schritte, 5 = fertig
    buildings: { hall: 0, camp: 0, kitchen: 0, forge: 0, portal: 0 },
    tentsUnlocked: 1,
    heroes: [],            // { uid, heroId, level, exp, hp, woundedUntil }
    nextUid: 1,
    heroesPaid: 0,         // Anzahl gekaufter (nicht kostenloser) Helden
    squads: [0, 1, 2, 3].map(createSquad),
    zonesCleared: {},
    mystic: { atk: 0, hp: 0, regen: 0, loot: 0 },
    settings: { vibrate: true },
    selectedSquad: 0,
    log: [],
    monsterSeq: 1,
    stats: { kills: 0, bosses: 0, retired: 0 },
  };
}

function createSquad() {
  return { zone: 1, wave: 1, status: 'idle', monster: null, slots: Array(TENT_SIZE).fill(null) };
}

// ---------------------------------------------------------------------
//  Migration: für jede alte Version eine Funktion version → version+1
//  Beispiel für später:
//    1: (s) => { s.neuesFeld = 0; return s; },
// ---------------------------------------------------------------------
const MIGRATIONS = {};

export function migrate(raw) {
  let s = raw;
  if (!s || typeof s !== 'object') throw new Error('Ungültiger Spielstand');
  if (typeof s.version !== 'number') s.version = 1;
  if (s.version > GAME.SAVE_VERSION) throw new Error('Spielstand stammt aus einer neueren Version');
  while (s.version < GAME.SAVE_VERSION) {
    const step = MIGRATIONS[s.version];
    if (!step) throw new Error(`Keine Migration für Version ${s.version}`);
    s = step(s);
    s.version += 1;
  }
  return sanitize(fillDefaults(s, createNewState(s.lastTickMs || Date.now())));
}

function fillDefaults(target, defaults) {
  for (const [k, v] of Object.entries(defaults)) {
    if (target[k] === undefined || target[k] === null && v !== null) target[k] = structuredClone(v);
    else if (isPlainObject(v) && isPlainObject(target[k])) fillDefaults(target[k], v);
  }
  return target;
}
const isPlainObject = (o) => o && typeof o === 'object' && !Array.isArray(o);

function sanitize(s) {
  while (s.squads.length < TENTS.length) s.squads.push(createSquad());
  const uids = new Set(s.heroes.map(h => h.uid));
  const seen = new Set();
  s.heroes = s.heroes.filter(h => HERO_BY_ID[h.heroId]);
  for (const sq of s.squads) {
    fillDefaults(sq, createSquad());
    sq.slots = sq.slots.slice(0, TENT_SIZE).map(u => (u != null && uids.has(u) && !seen.has(u) ? (seen.add(u), u) : null));
  }
  s.log = (s.log || []).slice(0, GAME.LOG_SIZE);
  return s;
}

// ---------------------------------------------------------------------
//  Speichern / Laden / Export / Import
// ---------------------------------------------------------------------
export function save(state) {
  try {
    localStorage.setItem(GAME.SAVE_KEY, JSON.stringify(state));
    return true;
  } catch (e) {
    console.warn('Speichern fehlgeschlagen', e);
    return false;
  }
}

export function load() {
  try {
    const raw = localStorage.getItem(GAME.SAVE_KEY);
    if (!raw) return null;
    return migrate(JSON.parse(raw));
  } catch (e) {
    console.warn('Laden fehlgeschlagen, starte neu', e);
    return null;
  }
}

export function exportSave(state) {
  const bytes = new TextEncoder().encode(JSON.stringify(state));
  let bin = '';
  for (const b of bytes) bin += String.fromCharCode(b);
  return btoa(bin);
}

export function importSave(b64) {
  const bin = atob(b64.replace(/\s+/g, ''));
  const json = new TextDecoder().decode(Uint8Array.from(bin, c => c.charCodeAt(0)));
  return migrate(JSON.parse(json));
}

// Ersetzt den Inhalt des Zustandsobjekts, damit alle Module dieselbe Referenz behalten.
export function replaceState(target, source) {
  for (const k of Object.keys(target)) delete target[k];
  Object.assign(target, source);
}

// ---------------------------------------------------------------------
//  Abgeleitete Werte
// ---------------------------------------------------------------------
export const getHero = (state, uid) => state.heroes.find(h => h.uid === uid) || null;
export const heroDef = (hero) => HERO_BY_ID[hero.heroId];

export const forgeMult   = (s) => 1 + BUILDINGS.forge.bonusPerLevel * s.buildings.forge;
export const kitchenMult = (s) => 1 + BUILDINGS.kitchen.bonusPerLevel * s.buildings.kitchen;
export const prestigeAtk = (s) => 1 + MYSTIC.atk.per * s.mystic.atk;
export const prestigeHp  = (s) => 1 + MYSTIC.hp.per * s.mystic.hp;
export const lootMult    = (s) => 1 + MYSTIC.loot.per * s.mystic.loot;
export const regenMs     = (s) => Math.round(COMBAT.WOUND_MS * (1 - MYSTIC.regen.per * s.mystic.regen));
export const levelCap    = (s) => F.levelCap(s.buildings.camp);
export { LEVEL_CAP_MAX };

export function heroStats(state, hero) {
  const def = heroDef(hero);
  return {
    def,
    atk: F.heroAtk(def.baseAtk, hero.level, forgeMult(state), prestigeAtk(state)),
    maxHp: F.heroHp(def.baseHp, hero.level, prestigeHp(state)),
    crit: def.crit || 0,
  };
}

export function squadOf(state, uid) {
  return state.squads.findIndex(sq => sq.slots.includes(uid));
}
export const reserveHeroes = (state) => state.heroes.filter(h => squadOf(state, h.uid) === -1);
export const activeHeroCount = (state) =>
  state.squads.slice(0, state.tentsUnlocked).reduce((n, sq) => n + sq.slots.filter(u => u != null).length, 0);
export const isOwned = (state, heroId) => state.heroes.some(h => h.heroId === heroId);
export const nextRecruitCost = (state) => F.recruitCost(state.heroesPaid + 1);

export function isZoneAvailable(state, zoneId) {
  const z = ZONES[zoneId - 1];
  if (!z) return false;
  if (state.buildings.portal < z.portal) return false;
  return zoneId === 1 || !!state.zonesCleared[zoneId - 1];
}

export function buildingCost(key, targetLevel) {
  const base = BUILDINGS[key].cost;
  const out = {};
  for (const [cur, v] of Object.entries(base)) out[cur] = F.buildCost(v, targetLevel);
  return out;
}

export const canAfford = (state, cost) => Object.entries(cost).every(([cur, v]) => state[cur] >= v);
export function pay(state, cost) {
  if (!canAfford(state, cost)) return false;
  for (const [cur, v] of Object.entries(cost)) state[cur] -= v;
  return true;
}

export function createHero(state, heroId) {
  const def = HERO_BY_ID[heroId];
  const hero = { uid: state.nextUid++, heroId, level: 1, exp: 0, hp: 0, woundedUntil: 0 };
  state.heroes.push(hero);
  hero.hp = heroStats(state, hero).maxHp;
  return hero;
}

// Gibt die Anzahl gewonnener Stufen zurück
export function gainExp(state, hero, amount) {
  const cap = levelCap(state);
  if (hero.level >= cap) { hero.exp = 0; return 0; }
  hero.exp += amount;
  let gained = 0;
  while (hero.level < cap && hero.exp >= F.expToNext(hero.level)) {
    hero.exp -= F.expToNext(hero.level);
    const oldMax = heroStats(state, hero).maxHp;
    hero.level += 1;
    gained += 1;
    if (!hero.woundedUntil) hero.hp += heroStats(state, hero).maxHp - oldMax;
  }
  if (hero.level >= cap) hero.exp = 0;
  return gained;
}

export function addLog(state, msg, squad = null, kind = '') {
  state.log.unshift({ t: state.lastTickMs, s: squad, msg, kind });
  if (state.log.length > GAME.LOG_SIZE) state.log.length = GAME.LOG_SIZE;
}
