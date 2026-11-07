# Erledigte Issues

Archiv aus `issues.md`. Neueste Version oben. Jeder Punkt behält seine Nummer.

Format:

```
## v0.x.y
### #000 Titel
- Kurz, was geändert wurde (Commit-Hash optional)
```

---

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
