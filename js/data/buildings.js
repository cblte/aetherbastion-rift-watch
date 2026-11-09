// =====================================================================
//  Gebäude (Herkunft der Zahlen: dev-data/DATA.md)
//  Je Stufe:  cost = Gold für den Bau dieser Stufe (Stufe 1 = Neubau)
//             time = Bauzeit in Sekunden (0 = sofort)
//             hall = benötigte Gildenhallen-Stufe
//  Gildenhalle: stage = benötigte besiegte Normal-Stufen
//  insgesamt, gold = Gildenkasse je Zyklus (10 Min.).
//  Feldküche ist eine eigene Ergänzung.
// =====================================================================
const m = (min, sec = 0) => min * 60 + sec;

export const BUILDING_DATA = {
  // Gildenhalle, max. 9
  hall: {
    name: 'Gildenhalle', icon: '🏛️', unlockHall: 0,
    desc: 'Herz des Lagers. Gildenkasse alle 10 Min., schaltet neue Gebäude frei.',
    levels: [
      { cost: 0,         time: 0,        stage: 0,  gold: 100 },
      { cost: 200,       time: m(1),     stage: 3,  gold: 250 },
      { cost: 1_000,     time: m(1, 30), stage: 9,  gold: 350 },
      { cost: 2_000,     time: m(2, 30), stage: 21, gold: 450 },
      { cost: 10_000,    time: m(4),     stage: 29, gold: 600 },
      { cost: 20_000,    time: m(10),    stage: 31, gold: 750 },
      { cost: 200_000,   time: m(25),    stage: 40, gold: 800 },
      { cost: 800_000,   time: m(30),    stage: 50, gold: 1_000 },
      { cost: 1_500_000, time: m(35),    stage: 50, gold: 1_000 }, // wie Stufe 8
    ],
  },
  // Zeltlager, max. 7 – global: bestimmt das Level-Cap aller Helden.
  // cap ist eine eigene Annahme (bis Lv. 60).
  camp: {
    name: 'Zeltlager', icon: '⛺', unlockHall: 1,
    desc: 'Bestimmt das Level-Cap aller Helden.',
    levels: [
      { cost: 500,    time: 0,       hall: 1, cap: 10 },
      { cost: 500,    time: 20,      hall: 2, cap: 20 },
      { cost: 2_000,  time: m(1),    hall: 3, cap: 30 },
      { cost: 5_000,  time: m(2),    hall: 3, cap: 40 },
      { cost: 8_000,  time: m(3, 20), hall: 4, cap: 50 },
      { cost: 15_000, time: m(5),    hall: 5, cap: 55 },
      { cost: 20_000, time: m(8),    hall: 6, cap: 60 },
    ],
  },
  // Riss-Portal – Stufe = höchste offene Riss-Zone
  portal: {
    name: 'Riss-Portal', icon: '🌀', unlockHall: 1,
    desc: 'Stufe bestimmt die verfügbaren Riss-Zonen.',
    // 4 Stufen = 4 Portale (Kryta, Caledon & Zittergipfel · Metrica, Aschfurt & Anwesen · Löwenstein & Meerenge · Orr).
    // Weitere Stufen kommen mit neuen Zonen.
    levels: [
      { cost: 600,    time: 0,    hall: 1 },
      { cost: 1_500,  time: m(1), hall: 2 },
      { cost: 3_000,  time: m(2), hall: 3 },
      { cost: 25_000, time: m(5), hall: 4 },
    ],
  },
  // Eigene Ergänzung
  kitchen: {
    name: 'Feldküche', icon: '🍲', unlockHall: 2, bonusPerLevel: 0.05,
    desc: '+5 % EXP pro Stufe.',
    levels: [
      { cost: 140,   time: 30,    hall: 2 },
      { cost: 230,   time: 45,    hall: 2 },
      { cost: 360,   time: m(1),  hall: 3 },
      { cost: 900,   time: m(2),  hall: 4 },
      { cost: 3_000, time: m(4),  hall: 5 },
      { cost: 9_000, time: m(8),  hall: 6 },
      { cost: 40_000, time: m(15), hall: 7 },
      { cost: 150_000, time: m(20), hall: 8 },
      { cost: 400_000, time: m(25), hall: 9 },
      { cost: 900_000, time: m(30), hall: 9 },
    ],
  },
  // Asura-Labor, max. 10 – Stufe öffnet Forschungsstufen
  lab: {
    name: 'Asura-Labor', icon: '🔬', unlockHall: 1,
    desc: 'Forschung mit 🔮 Ätherscherben. Höhere Stufen öffnen tiefere Forschung.',
    levels: [
      { cost: 250,       time: 0,     hall: 1 },
      { cost: 500,       time: 30,    hall: 2 },
      { cost: 1_000,     time: m(1),  hall: 3 },
      { cost: 2_500,     time: m(2),  hall: 4 },
      { cost: 5_000,     time: m(6),  hall: 5 },
      { cost: 50_000,    time: m(15), hall: 6 },
      { cost: 100_000,   time: m(20), hall: 7 },
      { cost: 250_000,   time: m(25), hall: 7 },
      { cost: 500_000,   time: m(30), hall: 8 },
      { cost: 1_000_000, time: m(35), hall: 9 },
    ],
  },
  // Charr-Schmiede, max. 3 – Stufe öffnet bessere Waffen im Laden.
  // Stufe 1 erst ab Gildenhalle 2.
  forge: {
    name: 'Charr-Schmiede', icon: '⚒️', unlockHall: 2,
    desc: 'Waffenladen (3 Angebote, alle 30 Min. neu) und Waffenkammer. Stufe öffnet bessere Waffen.',
    levels: [
      { cost: 200,    time: 0,    hall: 2 },
      { cost: 2_500,  time: m(1), hall: 3 },
      { cost: 10_000, time: m(5), hall: 6 },
    ],
  },
};
export const BUILDING_ORDER = ['hall', 'camp', 'portal', 'kitchen', 'lab', 'forge'];
export const CYCLE_MS = 10 * 60 * 1000; // Gildenkasse & Helden-Einkommen (je Zyklus)
