// Erzeugt dev-data/akrw-*.md und akrw-progression-stages.json aus den Spieldaten (js/data/*.js)
// und akrw-zones-expansion.md aus tools/data/zones-expansion.json.
// Aufruf im Projektordner: node tools/gen-devdata.mjs .   (akrw-traits.md ist handgeschrieben)
import { readFileSync, writeFileSync } from 'node:fs';
import { pathToFileURL } from 'node:url';
const root = process.argv[2];
const imp = (p) => import(pathToFileURL(`${root}/${p}`).href);
const { BUILDING_DATA, BUILDING_ORDER, CYCLE_MS } = await imp('js/data/buildings.js');
const { HERO_LEVELS } = await imp('js/data/heroLevels.js');
const { WEAPONS, WEAPON_TYPES, WEAPON_GRADES, SHOP, DROP_GRADES, WEAPON_FOR } = await imp('js/data/weapons.js');
const { ZONE_DATA, NORMAL_STAGES } = await imp('js/data/stages.js');
const { KITCHEN_TRIAL, SOUL_FORTRESS, RATIONS } = await imp('js/data/specials.js');
const { TENTS, PORTAL_SHARDS } = await imp('js/config.js');

const de = (n) => n == null ? '–' : Number(n).toLocaleString('de-DE');
const time = (s) => !s ? '–' : [Math.floor(s / 60) && `${Math.floor(s / 60)} Min.`, s % 60 && `${s % 60} s`].filter(Boolean).join(' ');
const tbl = (head, rows) => [`| ${head.join(' | ')} |`, `| ${head.map(() => '---').join(' | ')} |`, ...rows.map(r => `| ${r.join(' | ')} |`)].join('\n');
const out = (f, s) => writeFileSync(`${root}/dev-data/${f}`, s.trimStart());
const note = '> Interne Entwicklungs-Referenz für **Aetherbastion: Rift Watch**. Erzeugt aus den Spieldaten in `js/data/`; maßgeblich ist immer der Code. Die Spalte *CQHT* nennt das Vorbild aus Crusaders Quest: Hero Town.';

// ---------------------------------------------------------------- Gebäude
{
  const b = BUILDING_DATA;
  const lore = {
    hall: 'Hier hängen die Rekrutierungsaushänge der Gilde, und hier wird die Gildenkasse verwaltet. Die feierliche Stimmung hält genau so lange, bis die ersten Aufträge verteilt werden.',
    camp: 'Hier schlafen die Helden zwischen den Einsätzen. Dass Charr, Norn und Asura völlig unterschiedlich schnarchen, wissen nur die, die hier übernachtet haben.',
    portal: 'Ein stabilisierter Kryptis-Riss. Gefährlich? Für die Wacht ist es der tägliche Arbeitsweg.',
    kitchen: 'Eintopf aus dem großen Kessel. Satte Helden lernen schneller.',
    lab: 'Asura-Know-how für alle: Golemtechnik, Ätherkunde und Nebelphysik – egal woher das Wissen stammt, hier gehört es der ganzen Gilde.',
    forge: 'Charr-Stahl, Norn-Eisen und Asura-Legierungen werden auf diesem Amboss zu einer einzigen Waffe.',
  };
  const how = {
    hall: `Zahlt alle ${CYCLE_MS / 60_000} Minuten die **Gildenkasse** aus und bestimmt, welche Stufen der anderen Gebäude gebaut werden dürfen. Jede Stufe verlangt eine Anzahl insgesamt besiegter Normal-Stufen. Zelt 2, 3 und 4 öffnen ab Stufe 3, 6 und 9; die Mystische Schmiede ab Stufe 5.`,
    camp: 'Gilt für das ganze Lager und bestimmt das **Level-Cap** aller Helden (bis Lv. 60). Die Trupps selbst sind die Zelte 1–4 mit je 3 Plätzen. *Geplant:* Erschöpfung – müde Helden ziehen sich kurz ins Zelt zurück.',
    portal: 'Jede Stufe öffnet ein neues Portal mit weiteren Riss-Zonen (Stufe 1 = Kryta, Caledon & Zittergipfel, Zonen 1–3 · Stufe 2 = Metrica, Aschfurt & Anwesen, Zonen 4–6 · Stufe 3 = Löwenstein & Meerenge, Zonen 7–8 · Stufe 4 = Orr, Zonen 9–10). Kostet zusätzlich 🔮 Ätherscherben. Statt einzelner Monster wie in CQHT wählt jeder Trupp eine Stufe und farmt deren Schergen.',
    kitchen: `+${Math.round(b.kitchen.bonusPerLevel * 100)} % EXP pro Stufe für alle Helden. Eigene Ergänzung (die CQHT-Bäckerei-Daten fehlen). *Geplant:* Prüfung der Feldküche (${KITCHEN_TRIAL.name}).`,
    lab: 'Forschung mit 📜 Forschungsnotizen in drei Bäumen (Offensive, Defensive, Logistik). Stufe 3 öffnet Forschungsstufe II, Stufe 5 Stufe III.',
    forge: `Waffenladen mit ${SHOP.offers} Angeboten, alle ${SHOP.restockMs / 60_000} Minuten neu; „Ware auffrischen“ kostet ${SHOP.refreshBase} Gold und verdoppelt sich bis zum nächsten Auffüllen. Dazu die Waffenkammer (Ausrüsten, Verkaufen zu ${SHOP.sellFactor * 100} %). Höhere Stufen bringen bessere Ware. *Geplant:* Waffen-Modifikation (CQHT Forge).`,
  };
  let s = `# Gebäude – Aetherbastion: Rift Watch\n\n${note}\n\nGebaut wird immer **nur ein Gebäude gleichzeitig**. Kosten in 🟡 Gold.\n`;

  // Übersicht: alle Ausbauten nach Gildenhallen-Stufe, mit Summen
  {
    const maxHall = b.hall.levels.length;
    const rows = [];
    let total = 0;
    for (let H = 1; H <= maxHall; H++) {
      const items = [];
      if (H > 1) items.push({ txt: `${b.hall.icon} Halle ${H}`, cost: b.hall.levels[H - 1].cost });
      for (const key of BUILDING_ORDER) {
        if (key === 'hall') continue;
        b[key].levels.forEach((l, i) => { if (l.hall === H) items.push({ txt: `${b[key].icon} ${b[key].name} ${i + 1}`, cost: l.cost }); });
      }
      TENTS.forEach((t, i) => { if (i > 0 && t.hall === H) items.push({ txt: `⛺ Zelt ${i + 1}`, cost: t.gold }); });
      const sum = items.reduce((n, x) => n + x.cost, 0);
      total += sum;
      rows.push([H, items.map(x => `${x.txt} (${de(x.cost)})`).join(', '), de(sum), de(total)]);
    }
    s += `\n## Übersicht: alle Ausbaukosten\n\nAlles, was mit der jeweiligen Gildenhallen-Stufe baubar wird (Halle selbst, Gebäudestufen, neue Zelte), mit Summe und laufender Gesamtsumme. Das Riss-Portal kostet zusätzlich 🔮 Ätherscherben (${PORTAL_SHARDS.slice(1).map(de).join(' / ')} für Stufe 2–${PORTAL_SHARDS.length}).\n\n`;
    s += tbl(['Gildenhalle', 'Neu baubar (Kosten)', 'Summe', 'Gesamt'], rows);
    s += `\n\n${tbl(['Gebäude', 'Stufen', 'Alle Stufen zusammen'], [
      ...BUILDING_ORDER.map(key => [`${b[key].icon} ${b[key].name}`, b[key].levels.length, de(b[key].levels.reduce((n, l) => n + l.cost, 0))]),
      ['⛺ Zelte 2–4', TENTS.length - 1, de(TENTS.reduce((n, t) => n + t.gold, 0))],
      ['**Alles**', '', `**${de(total + BUILDING_ORDER.reduce((n, k) => n + b[k].levels.filter(l => k !== 'hall' && !l.hall).reduce((m, l) => m + l.cost, 0), 0))}**`],
    ])}\n`;
  }
  for (const key of BUILDING_ORDER) {
    const d = b[key];
    s += `\n## ${d.icon} ${d.name}\n\n*CQHT: ${d.src} · max. Stufe ${d.levels.length}${d.unlockHall ? ` · ab Gildenhalle ${d.unlockHall}` : ''}*\n\n${d.desc}\n\n> ${lore[key]}\n\n`;
    if (key === 'hall') s += tbl(['Stufe', 'Gildenkasse / 10 Min.', 'Kosten', 'Bauzeit', 'Besiegte Stufen'], d.levels.map((l, i) => [i + 1, de(l.gold), i ? de(l.cost) : '–', time(l.time), l.stage || '–']));
    else s += tbl(['Stufe', 'Kosten', 'Bauzeit', 'Gildenhalle', ...(key === 'camp' ? ['Level-Cap'] : [])], d.levels.map((l, i) => [i + 1, de(l.cost), time(l.time), l.hall, ...(key === 'camp' ? [`Lv. ${l.cap}`] : [])]));
    s += `\n\n**So funktioniert es:** ${how[key]}\n`;
  }
  const sf = SOUL_FORTRESS;
  s += `\n## ${sf.building.icon} ${sf.building.name} *(geplant)*\n\n*CQHT: ${sf.building.src} · max. Stufe 1 · Kosten ${de(sf.building.cost)}*\n\nÖffnet die **${sf.name}**: ein dreiphasiger Kampf gegen den Seelenfürsten. Belohnt Nebelkristall-Staub, -Splitter und Nebelkristalle für besondere Waffen.\n\n> Als das Siegel brüchig wurde, errichtete die Gilde am Rand des Lagers ein Heiligtum – aus Steinen einer eingestürzten Gedenkhalle. Das Gebäude ist neu und trägt doch alte Narben.\n`;
  out('akrw-buildings.md', s);
}

// ---------------------------------------------------------- Helden-Stufen
{
  const rew = (r) => {
    const parts = [];
    if (r.rp) parts.push(`${r.rp} 📜`);
    r.rations.forEach((n, g) => n && parts.push(`🍞${g + 1} ×${n}`));
    if (r.fruit) parts.push(`🍎 ×${r.fruit}`);
    return parts.join(', ') || '–';
  };
  let s = `# Helden-Stufen – Aetherbastion: Rift Watch\n\n${note}\n\n`;
  s += `- **EXP gesamt:** benötigte Gesamt-EXP, um die Stufe zu erreichen.\n- **🟡 / 📜 je Zyklus:** Einkommen pro Held alle ${CYCLE_MS / 60_000} Minuten (Gold ab Lv. 10, Forschungsnotizen ab Lv. 20) – auch in der Reserve.\n- **Erschöpfung:** CQHT-Fatigue-Grenze, *noch ohne Funktion*.\n- **Belohnung:** gibt es beim Erreichen der Stufe. 🍞1–6 = Proviant der Güte 1–6 (${RATIONS.map(r => r.name).join(', ')}), 🍎 = Früchte (noch ohne Funktion).\n- Das Level-Cap setzt das ⛺ Zeltlager.\n\n`;
  s += tbl(['Lv.', 'EXP gesamt', '🟡 / Zyklus', '📜 / Zyklus', 'Erschöpfung', 'Belohnung'],
    HERO_LEVELS.map(l => [`**${l.lv}**`, de(l.totalExp), l.goldCycle || '–', l.rpCycle || '–', de(l.fatigue), rew(l.reward)]));
  out('akrw-hero-leveling.md', s + '\n');
}

// ------------------------------------------------------------------ Laden
{
  const carriers = {};
  for (const [cls, t] of Object.entries(WEAPON_FOR || {})) (carriers[t] ||= []).push(cls);
  let s = `# Charr-Schmiede: Waffen & Laden – Aetherbastion: Rift Watch\n\n${note}\n\n`;
  s += `Der Laden zeigt ${SHOP.offers} zufällige Waffen und füllt sich alle ${SHOP.restockMs / 60_000} Minuten neu. Waffen kosten 🟡 Gold; die besten gibt es alternativ für 📜 Forschungsnotizen. Die **Schmiede-Stufe** bestimmt, ab wann eine Waffe im Laden auftauchen kann; die **Chance** ist ihr Gewicht beim Würfeln des Angebots. Heiler tragen immer einen 🔮 Fokus, alle anderen die Waffe ihrer Klasse.\n\n`;
  s += `## Waffenarten\n\n` + tbl(['Waffe', 'CQHT-Klasse'], Object.entries(WEAPON_TYPES).map(([k, t]) => [`${t.icon} ${t.name}`, { schwert: 'Warrior', hammer: 'Paladin', bogen: 'Archer', gewehr: 'Hunter', stab: 'Wizard', fokus: 'Priest' }[k]])) + '\n\n';
  s += `## Güten\n\n` + tbl(['Güte', 'Name', 'ATK', 'HP', 'Boss-Drop in Kapitel'], Object.entries(WEAPON_GRADES).map(([g, w]) => {
    const tiers = Object.entries(DROP_GRADES).filter(([k, [lo, hi]]) => +g >= lo && +g <= hi).map(([k]) => k === 'hard' ? 'schwer' : k === 'legend' ? 'legendär' : k);
    return [`★${g}`, w.name, `+${Math.round(w.atk * 100)} %`, `+${Math.round(w.hp * 100)} %`, tiers.join(', ') || '–'];
  })) + '\n';
  for (const g of Object.keys(WEAPON_GRADES)) {
    const list = WEAPONS.filter(w => w.grade === +g);
    if (!list.length) continue;
    s += `\n## ★${g} ${WEAPON_GRADES[g].name}\n\n` + tbl(['Waffe', 'Art', '🟡 Gold', '📜 FN', 'Schmiede', 'Chance', 'CQHT'],
      list.map(w => [w.name, `${WEAPON_TYPES[w.type].icon} ${WEAPON_TYPES[w.type].name}`, de(w.gold), w.rp ? de(w.rp) : '–', `Stufe ${w.smithy}`, `${String(w.weight).replace('.', ',')} %`, w.src])) + '\n';
  }
  out('akrw-shop.md', s);
}

// ----------------------------------------------------------------- Stufen
{
  const range = (a) => a[0] === a[1] ? `${a[0]}` : `${a[0]}–${a[1]}`;
  const cq = (z, k) => {
    const n = k + 1; const ch = z.tier;
    if (n <= NORMAL_STAGES) return `${ch}-${z.part === 1 ? n : n + 5}`;
    const st = z.stages[k];
    if (st.legend) return `L-${ch}`;
    const hardIdx = n - NORMAL_STAGES + (z.part === 1 ? 0 : 2);
    return `Hard ${ch}-${hardIdx}`;
  };
  let s = `# Riss-Zonen & Stufen – Aetherbastion: Rift Watch\n\n${note}\n\n`;
  s += `${ZONE_DATA.length} Zonen; je zwei teilen sich ein CQHT-Kapitel (*tier*). Pro Zone ${NORMAL_STAGES} normale Stufen, dann ☠️ schwere und in jeder zweiten Zone eine ⭐ legendäre. **Kosten** = Gold für eine Boss-Herausforderung. **Belohnung** = 📜 Forschungsnotizen, ⚒️ Waffen, 🍞 Proviant, 🎟️ Arena-Tickets (noch ohne Funktion).\n\n`;
  s += tbl(['#', 'Zone', 'Portal', 'Kapitel', 'Lv. (normal)'], ZONE_DATA.map(z => [z.id, z.name, z.portal, `${z.tier} (${z.part === 1 ? '1. Hälfte' : '2. Hälfte'})`, range([z.stages[0].level, z.stages[NORMAL_STAGES - 1].level])])) + '\n';
  for (const z of ZONE_DATA) {
    s += `\n## ${z.id}. ${z.name}\n\n*${z.lore}*\n\n` + tbl(['Stufe', 'Boss', 'Schergen', 'Lv.', 'Kosten', '📜', '⚒️', '🍞', '🎟️', 'CQHT'],
      z.stages.map((st, k) => [`${st.legend ? '⭐ ' : st.hard ? '☠️ ' : ''}${k + 1}`, st.boss.name, st.minions.map(m => m.name).join(', '), st.level, de(st.cost), range(st.rewards.rp), st.rewards.weapons, st.rewards.rations, range(st.rewards.tickets), `${cq(z, k)} · ${st.src}`])) + '\n';
  }
  s += `\n## Sonderinhalte *(geplant)*\n\n### ${KITCHEN_TRIAL.name}\n\n` + tbl(['Stufe', 'Gegner', 'CQHT'], KITCHEN_TRIAL.stages.map(t => [t.id, t.boss.name, t.src])) + '\n';
  s += `\n### ${SOUL_FORTRESS.name}\n\nRaid in drei Phasen gegen den Seelenfürsten, freigeschaltet über das ${SOUL_FORTRESS.building.name}.\n\n` + tbl(['Phase', 'Gegner', 'Lv.', 'CQHT'], SOUL_FORTRESS.phases.map((p, i) => [i + 1, p.name, p.level, p.src])) + '\n';
  out('akrw-progression-stages.md', s);

  // JSON
  const json = {
    metadata: {
      title: 'Aetherbastion: Rift Watch – Riss-Zonen, Stufen & Sonderinhalte',
      generated_from: 'js/data/stages.js, js/data/specials.js',
      note: 'Interne Referenz. Maßgeblich sind die Spieldaten im Code. original_* = Vorbild aus Crusaders Quest: Hero Town.',
      zones: ZONE_DATA.map(z => z.name),
    },
    zones: ZONE_DATA.map(z => ({
      id: z.id, name: z.name, short: z.short, tier: z.tier, part: z.part, portal: z.portal, lore: z.lore,
      stages: z.stages.map((st, k) => ({
        stage: k + 1, mode: st.legend ? 'legendary' : st.hard ? 'hard' : 'normal',
        original_stage: cq(z, k), original_name: st.src,
        boss: st.boss.name, boss_sprite: st.boss.sprite, minions: st.minions.map(m => m.name),
        level: st.level, cost: st.cost, info: st.info || undefined,
        rewards: { research_points: st.rewards.rp, weapons: st.rewards.weapons, rations: st.rewards.rations, arena_tickets: st.rewards.tickets },
      })),
    })),
    specials: {
      kitchen_trial: { name: KITCHEN_TRIAL.name, implemented: false, stages: KITCHEN_TRIAL.stages.map(t => ({ id: t.id, boss: t.boss.name, level: t.level, original_name: t.src })) },
      soul_fortress: { name: SOUL_FORTRESS.name, implemented: false, building: SOUL_FORTRESS.building.name,
        phases: SOUL_FORTRESS.phases.map((p, i) => ({ phase: i + 1, boss: p.name, level: p.level, original_name: p.src, rewards: p.rewards })) },
    },
  };
  writeFileSync(`${root}/dev-data/akrw-progression-stages.json`, JSON.stringify(json, null, 2) + '\n');
}
// ------------------------------------------------- Zonen-Erweiterung (Entwurf)
{
  const X = JSON.parse(readFileSync(`${root}/tools/data/zones-expansion.json`, 'utf8'));
  const lvs = (lv) => lv[0] === lv[1] ? `${lv[0]}` : `${lv[0]}–${lv[1]}`;
  const base = Object.entries(X.basePortals).map(([p, name]) =>
    [p, name, ZONE_DATA.filter(z => z.portal === Number(p)).map(z => z.name).join(', ')]);
  let s = `# Zonen-Erweiterung (Entwurf) – Aetherbastion: Rift Watch

> Interne Entwicklungs-Referenz für **Aetherbastion: Rift Watch**. **Geplant, noch nicht im Spiel.** Erzeugt aus \`tools/data/zones-expansion.json\` mit \`node tools/gen-devdata.mjs .\` – Änderungen dort vornehmen, nicht hier. Die Zonen 1–10 (Portal 1–4) sind im Spiel; ihre Daten stehen in \`tools/gen-zones.mjs\`.

## Ausgangslage

Im Spiel sind ${ZONE_DATA.length} Zonen hinter ${base.length} Portal-Stufen:

${tbl(['Portal', 'Region', 'Zonen'], base)}

Die Erweiterung hängt **Portal ${Math.min(...Object.keys(X.portals))}–${Math.max(...Object.keys(X.portals))}** mit den **Zonen ${X.zones[0].id}–${X.zones.at(-1).id}** an. Wie bei den Zonen 1–10 hat jede Zone ${X.zones[0].bosses.length} Bosse und einen **Zonen-Endboss** (★).
`;
  for (const e of X.expansions) {
    s += `\n## ${e.name}: Portal ${e.portals[0]}–${e.portals[1]} (Lv. ${lvs(e.lv)})\n\n${e.note ? e.note + '\n\n' : ''}`;
    for (let p = e.portals[0]; p <= e.portals[1]; p++) {
      const P = X.portals[p];
      s += `### Portal ${p} – ${P.name} (Lv. ${lvs(P.lv)})\n\n`;
      s += tbl(['#', 'Zone', 'Typ', 'Lv.', 'Bosse', '★ Endboss', 'Schergen (Vorschlag)'],
        X.zones.filter(z => z.portal === p).map(z => [z.id, z.name, z.type, lvs(z.lv), z.bosses.join(', '), z.endboss, z.minions.join(', ')])) + '\n\n';
    }
  }
  s += `## Was der Einbau braucht\n\n${X.requirements.map(r => `- ${r}`).join('\n')}\n\n`;
  s += `## Namen geprüft / angepasst\n\n${X.nameNotes.map(r => `- ${r}`).join('\n')}\n`;
  out('akrw-zones-expansion.md', s.replace(/\n{3,}/g, '\n\n'));
}

console.log('ok');
