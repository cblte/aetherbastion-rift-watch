# Erledigte Issues

Archiv aus `issues.md`. Neueste Version oben. Jeder Punkt behält seine Nummer.

Format:

```
## v0.x.y
### #000 Titel
- Kurz, was geändert wurde (Commit-Hash optional)
```

---

## v0.20.1

### #028 Bosskampf lässt sich durch Zonen- oder Stufenwechsel abbrechen
- `setStage()` in `combat.js` lehnt Wechsel ab, solange der Trupp im Bosskampf ist (`mode === 'boss'`). Aussteigen geht nur über „Abbrechen“ (`abortBoss`, mit 90-s-Pause).
- 🌀 Portal: Stufen sind während des Bosskampfs gesperrt, darüber ein goldener Hinweis. Andere Zonen lassen sich weiter ansehen.
- Handbuch (`MANUAL.md`, `manual.js`) ergänzt. Mitglieder tauschen bleibt im Bosskampf erlaubt.

### #027 Proviant-Dialog hat ✕ und Zurück-Pfeil
- `modalHead()` in `ui.js`: Dialoge mit Zurück-Ziel zeigen nur noch ←, alle anderen nur ✕. Betrifft „verfüttern“ und „Ausrüsten“ aus dem 🎒 Inventar.

## v0.19.0

### #024 Heilung und Schaden der Helden sind nicht sichtbar
- Quelle: Spieltest. Unklar war, wie viel ein Heiler heilt, ob er Schaden macht und wann wer Schaden macht.
- Helden-Fenster zeigt jetzt **💥 Schaden pro Sekunde** und bei Heilern **✚ Heilung pro Sekunde** (ohne Trupp-Boni, neue Funktion `heroOutput()` in `combat.js`), dazu einen Satz zur Rolle. Krit nur bei Rollen, die kritten können.
- Zelt-Fuß beschriftet: „Schaden/s · Heilung/s · LP“.
- Handbuch (Kampf & Bosse): neuer Abschnitt „Eine Kampfsekunde“ mit dem Ablauf.

## v0.18.3

### #023 Trupp kämpft nicht, obwohl ein Heiler fit ist
- Quelle: Spieltest. Nach einem Rückzug kehrte der Trupp erst zurück, wenn **alle** Helden geheilt waren – ein belebter oder neu eingesetzter Heiler wartete auf den verwundeten Tank. Jetzt geht es zurück in den Riss, sobald **ein** Held fit ist; die anderen erholen sich im Zelt weiter. Die Anzeige „Rückkehr in …“ zeigt die kürzeste Restzeit.

## v0.18.2

### #002 Zu viel Text auf einmal
- Quelle: Spieltest Frau. Tutorial schon in v0.12.0 gekürzt. Jetzt: alle Auftragstexte auf einen kurzen Satz, Ziel-Zeile nur noch „🎯 Zone · Stufe“. Kürzere Hinweiskarten bei Rekrutieren (nur Timer, Chancen, ein Hinweis), Labor, Waffenladen, Mystischer Schmiede, Reserve, Waffenkammer und Proviant.
- Bei neuem Feedback zu langen Texten bitte als neues Issue mit der konkreten Stelle.

## v0.18.0

### #021 Rahmenfarben der Helden passen nicht zur Seltenheit
- Quelle: Spieltest. Die Rahmen waren nach **Klasse** gefärbt (Wächter blau, Waldläufer grün, Elementarmagier rot …) und hatten mit der Seltenheit nichts zu tun. Jetzt zeigen Rahmen, Sprite-Platzhalter und **Name** die Farbe der Seltenheit (Fein blau, Meisterwerk grün, Selten gelb …) – in Zelten, Arena, Reserve, Rekrutieren und Helden-Fenster. Namen leicht aufgehellt für bessere Lesbarkeit.

### #020 Eine einheitliche Schrift
- Quelle: Spieltest Frau. Alles in **Atkinson Hyperlegible** (Normal und Fett), lokal in `css/fonts/` mit Lizenz (SIL OFL 1.1), im Service-Worker-Cache – läuft offline. Serifenschrift und Kursiv entfallen; Monospace nur noch für Sprite-Platzhalter und den Spielstand-Code.

## v0.17.0

### #018 Aufträge sollen auch nach dem Tutorial nur hinführen
- Quelle: Spieltest. „Verstärkung: Heilung/Schaden“ zeigen im Banner nur noch „Hingehen“ (Reiter Trupps). Aufgenommen wird im leuchtenden freien Platz von Zelt 1, ist Zelt 1 voll, über eine leuchtende Karte in der Reserve.
- Im Banner bleibt nur „Belohnung abholen“ – das ist keine Aktion auf einer anderen Seite.

### #019 Kampf-Fenster zu hoch, „Herausfordern“ rutscht aus dem Bild
- Quelle: Spieltest. Kampfbühne niedriger (min. 100 statt 156 px), Gegner-Sprite 72 px (Boss 80), Helden-Sprites 56 px statt volle Kartenbreite. Auf 375 × 812 ist die Herausfordern-Karte jetzt ganz sichtbar.

## v0.16.0

### #010 Rekrutierungs-Seltenheit an Gildenhallen-Stufe koppeln
- Die Chancen der Seltenheiten hängen jetzt von der Gildenhalle ab (`RECRUIT.odds` in `js/config.js`): Stufe 1 Fein 70 % · Meisterwerk 25 % · Selten 5 %, bis Stufe 9 mit 13 % Aufgestiegen.
- Unter „Rekrutieren“ stehen die aktuellen Chancen und ab welcher Hallen-Stufe es besser wird. Handbuch mit Tabelle.
- Höchste Seltenheit bleibt „Aufgestiegen“; „Legendär“ gibt es (noch) nicht.

## v0.15.0

### #016 Tutorial-Banner baut nicht selbst, sondern führt hin
- Quelle: Spieltest. Im Tutorial hat das Banner nur noch „Hingehen“ (wenn man auf einer anderen Seite ist). Gebaut wird mit dem leuchtenden Knopf auf der Gebäudekarte, der erste Held im leuchtenden Zelt-Platz. Das Riss-Portal wird jetzt ebenfalls im Lager aktiviert (Karte erscheint in Schritt 4).
- Die kostenlosen Helden der Aufträge (Heilung, Schaden) werden weiter direkt im Banner aufgenommen.

### #017 Labor und Schmiede erst nach dem Bau in der Leiste
- Quelle: Spieltest. Nach dem Tutorial zeigt die Leiste Portal, Lager, Trupps, Inventar. 🔬 Labor erscheint, sobald es gebaut ist; ⚒️ Schmiede, sobald die Charr-Schmiede steht oder die Mystische Schmiede freigeschaltet ist. Im Lager stehen beide weiter in der Gebäudeliste.

## v0.14.1

### #015 Forschungspunkte gibt es in GW2 nicht
- Quelle: eigene Idee. 🧪 Forschungspunkte heißen jetzt 📜 Forschungsnotizen (GW2-Begriff). Nur Name und Symbol; Spielstand-Feld `rp` und Balancing unverändert. Debug in den Einstellungen hat jetzt 🛠️.

## v0.14.0

### #008 „Mystische Münzen“ durch „Mystischer Klee“ ersetzen
- 💠 Mystische Münzen heißen jetzt 🍀 Mystischer Klee (Spielstand-Feld `clover`, Save-Version 7, Migration übernimmt die Menge).
- Verwendung wie bisher: Ruhestand gibt Klee, ausgegeben wird er in der Mystischen Schmiede (dauerhafte Boni) und zum Zurücksetzen des Würfel-Preises.
- Entschieden: Das Asura-Labor kostet keinen Klee, sondern Forschungsnotizen (siehe #015).

## v0.13.1

### #014 „danach: …“ im Auftrags-Banner weglassen
- Quelle: Spieltest. Der Ausblick auf den nächsten Auftrag (aus #009) ist wieder raus; der Spieler soll nicht alles vorab sehen. Punkt am Reiter, leuchtende Knöpfe und 🎯 bleiben.

## v0.13.0

### #004 Vorräte / Inventar als eigener Tab
- Neuer Reiter 🎒 Inventar in der unteren Leiste (6 Reiter, je ca. 60 px breit): Proviant, Früchte, Arena-Tickets, Waffenkammer, ausgerüstete Waffen. Die Vorräte-Karte im Lager ist weg. Im Tutorial ausgeblendet.

### #012 Gildenhalle: Liste „Schaltet frei“ weglassen
- Die Gildenhallen-Karte zeigt keine Freischalt-Liste mehr. Nach dem Ausbau nennt die Meldung weiterhin kurz, was neu ist.

### #013 Einstellungen als eigener Dialog (⚙️ oben rechts)
- Zahnrad ⚙️ oben rechts in der Kopfzeile (statt 🎒) öffnet die Einstellungen als Dialog. Im Lager stehen sie nicht mehr.

## v0.12.1

### #001 Tabs sehen alle gleich aus
- Jeder Reiter hat eine eigene Farbe: Portal violett, Lager gold, Trupps grün, Labor türkis, Schmiede orange. Der aktive Reiter leuchtet in seiner Farbe; Kopfzeilen-Linie, Hintergrund-Schimmer und Überschriften übernehmen sie.

### #003 Gold-Symbol sieht aus wie ein Stein
- Gold hat jetzt 🟡 statt 🪙 (wie die goldene Münze in GW2), überall im Spiel, im Handbuch und in dev-data.

## v0.12.0

### #005 Gesperrte Bereiche sind im Tutorial schon anklickbar
- Reiter erscheinen erst, wenn das Tutorial sie braucht: Lager ab Schritt 1, Trupps ab Schritt 3, Portal, Labor und Schmiede nach dem Tutorial. In Trupps sind Reserve, Rekrutieren und gesperrte Zelte bis dahin ausgeblendet.

### #006 Reihenfolge: Erst Gildenhalle, dann Lager
- Schritt 1 zeigt nur den Reiter Lager und darin nur die Gildenhalle, ab Schritt 2 auch das Zeltlager. Die übrigen Gebäude erscheinen erst nach dem Tutorial. Der Knopf auf der Gebäudekarte löst den Schritt ebenfalls aus.

### #007 Zeltlager-Schritt: „Schlage dein erstes Zelt auf“
- Schritt 2 heißt „Schlage dein erstes Zelt auf“. Danach erscheint der Reiter Trupps und die Ansicht wechselt dorthin. Der erste Held wird direkt im leeren Platz von Zelt 1 aufgenommen.

### #009 Unklar, was als Nächstes kommt
- Im Auftrags-Banner steht oben „danach: …“ mit dem nächsten Auftrag.
- Der Reiter, in dem es weitergeht, bekommt einen leuchtenden Punkt; der passende Knopf leuchtet.
- Boss-Aufträge zeigen 🎯 Zone und Stufe, markieren die Stufe in der Liste und lassen „Herausfordern“ leuchten.

### #011 Meldung bricht zu früh um
- Die Einblend-Meldung (Toast) brach schon bei halber Breite um. Jetzt nutzt sie bis zu 90 % der Breite.
