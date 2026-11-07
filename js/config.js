// =====================================================================
//  Aetherbastion: Rift Watch – zentrale Konfiguration
//  Alle Zahlen, Formeln, Kataloge. Balancing passiert NUR hier.
// =====================================================================

export const GAME = {
  title: 'Aetherbastion: Rift Watch',
  VERSION: '0.25.0',                  // bei JEDER Änderung erhöhen (Patch, bei neuen Funktionen Minor) – gleich wie CACHE_VERSION in sw.js
  BUILD: 'lokal',                    // ersetzt der Pages-Workflow durch „Nr. · Commit“
  SAVE_KEY: 'aetherbastion_save_v1',
  SAVE_VERSION: 7,
  TICK_MS: 1000,                     // feste Kampf-Ticks
  LOOP_MS: 250,                      // wie oft die Spielschleife nachsieht
  AUTOSAVE_MS: 10_000,
  OFFLINE_MAX_MS: 8 * 60 * 60 * 1000, // max. 8 Stunden Offline-Ertrag
  CATCHUP_THRESHOLD_MS: 30_000,      // größere Lücken → Offline-Berechnung statt Ticks
  OFFLINE_REPORT_MIN_MS: 60_000,     // ab hier erscheint der Offline-Rissbericht
  DEBUG_OFFLINE_MS: 15 * 60 * 1000,
  LOG_SIZE: 20,
};

import { ZONE_DATA, NORMAL_STAGES } from './data/stages.js';
import { BUILDING_DATA, BUILDING_ORDER, CYCLE_MS } from './data/buildings.js';
import { HERO_LEVELS, MAX_HERO_LEVEL } from './data/heroLevels.js';
export { NORMAL_STAGES, BUILDING_ORDER, CYCLE_MS, HERO_LEVELS };
export { WEAPONS, WEAPON_BY_ID, WEAPON_TYPES, WEAPON_FOR, WEAPON_GRADES, SHOP, DROP_GRADES } from './data/weapons.js';
export { RATIONS } from './data/specials.js';

export const CURRENCIES = {
  gold:   { icon: '🟡', name: 'Gold' },
  shards: { icon: '🔮', name: 'Ätherscherben' },
  clover: { icon: '🍀', name: 'Mystischer Klee' },
  rp:     { icon: '📜', name: 'Forschungsnotizen' },
};

// order: kleinere Zahl = steht weiter vorn (wird zuerst angegriffen)
export const ROLES = {
  // def   = Grund-Schadensreduktion der Rolle (0.25 = −25 % erlittener Schaden)
  // aggro = Gewicht beim Verteilen des Monsterschadens: Jeder Treffer wird auf
  //         alle fitten Helden im Verhältnis ihrer Gewichte aufgeteilt
  //         (Tank + Schaden + Heiler = 50 % / 30 % / 20 %).
  tank:    { name: 'Tank',              icon: '🛡️', order: 0, def: 0.25, aggro: 5 },
  dps:     { name: 'Schadensausteiler', icon: '⚔️', order: 1, def: 0.05, aggro: 3 },
  support: { name: 'Unterstützer',      icon: '📯', order: 2, def: 0.10, aggro: 3 },
  healer:  { name: 'Heiler',            icon: '✚',  order: 3, def: 0.08, aggro: 2 },
};

export const CLASSES = {
  waechter:   { name: 'Wächter',         sprite: 'HERO_WAECHTER',   color: '#8fc4ff' },
  krieger:    { name: 'Krieger',         sprite: 'HERO_KRIEGER',    color: '#f0c060' },
  widergaenger:{ name: 'Widergänger',    sprite: 'HERO_WIDERGAENGER', color: '#c98a6a' },
  waldlaeufer:{ name: 'Waldläufer',      sprite: 'HERO_WALDLAEUFER', color: '#8fd47a' },
  dieb:       { name: 'Dieb',            sprite: 'HERO_DIEB',       color: '#b9a3c9' },
  ingenieur:  { name: 'Ingenieur',       sprite: 'HERO_INGENIEUR',  color: '#e0a352' },
  elementar:  { name: 'Elementarmagier', sprite: 'HERO_ELEMENTARMAGIER', color: '#ff8a6b' },
  mesmer:     { name: 'Mesmer',          sprite: 'HERO_MESMER',     color: '#e07ad8' },
  nekromant:  { name: 'Nekromant',       sprite: 'HERO_NEKROMANT',  color: '#5fd6a8' },
};

// ---------------------------------------------------------------------
//  HELDEN-KATALOG
//  👉 Gilde: Hier einfach `name` und `title` (optional `account`) durch
//     die Charaktere eurer Gildenmitglieder ersetzen. Die `id` NICHT
//     ändern, sonst passen alte Spielstände nicht mehr.
//  buff (nur Unterstützer): 'macht' = +ATK fürs Team, 'eile' = Tempo
//  crit: Krit-Chance (0–1), vor allem für Schadensausteiler
// ---------------------------------------------------------------------
export const HEROES = [
  { id: 'h01', name: 'Mitglied 01', title: 'Schildwacht des Lagers',  account: 'Spieler.0001', cls: 'waechter',    role: 'tank',    baseHp: 260, baseAtk: 9 },
  { id: 'h02', name: 'Mitglied 02', title: 'Flamme der Zuversicht',   account: 'Spieler.0002', cls: 'waechter',    role: 'healer',  baseHp: 180, baseAtk: 7 },
  { id: 'h03', name: 'Mitglied 03', title: 'Bollwerk von Ascalon',    account: 'Spieler.0003', cls: 'krieger',     role: 'tank',    baseHp: 280, baseAtk: 8 },
  { id: 'h04', name: 'Mitglied 04', title: 'Klinge im Sturm',         account: 'Spieler.0004', cls: 'krieger',     role: 'dps',     baseHp: 160, baseAtk: 15, crit: 0.15 },
  { id: 'h05', name: 'Mitglied 05', title: 'Bannerträger der Wacht',  account: 'Spieler.0005', cls: 'krieger',     role: 'support', baseHp: 200, baseAtk: 9, buff: 'macht' },
  { id: 'h06', name: 'Mitglied 06', title: 'Stimme der Legenden',     account: 'Spieler.0006', cls: 'widergaenger', role: 'tank',   baseHp: 250, baseAtk: 10 },
  { id: 'h07', name: 'Mitglied 07', title: 'Druide des Hains',        account: 'Spieler.0007', cls: 'waldlaeufer', role: 'healer',  baseHp: 170, baseAtk: 7 },
  { id: 'h08', name: 'Mitglied 08', title: 'Pfeil der Wildnis',       account: 'Spieler.0008', cls: 'waldlaeufer', role: 'dps',     baseHp: 150, baseAtk: 15, crit: 0.20 },
  { id: 'h09', name: 'Mitglied 09', title: 'Schatten der Gassen',     account: 'Spieler.0009', cls: 'dieb',        role: 'dps',     baseHp: 135, baseAtk: 17, crit: 0.25 },
  { id: 'h10', name: 'Mitglied 10', title: 'Dolch im Nebel',          account: 'Spieler.0010', cls: 'dieb',        role: 'dps',     baseHp: 140, baseAtk: 16, crit: 0.22 },
  { id: 'h11', name: 'Mitglied 11', title: 'Mechanist der Werkbank',  account: 'Spieler.0011', cls: 'ingenieur',   role: 'healer',  baseHp: 175, baseAtk: 8 },
  { id: 'h12', name: 'Mitglied 12', title: 'Tüftler mit Turbo',       account: 'Spieler.0012', cls: 'ingenieur',   role: 'support', baseHp: 185, baseAtk: 9, buff: 'eile' },
  { id: 'h13', name: 'Mitglied 13', title: 'Funke des Feuers',        account: 'Spieler.0013', cls: 'elementar',   role: 'dps',     baseHp: 130, baseAtk: 18, crit: 0.15 },
  { id: 'h14', name: 'Mitglied 14', title: 'Sturm über der Ebene',    account: 'Spieler.0014', cls: 'elementar',   role: 'dps',     baseHp: 130, baseAtk: 17, crit: 0.18 },
  { id: 'h15', name: 'Mitglied 15', title: 'Meister der Trugbilder',  account: 'Spieler.0015', cls: 'mesmer',      role: 'support', baseHp: 170, baseAtk: 10, buff: 'eile' },
  { id: 'h16', name: 'Mitglied 16', title: 'Spiegel der Klingen',     account: 'Spieler.0016', cls: 'mesmer',      role: 'dps',     baseHp: 145, baseAtk: 15, crit: 0.20 },
  { id: 'h17', name: 'Mitglied 17', title: 'Hüter der Grabesstille',  account: 'Spieler.0017', cls: 'nekromant',   role: 'dps',     baseHp: 165, baseAtk: 15, crit: 0.12 },
  { id: 'h18', name: 'Mitglied 18', title: 'Flüsterer der Seuche',    account: 'Spieler.0018', cls: 'nekromant',   role: 'support', baseHp: 180, baseAtk: 10, buff: 'macht' },
  { id: 'h19', name: 'Mitglied 19', title: 'Erbe der Nebel',          account: 'Spieler.0019', cls: 'widergaenger', role: 'dps',    baseHp: 165, baseAtk: 15, crit: 0.15 },
  { id: 'h20', name: 'Mitglied 20', title: 'Wächter des Pakts',       account: 'Spieler.0020', cls: 'waechter',    role: 'dps',     baseHp: 170, baseAtk: 14, crit: 0.12 },
];
export const HERO_BY_ID = Object.fromEntries(HEROES.map(h => [h.id, h]));

// Onboarding-Startaufstellung für Zelt 1: Tank, Heiler, Schadensausteiler
export const ONBOARDING = { tank: 'h01', healer: 'h07', dps: 'h13' };

// ---------------------------------------------------------------------
//  AUFTRÄGE nach dem Onboarding (Reihenfolge nach dem CQHT-Tutorial,
//  eigene Texte). Der Spielstand merkt sich erledigte `id`s:
//  👉 ids nie ändern; neue Aufträge dürfen überall eingefügt werden.
//  goal.type: stage (zone, stage) · heroLevel (level) · building (key, level)
//             freeHero (hero) – Held wird über den Auftrag kostenlos aufgenommen
//             weapon · research (n Stufen gesamt) · ration (n gefüttert)
//             tents (n Zelte) · squadFull (squad = Zelt-Index 0–3)
//  tab: Reiter, zu dem „Hingehen“ führt
// ---------------------------------------------------------------------
export const QUESTS = [
  { id: 'healer', icon: '✚', title: 'Verstärkung: Heilung', tab: 'squads',
    text: 'Jemand mit Heilkräften meldet sich. Nimm die Verstärkung in Zelt 1 auf.',
    goal: { type: 'freeHero', hero: ONBOARDING.healer }, reward: {} },
  { id: 'boss1', icon: '👑', title: 'Die Banditen-Anführerin', tab: 'portal',
    text: 'Sie hält den Riss an der Alten Mühle offen. Fordere sie heraus.',
    goal: { type: 'stage', zone: 1, stage: 1 }, reward: { gold: 100 } },
  { id: 'dps', icon: '⚔️', title: 'Verstärkung: Schaden', tab: 'squads',
    text: 'Jemand mit Feuerkraft will mit. Damit ist Zelt 1 voll.',
    goal: { type: 'freeHero', hero: ONBOARDING.dps }, reward: {} },
  { id: 'lv5', icon: '⬆️', title: 'Erste Erfahrung', tab: 'squads',
    text: 'Bring einen Helden auf Lv. 5.',
    goal: { type: 'heroLevel', level: 5 }, reward: { gold: 150 } },
  { id: 'stage3', icon: '⚔️', title: 'Tiefer ins Königintal', tab: 'portal',
    text: 'Besiege den Boss von Stufe 3 im Königintal.',
    goal: { type: 'stage', zone: 1, stage: 3 }, reward: { gold: 200, shards: 1 } },
  { id: 'hall2', icon: '🏛️', title: 'Eine größere Halle', tab: 'camp',
    text: 'Baue die Gildenhalle auf Stufe 2 aus.',
    goal: { type: 'building', key: 'hall', level: 2 }, reward: { gold: 300 } },
  { id: 'kitchen', icon: '🍲', title: 'Warme Mahlzeiten', tab: 'camp',
    text: 'Baue die Feldküche. Satte Helden lernen schneller.',
    goal: { type: 'building', key: 'kitchen', level: 1 }, reward: { gold: 200 } },
  { id: 'weapon', icon: '🗡️', title: 'Bewaffnet', tab: 'squads',
    text: 'Rüste einen Helden mit einer Waffe aus.',
    goal: { type: 'weapon' }, reward: { shards: 2 } },
  { id: 'zone1', icon: '🏆', title: 'Das Königintal ist frei', tab: 'portal',
    text: 'Besiege alle fünf Bosse im Königintal.',
    goal: { type: 'stage', zone: 1, stage: 5 }, reward: { gold: 500, rp: 3 } },
  { id: 'lab', icon: '🔬', title: 'Asura-Know-how', tab: 'camp',
    text: 'Baue das Asura-Labor.',
    goal: { type: 'building', key: 'lab', level: 1 }, reward: { rp: 3 } },
  { id: 'research1', icon: '📜', title: 'Erste Forschung', tab: 'lab',
    text: 'Erforsche eine beliebige Stufe.',
    goal: { type: 'research', n: 1 }, reward: { gold: 400 } },
  { id: 'lv10', icon: '⬆️', title: 'Erfahrene Wacht', tab: 'squads',
    text: 'Bring einen Helden auf Lv. 10.',
    goal: { type: 'heroLevel', level: 10 }, reward: { shards: 2 } },
  { id: 'camp2', icon: '⛺', title: 'Mehr Platz im Lager', tab: 'camp',
    text: 'Baue das Zeltlager auf Stufe 2 aus (Level-Cap 20).',
    goal: { type: 'building', key: 'camp', level: 2 }, reward: { gold: 800 } },
  { id: 'ration', icon: '🍞', title: 'Proviant verteilen', tab: 'squads',
    text: 'Gib einem Helden Proviant (🎒 Inventar).',
    goal: { type: 'ration', n: 1 }, reward: { rp: 3 } },
  { id: 'forge', icon: '⚒️', title: 'Charr-Stahl', tab: 'camp',
    text: 'Baue die Charr-Schmiede.',
    goal: { type: 'building', key: 'forge', level: 1 }, reward: { shards: 2 } },
  { id: 'portal2', icon: '🌀', title: 'Der Riss weitet sich', tab: 'portal',
    text: 'Baue das Riss-Portal auf Stufe 2 aus (braucht 🔮).',
    goal: { type: 'building', key: 'portal', level: 2 }, reward: { gold: 1_000 } },
  { id: 'zone2', icon: '🏆', title: 'Der Caledon-Wald', tab: 'portal',
    text: 'Besiege alle Bosse im Caledon-Wald.',
    goal: { type: 'stage', zone: 2, stage: 5 }, reward: { gold: 1_500, rp: 5 } },
  { id: 'tent2', icon: '⛺', title: 'Ein zweiter Trupp', tab: 'squads',
    text: 'Schlage Zelt 2 auf (ab Gildenhalle 3).',
    goal: { type: 'tents', n: 2 }, reward: { shards: 5 } },
  { id: 'squad2', icon: '🛡️', title: 'Volle Besetzung', tab: 'squads',
    text: 'Besetze Zelt 2 mit Tank, Heiler und Schaden.',
    goal: { type: 'squadFull', squad: 1 }, reward: { gold: 2_000 } },
  { id: 'zone3', icon: '🏆', title: 'Die Wanderer-Hügel', tab: 'portal',
    text: 'Besiege alle Bosse in den Wanderer-Hügeln.',
    goal: { type: 'stage', zone: 3, stage: 5 }, reward: { gold: 3_000, rp: 10 } },
  { id: 'zone4', icon: '🏆', title: 'Die Provinz Metrica', tab: 'portal',
    text: 'Besiege alle Bosse in der Provinz Metrica.',
    goal: { type: 'stage', zone: 4, stage: 5 }, reward: { gold: 5_000, rp: 12 } },
  { id: 'zone5', icon: '🏆', title: 'Die Ebenen von Aschfurt', tab: 'portal',
    text: 'Besiege alle Bosse in den Ebenen von Aschfurt.',
    goal: { type: 'stage', zone: 5, stage: 5 }, reward: { gold: 8_000, rp: 15 } },
  { id: 'zone6', icon: '🏆', title: 'Caudecus’ Anwesen', tab: 'portal',
    text: 'Alle Spuren führen zurück ins Königintal. Besiege alle Bosse in Caudecus’ Anwesen.',
    goal: { type: 'stage', zone: 6, stage: 5 }, reward: { gold: 12_000, rp: 20 } },
];

// ---------------------------------------------------------------------
//  KAMPF
// ---------------------------------------------------------------------
export const COMBAT = {
  LEVEL_DIFF: 0.8,         // Schwierigkeit d = Stufen-Level × 0,8 (CQHT „Lv.“)
  BOSS_DIFF_BONUS: 1,      // Boss rechnet mit Schwierigkeit + 1 …
  BOSS_HP_MULT: 4,         // … und hat zusätzlich ×4 LP
  BOSS_ATK_MULT: 1.3,
  BOSS_TIME_LIMIT: 90,     // Sekunden; danach gilt die Herausforderung als gescheitert
  BOSS_COOLDOWN: 90,       // Sekunden Pause nach jeder Herausforderung (Sieg, Niederlage, Abbruch)
  BOSS_GOLD_MULT: 10,
  BOSS_EXP_MULT: 6,
  BOSS_SHARDS_PER_ZONE: 1, // Boss droppt garantiert Zone × diesen Wert (×3 auf schweren Stufen)
  WOUND_MS: 90_000,        // Regeneration nach 0 LP
  KILL_HEAL: 0.10,         // Heilung nach jedem Sieg (Anteil max. LP)
  CRIT_MULT: 2,
  HEAL_MULT: 1.8,          // Heilung = ATK × HEAL_MULT
  HEALER_ATK_FACTOR: 0.4,  // Heiler greifen nebenbei schwach an
  SUPPORT_ATK_FACTOR: 0.7,
  MIGHT_BONUS: 0.12,       // Macht: +12 % Team-ATK je Unterstützer
  EILE_BONUS: 0.15,        // Eile: +15 % Chance auf Zusatzangriff je Unterstützer
  DEF_CAP: 0.75,           // max. Schadensreduktion
  SHARD_CHANCE: 0.05,
};

// Riss-Zonen aus data/stages.js; Schwierigkeit je Stufe berechnen.
// Bis Lv. 59 zählt das Level, auf Lv.-60-Stufen (Zonen 8–10, schwer, legendär)
// steigt die Schwierigkeit mit den CQHT-Kosten weiter.
export const ZONES = ZONE_DATA.map(z => ({
  ...z,
  stages: z.stages.map((st, i) => ({
    ...st,
    index: i + 1,
    d: st.level < 60 ? st.level * COMBAT.LEVEL_DIFF : 60 * COMBAT.LEVEL_DIFF + (st.cost - 1000) / 500,
  })),
}));
export const TOTAL_NORMAL = ZONES.length * NORMAL_STAGES;

// ---------------------------------------------------------------------
//  FORMELN
// ---------------------------------------------------------------------
export const F = {
  heroAtk: (baseAtk, level, gearMult = 1, bonusMult = 1) =>
    baseAtk * (1 + 0.08 * (level - 1)) * gearMult * bonusMult,
  heroHp: (baseHp, level, bonusMult = 1) =>
    baseHp * (1 + 0.10 * (level - 1)) * bonusMult,
  monsterHp: (d) => 60 * Math.pow(1.10, d),
  monsterAtk: (d) => 6 * Math.pow(1.085, d),
  goldPerKill: (d) => 5 * Math.pow(1.12, d),
  expPerKill: (d) => 8 * Math.pow(1.13, d),
  // EXP-Kurve aus data/heroLevels.js (CQHT „Total XP“)
  expToNext: (level) => level >= MAX_HERO_LEVEL ? Infinity
    : HERO_LEVELS[level].totalExp - HERO_LEVELS[level - 1].totalExp,
  retireClover: (level) => Math.floor((level * level) / 100),
  reviveCost: (level) => Math.round(15 * Math.pow(level, 1.5)),
  researchCost: (base, toLevel) => Math.round(base * Math.pow(toLevel, 1.6)),
};
export const LEVEL_CAP_MAX = MAX_HERO_LEVEL; // 60

// ---------------------------------------------------------------------
//  REKRUTIERUNG (Gildenhalle) – wechselnde Angebote wie im Waffenladen
//  tiers: ab Gildenhallen-Stufe `hall` gibt es `slots` Angebote, neue alle `restockMin` Minuten.
//  refreshBase: „Liste erneuern“ kostet 100 🟡 und verdoppelt sich je Versuch;
//  beim automatischen Nachschub wird der Preis zurückgesetzt.
//  rarities: Seltenheit (Namen/Farben wie WEAPON_GRADES 2–6) → Preis und
//  Bonus auf LP und ATK. Kostenlose Helden (Onboarding, Aufträge) sind „Fein“.
//  odds: Würfel-Gewichte der Seltenheiten (in %) ab Gildenhallen-Stufe `hall`.
//  Je größer die Halle, desto öfter kommen seltene Rekruten.
// ---------------------------------------------------------------------
export const RECRUIT = {
  tiers: [
    { hall: 1, slots: 2, restockMin: 30 },
    { hall: 3, slots: 4, restockMin: 25 },
    { hall: 5, slots: 6, restockMin: 20 },
  ],
  refreshBase: 100,
  rarities: {
    2: { cost: 100,    bonus: 0 },     // Fein
    3: { cost: 500,    bonus: 0.10 },  // Meisterwerk
    4: { cost: 2_500,  bonus: 0.20 },  // Selten
    5: { cost: 5_000,  bonus: 0.35 },  // Exotisch
    6: { cost: 10_000, bonus: 0.50 },  // Aufgestiegen
  },
  odds: [
    //            Fein  Meister  Selten  Exotisch  Aufgest.
    { hall: 1, w: { 2: 70, 3: 25, 4: 5,  5: 0,  6: 0 } },
    { hall: 3, w: { 2: 50, 3: 30, 4: 15, 5: 5,  6: 0 } },
    { hall: 5, w: { 2: 35, 3: 30, 4: 20, 5: 12, 6: 3 } },
    { hall: 7, w: { 2: 20, 3: 30, 4: 25, 5: 17, 6: 8 } },
    { hall: 9, w: { 2: 10, 3: 25, 4: 30, 5: 22, 6: 13 } },
  ],
  freeRarity: 2,
};
export const RETIRE_MIN_LEVEL = 20;

// ---------------------------------------------------------------------
//  GEBÄUDE (Tabellen in data/buildings.js)
//  Ätherscherben für das Riss-Portal sind eine eigene Ergänzung.
// ---------------------------------------------------------------------
export const PORTAL_SHARDS = [0, 15, 40, 100]; // je Zielstufe 1–4
export const BUILDINGS = Object.fromEntries(Object.entries(BUILDING_DATA).map(([k, b]) => [k, { ...b, max: b.levels.length }]));

// Freischaltungen nach Gildenhallen-Stufe (wird im Gildenlager angezeigt)
export const FEATURES = {
  mystic: { name: 'Mystische Schmiede (Ruhestand)', unlockHall: 5 },
};

// Waffenkammer: Plätze je Gildenhallen-Stufe (Index 0 = Stufe 1). Ist sie voll,
// bleiben Boss-Drops liegen und der Laden verkauft nichts mehr. Aufräumen:
// Standard-Auswahl der Güten (WEAPON_GRADES) im „Aufräumen“-Dialog.
// Oberfläche
export const UI = {
  QUEST_COLLAPSE_PX: 40,   // ab so viel Scrollen im Inhalt klappt das Auftrags-Banner ein (#038)
};

export const ARMORY_SLOTS = [20, 25, 30, 40, 50, 60, 70, 85, 100];
export const ARMORY_CLEANUP_DEFAULT = [1, 2, 3];

// Proviant (🍞) aus Boss-Siegen (#045). Erster Sieg über eine Stufe: volle Menge aus stages.js.
// Danach nur mit chance und amount [min, max] Stück. Lager je Güte wächst mit der Gildenhalle.
export const RATION_DROP = { chance: 0.25, amount: [1, 2] };
export const RATION_SLOTS = [30, 35, 40, 50, 60, 70, 80, 90, 100];

// Zelte (= Trupps). Zelt 1 ab Start.
export const TENTS = [
  { hall: 1, gold: 0 },
  { hall: 3, gold: 1_500 },
  { hall: 6, gold: 40_000 },
  { hall: 9, gold: 900_000 },
];
export const TENT_SIZE = 3;

// ---------------------------------------------------------------------
//  ASURA-LABOR – Forschungsbäume (bezahlt mit 📜, CQHT: Honor)
//  tier: Stufe im Baum; benötigt Asura-Labor ≥ TIER_LAB[tier]
//  req:  [Knoten, Mindeststufe] – Voraussetzung im selben Baum
//  per:  Wirkung je Stufe; base: Grundkosten in 📜
// ---------------------------------------------------------------------
export const TIER_LAB = { 1: 1, 2: 3, 3: 5 };
export const RESEARCH = {
  offense: { name: 'Offensive', icon: '⚔️', nodes: {
    atk:     { name: 'Kalibrierte Klingen',   tier: 1, max: 5, per: 0.04, unit: '% ATK',            base: 10 },
    speed:   { name: 'Chrono-Beschleuniger',  tier: 2, max: 5, per: 0.05, unit: '% Angriffstempo',  base: 25, req: ['atk', 2] },
    crit:    { name: 'Präzisionsoptik',       tier: 2, max: 5, per: 0.02, unit: '% Krit-Chance',    base: 25, req: ['atk', 2] },
    critdmg: { name: 'Überladungskristall',   tier: 3, max: 5, per: 0.10, unit: '% Krit-Schaden',   base: 60, req: ['crit', 3] },
  } },
  defense: { name: 'Defensive', icon: '🛡️', nodes: {
    hp:      { name: 'Verstärkte Panzerung',  tier: 1, max: 5, per: 0.05, unit: '% HP',             base: 10 },
    def:     { name: 'Schutzfeld-Generator',  tier: 2, max: 5, per: 0.03, unit: '% DEF (Schadensreduktion)', base: 25, req: ['hp', 2] },
    heal:    { name: 'Heilmatrix',            tier: 2, max: 5, per: 0.08, unit: '% Heilung',        base: 25, req: ['hp', 2] },
    regen:   { name: 'Regenerations-Kapsel',  tier: 3, max: 5, per: 0.08, unit: '% Regenerationszeit', base: 60, req: ['heal', 3], sign: '−' },
  } },
  logistics: { name: 'Logistik', icon: '📦', nodes: {
    gold:    { name: 'Goldwandler',           tier: 1, max: 5, per: 0.05, unit: '% Gold',           base: 10 },
    exp:     { name: 'Wissensspeicher',       tier: 2, max: 5, per: 0.05, unit: '% EXP',            base: 25, req: ['gold', 2] },
    shards:  { name: 'Ätherresonator',        tier: 2, max: 5, per: 0.10, unit: '% Scherben-Chance', base: 25, req: ['gold', 2] },
    offline: { name: 'Stasis-Feld',           tier: 3, max: 4, per: 30,   unit: ' Min. Offline-Zeit', base: 60, req: ['exp', 3], flat: true },
  } },
};
export const RESEARCH_ORDER = ['offense', 'defense', 'logistics'];

// ---------------------------------------------------------------------
//  MYSTISCHE SCHMIEDE (Prestige) – je 5 Stufen
// ---------------------------------------------------------------------
export const MYSTIC = {
  atk:   { name: 'Geschärfte Klingen', icon: '⚔️', per: 0.08, unit: '% Trupp-ATK', sign: '+', costs: [4, 10, 22, 45, 90] },
  hp:    { name: 'Gehärtete Rüstung',  icon: '🛡️', per: 0.08, unit: '% HP',        sign: '+', costs: [4, 10, 22, 45, 90] },
  regen: { name: 'Lebensquell',        icon: '💧', per: 0.12, unit: '% Regenerationszeit', sign: '−', costs: [3, 8, 18, 36, 72] },
  loot:  { name: 'Glücksbringer',      icon: '🍀', per: 0.10, unit: '% Gold & Scherben', sign: '+', costs: [5, 12, 26, 52, 100] },
};
export const MYSTIC_ORDER = ['atk', 'hp', 'regen', 'loot'];

// Neu-Würfeln (Waffenladen, Rekruten): Der verdoppelte Preis für „erneuern“ lässt sich
// mit 🍀 Mystischem Klee wieder auf den Startpreis setzen.
export const REROLL_RESET_CLOVER = 2;
