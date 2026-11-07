// Lädt den kompletten Forschungsbaum (Skill Research / Skill Lab) aus der CQHT-Fan-Wiki
// (https://cqht-wiki.vercel.app/en/skills) und schreibt ihn als Entwicklungs-Referenz nach
// dev-data/cqht-skills.json und .md – Grundlage für einen späteren Ausbau des Asura-Labors.
// Nur Werte und Texte – keine Grafiken (icon ist nur der Name des Original-Icons, siehe CLAUDE.md).
//
// Aufruf im Projektordner:  node tools/fetch-skills.mjs .
//
// Die Wiki ist eine Next.js-Seite; die Übersicht enthält alle Forschungen als Objekte im
// React-Server-Components-Payload (self.__next_f.push(...)). Felder laut Wiki-Code:
//   type   – Baum: MANAGE, HERO, MANAGE2, HERO2
//   level  – nötige Labor-Stufe (1–10)
//   price  – Kosten in Honor (bei uns 🧪 Forschungspunkte)
//   time   – Forschungszeit; die Wiki zeigt sie als m:ss an (also vermutlich Sekunden)
//   prereq – IDs der Forschungen, die vorher fertig sein müssen
//   unlock – Funktion, die die Forschung freischaltet (sonst ein reiner Wertebonus)
//   pivot/align – Position im Baum-Raster der Wiki
import { writeFileSync } from 'node:fs';

const BASE = 'https://cqht-wiki.vercel.app';
const root = process.argv[2] ?? '.';
const LANGS = ['de', 'en', 'ko']; // Deutsch, Englisch, Original (Koreanisch)
const TREES = {
  MANAGE: { de: 'Stadtverwaltung', en: 'Town Management' },
  HERO: { de: 'Helden-Upgrades', en: 'Hero Upgrades' },
  MANAGE2: { de: 'Erweiterte Stadtverwaltung', en: 'Advanced Town Management' },
  HERO2: { de: 'Erweiterte Helden-Upgrades', en: 'Advanced Hero Upgrades' },
};

async function get(url, tries = 3) {
  for (let i = 1; ; i++) {
    try {
      const res = await fetch(url, { headers: { 'User-Agent': 'aetherbastion-devdata-script' } });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.text();
    } catch (e) {
      if (i >= tries) throw new Error(`${url}: ${e.message}`);
      await new Promise(r => setTimeout(r, 1000 * i));
    }
  }
}

// RSC-Payload → alle JSON-Zeilen
function rscRows(html) {
  let payload = '';
  for (const m of html.matchAll(/self\.__next_f\.push\(\[1,("(?:[^"\\]|\\.)*")\]\)/g)) payload += JSON.parse(m[1]);
  const rows = {};
  for (const line of payload.split('\n')) {
    const m = line.match(/^([0-9a-f]+):([[{].*)$/);
    if (m) try { rows[m[1]] = JSON.parse(m[2]); } catch { /* keine JSON-Zeile */ }
  }
  return rows;
}

// Alle Objekte mit Forschungs-Feldern einsammeln (Verweise wie "$2e" auf andere Zeilen auflösen)
function collectSkills(rows) {
  const found = new Map();
  const seen = new Set();
  const walk = (n) => {
    if (typeof n === 'string') {
      const m = n.match(/^\$L?([0-9a-f]+)$/);
      if (m && rows[m[1]] !== undefined && !seen.has(m[1])) { seen.add(m[1]); walk(rows[m[1]]); }
      return;
    }
    if (!n || typeof n !== 'object') return;
    if (!Array.isArray(n) && typeof n.id === 'string' && 'prereq' in n && 'price' in n && TREES[n.type]) found.set(n.id, n);
    for (const v of Array.isArray(n) ? n : Object.values(n)) walk(v);
  };
  Object.values(rows).forEach(walk);
  return [...found.values()];
}

const pick = (i18n, fallback) => Object.fromEntries(LANGS.map(l => [l, i18n?.[l] ?? (l === 'en' ? fallback : undefined)]).filter(([, v]) => v));
const timeText = (t) => (t == null ? null : `${Math.floor(t / 60)}:${String(Math.round(t % 60)).padStart(2, '0')}`);

const raw = collectSkills(rscRows(await get(`${BASE}/en/skills`)));
if (!raw.length) throw new Error('Keine Forschungen gefunden – hat sich der Aufbau der Wiki geändert?');
const ids = new Set(raw.map(s => s.id));
const order = Object.keys(TREES);
const skills = raw
  .map(s => ({
    id: s.id,
    tree: s.type,
    labLevel: s.level,
    price: s.price,
    time: s.time,
    timeText: timeText(s.time),
    prereq: s.prereq ?? [],
    unlock: s.unlock ?? null,
    name: pick(s.name_i18n, s.name),
    desc: pick(s.desc_i18n, s.desc),
    icon: s.image,
    pivot: s.pivot,
    align: s.align,
  }))
  .sort((a, b) => order.indexOf(a.tree) - order.indexOf(b.tree) || a.labLevel - b.labLevel
    || (a.pivot?.[0] ?? 0) - (b.pivot?.[0] ?? 0) || (a.pivot?.[1] ?? 0) - (b.pivot?.[1] ?? 0));
// Umkehrung: welche Forschungen hängen an dieser?
const next = {};
for (const s of skills) for (const p of s.prereq) (next[p] ??= []).push(s.id);
for (const s of skills) s.leadsTo = next[s.id] ?? [];
const missing = skills.flatMap(s => s.prereq.filter(p => !ids.has(p)).map(p => `${s.id} → ${p}`));

// ---------------------------------------------------------------- Ausgabe
const date = new Date().toISOString().slice(0, 10);
const trees = order.map(t => {
  const list = skills.filter(s => s.tree === t);
  return { id: t, name: TREES[t], count: list.length, price: list.reduce((a, s) => a + s.price, 0),
    time: list.reduce((a, s) => a + (s.time ?? 0), 0), unlocks: list.filter(s => s.unlock).length };
});
writeFileSync(`${root}/dev-data/cqht-skills.json`, JSON.stringify({
  source: `${BASE}/en/skills`, fetched: new Date().toISOString(),
  note: 'Erzeugt mit node tools/fetch-skills.mjs . – nicht von Hand bearbeiten. price = Honor (bei uns 🧪 Forschungspunkte), labLevel = nötige Labor-Stufe, time = Forschungszeit (Wiki-Anzeige m:ss, vermutlich Sekunden).',
  trees, skills }, null, 2) + '\n');

const de = (n) => Number(n).toLocaleString('de-DE');
const esc = (s) => String(s ?? '–').replace(/\|/g, '\\|').replace(/\n/g, ' ');
const nameOf = Object.fromEntries(skills.map(s => [s.id, s.name.de ?? s.name.en]));
let md = `# Forschung – Crusaders Quest: Hero Town (Referenz)

> Interne Entwicklungs-Referenz für **Aetherbastion: Rift Watch** (späterer Ausbau des Asura-Labors). Erzeugt mit \`node tools/fetch-skills.mjs .\` aus ${BASE}/en/skills am ${date}. Nicht von Hand bearbeiten. Spielinhalte © CQ LABS / Loadcomplete; nur als Vorlage, Namen und Texte vor der Übernahme auf GW2 ummünzen.

**Felder:** *Labor* = nötige Labor-Stufe · *Kosten* in Honor (bei uns 🧪 Forschungspunkte) · *Zeit* wie in der Wiki angezeigt (m:ss, vermutlich Sekunden) · *Voraussetzung* = vorher nötige Forschungen · *Schaltet frei* = Funktion statt reinem Wertebonus. Deutsche Namen und Texte stammen aus der Wiki.

| Baum | Forschungen | Kosten gesamt | Zeit gesamt | Freischaltungen |
| --- | --- | --- | --- | --- |
${trees.map(t => `| ${t.name.de} (${t.id}) | ${t.count} | ${de(t.price)} | ${timeText(t.time)} | ${t.unlocks} |`).join('\n')}
`;
for (const t of trees) {
  md += `\n## ${t.name.de} (${t.id})\n`;
  for (let lv = 1; lv <= 10; lv++) {
    const list = skills.filter(s => s.tree === t.id && s.labLevel === lv);
    if (!list.length) continue;
    md += `\n### Labor-Stufe ${lv}\n\n| ID | Name | Beschreibung | Kosten | Zeit | Voraussetzung | Schaltet frei |\n| --- | --- | --- | --- | --- | --- | --- |\n`;
    for (const s of list) {
      md += `| \`${s.id}\` | ${esc(s.name.de ?? s.name.en)}${s.name.de && s.name.en !== s.name.de ? ` *(${esc(s.name.en)})*` : ''} | ${esc(s.desc.de ?? s.desc.en)} | ${de(s.price)} | ${s.timeText ?? '–'} | ${s.prereq.map(p => esc(nameOf[p] ?? p)).join(', ') || '–'} | ${s.unlock ? `\`${s.unlock}\`` : '–'} |\n`;
    }
  }
}
writeFileSync(`${root}/dev-data/cqht-skills.md`, md);
console.log(`${skills.length} Forschungen: ${trees.map(t => `${t.id} ${t.count}`).join(', ')}`);
if (missing.length) console.warn(`Voraussetzungen ohne passende Forschung: ${missing.join('; ')}`);
