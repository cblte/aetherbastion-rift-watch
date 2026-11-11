// =====================================================================
//  Erzeugt js/data/stages.js neu: Zonen-Namen, Lore, Portal, Bosse und
//  Schergen kommen aus ZONES unten; level/cost/rewards bleiben aus der
//  bestehenden Datei (CQHT-Werte; englische Vorlagen-Namen in dev-data/cqht-vorlagen.json). Aufruf:  node tools/gen-zones.mjs .
//
//  Boss-Zuordnung je Zone (bosses = 5 Bosse + Zonen-Endboss):
//    Stufe 1–4  → bosses[0..3]
//    Stufe 5    → bosses[5] (Zonen-Endboss)
//    ☠️ schwer 1 → bosses[4]
//    ☠️ schwer 2 → hard2 (falls angegeben) sonst „Verderbt: <Endboss>“
//    ⭐ legendär → „Schatten: <Endboss>“ (nur in Zonen mit legendärer Stufe)
// =====================================================================
import { writeFileSync, readFileSync } from 'node:fs';
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
  { name: 'Caledon-Wald', short: 'Caledon', portal: 1, theme: 4,
    lore: 'Nahe dem Hain wuchern Albtraum-Ranken aus dem Riss im Caledon-Wald. Der Albtraumhof sieht seine Stunde gekommen.',
    bosses: [
      ['Champion Hylek-Kriegshäuptling'], ['Champion Skritt-Schatzmeister'], ['Champion Albtraumhof-Ritter'], ['Champion Krait-Orakel'],
      ['Verderbter Baumgeist'], ['Albtraumhof-Gräfin', 'Zonen-Endboss'],
    ],
    minions: [
      ['Hylek-Krieger', 'Hylek-Blasrohrschütze'], ['Skritt-Plünderer', 'Skritt-Dieb'],
      ['Albtraumhof-Höfling', 'Albtraumhof-Wächter'], ['Krait-Mystiker', 'Sumpfdrake'],
      ['Waldspinne', 'Rankenwüter'], ['Albtraum-Ranke', 'Verzerrter Sylvari'],
    ] },
  { name: 'Wanderer-Hügel', short: 'Wanderer', portal: 1, theme: 2,
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
  { name: 'Provinz Metrica', short: 'Metrica', portal: 2, theme: 5,
    lore: 'Die Inquestur hat den Riss in der Provinz Metrica nicht entdeckt – sie hat ihn angezapft. Golems bewachen die Messgeräte, und die Versuche geraten außer Kontrolle.',
    bosses: [
      ['Champion Inquestur-Golem'], ['Champion Skritt-Anführer'], ['Champion Riesen-Moa'], ['Inquestur-Versuchsleiterin'],
      ['Entfesseltes Experiment'], ['Kolossaler Inquestur-Golem', 'Zonen-Endboss'],
    ],
    minions: [
      ['Inquestur-Assistent', 'Inquestur-Golem'], ['Skritt-Bastler', 'Skritt-Späher'],
      ['Moa', 'Hylek-Krieger'], ['Inquestur-Techniker', 'Mark-I-Golem'],
      ['Riss-Funke', 'Instabiles Experiment'], ['Inquestur-Wächter', 'Mark-III-Golem'],
    ] },
  { name: 'Ebenen von Aschfurt', short: 'Aschfurt', portal: 2, theme: 3,
    lore: 'In den Ebenen von Aschfurt ruft die Flammenlegion den Riss als Zeichen ihrer Götter aus. Darunter erwachen die Geister Ascalons.',
    bosses: [
      ['Champion Verschlinger-Königin'], ['Champion Skal-Alpha'], ['Separatisten-Anführerin'], ['Champion Ascalonischer Geisterhauptmann'],
      ['Flammenlegion-Schamane'], ['Flammenlegion-Kriegsherr', 'Zonen-Endboss'],
    ],
    minions: [
      ['Verschlinger', 'Verschlinger-Brut'], ['Skal', 'Wildkatze'],
      ['Separatisten-Kämpfer', 'Separatisten-Brandstifter'], ['Ascalonischer Geist', 'Geister-Bogenschütze'],
      ['Flammenlegion-Krieger', 'Feuerelementar'], ['Flammenlegion-Kultist', 'Flammenlegion-Zerstörer'],
    ] },
  { name: 'Caudecus’ Anwesen', short: 'Anwesen', portal: 2, theme: 1,
    lore: 'Alle Spuren aus den Heimatgebieten führen zurück ins Königintal: in Caudecus’ Anwesen. Hauptmann DeLana und die Separatisten verschanzen sich hinter dem flackernden Riss.',
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
  { name: 'Löwenstein & Klaueninsel', short: 'Klaue', portal: 3, theme: 2,
    lore: 'Nach dem Anwesen ruft der Pakt nach Löwenstein. Vor der Stadt öffnet sich ein Riss über dem Meer des Leids, und Zhaitans Totenschiffe halten auf die Klaueninsel zu.',
    bosses: [
      ['Auferstandene Abscheulichkeit', 'Wall von Fort Unerschütterlich'], ['Veteran Auferstandener Grobian', 'Löwenfackel'],
      ['Admiral Feiste Bakkir', 'Vergeltung'], ['Morgus Lethe', 'Meer des Leids'],
      ['Monströse Auferstandene Abscheulichkeit'], ['Faulschreck der Seuchenbringer', 'Zonen-Endboss'],
    ],
    minions: [
      ['Auferstandener Leibeigener', 'Auferstandener Pirat'], ['Auferstandener Grobian', 'Auferstandener Seuchenträger'],
      ['Auferstandener Knappe', 'Auferstandener Ritter'], ['Auferstandener Hai', 'Untoter Riesenhai'],
      ['Auferstandene Abscheulichkeit', 'Auferstandener Verseuchter'], ['Auferstandener Verderber', 'Auferstandene Seuchenträgerin'],
    ] },
  { name: 'Meerenge der Verwüstung', short: 'Meerenge', portal: 3, theme: 4,
    lore: 'Vom Fort der Dreifaltigkeit aus setzt der Pakt nach Orr über. In der Meerenge der Verwüstung reißt der Riss den Meeresboden auf, und Auferstandene strömen zum Tempel des Balthasar.',
    bosses: [
      ['Champion Auferstandener Krait-Nimross'], ['Champion Auferstandener Megalodon', 'Fort der Dreifaltigkeit'],
      ['Auferstandener Zauberer', 'Turm des Wesirs'], ['Champion Auferstandener Kapitän', 'Paradeplatz'],
      ['Champion Auferstandener Riese', 'Tempel des Balthasar'], ['Auferstandener Priester des Balthasar', 'Zonen-Endboss'],
    ],
    minions: [
      ['Auferstandener Krait-Damoss', 'Auferstandener Krait-Hypnoss'], ['Auferstandener Bullenhai', 'Auferstandener Krebs'],
      ['Auferstandener Akolyth', 'Auferstandene Zauberin'], ['Auferstandener Pirat', 'Auferstandener Kommandeur'],
      ['Auferstandener Unterwerfer', 'Auferstandenen-Luftabwehrgeschütz'], ['Auferstandener Verwüster', 'Auferstandener Bewahrer'],
    ] },
  { name: 'Malchors Sprung', short: 'Malchor', portal: 4, theme: 3,
    lore: 'In Malchors Sprung stehen die Kathedralen der Dwayna und der Lyssa. Der Riss nährt die Verderbnis in ihren Hallen, und die Inquestur zapft am Rand die Energie ab.',
    bosses: [
      ['Auferstandene Brutmutter', 'Lindwurm-Eier'], ['Inquestur-Ornithologin', 'Hühnerställe'],
      ['Golem Typ II YF-Gold', 'Omicron-Anlage'], ['Champion Auferstandener Leutnant', 'Kathedrale der Zephyre'],
      ['Auferstandene Priesterin der Dwayna', 'Kathedrale der Zephyre'], ['Verdorbene Hohepriesterin', 'Zonen-Endboss · Kathedrale des Ewigen Leuchtens'],
    ],
    hard2: ['Auge des Zhaitan', 'Königspassage'],
    minions: [
      ['Auferstandenes Lindwurm-Junges', 'Auferstandener Lindwurm'], ['Auferstandenes Huhn', 'Auferstandener Bauer'],
      ['Pyrit-Elementar', 'Inquestur-Golem'], ['Auferstandener Edelmann', 'Auferstandener Hofnarr'],
      ['Auferstandene Akolythin', 'Auferstandener Verweser'], ['Auferstandenes Gespenst', 'Auferstandener Hylek'],
    ] },
  { name: 'Fluchküste', short: 'Fluchk.', portal: 4, theme: 5,
    lore: 'An der Fluchküste endet der Weg durch Orr. Hinter den Tempeln der Melandru und des Grenth liegt Arah, und der Riss hier ist der größte, den die Gilde je gesehen hat.',
    bosses: [
      ['Kapitän Gammelbart', 'Auferstandener Piratenkapitän'], ['Champion Auferstandener Gladiator', 'Balthasars Arena'],
      ['Champion Auferstandene Abscheulichkeit', 'Kastell Schattenlieb'], ['Champion Auferstandener Hofwart', 'Wintertotengeläut-Insel'],
      ['Auferstandener Priester der Melandru', 'Tempel der Melandru'], ['Auferstandener Priester des Grenth', 'Zonen-Endboss · Kathedrale der Stille'],
    ],
    minions: [
      ['Auferstandener Pirat', 'Auferstandener Fischer'], ['Auferstandener Gorilla', 'Orrianischer Gorilla'],
      ['Orrianischer Grobian', 'Orrianischer Schlurfer'], ['Auferstandene Spinne', 'Auferstandene Spinnenbrut'],
      ['Teer-Elementar', 'Orrianischer Spektralhammer'], ['Orrianische Spektralwache', 'Auferstandener Verweser'],
    ] },
];
// Legendäre Stufen (Schattenform des Endbosses): Schergen aus dem Riss
const LEGEND_MINIONS = ['Kryptis-Plünderer', 'Kryptis-Peiniger'];
const HARD2_MINION = 'Kryptis-Splitter';

const tag = (s) => s.toUpperCase()
  .replace(/Ä/g, 'AE').replace(/Ö/g, 'OE').replace(/Ü/g, 'UE').replace(/ß/g, 'SS').replace(/’/g, '')
  .replace(/[^A-Z0-9]+/g, '_').replace(/^_|_$/g, '');
// Angriffsart (#051 D) nach dem Namen: melee = trifft den Anführer, ranged = ein Ziel,
// magic = Fläche (COMBAT in js/config.js). Fernkampf wird vor Magie geprüft (Geister-Bogenschütze).
// ATTACK_OVERRIDE setzt einzelne Gegner fest, wenn die Regel danebenliegt.
const RANGED = /schütz|bogen|bomber|kanonier|geschütz|späher|blasrohr|brandstifter|wyvern|junges|belagerer|ornithologin/i;
const MAGIC = /schaman|mystiker|geist|gespenst|spektral|elementar|funke|experiment|kultist|zauber|akolyth|priester|hexe|orakel|verderber|seuchen|hypnoss|schattenbrut|peiniger|vorbote|auge des|verweser|splitter/i;
const ATTACK_OVERRIDE = { 'Ascalonischer Geist': 'magic', 'Verderbter Baumgeist': 'melee' };
export const attackOf = (name) => ATTACK_OVERRIDE[name.replace(/^(Champion|Verderbt:|Schatten:|Veteran) /, '')]
  || (RANGED.test(name) ? 'ranged' : MAGIC.test(name) ? 'magic' : 'melee');
const boss = (name) => ({ name, sprite: `BOSS_${tag(name)}`, attack: attackOf(name) });

// Profile der Schergen (#062): verschieben nur die Werte, die Gesamtstärke bleibt (Faktoren: MOB_PROFILES in js/config.js).
//   rohling = langsam und zäh · flink = schnell, wenig LP · schuetze = hoher Schaden, wenig DEF · sonst standard.
// Fern- und Magie-Angreifer sind Schützen; Nahkämpfer nach Namen. PROFILE_OVERRIDE setzt einzelne Gegner fest.
const ROHLING = /troll|ettin|oger|jotun|minotaur|golem|grobian|abscheulich|dolyak|arctodus|behemoth|schaufler|wächter|wache|eber|wildschwein|schleim|berserker|zerstörer|eisbrecher|leibeigener|skal|elementar|wurm|ranke/i;
const FLINK = /spinne|raptor|wolf|warg|leopard|jaguar|skritt|moskito|katze|dieb|beutelschneider|pirscher|raupe|junges|brut|wachhund|moa|drake|duellant|klingenstürmer|plünderer/i;
const PROFILE_OVERRIDE = {};
export const profileOf = (name, attack) => PROFILE_OVERRIDE[name]
  || (attack !== 'melee' ? 'schuetze' : ROHLING.test(name) ? 'rohling' : FLINK.test(name) ? 'flink' : 'standard');
const ATTACK_DE = { Nahkampf: 'melee', Fernkampf: 'ranged', Magie: 'magic' };
const mob = (name, extra = {}) => {
  const attack = extra.attack || attackOf(name);
  return { name, sprite: `MOB_${tag(name)}`, attack, profile: profileOf(name, attack),
    ...(extra.flavor ? { flavor: extra.flavor } : {}), ...(extra.rift ? { rift: extra.rift } : {}) };
};

// Mehr Schergen je Stufe (#026): dev-data/gegner-pro-zone.jsonl (zone, name, stages 1–5, attack, flavor, rift).
// Normale Stufen aller Zonen (1–6 aus Gemini, bereinigt; 7–10 aus der DE-Wiki, v0.43.0): die festen Schergen aus ZONES vorn, dazu JSONL-Gegner der Stufe, bis MAX_MINIONS erreicht sind.
const MAX_MINIONS = 5;
const EXTRA = readFileSync(`${root}/dev-data/gegner-pro-zone.jsonl`, 'utf8').trim().split(/\r?\n/).map(l => JSON.parse(l));
const extraFor = (zoneName, stageNr) => EXTRA.filter(r => r.zone === zoneName && r.stages.includes(stageNr));
const riftText = (r) => (r.rift?.ability ? r.rift.ability : '');
function normalMinions(z, names, stageNr) {
  const rows = extraFor(z.name, stageNr);
  const byName = Object.fromEntries(rows.map(r => [r.name, r]));
  const fixed = names.map(n => mob(n, byName[n] ? { attack: ATTACK_DE[byName[n].attack], flavor: byName[n].flavor, rift: riftText(byName[n]) } : {}));
  const more = rows.filter(r => !names.includes(r.name))
    .map(r => mob(r.name, { attack: ATTACK_DE[r.attack], flavor: r.flavor, rift: riftText(r) }));
  return [...fixed, ...more].slice(0, MAX_MINIONS);
}

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
    stages.push({ ...s, boss: boss(b[0]), minions: normalMinions(z, m, k + 1), info: b[1] ? (b[1] === 'Zonen-Endboss' ? 'Zonen-Endboss' : b[1]) : '' });
  });
  hard.forEach((s, k) => {
    if (k === 0) {
      const b = z.bosses[4];
      stages.push({ ...s, boss: boss(b[0]), minions: (z.hardMinions ? z.hardMinions : z.minions[4]).map(n => mob(n)), info: `Schwer${b[1] ? ` · ${b[1]}` : ''}` });
    } else {
      const name = z.hard2 ? z.hard2[0] : `Verderbt: ${end}`;
      stages.push({ ...s, boss: boss(name), minions: [z.minions[5][0], HARD2_MINION].map(n => mob(n)), info: z.hard2 ? `Schwer · ${z.hard2[1]}` : 'Schwer · vom Riss verderbt' });
    }
  });
  legend.forEach((s) => {
    stages.push({ ...s, boss: boss(`Schatten: ${end}`), minions: LEGEND_MINIONS.map(n => mob(n)), info: 'Legendär · Schattenform des Endbosses' });
  });
  out.push({ id: oz.id, name: z.name, short: z.short, tier: oz.tier, part: oz.part, portal: z.portal, theme: z.theme, lore: z.lore, stages });
});

const j = (v) => JSON.stringify(v);
const stageLine = (st) => {
  const flags = (st.hard ? 'hard: true, ' : '') + (st.legend ? 'legend: true, ' : '');
  const r = st.rewards;
  return `      { ${flags}level: ${st.level}, cost: ${st.cost}, boss: ${j(st.boss)},\n` +
    `        minions: ${j(st.minions)},\n` +
    `        rewards: { rp: ${j(r.rp)}, weapons: ${r.weapons}, rations: ${r.rations}, tickets: ${j(r.tickets)} }, info: ${j(st.info)} },`;
};

let txt = `// =====================================================================
//  Riss-Zonen & Stufen
//  ⚠️ Erzeugt mit \`node tools/gen-zones.mjs .\` – Namen, Bosse, Schergen und
//  Portal dort ändern, nicht hier.
//
//  Je zwei Zonen bilden ein Kapitel (tier = Kapitel 1–5, part = 1. oder 2. Hälfte).
//  Pro Zone: 5 normale Stufen, danach schwere (☠️) und in Teil 2 eine
//  legendäre (⭐) Stufe. Herkunft der Zahlen: dev-data/DATA.md.
//  Zonen 1–5 sind die Heimatgebiete der fünf Völker: Mensch (Königintal),
//  Sylvari (Caledon), Norn (Wanderer-Hügel), Asura (Metrica), Charr (Aschfurt).
//  Zone 6 Caudecus’ Anwesen ist das Finale der Auftragsreihe. Portale:
//  1 Kryta, Caledon & Zittergipfel · 2 Metrica, Aschfurt & Anwesen ·
//  3 Löwenstein & Meerenge · 4 Orr.
//  Zonen 7–10 folgen der persönlichen Geschichte: Klaueninsel, dann über die
//  Meerenge der Verwüstung und Malchors Sprung bis zur Fluchküste vor Arah.
//    tier    – Kapitel; steuert Boss-Scherben, Waffen- und Proviant-Güte
//    portal  – nötige Riss-Portal-Stufe
//    theme   – Farbstimmung der Kampfbühne (CSS .stage.zone-1..5)
//    level   – empfohlenes Heldenlevel / Monsterstufe
//    cost    – Gold für eine Boss-Herausforderung
//    rewards – Boss-Belohnung: rp = zusätzliche 🔮 Ätherscherben,
//              weapons = Waffen-Drops, rations = Proviant,
//              tickets = Arena-Tickets (noch ohne Funktion)
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
