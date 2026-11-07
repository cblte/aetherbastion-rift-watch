# GW2-Gegner ↔ CQHT-Vorlagen

> Interne Entwicklungs-Referenz für **Aetherbastion: Rift Watch**. Erzeugt mit `node tools/build-gw2-monsters.mjs .` aus `js/data/stages.js` (Zonen 1–10), `tools/data/zones-expansion.json` (Entwurf Zonen 11–20, Wiki-Hinweise in `tools/data/gw2-hints.mjs`) und `dev-data/cqht-monsters.json`. Nicht von Hand bearbeiten.

**Zuordnung:** Zonen 1–10 exakt über die Stufe (`src` = CQHT-Boss; Schergen aus demselben CQHT-Kapitel). Zonen 11–20 nach Rang auf CQHT *Hard*, *Legendär*, Soltar bzw. *Hard*-/*Soul*-Monster. Werte (HP/ATK auf Lv. 1, DEF, Tempo) und Drops sind die der CQHT-Vorlage. Im Spiel rechnet `config.js` die Kampfwerte weiter aus dem Stufen-Level.

**Wiki-Prüfung** (https://wiki-de.guildwars2.com, verschiedene Namen): Bosse ✅ 20 · 🟡 10 · 📄 3 · 🇬🇧 2 · ❌ 100 | Schergen ✅ 36 · 🟡 1 · 📄 3 · 🇬🇧 0 · ❌ 105
✅ Seite mit genau diesem Namen · 🟡 nur eine Variante gefunden (ohne „Champion“, Klammer oder „Verderbt:/Schatten:“, oder über die englische Wiki) · 📄 keine eigene Seite, aber in einem Seitentitel erwähnt (meist ein Event) · 🇬🇧 nur in der englischen Wiki · ❌ keine Seite – vermutlich kein echter GW2-Name oder im deutschen Spiel anders benannt. Schergen-Namen sind oft beschreibend erfunden (z. B. „Banditen-Bomber“); ❌ ist dort weniger schlimm als bei Bossen.

## Portal 1: Kryta

### 1. Königintal

Zone in der Wiki: ✅ [Königintal](https://wiki-de.guildwars2.com/wiki/K%C3%B6nigintal) (en: Queensdale)

| Stufe | Rolle | GW2-Name | Wiki | CQHT-Vorlage | HP Lv.1 | ATK Lv.1 | DEF | Tempo |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 · Lv. 3 | boss | Banditen-Anführerin | ❌ ähnlich: Bandit, Die Blüte der Jugend, Gnashar-Hügel | Emperor Slime (BOSS_1_1_1) | 1.280 | 14 | 5 | 1,5 |
|  | scherge | Banditen-Beutelschneider | ❌ | Dirty Slime (MON_1_2) | 240 | 9 | 8 | 2,5 |
|  | scherge | Banditen-Schläger | ✅ [Banditen-Schläger](https://wiki-de.guildwars2.com/wiki/Banditen-Schl%C3%A4ger) (en: Bandit Bruiser) | Goblin Warrior (MON_1_3) | 400 | 14 | 16,5 | 2,5 |
| 2 · Lv. 5 | boss | Champion Banditen-Saboteur | ✅ [Champion Banditen-Saboteur](https://wiki-de.guildwars2.com/wiki/Champion_Banditen-Saboteur) | Emperor Slime (BOSS_1_1_2) | 1.920 | 21 | 12 | 1,5 |
|  | scherge | Banditen-Bomber | ❌ ähnlich: Miniatur, Die Blüte der Jugend, Banditen-Entführer | Goblin Warrior (MON_1_3) | 400 | 14 | 16,5 | 2,5 |
|  | scherge | Banditen-Brandstifter | ✅ [Banditen-Brandstifter](https://wiki-de.guildwars2.com/wiki/Banditen-Brandstifter) (en: Bandit Firestarter) | Goblin Archer (MON_1_4) | 470 | 16 | 22,5 | 2,5 |
| 3 · Lv. 6 | boss | Champion Eichenherz | 🟡 [Eichenherz](https://wiki-de.guildwars2.com/wiki/Eichenherz) (en: Oakheart) | Emperor Slime (BOSS_1_1_3) | 2.270 | 25 | 16,5 | 1,5 |
|  | scherge | Waldspinne | ✅ [Waldspinne](https://wiki-de.guildwars2.com/wiki/Waldspinne) (en: Forest Spider) | Goblin Warrior (MON_1_3) | 400 | 14 | 16,5 | 2,5 |
|  | scherge | Wildschwein | ❌ ähnlich: Eber, Zähmling, Banditenwinkel-Höhle | Goblin Archer (MON_1_4) | 470 | 16 | 22,5 | 2,5 |
| 4 · Lv. 8 | boss | Champion Krait-Hexe | ✅ [Champion Krait-Hexe](https://wiki-de.guildwars2.com/wiki/Champion_Krait-Hexe) (en: Champion Krait Witch) | Elite Goblin W. (BOSS_1_2_1) | 3.130 | 37 | 23,5 | 1,5 |
|  | scherge | Krait-Sklaventreiber | ❌ ähnlich: Abwerfen der Ketten | Goblin Archer (MON_1_4) | 470 | 16 | 22,5 | 2,5 |
|  | scherge | Krait-Speerträger | ❌ | Werewolf (MON_1_5) | 630 | 20 | 28,5 | 2,5 |
| 5 · Lv. 10 | endboss | Schatten-Behemoth | ✅ [Schatten-Behemoth](https://wiki-de.guildwars2.com/wiki/Schatten-Behemoth) (en: Shadow Behemoth) | Elite Goblin W. (BOSS_1_2_2) | 4.220 | 43 | 30,5 | 1,5 |
|  | scherge | Schattenbrut | ❌ | Werewolf (MON_1_5) | 630 | 20 | 28,5 | 2,5 |
|  | scherge | Verzerrter Geist | ❌ ähnlich: Elitefertigkeit, Versteckte Arkana, Chronik/Eisbrut-Saga | Ent (MON_1_6) | 1.260 | 31 | 44,5 | 2,5 |
| 6 ☠️ · Lv. 60 | boss | Champion Höhlentroll | ✅ [Champion Höhlentroll](https://wiki-de.guildwars2.com/wiki/Champion_H%C3%B6hlentroll) (en: Champion Cave Troll) | Cursed Emperor Slime (BOSS_H_1_1) | 982.681 | 1.009 | 233 | 2,5 |
|  | scherge | Höhlenspinne | ✅ [Höhlenspinne](https://wiki-de.guildwars2.com/wiki/H%C3%B6hlenspinne) (en: Cave Spider) | Orange Slime (MON_H_1_1) | 90.323 | 240 | 230 | 2,5 |
|  | scherge | Junger Troll | ❌ ähnlich: Wurzeln des Schreckens, Champion, Caledon-Wald | Orange Slime (MON_H_1_1) | 90.323 | 240 | 230 | 2,5 |
| 7 ☠️ · Lv. 60 | boss | Verderbt: Schatten-Behemoth | 🟡 [Schatten-Behemoth](https://wiki-de.guildwars2.com/wiki/Schatten-Behemoth) (en: Shadow Behemoth) | Cursed Elite Goblin Warrior (BOSS_H_1_2) | 1.580.242 | 1.023 | 243 | 2,5 |
|  | scherge | Schattenbrut | ❌ | Goblin Fighter (MON_H_1_2) | 117.384 | 244 | 237 | 2,5 |
|  | scherge | Kryptis-Splitter | ❌ ähnlich: Antiker Knochen, Veredelte Heimstatt-Faser, Spielupdate/20230926 | Goblin Fighter (MON_H_1_2) | 117.384 | 244 | 237 | 2,5 |

### 2. Kessex-Hügel

Zone in der Wiki: ✅ [Kessex-Hügel](https://wiki-de.guildwars2.com/wiki/Kessex-H%C3%BCgel) (en: Kessex Hills)

| Stufe | Rolle | GW2-Name | Wiki | CQHT-Vorlage | HP Lv.1 | ATK Lv.1 | DEF | Tempo |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 · Lv. 12 | boss | Banditen-Schläger Grasp | ❌ | Ogre (BOSS_1_3_1) | 9.460 | 84 | 41,5 | 1,5 |
|  | scherge | Banditen-Rabauke | ❌ ähnlich: Liste der Waffensets, Xunlai-Jade-Verkäufer, Eine vornehme Gruppe | Werewolf (MON_1_5) | 630 | 20 | 28,5 | 2,5 |
|  | scherge | Banditen-Scharfschütze | ❌ ähnlich: Gleitschirm, Draufgänger, Erscheinungsbildpaket Banditen-Heckenschütze | Ent (MON_1_6) | 1.260 | 31 | 44,5 | 2,5 |
| 2 · Lv. 14 | boss | Champion Krait-Hypnotiseur | ❌ | Ogre (BOSS_1_3_2) | 10.460 | 94 | 47,5 | 1,5 |
|  | scherge | Krait-Mystiker | ❌ ähnlich: Vergeltung (Persönliche Geschichte), Die Bewegung der Welt, Spielupdate/20131029 | Ent (MON_1_6) | 1.260 | 31 | 44,5 | 2,5 |
|  | scherge | Krait-Wächter | ❌ ähnlich: Zustandsschaden, Miniatur, Krait | Ent (MON_1_6) | 1.260 | 31 | 44,5 | 2,5 |
| 3 · Lv. 16 | boss | Champion Toxischer Wurm | 🟡 [Toxischer Wurm](https://wiki-de.guildwars2.com/wiki/Toxischer_Wurm) (en: Toxic Wurm) | Raging Ogre (BOSS_1_4_1) | 12.190 | 104 | 54,5 | 1,5 |
|  | scherge | Toxischer Larvenwurm | ❌ | Ent (MON_1_6) | 1.260 | 31 | 44,5 | 2,5 |
|  | scherge | Sumpfdrake | ❌ | Ent (MON_1_6) | 1.260 | 31 | 44,5 | 2,5 |
| 4 · Lv. 18 | boss | Zentauren-Oberhäuptling | ❌ | Raging Ogre (BOSS_1_4_2) | 14.080 | 114 | 59,5 | 1,5 |
|  | scherge | Zentauren-Krieger | ❌ ähnlich: Sylvari, Verkrüppelung, Wiedergänger | Ent (MON_1_6) | 1.260 | 31 | 44,5 | 2,5 |
|  | scherge | Zentauren-Späher | ❌ ähnlich: Seraphen, Harathi-Hinterland, Helft Bronson, die Truppen der Zentauren zu stören | Ent (MON_1_6) | 1.260 | 31 | 44,5 | 2,5 |
| 5 · Lv. 20 | endboss | Champion Toxischer Spinnen-König | ❌ ähnlich: Trank, Champion, Miniatur | Golem (BOSS_1_5) | 17.250 | 123 | 72,5 | 1,5 |
|  | scherge | Toxische Spinne | ✅ [Toxische Spinne](https://wiki-de.guildwars2.com/wiki/Toxische_Spinne) (en: Toxic Spider) | Ent (MON_1_6) | 1.260 | 31 | 44,5 | 2,5 |
|  | scherge | Toxischer Wucherer | ❌ ähnlich: Chronik/Staffel 1 der Lebendigen Welt, Spielupdate/20170808, Spielupdate/20180508 | Ent (MON_1_6) | 1.260 | 31 | 44,5 | 2,5 |
| 6 ☠️ · Lv. 60 | boss | Blut-Hexe | ❌ ähnlich: Baumgrenzen-Fälle, Krait, Miniatur | Mighty Ogre (BOSS_H_1_3) | 2.177.802 | 1.036 | 253 | 2,5 |
|  | scherge | Hexen-Diener | ❌ ähnlich: Der Schatten des Verrückten Königs (2015), Der Schatten des Verrückten Königs (2018), Der Schatten des Verrückten Königs (2021) | Cursed Werewolf (MON_H_1_3) | 144.444 | 249 | 243 | 2,5 |
|  | scherge | Blutfledermaus | ❌ | Cursed Werewolf (MON_H_1_3) | 144.444 | 249 | 243 | 2,5 |
| 7 ☠️ · Lv. 60 | boss | Verderbt: Toxischer Spinnen-König | ❌ ähnlich: Trank, Champion, Miniatur | Ogre Elite Fighter (BOSS_H_1_4) | 2.775.363 | 1.050 | 263 | 1 |
|  | scherge | Toxische Spinne | ✅ [Toxische Spinne](https://wiki-de.guildwars2.com/wiki/Toxische_Spinne) (en: Toxic Spider) | Cursed Ent (MON_H_1_4) | 171.504 | 253 | 250 | 2,5 |
|  | scherge | Kryptis-Splitter | ❌ ähnlich: Antiker Knochen, Veredelte Heimstatt-Faser, Spielupdate/20230926 | Cursed Ent (MON_H_1_4) | 171.504 | 253 | 250 | 2,5 |
| 8 ⭐ · Lv. 60 | boss | Schatten: Toxischer Spinnen-König | ❌ ähnlich: Trank, Champion, Miniatur | Dark Golem (BOSS_H_L_1) | 12.933.897 | 1.277 | 433 | 0,5 |
|  | scherge | Kryptis-Plünderer | ❌ ähnlich: Antiker Knochen, Phiole mit kraftvollem Blut, Beherrschungspunkt | Soul-Stolen Werewolf (MON_SOUL_1_3) | 196.390 | 278 | 169 | 2,5 |
|  | scherge | Kryptis-Peiniger | ❌ ähnlich: Beherrschungspunkt | Soul-Stolen Ent (MON_SOUL_1_4) | 225.350 | 287 | 180 | 2,5 |

### 3. Caudecus’ Anwesen

Zone in der Wiki: ✅ [Caudecus' Anwesen](https://wiki-de.guildwars2.com/wiki/Caudecus'_Anwesen) (en: Caudecus's Manor)

| Stufe | Rolle | GW2-Name | Wiki | CQHT-Vorlage | HP Lv.1 | ATK Lv.1 | DEF | Tempo |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 · Lv. 22 | boss | Separatisten-Belagerer | ❌ ähnlich: Belag-Kreuzung, Axtzug-Kanal, Felder der Verwüstung | Hard Mudman (BOSS_2_1_1) | 15.560 | 113 | 77,5 | 1,5 |
|  | scherge | Separatisten-Kämpfer | ❌ ähnlich: Beutel mit stibitzten Waren, Devast-Distrikt, Beutekiste | Mudman (MON_2_2) | 1.840 | 40 | 71,5 | 2,5 |
|  | scherge | Separatisten-Bomber | ✅ [Separatisten-Bomber](https://wiki-de.guildwars2.com/wiki/Separatisten-Bomber) (en: Separatist Bomber) | Mummy (MON_2_3) | 2.080 | 45 | 80 | 2,5 |
| 2 · Lv. 24 | boss | Königlicher Leibwächter Pete | ❌ ähnlich: Logan Thackeray | Hard Mudman (BOSS_2_1_2) | 17.110 | 128 | 82,5 | 1,5 |
|  | scherge | Königlicher Wächter | ❌ ähnlich: Waffengalerie/Schild, Waffengalerie/Dreizack, Lorbeer-Kaufmann | Mummy (MON_2_3) | 2.080 | 45 | 80 | 2,5 |
|  | scherge | Separatisten-Feldwebel | ❌ ähnlich: Ebon-Vorhut, Verbogener Dietrich, Beutekiste | Old Mummy (MON_2_4) | 2.190 | 47 | 85 | 2,5 |
| 3 · Lv. 25 | boss | Butler Michiels | ❌ | Hard Mudman (BOSS_2_1_3) | 17.320 | 151 | 85 | 1,5 |
|  | scherge | Diener des Hauses | ❌ ähnlich: Veteran Brigadegeneral Kernel, Verdächtige Aktivitäten, Alarmstufe Rot | Mummy (MON_2_3) | 2.080 | 45 | 80 | 2,5 |
|  | scherge | Abgerichteter Wachhund | ❌ | Old Mummy (MON_2_4) | 2.190 | 47 | 85 | 2,5 |
| 4 · Lv. 27 | boss | Gepfefferte Bridgette | ❌ | Pharaoh Mummy (BOSS_2_2_1) | 18.400 | 193 | 90 | 1,5 |
|  | scherge | Seraphen-Deserteur | ❌ ähnlich: Gezielte Verhandlung, Reparateur, Liste der Aufgaben | Old Mummy (MON_2_4) | 2.190 | 47 | 85 | 2,5 |
|  | scherge | Banditen-Kanonier | ✅ [Banditen-Kanonier](https://wiki-de.guildwars2.com/wiki/Banditen-Kanonier) (en: Bandit Cannoneer) | Black Lizardman (MON_2_5) | 2.510 | 55 | 90 | 2,5 |
| 5 · Lv. 29 | endboss | Separatisten-Hauptmann DeLana | ❌ ähnlich: DeLana-Geldbörse, Verbogener Dietrich, Beutel mit stibitzten Waren | Pharaoh Mummy (BOSS_2_2_2) | 22.250 | 226 | 95 | 1,5 |
|  | scherge | Separatisten-Scharfschütze | ❌ ähnlich: Verbogener Dietrich, Beutel mit stibitzten Waren, Beutekiste | Black Lizardman (MON_2_5) | 2.510 | 55 | 90 | 2,5 |
|  | scherge | Separatisten-Leutnant | ❌ ähnlich: Champion, Ebon-Vorhut, Weggeworfene Kluft | Anubis (MON_2_6) | 3.590 | 83 | 100 | 2,5 |
| 6 ☠️ · Lv. 60 | boss | Turmaine | 🇬🇧 [Turmaine](https://wiki.guildwars2.com/wiki/Turmaine) | Emperor Mudman (BOSS_H_2_1) | 3.372.924 | 1.063 | 273 | 2,5 |
|  | scherge | Asura-Wachgolem | ❌ | Elite Sandman (MON_H_2_1) | 198.565 | 257 | 256 | 2,5 |
|  | scherge | Banditen-Raketengeschütz | ❌ | Elite Sandman (MON_H_2_1) | 198.565 | 257 | 256 | 2,5 |
| 7 ☠️ · Lv. 60 | boss | Frost | 🇬🇧 [Frost](https://wiki.guildwars2.com/wiki/Frost) | Ancient Pharaoh Mummy (BOSS_H_2_2) | 3.970.485 | 1.076 | 283 | 2,5 |
|  | scherge | Separatisten-Scharfschütze | ❌ ähnlich: Verbogener Dietrich, Beutel mit stibitzten Waren, Beutekiste | Sturdy Mummy (MON_H_2_2) | 225.625 | 261 | 263 | 2,5 |
|  | scherge | Kryptis-Splitter | ❌ ähnlich: Antiker Knochen, Veredelte Heimstatt-Faser, Spielupdate/20230926 | Sturdy Mummy (MON_H_2_2) | 225.625 | 261 | 263 | 2,5 |

## Portal 2: Zittergipfel & Ascalon

### 4. Wanderer-Hügel

Zone in der Wiki: ✅ [Wanderer-Hügel](https://wiki-de.guildwars2.com/wiki/Wanderer-H%C3%BCgel) (en: Wayfarer Foothills)

| Stufe | Rolle | GW2-Name | Wiki | CQHT-Vorlage | HP Lv.1 | ATK Lv.1 | DEF | Tempo |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 · Lv. 31 | boss | Champion Minotauren-Bulle | ❌ ähnlich: Minotaurus, Borealis-Wald, Die Osenfold-Schneide | Basilisk (BOSS_2_3_1) | 29.100 | 269 | 105 | 1,5 |
|  | scherge | Minotaurus | ✅ [Minotaurus](https://wiki-de.guildwars2.com/wiki/Minotaurus) (en: Minotaur) | Anubis (MON_2_6) | 3.590 | 83 | 100 | 2,5 |
|  | scherge | Schneeleopard | ✅ [Schneeleopard](https://wiki-de.guildwars2.com/wiki/Schneeleopard) (en: Snow Leopard) | Anubis (MON_2_6) | 3.590 | 83 | 100 | 2,5 |
| 2 · Lv. 33 | boss | Champion Grawl-Häuptling | ❌ ähnlich: Grawl, Chronik/Meine Geschichte/Helfende Hände, Heldenherausforderung | Basilisk (BOSS_2_3_2) | 34.100 | 276 | 110 | 1,5 |
|  | scherge | Grawl-Krieger | ❌ ähnlich: Grawl, Geächtetenkluft, Frusenfell-Bach | Anubis (MON_2_6) | 3.590 | 83 | 100 | 2,5 |
|  | scherge | Grawl-Schamane | ✅ [Grawl-Schamane](https://wiki-de.guildwars2.com/wiki/Grawl-Schamane) (en: Grawl Shaman) | Anubis (MON_2_6) | 3.590 | 83 | 100 | 2,5 |
| 3 · Lv. 35 | boss | Champion Eisbrut-Wolf | ✅ [Champion Eisbrut-Wolf](https://wiki-de.guildwars2.com/wiki/Champion_Eisbrut-Wolf) (en: Champion Icebrood Wolf) | Huge Basilisk (BOSS_2_4_1) | 36.410 | 289 | 115 | 1,5 |
|  | scherge | Eisbrut-Wolf | ✅ [Eisbrut-Wolf](https://wiki-de.guildwars2.com/wiki/Eisbrut-Wolf) (en: Icebrood Wolf) | Anubis (MON_2_6) | 3.590 | 83 | 100 | 2,5 |
|  | scherge | Eisbrut-Elementar | ✅ [Eisbrut-Elementar](https://wiki-de.guildwars2.com/wiki/Eisbrut-Elementar) (en: Icebrood Elemental) | Anubis (MON_2_6) | 3.590 | 83 | 100 | 2,5 |
| 4 · Lv. 37 | boss | Schamanen-Vorbote des Jormag | ❌ ähnlich: Garantierte Garderoben-Freischaltung | Huge Basilisk (BOSS_2_4_2) | 36.920 | 301 | 120 | 1,5 |
|  | scherge | Sohn des Svanir | ❌ ähnlich: Sohn Svanirs, Eisbrut, Halvaunt-Schneefeld | Anubis (MON_2_6) | 3.590 | 83 | 100 | 2,5 |
|  | scherge | Svanir-Eisbrecher | 📄 [Mini Svanir-Eisbrecher](https://wiki-de.guildwars2.com/wiki/Mini_Svanir-Eisbrecher) | Anubis (MON_2_6) | 3.590 | 83 | 100 | 2,5 |
| 5 · Lv. 40 | endboss | Svanir-Schamane | ❌ ähnlich: Die Söhne Svanirs, Wanderer-Hügel, Eisbrut | Sandworm (BOSS_2_5) | 51.570 | 543 | 142,5 | 1,5 |
|  | scherge | Svanir-Schamanin | ❌ ähnlich: Wanderer-Hügel, Schneekuhlenhöhen, Ehrt den Geist des Bären | Anubis (MON_2_6) | 3.590 | 83 | 100 | 2,5 |
|  | scherge | Eisgeist | ❌ | Anubis (MON_2_6) | 3.590 | 83 | 100 | 2,5 |
| 6 ☠️ · Lv. 60 | boss | Eisbrut-Goliath | ✅ [Eisbrut-Goliath](https://wiki-de.guildwars2.com/wiki/Eisbrut-Goliath) (en: Icebrood Goliath) | Red Basilisk (BOSS_H_2_3) | 4.568.046 | 1.090 | 293 | 2,5 |
|  | scherge | Eisbrut-Bär | ❌ ähnlich: Beutekiste, Die Söhne Svanirs, Geister der Wildnis | Cursed Desert Lizardman (MON_H_2_3) | 252.685 | 265 | 269 | 2,5 |
|  | scherge | Eisbrut-Wyvern | ❌ ähnlich: Guild Wars 2: Heart of Thorns, Miniatur, Elite | Cursed Desert Lizardman (MON_H_2_3) | 252.685 | 265 | 269 | 2,5 |
| 7 ☠️ · Lv. 60 | boss | Verderbt: Svanir-Schamane | ❌ ähnlich: Die Söhne Svanirs, Wanderer-Hügel, Eisbrut | Cataclysm Basilisk (BOSS_H_2_4) | 5.165.606 | 1.103 | 303 | 1 |
|  | scherge | Svanir-Schamanin | ❌ ähnlich: Wanderer-Hügel, Schneekuhlenhöhen, Ehrt den Geist des Bären | Cursed Anubis (MON_H_2_4) | 279.746 | 270 | 275 | 2,5 |
|  | scherge | Kryptis-Splitter | ❌ ähnlich: Antiker Knochen, Veredelte Heimstatt-Faser, Spielupdate/20230926 | Cursed Anubis (MON_H_2_4) | 279.746 | 270 | 275 | 2,5 |
| 8 ⭐ · Lv. 60 | boss | Schatten: Svanir-Schamane | ❌ ähnlich: Die Söhne Svanirs, Wanderer-Hügel, Eisbrut | Dark Sandworm (BOSS_H_L_2) | 13.531.458 | 1.291 | 443 | 0,5 |
|  | scherge | Kryptis-Plünderer | ❌ ähnlich: Antiker Knochen, Phiole mit kraftvollem Blut, Beherrschungspunkt | Soul-Stolen Lizardman (MON_SOUL_2_3) | 312.240 | 315 | 212 | 2,5 |
|  | scherge | Kryptis-Peiniger | ❌ ähnlich: Beherrschungspunkt | Soul-Stolen Anubis (MON_SOUL_2_4) | 341.200 | 324 | 223 | 2,5 |

### 5. Schneekuhlen-Höhen

Zone in der Wiki: ❌ ähnlich: Frostfang III: Zahn des Frostfangs

| Stufe | Rolle | GW2-Name | Wiki | CQHT-Vorlage | HP Lv.1 | ATK Lv.1 | DEF | Tempo |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 · Lv. 41 | boss | Schneeleoparden-Matriarchin | ❌ ähnlich: Junger Feuer-Wyvern | Monster Anglerfish (BOSS_3_1_1) | 45.860 | 254 | 140 | 1,5 |
|  | scherge | Schneeleopard | ✅ [Schneeleopard](https://wiki-de.guildwars2.com/wiki/Schneeleopard) (en: Snow Leopard) | Pink Starfish (MON_3_4) | 8.010 | 105 | 132 | 2,5 |
|  | scherge | Eiswolf | ❌ ähnlich: Winziger Fangzahn, Großer Fangzahn, Fangzahn | Blue Jellyfish (MON_3_5) | 8.420 | 123 | 138 | 2,5 |
| 2 · Lv. 42 | boss | Champion Svanir-Häscher | ❌ ähnlich: Was übrig bleibt, Miniatur, Taigan-Hain | Monster Anglerfish (BOSS_3_1_2) | 46.610 | 297 | 142,5 | 1,5 |
|  | scherge | Svanir-Jäger | ✅ [Svanir-Jäger](https://wiki-de.guildwars2.com/wiki/Svanir-J%C3%A4ger) (en: Svanir Hunter) | Pink Starfish (MON_3_4) | 8.010 | 105 | 132 | 2,5 |
|  | scherge | Svanir-Plünderer | ❌ ähnlich: Champion, Miniatur, Yakbiegung | Blue Jellyfish (MON_3_5) | 8.420 | 123 | 138 | 2,5 |
| 3 · Lv. 43 | boss | Champion Frost-Grawl | ❌ ähnlich: Ein festlich-froher Wintertag (2014), Winziges Totem, Kleines Totem | Monster Anglerfish (BOSS_3_1_3) | 71.520 | 303 | 145 | 1,5 |
|  | scherge | Frost-Grawl | ❌ ähnlich: Ein festlich-froher Wintertag (2014), Winziges Totem, Kleines Totem | Blue Jellyfish (MON_3_5) | 8.420 | 123 | 138 | 2,5 |
|  | scherge | Grawl-Steinwerfer | ❌ | Mermaid Wizard (MON_3_6) | 9.870 | 135 | 144 | 2,5 |
| 4 · Lv. 44 | boss | Dredge-Tunnelmeister | ❌ | Black Starfish (BOSS_3_2_1) | 78.320 | 353 | 147,5 | 1,5 |
|  | scherge | Dredge-Bergarbeiter | ❌ | Blue Jellyfish (MON_3_5) | 8.420 | 123 | 138 | 2,5 |
|  | scherge | Dredge-Schallkanone | ❌ | Mermaid Wizard (MON_3_6) | 9.870 | 135 | 144 | 2,5 |
| 5 · Lv. 45 | endboss | Drachen-Schamane der Svanir | ❌ ähnlich: Besiegt den Drachen-Schamanen der Svanir, Die Söhne Svanirs, Wanderer-Hügel | Black Starfish (BOSS_3_2_2) | 86.080 | 418 | 150 | 1,5 |
|  | scherge | Svanir-Drachenrufer | ❌ | Mermaid Wizard (MON_3_6) | 9.870 | 135 | 144 | 2,5 |
|  | scherge | Eisbrut-Diener | ✅ [Eisbrut-Diener](https://wiki-de.guildwars2.com/wiki/Eisbrut-Diener) (en: Icebrood Minion) | Mermaid Wizard (MON_3_6) | 9.870 | 135 | 144 | 2,5 |
| 6 ☠️ · Lv. 60 | boss | Eisbrut-Riese | ✅ [Eisbrut-Riese](https://wiki-de.guildwars2.com/wiki/Eisbrut-Riese) (en: Icebrood Colossus) | Cursed Monster Angler (BOSS_H_3_1) | 5.763.167 | 1.117 | 313 | 2,5 |
|  | scherge | Eisbrut-Troll | ✅ [Eisbrut-Troll](https://wiki-de.guildwars2.com/wiki/Eisbrut-Troll) (en: Icebrood Troll) | Red Angler (MON_H_3_1) | 306.806 | 274 | 282 | 2,5 |
|  | scherge | Eisbrut-Koloss | ❌ ähnlich: Miniatur, Beherrschungspunkt, Chuka und Champawat III: Tigris | Red Angler (MON_H_3_1) | 306.806 | 274 | 282 | 2,5 |
| 7 ☠️ · Lv. 60 | boss | Verderbt: Drachen-Schamane der Svanir | ❌ ähnlich: Besiegt den Drachen-Schamanen der Svanir, Die Söhne Svanirs, Wanderer-Hügel | Cursed Blackstar (BOSS_H_3_2) | 6.360.728 | 1.130 | 323 | 2,5 |
|  | scherge | Svanir-Drachenrufer | ❌ | Cursed Redstar (MON_H_3_2) | 333.867 | 278 | 288 | 2,5 |
|  | scherge | Kryptis-Splitter | ❌ ähnlich: Antiker Knochen, Veredelte Heimstatt-Faser, Spielupdate/20230926 | Cursed Redstar (MON_H_3_2) | 333.867 | 278 | 288 | 2,5 |

### 6. Katakomben von Ascalon

Zone in der Wiki: ✅ [Katakomben von Ascalon](https://wiki-de.guildwars2.com/wiki/Katakomben_von_Ascalon) (en: Ascalonian Catacombs)

| Stufe | Rolle | GW2-Name | Wiki | CQHT-Vorlage | HP Lv.1 | ATK Lv.1 | DEF | Tempo |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 · Lv. 46 | boss | Höhlentroll | ✅ [Höhlentroll](https://wiki-de.guildwars2.com/wiki/H%C3%B6hlentroll) (en: Cave Troll) | Shark Warrior (BOSS_3_3_1) | 96.810 | 478 | 152,5 | 1,5 |
|  | scherge | Geister-Krieger | ❌ ähnlich: Geist, Ascalonischer Geist, Waldläufer | Mermaid Wizard (MON_3_6) | 9.870 | 135 | 144 | 2,5 |
|  | scherge | Geister-Waldläufer | ❌ ähnlich: Waldläufer, Geist, Ascalonischer Geist | Mermaid Wizard (MON_3_6) | 9.870 | 135 | 144 | 2,5 |
| 2 · Lv. 47 | boss | Kasha Schwarzblut | ✅ [Kasha Schwarzblut](https://wiki-de.guildwars2.com/wiki/Kasha_Schwarzblut) (en: Kasha Blackblood) | Shark Warrior (BOSS_3_3_2) | 98.990 | 547 | 155 | 1,5 |
|  | scherge | Flammenlegion-Kultist | ❌ | Mermaid Wizard (MON_3_6) | 9.870 | 135 | 144 | 2,5 |
|  | scherge | Flammenlegion-Zerstörer | ❌ ähnlich: Meta-Event | Mermaid Wizard (MON_3_6) | 9.870 | 135 | 144 | 2,5 |
| 3 · Lv. 48 | boss | Ralena & Vassar | ❌ ähnlich: Gruft der Liebenden, Vassar, Katakomben von Ascalon (Story) | EliteShark W. (BOSS_3_4_1) | 101.180 | 553 | 157,5 | 1,5 |
|  | scherge | Geister-Liebende | ❌ ähnlich: Katakomben von Ascalon, Katakomben von Ascalon (Story), Gruft der Liebenden | Mermaid Wizard (MON_3_6) | 9.870 | 135 | 144 | 2,5 |
|  | scherge | Geister-Wächter | ❌ ähnlich: Waldläufer, Dschinn, Geistertal | Mermaid Wizard (MON_3_6) | 9.870 | 135 | 144 | 2,5 |
| 4 · Lv. 49 | boss | Geisterhafter Nekromant | ❌ ähnlich: Geist, Weißer Mantel, Kraftvoller Giftbeutel | EliteShark W. (BOSS_3_4_2) | 101.770 | 640 | 160 | 1,5 |
|  | scherge | Knochen-Diener | ❌ ähnlich: Eisbrut-Elementar, Knochen-Spitzhacke, Sammelwerkzeug | Mermaid Wizard (MON_3_6) | 9.870 | 135 | 144 | 2,5 |
|  | scherge | Geister-Nekromant | ❌ ähnlich: Geist, Ascalonischer Geist, Waldläufer | Mermaid Wizard (MON_3_6) | 9.870 | 135 | 144 | 2,5 |
| 5 · Lv. 50 | endboss | König Adelbern | ✅ [König Adelbern](https://wiki-de.guildwars2.com/wiki/K%C3%B6nig_Adelbern) (en: King Adelbern) | Kraken (BOSS_3_5) | 117.770 | 701 | 162,5 | 1,5 |
|  | scherge | Ascalonischer Geisterritter | ❌ | Mermaid Wizard (MON_3_6) | 9.870 | 135 | 144 | 2,5 |
|  | scherge | Geister-Elite | ❌ ähnlich: Geist, Ascalonischer Geist, Geschmiedeter | Mermaid Wizard (MON_3_6) | 9.870 | 135 | 144 | 2,5 |
| 6 ☠️ · Lv. 60 | boss | Meister-Nekromant | ❌ ähnlich: Nekromant, Zustandsschaden, Klasse | Mighty Shark Warrior (BOSS_H_3_3) | 6.958.289 | 1.143 | 333 | 2,5 |
|  | scherge | Untoter Kanonier | ❌ ähnlich: Orden der Gerüchte, Jackdaw-Riff, Neustrand-Klippen | Corrupted Jellyfish (MON_H_3_3) | 360.927 | 282 | 295 | 2,5 |
|  | scherge | Knochen-Schrecken | ❌ ähnlich: Stabilität, Schnitter, Sylvari | Corrupted Jellyfish (MON_H_3_3) | 360.927 | 282 | 295 | 2,5 |
| 7 ☠️ · Lv. 60 | boss | Verderbt: König Adelbern | 🟡 [König Adelbern](https://wiki-de.guildwars2.com/wiki/K%C3%B6nig_Adelbern) (en: King Adelbern) | Mighty Elite Shark Warrior (BOSS_H_3_4) | 7.555.850 | 1.157 | 343 | 1 |
|  | scherge | Ascalonischer Geisterritter | ❌ | Mermaid Witch (MON_H_3_4) | 387.987 | 286 | 301 | 2,5 |
|  | scherge | Kryptis-Splitter | ❌ ähnlich: Antiker Knochen, Veredelte Heimstatt-Faser, Spielupdate/20230926 | Mermaid Witch (MON_H_3_4) | 387.987 | 286 | 301 | 2,5 |
| 8 ⭐ · Lv. 60 | boss | Schatten: König Adelbern | 🟡 [König Adelbern](https://wiki-de.guildwars2.com/wiki/K%C3%B6nig_Adelbern) (en: King Adelbern) | Dark Kraken (BOSS_H_L_3) | 14.129.018 | 1.304 | 453 | 0,5 |
|  | scherge | Kryptis-Plünderer | ❌ ähnlich: Antiker Knochen, Phiole mit kraftvollem Blut, Beherrschungspunkt | Soul-Stolen Jellyfish (MON_SOUL_3_3) | 428.090 | 352 | 255,5 | 2,5 |
|  | scherge | Kryptis-Peiniger | ❌ ähnlich: Beherrschungspunkt | Soul-Stolen Mermaid Wizard (MON_SOUL_3_4) | 457.050 | 361 | 266 | 2,5 |

## Portal 3: Herz von Tyria

### 7. Gendarran-Felder

Zone in der Wiki: ✅ [Gendarran-Felder](https://wiki-de.guildwars2.com/wiki/Gendarran-Felder) (en: Gendarran Fields)

| Stufe | Rolle | GW2-Name | Wiki | CQHT-Vorlage | HP Lv.1 | ATK Lv.1 | DEF | Tempo |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 · Lv. 51 | boss | Piratinnen-Kapitänin | ❌ | Hell Squishy (BOSS_4_1_1) | 178.230 | 578 | 190 | 1,5 |
|  | scherge | Piraten-Entermatrose | ❌ | Ash Squishy (MON_4_2) | 10.380 | 146 | 166 | 2,5 |
|  | scherge | Piraten-Kanonier | ❌ ähnlich: Pirat, Gendarr-See, Jackdaw-Riff | Flame Spirit (MON_4_3) | 13.910 | 149 | 172 | 2,5 |
| 2 · Lv. 52 | boss | Champion Schlamm-Monstrum | ❌ | Hell Squishy (BOSS_4_1_2) | 201.560 | 587 | 177,5 | 1,5 |
|  | scherge | Schlamm-Elementar | ❌ ähnlich: Liste der Elementarmagierfertigkeiten, Weber, Hilfsfertigkeit | Ash Squishy (MON_4_2) | 10.380 | 146 | 166 | 2,5 |
|  | scherge | Sumpfkrebs | ❌ | Flame Spirit (MON_4_3) | 13.910 | 149 | 172 | 2,5 |
| 3 · Lv. 53 | boss | Zentauren-Belagerungsmeister | ❌ ähnlich: Zentaur, Steinbohrung-Kammern, Wächterpass | Hell Squishy (BOSS_4_1_3) | 223.940 | 596 | 180 | 1,5 |
|  | scherge | Zentauren-Belagerer | ❌ ähnlich: Zentauren-Katapult, Trébuchet (Tödliche Gewalt), Galen | Flame Spirit (MON_4_3) | 13.910 | 149 | 172 | 2,5 |
|  | scherge | Zentauren-Bogenschütze | ❌ ähnlich: Seraphen, Zentaur, Tamini-Bogenschütze | Evil Flame Spirit (MON_4_4) | 14.010 | 147 | 175,5 | 2,5 |
| 4 · Lv. 54 | boss | Dredge-Kommandant | ❌ | Hellfire Spirit (BOSS_4_2_1) | 259.600 | 633 | 182,5 | 1,5 |
|  | scherge | Dredge-Sprengmeister | ❌ | Evil Flame Spirit (MON_4_4) | 14.010 | 147 | 175,5 | 2,5 |
|  | scherge | Dredge-Kommissar | ❌ | Elite Lizardman (MON_4_5) | 16.630 | 158 | 179 | 2,5 |
| 5 · Lv. 55 | endboss | Kriegsmeister Ulgoths Vorbote | ❌ | Hellfire Spirit (BOSS_4_2_2) | 259.300 | 642 | 185 | 1,5 |
|  | scherge | Modniir-Krieger | ❌ ähnlich: Zentaur, Miniatur, Champion | Elite Lizardman (MON_4_5) | 16.630 | 158 | 179 | 2,5 |
|  | scherge | Zentauren-Kriegstrommler | ❌ | Ifrit (MON_4_6) | 18.150 | 219 | 182,5 | 2,5 |
| 6 ☠️ · Lv. 60 | boss | Champion Banditen-Kriegsherr | ❌ ähnlich: Königin Jennah, Spielupdate/20200225, Spielupdate/Februar 2020 | Volcano Sludge (BOSS_H_4_1) | 8.153.410 | 1.170 | 353 | 2,5 |
|  | scherge | Banditen-Kriegsherr-Garde | ❌ | Cursed Lava Sludge (MON_H_4_1) | 415.048 | 291 | 308 | 2,5 |
|  | scherge | Banditen-Plünderer | ❌ ähnlich: Champion, Zentaur, Miniatur | Cursed Lava Sludge (MON_H_4_1) | 415.048 | 291 | 308 | 2,5 |
| 7 ☠️ · Lv. 60 | boss | Verderbt: Kriegsmeister Ulgoths Vorbote | ❌ | Cursed Hellfire Spirit (BOSS_H_4_2) | 8.750.971 | 1.184 | 363 | 2,5 |
|  | scherge | Modniir-Krieger | ❌ ähnlich: Zentaur, Miniatur, Champion | Cursed Fire Spirit (MON_H_4_2) | 442.108 | 295 | 314 | 2,5 |
|  | scherge | Kryptis-Splitter | ❌ ähnlich: Antiker Knochen, Veredelte Heimstatt-Faser, Spielupdate/20230926 | Cursed Fire Spirit (MON_H_4_2) | 442.108 | 295 | 314 | 2,5 |

### 8. Harathi-Hinterland

Zone in der Wiki: ✅ [Harathi-Hinterland](https://wiki-de.guildwars2.com/wiki/Harathi-Hinterland) (en: Harathi Hinterlands)

| Stufe | Rolle | GW2-Name | Wiki | CQHT-Vorlage | HP Lv.1 | ATK Lv.1 | DEF | Tempo |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 · Lv. 56 | boss | Harathi-Schlächter | ❌ ähnlich: Rätsel, Gebiet, Meta-Event | Stone Giant (BOSS_4_3_1) | 276.260 | 736 | 187,5 | 1,5 |
|  | scherge | Harathi-Krieger | ✅ [Harathi-Krieger](https://wiki-de.guildwars2.com/wiki/Harathi-Krieger) (en: Harathi Warrior) | Ifrit (MON_4_6) | 18.150 | 219 | 182,5 | 2,5 |
|  | scherge | Harathi-Speerwerfer | ❌ ähnlich: PvE-Belagerungswaffe | Ifrit (MON_4_6) | 18.150 | 219 | 182,5 | 2,5 |
| 2 · Lv. 57 | boss | Champion Modniir-Häuptling | ❌ ähnlich: Liste der Waffensets, Zentaur, Champion | Stone Giant (BOSS_4_3_2) | 310.810 | 747 | 190 | 1,5 |
|  | scherge | Modniir-Berserker | ✅ [Modniir-Berserker](https://wiki-de.guildwars2.com/wiki/Modniir-Berserker) (en: Modniir Defender) | Ifrit (MON_4_6) | 18.150 | 219 | 182,5 | 2,5 |
|  | scherge | Modniir-Schamane | ❌ ähnlich: Miniatur, Champion, Welt-Boss | Ifrit (MON_4_6) | 18.150 | 219 | 182,5 | 2,5 |
| 3 · Lv. 58 | boss | Kolossaler Erdelementar | ❌ | Darkfire Giant (BOSS_4_4_1) | 316.100 | 758 | 192,5 | 1,5 |
|  | scherge | Erdelementar | 📄 [Instabiler Erdelementar](https://wiki-de.guildwars2.com/wiki/Instabiler_Erdelementar) | Ifrit (MON_4_6) | 18.150 | 219 | 182,5 | 2,5 |
|  | scherge | Steinwüter | ❌ | Ifrit (MON_4_6) | 18.150 | 219 | 182,5 | 2,5 |
| 4 · Lv. 59 | boss | Seraphen-Verräter Valen | ❌ ähnlich: Biographie/Details | Darkfire Giant (BOSS_4_4_2) | 333.080 | 768 | 195 | 1,5 |
|  | scherge | Abtrünniger Seraph | ❌ ähnlich: Ebonfalke-Festung, Die Wachsamen, Ebon-Vorhut | Ifrit (MON_4_6) | 18.150 | 219 | 182,5 | 2,5 |
|  | scherge | Seraphen-Deserteur | ❌ ähnlich: Gezielte Verhandlung, Reparateur, Liste der Aufgaben | Ifrit (MON_4_6) | 18.150 | 219 | 182,5 | 2,5 |
| 5 · Lv. 60 | endboss | Kriegsmeister Ulgoth | ❌ | Dragon (BOSS_4_5) | 385.120 | 996 | 222,5 | 1,5 |
|  | scherge | Ulgoths Leibgarde | ❌ | Ifrit (MON_4_6) | 18.150 | 219 | 182,5 | 2,5 |
|  | scherge | Modniir-Kriegsherr | ❌ ähnlich: Zeitachse | Ifrit (MON_4_6) | 18.150 | 219 | 182,5 | 2,5 |
| 6 ☠️ · Lv. 60 | boss | Zentauren-Kriegsherr Kol | ❌ | Corrupted Rock Giant (BOSS_H_4_3) | 9.348.532 | 1.197 | 373 | 2,5 |
|  | scherge | Zentauren-Lanzenreiter | ❌ | Cursed Elite Lizardman (MON_H_4_3) | 469.168 | 299 | 320 | 2,5 |
|  | scherge | Zentauren-Kriegsschamane | ❌ | Cursed Elite Lizardman (MON_H_4_3) | 469.168 | 299 | 320 | 2,5 |
| 7 ☠️ · Lv. 60 | boss | Verderbt: Kriegsmeister Ulgoth | ❌ | Cursed Darkflame Giant (BOSS_H_4_4) | 9.946.093 | 1.210 | 383 | 1 |
|  | scherge | Ulgoths Leibgarde | ❌ | Cursed Ifrit (MON_H_4_4) | 496.229 | 303 | 327 | 2,5 |
|  | scherge | Kryptis-Splitter | ❌ ähnlich: Antiker Knochen, Veredelte Heimstatt-Faser, Spielupdate/20230926 | Cursed Ifrit (MON_H_4_4) | 496.229 | 303 | 327 | 2,5 |
| 8 ⭐ · Lv. 60 | boss | Schatten: Kriegsmeister Ulgoth | ❌ | Dark Dragon (BOSS_H_L_4) | 14.726.579 | 1.318 | 463 | 0,5 |
|  | scherge | Kryptis-Plünderer | ❌ ähnlich: Antiker Knochen, Phiole mit kraftvollem Blut, Beherrschungspunkt | Soul-Stolen Elite Lizardman (MON_SOUL_4_3) | 543.940 | 388 | 298,5 | 2,5 |
|  | scherge | Kryptis-Peiniger | ❌ ähnlich: Beherrschungspunkt | Soul-Stolen Ifrit (MON_SOUL_4_4) | 572.900 | 397 | 309,5 | 2,5 |

## Portal 4: Küste & Sümpfe von Orr

### 9. Blutstrom-Küste

Zone in der Wiki: ✅ [Blutstrom-Küste](https://wiki-de.guildwars2.com/wiki/Blutstrom-K%C3%BCste) (en: Bloodtide Coast)

| Stufe | Rolle | GW2-Name | Wiki | CQHT-Vorlage | HP Lv.1 | ATK Lv.1 | DEF | Tempo |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 · Lv. 60 | boss | Champion Krait-Priester | ❌ ähnlich: Krait, Auferstandener, Champion | Pyro Droid DX (BOSS_5_1_1) | 543.378 | 1.002 | 227,5 | 2,5 |
|  | scherge | Krait-Zelot | ❌ | Combat Mech (MON_5_1) | 25.669 | 222 | 189 | 2,5 |
|  | scherge | Krait-Neophyt | ❌ ähnlich: Barrakuda, Kru-Leiter, Waffengalerie/Fackel | Cannon Mech (MON_5_2) | 33.188 | 225 | 196 | 2,5 |
| 2 · Lv. 60 | boss | Champion Auferstandener Offizier | ❌ ähnlich: Champion, Miniatur, Elite | Pyro Droid DX (BOSS_5_1_2) | 701.637 | 1.008 | 232,5 | 2,5 |
|  | scherge | Auferstandener Matrose | ❌ ähnlich: Die traurige Geschichte der "Raffgier", Triumph oder Tod, Die Quelle von Orr | Combat Mech (MON_5_1) | 25.669 | 222 | 189 | 2,5 |
|  | scherge | Auferstandener Grubenarbeiter | ❌ | Cannon Mech (MON_5_2) | 33.188 | 225 | 196 | 2,5 |
| 3 · Lv. 60 | boss | Dredge-Kriegsmaschine | ❌ | Pyro Droid DX (BOSS_5_1_3) | 859.895 | 1.014 | 237,5 | 2,5 |
|  | scherge | Dredge-Schweißer | ❌ | Combat Mech (MON_5_1) | 25.669 | 222 | 189 | 2,5 |
|  | scherge | Dredge-Panzer | ❌ | Cannon Mech (MON_5_2) | 33.188 | 225 | 196 | 2,5 |
| 4 · Lv. 60 | boss | Piratinnen-Admiralin | ❌ | Gatling Droid DX (BOSS_5_2_1) | 1.018.153 | 1.020 | 242,5 | 1 |
|  | scherge | Piraten-Maat | ❌ ähnlich: Pirat, Skritt, Ätherklingen | Combat Mech (MON_5_1) | 25.669 | 222 | 189 | 2,5 |
|  | scherge | Piraten-Harpunier | ❌ | Cannon Mech (MON_5_2) | 33.188 | 225 | 196 | 2,5 |
| 5 · Lv. 60 | endboss | Dreiköpfige Krait-Bestie | ❌ | Gatling Droid DX (BOSS_5_2_2) | 1.176.411 | 1.026 | 247,5 | 2,5 |
|  | scherge | Krait-Wyrmschlange | ❌ | Combat Mech (MON_5_1) | 25.669 | 222 | 189 | 2,5 |
|  | scherge | Krait-Schreckensbrut | ❌ | Cannon Mech (MON_5_2) | 33.188 | 225 | 196 | 2,5 |
| 6 ☠️ · Lv. 60 | boss | Champion Kropf-Krake | ❌ | Cursed Pyro Droid DX (BOSS_H_5_1) | 10.543.654 | 1.224 | 393 | 2,5 |
|  | scherge | Riffkrake | ❌ | Cursed Combat Mech (MON_H_5_1) | 523.289 | 307 | 333 | 2,5 |
|  | scherge | Tiefsee-Lauerer | ❌ | Cursed Combat Mech (MON_H_5_1) | 523.289 | 307 | 333 | 2,5 |
| 7 ☠️ · Lv. 60 | boss | Verderbt: Dreiköpfige Krait-Bestie | ❌ | Cursed Gatling Droid DX (BOSS_H_5_2) | 11.141.214 | 1.237 | 403 | 2,5 |
|  | scherge | Krait-Wyrmschlange | ❌ | Cursed Repair Bot (MON_H_5_2) | 550.349 | 312 | 340 | 2,5 |
|  | scherge | Kryptis-Splitter | ❌ ähnlich: Antiker Knochen, Veredelte Heimstatt-Faser, Spielupdate/20230926 | Cursed Repair Bot (MON_H_5_2) | 550.349 | 312 | 340 | 2,5 |

### 10. Funkenschwärmersumpf

Zone in der Wiki: ✅ [Funkenschwärmersumpf](https://wiki-de.guildwars2.com/wiki/Funkenschw%C3%A4rmersumpf) (en: Sparkfly Fen)

| Stufe | Rolle | GW2-Name | Wiki | CQHT-Vorlage | HP Lv.1 | ATK Lv.1 | DEF | Tempo |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 · Lv. 60 | boss | Champion Auferstandener Priester | 📄 [Auferstandener Priester des Balthasar (Miniatur)](https://wiki-de.guildwars2.com/wiki/Auferstandener_Priester_des_Balthasar_(Miniatur)) | Titan Rocket (BOSS_5_3_1) | 1.334.670 | 1.032 | 252,5 | 2,5 |
|  | scherge | Auferstandener Akolyth | ✅ [Auferstandener Akolyth](https://wiki-de.guildwars2.com/wiki/Auferstandener_Akolyth) (en: Risen Acolyte) | Combat Mech (MON_5_1) | 25.669 | 222 | 189 | 2,5 |
|  | scherge | Auferstandener Schreckenswandler | ❌ | Cannon Mech (MON_5_2) | 33.188 | 225 | 196 | 2,5 |
| 2 · Lv. 60 | boss | Champion Krait-Echse | ❌ | Titan Rocket (BOSS_5_3_2) | 1.492.928 | 1.038 | 257,5 | 2,5 |
|  | scherge | Krait-Echse | ❌ | Combat Mech (MON_5_1) | 25.669 | 222 | 189 | 2,5 |
|  | scherge | Krait-Schlinger | ❌ ähnlich: Sibaha | Cannon Mech (MON_5_2) | 33.188 | 225 | 196 | 2,5 |
| 3 · Lv. 60 | boss | Zhaff-Sumpfmonster | ❌ | Titan Shield (BOSS_5_4_1) | 1.651.186 | 1.044 | 262,5 | 1 |
|  | scherge | Sumpfschlurfer | ❌ | Combat Mech (MON_5_1) | 25.669 | 222 | 189 | 2,5 |
|  | scherge | Sumpf-Moskito | ❌ ähnlich: Bergsuhlensumpf, Die Schlacht um den Bergsuhlensumpf, Willoweg-Haine | Cannon Mech (MON_5_2) | 33.188 | 225 | 196 | 2,5 |
| 4 · Lv. 60 | boss | Hylek-Schamane Cuatl | ❌ ähnlich: Hylek, Heldenherausforderung | Titan Shield (BOSS_5_4_2) | 1.809.445 | 1.050 | 267,5 | 2,5 |
|  | scherge | Hylek-Krieger | ✅ [Hylek-Krieger](https://wiki-de.guildwars2.com/wiki/Hylek-Krieger) (en: Hylek Warrior) | Combat Mech (MON_5_1) | 25.669 | 222 | 189 | 2,5 |
|  | scherge | Hylek-Giftmischer | ❌ | Cannon Mech (MON_5_2) | 33.188 | 225 | 196 | 2,5 |
| 5 · Lv. 60 | endboss | Tequatl der Sonnenlose | ✅ [Tequatl der Sonnenlose](https://wiki-de.guildwars2.com/wiki/Tequatl_der_Sonnenlose) (en: Tequatl the Sunless) | DioNemesis (BOSS_5_5) | 1.967.703 | 1.055 | 272,5 | 2,5 |
|  | scherge | Auferstandener Knochenmagier | ❌ | Combat Mech (MON_5_1) | 25.669 | 222 | 189 | 2,5 |
|  | scherge | Tequatls Diener | ❌ ähnlich: Funkenschwärmersumpf, Auferstandener, Alt-Drache | Cannon Mech (MON_5_2) | 33.188 | 225 | 196 | 2,5 |
| 6 ☠️ · Lv. 60 | boss | Megawurm | ❌ | Cursed Titan Rocket (BOSS_H_5_3) | 11.738.775 | 1.251 | 413 | 2,5 |
|  | scherge | Wurmbrut | ❌ | Cursed Gatling Droid (MON_H_5_3) | 577.410 | 316 | 346 | 2,5 |
|  | scherge | Sandwurm-Larve | ❌ | Cursed Gatling Droid (MON_H_5_3) | 577.410 | 316 | 346 | 2,5 |
| 7 ☠️ · Lv. 60 | boss | Verderbt: Tequatl der Sonnenlose | 🟡 [Tequatl der Sonnenlose](https://wiki-de.guildwars2.com/wiki/Tequatl_der_Sonnenlose) (en: Tequatl the Sunless) | Cursed Titan Shield (BOSS_H_5_4) | 12.336.336 | 1.264 | 423 | 1 |
|  | scherge | Auferstandener Knochenmagier | ❌ | Cursed Pyro Droid (MON_H_5_4) | 604.470 | 320 | 352,5 | 2,5 |
|  | scherge | Kryptis-Splitter | ❌ ähnlich: Antiker Knochen, Veredelte Heimstatt-Faser, Spielupdate/20230926 | Cursed Pyro Droid (MON_H_5_4) | 604.470 | 320 | 352,5 | 2,5 |
| 8 ⭐ · Lv. 60 | boss | Schatten: Tequatl der Sonnenlose | 🟡 [Tequatl der Sonnenlose](https://wiki-de.guildwars2.com/wiki/Tequatl_der_Sonnenlose) (en: Tequatl the Sunless) | DioNemesis DX (BOSS_H_L_5) | 15.324.140 | 1.331 | 472,5 | 0,5 |
|  | scherge | Kryptis-Plünderer | ❌ ähnlich: Antiker Knochen, Phiole mit kraftvollem Blut, Beherrschungspunkt | Soul-Bound Gatling Droid (MON_SOUL_5_3) | 659.790 | 425 | 341,5 | 2,5 |
|  | scherge | Kryptis-Peiniger | ❌ ähnlich: Beherrschungspunkt | Soul-Bound Pyro Droid (MON_SOUL_5_4) | 688.750 | 434 | 352,5 | 2,5 |

## Portal 5: Das Land der Charr (Entwurf)

### 11. Eisensuperiorität · Lv. 61–63 · Offene Welt

Zone in der Wiki: ❌

| Stufe | Rolle | GW2-Name | Wiki | CQHT-Vorlage | HP Lv.1 | ATK Lv.1 | DEF | Tempo |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 · Lv. 61 | boss | Gebrandmarkte Verschlinger-Königin | 📄 [Tötet die Gebrandmarkte Verschlinger-Königin](https://wiki-de.guildwars2.com/wiki/T%C3%B6tet_die_Gebrandmarkte_Verschlinger-K%C3%B6nigin) | Cursed Emperor Slime (BOSS_H_1_1) | 982.681 | 1.009 | 233 | 2,5 |
|  | scherge | Gebrandmarkte | ✅ [Gebrandmarkter](https://wiki-de.guildwars2.com/wiki/Gebrandmarkter) (en: Branded) | Orange Slime (MON_H_1_1) | 90.323 | 240 | 230 | 2,5 |
|  | scherge | Verschlinger | ✅ [Verschlinger](https://wiki-de.guildwars2.com/wiki/Verschlinger) (en: Devourer) | Orange Slime (MON_H_1_1) | 90.323 | 240 | 230 | 2,5 |
| 2 · Lv. 61 | boss | Champion Brand-Goliath | ❌ | Cursed Emperor Slime (BOSS_H_1_1) | 982.681 | 1.009 | 233 | 2,5 |
|  | scherge | Verschlinger | ✅ [Verschlinger](https://wiki-de.guildwars2.com/wiki/Verschlinger) (en: Devourer) | Goblin Fighter (MON_H_1_2) | 117.384 | 244 | 237 | 2,5 |
|  | scherge | Flammenlegion | 📄 [Flammenlegion-Rüstung (Schwer)](https://wiki-de.guildwars2.com/wiki/Flammenlegion-R%C3%BCstung_(Schwer)) | Goblin Fighter (MON_H_1_2) | 117.384 | 244 | 237 | 2,5 |
| 3 · Lv. 62 | boss | Separatisten-Anführer | ❌ ähnlich: Ebonfalke-Festung, Champion, Ebon-Vorhut | Cursed Elite Goblin Warrior (BOSS_H_1_2) | 1.580.242 | 1.023 | 243 | 2,5 |
|  | scherge | Flammenlegion | 📄 [Flammenlegion-Rüstung (Schwer)](https://wiki-de.guildwars2.com/wiki/Flammenlegion-R%C3%BCstung_(Schwer)) | Goblin Fighter (MON_H_1_2) | 117.384 | 244 | 237 | 2,5 |
|  | scherge | Gebrandmarkte | ✅ [Gebrandmarkter](https://wiki-de.guildwars2.com/wiki/Gebrandmarkter) (en: Branded) | Soul-Stolen Slime (MON_SOUL_1_1) | 138.460 | 260 | 147,5 | 2,5 |
| 4 · Lv. 62 | boss | Flammenlegion-Kultist | ❌ | Cursed Elite Goblin Warrior (BOSS_H_1_2) | 1.580.242 | 1.023 | 243 | 2,5 |
|  | scherge | Gebrandmarkte | ✅ [Gebrandmarkter](https://wiki-de.guildwars2.com/wiki/Gebrandmarkter) (en: Branded) | Soul-Stolen Slime (MON_SOUL_1_1) | 138.460 | 260 | 147,5 | 2,5 |
|  | scherge | Verschlinger | ✅ [Verschlinger](https://wiki-de.guildwars2.com/wiki/Verschlinger) (en: Devourer) | Soul-Stolen Slime (MON_SOUL_1_1) | 138.460 | 260 | 147,5 | 2,5 |
| 5 · Lv. 63 | boss | Gebrandmarkter Zerschmetterer-Leutnant | ❌ ähnlich: Gebrandmarkter, Der Zerschmetterer, Eine zerschmetterte Nation | Mighty Ogre (BOSS_H_1_3) | 2.177.802 | 1.036 | 253 | 2,5 |
|  | scherge | Verschlinger | ✅ [Verschlinger](https://wiki-de.guildwars2.com/wiki/Verschlinger) (en: Devourer) | Cursed Werewolf (MON_H_1_3) | 144.444 | 249 | 243 | 2,5 |
|  | scherge | Flammenlegion | 📄 [Flammenlegion-Rüstung (Schwer)](https://wiki-de.guildwars2.com/wiki/Flammenlegion-R%C3%BCstung_(Schwer)) | Cursed Werewolf (MON_H_1_3) | 144.444 | 249 | 243 | 2,5 |
| 6 · Lv. 63 | endboss | Der Zerschmetterer | ✅ [Der Zerschmetterer](https://wiki-de.guildwars2.com/wiki/Der_Zerschmetterer) (en: The Shatterer) | Mighty Ogre (BOSS_H_1_3) | 2.177.802 | 1.036 | 253 | 2,5 |
|  | scherge | Flammenlegion | 📄 [Flammenlegion-Rüstung (Schwer)](https://wiki-de.guildwars2.com/wiki/Flammenlegion-R%C3%BCstung_(Schwer)) | Cursed Werewolf (MON_H_1_3) | 144.444 | 249 | 243 | 2,5 |
|  | scherge | Gebrandmarkte | ✅ [Gebrandmarkter](https://wiki-de.guildwars2.com/wiki/Gebrandmarkter) (en: Branded) | Soul-Stolen Goblin (MON_SOUL_1_2) | 167.420 | 269 | 158,5 | 2,5 |

### 12. Zitadelle der Flamme · Lv. 64–65 · Verlies

Zone in der Wiki: ❌ ähnlich: Schwarzklingen-See, Einen Spion für einen Spion, Razen der Räuber

| Stufe | Rolle | GW2-Name | Wiki | CQHT-Vorlage | HP Lv.1 | ATK Lv.1 | DEF | Tempo |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 · Lv. 64 | boss | Sklavenmeister | ❌ ähnlich: Abwerfen der Ketten, Vertreibt die Auferstandenen Krait aus Kahloipoi, Aaminah | Ogre Elite Fighter (BOSS_H_1_4) | 2.775.363 | 1.050 | 263 | 1 |
|  | scherge | Flammenlegion | 📄 [Flammenlegion-Rüstung (Schwer)](https://wiki-de.guildwars2.com/wiki/Flammenlegion-R%C3%BCstung_(Schwer)) | Soul-Stolen Goblin (MON_SOUL_1_2) | 167.420 | 269 | 158,5 | 2,5 |
|  | scherge | Oger | ✅ [Oger](https://wiki-de.guildwars2.com/wiki/Oger) (en: Ogre) | Soul-Stolen Goblin (MON_SOUL_1_2) | 167.420 | 269 | 158,5 | 2,5 |
| 2 · Lv. 64 | boss | Gaheron-Eiferer | ❌ ähnlich: Flammenzitadelle/Forschung - Rhiannon, Flammenzitadelle/Forschung - Magg, Flammenzitadelle/Forschung - Farrah | Ogre Elite Fighter (BOSS_H_1_4) | 2.775.363 | 1.050 | 263 | 1 |
|  | scherge | Oger | ✅ [Oger](https://wiki-de.guildwars2.com/wiki/Oger) (en: Ogre) | Cursed Ent (MON_H_1_4) | 171.504 | 253 | 250 | 2,5 |
|  | scherge | Feuerelementare | ❌ ähnlich: Tragt einen großen Stock, Besiegt den monströsen Teer-Elementar, Goldfelder | Cursed Ent (MON_H_1_4) | 171.504 | 253 | 250 | 2,5 |
| 3 · Lv. 64 | boss | Schmiedemeister | 📄 [Wütende Schmiedemeister-Insignie](https://wiki-de.guildwars2.com/wiki/W%C3%BCtende_Schmiedemeister-Insignie) | Emperor Mudman (BOSS_H_2_1) | 3.372.924 | 1.063 | 273 | 2,5 |
|  | scherge | Feuerelementare | ❌ ähnlich: Tragt einen großen Stock, Besiegt den monströsen Teer-Elementar, Goldfelder | Cursed Ent (MON_H_1_4) | 171.504 | 253 | 250 | 2,5 |
|  | scherge | Flammenlegion | 📄 [Flammenlegion-Rüstung (Schwer)](https://wiki-de.guildwars2.com/wiki/Flammenlegion-R%C3%BCstung_(Schwer)) | Soul-Stolen Werewolf (MON_SOUL_1_3) | 196.390 | 278 | 169 | 2,5 |
| 4 · Lv. 65 | boss | Evolvierter Flammen-Schamane | ❌ | Emperor Mudman (BOSS_H_2_1) | 3.372.924 | 1.063 | 273 | 2,5 |
|  | scherge | Flammenlegion | 📄 [Flammenlegion-Rüstung (Schwer)](https://wiki-de.guildwars2.com/wiki/Flammenlegion-R%C3%BCstung_(Schwer)) | Soul-Stolen Werewolf (MON_SOUL_1_3) | 196.390 | 278 | 169 | 2,5 |
|  | scherge | Oger | ✅ [Oger](https://wiki-de.guildwars2.com/wiki/Oger) (en: Ogre) | Soul-Stolen Werewolf (MON_SOUL_1_3) | 196.390 | 278 | 169 | 2,5 |
| 5 · Lv. 65 | boss | Magister des Baelfire | ❌ | Ancient Pharaoh Mummy (BOSS_H_2_2) | 3.970.485 | 1.076 | 283 | 2,5 |
|  | scherge | Oger | ✅ [Oger](https://wiki-de.guildwars2.com/wiki/Oger) (en: Ogre) | Elite Sandman (MON_H_2_1) | 198.565 | 257 | 256 | 2,5 |
|  | scherge | Feuerelementare | ❌ ähnlich: Tragt einen großen Stock, Besiegt den monströsen Teer-Elementar, Goldfelder | Elite Sandman (MON_H_2_1) | 198.565 | 257 | 256 | 2,5 |
| 6 · Lv. 65 | endboss | Gaheron Baelfire | 🟡 [Gaheron Baelfeuer](https://wiki-de.guildwars2.com/wiki/Gaheron_Baelfeuer) (en: Gaheron Baelfire) | Ancient Pharaoh Mummy (BOSS_H_2_2) | 3.970.485 | 1.076 | 283 | 2,5 |
|  | scherge | Feuerelementare | ❌ ähnlich: Tragt einen großen Stock, Besiegt den monströsen Teer-Elementar, Goldfelder | Elite Sandman (MON_H_2_1) | 198.565 | 257 | 256 | 2,5 |
|  | scherge | Flammenlegion | 📄 [Flammenlegion-Rüstung (Schwer)](https://wiki-de.guildwars2.com/wiki/Flammenlegion-R%C3%BCstung_(Schwer)) | Soul-Stolen Ent (MON_SOUL_1_4) | 225.350 | 287 | 180 | 2,5 |

## Portal 6: Hoher Norden & Vorstoß nach Orr (Entwurf)

### 13. Eisklamm-Sund · Lv. 66–67 · Offene Welt

Zone in der Wiki: ✅ [Eisklamm-Sund](https://wiki-de.guildwars2.com/wiki/Eisklamm-Sund) (en: Frostgorge Sound)

| Stufe | Rolle | GW2-Name | Wiki | CQHT-Vorlage | HP Lv.1 | ATK Lv.1 | DEF | Tempo |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 · Lv. 66 | boss | Champion Eisbrut-Kodan | ✅ [Champion Eisbrut-Kodan](https://wiki-de.guildwars2.com/wiki/Champion_Eisbrut-Kodan) (en: Champion Icebrood Kodan) | Ancient Pharaoh Mummy (BOSS_H_2_2) | 3.970.485 | 1.076 | 283 | 2,5 |
|  | scherge | Eisbrut | ✅ [Eisbrut](https://wiki-de.guildwars2.com/wiki/Eisbrut) (en: Icebrood) | Soul-Stolen Ent (MON_SOUL_1_4) | 225.350 | 287 | 180 | 2,5 |
|  | scherge | Söhne Svanirs | ✅ [Die Söhne Svanirs](https://wiki-de.guildwars2.com/wiki/Die_S%C3%B6hne_Svanirs) (en: Sons of Svanir) | Soul-Stolen Ent (MON_SOUL_1_4) | 225.350 | 287 | 180 | 2,5 |
| 2 · Lv. 66 | boss | Dredge-Generaldirektor | ❌ | Red Basilisk (BOSS_H_2_3) | 4.568.046 | 1.090 | 293 | 2,5 |
|  | scherge | Söhne Svanirs | ✅ [Die Söhne Svanirs](https://wiki-de.guildwars2.com/wiki/Die_S%C3%B6hne_Svanirs) (en: Sons of Svanir) | Sturdy Mummy (MON_H_2_2) | 225.625 | 261 | 263 | 2,5 |
|  | scherge | Schaufler | ✅ [Schaufler](https://wiki-de.guildwars2.com/wiki/Schaufler) (en: Dredge) | Sturdy Mummy (MON_H_2_2) | 225.625 | 261 | 263 | 2,5 |
| 3 · Lv. 66 | boss | Champion Svanir-Hexenmeister | ❌ ähnlich: Champion, Miniatur, Schwarzlöwen-Ticket für Miniaturen | Red Basilisk (BOSS_H_2_3) | 4.568.046 | 1.090 | 293 | 2,5 |
|  | scherge | Schaufler | ✅ [Schaufler](https://wiki-de.guildwars2.com/wiki/Schaufler) (en: Dredge) | Sturdy Mummy (MON_H_2_2) | 225.625 | 261 | 263 | 2,5 |
|  | scherge | Eisbrut | ✅ [Eisbrut](https://wiki-de.guildwars2.com/wiki/Eisbrut) (en: Icebrood) | Cursed Desert Lizardman (MON_H_2_3) | 252.685 | 265 | 269 | 2,5 |
| 4 · Lv. 67 | boss | Unterwasser-Krake Svanir | ❌ | Cataclysm Basilisk (BOSS_H_2_4) | 5.165.606 | 1.103 | 303 | 1 |
|  | scherge | Eisbrut | ✅ [Eisbrut](https://wiki-de.guildwars2.com/wiki/Eisbrut) (en: Icebrood) | Cursed Desert Lizardman (MON_H_2_3) | 252.685 | 265 | 269 | 2,5 |
|  | scherge | Söhne Svanirs | ✅ [Die Söhne Svanirs](https://wiki-de.guildwars2.com/wiki/Die_S%C3%B6hne_Svanirs) (en: Sons of Svanir) | Cursed Desert Lizardman (MON_H_2_3) | 252.685 | 265 | 269 | 2,5 |
| 5 · Lv. 67 | boss | Eisbrut-Koloss | ❌ ähnlich: Miniatur, Beherrschungspunkt, Chuka und Champawat III: Tigris | Cataclysm Basilisk (BOSS_H_2_4) | 5.165.606 | 1.103 | 303 | 1 |
|  | scherge | Söhne Svanirs | ✅ [Die Söhne Svanirs](https://wiki-de.guildwars2.com/wiki/Die_S%C3%B6hne_Svanirs) (en: Sons of Svanir) | Cursed Desert Lizardman (MON_H_2_3) | 252.685 | 265 | 269 | 2,5 |
|  | scherge | Schaufler | ✅ [Schaufler](https://wiki-de.guildwars2.com/wiki/Schaufler) (en: Dredge) | Soul-Stolen Sandman (MON_SOUL_2_1) | 254.310 | 297 | 190,5 | 2,5 |
| 6 · Lv. 67 | endboss | Klaue von Jormag | ✅ [Klaue von Jormag](https://wiki-de.guildwars2.com/wiki/Klaue_von_Jormag) (en: Claw of Jormag) | Cursed Monster Angler (BOSS_H_3_1) | 5.763.167 | 1.117 | 313 | 2,5 |
|  | scherge | Schaufler | ✅ [Schaufler](https://wiki-de.guildwars2.com/wiki/Schaufler) (en: Dredge) | Soul-Stolen Sandman (MON_SOUL_2_1) | 254.310 | 297 | 190,5 | 2,5 |
|  | scherge | Eisbrut | ✅ [Eisbrut](https://wiki-de.guildwars2.com/wiki/Eisbrut) (en: Icebrood) | Soul-Stolen Sandman (MON_SOUL_2_1) | 254.310 | 297 | 190,5 | 2,5 |

### 14. Umarmung der Betrübnis · Lv. 68–69 · Verlies

Zone in der Wiki: ✅ [Umarmung der Betrübnis](https://wiki-de.guildwars2.com/wiki/Umarmung_der_Betr%C3%BCbnis) (en: Sorrow's Embrace)

| Stufe | Rolle | GW2-Name | Wiki | CQHT-Vorlage | HP Lv.1 | ATK Lv.1 | DEF | Tempo |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 · Lv. 68 | boss | Vorarbeiter Spur | ❌ ähnlich: Die Belagerungsebene, Leseratte, Zwielichtgarten/Forschung - Ätherpfad | Cursed Monster Angler (BOSS_H_3_1) | 5.763.167 | 1.117 | 313 | 2,5 |
|  | scherge | Schaufler | ✅ [Schaufler](https://wiki-de.guildwars2.com/wiki/Schaufler) (en: Dredge) | Cursed Anubis (MON_H_2_4) | 279.746 | 270 | 275 | 2,5 |
|  | scherge | Inquestur | ✅ [Inquestur](https://wiki-de.guildwars2.com/wiki/Inquestur) (en: Inquest) | Cursed Anubis (MON_H_2_4) | 279.746 | 270 | 275 | 2,5 |
| 2 · Lv. 68 | boss | Targa der Peiniger | ❌ | Cursed Blackstar (BOSS_H_3_2) | 6.360.728 | 1.130 | 323 | 2,5 |
|  | scherge | Inquestur | ✅ [Inquestur](https://wiki-de.guildwars2.com/wiki/Inquestur) (en: Inquest) | Cursed Anubis (MON_H_2_4) | 279.746 | 270 | 275 | 2,5 |
|  | scherge | Golems | 🟡 [Golem](https://wiki-de.guildwars2.com/wiki/Golem) | Soul-Stolen Mummy (MON_SOUL_2_2) | 283.270 | 306 | 201,5 | 2,5 |
| 3 · Lv. 68 | boss | General Molotov | ❌ | Cursed Blackstar (BOSS_H_3_2) | 6.360.728 | 1.130 | 323 | 2,5 |
|  | scherge | Golems | 🟡 [Golem](https://wiki-de.guildwars2.com/wiki/Golem) | Soul-Stolen Mummy (MON_SOUL_2_2) | 283.270 | 306 | 201,5 | 2,5 |
|  | scherge | Schaufler | ✅ [Schaufler](https://wiki-de.guildwars2.com/wiki/Schaufler) (en: Dredge) | Soul-Stolen Mummy (MON_SOUL_2_2) | 283.270 | 306 | 201,5 | 2,5 |
| 4 · Lv. 69 | boss | Dredge-Kriegsgolem | ❌ | Mighty Shark Warrior (BOSS_H_3_3) | 6.958.289 | 1.143 | 333 | 2,5 |
|  | scherge | Schaufler | ✅ [Schaufler](https://wiki-de.guildwars2.com/wiki/Schaufler) (en: Dredge) | Red Angler (MON_H_3_1) | 306.806 | 274 | 282 | 2,5 |
|  | scherge | Inquestur | ✅ [Inquestur](https://wiki-de.guildwars2.com/wiki/Inquestur) (en: Inquest) | Red Angler (MON_H_3_1) | 306.806 | 274 | 282 | 2,5 |
| 5 · Lv. 69 | boss | Inquestur-Chef Kudu | ❌ | Mighty Shark Warrior (BOSS_H_3_3) | 6.958.289 | 1.143 | 333 | 2,5 |
|  | scherge | Inquestur | ✅ [Inquestur](https://wiki-de.guildwars2.com/wiki/Inquestur) (en: Inquest) | Red Angler (MON_H_3_1) | 306.806 | 274 | 282 | 2,5 |
|  | scherge | Golems | 🟡 [Golem](https://wiki-de.guildwars2.com/wiki/Golem) | Soul-Stolen Lizardman (MON_SOUL_2_3) | 312.240 | 315 | 212 | 2,5 |
| 6 · Lv. 69 | endboss | Der Eiserne Schlächter | ❌ ähnlich: Ascalon-Becken, Blut-Legion, Flamme und Frost: Die Vergeltung | Mighty Elite Shark Warrior (BOSS_H_3_4) | 7.555.850 | 1.157 | 343 | 1 |
|  | scherge | Golems | 🟡 [Golem](https://wiki-de.guildwars2.com/wiki/Golem) | Soul-Stolen Lizardman (MON_SOUL_2_3) | 312.240 | 315 | 212 | 2,5 |
|  | scherge | Schaufler | ✅ [Schaufler](https://wiki-de.guildwars2.com/wiki/Schaufler) (en: Dredge) | Soul-Stolen Lizardman (MON_SOUL_2_3) | 312.240 | 315 | 212 | 2,5 |

### 15. Ruinen von Arah · Lv. 70–70 · Verlies / epische Zone

Zone in der Wiki: 🟡 [Die Ruinenstadt Arah](https://wiki-de.guildwars2.com/wiki/Die_Ruinenstadt_Arah) (en: The Ruined City of Arah)

| Stufe | Rolle | GW2-Name | Wiki | CQHT-Vorlage | HP Lv.1 | ATK Lv.1 | DEF | Tempo |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 · Lv. 70 | boss | Auge des Zhaitan | ✅ [Auge des Zhaitan](https://wiki-de.guildwars2.com/wiki/Auge_des_Zhaitan) (en: Eye of Zhaitan) | Mighty Elite Shark Warrior (BOSS_H_3_4) | 7.555.850 | 1.157 | 343 | 1 |
|  | scherge | Auferstandene | ✅ [Auferstandener](https://wiki-de.guildwars2.com/wiki/Auferstandener) (en: Risen) | Cursed Redstar (MON_H_3_2) | 333.867 | 278 | 288 | 2,5 |
|  | scherge | Auferstandene Abscheulichkeit | ✅ [Auferstandene Abscheulichkeit](https://wiki-de.guildwars2.com/wiki/Auferstandene_Abscheulichkeit) (en: Risen Abomination) | Cursed Redstar (MON_H_3_2) | 333.867 | 278 | 288 | 2,5 |
| 2 · Lv. 70 | boss | Maul des Zhaitan | ❌ ähnlich: Magie, Haus der Verwesung, Der Klang der Psi-Lanze | Mighty Elite Shark Warrior (BOSS_H_3_4) | 7.555.850 | 1.157 | 343 | 1 |
|  | scherge | Auferstandene Abscheulichkeit | ✅ [Auferstandene Abscheulichkeit](https://wiki-de.guildwars2.com/wiki/Auferstandene_Abscheulichkeit) (en: Risen Abomination) | Cursed Redstar (MON_H_3_2) | 333.867 | 278 | 288 | 2,5 |
|  | scherge | Knochenmonstrum | ❌ | Soul-Stolen Anubis (MON_SOUL_2_4) | 341.200 | 324 | 223 | 2,5 |
| 3 · Lv. 70 | boss | Hohepriester des Balthasar | ❌ ähnlich: Die Ruinenstadt Arah/Forschung - Randall Graustein, Auferstandener, Eigenschaftenhandbuch | Volcano Sludge (BOSS_H_4_1) | 8.153.410 | 1.170 | 353 | 2,5 |
|  | scherge | Knochenmonstrum | ❌ | Soul-Stolen Anubis (MON_SOUL_2_4) | 341.200 | 324 | 223 | 2,5 |
|  | scherge | Auferstandene | ✅ [Auferstandener](https://wiki-de.guildwars2.com/wiki/Auferstandener) (en: Risen) | Soul-Stolen Anubis (MON_SOUL_2_4) | 341.200 | 324 | 223 | 2,5 |
| 4 · Lv. 70 | boss | Hohepriesterin der Dwayna | ❌ ähnlich: Die Ruinenstadt Arah/Forschung - Randall Graustein, Malchors Sprung, Spielupdate/20231106 | Volcano Sludge (BOSS_H_4_1) | 8.153.410 | 1.170 | 353 | 2,5 |
|  | scherge | Auferstandene | ✅ [Auferstandener](https://wiki-de.guildwars2.com/wiki/Auferstandener) (en: Risen) | Corrupted Jellyfish (MON_H_3_3) | 360.927 | 282 | 295 | 2,5 |
|  | scherge | Auferstandene Abscheulichkeit | ✅ [Auferstandene Abscheulichkeit](https://wiki-de.guildwars2.com/wiki/Auferstandene_Abscheulichkeit) (en: Risen Abomination) | Corrupted Jellyfish (MON_H_3_3) | 360.927 | 282 | 295 | 2,5 |
| 5 · Lv. 70 | boss | Hohepriester der Grenth | ❌ ähnlich: Die Ruinenstadt Arah/Forschung - Randall Graustein, Auferstandener, Eigenschaftenhandbuch | Cursed Hellfire Spirit (BOSS_H_4_2) | 8.750.971 | 1.184 | 363 | 2,5 |
|  | scherge | Auferstandene Abscheulichkeit | ✅ [Auferstandene Abscheulichkeit](https://wiki-de.guildwars2.com/wiki/Auferstandene_Abscheulichkeit) (en: Risen Abomination) | Corrupted Jellyfish (MON_H_3_3) | 360.927 | 282 | 295 | 2,5 |
|  | scherge | Knochenmonstrum | ❌ | Soul-Stolen Anglerfish (MON_SOUL_3_1) | 370.160 | 333 | 234 | 2,5 |
| 6 · Lv. 70 | endboss | Zhaitan | ✅ [Zhaitan](https://wiki-de.guildwars2.com/wiki/Zhaitan) | Cursed Hellfire Spirit (BOSS_H_4_2) | 8.750.971 | 1.184 | 363 | 2,5 |
|  | scherge | Knochenmonstrum | ❌ | Soul-Stolen Anglerfish (MON_SOUL_3_1) | 370.160 | 333 | 234 | 2,5 |
|  | scherge | Auferstandene | ✅ [Auferstandener](https://wiki-de.guildwars2.com/wiki/Auferstandener) (en: Risen) | Soul-Stolen Anglerfish (MON_SOUL_3_1) | 370.160 | 333 | 234 | 2,5 |

## Portal 7: Maguuma-Dschungel (Entwurf)

### 16. Silberwüste · Lv. 71–73 · Offene Welt

Zone in der Wiki: ✅ [Die Silberwüste](https://wiki-de.guildwars2.com/wiki/Die_Silberw%C3%BCste) (en: The Silverwastes)

| Stufe | Rolle | GW2-Name | Wiki | CQHT-Vorlage | HP Lv.1 | ATK Lv.1 | DEF | Tempo |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 · Lv. 71 | boss | Mordrem-Hüllen-Champion | ❌ ähnlich: Hülle, Champion, Mordrem-Organ | Corrupted Rock Giant (BOSS_H_4_3) | 9.348.532 | 1.197 | 373 | 2,5 |
|  | scherge | Mordrem | ✅ [Mordrem](https://wiki-de.guildwars2.com/wiki/Mordrem) | Mermaid Witch (MON_H_3_4) | 387.987 | 286 | 301 | 2,5 |
|  | scherge | Mordrem-Wolf | ✅ [Mordrem-Wolf](https://wiki-de.guildwars2.com/wiki/Mordrem-Wolf) (en: Mordrem Wolf) | Mermaid Witch (MON_H_3_4) | 387.987 | 286 | 301 | 2,5 |
| 2 · Lv. 71 | boss | Mordrem-Rankenbrecher | ❌ | Corrupted Rock Giant (BOSS_H_4_3) | 9.348.532 | 1.197 | 373 | 2,5 |
|  | scherge | Mordrem-Wolf | ✅ [Mordrem-Wolf](https://wiki-de.guildwars2.com/wiki/Mordrem-Wolf) (en: Mordrem Wolf) | Mermaid Witch (MON_H_3_4) | 387.987 | 286 | 301 | 2,5 |
|  | scherge | Mordrem-Scharfschütze | ❌ ähnlich: Elite, Heldenherausforderung, Gleitschirm | Soul-Stolen Redstar (MON_SOUL_3_2) | 399.120 | 342 | 244,5 | 2,5 |
| 3 · Lv. 72 | boss | Mordrem-Teragriff | ❌ | Cursed Darkflame Giant (BOSS_H_4_4) | 9.946.093 | 1.210 | 383 | 1 |
|  | scherge | Mordrem-Scharfschütze | ❌ ähnlich: Elite, Heldenherausforderung, Gleitschirm | Soul-Stolen Redstar (MON_SOUL_3_2) | 399.120 | 342 | 244,5 | 2,5 |
|  | scherge | Mordrem | ✅ [Mordrem](https://wiki-de.guildwars2.com/wiki/Mordrem) | Soul-Stolen Redstar (MON_SOUL_3_2) | 399.120 | 342 | 244,5 | 2,5 |
| 4 · Lv. 72 | boss | Blasenwerfender Mordrem-Wolf | ❌ | Cursed Darkflame Giant (BOSS_H_4_4) | 9.946.093 | 1.210 | 383 | 1 |
|  | scherge | Mordrem | ✅ [Mordrem](https://wiki-de.guildwars2.com/wiki/Mordrem) | Cursed Lava Sludge (MON_H_4_1) | 415.048 | 291 | 308 | 2,5 |
|  | scherge | Mordrem-Wolf | ✅ [Mordrem-Wolf](https://wiki-de.guildwars2.com/wiki/Mordrem-Wolf) (en: Mordrem Wolf) | Cursed Lava Sludge (MON_H_4_1) | 415.048 | 291 | 308 | 2,5 |
| 5 · Lv. 73 | boss | Großer Züchter | ❌ ähnlich: Mabon-Markt, Brockenmund-Tal, Klippheim | Cursed Pyro Droid DX (BOSS_H_5_1) | 10.543.654 | 1.224 | 393 | 2,5 |
|  | scherge | Mordrem-Wolf | ✅ [Mordrem-Wolf](https://wiki-de.guildwars2.com/wiki/Mordrem-Wolf) (en: Mordrem Wolf) | Cursed Lava Sludge (MON_H_4_1) | 415.048 | 291 | 308 | 2,5 |
|  | scherge | Mordrem-Scharfschütze | ❌ ähnlich: Elite, Heldenherausforderung, Gleitschirm | Soul-Stolen Jellyfish (MON_SOUL_3_3) | 428.090 | 352 | 255,5 | 2,5 |
| 6 · Lv. 73 | endboss | Rankenzorn | 🟡 [Mordrem-Rankenzorn](https://wiki-de.guildwars2.com/wiki/Mordrem-Rankenzorn) (en: Mordrem Vinewrath) | Cursed Pyro Droid DX (BOSS_H_5_1) | 10.543.654 | 1.224 | 393 | 2,5 |
|  | scherge | Mordrem-Scharfschütze | ❌ ähnlich: Elite, Heldenherausforderung, Gleitschirm | Soul-Stolen Jellyfish (MON_SOUL_3_3) | 428.090 | 352 | 255,5 | 2,5 |
|  | scherge | Mordrem | ✅ [Mordrem](https://wiki-de.guildwars2.com/wiki/Mordrem) | Soul-Stolen Jellyfish (MON_SOUL_3_3) | 428.090 | 352 | 255,5 | 2,5 |

### 17. Grasgrüne Schwelle · Lv. 74–75 · Offene Welt

Zone in der Wiki: ✅ [Grasgrüne Schwelle](https://wiki-de.guildwars2.com/wiki/Grasgr%C3%BCne_Schwelle) (en: Verdant Brink)

| Stufe | Rolle | GW2-Name | Wiki | CQHT-Vorlage | HP Lv.1 | ATK Lv.1 | DEF | Tempo |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 · Lv. 74 | boss | Patriarch der Wyvern | ❌ ähnlich: Legende Wyvern-Patriarch, Legende Wyvern-Patriarch (Kopfgeld), Bezwingt das legendäre Kopfgeldziel (Legendäre Wyvern) | Cursed Pyro Droid DX (BOSS_H_5_1) | 10.543.654 | 1.224 | 393 | 2,5 |
|  | scherge | Mordrem | ✅ [Mordrem](https://wiki-de.guildwars2.com/wiki/Mordrem) | Cursed Fire Spirit (MON_H_4_2) | 442.108 | 295 | 314 | 2,5 |
|  | scherge | Wyvern | ✅ [Wyvern](https://wiki-de.guildwars2.com/wiki/Wyvern) | Cursed Fire Spirit (MON_H_4_2) | 442.108 | 295 | 314 | 2,5 |
| 2 · Lv. 74 | boss | Axthauer-Champion | ❌ | Cursed Gatling Droid DX (BOSS_H_5_2) | 11.141.214 | 1.237 | 403 | 2,5 |
|  | scherge | Wyvern | ✅ [Wyvern](https://wiki-de.guildwars2.com/wiki/Wyvern) | Cursed Fire Spirit (MON_H_4_2) | 442.108 | 295 | 314 | 2,5 |
|  | scherge | Rauchschuppen | ❌ ähnlich: Junge Rauchschuppe, Düstere Ernte (Erfolg), Helft Dawkkurra, ihren Schmaus zuzubereiten | Soul-Stolen Mermaid Wizard (MON_SOUL_3_4) | 457.050 | 361 | 266 | 2,5 |
| 3 · Lv. 74 | boss | Mordrem-Kommandeur Diarmid | ❌ ähnlich: Eskortiert die Truppen zum Mordrem-Feuerspucker, Zentraler Angriff, Klingenmeisterin Diarmid nähert sich | Cursed Gatling Droid DX (BOSS_H_5_2) | 11.141.214 | 1.237 | 403 | 2,5 |
|  | scherge | Rauchschuppen | ❌ ähnlich: Junge Rauchschuppe, Düstere Ernte (Erfolg), Helft Dawkkurra, ihren Schmaus zuzubereiten | Soul-Stolen Mermaid Wizard (MON_SOUL_3_4) | 457.050 | 361 | 266 | 2,5 |
|  | scherge | Mordrem | ✅ [Mordrem](https://wiki-de.guildwars2.com/wiki/Mordrem) | Soul-Stolen Mermaid Wizard (MON_SOUL_3_4) | 457.050 | 361 | 266 | 2,5 |
| 4 · Lv. 75 | boss | Mordrem-Kommandeur Stabmeister | ❌ ähnlich: Mutter Dschungel sorgt für uns, Widerstand des Drachen (Meta-Event), Stabmeister Adryn nähert sich | Cursed Titan Rocket (BOSS_H_5_3) | 11.738.775 | 1.251 | 413 | 2,5 |
|  | scherge | Mordrem | ✅ [Mordrem](https://wiki-de.guildwars2.com/wiki/Mordrem) | Cursed Elite Lizardman (MON_H_4_3) | 469.168 | 299 | 320 | 2,5 |
|  | scherge | Wyvern | ✅ [Wyvern](https://wiki-de.guildwars2.com/wiki/Wyvern) | Cursed Elite Lizardman (MON_H_4_3) | 469.168 | 299 | 320 | 2,5 |
| 5 · Lv. 75 | boss | Flügel-Schrecken | ❌ ähnlich: Schlachtzug, Bezwinger, Prolog: Durch Blut gebunden | Cursed Titan Rocket (BOSS_H_5_3) | 11.738.775 | 1.251 | 413 | 2,5 |
|  | scherge | Wyvern | ✅ [Wyvern](https://wiki-de.guildwars2.com/wiki/Wyvern) | Cursed Elite Lizardman (MON_H_4_3) | 469.168 | 299 | 320 | 2,5 |
|  | scherge | Rauchschuppen | ❌ ähnlich: Junge Rauchschuppe, Düstere Ernte (Erfolg), Helft Dawkkurra, ihren Schmaus zuzubereiten | Soul-Stolen Squishy (MON_SOUL_4_1) | 486.010 | 370 | 277 | 2,5 |
| 6 · Lv. 75 | endboss | Matriarchin der Wyvern | ❌ ähnlich: Baumkronen über Pakt-Lager, Legende Wyvern-Matriarchin, Tötet die Wyvern-Matriarchin | Cursed Titan Shield (BOSS_H_5_4) | 12.336.336 | 1.264 | 423 | 1 |
|  | scherge | Rauchschuppen | ❌ ähnlich: Junge Rauchschuppe, Düstere Ernte (Erfolg), Helft Dawkkurra, ihren Schmaus zuzubereiten | Soul-Stolen Squishy (MON_SOUL_4_1) | 486.010 | 370 | 277 | 2,5 |
|  | scherge | Mordrem | ✅ [Mordrem](https://wiki-de.guildwars2.com/wiki/Mordrem) | Soul-Stolen Squishy (MON_SOUL_4_1) | 486.010 | 370 | 277 | 2,5 |

## Portal 8: Wüste, Geistertal & Weltende (Entwurf)

### 18. Geistertal · Lv. 76–77 · Schlachtzug

Zone in der Wiki: ✅ [Geistertal](https://wiki-de.guildwars2.com/wiki/Geistertal) (en: Spirit Vale)

| Stufe | Rolle | GW2-Name | Wiki | CQHT-Vorlage | HP Lv.1 | ATK Lv.1 | DEF | Tempo |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 · Lv. 76 | boss | Talwächter | 🟡 [Tal-Wächter](https://wiki-de.guildwars2.com/wiki/Tal-W%C3%A4chter) (en: Vale Guardian) | Cursed Titan Shield (BOSS_H_5_4) | 12.336.336 | 1.264 | 423 | 1 |
|  | scherge | Geister | ✅ [Geister der Wildnis](https://wiki-de.guildwars2.com/wiki/Geister_der_Wildnis) (en: Spirits of the Wild) | Cursed Ifrit (MON_H_4_4) | 496.229 | 303 | 327 | 2,5 |
|  | scherge | Banditen | ✅ [Bandit](https://wiki-de.guildwars2.com/wiki/Bandit) | Cursed Ifrit (MON_H_4_4) | 496.229 | 303 | 327 | 2,5 |
| 2 · Lv. 76 | boss | Gorseval der Facettenreiche | ✅ [Gorseval der Facettenreiche](https://wiki-de.guildwars2.com/wiki/Gorseval_der_Facettenreiche) (en: Gorseval the Multifarious) | Dark Golem (BOSS_H_L_1) | 12.933.897 | 1.277 | 433 | 0,5 |
|  | scherge | Banditen | ✅ [Bandit](https://wiki-de.guildwars2.com/wiki/Bandit) | Cursed Ifrit (MON_H_4_4) | 496.229 | 303 | 327 | 2,5 |
|  | scherge | Untote | ✅ [Untoter](https://wiki-de.guildwars2.com/wiki/Untoter) (en: Undead) | Soul-Stolen Flame Spirit (MON_SOUL_4_2) | 514.970 | 379 | 288 | 2,5 |
| 3 · Lv. 76 | boss | Zunder-Bandit | ❌ ähnlich: Trophäe, Seraphen-Soldatin Dianna, Spielupdate/20121215 | Dark Golem (BOSS_H_L_1) | 12.933.897 | 1.277 | 433 | 0,5 |
|  | scherge | Untote | ✅ [Untoter](https://wiki-de.guildwars2.com/wiki/Untoter) (en: Undead) | Soul-Stolen Flame Spirit (MON_SOUL_4_2) | 514.970 | 379 | 288 | 2,5 |
|  | scherge | Geister | ✅ [Geister der Wildnis](https://wiki-de.guildwars2.com/wiki/Geister_der_Wildnis) (en: Spirits of the Wild) | Soul-Stolen Flame Spirit (MON_SOUL_4_2) | 514.970 | 379 | 288 | 2,5 |
| 4 · Lv. 77 | boss | Kern-Spaltmonstrum | ❌ | Dark Sandworm (BOSS_H_L_2) | 13.531.458 | 1.291 | 443 | 0,5 |
|  | scherge | Geister | ✅ [Geister der Wildnis](https://wiki-de.guildwars2.com/wiki/Geister_der_Wildnis) (en: Spirits of the Wild) | Soul-Stolen Flame Spirit (MON_SOUL_4_2) | 514.970 | 379 | 288 | 2,5 |
|  | scherge | Banditen | ✅ [Bandit](https://wiki-de.guildwars2.com/wiki/Bandit) | Cursed Combat Mech (MON_H_5_1) | 523.289 | 307 | 333 | 2,5 |
| 5 · Lv. 77 | boss | Turmwächter Karde | ❌ | Dark Sandworm (BOSS_H_L_2) | 13.531.458 | 1.291 | 443 | 0,5 |
|  | scherge | Banditen | ✅ [Bandit](https://wiki-de.guildwars2.com/wiki/Bandit) | Cursed Combat Mech (MON_H_5_1) | 523.289 | 307 | 333 | 2,5 |
|  | scherge | Untote | ✅ [Untoter](https://wiki-de.guildwars2.com/wiki/Untoter) (en: Undead) | Cursed Combat Mech (MON_H_5_1) | 523.289 | 307 | 333 | 2,5 |
| 6 · Lv. 77 | endboss | Sabetha die Saboteurin | ✅ [Sabetha die Saboteurin](https://wiki-de.guildwars2.com/wiki/Sabetha_die_Saboteurin) (en: Sabetha the Saboteur) | Dark Kraken (BOSS_H_L_3) | 14.129.018 | 1.304 | 453 | 0,5 |
|  | scherge | Untote | ✅ [Untoter](https://wiki-de.guildwars2.com/wiki/Untoter) (en: Undead) | Soul-Stolen Elite Lizardman (MON_SOUL_4_3) | 543.940 | 388 | 298,5 | 2,5 |
|  | scherge | Geister | ✅ [Geister der Wildnis](https://wiki-de.guildwars2.com/wiki/Geister_der_Wildnis) (en: Spirits of the Wild) | Soul-Stolen Elite Lizardman (MON_SOUL_4_3) | 543.940 | 388 | 298,5 | 2,5 |

### 19. Kristalloase & Flusslande · Lv. 78–79 · Offene Welt

Zone in der Wiki: ❌ ähnlich: Hochland-Brutmutter, Region, Guild Wars 2: Path of Fire

| Stufe | Rolle | GW2-Name | Wiki | CQHT-Vorlage | HP Lv.1 | ATK Lv.1 | DEF | Tempo |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 · Lv. 78 | boss | Gebrandmarkte Hydra | ❌ ähnlich: Jahai-Klippen, Gebrandmarkter, Zentrale Brandnarbe | Dark Kraken (BOSS_H_L_3) | 14.129.018 | 1.304 | 453 | 0,5 |
|  | scherge | Erweckte | ✅ [Erweckter](https://wiki-de.guildwars2.com/wiki/Erweckter) (en: Awakened) | Soul-Stolen Elite Lizardman (MON_SOUL_4_3) | 543.940 | 388 | 298,5 | 2,5 |
|  | scherge | Geschmiedete | ✅ [Geschmiedeter](https://wiki-de.guildwars2.com/wiki/Geschmiedeter) (en: Forged) | Cursed Repair Bot (MON_H_5_2) | 550.349 | 312 | 340 | 2,5 |
| 2 · Lv. 78 | boss | Choya-Piñata | ✅ [Choya-Piñata](https://wiki-de.guildwars2.com/wiki/Choya-Pi%C3%B1ata) (en: Choya Pinata) | Dark Kraken (BOSS_H_L_3) | 14.129.018 | 1.304 | 453 | 0,5 |
|  | scherge | Geschmiedete | ✅ [Geschmiedeter](https://wiki-de.guildwars2.com/wiki/Geschmiedeter) (en: Forged) | Cursed Repair Bot (MON_H_5_2) | 550.349 | 312 | 340 | 2,5 |
|  | scherge | Gebrandmarkte | ✅ [Gebrandmarkter](https://wiki-de.guildwars2.com/wiki/Gebrandmarkter) (en: Branded) | Cursed Repair Bot (MON_H_5_2) | 550.349 | 312 | 340 | 2,5 |
| 3 · Lv. 78 | boss | Champion Erweckter Kanopen-Wächter | ❌ | Dark Dragon (BOSS_H_L_4) | 14.726.579 | 1.318 | 463 | 0,5 |
|  | scherge | Gebrandmarkte | ✅ [Gebrandmarkter](https://wiki-de.guildwars2.com/wiki/Gebrandmarkter) (en: Branded) | Soul-Stolen Ifrit (MON_SOUL_4_4) | 572.900 | 397 | 309,5 | 2,5 |
|  | scherge | Erweckte | ✅ [Erweckter](https://wiki-de.guildwars2.com/wiki/Erweckter) (en: Awakened) | Soul-Stolen Ifrit (MON_SOUL_4_4) | 572.900 | 397 | 309,5 | 2,5 |
| 4 · Lv. 79 | boss | Verschlinger-Matriarchin | ❌ ähnlich: Champion, Elite, Die Dunkellande | Dark Dragon (BOSS_H_L_4) | 14.726.579 | 1.318 | 463 | 0,5 |
|  | scherge | Erweckte | ✅ [Erweckter](https://wiki-de.guildwars2.com/wiki/Erweckter) (en: Awakened) | Soul-Stolen Ifrit (MON_SOUL_4_4) | 572.900 | 397 | 309,5 | 2,5 |
|  | scherge | Geschmiedete | ✅ [Geschmiedeter](https://wiki-de.guildwars2.com/wiki/Geschmiedeter) (en: Forged) | Cursed Gatling Droid (MON_H_5_3) | 577.410 | 316 | 346 | 2,5 |
| 5 · Lv. 79 | boss | Herold von Balthasar | ❌ ähnlich: Galerie der Rücken-Gegenstände, Waffengalerie/Schild, Kleidungsset | DioNemesis DX (BOSS_H_L_5) | 15.324.140 | 1.331 | 472,5 | 0,5 |
|  | scherge | Geschmiedete | ✅ [Geschmiedeter](https://wiki-de.guildwars2.com/wiki/Geschmiedeter) (en: Forged) | Cursed Gatling Droid (MON_H_5_3) | 577.410 | 316 | 346 | 2,5 |
|  | scherge | Gebrandmarkte | ✅ [Gebrandmarkter](https://wiki-de.guildwars2.com/wiki/Gebrandmarkter) (en: Branded) | Cursed Gatling Droid (MON_H_5_3) | 577.410 | 316 | 346 | 2,5 |
| 6 · Lv. 79 | endboss | Doppelgänger | ❌ ähnlich: Elon-Flusslande, Der Pfad zum Aufstieg, Der Treibsumpf | DioNemesis DX (BOSS_H_L_5) | 15.324.140 | 1.331 | 472,5 | 0,5 |
|  | scherge | Gebrandmarkte | ✅ [Gebrandmarkter](https://wiki-de.guildwars2.com/wiki/Gebrandmarkter) (en: Branded) | Soul-Bound Combat Mech (MON_SOUL_5_1) | 601.860 | 407 | 320 | 2,5 |
|  | scherge | Erweckte | ✅ [Erweckter](https://wiki-de.guildwars2.com/wiki/Erweckter) (en: Awakened) | Soul-Bound Combat Mech (MON_SOUL_5_1) | 601.860 | 407 | 320 | 2,5 |

### 20. Drachensturz (Die Nebel) · Lv. 80–80 · Epische Zone

Zone in der Wiki: 🟡 [Drachensturz](https://wiki-de.guildwars2.com/wiki/Drachensturz) (en: Dragonfall)

| Stufe | Rolle | GW2-Name | Wiki | CQHT-Vorlage | HP Lv.1 | ATK Lv.1 | DEF | Tempo |
| --- | --- | --- | --- | --- | --- | --- | --- | --- |
| 1 · Lv. 80 | boss | Ley-infundierter Zorn | ❌ ähnlich: Chronik/Eisbrut-Saga, Spielupdate/Juli 2014, Spielupdate/20160726 | Soltar, the Twilight Wraith (BOSS_SOLTAR_PHASE1) | 15.614.650 | 1.369 | 372,5 | 1,2 |
|  | scherge | Gebrandmarkte | ✅ [Gebrandmarkter](https://wiki-de.guildwars2.com/wiki/Gebrandmarkter) (en: Branded) | Soul-Bound Combat Mech (MON_SOUL_5_1) | 601.860 | 407 | 320 | 2,5 |
|  | scherge | Kristall-Drachenbrut | ❌ ähnlich: Flammenkamm-Steppe, Tumoks Widerstand, Zwillingsschwestern-Kreuzung | Cursed Pyro Droid (MON_H_5_4) | 604.470 | 320 | 352,5 | 2,5 |
| 2 · Lv. 80 | boss | Befallenes Riss-Monstrum | ❌ | Soltar, the Twilight Wraith (BOSS_SOLTAR_PHASE1) | 15.614.650 | 1.369 | 372,5 | 1,2 |
|  | scherge | Kristall-Drachenbrut | ❌ ähnlich: Flammenkamm-Steppe, Tumoks Widerstand, Zwillingsschwestern-Kreuzung | Cursed Pyro Droid (MON_H_5_4) | 604.470 | 320 | 352,5 | 2,5 |
|  | scherge | Erweckte | ✅ [Erweckter](https://wiki-de.guildwars2.com/wiki/Erweckter) (en: Awakened) | Cursed Pyro Droid (MON_H_5_4) | 604.470 | 320 | 352,5 | 2,5 |
| 3 · Lv. 80 | boss | Kristallflügel-General | ❌ | Soltar, the Wraith Beast (BOSS_SOLTAR_PHASE2) | 18.109.390 | 1.597 | 422,5 | 1,5 |
|  | scherge | Erweckte | ✅ [Erweckter](https://wiki-de.guildwars2.com/wiki/Erweckter) (en: Awakened) | Soul-Bound Repair Bot (MON_SOUL_5_2) | 630.820 | 416 | 331 | 2,5 |
|  | scherge | Gebrandmarkte | ✅ [Gebrandmarkter](https://wiki-de.guildwars2.com/wiki/Gebrandmarkter) (en: Branded) | Soul-Bound Repair Bot (MON_SOUL_5_2) | 630.820 | 416 | 331 | 2,5 |
| 4 · Lv. 80 | boss | Gebrandmarkter Aurene-Schatten | ❌ ähnlich: Miniatur, Auge des Brandsturms, Eine zerschmetterte Nation | Soltar, the Wraith Beast (BOSS_SOLTAR_PHASE2) | 18.109.390 | 1.597 | 422,5 | 1,5 |
|  | scherge | Gebrandmarkte | ✅ [Gebrandmarkter](https://wiki-de.guildwars2.com/wiki/Gebrandmarkter) (en: Branded) | Soul-Bound Repair Bot (MON_SOUL_5_2) | 630.820 | 416 | 331 | 2,5 |
|  | scherge | Kristall-Drachenbrut | ❌ ähnlich: Flammenkamm-Steppe, Tumoks Widerstand, Zwillingsschwestern-Kreuzung | Soul-Bound Gatling Droid (MON_SOUL_5_3) | 659.790 | 425 | 341,5 | 2,5 |
| 5 · Lv. 80 | boss | Geißel der Schöpfung | ❌ ähnlich: Palawas Poesie: Erster Entwurf, Aphorismen Jokos, des Ewigen Monarchen aller Dinge | Soltar, the Lord of Souls (BOSS_SOLTAR_PHASE3) | 24.043.400 | 1.916 | 472,5 | 2 |
|  | scherge | Kristall-Drachenbrut | ❌ ähnlich: Flammenkamm-Steppe, Tumoks Widerstand, Zwillingsschwestern-Kreuzung | Soul-Bound Gatling Droid (MON_SOUL_5_3) | 659.790 | 425 | 341,5 | 2,5 |
|  | scherge | Erweckte | ✅ [Erweckter](https://wiki-de.guildwars2.com/wiki/Erweckter) (en: Awakened) | Soul-Bound Gatling Droid (MON_SOUL_5_3) | 659.790 | 425 | 341,5 | 2,5 |
| 6 · Lv. 80 | endboss | Kralkatorrik | ✅ [Kralkatorrik](https://wiki-de.guildwars2.com/wiki/Kralkatorrik) | Soltar, the Lord of Souls (BOSS_SOLTAR_PHASE3) | 24.043.400 | 1.916 | 472,5 | 2 |
|  | scherge | Erweckte | ✅ [Erweckter](https://wiki-de.guildwars2.com/wiki/Erweckter) (en: Awakened) | Soul-Bound Pyro Droid (MON_SOUL_5_4) | 688.750 | 434 | 352,5 | 2,5 |
|  | scherge | Gebrandmarkte | ✅ [Gebrandmarkter](https://wiki-de.guildwars2.com/wiki/Gebrandmarkter) (en: Branded) | Soul-Bound Pyro Droid (MON_SOUL_5_4) | 688.750 | 434 | 352,5 | 2,5 |

## Bosse ohne Wiki-Seite (100)

- Banditen-Anführerin – Suche findet: Bandit, Die Blüte der Jugend, Gnashar-Hügel
- Banditen-Schläger Grasp
- Champion Krait-Hypnotiseur
- Zentauren-Oberhäuptling
- Champion Toxischer Spinnen-König – Suche findet: Trank, Champion, Miniatur
- Blut-Hexe – Suche findet: Baumgrenzen-Fälle, Krait, Miniatur
- Verderbt: Toxischer Spinnen-König – Suche findet: Trank, Champion, Miniatur
- Schatten: Toxischer Spinnen-König – Suche findet: Trank, Champion, Miniatur
- Separatisten-Belagerer – Suche findet: Belag-Kreuzung, Axtzug-Kanal, Felder der Verwüstung
- Königlicher Leibwächter Pete – Suche findet: Logan Thackeray
- Butler Michiels
- Gepfefferte Bridgette
- Separatisten-Hauptmann DeLana – Suche findet: DeLana-Geldbörse, Verbogener Dietrich, Beutel mit stibitzten Waren
- Champion Minotauren-Bulle – Suche findet: Minotaurus, Borealis-Wald, Die Osenfold-Schneide
- Champion Grawl-Häuptling – Suche findet: Grawl, Chronik/Meine Geschichte/Helfende Hände, Heldenherausforderung
- Schamanen-Vorbote des Jormag – Suche findet: Garantierte Garderoben-Freischaltung
- Svanir-Schamane – Suche findet: Die Söhne Svanirs, Wanderer-Hügel, Eisbrut
- Verderbt: Svanir-Schamane – Suche findet: Die Söhne Svanirs, Wanderer-Hügel, Eisbrut
- Schatten: Svanir-Schamane – Suche findet: Die Söhne Svanirs, Wanderer-Hügel, Eisbrut
- Schneeleoparden-Matriarchin – Suche findet: Junger Feuer-Wyvern
- Champion Svanir-Häscher – Suche findet: Was übrig bleibt, Miniatur, Taigan-Hain
- Champion Frost-Grawl – Suche findet: Ein festlich-froher Wintertag (2014), Winziges Totem, Kleines Totem
- Dredge-Tunnelmeister
- Drachen-Schamane der Svanir – Suche findet: Besiegt den Drachen-Schamanen der Svanir, Die Söhne Svanirs, Wanderer-Hügel
- Verderbt: Drachen-Schamane der Svanir – Suche findet: Besiegt den Drachen-Schamanen der Svanir, Die Söhne Svanirs, Wanderer-Hügel
- Ralena & Vassar – Suche findet: Gruft der Liebenden, Vassar, Katakomben von Ascalon (Story)
- Geisterhafter Nekromant – Suche findet: Geist, Weißer Mantel, Kraftvoller Giftbeutel
- Meister-Nekromant – Suche findet: Nekromant, Zustandsschaden, Klasse
- Piratinnen-Kapitänin
- Champion Schlamm-Monstrum
- Zentauren-Belagerungsmeister – Suche findet: Zentaur, Steinbohrung-Kammern, Wächterpass
- Dredge-Kommandant
- Kriegsmeister Ulgoths Vorbote
- Champion Banditen-Kriegsherr – Suche findet: Königin Jennah, Spielupdate/20200225, Spielupdate/Februar 2020
- Verderbt: Kriegsmeister Ulgoths Vorbote
- Harathi-Schlächter – Suche findet: Rätsel, Gebiet, Meta-Event
- Champion Modniir-Häuptling – Suche findet: Liste der Waffensets, Zentaur, Champion
- Kolossaler Erdelementar
- Seraphen-Verräter Valen – Suche findet: Biographie/Details
- Kriegsmeister Ulgoth
- Zentauren-Kriegsherr Kol
- Verderbt: Kriegsmeister Ulgoth
- Schatten: Kriegsmeister Ulgoth
- Champion Krait-Priester – Suche findet: Krait, Auferstandener, Champion
- Champion Auferstandener Offizier – Suche findet: Champion, Miniatur, Elite
- Dredge-Kriegsmaschine
- Piratinnen-Admiralin
- Dreiköpfige Krait-Bestie
- Champion Kropf-Krake
- Verderbt: Dreiköpfige Krait-Bestie
- Champion Krait-Echse
- Zhaff-Sumpfmonster
- Hylek-Schamane Cuatl – Suche findet: Hylek, Heldenherausforderung
- Megawurm
- Champion Brand-Goliath
- Separatisten-Anführer – Suche findet: Ebonfalke-Festung, Champion, Ebon-Vorhut
- Flammenlegion-Kultist
- Gebrandmarkter Zerschmetterer-Leutnant – Suche findet: Gebrandmarkter, Der Zerschmetterer, Eine zerschmetterte Nation
- Sklavenmeister – Suche findet: Abwerfen der Ketten, Vertreibt die Auferstandenen Krait aus Kahloipoi, Aaminah
- Gaheron-Eiferer – Suche findet: Flammenzitadelle/Forschung - Rhiannon, Flammenzitadelle/Forschung - Magg, Flammenzitadelle/Forschung - Farrah
- Evolvierter Flammen-Schamane
- Magister des Baelfire
- Dredge-Generaldirektor
- Champion Svanir-Hexenmeister – Suche findet: Champion, Miniatur, Schwarzlöwen-Ticket für Miniaturen
- Unterwasser-Krake Svanir
- Eisbrut-Koloss – Suche findet: Miniatur, Beherrschungspunkt, Chuka und Champawat III: Tigris
- Vorarbeiter Spur – Suche findet: Die Belagerungsebene, Leseratte, Zwielichtgarten/Forschung - Ätherpfad
- Targa der Peiniger
- General Molotov
- Dredge-Kriegsgolem
- Inquestur-Chef Kudu
- Der Eiserne Schlächter – Suche findet: Ascalon-Becken, Blut-Legion, Flamme und Frost: Die Vergeltung
- Maul des Zhaitan – Suche findet: Magie, Haus der Verwesung, Der Klang der Psi-Lanze
- Hohepriester des Balthasar – Suche findet: Die Ruinenstadt Arah/Forschung - Randall Graustein, Auferstandener, Eigenschaftenhandbuch
- Hohepriesterin der Dwayna – Suche findet: Die Ruinenstadt Arah/Forschung - Randall Graustein, Malchors Sprung, Spielupdate/20231106
- Hohepriester der Grenth – Suche findet: Die Ruinenstadt Arah/Forschung - Randall Graustein, Auferstandener, Eigenschaftenhandbuch
- Mordrem-Hüllen-Champion – Suche findet: Hülle, Champion, Mordrem-Organ
- Mordrem-Rankenbrecher
- Mordrem-Teragriff
- Blasenwerfender Mordrem-Wolf
- Großer Züchter – Suche findet: Mabon-Markt, Brockenmund-Tal, Klippheim
- Patriarch der Wyvern – Suche findet: Legende Wyvern-Patriarch, Legende Wyvern-Patriarch (Kopfgeld), Bezwingt das legendäre Kopfgeldziel (Legendäre Wyvern)
- Axthauer-Champion
- Mordrem-Kommandeur Diarmid – Suche findet: Eskortiert die Truppen zum Mordrem-Feuerspucker, Zentraler Angriff, Klingenmeisterin Diarmid nähert sich
- Mordrem-Kommandeur Stabmeister – Suche findet: Mutter Dschungel sorgt für uns, Widerstand des Drachen (Meta-Event), Stabmeister Adryn nähert sich
- Flügel-Schrecken – Suche findet: Schlachtzug, Bezwinger, Prolog: Durch Blut gebunden
- Matriarchin der Wyvern – Suche findet: Baumkronen über Pakt-Lager, Legende Wyvern-Matriarchin, Tötet die Wyvern-Matriarchin
- Zunder-Bandit – Suche findet: Trophäe, Seraphen-Soldatin Dianna, Spielupdate/20121215
- Kern-Spaltmonstrum
- Turmwächter Karde
- Gebrandmarkte Hydra – Suche findet: Jahai-Klippen, Gebrandmarkter, Zentrale Brandnarbe
- Champion Erweckter Kanopen-Wächter
- Verschlinger-Matriarchin – Suche findet: Champion, Elite, Die Dunkellande
- Herold von Balthasar – Suche findet: Galerie der Rücken-Gegenstände, Waffengalerie/Schild, Kleidungsset
- Doppelgänger – Suche findet: Elon-Flusslande, Der Pfad zum Aufstieg, Der Treibsumpf
- Ley-infundierter Zorn – Suche findet: Chronik/Eisbrut-Saga, Spielupdate/Juli 2014, Spielupdate/20160726
- Befallenes Riss-Monstrum
- Kristallflügel-General
- Gebrandmarkter Aurene-Schatten – Suche findet: Miniatur, Auge des Brandsturms, Eine zerschmetterte Nation
- Geißel der Schöpfung – Suche findet: Palawas Poesie: Erster Entwurf, Aphorismen Jokos, des Ewigen Monarchen aller Dinge
