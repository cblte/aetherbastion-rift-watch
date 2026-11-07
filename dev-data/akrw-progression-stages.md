# Riss-Zonen & Stufen – Aetherbastion: Rift Watch

> Interne Entwicklungs-Referenz für **Aetherbastion: Rift Watch**. Erzeugt aus den Spieldaten in `js/data/`; maßgeblich ist immer der Code. Die Spalte *CQHT* nennt das Vorbild aus Crusaders Quest: Hero Town.

10 Zonen; je zwei teilen sich ein CQHT-Kapitel (*tier*). Pro Zone 5 normale Stufen, dann ☠️ schwere und in jeder zweiten Zone eine ⭐ legendäre. **Kosten** = Gold für eine Boss-Herausforderung. **Belohnung** = 📜 Forschungsnotizen, ⚒️ Waffen, 🍞 Proviant, 🎟️ Arena-Tickets (noch ohne Funktion).

| # | Zone | Portal | Kapitel | Lv. (normal) |
| --- | --- | --- | --- | --- |
| 1 | Königintal | 1 | 1 (1. Hälfte) | 3–10 |
| 2 | Kessex-Hügel | 1 | 1 (2. Hälfte) | 12–20 |
| 3 | Caudecus’ Anwesen | 1 | 2 (1. Hälfte) | 22–29 |
| 4 | Wanderer-Hügel | 2 | 2 (2. Hälfte) | 31–40 |
| 5 | Schneekuhlen-Höhen | 2 | 3 (1. Hälfte) | 41–45 |
| 6 | Katakomben von Ascalon | 2 | 3 (2. Hälfte) | 46–50 |
| 7 | Gendarran-Felder | 3 | 4 (1. Hälfte) | 51–55 |
| 8 | Harathi-Hinterland | 3 | 4 (2. Hälfte) | 56–60 |
| 9 | Blutstrom-Küste | 4 | 5 (1. Hälfte) | 60 |
| 10 | Funkenschwärmersumpf | 4 | 5 (2. Hälfte) | 60 |

## 1. Königintal

*Über dem Königintal bei Beetletun reißt der erste Riss auf. Banditen nutzen das Chaos, und aus dem Riss kriechen Schatten.*

| Stufe | Boss | Schergen | Lv. | Kosten | 📜 | ⚒️ | 🍞 | 🎟️ | CQHT |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | Banditen-Anführerin | Banditen-Beutelschneider, Banditen-Schläger | 3 | 50 | 1 | 1 | 1 | 0 | 1-1 · Emperor Slime |
| 2 | Champion Banditen-Saboteur | Banditen-Bomber, Banditen-Brandstifter | 5 | 60 | 1 | 1 | 1 | 0 | 1-2 · Emperor Slime |
| 3 | Champion Eichenherz | Waldspinne, Wildschwein | 6 | 70 | 1 | 1 | 1 | 0 | 1-3 · Emperor Slime |
| 4 | Champion Krait-Hexe | Krait-Sklaventreiber, Krait-Speerträger | 8 | 80 | 1 | 1 | 2 | 0 | 1-4 · Elite Goblin W. |
| 5 | Schatten-Behemoth | Schattenbrut, Verzerrter Geist | 10 | 90 | 1 | 1 | 2 | 0 | 1-5 · Elite Goblin W. |
| ☠️ 6 | Champion Höhlentroll | Höhlenspinne, Junger Troll | 60 | 1.200 | 10–20 | 1 | 5 | 1 | Hard 1-1 · Cursed Emperor Slime |
| ☠️ 7 | Verderbt: Schatten-Behemoth | Schattenbrut, Kryptis-Splitter | 60 | 1.400 | 11–21 | 1 | 5 | 1 | Hard 1-2 · Cursed Elite Goblin Warrior |

## 2. Kessex-Hügel

*Im Sumpfland der Kessex-Hügel giftet der Riss das Wasser. Krait, Zentauren und die Hexen des Waldes werden unruhig.*

| Stufe | Boss | Schergen | Lv. | Kosten | 📜 | ⚒️ | 🍞 | 🎟️ | CQHT |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | Banditen-Schläger Grasp | Banditen-Rabauke, Banditen-Scharfschütze | 12 | 100 | 1–2 | 1 | 2 | 0 | 1-6 · Ogre |
| 2 | Champion Krait-Hypnotiseur | Krait-Mystiker, Krait-Wächter | 14 | 110 | 1–2 | 1 | 2 | 0 | 1-7 · Ogre |
| 3 | Champion Toxischer Wurm | Toxischer Larvenwurm, Sumpfdrake | 16 | 120 | 1–2 | 1 | 3 | 0 | 1-8 · Raging Ogre |
| 4 | Zentauren-Oberhäuptling | Zentauren-Krieger, Zentauren-Späher | 18 | 130 | 1–2 | 1 | 3 | 0 | 1-9 · Raging Ogre |
| 5 | Champion Toxischer Spinnen-König | Toxische Spinne, Toxischer Wucherer | 20 | 150 | 1–2 | 1 | 3 | 0 | 1-10 · Golem |
| ☠️ 6 | Blut-Hexe | Hexen-Diener, Blutfledermaus | 60 | 1.600 | 12–22 | 2 | 6 | 1–2 | Hard 1-3 · Mighty Ogre |
| ☠️ 7 | Verderbt: Toxischer Spinnen-König | Toxische Spinne, Kryptis-Splitter | 60 | 1.800 | 13–23 | 2 | 6 | 1–2 | Hard 1-4 · Ogre Elite Fighter |
| ⭐ 8 | Schatten: Toxischer Spinnen-König | Kryptis-Plünderer, Kryptis-Peiniger | 60 | 5.000 | 50–62 | 3 | 10 | 1–4 | L-1 · Dark Golem |

## 3. Caudecus’ Anwesen

*Die Spur führt in Caudecus’ Anwesen. Hauptmann DeLana und die Separatisten verschanzen sich hinter dem flackernden Riss.*

| Stufe | Boss | Schergen | Lv. | Kosten | 📜 | ⚒️ | 🍞 | 🎟️ | CQHT |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | Separatisten-Belagerer | Separatisten-Kämpfer, Separatisten-Bomber | 22 | 100 | 1–2 | 1 | 1 | 1 | 2-1 · Hard Mudman |
| 2 | Königlicher Leibwächter Pete | Königlicher Wächter, Separatisten-Feldwebel | 24 | 120 | 1–2 | 1 | 1 | 1 | 2-2 · Hard Mudman |
| 3 | Butler Michiels | Diener des Hauses, Abgerichteter Wachhund | 25 | 140 | 1–2 | 1 | 1 | 1 | 2-3 · Hard Mudman |
| 4 | Gepfefferte Bridgette | Seraphen-Deserteur, Banditen-Kanonier | 27 | 160 | 1–3 | 1 | 2 | 1 | 2-4 · Pharaoh Mummy |
| 5 | Separatisten-Hauptmann DeLana | Separatisten-Scharfschütze, Separatisten-Leutnant | 29 | 180 | 1–3 | 1 | 2 | 1 | 2-5 · Pharaoh Mummy |
| ☠️ 6 | Turmaine | Asura-Wachgolem, Banditen-Raketengeschütz | 60 | 2.000 | 14–24 | 2 | 6 | 1–2 | Hard 2-1 · Emperor Mudman |
| ☠️ 7 | Frost | Separatisten-Scharfschütze, Kryptis-Splitter | 60 | 2.200 | 15–25 | 2 | 6 | 1–2 | Hard 2-2 · Ancient Pharaoh Mummy |

## 4. Wanderer-Hügel

*Eisige Winde über den Wanderer-Hügeln. Söhne des Svanir und Grawl beten den Riss als Zeichen Jormags an.*

| Stufe | Boss | Schergen | Lv. | Kosten | 📜 | ⚒️ | 🍞 | 🎟️ | CQHT |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | Champion Minotauren-Bulle | Minotaurus, Schneeleopard | 31 | 200 | 1–3 | 1 | 2 | 1 | 2-6 · Basilisk |
| 2 | Champion Grawl-Häuptling | Grawl-Krieger, Grawl-Schamane | 33 | 220 | 1–3 | 1 | 2 | 1 | 2-7 · Basilisk |
| 3 | Champion Eisbrut-Wolf | Eisbrut-Wolf, Eisbrut-Elementar | 35 | 240 | 1–3 | 1 | 3 | 1 | 2-8 · Huge Basilisk |
| 4 | Schamanen-Vorbote des Jormag | Sohn des Svanir, Svanir-Eisbrecher | 37 | 260 | 1–3 | 1 | 3 | 1 | 2-9 · Huge Basilisk |
| 5 | Svanir-Schamane | Svanir-Schamanin, Eisgeist | 40 | 300 | 1–3 | 1 | 3 | 1 | 2-10 · Sandworm |
| ☠️ 6 | Eisbrut-Goliath | Eisbrut-Bär, Eisbrut-Wyvern | 60 | 2.400 | 16–27 | 2 | 7 | 1–2 | Hard 2-3 · Red Basilisk |
| ☠️ 7 | Verderbt: Svanir-Schamane | Svanir-Schamanin, Kryptis-Splitter | 60 | 2.600 | 17–28 | 2 | 7 | 1–2 | Hard 2-4 · Cataclysm Basilisk |
| ⭐ 8 | Schatten: Svanir-Schamane | Kryptis-Plünderer, Kryptis-Peiniger | 60 | 5.000 | 55–67 | 4 | 11 | 1–4 | L-2 · Dark Sandworm |

## 5. Schneekuhlen-Höhen

*In den Schneekuhlen-Höhen graben sich Dredge zum Riss vor, während die Svanir ihren Drachen anrufen.*

| Stufe | Boss | Schergen | Lv. | Kosten | 📜 | ⚒️ | 🍞 | 🎟️ | CQHT |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | Schneeleoparden-Matriarchin | Schneeleopard, Eiswolf | 41 | 200 | 1–3 | 1 | 1 | 1 | 3-1 · Monster Anglerfish |
| 2 | Champion Svanir-Häscher | Svanir-Jäger, Svanir-Plünderer | 42 | 240 | 1–3 | 1 | 1 | 1 | 3-2 · Monster Anglerfish |
| 3 | Champion Frost-Grawl | Frost-Grawl, Grawl-Steinwerfer | 43 | 280 | 1–3 | 1 | 1 | 1 | 3-3 · Monster Anglerfish |
| 4 | Dredge-Tunnelmeister | Dredge-Bergarbeiter, Dredge-Schallkanone | 44 | 320 | 1–3 | 1 | 2 | 1 | 3-4 · Black Starfish |
| 5 | Drachen-Schamane der Svanir | Svanir-Drachenrufer, Eisbrut-Diener | 45 | 360 | 1–3 | 1 | 2 | 1 | 3-5 · Black Starfish |
| ☠️ 6 | Eisbrut-Riese | Eisbrut-Troll, Eisbrut-Koloss | 60 | 2.800 | 18–28 | 2 | 7 | 1–2 | Hard 3-1 · Cursed Monster Angler |
| ☠️ 7 | Verderbt: Drachen-Schamane der Svanir | Svanir-Drachenrufer, Kryptis-Splitter | 60 | 3.000 | 19–30 | 2 | 7 | 1–2 | Hard 3-2 · Cursed Blackstar |

## 6. Katakomben von Ascalon

*Unter den Ruinen von Ascalon öffnet sich ein Riss in die Katakomben. Die Geister der alten Könige finden keine Ruhe.*

| Stufe | Boss | Schergen | Lv. | Kosten | 📜 | ⚒️ | 🍞 | 🎟️ | CQHT |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | Höhlentroll | Geister-Krieger, Geister-Waldläufer | 46 | 400 | 1–3 | 1 | 2 | 1 | 3-6 · Shark Warrior |
| 2 | Kasha Schwarzblut | Flammenlegion-Kultist, Flammenlegion-Zerstörer | 47 | 440 | 2–3 | 1 | 2 | 1 | 3-7 · Shark Warrior |
| 3 | Ralena & Vassar | Geister-Liebende, Geister-Wächter | 48 | 480 | 2–3 | 1 | 3 | 1 | 3-8 · EliteShark W. |
| 4 | Geisterhafter Nekromant | Knochen-Diener, Geister-Nekromant | 49 | 520 | 2–3 | 1 | 3 | 1 | 3-9 · EliteShark W. |
| 5 | König Adelbern | Ascalonischer Geisterritter, Geister-Elite | 50 | 600 | 2–3 | 1 | 3 | 1 | 3-10 · Kraken |
| ☠️ 6 | Meister-Nekromant | Untoter Kanonier, Knochen-Schrecken | 60 | 3.200 | 20–31 | 2 | 8 | 1–3 | Hard 3-3 · Mighty Shark Warrior |
| ☠️ 7 | Verderbt: König Adelbern | Ascalonischer Geisterritter, Kryptis-Splitter | 60 | 3.400 | 21–33 | 2 | 8 | 1–3 | Hard 3-4 · Mighty Elite Shark Warrior |
| ⭐ 8 | Schatten: König Adelbern | Kryptis-Plünderer, Kryptis-Peiniger | 60 | 5.000 | 60–71 | 4 | 11 | 1–5 | L-3 · Dark Kraken |

## 7. Gendarran-Felder

*Über den Gendarran-Feldern stehen gleich mehrere Risse. Zentauren, Dredge und Piraten wittern ihre Chance.*

| Stufe | Boss | Schergen | Lv. | Kosten | 📜 | ⚒️ | 🍞 | 🎟️ | CQHT |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | Piratinnen-Kapitänin | Piraten-Entermatrose, Piraten-Kanonier | 51 | 400 | 2–4 | 1 | 1 | 1 | 4-1 · Hell Squishy |
| 2 | Champion Schlamm-Monstrum | Schlamm-Elementar, Sumpfkrebs | 52 | 450 | 2–4 | 1 | 1 | 1 | 4-2 · Hell Squishy |
| 3 | Zentauren-Belagerungsmeister | Zentauren-Belagerer, Zentauren-Bogenschütze | 53 | 500 | 2–4 | 1 | 1 | 1 | 4-3 · Hell Squishy |
| 4 | Dredge-Kommandant | Dredge-Sprengmeister, Dredge-Kommissar | 54 | 550 | 2–4 | 1 | 2 | 1 | 4-4 · Hellfire Spirit |
| 5 | Kriegsmeister Ulgoths Vorbote | Modniir-Krieger, Zentauren-Kriegstrommler | 55 | 600 | 2–4 | 1 | 2 | 1 | 4-5 · Hellfire Spirit |
| ☠️ 6 | Champion Banditen-Kriegsherr | Banditen-Kriegsherr-Garde, Banditen-Plünderer | 60 | 3.600 | 22–33 | 2 | 8 | 1–3 | Hard 4-1 · Volcano Sludge |
| ☠️ 7 | Verderbt: Kriegsmeister Ulgoths Vorbote | Modniir-Krieger, Kryptis-Splitter | 60 | 3.800 | 23–35 | 2 | 8 | 1–3 | Hard 4-2 · Cursed Hellfire Spirit |

## 8. Harathi-Hinterland

*Im Harathi-Hinterland tobt der Zentaurenkrieg. Ulgoth sammelt seine Horden am Rand eines gewaltigen Risses.*

| Stufe | Boss | Schergen | Lv. | Kosten | 📜 | ⚒️ | 🍞 | 🎟️ | CQHT |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | Harathi-Schlächter | Harathi-Krieger, Harathi-Speerwerfer | 56 | 650 | 2–4 | 1 | 2 | 1 | 4-6 · Stone Giant |
| 2 | Champion Modniir-Häuptling | Modniir-Berserker, Modniir-Schamane | 57 | 700 | 2–4 | 1 | 2 | 1 | 4-7 · Stone Giant |
| 3 | Kolossaler Erdelementar | Erdelementar, Steinwüter | 58 | 750 | 3–4 | 1 | 3 | 1 | 4-8 · Darkfire Giant |
| 4 | Seraphen-Verräter Valen | Abtrünniger Seraph, Seraphen-Deserteur | 59 | 800 | 3–4 | 1 | 3 | 1 | 4-9 · Darkfire Giant |
| 5 | Kriegsmeister Ulgoth | Ulgoths Leibgarde, Modniir-Kriegsherr | 60 | 1.000 | 3–4 | 1 | 3 | 1 | 4-10 · Dragon |
| ☠️ 6 | Zentauren-Kriegsherr Kol | Zentauren-Lanzenreiter, Zentauren-Kriegsschamane | 60 | 4.000 | 25–38 | 3 | 9 | 1–3 | Hard 4-3 · Corrupted Rock Giant |
| ☠️ 7 | Verderbt: Kriegsmeister Ulgoth | Ulgoths Leibgarde, Kryptis-Splitter | 60 | 4.200 | 26–40 | 3 | 9 | 1–3 | Hard 4-4 · Cursed Darkflame Giant |
| ⭐ 8 | Schatten: Kriegsmeister Ulgoth | Kryptis-Plünderer, Kryptis-Peiniger | 60 | 5.000 | 65–76 | 5 | 12 | 1–5 | L-4 · Dark Dragon |

## 9. Blutstrom-Küste

*An der Blutstrom-Küste spült der Riss Auferstandene aus Orr an. Krait und Piraten kämpfen um jeden Strand.*

| Stufe | Boss | Schergen | Lv. | Kosten | 📜 | ⚒️ | 🍞 | 🎟️ | CQHT |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | Champion Krait-Priester | Krait-Zelot, Krait-Neophyt | 60 | 1.200 | 4–5 | 1 | 4 | 1 | 5-1 · Pyro Droid DX |
| 2 | Champion Auferstandener Offizier | Auferstandener Matrose, Auferstandener Grubenarbeiter | 60 | 1.400 | 4–5 | 1 | 4 | 1 | 5-2 · Pyro Droid DX |
| 3 | Dredge-Kriegsmaschine | Dredge-Schweißer, Dredge-Panzer | 60 | 1.600 | 5–6 | 1 | 4 | 1 | 5-3 · Pyro Droid DX |
| 4 | Piratinnen-Admiralin | Piraten-Maat, Piraten-Harpunier | 60 | 1.800 | 5–6 | 1 | 4 | 1 | 5-4 · Gatling Droid DX |
| 5 | Dreiköpfige Krait-Bestie | Krait-Wyrmschlange, Krait-Schreckensbrut | 60 | 2.000 | 5–7 | 1 | 4 | 1 | 5-5 · Gatling Droid DX |
| ☠️ 6 | Champion Kropf-Krake | Riffkrake, Tiefsee-Lauerer | 60 | 4.400 | 30–42 | 3 | 9 | 1–3 | Hard 5-1 · Cursed Pyro Droid DX |
| ☠️ 7 | Verderbt: Dreiköpfige Krait-Bestie | Krait-Wyrmschlange, Kryptis-Splitter | 60 | 4.600 | 35–46 | 3 | 9 | 1–4 | Hard 5-2 · Cursed Gatling Droid DX |

## 10. Funkenschwärmersumpf

*Im Funkenschwärmersumpf brodelt Zhaitans Verderbnis. Aus dem Nebel über dem Wasser erhebt sich Tequatl der Sonnenlose.*

| Stufe | Boss | Schergen | Lv. | Kosten | 📜 | ⚒️ | 🍞 | 🎟️ | CQHT |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | Champion Auferstandener Priester | Auferstandener Akolyth, Auferstandener Schreckenswandler | 60 | 2.200 | 6–7 | 1 | 5 | 1 | 5-6 · Titan Rocket |
| 2 | Champion Krait-Echse | Krait-Echse, Krait-Schlinger | 60 | 2.400 | 6–8 | 1 | 5 | 1 | 5-7 · Titan Rocket |
| 3 | Zhaff-Sumpfmonster | Sumpfschlurfer, Sumpf-Moskito | 60 | 2.600 | 6–8 | 1 | 5 | 1 | 5-8 · Titan Shield |
| 4 | Hylek-Schamane Cuatl | Hylek-Krieger, Hylek-Giftmischer | 60 | 2.800 | 7–9 | 1 | 5 | 1 | 5-9 · Titan Shield |
| 5 | Tequatl der Sonnenlose | Auferstandener Knochenmagier, Tequatls Diener | 60 | 3.000 | 7–9 | 1 | 5 | 1 | 5-10 · DioNemesis |
| ☠️ 6 | Megawurm | Wurmbrut, Sandwurm-Larve | 60 | 4.800 | 40–51 | 3 | 10 | 1–4 | Hard 5-3 · Cursed Titan Rocket |
| ☠️ 7 | Verderbt: Tequatl der Sonnenlose | Auferstandener Knochenmagier, Kryptis-Splitter | 60 | 5.000 | 45–55 | 3 | 10 | 1–5 | Hard 5-4 · Cursed Titan Shield |
| ⭐ 8 | Schatten: Tequatl der Sonnenlose | Kryptis-Plünderer, Kryptis-Peiniger | 60 | 5.000 | 70–80 | 5 | 12 | 1–5 | L-5 · DioNemesis DX |

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
