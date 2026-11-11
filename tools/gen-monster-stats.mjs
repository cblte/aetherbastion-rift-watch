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
// Beute je Sieg (#061): EXP und Gold aus den Drops der Vorlage. Bosse haben keine; ihre Beute
// rechnet combat.js aus dem Schnitt der Schergen der Stufe × COMBAT.BOSS_EXP_MULT/BOSS_GOLD_MULT.
const drop = (m, kind) => m.drops?.find(d => d.dropId?.endsWith('_' + kind))?.amount ?? null;
// Vorlagen ohne Drops (Schergen der legendären Stufen): höchster Wert aller anderen Schergen (Lv.-60-Niveau)
const allMinions = src.zones.filter(z => z.source === 'js/data/stages.js').flatMap(z => z.stages.flatMap(s => s.minions));
const maxDrop = (kind) => Math.max(...allMinions.map(m => drop(m, kind) ?? 0));
const FALLBACK = { exp: maxDrop('EXP'), gold: maxDrop('GOLD') };
const loot = (m) => {
  const exp = drop(m, 'EXP'), gold = drop(m, 'GOLD');
  return exp == null || gold == null ? { ...FALLBACK } : { exp, gold };
};

const zones = src.zones.filter(z => z.source === 'js/data/stages.js');
const lines = zones.map(z => {
  const stages = z.stages.map(s => {
    const b = pick(s.boss, `Zone ${z.id} Stufe ${s.nr}`);
    const mins = s.minions.map(m => ({ ...pick(m, `Zone ${z.id} Stufe ${s.nr}`), ...loot(m, `Zone ${z.id} Stufe ${s.nr}`) }));
    const f = (o) => `{ hp: ${o.hp}, atk: ${o.atk}, def: ${o.def}, spd: ${o.spd}${o.exp != null ? `, exp: ${o.exp}, gold: ${o.gold}` : ''} }`;
    return `    // ${s.nr} ${s.kind} · ${s.boss.name}\n    { boss: ${f(b)}, minions: [${mins.map(f).join(', ')}] },`;
  });
  return `  ${z.id}: [ // ${z.zone}\n${stages.join('\n')}\n  ],`;
});

const txt = `// =====================================================================
//  Kampfwerte der Gegner (#061), Herkunft: dev-data/DATA.md
//  ⚠️ Erzeugt mit \`node tools/gen-monster-stats.mjs .\` aus dev-data/gw2-monsters.json,
//  nicht von Hand bearbeiten.
//  Je Zone eine Liste der Stufen (Reihenfolge wie in stages.js):
//    hp/atk = LP und Schaden je Treffer, def = DEF,
//    spd = Sekunden zwischen zwei Angriffen,
//    exp/gold = Beute je Sieg (nur Schergen; Regler COMBAT.LOOT, Bosse × BOSS_*_MULT).
//  Regler (Bosse, schwere/legendäre Stufen, Veteranen) stehen in COMBAT (config.js).
// =====================================================================
export const MONSTER_STATS = {
${lines.join('\n')}
};
`;
writeFileSync(`${root}/js/data/monsterStats.js`, txt);
console.log(`js/data/monsterStats.js: ${zones.length} Zonen, ${zones.reduce((n, z) => n + z.stages.length, 0)} Stufen`);
