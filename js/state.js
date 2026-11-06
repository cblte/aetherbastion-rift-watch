// =====================================================================
//  Spielstand: Erzeugen, Speichern, Laden, Migration + abgeleitete Werte
// =====================================================================
import {
  GAME, HERO_BY_ID, BUILDINGS, MYSTIC, F, COMBAT, ZONES, TENTS, TENT_SIZE, LEVEL_CAP_MAX,
  ROLES, RESEARCH, FEATURES, NORMAL_STAGES, TOTAL_NORMAL, HERO_LEVELS, CYCLE_MS, PORTAL_SHARDS,
  WEAPON_BY_ID, WEAPON_GRADES, WEAPON_FOR,
} from './config.js';

export function createNewState(now = Date.now()) {
  return {
    version: GAME.SAVE_VERSION,
    createdAt: now,
    lastTickMs: now,
    nextCycleMs: now + CYCLE_MS, // nächste Auszahlung der Gildenkasse
    gold: 0,
    shards: 0,
    shardFrac: 0,          // Bruchteile für deterministische Offline-Scherben
    coins: 0,
    rp: 0,                 // 🧪 Forschungspunkte (CQHT: Honor)
    rations: [0, 0, 0, 0, 0, 0], // Proviant Güte 1–6 (CQHT: Bread)
    fruit: 0,              // CQHT-Früchte (noch ohne Funktion)
    tickets: 0,            // Arena-Tickets (noch ohne Funktion)
    onboarding: 0,         // 0..4 = Quest-Schritte, 5 = fertig
    buildings: { hall: 0, camp: 0, portal: 0, kitchen: 0, lab: 0, forge: 0 },
    construction: null,    // { key, to, doneAt } – es wird immer nur eines gebaut
    tentsUnlocked: 1,
    heroes: [],            // { uid, heroId, level, exp, hp, woundedUntil, weapon (Waffen-ID|null) }
    nextUid: 1,
    heroesPaid: 0,         // Anzahl gekaufter (nicht kostenloser) Helden
    armory: [],            // Waffen-IDs in der Waffenkammer (nicht ausgerüstet)
    shop: { offers: [], nextRestockMs: 0, refreshes: 0 },
    squads: [0, 1, 2, 3].map(createSquad),
    progress: {},          // Zone → höchste besiegte Stufe (Boss)
    research: {},          // Forschungsknoten → Stufe
    mystic: { atk: 0, hp: 0, regen: 0, loot: 0 },
    settings: { vibrate: true },
    selectedSquad: 0,
    log: [],
    monsterSeq: 1,
    stats: { kills: 0, bosses: 0, retired: 0 },
  };
}

function createSquad() {
  // mode: 'farm' = Schergen der Stufe, 'boss' = Boss-Herausforderung läuft
  return { zone: 1, stage: 1, mode: 'farm', bossTicks: 0, status: 'idle', monster: null, slots: Array(TENT_SIZE).fill(null) };
}

// ---------------------------------------------------------------------
//  Migration: für jede alte Version eine Funktion version → version+1
// ---------------------------------------------------------------------
const MIGRATIONS = {
  // v1 → v2: Wellen werden zu Stufen; neue Gebäude, Waffen, Forschung, CQHT-Daten
  1: (s) => {
    s.progress = {};
    // Bezieht sich noch auf die 5 alten Zonen mit je 10 normalen Stufen (v2 → v3 teilt sie auf)
    for (const z of Object.keys(s.zonesCleared || {})) if (Number(z) >= 1 && Number(z) <= 5) s.progress[z] = 10;
    delete s.zonesCleared;
    for (const sq of s.squads || []) {
      delete sq.wave;
      sq.stage = 1; sq.mode = 'farm'; sq.bossTicks = 0; sq.monster = null;
      if (sq.status === 'fighting') sq.status = 'idle';
    }
    for (const h of s.heroes || []) h.weapon = null;
    const b = s.buildings || {};
    s.buildings = {
      hall: Math.min(b.hall || 0, BUILDINGS.hall.max),
      camp: Math.min(b.camp || 0, BUILDINGS.camp.max),
      portal: Math.min(b.portal || 0, BUILDINGS.portal.max),
      kitchen: b.kitchen || 0, lab: 0,
      forge: 0, // alte Schmiede (+ATK) entfällt; die Charr-Schmiede ist neu
    };
    return s;
  },
  // v2 → v3: 5 Zonen (10 normal + 4 schwer + 1 legendär) werden zu 10 Zonen
  2: (s) => {
    const progress = {};
    for (const [z, p] of Object.entries(s.progress || {})) {
      for (let st = 1; st <= Math.min(p, 15); st++) {
        const n = splitStage(Number(z), st);
        if (n) progress[n.zone] = Math.max(progress[n.zone] || 0, n.stage);
      }
    }
    s.progress = progress;
    for (const sq of s.squads || []) {
      const n = splitStage(sq.zone, sq.stage) || { zone: 1, stage: 1 };
      sq.zone = n.zone; sq.stage = n.stage;
    }
    // Onboarding: Zeltlager (jetzt Quest 2) kommt vor dem ersten Helden (jetzt Quest 3).
    // Alter Schritt 3 = Held schon da, Zeltlager fehlt → Zeltlager aufschlagen, weiter mit Quest 4.
    if (s.onboarding === 3) { s.buildings.camp = Math.max(1, s.buildings.camp || 0); s.onboarding = 4; }
    return s;
  },
};

// Alte Stufe (Zone 1–5, Stufe 1–15) → neue Zone/Stufe nach der Aufteilung
export function splitStage(zone, stage) {
  if (!(zone >= 1 && zone <= 5 && stage >= 1 && stage <= 15)) return null;
  const a = 2 * zone - 1, b = 2 * zone;
  if (stage <= 5) return { zone: a, stage };
  if (stage <= 10) return { zone: b, stage: stage - 5 };
  if (stage <= 12) return { zone: a, stage: stage - 5 };  // schwer 1–2 → Teil 1, Stufe 6–7
  return { zone: b, stage: stage - 7 };                  // schwer 3–4, legendär → Teil 2, Stufe 6–8
}

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
    if (target[k] === undefined || (target[k] === null && v !== null)) target[k] = structuredClone(v);
    else if (isPlainObject(v) && isPlainObject(target[k])) fillDefaults(target[k], v);
  }
  return target;
}
const isPlainObject = (o) => o && typeof o === 'object' && !Array.isArray(o);

function sanitize(s) {
  while (s.squads.length < TENTS.length) s.squads.push(createSquad());
  s.heroes = s.heroes.filter(h => HERO_BY_ID[h.heroId]);
  const uids = new Set(s.heroes.map(h => h.uid));
  const seen = new Set();
  for (const sq of s.squads) {
    fillDefaults(sq, createSquad());
    sq.slots = sq.slots.slice(0, TENT_SIZE).map(u => (u != null && uids.has(u) && !seen.has(u) ? (seen.add(u), u) : null));
    if (!ZONES[sq.zone - 1]) sq.zone = 1;
    sq.stage = Math.max(1, Math.min(sq.stage, ZONES[sq.zone - 1].stages.length));
  }
  for (const h of s.heroes) {
    if (!WEAPON_BY_ID[h.weapon]) h.weapon = null;
    h.level = Math.min(h.level, LEVEL_CAP_MAX);
  }
  s.armory = (s.armory || []).filter(w => WEAPON_BY_ID[w]);
  s.shop.offers = (s.shop.offers || []).filter(w => WEAPON_BY_ID[w]);
  while (s.rations.length < 6) s.rations.push(0);
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

// Forschung: Wert eines Knotens (Stufe × Wirkung)
export function researchLevel(s, key) { return s.research?.[key] || 0; }
export function researchNode(key) {
  for (const tree of Object.values(RESEARCH)) if (tree.nodes[key]) return tree.nodes[key];
  return null;
}
export const rv = (s, key) => researchLevel(s, key) * (researchNode(key)?.per || 0);

export const kitchenMult = (s) => (1 + BUILDINGS.kitchen.bonusPerLevel * s.buildings.kitchen) * (1 + rv(s, 'exp'));
export const prestigeAtk = (s) => 1 + MYSTIC.atk.per * s.mystic.atk;
export const prestigeHp  = (s) => 1 + MYSTIC.hp.per * s.mystic.hp;
export const goldMult    = (s) => (1 + MYSTIC.loot.per * s.mystic.loot) * (1 + rv(s, 'gold'));
export const shardMult   = (s) => (1 + MYSTIC.loot.per * s.mystic.loot) * (1 + rv(s, 'shards'));
export const regenMs     = (s) => Math.round(COMBAT.WOUND_MS * (1 - MYSTIC.regen.per * s.mystic.regen) * (1 - rv(s, 'regen')));
export const offlineMaxMs = (s) => GAME.OFFLINE_MAX_MS + rv(s, 'offline') * 60_000;
export const healMult    = (s) => 1 + rv(s, 'heal');
export const tempoBonus  = (s) => rv(s, 'speed');
export const levelCap    = (s) => s.buildings.camp ? BUILDINGS.camp.levels[s.buildings.camp - 1].cap : 10;
export const hallGold    = (s) => s.buildings.hall ? BUILDINGS.hall.levels[s.buildings.hall - 1].gold : 0;
export const buildingUnlocked = (s, key) => s.buildings.hall >= BUILDINGS[key].unlockHall;
export const featureUnlocked  = (s, key) => s.buildings.hall >= FEATURES[key].unlockHall;
export const weaponType  = (hero) => {
  const d = heroDef(hero);
  return d.role === 'healer' ? WEAPON_FOR.healer : WEAPON_FOR[d.cls];
};
export { LEVEL_CAP_MAX };

export function heroStats(state, hero) {
  const def = heroDef(hero);
  const w = hero.weapon ? WEAPON_GRADES[WEAPON_BY_ID[hero.weapon].grade] : { atk: 0, hp: 0 };
  return {
    def,
    atk: F.heroAtk(def.baseAtk, hero.level, 1 + w.atk, prestigeAtk(state) * (1 + rv(state, 'atk'))),
    maxHp: F.heroHp(def.baseHp, hero.level, (1 + w.hp) * prestigeHp(state) * (1 + rv(state, 'hp'))),
    crit: Math.min(1, (def.crit || 0) + rv(state, 'crit')),
    critMult: COMBAT.CRIT_MULT + rv(state, 'critdmg'),
    defense: Math.min(COMBAT.DEF_CAP, ROLES[def.role].def + rv(state, 'def')),
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

// ---------- Stufen-Fortschritt ----------------------------------------
export const normalCleared = (state) =>
  ZONES.reduce((n, z) => n + Math.min(state.progress[z.id] || 0, NORMAL_STAGES), 0);
// Alle schweren Stufen besiegt? (Stufen-Reihenfolge je Zone: normal, schwer, legendär)
const hardDone = (state) => ZONES.every(z => (state.progress[z.id] || 0) >= z.stages.filter(st => !st.legend).length);

export function isZoneAvailable(state, zoneId) {
  const z = ZONES[zoneId - 1];
  if (!z) return false;
  if (state.buildings.portal < z.portal) return false;
  return zoneId === 1 || (state.progress[zoneId - 1] || 0) >= NORMAL_STAGES;
}
// Warum ist eine Stufe gesperrt? '' = verfügbar
export function stageLock(state, zoneId, stage) {
  const z = ZONES[zoneId - 1];
  if (!isZoneAvailable(state, zoneId)) return 'Zone gesperrt';
  if (stage > (state.progress[zoneId] || 0) + 1) return `Besiege zuerst den Boss von Stufe ${stage - 1}`;
  const st = z.stages[stage - 1];
  if (st.hard && normalCleared(state) < TOTAL_NORMAL) return `Schwer: erst alle ${TOTAL_NORMAL} normalen Stufen besiegen`;
  if (st.legend && !hardDone(state)) return 'Legendär: erst alle schweren Stufen besiegen';
  return '';
}
export const isStageAvailable = (state, zoneId, stage) =>
  stage >= 1 && stage <= (ZONES[zoneId - 1]?.stages.length || 0) && !stageLock(state, zoneId, stage);
export const stageBeaten = (state, zoneId, stage) => (state.progress[zoneId] || 0) >= stage;

// ---------- Gebäude ---------------------------------------------------
export function buildingCost(key, targetLevel) {
  const lvl = BUILDINGS[key].levels[targetLevel - 1];
  const cost = { gold: lvl.cost };
  if (key === 'portal') {
    const sh = PORTAL_SHARDS[targetLevel - 1];
    if (sh) cost.shards = sh;
  }
  return cost;
}

// Warum kann die nächste Stufe nicht gebaut werden? '' = möglich
export function buildLock(state, key) {
  const b = BUILDINGS[key];
  const next = state.buildings[key] + 1;
  if (next > b.max) return 'Maximal';
  if (!buildingUnlocked(state, key)) return `Ab Gildenhalle Stufe ${b.unlockHall}`;
  const lvl = b.levels[next - 1];
  if (key === 'hall') {
    if (normalCleared(state) < lvl.stage) return `Benötigt ${lvl.stage} besiegte Stufen (${normalCleared(state)}/${lvl.stage})`;
  } else if (state.buildings.hall < lvl.hall) return `Benötigt Gildenhalle Stufe ${lvl.hall}`;
  if (state.construction) return 'Es wird gerade etwas anderes gebaut';
  return '';
}

export const canAfford = (state, cost) => Object.entries(cost).every(([cur, v]) => state[cur] >= v);
export function pay(state, cost) {
  if (!canAfford(state, cost)) return false;
  for (const [cur, v] of Object.entries(cost)) state[cur] -= v;
  return true;
}

export function createHero(state, heroId) {
  const hero = { uid: state.nextUid++, heroId, level: 1, exp: 0, hp: 0, woundedUntil: 0, weapon: null };
  state.heroes.push(hero);
  hero.hp = heroStats(state, hero).maxHp;
  return hero;
}

// Gibt die Anzahl gewonnener Stufen zurück. Jede neue Stufe bringt die
// CQHT-„Return Reward“: 🧪, Proviant und Früchte.
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
    const r = HERO_LEVELS[hero.level - 1].reward;
    state.rp += r.rp;
    r.rations.forEach((n, g) => { state.rations[g] += n; });
    state.fruit += r.fruit;
    if (!hero.woundedUntil) hero.hp += heroStats(state, hero).maxHp - oldMax;
  }
  if (hero.level >= cap) hero.exp = 0;
  return gained;
}

// Gildenkasse + Helden-Einkommen für einen 10-Min.-Zyklus (CQHT „/cycle“)
export function payCycle(state) {
  let gold = hallGold(state), rp = 0;
  for (const h of state.heroes) {
    const row = HERO_LEVELS[h.level - 1];
    gold += row.goldCycle;
    rp += row.rpCycle;
  }
  state.gold += gold;
  state.rp += rp;
  return { gold, rp };
}

export function addLog(state, msg, squad = null, kind = '') {
  state.log.unshift({ t: state.lastTickMs, s: squad, msg, kind });
  if (state.log.length > GAME.LOG_SIZE) state.log.length = GAME.LOG_SIZE;
}
