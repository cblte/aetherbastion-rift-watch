# Riss-Zonen & Stufen – Aetherbastion: Rift Watch

> Interne Entwicklungs-Referenz für **Aetherbastion: Rift Watch**. Erzeugt aus den Spieldaten in `js/data/`; maßgeblich ist immer der Code. Die Spalte *CQHT* nennt das Vorbild aus Crusaders Quest: Hero Town.

10 Zonen; je zwei teilen sich ein CQHT-Kapitel (*tier*). Pro Zone 5 normale Stufen, dann ☠️ schwere und in jeder zweiten Zone eine ⭐ legendäre. **Kosten** = Gold für eine Boss-Herausforderung. **Belohnung** = 📜 Forschungsnotizen, ⚒️ Waffen, 🍞 Proviant, 🎟️ Arena-Tickets (noch ohne Funktion).

| # | Zone | Portal | Kapitel | Lv. (normal) |
| --- | --- | --- | --- | --- |
| 1 | Königintal | 1 | 1 (1. Hälfte) | 3–10 |
| 2 | Caledon-Wald | 1 | 1 (2. Hälfte) | 12–20 |
| 3 | Wanderer-Hügel | 1 | 2 (1. Hälfte) | 22–29 |
| 4 | Provinz Metrica | 2 | 2 (2. Hälfte) | 31–40 |
| 5 | Ebenen von Aschfurt | 2 | 3 (1. Hälfte) | 41–45 |
| 6 | Caudecus’ Anwesen | 2 | 3 (2. Hälfte) | 46–50 |
| 7 | Löwenstein & Klaueninsel | 3 | 4 (1. Hälfte) | 51–55 |
| 8 | Meerenge der Verwüstung | 3 | 4 (2. Hälfte) | 56–60 |
| 9 | Malchors Sprung | 4 | 5 (1. Hälfte) | 60 |
| 10 | Fluchküste | 4 | 5 (2. Hälfte) | 60 |

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

## 2. Caledon-Wald

*Nahe dem Hain wuchern Albtraum-Ranken aus dem Riss im Caledon-Wald. Der Albtraumhof sieht seine Stunde gekommen.*

| Stufe | Boss | Schergen | Lv. | Kosten | 📜 | ⚒️ | 🍞 | 🎟️ | CQHT |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | Champion Hylek-Kriegshäuptling | Hylek-Krieger, Hylek-Blasrohrschütze | 12 | 100 | 1–2 | 1 | 2 | 0 | 1-6 · Ogre |
| 2 | Champion Skritt-Schatzmeister | Skritt-Plünderer, Skritt-Dieb | 14 | 110 | 1–2 | 1 | 2 | 0 | 1-7 · Ogre |
| 3 | Champion Albtraumhof-Ritter | Albtraumhof-Höfling, Albtraumhof-Wächter | 16 | 120 | 1–2 | 1 | 3 | 0 | 1-8 · Raging Ogre |
| 4 | Champion Krait-Orakel | Krait-Mystiker, Sumpfdrake | 18 | 130 | 1–2 | 1 | 3 | 0 | 1-9 · Raging Ogre |
| 5 | Albtraumhof-Gräfin | Albtraum-Ranke, Verzerrter Sylvari | 20 | 150 | 1–2 | 1 | 3 | 0 | 1-10 · Golem |
| ☠️ 6 | Verderbter Baumgeist | Waldspinne, Rankenwüter | 60 | 1.600 | 12–22 | 2 | 6 | 1–2 | Hard 1-3 · Mighty Ogre |
| ☠️ 7 | Verderbt: Albtraumhof-Gräfin | Albtraum-Ranke, Kryptis-Splitter | 60 | 1.800 | 13–23 | 2 | 6 | 1–2 | Hard 1-4 · Ogre Elite Fighter |
| ⭐ 8 | Schatten: Albtraumhof-Gräfin | Kryptis-Plünderer, Kryptis-Peiniger | 60 | 5.000 | 50–62 | 3 | 10 | 1–4 | L-1 · Dark Golem |

## 3. Wanderer-Hügel

*Eisige Winde über den Wanderer-Hügeln. Söhne des Svanir und Grawl beten den Riss als Zeichen Jormags an.*

| Stufe | Boss | Schergen | Lv. | Kosten | 📜 | ⚒️ | 🍞 | 🎟️ | CQHT |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | Champion Minotauren-Bulle | Minotaurus, Schneeleopard | 22 | 100 | 1–2 | 1 | 1 | 1 | 2-1 · Hard Mudman |
| 2 | Champion Grawl-Häuptling | Grawl-Krieger, Grawl-Schamane | 24 | 120 | 1–2 | 1 | 1 | 1 | 2-2 · Hard Mudman |
| 3 | Champion Eisbrut-Wolf | Eisbrut-Wolf, Eisbrut-Elementar | 25 | 140 | 1–2 | 1 | 1 | 1 | 2-3 · Hard Mudman |
| 4 | Schamanen-Vorbote des Jormag | Sohn des Svanir, Svanir-Eisbrecher | 27 | 160 | 1–3 | 1 | 2 | 1 | 2-4 · Pharaoh Mummy |
| 5 | Svanir-Schamane | Svanir-Schamanin, Eisgeist | 29 | 180 | 1–3 | 1 | 2 | 1 | 2-5 · Pharaoh Mummy |
| ☠️ 6 | Eisbrut-Goliath | Eisbrut-Bär, Eisbrut-Wyvern | 60 | 2.000 | 14–24 | 2 | 6 | 1–2 | Hard 2-1 · Emperor Mudman |
| ☠️ 7 | Verderbt: Svanir-Schamane | Svanir-Schamanin, Kryptis-Splitter | 60 | 2.200 | 15–25 | 2 | 6 | 1–2 | Hard 2-2 · Ancient Pharaoh Mummy |

## 4. Provinz Metrica

*Die Inquestur hat den Riss in der Provinz Metrica nicht entdeckt – sie hat ihn angezapft. Golems bewachen die Messgeräte, und die Versuche geraten außer Kontrolle.*

| Stufe | Boss | Schergen | Lv. | Kosten | 📜 | ⚒️ | 🍞 | 🎟️ | CQHT |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | Champion Inquestur-Golem | Inquestur-Assistent, Inquestur-Golem | 31 | 200 | 1–3 | 1 | 2 | 1 | 2-6 · Basilisk |
| 2 | Champion Skritt-Anführer | Skritt-Bastler, Skritt-Späher | 33 | 220 | 1–3 | 1 | 2 | 1 | 2-7 · Basilisk |
| 3 | Champion Riesen-Moa | Moa, Hylek-Krieger | 35 | 240 | 1–3 | 1 | 3 | 1 | 2-8 · Huge Basilisk |
| 4 | Inquestur-Versuchsleiterin | Inquestur-Techniker, Mark-I-Golem | 37 | 260 | 1–3 | 1 | 3 | 1 | 2-9 · Huge Basilisk |
| 5 | Kolossaler Inquestur-Golem | Inquestur-Wächter, Mark-III-Golem | 40 | 300 | 1–3 | 1 | 3 | 1 | 2-10 · Sandworm |
| ☠️ 6 | Entfesseltes Experiment | Riss-Funke, Instabiles Experiment | 60 | 2.400 | 16–27 | 2 | 7 | 1–2 | Hard 2-3 · Red Basilisk |
| ☠️ 7 | Verderbt: Kolossaler Inquestur-Golem | Inquestur-Wächter, Kryptis-Splitter | 60 | 2.600 | 17–28 | 2 | 7 | 1–2 | Hard 2-4 · Cataclysm Basilisk |
| ⭐ 8 | Schatten: Kolossaler Inquestur-Golem | Kryptis-Plünderer, Kryptis-Peiniger | 60 | 5.000 | 55–67 | 4 | 11 | 1–4 | L-2 · Dark Sandworm |

## 5. Ebenen von Aschfurt

*In den Ebenen von Aschfurt ruft die Flammenlegion den Riss als Zeichen ihrer Götter aus. Darunter erwachen die Geister Ascalons.*

| Stufe | Boss | Schergen | Lv. | Kosten | 📜 | ⚒️ | 🍞 | 🎟️ | CQHT |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | Champion Verschlinger-Königin | Verschlinger, Verschlinger-Brut | 41 | 200 | 1–3 | 1 | 1 | 1 | 3-1 · Monster Anglerfish |
| 2 | Champion Skal-Alpha | Skal, Wildkatze | 42 | 240 | 1–3 | 1 | 1 | 1 | 3-2 · Monster Anglerfish |
| 3 | Separatisten-Anführerin | Separatisten-Kämpfer, Separatisten-Brandstifter | 43 | 280 | 1–3 | 1 | 1 | 1 | 3-3 · Monster Anglerfish |
| 4 | Champion Ascalonischer Geisterhauptmann | Ascalonischer Geist, Geister-Bogenschütze | 44 | 320 | 1–3 | 1 | 2 | 1 | 3-4 · Black Starfish |
| 5 | Flammenlegion-Kriegsherr | Flammenlegion-Kultist, Flammenlegion-Zerstörer | 45 | 360 | 1–3 | 1 | 2 | 1 | 3-5 · Black Starfish |
| ☠️ 6 | Flammenlegion-Schamane | Flammenlegion-Krieger, Feuerelementar | 60 | 2.800 | 18–28 | 2 | 7 | 1–2 | Hard 3-1 · Cursed Monster Angler |
| ☠️ 7 | Verderbt: Flammenlegion-Kriegsherr | Flammenlegion-Kultist, Kryptis-Splitter | 60 | 3.000 | 19–30 | 2 | 7 | 1–2 | Hard 3-2 · Cursed Blackstar |

## 6. Caudecus’ Anwesen

*Alle Spuren aus den Heimatgebieten führen zurück ins Königintal: in Caudecus’ Anwesen. Hauptmann DeLana und die Separatisten verschanzen sich hinter dem flackernden Riss.*

| Stufe | Boss | Schergen | Lv. | Kosten | 📜 | ⚒️ | 🍞 | 🎟️ | CQHT |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | Separatisten-Belagerer | Separatisten-Kämpfer, Separatisten-Bomber | 46 | 400 | 1–3 | 1 | 2 | 1 | 3-6 · Shark Warrior |
| 2 | Königlicher Leibwächter Pete | Königlicher Wächter, Separatisten-Feldwebel | 47 | 440 | 2–3 | 1 | 2 | 1 | 3-7 · Shark Warrior |
| 3 | Butler Michiels | Diener des Hauses, Abgerichteter Wachhund | 48 | 480 | 2–3 | 1 | 3 | 1 | 3-8 · EliteShark W. |
| 4 | Gepfefferte Bridgette | Seraphen-Deserteur, Banditen-Kanonier | 49 | 520 | 2–3 | 1 | 3 | 1 | 3-9 · EliteShark W. |
| 5 | Separatisten-Hauptmann DeLana | Separatisten-Scharfschütze, Separatisten-Leutnant | 50 | 600 | 2–3 | 1 | 3 | 1 | 3-10 · Kraken |
| ☠️ 6 | Turmaine | Asura-Wachgolem, Banditen-Raketengeschütz | 60 | 3.200 | 20–31 | 2 | 8 | 1–3 | Hard 3-3 · Mighty Shark Warrior |
| ☠️ 7 | Frost | Separatisten-Scharfschütze, Kryptis-Splitter | 60 | 3.400 | 21–33 | 2 | 8 | 1–3 | Hard 3-4 · Mighty Elite Shark Warrior |
| ⭐ 8 | Schatten: Separatisten-Hauptmann DeLana | Kryptis-Plünderer, Kryptis-Peiniger | 60 | 5.000 | 60–71 | 4 | 11 | 1–5 | L-3 · Dark Kraken |

## 7. Löwenstein & Klaueninsel

*Nach dem Anwesen ruft der Pakt nach Löwenstein. Vor der Stadt öffnet sich ein Riss über dem Meer des Leids, und Zhaitans Totenschiffe halten auf die Klaueninsel zu.*

| Stufe | Boss | Schergen | Lv. | Kosten | 📜 | ⚒️ | 🍞 | 🎟️ | CQHT |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | Auferstandene Abscheulichkeit | Auferstandener Leibeigener, Auferstandener Pirat | 51 | 400 | 2–4 | 1 | 1 | 1 | 4-1 · Hell Squishy |
| 2 | Veteran Auferstandener Grobian | Auferstandener Grobian, Auferstandener Seuchenträger | 52 | 450 | 2–4 | 1 | 1 | 1 | 4-2 · Hell Squishy |
| 3 | Admiral Feiste Bakkir | Auferstandener Knappe, Auferstandener Ritter | 53 | 500 | 2–4 | 1 | 1 | 1 | 4-3 · Hell Squishy |
| 4 | Morgus Lethe | Auferstandener Hai, Untoter Riesenhai | 54 | 550 | 2–4 | 1 | 2 | 1 | 4-4 · Hellfire Spirit |
| 5 | Faulschreck der Seuchenbringer | Auferstandener Verderber, Auferstandene Seuchenträgerin | 55 | 600 | 2–4 | 1 | 2 | 1 | 4-5 · Hellfire Spirit |
| ☠️ 6 | Monströse Auferstandene Abscheulichkeit | Auferstandene Abscheulichkeit, Auferstandener Verseuchter | 60 | 3.600 | 22–33 | 2 | 8 | 1–3 | Hard 4-1 · Volcano Sludge |
| ☠️ 7 | Verderbt: Faulschreck der Seuchenbringer | Auferstandener Verderber, Kryptis-Splitter | 60 | 3.800 | 23–35 | 2 | 8 | 1–3 | Hard 4-2 · Cursed Hellfire Spirit |

## 8. Meerenge der Verwüstung

*Vom Fort der Dreifaltigkeit aus setzt der Pakt nach Orr über. In der Meerenge der Verwüstung reißt der Riss den Meeresboden auf, und Auferstandene strömen zum Tempel des Balthasar.*

| Stufe | Boss | Schergen | Lv. | Kosten | 📜 | ⚒️ | 🍞 | 🎟️ | CQHT |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | Champion Auferstandener Krait-Nimross | Auferstandener Krait-Damoss, Auferstandener Krait-Hypnoss | 56 | 650 | 2–4 | 1 | 2 | 1 | 4-6 · Stone Giant |
| 2 | Champion Auferstandener Megalodon | Auferstandener Bullenhai, Auferstandener Krebs | 57 | 700 | 2–4 | 1 | 2 | 1 | 4-7 · Stone Giant |
| 3 | Auferstandener Zauberer | Auferstandener Akolyth, Auferstandene Zauberin | 58 | 750 | 3–4 | 1 | 3 | 1 | 4-8 · Darkfire Giant |
| 4 | Champion Auferstandener Kapitän | Auferstandener Pirat, Auferstandener Kommandeur | 59 | 800 | 3–4 | 1 | 3 | 1 | 4-9 · Darkfire Giant |
| 5 | Auferstandener Priester des Balthasar | Auferstandener Verwüster, Auferstandener Bewahrer | 60 | 1.000 | 3–4 | 1 | 3 | 1 | 4-10 · Dragon |
| ☠️ 6 | Champion Auferstandener Riese | Auferstandener Unterwerfer, Auferstandenen-Luftabwehrgeschütz | 60 | 4.000 | 25–38 | 3 | 9 | 1–3 | Hard 4-3 · Corrupted Rock Giant |
| ☠️ 7 | Verderbt: Auferstandener Priester des Balthasar | Auferstandener Verwüster, Kryptis-Splitter | 60 | 4.200 | 26–40 | 3 | 9 | 1–3 | Hard 4-4 · Cursed Darkflame Giant |
| ⭐ 8 | Schatten: Auferstandener Priester des Balthasar | Kryptis-Plünderer, Kryptis-Peiniger | 60 | 5.000 | 65–76 | 5 | 12 | 1–5 | L-4 · Dark Dragon |

## 9. Malchors Sprung

*In Malchors Sprung stehen die Kathedralen der Dwayna und der Lyssa. Der Riss nährt die Verderbnis in ihren Hallen, und die Inquestur zapft am Rand die Energie ab.*

| Stufe | Boss | Schergen | Lv. | Kosten | 📜 | ⚒️ | 🍞 | 🎟️ | CQHT |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | Auferstandene Brutmutter | Auferstandenes Lindwurm-Junges, Auferstandener Lindwurm | 60 | 1.200 | 4–5 | 1 | 4 | 1 | 5-1 · Pyro Droid DX |
| 2 | Inquestur-Ornithologin | Auferstandenes Huhn, Auferstandener Bauer | 60 | 1.400 | 4–5 | 1 | 4 | 1 | 5-2 · Pyro Droid DX |
| 3 | Golem Typ II YF-Gold | Pyrit-Elementar, Inquestur-Golem | 60 | 1.600 | 5–6 | 1 | 4 | 1 | 5-3 · Pyro Droid DX |
| 4 | Champion Auferstandener Leutnant | Auferstandener Edelmann, Auferstandener Hofnarr | 60 | 1.800 | 5–6 | 1 | 4 | 1 | 5-4 · Gatling Droid DX |
| 5 | Verdorbene Hohepriesterin | Auferstandenes Gespenst, Auferstandener Hylek | 60 | 2.000 | 5–7 | 1 | 4 | 1 | 5-5 · Gatling Droid DX |
| ☠️ 6 | Auferstandene Priesterin der Dwayna | Auferstandene Akolythin, Auferstandener Verweser | 60 | 4.400 | 30–42 | 3 | 9 | 1–3 | Hard 5-1 · Cursed Pyro Droid DX |
| ☠️ 7 | Auge des Zhaitan | Auferstandenes Gespenst, Kryptis-Splitter | 60 | 4.600 | 35–46 | 3 | 9 | 1–4 | Hard 5-2 · Cursed Gatling Droid DX |

## 10. Fluchküste

*An der Fluchküste endet der Weg durch Orr. Hinter den Tempeln der Melandru und des Grenth liegt Arah, und der Riss hier ist der größte, den die Gilde je gesehen hat.*

| Stufe | Boss | Schergen | Lv. | Kosten | 📜 | ⚒️ | 🍞 | 🎟️ | CQHT |
| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 | Kapitän Gammelbart | Auferstandener Pirat, Auferstandener Fischer | 60 | 2.200 | 6–7 | 1 | 5 | 1 | 5-6 · Titan Rocket |
| 2 | Champion Auferstandener Gladiator | Auferstandener Gorilla, Orrianischer Gorilla | 60 | 2.400 | 6–8 | 1 | 5 | 1 | 5-7 · Titan Rocket |
| 3 | Champion Auferstandene Abscheulichkeit | Orrianischer Grobian, Orrianischer Schlurfer | 60 | 2.600 | 6–8 | 1 | 5 | 1 | 5-8 · Titan Shield |
| 4 | Champion Auferstandener Hofwart | Auferstandene Spinne, Auferstandene Spinnenbrut | 60 | 2.800 | 7–9 | 1 | 5 | 1 | 5-9 · Titan Shield |
| 5 | Auferstandener Priester des Grenth | Orrianische Spektralwache, Auferstandener Verweser | 60 | 3.000 | 7–9 | 1 | 5 | 1 | 5-10 · DioNemesis |
| ☠️ 6 | Auferstandener Priester der Melandru | Teer-Elementar, Orrianischer Spektralhammer | 60 | 4.800 | 40–51 | 3 | 10 | 1–4 | Hard 5-3 · Cursed Titan Rocket |
| ☠️ 7 | Verderbt: Auferstandener Priester des Grenth | Orrianische Spektralwache, Kryptis-Splitter | 60 | 5.000 | 45–55 | 3 | 10 | 1–5 | Hard 5-4 · Cursed Titan Shield |
| ⭐ 8 | Schatten: Auferstandener Priester des Grenth | Kryptis-Plünderer, Kryptis-Peiniger | 60 | 5.000 | 70–80 | 5 | 12 | 1–5 | L-5 · DioNemesis DX |

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
