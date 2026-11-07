// Lädt alle Monster und Bosse aus der CQHT-Fan-Wiki (https://cqht-wiki.vercel.app/en/monsters)
// und schreibt sie als Entwicklungs-Referenz nach dev-data/archiv/cqht-monsters.json und .md.
// Nur Werte und Texte – keine Grafiken oder Animationen (siehe CLAUDE.md, Harte Regeln).
//
// Aufruf im Projektordner:  node tools/fetch-monsters.mjs .  [--only BOSS_1_1_1,MON_1_1] [--delay 250]
//
// Die Wiki ist eine Next.js-Seite. Die Werte stehen im Server-HTML im React-Server-Components-Payload
// (self.__next_f.push(...)). Das Script baut daraus den Komponenten-Baum und liest ihn aus.
import { writeFileSync } from 'node:fs';

const BASE = 'https://cqht-wiki.vercel.app';
const LANG = 'en';
const args = process.argv.slice(2);
const root = args.find(a => !a.startsWith('--')) ?? '.';
const opt = (name) => { const i = args.indexOf(`--${name}`); return i >= 0 ? args[i + 1] : undefined; };
const delay = Number(opt('delay') ?? 250);
const only = opt('only')?.split(',');

const sleep = (ms) => new Promise(r => setTimeout(r, ms));

async function get(url, tries = 3) {
  for (let i = 1; ; i++) {
    try {
      const res = await fetch(url, { headers: { 'User-Agent': 'aetherbastion-devdata-script' } });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.text();
    } catch (e) {
      if (i >= tries) throw new Error(`${url}: ${e.message}`);
      await sleep(1000 * i);
    }
  }
}

// ---------------------------------------------------------------- RSC-Payload → Baum
function rscRows(html) {
  let payload = '';
  for (const m of html.matchAll(/self\.__next_f\.push\(\[1,("(?:[^"\\]|\\.)*")\]\)/g)) payload += JSON.parse(m[1]);
  const rows = {};
  for (const line of payload.split('\n')) {
    const m = line.match(/^([0-9a-f]+):([[{].*)$/);
    if (!m) continue;
    try { rows[m[1]] = JSON.parse(m[2]); } catch { /* keine JSON-Zeile */ }
  }
  return rows;
}

// Zeilen der aktuell gelesenen Seite; Kinder wie "$L2e" oder "$2e" verweisen auf eine andere Zeile
let ROWS = {};
const deref = (c) => {
  const m = typeof c === 'string' && c.match(/^\$L?([0-9a-f]+)$/);
  return m && ROWS[m[1]] !== undefined ? ROWS[m[1]] : c;
};

// Ein Element ist ["$", type, key, props]
const isEl = (n) => Array.isArray(n) && n[0] === '$' && typeof n[1] === 'string';
const props = (n) => (isEl(n) && n[3]) || {};
const kids = (n) => {
  if (isEl(n)) {
    const c = props(n).children;
    if (c == null) return [];
    return (Array.isArray(c) && !isEl(c) ? c : [c]).map(deref);
  }
  return Array.isArray(n) ? n.map(deref) : [];
};

function findAll(node, pred, out = []) {
  if (node == null || typeof node !== 'object') return out;
  if (isEl(node) && pred(node)) out.push(node);
  for (const c of kids(node)) findAll(c, pred, out);
  return out;
}
const find = (node, pred) => findAll(node, pred)[0];
const hasClass = (cls) => (n) => String(props(n).className ?? '').split(' ').includes(cls);
const hasKey = (k) => (n) => props(n).k === k;

// Lesbarer Text eines Teilbaums (i18n-Bausteine → englischer Text)
function text(node) {
  if (node == null || node === false || node === true) return '';
  if (typeof node !== 'object') return String(node);
  if (isEl(node)) {
    const p = props(node);
    if (p.fallback) return p.fallback;
    if (p.k && p.d) return p.d;
  }
  return kids(node).map(text).join('');
}
const num = (s) => (s !== '' && !isNaN(Number(s)) ? Number(s) : s);

// ---------------------------------------------------------------- Seiten auslesen
async function listIds() {
  const html = await get(`${BASE}/${LANG}/monsters`);
  const ids = new Set();
  for (const m of html.matchAll(/\/monsters\/([A-Za-z0-9_]+)/g)) ids.add(m[1]);
  return [...ids];
}

function parseMonster(id, html) {
  ROWS = rscRows(html);
  const tree = Object.values(ROWS); // alle Zeilen gemeinsam durchsuchen
  const mon = { id, url: `${BASE}/${LANG}/monsters/${id}` };

  const h1 = find(tree, (n) => n[1] === 'h1');
  const nameEl = h1 && find(h1, (n) => props(n).i18n);
  mon.name = nameEl ? props(nameEl).fallback : text(h1);
  if (nameEl) mon.names = props(nameEl).i18n;

  // Zeile unter dem Namen: "<Typ> · <Schwierigkeit> Lv. <n>"
  const sub = h1 && find(tree, (n) => n[1] === 'div' && hasClass('mt-1')(n) && find(n, (c) => String(props(c).k ?? '').startsWith('mt.')));
  if (sub) {
    const typeEl = find(sub, (c) => String(props(c).k ?? '').startsWith('mt.'));
    mon.type = props(typeEl).k.slice(3);
    const line = text(sub);
    mon.subtitle = line;
    const lv = line.match(/Lv\.\s*(\d+)/);
    if (lv) mon.level = Number(lv[1]);
    const diff = line.split('·')[1]?.replace(/Lv\.\s*\d+/, '').trim();
    if (diff) mon.difficulty = diff;
  }

  const descEl = find(tree, (n) => n[1] === 'p' && find(n, (c) => props(c).i18n));
  if (descEl) mon.description = text(descEl).trim();

  // Werte: Zeilen aus [Label (k=lbl.*), Wert]
  mon.stats = {};
  for (const row of findAll(tree, (n) => kids(n).length === 2 && find(kids(n)[0], (c) => String(props(c).k ?? '').startsWith('lbl.')))) {
    const key = props(find(kids(row)[0], (c) => String(props(c).k ?? '').startsWith('lbl.'))).k.slice(4);
    mon.stats[key] = num(text(kids(row)[1]).trim());
  }

  // Drops: Panel mit Überschrift h2.drops, jeder Eintrag ist ein Link
  const dropPanel = find(tree, (n) => hasClass('panel')(n) && find(n, hasKey('h2.drops')));
  mon.drops = !dropPanel ? [] : findAll(dropPanel, (n) => props(n).href).map((a) => {
    const spans = kids(a).filter((c) => isEl(c) && c[1] === 'span').map((s) => text(s).trim());
    const amount = spans.find((s) => /^x[\d.]+$/.test(s));
    const chance = spans.find((s) => /^[\d.]+%$/.test(s));
    return {
      dropId: a[2] ?? undefined, // z. B. DROP_MON_1_1_GOLD, DROP_LIBRARY_MON_1_1 oder Item-ID
      name: spans.find((s) => s && s !== amount && s !== chance) ?? text(a).trim(),
      link: props(a).href,
      amount: amount ? num(amount.slice(1)) : undefined,
      chance: chance ? num(chance.slice(0, -1)) : undefined, // in Prozent
    };
  });

  // Weitere Abschnitte (z. B. Fundorte) nur als Rohtext sichern, damit nichts verloren geht
  mon.sections = {};
  for (const panel of findAll(tree, hasClass('panel'))) {
    const h = find(panel, (c) => String(props(c).k ?? '').startsWith('h2.'));
    if (!h) continue;
    const key = props(h).k.slice(3);
    if (key === 'stats' || key === 'drops') continue;
    mon.sections[key] = text(panel).replace(props(h).d ?? '', '').trim();
  }
  if (!Object.keys(mon.sections).length) delete mon.sections;
  return mon;
}

// ---------------------------------------------------------------- Ausgabe
function toMarkdown(list) {
  const statKeys = [...new Set(list.flatMap((m) => Object.keys(m.stats)))];
  const esc = (s) => String(s ?? '–').replace(/\|/g, '\\|');
  const head = ['ID', 'Name', 'Typ', 'Schwierigkeit', 'Lv.', ...statKeys, 'Drops'];
  const rows = list.map((m) => [m.id, m.name, m.type, m.difficulty, m.level, ...statKeys.map((k) => m.stats[k]),
    m.drops.map((d) => `${d.name}${d.amount != null ? ` ×${d.amount}` : ''}${d.chance != null ? ` (${d.chance} %)` : ''}`).join(', ')].map(esc));
  return [
    '# Monster – Crusaders Quest: Hero Town (Referenz)',
    '',
    `> Interne Entwicklungs-Referenz. Erzeugt mit \`node tools/fetch-monsters.mjs .\` aus ${BASE}/${LANG}/monsters am ${new Date().toISOString().slice(0, 10)}. Nicht von Hand bearbeiten. Spielinhalte © CQ LABS / Loadcomplete; nur als Vorlage für das Balancing, nicht ins Spiel übernehmen.`,
    '',
    `| ${head.join(' | ')} |`,
    `| ${head.map(() => '---').join(' | ')} |`,
    ...rows.map((r) => `| ${r.join(' | ')} |`),
    '',
  ].join('\n');
}

const ids = only ?? await listIds();
console.log(`${ids.length} Monster gefunden`);
const list = [];
const failed = [];
for (const [i, id] of ids.entries()) {
  try {
    const m = parseMonster(id, await get(`${BASE}/${LANG}/monsters/${id}`));
    list.push(m);
    console.log(`[${i + 1}/${ids.length}] ${id}  ${m.name}  Lv.${m.level ?? '?'}  HP ${m.stats.hp1 ?? '?'}`);
  } catch (e) {
    failed.push(id);
    console.error(`[${i + 1}/${ids.length}] ${id}  FEHLER: ${e.message}`);
  }
  if (i < ids.length - 1) await sleep(delay);
}

if (!only) {
  writeFileSync(`${root}/dev-data/archiv/cqht-monsters.json`, JSON.stringify({ source: `${BASE}/${LANG}/monsters`, fetched: new Date().toISOString(), monsters: list }, null, 2) + '\n');
  writeFileSync(`${root}/dev-data/archiv/cqht-monsters.md`, toMarkdown(list));
  console.log(`Geschrieben: dev-data/archiv/cqht-monsters.json und .md (${list.length} Monster)`);
} else {
  console.log(JSON.stringify(list, null, 2));
}
if (failed.length) { console.error(`Fehlgeschlagen: ${failed.join(', ')}`); process.exitCode = 1; }
