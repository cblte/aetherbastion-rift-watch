// =====================================================================
//  ASURA-LABOR – Forschung (Daten)
//  Ideen für weitere Knoten: Vorlagen unter dev-data/archiv/.
//  Bezahlt mit 🔮 Ätherscherben, jede Stufe braucht Zeit.
//  Neue Knoten einfach in einen Baum eintragen, die Logik liest alles von hier.
//
//  Baum:   name, icon, nodes
//  Knoten: name · tier (Ebene, braucht Asura-Labor ≥ TIER_LAB[tier]) · max (Stufen)
//          per (Wirkung je Stufe) · unit (Anzeige) · base (Grundkosten in 🔮,
//          Stufe n kostet F.researchCost(base, n)) · req [Knoten, Mindeststufe] im selben Baum
//          sign '−' = verringert · flat = fester Wert statt Prozent
//          labSteps: Labor-Stufe je einzelner Stufe (statt nur TIER_LAB)
//          time: [erste, letzte] Stufe in Sekunden – sonst RESEARCH_TIME[tier]
//  👉 Knoten-Schlüssel (atk, hp, …) nie umbenennen: Spielstände und die
//     Wirkung im Spiel (rv(state, 'atk') usw.) hängen daran.
// =====================================================================

// Ebene → nötige Labor-Stufe
export const TIER_LAB = { 1: 1, 2: 3, 3: 5, 4: 6 };

// Forschungszeit je Ebene: [Stufe 1, letzte Stufe] in Sekunden, dazwischen gleichmäßig steigend.
// Labor 1–2 bis 1 Min., Labor 3–4 bis 3 Min., Labor 5 bis 15 Min., ab Labor 7 bis 50 Min.
export const RESEARCH_TIME = {
  1: [30, 120],
  2: [60, 300],
  3: [300, 900],
  4: [1500, 3000],
};

export const RESEARCH = {
  offense: { name: 'Offensive', icon: '⚔️', nodes: {
    atk:     { name: 'Kalibrierte Klingen',   tier: 1, max: 5, per: 0.04, unit: '% ATK',            base: 10 },
    speed:   { name: 'Chrono-Beschleuniger',  tier: 2, max: 5, per: 0.05, unit: '% Angriffstempo',  base: 25, req: ['atk', 2] },
    crit:    { name: 'Präzisionsoptik',       tier: 2, max: 5, per: 0.02, unit: '% Krit-Chance',    base: 25, req: ['atk', 2] },
    critdmg: { name: 'Überladungskristall',   tier: 3, max: 5, per: 0.10, unit: '% Krit-Schaden',   base: 60, req: ['crit', 3] },
  } },
  defense: { name: 'Defensive', icon: '🛡️', nodes: {
    hp:      { name: 'Verstärkte Panzerung',  tier: 1, max: 5, per: 0.05, unit: '% HP',             base: 10 },
    def:     { name: 'Schutzfeld-Generator',  tier: 2, max: 5, per: 0.03, unit: '% Schutz (Schadensreduktion)', base: 25, req: ['hp', 2] },
    heal:    { name: 'Heilmatrix',            tier: 2, max: 5, per: 0.08, unit: '% Heilung',        base: 25, req: ['hp', 2] },
    regen:   { name: 'Regenerations-Kapsel',  tier: 3, max: 5, per: 0.08, unit: '% Regenerationszeit', base: 60, req: ['heal', 3], sign: '−' },
  } },
  logistics: { name: 'Logistik', icon: '📦', nodes: {
    gold:    { name: 'Goldwandler',           tier: 1, max: 5, per: 0.05, unit: '% Gold',           base: 10 },
    exp:     { name: 'Wissensspeicher',       tier: 2, max: 5, per: 0.05, unit: '% EXP',            base: 25, req: ['gold', 2] },
    shards:  { name: 'Ätherresonator',        tier: 2, max: 5, per: 0.10, unit: '% Scherben-Chance', base: 25, req: ['gold', 2] },
    offline: { name: 'Stasis-Feld',           tier: 3, max: 4, per: 30,   unit: ' Min. Offline-Zeit', base: 60, req: ['exp', 3], flat: true },
    // #022: mehr Plätze im Ruhestand (Start RETIRE_HOME.baseSlots, +10 je Stufe bis 100)
    archive: { name: 'Archiv der Veteranen',  tier: 4, max: 9, per: 10,   unit: ' Plätze im Ruhestand', base: 100, req: ['offline', 1], flat: true,
               labSteps: [6, 6, 7, 7, 8, 8, 9, 9, 10] },
  } },
};
export const RESEARCH_ORDER = ['offense', 'defense', 'logistics'];
