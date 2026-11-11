// =====================================================================
//  Spielstand: Erzeugen, Speichern, Laden, Migration + abgeleitete Werte
// =====================================================================
import {
  GAME, HERO_BY_ID, BUILDINGS, MYSTIC, F, COMBAT, ZONES, TENTS, TENT_SIZE, LEVEL_CAP_MAX,
  ROLES, RESEARCH, FEATURES, NORMAL_STAGES, TOTAL_NORMAL, HERO_LEVELS, CYCLE_MS, PORTAL_SHARDS,
  WEAPON_BY_ID, WEAPON_GRADES, CLASSES, WEAPON_FOR, RECRUIT, ARMORY_SLOTS, RATION_SLOTS, RETIRE_HOME,
  TRAITS, TRAIT_STATS, TRAIT_RULES, ONBOARDING, RATION_DROP,
} from './config.js';
import { markFulfilledQuests } from './quests.js';

export function createNewState(now = Date.now()) {
  return {
    version: GAME.SAVE_VERSION,
    createdAt: now,
    lastTickMs: now,
    nextCycleMs: now + CYCLE_MS, // nächste Auszahlung der Gildenkasse
    gold: 0,
    shards: 0,
    shardFrac: 0,          // Bruchteile für deterministische Offline-Scherben
    clover: 0,             // 🍀 Mystischer Klee (Ruhestand → Mystische Schmiede, Würfel-Preis)
    rations: [0, 0, 0, 0, 0, 0], // Proviant Güte 1–6
    fruit: 0,              // Früchte (noch ohne Funktion)
    tickets: 0,            // Arena-Tickets (noch ohne Funktion)
    onboarding: 0,         // 0..4 = Quest-Schritte, 5 = fertig
    questsDone: [],        // ids abgeholter Aufträge (QUESTS in config.js)
    buildings: { hall: 0, camp: 0, portal: 0, kitchen: 0, lab: 0, forge: 0 },
    construction: null,    // { key, to, doneAt } – es wird immer nur eines gebaut
    researching: null,     // { tree, key, to, doneAt } – Forschung im Asura-Labor, immer nur eine
    tentsUnlocked: 1,
    heroes: [],            // { uid, heroId, level, exp, hp, woundedUntil, weapon (Waffen-ID|null) }
    nextUid: 1,
    armory: [],            // Waffen-IDs in der Waffenkammer (nicht ausgerüstet)
    shop: { offers: [], nextRestockMs: 0, refreshes: 0 },
    recruits: { offers: [], nextRestockMs: 0, refreshes: 0, slots: 0, starter: false }, // offers: [{ heroId, rarity }], starter: Startangebot schon gezeigt
    squads: [0, 1, 2, 3].map(createSquad),
    progress: {},          // Zone → höchste besiegte Stufe (Boss)
    research: {},          // Forschungsknoten → Stufe
    mystic: { atk: 0, hp: 0, regen: 0, loot: 0 },
    retired: [],           // #022: Helden im Ruhestand { heroId, level, rarity } → passives Einkommen
    settings: { vibrate: true, theme: 'tyria' },
    selectedSquad: 0,
    log: [],
    monsterSeq: 1,
    stats: { kills: 0, bosses: 0, retired: 0, rationsFed: 0 },
  };
}

function createSquad() {
  // mode: 'farm' = Schergen der Stufe, 'boss' = Boss-Herausforderung läuft
  // bossReadyAt: ab wann wieder herausgefordert werden darf (ms); autoBoss: nach der Pause automatisch erneut
  // bossTime: Sekunden seit Beginn der Herausforderung · heroT: Angriffs-Timer der Helden (uid → s, #061)
  return { zone: 1, stage: 1, mode: 'farm', bossTime: 0, bossReadyAt: 0, autoBoss: false, status: 'idle', monster: null, heroT: {}, slots: Array(TENT_SIZE).fill(null) };
}

// ---------------------------------------------------------------------
//  Migration: für jede alte Version eine Funktion version → version+1
// ---------------------------------------------------------------------
const MIGRATIONS = {
  // v1 → v2: Wellen werden zu Stufen; neue Gebäude, Waffen, Forschung, neue Daten
  1: (s) => {
    s.progress = {};
    // Bezieht sich noch auf die 5 alten Zonen mit je 10 normalen Stufen (v2 → v3 teilt sie auf)
    for (const z of Object.keys(s.zonesCleared || {})) if (Number(z) >= 1 && Number(z) <= 5) s.progress[z] = 10;
    delete s.zonesCleared;
    for (const sq of s.squads || []) {
      delete sq.wave;
      sq.stage = 1; sq.mode = 'farm'; sq.bossTime = 0; sq.monster = null;
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
  // v3 → v4: Aufträge nach dem Onboarding. Schon Erfülltes gilt als erledigt (ohne Belohnung).
  3: (s) => {
    s.questsDone = markFulfilledQuests(s);
    return s;
  },
  // v5 → v6: Neue Zonen-Reihenfolge (IDs und Fortschritt bleiben). Riss-Portal hat nur noch 4 Stufen;
  // jede alte Stufe L öffnet mit min(L, 4) mindestens dieselben Zonen wie vorher.
  // Ein laufender Ausbau auf Stufe 5 wird abgebrochen und erstattet.
  5: (s) => {
    const b = s.buildings || {};
    b.portal = Math.min(b.portal || 0, 4);
    const c = s.construction;
    if (c && c.key === 'portal' && c.to > 4) {
      s.gold = (s.gold || 0) + 25_000;
      s.shards = (s.shards || 0) + 100;
      s.construction = null;
    }
    for (const sq of s.squads || []) { sq.monster = null; if (sq.mode === 'boss') sq.mode = 'farm'; }
    return s;
  },
  // v6 → v7: 💠 Mystische Münzen heißen jetzt 🍀 Mystischer Klee (Menge bleibt)
  6: (s) => {
    s.clover = (s.clover || 0) + (s.coins || 0);
    delete s.coins;
    return s;
  },
  // v7 → v8: Helden merken sich ihre Proviant-EXP (#046). Alte Helden starten mit 0.
  7: (s) => {
    for (const h of s.heroes || []) h.fedExp = h.fedExp || 0;
    return s;
  },
  // v8 → v9: Ruhestand mit Plätzen und passivem Einkommen (#022). Bisherige Ruheständler sind weg.
  8: (s) => {
    s.retired = Array.isArray(s.retired) ? s.retired : [];
    return s;
  },
  // v9 → v10: Eigenschaften (Traits). Vorhandene Helden und Angebote würfeln ihre Eigenschaften nach Seltenheit.
  9: (s) => {
    for (const h of s.heroes || []) if (HERO_BY_ID[h.heroId]) h.traits = rollTraits(h.heroId, h.rarity || RECRUIT.freeRarity);
    for (const o of s.recruits?.offers || []) if (o && HERO_BY_ID[o.heroId]) o.traits = rollTraits(o.heroId, o.rarity || RECRUIT.freeRarity);
    return s;
  },
  // v10 → v11: Angriffs-Timer statt 1-s-Ticks (#061), Platz 1 = Anführer (#051).
  // Damit sich der Kampf nicht plötzlich ändert, stellt sich jeder Trupp einmal nach Rolle auf
  // (Tank vorn, wie bisher die Kampfreihenfolge). Laufende Gegner werden neu gerufen.
  10: (s) => {
    const order = (uid) => {
      const h = (s.heroes || []).find(x => x.uid === uid);
      return h && HERO_BY_ID[h.heroId] ? ROLES[HERO_BY_ID[h.heroId].role].order : 9;
    };
    for (const sq of s.squads || []) {
      sq.bossTime = sq.bossTicks || 0;
      delete sq.bossTicks;
      sq.heroT = {};
      sq.monster = null;
      const filled = (sq.slots || []).filter(u => u != null);
      filled.sort((a, b) => order(a) - order(b));
      sq.slots = [...filled, ...Array(TENT_SIZE - filled.length).fill(null)];
    }
    return s;
  },
  // v12 → v13: 📜 Forschungsnotizen fallen weg, Forschung kostet 🔮 und braucht Zeit (`researching`).
  // Vorhandene 📜 werden 1:1 zu 🔮.
  12: (s) => {
    s.shards = (s.shards || 0) + (s.rp || 0);
    delete s.rp;
    s.researching = null;
    return s;
  },
  // v11 → v12: Tutorial ohne kostenlose Helden. Gildenhalle und erstes Zelt geben Gold (ONBOARDING.gold),
  // Tank, Heiler und Schaden werden angeworben (erstes Angebot = diese drei, `recruits.starter`).
  // Laufende Spielstände bekommen das Gold, das ihnen dadurch fehlt.
  11: (s) => {
    const heroes = s.heroes || [];
    s.recruits = s.recruits || { offers: [], nextRestockMs: 0, refreshes: 0, slots: 0 };
    const ob = s.onboarding || 0;
    if (ob <= 3 && !heroes.length) {
      s.recruits.starter = false;
      s.recruits.nextRestockMs = 0; // Startangebot sofort
      if (ob >= 2) s.gold = (s.gold || 0) + ONBOARDING.gold.hall;
      if (ob >= 3) s.gold = (s.gold || 0) + ONBOARDING.gold.camp;
    } else {
      s.recruits.starter = true;
      const done = new Set(s.questsDone || []);
      const has = (role) => heroes.some(h => HERO_BY_ID[h.heroId]?.role === role);
      for (const role of ['healer', 'dps']) {
        if (!done.has(role) && !has(role)) s.gold = (s.gold || 0) + RECRUIT.rarities[RECRUIT.freeRarity].cost;
      }
    }
    return s;
  },
  // v4 → v5: Rekrutierung mit Angeboten und Seltenheit. Vorhandene Helden sind „Fein“.
  4: (s) => {
    for (const h of s.heroes || []) h.rarity = RECRUIT.freeRarity;
    delete s.heroesPaid;
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
    else if (WEAPON_BY_ID[h.weapon].type !== weaponType(h)) { (s.armory ||= []).push(h.weapon); h.weapon = null; }
    if (!RECRUIT.rarities[h.rarity]) h.rarity = RECRUIT.freeRarity;
    h.level = Math.min(h.level, LEVEL_CAP_MAX);
    h.traits = cleanTraits(h.traits);
    if (!h.traits.length) h.traits = rollTraits(h.heroId, h.rarity);
  }
  s.armory = (s.armory || []).filter(w => WEAPON_BY_ID[w]);
  s.shop.offers = (s.shop.offers || []).filter(w => WEAPON_BY_ID[w]);
  s.recruits.offers = (s.recruits.offers || []).filter(o => o && HERO_BY_ID[o.heroId] && RECRUIT.rarities[o.rarity]);
  for (const o of s.recruits.offers) {
    o.traits = cleanTraits(o.traits);
    if (!o.traits.length) o.traits = rollTraits(o.heroId, o.rarity);
  }
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
// Wirkung (stat) → alle Knoten, die darauf wirken (Feld stat, sonst Knoten-Schlüssel)
const STAT_NODES = {};
for (const tree of Object.values(RESEARCH)) {
  for (const [key, n] of Object.entries(tree.nodes)) (STAT_NODES[n.stat || key] ??= []).push([key, n.per]);
}
// Summe aller Knoten einer Wirkung (Stufe × per)
export const rv = (s, stat) => (STAT_NODES[stat] || []).reduce((sum, [key, per]) => sum + researchLevel(s, key) * per, 0);

export const kitchenMult = (s) => (1 + BUILDINGS.kitchen.bonusPerLevel * s.buildings.kitchen) * (1 + rv(s, 'exp'));
export const prestigeAtk = (s) => 1 + MYSTIC.atk.per * s.mystic.atk;
export const prestigeHp  = (s) => 1 + MYSTIC.hp.per * s.mystic.hp;
export const goldMult    = (s) => (1 + MYSTIC.loot.per * s.mystic.loot) * (1 + rv(s, 'gold'));
export const shardMult   = (s) => (1 + MYSTIC.loot.per * s.mystic.loot) * (1 + rv(s, 'shards'));
export const regenMs     = (s) => Math.round(COMBAT.WOUND_MS * (1 - MYSTIC.regen.per * s.mystic.regen) * (1 - rv(s, 'regen')));
export const offlineMaxMs = (s) => GAME.OFFLINE_MAX_MS + rv(s, 'offline') * 60_000;
export const healMult    = (s) => 1 + rv(s, 'heal');
export const tempoBonus  = (s) => rv(s, 'speed');
export const reviveCost  = (s, level) => Math.round(F.reviveCost(level) * Math.max(0, 1 - rv(s, 'revive')));
export const bossTimeLimit = (s) => COMBAT.BOSS_TIME_LIMIT + rv(s, 'bosstime');
export const buildTimeMult = (s) => Math.max(0, 1 - rv(s, 'build'));
export const researchTimeMult = (s) => Math.max(0, 1 - rv(s, 'labspeed'));
export const rationChance = (s) => RATION_DROP.chance + rv(s, 'rations');
export const levelCap    = (s) => s.buildings.camp ? BUILDINGS.camp.levels[s.buildings.camp - 1].cap : 10;
export const treasuryMult = (s) => 1 + rv(s, 'treasury'); // Kassen-Optimierer: Halle + Ruhestand (Gold-Boni aus Siegen wirken hier nicht, #060)
export const hallGold    = (s) => s.buildings.hall ? Math.round(BUILDINGS.hall.levels[s.buildings.hall - 1].gold * treasuryMult(s)) : 0;
export const buildingUnlocked = (s, key) => s.buildings.hall >= BUILDINGS[key].unlockHall;
export const featureUnlocked  = (s, key) => s.buildings.hall >= FEATURES[key].unlockHall;
// Waffenkammer-Plätze nach Gildenhalle; armoryFree < 1 → voll
export const armorySlots = (state) => ARMORY_SLOTS[Math.min(ARMORY_SLOTS.length, Math.max(1, state.buildings.hall)) - 1];
export const rationSlots = (state) => RATION_SLOTS[Math.min(RATION_SLOTS.length, Math.max(1, state.buildings.hall)) - 1];
// Proviant der Güte g (0–5) einlagern, höchstens bis zum Lager-Limit. Alte Bestände darüber bleiben.
// Rückgabe: tatsächlich eingelagert
export function addRations(state, g, n) {
  const add = Math.max(0, Math.min(n, rationSlots(state) - state.rations[g]));
  state.rations[g] += add;
  return add;
}
export const armoryFree = (state) => armorySlots(state) - state.armory.length;

export const weaponType  = (hero) => {
  const d = heroDef(hero);
  return d.role === 'healer' ? WEAPON_FOR.healer : WEAPON_FOR[d.cls];
};
export { LEVEL_CAP_MAX };

const lvlStat = (o, level, rarity) => (o.base[rarity] ?? o.base[RECRUIT.freeRarity] ?? 0) + o.perLevel * (level - 1);
export const heroArmor = (level, rarity) => lvlStat(COMBAT.HERO_ARMOR, level, rarity);
export const heroPen = (level, rarity) => lvlStat(COMBAT.HERO_PEN, level, rarity);

export const rarityBonus = (r) => (RECRUIT.rarities[r] || RECRUIT.rarities[RECRUIT.freeRarity]).bonus;

export function heroStats(state, hero) {
  const def = heroDef(hero);
  const w = hero.weapon ? WEAPON_GRADES[WEAPON_BY_ID[hero.weapon].grade] : { atk: 0, hp: 0, pen: 0 };
  const rar = 1 + rarityBonus(hero.rarity);
  const t = heroBonus(hero);
  return {
    def,
    atk: F.heroAtk(def.baseAtk, hero.level, 1 + w.atk, rar * prestigeAtk(state) * (1 + rv(state, 'atk')) * (1 + t.atk)),
    maxHp: F.heroHp(def.baseHp, hero.level, rar * (1 + w.hp) * prestigeHp(state) * (1 + rv(state, 'hp')) * (1 + t.hp)),
    crit: Math.min(1, (def.crit || 0) + rv(state, 'crit') + t.crit),
    critMult: (COMBAT.CRIT_MULT + rv(state, 'critdmg')) * (1 + t.critdmg),
    defense: Math.min(COMBAT.DEF_CAP, ROLES[def.role].def + rv(state, 'def') + t.def), // Schadensreduktion in %
    armor: heroArmor(hero.level, hero.rarity) + rv(state, 'armor'), // DEF-Punkte nach Level, Seltenheit und Forschung
    pen: heroPen(hero.level, hero.rarity) + (w.pen || 0) + rv(state, 'pen'), // Durchdringung (Level + Waffe + Forschung)
    speed: t.speed,                 // eigenes Angriffstempo (+Anteil, verkürzt das Intervall)
    interval: CLASSES[def.cls]?.interval || 1, // Sekunden je Angriff nach Klasse (#061)
    heal: 1 + t.heal,               // Faktor auf die eigene Heilung
    regen: 1 - Math.min(0.9, t.regen), // Faktor auf die Verwundungszeit
    bossDmg: 1 - Math.min(0.9, t.boss), // Faktor auf Schaden von Bossen
    traits: t,
  };
}

// ---------- Eigenschaften (Traits) -------------------------------------
// Bonus einer Eigenschaft je Wert als Anteil (0.15 = 15 %), schon mit TRAIT_STATS[…].f
export const traitPct = (id, g) => (TRAITS[id]?.pct[g - 2] ?? 0) / 100;
export function traitBonus(traits) {
  const t = Object.fromEntries(Object.keys(TRAIT_STATS).map(k => [k, 0]));
  for (const { id, g } of traits || []) {
    const tr = TRAITS[id];
    if (!tr) continue;
    for (const k of tr.stats) t[k] += traitPct(id, g) * TRAIT_STATS[k].f;
  }
  return t;
}
// Trupp-Wert (TRAIT_STATS[…].squad): Summe aller Helden im Zelt
export const squadTrait = (heroes, key) => heroes.reduce((a, h) => a + heroBonus(h)[key], 0);
// Klassenbonus (CLASSES[…].bonus) als Anteil, schon mit TRAIT_STATS[…].f
export const classBonus = (cls) => {
  const b = CLASSES[cls]?.bonus;
  return b ? { stat: b[0], value: b[1] / 100 * TRAIT_STATS[b[0]].f } : null;
};
// Eigenschaften + Klassenbonus eines Helden
export function heroBonus(hero) {
  const t = traitBonus(hero.traits);
  const c = classBonus(HERO_BY_ID[hero.heroId]?.cls);
  if (c) t[c.stat] += c.value;
  return t;
}
// Spezialisierung = Spezialisierung der besten Eigenschaft (bei Gleichstand die erste)
export function traitSpec(traits) {
  let best = null;
  for (const x of traits || []) if (TRAITS[x.id] && (!best || x.g > best.g)) best = x;
  return best ? TRAITS[best.id].spec : null;
}
function cleanTraits(traits) {
  return (Array.isArray(traits) ? traits : []).filter(x => x && TRAITS[x.id] && TRAITS[x.id].pct[x.g - 2] != null);
}
function pickW(pool, rnd) {
  const sum = pool.reduce((a, o) => a + o.w, 0);
  let x = rnd() * sum;
  for (const o of pool) if ((x -= o.w) < 0) return o;
  return pool[pool.length - 1];
}
// Würfelt die Eigenschaften eines Helden nach Seltenheit und Rolle (TRAIT_RULES)
export function rollTraits(heroId, rarity, rnd = Math.random) {
  const role = HERO_BY_ID[heroId]?.role || 'dps';
  const n = TRAIT_RULES.count[rarity] || 1;
  const out = [];
  for (let i = 0; i < n; i++) {
    const drop = pickW(TRAIT_RULES.gradeDrop.map((w, k) => ({ w, k })), rnd).k;
    let g = Math.max(2, rarity - drop);
    // In der Güte verfügbar und noch nicht gewählt; notfalls eine Güte tiefer suchen
    let pool = [];
    for (; g >= 2 && !pool.length; g--) {
      pool = Object.entries(TRAITS)
        .filter(([id, tr]) => tr.pct[g - 2] != null && !out.some(x => x.id === id))
        .map(([id, tr]) => ({ id, w: TRAIT_RULES.specWeight[role][tr.spec] || 1 }));
      if (pool.length) break;
    }
    if (!pool.length) break;
    out.push({ id: pickW(pool, rnd).id, g });
  }
  return out.sort((a, b) => b.g - a.g);
}

export function squadOf(state, uid) {
  return state.squads.findIndex(sq => sq.slots.includes(uid));
}
export const reserveHeroes = (state) => state.heroes.filter(h => squadOf(state, h.uid) === -1);
export const activeHeroCount = (state) =>
  state.squads.slice(0, state.tentsUnlocked).reduce((n, sq) => n + sq.slots.filter(u => u != null).length, 0);
export const isOwned = (state, heroId) => state.heroes.some(h => h.heroId === heroId);

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

export function createHero(state, heroId, rarity = RECRUIT.freeRarity, traits = null) {
  const hero = { uid: state.nextUid++, heroId, rarity, level: 1, exp: 0, fedExp: 0, hp: 0, woundedUntil: 0, weapon: null,
    traits: traits ? structuredClone(traits) : rollTraits(heroId, rarity) };
  state.heroes.push(hero);
  hero.hp = heroStats(state, hero).maxHp;
  return hero;
}

// Gesamt-EXP eines Helden seit Lv. 1 (Gesamt-EXP + angesammelte EXP)
export const heroTotalExp = (hero) => HERO_LEVELS[hero.level - 1].totalExp + hero.exp;

// #046: Klee beim Ruhestand nach dem Kampf-Level: dem Level, das der Held nur mit
// Kampf-EXP hätte. Proviant zählt nicht, nimmt aber auch nichts weg.
export function heroRetire(hero) {
  const combat = Math.max(0, heroTotalExp(hero) - (hero.fedExp || 0));
  let lv = 1;
  while (lv < hero.level && HERO_LEVELS[lv].totalExp <= combat) lv += 1;
  return { combatLevel: lv, clover: F.retireClover(lv), full: F.retireClover(hero.level) };
}

// Gibt die Anzahl gewonnener Stufen zurück. Jede neue Stufe bringt die
// Level-Up-Belohnung: 🔮 (Feld rp), Proviant und Früchte.
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
    state.shards += r.rp; // Feld rp → 🔮
    r.rations.forEach((n, g) => { addRations(state, g, n); });
    state.fruit += r.fruit;
    if (!hero.woundedUntil) hero.hp += heroStats(state, hero).maxHp - oldMax;
  }
  if (hero.level >= cap) hero.exp = 0;
  return gained;
}

// Gildenkasse für einen 10-Min.-Zyklus: Gold der Gildenhalle + Ruhestand (#022), beides × treasuryMult.
// Aktive Helden haben kein passives Einkommen, nur Helden im Ruhestand (goldCycle/rpCycle aus heroLevels.js).
export const retireSlots = (s) => RETIRE_HOME.baseSlots + rv(s, 'archive');
export function retireIncome(s) {
  let gold = 0, rp = 0;
  for (const r of s.retired || []) {
    const L = HERO_LEVELS[Math.max(1, Math.min(HERO_LEVELS.length, r.level)) - 1];
    gold += L.goldCycle; rp += L.rpCycle;
  }
  return { gold: Math.round(gold * treasuryMult(s)), rp };
}
// 🔮 je Gildenkasse-Zyklus: Ruhestand + Forschung „Ätherkondensator“
export const cycleShards = (s) => retireIncome(s).rp + rv(s, 'shardgen');
// Platz im Ruhestand für ein Level: { ok, replace } (replace = Index des schwächsten, der geht)
export function retirePlace(s, level) {
  const list = s.retired || [];
  if (list.length < retireSlots(s)) return { ok: true, replace: -1 };
  let w = -1;
  list.forEach((r, i) => { if (w === -1 || r.level < list[w].level) w = i; });
  return w !== -1 && list[w].level < level ? { ok: true, replace: w } : { ok: false, replace: -1 };
}
// Held in den Ruhestand eintragen (nach Kampf-Level). Rückgabe: { placed, gone } (gone = verdrängter Eintrag)
export function addRetired(s, hero, level) {
  const p = retirePlace(s, level);
  if (!p.ok) return { placed: false, gone: null };
  const entry = { heroId: hero.heroId, level, rarity: hero.rarity };
  let gone = null;
  if (p.replace >= 0) [gone] = s.retired.splice(p.replace, 1, entry);
  else s.retired.push(entry);
  return { placed: true, gone };
}

export function payCycle(state) {
  const gold = hallGold(state);
  const inc = retireIncome(state);
  const rp = cycleShards(state); // Ruhestand (Feld rp) + Forschung
  state.gold += gold + inc.gold;
  state.shards += rp;
  return { gold: gold + inc.gold, rp, retireGold: inc.gold };
}

export function addLog(state, msg, squad = null, kind = '') {
  // z = Zone des Trupps beim Eintrag (#037), damit die Chronik zeigt, wo er gekämpft hat
  const z = squad != null ? state.squads[squad]?.zone : undefined;
  state.log.unshift({ t: state.lastTickMs, s: squad, ...(z ? { z } : {}), msg, kind });
  if (state.log.length > GAME.LOG_SIZE) state.log.length = GAME.LOG_SIZE;
}
