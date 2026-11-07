# Offene Issues

Feedback und Fehler aus dem Spieltest. Erledigte Punkte wandern mit Version nach `issues_solved.md`.

**So geht's:** Neues einfach unten unter „Eingang“ als Stichpunkt notieren. Claude sortiert es ein und vergibt eine Nummer.

- **Nummern** (`#001` …) werden nie neu vergeben, auch nicht nach dem Erledigen.
- **Kategorie:** UI · Tutorial · Spielsystem · Balancing · Fehler · Idee
- **Status:** `offen` · `in Arbeit` · `zurückgestellt` (mit Grund)
- **Quelle:** wer es gemeldet hat (z. B. „Spieltest Frau“, „Gilde“)

Nächste freie Nummer: **#025**

## Eingang

<!-- Hier neue Punkte notieren, ungeordnet ist okay. -->

---

## UI

_Zurzeit nichts offen._

## Tutorial

_Zurzeit nichts offen._

## Spielsystem

### #022 Ruhestand: Gold und Forschungsnotizen aus der CQHT-Tabelle?
- **Status:** zurückgestellt (Quelle klären) · **Quelle:** Entwickler
- Die CQHT-Tabelle „Hero leveling“ hat je Stufe Gold und Honor (`goldCycle`, `rpCycle` in `js/data/heroLevels.js`). Übernommen war das als passives Einkommen jedes Helden alle 10 Min. – laut Erinnerung gibt CQHT das aber beim **Ruhestand**.
- v0.18.1: Passives Helden-Einkommen entfernt. Die Gildenkasse zahlt nur das Gold der Gildenhalle, Helden verdienen nur im Kampf. Die Spalten bleiben ungenutzt in den Daten.
- Offen: Quelle prüfen. Falls bestätigt, entscheiden, ob der Ruhestand zusätzlich zu 🍀 Gold und 📜 gibt. Achtung: als Einmalbelohnung sehr klein (Lv. 60 = 75 🟡, 3 📜), evtl. hat CQHT einen Faktor.
