// =====================================================================
//  Kampfwerte der Gegner – 1:1 aus CQHT (#061)
//  ⚠️ Erzeugt mit `node tools/gen-monster-stats.mjs .` aus dev-data/gw2-monsters.json,
//  nicht von Hand bearbeiten.
//  Je Zone eine Liste der Stufen (Reihenfolge wie in stages.js):
//    hp/atk = LP und Schaden je Treffer (CQHT hp1/atk1), def = DEF (= RES),
//    spd = Sekunden zwischen zwei Angriffen (CQHT attackSpeed).
//  Regler (Bosse, schwere/legendäre Stufen, Veteranen) stehen in COMBAT (config.js).
// =====================================================================
export const MONSTER_STATS = {
  1: [ // Königintal
    // 1 normal · Banditen-Anführerin (BOSS_1_1_1)
    { boss: { hp: 1280, atk: 14, def: 5, spd: 1.5 }, minions: [{ hp: 240, atk: 9, def: 8, spd: 2.5 }, { hp: 400, atk: 14, def: 16.5, spd: 2.5 }] },
    // 2 normal · Champion Banditen-Saboteur (BOSS_1_1_2)
    { boss: { hp: 1920, atk: 21, def: 12, spd: 1.5 }, minions: [{ hp: 400, atk: 14, def: 16.5, spd: 2.5 }, { hp: 470, atk: 16, def: 22.5, spd: 2.5 }] },
    // 3 normal · Champion Eichenherz (BOSS_1_1_3)
    { boss: { hp: 2270, atk: 25, def: 16.5, spd: 1.5 }, minions: [{ hp: 400, atk: 14, def: 16.5, spd: 2.5 }, { hp: 470, atk: 16, def: 22.5, spd: 2.5 }] },
    // 4 normal · Champion Krait-Hexe (BOSS_1_2_1)
    { boss: { hp: 3130, atk: 37, def: 23.5, spd: 1.5 }, minions: [{ hp: 470, atk: 16, def: 22.5, spd: 2.5 }, { hp: 630, atk: 20, def: 28.5, spd: 2.5 }] },
    // 5 normal · Schatten-Behemoth (BOSS_1_2_2)
    { boss: { hp: 4220, atk: 43, def: 30.5, spd: 1.5 }, minions: [{ hp: 630, atk: 20, def: 28.5, spd: 2.5 }, { hp: 1260, atk: 31, def: 44.5, spd: 2.5 }] },
    // 6 schwer · Champion Höhlentroll (BOSS_H_1_1)
    { boss: { hp: 982681, atk: 1009, def: 233, spd: 2.5 }, minions: [{ hp: 90323, atk: 240, def: 230, spd: 2.5 }, { hp: 90323, atk: 240, def: 230, spd: 2.5 }] },
    // 7 schwer · Verderbt: Schatten-Behemoth (BOSS_H_1_2)
    { boss: { hp: 1580242, atk: 1023, def: 243, spd: 2.5 }, minions: [{ hp: 117384, atk: 244, def: 237, spd: 2.5 }, { hp: 117384, atk: 244, def: 237, spd: 2.5 }] },
  ],
  2: [ // Caledon-Wald
    // 1 normal · Champion Hylek-Kriegshäuptling (BOSS_1_3_1)
    { boss: { hp: 9460, atk: 84, def: 41.5, spd: 1.5 }, minions: [{ hp: 630, atk: 20, def: 28.5, spd: 2.5 }, { hp: 1260, atk: 31, def: 44.5, spd: 2.5 }] },
    // 2 normal · Champion Skritt-Schatzmeister (BOSS_1_3_2)
    { boss: { hp: 10460, atk: 94, def: 47.5, spd: 1.5 }, minions: [{ hp: 1260, atk: 31, def: 44.5, spd: 2.5 }, { hp: 1260, atk: 31, def: 44.5, spd: 2.5 }] },
    // 3 normal · Champion Albtraumhof-Ritter (BOSS_1_4_1)
    { boss: { hp: 12190, atk: 104, def: 54.5, spd: 1.5 }, minions: [{ hp: 1260, atk: 31, def: 44.5, spd: 2.5 }, { hp: 1260, atk: 31, def: 44.5, spd: 2.5 }] },
    // 4 normal · Champion Krait-Orakel (BOSS_1_4_2)
    { boss: { hp: 14080, atk: 114, def: 59.5, spd: 1.5 }, minions: [{ hp: 1260, atk: 31, def: 44.5, spd: 2.5 }, { hp: 1260, atk: 31, def: 44.5, spd: 2.5 }] },
    // 5 normal · Albtraumhof-Gräfin (BOSS_1_5)
    { boss: { hp: 17250, atk: 123, def: 72.5, spd: 1.5 }, minions: [{ hp: 1260, atk: 31, def: 44.5, spd: 2.5 }, { hp: 1260, atk: 31, def: 44.5, spd: 2.5 }] },
    // 6 schwer · Verderbter Baumgeist (BOSS_H_1_3)
    { boss: { hp: 2177802, atk: 1036, def: 253, spd: 2.5 }, minions: [{ hp: 144444, atk: 249, def: 243, spd: 2.5 }, { hp: 144444, atk: 249, def: 243, spd: 2.5 }] },
    // 7 schwer · Verderbt: Albtraumhof-Gräfin (BOSS_H_1_4)
    { boss: { hp: 2775363, atk: 1050, def: 263, spd: 1 }, minions: [{ hp: 171504, atk: 253, def: 250, spd: 2.5 }, { hp: 171504, atk: 253, def: 250, spd: 2.5 }] },
    // 8 legendär · Schatten: Albtraumhof-Gräfin (BOSS_H_L_1)
    { boss: { hp: 12933897, atk: 1277, def: 433, spd: 0.5 }, minions: [{ hp: 196390, atk: 278, def: 169, spd: 2.5 }, { hp: 225350, atk: 287, def: 180, spd: 2.5 }] },
  ],
  3: [ // Wanderer-Hügel
    // 1 normal · Champion Minotauren-Bulle (BOSS_2_1_1)
    { boss: { hp: 15560, atk: 113, def: 77.5, spd: 1.5 }, minions: [{ hp: 1840, atk: 40, def: 71.5, spd: 2.5 }, { hp: 2080, atk: 45, def: 80, spd: 2.5 }] },
    // 2 normal · Champion Grawl-Häuptling (BOSS_2_1_2)
    { boss: { hp: 17110, atk: 128, def: 82.5, spd: 1.5 }, minions: [{ hp: 2080, atk: 45, def: 80, spd: 2.5 }, { hp: 2190, atk: 47, def: 85, spd: 2.5 }] },
    // 3 normal · Champion Eisbrut-Wolf (BOSS_2_1_3)
    { boss: { hp: 17320, atk: 151, def: 85, spd: 1.5 }, minions: [{ hp: 2080, atk: 45, def: 80, spd: 2.5 }, { hp: 2190, atk: 47, def: 85, spd: 2.5 }] },
    // 4 normal · Schamanen-Vorbote des Jormag (BOSS_2_2_1)
    { boss: { hp: 18400, atk: 193, def: 90, spd: 1.5 }, minions: [{ hp: 2190, atk: 47, def: 85, spd: 2.5 }, { hp: 2510, atk: 55, def: 90, spd: 2.5 }] },
    // 5 normal · Svanir-Schamane (BOSS_2_2_2)
    { boss: { hp: 22250, atk: 226, def: 95, spd: 1.5 }, minions: [{ hp: 2510, atk: 55, def: 90, spd: 2.5 }, { hp: 3590, atk: 83, def: 100, spd: 2.5 }] },
    // 6 schwer · Eisbrut-Goliath (BOSS_H_2_1)
    { boss: { hp: 3372924, atk: 1063, def: 273, spd: 2.5 }, minions: [{ hp: 198565, atk: 257, def: 256, spd: 2.5 }, { hp: 198565, atk: 257, def: 256, spd: 2.5 }] },
    // 7 schwer · Verderbt: Svanir-Schamane (BOSS_H_2_2)
    { boss: { hp: 3970485, atk: 1076, def: 283, spd: 2.5 }, minions: [{ hp: 225625, atk: 261, def: 263, spd: 2.5 }, { hp: 225625, atk: 261, def: 263, spd: 2.5 }] },
  ],
  4: [ // Provinz Metrica
    // 1 normal · Champion Inquestur-Golem (BOSS_2_3_1)
    { boss: { hp: 29100, atk: 269, def: 105, spd: 1.5 }, minions: [{ hp: 3590, atk: 83, def: 100, spd: 2.5 }, { hp: 3590, atk: 83, def: 100, spd: 2.5 }] },
    // 2 normal · Champion Skritt-Anführer (BOSS_2_3_2)
    { boss: { hp: 34100, atk: 276, def: 110, spd: 1.5 }, minions: [{ hp: 3590, atk: 83, def: 100, spd: 2.5 }, { hp: 3590, atk: 83, def: 100, spd: 2.5 }] },
    // 3 normal · Champion Riesen-Moa (BOSS_2_4_1)
    { boss: { hp: 36410, atk: 289, def: 115, spd: 1.5 }, minions: [{ hp: 3590, atk: 83, def: 100, spd: 2.5 }, { hp: 3590, atk: 83, def: 100, spd: 2.5 }] },
    // 4 normal · Inquestur-Versuchsleiterin (BOSS_2_4_2)
    { boss: { hp: 36920, atk: 301, def: 120, spd: 1.5 }, minions: [{ hp: 3590, atk: 83, def: 100, spd: 2.5 }, { hp: 3590, atk: 83, def: 100, spd: 2.5 }] },
    // 5 normal · Kolossaler Inquestur-Golem (BOSS_2_5)
    { boss: { hp: 51570, atk: 543, def: 142.5, spd: 1.5 }, minions: [{ hp: 3590, atk: 83, def: 100, spd: 2.5 }, { hp: 3590, atk: 83, def: 100, spd: 2.5 }] },
    // 6 schwer · Entfesseltes Experiment (BOSS_H_2_3)
    { boss: { hp: 4568046, atk: 1090, def: 293, spd: 2.5 }, minions: [{ hp: 252685, atk: 265, def: 269, spd: 2.5 }, { hp: 252685, atk: 265, def: 269, spd: 2.5 }] },
    // 7 schwer · Verderbt: Kolossaler Inquestur-Golem (BOSS_H_2_4)
    { boss: { hp: 5165606, atk: 1103, def: 303, spd: 1 }, minions: [{ hp: 279746, atk: 270, def: 275, spd: 2.5 }, { hp: 279746, atk: 270, def: 275, spd: 2.5 }] },
    // 8 legendär · Schatten: Kolossaler Inquestur-Golem (BOSS_H_L_2)
    { boss: { hp: 13531458, atk: 1291, def: 443, spd: 0.5 }, minions: [{ hp: 312240, atk: 315, def: 212, spd: 2.5 }, { hp: 341200, atk: 324, def: 223, spd: 2.5 }] },
  ],
  5: [ // Ebenen von Aschfurt
    // 1 normal · Champion Verschlinger-Königin (BOSS_3_1_1)
    { boss: { hp: 45860, atk: 254, def: 140, spd: 1.5 }, minions: [{ hp: 8010, atk: 105, def: 132, spd: 2.5 }, { hp: 8420, atk: 123, def: 138, spd: 2.5 }] },
    // 2 normal · Champion Skal-Alpha (BOSS_3_1_2)
    { boss: { hp: 46610, atk: 297, def: 142.5, spd: 1.5 }, minions: [{ hp: 8010, atk: 105, def: 132, spd: 2.5 }, { hp: 8420, atk: 123, def: 138, spd: 2.5 }] },
    // 3 normal · Separatisten-Anführerin (BOSS_3_1_3)
    { boss: { hp: 71520, atk: 303, def: 145, spd: 1.5 }, minions: [{ hp: 8420, atk: 123, def: 138, spd: 2.5 }, { hp: 9870, atk: 135, def: 144, spd: 2.5 }] },
    // 4 normal · Champion Ascalonischer Geisterhauptmann (BOSS_3_2_1)
    { boss: { hp: 78320, atk: 353, def: 147.5, spd: 1.5 }, minions: [{ hp: 8420, atk: 123, def: 138, spd: 2.5 }, { hp: 9870, atk: 135, def: 144, spd: 2.5 }] },
    // 5 normal · Flammenlegion-Kriegsherr (BOSS_3_2_2)
    { boss: { hp: 86080, atk: 418, def: 150, spd: 1.5 }, minions: [{ hp: 9870, atk: 135, def: 144, spd: 2.5 }, { hp: 9870, atk: 135, def: 144, spd: 2.5 }] },
    // 6 schwer · Flammenlegion-Schamane (BOSS_H_3_1)
    { boss: { hp: 5763167, atk: 1117, def: 313, spd: 2.5 }, minions: [{ hp: 306806, atk: 274, def: 282, spd: 2.5 }, { hp: 306806, atk: 274, def: 282, spd: 2.5 }] },
    // 7 schwer · Verderbt: Flammenlegion-Kriegsherr (BOSS_H_3_2)
    { boss: { hp: 6360728, atk: 1130, def: 323, spd: 2.5 }, minions: [{ hp: 333867, atk: 278, def: 288, spd: 2.5 }, { hp: 333867, atk: 278, def: 288, spd: 2.5 }] },
  ],
  6: [ // Caudecus’ Anwesen
    // 1 normal · Separatisten-Belagerer (BOSS_3_3_1)
    { boss: { hp: 96810, atk: 478, def: 152.5, spd: 1.5 }, minions: [{ hp: 9870, atk: 135, def: 144, spd: 2.5 }, { hp: 9870, atk: 135, def: 144, spd: 2.5 }] },
    // 2 normal · Königlicher Leibwächter Pete (BOSS_3_3_2)
    { boss: { hp: 98990, atk: 547, def: 155, spd: 1.5 }, minions: [{ hp: 9870, atk: 135, def: 144, spd: 2.5 }, { hp: 9870, atk: 135, def: 144, spd: 2.5 }] },
    // 3 normal · Butler Michiels (BOSS_3_4_1)
    { boss: { hp: 101180, atk: 553, def: 157.5, spd: 1.5 }, minions: [{ hp: 9870, atk: 135, def: 144, spd: 2.5 }, { hp: 9870, atk: 135, def: 144, spd: 2.5 }] },
    // 4 normal · Gepfefferte Bridgette (BOSS_3_4_2)
    { boss: { hp: 101770, atk: 640, def: 160, spd: 1.5 }, minions: [{ hp: 9870, atk: 135, def: 144, spd: 2.5 }, { hp: 9870, atk: 135, def: 144, spd: 2.5 }] },
    // 5 normal · Separatisten-Hauptmann DeLana (BOSS_3_5)
    { boss: { hp: 117770, atk: 701, def: 162.5, spd: 1.5 }, minions: [{ hp: 9870, atk: 135, def: 144, spd: 2.5 }, { hp: 9870, atk: 135, def: 144, spd: 2.5 }] },
    // 6 schwer · Turmaine (BOSS_H_3_3)
    { boss: { hp: 6958289, atk: 1143, def: 333, spd: 2.5 }, minions: [{ hp: 360927, atk: 282, def: 295, spd: 2.5 }, { hp: 360927, atk: 282, def: 295, spd: 2.5 }] },
    // 7 schwer · Frost (BOSS_H_3_4)
    { boss: { hp: 7555850, atk: 1157, def: 343, spd: 1 }, minions: [{ hp: 387987, atk: 286, def: 301, spd: 2.5 }, { hp: 387987, atk: 286, def: 301, spd: 2.5 }] },
    // 8 legendär · Schatten: Separatisten-Hauptmann DeLana (BOSS_H_L_3)
    { boss: { hp: 14129018, atk: 1304, def: 453, spd: 0.5 }, minions: [{ hp: 428090, atk: 352, def: 255.5, spd: 2.5 }, { hp: 457050, atk: 361, def: 266, spd: 2.5 }] },
  ],
  7: [ // Löwenstein & Klaueninsel
    // 1 normal · Auferstandene Abscheulichkeit (BOSS_4_1_1)
    { boss: { hp: 178230, atk: 578, def: 190, spd: 1.5 }, minions: [{ hp: 10380, atk: 146, def: 166, spd: 2.5 }, { hp: 13910, atk: 149, def: 172, spd: 2.5 }] },
    // 2 normal · Veteran Auferstandener Grobian (BOSS_4_1_2)
    { boss: { hp: 201560, atk: 587, def: 177.5, spd: 1.5 }, minions: [{ hp: 10380, atk: 146, def: 166, spd: 2.5 }, { hp: 13910, atk: 149, def: 172, spd: 2.5 }] },
    // 3 normal · Admiral Feiste Bakkir (BOSS_4_1_3)
    { boss: { hp: 223940, atk: 596, def: 180, spd: 1.5 }, minions: [{ hp: 13910, atk: 149, def: 172, spd: 2.5 }, { hp: 14010, atk: 147, def: 175.5, spd: 2.5 }] },
    // 4 normal · Morgus Lethe (BOSS_4_2_1)
    { boss: { hp: 259600, atk: 633, def: 182.5, spd: 1.5 }, minions: [{ hp: 14010, atk: 147, def: 175.5, spd: 2.5 }, { hp: 16630, atk: 158, def: 179, spd: 2.5 }] },
    // 5 normal · Faulschreck der Seuchenbringer (BOSS_4_2_2)
    { boss: { hp: 259300, atk: 642, def: 185, spd: 1.5 }, minions: [{ hp: 16630, atk: 158, def: 179, spd: 2.5 }, { hp: 18150, atk: 219, def: 182.5, spd: 2.5 }] },
    // 6 schwer · Monströse Auferstandene Abscheulichkeit (BOSS_H_4_1)
    { boss: { hp: 8153410, atk: 1170, def: 353, spd: 2.5 }, minions: [{ hp: 415048, atk: 291, def: 308, spd: 2.5 }, { hp: 415048, atk: 291, def: 308, spd: 2.5 }] },
    // 7 schwer · Verderbt: Faulschreck der Seuchenbringer (BOSS_H_4_2)
    { boss: { hp: 8750971, atk: 1184, def: 363, spd: 2.5 }, minions: [{ hp: 442108, atk: 295, def: 314, spd: 2.5 }, { hp: 442108, atk: 295, def: 314, spd: 2.5 }] },
  ],
  8: [ // Meerenge der Verwüstung
    // 1 normal · Champion Auferstandener Krait-Nimross (BOSS_4_3_1)
    { boss: { hp: 276260, atk: 736, def: 187.5, spd: 1.5 }, minions: [{ hp: 18150, atk: 219, def: 182.5, spd: 2.5 }, { hp: 18150, atk: 219, def: 182.5, spd: 2.5 }] },
    // 2 normal · Champion Auferstandener Megalodon (BOSS_4_3_2)
    { boss: { hp: 310810, atk: 747, def: 190, spd: 1.5 }, minions: [{ hp: 18150, atk: 219, def: 182.5, spd: 2.5 }, { hp: 18150, atk: 219, def: 182.5, spd: 2.5 }] },
    // 3 normal · Auferstandener Zauberer (BOSS_4_4_1)
    { boss: { hp: 316100, atk: 758, def: 192.5, spd: 1.5 }, minions: [{ hp: 18150, atk: 219, def: 182.5, spd: 2.5 }, { hp: 18150, atk: 219, def: 182.5, spd: 2.5 }] },
    // 4 normal · Champion Auferstandener Kapitän (BOSS_4_4_2)
    { boss: { hp: 333080, atk: 768, def: 195, spd: 1.5 }, minions: [{ hp: 18150, atk: 219, def: 182.5, spd: 2.5 }, { hp: 18150, atk: 219, def: 182.5, spd: 2.5 }] },
    // 5 normal · Auferstandener Priester des Balthasar (BOSS_4_5)
    { boss: { hp: 385120, atk: 996, def: 222.5, spd: 1.5 }, minions: [{ hp: 18150, atk: 219, def: 182.5, spd: 2.5 }, { hp: 18150, atk: 219, def: 182.5, spd: 2.5 }] },
    // 6 schwer · Champion Auferstandener Riese (BOSS_H_4_3)
    { boss: { hp: 9348532, atk: 1197, def: 373, spd: 2.5 }, minions: [{ hp: 469168, atk: 299, def: 320, spd: 2.5 }, { hp: 469168, atk: 299, def: 320, spd: 2.5 }] },
    // 7 schwer · Verderbt: Auferstandener Priester des Balthasar (BOSS_H_4_4)
    { boss: { hp: 9946093, atk: 1210, def: 383, spd: 1 }, minions: [{ hp: 496229, atk: 303, def: 327, spd: 2.5 }, { hp: 496229, atk: 303, def: 327, spd: 2.5 }] },
    // 8 legendär · Schatten: Auferstandener Priester des Balthasar (BOSS_H_L_4)
    { boss: { hp: 14726579, atk: 1318, def: 463, spd: 0.5 }, minions: [{ hp: 543940, atk: 388, def: 298.5, spd: 2.5 }, { hp: 572900, atk: 397, def: 309.5, spd: 2.5 }] },
  ],
  9: [ // Malchors Sprung
    // 1 normal · Auferstandene Brutmutter (BOSS_5_1_1)
    { boss: { hp: 543378, atk: 1002, def: 227.5, spd: 2.5 }, minions: [{ hp: 25669, atk: 222, def: 189, spd: 2.5 }, { hp: 33188, atk: 225, def: 196, spd: 2.5 }] },
    // 2 normal · Inquestur-Ornithologin (BOSS_5_1_2)
    { boss: { hp: 701637, atk: 1008, def: 232.5, spd: 2.5 }, minions: [{ hp: 25669, atk: 222, def: 189, spd: 2.5 }, { hp: 33188, atk: 225, def: 196, spd: 2.5 }] },
    // 3 normal · Golem Typ II YF-Gold (BOSS_5_1_3)
    { boss: { hp: 859895, atk: 1014, def: 237.5, spd: 2.5 }, minions: [{ hp: 25669, atk: 222, def: 189, spd: 2.5 }, { hp: 33188, atk: 225, def: 196, spd: 2.5 }] },
    // 4 normal · Champion Auferstandener Leutnant (BOSS_5_2_1)
    { boss: { hp: 1018153, atk: 1020, def: 242.5, spd: 1 }, minions: [{ hp: 25669, atk: 222, def: 189, spd: 2.5 }, { hp: 33188, atk: 225, def: 196, spd: 2.5 }] },
    // 5 normal · Verdorbene Hohepriesterin (BOSS_5_2_2)
    { boss: { hp: 1176411, atk: 1026, def: 247.5, spd: 2.5 }, minions: [{ hp: 25669, atk: 222, def: 189, spd: 2.5 }, { hp: 33188, atk: 225, def: 196, spd: 2.5 }] },
    // 6 schwer · Auferstandene Priesterin der Dwayna (BOSS_H_5_1)
    { boss: { hp: 10543654, atk: 1224, def: 393, spd: 2.5 }, minions: [{ hp: 523289, atk: 307, def: 333, spd: 2.5 }, { hp: 523289, atk: 307, def: 333, spd: 2.5 }] },
    // 7 schwer · Auge des Zhaitan (BOSS_H_5_2)
    { boss: { hp: 11141214, atk: 1237, def: 403, spd: 2.5 }, minions: [{ hp: 550349, atk: 312, def: 340, spd: 2.5 }, { hp: 550349, atk: 312, def: 340, spd: 2.5 }] },
  ],
  10: [ // Fluchküste
    // 1 normal · Kapitän Gammelbart (BOSS_5_3_1)
    { boss: { hp: 1334670, atk: 1032, def: 252.5, spd: 2.5 }, minions: [{ hp: 25669, atk: 222, def: 189, spd: 2.5 }, { hp: 33188, atk: 225, def: 196, spd: 2.5 }] },
    // 2 normal · Champion Auferstandener Gladiator (BOSS_5_3_2)
    { boss: { hp: 1492928, atk: 1038, def: 257.5, spd: 2.5 }, minions: [{ hp: 25669, atk: 222, def: 189, spd: 2.5 }, { hp: 33188, atk: 225, def: 196, spd: 2.5 }] },
    // 3 normal · Champion Auferstandene Abscheulichkeit (BOSS_5_4_1)
    { boss: { hp: 1651186, atk: 1044, def: 262.5, spd: 1 }, minions: [{ hp: 25669, atk: 222, def: 189, spd: 2.5 }, { hp: 33188, atk: 225, def: 196, spd: 2.5 }] },
    // 4 normal · Champion Auferstandener Hofwart (BOSS_5_4_2)
    { boss: { hp: 1809445, atk: 1050, def: 267.5, spd: 2.5 }, minions: [{ hp: 25669, atk: 222, def: 189, spd: 2.5 }, { hp: 33188, atk: 225, def: 196, spd: 2.5 }] },
    // 5 normal · Auferstandener Priester des Grenth (BOSS_5_5)
    { boss: { hp: 1967703, atk: 1055, def: 272.5, spd: 2.5 }, minions: [{ hp: 25669, atk: 222, def: 189, spd: 2.5 }, { hp: 33188, atk: 225, def: 196, spd: 2.5 }] },
    // 6 schwer · Auferstandener Priester der Melandru (BOSS_H_5_3)
    { boss: { hp: 11738775, atk: 1251, def: 413, spd: 2.5 }, minions: [{ hp: 577410, atk: 316, def: 346, spd: 2.5 }, { hp: 577410, atk: 316, def: 346, spd: 2.5 }] },
    // 7 schwer · Verderbt: Auferstandener Priester des Grenth (BOSS_H_5_4)
    { boss: { hp: 12336336, atk: 1264, def: 423, spd: 1 }, minions: [{ hp: 604470, atk: 320, def: 352.5, spd: 2.5 }, { hp: 604470, atk: 320, def: 352.5, spd: 2.5 }] },
    // 8 legendär · Schatten: Auferstandener Priester des Grenth (BOSS_H_L_5)
    { boss: { hp: 15324140, atk: 1331, def: 472.5, spd: 0.5 }, minions: [{ hp: 659790, atk: 425, def: 341.5, spd: 2.5 }, { hp: 688750, atk: 434, def: 352.5, spd: 2.5 }] },
  ],
};
