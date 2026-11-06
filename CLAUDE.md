# CLAUDE.md – Aetherbastion: Rift Watch

Mobile-First Idle-RPG als PWA für eine Guild-Wars-2-Gilde (nicht-kommerzielles Fanprojekt). Sprache im Spiel und in der Doku: Deutsch, GW2-Begriffe auf Deutsch.

## Harte Regeln
- Vanilla HTML/CSS/JS mit ES-Modulen. Keine Frameworks, keine Build-Tools, kein Backend, keine externen CDNs (muss offline laufen).
- Keine Original-Grafiken, Logos oder Icons aus Guild Wars 2. Grafiken sind Platzhalter `[SPRITE: TAG]` (Funktion `sprite()` in `js/ui.js`).
- Mobile first: max-width 440px, Touch-Ziele ≥ 44 × 44 px, keine Hover-Funktionen, Safe-Areas beachten.
- Alle Zahlen und Formeln gehören in `js/config.js`, nicht in die Logik.
- Helden-`id`s in `HEROES` nie ändern (Spielstände hängen daran).
- Nach jeder Änderung an App-Dateien `CACHE_VERSION` in `sw.js` erhöhen. Neue Dateien in `APP_FILES` eintragen.
- Änderungen am Save-Format: `GAME.SAVE_VERSION` erhöhen und eine Migration in `MIGRATIONS` (`js/state.js`) ergänzen.

## Architektur
- `config.js`: Konstanten, Formeln (`F`), Helden, Zonen, Gebäude, Zelte, Mystische Schmiede
- `state.js`: Spielstand, Save/Load/Migration (`localStorage['aetherbastion_save_v1']`), abgeleitete Werte (`heroStats`, `levelCap` …)
- `combat.js`: 1-s-Tick pro Trupp, Belohnungen (`applyKillRewards`), Wellen, Tauschen/Beleben
- `offline.js`: `runOffline()`, deterministisch Welle für Welle mit Effizienz-Faktor, max. 8 h, keine Tode
- `ui.js`: HTML-String-Rendering mit Diff (`setHTML`), Event-Delegation über `data-action`, kein Re-Render solange ein Finger aufliegt
- `main.js`: Schleife misst echte Zeit seit `lastTickMs`. Lücken ≤ 30 s → Ticks, größere → `runOffline()`. Ab 60 s erscheint der Bericht.

Der Spielstand ist ein einziges Objekt. Bei Import/Reset wird es per `replaceState()` in-place ersetzt, damit alle Module dieselbe Referenz behalten.

## Testen
- `python3 -m http.server 8080` → http://localhost:8080 (über `file://` geht es nicht)
- Spiellogik lässt sich ohne Browser in Node testen (`import` aus `js/state.js`, `combat.js`, `offline.js`, die brauchen kein DOM)
- Im Spiel: ✨ Schmiede → „15 Min. Offline simulieren“
- Bei DevTools-Tests: Service Worker „Update on reload“ aktivieren, sonst kommen alte Dateien aus dem Cache

## Bekannte offene Punkte / Ideen
- Balancing ist ein Startpunkt: Kryta ist sehr leicht, ab Zone 2 steigt die Kurve stark.
- Live-Kampf: Ein zu schwacher Trupp verdient nichts. Offline: Er bekommt den Effizienz-Anteil.
- Pixel-Art fehlt noch (Sprite-Tags sind vorbereitet).
