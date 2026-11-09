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
- Jede Version bekommt einen Eintrag in `CHANGELOG.md` (neueste oben, für Spieler geschrieben, mit #-Nummern). Verlinkt aus ⚙️ Einstellungen (`GAME.CHANGELOG_URL`).
- Änderungen am Save-Format: `GAME.SAVE_VERSION` erhöhen und eine Migration in `MIGRATIONS` (`js/state.js`) ergänzen. **Bis ca. v0.40 ausgesetzt:** Dann werden alle Spielstände zurückgesetzt. Bis dahin keine Migrationen für Spielablauf-Änderungen schreiben, nur absichern, falls alte Spielstände sonst abstürzen.

## Architektur
- `js/data/*.js`: reine Datentabellen aus Crusaders Quest: Hero Town, auf GW2 umgemünzt (siehe `DATA.md`). Zahlen dort ändern, nicht in der Logik. Ausnahmen: `stages.js` wird von `tools/gen-zones.mjs` erzeugt, `monsterStats.js` (Kampfwerte jedes Gegners 1:1 aus CQHT) von `tools/gen-monster-stats.mjs` aus `dev-data/gw2-monsters.json`.
- `config.js`: Konstanten, Formeln (`F`), Helden (60, je 15 pro Rolle – beim Ergänzen gleich halten, `race` nur Anzeige), Völker (`RACES`), Klassen (`CLASSES`: Waffenart, Klassenbonus, passende Rollen `roles` – neue Helden nur in passenden Kombinationen), Eigenschaften (`TRAITS`, `TRAIT_STATS`, `TRAIT_RULES`), Rollen, Forschung, Mystische Schmiede; baut `ZONES` (mit Schwierigkeit `d`) und `BUILDINGS` aus `js/data/`
- `state.js`: Spielstand, Save/Load/Migration (`localStorage['aetherbastion_save_v1']`, aktuell Save-Version 12), abgeleitete Werte (`heroStats` inkl. Waffe/Forschung/DEF/Eigenschaften, `levelCap`, `isStageAvailable` …)
- `combat.js`: Tick 10×/s (`GAME.TICK_MS`), Angriffe über Timer je Kämpfer (Helden: `CLASSES[…].interval` ÷ Tempo, Gegner: `COMBAT.MINION_INTERVAL`/`BOSS_INTERVAL`), Zeiten in Sekunden (`bossTime`). Platz 1 im Zelt = Anführer, Zielwahl nach Angriffsart des Gegners (`hitShares`, `attack` aus `tools/gen-zones.mjs`), Boss-Flächenangriff (`BOSS_AOE_*`). Squad-`mode` ist `'farm'` (Schergen der Stufe) oder `'boss'` (Herausforderung, 90 s Zeitlimit, danach 90 s Pause `bossReadyAt`; `autoBoss` wiederholt nach der Pause, aus nach Niederlage). Ein Boss-Sieg setzt `state.progress[zone]`. Dazu Belohnungen (`applyKillRewards`), Tauschen und Beleben.
- `progress.js`: Bauen mit Bauzeit (`state.construction`, immer nur ein Auftrag), Rekrutierung (`state.recruits`: Angebote mit Seltenheit, Timer und Erneuern; Werte in `RECRUIT`), Charr-Schmiede (Laden `state.shop`, Waffenkammer `state.armory`, `hero.weapon` = Waffen-ID), Proviant, Asura-Labor (`state.research`)
- `quests.js`: Aufträge nach dem Onboarding (Daten: `QUESTS` in `config.js`). Erledigte `id`s in `state.questsDone`; ohne Import aus `state.js` (wird von der Migration genutzt)
- `manual.js`: 📖 Handbuch (⚙️ Einstellungen). Kurzfassung von `MANUAL.md` – bei Spieländerungen beide pflegen
- `offline.js`: `runOffline()`, deterministisch Sieg für Sieg (nur Schergen) mit Effizienz-Faktor, max. 8 h (+ Forschung), keine Tode; zahlt Gildenkasse-Zyklen, schließt Bauaufträge ab
- `ui.js`: HTML-String-Rendering mit Diff (`setHTML`), Event-Delegation über `data-action`, kein Re-Render solange ein Finger aufliegt. Modals mit `refresh`-Funktion laufen bei jedem `render()` live mit
- `main.js`: Schleife misst echte Zeit seit `lastTickMs`. Lücken ≤ 30 s → Ticks, größere → `runOffline()`. Ab 60 s erscheint der Bericht.

Der Spielstand ist ein einziges Objekt. Bei Import/Reset wird es per `replaceState()` in-place ersetzt, damit alle Module dieselbe Referenz behalten.

## Entwicklungs-Referenzen (`dev-data/`)
- `akrw-buildings.md`, `akrw-hero-leveling.md`, `akrw-shop.md`, `akrw-progression-stages.md/.json` werden aus `js/data/` erzeugt, `akrw-zones-expansion.md` aus `tools/data/zones-expansion.json`: `node tools/gen-devdata.mjs .` – nach Datenänderungen neu erzeugen, nicht von Hand bearbeiten.
- `gw2-monsters.json/.md`: jeder GW2-Boss und -Scherge mit CQHT-Vorlage (Werte/Drops unverändert) und Prüfung gegen die DE-GW2-Wiki. `node tools/build-gw2-monsters.mjs .` (Zonen 1–10 aus `js/data/stages.js` über `src`, Zonen 11–20 aus `tools/data/zones-expansion.json`, Wiki-Hinweise und feste CQHT-Vorlagen in `tools/data/gw2-hints.mjs`); Wiki-Ergebnisse liegen in `gw2-wiki-check.json`, `--wiki` prüft alles neu. Nach `gen-zones.mjs` neu erzeugen, danach `node tools/gen-monster-stats.mjs .`.
- `helden-namen.md` ist handgeschrieben: Namensliste der Helden, welche im Spiel sind (mit id) und die Reserve für spätere Helden.
- `akrw-traits.md` ist handgeschrieben: Entwurf der Helden-Eigenschaften. Seit v0.29.0 im Spiel (Daten in `config.js`, Logik `rollTraits`/`traitBonus`/`squadTrait` in `state.js`); der Abschnitt „Umsetzung“ dort hält die Entscheidungen fest.
- `combat-overview.md` (Quelle: https://cqht-wiki.vercel.app/en/combat): CQHT-Kampfformeln (Schadens-Pipeline, DEF/RES mit Durchdringung, Krit, Angriffstempo, Wiederbelebung 4 %/s). Grundlage für #061 Schritt 2.
- `issues.md`: offenes Feedback mit festen Nummern (`#001` …), nach Kategorie sortiert. Neues landet unter „Eingang“ → einsortieren, nächste freie Nummer vergeben und hochzählen. Erledigtes mit Version nach `issues_solved.md` verschieben (neueste Version oben), Nummern nie neu vergeben.
- `archiv/`: abgelegte Rohtexte, alte Entwürfe und CQHT-Rohdaten, nicht mehr gepflegt.
  - `cqht-monsters.json/.md` (alle 150 CQHT-Monster und -Bosse mit Werten und Drops, aus der Fan-Wiki: `node tools/fetch-monsters.mjs .`, `--only ID1,ID2` testet ohne zu schreiben). `cqht-monsters.json` ist weiterhin Eingabe für `build-gw2-monsters.mjs`.
  - `gegner-alte-zonen-7-10.jsonl`: Gemini-Schergen der Zonen 7–10 bis v0.20.1 (Katakomben, Harathi, Blutstrom-Küste, Funkenschwärmersumpf).
  - `cqht-skills.json/.md` (CQHT-Forschungsbaum: 436 Forschungen, deutsche Texte, aus der Fan-Wiki: `node tools/fetch-skills.mjs .`). Grundlage für einen späteren Ausbau des Asura-Labors.

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
- Zonen und Bosse: Reihenfolge nach GW2 (Zonen 1–5 = Heimatgebiete der fünf Völker, Zone 6 Caudecus’ Anwesen als Finale der Aufträge; Portal 1 Kryta, Caledon & Zittergipfel, 2 Metrica, Aschfurt & Anwesen, 3 Löwenstein & Meerenge, 4 Orr; Zonen 7–10 folgen der persönlichen Geschichte bis zur Fluchküste), Daten in `tools/gen-zones.mjs` → `node tools/gen-zones.mjs .` erzeugt `js/data/stages.js` (Zahlen bleiben CQHT). Bosse der Zonen 2–5 ohne Quellenprüfung, Zonen 7–10 gegen die DE-Wiki geprüft. Erweiterung (Zonen 11–20, Portal 5–8) als Entwurf in `tools/data/zones-expansion.json` (lesbar: `dev-data/akrw-zones-expansion.md`); noch nicht im Spiel, `gen-zones.mjs` liest sie noch nicht.
- Noch ohne Funktion: Früchte, Arena-Tickets, Erschöpfung (CQHT Fatigue), Waffen-Modifikation (CQHT Forge), `js/data/specials.js` (Küchen-Prüfung, Kryptis-Seelenfeste).
- Balancing: Gegnerwerte 1:1 aus CQHT (`js/data/monsterStats.js`), Regler in `COMBAT` (`HP_CURVE`, `BOSS_SCALE`, `BOSS_HP_CURVE`, `HARD_HP`, `HARD_SCALE`, `LEGEND_SCALE`, `HARD_DIFF`/`LEGEND_DIFF`), Formeln nach `dev-data/combat-overview.md`. Prüfen mit `tools/sim-bosses.mjs`.
- Live-Kampf: Ein zu schwacher Trupp verdient nichts. Offline: Er bekommt den Effizienz-Anteil.
- Pixel-Art fehlt noch (Sprite-Tags sind vorbereitet).

## Geplant (bereits entschieden)
- Rekrutierung mit Angeboten und Seltenheiten ist drin. Offen: Darf ein Mitglied in einer besseren Seltenheit die alte Version ersetzen (oder doppelt im Lager sein)? Erst nach den nächsten Systemen entscheiden.
- Questreihe: 23 Aufträge bis Zone 6 (Caudecus’ Anwesen) sind drin (Tutorial: Halle/Zelt geben Gold, erstes Rekruten-Angebot = Tank/Heiler/Schaden aus `ONBOARDING`, Aufträge „Verstärkung“ verlangen die Rolle). Später ergänzen: Ruhestand (Mystische Schmiede), Skills, Beförderungen.
- Skill-System für Helden (kommt später).
- Beförderungen / Sterne-Stufen für Helden (kommt später). Ganz oben: 7★ / Legendär für voll ausgelevelte Helden und Waffen, leicht OP und sehr schwer zu bekommen (#049, Weg noch offen).
- Dekorationen: nicht geplant.
