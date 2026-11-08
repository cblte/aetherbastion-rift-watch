# Charr-Schmiede: Waffen & Laden – Aetherbastion: Rift Watch

> Interne Entwicklungs-Referenz für **Aetherbastion: Rift Watch**. Erzeugt aus den Spieldaten in `js/data/`; maßgeblich ist immer der Code. Die Spalte *CQHT* nennt das Vorbild aus Crusaders Quest: Hero Town.

Der Laden zeigt 3 zufällige Waffen und füllt sich alle 30 Minuten neu. Waffen kosten 🟡 Gold; die besten gibt es alternativ für 📜 Forschungsnotizen. Die **Schmiede-Stufe** bestimmt, ab wann eine Waffe im Laden auftauchen kann; die **Chance** ist ihr Gewicht beim Würfeln des Angebots. Heiler tragen immer einen 🔮 Fokus, alle anderen die Waffe ihrer Klasse.

## Waffenarten

| Waffe | CQHT-Klasse |
| --- | --- |
| 🗡️ Schwert | Warrior |
| 🔨 Hammer | Paladin |
| 🏹 Bogen | Archer |
| 🔫 Gewehr | Hunter |
| 🪄 Stab | Wizard |
| 🔮 Fokus | Priest |

## Güten

| Güte | Name | ATK | HP | Boss-Drop in Kapitel |
| --- | --- | --- | --- | --- |
| ★1 | Einfach | +5 % | +2 % | 1 |
| ★2 | Fein | +12 % | +5 % | 1, 2 |
| ★3 | Meisterwerk | +25 % | +10 % | 2, 3 |
| ★4 | Selten | +45 % | +15 % | 3, 4 |
| ★5 | Exotisch | +75 % | +25 % | 4, 5, schwer |
| ★6 | Aufgestiegen | +120 % | +35 % | schwer, legendär |

## ★1 Einfach

| Waffe | Art | 🟡 Gold | 📜 FN | Schmiede | Chance | CQHT |
| --- | --- | --- | --- | --- | --- | --- |
| Altes Breitschwert | 🗡️ Schwert | 100 | – | Stufe 1 | 0,8 % | Old Broad Sword |
| Steinhammer | 🔨 Hammer | 100 | – | Stufe 1 | 0,8 % | Stone Hammer |
| Kurzbogen | 🏹 Bogen | 100 | – | Stufe 1 | 0,8 % | Short Bow |
| Alte Muskete | 🔫 Gewehr | 100 | – | Stufe 1 | 0,8 % | Old Rifle |
| Eichenstab | 🪄 Stab | 100 | – | Stufe 1 | 0,8 % | Oak Staff |
| Heilige Kugel | 🔮 Fokus | 100 | – | Stufe 1 | 0,8 % | Holy Orb |

## ★2 Fein

| Waffe | Art | 🟡 Gold | 📜 FN | Schmiede | Chance | CQHT |
| --- | --- | --- | --- | --- | --- | --- |
| Breitschwert | 🗡️ Schwert | 500 | – | Stufe 1 | 1 % | Broad Sword |
| Bastardschwert | 🗡️ Schwert | 500 | – | Stufe 1 | 1 % | Bastard Sword |
| Krummsäbel | 🗡️ Schwert | 500 | – | Stufe 1 | 1 % | Falcata |
| Stahlhammer | 🔨 Hammer | 500 | – | Stufe 1 | 1 % | Steel Hammer |
| Streitkolben | 🔨 Hammer | 500 | – | Stufe 1 | 1 % | Mace |
| Riesenhammer | 🔨 Hammer | 500 | – | Stufe 1 | 1 % | Giant Hammer |
| Kompositbogen | 🏹 Bogen | 500 | – | Stufe 1 | 1 % | Composite Bow |
| Verstärkter Bogen | 🏹 Bogen | 500 | – | Stufe 1 | 1 % | Enhanced Bow |
| Lederlangbogen | 🏹 Bogen | 500 | – | Stufe 1 | 1 % | Leather Longbow |
| Jagdgewehr | 🔫 Gewehr | 500 | – | Stufe 1 | 1 % | Hunting Gun |
| Gewehr | 🔫 Gewehr | 500 | – | Stufe 1 | 1 % | Rifle |
| Scharfschützengewehr | 🔫 Gewehr | 500 | – | Stufe 1 | 1 % | Sniper Gun |
| Waldstab | 🪄 Stab | 500 | – | Stufe 1 | 1 % | Forest Staff |
| Feuerjuwel | 🪄 Stab | 500 | – | Stufe 1 | 1 % | Fire Gem |
| Dreifaltigkeitsstab | 🪄 Stab | 500 | – | Stufe 1 | 1 % | Trinity Staff |
| Runenfragment | 🔮 Fokus | 500 | – | Stufe 1 | 1 % | Rune Fragment |
| Glänzende Kugel | 🔮 Fokus | 500 | – | Stufe 1 | 1 % | Shiny Orb |
| Quaggan-Plüschtier | 🔮 Fokus | 500 | – | Stufe 1 | 1 % | Mouse Bear |

## ★3 Meisterwerk

| Waffe | Art | 🟡 Gold | 📜 FN | Schmiede | Chance | CQHT |
| --- | --- | --- | --- | --- | --- | --- |
| Kriegerschwert | 🗡️ Schwert | 2.500 | – | Stufe 1 | 2 % | Warrior Sword |
| Stahlschwert | 🗡️ Schwert | 2.500 | – | Stufe 1 | 2 % | Steel Sword |
| Befreier | 🗡️ Schwert | 2.500 | – | Stufe 1 | 2 % | Liberator |
| Vollhammer | 🔨 Hammer | 2.500 | – | Stufe 1 | 2 % | Full Hammer |
| Titanenhammer | 🔨 Hammer | 2.500 | – | Stufe 1 | 2 % | Titan Hammer |
| Krytanischer Morgenstern | 🔨 Hammer | 2.500 | – | Stufe 1 | 2 % | Candiva |
| Flaschenzugbogen | 🏹 Bogen | 2.500 | – | Stufe 1 | 2 % | Compound Bow |
| Bogen des Dämonenjägers | 🏹 Bogen | 2.500 | – | Stufe 1 | 2 % | Evil Hunter Bow |
| Bogen des jungen Jägers | 🏹 Bogen | 2.500 | – | Stufe 1 | 2 % | Young Gon's Bow |
| Revolverklinge | 🔫 Gewehr | 2.500 | – | Stufe 1 | 2 % | Gun Sword |
| Langgewehr | 🔫 Gewehr | 2.500 | – | Stufe 1 | 2 % | Long Rifle |
| Goldene Prunkflinte | 🔫 Gewehr | 2.500 | – | Stufe 1 | 2 % | Roman's Golden Gun |
| Stab der Zauberschülerin | 🪄 Stab | 2.500 | – | Stufe 1 | 2 % | Magic Girl Staff |
| Meerjungfrauenstab | 🪄 Stab | 2.500 | – | Stufe 1 | 2 % | Mermaid Staff |
| Sternenfall | 🪄 Stab | 2.500 | – | Stufe 1 | 2 % | Starfall |
| Schneefragment | 🔮 Fokus | 2.500 | – | Stufe 1 | 2 % | Snow Fragment |
| Unbekanntes Notenblatt | 🔮 Fokus | 2.500 | – | Stufe 1 | 2 % | Unknown Sheet |
| Stundenglas Dwaynas | 🔮 Fokus | 2.500 | – | Stufe 1 | 2 % | God's Hourglass |

## ★4 Selten

| Waffe | Art | 🟡 Gold | 📜 FN | Schmiede | Chance | CQHT |
| --- | --- | --- | --- | --- | --- | --- |
| Seraphen-Säbel | 🗡️ Schwert | 7.500 | – | Stufe 2 | 2 % | Dragoon Sword |
| Rosenklinge | 🗡️ Schwert | 7.500 | – | Stufe 2 | 2 % | Rose Knife |
| Gefrorener Thunfisch | 🗡️ Schwert | 7.500 | – | Stufe 2 | 2 % | Frozen Tuna |
| Hammer des Statthalters | 🔨 Hammer | 7.500 | – | Stufe 2 | 2 % | Locum's Hammer |
| Glutschläger | 🔨 Hammer | 7.500 | – | Stufe 2 | 2 % | Vulcain |
| Quietschhammer | 🔨 Hammer | 7.500 | – | Stufe 2 | 2 % | Toy Hammer |
| Legionärsbogen | 🏹 Bogen | 7.500 | – | Stufe 2 | 2 % | Roman Bow |
| Herzensjäger-Bogen | 🏹 Bogen | 7.500 | – | Stufe 2 | 2 % | Love Chaser Bow |
| Krabbenbogen | 🏹 Bogen | 7.500 | – | Stufe 2 | 2 % | Crab Bow |
| Wasserbombe | 🔫 Gewehr | 7.500 | – | Stufe 2 | 2 % | Water Bomb |
| Schirmflinte | 🔫 Gewehr | 7.500 | – | Stufe 2 | 2 % | Umbrell gun |
| Uralter Betäuber | 🔫 Gewehr | 7.500 | – | Stufe 2 | 2 % | Ancient StunGun |
| Leierstab | 🪄 Stab | 7.500 | – | Stufe 2 | 2 % | Lyramorse |
| Schwesternstab | 🪄 Stab | 7.500 | – | Stufe 2 | 2 % | Sister Staff |
| Robuste Angelrute | 🪄 Stab | 7.500 | – | Stufe 2 | 2 % | Firm Fishing Rod |
| Dunkle Kugel | 🔮 Fokus | 7.500 | – | Stufe 2 | 2 % | Dark Ball |
| Quaggan-Nudeln | 🔮 Fokus | 7.500 | – | Stufe 2 | 2 % | Simya Noodle |
| Herz des Hains | 🔮 Fokus | 7.500 | – | Stufe 2 | 2 % | Elanuma's Heart |

## ★5 Exotisch

| Waffe | Art | 🟡 Gold | 📜 FN | Schmiede | Chance | CQHT |
| --- | --- | --- | --- | --- | --- | --- |
| Klinge des Tiefseekönigs | 🗡️ Schwert | 12.000 | 5 | Stufe 3 | 0,2 % | Sea King Sword |
| Schlächterklinge | 🗡️ Schwert | 12.000 | 5 | Stufe 3 | 0,2 % | Killer Sword |
| Goldene Klinge | 🗡️ Schwert | 12.000 | 5 | Stufe 3 | 0,2 % | Golden Sword |
| Eishammer | 🔨 Hammer | 12.000 | 5 | Stufe 3 | 0,2 % | Ice Hammer |
| Goldene Axt | 🔨 Hammer | 12.000 | 5 | Stufe 3 | 0,2 % | Golden Axe |
| Wirbelaxt | 🔨 Hammer | 12.000 | 5 | Stufe 3 | 0,2 % | Whirl Axe |
| Roter Drache (kurz) | 🏹 Bogen | 12.000 | 5 | Stufe 3 | 0,2 % | RedDragon(Shrt) |
| Roter Drache (lang) | 🏹 Bogen | 12.000 | 5 | Stufe 3 | 0,2 % | RedDragon(Lng) |
| Katzenkissen | 🏹 Bogen | 12.000 | 5 | Stufe 3 | 0,2 % | Cat Pillow |
| Donnerbüchse | 🔫 Gewehr | 12.000 | 5 | Stufe 3 | 0,2 % | Blunderbuss |
| Asura-Prototyp X-14 | 🔫 Gewehr | 12.000 | 5 | Stufe 3 | 0,2 % | CODE-14 |
| Verfolger | 🔫 Gewehr | 12.000 | 5 | Stufe 3 | 0,2 % | Chaser |
| Sylvari-Stab | 🪄 Stab | 12.000 | 5 | Stufe 3 | 0,2 % | Elf Staff |
| Uralter Stab | 🪄 Stab | 12.000 | 5 | Stufe 3 | 0,2 % | Ancient Staff |
| Stab des Erzmagiers | 🪄 Stab | 12.000 | 5 | Stufe 3 | 0,2 % | Archon Staff |
| Seltsame Arznei | 🔮 Fokus | 12.000 | 5 | Stufe 3 | 0,2 % | Weird Medicine |
| Uralte Kugel | 🔮 Fokus | 12.000 | 5 | Stufe 3 | 0,2 % | Ancient Orb |
| Papierpuppe | 🔮 Fokus | 12.000 | 5 | Stufe 3 | 0,2 % | Paper Doll |

## ★6 Aufgestiegen

| Waffe | Art | 🟡 Gold | 📜 FN | Schmiede | Chance | CQHT |
| --- | --- | --- | --- | --- | --- | --- |
| Purpurnes Falchion | 🗡️ Schwert | 25.000 | 25 | Stufe 3 | 0,1 % | Red Falchion |
| Vulkan | 🔨 Hammer | 25.000 | 25 | Stufe 3 | 0,1 % | Volcano |
| Der Antwortgeber | 🏹 Bogen | 25.000 | 25 | Stufe 3 | 0,1 % | Answerer |
| Teufelsjäger | 🔫 Gewehr | 25.000 | 25 | Stufe 3 | 0,1 % | Devil Hunter |
| Erhabener Stab | 🪄 Stab | 25.000 | 25 | Stufe 3 | 0,1 % | Superior Staff |
| Fantastische Harmonie | 🔮 Fokus | 25.000 | – | Stufe 3 | 0,1 % | Fantasy Harmony |
