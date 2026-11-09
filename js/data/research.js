// =====================================================================
//  ASURA-LABOR – Forschung (Daten)
//  Ideen für weitere Knoten: Vorlagen unter dev-data/archiv/.
//  Bezahlt mit 🔮 Ätherscherben, jede Stufe braucht Zeit.
//  Neue Knoten einfach in einen Baum eintragen, die Logik liest alles von hier.
//
//  Baum:   name, icon, nodes · advanced: true = Erweiterte Forschung (Typ 2)
//  Knoten: name · tier (Ebene, braucht Asura-Labor ≥ TIER_LAB[tier]) · max (Stufen)
//          per (Wirkung je Stufe) · unit (Anzeige) · base (Grundkosten in 🔮,
//          Stufe n kostet F.researchCost(base, n)) · req [Knoten, Mindeststufe] im selben Baum
//          stat: Wirkung (sonst = Knoten-Schlüssel). Knoten mit gleicher stat zählen zusammen,
//                z. B. atk2 (stat 'atk') erhöht dieselbe ATK wie atk.
//          sign '−' = verringert · flat = fester Wert statt Prozent
//          labSteps: Labor-Stufe je einzelner Stufe (statt nur TIER_LAB)
//          time: [erste, letzte] Stufe in Sekunden – sonst RESEARCH_TIME[tier]
//  Wirkungen (stat), die das Spiel kennt:
//    atk, hp, crit, critdmg, speed, def, heal, regen, gold, exp, shards, offline, archive,
//    pen (Durchdringung), armor (DEF-Punkte), revive (Belebungskosten), bosstime (Boss-Zeitlimit s),
//    build (Bauzeit), rations (Proviant-Chance), loot (Extra-Waffe beim Boss), treasury (Gildenkasse),
//    shardgen (🔮 je Gildenkasse-Zyklus), labspeed (Forschungszeit)
//  👉 Knoten-Schlüssel (atk, hp, …) nie umbenennen: Spielstände hängen daran.
// =====================================================================

// Ebene → nötige Labor-Stufe (Ebene 5 = Erweiterte Forschung)
export const TIER_LAB = { 1: 1, 2: 3, 3: 5, 4: 6, 5: 7 };

// Forschungszeit je Ebene: [Stufe 1, letzte Stufe] in Sekunden, dazwischen gleichmäßig steigend.
// Labor 1–2 bis 1 Min., Labor 3–4 bis 3 Min., Labor 5 bis 15 Min., ab Labor 7 bis 50 Min.
export const RESEARCH_TIME = {
  1: [30, 120],
  2: [60, 300],
  3: [300, 900],
  4: [1500, 3000],
  5: [1800, 3000],
};

// Labor 7–10 für die Knoten der Erweiterten Forschung (je einzelner Stufe)
const ADV10 = [7, 7, 7, 8, 8, 8, 9, 9, 10, 10];
const ADV5 = [7, 8, 9, 9, 10];

export const RESEARCH = {
  offense: { name: 'Offensive', icon: '⚔️', nodes: {
    atk:     { name: 'Kalibrierte Klingen',   tier: 1, max: 5, per: 0.04, unit: '% ATK',            base: 10 },
    speed:   { name: 'Chrono-Beschleuniger',  tier: 2, max: 5, per: 0.05, unit: '% Angriffstempo',  base: 25, req: ['atk', 2] },
    crit:    { name: 'Präzisionsoptik',       tier: 2, max: 5, per: 0.02, unit: '% Krit-Chance',    base: 25, req: ['atk', 2] },
    pen:     { name: 'Phasen-Bohrer',         tier: 2, max: 5, per: 5,    unit: ' Durchdringung',   base: 30, req: ['atk', 3], flat: true },
    critdmg: { name: 'Überladungskristall',   tier: 3, max: 5, per: 0.10, unit: '% Krit-Schaden',   base: 60, req: ['crit', 3] },
  } },
  defense: { name: 'Defensive', icon: '🛡️', nodes: {
    hp:      { name: 'Verstärkte Panzerung',  tier: 1, max: 5, per: 0.05, unit: '% HP',             base: 10 },
    def:     { name: 'Schutzfeld-Generator',  tier: 2, max: 5, per: 0.03, unit: '% Schutz (Schadensreduktion)', base: 25, req: ['hp', 2] },
    heal:    { name: 'Heilmatrix',            tier: 2, max: 5, per: 0.08, unit: '% Heilung',        base: 25, req: ['hp', 2] },
    armor:   { name: 'Härtungs-Matrix',       tier: 2, max: 5, per: 5,    unit: ' DEF',             base: 30, req: ['hp', 3], flat: true },
    regen:   { name: 'Regenerations-Kapsel',  tier: 3, max: 5, per: 0.08, unit: '% Regenerationszeit', base: 60, req: ['heal', 3], sign: '−' },
    revive:  { name: 'Notfall-Golem',         tier: 3, max: 5, per: 0.10, unit: '% Belebungskosten', base: 50, req: ['regen', 1], sign: '−' },
    bosstime:{ name: 'Chrono-Anker',          tier: 3, max: 4, per: 5,    unit: ' s Boss-Zeitlimit', base: 80, req: ['def', 3], flat: true },
  } },
  logistics: { name: 'Logistik', icon: '📦', nodes: {
    gold:    { name: 'Goldwandler',           tier: 1, max: 5, per: 0.05, unit: '% Gold aus Siegen', base: 10 },
    exp:     { name: 'Wissensspeicher',       tier: 2, max: 5, per: 0.05, unit: '% EXP',            base: 25, req: ['gold', 2] },
    shards:  { name: 'Ätherresonator',        tier: 2, max: 5, per: 0.10, unit: '% Scherben-Chance', base: 25, req: ['gold', 2] },
    build:   { name: 'Bau-Golems',            tier: 2, max: 5, per: 0.05, unit: '% Bauzeit',        base: 30, req: ['gold', 3], sign: '−' },
    rations: { name: 'Feldversorgung',        tier: 2, max: 5, per: 0.05, unit: '% Proviant-Chance (Boss)', base: 25, req: ['exp', 1] },
    offline: { name: 'Stasis-Feld',           tier: 3, max: 4, per: 30,   unit: ' Min. Offline-Zeit', base: 60, req: ['exp', 3], flat: true },
    treasury:{ name: 'Kassen-Optimierer',     tier: 3, max: 5, per: 0.10, unit: '% Gildenkasse (Halle + Ruhestand)', base: 60, req: ['gold', 5] },
    loot:    { name: 'Beute-Sonde',           tier: 3, max: 5, per: 0.04, unit: '% Chance auf Extra-Waffe (Boss)', base: 70, req: ['shards', 3] },
    // #022: mehr Plätze im Ruhestand (Start RETIRE_HOME.baseSlots, +10 je Stufe bis 100)
    archive: { name: 'Archiv der Veteranen',  tier: 4, max: 9, per: 10,   unit: ' Plätze im Ruhestand', base: 100, req: ['offline', 1], flat: true,
               labSteps: [6, 6, 7, 7, 8, 8, 9, 9, 10] },
  } },
  // Erweiterte Forschung (Typ 2): ab Labor 7, 30–50 Min. je Stufe, teuer
  advanced: { name: 'Erweiterte Forschung', icon: '🌀', advanced: true, nodes: {
    atk2:    { name: 'Ätherfokus-Klingen',    tier: 5, max: 10, per: 0.03, unit: '% ATK',           base: 150, stat: 'atk',   labSteps: ADV10 },
    hp2:     { name: 'Ätherpanzerung',        tier: 5, max: 10, per: 0.04, unit: '% HP',            base: 150, stat: 'hp',    labSteps: ADV10 },
    crit2:   { name: 'Zielmatrix Omega',      tier: 5, max: 10, per: 0.01, unit: '% Krit-Chance',   base: 200, stat: 'crit',  labSteps: ADV10, req: ['atk2', 3] },
    speed2:  { name: 'Chrono-Kern',           tier: 5, max: 10, per: 0.02, unit: '% Angriffstempo', base: 200, stat: 'speed', labSteps: ADV10, req: ['atk2', 3] },
    def2:    { name: 'Schildfeld-Resonanz',   tier: 5, max: 5,  per: 0.02, unit: '% Schutz (Schadensreduktion)', base: 250, stat: 'def', labSteps: ADV5, req: ['hp2', 3] },
    gold2:   { name: 'Goldwandler Prime',     tier: 5, max: 10, per: 0.05, unit: '% Gold aus Siegen', base: 150, stat: 'gold',  labSteps: ADV10 },
    exp2:    { name: 'Wissensarchiv Prime',   tier: 5, max: 10, per: 0.05, unit: '% EXP',           base: 150, stat: 'exp',   labSteps: ADV10, req: ['gold2', 2] },
    shardgen:{ name: 'Ätherkondensator',      tier: 5, max: 5,  per: 2,    unit: ' 🔮 je Gildenkasse', base: 250, labSteps: ADV5, req: ['gold2', 3], flat: true },
    labspeed:{ name: 'Chronomantische Beschleunigung', tier: 5, max: 5, per: 0.05, unit: '% Forschungszeit', base: 300, labSteps: ADV5, req: ['exp2', 2], sign: '−' },
  } },
};
export const RESEARCH_ORDER = ['offense', 'defense', 'logistics', 'advanced'];
