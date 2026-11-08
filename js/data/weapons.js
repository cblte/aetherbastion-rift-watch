// =====================================================================
//  Waffen der Charr-Schmiede – aus CQHT „Smithy Shop“ übertragen
//    type    – Waffenart (siehe WEAPON_TYPES)
//    grade   – Güte ★1–6 (Seltenheit wie in GW2, siehe WEAPON_GRADES)
//    gold/rp – Kaufpreis in Gold bzw. alternativ in 📜 (CQHT: Honor)
//    smithy  – benötigte Stufe der Charr-Schmiede
//    weight  – Häufigkeit im Laden und bei Drops (CQHT-Drop-Chance in %)
//    src     – CQHT-Original (nur zur Orientierung)
// =====================================================================

// CQHT-Klasse → Waffenart. Welche Helden welche Art tragen, steht in WEAPON_FOR.
export const WEAPON_TYPES = {
  schwert: { name: 'Schwert', icon: '🗡️' },  // CQHT Warrior
  hammer:  { name: 'Hammer',  icon: '🔨' },  // CQHT Paladin
  bogen:   { name: 'Bogen',   icon: '🏹' },  // CQHT Archer
  gewehr:  { name: 'Gewehr',  icon: '🔫' },  // CQHT Hunter
  stab:    { name: 'Stab',    icon: '🪄' },  // CQHT Wizard
  fokus:   { name: 'Fokus',   icon: '🔮' },  // CQHT Priest
};

// Heiler tragen immer einen Fokus, alle anderen nach Klasse.
export const WEAPON_FOR = {
  healer: 'fokus',
  waechter: 'hammer', krieger: 'schwert', widergaenger: 'hammer', waldlaeufer: 'bogen', dieb: 'schwert',
  ingenieur: 'gewehr', elementar: 'stab', mesmer: 'schwert', nekromant: 'stab',
};

// Güte → Seltenheit (GW2-Farben) und Werte-Bonus
export const WEAPON_GRADES = {
  1: { name: 'Einfach',      color: '#c8c8c8', atk: 0.05, hp: 0.02 },
  2: { name: 'Fein',         color: '#62a4da', atk: 0.12, hp: 0.05 },
  3: { name: 'Meisterwerk',  color: '#1a9306', atk: 0.25, hp: 0.10 },
  4: { name: 'Selten',       color: '#fcd00b', atk: 0.45, hp: 0.15 },
  5: { name: 'Exotisch',     color: '#ffa405', atk: 0.75, hp: 0.25 },
  6: { name: 'Aufgestiegen', color: '#fb3e8d', atk: 1.20, hp: 0.35 },
};

export const WEAPONS = [
  { id: 'w001', type: 'schwert', grade: 1, name: "Altes Breitschwert", gold: 100, rp: null, smithy: 1, weight: 0.8, src: "Old Broad Sword" },
  { id: 'w002', type: 'hammer', grade: 1, name: "Steinhammer", gold: 100, rp: null, smithy: 1, weight: 0.8, src: "Stone Hammer" },
  { id: 'w003', type: 'bogen', grade: 1, name: "Kurzbogen", gold: 100, rp: null, smithy: 1, weight: 0.8, src: "Short Bow" },
  { id: 'w004', type: 'gewehr', grade: 1, name: "Alte Muskete", gold: 100, rp: null, smithy: 1, weight: 0.8, src: "Old Rifle" },
  { id: 'w005', type: 'stab', grade: 1, name: "Eichenstab", gold: 100, rp: null, smithy: 1, weight: 0.8, src: "Oak Staff" },
  { id: 'w006', type: 'fokus', grade: 1, name: "Heilige Kugel", gold: 100, rp: null, smithy: 1, weight: 0.8, src: "Holy Orb" },
  { id: 'w007', type: 'schwert', grade: 2, name: "Breitschwert", gold: 500, rp: null, smithy: 1, weight: 1.0, src: "Broad Sword" },
  { id: 'w008', type: 'schwert', grade: 2, name: "Bastardschwert", gold: 500, rp: null, smithy: 1, weight: 1.0, src: "Bastard Sword" },
  { id: 'w009', type: 'schwert', grade: 2, name: "Krummsäbel", gold: 500, rp: null, smithy: 1, weight: 1.0, src: "Falcata" },
  { id: 'w010', type: 'hammer', grade: 2, name: "Stahlhammer", gold: 500, rp: null, smithy: 1, weight: 1.0, src: "Steel Hammer" },
  { id: 'w011', type: 'hammer', grade: 2, name: "Streitkolben", gold: 500, rp: null, smithy: 1, weight: 1.0, src: "Mace" },
  { id: 'w012', type: 'hammer', grade: 2, name: "Riesenhammer", gold: 500, rp: null, smithy: 1, weight: 1.0, src: "Giant Hammer" },
  { id: 'w013', type: 'bogen', grade: 2, name: "Kompositbogen", gold: 500, rp: null, smithy: 1, weight: 1.0, src: "Composite Bow" },
  { id: 'w014', type: 'bogen', grade: 2, name: "Verstärkter Bogen", gold: 500, rp: null, smithy: 1, weight: 1.0, src: "Enhanced Bow" },
  { id: 'w015', type: 'bogen', grade: 2, name: "Lederlangbogen", gold: 500, rp: null, smithy: 1, weight: 1.0, src: "Leather Longbow" },
  { id: 'w016', type: 'gewehr', grade: 2, name: "Jagdgewehr", gold: 500, rp: null, smithy: 1, weight: 1.0, src: "Hunting Gun" },
  { id: 'w017', type: 'gewehr', grade: 2, name: "Gewehr", gold: 500, rp: null, smithy: 1, weight: 1.0, src: "Rifle" },
  { id: 'w018', type: 'gewehr', grade: 2, name: "Scharfschützengewehr", gold: 500, rp: null, smithy: 1, weight: 1.0, src: "Sniper Gun" },
  { id: 'w019', type: 'stab', grade: 2, name: "Waldstab", gold: 500, rp: null, smithy: 1, weight: 1.0, src: "Forest Staff" },
  { id: 'w020', type: 'stab', grade: 2, name: "Feuerjuwel", gold: 500, rp: null, smithy: 1, weight: 1.0, src: "Fire Gem" },
  { id: 'w021', type: 'stab', grade: 2, name: "Dreifaltigkeitsstab", gold: 500, rp: null, smithy: 1, weight: 1.0, src: "Trinity Staff" },
  { id: 'w022', type: 'fokus', grade: 2, name: "Runenfragment", gold: 500, rp: null, smithy: 1, weight: 1.0, src: "Rune Fragment" },
  { id: 'w023', type: 'fokus', grade: 2, name: "Glänzende Kugel", gold: 500, rp: null, smithy: 1, weight: 1.0, src: "Shiny Orb" },
  { id: 'w024', type: 'fokus', grade: 2, name: "Quaggan-Plüschtier", gold: 500, rp: null, smithy: 1, weight: 1.0, src: "Mouse Bear" },
  { id: 'w025', type: 'schwert', grade: 3, name: "Kriegerschwert", gold: 2500, rp: null, smithy: 1, weight: 2.0, src: "Warrior Sword" },
  { id: 'w026', type: 'schwert', grade: 3, name: "Stahlschwert", gold: 2500, rp: null, smithy: 1, weight: 2.0, src: "Steel Sword" },
  { id: 'w027', type: 'schwert', grade: 3, name: "Befreier", gold: 2500, rp: null, smithy: 1, weight: 2.0, src: "Liberator" },
  { id: 'w028', type: 'hammer', grade: 3, name: "Vollhammer", gold: 2500, rp: null, smithy: 1, weight: 2.0, src: "Full Hammer" },
  { id: 'w029', type: 'hammer', grade: 3, name: "Titanenhammer", gold: 2500, rp: null, smithy: 1, weight: 2.0, src: "Titan Hammer" },
  { id: 'w030', type: 'hammer', grade: 3, name: "Krytanischer Morgenstern", gold: 2500, rp: null, smithy: 1, weight: 2.0, src: "Candiva" },
  { id: 'w031', type: 'bogen', grade: 3, name: "Flaschenzugbogen", gold: 2500, rp: null, smithy: 1, weight: 2.0, src: "Compound Bow" },
  { id: 'w032', type: 'bogen', grade: 3, name: "Bogen des Dämonenjägers", gold: 2500, rp: null, smithy: 1, weight: 2.0, src: "Evil Hunter Bow" },
  { id: 'w033', type: 'bogen', grade: 3, name: "Bogen des jungen Jägers", gold: 2500, rp: null, smithy: 1, weight: 2.0, src: "Young Gon's Bow" },
  { id: 'w034', type: 'gewehr', grade: 3, name: "Revolverklinge", gold: 2500, rp: null, smithy: 1, weight: 2.0, src: "Gun Sword" },
  { id: 'w035', type: 'gewehr', grade: 3, name: "Langgewehr", gold: 2500, rp: null, smithy: 1, weight: 2.0, src: "Long Rifle" },
  { id: 'w036', type: 'gewehr', grade: 3, name: "Goldene Prunkflinte", gold: 2500, rp: null, smithy: 1, weight: 2.0, src: "Roman's Golden Gun" },
  { id: 'w037', type: 'stab', grade: 3, name: "Stab der Zauberschülerin", gold: 2500, rp: null, smithy: 1, weight: 2.0, src: "Magic Girl Staff" },
  { id: 'w038', type: 'stab', grade: 3, name: "Meerjungfrauenstab", gold: 2500, rp: null, smithy: 1, weight: 2.0, src: "Mermaid Staff" },
  { id: 'w039', type: 'stab', grade: 3, name: "Sternenfall", gold: 2500, rp: null, smithy: 1, weight: 2.0, src: "Starfall" },
  { id: 'w040', type: 'fokus', grade: 3, name: "Schneefragment", gold: 2500, rp: null, smithy: 1, weight: 2.0, src: "Snow Fragment" },
  { id: 'w041', type: 'fokus', grade: 3, name: "Unbekanntes Notenblatt", gold: 2500, rp: null, smithy: 1, weight: 2.0, src: "Unknown Sheet" },
  { id: 'w042', type: 'fokus', grade: 3, name: "Stundenglas Dwaynas", gold: 2500, rp: null, smithy: 1, weight: 2.0, src: "God's Hourglass" },
  { id: 'w043', type: 'schwert', grade: 4, name: "Seraphen-Säbel", gold: 7500, rp: null, smithy: 2, weight: 2.0, src: "Dragoon Sword" },
  { id: 'w044', type: 'schwert', grade: 4, name: "Rosenklinge", gold: 7500, rp: null, smithy: 2, weight: 2.0, src: "Rose Knife" },
  { id: 'w045', type: 'schwert', grade: 4, name: "Gefrorener Thunfisch", gold: 7500, rp: null, smithy: 2, weight: 2.0, src: "Frozen Tuna" },
  { id: 'w046', type: 'hammer', grade: 4, name: "Hammer des Statthalters", gold: 7500, rp: null, smithy: 2, weight: 2.0, src: "Locum's Hammer" },
  { id: 'w047', type: 'hammer', grade: 4, name: "Glutschläger", gold: 7500, rp: null, smithy: 2, weight: 2.0, src: "Vulcain" },
  { id: 'w048', type: 'hammer', grade: 4, name: "Quietschhammer", gold: 7500, rp: null, smithy: 2, weight: 2.0, src: "Toy Hammer" },
  { id: 'w049', type: 'bogen', grade: 4, name: "Legionärsbogen", gold: 7500, rp: null, smithy: 2, weight: 2.0, src: "Roman Bow" },
  { id: 'w050', type: 'bogen', grade: 4, name: "Herzensjäger-Bogen", gold: 7500, rp: null, smithy: 2, weight: 2.0, src: "Love Chaser Bow" },
  { id: 'w051', type: 'bogen', grade: 4, name: "Krabbenbogen", gold: 7500, rp: null, smithy: 2, weight: 2.0, src: "Crab Bow" },
  { id: 'w052', type: 'gewehr', grade: 4, name: "Wasserbombe", gold: 7500, rp: null, smithy: 2, weight: 2.0, src: "Water Bomb" },
  { id: 'w053', type: 'gewehr', grade: 4, name: "Schirmflinte", gold: 7500, rp: null, smithy: 2, weight: 2.0, src: "Umbrell gun" },
  { id: 'w054', type: 'gewehr', grade: 4, name: "Uralter Betäuber", gold: 7500, rp: null, smithy: 2, weight: 2.0, src: "Ancient StunGun" },
  { id: 'w055', type: 'stab', grade: 4, name: "Leierstab", gold: 7500, rp: null, smithy: 2, weight: 2.0, src: "Lyramorse" },
  { id: 'w056', type: 'stab', grade: 4, name: "Schwesternstab", gold: 7500, rp: null, smithy: 2, weight: 2.0, src: "Sister Staff" },
  { id: 'w057', type: 'stab', grade: 4, name: "Robuste Angelrute", gold: 7500, rp: null, smithy: 2, weight: 2.0, src: "Firm Fishing Rod" },
  { id: 'w058', type: 'fokus', grade: 4, name: "Dunkle Kugel", gold: 7500, rp: null, smithy: 2, weight: 2.0, src: "Dark Ball" },
  { id: 'w059', type: 'fokus', grade: 4, name: "Quaggan-Nudeln", gold: 7500, rp: null, smithy: 2, weight: 2.0, src: "Simya Noodle" },
  { id: 'w060', type: 'fokus', grade: 4, name: "Herz des Hains", gold: 7500, rp: null, smithy: 2, weight: 2.0, src: "Elanuma's Heart" },
  { id: 'w061', type: 'schwert', grade: 5, name: "Klinge des Tiefseekönigs", gold: 12000, rp: 5, smithy: 2, weight: 0.2, src: "Sea King Sword" },
  { id: 'w062', type: 'schwert', grade: 5, name: "Schlächterklinge", gold: 12000, rp: 5, smithy: 2, weight: 0.2, src: "Killer Sword" },
  { id: 'w063', type: 'schwert', grade: 5, name: "Goldene Klinge", gold: 12000, rp: 5, smithy: 2, weight: 0.2, src: "Golden Sword" },
  { id: 'w064', type: 'hammer', grade: 5, name: "Eishammer", gold: 12000, rp: 5, smithy: 2, weight: 0.2, src: "Ice Hammer" },
  { id: 'w065', type: 'hammer', grade: 5, name: "Goldene Axt", gold: 12000, rp: 5, smithy: 2, weight: 0.2, src: "Golden Axe" },
  { id: 'w066', type: 'hammer', grade: 5, name: "Wirbelaxt", gold: 12000, rp: 5, smithy: 2, weight: 0.2, src: "Whirl Axe" },
  { id: 'w067', type: 'bogen', grade: 5, name: "Roter Drache (kurz)", gold: 12000, rp: 5, smithy: 2, weight: 0.2, src: "RedDragon(Shrt)" },
  { id: 'w068', type: 'bogen', grade: 5, name: "Roter Drache (lang)", gold: 12000, rp: 5, smithy: 2, weight: 0.2, src: "RedDragon(Lng)" },
  { id: 'w069', type: 'bogen', grade: 5, name: "Katzenkissen", gold: 12000, rp: 5, smithy: 2, weight: 0.2, src: "Cat Pillow" },
  { id: 'w070', type: 'gewehr', grade: 5, name: "Donnerbüchse", gold: 12000, rp: 5, smithy: 2, weight: 0.2, src: "Blunderbuss" },
  { id: 'w071', type: 'gewehr', grade: 5, name: "Asura-Prototyp X-14", gold: 12000, rp: 5, smithy: 2, weight: 0.2, src: "CODE-14" },
  { id: 'w072', type: 'gewehr', grade: 5, name: "Verfolger", gold: 12000, rp: 5, smithy: 2, weight: 0.2, src: "Chaser" },
  { id: 'w073', type: 'stab', grade: 5, name: "Sylvari-Stab", gold: 12000, rp: 5, smithy: 2, weight: 0.2, src: "Elf Staff" },
  { id: 'w074', type: 'stab', grade: 5, name: "Uralter Stab", gold: 12000, rp: 5, smithy: 2, weight: 0.2, src: "Ancient Staff" },
  { id: 'w075', type: 'stab', grade: 5, name: "Stab des Erzmagiers", gold: 12000, rp: 5, smithy: 2, weight: 0.2, src: "Archon Staff" },
  { id: 'w076', type: 'fokus', grade: 5, name: "Seltsame Arznei", gold: 12000, rp: 5, smithy: 2, weight: 0.2, src: "Weird Medicine" },
  { id: 'w077', type: 'fokus', grade: 5, name: "Uralte Kugel", gold: 12000, rp: 5, smithy: 2, weight: 0.2, src: "Ancient Orb" },
  { id: 'w078', type: 'fokus', grade: 5, name: "Papierpuppe", gold: 12000, rp: 5, smithy: 2, weight: 0.2, src: "Paper Doll" },
  { id: 'w079', type: 'schwert', grade: 6, name: "Purpurnes Falchion", gold: 25000, rp: 25, smithy: 3, weight: 0.1, src: "Red Falchion" },
  { id: 'w080', type: 'hammer', grade: 6, name: "Vulkan", gold: 25000, rp: 25, smithy: 3, weight: 0.1, src: "Volcano" },
  { id: 'w081', type: 'bogen', grade: 6, name: "Der Antwortgeber", gold: 25000, rp: 25, smithy: 3, weight: 0.1, src: "Answerer" },
  { id: 'w082', type: 'gewehr', grade: 6, name: "Teufelsjäger", gold: 25000, rp: 25, smithy: 3, weight: 0.1, src: "Devil Hunter" },
  { id: 'w083', type: 'stab', grade: 6, name: "Erhabener Stab", gold: 25000, rp: 25, smithy: 3, weight: 0.1, src: "Superior Staff" },
  { id: 'w084', type: 'fokus', grade: 6, name: "Fantastische Harmonie", gold: 25000, rp: null, smithy: 3, weight: 0.1, src: "Fantasy Harmony" },
];
export const WEAPON_BY_ID = Object.fromEntries(WEAPONS.map(w => [w.id, w]));

// Laden der Charr-Schmiede (CQHT: 3 Angebote, alle 30 Min. neu, Auffrischen 100 Gold, verdoppelt sich)
// gradeLock: Abweichung von CQHT – hohe Güten gibt es erst spät im Laden, sonst kauft man sich vorbei.
//   ★5 erst mit Riss-Portal-Stufe `portal`, ★6 erst, wenn alle normalen Stufen besiegt sind.
export const SHOP = {
  offers: 3, restockMs: 30 * 60 * 1000, refreshBase: 100, sellFactor: 0.25,
  gradeLock: { 5: { portal: 4 }, 6: { allNormal: true } },
};

// Welche Güte bei Boss-Drops fällt, je Zonen-tier (CQHT-Kapitel 1–5) bzw. schwer/legendär.
// ★6 fällt nur auf schweren und legendären Stufen (Spätspiel zum Farmen).
export const DROP_GRADES = { 1: [1, 2], 2: [2, 3], 3: [3, 4], 4: [4, 5], 5: [5, 5], hard: [5, 6], legend: [6, 6] };
