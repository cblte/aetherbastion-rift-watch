// =====================================================================
//  📖 Handbuch im Spiel (Kurzfassung von MANUAL.md)
//  Zahlen kommen aus config.js, damit das Handbuch nicht veraltet.
//  Rückgabe: [{ icon, title, html }] – wird in ui.js als Kapitel gezeigt.
// =====================================================================
import {
  BUILDINGS, ZONES, TENTS, TENT_SIZE, COMBAT, GAME, NORMAL_STAGES, TOTAL_NORMAL, FEATURES,
  RETIRE_MIN_LEVEL, LEVEL_CAP_MAX, CYCLE_MS, WEAPON_TYPES, WEAPON_GRADES, SHOP, QUESTS, RECRUIT, REROLL_RESET_COINS,
} from './config.js';

const pct = (x) => `${Math.round(x * 100)} %`;
const min = (ms) => Math.round(ms / 60_000);
const list = (items) => `<ul>${items.map(i => `<li>${i}</li>`).join('')}</ul>`;
const table = (head, rows) => `<table class="m-table"><thead><tr>${head.map(h => `<th>${h}</th>`).join('')}</tr></thead>
  <tbody>${rows.map(r => `<tr>${r.map(c => `<td>${c}</td>`).join('')}</tr>`).join('')}</tbody></table>`;

export function manualChapters() {
  const caps = BUILDINGS.camp.levels.map(l => l.cap).join(' / ');
  const tentHalls = TENTS.slice(1).map(t => t.hall).join(', ');
  const hallStages = BUILDINGS.hall.levels.slice(1).map(l => l.stage).join(' / ');
  const offlineH = GAME.OFFLINE_MAX_MS / 3_600_000;
  const questTotal = 4 + QUESTS.length;

  return [
    { icon: '🧭', title: 'Erste Schritte', html: `
      <p>Aus den Nebeln reißen Kryptis-Risse auf. Eure Gilde schlägt ein Lager an ihrem Rand auf und hält Wacht. Deine Helden kämpfen in Trupps automatisch – auch wenn die App geschlossen ist.</p>
      <p>Das <b>Auftrags-Banner</b> oben führt dich durch das Spiel (${questTotal} Aufträge): Gildenhalle, Zeltlager, erster Held, Riss-Portal, dann Bosse, Gebäude, Waffen, Forschung und weitere Trupps.</p>
      ${list([
        'Der Balken zeigt den Fortschritt, <b>„Hingehen“</b> springt zum passenden Reiter.',
        'Erfüllte Aufträge holst du mit einem Tipp ab – erst dann kommt der nächste.',
        'Hast du ein Ziel schon früher erreicht, ist der Auftrag sofort erfüllt.',
      ])}` },

    { icon: '🪙', title: 'Währungen & Vorräte', html: `
      ${table(['', 'Woher', 'Wofür'], [
        ['🪙 Gold', 'Siege, Gildenkasse, Helden ab Lv. 10', 'Gebäude, Rekruten, Zelte, Bosse, Waffen, Beleben'],
        ['🔮 Ätherscherben', `Siege (${pct(COMBAT.SHARD_CHANCE)}), jeder Boss`, 'Riss-Portal'],
        ['🧪 Forschungspunkte', 'Bosse, Level-Ups, Helden ab Lv. 20', 'Asura-Labor, seltene Waffen'],
        ['💠 Mystische Münzen', 'Ruhestand', 'Mystische Schmiede, Würfel-Preis zurücksetzen'],
        ['🍞 Proviant', 'Bosse, Level-Ups', 'EXP für einen Helden'],
      ])}
      <p><b>Gildenkasse:</b> Alle ${min(CYCLE_MS)} Minuten zahlt die Gildenhalle Gold aus. Helden ab Lv. 10 verdienen Gold, ab Lv. 20 auch Forschungspunkte – sogar in der Reserve.</p>` },

    { icon: '🛡️', title: 'Helden, Rollen & Zelte', html: `
      ${list([
        '🛡️ <b>Tank:</b> steht vorn, wird zuerst angegriffen, viele LP.',
        '⚔️ <b>Schaden:</b> hoher Schaden, oft mit Krit-Chance.',
        '📯 <b>Unterstützer:</b> etwas Schaden plus Team-Buff (<i>Macht</i> = mehr ATK, <i>Eile</i> = Zusatzangriffe).',
        '✚ <b>Heiler:</b> heilt jede Sekunde den schwächsten Verbündeten.',
      ])}
      <p>Monster greifen den vordersten lebenden Helden an: Tank → Schaden → Unterstützer → Heiler. Helden steigen bis <b>Lv. ${LEVEL_CAP_MAX}</b>; das Zeltlager bestimmt das Level-Cap (${caps}).</p>
      <p>Jedes <b>Zelt</b> ist ein Trupp mit ${TENT_SIZE} Plätzen. Es gibt bis zu ${TENTS.length} Zelte; Zelt 2–${TENTS.length} öffnen ab Gildenhalle ${tentHalls}. Weitere Helden warten in der <b>Reserve</b>. Gute Aufstellung: <b>Tank + Heiler + Schaden</b>.</p>
      <p>Neue Helden wirbst du unter <b>🛡️ Trupps → Rekrutieren</b> an. Dort stehen wechselnde Angebote – mehr und schneller mit besserer Gildenhalle:</p>
      ${table(['Gildenhalle', 'Angebote', 'Neue alle'], RECRUIT.tiers.map(t => [`ab ${t.hall}`, t.slots, `${t.restockMin} Min.`]))}
      <p>„Liste erneuern“ kostet ${RECRUIT.refreshBase} 🪙 und verdoppelt sich mit jedem Versuch; kommt der Nachschub von selbst, fängt der Preis wieder bei ${RECRUIT.refreshBase} an. Mit 💠 ${REROLL_RESET_COINS} Mystischen Münzen setzt du ihn sofort zurück.</p>
      <p>Jeder Rekrut hat eine <b>Seltenheit</b>. Sie bestimmt Preis und Bonus auf LP und ATK. Kostenlose Helden aus den Aufträgen sind „Fein“.</p>
      ${table(['Seltenheit', 'Preis', 'Bonus'], Object.entries(RECRUIT.rarities).map(([r, x]) => [`<span style="color:${WEAPON_GRADES[r].color}">◆ ${WEAPON_GRADES[r].name}</span>`, `🪙 ${x.cost.toLocaleString('de-DE')}`, x.bonus ? `+${pct(x.bonus)}` : '–']))}` },

    { icon: '👑', title: 'Kampf & Bosse', html: `
      ${list([
        'Jeder Trupp kämpft unabhängig in einer Riss-Zone, eine Aktion pro Sekunde.',
        'Dein Trupp <b>farmt die Schergen</b> der gewählten Stufe: Gold, EXP und ab und zu Ätherscherben.',
        `<b>„Herausfordern“</b> kostet etwas Gold. Dann hat der Trupp <b>${COMBAT.BOSS_TIME_LIMIT} Sekunden</b> für den Boss.`,
        `Nach jeder Herausforderung – Sieg, Niederlage oder Abbruch – verschnauft der Trupp <b>${COMBAT.BOSS_COOLDOWN} Sekunden</b> und kämpft solange gegen die Schergen der Stufe.`,
        '<b>🔁 Auto</b> wiederholt die Herausforderung nach jeder Pause von selbst (wenn das Gold reicht) – gut, um Boss-Beute zu sammeln. Nach einer Niederlage schaltet sich Auto aus. Offline kämpfen Trupps nur gegen Schergen.',
        '<b>Sieg:</b> Forschungspunkte, Waffen, Proviant, Scherben – beim ersten Sieg öffnet sich die nächste Stufe.',
        '<b>Niederlage:</b> Der Trupp kehrt zu den Schergen zurück. Versuch es später erneut.',
        `Fällt ein Held auf 0 LP, ist er <b>verwundet</b> und erholt sich ${COMBAT.WOUND_MS / 1000} Sekunden lang. ⚡ belebt ihn sofort gegen Gold.`,
        'Fallen alle drei, zieht sich der Trupp ins Lager zurück und kehrt nach der Erholung zurück.',
      ])}
      <p>Tipp: Fordere den Boss heraus, sobald dein Trupp das empfohlene Level erreicht. Scheitern kostet nur das Herausforderungs-Gold.</p>` },

    { icon: '🌀', title: 'Riss-Zonen', html: `
      <p>${ZONES.length} Zonen mit je <b>${NORMAL_STAGES} normalen Stufen</b> und schweren ☠️ Stufen; jede zweite Zone hat zusätzlich eine legendäre ⭐. Schwere Stufen öffnen sich, wenn alle ${TOTAL_NORMAL} normalen Stufen besiegt sind, legendäre nach allen schweren.</p>
      ${table(['#', 'Zone', 'Portal', 'Lv.'], ZONES.map(z => {
        const lv = z.stages.slice(0, NORMAL_STAGES).map(s => s.level);
        return [z.id, z.name, z.portal, lv[0] === lv.at(-1) ? lv[0] : `${lv[0]}–${lv.at(-1)}`];
      }))}
      <p>Eine Zone öffnet sich, wenn das Riss-Portal hoch genug ist und alle Bosse der vorigen Zone besiegt sind. Im <b>🌀 Portal</b> wählst du oben den Trupp (Pfeile, Karten antippen oder wischen) und darunter Zone und Stufe.</p>` },

    { icon: '🏛️', title: 'Gebäude', html: `
      <p>Gebaut wird immer <b>nur ein Gebäude gleichzeitig</b>; höhere Stufen brauchen Bauzeit.</p>
      ${table(['Gebäude', 'Wirkung'], [
        [`🏛️ ${BUILDINGS.hall.name}`, `Gildenkasse, schaltet alles andere frei. Braucht ${hallStages} besiegte Stufen.`],
        [`⛺ ${BUILDINGS.camp.name}`, `Level-Cap ${caps}`],
        [`🌀 ${BUILDINGS.portal.name}`, 'Jede Stufe öffnet zwei weitere Zonen. Kostet Gold + 🔮.'],
        [`🍲 ${BUILDINGS.kitchen.name}`, `+${pct(BUILDINGS.kitchen.bonusPerLevel)} EXP pro Stufe`],
        [`🔬 ${BUILDINGS.lab.name}`, 'Forschung; höhere Stufen öffnen tiefere Forschung'],
        [`⚒️ ${BUILDINGS.forge.name}`, 'Waffenladen und Waffenkammer'],
      ])}
      <p>Die Mystische Schmiede öffnet sich ab <b>Gildenhalle ${FEATURES.mystic.unlockHall}</b>.</p>` },

    { icon: '⚒️', title: 'Waffen & Proviant', html: `
      ${list([
        `Der <b>Laden</b> der Charr-Schmiede hat ${SHOP.offers} Angebote und füllt sich alle ${min(SHOP.restockMs)} Minuten neu.`,
        `„Ware auffrischen“ verdoppelt seinen Preis bis zum nächsten Nachschub – oder bis du ihn mit 💠 ${REROLL_RESET_COINS} Mystischen Münzen zurücksetzt.`,
        `Boss-Beute und Käufe landen in der <b>Waffenkammer</b> (Reiter ⚒️ Schmiede) – Beute auch schon, bevor die Schmiede steht. Dort rüstest du aus oder verkaufst (${pct(SHOP.sellFactor)} des Preises).`,
        'Oben rechts öffnet <b>🎒</b> das <b>Inventar</b>: Waffenkammer, ausgerüstete Waffen und Proviant an einem Ort. Ausrüsten geht dort oder im Helden-Fenster.',
        'Jeder Held trägt eine Waffenart: Heiler einen Fokus, sonst nach Klasse.',
      ])}
      <p>${Object.values(WEAPON_TYPES).map(t => `${t.icon} ${t.name}`).join(' · ')}</p>
      ${table(['Güte', 'Bonus'], Object.entries(WEAPON_GRADES).map(([g, w]) => [`★${g} ${w.name}`, `+${pct(w.atk)} ATK, +${pct(w.hp)} HP`]))}
      <p><b>🍞 Proviant</b> gibt einem Helden sofort EXP – ideal für frisch Rekrutierte, die hinterherhinken. Verfüttern im Inventar oder im Helden-Fenster.</p>` },

    { icon: '🔬', title: 'Forschung', html: `
      <p>Im <b>Asura-Labor</b> erforschst du mit 🧪 Forschungspunkten dauerhafte Verbesserungen in drei Bäumen:</p>
      ${list([
        '⚔️ <b>Offensive:</b> ATK, Angriffstempo, Krit-Chance und Krit-Schaden.',
        '🛡️ <b>Defensive:</b> HP, DEF, Heilung und kürzere Regeneration.',
        '📦 <b>Logistik:</b> mehr Gold, EXP, Scherben und längere Offline-Zeit.',
      ])}
      <p>Tiefere Knoten brauchen einen Vorgänger und eine höhere Laborstufe.</p>` },

    { icon: '✨', title: 'Ruhestand & Mystische Schmiede', html: `
      ${list([
        `Ab <b>Gildenhalle ${FEATURES.mystic.unlockHall}</b> können Helden ab <b>Lv. ${RETIRE_MIN_LEVEL}</b> in den Ruhestand gehen.`,
        'Sie hinterlassen <b>💠 Mystische Münzen</b> – je höher das Level, desto mehr. Ihre Waffe kommt in die Waffenkammer.',
        'In der <b>Mystischen Schmiede</b> kaufst du damit dauerhafte Boni für alle Trupps.',
        'Ein Held im Ruhestand kann später neu rekrutiert werden und beginnt wieder bei Lv. 1.',
      ])}` },

    { icon: '🌙', title: 'Offline & Spielstand', html: `
      <p>Schließt du die App, farmen deine Trupps weiter – bis zu <b>${offlineH} Stunden</b> (mit Forschung länger). Die Gildenkasse zahlt, Bauaufträge werden fertig. Bosse gibt es nur live. Der <b>Offline-Rissbericht</b> zeigt alles bei der Rückkehr; liegt die Effizienz eines Trupps unter 100 %, ist seine Stufe zu schwer.</p>
      <p>Unter <b>🏛️ Lager → Einstellungen</b> kannst du den Spielstand als Code <b>exportieren</b> und auf einem anderen Gerät <b>importieren</b>. Vor dem Zurücksetzen unbedingt exportieren!</p>` },
  ];
}
