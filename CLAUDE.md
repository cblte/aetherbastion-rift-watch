# CLAUDE.md – Aetherbastion: Rift Watch

Mobile-First Idle-RPG als PWA für eine Guild-Wars-2-Gilde (nicht-kommerzielles Fanprojekt). Sprache im Spiel und in der Doku: Deutsch, GW2-Begriffe auf Deutsch.

## Harte Regeln
- Vanilla HTML/CSS/JS mit ES-Modulen. Keine Frameworks, keine Build-Tools, kein Backend, keine externen CDNs (muss offline laufen).
- Eine Schrift: Atkinson Hyperlegible lokal in `css/fonts/` (OFL), nur Normal und Fett (400/700). Keine weiteren Schriften oder Kursivschnitte.
- Keine Original-Grafiken, Logos oder Icons aus Guild Wars 2. Grafiken sind Platzhalter `[SPRITE: TAG]` (Funktion `sprite()` in `js/ui.js`).
- Mobile first: max-width 440px, Touch-Ziele ≥ 44 × 44 px, keine Hover-Funktionen, Safe-Areas beachten.
- Alle Zahlen und Formeln gehören in `js/config.js`, nicht in die Logik.
- Helden-`id`s in `HEROES` nie ändern (Spielstände hängen daran).
- Nach jeder Änderung an App-Dateien die Version erhöhen: `GAME.VERSION` in `js/config.js` und `CACHE_VERSION` in `sw.js` (immer dieselbe Nummer, z. B. `0.6.1` / `'aetherbastion-0.6.1'`). Patch für Fixes, Minor für neue Funktionen. Neue Dateien in `APP_FILES` eintragen.
- Änderungen am Save-Format: `GAME.SAVE_VERSION` erhöhen und eine Migration in `MIGRATIONS` (`js/state.js`) ergänzen.

## Architektur
- `js/data/*.js`: reine Datentabellen aus Crusaders Quest: Hero Town, auf GW2 umgemünzt (siehe `DATA.md`). Zahlen dort ändern, nicht in der Logik. Ausnahme: `stages.js` wird von `tools/gen-zones.mjs` erzeugt.
- `config.js`: Konstanten, Formeln (`F`), Helden, Rollen, Forschung, Mystische Schmiede; baut `ZONES` (mit Schwierigkeit `d`) und `BUILDINGS` aus `js/data/`
- `state.js`: Spielstand, Save/Load/Migration (`localStorage['aetherbastion_save_v1']`, aktuell Save-Version 7), abgeleitete Werte (`heroStats` inkl. Waffe/Forschung/DEF, `levelCap`, `isStageAvailable` …)
- `combat.js`: 1-s-Tick pro Trupp. Squad-`mode` ist `'farm'` (Schergen der Stufe) oder `'boss'` (Herausforderung, 90 s Zeitlimit, danach 90 s Pause `bossReadyAt`; `autoBoss` wiederholt nach der Pause, aus nach Niederlage). Ein Boss-Sieg setzt `state.progress[zone]`. Dazu Belohnungen (`applyKillRewards`), Tauschen und Beleben.
- `progress.js`: Bauen mit Bauzeit (`state.construction`, immer nur ein Auftrag), Rekrutierung (`state.recruits`: Angebote mit Seltenheit, Timer und Erneuern; Werte in `RECRUIT`), Charr-Schmiede (Laden `state.shop`, Waffenkammer `state.armory`, `hero.weapon` = Waffen-ID), Proviant, Asura-Labor (`state.research`)
- `quests.js`: Aufträge nach dem Onboarding (Daten: `QUESTS` in `config.js`). Erledigte `id`s in `state.questsDone`; ohne Import aus `state.js` (wird von der Migration genutzt)
- `manual.js`: 📖 Handbuch (⚙️ Einstellungen). Kurzfassung von `MANUAL.md` – bei Spieländerungen beide pflegen
- `offline.js`: `runOffline()`, deterministisch Sieg für Sieg (nur Schergen) mit Effizienz-Faktor, max. 8 h (+ Forschung), keine Tode; zahlt Gildenkasse-Zyklen, schließt Bauaufträge ab
- `ui.js`: HTML-String-Rendering mit Diff (`setHTML`), Event-Delegation über `data-action`, kein Re-Render solange ein Finger aufliegt. Modals mit `refresh`-Funktion laufen bei jedem `render()` live mit
- `main.js`: Schleife misst echte Zeit seit `lastTickMs`. Lücken ≤ 30 s → Ticks, größere → `runOffline()`. Ab 60 s erscheint der Bericht.

Der Spielstand ist ein einziges Objekt. Bei Import/Reset wird es per `replaceState()` in-place ersetzt, damit alle Module dieselbe Referenz behalten.

## Entwicklungs-Referenzen (`dev-data/`)
- `akrw-buildings.md`, `akrw-hero-leveling.md`, `akrw-shop.md`, `akrw-progression-stages.md/.json` werden aus `js/data/` erzeugt, `akrw-zones-expansion.md` aus `tools/data/zones-expansion.json`: `node tools/gen-devdata.mjs .` – nach Datenänderungen neu erzeugen, nicht von Hand bearbeiten.
- `cqht-monsters.json/.md` (alle 150 CQHT-Monster und -Bosse mit Werten und Drops) kommen aus der Fan-Wiki: `node tools/fetch-monsters.mjs .` (`--only ID1,ID2` testet einzelne Monster, ohne Dateien zu schreiben). Nur Werte und Texte, keine Grafiken.
- `cqht-skills.json/.md` (kompletter CQHT-Forschungsbaum: 436 Forschungen in 4 Bäumen mit Labor-Stufe, Kosten in Honor, Zeit, Voraussetzungen, Freischaltungen, Namen/Texte auf Deutsch) kommen aus der Fan-Wiki: `node tools/fetch-skills.mjs .`. Grundlage für einen späteren Ausbau des Asura-Labors; noch nicht im Spiel.
- `gw2-monsters.json/.md`: jeder GW2-Boss und -Scherge mit CQHT-Vorlage (Werte/Drops unverändert) und Prüfung gegen die DE-GW2-Wiki. `node tools/build-gw2-monsters.mjs .` (Zonen 1–10 aus `js/data/stages.js` über `src`, Zonen 11–20 aus `tools/data/zones-expansion.json`, Wiki-Hinweise und feste CQHT-Vorlagen in `tools/data/gw2-hints.mjs`); Wiki-Ergebnisse liegen in `gw2-wiki-check.json`, `--wiki` prüft alles neu. Nach `gen-zones.mjs` neu erzeugen.
- `akrw-traits.md` ist handgeschrieben: Entwurf für Helden-Eigenschaften (noch nicht im Spiel).
- `issues.md`: offenes Feedback mit festen Nummern (`#001` …), nach Kategorie sortiert. Neues landet unter „Eingang“ → einsortieren, nächste freie Nummer vergeben und hochzählen. Erledigtes mit Version nach `issues_solved.md` verschieben (neueste Version oben), Nummern nie neu vergeben.

## Testen
- `python3 -m http.server 8080` → http://localhost:8080 (über `file://` geht es nicht)
- Spiellogik lässt sich ohne Browser in Node testen (`import` aus `js/state.js`, `combat.js`, `offline.js`, die brauchen kein DOM)
- Im Spiel: ✨ Schmiede → „15 Min. Offline simulieren“
- Bei DevTools-Tests: Service Worker „Update on reload“ aktivieren, sonst kommen alte Dateien aus dem Cache

## Deploy
- Jeder Push auf `main` veröffentlicht das Spiel per `.github/workflows/pages.yml` auf GitHub Pages.
- Auf die Website kommen nur `index.html`, `manifest.json`, `sw.js`, Icons, `css/` und `js/`. Doku und `dev-data/` bleiben draußen.
- Neue Dateien im Hauptordner müssen im Workflow (`cp`-Zeile) ergänzt werden.
- Der Workflow setzt `GAME.BUILD` (Lauf-Nr. · Commit) und hängt `-b<Nr.>` an `CACHE_VERSION`. Unten unter der Navigation steht `v<GAME.VERSION> · Build …`, lokal „Build lokal“. `GAME.VERSION` steigt mit jeder Änderung (siehe Harte Regeln).

## Bekannte offene Punkte / Ideen
- Zonen und Bosse: Reihenfolge nach GW2 (Portal 1 Kryta, 2 Zittergipfel & Ascalon, 3 Herz von Tyria, 4 Orr), Daten in `tools/gen-zones.mjs` → `node tools/gen-zones.mjs .` erzeugt `js/data/stages.js` (Zahlen bleiben CQHT). Bosse ab Zone 4 ohne Quellenprüfung. Erweiterung (Zonen 11–20, Portal 5–8) als Entwurf in `tools/data/zones-expansion.json` (lesbar: `dev-data/akrw-zones-expansion.md`); noch nicht im Spiel, `gen-zones.mjs` liest sie noch nicht.
- Noch ohne Funktion: Früchte, Arena-Tickets, Erschöpfung (CQHT Fatigue), Waffen-Modifikation (CQHT Forge), `js/data/specials.js` (Küchen-Prüfung, Kryptis-Seelenfeste).
- Balancing Spätspiel (Zonen 9–10, schwer, legendär) ist offen: `F.monsterHp`, `F.monsterAtk`, `COMBAT.LEVEL_DIFF`.
- Live-Kampf: Ein zu schwacher Trupp verdient nichts. Offline: Er bekommt den Effizienz-Anteil.
- Pixel-Art fehlt noch (Sprite-Tags sind vorbereitet).

## Geplant (bereits entschieden)
- Rekrutierung mit Angeboten und Seltenheiten ist drin. Offen: Darf ein Mitglied in einer besseren Seltenheit die alte Version ersetzen (oder doppelt im Lager sein)? Erst nach den nächsten Systemen entscheiden.
- Questreihe: 20 Aufträge bis Zone 3 sind drin (inkl. Heiler und Schaden als kostenlose Rekruten). Später ergänzen: Ruhestand (Mystische Schmiede), Skills, Beförderungen.
- Skill-System für Helden (kommt später).
- Beförderungen / Sterne-Stufen für Helden (kommt später).
- Dekorationen: nicht geplant.
