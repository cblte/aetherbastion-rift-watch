# Offene Issues

Feedback und Fehler aus dem Spieltest. Erledigte Punkte wandern mit Version nach `issues_solved.md`.

**So geht's:** Neues einfach unten unter „Eingang“ als Stichpunkt notieren. Claude sortiert es ein und vergibt eine Nummer.

- **Nummern** (`#001` …) werden nie neu vergeben, auch nicht nach dem Erledigen.
- **Kategorie:** UI · Tutorial · Spielsystem · Balancing · Fehler · Idee
- **Status:** `offen` · `in Arbeit` · `zurückgestellt` (mit Grund)
- **Quelle:** wer es gemeldet hat (z. B. „Spieltest Frau“, „Gilde“)

Nächste freie Nummer: **#014**

## Eingang

<!-- Hier neue Punkte notieren, ungeordnet ist okay. -->

---

## UI

### #002 Zu viel Text auf einmal
- **Status:** offen · **Quelle:** Spieltest Frau
- Man ist schnell von Informationen überfordert.
- Idee: Texte kürzen, Details einklappbar machen.
- v0.12.0: Tutorial-Texte gekürzt, im Tutorial keine Statistik, Vorräte und „Schaltet frei“-Listen mehr. Offen: Auftragstexte und die übrigen Ansichten.

### #004 Vorräte / Inventar als eigener Tab
- **Status:** offen · **Quelle:** Spieltest
- Die Vorräte sollen einen eigenen Tab bekommen, die Übersicht kann dafür aus der bisherigen Ansicht raus.
- Eventuell eigener Knopf für das Inventar in der unteren Leiste, falls der Platz reicht (Touch-Ziele ≥ 44 px beachten).
- Gehört zu #013: Inventar wandert aus der Kopfzeile in die Hauptleiste.

### #012 Gildenhalle: Liste „Schaltet frei“ weglassen
- **Status:** offen · **Quelle:** Spieltest
- Die Gildenhallen-Karte zeigt (nach dem Tutorial) immer noch, was die nächste Stufe freischaltet. Unnötig, weil jedes Gebäude selbst anzeigt, ab wann es verfügbar ist.

### #013 Einstellungen als eigener Dialog (⚙️ oben rechts)
- **Status:** offen · **Quelle:** Spieltest
- Die Einstellungen stehen bisher unten im Lager und sind schon am Anfang zu sehen.
- Neu: Zahnrad ⚙️ oben rechts in der Kopfzeile öffnet einen Dialog (Handbuch, Vibration, Spielstand, Debug, Zurücksetzen).
- Der Platz oben rechts wird frei, weil das Inventar 🎒 in die Hauptleiste wandert (#004).

## Tutorial

_Zurzeit nichts offen._

## Spielsystem

### #008 „Mystische Münzen“ durch „Mystischer Klee“ ersetzen
- **Status:** offen · **Quelle:** eigene Idee
- Mystischer Klee ist in GW2 eine hochwertige Währung für Legendäres.
- Nutzen für: Forschung und das Zurücksenden von Helden.
- Gold hat seit v0.12.1 das Symbol 🟡 (#003); 💠 kann für den Klee ein eigenes Symbol bekommen.
- Achtung: Umbenennen im Spielstand braucht eine Migration (`SAVE_VERSION`).

### #010 Rekrutierungs-Seltenheit an Gildenhallen-Stufe koppeln
- **Status:** offen · **Quelle:** eigene Idee
- Rekrutieren bleibt in der Trupp-Ansicht.
- Je höher die Gildenhalle, desto größer die Chance auf seltenere Helden (bis legendär).
- Werte gehören in `RECRUIT` (`js/config.js`).
