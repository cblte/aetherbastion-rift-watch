# UI-Redesign (#041, #055, #056, #058) – Bestandsaufnahme und Entwurf

Stand: v0.40.0, geprüft im Browser auf 440 × 860 px mit einem Test-Spielstand (Halle 4, 3 Zelte, 14 Helden, Zone 2).
Klickbare Mockups: [`ui-redesign-mockup.html`](ui-redesign-mockup.html) (direkt im Browser öffnen, läuft ohne Server).

## 1. Bestandsaufnahme

### Fester Rahmen (auf jedem Bildschirm)

| Teil | Höhe | Inhalt |
|---|---|---|
| Kopfzeile `#hud` | 50 px | 🟡 Gold, 🔮 Scherben, 🍀 Klee, ⛺ Level-Cap, 🛡️ aktive Helden, ⚙️ |
| Auftrag `#quest` | **207 px** (aufgeklappt) | Auftragstext, Fortschrittsbalken, „Weiter“-Knopf |
| Navigation `#tabs` | 79 px | 6 Reiter + Build-Zeile |
| **Rest für den Bildschirm** | **513 px** | = 60 % der Höhe |

Der Auftrag frisst aufgeklappt fast so viel wie die Arena. Level-Cap und Heldenzahl braucht man selten im Kopf (gehören ins Lager bzw. zu den Trupps).

### Inhaltshöhe je Bildschirm (scrollHeight bei 513 px sichtbar)

| Bildschirm | Höhe | Faktor | Was steht dort |
|---|---|---|---|
| 🌀 Portal | 1 493 px | 2,9× | Arena (Zelt-Wechsel, Gegner, 3 Helden), Boss-Karte, Trupp-Karten, Zonen-Reiter, Stufenliste mit Lore, Portal-Ausbau, **Kampf-Chronik** |
| 🏛️ Lager | 919 px | 1,8× | Statistik (Siege/Stufen/Ruhestand), Gildenkasse-Timer, 6 Gebäudekarten |
| 🛡️ Trupps | 1 985 px | 3,9× | Je Zelt 3 große Heldenkarten + Werte-Fuß, gesperrte Zelte, Reserve, Rekrutieren |
| 🎒 Inventar | ~1× | – | Proviant, Waffenkammer (wächst mit Beute) |
| 🔬 Labor | **3 842 px** | 7,5× | Kopf mit Erklärtext, 5 Bäume untereinander, jeder Knoten eine volle Karte |
| ⚒️ Schmiede | 665 px+ | 1,3× | Laden-Timer, Angebote, Auffrischen, Waffenkammer, Mystische Schmiede |
| ⚙️ Einstellungen | Modal | – | Handbuch, Changelog, Vibration, Export/Import, Debug, Reset |

### Ständig gebraucht vs. selten

| Bildschirm | Ständig | Selten |
|---|---|---|
| Kopf | Gold, Scherben | Klee (nur Mystische Schmiede/Neuwürfeln), Level-Cap, Heldenzahl |
| Portal | Arena des gewählten Zelts, Boss-Knopf, Zelt-Wechsel | Zonen-/Stufenwahl (nach einem Boss-Sieg), Lore-Text, Portal-Ausbau, Chronik |
| Lager | Laufender Bau, nächster bezahlbarer Ausbau, Gildenkasse-Timer | Statistik, Erklärtexte der Gebäude, maximal ausgebaute Gebäude |
| Trupps | Wer steht wo, Verletzte, Werte-Kurzform | Volle Heldenkarten, Reserve-Liste (nur beim Tauschen), Rekrutieren (alle paar Minuten) |
| Labor | Laufende Forschung, was ist jetzt erforschbar | Gesperrte/maximale Knoten, Erklärtext zu den Ebenen |
| Schmiede | Angebote, Timer | Mystische Schmiede (selten, eigener Bereich), Waffenkammer (doppelt mit Inventar) |

### Auffälligkeiten
- **Doppelte Inhalte:** Waffenkammer steht in Schmiede *und* Inventar; Portal-Ausbau im Portal *und* im Lager.
- **Chronik** (#055) steht ganz unten im Portal, ~1 400 px tief – praktisch nie sichtbar.
- **Farben:** Dunkelblau/Violett überall (`--bg #0c0e16`, `--aether #8f7bff` als Primärknopf). Violett ist damit „normal“, nicht mehr besonders. Jeder Reiter hat eine eigene Akzentfarbe → bunt, aber ohne Ordnung.
- 6 Reiter + Build-Zeile = 79 px; die Build-Zeile könnte in die Einstellungen.

## 2. Leitlinien

1. **Bildschirm = feste Fläche.** `#view` scrollt nicht; scrollen dürfen nur ausgewiesene Listen (`.scroll-list`, mit sichtbarem Rand oben/unten).
2. **Kopf schlank:** Gold + Scherben immer, Klee nur wenn > 0 *und* Mystische Schmiede offen. Level-Cap → Lager, Heldenzahl → Trupps.
3. **Auftrag als Einzeiler** (44 px): Icon, Kurztext, Fortschritt als dünne Linie; Tipp öffnet ein Modal. Nur wenn „erfüllt“, wird die Zeile golden mit „Abholen“.
4. **Unter-Tabs statt Abschnitte** untereinander (Segment-Leiste, 44 px hoch).
5. **Selten Genutztes ins Modal** (Chronik, Zonenwahl, Statistik, Mystische Schmiede-Details).
6. **Eine Akzentfarbe (Gold)** für Aktionen; Ätherviolett nur für Riss/Portal/Kryptis; Reiter-Farben entfallen.

## 3. Vorschlag je Bildschirm

### Kopf + Auftrag (alle Bildschirme) → 50 + 44 px statt 50 + 207
- Chips: 🟡 Gold · 🔮 Scherben · (🍀 Klee) · ⚙️. Rest raus.
- Auftrag als Einzeiler `📜 5/27 Verstärkung: Heilung ›` mit 2-px-Fortschrittslinie. Erfüllt → goldener Knopf „Abholen“ in derselben Zeile. Tipp auf den Text → Modal mit vollem Text.
- Im Tutorial (Onboarding < 5) bleibt der große Auftrag, weil er dort führt.
- **Gewinn: ~160 px** für jeden Bildschirm.

### 🌀 Portal → passt in eine Höhe
- Oben: Zelt-Leiste (die bisherigen Trupp-Karten, kompakt als Pillen `⛺1 ⚔️ ⛺2 👑 ⛺3 🏕️ 🔒4`), ersetzt die ‹ ›-Pfeile.
- Arena wie bisher (Gegner + 3 Helden), etwas flacher.
- Boss-Karte (Nutzer-Entscheidung): Zeile 1 Name + Lv. + Status, Zeile 2 Beute, darunter die Knöpfe nebeneinander – „Herausfordern“ 2/3 breit, „🔁 Auto“ 1/3. Hauptknöpfe in Bronze (`#8a5a22`→`#6b4217`, heller Text, Gold-Rand) statt Gold-Fläche, damit 🟡 und Text darauf lesbar sind.
- **Zone/Stufe** als ein Knopf `🗺️ Königintal · Stufe 1 ▾` → Modal mit Zonen-Reitern und Stufenliste (die Liste scrollt im Modal). Lore-Text und Portal-Ausbau stehen dort.
- **Chronik (#055):** letzte Zeile als Einzeiler unter der Arena, 📜-Knopf öffnet das Modal (läuft live mit, `refresh`).
- Portal-Ausbau nur noch im Lager.

### 🏛️ Lager → Liste kompakter Zeilen
- Kopf: Gildenkasse-Timer + laufender Bau (falls einer) als eine Karte.
- Gebäude als kompakte Zeilen (Icon, Name, Stufe, Kurzwirkung, Knopf). Beschreibung und „Was schaltet die nächste Stufe frei“ erst beim Tipp (Aufklappen).
- Statistik (Siege/Stufen/Ruhestand) und Level-Cap wandern in eine 📊-Karte zum Aufklappen oder ins Modal.
- Die Gebäudeliste ist die einzige scrollende Liste (6 Zeilen à ~64 px = passt meist ohne Scrollen).

### 🛡️ Trupps → Unter-Tabs „Zelte | Reserve | Anwerben“
- **Zelte:** ein Zelt pro Zeile, die 3 Helden als kleine Porträts nebeneinander (wie die Arena), Werte-Fuß einzeilig. 4 Zelte passen auf einen Bildschirm. Tipp auf Held → Helden-Modal wie bisher.
- **Reserve:** scrollende Liste, sortierbar (Level/Rolle).
- **Anwerben:** Rekruten-Angebote + Erneuern; Badge am Unter-Tab, wenn ein neues Angebot da ist.
- Heldenzahl `9/12` steht im Unter-Tab-Kopf.

### 🎒 Inventar → Unter-Tabs „Proviant | Waffen“
- Die Waffenkammer lebt nur noch hier (Schmiede verlinkt per „Zur Waffenkammer“).
- Beide Listen scrollen.

### 🔬 Labor → ein Baum zur Zeit
- Oben feste Karte: laufende Forschung mit Timer (oder „Nichts läuft – wähle eine Forschung“).
- Darunter Baum-Reiter (⚔️ Angriff, 🛡️ Abwehr, ❤ Leben, ⏱ Tempo, 🌀 Erweitert) als Segment-Leiste.
- Knoten als kompakte Zeilen (Name, Pips, Wirkung → nächste, Knopf). Gesperrte Ebenen zusammengefasst als eine Zeile „🔒 Ebene III ab Labor 6“.
- Erklärtext zu den Ebenen → ⓘ-Knopf.
- **Gewinn:** 3 842 px → eine Liste von ~6–10 Zeilen je Baum.

### ⚒️ Schmiede → Unter-Tabs „Charr-Schmiede | Mystische Schmiede“
- Charr: Timer + Angebote (3–4 Zeilen) + Auffrischen. Passt ohne Scrollen.
- Mystisch: Ruhestand-Karte + Boni; gesperrt → ein Satz.
- Waffenkammer raus (nur noch Inventar).

### ⚙️ Einstellungen
- Bleibt Modal. Build-Zeile aus der Navigation hierher → Navigation 64 px statt 79 px.

### Platzbilanz (440 × 860)

| | heute | neu |
|---|---|---|
| Kopf + Auftrag | 257 px | 94 px |
| Navigation | 79 px | 64 px |
| Bildschirm | 513 px | **~700 px** |

## 4. Farbentwurf (#058)

Warme Grundtöne (dunkles Leder/Holzkohle statt Nachtblau), Gold als einziger Aktionsakzent, Ätherviolett nur für Riss, Portal, Kryptis und 🔮. Kräftigere Rollen-Farben. Alles über die bestehenden CSS-Variablen; die Reiter-Akzente (`--tab-*`) entfallen.

```css
:root {
  /* Grund: warmes Dunkelbraun */
  --bg: #17120d;        --bg-2: #1f1811;
  --panel: #2a2017;     --panel-2: #352819;
  --line: #4a3a28;
  --text: #f1e6d2;      --muted: #b09c80;   /* Pergament-Ton */
  /* Akzent: Gold */
  --gold: #e8b64c;      --gold-2: #c8902e;  /* Knöpfe, Auswahl, Rahmen */
  --accent: var(--gold);
  /* Äther nur für Riss/Portal/Kryptis */
  --aether: #9b7bff;    --aether-2: #6ad3e8;
  /* Zustände */
  --good: #7cc96a;      --bad: #e0574a;     --warn: #f0a040;
  /* Rollen (kräftiger, auf warmem Grund gut lesbar) */
  --role-tank: #4f9be8; --role-heal: #5fd08a;
  --role-dps: #e8604a;  --role-sup: #e0b040;
}
```

**Entscheidung:** Mehrere Schemata kommen ins Spiel, wählbar unter ⚙️ Einstellungen → 🎨 Farbschema: *Lagerfeuer* (Dunkelbraun), *Tyria* (**Standard**, an die GW2-Oberfläche angelehnt: Anthrazit `#121212`/`#1e1e20`, Creme-Schrift `#e8e2d4`, Hauptknöpfe Dunkelrot `#a82020`→`#7a1414`, Auswahl-Kante rot, Gold nur für Währung/Überschriften, Rollenfarben aus den GW2-Seltenheiten), *Nebel* (das heutige Nachtblau). Verworfen: Schiefergrün (passt nicht zu Gold), Pergament hell (wirkt komisch). Umsetzung: `data-theme` am `#app`, je Schema ein Block mit den Grundfarben; Wahl in `state.settings.theme` (fehlt der Wert → Tyria, keine Migration nötig). Gold bleibt in allen Schemata der Aktionsakzent.


Kontraste: `--text` auf `--panel` ≈ 12:1, `--muted` auf `--panel` ≈ 5,5:1, Gold-Knopf mit Text `#1f1811` ≈ 9:1.

## 5. Reihenfolge der Umsetzung

Jeder Schritt ist eine eigene Version (Patch/Minor nach CLAUDE.md), damit die Gilde zwischendurch spielen kann:

1. **Farben (#058)** – nur `:root` + Primärknöpfe/Reiter-Akzente. Klein, sichtbar, kein Risiko. *(Minor)*
2. **Kopf + Auftrag-Einzeiler (#041)** – bringt jedem Bildschirm ~160 px. *(Minor)*
3. **Chronik als 📜-Modal (#055)** + Zonenwahl als Modal → Portal ohne Scrollen. *(Minor)*
4. **Unter-Tabs als Baustein** (`.subtabs`, Zustand je Reiter im UI-Modul, nicht im Spielstand) + Trupps (Zelte/Reserve/Anwerben). *(Minor)*
5. **Labor** (Baum-Reiter, kompakte Knoten). *(Minor)*
6. **Schmiede/Inventar** (Waffenkammer nur im Inventar, Mystische Schmiede als Unter-Tab). *(Minor)*
7. **Lager** (kompakte Gebäudezeilen, Statistik aufklappbar) und `#view` endgültig `overflow: hidden` + `.scroll-list` (#056). *(Minor)*

Hinweis: Die Balancing-Sitzung (#026/#061/#062) ändert parallel `js/ui.js`/`css/style.css`. Schritt 1 ist fast konfliktfrei; ab Schritt 2 vorher auf `main` rebasen.

## Offene Fragen an den Nutzer
- Dunkelbraun (Entwurf A) oder dunkles Nachtgrün/Schiefer mit Gold (Entwurf B, im Mockup umschaltbar)?
- Trupps: Unter-Tabs (Entwurf) oder alles auf einer Seite mit aufklappbarer Reserve/Anwerben?
- Auftrag: Einzeiler auch im Tutorial oder dort groß lassen?
