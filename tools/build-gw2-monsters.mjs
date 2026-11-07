// Baut den GW2-Gegner-Datensatz: jeder GW2-Boss und -Scherge bekommt eine CQHT-Vorlage aus
// dev-data/archiv/cqht-monsters.json (Werte und Drops bleiben unverändert erhalten), und jeder Name wird
// gegen die deutsche GW2-Wiki (wiki-de.guildwars2.com) geprüft.
//
// Aufruf im Projektordner:  node tools/build-gw2-monsters.mjs .  [--wiki]
//   --wiki  alle Namen neu prüfen (sonst nur neue; Ergebnis in dev-data/gw2-wiki-check.json)
// Ausgabe: dev-data/gw2-monsters.json und dev-data/gw2-monsters.md
//
// Zonen 1–10 (im Spiel, js/data/stages.js) – Zuordnung exakt über die Stufe:
//   Boss     → CQHT-Boss mit dem Namen aus `src` (gleiche Namen der Reihe nach: Emperor Slime Lv. 1, 2, 3 …)
//   Schergen → normale Stufe: CQHT-Monster desselben Kapitels mit dem nächsten Level (2. Scherge eins höher)
//              schwere Stufe: MON_H_<Kapitel>_<Nr.> passend zu BOSS_H_<Kapitel>_<Nr.>
//              legendäre Stufe: MON_SOUL_<Kapitel>_3/4
// Zonen 11–20 (Entwurf, tools/data/zones-expansion.json) – Zuordnung nach Rang:
//   Bosse → CQHT „Hard“ + Legendär + Soltar, Schergen → CQHT „Hard“- und „Soul“-Monster.
//   Der i-te von n Gegnern bekommt die Vorlage round(i·(m−1)/(n−1)) aus dem sortierten Pool (m Einträge).
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { pathToFileURL } from 'node:url';

const args = process.argv.slice(2);
const root = args.find(a => !a.startsWith('--')) ?? '.';
const refresh = args.includes('--wiki');
const imp = (p) => import(pathToFileURL(`${root}/${p}`).href);
const { ZONE_DATA } = await imp('js/data/stages.js');
const { CQHT_OVERRIDES, WIKI_HINTS } = await imp('tools/data/gw2-hints.mjs');

// Erweiterungs-Zonen (Entwurf) aus tools/data/zones-expansion.json
const X = JSON.parse(readFileSync(`${root}/tools/data/zones-expansion.json`, 'utf8'));
const EXPANSION_ZONES = X.zones.map(z => {
  if (!z.minions?.length) throw new Error(`zones-expansion.json, Zone ${z.id}: keine Schergen (minions)`);
  return { ...z, zone: z.name, bosses: [...z.bosses, z.endboss] };
});
const cqht = JSON.parse(readFileSync(`${root}/dev-data/archiv/cqht-monsters.json`, 'utf8')).monsters;
const byId = Object.fromEntries(cqht.map(m => [m.id, m]));

const WIKI = 'https://wiki-de.guildwars2.com';
const WIKI_EN = 'https://wiki.guildwars2.com';
const CACHE = `${root}/dev-data/gw2-wiki-check.json`;
const PORTALS = { ...X.basePortals, ...Object.fromEntries(Object.entries(X.portals).map(([p, v]) => [p, v.name])) };
const sleep = (ms) => new Promise(r => setTimeout(r, ms));
const entry = (name) => ({ name, cqht: CQHT_OVERRIDES[name] });
const need = (id, ctx) => { if (!byId[id]) throw new Error(`${ctx}: CQHT-ID ${id} fehlt in cqht-monsters.json`); return byId[id]; };
const sortBy = (list, ...keys) => [...list].sort((a, b) => { for (const k of keys) { const d = k(a) - k(b); if (d) return d; } return 0; });
const hp = (m) => m.stats.hp1;
const lv = (m) => m.level ?? 0;

// ---------------------------------------------------------------- Zonen 1–10 aus dem Spiel
const zones = [];
const srcSeen = {}; // Name → wie oft schon vergeben
const bossesByName = {};
for (const m of sortBy(cqht.filter(m => m.type === 'boss'), lv)) (bossesByName[m.name] ??= []).push(m);

for (const z of ZONE_DATA) {
  const stages = z.stages.map((s, i) => {
    const kind = s.legend ? 'legendär' : s.hard ? 'schwer' : 'normal';
    const ctx = `Zone ${z.id} Stufe ${i + 1} (${s.boss.name})`;
    const list = bossesByName[s.src];
    if (!list) throw new Error(`${ctx}: CQHT-Boss „${s.src}“ nicht gefunden`);
    const n = srcSeen[s.src] = (srcSeen[s.src] ?? 0) + 1;
    const boss = list[Math.min(n, list.length) - 1];
    let minions;
    const ch = boss.id.match(/^BOSS_(?:H_)?(\d)_(\d)/);
    if (kind === 'normal') {
      const pool = sortBy(cqht.filter(m => m.id.startsWith(`MON_${ch[1]}_`)), lv);
      const near = pool.reduce((bi, m, j) => (Math.abs(m.level - s.level) < Math.abs(pool[bi].level - s.level) ? j : bi), 0);
      minions = s.minions.map((_, k) => pool[Math.min(near + k, pool.length - 1)]);
    } else if (kind === 'schwer') {
      minions = s.minions.map(() => need(`MON_H_${ch[1]}_${ch[2]}`, ctx));
    } else {
      const c = boss.id.match(/^BOSS_H_L_(\d)/)[1];
      minions = s.minions.map((_, k) => need(`MON_SOUL_${c}_${3 + k}`, ctx));
    }
    return { nr: i + 1, kind, level: s.level, info: s.info || undefined,
      boss: { name: s.boss.name, sprite: s.boss.sprite, template: boss, match: `src „${s.src}“` },
      minions: s.minions.map((m, k) => ({ name: m.name, sprite: m.sprite, template: minions[k], match: kind === 'normal' ? 'Kapitel + Level' : 'Stufe' })) };
  });
  zones.push({ id: z.id, zone: z.name, portal: z.portal, source: 'js/data/stages.js', stages });
}

// ---------------------------------------------------------------- Zonen 11–20 (Entwurf)
const POOLS = {
  boss: [...sortBy(cqht.filter(m => m.type === 'boss' && m.difficulty === 'Hard'), lv, hp),
         ...sortBy(cqht.filter(m => m.id.startsWith('BOSS_SOLTAR')), hp)],
  mon: sortBy(cqht.filter(m => /^MON_(H|SOUL)_/.test(m.id)), hp),
};
const rankList = { boss: [], mon: [] };
for (const z of EXPANSION_ZONES) {
  const bosses = z.bosses.map(entry), mobs = z.minions.map(entry);
  const spread = (i, n) => (n < 2 ? z.lv[1] : Math.round(z.lv[0] + i * (z.lv[1] - z.lv[0]) / (n - 1)));
  const stages = bosses.map((b, i) => {
    const st = { nr: i + 1, kind: 'normal', level: spread(i, bosses.length), info: i === bosses.length - 1 ? 'Zonen-Endboss' : undefined,
      boss: { ...b }, minions: [mobs[i % mobs.length], mobs[(i + 1) % mobs.length]].map(m => ({ ...m })) };
    rankList.boss.push(st.boss);
    st.minions.forEach(m => rankList.mon.push(m));
    return st;
  });
  zones.push({ id: z.id, zone: z.zone, portal: z.portal, type: z.type, lv: z.lv, source: 'tools/data/zones-expansion.json (Entwurf)', stages });
}
for (const [pool, list] of Object.entries(rankList)) {
  const p = POOLS[pool];
  list.forEach((e, i) => {
    const auto = p[list.length < 2 ? 0 : Math.round(i * (p.length - 1) / (list.length - 1))];
    e.template = e.cqht ? need(e.cqht, e.name) : auto;
    e.match = e.cqht ? 'fest' : `Rang ${i + 1}/${list.length} → ${p.indexOf(auto) + 1}/${p.length}`;
  });
}

// ---------------------------------------------------------------- Wiki-Prüfung
async function api(params, base = WIKI) {
  const url = `${base}/api.php?` + new URLSearchParams({ format: 'json', formatversion: '2', ...params });
  for (let i = 1; ; i++) {
    try {
      const res = await fetch(url, { headers: { 'User-Agent': 'aetherbastion-devdata-script' } });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.json();
    } catch (e) {
      if (i >= 3) throw e;
      await sleep(1000 * i);
    }
  }
}

const wikiKey = (e) => e.name;
// Varianten: ganz, ohne Spiel-Präfix (Verderbt:/Schatten:), Wiki-Hinweis, ohne Klammer, Klammerinhalt, ohne „Champion“
function variants(e) {
  const n = e.name.trim().replace(/’/g, "'");
  const base = n.replace(/^(Verderbt|Schatten):\s*/, '');
  const hint = WIKI_HINTS[base] ?? WIKI_HINTS[e.name];
  if (hint) return [...new Set([n, base, hint])];
  const noParen = base.replace(/\s*\(.*?\)\s*/g, ' ').trim();
  const paren = [...base.matchAll(/\((.*?)\)/g)].map(m => m[1].trim());
  return [...new Set([n, base, noParen, ...paren, noParen.replace(/^Champion\s+/i, '')].filter(Boolean))];
}

// Prüft Titel in Blöcken zu 50; liefert Map Titel → { title, en|de } (Weiterleitungen aufgelöst)
async function checkTitles(titles, base = WIKI, lang = 'en') {
  const found = new Map();
  for (let i = 0; i < titles.length; i += 50) {
    const chunk = titles.slice(i, i + 50);
    const r = await api({ action: 'query', titles: chunk.join('|'), redirects: '1', prop: 'langlinks', lllang: lang, lllimit: 'max' }, base);
    const q = r.query ?? {};
    const norm = new Map(chunk.map(t => [t, t]));
    for (const n of q.normalized ?? []) for (const [k, v] of norm) if (v === n.from) norm.set(k, n.to);
    for (const rd of q.redirects ?? []) for (const [k, v] of norm) if (v === rd.from) norm.set(k, rd.to);
    const pages = new Map((q.pages ?? []).filter(p => !p.missing && !p.invalid).map(p => [p.title, p]));
    for (const [orig, t] of norm) {
      const p = pages.get(t);
      if (p) found.set(orig, { title: p.title, [lang]: p.langlinks?.[0]?.title });
    }
    await sleep(200);
  }
  return found;
}

const all = zones.flatMap(z => [{ name: z.zone }, ...z.stages.flatMap(s => [s.boss, ...s.minions])]);
const cache = existsSync(CACHE) && !refresh ? JSON.parse(readFileSync(CACHE, 'utf8')) : {};
const todo = [...new Map(all.filter(e => !cache[wikiKey(e)]).map(e => [wikiKey(e), e])).values()];
if (todo.length) {
  console.log(`Prüfe ${todo.length} Namen in ${WIKI} …`);
  const allVariants = [...new Set(todo.flatMap(variants))];
  const found = await checkTitles(allVariants);
  // Namen, die (teilweise) englisch sind, z. B. „Vale Guardian“: englische Wiki mit Sprachlink nach DE
  const foundEn = await checkTitles(allVariants.filter(t => !found.has(t)), WIKI_EN, 'de');
  const norm = (s) => s.toLowerCase().replace(/[’']/g, "'");
  for (const [i, e] of todo.entries()) {
    const v = variants(e);
    const hit = v.map(t => found.get(t) && { via: t, ...found.get(t) }).find(Boolean);
    const hitEn = !hit && v.map(t => foundEn.get(t) && { via: t, ...foundEn.get(t) }).find(Boolean);
    let res;
    if (hit) res = { status: hit.via === v[0] ? 'ok' : 'teilweise', title: hit.title, en: hit.en, via: hit.via };
    else if (hitEn?.de) res = { status: 'teilweise', title: hitEn.de, en: hitEn.title, via: `en: ${hitEn.via}` };
    else if (hitEn) res = { status: 'nur-en', en: hitEn.title, via: hitEn.via, url: `${WIKI_EN}/wiki/${encodeURIComponent(hitEn.title.replace(/ /g, '_'))}` };
    else {
      const core = v[v.length - 1];
      const s = await api({ action: 'query', list: 'search', srsearch: core, srlimit: '5', srprop: '' });
      const hits = (s.query?.search ?? []).map(x => x.title);
      const mention = hits.find(t => norm(t).includes(norm(core)));
      res = mention
        ? { status: 'erwähnt', title: mention, via: core }
        : { status: 'fehlt', suggestions: hits.slice(0, 3) };
      await sleep(200);
    }
    if (res.title) res.url = `${WIKI}/wiki/${encodeURIComponent(res.title.replace(/ /g, '_'))}`;
    cache[wikiKey(e)] = res;
    if ((i + 1) % 25 === 0) console.log(`  ${i + 1}/${todo.length}`);
  }
}
// nur noch benutzte Namen behalten
const used = new Set(all.map(wikiKey));
writeFileSync(CACHE, JSON.stringify(Object.fromEntries(Object.entries(cache).filter(([k]) => used.has(k)).sort()), null, 2) + '\n');

// ---------------------------------------------------------------- Ausgabe
const tpl = (t, match) => ({ id: t.id, name: t.name, type: t.type, difficulty: t.difficulty, level: t.level, match });
const enemy = (e, role) => ({ name: e.name, role, sprite: e.sprite, wiki: cache[wikiKey(e)], note: e.note,
  cqht: tpl(e.template, e.match), stats: e.template.stats, drops: e.template.drops });
const outZones = zones.map(z => ({
  id: z.id, zone: z.zone, portal: z.portal, portalName: PORTALS[z.portal], type: z.type, lv: z.lv, source: z.source,
  wiki: cache[z.zone],
  stages: z.stages.map(s => ({ nr: s.nr, kind: s.kind, level: s.level, info: s.info,
    boss: enemy(s.boss, s.info?.startsWith('Zonen-Endboss') ? 'endboss' : 'boss'),
    minions: s.minions.map(m => enemy(m, 'scherge')) })),
}));
writeFileSync(`${root}/dev-data/gw2-monsters.json`, JSON.stringify({
  note: 'Erzeugt mit node tools/build-gw2-monsters.mjs . – nicht von Hand bearbeiten. stats/drops = CQHT-Vorlage (dev-data/archiv/cqht-monsters.json).',
  zones: outZones }, null, 2) + '\n');

const de = (n) => (n == null ? '–' : Number(n).toLocaleString('de-DE'));
const esc = (s) => String(s ?? '–').replace(/\|/g, '\\|');
const wikiCell = (w) => !w ? '–'
  : w.status === 'fehlt' ? `❌${w.suggestions?.length ? ' ähnlich: ' + w.suggestions.join(', ') : ''}`
  : w.status === 'nur-en' ? `🇬🇧 [${w.en}](${w.url})`
  : `${{ ok: '✅', teilweise: '🟡', erwähnt: '📄' }[w.status]} [${w.title}](${w.url})${w.en && w.en !== w.title ? ` (en: ${w.en})` : ''}`;
const enemies = outZones.flatMap(z => z.stages.flatMap(s => [s.boss, ...s.minions]));
const uniq = (list) => [...new Map(list.map(e => [e.name, e])).values()];
const count = (list, s) => uniq(list).filter(e => e.wiki?.status === s).length;
const stat = (list) => `✅ ${count(list, 'ok')} · 🟡 ${count(list, 'teilweise')} · 📄 ${count(list, 'erwähnt')} · 🇬🇧 ${count(list, 'nur-en')} · ❌ ${count(list, 'fehlt')}`;
const bossList = enemies.filter(e => e.role !== 'scherge'), mobList = enemies.filter(e => e.role === 'scherge');

let md = `# GW2-Gegner ↔ CQHT-Vorlagen

> Interne Entwicklungs-Referenz für **Aetherbastion: Rift Watch**. Erzeugt mit \`node tools/build-gw2-monsters.mjs .\` aus \`js/data/stages.js\` (Zonen 1–10), \`tools/data/zones-expansion.json\` (Entwurf Zonen 11–20, Wiki-Hinweise in \`tools/data/gw2-hints.mjs\`) und \`dev-data/archiv/cqht-monsters.json\`. Nicht von Hand bearbeiten.

**Zuordnung:** Zonen 1–10 exakt über die Stufe (\`src\` = CQHT-Boss; Schergen aus demselben CQHT-Kapitel). Zonen 11–20 nach Rang auf CQHT *Hard*, *Legendär*, Soltar bzw. *Hard*-/*Soul*-Monster. Werte (HP/ATK auf Lv. 1, DEF, Tempo) und Drops sind die der CQHT-Vorlage. Im Spiel rechnet \`config.js\` die Kampfwerte weiter aus dem Stufen-Level.

**Wiki-Prüfung** (${WIKI}, verschiedene Namen): Bosse ${stat(bossList)} | Schergen ${stat(mobList)}
✅ Seite mit genau diesem Namen · 🟡 nur eine Variante gefunden (ohne „Champion“, Klammer oder „Verderbt:/Schatten:“, oder über die englische Wiki) · 📄 keine eigene Seite, aber in einem Seitentitel erwähnt (meist ein Event) · 🇬🇧 nur in der englischen Wiki · ❌ keine Seite – vermutlich kein echter GW2-Name oder im deutschen Spiel anders benannt. Schergen-Namen sind oft beschreibend erfunden (z. B. „Banditen-Bomber“); ❌ ist dort weniger schlimm als bei Bossen.
`;
let lastPortal;
for (const z of outZones) {
  if (z.portal !== lastPortal) md += `\n## Portal ${z.portal}: ${z.portalName}${z.id > 10 ? ' (Entwurf)' : ''}\n`;
  lastPortal = z.portal;
  md += `\n### ${z.id}. ${z.zone}${z.lv ? ` · Lv. ${z.lv[0]}–${z.lv[1]}` : ''}${z.type ? ` · ${z.type}` : ''}\n\nZone in der Wiki: ${wikiCell(z.wiki)}\n\n`;
  md += '| Stufe | Rolle | GW2-Name | Wiki | CQHT-Vorlage | HP Lv.1 | ATK Lv.1 | DEF | Tempo |\n| --- | --- | --- | --- | --- | --- | --- | --- | --- |\n';
  for (const s of z.stages) {
    const st = `${s.nr}${s.kind === 'schwer' ? ' ☠️' : s.kind === 'legendär' ? ' ⭐' : ''} · Lv. ${s.level}`;
    for (const [k, e] of [s.boss, ...s.minions].entries()) {
      md += `| ${k ? '' : st} | ${e.role} | ${esc(e.name)} | ${esc(wikiCell(e.wiki))} | ${esc(`${e.cqht.name} (${e.cqht.id})`)} | ${de(e.stats.hp1)} | ${de(e.stats.atk1)} | ${de(e.stats.defense)} | ${de(e.stats.attackSpeed)} |\n`;
    }
  }
}
const missing = uniq(bossList).filter(e => e.wiki?.status === 'fehlt');
md += `\n## Bosse ohne Wiki-Seite (${missing.length})\n\n${missing.map(e => `- ${e.name}${e.wiki.suggestions?.length ? ` – Suche findet: ${e.wiki.suggestions.join(', ')}` : ''}`).join('\n')}\n`;
writeFileSync(`${root}/dev-data/gw2-monsters.md`, md);
console.log(`Geschrieben: dev-data/gw2-monsters.json und .md (${outZones.length} Zonen, ${enemies.length} Gegner-Einträge)`);
console.log(`Wiki Bosse: ${stat(bossList)} | Schergen: ${stat(mobList)}`);
