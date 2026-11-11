// =====================================================================
//  Aetherbastion: Rift Watch – zentrale Konfiguration
//  Alle Zahlen, Formeln, Kataloge. Balancing passiert NUR hier.
// =====================================================================

export const GAME = {
  title: 'Aetherbastion: Rift Watch',
  VERSION: '0.42.0',                  // bei JEDER Änderung erhöhen (Patch, bei neuen Funktionen Minor) – gleich wie CACHE_VERSION in sw.js
  CHANGELOG_URL: 'https://github.com/cblte/aetherbastion-rift-watch/blob/main/CHANGELOG.md', // Link in den Einstellungen
  BUILD: 'lokal',                    // ersetzt der Pages-Workflow durch „Nr. · Commit“
  SAVE_KEY: 'aetherbastion_save_v1',
  SAVE_VERSION: 13,
  TICK_MS: 100,                      // Simulationsschritt (10×/s). Ein Tick lässt nur Zeit laufen, Angriffe kommen über Timer (#061)
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
import { RESEARCH_TIME } from './data/research.js';
export { NORMAL_STAGES, BUILDING_ORDER, CYCLE_MS, HERO_LEVELS };
export { WEAPONS, WEAPON_BY_ID, WEAPON_TYPES, WEAPON_FOR, WEAPON_GRADES, SHOP, DROP_GRADES } from './data/weapons.js';
export { RATIONS } from './data/specials.js';

export const CURRENCIES = {
  gold:   { icon: '🟡', name: 'Gold' },
  shards: { icon: '🔮', name: 'Ätherscherben' },
  clover: { icon: '🍀', name: 'Mystischer Klee' },
};

// order: kleinere Zahl = steht weiter vorn (wird zuerst angegriffen)
export const ROLES = {
  // def   = Grund-Schadensreduktion der Rolle (0.25 = −25 % erlittener Schaden)
  // aggro = Gewicht bei der Zielwahl der Gegner (#051): Nahkampf-Rest hinter dem Anführer,
  //         Fernkampf-Ziel. Siehe COMBAT.LEADER_SHARE.
  tank:    { name: 'Tank',              icon: '🛡️', order: 0, def: 0.25, aggro: 5 },
  dps:     { name: 'Schadensausteiler', icon: '⚔️', order: 1, def: 0.05, aggro: 3 },
  support: { name: 'Unterstützer',      icon: '📯', order: 2, def: 0.10, aggro: 3 },
  healer:  { name: 'Heiler',            icon: '✚',  order: 3, def: 0.08, aggro: 2 },
};

// Klassen (GW2-Berufe). Unabhängig von der Rolle: Ein Wächter kann Tank,
// Heiler, Unterstützer oder Schaden sein. Die Klasse bestimmt
//   - die Waffenart (WEAPON_FOR in js/data/weapons.js; Heiler immer Fokus)
//   - einen festen Klassenbonus: bonus = [Wert aus TRAIT_STATS, Prozent],
//     gerechnet wie eine Eigenschaft (mit dem Faktor f, Trupp-Werte für den Trupp)
//   - interval: Sekunden zwischen zwei Angriffen (#061). Schaden je Treffer = ATK × interval,
//     damit alle Klassen gleich viel Schaden pro Sekunde machen. Eile/Tempo verkürzen das Intervall.
//   - roles: welche Rollen zur Klasse passen (nach GW2-Spezialisierungen).
//     Nur für neue Helden beim Ergänzen, im Spiel ohne Wirkung.
export const CLASSES = {
  waechter:    { name: 'Wächter',         interval: 1.2, sprite: 'HERO_WAECHTER',        color: '#8fc4ff', bonus: ['def', 8],     roles: ['tank', 'healer', 'support', 'dps'] },
  krieger:     { name: 'Krieger',         interval: 1.2, sprite: 'HERO_KRIEGER',         color: '#f0c060', bonus: ['hp', 8],      roles: ['tank', 'support', 'dps'] },
  widergaenger:{ name: 'Widergänger',     interval: 1.1, sprite: 'HERO_WIDERGAENGER',    color: '#c98a6a', bonus: ['boss', 8],    roles: ['tank', 'healer', 'support', 'dps'] },
  waldlaeufer: { name: 'Waldläufer',      interval: 0.9, sprite: 'HERO_WALDLAEUFER',     color: '#8fd47a', bonus: ['speed', 8],   roles: ['healer', 'support', 'dps'] },
  dieb:        { name: 'Dieb',            interval: 0.7, sprite: 'HERO_DIEB',            color: '#b9a3c9', bonus: ['crit', 8],    roles: ['healer', 'support', 'dps'] },
  ingenieur:   { name: 'Ingenieur',       interval: 1.0, sprite: 'HERO_INGENIEUR',     color: '#e0a352', bonus: ['loot', 8],    roles: ['tank', 'healer', 'support', 'dps'] },
  elementar:   { name: 'Elementarmagier', interval: 1.5, sprite: 'HERO_ELEMENTARMAGIER', color: '#ff8a6b', bonus: ['atk', 8],     roles: ['healer', 'support', 'dps'] },
  mesmer:      { name: 'Mesmer',          interval: 1.1, sprite: 'HERO_MESMER',          color: '#e07ad8', bonus: ['critdmg', 8], roles: ['tank', 'healer', 'support', 'dps'] },
  nekromant:   { name: 'Nekromant',       interval: 1.3, sprite: 'HERO_NEKROMANT',       color: '#5fd6a8', bonus: ['regen', 8],   roles: ['healer', 'support', 'dps'] },
};

export const RACES = {
  charr:   { name: 'Charr' },
  mensch:  { name: 'Mensch' },
  norn:    { name: 'Norn' },
  asura:   { name: 'Asura' },
  sylvari: { name: 'Sylvari' },
};

// ---------------------------------------------------------------------
//  HELDEN-KATALOG (60 Helden: 12 je Volk, 15 je Rolle)
//  Namen aus der Namensliste (dev-data/helden-namen.md, dort auch die
//  Reserve). Charr-Namen englisch, Norn-Beinamen deutsch wie im DE-Client.
//  👉 Die `id` NIE ändern, sonst passen alte Spielstände nicht mehr.
//     `name`, `title`, Werte und Buffs dürfen sich ändern.
//  race: nur Anzeige (RACES), keine Wirkung im Kampf
//  buff (nur Unterstützer): 'macht' = +ATK fürs Team, 'eile' = Tempo
//  crit: Krit-Chance (0–1), vor allem für Schadensausteiler
//  account (optional): GW2-Accountname eines Gildenmitglieds
// ---------------------------------------------------------------------
export const HEROES = [
  { id: 'h01', name: 'Lucian Halford',        title: 'Schild von Götterfels',          race: 'mensch',  cls: 'waechter',     role: 'tank',    baseHp: 260, baseAtk: 9 },
  { id: 'h02', name: 'Valra Embersoul',       title: 'Glut der Zuversicht',            race: 'charr',   cls: 'waechter',     role: 'healer',  baseHp: 180, baseAtk: 7 },
  { id: 'h03', name: 'Roxx Ironbreaker',      title: 'Bollwerk der Eisenlegion',       race: 'charr',   cls: 'krieger',      role: 'tank',    baseHp: 280, baseAtk: 8 },
  { id: 'h04', name: 'Astrid Skadidottir',    title: 'Klinge im Schneesturm',          race: 'norn',    cls: 'krieger',      role: 'dps',     baseHp: 160, baseAtk: 15, crit: 0.15 },
  { id: 'h05', name: 'Alistair Vance',        title: 'Bannerträger der Seraphen',      race: 'mensch',  cls: 'krieger',      role: 'support', baseHp: 200, baseAtk: 9, buff: 'macht' },
  { id: 'h06', name: 'Halvar Sonnenschild',   title: 'Stimme der Legenden',            race: 'norn',    cls: 'widergaenger', role: 'tank',    baseHp: 250, baseAtk: 10 },
  { id: 'h07', name: 'Olwen',                 title: 'Druidin des Hains',              race: 'sylvari', cls: 'waldlaeufer',  role: 'healer',  baseHp: 170, baseAtk: 7 },
  { id: 'h08', name: 'Arn Adlerauge',         title: 'Pfeil der Zittergipfel',         race: 'norn',    cls: 'waldlaeufer',  role: 'dps',     baseHp: 150, baseAtk: 15, crit: 0.20 },
  { id: 'h09', name: 'Diana Swift',           title: 'Schatten der Gassen',            race: 'mensch',  cls: 'dieb',         role: 'dps',     baseHp: 135, baseAtk: 17, crit: 0.25 },
  { id: 'h10', name: 'Snappi',                title: 'Dolch im Nebel',                 race: 'asura',   cls: 'dieb',         role: 'dps',     baseHp: 140, baseAtk: 16, crit: 0.22 },
  { id: 'h11', name: 'Miphi',                 title: 'Mechanistin der Werkbank',       race: 'asura',   cls: 'ingenieur',    role: 'healer',  baseHp: 175, baseAtk: 8 },
  { id: 'h12', name: 'Zokk',                  title: 'Tüftler mit Turbo',              race: 'asura',   cls: 'ingenieur',    role: 'support', baseHp: 185, baseAtk: 9, buff: 'eile' },
  { id: 'h13', name: 'Vorek Stormcaller',     title: 'Sturm über Ascalon',             race: 'charr',   cls: 'elementar',    role: 'dps',     baseHp: 130, baseAtk: 18, crit: 0.15 },
  { id: 'h14', name: 'Brynhild Frostgeboren', title: 'Frost über den Gipfeln',         race: 'norn',    cls: 'elementar',    role: 'dps',     baseHp: 130, baseAtk: 17, crit: 0.18 },
  { id: 'h15', name: 'Branwen',               title: 'Meisterin der Trugbilder',       race: 'sylvari', cls: 'mesmer',       role: 'support', baseHp: 170, baseAtk: 10, buff: 'eile' },
  { id: 'h16', name: 'Cassandra Delacroix',   title: 'Spiegel der Klingen',            race: 'mensch',  cls: 'mesmer',       role: 'dps',     baseHp: 145, baseAtk: 15, crit: 0.20 },
  { id: 'h17', name: 'Niall',                 title: 'Hüter der Grabesstille',         race: 'sylvari', cls: 'nekromant',    role: 'dps',     baseHp: 165, baseAtk: 15, crit: 0.12 },
  { id: 'h18', name: 'Korak Ashpyre',         title: 'Flüsterer der Asche',            race: 'charr',   cls: 'nekromant',    role: 'support', baseHp: 180, baseAtk: 10, buff: 'macht' },
  { id: 'h19', name: 'Caelen',                title: 'Erbe der Nebel',                 race: 'sylvari', cls: 'widergaenger', role: 'dps',     baseHp: 165, baseAtk: 15, crit: 0.15 },
  { id: 'h20', name: 'Desta Shieldbastion',   title: 'Wächterin des Pakts',            race: 'charr',   cls: 'waechter',     role: 'dps',     baseHp: 170, baseAtk: 14, crit: 0.12 },
  // ab v0.28.0
  { id: 'h21', name: 'Vrakka Forgecleaver',   title: 'Schmiedeklinge der Eisenlegion', race: 'charr',   cls: 'krieger',      role: 'dps',     baseHp: 165, baseAtk: 16, crit: 0.15 },
  { id: 'h22', name: 'Garron Dawnguard',      title: 'Morgenwall der Blutlegion',      race: 'charr',   cls: 'waechter',     role: 'tank',    baseHp: 275, baseAtk: 9 },
  { id: 'h23', name: 'Rhok Farstrider',      title: 'Hornbläser der Ebenen',          race: 'charr',   cls: 'waldlaeufer',  role: 'support', baseHp: 190, baseAtk: 9, buff: 'eile' },
  { id: 'h24', name: 'Pyra Talonshot',        title: 'Scharfschützin der Aschelegion', race: 'charr',   cls: 'ingenieur',    role: 'dps',     baseHp: 150, baseAtk: 16, crit: 0.20 },
  { id: 'h25', name: 'Kaida Cracklebolt',    title: 'Regenruferin von Aschfurt',      race: 'charr',   cls: 'elementar',    role: 'healer',  baseHp: 175, baseAtk: 8 },
  { id: 'h26', name: 'Elena Mercer',          title: 'Schildmaid von Shaemoor',        race: 'mensch',  cls: 'krieger',      role: 'tank',    baseHp: 270, baseAtk: 9 },
  { id: 'h27', name: 'Vivienne Suncrest',     title: 'Lichtträgerin der Seraphen',     race: 'mensch',  cls: 'waechter',     role: 'support', baseHp: 195, baseAtk: 10, buff: 'macht' },
  { id: 'h28', name: 'Julian Croft',          title: 'Priester der Dwayna',            race: 'mensch',  cls: 'waechter',     role: 'healer',  baseHp: 180, baseAtk: 7 },
  { id: 'h29', name: 'Sophia Dawn',           title: 'Ruferin der Legende Ventari',    race: 'mensch',  cls: 'widergaenger', role: 'healer',  baseHp: 180, baseAtk: 8 },
  { id: 'h30', name: 'Garrett Fletcher',      title: 'Pfeilmacher aus Beetletun',      race: 'mensch',  cls: 'waldlaeufer',  role: 'dps',     baseHp: 155, baseAtk: 15, crit: 0.20 },
  { id: 'h31', name: 'Damian Voss',          title: 'Chronomant der Zeitlinie',       race: 'mensch',  cls: 'mesmer',       role: 'tank',    baseHp: 255, baseAtk: 10 },
  { id: 'h32', name: 'Torvald Felsbrecher',   title: 'Riese von Hoelbrak',             race: 'norn',    cls: 'krieger',      role: 'tank',    baseHp: 290, baseAtk: 9 },
  { id: 'h33', name: 'Freya Morgenwacht',     title: 'Gezeichnet vom Geist des Bären', race: 'norn',    cls: 'widergaenger', role: 'tank',    baseHp: 270, baseAtk: 10 },
  { id: 'h34', name: 'Vidar Rabenwacht',      title: 'Seher des Raben',                race: 'norn',    cls: 'waldlaeufer',  role: 'healer',  baseHp: 175, baseAtk: 7 },
  { id: 'h35', name: 'Ingrid Wolfsang',       title: 'Sängerin des Wolfs',             race: 'norn',    cls: 'waldlaeufer',  role: 'support', baseHp: 190, baseAtk: 9, buff: 'eile' },
  { id: 'h36', name: 'Silje Falkenblick',    title: 'Heilerin des Schneeleoparden',   race: 'norn',    cls: 'waldlaeufer',  role: 'healer',  baseHp: 175, baseAtk: 7 },
  { id: 'h37', name: 'Soren Eisweber',       title: 'Runen der Stärke',               race: 'norn',    cls: 'elementar',    role: 'support', baseHp: 180, baseAtk: 10, buff: 'macht' },
  { id: 'h38', name: 'Kragg',                title: 'Kleiner Hammer, großer Schild',  race: 'asura',   cls: 'krieger',      role: 'tank',    baseHp: 240, baseAtk: 9 },
  { id: 'h39', name: 'Plikka',                title: 'Bannerkalkül der Statischen',    race: 'asura',   cls: 'krieger',      role: 'support', baseHp: 180, baseAtk: 9, buff: 'macht' },
  { id: 'h40', name: 'Vorx',                  title: 'Golempilot der Dynamik',         race: 'asura',   cls: 'ingenieur',    role: 'tank',    baseHp: 245, baseAtk: 9 },
  { id: 'h41', name: 'Jazzi',                 title: 'Theoretikerin des Lichts',       race: 'asura',   cls: 'waechter',     role: 'support', baseHp: 180, baseAtk: 10, buff: 'macht' },
  { id: 'h42', name: 'Flekk',                 title: 'Schleicher von Rata Sum',        race: 'asura',   cls: 'dieb',         role: 'dps',     baseHp: 130, baseAtk: 17, crit: 0.25 },
  { id: 'h43', name: 'Xenn',                  title: 'Theoretiker der Trugbilder',     race: 'asura',   cls: 'mesmer',       role: 'support', baseHp: 165, baseAtk: 10, buff: 'eile' },
  { id: 'h44', name: 'Vizza',                 title: 'Krafttheorie in Flammen',        race: 'asura',   cls: 'elementar',    role: 'dps',     baseHp: 125, baseAtk: 19, crit: 0.15 },
  { id: 'h45', name: 'Maeve',                 title: 'Dorn des Hains',                 race: 'sylvari', cls: 'krieger',      role: 'tank',    baseHp: 260, baseAtk: 9 },
  { id: 'h46', name: 'Tiernan',               title: 'Ritter des Bleichen Baums',      race: 'sylvari', cls: 'waechter',     role: 'tank',    baseHp: 265, baseAtk: 9 },
  { id: 'h47', name: 'Eira',                  title: 'Tau der Morgendämmerung',        race: 'sylvari', cls: 'waechter',     role: 'healer',  baseHp: 175, baseAtk: 8 },
  { id: 'h48', name: 'Iorwerth',              title: 'Wurzel der Stille',              race: 'sylvari', cls: 'nekromant',    role: 'support', baseHp: 180, baseAtk: 10, buff: 'macht' },
  { id: 'h49', name: 'Rowan',                 title: 'Rufer der Wildnis',              race: 'sylvari', cls: 'waldlaeufer',  role: 'healer',  baseHp: 170, baseAtk: 7 },
  { id: 'h50', name: 'Seren',                title: 'Schattenheilerin im Caledon-Wald', race: 'sylvari', cls: 'dieb',         role: 'healer',  baseHp: 170, baseAtk: 8 },
  { id: 'h51', name: 'Barok Lightwall',      title: 'Lichtwall der Eisenlegion',      race: 'charr',   cls: 'waechter',     role: 'tank',    baseHp: 280, baseAtk: 9 },
  { id: 'h52', name: 'Zanna Soulsear',       title: 'Seelenbrand der Aschelegion',    race: 'charr',   cls: 'widergaenger', role: 'healer',  baseHp: 180, baseAtk: 8 },
  { id: 'h53', name: 'Cedric Valerius',      title: 'Mechaniker von Ebonfalke',       race: 'mensch',  cls: 'ingenieur',    role: 'support', baseHp: 190, baseAtk: 10, buff: 'macht' },
  { id: 'h54', name: 'Livia Thorne',         title: 'Hüterin der Stunde',             race: 'mensch',  cls: 'mesmer',       role: 'healer',  baseHp: 170, baseAtk: 8 },
  { id: 'h55', name: 'Thyra Bärenwacht',     title: 'Schildwall der Wanderer-Hügel',  race: 'norn',    cls: 'krieger',      role: 'tank',    baseHp: 295, baseAtk: 9 },
  { id: 'h56', name: 'Leif Geisterrufer',    title: 'Rufer der Wildgeister',          race: 'norn',    cls: 'waldlaeufer',  role: 'support', baseHp: 190, baseAtk: 9, buff: 'eile' },
  { id: 'h57', name: 'Tezz',                 title: 'Legendenkalkulator',             race: 'asura',   cls: 'widergaenger', role: 'tank',    baseHp: 245, baseAtk: 10 },
  { id: 'h58', name: 'Genni',                title: 'Hydromantin der Synergetik',     race: 'asura',   cls: 'elementar',    role: 'healer',  baseHp: 165, baseAtk: 8 },
  { id: 'h59', name: 'Kynan',                title: 'Spiegel des Traums',             race: 'sylvari', cls: 'mesmer',       role: 'support', baseHp: 175, baseAtk: 10, buff: 'eile' },
  { id: 'h60', name: 'Fiona',                title: 'Blüte im Grabesschatten',        race: 'sylvari', cls: 'nekromant',    role: 'healer',  baseHp: 175, baseAtk: 7 },
];
export const HERO_BY_ID = Object.fromEntries(HEROES.map(h => [h.id, h]));

// Onboarding: Die ersten Rekruten-Angebote der Gildenhalle sind genau diese drei (Tank, Heiler, Schaden, „Fein“).
// gold: Belohnung für Gildenhalle und erstes Zelt, reicht für alle drei.
export const ONBOARDING = { tank: 'h01', healer: 'h07', dps: 'h13', gold: { hall: 100, camp: 300 } };

// ---------------------------------------------------------------------
//  AUFTRÄGE nach dem Onboarding (Reihenfolge wie ein Tutorial,
//  eigene Texte). Der Spielstand merkt sich erledigte `id`s:
//  👉 ids nie ändern; neue Aufträge dürfen überall eingefügt werden.
//  goal.type: stage (zone, stage) · heroLevel (level) · building (key, level)
//             freeHero (hero) – Held wird über den Auftrag kostenlos aufgenommen (nicht mehr benutzt)
//             role (role) – ein Held dieser Rolle ist im Lager (angeworben)
//             weapon · research (n Stufen gesamt) · ration (n gefüttert)
//             tents (n Zelte) · squadFull (squad = Zelt-Index 0–3)
//  tab: Reiter, zu dem „Hingehen“ führt
// ---------------------------------------------------------------------
export const QUESTS = [
  { id: 'healer', icon: '✚', title: 'Verstärkung: Heilung', tab: 'squads',
    text: 'Wirb unter „Rekrutieren“ einen Heiler an. Er kommt in Zelt 1.',
    goal: { type: 'role', role: 'healer' }, reward: {} },
  { id: 'boss1', icon: '👑', title: 'Die Banditen-Anführerin', tab: 'portal',
    text: 'Sie hält den Riss an der Alten Mühle offen. Fordere sie heraus.',
    goal: { type: 'stage', zone: 1, stage: 1 }, reward: { gold: 100 } },
  { id: 'dps', icon: '⚔️', title: 'Verstärkung: Schaden', tab: 'squads',
    text: 'Wirb einen Schadensausteiler an. Damit ist Zelt 1 voll.',
    goal: { type: 'role', role: 'dps' }, reward: {} },
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
    goal: { type: 'stage', zone: 1, stage: 5 }, reward: { gold: 500, shards: 3 } },
  { id: 'lab', icon: '🔬', title: 'Asura-Know-how', tab: 'camp',
    text: 'Baue das Asura-Labor.',
    goal: { type: 'building', key: 'lab', level: 1 }, reward: { shards: 10 } },
  { id: 'research1', icon: '🔬', title: 'Erste Forschung', tab: 'lab',
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
    goal: { type: 'ration', n: 1 }, reward: { shards: 3 } },
  { id: 'forge', icon: '⚒️', title: 'Charr-Stahl', tab: 'camp',
    text: 'Baue die Charr-Schmiede.',
    goal: { type: 'building', key: 'forge', level: 1 }, reward: { shards: 2 } },
  { id: 'portal2', icon: '🌀', title: 'Der Riss weitet sich', tab: 'portal',
    text: 'Baue das Riss-Portal auf Stufe 2 aus (braucht 🔮).',
    goal: { type: 'building', key: 'portal', level: 2 }, reward: { gold: 1_000 } },
  { id: 'zone2', icon: '🏆', title: 'Der Caledon-Wald', tab: 'portal',
    text: 'Besiege alle Bosse im Caledon-Wald.',
    goal: { type: 'stage', zone: 2, stage: 5 }, reward: { gold: 1_500, shards: 5 } },
  { id: 'tent2', icon: '⛺', title: 'Ein zweiter Trupp', tab: 'squads',
    text: 'Schlage Zelt 2 auf (ab Gildenhalle 3).',
    goal: { type: 'tents', n: 2 }, reward: { shards: 5 } },
  { id: 'squad2', icon: '🛡️', title: 'Volle Besetzung', tab: 'squads',
    text: 'Besetze Zelt 2 mit Tank, Heiler und Schaden.',
    goal: { type: 'squadFull', squad: 1 }, reward: { gold: 2_000 } },
  { id: 'zone3', icon: '🏆', title: 'Die Wanderer-Hügel', tab: 'portal',
    text: 'Besiege alle Bosse in den Wanderer-Hügeln.',
    goal: { type: 'stage', zone: 3, stage: 5 }, reward: { gold: 3_000, shards: 10 } },
  { id: 'zone4', icon: '🏆', title: 'Die Provinz Metrica', tab: 'portal',
    text: 'Besiege alle Bosse in der Provinz Metrica.',
    goal: { type: 'stage', zone: 4, stage: 5 }, reward: { gold: 5_000, shards: 12 } },
  { id: 'zone5', icon: '🏆', title: 'Die Ebenen von Aschfurt', tab: 'portal',
    text: 'Besiege alle Bosse in den Ebenen von Aschfurt.',
    goal: { type: 'stage', zone: 5, stage: 5 }, reward: { gold: 8_000, shards: 15 } },
  { id: 'zone6', icon: '🏆', title: 'Caudecus’ Anwesen', tab: 'portal',
    text: 'Alle Spuren führen zurück ins Königintal. Besiege alle Bosse in Caudecus’ Anwesen.',
    goal: { type: 'stage', zone: 6, stage: 5 }, reward: { gold: 12_000, shards: 20 } },
];

// ---------------------------------------------------------------------
//  KAMPF
// ---------------------------------------------------------------------
export const COMBAT = {
  LEVEL_DIFF: 0.8,         // Schwierigkeit d = Stufen-Level × 0,8
  BOSS_DIFF_BONUS: 1,      // Boss-Beute rechnet mit Schwierigkeit + 1 (Werte kommen aus data/monsterStats.js)
  BOSS_TIME_LIMIT: 90,     // Sekunden; danach gilt die Herausforderung als gescheitert
  BOSS_COOLDOWN: 90,       // Sekunden Pause nach jeder Herausforderung (Sieg, Niederlage, Abbruch)
  BOSS_GOLD_MULT: 10,
  BOSS_EXP_MULT: 6,
  BOSS_SHARDS_PER_ZONE: 1, // Boss droppt garantiert Zone × diesen Wert (×3 auf schweren Stufen)
  WOUND_MS: 90_000,        // Regeneration nach 0 LP
  KILL_HEAL: 0.10,         // Heilung nach jedem Sieg (Anteil max. LP)
  CRIT_MULT: 1.5,          // Krit-Kraft +50 % (dev-data/combat-overview.md)
  HEAL_MULT: 0.6,          // Heilung/s = ATK × HEAL_MULT (v0.36: 1,8 → 0,6)
  HEALER_ATK_FACTOR: 0.4,  // Heiler greifen nebenbei schwach an
  SUPPORT_ATK_FACTOR: 0.7,
  MIGHT_BONUS: 0.12,       // Macht: +12 % Team-ATK je Unterstützer
  EILE_BONUS: 0.15,        // Eile: +15 % Angriffstempo je Unterstützer (Intervall ÷ 1,15)
  DEF_CAP: 0.5,            // max. Schadensreduktion in % (Rolle, Forschung, Eigenschaften), Kappung 50 %
  SHARD_CHANCE: 0.05,
  // ---- Gegnerwerte aus data/monsterStats.js (#061 Schritt 2) und Formeln nach dev-data/combat-overview.md
  // Schaden × 100 / (100 + DEF − Durchdringung); Durchdringung über DEF: × (1 + 0,5 × Über / (Über + 100)), max. ×1,5
  VARIANCE: 0.05,          // ±5 % Streuung je Treffer
  // Rüstung (DEF-Punkte) und Durchdringung der Helden nach Level und Seltenheit (z. B. 15 + 2,5 je Level)
  HERO_ARMOR: { base: { 2: 0, 3: 5, 4: 10, 5: 15, 6: 20 }, perLevel: 2.5 },
  HERO_PEN:   { base: { 2: 0, 3: 5, 4: 10, 5: 15, 6: 20 }, perLevel: 2.5 },
  // Regler auf die Gegnerwerte. Kurven: [Stufen-Level, Faktor], linear dazwischen; „Level“ = d ÷ LEVEL_DIFF
  // (normale Lv.-60-Stufen der Zonen 9–10 zählen dadurch bis ≈ 67).
  // HP_CURVE (alle Gegner normaler Stufen): Gegner-LP steigen ab Lv. 30 viel steiler als unsere Helden
  // (die Vorlage gleicht das mit Skills aus). Bis Lv. 30 1:1, darüber gedämpft (Ziel: Scherge auf passendem Level ≈ 12 s, Profil mittel).
  HP_CURVE: [[30, 1], [35, 0.8], [41, 0.45], [50, 0.4], [55, 0.3], [60, 0.25]],
  // Bosse zusätzlich: BOSS_SCALE und BOSS_HP_CURVE (glättet die Sprünge der Zonen 7–10, v. a. Zonen 9–10 bis ×5)
  BOSS_SCALE:   { hp: 0.6, atk: 1 },
  BOSS_HP_CURVE: [[50, 1], [51, 0.78], [55, 0.85], [58, 1], [60, 1], [61, 0.65], [63, 0.38], [67, 0.22]],
  // Schwere/legendäre Stufen: Die Vorlage steigt dort ×12 von Stufe zu Stufe, unsere Treppe (HARD_DIFF/LEGEND_DIFF) viel flacher.
  // LP deshalb aus der Treppe: base × growth^d (Boss: d + BOSS_DIFF_BONUS, × boss); ATK/DEF/Takt bleiben Vorlage × atk/def.
  HARD_HP:      { base: 60, growth: 1.10, boss: 4, scale: 1.8 },
  HARD_SCALE:   { atk: 1, def: 0.6 },
  LEGEND_SCALE: { atk: 0.5, def: 0.6 }, // legendäre Bosse schlagen alle 0,5 s zu
  // Veteranen (#026): Schergen kommen manchmal als Veteran aus dem Riss
  VETERAN: { chance: 0.1, hp: 2, atk: 1.5, loot: 2, after: { zone: 1, stage: 1 } }, // after: erst nach diesem Boss-Sieg (Tutorial)
  // Profile der Schergen (#062): verschieben die Werte der Vorlage, die Gesamtstärke bleibt etwa gleich
  // (Schaden je Sieg ≈ LP × DEF-Wirkung × Schaden/s des Gegners). spd = Faktor auf das Angriffsintervall.
  // Zuordnung je Scherge in tools/gen-zones.mjs (Feld profile in data/stages.js).
  MOB_PROFILES: {
    standard: { name: 'Standard', hp: 1,    def: 1,    atk: 1,   spd: 1 },
    rohling:  { name: 'Rohling',  hp: 1.15, def: 1.2,  atk: 0.92, spd: 1.2 }, // langsam und zäh
    flink:    { name: 'Flink',    hp: 0.85, def: 0.85, atk: 0.78, spd: 0.6 }, // schnell, wenig LP
    schuetze: { name: 'Schütze',  hp: 1,    def: 0.85, atk: 1.12, spd: 1 },   // hoher Schaden, wenig DEF
  },
  // Elite (#026): selten, deutlich stärker als ein Veteran; erst ab Zone minZone. Schließt Veteran aus.
  // loot = Faktor auf Gold/EXP, shards = 🔮 zusätzlich je Elite-Sieg
  ELITE:   { chance: 0.02, hp: 4, atk: 2, loot: 5, shards: 1, minZone: 2 },
  // Angriffs-Timer (#061): Takt der Gegner kommt aus data/monsterStats.js (Schergen 2,5 s, Bosse meist 1,5 s).
  SPAWN_DELAY: 0.5,        // Sekunden, bis der nächste Gegner da ist (live und offline)
  // Zielwahl (#051 B + D): Platz 1 im Zelt ist der Anführer (fällt er, rückt der Nächste nach).
  //   melee  (Nahkampf): Anführer bekommt LEADER_SHARE, der Rest verteilt sich nach ROLES[…].aggro
  //   ranged (Fernkampf): ein Ziel, gewürfelt nach aggro
  //   magic  (Magie): Fläche, alle fitten Helden teilen sich AREA_TOTAL × Treffer gleichmäßig
  // Die Angriffsart steht je Gegner in data/stages.js (tools/gen-zones.mjs).
  LEADER_SHARE: 0.6,
  AREA_TOTAL: 1.0,
  // Bosse holen alle BOSS_AOE_EVERY Sekunden zu einem Flächenangriff aus (Ansage BOSS_AOE_WARN s vorher):
  // jeder fitte Held bekommt einen Boss-Treffer × BOSS_AOE_FACTOR.
  BOSS_AOE_EVERY: 12,
  BOSS_AOE_WARN: 3,
  BOSS_AOE_FACTOR: 0.5,
  ENDGAME_DIFF_SCALE: 1.4, // #047: Zuschlag der normalen Lv.-60-Stufen (Zonen 8–10) × 1,4 → d bis ≈ 54 (tools/sim-bosses.mjs)
  // Schwere Stufen beginnen über der letzten normalen Stufe (Fluchküste 5, d ≈ 53,6) und steigen
  // gleichmäßig von Königintal ☠️6 bis Fluchküste ☠️7. Legendär liegt darüber (Zone 2 → Zone 10).
  HARD_DIFF:   { from: 57, to: 57.5 },   // v0.36.0: flach, weil DEF/ATK der Gegner selbst ansteigen. Max-Trupp: Königintal ☠️6 ab Lv. ≈ 43, Fluchküste ☠️7 Lv. 60
  LEGEND_DIFF: { from: 58.4, to: 58 },   // absichtlich knüppelhart (Max-Trupp Lv. 60: Caledon ≈ 45 %, Fluchküste ≈ 3 %). Fällt, weil die Bosse selbst härter werden
};

// Angriffsarten der Gegner (#051), Anzeige in der Arena
export const ATTACK_TYPES = {
  melee:  { icon: '🗡️', name: 'Nahkampf' },
  ranged: { icon: '🏹', name: 'Fernkampf' },
  magic:  { icon: '✨', name: 'Magie' },
};

// Info-Zeile unter dem Gegner in der Arena (bis zu zwei Zeilen, alle `every` Sekunden ein zufälliger Spruch).
// {held} = zufälliger Held des Trupps, der noch steht · {anfuehrer} = Held auf dem Anführer-Platz
// aoe: Boss holt zum Flächenangriff aus (COMBAT.BOSS_AOE_WARN s vorher) · low: Gegner unter `lowHp` LP
// minFight: Schergen, die der Trupp voraussichtlich schneller besiegt (LP ÷ Trupp-Schaden/s), bekommen keinen Spruch
export const MOB_QUIPS = {
  every: 5,
  lowHp: 0.25,
  minFight: 5,
  // Eigene Texte des Gegners (data/stages.js: flavor bei Schergen, rift bei Elite) zählen so oft wie n Sprüche aus der Liste
  ownWeight: 3,
  aoe: '💥 Holt zum Flächenangriff aus – gleich trifft es alle!',
  minion: [
    'Schnaubt verächtlich in Richtung Zelt.',
    'Hat offenbar nicht mit Gegenwehr gerechnet.',
    'Riecht nach Riss und schlechter Laune.',
    'Zählt heimlich die Helden. Und verzählt sich.',
    'Ruft nach Verstärkung. Niemand antwortet.',
    'Schwingt die Waffe mehr dramatisch als gezielt.',
    'Wirkt, als hätte der Riss ihn ungefragt ausgespuckt.',
    'Sucht den Ausgang. Es gibt keinen.',
    'Unterschätzt {held}. Großer Fehler.',
    'Versucht, {held} auszuweichen. Vergeblich.',
    'Hat sichtlich Respekt vor {held}.',
    '{held} hat ihn fest im Blick.',
    'Stolpert über die eigenen Füße. {held} grinst.',
    'Will an {anfuehrer} vorbei. Keine Chance.',
  ],
  vet: [
    'Hat schon mehr Gilden kommen und gehen sehen.',
    'Trägt die Narben früherer Kämpfe mit Stolz.',
    'Lässt sich nicht so leicht beeindrucken.',
    'Hat diesmal eine Taktik. Glaubt er zumindest.',
    'Hat von {held} schon gehört. Nichts Gutes.',
    'Fordert {anfuehrer} zum Zweikampf heraus.',
    '{held} murmelt: „Der hier ist zäher.“',
  ],
  elite: [
    'Der Riss hat ihn mit roher Energie vollgepumpt.',
    'Knistert vor Ätherenergie. Nicht anfassen.',
    'Hat sich durch drei Rissschichten nach oben gekämpft.',
    'Lässt die Erde bei jedem Schritt beben.',
    'Ein Elite-Gegner. Hier zählt jeder Schlag.',
    'Hat es auf {anfuehrer} abgesehen.',
    '{held} ruft: „Zusammenbleiben!“',
    '{held} weicht keinen Schritt zurück.',
  ],
  boss: [
    'Blickt auf eure Gilde herab.',
    'Hält eine Rede über Macht. Niemand hört zu.',
    'Hat diesen Kampf von langer Hand geplant.',
    'Der Riss pulsiert im Takt seines Zorns.',
    'Lacht. Das ist selten ein gutes Zeichen.',
    'Hat es ganz auf {anfuehrer} abgesehen.',
    'Lacht über {held}. Noch.',
    '{held} flüstert: „Den schaffen wir.“',
    '{anfuehrer} hält stand. Der Boss ist beeindruckt.',
    '{held} sucht nach einer Schwachstelle.',
  ],
  low: [
    'Wankt bedenklich.',
    'Überlegt, ob Rückzug nicht auch eine Taktik ist.',
    'Hält sich nur noch aus Trotz auf den Beinen.',
    'Bereut seine Lebensentscheidungen.',
    '{held} holt zum letzten Schlag aus.',
    'Fleht {held} um Gnade an.',
    '{held} ruft: „Gleich haben wir ihn!“',
  ],
};

// Riss-Zonen aus data/stages.js; Schwierigkeit je Stufe berechnen.
// Bis Lv. 59 zählt das Level, auf normalen Lv.-60-Stufen (Zonen 8–10) steigt die
// Schwierigkeit mit den Stufen-Kosten weiter (× COMBAT.ENDGAME_DIFF_SCALE).
// Schwer und legendär: eigene Treppe (COMBAT.HARD_DIFF / LEGEND_DIFF).
const lerp = ({ from, to }, k, n) => from + (n > 1 ? (to - from) * k / (n - 1) : 0);
const HARD_COUNT = ZONE_DATA.reduce((n, z) => n + z.stages.filter(st => st.hard && !st.legend).length, 0);
const LEGEND_COUNT = ZONE_DATA.reduce((n, z) => n + z.stages.filter(st => st.legend).length, 0);
let hardRank = 0, legendRank = 0;
export const ZONES = ZONE_DATA.map(z => ({
  ...z,
  stages: z.stages.map((st, i) => ({
    ...st,
    index: i + 1,
    d: st.legend ? lerp(COMBAT.LEGEND_DIFF, legendRank++, LEGEND_COUNT)
      : st.hard ? lerp(COMBAT.HARD_DIFF, hardRank++, HARD_COUNT)
      : st.level < 60 ? st.level * COMBAT.LEVEL_DIFF : 60 * COMBAT.LEVEL_DIFF + (st.cost - 1000) / 500 * COMBAT.ENDGAME_DIFF_SCALE,
  })),
}));
export const TOTAL_NORMAL = ZONES.length * NORMAL_STAGES;

// ---------------------------------------------------------------------
//  FORMELN
// ---------------------------------------------------------------------
export const F = {
  // Wert einer Kurve [[x, y], …] an der Stelle x (linear zwischen den Stützstellen, außen konstant)
  curve: (c, level) => {
    if (level <= c[0][0]) return c[0][1];
    for (let k = 1; k < c.length; k++) {
      const [l1, v1] = c[k - 1], [l2, v2] = c[k];
      if (level <= l2) return v1 + (v2 - v1) * (level - l1) / (l2 - l1);
    }
    return c.at(-1)[1];
  },
  heroAtk: (baseAtk, level, gearMult = 1, bonusMult = 1) =>
    baseAtk * (1 + 0.08 * (level - 1)) * gearMult * bonusMult,
  heroHp: (baseHp, level, bonusMult = 1) =>
    baseHp * (1 + 0.10 * (level - 1)) * bonusMult,
  goldPerKill: (d) => 5 * Math.pow(1.12, d),
  expPerKill: (d) => 8 * Math.pow(1.13, d),
  // EXP-Kurve aus data/heroLevels.js (Gesamt-EXP)
  expToNext: (level) => level >= MAX_HERO_LEVEL ? Infinity
    : HERO_LEVELS[level].totalExp - HERO_LEVELS[level - 1].totalExp,
  // #046: level = Kampf-Level (das Level nur aus Kampf-EXP, Proviant zählt nicht), siehe heroRetire()
  retireClover: (level) => Math.floor((level * level) / 100),
  reviveCost: (level) => Math.round(15 * Math.pow(level, 1.5)),
  researchCost: (base, toLevel) => Math.round(base * Math.pow(toLevel, 1.6)),
  // Forschungszeit in Sekunden: von der ersten zur letzten Stufe gleichmäßig (geometrisch) steigend, auf 5 s gerundet
  researchTime: (node, toLevel) => {
    const [a, b] = node.time || RESEARCH_TIME[node.tier];
    const t = node.max > 1 ? a * Math.pow(b / a, (toLevel - 1) / (node.max - 1)) : a;
    return Math.round(t / 5) * 5;
  },
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
    { hall: 1, w: { 2: 80, 3: 20, 4: 0,  5: 0,  6: 0 } },   // #054: Selten erst ab Halle 2
    { hall: 2, w: { 2: 70, 3: 25, 4: 5,  5: 0,  6: 0 } },
    { hall: 3, w: { 2: 50, 3: 30, 4: 15, 5: 5,  6: 0 } },
    { hall: 5, w: { 2: 35, 3: 30, 4: 20, 5: 12, 6: 3 } },
    { hall: 7, w: { 2: 20, 3: 30, 4: 25, 5: 17, 6: 8 } },
    { hall: 9, w: { 2: 10, 3: 25, 4: 30, 5: 22, 6: 13 } },
  ],
  freeRarity: 2,
};
// ---------------------------------------------------------------------
//  EIGENSCHAFTEN (Traits; Entwurf: dev-data/akrw-traits.md)
//  Jeder Held bringt 1–3 Eigenschaften mit, gewürfelt beim Rekrutieren
//  (auch kostenlose Helden). Am Helden: traits: [{ id, g }], g = Güte 2–6
//  (Namen/Farben wie WEAPON_GRADES).
//  TRAIT_STATS: Was ein Wert bewirkt. Der Prozentwert der Eigenschaft
//  wird mit `f` multipliziert:
//    mult = Faktor (ATK +15 % → ×1,15) · add = Prozentpunkte dazu
//    less = weniger davon (Verwundung, Boss-Schaden)
//  squad: true → wirkt für den ganzen Trupp (Summe aller Helden im Zelt),
//  Helden in der Reserve bringen nichts.
// ---------------------------------------------------------------------
export const TRAIT_STATS = {
  atk:     { name: 'ATK',           mode: 'mult', f: 1 },
  crit:    { name: 'Krit-Chance',   mode: 'add',  f: 0.5 },
  critdmg: { name: 'Krit-Schaden',  mode: 'mult', f: 1 },
  speed:   { name: 'Angriffstempo', mode: 'add',  f: 0.5 },  // Chance auf Zusatzangriff, wie Eile
  hp:      { name: 'Max. LP',       mode: 'mult', f: 1 },
  def:     { name: 'DEF',           mode: 'add',  f: 0.4 },  // Schadensreduktion, DEF_CAP gilt weiter
  heal:    { name: 'Heilung',       mode: 'mult', f: 1 },
  regen:   { name: 'Regeneration',  mode: 'less', f: 1, show: 'Verwundungszeit' },
  boss:    { name: 'Boss-Härte',    mode: 'less', f: 1, show: 'Schaden von Bossen' },
  gold:    { name: 'Gold',          mode: 'mult', f: 1, squad: true, show: 'Gold aus Siegen' },
  exp:     { name: 'EXP',           mode: 'mult', f: 1, squad: true },
  shards:  { name: 'Ätherscherben', mode: 'mult', f: 1, squad: true },
  loot:    { name: 'Beute',         mode: 'add',  f: 1, squad: true, show: 'Chance auf Boss-Waffe' },
  offline: { name: 'Offline',       mode: 'mult', f: 1, squad: true, show: 'Offline-Ertrag' },
  ration:  { name: 'Proviant',      mode: 'mult', f: 1, show: 'EXP aus Proviant' },
};

export const TRAIT_SPECS = {
  angriff:      { name: 'Angriff',      icon: '⚔️' },
  verteidigung: { name: 'Verteidigung', icon: '🛡️' },
  lager:        { name: 'Lager',        icon: '🧭' },
  ausgeglichen: { name: 'Ausgeglichen', icon: '⚖️' },
};

// Bonus in % je Güte (Index 0 = Fein … 4 = Aufgestiegen), null = gibt es nicht
const T1 = [3, 5, 8, 12, 15], T1H = [null, null, 8, 12, 15];
const T2 = [null, 3, 4, 6, 7.5], T2H = [null, null, 4, 6, 7.5];
const T3 = [null, null, null, 4, 5];
const tr = (name, spec, stats, pct) => ({ name, spec, stats, pct });
export const TRAITS = {
  // Einzel (Ausdauernd aus dem Entwurf fehlt, bis es Erschöpfung gibt)
  berserkerKraft:  tr('Berserker-Kraft',  'angriff',      ['atk'],     T1),
  scharfesAuge:    tr('Scharfes Auge',    'angriff',      ['crit'],    T1),
  wildheit:        tr('Wildheit',         'angriff',      ['critdmg'], T1),
  eiligeKlinge:    tr('Eilige Klinge',    'angriff',      ['speed'],   T1),
  zaehigkeit:      tr('Zähigkeit',        'verteidigung', ['def'],     T1),
  vitalitaet:      tr('Vitalität',        'verteidigung', ['hp'],      T1),
  felsenfest:      tr('Felsenfest',       'verteidigung', ['boss'],    T1H),
  zaehesFleisch:   tr('Zähes Fleisch',    'verteidigung', ['regen'],   T1),
  risslaeufer:     tr('Rissläufer',       'lager',        ['offline'], T1),
  goldrausch:      tr('Goldrausch',       'lager',        ['gold'],    T1),
  nebelgelehrter:  tr('Nebelgelehrter',   'lager',        ['exp'],     T1),
  feldkoch:        tr('Feldkoch',         'lager',        ['ration'],  T1H),
  aetherspuerer:   tr('Ätherspürer',      'lager',        ['shards'],  T1H),
  // Doppel
  kraftvollerStoss: tr('Kraftvoller Stoß',  'angriff',      ['atk', 'critdmg'],   T2),
  praezision:       tr('Präzisionsschlag',  'angriff',      ['atk', 'crit'],      T2),
  klingenwirbel:    tr('Klingenwirbel',     'angriff',      ['atk', 'speed'],     T2),
  toedlicherFokus:  tr('Tödlicher Fokus',   'angriff',      ['crit', 'critdmg'],  T2),
  sturmangriff:     tr('Sturmangriff',      'angriff',      ['speed', 'crit'],    T2),
  eiserneAbwehr:    tr('Eiserne Abwehr',    'verteidigung', ['def', 'hp'],        T2),
  schildwall:       tr('Schildwall',        'verteidigung', ['def', 'boss'],      T2),
  leichtfuss:       tr('Leichtfuß',         'verteidigung', ['regen', 'def'],     T2),
  lebensquell:      tr('Lebensquell',       'verteidigung', ['hp', 'heal'],       T2),
  widerstandskraft: tr('Widerstandskraft',  'verteidigung', ['hp', 'boss'],       T2),
  marodeurDrang:    tr('Marodeur-Drang',    'ausgeglichen', ['atk', 'hp'],        T2),
  ritterStand:      tr('Ritterlicher Stand','ausgeglichen', ['atk', 'def'],       T2),
  kampfsanitaeter:  tr('Kampfsanitäter',    'ausgeglichen', ['heal', 'atk'],      T2),
  pirscherReflexe:  tr('Pirscher-Reflexe',  'ausgeglichen', ['crit', 'regen'],    T2),
  spaeherzug:       tr('Späherzug',         'lager',        ['offline', 'exp'],   T2),
  gildenhaendler:   tr('Gildenhändler',     'lager',        ['gold', 'offline'],  T2),
  beutejaeger:      tr('Beutejäger',        'lager',        ['loot', 'shards'],   T2H),
  paktEffizienz:    tr('Pakt-Effizienz',    'lager',        ['gold', 'exp'],      T2),
  quartiermeister:  tr('Quartiermeister',   'lager',        ['ration', 'exp'],    T2),
  // Dreifach (nur Exotisch und Aufgestiegen)
  berserkerPraezision: tr('Berserker-Präzision',     'angriff',      ['atk', 'crit', 'critdmg'],  T3),
  kriegsrausch:        tr('Charr-Kriegsrausch',      'angriff',      ['atk', 'speed', 'critdmg'], T3),
  drachenZorn:         tr('Drachen-Zorn',            'angriff',      ['atk', 'critdmg', 'hp'],    T3),
  assassine:           tr('Assassinen-Meisterschaft','angriff',      ['crit', 'speed', 'critdmg'],T3),
  ritter:              tr('Unerschütterlicher Ritter','verteidigung',['def', 'hp', 'boss'],       T3),
  wandererBollwerk:    tr('Wanderer-Bollwerk',       'verteidigung', ['def', 'hp', 'heal'],       T3),
  kavalier:            tr('Kavalier-Taktik',         'verteidigung', ['def', 'hp', 'regen'],      T3),
  marodeurVorstoss:    tr('Marodeur-Vorstoß',        'ausgeglichen', ['atk', 'crit', 'hp'],       T3),
  kreuzritter:         tr('Kreuzritter-Stand',       'ausgeglichen', ['atk', 'def', 'critdmg'],   T3),
  himmlisch:           tr('Himmlischer Funke',       'ausgeglichen', ['atk', 'def', 'hp'],        T3),
  verrueckterKoenig:   tr('Glück des Verrückten Königs', 'lager',    ['loot', 'gold', 'exp'],     T3),
  karawane:            tr('Karawanen-Vorrat',        'lager',        ['ration', 'shards', 'offline'], T3),
};

// Würfeln: count = Anzahl je Helden-Seltenheit. Jede Eigenschaft bekommt die
// Güte des Helden oder darunter (gradeDrop: Gewichte für 0, 1, 2 Stufen tiefer,
// nie unter Fein). specWeight: welche Spezialisierung je Rolle wie oft kommt.
// Gibt es eine Eigenschaft in der Güte nicht, wird eine andere gewählt.
// Keine Eigenschaft doppelt am selben Helden.
export const TRAIT_RULES = {
  count: { 2: 1, 3: 1, 4: 2, 5: 2, 6: 3 },
  gradeDrop: [50, 35, 15],
  specWeight: {
    tank:    { angriff: 1, verteidigung: 4, lager: 2, ausgeglichen: 2 },
    healer:  { angriff: 1, verteidigung: 4, lager: 2, ausgeglichen: 2 },
    dps:     { angriff: 4, verteidigung: 1, lager: 2, ausgeglichen: 2 },
    support: { angriff: 2, verteidigung: 2, lager: 2, ausgeglichen: 3 },
  },
};

export const RETIRE_MIN_LEVEL = 20;
// #022: Helden im Ruhestand zahlen je Zyklus (CYCLE_MS) 🟡 und 🔮 nach goldCycle/rpCycle ihres Levels
// (js/data/heroLevels.js). Plätze: baseSlots + Forschung „Archiv der Veteranen“.
// Voll → der schwächste geht, wenn der neue stärker ist; sonst nur 🍀 und kein Platz.
export const RETIRE_HOME = { baseSlots: 10 };

// ---------------------------------------------------------------------
//  GEBÄUDE (Tabellen in data/buildings.js)
//  Ätherscherben für das Riss-Portal sind eine eigene Ergänzung.
// ---------------------------------------------------------------------
export const PORTAL_SHARDS = [0, 100, 400, 1_500]; // je Zielstufe 1–4 (🔮 sind seit v0.38.0 auch die Forschungswährung)
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
  // #053: Gedrückt halten wiederholt (z. B. Proviant): erste Wiederholung nach HOLD_DELAY_MS,
  // dann alle HOLD_REPEAT_MS, jedes Mal um HOLD_ACCEL schneller bis HOLD_MIN_MS.
  HOLD_DELAY_MS: 400,
  HOLD_REPEAT_MS: 180,
  HOLD_ACCEL: 0.88,
  HOLD_MIN_MS: 40,
};

export const ARMORY_SLOTS = [20, 25, 30, 40, 50, 60, 70, 85, 100];
export const ARMORY_CLEANUP_DEFAULT = [1, 2, 3];

// Proviant (🍞) aus Boss-Siegen (#045). Erster Sieg über eine Stufe: volle Menge aus stages.js.
// Danach nur mit chance und amount [min, max] Stück. Lager je Güte wächst mit der Gildenhalle.
export const RATION_DROP = { chance: 0.25, amount: [1, 2] };
export const RATION_SLOTS = [30, 35, 40, 50, 60, 70, 80, 90, 100];

// Vorräte verkaufen (🎒 Inventar): 🟡 je Stück. rations[g] = Proviant der Güte g+1 (etwa 0,4 🟡 je EXP).
// Früchte haben noch keine andere Funktion, Verkaufen ist bis dahin ihr Nutzen.
export const SELL = { rations: [15, 60, 200, 600, 2_000, 6_000], fruit: 250 };

// Zelte (= Trupps). Zelt 1 ab Start.
export const TENTS = [
  { hall: 1, gold: 0 },
  { hall: 3, gold: 1_500 },
  { hall: 6, gold: 40_000 },
  { hall: 9, gold: 900_000 },
];
export const TENT_SIZE = 3;

// ---------------------------------------------------------------------
//  ASURA-LABOR – Forschung: Bäume, Kosten und Zeiten in data/research.js
//  (bezahlt mit 🔮 Ätherscherben, jede Stufe braucht Zeit, immer eine gleichzeitig)
// ---------------------------------------------------------------------
export { RESEARCH, RESEARCH_ORDER, TIER_LAB, RESEARCH_TIME } from './data/research.js';

// ---------------------------------------------------------------------
//  MYSTISCHE SCHMIEDE (Prestige) – je 5 Stufen
// ---------------------------------------------------------------------
export const MYSTIC = {
  atk:   { name: 'Geschärfte Klingen', icon: '⚔️', per: 0.08, unit: '% Trupp-ATK', sign: '+', costs: [4, 10, 22, 45, 90] },
  hp:    { name: 'Gehärtete Rüstung',  icon: '🛡️', per: 0.08, unit: '% HP',        sign: '+', costs: [4, 10, 22, 45, 90] },
  regen: { name: 'Lebensquell',        icon: '💧', per: 0.12, unit: '% Regenerationszeit', sign: '−', costs: [3, 8, 18, 36, 72] },
  loot:  { name: 'Glücksbringer',      icon: '🍀', per: 0.10, unit: '% Gold & Scherben aus Siegen', sign: '+', costs: [5, 12, 26, 52, 100] },
};
export const MYSTIC_ORDER = ['atk', 'hp', 'regen', 'loot'];

// Neu-Würfeln (Waffenladen, Rekruten): Der verdoppelte Preis für „erneuern“ lässt sich
// mit 🍀 Mystischem Klee wieder auf den Startpreis setzen.
export const REROLL_RESET_CLOVER = 2;
