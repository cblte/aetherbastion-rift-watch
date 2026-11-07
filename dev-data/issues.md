# Offene Issues

Feedback und Fehler aus dem Spieltest. Erledigte Punkte wandern mit Version nach `issues_solved.md`.

**So geht's:** Neues einfach unten unter „Eingang“ als Stichpunkt notieren. Claude sortiert es ein und vergibt eine Nummer.

- **Nummern** (`#001` …) werden nie neu vergeben, auch nicht nach dem Erledigen.
- **Kategorie:** UI · Tutorial · Spielsystem · Balancing · Fehler · Idee
- **Status:** `offen` · `in Arbeit` · `zurückgestellt` (mit Grund)
- **Quelle:** wer es gemeldet hat (z. B. „Spieltest Frau“, „Gilde“)

Nächste freie Nummer: **#016**

## Eingang

<!-- Hier neue Punkte notieren, ungeordnet ist okay. -->
Anstelle, dass durch das klicken in den Auftraege die gebäude direkt gebaut werden, kann das tutorial einfach immer nur auf die seite wechseln wo der nutzer die aktion ausführen muss? Ich denke das ist besser. 

Nach dem aktivieren des portals, sind plötzlich 6 icons sichtbar. das ist ziemlich viel. Labor und Schmiede sind doch noch gar nicht gebaut, also sollten diese doch noch gar nicht auftauchen.die kommen doch auch erst später im tutorial dran. dass sie in der liste der ferfügbaren gebäude stehen, ist nicht schlimm. aber im menu untern brauchen sie noch nicht aufzutauchen sofern sie noch nicht gebaut sind. Dabei spielt es keine rolle ob sie ab level 1 gildenhalle verfügbar sind.
---

## UI

### #002 Zu viel Text auf einmal
- **Status:** offen · **Quelle:** Spieltest Frau
- Man ist schnell von Informationen überfordert.
- Idee: Texte kürzen, Details einklappbar machen.
- v0.12.0: Tutorial-Texte gekürzt, im Tutorial keine Statistik, Vorräte und „Schaltet frei“-Listen mehr. Offen: Auftragstexte und die übrigen Ansichten.

## Tutorial

_Zurzeit nichts offen._

## Spielsystem

### #010 Rekrutierungs-Seltenheit an Gildenhallen-Stufe koppeln
- **Status:** offen · **Quelle:** eigene Idee
- Rekrutieren bleibt in der Trupp-Ansicht.
- Je höher die Gildenhalle, desto größer die Chance auf seltenere Helden (bis legendär).
- Werte gehören in `RECRUIT` (`js/config.js`).
