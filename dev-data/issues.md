# Offene Issues

Feedback und Fehler aus dem Spieltest. Erledigte Punkte wandern mit Version nach `issues_solved.md`.

**So geht's:** Neues einfach unten unter „Eingang“ als Stichpunkt notieren. Claude sortiert es ein und vergibt eine Nummer.

- **Nummern** (`#001` …) werden nie neu vergeben, auch nicht nach dem Erledigen.
- **Kategorie:** UI · Tutorial · Spielsystem · Balancing · Fehler · Idee
- **Status:** `offen` · `in Arbeit` · `zurückgestellt` (mit Grund)
- **Quelle:** wer es gemeldet hat (z. B. „Spieltest Frau“, „Gilde“)

Nächste freie Nummer: **#065**

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
  - 🔮 Scherben: bleiben (2026-11-09), seit v0.38.0 Fortschritts-Währung (Forschung, Portal) statt 📜. Orichalcum kommt als Material dazu, siehe #048.
  - 🍀 Klee bleibt nur, wenn der Ruhestand bleibt; sonst Mystische Schmiede auf 📜 umstellen.
- Save-Migration: Bestände umrechnen (z. B. 1 🔮 = X 🟡), nichts ersatzlos löschen. Entscheiden zusammen mit #033 und #022.

### #026 Mehr Schergen pro Zone, dazu Veteranen und Elite aus dem Riss
- **Status:** in Arbeit (Veteranen in v0.36.0, Elite in v0.41.0, Zonen 1–6 mit bis zu 5 Schergen in v0.42.0; offen: Zonen 7–10; Wellen verworfen 2026-11-10: immer ein Gegner zur Zeit) · **Quelle:** Entwickler
- Stand v0.36.0: **Veteran** ist drin (`COMBAT.VETERAN`: 10 %, ×2 LP, ×1,5 Schaden, ×2 Beute, Name „Veteran …“, 🎖️ in der Arena, offline als Erwartungswert). Kampf und Offline können beliebig viele Schergen je Stufe (`minions`-Liste). Werte neuer Schergen müssen über `tools/build-gw2-monsters.mjs` eine CQHT-Vorlage bekommen (`js/data/monsterStats.js`).
- Wunsch: Mehr echte GW2-Gegner pro Zone statt 2 Schergen pro Stufe, etwa 5 Schergen pro Stufe. Jeder hat einen Basiswert, und manchmal kommt ein Scherge als **Veteran** oder **Elite** aus einem Riss und ist entsprechend stärker.
- Daten: `dev-data/gegner-pro-zone.jsonl` (von Gemini, bereinigt). Felder: `zone`, `name`, `faction`, `stages` (1–5), `attack` (Nahkampf/Fernkampf/Magie), `area`, `flavor`, `rift` {`name`, `ability`}, `wiki`. Keine Zahlenwerte, die Stärke bleibt bei den Formeln in `config.js`.
- Zonen 1–6 bereinigt (85 Zeilen, 12–16 Schergen pro Zone): Namen auf die Schreibweise der DE-Wiki gebracht (z. B. Arktischer Bär → Arctodus, Sohn von Svanir (Jäger) → Svanir-Jäger, Cuatl-Krieger → Hylek-Krieger), erfundene Anwesen-Gegner durch echte ersetzt (Kleriker des Weißen Mantels, Separatist, Höhlenspinne …), Harathi-Krieger und Modniir-Berserker vom Königintal ins Harathi-Hinterland, Funkenschwärmer von Metrica in den Funkenschwärmersumpf, Apostroph `Caudecus’ Anwesen`, Wiki-Links neu gesetzt. Alle Namen stehen in der Wiki, außer bewusst eigenen Gegnern mit `"wiki": null` (Sumpfschrecken, Abgerichteter Wachhund, Diener des Hauses); Inquestur-Golem verweist auf die Wiki-Seite „Golem“. Jede Stufe hat mindestens 3 Schergen.
- Zonen 7–10 fehlen: Seit v0.21.0 (#025) sind das Löwenstein & Klaueninsel, Meerenge der Verwüstung, Malchors Sprung und Fluchküste. Die alten Gemini-Zeilen der früheren Zonen 7–10 liegen in `dev-data/archiv/gegner-alte-zonen-7-10.jsonl`. Für die Orr-Zonen gibt es in der DE-Wiki viele echte Gegner (Kategorie „Auferstandener“), die Schergen in `tools/gen-zones.mjs` sind ein Anfang.
- Riss-Formen: Etwa die Hälfte der Namen beginnt mit „Riss-…“ (eintönig), Fähigkeiten nennen teils Dinge, die das Spiel nicht kennt (Mana, Ausweichen) – als Kampf-Log-Text nutzbar, nicht als Regel. Evtl. von Gemini abwechslungsreicher neu schreiben lassen. Bosse sind nicht drin (eigene Datei geplant).
- Entschieden (2026-11-07): Erst nur **Veteran**, Elite kommt später. Startwerte: 10 % Chance, ×2 LP, ×1,5 Angriff, ×2 Beute.
- **Mehr Schergen in v0.42.0:** `tools/gen-zones.mjs` liest `dev-data/gegner-pro-zone.jsonl`. Normale Stufen der Zonen 1–6: die festen Schergen aus `ZONES` vorn, dazu JSONL-Gegner der Stufe bis `MAX_MINIONS` 5. Angriffsart aus der JSONL, `flavor` und `rift.ability` kommen nach `stages.js` und werden Sprüche (`MOB_QUIPS.ownWeight`). Vorlagen: abwechselnd die beiden bisherigen (`build-gw2-monsters.mjs`, `near + k % 2`), damit die Stufe gleich stark bleibt. Wiki: alle neuen Namen ✅; die alten ❌ (Zonen 1–6, z. B. Banditen-Beutelschneider, Krait-Sklaventreiber) sind unverändert.
- **Elite in v0.41.0** (entschieden 2026-11-11): `COMBAT.ELITE` 2 % ab Zone 2 (`minZone`), ×4 LP, ×2 Schaden, ×5 Gold/EXP, +1 🔮 je Sieg, schließt Veteran aus (erst Elite würfeln). ⚜️ und Orange in der Arena, eigene Sprüche `MOB_QUIPS.elite`, offline als Erwartungswert (`eliteShards`). Die Fähigkeit aus `rift` als Spruch kommt mit den neuen Schergen-Daten.
- Zum Umsetzen:
  - Regeln für Veteran (später Elite) in `config.js` (Chance, ×LP, ×Angriff, Beute), Namen und Fähigkeit aus `rift`.
  - Kampf und Offline-Berechnung müssen mehr als 2 Schergen pro Stufe auswürfeln können.
  - Skript in `tools/`, das die JSONL liest, Namen gegen die Wiki prüft (wie `build-gw2-monsters.mjs`) und die Schergen in `stages.js` schreibt (zusammen mit `gen-zones.mjs`).
  - Handbuch (`MANUAL.md`, `manual.js`) ergänzen.

### #062 Gegner-Vielfalt: Profile für Schergen, knackige Bosse
- **Status:** in Arbeit (Profile in v0.42.0; offen: S-Tier-Trupp für Legendär, Boss-Profile) · Entscheidung 2026-11-11: Profile „gleich stark, anders“ · **Quelle:** Entwickler
- Befund: Jede Stufe hat 2 Schergen-Typen, die sich nur im Namen unterscheiden (`monsterTemplate()` in `combat.js` gibt beiden dieselben Werte). Bosse unterscheiden sich ebenfalls nur in den Zahlen. Spielerisch kämpft man immer gegen denselben Gegner.
- Vorschlag Schergen: **Profile** mit Faktoren auf die Grundwerte der Stufe (aus #061), Werte in `config.js`, z. B.:
  - *Rohling*: viel LP und DEF, langsam (3,0 s)
  - *Flinker*: wenig LP, schnell (1,5 s)
  - *Schütze/Magier*: mittlere LP, hoher ATK, wenig DEF
  - *Schwarm*: sehr wenig LP, wenig Beute, kommt oft

  Jeder Scherge in `tools/gen-zones.mjs` bekommt ein Profil. Mehr Schergen pro Stufe (3–5) und Veteran/Elite laufen über #026; beide zusammen umsetzen.
- Vorschlag Bosse (Champions): **Die Bosse sollen knackig sein**, vor allem der Endboss jeder Zone. Ziel: Den Endboss schafft nur ein Trupp auf Höchstlevel der Zone mit passender Waffe (und Forschung), nicht schon ein Trupp, der gerade das empfohlene Level erreicht hat. Bosse bekommen ebenfalls ein Profil (Tempo 1,5 s aus CQHT, eigene LP/DEF-Faktoren); Endbosse einen eigenen Zuschlag in `config.js`.
- **Profile in v0.42.0:** `COMBAT.MOB_PROFILES` (Faktoren auf hp/def/atk/Intervall), Zuordnung per Namensregel in `tools/gen-zones.mjs` (`profileOf`, Fern/Magie = Schütze). Abgestimmt auf gleichen Schaden je Sieg (Node, Max-Trupp T/H/S Seltenheit Selten auf Stufen-Level): Flink Zeit ×0,77 / Schaden ×1,00, Schütze ×0,90 / ×1,01, Rohling ×1,30 / ×0,99. Je Stufe Zonen 1–6 gegenüber vorher: Schaden je Sieg −11 … +6 %, Kampfdauer −15 … +19 % (die meisten ±5 %; kürzer v. a. Zonen 5–6, weil 3 von 5 Schergen die schwächere Vorlage haben).
- Später: Boss-Fähigkeiten (Wut-Phase unter X % LP, Schergen rufen, Flächenangriff) → #042, #051 D.
- Stand v0.36.0 (Gegnerwerte nach CQHT, #061): Bosse haben `BOSS_SCALE.hp` 0,6 der CQHT-LP (× `HP_CURVE`, Zonen 7–10 × `BOSS_HP_CURVE`). Min.-Level (≥ 80 % Siege) Max-Trupp Tank/Heiler/Schaden: Zonen-Endbosse Lv. 3 (Zone 3) … 19 (Zone 6) … 46 (Fluchküste 5); Profil mittel (Selten, T4) etwa auf Stufen-Level bis Zone 7. Schwere Stufen: LP aus `HARD_HP` (Treppe `HARD_DIFF` d 57 → 57,5), DEF der CQHT-Vorlage × 0,6 → Max-Trupp ab Lv. 44 (Königintal ☠️6) bis 59 (Fluchküste ☠️7). Legendär (`LEGEND_DIFF` d 58,4 → 58, CQHT-Angriff × 0,5): Max-Trupp Lv. 60 ≈ 50–80 % (Caledon) → ≈ 3 % (Fluchküste). Erster Boss-Mechanik-Baustein: Flächenangriff alle `BOSS_AOE_EVERY` s mit Ansage. **Offen:** ein „S-Tier“-Trupp finden (beste Rollen/Klassen/Eigenschaften), der Legendär schafft, und `LEGEND_DIFF` danach herunterregeln. T6 fällt nur noch auf schweren/legendären Stufen, der Laden verkauft T5 ab Schmiede 3 und Portal 4 (v0.35.1), T6 nach allen normalen Stufen (`SHOP.gradeLock`). Nach #061 alle Werte neu simulieren.
- Prüfen mit `tools/sim-bosses.mjs`: Endboss mit Max-Level-Trupp + Waffe knapp im 90-s-Limit, mit schwächerem Trupp nicht.

## Balancing

### #061 Gegnerwerte nach CQHT: mehr LP, DEF, Angriffstempo, weniger Beute im Spätspiel
- **Status:** in Arbeit (Schritt 1 Tick-Umbau v0.35.0, Schritt 2 Version A v0.36.0; Version B Wellen verworfen 2026-11-10, siehe #064; offen: Beute pro Sieg beobachten) · **Quelle:** Entwickler
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
- **Erledigt in v0.35.0 (Schritt 1):** 10-Hz-Tick, Angriffs-Timer mit Rest, Klassen-Intervalle (`CLASSES[…].interval`, Schaden je Treffer = ATK × Intervall, also gleicher Schaden/s), Eile/Tempo verkürzen das Intervall, `bossTime` in Sekunden, Gegner kommt nach `COMBAT.SPAWN_DELAY`, Offline mit Erwartungswerten. Gegner-Schaden je Treffer = `F.monsterAtk` × Intervall, also noch die alten Werte pro Sekunde. Farmen live/offline innerhalb weniger Prozent wie vorher. Render bleibt bei `LOOP_MS` 250. **Offen = Schritt 2:** LP/ATK/DEF/Beute nach CQHT (Tabelle, Regler), danach `tools/sim-bosses.mjs` und `HARD_DIFF`/`LEGEND_DIFF` neu.
- **Tick und Angriffe trennen** (entschieden 2026-11-08, wie in Idle-Spielen üblich: Simulation, Angriffs-Timer und Darstellung getrennt):
  - **Simulation 10×/s** (`GAME.TICK_MS: 100`). Ein Tick lässt nur die Zeit laufen, er ist kein Angriff. Lücken ≤ 30 s in `main.js` = bis zu 300 Ticks, unkritisch.
  - **Angriffs-Timer je Kämpfer:** Monster (Schergen 2,5 s, Bosse 1,5 s) und Helden zählen hoch und greifen erst bei ≥ Intervall an. Rest behalten (`timer -= intervall`), damit krumme Intervalle im Schnitt genau stimmen.
  - **Helden bekommen Intervalle** nach Klasse/Waffenart (`CLASSES` in `config.js`, z. B. Dieb schnell mit kleinen Treffern, Elementarmagier langsam und hart). Eile, Tempo-Forschung und Traits verkürzen das Intervall, statt wie heute den Schaden je Tick zu vervielfachen (`teamProfile`: `tempo + st.speed`). Heilung ebenfalls als Intervall oder pro Sekunde × dt.
  - **Alles in Sekunden statt Ticks:** `bossTicks` → verstrichene Zeit gegen `BOSS_TIME_LIMIT`, Regeneration, Kill-Heilung, Boss-Pause, Gildenkasse-Zyklen prüfen.
  - **Darstellung getrennt:** `render()` ca. 4×/s bzw. bei Ereignissen, nicht bei jedem Tick. LP-Balken per CSS-`transition` weich, Treffer als kurze CSS-Animation (Wackeln/Schadenszahl), ausgelöst von Angriffs-Ereignissen. Kein 60-fps-Neuzeichnen (Akku).
  - **Offline** (`offline.js`) bleibt bei Erwartungswerten: Schaden/s = ATK ÷ Intervall.
  - Save-Format: Timer pro Monster/Held sind flüchtig (beim Laden 0), `bossTicks` ggf. migrieren → `SAVE_VERSION` + Migration, falls sich gespeicherte Felder ändern.
- **Erledigt in v0.36.0 (Version A):** Schergen- und Boss-Werte je Stufe aus CQHT (`js/data/monsterStats.js`, `tools/gen-monster-stats.mjs`), Schadens-Pipeline (Krit ×1,5, ±5 %, DEF/Durchdringung mit Überschuss-Bonus, Schadensreduktion bis 50 %), Helden-DEF/-Durchdringung nach Level (`COMBAT.HERO_ARMOR`/`HERO_PEN`) und Waffen-Durchdringung (`WEAPON_GRADES[…].pen`), `HEAL_MULT` 1,8 → 0,6. Abweichungen von 1:1: `HP_CURVE` dämpft LP ab Lv. 30 (unsere Helden haben keine Skills), Bosse `BOSS_SCALE`/`BOSS_HP_CURVE`, schwere/legendäre Stufen LP aus der Treppe (CQHT dort ×12 pro Stufe). EXP/h Zonen 1–3 live ≈ ¼ bis ⅓ von vorher (gewollt, Entscheidung Entwickler 2026-11-09: offline läuft weiter, nachregeln falls zu langsam). Befund bleibt: Einzelne Schergen sind auch mit CQHT-Werten harmlos, Gefahr kommt von Bossen → Version B.
- **Plan Schritt 2 (2026-11-08, nach `dev-data/combat-overview.md`):**
  - Befund: Mit CQHT-Werten und -Formeln 1:1 ist ein *einzelner* Scherge harmlos (Lv.-20-Trupp gegen Alte Mumie Lv. 27: ≈ 24 s Kampf, ≈ 12 Schaden/s rein). Die Schwierigkeit kommt in CQHT aus mehreren Gegnern gleichzeitig und fehlender Dauerheilung; die Stärke der Helden aus Skills (Block-Ketten 220–435 % ATK).
  - Version A (Formeln + Werte): Schadens-Pipeline wie CQHT (Krit ×(1 + Krit-Kraft), Grund +50 %, ±5 % Streuung, DEF/RES `100 / (100 + DEF − Durchdringung)`, Überschuss-Bonus bis ×1,5, Schadensreduktion bis 50 %). Schergen-LP/ATK/DEF/Takt 1:1 aus `cqht-monsters.json` nach Stufen-Level. Helden bekommen DEF und Durchdringung nach Level wie in CQHT (Leon 4★: 15 + ≈ 2,5 je Level) → Level-Malus von selbst. Heilung deutlich schwächer. Bosse = CQHT × Faktor (bis Skills kommen). Beute pro Sieg prüfen.
  - Version B (zusammen mit #026): mehrere Schergen gleichzeitig (Welle 2–3), mehr Schergen pro Stufe, Veteranen.
  - Getrennt entscheiden: Verwundung wie CQHT (4 % LP/s statt 90 s).
- Ziel festlegen, bevor man Zahlen dreht: Wie lange dauert ein Schergen-Kampf auf passendem Level (z. B. 5–8 s)? Dann mit `tools/sim-bosses.mjs` Siege/h, Rückzüge und Zeit pro Zone prüfen, Offline-Effizienz mit.
- Hängt zusammen mit #043 (Endgame-Balancing, `COMBAT.LEVEL_DIFF`), #051 (Schadensverteilung) und #062.

### #043 Endgame-Schwierigkeit: Formel oder Handarbeit?
- Seit v0.27.1 (#047): schwere/legendäre Stufen deutlich härter (`COMBAT.ENDGAME_DIFF_SCALE`). Offen bleibt: Was kommt nach dem letzten legendären Boss?
- **Status:** offen · **Quelle:** Entwickler, Gilde
- Ein Spieler hat alles geschafft (alle Bosse bis legendär, alles maximal ausgebaut). Also ist das Spätspiel schaffbar, aber danach gibt es nichts mehr zu tun.
- Idee: Nach der letzten Zone über eine Formel endlos weiter skalieren. Der Entwickler findet das eher langweilig.
- Vorschlag: Keine endlose Formel als Hauptinhalt. Lieber feste Inhalte mit Mechaniken (#042) und Erweiterungen (#044). Eine Formel höchstens als optionaler „endloser Riss“ mit Bestenliste in der Gilde. Dazu den offenen Balancing-Punkt aus `CLAUDE.md` angehen (Zonen 9–10, `F.monsterHp`, `F.monsterAtk`, `COMBAT.LEVEL_DIFF`): den Spieler fragen, wie lange er für schwer/legendär gebraucht hat.

## Idee

### #064 Raid: der ganze Kader (12 Helden) gegen einen Mega-Boss
- **Status:** offen (Simulation läuft, Sitzung „prototyp-d-sim“, Bericht `dev-data/sim-army-bericht.md`) · **Quelle:** Entwickler
- Entschieden (2026-11-10): Im Alltag bleibt alles, wie es ist. Jedes Zelt (3 Helden) kämpft in seiner eigenen Zone gegen **einen** Gegner zur Zeit, manchmal einen Veteranen, später selten einen Elite-Gegner (#026). **Keine Wellen**, kein CQHT-Modell mit 4 Portalen × 3 Gegnern und keine gemeinsame Arena für alle Helden (Analyse: `H:\share\aetherbastion-analyse-zelte-portale.md`, Varianten C und D verworfen).
- Spätspiel: ein Raid, in dem **alle 4 Zelte mit 12 Helden gemeinsam** gegen einen Mega-Boss mit Phasen kämpfen. Vorbild ist der CQHT-Raid Fortress of Souls / Soltar (drei Phasen), bei uns vorbereitet als Kryptis-Seelenfeste in `js/data/specials.js`. Dort müssen **Heilung und Trupp-Zusammensetzung passen**: Ohne genug Heiler und Tanks soll der Kader klar scheitern.
- Offen: Regeln (Heilung und Anführer je Zelt oder für alle?), Phasen, Versuche pro Tag, Belohnung (Seelenkristalle für ★7 Seelengebunden, #048), Skalierung mit 1–4 Zelten. Passt zu #042 (Boss-Mechaniken) und #043 (was nach dem letzten legendären Boss kommt).

### #060 Aufträge mit Gold nach der Questreihe (tägliche oder wiederholbare Aufträge)
- **Status:** zurückgestellt (lange Bank, noch nicht nötig) · **Quelle:** Entwickler
- Befund aus dem Gold-Vergleich mit CQHT: Gold gibt es aus Siegen, der Gildenkasse (Halle und Ruhestand), Waffen-/Vorratsverkauf und Aufträgen. Die Aufträge (`QUESTS` in `config.js`) enden aber mit Zone 6 (zusammen 34.650 🟡). Danach bringen Aufträge kein Gold mehr.
- Idee für später: tägliche oder wiederholbare Aufträge (z. B. „Besiege 50 Schergen“, „Gewinne 3 Boss-Kämpfe“), oder die Questreihe für Zonen 7–10 fortsetzen.
- Nebenbefund erledigt in v0.39.2 (siehe `issues_solved.md`): Gold-Boni bleiben bei Gold aus Siegen, der Kassen-Optimierer wirkt auf Halle + Ruhestand.

### #058 Farben und Look: weniger technisch, mehr GW2
- **Status:** teilweise erledigt in v0.43.0 (Farbschemata Tyria/Lagerfeuer/Nebel, Entwurf in `ui-redesign.md`); offen: Pixel-Art, Rollenfarben · **Quelle:** Gilde
- Eindruck: sehr textlastig, Farben nach „dunkle Asura-Technik“. GW2 ist bunter. Holz muss nicht sein, aber wärmere, mittelalterliche Töne.
- Idee: Warme Grundfarben (Pergament oder Dunkelbraun), Gold als Akzent, Ätherviolett nur für Riss/Portal, kräftigere Rollen-Farben. Über die CSS-Variablen machbar, am besten zusammen mit der Pixel-Art. Das rote ✕ aus #057 ist ein erstes Element.

### #049 Legendäre Helden: 7★ für voll ausgelevelte Helden (und Waffen)
- **Status:** offen, Umsetzung noch unklar · **Quelle:** Entwickler
- Idee: Ein Held (genauso eine Waffe), der komplett ausgelevelt ist, lässt sich noch eine Stufe weiter bringen: **7★ / Legendär**. Das sind die Spezialhelden.
- Legendäre Helden dürfen ein klein wenig zu stark (OP) sein, müssen dafür aber sehr schwer zu bekommen sein.
- Offen: Weg dorthin (Mystische Schmiede? seltenes Material? langer Auftrag?), Kosten, was sich ändert (Werte-Bonus, eigene Fähigkeit, Rahmenfarbe wie `WEAPON_GRADES` 7). Hängt an #033 (Beförderung) und #039 (bessere Seltenheit ersetzt die alte).

### #048 Orichalcum aus Waffenverkauf, Aufwerten in der Zwergen-Schmiede
- **Status:** offen · **Quelle:** Entwickler
- Entschieden (2026-11-09, ersetzt den Plan vom 2026-11-07): **🔮 Ätherscherben bleiben** die Fortschritts-Währung (Forschung, Riss-Portal, seltene Waffen, seit v0.38.0). **Orichalcum kommt als Material dazu**, nicht im Kopfbereich, sondern im 🎒 Inventar.
  - Man bekommt es **nur beim Verkaufen von Waffen** (Staffelung nach Güte aus #035: T3 1, T4 3, T5 8, T6 20 als Startwert).
  - Verwendung: **Waffen verbessern** in der **Zwergen-Schmiede**. Die wird eine neue **Stufe 4 der Charr-Schmiede** (heute endet sie bei Stufe 3, Gildenhalle 6) und bringt diese Funktion als Neuerung. Kosten und Bauzeit für Stufe 4 in `js/data/buildings.js` ergänzen, Gildenhallen-Voraussetzung z. B. 8.
  - Ziel des Verbesserns: Eine Waffe wird Stufe für Stufe mit Orichalcum aufgewertet, bis sie **seelengebunden** ist.
  - Entschieden (2026-11-07): **Seelengebunden ist eine neue Güte ★7** über ★6 Aufgestiegen. Man bekommt sie nur durch Verbessern in der Zwergen-Schmiede, nie im Laden oder als Beute.
    - `WEAPON_GRADES[7]` in `js/data/weapons.js` ergänzen (Name, eigene Farbe, `atk`/`hp` über ★6: 1,20 / 0,35).
    - Klären: Welche Güte kann man verbessern (nur ★6 → ★7, oder jede Güte eine Stufe hoch)? Wie viel Orichalcum je Schritt? Kann man eine ★7-Waffe verkaufen, und was bringt sie?
    - Alles prüfen, was über die Güten läuft (`WEAPON_GRADES`/`DROP_GRADES` in `config.js`, `progress.js`, `state.js`, `ui.js`, `manual.js`): Laden und Beute dürfen ★7 nicht würfeln, Anzeige und Sortierung müssen ★7 kennen.
    - Hinweis: In GW2 heißt die Stufe über Aufgestiegen „Legendär“; „seelengebunden“ ist dort eine Bindung. Als Name im Spiel trotzdem „Seelengebunden“ – passt zur Story mit Aurenes Speeren.
  - Vorbild aus der Story: die mit Aurenes Energie aufgeladenen Speere im Kampf gegen Kralkatorrik. Genaue Story-Stelle und Namen (Zwergen-Schmiede, Speer) gegen die DE-Wiki prüfen.
- Vorlage CQHT (Wiki „Soulbound“, Beispiel Krieger): Seelengebundene Waffen haben die Güten 7–9, sind an einen Helden gebunden und ändern dessen Passive. Hergestellt und aufgewertet werden sie in der Schmiede aus Eisen (aus dem Waffenverkauf, bei uns Orichalcum), Seelenkristallen (Raid Fortress of Souls, bei uns `specials.js` Kryptis-Seelenfeste) sowie Edelsteinen (10/25/50) und Gold.

  | Güte | Waffe | Schaden | Wirkung |
  |---|---|---|---|
  | 6 | Red Falchion (normal) | 200 | – |
  | 7 | Sword of the Successor | 250 | nach 3 Block-Skills Trupp-Heilung 110 % ATK |
  | 8 | Heir of the Kingdom | 300 | nach 2 Block-Skills 130 % ATK |
  | 9 | Fallen Throne | 350 | nach 2 Block-Skills 145 % ATK, dazu 5 × 1860 % ATK Magie-Schaden in 2 s |

  Alle Waffen (Wiki „Weapons“, gleich für alle 6 Klassen): ★1 20 · ★2 60/40/32 · ★3 120/80/64 · ★4 180/120/96 · ★5 240/160/128 · ★6 200 · ★7 250 · ★8 300 · ★9 350. ★2–5 gibt es in drei Varianten (die beste ★5 liegt über ★6), ★6 nur eine je Klasse, ★7–9 neun je Klasse (eine je Held). Unsere Kurve ist unten steiler (★5 = 62 % von ★6, CQHT Mitte 80 %), oben passt sie.
  Herstellung ★6 → ★7 (Screenshot, Heilerin Nightingale, „Sacred Treasure of Salvation“): Grundlage ist eine ★6-Waffe, Angriffskraft +200 → +250. Kosten **200 Eisen** (graues Material, vermutlich aus dem Waffenverkauf), **100 Seelenkristalle** (grünes Material), **10 Edelsteine**, **5.000 Gold**. Angriffstempo −0,4 und Krit-Schaden +20 % sind keine Werte der Waffe, sondern Waffen-Eigenschaften, die man in CQHT mit **Früchten** aufträgt (bei uns 🍎 Früchte noch ohne Funktion, eigenes Thema, siehe „Waffen-Modifikation“ in `CLAUDE.md`). Wirkung: Grundangriff heilt den Trupp zusätzlich um 33 % ATK und gibt 3 s lang +8 % ATK. Diese Wirkung geht auch ohne Skill-System (wirkt auf jeden Angriff).
  → Je Güte +50 Schaden = +25 % des ★6-Werts. Auf unsere Prozent-Boni übertragen (★6 `atk` 1,20): ★7 1,50 · ★8 1,80 · ★9 2,10. Vorschlag `hp` 0,40/0,45/0,50, `pen` 120/140/160. Die Passive braucht das Skill-System, bis dahin nur Werte (oder eine einfache Wirkung wie „alle N Angriffe Trupp-Heilung“).
- Vorschläge für die offenen Fragen: erst nur ★6 → ★7, 200 Orichalcum je Schritt wie CQHT (= zehn verkaufte T6; ersetzt den alten Vorschlag 100), dazu Gold und 🔮, Seelenkristalle erst mit der Kryptis-Seelenfeste, ★7 nicht verkaufbar.
- Umsetzen: `state.orichalcum` (neues Feld, beim Laden mit 0 absichern, keine Migration bis v0.40), Waffenverkauf in `progress.js` zahlt Orichalcum, Anzeige im Inventar und im Verkaufs-Dialog, Handbuch (`MANUAL.md`, `manual.js`). An 🔮 (Beute, Portal, Aufträge, Forschung) ändert sich nichts.
- Ersetzt #035. Spielt mit #030 (Waffen aufräumen) zusammen, das Verkaufen bekommt so einen Zweck über Gold hinaus.

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

### #063 Früchte geben Waffen-Eigenschaften (Waffen-Modifikation)
- **Status:** offen · **Quelle:** Entwickler
- Befund: 🍎 Früchte fallen als Beute, haben aber außer Verkaufen (`SELL.fruit`) keine Funktion. In CQHT bringt man mit Früchten **Eigenschaften auf Waffen** (z. B. Angriffstempo −0,4 s, Krit-Schaden +20 %), siehe Screenshot zu #048. Steht in `CLAUDE.md` als „Waffen-Modifikation“.
- Vorschlag: Eine Frucht auf eine Waffe anwenden würfelt (oder setzt) eine Waffen-Eigenschaft, Werte in `config.js` (Liste wie `TRAITS`, z. B. ATK, Krit, Krit-Schaden, Tempo, HP, Durchdringung). Wirkung in `heroStats` über die getragene Waffe.
- Zuerst die CQHT-Regeln nachsehen: Wie viele Eigenschaften je Waffe, je Güte? Zufall oder Wahl, Neu-Würfeln, Kosten, Fruchtsorten?
- Save: Waffen in `state.armory` bekommen ein Feld für Eigenschaften (beim Laden absichern, keine Migration bis v0.40).
- Hängt mit #048 zusammen (★7 behält die Eigenschaften der ★6-Waffe?).
