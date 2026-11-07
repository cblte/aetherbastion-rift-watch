# Erledigte Issues

Archiv aus `issues.md`. Neueste Version oben. Jeder Punkt behält seine Nummer.

Format:

```
## v0.x.y
### #000 Titel
- Kurz, was geändert wurde (Commit-Hash optional)
```

---

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
