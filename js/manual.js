// =====================================================================
//  📖 Handbuch im Spiel (Kurzfassung von MANUAL.md)
//  Zahlen kommen aus config.js, damit das Handbuch nicht veraltet.
//  Rückgabe: [{ icon, title, html }] – wird in ui.js als Kapitel gezeigt.
// =====================================================================
import {
  BUILDINGS, ZONES, ROLES, CLASSES, TRAIT_STATS, HEROES, TRAITS, TRAIT_RULES, TENTS, TENT_SIZE, COMBAT, GAME, NORMAL_STAGES, TOTAL_NORMAL, FEATURES,
  RETIRE_MIN_LEVEL, LEVEL_CAP_MAX, ARMORY_SLOTS, RATION_SLOTS, RATION_DROP, RETIRE_HOME, CYCLE_MS, WEAPON_TYPES, WEAPON_FOR, WEAPON_GRADES, SHOP, SELL, QUESTS, RECRUIT, REROLL_RESET_CLOVER,
} from './config.js';

const pct = (x) => `${Math.round(x * 100)} %`;
const min = (ms) => Math.round(ms / 60_000);
const de = (n) => n.toLocaleString('de-DE');
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
      <p>Das <b>Auftrags-Banner</b> oben führt dich durch das Spiel (${questTotal} Aufträge): Gildenhalle, erstes Zelt, erster Held, Riss-Portal, dann Bosse, Gebäude, Waffen, Forschung und weitere Trupps.</p>
      ${list([
        'Der Balken zeigt den Fortschritt, <b>„Hingehen“</b> springt zum passenden Reiter.',
        'Der nächste Schritt leuchtet: ein Punkt am Reiter, ein leuchtender Knopf, bei Bossen 🎯 an der Zielstufe.',
        'Erfüllte Aufträge holst du mit einem Tipp ab – erst dann kommt der nächste.',
        'Hast du ein Ziel schon früher erreicht, ist der Auftrag sofort erfüllt.',
        'Beim Scrollen klappt das Banner ein. Ein Tipp auf die Kopfzeile klappt es wieder auf.',
      ])}` },

    { icon: '🟡', title: 'Währungen & Vorräte', html: `
      ${table(['', 'Woher', 'Wofür'], [
        ['🟡 Gold', 'Siege, Gildenkasse', 'Gebäude, Rekruten, Zelte, Bosse, Waffen, Beleben'],
        ['🔮 Ätherscherben', `Siege (${pct(COMBAT.SHARD_CHANCE)}), jeder Boss`, 'Riss-Portal'],
        ['📜 Forschungsnotizen', 'Bosse, Level-Ups', 'Asura-Labor, seltene Waffen'],
        ['🍀 Mystischer Klee', 'Ruhestand', 'Mystische Schmiede, Würfel-Preis zurücksetzen'],
        ['🍞 Proviant', 'Bosse, Level-Ups', 'EXP für einen Helden'],
      ])}
      <p><b>Gildenkasse:</b> Alle ${min(CYCLE_MS)} Minuten zahlt die Gildenhalle Gold aus. Helden selbst verdienen nur im Kampf.</p>` },

    { icon: '🛡️', title: 'Helden, Rollen & Zelte', html: `
      <p>${HEROES.length} Helden aus fünf Völkern (Charr, Menschen, Norn, Asura, Sylvari), von jeder Rolle gleich viele. Das Volk ändert keine Werte, wichtig sind Rolle und Klasse.</p>
      ${list([
        '🛡️ <b>Tank:</b> steht vorn, wird zuerst angegriffen, viele LP.',
        '⚔️ <b>Schaden:</b> hoher Schaden, oft mit Krit-Chance.',
        '📯 <b>Unterstützer:</b> etwas Schaden plus Team-Buff (<i>Macht</i> = mehr ATK, <i>Eile</i> = Zusatzangriffe).',
        '✚ <b>Heiler:</b> heilt jede Sekunde den schwächsten Verbündeten.',
      ])}
      <p>Monster treffen alle fitten Helden, den Tank am stärksten, den Heiler am wenigsten. Helden steigen bis <b>Lv. ${LEVEL_CAP_MAX}</b>; das Zeltlager bestimmt das Level-Cap (${caps}).</p>
      <p>Jedes <b>Zelt</b> ist ein Trupp mit ${TENT_SIZE} Plätzen. Es gibt bis zu ${TENTS.length} Zelte; Zelt 2–${TENTS.length} öffnen ab Gildenhalle ${tentHalls}. Weitere Helden warten in der <b>Reserve</b>. Gute Aufstellung: <b>Tank + Heiler + Schaden</b>.</p>
      <p>Neue Helden wirbst du unter <b>🛡️ Trupps → Rekrutieren</b> an. Dort stehen wechselnde Angebote – mehr und schneller mit besserer Gildenhalle:</p>
      ${table(['Gildenhalle', 'Angebote', 'Neue alle'], RECRUIT.tiers.map(t => [`ab ${t.hall}`, t.slots, `${t.restockMin} Min.`]))}
      <p>„Liste erneuern“ kostet ${RECRUIT.refreshBase} 🟡 und verdoppelt sich mit jedem Versuch; kommt der Nachschub von selbst, fängt der Preis wieder bei ${RECRUIT.refreshBase} an. Mit 🍀 ${REROLL_RESET_CLOVER} Mystischem Klee setzt du ihn sofort zurück.</p>
      <p>Jeder Rekrut hat eine <b>Seltenheit</b>. Sie bestimmt Preis und Bonus auf LP und ATK. Kostenlose Helden aus den Aufträgen sind „Fein“. Je höher die <b>Gildenhalle</b>, desto öfter kommen seltene Rekruten (Chancen stehen unter „Rekrutieren“).</p>
      ${table(['Seltenheit', 'Preis', 'Bonus', 'Eigenschaften'], Object.entries(RECRUIT.rarities).map(([r, x]) => [`<span style="color:${WEAPON_GRADES[r].color}">◆ ${WEAPON_GRADES[r].name}</span>`, `🟡 ${x.cost.toLocaleString('de-DE')}`, x.bonus ? `+${pct(x.bonus)}` : '–', TRAIT_RULES.count[r]]))}
      <p><b>Klassen:</b> Die Rolle bestimmt, was ein Held im Kampf macht, die Klasse die Waffenart und einen kleinen festen Klassenbonus. Ein Wächter kann Tank, Heiler oder Schaden sein und hat immer den Wächter-Bonus. Heiler tragen immer einen Fokus.</p>
      ${table(['Klasse', 'Bonus', 'Waffe'], Object.entries(CLASSES).map(([k, c]) => { const ts = TRAIT_STATS[c.bonus[0]]; const v = c.bonus[1] * ts.f; return [c.name, `${ts.mode === 'less' ? '−' : '+'}${v.toLocaleString('de-DE')} % ${ts.show || ts.name}${ts.squad ? ' (Trupp)' : ''}`, WEAPON_TYPES[WEAPON_FOR[k]].name]; }))}
      <p><b>Eigenschaften:</b> Jeder Held bringt ${Object.keys(TRAITS).length} mögliche Eigenschaften mit, je nach Seltenheit 1–3 (gewürfelt beim Rekrutieren, im Angebot sichtbar). Ihre Güte liegt höchstens bei der Seltenheit des Helden. Sie verbessern Werte wie ATK, Krit, LP, DEF oder Heilung. 🧭 Lager-Eigenschaften (Gold, EXP, Scherben, Beute, Offline) wirken für den ganzen Trupp, nicht aus der Reserve. Tanks und Heiler bekommen öfter 🛡️ Verteidigung, Schadensausteiler öfter ⚔️ Angriff.</p>` },

    { icon: '👑', title: 'Kampf & Bosse', html: `
      ${list([
        'Jeder Trupp kämpft unabhängig in einer Riss-Zone, eine Aktion pro Sekunde.',
        'Dein Trupp <b>farmt die Schergen</b> der gewählten Stufe: Gold, EXP und ab und zu Ätherscherben.',
        `<b>„Herausfordern“</b> kostet etwas Gold. Dann hat der Trupp <b>${COMBAT.BOSS_TIME_LIMIT} Sekunden</b> für den Boss. Bis dahin lassen sich Zone und Stufe nicht wechseln – aussteigen geht mit <b>„Abbrechen“</b>.`,
        'Jedes Zelt kämpft in seiner eigenen Zone. Ein Wechsel greift sofort, die Kampfbühne leuchtet kurz auf.',
        'In der Chronik steht das Zelt (⛺1 …) mit der Zone darunter.',
        `Nach jeder Herausforderung – Sieg, Niederlage oder Abbruch – verschnauft der Trupp <b>${COMBAT.BOSS_COOLDOWN} Sekunden</b> und kämpft solange gegen die Schergen der Stufe.`,
        '<b>🔁 Auto</b> wiederholt die Herausforderung nach jeder Pause von selbst (wenn das Gold reicht) – gut, um Boss-Beute zu sammeln. Nach einer Niederlage schaltet sich Auto aus. Offline kämpfen Trupps nur gegen Schergen.',
        '<b>Sieg:</b> Forschungsnotizen, Waffen, Proviant, Scherben – beim ersten Sieg öffnet sich die nächste Stufe.',
        '<b>Niederlage:</b> Der Trupp kehrt zu den Schergen zurück. Versuch es später erneut.',
        `Fällt ein Held auf 0 LP, ist er <b>verwundet</b> und erholt sich ${COMBAT.WOUND_MS / 1000} Sekunden lang. ⚡ belebt ihn sofort gegen Gold.`,
        'Fallen alle drei, zieht sich der Trupp ins Lager zurück und kehrt zurück, sobald ein Held wieder fit ist (erholt oder belebt).',
      ])}
      <p><b>Eine Kampfsekunde:</b></p>
      ${list([
        `⚔️ Schaden und 🛡️ Tank greifen mit voller ATK an, 📯 Unterstützer mit ${pct(COMBAT.SUPPORT_ATK_FACTOR)}. Krit-Treffer machen ×${COMBAT.CRIT_MULT} Schaden.`,
        `✚ Heiler heilen den Verbündeten mit den wenigsten LP (Anteil) um ATK × ${String(COMBAT.HEAL_MULT).replace('.', ',')} und greifen mit ${pct(COMBAT.HEALER_ATK_FACTOR)} ATK an, ohne Krit.`,
        `Danach trifft das Monster alle fitten Helden: 🛡️ Tank ${ROLES.tank.aggro} Teile, ⚔️ Schaden und 📯 Unterstützer je ${ROLES.dps.aggro}, ✚ Heiler ${ROLES.healer.aggro}. Die DEF jedes Helden senkt seinen Anteil.`,
        `Nach jedem Sieg heilt der ganze Trupp ${pct(COMBAT.KILL_HEAL)} seiner LP.`,
        'Die Werte siehst du im Helden-Fenster (💥 Schaden, ✚ Heilung) und für den ganzen Trupp unter jedem Zelt.',
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
        [`🌀 ${BUILDINGS.portal.name}`, 'Jede Stufe öffnet ein neues Portal: Kryta, Caledon & Zittergipfel · Metrica, Aschfurt & Anwesen · Löwenstein & Meerenge · Orr. Kostet Gold + 🔮.'],
        [`🍲 ${BUILDINGS.kitchen.name}`, `+${pct(BUILDINGS.kitchen.bonusPerLevel)} EXP pro Stufe`],
        [`🔬 ${BUILDINGS.lab.name}`, 'Forschung; höhere Stufen öffnen tiefere Forschung'],
        [`⚒️ ${BUILDINGS.forge.name}`, 'Waffenladen und Waffenkammer'],
      ])}
      <p>Die Mystische Schmiede öffnet sich ab <b>Gildenhalle ${FEATURES.mystic.unlockHall}</b>.</p>` },

    { icon: '⚒️', title: 'Waffen & Proviant', html: `
      ${list([
        `Der <b>Laden</b> der Charr-Schmiede hat ${SHOP.offers} Angebote und füllt sich alle ${min(SHOP.restockMs)} Minuten neu.`,
        `„Ware auffrischen“ verdoppelt seinen Preis bis zum nächsten Nachschub – oder bis du ihn mit 🍀 ${REROLL_RESET_CLOVER} Mystischem Klee zurücksetzt.`,
        `Boss-Beute und Käufe landen in der <b>Waffenkammer</b> (Reiter 🎒 Inventar und ⚒️ Schmiede) – Beute auch schon, bevor die Schmiede steht. Dort rüstest du aus oder verkaufst (${pct(SHOP.sellFactor)} des Preises).`,
        'Der Reiter <b>🎒 Inventar</b> zeigt Proviant, Früchte, Waffenkammer und ausgerüstete Waffen an einem Ort. Ausrüsten geht dort oder im Helden-Fenster.',
        `Proviant und Früchte kannst du dort auch <b>verkaufen</b> (🍞1 ${de(SELL.rations[0])} bis 🍞6 ${de(SELL.rations[5])} 🟡, 🍎 ${de(SELL.fruit)} 🟡 pro Stück).`,
        'Waffen erscheinen als Kacheln (Güte T1–T6). Antippen: Ausrüsten oder Verkaufen. ▲ = besser als die Waffe eines Helden.',
        `Die Waffenkammer wächst mit der Gildenhalle (${ARMORY_SLOTS[0]} bis ${ARMORY_SLOTS.at(-1)} Plätze). Ist sie voll, bleibt Boss-Beute liegen. <b>🧹 Aufräumen</b> verkauft ganze Güten auf einmal; ▲-Waffen bleiben.`,
        'Jeder Held trägt eine Waffenart: Heiler einen Fokus, sonst nach Klasse.',
      ])}
      <p>${Object.values(WEAPON_TYPES).map(t => `${t.icon} ${t.name}`).join(' · ')}</p>
      ${table(['Güte', 'Bonus'], Object.entries(WEAPON_GRADES).map(([g, w]) => [`★${g} ${w.name}`, `+${pct(w.atk)} ATK, +${pct(w.hp)} HP`]))}
      <p><b>🍞 Proviant</b> gibt einem Helden sofort EXP – ideal für frisch Rekrutierte, die hinterherhinken. Verfüttern im Inventar oder im Helden-Fenster. „⏫ +1 Level“ gibt genau so viel, wie bis zum nächsten Level fehlt; Knopf gedrückt halten wiederholt.</p>
      <p>Beim <b>ersten Sieg</b> über einen Boss gibt es die volle Menge, danach nur mit ${pct(RATION_DROP.chance)} Chance ${RATION_DROP.amount.join('–')} Stück. Das Lager fasst je Güte ${RATION_SLOTS[0]} bis ${RATION_SLOTS.at(-1)} Stück (wächst mit der Gildenhalle); was darüber geht, verfällt.</p>` },

    { icon: '🔬', title: 'Forschung', html: `
      <p>Im <b>Asura-Labor</b> erforschst du mit 📜 Forschungsnotizen dauerhafte Verbesserungen in drei Bäumen:</p>
      ${list([
        '⚔️ <b>Offensive:</b> ATK, Angriffstempo, Krit-Chance und Krit-Schaden.',
        '🛡️ <b>Defensive:</b> HP, DEF, Heilung und kürzere Regeneration.',
        '📦 <b>Logistik:</b> mehr Gold, EXP, Scherben und längere Offline-Zeit.',
      ])}
      <p>Tiefere Knoten brauchen einen Vorgänger und eine höhere Laborstufe.</p>` },

    { icon: '✨', title: 'Ruhestand & Mystische Schmiede', html: `
      ${list([
        `Ab <b>Gildenhalle ${FEATURES.mystic.unlockHall}</b> können Helden ab <b>Lv. ${RETIRE_MIN_LEVEL}</b> in den Ruhestand gehen.`,
        'Sie hinterlassen <b>🍀 Mystischen Klee</b> – je höher das Level, desto mehr. Ihre Waffe kommt in die Waffenkammer.',
        'Klee gibt es nur für EXP aus dem <b>Kampf</b>: Er richtet sich nach dem Level, das der Held ohne 🍞 Proviant hätte.',
        'In der <b>Mystischen Schmiede</b> kaufst du damit dauerhafte Boni für alle Trupps.',
        'Ein Held im Ruhestand kann später neu rekrutiert werden und beginnt wieder bei Lv. 1 – auch mehrfach im Ruhestand.',
        `Im <b>🏡 Ruhestand</b> zahlen sie mit der Gildenkasse alle ${min(CYCLE_MS)} Min. 🟡 Gold und 📜 Forschungsnotizen, je nach (Kampf-)Level – auch offline.`,
        `Es gibt ${RETIRE_HOME.baseSlots} Plätze, mit der Forschung „Archiv der Veteranen“ bis ${RETIRE_HOME.baseSlots + 90}. Sind alle voll, geht der Schwächste; ist keiner schwächer, gibt es nur den Klee.`,
      ])}` },

    { icon: '🌙', title: 'Offline & Spielstand', html: `
      <p>Schließt du die App, farmen deine Trupps weiter – bis zu <b>${offlineH} Stunden</b> (mit Forschung länger). Die Gildenkasse zahlt, Bauaufträge werden fertig. Bosse gibt es nur live. Der <b>Offline-Rissbericht</b> zeigt alles bei der Rückkehr; liegt die Effizienz eines Trupps unter 100 %, ist seine Stufe zu schwer.</p>
      <p>Unter <b>⚙️ Einstellungen</b> (Zahnrad oben rechts) kannst du den Spielstand als Code <b>exportieren</b> und auf einem anderen Gerät <b>importieren</b>. Vor dem Zurücksetzen unbedingt exportieren!</p>` },
  ];
}
