# Riss-Zonen & Stufen – Aetherbastion: Rift Watch

> Interne Entwicklungs-Referenz für **Aetherbastion: Rift Watch**. Erzeugt aus den Spieldaten in `js/data/`; maßgeblich ist immer der Code. Die Spalte *CQHT* nennt das Vorbild aus Crusaders Quest: Hero Town.

10 Zonen; je zwei teilen sich ein CQHT-Kapitel (*tier*). Pro Zone 5 normale Stufen, dann ☠️ schwere und in jeder zweiten Zone eine ⭐ legendäre. **Kosten** = Gold für eine Boss-Herausforderung. **Belohnung** = 🧪 Forschungspunkte, ⚒️ Waffen, 🍞 Proviant, 🎟️ Arena-Tickets (noch ohne Funktion).

| # | Zone | Portal | Kapitel | Lv. (normal) |
| --- | --- | --- | --- | --- |
| 1 | Königintal | 1 | 1 (1. Hälfte) | 3–10 |
| 2 | Caudecus’ Anwesen | 1 | 1 (2. Hälfte) | 12–20 |
| 3 | Wanderer-Hügel | 2 | 2 (1. Hälfte) | 22–29 |
| 4 | Zittergipfel | 2 | 2 (2. Hälfte) | 31–40 |
| 5 | Elon-Flusslande | 3 | 3 (1. Hälfte) | 41–45 |
| 6 | Kristallwüste | 3 | 3 (2. Hälfte) | 46–50 |
| 7 | Maguuma-Dschungel | 4 | 4 (1. Hälfte) | 51–55 |
| 8 | Silberwüste | 4 | 4 (2. Hälfte) | 56–60 |
| 9 | Rand der Nebel | 5 | 5 (1. Hälfte) | 60 |
| 10 | Die Nebel | 5 | 5 (2. Hälfte) | 60 |

## 1. Königintal

*Ein Riss öffnet sich über dem Königintal bei Beetletun. Banditen und Separatisten nutzen das Chaos.*

| Stufe | Boss | Schergen | Lv. | Kosten | 🧪 | ⚒️ | 🍞 | 🎟️ | CQHT |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | Tür-Wache | Banditen-Beutelschneider, Banditen-Schläger | 3 | 50 | 1 | 1 | 1 | 0 | 1-1 · Emperor Slime |
| 2 | Tür-Wache | Banditen-Beutelschneider, Banditen-Schläger | 5 | 60 | 1 | 1 | 1 | 0 | 1-2 · Emperor Slime |
| 3 | Tür-Wache | Banditen-Beutelschneider, Banditen-Schläger | 6 | 70 | 1 | 1 | 1 | 0 | 1-3 · Emperor Slime |
| 4 | Separatisten-Leutnant | Separatisten-Bomber, Separatisten-Feldwebel | 8 | 80 | 1 | 1 | 2 | 0 | 1-4 · Elite Goblin W. |
| 5 | Separatisten-Leutnant | Separatisten-Bomber, Separatisten-Feldwebel | 10 | 90 | 1 | 1 | 2 | 0 | 1-5 · Elite Goblin W. |
| ☠️ 6 | Delilah | Banditen-Bomber, Banditen-Brandstifter | 60 | 1.200 | 10–20 | 1 | 5 | 1 | Hard 1-1 · Cursed Emperor Slime |
| ☠️ 7 | Treffsicherer Seamus | Banditen-Scharfschütze, Banditen-Fallensteller | 60 | 1.400 | 11–21 | 1 | 5 | 1 | Hard 1-2 · Cursed Elite Goblin Warrior |

## 2. Caudecus’ Anwesen

*Die Spur führt in Caudecus’ Anwesen. Hauptmann DeLana und Wahlen verschanzen sich hinter einem vom Riss geladenen Golem.*

| Stufe | Boss | Schergen | Lv. | Kosten | 🧪 | ⚒️ | 🍞 | 🎟️ | CQHT |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | Hauptmann DeLana | Separatisten-Kämpfer, Separatisten-Scharfschütze | 12 | 100 | 1–2 | 1 | 2 | 0 | 1-6 · Ogre |
| 2 | Hauptmann DeLana | Separatisten-Kämpfer, Separatisten-Scharfschütze | 14 | 110 | 1–2 | 1 | 2 | 0 | 1-7 · Ogre |
| 3 | Wahlen | Banditen-Vollstrecker, Banditen-Kanonier | 16 | 120 | 1–2 | 1 | 3 | 0 | 1-8 · Raging Ogre |
| 4 | Wahlen | Banditen-Vollstrecker, Banditen-Kanonier | 18 | 130 | 1–2 | 1 | 3 | 0 | 1-9 · Raging Ogre |
| 5 | Prototyp-Golem | Defekter Wachgolem, Kryptis-Splitter | 20 | 150 | 1–2 | 1 | 3 | 0 | 1-10 · Golem |
| ☠️ 6 | Frost | Banditen-Raketengeschütz, Kryptis-Plünderer | 60 | 1.600 | 12–22 | 2 | 6 | 1–2 | Hard 1-3 · Mighty Ogre |
| ☠️ 7 | Jagdhund | Abgerichteter Wachhund, Kryptis-Peiniger | 60 | 1.800 | 13–23 | 2 | 6 | 1–2 | Hard 1-4 · Ogre Elite Fighter |
| ⭐ 8 | Kryptis-Golem | Kryptis-Wachgolem, Kryptis-Splitter | 60 | 5.000 | 50–62 | 3 | 10 | 1–4 | L-1 · Dark Golem |

## 3. Wanderer-Hügel

*Eisige Winde über den Wanderer-Hügeln. Söhne des Svanir und Grawl beten den Riss an.*

| Stufe | Boss | Schergen | Lv. | Kosten | 🧪 | ⚒️ | 🍞 | 🎟️ | CQHT |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | Svanir-Schamane | Sohn des Svanir, Eiswolf | 22 | 100 | 1–2 | 1 | 1 | 1 | 2-1 · Hard Mudman |
| 2 | Svanir-Schamane | Sohn des Svanir, Eiswolf | 24 | 120 | 1–2 | 1 | 1 | 1 | 2-2 · Hard Mudman |
| 3 | Svanir-Schamane | Sohn des Svanir, Eiswolf | 25 | 140 | 1–2 | 1 | 1 | 1 | 2-3 · Hard Mudman |
| 4 | Grawl-Oberschamane | Grawl-Krieger, Grawl-Schamane | 27 | 160 | 1–3 | 1 | 2 | 1 | 2-4 · Pharaoh Mummy |
| 5 | Grawl-Oberschamane | Grawl-Krieger, Grawl-Schamane | 29 | 180 | 1–3 | 1 | 2 | 1 | 2-5 · Pharaoh Mummy |
| ☠️ 6 | Verderbter Svanir-Schamane | Sohn des Svanir, Eiswolf | 60 | 2.000 | 14–24 | 2 | 6 | 1–2 | Hard 2-1 · Emperor Mudman |
| ☠️ 7 | Verderbter Grawl-Oberschamane | Grawl-Krieger, Grawl-Schamane | 60 | 2.200 | 15–25 | 2 | 6 | 1–2 | Hard 2-2 · Ancient Pharaoh Mummy |

## 4. Zittergipfel

*Höher in den Zittergipfeln wittert Jormags Eisbrut die Risse.*

| Stufe | Boss | Schergen | Lv. | Kosten | 🧪 | ⚒️ | 🍞 | 🎟️ | CQHT |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | Svanir-Häuptling | Svanir-Berserker, Eisbrut-Elementar | 31 | 200 | 1–3 | 1 | 2 | 1 | 2-6 · Basilisk |
| 2 | Svanir-Häuptling | Svanir-Berserker, Eisbrut-Elementar | 33 | 220 | 1–3 | 1 | 2 | 1 | 2-7 · Basilisk |
| 3 | Eisbrut-Koloss | Eisbrut-Diener, Kryptis-Frostjäger | 35 | 240 | 1–3 | 1 | 3 | 1 | 2-8 · Huge Basilisk |
| 4 | Eisbrut-Koloss | Eisbrut-Diener, Kryptis-Frostjäger | 37 | 260 | 1–3 | 1 | 3 | 1 | 2-9 · Huge Basilisk |
| 5 | Klaue Jormags | Eisbrut-Wyrmling, Gefrorener Kryptis | 40 | 300 | 1–3 | 1 | 3 | 1 | 2-10 · Sandworm |
| ☠️ 6 | Verderbter Svanir-Häuptling | Svanir-Berserker, Eisbrut-Elementar | 60 | 2.400 | 16–27 | 2 | 7 | 1–2 | Hard 2-3 · Red Basilisk |
| ☠️ 7 | Verderbter Eisbrut-Koloss | Eisbrut-Diener, Kryptis-Frostjäger | 60 | 2.600 | 17–28 | 2 | 7 | 1–2 | Hard 2-4 · Cataclysm Basilisk |
| ⭐ 8 | Schatten: Klaue Jormags | Eisbrut-Wyrmling, Gefrorener Kryptis | 60 | 5.000 | 55–67 | 4 | 11 | 1–4 | L-2 · Dark Sandworm |

## 5. Elon-Flusslande

*Am Ufer des Elon erheben sich die Erweckten – angelockt vom Riss.*

| Stufe | Boss | Schergen | Lv. | Kosten | 🧪 | ⚒️ | 🍞 | 🎟️ | CQHT |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | Erweckter Hauptmann | Erweckter Soldat, Erweckter Bogenschütze | 41 | 200 | 1–3 | 1 | 1 | 1 | 3-1 · Monster Anglerfish |
| 2 | Erweckter Hauptmann | Erweckter Soldat, Erweckter Bogenschütze | 42 | 240 | 1–3 | 1 | 1 | 1 | 3-2 · Monster Anglerfish |
| 3 | Erweckter Hauptmann | Erweckter Soldat, Erweckter Bogenschütze | 43 | 280 | 1–3 | 1 | 1 | 1 | 3-3 · Monster Anglerfish |
| 4 | Erweckter Pharao | Erweckter Priester, Sandhai | 44 | 320 | 1–3 | 1 | 2 | 1 | 3-4 · Black Starfish |
| 5 | Erweckter Pharao | Erweckter Priester, Sandhai | 45 | 360 | 1–3 | 1 | 2 | 1 | 3-5 · Black Starfish |
| ☠️ 6 | Verderbt: Erweckter Hauptmann | Erweckter Soldat, Erweckter Bogenschütze | 60 | 2.800 | 18–28 | 2 | 7 | 1–2 | Hard 3-1 · Cursed Monster Angler |
| ☠️ 7 | Verderbt: Erweckter Pharao | Erweckter Priester, Sandhai | 60 | 3.000 | 19–30 | 2 | 7 | 1–2 | Hard 3-2 · Cursed Blackstar |

## 6. Kristallwüste

*Tiefer in der Kristallwüste warten Hydren, Gebrandmarkte und der Sand selbst.*

| Stufe | Boss | Schergen | Lv. | Kosten | 🧪 | ⚒️ | 🍞 | 🎟️ | CQHT |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | Wüsten-Hydra | Hydra-Brut, Kristall-Skarabäus | 46 | 400 | 1–3 | 1 | 2 | 1 | 3-6 · Shark Warrior |
| 2 | Wüsten-Hydra | Hydra-Brut, Kristall-Skarabäus | 47 | 440 | 2–3 | 1 | 2 | 1 | 3-7 · Shark Warrior |
| 3 | Gebrandmarkter Koloss | Gebrandmarkter Krieger, Kryptis-Plünderer | 48 | 480 | 2–3 | 1 | 3 | 1 | 3-8 · EliteShark W. |
| 4 | Gebrandmarkter Koloss | Gebrandmarkter Krieger, Kryptis-Plünderer | 49 | 520 | 2–3 | 1 | 3 | 1 | 3-9 · EliteShark W. |
| 5 | Riesiger Sandwurm | Junger Sandwurm, Sandsturm-Elementar | 50 | 600 | 2–3 | 1 | 3 | 1 | 3-10 · Kraken |
| ☠️ 6 | Verderbt: Wüsten-Hydra | Hydra-Brut, Kristall-Skarabäus | 60 | 3.200 | 20–31 | 2 | 8 | 1–3 | Hard 3-3 · Mighty Shark Warrior |
| ☠️ 7 | Verderbter Gebrandmarkter Koloss | Gebrandmarkter Krieger, Kryptis-Plünderer | 60 | 3.400 | 21–33 | 2 | 8 | 1–3 | Hard 3-4 · Mighty Elite Shark Warrior |
| ⭐ 8 | Schatten: Riesiger Sandwurm | Junger Sandwurm, Sandsturm-Elementar | 60 | 5.000 | 60–71 | 4 | 11 | 1–5 | L-3 · Dark Kraken |

## 7. Maguuma-Dschungel

*Der Dschungel lebt: Raptoren und Chak drängen aus dem Unterholz zum Riss.*

| Stufe | Boss | Schergen | Lv. | Kosten | 🧪 | ⚒️ | 🍞 | 🎟️ | CQHT |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | Raptor-Rudelführer | Dschungel-Raptor, Kryptis-Lauerer | 51 | 400 | 2–4 | 1 | 1 | 1 | 4-1 · Hell Squishy |
| 2 | Raptor-Rudelführer | Dschungel-Raptor, Kryptis-Lauerer | 52 | 450 | 2–4 | 1 | 1 | 1 | 4-2 · Hell Squishy |
| 3 | Raptor-Rudelführer | Dschungel-Raptor, Kryptis-Lauerer | 53 | 500 | 2–4 | 1 | 1 | 1 | 4-3 · Hell Squishy |
| 4 | Chak-Gerent | Chak-Arbeiter, Chak-Säurespucker | 54 | 550 | 2–4 | 1 | 2 | 1 | 4-4 · Hellfire Spirit |
| 5 | Chak-Gerent | Chak-Arbeiter, Chak-Säurespucker | 55 | 600 | 2–4 | 1 | 2 | 1 | 4-5 · Hellfire Spirit |
| ☠️ 6 | Verderbter Raptor-Rudelführer | Dschungel-Raptor, Kryptis-Lauerer | 60 | 3.600 | 22–33 | 2 | 8 | 1–3 | Hard 4-1 · Volcano Sludge |
| ☠️ 7 | Verderbter Chak-Gerent | Chak-Arbeiter, Chak-Säurespucker | 60 | 3.800 | 23–35 | 2 | 8 | 1–3 | Hard 4-2 · Cursed Hellfire Spirit |

## 8. Silberwüste

*In der Silberwüste greifen die Mordrem-Ranken nach jedem Riss.*

| Stufe | Boss | Schergen | Lv. | Kosten | 🧪 | ⚒️ | 🍞 | 🎟️ | CQHT |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | Mordrem-Teragriff | Mordrem-Ranke, Mordrem-Wolf | 56 | 650 | 2–4 | 1 | 2 | 1 | 4-6 · Stone Giant |
| 2 | Mordrem-Teragriff | Mordrem-Ranke, Mordrem-Wolf | 57 | 700 | 2–4 | 1 | 2 | 1 | 4-7 · Stone Giant |
| 3 | Mordrem-Wächter | Mordrem-Soldat, Mordrem-Schnitter | 58 | 750 | 3–4 | 1 | 3 | 1 | 4-8 · Darkfire Giant |
| 4 | Mordrem-Wächter | Mordrem-Soldat, Mordrem-Schnitter | 59 | 800 | 3–4 | 1 | 3 | 1 | 4-9 · Darkfire Giant |
| 5 | Mordrem-Rankenzorn | Dornenranke, Mordrem-Schrecken | 60 | 1.000 | 3–4 | 1 | 3 | 1 | 4-10 · Dragon |
| ☠️ 6 | Verderbt: Mordrem-Teragriff | Mordrem-Ranke, Mordrem-Wolf | 60 | 4.000 | 25–38 | 3 | 9 | 1–3 | Hard 4-3 · Corrupted Rock Giant |
| ☠️ 7 | Verderbt: Mordrem-Wächter | Mordrem-Soldat, Mordrem-Schnitter | 60 | 4.200 | 26–40 | 3 | 9 | 1–3 | Hard 4-4 · Cursed Darkflame Giant |
| ⭐ 8 | Schatten: Mordrem-Rankenzorn | Dornenranke, Mordrem-Schrecken | 60 | 5.000 | 65–76 | 5 | 12 | 1–5 | L-4 · Dark Dragon |

## 9. Rand der Nebel

*Am Rand der Nebel verschwimmt die Welt. Phantome und die ersten Kryptis-Dämonen lauern.*

| Stufe | Boss | Schergen | Lv. | Kosten | 🧪 | ⚒️ | 🍞 | 🎟️ | CQHT |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | Phantom-Fürst | Nebel-Phantom, Kryptis-Splitter | 60 | 1.200 | 4–5 | 1 | 4 | 1 | 5-1 · Pyro Droid DX |
| 2 | Phantom-Fürst | Nebel-Phantom, Kryptis-Splitter | 60 | 1.400 | 4–5 | 1 | 4 | 1 | 5-2 · Pyro Droid DX |
| 3 | Phantom-Fürst | Nebel-Phantom, Kryptis-Splitter | 60 | 1.600 | 5–6 | 1 | 4 | 1 | 5-3 · Pyro Droid DX |
| 4 | Kryptis-Verschlinger | Kryptis-Dämon, Kryptis-Peiniger | 60 | 1.800 | 5–6 | 1 | 4 | 1 | 5-4 · Gatling Droid DX |
| 5 | Kryptis-Verschlinger | Kryptis-Dämon, Kryptis-Peiniger | 60 | 2.000 | 5–7 | 1 | 4 | 1 | 5-5 · Gatling Droid DX |
| ☠️ 6 | Verderbt: Phantom-Fürst | Nebel-Phantom, Kryptis-Splitter | 60 | 4.400 | 30–42 | 3 | 9 | 1–3 | Hard 5-1 · Cursed Pyro Droid DX |
| ☠️ 7 | Verderbt: Kryptis-Verschlinger | Kryptis-Dämon, Kryptis-Peiniger | 60 | 4.600 | 35–46 | 3 | 9 | 1–4 | Hard 5-2 · Cursed Gatling Droid DX |

## 10. Die Nebel

*Hinter dem letzten Riss: die Nebel selbst – und das Heer der Kryptis.*

| Stufe | Boss | Schergen | Lv. | Kosten | 🧪 | ⚒️ | 🍞 | 🎟️ | CQHT |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | Kryptis-Risshüter | Kryptis-Schildträger, Kryptis-Seher | 60 | 2.200 | 6–7 | 1 | 5 | 1 | 5-6 · Titan Rocket |
| 2 | Kryptis-Risshüter | Kryptis-Schildträger, Kryptis-Seher | 60 | 2.400 | 6–8 | 1 | 5 | 1 | 5-7 · Titan Rocket |
| 3 | Kryptis-Kriegsherr | Kryptis-Elite, Kryptis-Belagerer | 60 | 2.600 | 6–8 | 1 | 5 | 1 | 5-8 · Titan Shield |
| 4 | Kryptis-Kriegsherr | Kryptis-Elite, Kryptis-Belagerer | 60 | 2.800 | 7–9 | 1 | 5 | 1 | 5-9 · Titan Shield |
| 5 | Kryptis-Risstyrann | Kryptis-Verschlinger, Nebel-Wächter | 60 | 3.000 | 7–9 | 1 | 5 | 1 | 5-10 · DioNemesis |
| ☠️ 6 | Verderbt: Kryptis-Risshüter | Kryptis-Schildträger, Kryptis-Seher | 60 | 4.800 | 40–51 | 3 | 10 | 1–4 | Hard 5-3 · Cursed Titan Rocket |
| ☠️ 7 | Verderbt: Kryptis-Kriegsherr | Kryptis-Elite, Kryptis-Belagerer | 60 | 5.000 | 45–55 | 3 | 10 | 1–5 | Hard 5-4 · Cursed Titan Shield |
| ⭐ 8 | Schatten: Kryptis-Risstyrann | Kryptis-Verschlinger, Nebel-Wächter | 60 | 5.000 | 70–80 | 5 | 12 | 1–5 | L-5 · DioNemesis DX |

## Sonderinhalte *(geplant)*

### Prüfung der Feldküche

| Stufe | Gegner | CQHT |
| --- | --- | --- |
| MK1 | Prototyp-Kochgolem MK. 1 | Prototype Fercrow |
| MK2 | Meisterwerk-Kochgolem MK. 2 | Masterpiece, Chococrow |

### Kryptis-Seelenfeste

Raid in drei Phasen gegen den Seelenfürsten, freigeschaltet über das Heiligtum der Nebel.

| Phase | Gegner | Lv. | CQHT |
| --- | --- | --- | --- |
| 1 | Seelenfürst, der Zwielicht-Geist | 60 | Soltar, the Twilight Wraith |
| 2 | Seelenfürst, die Geisterbestie | 60 | Soltar, the Wraith Beast |
| 3 | Seelenfürst, Herr der Seelen | 60 | Soltar, the Lord of Souls |
