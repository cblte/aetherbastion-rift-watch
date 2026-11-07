# Offene Issues

Feedback und Fehler aus dem Spieltest. Erledigte Punkte wandern mit Version nach `issues_solved.md`.

**So geht's:** Neues einfach unten unter „Eingang“ als Stichpunkt notieren. Claude sortiert es ein und vergibt eine Nummer.

- **Nummern** (`#001` …) werden nie neu vergeben, auch nicht nach dem Erledigen.
- **Kategorie:** UI · Tutorial · Spielsystem · Balancing · Fehler · Idee
- **Status:** `offen` · `in Arbeit` · `zurückgestellt` (mit Grund)
- **Quelle:** wer es gemeldet hat (z. B. „Spieltest Frau“, „Gilde“)

Nächste freie Nummer: **#049**

## Eingang

<!-- Hier neue Punkte notieren, ungeordnet ist okay. -->

---

## Fehler

_Zurzeit nichts offen._

## UI

### #041 Oberfläche zu voll für den kleinen Bildschirm
- **Status:** offen · **Quelle:** Entwickler
- Eindruck: Auf 440 px ist alles zu viel auf einmal.
- Vorschlag: Erst eine Bestandsaufnahme machen, Bildschirm für Bildschirm (Kopfbereich mit Währungen, Trupp-Karten, Gebäude, Rekrutierung, Schmiede): Was braucht man ständig, was nur selten? Seltenes hinter Aufklappen oder Unter-Tabs legen. Passt zu #034 (weniger Währungen = weniger Kopfbereich).

## Tutorial

_Zurzeit nichts offen._

## Spielsystem

### #040 Asura-Labor ab Stufe 6 ohne Wirkung
- Teilweise erledigt (v0.27.0): Labor 6–10 schalten jetzt die Stufen von „Archiv der Veteranen“ frei (#022). Weitere Knoten für Labor 7–10 wären trotzdem gut.
- **Status:** offen · **Quelle:** Gilde (Spieler mit allem maximal ausgebaut)
- Rückmeldung: Das Labor hochzuleveln „macht noch keinen Sinn“.
- Befund: `TIER_LAB = { 1: 1, 2: 3, 3: 5 }` – ab Labor-Stufe 5 sind alle Forschungen offen. Die Stufen 6–10 kosten zusammen 1,9 Mio. 🟡 und schalten nichts frei.
- Vorschlag: Stufe 4 im Baum (Labor 7) und Stufe 5 (Labor 9), oder höhere `max` je Knoten an die Labor-Stufe koppeln. Ideen für neue Knoten in `dev-data/archiv/cqht-skills.json` (436 CQHT-Forschungen). Gut für die Gegner-Mechaniken aus #042 (z. B. Forschung gegen Schilde).

### #042 Endgame: Gegner-Mechaniken und Helden, die dagegen helfen
- **Status:** offen · **Quelle:** Entwickler
- In CQHT hängt man vor Stufe 50, weil Forschung fehlt und man keinen Helden hat, der ständig Gegner-Schilde entfernt. Solche Mechaniken fehlen im Spiel ganz: Bosse unterscheiden sich nur in den Zahlen.
- Vorschlag: Ein paar Boss-Eigenschaften (z. B. Schild/Trotz, Wut-Phase unter 30 % LP, Gift auf den ganzen Trupp), jeweils mit einer Rolle oder Fähigkeit, die dagegen hilft (Unterstützer entfernt Schild, Heiler entfernt Zustände). So zählt die Trupp-Zusammensetzung mehr als nur die Stärke. Hängt eng am geplanten Skill-System, Gegner-Fähigkeiten aus `rift` in #026 als Vorlage.

### #033 Beförderung: Helden ab bestimmten Leveln einzeln aufwerten
- **Status:** offen · **Quelle:** Entwickler
- Idee: Wie in CQHT erreichen Helden ein Level, ab dem man sie einzeln zum Aufwerten schickt (Beförderung). Steht schon unter „Geplant“ (Beförderungen / Sterne-Stufen).
- Vorschlag: Beförderung an Level-Schwellen (z. B. 20/40/60), kostet Gold und eine zweite Währung (siehe #034) und dauert eine Zeit, in der der Held nicht kämpft (wie Bauaufträge). Belohnung: höhere Seltenheit (Rahmenfarbe) oder Werte-Bonus. Klärt nebenbei die offene Frage aus der Rekrutierung (bessere Seltenheit ersetzt die alte Version).
- Zuerst die CQHT-Regeln nachsehen (Kosten, Dauer, was sich ändert).

### #034 Weniger Währungen
- **Status:** offen · **Quelle:** Entwickler
- Zurzeit vier Währungen, die sich kaum gebraucht anfühlen: 🟡 Gold, 🔮 Ätherscherben (Riss-Portal, Aufträge), 🍀 Mystischer Klee (Ruhestand → Mystische Schmiede, Würfel-Preis zurücksetzen), 📜 Forschungsnotizen (Asura-Labor, seltene Waffen). Idee: Klee oder Scherben streichen, eher nur eine Zusatzwährung.
- Vorschlag: Jede Währung bekommt genau eine Aufgabe, oder sie fällt weg.
  - 🟡 Gold = alles Alltägliche.
  - 📜 Forschungsnotizen = Fortschritt (Labor, Beförderung #033).
  - 🔮 Scherben: entschieden (2026-11-07), sie werden Orichalcum, siehe #048. Das Portal kostet dann nur Gold und Boss-Fortschritt.
  - 🍀 Klee bleibt nur, wenn der Ruhestand bleibt; sonst Mystische Schmiede auf 📜 umstellen.
- Save-Migration: Bestände umrechnen (z. B. 1 🔮 = X 🟡), nichts ersatzlos löschen. Entscheiden zusammen mit #033 und #022.

### #026 Mehr Schergen pro Zone, dazu Veteranen und Elite aus dem Riss
- **Status:** offen · **Quelle:** Entwickler
- Wunsch: Mehr echte GW2-Gegner pro Zone statt 2 Schergen pro Stufe, etwa 5 Schergen pro Stufe. Jeder hat einen Basiswert, und manchmal kommt ein Scherge als **Veteran** oder **Elite** aus einem Riss und ist entsprechend stärker.
- Daten: `dev-data/gegner-pro-zone.jsonl` (von Gemini, bereinigt). Felder: `zone`, `name`, `faction`, `stages` (1–5), `attack` (Nahkampf/Fernkampf/Magie), `area`, `flavor`, `rift` {`name`, `ability`}, `wiki`. Keine Zahlenwerte, die Stärke bleibt bei den Formeln in `config.js`.
- Zonen 1–6 bereinigt (85 Zeilen, 12–16 Schergen pro Zone): Namen auf die Schreibweise der DE-Wiki gebracht (z. B. Arktischer Bär → Arctodus, Sohn von Svanir (Jäger) → Svanir-Jäger, Cuatl-Krieger → Hylek-Krieger), erfundene Anwesen-Gegner durch echte ersetzt (Kleriker des Weißen Mantels, Separatist, Höhlenspinne …), Harathi-Krieger und Modniir-Berserker vom Königintal ins Harathi-Hinterland, Funkenschwärmer von Metrica in den Funkenschwärmersumpf, Apostroph `Caudecus’ Anwesen`, Wiki-Links neu gesetzt. Alle Namen stehen in der Wiki, außer bewusst eigenen Gegnern mit `"wiki": null` (Sumpfschrecken, Abgerichteter Wachhund, Diener des Hauses); Inquestur-Golem verweist auf die Wiki-Seite „Golem“. Jede Stufe hat mindestens 3 Schergen.
- Zonen 7–10 fehlen: Seit v0.21.0 (#025) sind das Löwenstein & Klaueninsel, Meerenge der Verwüstung, Malchors Sprung und Fluchküste. Die alten Gemini-Zeilen der früheren Zonen 7–10 liegen in `dev-data/archiv/gegner-alte-zonen-7-10.jsonl`. Für die Orr-Zonen gibt es in der DE-Wiki viele echte Gegner (Kategorie „Auferstandener“), die Schergen in `tools/gen-zones.mjs` sind ein Anfang.
- Riss-Formen: Etwa die Hälfte der Namen beginnt mit „Riss-…“ (eintönig), Fähigkeiten nennen teils Dinge, die das Spiel nicht kennt (Mana, Ausweichen) – als Kampf-Log-Text nutzbar, nicht als Regel. Evtl. von Gemini abwechslungsreicher neu schreiben lassen. Bosse sind nicht drin (eigene Datei geplant).
- Entschieden (2026-11-07): Erst nur **Veteran**, Elite kommt später. Startwerte: 10 % Chance, ×2 LP, ×1,5 Angriff, ×2 Beute.
- Zum Umsetzen:
  - Regeln für Veteran (später Elite) in `config.js` (Chance, ×LP, ×Angriff, Beute), Namen und Fähigkeit aus `rift`.
  - Kampf und Offline-Berechnung müssen mehr als 2 Schergen pro Stufe auswürfeln können.
  - Skript in `tools/`, das die JSONL liest, Namen gegen die Wiki prüft (wie `build-gw2-monsters.mjs`) und die Schergen in `stages.js` schreibt (zusammen mit `gen-zones.mjs`).
  - Handbuch (`MANUAL.md`, `manual.js`) ergänzen.

## Balancing

### #039 Zu viele Schadens-Helden, Heiler nur in „Fein“
- **Status:** offen · **Quelle:** Gilde (Spieler hat alle Bosse inkl. legendär besiegt), vom Entwickler bestätigt
- Rückmeldung: Überangebot an Schaden, einige Unterstützer, sehr wenige Tanks, nur drei Heiler, alle drei in der Seltenheit Fein.
- Befund: `HEROES` hat 10 Schaden, 4 Unterstützer, 3 Tanks, 3 Heiler. Jeder Held existiert nur einmal. Kostenlose Helden aus den Aufträgen kommen als `RECRUIT.freeRarity` (2 = Fein) und werden danach nie wieder angeboten (`recruitPool` filtert Besessene). Bekommt man die Heiler per Auftrag, kann man sie also nie in besserer Seltenheit haben.
- Vorschlag:
  - Mehr Heiler und Tanks in `HEROES` (neue `id`s, bestehende nie ändern), damit die Rollen ungefähr gleich groß sind.
  - Die offene Frage aus „Geplant“ jetzt klären: Besessene Helden wieder anbieten, und eine bessere Seltenheit ersetzt die alte (Level bleibt). Alternative: Beförderung #033 hebt die Seltenheit.

### #043 Endgame-Schwierigkeit: Formel oder Handarbeit?
- **Status:** offen · **Quelle:** Entwickler, Gilde
- Ein Spieler hat alles geschafft (alle Bosse bis legendär, alles maximal ausgebaut). Also ist das Spätspiel schaffbar, aber danach gibt es nichts mehr zu tun.
- Idee: Nach der letzten Zone über eine Formel endlos weiter skalieren. Der Entwickler findet das eher langweilig.
- Vorschlag: Keine endlose Formel als Hauptinhalt. Lieber feste Inhalte mit Mechaniken (#042) und Erweiterungen (#044). Eine Formel höchstens als optionaler „endloser Riss“ mit Bestenliste in der Gilde. Dazu den offenen Balancing-Punkt aus `CLAUDE.md` angehen (Zonen 9–10, `F.monsterHp`, `F.monsterAtk`, `COMBAT.LEVEL_DIFF`): den Spieler fragen, wie lange er für schwer/legendär gebraucht hat.

### #047 Schwierigkeit insgesamt anheben
- **Status:** offen · **Quelle:** Gilde (ArgonautM)
- Rückmeldung: „Kein Profigamer“ und trotzdem alles locker nebenbei geschafft. Der Boss-Timer (90 s) kam für ihn zu spät, da hatte er fast alle Bosse schon geschafft. Lob: Das Spielprinzip ist gut, der verteilte Schaden macht es realistischer, die QOL-Verbesserungen gefallen.
- Vorschlag: Nicht nur das Endgame (#043), sondern die ganze Kurve prüfen. Zuerst die Überfluss-Quellen schließen (#045, #046), weil die den Rest leicht machen. Danach `F.monsterHp`, `F.monsterAtk` und `COMBAT.LEVEL_DIFF` nachziehen. Ziel festlegen: z. B. wie viele Tage bis Zone 6 und bis zum letzten legendären Boss.
- Hinweis: Bestehende Spielstände sind schon weit; bei härteren Zahlen nichts wegnehmen, nur künftige Erträge senken.

## Idee

### #048 Ätherscherben werden Orichalcum (nur aus Waffenverkauf, Aufwerten in der Zwergen-Schmiede)
- **Status:** offen · **Quelle:** Entwickler
- Entscheidung: 🔮 Ätherscherben fallen als Währung weg und verschwinden aus dem Kopfbereich. An ihre Stelle tritt **Orichalcum** als Material.
  - Man bekommt es **nur beim Verkaufen von Waffen** (Staffelung nach Güte aus #035: T3 1, T4 3, T5 8, T6 20 als Startwert).
  - Verwendung: **Waffen verbessern** in der **Zwergen-Schmiede**. Die wird eine neue **Stufe 4 der Charr-Schmiede** (heute endet sie bei Stufe 3, Gildenhalle 6) und bringt diese Funktion als Neuerung. Kosten und Bauzeit für Stufe 4 in `js/data/buildings.js` ergänzen, Gildenhallen-Voraussetzung z. B. 8.
  - Ziel des Verbesserns: Eine Waffe wird Stufe für Stufe mit Orichalcum aufgewertet, bis sie **seelengebunden** ist.
  - Entschieden (2026-11-07): **Seelengebunden ist eine neue Güte ★7** über ★6 Aufgestiegen. Man bekommt sie nur durch Verbessern in der Zwergen-Schmiede, nie im Laden oder als Beute.
    - `WEAPON_GRADES[7]` in `js/data/weapons.js` ergänzen (Name, eigene Farbe, `atk`/`hp` über ★6: 1,20 / 0,35).
    - Klären: Welche Güte kann man verbessern (nur ★6 → ★7, oder jede Güte eine Stufe hoch)? Wie viel Orichalcum je Schritt? Kann man eine ★7-Waffe verkaufen, und was bringt sie?
    - Alles prüfen, was über die Güten läuft (`WEAPON_GRADES`/`DROP_GRADES` in `config.js`, `progress.js`, `state.js`, `ui.js`, `manual.js`): Laden und Beute dürfen ★7 nicht würfeln, Anzeige und Sortierung müssen ★7 kennen.
    - Hinweis: In GW2 heißt die Stufe über Aufgestiegen „Legendär“; „seelengebunden“ ist dort eine Bindung. Als Name im Spiel trotzdem „Seelengebunden“ – passt zur Story mit Aurenes Speeren.
  - Vorbild aus der Story: die mit Aurenes Energie aufgeladenen Speere im Kampf gegen Kralkatorrik. Genaue Story-Stelle und Namen (Zwergen-Schmiede, Speer) gegen die DE-Wiki prüfen.
- Was heute an den Scherben hängt (alles umstellen):
  - Beute: Schergen-Chance und Boss-Scherben in `combat.js` (`shardFrac`, `bossShards`), Offline-Summen in `offline.js`, Kampf-Log und Offline-Bericht in `ui.js`.
  - Kosten: Riss-Portal (`PORTAL_SHARDS` in `buildingCost`, `state.js`) → nur noch Gold.
  - Belohnungen: fünf Aufträge in `QUESTS` geben 🔮 → auf 🟡 oder 📜 umstellen.
  - Forschung `shards` (Ätherresonator, Logistik) und `shardMult` mit Mystischer Schmiede `loot` → durch eine neue Forschung ersetzen (z. B. „+% Orichalcum beim Verkauf“).
  - Kopfbereich `#hud-shards`, `CURRENCIES.shards`, Handbuch (`MANUAL.md`, `manual.js`).
- Save: `state.shards` umrechnen (Vorschlag: 1 🔮 = X 🟡, oder 1:1 in Orichalcum als Startbestand), `shardFrac` löschen, Forschungsstufen von `shards` auf den neuen Knoten übertragen oder 📜 erstatten. `GAME.SAVE_VERSION` + Migration.
- Ersetzt #035 und den Scherben-Punkt aus #034. Spielt mit #030 (Waffen aufräumen) zusammen, das Verkaufen bekommt so einen Zweck über Gold hinaus.

### #044 Erweiterungen: Tyria als Grundspiel, danach die GW2-Story weiterspielen
- **Status:** offen · **Quelle:** Entwickler
- Idee: Der heutige Teil spielt in Tyria (Grundspiel). Erweiterungen werden im Spiel freigeschaltet („gekauft“, mit Spielwährung, kein Echtgeld) und erzählen die GW2-Story weiter, mit höheren Helden-Levelgrenzen und neuen Zonen.
- Vorschlag: Der Entwurf für Zonen 11–20 (`tools/data/zones-expansion.json`, Portal 5–8) wird die erste Erweiterung. Freischalten z. B. über den letzten Boss plus einen Preis. Die Erweiterung hebt `levelCap` an. Für das Save-Format: freigeschaltete Erweiterungen in `state` speichern (Save-Version + Migration).

### #035 Orichalcum zum Aufwerten von Waffen
- **Status:** zusammengelegt mit #048 (2026-11-07) · **Quelle:** Entwickler
- Idee: Später Waffen aufwerten (CQHT Forge, „Waffen-Modifikation“ steht schon als offen in `CLAUDE.md`). Dafür eine eigene Ressource **Orichalcum**, die es nur beim Verkaufen von Waffen ab T3 (Meisterwerk) gibt.
- Vorschlag: Menge nach Güte gestaffelt (T3 1, T4 3, T5 8, T6 20). Gibt dem „Aufräumen“ aus #030 einen Sinn über Gold hinaus. Zählt als Material, nicht als fünfte Währung im Kopfbereich (passt zu #034).

### #036 Proviant umbenennen
- **Status:** zurückgestellt (spätere Phase) · **Quelle:** Entwickler
- Idee: 🍞 Proviant (Güte 1–6) bekommt GW2-typische Namen.
- Vorschlag: Je Güte ein echtes GW2-Gericht aus der Koch-Disziplin, Namen gegen die DE-Wiki prüfen (wie bei den Gegnern). Daten in `RATIONS` (`js/data/specials.js`), Texte im Handbuch nachziehen.
