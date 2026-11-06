# Gebäude – Aetherbastion: Rift Watch

> Interne Entwicklungs-Referenz für **Aetherbastion: Rift Watch**. Erzeugt aus den Spieldaten in `js/data/`; maßgeblich ist immer der Code. Die Spalte *CQHT* nennt das Vorbild aus Crusaders Quest: Hero Town.

Gebaut wird immer **nur ein Gebäude gleichzeitig**. Kosten in 🪙 Gold.

## Übersicht: alle Ausbaukosten

Alles, was mit der jeweiligen Gildenhallen-Stufe baubar wird (Halle selbst, Gebäudestufen, neue Zelte), mit Summe und laufender Gesamtsumme. Das Riss-Portal kostet zusätzlich 🔮 Ätherscherben (5 / 15 / 40 / 100 für Stufe 2–5).

| Gildenhalle | Neu baubar (Kosten) | Summe | Gesamt |
| --- | --- | --- | --- |
| 1 | ⛺ Zeltlager 1 (500), 🌀 Riss-Portal 1 (600), 🔬 Asura-Labor 1 (250) | 1.350 | 1.350 |
| 2 | 🏛️ Halle 2 (200), ⛺ Zeltlager 2 (500), 🌀 Riss-Portal 2 (400), 🌀 Riss-Portal 3 (1.500), 🍲 Feldküche 1 (140), 🍲 Feldküche 2 (230), 🔬 Asura-Labor 2 (500), ⚒️ Charr-Schmiede 1 (200) | 3.670 | 5.020 |
| 3 | 🏛️ Halle 3 (1.000), ⛺ Zeltlager 3 (2.000), ⛺ Zeltlager 4 (5.000), 🌀 Riss-Portal 4 (3.000), 🍲 Feldküche 3 (360), 🔬 Asura-Labor 3 (1.000), ⚒️ Charr-Schmiede 2 (2.500), ⛺ Zelt 2 (1.500) | 16.360 | 21.380 |
| 4 | 🏛️ Halle 4 (2.000), ⛺ Zeltlager 5 (8.000), 🌀 Riss-Portal 5 (25.000), 🍲 Feldküche 4 (900), 🔬 Asura-Labor 4 (2.500) | 38.400 | 59.780 |
| 5 | 🏛️ Halle 5 (10.000), ⛺ Zeltlager 6 (15.000), 🍲 Feldküche 5 (3.000), 🔬 Asura-Labor 5 (5.000) | 33.000 | 92.780 |
| 6 | 🏛️ Halle 6 (20.000), ⛺ Zeltlager 7 (20.000), 🍲 Feldküche 6 (9.000), 🔬 Asura-Labor 6 (50.000), ⚒️ Charr-Schmiede 3 (10.000), ⛺ Zelt 3 (40.000) | 149.000 | 241.780 |
| 7 | 🏛️ Halle 7 (200.000), 🍲 Feldküche 7 (40.000), 🔬 Asura-Labor 7 (100.000), 🔬 Asura-Labor 8 (250.000) | 590.000 | 831.780 |
| 8 | 🏛️ Halle 8 (800.000), 🍲 Feldküche 8 (150.000), 🔬 Asura-Labor 9 (500.000) | 1.450.000 | 2.281.780 |
| 9 | 🏛️ Halle 9 (1.500.000), 🍲 Feldküche 9 (400.000), 🍲 Feldküche 10 (900.000), 🔬 Asura-Labor 10 (1.000.000), ⛺ Zelt 4 (900.000) | 4.700.000 | 6.981.780 |

| Gebäude | Stufen | Alle Stufen zusammen |
| --- | --- | --- |
| 🏛️ Gildenhalle | 9 | 2.533.200 |
| ⛺ Zeltlager | 7 | 51.000 |
| 🌀 Riss-Portal | 5 | 30.500 |
| 🍲 Feldküche | 10 | 1.503.630 |
| 🔬 Asura-Labor | 10 | 1.909.250 |
| ⚒️ Charr-Schmiede | 3 | 12.700 |
| ⛺ Zelte 2–4 | 3 | 941.500 |
| **Alles** |  | **6.981.780** |

## 🏛️ Gildenhalle

*CQHT: Town Hall · max. Stufe 9*

Herz des Lagers. Gildenkasse alle 10 Min., schaltet neue Gebäude frei.

> Hier hängen die Rekrutierungsaushänge der Gilde, und hier wird die Gildenkasse verwaltet. Die feierliche Stimmung hält genau so lange, bis die ersten Aufträge verteilt werden.

| Stufe | Gildenkasse / 10 Min. | Kosten | Bauzeit | Besiegte Stufen |
| --- | --- | --- | --- | --- |
| 1 | 100 | – | – | – |
| 2 | 250 | 200 | 1 Min. | 3 |
| 3 | 350 | 1.000 | 1 Min. 30 s | 9 |
| 4 | 450 | 2.000 | 2 Min. 30 s | 21 |
| 5 | 600 | 10.000 | 4 Min. | 29 |
| 6 | 750 | 20.000 | 10 Min. | 31 |
| 7 | 800 | 200.000 | 25 Min. | 40 |
| 8 | 1.000 | 800.000 | 30 Min. | 50 |
| 9 | 1.000 | 1.500.000 | 35 Min. | 50 |

**So funktioniert es:** Zahlt alle 10 Minuten die **Gildenkasse** aus und bestimmt, welche Stufen der anderen Gebäude gebaut werden dürfen. Jede Stufe verlangt eine Anzahl insgesamt besiegter Normal-Stufen. Zelt 2, 3 und 4 öffnen ab Stufe 3, 6 und 9; die Mystische Schmiede ab Stufe 5.

## ⛺ Zeltlager

*CQHT: Tent · max. Stufe 7 · ab Gildenhalle 1*

Bestimmt das Level-Cap aller Helden.

> Hier schlafen die Helden zwischen den Einsätzen. Dass Charr, Norn und Asura völlig unterschiedlich schnarchen, wissen nur die, die hier übernachtet haben.

| Stufe | Kosten | Bauzeit | Gildenhalle | Level-Cap |
| --- | --- | --- | --- | --- |
| 1 | 500 | – | 1 | Lv. 10 |
| 2 | 500 | 20 s | 2 | Lv. 20 |
| 3 | 2.000 | 1 Min. | 3 | Lv. 30 |
| 4 | 5.000 | 2 Min. | 3 | Lv. 40 |
| 5 | 8.000 | 3 Min. 20 s | 4 | Lv. 50 |
| 6 | 15.000 | 5 Min. | 5 | Lv. 55 |
| 7 | 20.000 | 8 Min. | 6 | Lv. 60 |

**So funktioniert es:** Gilt für das ganze Lager und bestimmt das **Level-Cap** aller Helden (bis Lv. 60). Die Trupps selbst sind die Zelte 1–4 mit je 3 Plätzen. *Geplant:* Erschöpfung – müde Helden ziehen sich kurz ins Zelt zurück.

## 🌀 Riss-Portal

*CQHT: Portal · max. Stufe 5 · ab Gildenhalle 1*

Stufe bestimmt die verfügbaren Riss-Zonen.

> Ein stabilisierter Kryptis-Riss. Gefährlich? Für die Wacht ist es der tägliche Arbeitsweg.

| Stufe | Kosten | Bauzeit | Gildenhalle |
| --- | --- | --- | --- |
| 1 | 600 | – | 1 |
| 2 | 400 | 30 s | 2 |
| 3 | 1.500 | 1 Min. | 2 |
| 4 | 3.000 | 2 Min. | 3 |
| 5 | 25.000 | 5 Min. | 4 |

**So funktioniert es:** Jede Stufe öffnet zwei weitere Riss-Zonen (Stufe 1 = Zonen 1–2 … Stufe 5 = Zonen 9–10). Kostet zusätzlich 🔮 Ätherscherben. Statt einzelner Monster wie in CQHT wählt jeder Trupp eine Stufe und farmt deren Schergen.

## 🍲 Feldküche

*CQHT: (eigen) · max. Stufe 10 · ab Gildenhalle 2*

+5 % EXP pro Stufe.

> Eintopf aus dem großen Kessel. Satte Helden lernen schneller.

| Stufe | Kosten | Bauzeit | Gildenhalle |
| --- | --- | --- | --- |
| 1 | 140 | 30 s | 2 |
| 2 | 230 | 45 s | 2 |
| 3 | 360 | 1 Min. | 3 |
| 4 | 900 | 2 Min. | 4 |
| 5 | 3.000 | 4 Min. | 5 |
| 6 | 9.000 | 8 Min. | 6 |
| 7 | 40.000 | 15 Min. | 7 |
| 8 | 150.000 | 20 Min. | 8 |
| 9 | 400.000 | 25 Min. | 9 |
| 10 | 900.000 | 30 Min. | 9 |

**So funktioniert es:** +5 % EXP pro Stufe für alle Helden. Eigene Ergänzung (die CQHT-Bäckerei-Daten fehlen). *Geplant:* Prüfung der Feldküche (Prüfung der Feldküche).

## 🔬 Asura-Labor

*CQHT: Skill Lab · max. Stufe 10 · ab Gildenhalle 1*

Forschung mit 🧪 Forschungspunkten. Höhere Stufen öffnen tiefere Forschung.

> Asura-Know-how für alle: Golemtechnik, Ätherkunde und Nebelphysik – egal woher das Wissen stammt, hier gehört es der ganzen Gilde.

| Stufe | Kosten | Bauzeit | Gildenhalle |
| --- | --- | --- | --- |
| 1 | 250 | – | 1 |
| 2 | 500 | 30 s | 2 |
| 3 | 1.000 | 1 Min. | 3 |
| 4 | 2.500 | 2 Min. | 4 |
| 5 | 5.000 | 6 Min. | 5 |
| 6 | 50.000 | 15 Min. | 6 |
| 7 | 100.000 | 20 Min. | 7 |
| 8 | 250.000 | 25 Min. | 7 |
| 9 | 500.000 | 30 Min. | 8 |
| 10 | 1.000.000 | 35 Min. | 9 |

**So funktioniert es:** Forschung mit 🧪 Forschungspunkten in drei Bäumen (Offensive, Defensive, Logistik). Stufe 3 öffnet Forschungsstufe II, Stufe 5 Stufe III.

## ⚒️ Charr-Schmiede

*CQHT: Smithy · max. Stufe 3 · ab Gildenhalle 2*

Waffenladen (3 Angebote, alle 30 Min. neu) und Waffenkammer. Stufe öffnet bessere Waffen.

> Charr-Stahl, Norn-Eisen und Asura-Legierungen werden auf diesem Amboss zu einer einzigen Waffe.

| Stufe | Kosten | Bauzeit | Gildenhalle |
| --- | --- | --- | --- |
| 1 | 200 | – | 2 |
| 2 | 2.500 | 1 Min. | 3 |
| 3 | 10.000 | 5 Min. | 6 |

**So funktioniert es:** Waffenladen mit 3 Angeboten, alle 30 Minuten neu; „Ware auffrischen“ kostet 100 Gold und verdoppelt sich bis zum nächsten Auffüllen. Dazu die Waffenkammer (Ausrüsten, Verkaufen zu 25 %). Höhere Stufen bringen bessere Ware. *Geplant:* Waffen-Modifikation (CQHT Forge).

## ⛩️ Heiligtum der Nebel *(geplant)*

*CQHT: Sanctuary of Souls · max. Stufe 1 · Kosten 1.000*

Öffnet die **Kryptis-Seelenfeste**: ein dreiphasiger Kampf gegen den Seelenfürsten. Belohnt Nebelkristall-Staub, -Splitter und Nebelkristalle für besondere Waffen.

> Als das Siegel brüchig wurde, errichtete die Gilde am Rand des Lagers ein Heiligtum – aus Steinen einer eingestürzten Gedenkhalle. Das Gebäude ist neu und trägt doch alte Narben.
