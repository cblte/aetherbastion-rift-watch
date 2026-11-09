// =====================================================================
//  Erzeugt js/data/monsterStats.js: Kampfwerte jedes Bosses und Schergen
//  der Zonen 1–10, 1:1 aus der CQHT-Vorlage (#061 Schritt 2).
//  Quelle: dev-data/gw2-monsters.json (node tools/build-gw2-monsters.mjs .),
//  dort hat jeder Gegner seine CQHT-Vorlage mit hp1/atk1/defense/attackSpeed.
//  Aufruf:  node tools/gen-monster-stats.mjs .
//  Nach gen-zones.mjs + build-gw2-monsters.mjs neu erzeugen.
// =====================================================================
import { readFileSync, writeFileSync } from 'node:fs';

const root = process.argv[2] || '.';
const src = JSON.parse(readFileSync(`${root}/dev-data/gw2-monsters.json`, 'utf8'));

const pick = (m, where) => {
  const s = m.stats;
  if (!s) throw new Error(`Keine CQHT-Werte: ${where} ${m.name}`);
  return { hp: s.hp1, atk: s.atk1, def: s.defense, spd: s.attackSpeed, src: m.cqht?.id || '' };
};

const zones = src.zones.filter(z => z.source === 'js/data/stages.js');
const lines = zones.map(z => {
  const stages = z.stages.map(s => {
    const b = pick(s.boss, `Zone ${z.id} Stufe ${s.nr}`);
    const mins = s.minions.map(m => pick(m, `Zone ${z.id} Stufe ${s.nr}`));
    const f = (o) => `{ hp: ${o.hp}, atk: ${o.atk}, def: ${o.def}, spd: ${o.spd} }`;
    return `    // ${s.nr} ${s.kind} · ${s.boss.name} (${b.src})\n    { boss: ${f(b)}, minions: [${mins.map(f).join(', ')}] },`;
  });
  return `  ${z.id}: [ // ${z.zone}\n${stages.join('\n')}\n  ],`;
});

const txt = `// =====================================================================
//  Kampfwerte der Gegner – 1:1 aus CQHT (#061)
//  ⚠️ Erzeugt mit \`node tools/gen-monster-stats.mjs .\` aus dev-data/gw2-monsters.json,
//  nicht von Hand bearbeiten.
//  Je Zone eine Liste der Stufen (Reihenfolge wie in stages.js):
//    hp/atk = LP und Schaden je Treffer (CQHT hp1/atk1), def = DEF (= RES),
//    spd = Sekunden zwischen zwei Angriffen (CQHT attackSpeed).
//  Regler (Bosse, schwere/legendäre Stufen, Veteranen) stehen in COMBAT (config.js).
// =====================================================================
export const MONSTER_STATS = {
${lines.join('\n')}
};
`;
writeFileSync(`${root}/js/data/monsterStats.js`, txt);
console.log(`js/data/monsterStats.js: ${zones.length} Zonen, ${zones.reduce((n, z) => n + z.stages.length, 0)} Stufen`);
