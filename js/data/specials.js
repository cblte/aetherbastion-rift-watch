// =====================================================================
//  Sonderinhalte aus CQHT – vorbereitet, NOCH NICHT IM SPIEL
//  (implemented: false). Werte aus „Progression → Stages“.
// =====================================================================

// CQHT „Special: Fercrow“ (Bäckerei-Bosse) → Prüfung der Feldküche
export const KITCHEN_TRIAL = {
  implemented: false, src: 'Special: Fercrow',
  name: 'Prüfung der Feldküche',
  stages: [
    { id: 'MK1', boss: { name: 'Prototyp-Kochgolem MK. 1', sprite: 'BOSS_KOCHGOLEM_MK1' }, level: 1, src: 'Prototype Fercrow' },
    { id: 'MK2', boss: { name: 'Meisterwerk-Kochgolem MK. 2', sprite: 'BOSS_KOCHGOLEM_MK2' }, level: 1, src: 'Masterpiece, Chococrow' },
  ],
};

// CQHT „Fortress of Souls“ (Soltar-Raid) → Kryptis-Seelenfeste
// Gebäude dafür: CQHT Sanctuary of Souls → Heiligtum der Nebel (1.000 Gold)
// Kristalle (CQHT Crystal Powder/Shard/Crystal) → Nebelkristall-Staub/-Splitter/-Kristall,
// Material für Seelengebundene Waffen (CQHT Soulbound Weapon).
export const SOUL_FORTRESS = {
  implemented: false, src: 'Fortress of Souls',
  name: 'Kryptis-Seelenfeste',
  building: { name: 'Heiligtum der Nebel', icon: '⛩️', cost: 1_000, src: 'Sanctuary of Souls' },
  materials: { dust: 'Nebelkristall-Staub', shard: 'Nebelkristall-Splitter', crystal: 'Nebelkristall' },
  phases: [
    { name: 'Seelenfürst, der Zwielicht-Geist', level: 60, src: 'Soltar, the Twilight Wraith',
      rewards: { dust: [10, 100], shard: [5, 35], crystal: [1, 12], gold: [5_000, 13_000], rp: [1_000, 1_000] } },
    { name: 'Seelenfürst, die Geisterbestie', level: 60, src: 'Soltar, the Wraith Beast',
      rewards: { dust: [110, 200], shard: [40, 85], crystal: [13, 22], gold: [15_000, 24_000], rp: [1_000, 1_000] } },
    { name: 'Seelenfürst, Herr der Seelen', level: 60, src: 'Soltar, the Lord of Souls',
      rewards: { dust: [210, 350], shard: [90, 150], crystal: [25, 80], gold: [25_000, 40_000], rp: [1_000, 1_000] } },
  ],
};

// CQHT-Proviant („Bread“ G1–G6) → Rationen. Im Spiel: EXP für einen Helden.
export const RATIONS = [
  { grade: 1, name: 'Einfache Ration',   exp: 40 },
  { grade: 2, name: 'Feldration',        exp: 150 },
  { grade: 3, name: 'Herzhafte Ration',  exp: 500 },
  { grade: 4, name: 'Offiziersration',   exp: 1_500 },
  { grade: 5, name: 'Festmahl-Ration',   exp: 5_000 },
  { grade: 6, name: 'Legendäres Festmahl', exp: 15_000 },
];
