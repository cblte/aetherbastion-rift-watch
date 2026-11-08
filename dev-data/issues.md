# Offene Issues

Feedback und Fehler aus dem Spieltest. Erledigte Punkte wandern mit Version nach `issues_solved.md`.

**So geht's:** Neues einfach unten unter „Eingang“ als Stichpunkt notieren. Claude sortiert es ein und vergibt eine Nummer.

- **Nummern** (`#001` …) werden nie neu vergeben, auch nicht nach dem Erledigen.
- **Kategorie:** UI · Tutorial · Spielsystem · Balancing · Fehler · Idee
- **Status:** `offen` · `in Arbeit` · `zurückgestellt` (mit Grund)
- **Quelle:** wer es gemeldet hat (z. B. „Spieltest Frau“, „Gilde“)

Nächste freie Nummer: **#063**

## Eingang

<!-- Hier neue Punkte notieren, ungeordnet ist okay. -->

---

## Fehler

_Zurzeit nichts offen._

## UI

### #041 Oberfläche zu voll für den kleinen Bildschirm
- **Status:** offen · **Quelle:** Entwickler
- Eindruck: Auf 440 px ist alles zu viel auf einmal.
- Vorschlag: Erst eine Bestandsaufnahme machen, Bildschirm für Bildschirm (Kopfbereich mit Währungen, Trupp-Karten, Gebäude, Rekrutierung, Schmiede): Was braucht man ständig, was nur selten? Seltenes hinter Aufklappen oder Unter-Tabs legen. Passt zu #034 (weniger Währungen = weniger Kopfbereich).

### #055 Kampf-Chronik als Popup
- **Status:** zurückgestellt (zusammen mit #041/#056) · **Quelle:** Gilde
- Die Chronik muss nicht dauerhaft unten im Lager stehen. Idee: 📜-Knopf öffnet sie als Modal (läuft live mit), evtl. die letzte Zeile als Einzeiler sichtbar lassen.

### #056 Bildschirme ohne Scrollen, nur Listen scrollen
- **Status:** zurückgestellt (nächster Schritt, nach v0.32.0) · **Quelle:** Gilde
- Wunsch: Die Bildschirme selbst sollen (fast) nicht scrollen, nur Listen in aufklappenden Bereichen. Gehört zur Bestandsaufnahme in #041, #055 ist ein erster Schritt.

## Tutorial

_Zurzeit nichts offen._

## Spielsystem

### #051 Schaden: Anführer zuerst statt alle gleichzeitig, dazu Flächenschaden
- **Status:** zurückgestellt (wartet auf das Traits-Balancing) · **Quelle:** Spieltest
- Eindruck: Seit #032 (v0.22.0) bekommen jede Sekunde **alle** Helden Schaden. Das sieht komisch aus und passt nicht zur Aufstellung. Wunsch: Der Zelt-Anführer (der oben/vorne steht) soll zuerst getroffen werden. Nur der Tank allein ist aber auch doof (das war der Stand vor #032: Tank fällt, dann der Nächste, dann Rückzug).
- Stand im Code: `combat.js` teilt jeden Treffer per `damageShares()` nach `ROLES[…].aggro` auf alle fitten Helden auf (Tank 5, Schaden 3, Unterstützer 3, Heiler 2). `frontOrder()` sortiert nach Rolle, die Platz-Nummer im Zelt entscheidet nur bei gleicher Rolle. Einen „Anführer“ gibt es im Spiel nicht.
- **Flächenschaden (AoE) gibt es nicht:** Gegner haben nur `atk` (Schergen und Bosse gleich). `dev-data/gegner-pro-zone.jsonl` hat ein Feld `attack` (Nahkampf/Fernkampf/Magie), das das Spiel noch nicht nutzt.
- Lösungsansätze:
  - **A Ein Ziel pro Treffer, gewürfelt nach Aggro:** Jede Sekunde trifft das Monster genau einen Helden, die Chance richtet sich nach `aggro`. Im Mittel exakt wie heute, Balancing und Offline bleiben gleich. Sieht aus wie echte Treffer, aber ohne Anführer.
  - **B Anführer als Hauptziel mit Streuung:** Platz 1 im Zelt ist der Anführer und bekommt den Großteil (z. B. 60–70 %), der Rest verteilt sich nach `aggro`. Spieler entscheidet durch die Aufstellung, wer vorne steht (Taktik). Fällt der Anführer, rückt der Nächste nach.
  - **C Bedrohung:** Der Anführer bekommt alles, bis er unter X % LP fällt, dann wechselt das Ziel. Klassisch, aber nah am alten Problem vor #032.
  - **D Angriffsarten der Gegner (ergänzt A–C):** Nahkampf trifft den Anführer, Fernkampf ein zufälliges Ziel, Magie als Fläche (alle bekommen einen kleineren Anteil). Bosse zusätzlich alle N Sekunden ein angekündigter Flächenangriff. Daten aus `attack` der JSONL; passt zu #026 (mehr Schergen) und #042 (Gegner-Mechaniken, Helden dagegen).
- Empfehlung: **B + D**. Anführer = Platz 1 (in Zelt und Arena markieren), Nahkampf auf ihn, Fernkampf/Magie streuen; Boss-Flächenangriff als erste Mechanik für #042. Zahlen (Anteil Anführer, Fläche, Boss-Takt) in `config.js`.
- **Entschieden (2026-11-08):** Wir wollen **B + D** umsetzen. Aber erst, wenn der Branch mit dem Balancing aus den Traits (`dev-data/akrw-traits.md`) gemergt ist – der wird sehr wahrscheinlich übernommen und ändert die Grundlage. Danach B + D noch einmal gegen das neue Balancing prüfen und dann umsetzen.
- Stand v0.30.1: Traits und Klassenboni sind in main. Jetzt B + D gegen das neue Balancing prüfen.
- Vor dem Umsetzen: Simulation wie bei #032 (Siege/h, Rückzüge, Offline-Effizienz Zonen 1–10), Offline-Rechnung (`teamProfile().teamDef`) an die neue Verteilung anpassen. Handbuch und Rollen-Text nachziehen.

### #040 Asura-Labor ab Stufe 6 ohne Wirkung
- Teilweise erledigt (v0.27.0): Labor 6–10 schalten jetzt die Stufen von „Archiv der Veteranen“ frei (#022). Weitere Knoten für Labor 7–10 wären trotzdem gut.
- **Status:** offen · **Quelle:** Gilde (Spieler mit allem maximal ausgebaut)
- Rückmeldung: Das Labor hochzuleveln „macht noch keinen Sinn“.
- Befund: `TIER_LAB = { 1: 1, 2: 3, 3: 5 }` – ab Labor-Stufe 5 sind alle Forschungen offen. Die Stufen 6–10 kosten zusammen 1,9 Mio. 🟡 und schalten nichts frei.
- Vorschlag: Stufe 4 im Baum (Labor 7) und Stufe 5 (Labor 9), oder höhere `max` je Knoten an die Labor-Stufe koppeln. Ideen für neue Knoten in `dev-data/archiv/cqht-skills.json` (436 CQHT-Forschungen). Gut für die Gegner-Mechaniken aus #042 (z. B. Forschung gegen Schilde).

### #042 Endgame: Gegner-Mechaniken und Helden, die dagegen helfen
- **Status:** offen · **Quelle:** Entwickler
- In CQHT hängt man vor Stufe 50, weil Forschung fehlt und man keinen Helden hat, der ständig Gegner-Schilde entfernt. Solche Mechaniken fehlen im Spiel ganz: Bosse unterscheiden sich nur in den Zahlen.
- Vorschlag: Ein paar Boss-Eigenschaften (z. B. Schild/Trotz, Wut-Phase unter 30 % LP, Gift auf den ganzen Trupp), jeweils mit einer Rolle oder Fähigkeit, die dagegen hilft (Unterstützer entfernt Schild, Heiler entfernt Zustände). So zählt die Trupp-Zusammensetzung mehr als nur die Stärke. Hängt eng am geplanten Skill-System, Gegner-Fähigkeiten aus `rift` in #026 als Vorlage.

### #033 Beförderung: Helden ab bestimmten Leveln einzeln aufwerten
- **Status:** offen · **Quelle:** Entwickler
- Idee: Wie in CQHT erreichen Helden ein Level, ab dem man sie einzeln zum Aufwerten schickt (Beförderung). Steht schon unter „Geplant“ (Beförderungen / Sterne-Stufen).
- Vorschlag: Beförderung an Level-Schwellen (z. B. 20/40/60), kostet Gold und eine zweite Währung (siehe #034) und dauert eine Zeit, in der der Held nicht kämpft (wie Bauaufträge). Belohnung: höhere Seltenheit (Rahmenfarbe) oder Werte-Bonus. Klärt nebenbei die offene Frage aus der Rekrutierung (bessere Seltenheit ersetzt die alte Version).
- Zuerst die CQHT-Regeln nachsehen (Kosten, Dauer, was sich ändert).

### #034 Weniger Währungen
- **Status:** offen · **Quelle:** Entwickler
- Zurzeit vier Währungen, die sich kaum gebraucht anfühlen: 🟡 Gold, 🔮 Ätherscherben (Riss-Portal, Aufträge), 🍀 Mystischer Klee (Ruhestand → Mystische Schmiede, Würfel-Preis zurücksetzen), 📜 Forschungsnotizen (Asura-Labor, seltene Waffen). Idee: Klee oder Scherben streichen, eher nur eine Zusatzwährung.
- Vorschlag: Jede Währung bekommt genau eine Aufgabe, oder sie fällt weg.
  - 🟡 Gold = alles Alltägliche.
  - 📜 Forschungsnotizen = Fortschritt (Labor, Beförderung #033).
  - 🔮 Scherben: entschieden (2026-11-07), sie werden Orichalcum, siehe #048. Das Portal kostet dann nur Gold und Boss-Fortschritt.
  - 🍀 Klee bleibt nur, wenn der Ruhestand bleibt; sonst Mystische Schmiede auf 📜 umstellen.
- Save-Migration: Bestände umrechnen (z. B. 1 🔮 = X 🟡), nichts ersatzlos löschen. Entscheiden zusammen mit #033 und #022.

### #026 Mehr Schergen pro Zone, dazu Veteranen und Elite aus dem Riss
- **Status:** offen · **Quelle:** Entwickler
- Wunsch: Mehr echte GW2-Gegner pro Zone statt 2 Schergen pro Stufe, etwa 5 Schergen pro Stufe. Jeder hat einen Basiswert, und manchmal kommt ein Scherge als **Veteran** oder **Elite** aus einem Riss und ist entsprechend stärker.
- Daten: `dev-data/gegner-pro-zone.jsonl` (von Gemini, bereinigt). Felder: `zone`, `name`, `faction`, `stages` (1–5), `attack` (Nahkampf/Fernkampf/Magie), `area`, `flavor`, `rift` {`name`, `ability`}, `wiki`. Keine Zahlenwerte, die Stärke bleibt bei den Formeln in `config.js`.
- Zonen 1–6 bereinigt (85 Zeilen, 12–16 Schergen pro Zone): Namen auf die Schreibweise der DE-Wiki gebracht (z. B. Arktischer Bär → Arctodus, Sohn von Svanir (Jäger) → Svanir-Jäger, Cuatl-Krieger → Hylek-Krieger), erfundene Anwesen-Gegner durch echte ersetzt (Kleriker des Weißen Mantels, Separatist, Höhlenspinne …), Harathi-Krieger und Modniir-Berserker vom Königintal ins Harathi-Hinterland, Funkenschwärmer von Metrica in den Funkenschwärmersumpf, Apostroph `Caudecus’ Anwesen`, Wiki-Links neu gesetzt. Alle Namen stehen in der Wiki, außer bewusst eigenen Gegnern mit `"wiki": null` (Sumpfschrecken, Abgerichteter Wachhund, Diener des Hauses); Inquestur-Golem verweist auf die Wiki-Seite „Golem“. Jede Stufe hat mindestens 3 Schergen.
- Zonen 7–10 fehlen: Seit v0.21.0 (#025) sind das Löwenstein & Klaueninsel, Meerenge der Verwüstung, Malchors Sprung und Fluchküste. Die alten Gemini-Zeilen der früheren Zonen 7–10 liegen in `dev-data/archiv/gegner-alte-zonen-7-10.jsonl`. Für die Orr-Zonen gibt es in der DE-Wiki viele echte Gegner (Kategorie „Auferstandener“), die Schergen in `tools/gen-zones.mjs` sind ein Anfang.
- Riss-Formen: Etwa die Hälfte der Namen beginnt mit „Riss-…“ (eintönig), Fähigkeiten nennen teils Dinge, die das Spiel nicht kennt (Mana, Ausweichen) – als Kampf-Log-Text nutzbar, nicht als Regel. Evtl. von Gemini abwechslungsreicher neu schreiben lassen. Bosse sind nicht drin (eigene Datei geplant).
- Entschieden (2026-11-07): Erst nur **Veteran**, Elite kommt später. Startwerte: 10 % Chance, ×2 LP, ×1,5 Angriff, ×2 Beute.
- Zum Umsetzen:
  - Regeln für Veteran (später Elite) in `config.js` (Chance, ×LP, ×Angriff, Beute), Namen und Fähigkeit aus `rift`.
  - Kampf und Offline-Berechnung müssen mehr als 2 Schergen pro Stufe auswürfeln können.
  - Skript in `tools/`, das die JSONL liest, Namen gegen die Wiki prüft (wie `build-gw2-monsters.mjs`) und die Schergen in `stages.js` schreibt (zusammen mit `gen-zones.mjs`).
  - Handbuch (`MANUAL.md`, `manual.js`) ergänzen.

### #062 Gegner-Vielfalt: Profile für Schergen, knackige Bosse
- **Status:** offen (nach #061) · **Quelle:** Entwickler
- Befund: Jede Stufe hat 2 Schergen-Typen, die sich nur im Namen unterscheiden (`monsterTemplate()` in `combat.js` gibt beiden dieselben Werte). Bosse unterscheiden sich ebenfalls nur in den Zahlen. Spielerisch kämpft man immer gegen denselben Gegner.
- Vorschlag Schergen: **Profile** mit Faktoren auf die Grundwerte der Stufe (aus #061), Werte in `config.js`, z. B.:
  - *Rohling*: viel LP und DEF, langsam (3,0 s)
  - *Flinker*: wenig LP, schnell (1,5 s)
  - *Schütze/Magier*: mittlere LP, hoher ATK, wenig DEF
  - *Schwarm*: sehr wenig LP, wenig Beute, kommt oft

  Jeder Scherge in `tools/gen-zones.mjs` bekommt ein Profil. Mehr Schergen pro Stufe (3–5) und Veteran/Elite laufen über #026; beide zusammen umsetzen.
- Vorschlag Bosse (Champions): **Die Bosse sollen knackig sein**, vor allem der Endboss jeder Zone. Ziel: Den Endboss schafft nur ein Trupp auf Höchstlevel der Zone mit passender Waffe (und Forschung), nicht schon ein Trupp, der gerade das empfohlene Level erreicht hat. Bosse bekommen ebenfalls ein Profil (Tempo 1,5 s aus CQHT, eigene LP/DEF-Faktoren); Endbosse einen eigenen Zuschlag in `config.js`.
- Später: Boss-Fähigkeiten (Wut-Phase unter X % LP, Schergen rufen, Flächenangriff) → #042, #051 D.
- Stand v0.34.0: Schwere Stufen haben eine eigene Treppe über der letzten normalen Stufe (`COMBAT.HARD_DIFF` d 56 → 61), legendäre `COMBAT.LEGEND_DIFF` d 61,5 → 62,5 = absichtlich fast unschaffbar (Max-Trupp Tank/Heiler/Schaden auf Lv. 60 mit T6: 43 % → 3 % Siegchance). **Offen:** ein „S-Tier“-Trupp finden (beste Rollen/Klassen/Eigenschaften), der Legendär schafft, und `LEGEND_DIFF` danach herunterregeln. T6 fällt nur noch auf schweren/legendären Stufen, der Laden verkauft T5 ab Portal 4, T6 nach allen normalen Stufen (`SHOP.gradeLock`). Nach #061 alle Werte neu simulieren.
- Prüfen mit `tools/sim-bosses.mjs`: Endboss mit Max-Level-Trupp + Waffe knapp im 90-s-Limit, mit schwächerem Trupp nicht.

## Balancing

### #061 Gegnerwerte nach CQHT: mehr LP, DEF, Angriffstempo, weniger Beute im Spätspiel
- **Status:** offen · **Quelle:** Entwickler
- Eindruck: Gegner sind viel zu schwach, das Spiel läuft sehr schnell.
- Befund (Vergleich mit allen CQHT-Schergen in `dev-data/archiv/cqht-monsters.json`, unsere Formeln mit d = Level × 0,8):

  | Lv. | CQHT LP / ATK / DEF | wir LP / ATK | CQHT EXP / Gold | wir EXP / Gold |
  |---|---|---|---|---|
  | 1 | 160 / 6 / 0 | 65 / 6,4 | 10 / 2 | 9 / 5 |
  | 8 | 470 / 16 / 22,5 | 110 / 10 | 22 / 8 | 17 / 10 |
  | 14 | 1260 / 31 / 44,5 | 174 / 15 | 59 / 12 | 31 / 18 |
  | 30 | 2510 / 55 / 90 | 548 / 40 | 118 / 21 | 136 / 69 |
  | 45 | 9870 / 135 / 144 | 1855 / 113 | 463 / 34 | 651 / 296 |
  | 60 | 25669 / 222 / 189 | 5821 / 301 | 900 / 47 | 2824 / 1152 |

  - **LP** 2,5–7× zu niedrig, auf allen Stufen.
  - **Angriffstempo:** CQHT-Schergen greifen alle **2,5 s** an, Bosse alle **1,5 s** (Intervall, bestätigt). Bei uns trifft jedes Monster jede Sekunde → unser Schaden pro Sekunde ist schon jetzt 2–4× höher als in CQHT. ATK pro Treffer darf steigen, wenn das Tempo sinkt.
  - **DEF:** Monster haben bei uns keine, in CQHT 0 bis 189 (dazu RES, gleicher Wert).
  - **Beute:** Ab ca. Lv. 30 viel zu viel, auf Lv. 60 3× EXP und 25× Gold. Levelkurve und Baukosten sind CQHT-Werte, deshalb geht das Spätspiel im Eiltempo.
  - Proviant bleibt Boss-Beute (die 0,05 % der CQHT-Schergen lassen wir weg).
- Vorschlag:
  - `F.monsterHp`/`F.monsterAtk`/`F.goldPerKill`/`F.expPerKill` durch eine Tabelle nach Stufen-Level ersetzen (Datei in `js/data/`, aus `cqht-monsters.json` erzeugt, Werte zwischen den Stützstellen interpolieren). Bosse ebenso aus den CQHT-Bossen.
  - In `config.js` je ein Regler für LP, ATK, DEF und Beute, um die CQHT-Werte an unsere Helden-Grundwerte anzupassen.
  - Monster-DEF wirkt wie Helden-DEF (Schadensreduktion, Kappung wie `DEF_CAP`), Formel in `F`.
  - Angriffstempo als Wert je Monster (Schergen 2,5 s, Bosse 1,5 s), später je Profil (#062).
- **Tick und Angriffe trennen** (entschieden 2026-11-08, wie in Idle-Spielen üblich: Simulation, Angriffs-Timer und Darstellung getrennt):
  - **Simulation 10×/s** (`GAME.TICK_MS: 100`). Ein Tick lässt nur die Zeit laufen, er ist kein Angriff. Lücken ≤ 30 s in `main.js` = bis zu 300 Ticks, unkritisch.
  - **Angriffs-Timer je Kämpfer:** Monster (Schergen 2,5 s, Bosse 1,5 s) und Helden zählen hoch und greifen erst bei ≥ Intervall an. Rest behalten (`timer -= intervall`), damit krumme Intervalle im Schnitt genau stimmen.
  - **Helden bekommen Intervalle** nach Klasse/Waffenart (`CLASSES` in `config.js`, z. B. Dieb schnell mit kleinen Treffern, Elementarmagier langsam und hart). Eile, Tempo-Forschung und Traits verkürzen das Intervall, statt wie heute den Schaden je Tick zu vervielfachen (`teamProfile`: `tempo + st.speed`). Heilung ebenfalls als Intervall oder pro Sekunde × dt.
  - **Alles in Sekunden statt Ticks:** `bossTicks` → verstrichene Zeit gegen `BOSS_TIME_LIMIT`, Regeneration, Kill-Heilung, Boss-Pause, Gildenkasse-Zyklen prüfen.
  - **Darstellung getrennt:** `render()` ca. 4×/s bzw. bei Ereignissen, nicht bei jedem Tick. LP-Balken per CSS-`transition` weich, Treffer als kurze CSS-Animation (Wackeln/Schadenszahl), ausgelöst von Angriffs-Ereignissen. Kein 60-fps-Neuzeichnen (Akku).
  - **Offline** (`offline.js`) bleibt bei Erwartungswerten: Schaden/s = ATK ÷ Intervall.
  - Save-Format: Timer pro Monster/Held sind flüchtig (beim Laden 0), `bossTicks` ggf. migrieren → `SAVE_VERSION` + Migration, falls sich gespeicherte Felder ändern.
- Ziel festlegen, bevor man Zahlen dreht: Wie lange dauert ein Schergen-Kampf auf passendem Level (z. B. 5–8 s)? Dann mit `tools/sim-bosses.mjs` Siege/h, Rückzüge und Zeit pro Zone prüfen, Offline-Effizienz mit.
- Hängt zusammen mit #043 (Endgame-Balancing, `COMBAT.LEVEL_DIFF`), #051 (Schadensverteilung) und #062.

### #039 Zu viele Schadens-Helden, Heiler nur in „Fein“
- **Status:** offen · **Quelle:** Gilde (Spieler hat alle Bosse inkl. legendär besiegt), vom Entwickler bestätigt
- Rückmeldung: Überangebot an Schaden, einige Unterstützer, sehr wenige Tanks, nur drei Heiler, alle drei in der Seltenheit Fein.
- Befund: `HEROES` hat 10 Schaden, 4 Unterstützer, 3 Tanks, 3 Heiler. Jeder Held existiert nur einmal. Kostenlose Helden aus den Aufträgen kommen als `RECRUIT.freeRarity` (2 = Fein) und werden danach nie wieder angeboten (`recruitPool` filtert Besessene). Bekommt man die Heiler per Auftrag, kann man sie also nie in besserer Seltenheit haben.
- Seit v0.28.0: 60 Helden, je 15 pro Rolle (Teil 1 erledigt). Offen bleibt der zweite Punkt.
- Vorschlag:
  - ~~Mehr Heiler und Tanks in `HEROES`~~ (v0.28.0) (neue `id`s, bestehende nie ändern), damit die Rollen ungefähr gleich groß sind.
  - Die offene Frage aus „Geplant“ jetzt klären: Besessene Helden wieder anbieten, und eine bessere Seltenheit ersetzt die alte (Level bleibt). Alternative: Beförderung #033 hebt die Seltenheit.

### #043 Endgame-Schwierigkeit: Formel oder Handarbeit?
- Seit v0.27.1 (#047): schwere/legendäre Stufen deutlich härter (`COMBAT.ENDGAME_DIFF_SCALE`). Offen bleibt: Was kommt nach dem letzten legendären Boss?
- **Status:** offen · **Quelle:** Entwickler, Gilde
- Ein Spieler hat alles geschafft (alle Bosse bis legendär, alles maximal ausgebaut). Also ist das Spätspiel schaffbar, aber danach gibt es nichts mehr zu tun.
- Idee: Nach der letzten Zone über eine Formel endlos weiter skalieren. Der Entwickler findet das eher langweilig.
- Vorschlag: Keine endlose Formel als Hauptinhalt. Lieber feste Inhalte mit Mechaniken (#042) und Erweiterungen (#044). Eine Formel höchstens als optionaler „endloser Riss“ mit Bestenliste in der Gilde. Dazu den offenen Balancing-Punkt aus `CLAUDE.md` angehen (Zonen 9–10, `F.monsterHp`, `F.monsterAtk`, `COMBAT.LEVEL_DIFF`): den Spieler fragen, wie lange er für schwer/legendär gebraucht hat.

## Idee

### #060 Aufträge mit Gold nach der Questreihe (tägliche oder wiederholbare Aufträge)
- **Status:** zurückgestellt (lange Bank, noch nicht nötig) · **Quelle:** Entwickler
- Befund aus dem Gold-Vergleich mit CQHT: Gold gibt es aus Siegen, der Gildenkasse (Halle und Ruhestand), Waffen-/Vorratsverkauf und Aufträgen. Die Aufträge (`QUESTS` in `config.js`) enden aber mit Zone 6 (zusammen 34.650 🟡). Danach bringen Aufträge kein Gold mehr.
- Idee für später: tägliche oder wiederholbare Aufträge (z. B. „Besiege 50 Schergen“, „Gewinne 3 Boss-Kämpfe“), oder die Questreihe für Zonen 7–10 fortsetzen.
- Nebenbefund: Goldwandler, Glücksbringer und Gold-Eigenschaften wirken nur auf das Gold aus Siegen, nicht auf die Gildenkasse. Beim Angehen mitprüfen, ob das so bleiben soll.

### #058 Farben und Look: weniger technisch, mehr GW2
- **Status:** zurückgestellt (für das UI-Redesign) · **Quelle:** Gilde
- Eindruck: sehr textlastig, Farben nach „dunkle Asura-Technik“. GW2 ist bunter. Holz muss nicht sein, aber wärmere, mittelalterliche Töne.
- Idee: Warme Grundfarben (Pergament oder Dunkelbraun), Gold als Akzent, Ätherviolett nur für Riss/Portal, kräftigere Rollen-Farben. Über die CSS-Variablen machbar, am besten zusammen mit der Pixel-Art. Das rote ✕ aus #057 ist ein erstes Element.

### #049 Legendäre Helden: 7★ für voll ausgelevelte Helden (und Waffen)
- **Status:** offen, Umsetzung noch unklar · **Quelle:** Entwickler
- Idee: Ein Held (genauso eine Waffe), der komplett ausgelevelt ist, lässt sich noch eine Stufe weiter bringen: **7★ / Legendär**. Das sind die Spezialhelden.
- Legendäre Helden dürfen ein klein wenig zu stark (OP) sein, müssen dafür aber sehr schwer zu bekommen sein.
- Offen: Weg dorthin (Mystische Schmiede? seltenes Material? langer Auftrag?), Kosten, was sich ändert (Werte-Bonus, eigene Fähigkeit, Rahmenfarbe wie `WEAPON_GRADES` 7). Hängt an #033 (Beförderung) und #039 (bessere Seltenheit ersetzt die alte).

### #048 Ätherscherben werden Orichalcum (nur aus Waffenverkauf, Aufwerten in der Zwergen-Schmiede)
- **Status:** offen · **Quelle:** Entwickler
- Entscheidung: 🔮 Ätherscherben fallen als Währung weg und verschwinden aus dem Kopfbereich. An ihre Stelle tritt **Orichalcum** als Material.
  - Man bekommt es **nur beim Verkaufen von Waffen** (Staffelung nach Güte aus #035: T3 1, T4 3, T5 8, T6 20 als Startwert).
  - Verwendung: **Waffen verbessern** in der **Zwergen-Schmiede**. Die wird eine neue **Stufe 4 der Charr-Schmiede** (heute endet sie bei Stufe 3, Gildenhalle 6) und bringt diese Funktion als Neuerung. Kosten und Bauzeit für Stufe 4 in `js/data/buildings.js` ergänzen, Gildenhallen-Voraussetzung z. B. 8.
  - Ziel des Verbesserns: Eine Waffe wird Stufe für Stufe mit Orichalcum aufgewertet, bis sie **seelengebunden** ist.
  - Entschieden (2026-11-07): **Seelengebunden ist eine neue Güte ★7** über ★6 Aufgestiegen. Man bekommt sie nur durch Verbessern in der Zwergen-Schmiede, nie im Laden oder als Beute.
    - `WEAPON_GRADES[7]` in `js/data/weapons.js` ergänzen (Name, eigene Farbe, `atk`/`hp` über ★6: 1,20 / 0,35).
    - Klären: Welche Güte kann man verbessern (nur ★6 → ★7, oder jede Güte eine Stufe hoch)? Wie viel Orichalcum je Schritt? Kann man eine ★7-Waffe verkaufen, und was bringt sie?
    - Alles prüfen, was über die Güten läuft (`WEAPON_GRADES`/`DROP_GRADES` in `config.js`, `progress.js`, `state.js`, `ui.js`, `manual.js`): Laden und Beute dürfen ★7 nicht würfeln, Anzeige und Sortierung müssen ★7 kennen.
    - Hinweis: In GW2 heißt die Stufe über Aufgestiegen „Legendär“; „seelengebunden“ ist dort eine Bindung. Als Name im Spiel trotzdem „Seelengebunden“ – passt zur Story mit Aurenes Speeren.
  - Vorbild aus der Story: die mit Aurenes Energie aufgeladenen Speere im Kampf gegen Kralkatorrik. Genaue Story-Stelle und Namen (Zwergen-Schmiede, Speer) gegen die DE-Wiki prüfen.
- Was heute an den Scherben hängt (alles umstellen):
  - Beute: Schergen-Chance und Boss-Scherben in `combat.js` (`shardFrac`, `bossShards`), Offline-Summen in `offline.js`, Kampf-Log und Offline-Bericht in `ui.js`.
  - Kosten: Riss-Portal (`PORTAL_SHARDS` in `buildingCost`, `state.js`) → nur noch Gold.
  - Belohnungen: fünf Aufträge in `QUESTS` geben 🔮 → auf 🟡 oder 📜 umstellen.
  - Forschung `shards` (Ätherresonator, Logistik) und `shardMult` mit Mystischer Schmiede `loot` → durch eine neue Forschung ersetzen (z. B. „+% Orichalcum beim Verkauf“).
  - Kopfbereich `#hud-shards`, `CURRENCIES.shards`, Handbuch (`MANUAL.md`, `manual.js`).
- Save: `state.shards` umrechnen (Vorschlag: 1 🔮 = X 🟡, oder 1:1 in Orichalcum als Startbestand), `shardFrac` löschen, Forschungsstufen von `shards` auf den neuen Knoten übertragen oder 📜 erstatten. `GAME.SAVE_VERSION` + Migration.
- Ersetzt #035 und den Scherben-Punkt aus #034. Spielt mit #030 (Waffen aufräumen) zusammen, das Verkaufen bekommt so einen Zweck über Gold hinaus.

### #044 Erweiterungen: Tyria als Grundspiel, danach die GW2-Story weiterspielen
- **Status:** offen · **Quelle:** Entwickler
- Idee: Der heutige Teil spielt in Tyria (Grundspiel). Erweiterungen werden im Spiel freigeschaltet („gekauft“, mit Spielwährung, kein Echtgeld) und erzählen die GW2-Story weiter, mit höheren Helden-Levelgrenzen und neuen Zonen.
- Vorschlag: Der Entwurf für Zonen 11–20 (`tools/data/zones-expansion.json`, Portal 5–8) wird die erste Erweiterung. Freischalten z. B. über den letzten Boss plus einen Preis. Die Erweiterung hebt `levelCap` an. Für das Save-Format: freigeschaltete Erweiterungen in `state` speichern (Save-Version + Migration).

### #035 Orichalcum zum Aufwerten von Waffen
- **Status:** zusammengelegt mit #048 (2026-11-07) · **Quelle:** Entwickler
- Idee: Später Waffen aufwerten (CQHT Forge, „Waffen-Modifikation“ steht schon als offen in `CLAUDE.md`). Dafür eine eigene Ressource **Orichalcum**, die es nur beim Verkaufen von Waffen ab T3 (Meisterwerk) gibt.
- Vorschlag: Menge nach Güte gestaffelt (T3 1, T4 3, T5 8, T6 20). Gibt dem „Aufräumen“ aus #030 einen Sinn über Gold hinaus. Zählt als Material, nicht als fünfte Währung im Kopfbereich (passt zu #034).

### #036 Proviant umbenennen
- **Status:** zurückgestellt (spätere Phase) · **Quelle:** Entwickler
- Idee: 🍞 Proviant (Güte 1–6) bekommt GW2-typische Namen.
- Vorschlag: Je Güte ein echtes GW2-Gericht aus der Koch-Disziplin, Namen gegen die DE-Wiki prüfen (wie bei den Gegnern). Daten in `RATIONS` (`js/data/specials.js`), Texte im Handbuch nachziehen.
