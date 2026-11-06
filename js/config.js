// =====================================================================
//  Aetherbastion: Rift Watch – zentrale Konfiguration
//  Alle Zahlen, Formeln, Kataloge. Balancing passiert NUR hier.
// =====================================================================

export const GAME = {
  title: 'Aetherbastion: Rift Watch',
  SAVE_KEY: 'aetherbastion_save_v1',
  SAVE_VERSION: 1,
  TICK_MS: 1000,                     // feste Kampf-Ticks
  LOOP_MS: 250,                      // wie oft die Spielschleife nachsieht
  AUTOSAVE_MS: 10_000,
  OFFLINE_MAX_MS: 8 * 60 * 60 * 1000, // max. 8 Stunden Offline-Ertrag
  CATCHUP_THRESHOLD_MS: 30_000,      // größere Lücken → Offline-Berechnung statt Ticks
  OFFLINE_REPORT_MIN_MS: 60_000,     // ab hier erscheint der Offline-Rissbericht
  DEBUG_OFFLINE_MS: 15 * 60 * 1000,
  LOG_SIZE: 20,
};

export const CURRENCIES = {
  gold:   { icon: '🪙', name: 'Gold' },
  shards: { icon: '🔮', name: 'Ätherscherben' },
  coins:  { icon: '💠', name: 'Mystische Münzen' },
};

// order: kleinere Zahl = steht weiter vorn (wird zuerst angegriffen)
export const ROLES = {
  tank:    { name: 'Tank',              icon: '🛡️', order: 0 },
  dps:     { name: 'Schadensausteiler', icon: '⚔️', order: 1 },
  support: { name: 'Unterstützer',      icon: '📯', order: 2 },
  healer:  { name: 'Heiler',            icon: '✚',  order: 3 },
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
//  ZONEN (Riss-Regionen) – je 10 Wellen, dann Boss
//  portal: benötigte Riss-Portal-Stufe. Zusätzlich muss der Boss der
//  vorherigen Zone einmal besiegt worden sein.
// ---------------------------------------------------------------------
export const ZONES = [
  { id: 1, name: 'Kryta', short: 'Kryta', portal: 1, mobs: [
      { name: 'Banditen-Plünderer', sprite: 'MOB_BANDIT' },
      { name: 'Zentauren-Späher',   sprite: 'MOB_ZENTAUR' },
      { name: 'Sumpf-Skale',        sprite: 'MOB_SKALE' },
      { name: 'Kryptis-Splitter',   sprite: 'MOB_KRYPTIS_SPLITTER' },
    ], boss: { name: 'Zentauren-Kriegsherr', sprite: 'BOSS_ZENTAUR_KRIEGSHERR' } },
  { id: 2, name: 'Zittergipfel', short: 'Zitterg.', portal: 2, mobs: [
      { name: 'Eiswolf',            sprite: 'MOB_EISWOLF' },
      { name: 'Sohn des Svanir',    sprite: 'MOB_SVANIR' },
      { name: 'Grawl-Schamane',     sprite: 'MOB_GRAWL' },
      { name: 'Kryptis-Frostjäger', sprite: 'MOB_KRYPTIS_FROST' },
    ], boss: { name: 'Eisbrut-Koloss', sprite: 'BOSS_EISBRUT' } },
  { id: 3, name: 'Kristallwüste', short: 'Wüste', portal: 3, mobs: [
      { name: 'Erweckter Soldat',   sprite: 'MOB_ERWECKTER' },
      { name: 'Sandhai',            sprite: 'MOB_SANDHAI' },
      { name: 'Wüsten-Hydra',       sprite: 'MOB_HYDRA' },
      { name: 'Kryptis-Plünderer',  sprite: 'MOB_KRYPTIS_PLUENDERER' },
    ], boss: { name: 'Erweckter Champion', sprite: 'BOSS_ERWECKTER_CHAMPION' } },
  { id: 4, name: 'Maguuma-Dschungel', short: 'Maguuma', portal: 4, mobs: [
      { name: 'Mordrem-Ranke',      sprite: 'MOB_MORDREM_RANKE' },
      { name: 'Mordrem-Wolf',       sprite: 'MOB_MORDREM_WOLF' },
      { name: 'Dschungel-Raptor',   sprite: 'MOB_RAPTOR' },
      { name: 'Kryptis-Lauerer',    sprite: 'MOB_KRYPTIS_LAUERER' },
    ], boss: { name: 'Mordrem-Teragriff', sprite: 'BOSS_TERAGRIFF' } },
  { id: 5, name: 'Die Nebel', short: 'Nebel', portal: 5, mobs: [
      { name: 'Nebel-Phantom',      sprite: 'MOB_NEBELPHANTOM' },
      { name: 'Kryptis-Dämon',      sprite: 'MOB_KRYPTIS_DAEMON' },
      { name: 'Kryptis-Peiniger',   sprite: 'MOB_KRYPTIS_PEINIGER' },
      { name: 'Kryptis-Verschlinger', sprite: 'MOB_KRYPTIS_VERSCHLINGER' },
    ], boss: { name: 'Kryptis-Risstyrann', sprite: 'BOSS_KRYPTIS_TYRANN' } },
];

// ---------------------------------------------------------------------
//  KAMPF
// ---------------------------------------------------------------------
export const COMBAT = {
  WAVES_PER_ZONE: 10,      // Welle 11 = Boss
  BOSS_HP_MULT: 4,
  BOSS_ATK_MULT: 1.3,
  BOSS_GOLD_MULT: 8,
  BOSS_EXP_MULT: 5,
  BOSS_SHARDS_PER_ZONE: 1, // Boss droppt garantiert Zone × diesen Wert
  WOUND_MS: 90_000,        // Regeneration nach 0 LP
  WAVE_HEAL: 0.10,         // Heilung zwischen zwei Wellen (Anteil max. LP)
  CRIT_MULT: 2,
  HEAL_MULT: 1.8,          // Heilung = ATK × HEAL_MULT
  HEALER_ATK_FACTOR: 0.4,  // Heiler greifen nebenbei schwach an
  SUPPORT_ATK_FACTOR: 0.7,
  MIGHT_BONUS: 0.12,       // Macht: +12 % Team-ATK je Unterstützer
  EILE_BONUS: 0.15,        // Eile: +15 % Chance auf Zusatzangriff je Unterstützer
  SHARD_CHANCE: 0.05,
};

// ---------------------------------------------------------------------
//  FORMELN
// ---------------------------------------------------------------------
export const F = {
  heroAtk: (baseAtk, level, forgeMult = 1, prestigeMult = 1) =>
    baseAtk * (1 + 0.08 * (level - 1)) * forgeMult * prestigeMult,
  heroHp: (baseHp, level, prestigeMult = 1) =>
    baseHp * (1 + 0.10 * (level - 1)) * prestigeMult,
  difficulty: (zone, wave) => (zone - 1) * 10 + wave,
  monsterHp: (d) => 60 * Math.pow(1.18, d),
  monsterAtk: (d) => 6 * Math.pow(1.15, d),
  goldPerKill: (d) => 5 * Math.pow(1.14, d),
  expPerKill: (d) => 8 * Math.pow(1.15, d),
  expToNext: (level) => 50 * Math.pow(1.12, level),
  recruitCost: (n) => Math.round(100 * Math.pow(2.2, n - 1)), // n = n-ter gekaufter Held
  buildCost: (base, level) => Math.round(base * Math.pow(1.6, level - 1)), // level = Zielstufe
  retireCoins: (level) => Math.floor((level * level) / 100),
  reviveCost: (level) => Math.round(15 * Math.pow(level, 1.5)),
  levelCap: (campLevel) => Math.max(1, campLevel) * 10,
};
export const LEVEL_CAP_MAX = 80;
export const RETIRE_MIN_LEVEL = 20;

// ---------------------------------------------------------------------
//  GEBÄUDE
//  cost: Basiswerte, Kosten = basis × 1.6^(Zielstufe − 1)
//  Regel: Kein Gebäude darf über der Gildenhallen-Stufe liegen
//  (Zeltlager-Stufe L+1 braucht Gildenhalle ≥ L+1).
// ---------------------------------------------------------------------
export const BUILDINGS = {
  hall:    { name: 'Gildenhalle',  icon: '🏛️', max: 10, cost: { gold: 250 },
             desc: 'Hauptgebäude. Begrenzt alle anderen Gebäude, schaltet Zelte frei.' },
  camp:    { name: 'Zeltlager',    icon: '⛺', max: 8,  cost: { gold: 180 },
             desc: 'Level-Cap aller Helden = Stufe × 10.' },
  kitchen: { name: 'Feldküche',    icon: '🍲', max: 10, cost: { gold: 140 }, bonusPerLevel: 0.05,
             desc: '+5 % EXP pro Stufe.' },
  forge:   { name: 'Schmiede',     icon: '⚒️', max: 10, cost: { gold: 160 }, bonusPerLevel: 0.05,
             desc: '+5 % ATK pro Stufe.' },
  portal:  { name: 'Riss-Portal',  icon: '🌀', max: 5,  cost: { gold: 400, shards: 4 },
             desc: 'Stufe bestimmt die verfügbaren Riss-Zonen.' },
};
export const BUILDING_ORDER = ['hall', 'camp', 'kitchen', 'forge', 'portal'];

// Zelte (= Trupps). Zelt 1 ab Start.
export const TENTS = [
  { hall: 1, gold: 0 },
  { hall: 3, gold: 1_500 },
  { hall: 6, gold: 40_000 },
  { hall: 9, gold: 900_000 },
];
export const TENT_SIZE = 3;

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
