# Offene Issues

Feedback und Fehler aus dem Spieltest. Erledigte Punkte wandern mit Version nach `issues_solved.md`.

**So geht's:** Neues einfach unten unter „Eingang“ als Stichpunkt notieren. Claude sortiert es ein und vergibt eine Nummer.

- **Nummern** (`#001` …) werden nie neu vergeben, auch nicht nach dem Erledigen.
- **Kategorie:** UI · Tutorial · Spielsystem · Balancing · Fehler · Idee
- **Status:** `offen` · `in Arbeit` · `zurückgestellt` (mit Grund)
- **Quelle:** wer es gemeldet hat (z. B. „Spieltest Frau“, „Gilde“)

Nächste freie Nummer: **#039**

## Eingang

<!-- Hier neue Punkte notieren, ungeordnet ist okay. -->

---

## Fehler

_Zurzeit nichts offen._

## UI

### #037 Chronik zeigt immer „Z1“
- **Status:** offen · **Quelle:** Spieltest
- Eindruck: Das Log zeigt immer Z1, egal welcher Gegner. Tatsächlich heißt „Z1“ **Zelt 1** (Trupp), nicht Zone 1 – leicht zu verwechseln, weil „Zone“ und „Zelt“ beide mit Z anfangen.
- Antwort auf die Frage dazu: Ja, jedes Zelt kämpft schon in seiner eigenen Zone und Stufe (Zone/Stufe im 🌀 Portal je Trupp wählen, oben den Trupp wechseln).
- Vorschlag: Kürzel „⛺1“ statt „Z1“. Bei Kampfeinträgen zusätzlich die Zone kurz (z. B. „⛺1 · Malchor“), damit man sieht, dass die Trupps an verschiedenen Orten kämpfen.

### #038 Zonenwechsel auf dem Handy kaum sichtbar
- **Status:** offen · **Quelle:** Spieltest
- Beim Wechsel von Zone/Stufe während des Kampfs wirkte es, als blieben die Gegner gleich. Der Wechsel klappt aber sofort (neuer Gegner aus der neuen Stufe). Auf dem Smartphone verdeckt das Auftrags-Banner oben die Kampfbühne, darum sieht man es nicht.
- Wunsch dazu: Gegner einer Zone dürfen ruhig gleich bleiben, die Champions (Bosse) sind das Ziel.
- Vorschlag: Nach dem Wechsel kurzer Hinweis „⛺ Zelt 1 → Malchors Sprung · Stufe 2“ und kurzes Aufleuchten der Kampfbühne. Auftrags-Banner beim Scrollen einklappen (nur Titel und Fortschrittsbalken), damit die Bühne sichtbar bleibt.

## Tutorial

_Zurzeit nichts offen._

## Spielsystem

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
  - 🔮 Scherben in Gold umwandeln: Das Portal kostet dann nur Gold und Boss-Fortschritt.
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

### #022 Ruhestand: Gold und Forschungsnotizen aus der CQHT-Tabelle?
- **Status:** zurückgestellt (Quelle klären) · **Quelle:** Entwickler
- Die CQHT-Tabelle „Hero leveling“ hat je Stufe Gold und Honor (`goldCycle`, `rpCycle` in `js/data/heroLevels.js`). Übernommen war das als passives Einkommen jedes Helden alle 10 Min. – laut Erinnerung gibt CQHT das aber beim **Ruhestand**.
- v0.18.1: Passives Helden-Einkommen entfernt. Die Gildenkasse zahlt nur das Gold der Gildenhalle, Helden verdienen nur im Kampf. Die Spalten bleiben ungenutzt in den Daten.
- Offen: Quelle prüfen. Falls bestätigt, entscheiden, ob der Ruhestand zusätzlich zu 🍀 Gold und 📜 gibt. Achtung: als Einmalbelohnung sehr klein (Lv. 60 = 75 🟡, 3 📜), evtl. hat CQHT einen Faktor.

## Idee

### #035 Orichalcum zum Aufwerten von Waffen
- **Status:** zurückgestellt (nach #030/#031) · **Quelle:** Entwickler
- Idee: Später Waffen aufwerten (CQHT Forge, „Waffen-Modifikation“ steht schon als offen in `CLAUDE.md`). Dafür eine eigene Ressource **Orichalcum**, die es nur beim Verkaufen von Waffen ab T3 (Meisterwerk) gibt.
- Vorschlag: Menge nach Güte gestaffelt (T3 1, T4 3, T5 8, T6 20). Gibt dem „Aufräumen“ aus #030 einen Sinn über Gold hinaus. Zählt als Material, nicht als fünfte Währung im Kopfbereich (passt zu #034).

### #036 Proviant umbenennen
- **Status:** zurückgestellt (spätere Phase) · **Quelle:** Entwickler
- Idee: 🍞 Proviant (Güte 1–6) bekommt GW2-typische Namen.
- Vorschlag: Je Güte ein echtes GW2-Gericht aus der Koch-Disziplin, Namen gegen die DE-Wiki prüfen (wie bei den Gegnern). Daten in `RATIONS` (`js/data/specials.js`), Texte im Handbuch nachziehen.
