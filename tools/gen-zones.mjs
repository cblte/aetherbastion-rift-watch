// =====================================================================
//  Erzeugt js/data/stages.js neu: Zonen-Namen, Lore, Portal, Bosse und
//  Schergen kommen aus ZONES unten; level/cost/rewards/src bleiben aus der
//  bestehenden Datei (CQHT-Werte). Aufruf:  node tools/gen-zones.mjs .
//
//  Boss-Zuordnung je Zone (bosses = 5 Bosse + Zonen-Endboss):
//    Stufe 1–4  → bosses[0..3]
//    Stufe 5    → bosses[5] (Zonen-Endboss)
//    ☠️ schwer 1 → bosses[4]
//    ☠️ schwer 2 → hard2 (falls angegeben) sonst „Verderbt: <Endboss>“
//    ⭐ legendär → „Schatten: <Endboss>“ (nur in Zonen mit legendärer Stufe)
// =====================================================================
import { writeFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';

const root = process.argv[2] || '.';
const { ZONE_DATA: OLD } = await import(pathToFileURL(`${root}/js/data/stages.js`).href);

// theme = Farbstimmung der Kampfbühne (CSS .stage.zone-1..5)
const ZONES = [
  { name: 'Königintal', short: 'Königintal', portal: 1, theme: 1,
    lore: 'Über dem Königintal bei Beetletun reißt der erste Riss auf. Banditen nutzen das Chaos, und aus dem Riss kriechen Schatten.',
    bosses: [
      ['Banditen-Anführerin', 'Alte Mühle'], ['Champion Banditen-Saboteur'], ['Champion Eichenherz'], ['Champion Krait-Hexe'],
      ['Champion Höhlentroll'], ['Schatten-Behemoth', 'Zonen-Endboss'],
    ],
    minions: [
      ['Banditen-Beutelschneider', 'Banditen-Schläger'], ['Banditen-Bomber', 'Banditen-Brandstifter'],
      ['Waldspinne', 'Wildschwein'], ['Krait-Sklaventreiber', 'Krait-Speerträger'],
      ['Höhlenspinne', 'Junger Troll'], ['Schattenbrut', 'Verzerrter Geist'],
    ] },
  { name: 'Kessex-Hügel', short: 'Kessex', portal: 1, theme: 4,
    lore: 'Im Sumpfland der Kessex-Hügel giftet der Riss das Wasser. Krait, Zentauren und die Hexen des Waldes werden unruhig.',
    bosses: [
      ['Banditen-Schläger Grasp'], ['Champion Krait-Hypnotiseur'], ['Champion Toxischer Wurm'], ['Zentauren-Oberhäuptling'],
      ['Blut-Hexe'], ['Champion Toxischer Spinnen-König', 'Zonen-Endboss'],
    ],
    minions: [
      ['Banditen-Rabauke', 'Banditen-Scharfschütze'], ['Krait-Mystiker', 'Krait-Wächter'],
      ['Toxischer Larvenwurm', 'Sumpfdrake'], ['Zentauren-Krieger', 'Zentauren-Späher'],
      ['Hexen-Diener', 'Blutfledermaus'], ['Toxische Spinne', 'Toxischer Wucherer'],
    ] },
  { name: 'Caudecus’ Anwesen', short: 'Anwesen', portal: 1, theme: 3,
    lore: 'Die Spur führt in Caudecus’ Anwesen. Hauptmann DeLana und die Separatisten verschanzen sich hinter dem flackernden Riss.',
    bosses: [
      ['Separatisten-Belagerer', 'Geschichte'], ['Königlicher Leibwächter Pete', 'Geschichte'], ['Butler Michiels', 'Weg 3'],
      ['Gepfefferte Bridgette', 'Weg 2'], ['Turmaine', 'Weg 2'], ['Separatisten-Hauptmann DeLana', 'Zonen-Endboss'],
    ],
    hard2: ['Frost', 'Endboss von Weg 1'],
    minions: [
      ['Separatisten-Kämpfer', 'Separatisten-Bomber'], ['Königlicher Wächter', 'Separatisten-Feldwebel'],
      ['Diener des Hauses', 'Abgerichteter Wachhund'], ['Seraphen-Deserteur', 'Banditen-Kanonier'],
      ['Seraphen-Armbrustschütze', 'Mark-II-Golem'], ['Separatisten-Scharfschütze', 'Separatisten-Leutnant'],
    ],
    hardMinions: ['Asura-Wachgolem', 'Banditen-Raketengeschütz'] },
  { name: 'Wanderer-Hügel', short: 'Wanderer', portal: 2, theme: 2,
    lore: 'Eisige Winde über den Wanderer-Hügeln. Söhne des Svanir und Grawl beten den Riss als Zeichen Jormags an.',
    bosses: [
      ['Champion Minotauren-Bulle'], ['Champion Grawl-Häuptling'], ['Champion Eisbrut-Wolf'], ['Schamanen-Vorbote des Jormag'],
      ['Eisbrut-Goliath'], ['Svanir-Schamane', 'Zonen-Endboss · die Maw'],
    ],
    minions: [
      ['Minotaurus', 'Schneeleopard'], ['Grawl-Krieger', 'Grawl-Schamane'],
      ['Eisbrut-Wolf', 'Eisbrut-Elementar'], ['Sohn des Svanir', 'Svanir-Eisbrecher'],
      ['Eisbrut-Bär', 'Eisbrut-Wyvern'], ['Svanir-Schamanin', 'Eisgeist'],
    ] },
  { name: 'Schneekuhlen-Höhen', short: 'Schneek.', portal: 2, theme: 2,
    lore: 'In den Schneekuhlen-Höhen graben sich Dredge zum Riss vor, während die Svanir ihren Drachen anrufen.',
    bosses: [
      ['Schneeleoparden-Matriarchin'], ['Champion Svanir-Häscher'], ['Champion Frost-Grawl'], ['Dredge-Tunnelmeister'],
      ['Eisbrut-Riese'], ['Drachen-Schamane der Svanir', 'Zonen-Endboss'],
    ],
    minions: [
      ['Schneeleopard', 'Eiswolf'], ['Svanir-Jäger', 'Svanir-Plünderer'],
      ['Frost-Grawl', 'Grawl-Steinwerfer'], ['Dredge-Bergarbeiter', 'Dredge-Schallkanone'],
      ['Eisbrut-Troll', 'Eisbrut-Koloss'], ['Svanir-Drachenrufer', 'Eisbrut-Diener'],
    ] },
  { name: 'Katakomben von Ascalon', short: 'Katak.', portal: 2, theme: 5,
    lore: 'Unter den Ruinen von Ascalon öffnet sich ein Riss in die Katakomben. Die Geister der alten Könige finden keine Ruhe.',
    bosses: [
      ['Höhlentroll', 'Katakomben'], ['Kasha Schwarzblut', 'Flammenlegion'], ['Ralena & Vassar', 'Liebespaar'],
      ['Geisterhafter Nekromant'], ['Meister-Nekromant'], ['König Adelbern', 'Zonen-Endboss'],
    ],
    minions: [
      ['Geister-Krieger', 'Geister-Waldläufer'], ['Flammenlegion-Kultist', 'Flammenlegion-Zerstörer'],
      ['Geister-Liebende', 'Geister-Wächter'], ['Knochen-Diener', 'Geister-Nekromant'],
      ['Untoter Kanonier', 'Knochen-Schrecken'], ['Ascalonischer Geisterritter', 'Geister-Elite'],
    ] },
  { name: 'Gendarran-Felder', short: 'Gendarran', portal: 3, theme: 1,
    lore: 'Über den Gendarran-Feldern stehen gleich mehrere Risse. Zentauren, Dredge und Piraten wittern ihre Chance.',
    bosses: [
      ['Piratinnen-Kapitänin'], ['Champion Schlamm-Monstrum'], ['Zentauren-Belagerungsmeister'], ['Dredge-Kommandant'],
      ['Champion Banditen-Kriegsherr'], ['Kriegsmeister Ulgoths Vorbote', 'Zonen-Endboss'],
    ],
    minions: [
      ['Piraten-Entermatrose', 'Piraten-Kanonier'], ['Schlamm-Elementar', 'Sumpfkrebs'],
      ['Zentauren-Belagerer', 'Zentauren-Bogenschütze'], ['Dredge-Sprengmeister', 'Dredge-Kommissar'],
      ['Banditen-Kriegsherr-Garde', 'Banditen-Plünderer'], ['Modniir-Krieger', 'Zentauren-Kriegstrommler'],
    ] },
  { name: 'Harathi-Hinterland', short: 'Harathi', portal: 3, theme: 3,
    lore: 'Im Harathi-Hinterland tobt der Zentaurenkrieg. Ulgoth sammelt seine Horden am Rand eines gewaltigen Risses.',
    bosses: [
      ['Harathi-Schlächter'], ['Champion Modniir-Häuptling'], ['Kolossaler Erdelementar'], ['Seraphen-Verräter Valen'],
      ['Zentauren-Kriegsherr Kol'], ['Kriegsmeister Ulgoth', 'Zonen-Endboss'],
    ],
    minions: [
      ['Harathi-Krieger', 'Harathi-Speerwerfer'], ['Modniir-Berserker', 'Modniir-Schamane'],
      ['Erdelementar', 'Steinwüter'], ['Abtrünniger Seraph', 'Seraphen-Deserteur'],
      ['Zentauren-Lanzenreiter', 'Zentauren-Kriegsschamane'], ['Ulgoths Leibgarde', 'Modniir-Kriegsherr'],
    ] },
  { name: 'Blutstrom-Küste', short: 'Blutstrom', portal: 4, theme: 4,
    lore: 'An der Blutstrom-Küste spült der Riss Auferstandene aus Orr an. Krait und Piraten kämpfen um jeden Strand.',
    bosses: [
      ['Champion Krait-Priester'], ['Champion Auferstandener Offizier'], ['Dredge-Kriegsmaschine'], ['Piratinnen-Admiralin'],
      ['Champion Kropf-Krake'], ['Dreiköpfige Krait-Bestie', 'Zonen-Endboss'],
    ],
    minions: [
      ['Krait-Zelot', 'Krait-Neophyt'], ['Auferstandener Matrose', 'Auferstandener Grubenarbeiter'],
      ['Dredge-Schweißer', 'Dredge-Panzer'], ['Piraten-Maat', 'Piraten-Harpunier'],
      ['Riffkrake', 'Tiefsee-Lauerer'], ['Krait-Wyrmschlange', 'Krait-Schreckensbrut'],
    ] },
  { name: 'Funkenschwärmersumpf', short: 'Sumpf', portal: 4, theme: 5,
    lore: 'Im Funkenschwärmersumpf brodelt Zhaitans Verderbnis. Aus dem Nebel über dem Wasser erhebt sich Tequatl der Sonnenlose.',
    bosses: [
      ['Champion Auferstandener Priester'], ['Champion Krait-Echse'], ['Zhaff-Sumpfmonster'], ['Hylek-Schamane Cuatl'],
      ['Megawurm'], ['Tequatl der Sonnenlose', 'Zonen-Endboss'],
    ],
    minions: [
      ['Auferstandener Akolyth', 'Auferstandener Schreckenswandler'], ['Krait-Echse', 'Krait-Schlinger'],
      ['Sumpfschlurfer', 'Sumpf-Moskito'], ['Hylek-Krieger', 'Hylek-Giftmischer'],
      ['Wurmbrut', 'Sandwurm-Larve'], ['Auferstandener Knochenmagier', 'Tequatls Diener'],
    ] },
];
// Legendäre Stufen (Schattenform des Endbosses): Schergen aus dem Riss
const LEGEND_MINIONS = ['Kryptis-Plünderer', 'Kryptis-Peiniger'];
const HARD2_MINION = 'Kryptis-Splitter';

const tag = (s) => s.toUpperCase()
  .replace(/Ä/g, 'AE').replace(/Ö/g, 'OE').replace(/Ü/g, 'UE').replace(/ß/g, 'SS').replace(/’/g, '')
  .replace(/[^A-Z0-9]+/g, '_').replace(/^_|_$/g, '');
const boss = (name) => ({ name, sprite: `BOSS_${tag(name)}` });
const mob = (name) => ({ name, sprite: `MOB_${tag(name)}` });

const out = [];
OLD.forEach((oz, zi) => {
  const z = ZONES[zi];
  const normal = oz.stages.filter(s => !s.hard);
  const hard = oz.stages.filter(s => s.hard && !s.legend);
  const legend = oz.stages.filter(s => s.legend);
  const end = z.bosses[5][0].replace(/^Champion /, '');
  const stages = [];
  normal.forEach((s, k) => {
    const b = k < 4 ? z.bosses[k] : z.bosses[5];
    const m = k < 4 ? z.minions[k] : z.minions[5];
    stages.push({ ...s, boss: boss(b[0]), minions: m.map(mob), info: b[1] ? (b[1] === 'Zonen-Endboss' ? 'Zonen-Endboss' : b[1]) : '' });
  });
  hard.forEach((s, k) => {
    if (k === 0) {
      const b = z.bosses[4];
      stages.push({ ...s, boss: boss(b[0]), minions: (z.hardMinions ? z.hardMinions : z.minions[4]).map(mob), info: `Schwer${b[1] ? ` · ${b[1]}` : ''}` });
    } else {
      const name = z.hard2 ? z.hard2[0] : `Verderbt: ${end}`;
      stages.push({ ...s, boss: boss(name), minions: [z.minions[5][0], HARD2_MINION].map(mob), info: z.hard2 ? `Schwer · ${z.hard2[1]}` : 'Schwer · vom Riss verderbt' });
    }
  });
  legend.forEach((s) => {
    stages.push({ ...s, boss: boss(`Schatten: ${end}`), minions: LEGEND_MINIONS.map(mob), info: 'Legendär · Schattenform des Endbosses' });
  });
  out.push({ id: oz.id, name: z.name, short: z.short, tier: oz.tier, part: oz.part, portal: z.portal, theme: z.theme, lore: z.lore, stages });
});

const j = (v) => JSON.stringify(v);
const stageLine = (st) => {
  const flags = (st.hard ? 'hard: true, ' : '') + (st.legend ? 'legend: true, ' : '');
  const r = st.rewards;
  return `      { ${flags}level: ${st.level}, cost: ${st.cost}, boss: ${j(st.boss)},\n` +
    `        minions: ${j(st.minions)},\n` +
    `        rewards: { rp: ${j(r.rp)}, weapons: ${r.weapons}, rations: ${r.rations}, tickets: ${j(r.tickets)} }, info: ${j(st.info)}, src: ${j(st.src)} },`;
};

let txt = `// =====================================================================
//  Riss-Zonen & Stufen
//  ⚠️ Erzeugt mit \`node tools/gen-zones.mjs .\` – Namen, Bosse, Schergen und
//  Portal dort ändern, nicht hier.
//
//  Die Zahlen stammen aus CQHT „Progression → Stages“: Jedes CQHT-Kapitel ist
//  auf zwei Zonen aufgeteilt (tier = Kapitel 1–5, part = 1. oder 2. Hälfte).
//  Pro Zone: 5 normale Stufen, danach schwere (☠️) und in Teil 2 eine
//  legendäre (⭐) Stufe:
//    Teil 1: CQHT X-1..5  + Hard X-1..2
//    Teil 2: CQHT X-6..10 + Hard X-3..4 + L-X
//  Zonen-Reihenfolge und Bosse folgen GW2 (Portal 1: Kryta, 2: Zittergipfel
//  & Ascalon, 3: Herz von Tyria, 4: Küste & Sümpfe von Orr).
//    tier    – CQHT-Kapitel; steuert Boss-Scherben, Waffen- und Proviant-Güte
//    portal  – nötige Riss-Portal-Stufe
//    theme   – Farbstimmung der Kampfbühne (CSS .stage.zone-1..5)
//    level   – empfohlenes Heldenlevel / Monsterstufe (CQHT „Lv.“)
//    cost    – Gold für eine Boss-Herausforderung (CQHT „cost“)
//    rewards – Boss-Belohnung: rp = 📜 Forschungsnotizen (CQHT Honor),
//              weapons = Waffen-Drops, rations = Proviant (CQHT Bread),
//              tickets = Arena-Tickets (noch ohne Funktion)
//    src     – Name des CQHT-Originals (nur zur Orientierung)
//  Schwierigkeit \`d\` wird in config.js aus level/cost berechnet.
//  👉 Zonen-IDs und Stufen-Reihenfolge nicht ändern ohne Save-Migration.
// =====================================================================
export const ZONE_DATA = [
`;
for (const z of out) {
  txt += `  { id: ${z.id}, name: ${j(z.name)}, short: ${j(z.short)}, tier: ${z.tier}, part: ${z.part}, portal: ${z.portal}, theme: ${z.theme},\n`;
  txt += `    lore: ${j(z.lore)},\n    stages: [\n`;
  txt += z.stages.map(stageLine).join('\n') + '\n    ] },\n';
}
txt += `];
export const NORMAL_STAGES = 5; // normale Stufen je Zone; danach folgen schwere (und in Teil 2 eine legendäre)
`;
writeFileSync(`${root}/js/data/stages.js`, txt);
console.log(out.map(z => `${z.id} ${z.name} (Portal ${z.portal}): ${z.stages.map(s => s.boss.name).join(' | ')}`).join('\n'));
