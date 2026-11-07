# Offene Issues

Feedback und Fehler aus dem Spieltest. Erledigte Punkte wandern mit Version nach `issues_solved.md`.

**So geht's:** Neues einfach unten unter „Eingang“ als Stichpunkt notieren. Claude sortiert es ein und vergibt eine Nummer.

- **Nummern** (`#001` …) werden nie neu vergeben, auch nicht nach dem Erledigen.
- **Kategorie:** UI · Tutorial · Spielsystem · Balancing · Fehler · Idee
- **Status:** `offen` · `in Arbeit` · `zurückgestellt` (mit Grund)
- **Quelle:** wer es gemeldet hat (z. B. „Spieltest Frau“, „Gilde“)

Nächste freie Nummer: **#029**

## Eingang

<!-- Hier neue Punkte notieren, ungeordnet ist okay. -->

---

## Fehler

_Zurzeit nichts offen._

## UI

_Zurzeit nichts offen._

## Tutorial

_Zurzeit nichts offen._

## Spielsystem

### #026 Mehr Schergen pro Zone, dazu Veteranen und Elite aus dem Riss
- **Status:** offen · **Quelle:** Entwickler
- Wunsch: Mehr echte GW2-Gegner pro Zone statt 2 Schergen pro Stufe, etwa 5 Schergen pro Stufe. Jeder hat einen Basiswert, und manchmal kommt ein Scherge als **Veteran** oder **Elite** aus einem Riss und ist entsprechend stärker.
- Daten: `dev-data/gegner-pro-zone.jsonl` (von Gemini). 153 Zeilen, alle 10 Zonen, 15–18 Schergen pro Zone, mindestens 3 pro Stufe. Felder: `zone`, `name`, `faction`, `stages` (1–5), `attack` (Nahkampf/Fernkampf/Magie), `area`, `flavor`, `rift` {`name`, `ability`}, `wiki`. Keine Zahlenwerte, die Stärke bleibt bei den Formeln in `config.js`.
- Zonen 1–6 bereinigt (jetzt 148 Zeilen): Namen auf die Schreibweise der DE-Wiki gebracht (z. B. Arktischer Bär → Arctodus, Sohn von Svanir (Jäger) → Svanir-Jäger, Cuatl-Krieger → Hylek-Krieger), erfundene Anwesen-Gegner durch echte ersetzt (Kleriker des Weißen Mantels, Separatist, Höhlenspinne …), Harathi-Krieger und Modniir-Berserker vom Königintal ins Harathi-Hinterland, Funkenschwärmer von Metrica in den Funkenschwärmersumpf, Apostroph `Caudecus’ Anwesen`, Wiki-Links neu gesetzt. Alle Namen stehen in der Wiki, außer bewusst eigenen Gegnern mit `"wiki": null` (Sumpfschrecken, Abgerichteter Wachhund, Diener des Hauses); Inquestur-Golem verweist auf die Wiki-Seite „Golem“. Jede Stufe hat mindestens 3 Schergen.
- Zonen 7–10 noch ungeprüft und großteils erfunden (Katakomben 0/15, Harathi 3/17, Blutstrom 1/15, Sumpf 4/16 in der Wiki), ein Riss-Name doppelt („Spektraler Riss-Schütze“). Erst nach #025 nachbessern.
- Riss-Formen: Etwa die Hälfte der Namen beginnt mit „Riss-…“ (eintönig), Fähigkeiten nennen teils Dinge, die das Spiel nicht kennt (Mana, Ausweichen) – als Kampf-Log-Text nutzbar, nicht als Regel. Evtl. von Gemini abwechslungsreicher neu schreiben lassen. Bosse sind nicht drin (eigene Datei geplant).
- Zum Umsetzen:
  - Regeln für Veteran/Elite in `config.js` (Chance, ×LP, ×Angriff, Beute), Namen und Fähigkeit aus `rift`.
  - Kampf und Offline-Berechnung müssen mehr als 2 Schergen pro Stufe auswürfeln können.
  - Skript in `tools/`, das die JSONL liest, Namen gegen die Wiki prüft (wie `build-gw2-monsters.mjs`) und die Schergen in `stages.js` schreibt (zusammen mit `gen-zones.mjs`).
  - Handbuch (`MANUAL.md`, `manual.js`) ergänzen.
- Hängt mit #025 zusammen: Wenn die Zonen 7–10 umziehen, sind deren Schergen-Daten mit betroffen.

### #025 Zonen 7–10 an eine andere Stelle verschieben
- **Status:** offen · **Quelle:** Entwickler
- Seit v0.20.0 sind die Zonen 1–5 die Heimatgebiete der Völker und Zone 6 Caudecus’ Anwesen ist das Finale der Aufträge. Die Zonen 7–10 (Katakomben von Ascalon, Harathi-Hinterland, Blutstrom-Küste, Funkenschwärmersumpf; Portal 3 „Ascalon & Harathi“ und 4 „Küste & Sümpfe von Orr“) sollen woanders hin.
- Offen: Wohin genau, und was kommt stattdessen auf die Plätze 7–10 (Lv. 51–60)? Evtl. zusammen mit dem Erweiterungs-Entwurf (Zonen 11–20, `tools/data/zones-expansion.json`) planen.
- Beim Umsetzen: Daten in `tools/gen-zones.mjs`, Zahlen bleiben CQHT, Zonen-IDs bleiben gleich.

### #022 Ruhestand: Gold und Forschungsnotizen aus der CQHT-Tabelle?
- **Status:** zurückgestellt (Quelle klären) · **Quelle:** Entwickler
- Die CQHT-Tabelle „Hero leveling“ hat je Stufe Gold und Honor (`goldCycle`, `rpCycle` in `js/data/heroLevels.js`). Übernommen war das als passives Einkommen jedes Helden alle 10 Min. – laut Erinnerung gibt CQHT das aber beim **Ruhestand**.
- v0.18.1: Passives Helden-Einkommen entfernt. Die Gildenkasse zahlt nur das Gold der Gildenhalle, Helden verdienen nur im Kampf. Die Spalten bleiben ungenutzt in den Daten.
- Offen: Quelle prüfen. Falls bestätigt, entscheiden, ob der Ruhestand zusätzlich zu 🍀 Gold und 📜 gibt. Achtung: als Einmalbelohnung sehr klein (Lv. 60 = 75 🟡, 3 📜), evtl. hat CQHT einen Faktor.
