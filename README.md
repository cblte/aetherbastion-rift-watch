# Aetherbastion: Rift Watch

Mobile-First Idle-RPG als Progressive Web App. Vanilla HTML, CSS und JavaScript (ES-Module). Kein Framework, kein Build-Schritt, kein Backend. Nach dem ersten Laden läuft das Spiel komplett offline und lässt sich auf dem Homescreen installieren.

> Nicht-kommerzielles Fanprojekt für eine Guild-Wars-2-Gilde. Guild Wars 2 ist eine Marke von ArenaNet/NCSOFT. Das Projekt ist nicht mit ihnen verbunden und enthält keine Original-Grafiken, Logos oder Icons.

## Dateien

```
index.html          App-Gerüst (Kopfzeile, Quest-Banner, Ansicht, Navigation)
css/style.css       Dark-Mode-UI, Platzhalter-Sprites, Safe-Areas
js/config.js        ALLE Zahlen & Formeln, Helden-Katalog, Zonen, Gebäude, Prestige
js/state.js         Spielstand, Speichern/Laden, Export/Import, Migration, abgeleitete Werte
js/combat.js        Tick-Kampf (1 s) pro Trupp, Belohnungen, Tauschen, Belebung
js/offline.js       Deterministische Offline-Berechnung (Welle für Welle, ohne Ticks)
js/ui.js            Rendering, Navigation, Modals, Aktionen, Wischgeste
js/main.js          Start, Spielschleife, Autosave, Service-Worker-Registrierung
manifest.json       PWA-Manifest
sw.js               Service Worker (Cache-first, versioniert)
icon.svg            App-Icon (+ icon-192.png / icon-512.png für Android/iOS)
MANUAL.md           Spielanleitung
```

## Lokal testen

Service Worker und ES-Module funktionieren **nicht** über `file://`. Sie brauchen `localhost` oder HTTPS.

```bash
cd aetherbastion
python3 -m http.server 8080
# → http://localhost:8080
```

Auf dem Handy im selben WLAN geht `http://<IP-des-Rechners>:8080` zum Ausprobieren. Der Service Worker (Offline, Installation) läuft dort aber nur über HTTPS. Für einen echten Handy-Test also kurz deployen (siehe unten) oder einen Tunnel nutzen.

Debug-Hilfe: In Chrome DevTools → *Application* → *Service Workers* „Update on reload“ aktivieren, solange du entwickelst.

## Hosting

Das Spiel ist eine rein statische Seite. Den Ordnerinhalt einfach auf einen beliebigen HTTPS-Webspace legen, zum Beispiel:

- **GitHub Pages:** Repo anlegen, Dateien pushen, unter *Settings → Pages* den Branch wählen.
- **Netlify / Cloudflare Pages:** Ordner per Drag & Drop hochladen.
- **Eigener Server / Uberspace / nginx:** Dateien ins Web-Root kopieren. Alle Pfade sind relativ, ein Unterordner (`/aetherbastion/`) funktioniert auch.

`.json` sollte als `application/json` ausgeliefert werden und `.js` als `text/javascript` (Standard bei allen gängigen Hostern).

## Updates ausrollen

1. Dateien ändern.
2. In `sw.js` die `CACHE_VERSION` hochzählen (z. B. `aetherbastion-v2`).
3. Deployen. Laufende Clients sehen den Hinweis „Neue Version verfügbar → Neu laden“.

Neue Dateien müssen zusätzlich in `APP_FILES` in `sw.js` eingetragen werden.

## Anpassen

### Gildenmitglieder eintragen

In `js/config.js` im Array `HEROES` bei jedem Helden `name`, `title` und optional `account` ersetzen. **Die `id` nicht ändern**, sonst passen bestehende Spielstände nicht mehr. Klasse (`cls`), Rolle (`role`), Werte und Buffs lassen sich frei anpassen. Weitere Helden einfach mit neuer `id` (z. B. `h21`) anhängen.

Die Startaufstellung im Onboarding steht in `ONBOARDING` (Tank, Heiler, Schadensausteiler).

### Balancing

Alle Formeln stehen im Objekt `F` in `js/config.js`, Kampfkonstanten in `COMBAT`, Baukosten in `BUILDINGS`, Zelt-Preise in `TENTS` und Prestige-Kosten in `MYSTIC`. Die Basisversion ist ein Startpunkt: Kryta ist absichtlich leicht, ab dem Zittergipfel braucht man Ausbau und mehr Helden.

### Pixel-Art einsetzen

Jede Grafikstelle ist ein `<div class="sprite">` mit einem Tag wie `[SPRITE: HERO_WAECHTER]` oder `[SPRITE: MOB_KRYPTIS_DAEMON]`. Die Tags kommen aus `CLASSES[...].sprite` und `ZONES[...].mobs[...].sprite`. Am einfachsten: In `ui.js` in der Funktion `sprite(tag)` ein `<img src="img/${tag}.png">` ausgeben und die Bilder in `APP_FILES` aufnehmen. `image-rendering: pixelated` ist schon gesetzt.

### Spielstand-Migration

Gespeichert wird unter `localStorage['aetherbastion_save_v1']` mit `version`-Feld, automatisch alle 10 Sekunden sowie bei `visibilitychange` und `pagehide`. Für ein neues Save-Format:

1. `GAME.SAVE_VERSION` in `config.js` erhöhen.
2. In `state.js` im Objekt `MIGRATIONS` eine Funktion für die alte Version eintragen, z. B. `1: (s) => { s.neuesFeld = 0; return s; }`.

Fehlende Felder werden zusätzlich automatisch mit Standardwerten aufgefüllt.

## Technische Notizen

- **Spielschleife:** Läuft alle 250 ms an, misst aber immer die echte Zeit seit `lastTickMs` und holt volle 1-Sekunden-Ticks nach. Lücken über 30 s (Hintergrund, Drosselung, App zu) gehen an `runOffline()`. Ab 60 s erscheint der Offline-Rissbericht. Auf `setInterval`-Genauigkeit wird nie vertraut.
- **Offline-Berechnung:** Pro Trupp Welle für Welle mit Erwartungswerten (DPS inkl. Krit/Macht/Eile, Heilung, HP-Puffer). Die Effizienz `min(1, (HP-Puffer + Heilung × Zeit) ÷ eingehender Schaden)` skaliert die Belohnung. Ein zu schwacher Trupp bekommt nur einen Bruchteil und startet wieder bei Welle 1. Scherben werden als Erwartungswert über `shardFrac` angesammelt, damit das Ergebnis deterministisch bleibt. Maximal 8 Stunden.
- **Kein verlorener Tipp:** Bereiche werden nur neu gezeichnet, wenn sich ihr HTML geändert hat, und nie, solange ein Finger auf dem Bildschirm liegt.
- **iOS:** Für das Homescreen-Icon wird `icon-192.png` genutzt (iOS kann kein SVG-Icon). Vibration gibt es auf iOS nicht, die Einstellung ist dort wirkungslos.
