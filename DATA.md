# Spieldaten: von Hero Town zu Aetherbastion

Die Tabellen in `js/data/` stammen aus Crusaders Quest: Hero Town (CQHT, Community-Wiki-Exporte) und sind auf Aetherbastion und Guild Wars 2 umgemünzt. Zahlen sind, wo nicht anders vermerkt, 1:1 übernommen. Jeder Eintrag hat ein `src`-Feld mit dem CQHT-Original.

## Begriffe

| CQHT | Aetherbastion | Datei |
|---|---|---|
| Town Hall | 🏛️ Gildenhalle | `buildings.js` |
| Kingdom Fund (/10 min) | 💰 Gildenkasse | `buildings.js` (`gold`) |
| Tent | ⛺ Zeltlager (global, bestimmt das Level-Cap) | `buildings.js` |
| Portal | 🌀 Riss-Portal (öffnet Zonen) | `buildings.js` |
| Skill Lab | 🔬 Asura-Labor | `buildings.js` |
| Smithy | ⚒️ Charr-Schmiede | `buildings.js`, `weapons.js` |
| Bakery | 🍲 Feldküche (eigene Werte, Bäckerei-Daten fehlen) | `buildings.js` |
| Sanctuary of Souls | ⛩️ Heiligtum der Nebel (vorbereitet) | `specials.js` |
| Honor | 📜 Forschungsnotizen | überall |
| Bread G1–G6 | 🍞 Proviant Güte 1–6 | `specials.js` (`RATIONS`) |
| Fruit, Arena Ticket | 🍎 Früchte, 🎟️ Arena-Tickets (noch ohne Funktion) | – |
| Normal-Kapitel 1–5 | je zwei Riss-Zonen (`tier` = Kapitel): Königintal + Kessex-Hügel, Caudecus’ Anwesen + Wanderer-Hügel, Schneekuhlen-Höhen + Katakomben von Ascalon, Gendarran-Felder + Harathi-Hinterland, Blutstrom-Küste + Funkenschwärmersumpf (Namen und Bosse aus `tools/gen-zones.mjs`). X-1..5 → Zone Teil 1, X-6..10 → Teil 2 | `stages.js` |
| Hard X-1 bis X-4 | ☠️ Schwere Stufen 6–7 (X-1/2 in Teil 1, X-3/4 in Teil 2) | `stages.js` |
| L-1 bis L-5 | ⭐ Legendäre Stufe 8 in Teil 2 | `stages.js` |
| Fercrow (Bäckerei-Bosse) | Prüfung der Feldküche (vorbereitet) | `specials.js` |
| Fortress of Souls / Soltar | Kryptis-Seelenfeste / Seelenfürst (vorbereitet) | `specials.js` |
| Crystal Powder/Shard/Crystal | Nebelkristall-Staub/-Splitter/Nebelkristall (vorbereitet) | `specials.js` |
| Warrior, Paladin, Archer, Hunter, Wizard, Priest | Schwert, Hammer, Bogen, Gewehr, Stab, Fokus | `weapons.js` |
| Weapon grade 1–6 | Einfach, Fein, Meisterwerk, Selten, Exotisch, Aufgestiegen | `weapons.js` |

## Was übernommen wurde

- **Stufen:** Level, Kosten und Belohnungen aller 75 Stufen (50 normal, 20 schwer, 5 L). Das Boss-Muster pro Kapitel (3-2-2-2-1 Stufen pro Boss) gilt auch in Aetherbastion. Die CQHT-„cost“ ist der Gold-Preis einer Boss-Herausforderung.
- **Gebäude:** Kosten, Bauzeiten und Gildenhallen-Voraussetzungen je Stufe. Die Gildenhalle braucht wie in CQHT besiegte Stufen (3, 9, 21, 29, 31, 40, 50, 50).
- **Helden:** EXP-Kurve bis Lv. 60, Gold und Forschungsnotizen je 10-Min.-Zyklus, Belohnung pro Level-Up.
- **Waffen:** Alle 84 Waffen mit Güte, Preis (Gold bzw. alternativ 📜), nötiger Schmiede-Stufe und Häufigkeit. Laden mit 3 Angeboten, alle 30 Min. neu, Auffrischen ab 100 Gold (verdoppelt sich).

## Eigene Annahmen und Abweichungen

- **Level-Cap je Zeltlager-Stufe:** 10 / 20 / 30 / 40 / 50 / 55 / 60. Die CQHT-Tabelle nennt nur das Maximum Lv. 60. In CQHT gilt das Cap pro Zelt, hier für alle Helden.
- **Charr-Schmiede** erst ab Gildenhalle 2 (CQHT: sofort), weil sie nicht von Anfang an da sein soll.
- **Riss-Portal** kostet zusätzlich Ätherscherben (5 / 15 / 40 / 100), damit die Scherben einen Zweck behalten.
- **Waffenwerte** (+ATK/+HP je Güte) und die Güte von Boss-Drops je Kapitel (`tier`) sind eigene Werte. CQHT-Waffen haben feste Werte und Zusatz-Statzeilen, die Daten dazu fehlen.
- **Proviant-EXP** (40 bis 15.000 je Güte) und die Proviant-Güte je Kapitel (`tier`, Teil 2 eine Güte höher) sind eigene Werte.
- **Kampfwerte:** Die Monsterstärke ergibt sich aus dem Stufen-Level (`COMBAT.LEVEL_DIFF`). Auf Lv.-60-Stufen steigt sie zusätzlich mit den CQHT-Kosten.
- **Namen:** Bosse von Königintal und Anwesen aus dem Dungeon „Caudecus’ Anwesen“. Die Bosse der anderen Zonen sind GW2-typisch, aber nicht einzeln geprüft. Waffennamen sind freie deutsche Umdichtungen.
- **Noch nicht im Spiel:** Erschöpfung (Fatigue), Früchte, Arena, Waffen-Modifikation, Sonderinhalte aus `specials.js`.
