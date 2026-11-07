# Offene Issues

Feedback und Fehler aus dem Spieltest. Erledigte Punkte wandern mit Version nach `issues_solved.md`.

**So geht's:** Neues einfach unten unter „Eingang“ als Stichpunkt notieren. Claude sortiert es ein und vergibt eine Nummer.

- **Nummern** (`#001` …) werden nie neu vergeben, auch nicht nach dem Erledigen.
- **Kategorie:** UI · Tutorial · Spielsystem · Balancing · Fehler · Idee
- **Status:** `offen` · `in Arbeit` · `zurückgestellt` (mit Grund)
- **Quelle:** wer es gemeldet hat (z. B. „Spieltest Frau“, „Gilde“)

Nächste freie Nummer: **#012**

## Eingang

<!-- Hier neue Punkte notieren, ungeordnet ist okay. -->

- Text "Held tritt der Wacht bei" ist in der Zeile umbrochen. Das da irgendwie unschön aus.

---

## UI

### #001 Tabs sehen alle gleich aus
- **Status:** offen · **Quelle:** Spieltest Frau
- Alles wirkt sehr gleich, die Tabs haben alle dieselbe Farbe. Man erkennt schwer, wo man ist.
- Idee: eigene Akzentfarbe je Tab (Navigation und Kopfzeile).

### #002 Zu viel Text auf einmal
- **Status:** offen · **Quelle:** Spieltest Frau
- Man ist schnell von Informationen überfordert.
- Idee: Texte kürzen, Details einklappbar machen.
- v0.12.0: Tutorial-Texte gekürzt, im Tutorial keine Statistik, Vorräte und „Schaltet frei“-Listen mehr. Offen: Auftragstexte und die übrigen Ansichten.

### #003 Gold-Symbol sieht aus wie ein Stein
- **Status:** offen · **Quelle:** Spieltest Frau
- Das Geld-Symbol wirkt eher wie ein Stein als wie eine Münze.
- Hängt mit #008 zusammen: Wird 🪙 frei, kann es für Gold genutzt werden.

### #004 Vorräte / Inventar als eigener Tab
- **Status:** offen · **Quelle:** Spieltest
- Die Vorräte sollen einen eigenen Tab bekommen, die Übersicht kann dafür aus der bisherigen Ansicht raus.
- Eventuell eigener Knopf für das Inventar in der unteren Leiste, falls der Platz reicht (Touch-Ziele ≥ 44 px beachten).

## Tutorial

_Zurzeit nichts offen._

## Spielsystem

### #008 „Mystische Münzen“ durch „Mystischer Klee“ ersetzen
- **Status:** offen · **Quelle:** eigene Idee
- Mystischer Klee ist in GW2 eine hochwertige Währung für Legendäres.
- Nutzen für: Forschung und das Zurücksenden von Helden.
- Dadurch wird das Münz-Symbol frei für Gold (siehe #003).
- Achtung: Umbenennen im Spielstand braucht eine Migration (`SAVE_VERSION`).

### #010 Rekrutierungs-Seltenheit an Gildenhallen-Stufe koppeln
- **Status:** offen · **Quelle:** eigene Idee
- Rekrutieren bleibt in der Trupp-Ansicht.
- Je höher die Gildenhalle, desto größer die Chance auf seltenere Helden (bis legendär).
- Werte gehören in `RECRUIT` (`js/config.js`).
