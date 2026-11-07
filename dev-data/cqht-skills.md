# Forschung – Crusaders Quest: Hero Town (Referenz)

> Interne Entwicklungs-Referenz für **Aetherbastion: Rift Watch** (späterer Ausbau des Asura-Labors). Erzeugt mit `node tools/fetch-skills.mjs .` aus https://cqht-wiki.vercel.app/en/skills am 2026-11-07. Nicht von Hand bearbeiten. Spielinhalte © CQ LABS / Loadcomplete; nur als Vorlage, Namen und Texte vor der Übernahme auf GW2 ummünzen.

**Felder:** *Labor* = nötige Labor-Stufe · *Kosten* in Honor (bei uns 📜 Forschungsnotizen) · *Zeit* wie in der Wiki angezeigt (m:ss, vermutlich Sekunden) · *Voraussetzung* = vorher nötige Forschungen · *Schaltet frei* = Funktion statt reinem Wertebonus. Deutsche Namen und Texte stammen aus der Wiki.

| Baum | Forschungen | Kosten gesamt | Zeit gesamt | Freischaltungen |
| --- | --- | --- | --- | --- |
| Stadtverwaltung (MANAGE) | 130 | 37.662 | 899:50 | 130 |
| Helden-Upgrades (HERO) | 153 | 43.391 | 1477:20 | 18 |
| Erweiterte Stadtverwaltung (MANAGE2) | 65 | 132.700 | 1961:40 | 65 |
| Erweiterte Helden-Upgrades (HERO2) | 88 | 237.100 | 3258:20 | 14 |

## Stadtverwaltung (MANAGE)

### Labor-Stufe 1

| ID | Name | Beschreibung | Kosten | Zeit | Voraussetzung | Schaltet frei |
| --- | --- | --- | --- | --- | --- | --- |
| `UPGRADE_MANAGE_GODDESS_ROOM_1` | Heldenunterkunft I *(Hero's Rest I)* | Erhöht die Kapazität des Göttinnenzimmers in der Town Hall. | 2 | 0:30 | – | `UNLOCK_GODDESS_ROOM` |
| `UPGRADE_MANAGE_HERO_REROLL_1` | Einrichtungen aktivieren *(Activate Facilities)* | Schaltet die Helden-Rekrutierungs-Aktualisierung frei. | 1 | 0:10 | – | `UNLOCK_HERO_REROLL` |
| `UPGRADE_MANAGE_RECRUIT_CLASS_1` | Talentrekrutierung *(Talent Recruit)* | Paladin-, Jäger- und Priester-Helden erscheinen bei der Rekrutierung und die Klasse wird bei der Beförderung gesperrt. | 20 | 1:00 | – | `UNLOCK_RECRUIT_CLASS` |
| `UPGRADE_MANAGE_AUTO_GEN_1` | Abenteuerzeit *(Adventure Time)* | Schaltet die automatische Monsterbeschwörung des Portals frei. | 30 | 1:00 | – | `UNLOCK_AUTO_GEN` |
| `UPGRADE_MANAGE_BARRACK_ADD_1` | Heldentrupp-Erweiterung I *(Hero Squad Expansion I)* | Max. Zeltbauanzahl +1. | 5 | 0:30 | Einrichtungen aktivieren | `UNLOCK_BARRACK_ADD` |
| `UPGRADE_MANAGE_PORTAL_ADD_1` | Portal-Erweiterung I *(Portal Expansion I)* | Max. Portalbauanzahl +1. | 3 | 0:30 | Einrichtungen aktivieren | `UNLOCK_PORTAL_ADD` |
| `UPGRADE_MANAGE_SHARE_EXP_1` | EXP-Teilung I *(EXP Share I)* | EXP anderer Gruppen bei Monstertötung +20%. | 10 | 0:30 | Heldentrupp-Erweiterung I | `UNLOCK_SHARE_EXP` |

### Labor-Stufe 2

| ID | Name | Beschreibung | Kosten | Zeit | Voraussetzung | Schaltet frei |
| --- | --- | --- | --- | --- | --- | --- |
| `UPGRADE_MANAGE_MONSTER_ADD_GOLD_1` | Goldrausch I *(Gold Rush I)* | Gold bei Monstertötung +5%. | 2 | 0:15 | Einrichtungen aktivieren | `UNLOCK_MONSTER_ADD_GOLD` |
| `UPGRADE_MANAGE_MONSTER_BREAD_CHANCE_1` | Feldversorgung I *(Field Supply I)* | Erhöht die Brot-Droprate beim Besiegen von Monstern. | 2 | 0:15 | Einrichtungen aktivieren | `UNLOCK_MONSTER_BREAD_CHANCE` |
| `UPGRADE_MANAGE_SMITHY_1` | Fergus' Schmiede *(Fergus's Smithy)* | Schaltet den Schmiedenbau frei. | 5 | 0:25 | Portal-Erweiterung I | `UNLOCK_SMITHY` |
| `UPGRADE_MANAGE_MONSTER_ADD_GOLD_2` | Goldrausch II *(Gold Rush II)* | Gold bei Monstertötung +5%. | 6 | 0:20 | Goldrausch I | `UNLOCK_MONSTER_ADD_GOLD` |
| `UPGRADE_MANAGE_MONSTER_BREAD_CHANCE_2` | Feldversorgung II *(Field Supply II)* | Erhöht die Brot-Droprate beim Besiegen von Monstern. | 6 | 0:20 | Feldversorgung I | `UNLOCK_MONSTER_BREAD_CHANCE` |
| `UPGRADE_MANAGE_SHARE_EXP_2` | EXP-Teilung II *(EXP Share II)* | EXP anderer Gruppen bei Monstertötung +20%. | 30 | 1:00 | EXP-Teilung I | `UNLOCK_SHARE_EXP` |
| `UPGRADE_MANAGE_MONSTER_WEAPON_CHANCE_1` | Waffenglück I *(Weapon Luck I)* | Erhöht die Waffen-Droprate beim Besiegen von Monstern. | 10 | 0:30 | Fergus' Schmiede | `UNLOCK_MONSTER_WEAPON_CHANCE` |
| `UPGRADE_MANAGE_BAKERY_1` | Chocolats Bäckerei *(Chocolat's Bakery)* | Schaltet den Bäckereibau frei. | 8 | 0:30 | Fergus' Schmiede | `UNLOCK_BAKERY` |
| `UPGRADE_MANAGE_MONSTER_BREAD_CHANCE_3` | Feldversorgung III *(Field Supply III)* | Erhöht die Brot-Droprate beim Besiegen von Monstern. | 12 | 0:20 | Feldversorgung II | `UNLOCK_MONSTER_BREAD_CHANCE` |
| `UPGRADE_MANAGE_HONOR_GEN_1` | Korps-Promotion I *(Corps Promotion I)* | Erhalte alle 10 Minuten 1 zusätzliche Ehre. | 8 | 1:00 | Heldenunterkunft I | `UNLOCK_HONOR_GEN` |
| `UPGRADE_MANAGE_MONSTER_WEAPON_CHANCE_2` | Waffenglück II *(Weapon Luck II)* | Erhöht die Waffen-Droprate beim Besiegen von Monstern. | 20 | 0:45 | Waffenglück I | `UNLOCK_MONSTER_WEAPON_CHANCE` |
| `UPGRADE_MANAGE_MONSTER_ADD_EXP_1` | Wachstums-Boost I *(Growth Boost I)* | EXP bei Monstertötung +5%. | 12 | 0:20 | – | `UNLOCK_MONSTER_ADD_EXP` |
| `UPGRADE_MANAGE_MONSTER_BREAD_CHANCE_4` | Feldversorgung IV *(Field Supply IV)* | Erhöht die Brot-Droprate beim Besiegen von Monstern. | 15 | 0:25 | Feldversorgung III | `UNLOCK_MONSTER_BREAD_CHANCE` |
| `UPGRADE_MANAGE_HONOR_GEN_2` | Korps-Promotion II *(Corps Promotion II)* | Erhalte alle 10 Minuten 1 zusätzliche Ehre. | 10 | 1:00 | Korps-Promotion I | `UNLOCK_HONOR_GEN` |
| `UPGRADE_MANAGE_ARENA_1` | Hero Town Arena | Schaltet den Arenabau frei. | 25 | 0:30 | Fergus' Schmiede | `UNLOCK_ARENA` |
| `UPGRADE_MANAGE_MONSTER_ADD_EXP_2` | Wachstums-Boost II *(Growth Boost II)* | EXP bei Monstertötung +5%. | 15 | 0:25 | Wachstums-Boost I | `UNLOCK_MONSTER_ADD_EXP` |
| `UPGRADE_MANAGE_MONSTER_BREAD_CHANCE_5` | Feldversorgung V *(Field Supply V)* | Erhöht die Brot-Droprate beim Besiegen von Monstern. | 20 | 0:30 | Feldversorgung IV | `UNLOCK_MONSTER_BREAD_CHANCE` |
| `UPGRADE_MANAGE_AUTO_PICKUP_1` | Schnelle Bergung *(Swift Recovery)* | Hebt automatisch auf dem Feld abgelegte Gegenstände auf. | 50 | 1:00 | – | `UNLOCK_AUTO_PICKUP` |

### Labor-Stufe 3

| ID | Name | Beschreibung | Kosten | Zeit | Voraussetzung | Schaltet frei |
| --- | --- | --- | --- | --- | --- | --- |
| `UPGRADE_MANAGE_HONOR_GEN_3` | Korps-Promotion III *(Corps Promotion III)* | Erhalte alle 10 Minuten 1 zusätzliche Ehre. | 50 | 1:00 | Hero Town Arena | `UNLOCK_HONOR_GEN` |
| `UPGRADE_MANAGE_GODDESS_ROOM_2` | Heldenunterkunft II *(Hero's Rest II)* | Erhöht die Kapazität des Göttinnenzimmers in der Town Hall. | 35 | 0:45 | Korps-Promotion II | `UNLOCK_GODDESS_ROOM` |
| `UPGRADE_MANAGE_HONOR_GEN_4` | Korps-Promotion IV *(Corps Promotion IV)* | Erhalte alle 10 Minuten 1 zusätzliche Ehre. | 60 | 1:15 | Korps-Promotion III | `UNLOCK_HONOR_GEN` |
| `UPGRADE_MANAGE_MONSTER_ADD_GOLD_3` | Goldrausch III *(Gold Rush III)* | Gold beim Töten von Monstern +5%. | 45 | 0:45 | – | `UNLOCK_MONSTER_ADD_GOLD` |
| `UPGRADE_MANAGE_MONSTER_ADD_EXP_3` | Wachstums-Boost III *(Growth Boost III)* | EXP beim Töten von Monstern +5%. | 40 | 0:30 | – | `UNLOCK_MONSTER_ADD_EXP` |
| `UPGRADE_MANAGE_HONOR_GEN_5` | Korps-Promotion V *(Corps Promotion V)* | Erhalte alle 10 Minuten 1 zusätzliche Ehre. | 65 | 1:30 | Korps-Promotion IV | `UNLOCK_HONOR_GEN` |
| `UPGRADE_MANAGE_ORCHARD_1` | Lennys Obstgarten *(Lenny's Orchard)* | Ermöglicht den Bau des Obstgartens. | 50 | 0:30 | Chocolats Bäckerei | `UNLOCK_ORCHARD` |
| `UPGRADE_MANAGE_MONSTER_ADD_EXP_4` | Wachstums-Boost IV *(Growth Boost IV)* | EXP beim Töten von Monstern +5%. | 45 | 0:45 | Wachstums-Boost III | `UNLOCK_MONSTER_ADD_EXP` |
| `UPGRADE_MANAGE_MONSTER_ADD_EXP_5` | Wachstums-Boost V *(Growth Boost V)* | EXP beim Töten von Monstern +5%. | 50 | 1:00 | Wachstums-Boost IV | `UNLOCK_MONSTER_ADD_EXP` |

### Labor-Stufe 4

| ID | Name | Beschreibung | Kosten | Zeit | Voraussetzung | Schaltet frei |
| --- | --- | --- | --- | --- | --- | --- |
| `UPGRADE_MANAGE_BARRACK_ADD_2` | Heldentrupp-Erweiterung II *(Hero Squad Expansion II)* | Max. Zeltbauanzahl +1. | 50 | 1:00 | Heldenunterkunft II | `UNLOCK_BARRACK_ADD` |
| `UPGRADE_MANAGE_HERO_DISCOUNT_1` | Verhandlung I *(Negotiation I)* | Goldkosten für Hero-Rekrutierung -10%. | 40 | 0:45 | Heldentrupp-Erweiterung II | `UNLOCK_HERO_DISCOUNT` |
| `UPGRADE_MANAGE_SHARE_EXP_3` | EXP-Teilung III *(EXP Share III)* | EXP anderer Gruppen bei Monsterkills +20%. | 60 | 3:00 | Heldentrupp-Erweiterung II | `UNLOCK_SHARE_EXP` |
| `UPGRADE_MANAGE_ORCHARD_TREE_GROWTH_1` | Arbeits-Boost I *(Labor Boost I)* | Die Baumverwaltungszeit der Helden verringert sich. | 80 | 2:00 | Lennys Obstgarten | `UNLOCK_ORCHARD_TREE_GROWTH` |
| `UPGRADE_MANAGE_ORCHARD_TREE_CHANCE_1` | Naturglück I *(Nature's Fortune I)* | Chance auf höhergradige Bäume beim Pflanzen von Samen erhöht sich. | 80 | 2:00 | Lennys Obstgarten | `UNLOCK_ORCHARD_TREE_CHANCE` |
| `UPGRADE_MANAGE_HERO_DISCOUNT_2` | Verhandlung II *(Negotiation II)* | Goldkosten für Hero-Rekrutierung -10%. | 45 | 0:45 | Verhandlung I | `UNLOCK_HERO_DISCOUNT` |
| `UPGRADE_MANAGE_ORCHARD_TREE_GROWTH_2` | Arbeits-Boost II *(Labor Boost II)* | Die Baumverwaltungszeit der Helden verringert sich. | 100 | 2:00 | Arbeits-Boost I | `UNLOCK_ORCHARD_TREE_GROWTH` |
| `UPGRADE_MANAGE_ORCHARD_TREE_CHANCE_2` | Naturglück II *(Nature's Fortune II)* | Chance auf höhergradige Bäume beim Pflanzen von Samen erhöht sich. | 100 | 2:00 | Naturglück I | `UNLOCK_ORCHARD_TREE_CHANCE` |

### Labor-Stufe 5

| ID | Name | Beschreibung | Kosten | Zeit | Voraussetzung | Schaltet frei |
| --- | --- | --- | --- | --- | --- | --- |
| `UPGRADE_MANAGE_GODDESS_ROOM_3` | Heldenunterkunft III *(Hero's Rest III)* | Erhöht die Kapazität des Götterraums im Town Hall. | 60 | 2:00 | Heldentrupp-Erweiterung II | `UNLOCK_GODDESS_ROOM` |
| `UPGRADE_MANAGE_BARRACK_ADD_3` | Heldentrupp-Erweiterung III *(Hero Squad Expansion III)* | Max. Zeltbauanzahl +1. | 80 | 1:30 | Hero Town Arena | `UNLOCK_BARRACK_ADD` |
| `UPGRADE_MANAGE_PORTAL_ADD_2` | Portal-Erweiterung II *(Portal Expansion II)* | Max. Portalbauanzahl +1. | 70 | 1:15 | – | `UNLOCK_PORTAL_ADD` |
| `UPGRADE_MANAGE_HERO_DISCOUNT_3` | Verhandlung III *(Negotiation III)* | Goldkosten für Hero-Rekrutierung -10%. | 60 | 1:00 | Heldentrupp-Erweiterung III | `UNLOCK_HERO_DISCOUNT` |
| `UPGRADE_MANAGE_SHARE_EXP_4` | EXP-Teilung IV *(EXP Share IV)* | EXP anderer Gruppen bei Monsterkills +20%. | 100 | 3:20 | Heldentrupp-Erweiterung III | `UNLOCK_SHARE_EXP` |
| `UPGRADE_MANAGE_MONSTER_WEAPON_CHANCE_3` | Waffenglück III *(Weapon Luck III)* | Erhöht die Waffendroprate beim Besiegen von Monstern. | 50 | 0:45 | Portal-Erweiterung II | `UNLOCK_MONSTER_WEAPON_CHANCE` |
| `UPGRADE_MANAGE_MONSTER_ADD_GOLD_4` | Goldrausch IV *(Gold Rush IV)* | Gold beim Töten von Monstern +5%. | 40 | 0:30 | Portal-Erweiterung II | `UNLOCK_MONSTER_ADD_GOLD` |
| `UPGRADE_MANAGE_GODDESS_ROOM_4` | Heldenunterkunft IV *(Hero's Rest IV)* | Erhöht die Kapazität des Götterraums im Town Hall. | 80 | 3:00 | Heldenunterkunft III | `UNLOCK_GODDESS_ROOM` |
| `UPGRADE_MANAGE_HERO_DISCOUNT_4` | Verhandlung IV *(Negotiation IV)* | Goldkosten für Hero-Rekrutierung -10%. | 70 | 1:15 | Verhandlung III | `UNLOCK_HERO_DISCOUNT` |
| `UPGRADE_MANAGE_MONSTER_WEAPON_CHANCE_4` | Waffenglück IV *(Weapon Luck IV)* | Erhöht die Waffendroprate beim Besiegen von Monstern. | 60 | 1:00 | Waffenglück III | `UNLOCK_MONSTER_WEAPON_CHANCE` |
| `UPGRADE_MANAGE_MONSTER_ADD_GOLD_5` | Goldrausch V *(Gold Rush V)* | Gold beim Töten von Monstern +5%. | 50 | 0:45 | Goldrausch IV | `UNLOCK_MONSTER_ADD_GOLD` |
| `UPGRADE_MANAGE_GODDESS_ROOM_5` | Heldenunterkunft V *(Hero's Rest V)* | Erhöht die Kapazität des Götterraums im Town Hall. | 100 | 5:00 | Heldenunterkunft IV | `UNLOCK_GODDESS_ROOM` |
| `UPGRADE_MANAGE_HERO_DISCOUNT_5` | Verhandlung V *(Negotiation V)* | Goldkosten für Hero-Rekrutierung -10%. | 80 | 1:30 | Verhandlung IV | `UNLOCK_HERO_DISCOUNT` |
| `UPGRADE_MANAGE_SHARE_EXP_5` | EXP-Teilung V *(EXP Share V)* | EXP anderer Gruppen bei Monsterkills +20%. | 120 | 5:00 | EXP-Teilung IV | `UNLOCK_SHARE_EXP` |
| `UPGRADE_MANAGE_MONSTER_WEAPON_CHANCE_5` | Waffenglück V *(Weapon Luck V)* | Erhöht die Waffendroprate beim Besiegen von Monstern. | 70 | 1:30 | Waffenglück IV | `UNLOCK_MONSTER_WEAPON_CHANCE` |
| `UPGRADE_MANAGE_ACHIEVEMENTS_MANAGE_FINISH_1` | Willkommen in Hero Town *(Welcome to Hero Town)* | Schaltet zusätzliche Skillknoten für Hero Town frei. | 200 | 15:00 | – | `UNLOCK_ACHIEVEMENTS_MANAGE_FINISH` |
| `UPGRADE_MANAGE_ORCHARD_AUTO_HARVEST_1` | Hervorragende Arbeitskraft *(Excellent Workforce)* | Ermöglicht das automatische Pflanzen und Ernten von Obstgartenbäumen. | 150 | 5:00 | Lennys Obstgarten | `UNLOCK_ORCHARD_AUTO_HARVEST` |
| `UPGRADE_MANAGE_AUTO_CHALLENGE_1` | Nur zu! *(Bring It On!)* | Ermöglicht die automatische Boss-Herausforderung. | 150 | 5:00 | Portal-Erweiterung II | `UNLOCK_AUTO_CHALLENGE` |

### Labor-Stufe 6

| ID | Name | Beschreibung | Kosten | Zeit | Voraussetzung | Schaltet frei |
| --- | --- | --- | --- | --- | --- | --- |
| `UPGRADE_MANAGE_GODDESS_ROOM_6` | Heldenunterkunft VI *(Hero's Rest VI)* | Erhöht die Kapazität des Götterraums im Town Hall. | 100 | 3:20 | Willkommen in Hero Town | `UNLOCK_GODDESS_ROOM` |
| `UPGRADE_MANAGE_ORCHARD_TREE_CHANCE_3` | Naturglück III *(Nature's Fortune III)* | Chance auf höhergradige Bäume beim Pflanzen von Samen erhöht sich. | 100 | 3:20 | Willkommen in Hero Town | `UNLOCK_ORCHARD_TREE_CHANCE` |
| `UPGRADE_MANAGE_MONSTER_ADD_EXP_6` | Wachstums-Boost VI *(Growth Boost VI)* | EXP beim Töten von Monstern +5%. | 100 | 3:20 | Willkommen in Hero Town | `UNLOCK_MONSTER_ADD_EXP` |
| `UPGRADE_MANAGE_MONSTER_WEAPON_CHANCE_6` | Waffenglück VI *(Weapon Luck VI)* | Erhöht die Waffendroprate beim Besiegen von Monstern. | 100 | 3:20 | Willkommen in Hero Town | `UNLOCK_MONSTER_WEAPON_CHANCE` |
| `UPGRADE_MANAGE_MONSTER_ADD_GOLD_6` | Goldrausch VI *(Gold Rush VI)* | Gold beim Töten von Monstern +5%. | 100 | 3:20 | Willkommen in Hero Town | `UNLOCK_MONSTER_ADD_GOLD` |
| `UPGRADE_MANAGE_MONSTER_BREAD_CHANCE_6` | Feldversorgung VI *(Field Supply VI)* | Erhöht die Brot-Droprate beim Besiegen von Monstern. | 100 | 3:20 | Willkommen in Hero Town | `UNLOCK_MONSTER_BREAD_CHANCE` |
| `UPGRADE_MANAGE_GODDESS_ROOM_7` | Heldenunterkunft VII *(Hero's Rest VII)* | Erhöht die Kapazität des Götterraums im Town Hall. | 150 | 3:20 | Heldenunterkunft VI | `UNLOCK_GODDESS_ROOM` |
| `UPGRADE_MANAGE_ORCHARD_TREE_CHANCE_4` | Naturglück IV *(Nature's Fortune IV)* | Chance auf höhergradige Bäume beim Pflanzen von Samen erhöht sich. | 150 | 3:20 | Naturglück III | `UNLOCK_ORCHARD_TREE_CHANCE` |
| `UPGRADE_MANAGE_MONSTER_ADD_EXP_7` | Wachstums-Boost VII *(Growth Boost VII)* | EXP beim Töten von Monstern +5%. | 150 | 3:20 | Wachstums-Boost VI | `UNLOCK_MONSTER_ADD_EXP` |
| `UPGRADE_MANAGE_MONSTER_WEAPON_CHANCE_7` | Waffenglück VII *(Weapon Luck VII)* | Erhöht die Waffendroprate beim Besiegen von Monstern. | 150 | 3:20 | Waffenglück VI | `UNLOCK_MONSTER_WEAPON_CHANCE` |
| `UPGRADE_MANAGE_MONSTER_ADD_GOLD_7` | Goldrausch VII *(Gold Rush VII)* | Gold beim Töten von Monstern +5%. | 150 | 3:20 | Goldrausch VI | `UNLOCK_MONSTER_ADD_GOLD` |
| `UPGRADE_MANAGE_MONSTER_BREAD_CHANCE_7` | Feldversorgung VII *(Field Supply VII)* | Erhöht die Brot-Droprate beim Besiegen von Monstern. | 150 | 3:20 | Feldversorgung VI | `UNLOCK_MONSTER_BREAD_CHANCE` |
| `UPGRADE_MANAGE_GODDESS_ROOM_8` | Heldenunterkunft VIII *(Hero's Rest VIII)* | Erhöht die Kapazität des Götterraums im Town Hall. | 200 | 3:20 | Heldenunterkunft VII | `UNLOCK_GODDESS_ROOM` |
| `UPGRADE_MANAGE_ORCHARD_TREE_CHANCE_5` | Naturglück V *(Nature's Fortune V)* | Chance auf höhergradige Bäume beim Pflanzen von Samen erhöht sich. | 200 | 3:20 | Naturglück IV | `UNLOCK_ORCHARD_TREE_CHANCE` |
| `UPGRADE_MANAGE_MONSTER_ADD_EXP_8` | Wachstums-Boost VIII *(Growth Boost VIII)* | EXP beim Töten von Monstern +5%. | 200 | 3:20 | Wachstums-Boost VII | `UNLOCK_MONSTER_ADD_EXP` |
| `UPGRADE_MANAGE_MONSTER_WEAPON_CHANCE_8` | Waffenglück VIII *(Weapon Luck VIII)* | Erhöht die Waffendroprate beim Besiegen von Monstern. | 200 | 3:20 | Waffenglück VII | `UNLOCK_MONSTER_WEAPON_CHANCE` |
| `UPGRADE_MANAGE_MONSTER_ADD_GOLD_8` | Goldrausch VIII *(Gold Rush VIII)* | Gold beim Töten von Monstern +5%. | 200 | 3:20 | Goldrausch VII | `UNLOCK_MONSTER_ADD_GOLD` |
| `UPGRADE_MANAGE_MONSTER_BREAD_CHANCE_8` | Feldversorgung VIII *(Field Supply VIII)* | Erhöht die Brot-Droprate beim Besiegen von Monstern. | 200 | 3:20 | Feldversorgung VII | `UNLOCK_MONSTER_BREAD_CHANCE` |
| `UPGRADE_MANAGE_GODDESS_ROOM_9` | Heldenunterkunft IX *(Hero's Rest IX)* | Erhöht die Kapazität des Götterraums im Town Hall. | 250 | 3:20 | Heldenunterkunft VIII | `UNLOCK_GODDESS_ROOM` |
| `UPGRADE_MANAGE_ORCHARD_TREE_CHANCE_6` | Naturglück VI *(Nature's Fortune VI)* | Chance auf höhergradige Bäume beim Pflanzen von Samen erhöht sich. | 250 | 3:20 | Naturglück V | `UNLOCK_ORCHARD_TREE_CHANCE` |
| `UPGRADE_MANAGE_MONSTER_ADD_EXP_9` | Wachstums-Boost IX *(Growth Boost IX)* | EXP beim Töten von Monstern +5%. | 250 | 3:20 | Wachstums-Boost VIII | `UNLOCK_MONSTER_ADD_EXP` |
| `UPGRADE_MANAGE_MONSTER_WEAPON_CHANCE_9` | Waffenglück IX *(Weapon Luck IX)* | Erhöht die Waffendroprate beim Besiegen von Monstern. | 250 | 3:20 | Waffenglück VIII | `UNLOCK_MONSTER_WEAPON_CHANCE` |
| `UPGRADE_MANAGE_MONSTER_ADD_GOLD_9` | Goldrausch IX *(Gold Rush IX)* | Gold beim Töten von Monstern +5%. | 250 | 3:20 | Goldrausch VIII | `UNLOCK_MONSTER_ADD_GOLD` |
| `UPGRADE_MANAGE_MONSTER_BREAD_CHANCE_9` | Feldversorgung IX *(Field Supply IX)* | Erhöht die Brot-Droprate beim Besiegen von Monstern. | 250 | 3:20 | Feldversorgung VIII | `UNLOCK_MONSTER_BREAD_CHANCE` |
| `UPGRADE_MANAGE_GODDESS_ROOM_10` | Heldenunterkunft X *(Hero's Rest X)* | Erhöht die Kapazität des Götterraums im Town Hall. | 300 | 3:20 | Heldenunterkunft IX | `UNLOCK_GODDESS_ROOM` |
| `UPGRADE_MANAGE_ORCHARD_TREE_CHANCE_7` | Naturglück VII *(Nature's Fortune VII)* | Chance auf höhergradige Bäume beim Pflanzen von Samen erhöht sich. | 300 | 3:20 | Naturglück VI | `UNLOCK_ORCHARD_TREE_CHANCE` |
| `UPGRADE_MANAGE_MONSTER_ADD_EXP_10` | Wachstums-Boost X *(Growth Boost X)* | EXP beim Töten von Monstern +5%. | 300 | 3:20 | Wachstums-Boost IX | `UNLOCK_MONSTER_ADD_EXP` |
| `UPGRADE_MANAGE_MONSTER_WEAPON_CHANCE_10` | Waffenglück X *(Weapon Luck X)* | Erhöht die Waffendroprate beim Besiegen von Monstern. | 300 | 3:20 | Waffenglück IX | `UNLOCK_MONSTER_WEAPON_CHANCE` |
| `UPGRADE_MANAGE_MONSTER_ADD_GOLD_10` | Goldrausch X *(Gold Rush X)* | Gold beim Töten von Monstern +5%. | 300 | 3:20 | Goldrausch IX | `UNLOCK_MONSTER_ADD_GOLD` |
| `UPGRADE_MANAGE_MONSTER_BREAD_CHANCE_10` | Feldversorgung X *(Field Supply X)* | Erhöht die Brot-Droprate beim Besiegen von Monstern. | 300 | 3:20 | Feldversorgung IX | `UNLOCK_MONSTER_BREAD_CHANCE` |

### Labor-Stufe 7

| ID | Name | Beschreibung | Kosten | Zeit | Voraussetzung | Schaltet frei |
| --- | --- | --- | --- | --- | --- | --- |
| `UPGRADE_MANAGE_REDUCE_RESEARCH_TIME_1` | Célines Hilfe I *(Celine's Help I)* | Fertigkeits-Forschungszeit -5%. | 500 | 5:00 | Willkommen in Hero Town | `UNLOCK_REDUCE_RESEARCH_TIME` |
| `UPGRADE_MANAGE_GODDESS_ROOM_11` | Heldenunterkunft XI *(Hero's Rest XI)* | Erhöht die Kapazität des Göttinnenzimmers in der Town Hall. | 500 | 10:00 | Célines Hilfe I | `UNLOCK_GODDESS_ROOM` |
| `UPGRADE_MANAGE_REDUCE_RESEARCH_TIME_2` | Célines Hilfe II *(Celine's Help II)* | Fertigkeits-Forschungszeit -5%. | 500 | 5:00 | Célines Hilfe I | `UNLOCK_REDUCE_RESEARCH_TIME` |
| `UPGRADE_MANAGE_HONOR_GEN_6` | Korps-Promotion VI *(Corps Promotion VI)* | Erhalte alle 10 Minuten 1 zusätzliche Ehre. | 250 | 10:00 | Célines Hilfe I | `UNLOCK_HONOR_GEN` |
| `UPGRADE_MANAGE_GODDESS_ROOM_12` | Heldenunterkunft XII *(Hero's Rest XII)* | Erhöht die Kapazität des Göttinnenzimmers in der Town Hall. | 500 | 10:00 | Heldenunterkunft XI | `UNLOCK_GODDESS_ROOM` |
| `UPGRADE_MANAGE_REDUCE_RESEARCH_TIME_3` | Célines Hilfe III *(Celine's Help III)* | Fertigkeits-Forschungszeit -5%. | 500 | 5:00 | Célines Hilfe II | `UNLOCK_REDUCE_RESEARCH_TIME` |
| `UPGRADE_MANAGE_HONOR_GEN_7` | Korps-Promotion VII *(Corps Promotion VII)* | Erhalte alle 10 Minuten 1 zusätzliche Ehre. | 250 | 10:00 | Korps-Promotion VI | `UNLOCK_HONOR_GEN` |
| `UPGRADE_MANAGE_GODDESS_ROOM_13` | Heldenunterkunft XIII *(Hero's Rest XIII)* | Erhöht die Kapazität des Göttinnenzimmers in der Town Hall. | 500 | 20:00 | Heldenunterkunft XII | `UNLOCK_GODDESS_ROOM` |
| `UPGRADE_MANAGE_REDUCE_RESEARCH_TIME_4` | Célines Hilfe IV *(Celine's Help IV)* | Fertigkeits-Forschungszeit -5%. | 500 | 5:00 | Célines Hilfe III | `UNLOCK_REDUCE_RESEARCH_TIME` |
| `UPGRADE_MANAGE_HONOR_GEN_8` | Korps-Promotion VIII *(Corps Promotion VIII)* | Erhalte alle 10 Minuten 1 zusätzliche Ehre. | 250 | 20:00 | Korps-Promotion VII | `UNLOCK_HONOR_GEN` |
| `UPGRADE_MANAGE_GODDESS_ROOM_14` | Heldenunterkunft XIV *(Hero's Rest XIV)* | Erhöht die Kapazität des Göttinnenzimmers in der Town Hall. | 500 | 20:00 | Heldenunterkunft XIII | `UNLOCK_GODDESS_ROOM` |
| `UPGRADE_MANAGE_REDUCE_RESEARCH_TIME_5` | Célines Hilfe V *(Celine's Help V)* | Fertigkeits-Forschungszeit -5%. | 500 | 5:00 | Célines Hilfe IV | `UNLOCK_REDUCE_RESEARCH_TIME` |
| `UPGRADE_MANAGE_HONOR_GEN_9` | Korps-Promotion IX *(Corps Promotion IX)* | Erhalte alle 10 Minuten 1 zusätzliche Ehre. | 250 | 20:00 | Korps-Promotion VIII | `UNLOCK_HONOR_GEN` |
| `UPGRADE_MANAGE_GODDESS_ROOM_15` | Heldenunterkunft XV *(Hero's Rest XV)* | Erhöht die Kapazität des Göttinnenzimmers in der Town Hall. | 500 | 20:00 | Heldenunterkunft XIV | `UNLOCK_GODDESS_ROOM` |
| `UPGRADE_MANAGE_REDUCE_RESEARCH_TIME_6` | Célines Hilfe VI *(Celine's Help VI)* | Fertigkeits-Forschungszeit -5%. | 500 | 5:00 | Célines Hilfe V | `UNLOCK_REDUCE_RESEARCH_TIME` |
| `UPGRADE_MANAGE_HONOR_GEN_10` | Korps-Promotion X *(Corps Promotion X)* | Erhalte alle 10 Minuten 1 zusätzliche Ehre. | 250 | 20:00 | Korps-Promotion IX | `UNLOCK_HONOR_GEN` |

### Labor-Stufe 8

| ID | Name | Beschreibung | Kosten | Zeit | Voraussetzung | Schaltet frei |
| --- | --- | --- | --- | --- | --- | --- |
| `UPGRADE_MANAGE_GODDESS_ROOM_16` | Heldenunterkunft XVI *(Hero's Rest XVI)* | Erhöht die Kapazität des Göttinnenzimmers in der Town Hall. | 1.000 | 25:00 | Heldenunterkunft XV | `UNLOCK_GODDESS_ROOM` |
| `UPGRADE_MANAGE_MONSTER_ADD_GOLD_11` | Goldrausch XI *(Gold Rush XI)* | Gold bei Monstertötung +5%. | 1.000 | 25:00 | Heldenunterkunft XV | `UNLOCK_MONSTER_ADD_GOLD` |
| `UPGRADE_MANAGE_REDUCE_RESEARCH_TIME_7` | Célines Hilfe VII *(Celine's Help VII)* | Fertigkeits-Forschungszeit -5%. | 500 | 5:00 | Célines Hilfe VI | `UNLOCK_REDUCE_RESEARCH_TIME` |
| `UPGRADE_MANAGE_MONSTER_WEAPON_CHANCE_11` | Waffenglück XI *(Weapon Luck XI)* | Erhöht die Waffen-Droprate beim Besiegen von Monstern. | 1.000 | 25:00 | Korps-Promotion X | `UNLOCK_MONSTER_WEAPON_CHANCE` |
| `UPGRADE_MANAGE_MONSTER_BREAD_CHANCE_11` | Feldversorgung XI *(Field Supply XI)* | Erhöht die Brot-Droprate beim Besiegen von Monstern. | 1.000 | 25:00 | Korps-Promotion X | `UNLOCK_MONSTER_BREAD_CHANCE` |
| `UPGRADE_MANAGE_GODDESS_ROOM_17` | Heldenunterkunft XVII *(Hero's Rest XVII)* | Erhöht die Kapazität des Göttinnenzimmers in der Town Hall. | 1.000 | 25:00 | Heldenunterkunft XVI | `UNLOCK_GODDESS_ROOM` |
| `UPGRADE_MANAGE_MONSTER_ADD_GOLD_12` | Goldrausch XII *(Gold Rush XII)* | Gold bei Monstertötung +5%. | 1.000 | 25:00 | Goldrausch XI | `UNLOCK_MONSTER_ADD_GOLD` |
| `UPGRADE_MANAGE_REDUCE_RESEARCH_TIME_8` | Célines Hilfe VIII *(Celine's Help VIII)* | Fertigkeits-Forschungszeit -5%. | 500 | 5:00 | Célines Hilfe VII | `UNLOCK_REDUCE_RESEARCH_TIME` |
| `UPGRADE_MANAGE_MONSTER_WEAPON_CHANCE_12` | Waffenglück XII *(Weapon Luck XII)* | Erhöht die Waffen-Droprate beim Besiegen von Monstern. | 1.000 | 25:00 | Waffenglück XI | `UNLOCK_MONSTER_WEAPON_CHANCE` |
| `UPGRADE_MANAGE_MONSTER_BREAD_CHANCE_12` | Feldversorgung XII *(Field Supply XII)* | Erhöht die Brot-Droprate beim Besiegen von Monstern. | 1.000 | 25:00 | Feldversorgung XI | `UNLOCK_MONSTER_BREAD_CHANCE` |
| `UPGRADE_MANAGE_GODDESS_ROOM_18` | Heldenunterkunft XVIII *(Hero's Rest XVIII)* | Erhöht die Kapazität des Göttinnenzimmers in der Town Hall. | 1.000 | 25:00 | Heldenunterkunft XVII | `UNLOCK_GODDESS_ROOM` |
| `UPGRADE_MANAGE_MONSTER_ADD_GOLD_13` | Goldrausch XIII *(Gold Rush XIII)* | Gold bei Monstertötung +5%. | 1.000 | 25:00 | Goldrausch XII | `UNLOCK_MONSTER_ADD_GOLD` |
| `UPGRADE_MANAGE_REDUCE_RESEARCH_TIME_9` | Célines Hilfe IX *(Celine's Help IX)* | Fertigkeits-Forschungszeit -5%. | 500 | 5:00 | Célines Hilfe VIII | `UNLOCK_REDUCE_RESEARCH_TIME` |
| `UPGRADE_MANAGE_MONSTER_WEAPON_CHANCE_13` | Waffenglück XIII *(Weapon Luck XIII)* | Erhöht die Waffen-Droprate beim Besiegen von Monstern. | 1.000 | 25:00 | Waffenglück XII | `UNLOCK_MONSTER_WEAPON_CHANCE` |
| `UPGRADE_MANAGE_MONSTER_BREAD_CHANCE_13` | Feldversorgung XIII *(Field Supply XIII)* | Erhöht die Brot-Droprate beim Besiegen von Monstern. | 1.000 | 25:00 | Feldversorgung XII | `UNLOCK_MONSTER_BREAD_CHANCE` |
| `UPGRADE_MANAGE_GODDESS_ROOM_19` | Heldenunterkunft XIX *(Hero's Rest XIX)* | Erhöht die Kapazität des Göttinnenzimmers in der Town Hall. | 1.000 | 25:00 | Heldenunterkunft XVIII | `UNLOCK_GODDESS_ROOM` |
| `UPGRADE_MANAGE_MONSTER_ADD_GOLD_14` | Goldrausch XIV *(Gold Rush XIV)* | Gold bei Monstertötung +5%. | 1.000 | 25:00 | Goldrausch XIII | `UNLOCK_MONSTER_ADD_GOLD` |
| `UPGRADE_MANAGE_REDUCE_RESEARCH_TIME_10` | Célines Hilfe X *(Celine's Help X)* | Fertigkeits-Forschungszeit -5%. | 500 | 5:00 | Célines Hilfe IX | `UNLOCK_REDUCE_RESEARCH_TIME` |
| `UPGRADE_MANAGE_MONSTER_WEAPON_CHANCE_14` | Waffenglück XIV *(Weapon Luck XIV)* | Erhöht die Waffen-Droprate beim Besiegen von Monstern. | 1.000 | 25:00 | Waffenglück XIII | `UNLOCK_MONSTER_WEAPON_CHANCE` |
| `UPGRADE_MANAGE_MONSTER_BREAD_CHANCE_14` | Feldversorgung XIV *(Field Supply XIV)* | Erhöht die Brot-Droprate beim Besiegen von Monstern. | 1.000 | 25:00 | Feldversorgung XIII | `UNLOCK_MONSTER_BREAD_CHANCE` |
| `UPGRADE_MANAGE_GODDESS_ROOM_20` | Heldenunterkunft XX *(Hero's Rest XX)* | Erhöht die Kapazität des Göttinnenzimmers in der Town Hall. | 1.000 | 25:00 | Heldenunterkunft XIX | `UNLOCK_GODDESS_ROOM` |
| `UPGRADE_MANAGE_MONSTER_ADD_GOLD_15` | Goldrausch XV *(Gold Rush XV)* | Gold bei Monstertötung +5%. | 1.000 | 25:00 | Goldrausch XIV | `UNLOCK_MONSTER_ADD_GOLD` |
| `UPGRADE_MANAGE_MONSTER_WEAPON_CHANCE_15` | Waffenglück XV *(Weapon Luck XV)* | Erhöht die Waffen-Droprate beim Besiegen von Monstern. | 1.000 | 25:00 | Waffenglück XIV | `UNLOCK_MONSTER_WEAPON_CHANCE` |
| `UPGRADE_MANAGE_MONSTER_BREAD_CHANCE_15` | Feldversorgung XV *(Field Supply XV)* | Erhöht die Brot-Droprate beim Besiegen von Monstern. | 1.000 | 25:00 | Feldversorgung XIV | `UNLOCK_MONSTER_BREAD_CHANCE` |

## Helden-Upgrades (HERO)

### Labor-Stufe 1

| ID | Name | Beschreibung | Kosten | Zeit | Voraussetzung | Schaltet frei |
| --- | --- | --- | --- | --- | --- | --- |
| `UPGRADE_HERO_REDUCE_BLOCK_CYCLE_1` | Block-Boost I *(Block Boost I)* | Block-Spawn-Zyklus -0,1 Sek. | 20 | 0:10 | – | `UNLOCK_REDUCE_BLOCK_CYCLE` |
| `UPGRADE_HERO_GRADE_1` | Grundtaktiken I *(Basic Tactics I)* | Helden können auf 2-Sterne befördert werden. | 1 | 0:10 | – | `UNLOCK_HERO_GRADE` |
| `UPGRADE_HERO_ATTACKSPEED_F_1` | Schnelligkeitstraining I *(Speed Training I)* | Die Helden greifen schneller an. | 20 | 0:10 | – | – |

### Labor-Stufe 2

| ID | Name | Beschreibung | Kosten | Zeit | Voraussetzung | Schaltet frei |
| --- | --- | --- | --- | --- | --- | --- |
| `UPGRADE_HERO_PENETRATEDEF_F_1` | Durchbruchstraining I *(Breakthrough Training I)* | Physische und magische Durchdringung der Helden +2 | 5 | 0:15 | Grundtaktiken I | – |
| `UPGRADE_HERO_ATK_F_1` | Angriffstraining VIII *(ATK Training VIII)* | ANG der Helden +5 | 5 | 0:15 | Grundtaktiken I | – |
| `UPGRADE_HERO_HP_F_1` | Überlebenstraining VIII *(Survival Training VIII)* | LP der Helden +30 | 5 | 0:15 | Grundtaktiken I | – |
| `UPGRADE_HERO_DEF_F_1` | Verteidigungstraining I *(DEF Training I)* | VTD und WDS der Helden +2 | 5 | 0:15 | Grundtaktiken I | – |
| `UPGRADE_HERO_PENETRATEDEF_F_2` | Durchbruchstraining II *(Breakthrough Training II)* | Physische und magische Durchdringung der Helden +2 | 8 | 0:30 | Durchbruchstraining I | – |
| `UPGRADE_HERO_ATK_F_2` | Angriffstraining IX *(ATK Training IX)* | ANG der Helden +5 | 8 | 0:30 | Angriffstraining VIII | – |
| `UPGRADE_HERO_HP_F_2` | Überlebenstraining IX *(Survival Training IX)* | LP der Helden +30 | 8 | 0:30 | Überlebenstraining VIII | – |
| `UPGRADE_HERO_DEF_F_2` | Verteidigungstraining II *(DEF Training II)* | VTD und WDS der Helden +2 | 8 | 0:30 | Verteidigungstraining I | – |
| `UPGRADE_HERO_GRADE_2` | Grundtaktiken II *(Basic Tactics II)* | Helden können auf 3-Sterne befördert werden. | 10 | 0:30 | Grundtaktiken I | `UNLOCK_HERO_GRADE` |
| `UPGRADE_HERO_ATK_F_PENETRATEDEF_F_1` | Offensivtraining I *(Offensive Training I)* | ANG der Helden +4, Physische und magische Durchdringung +2 | 10 | 0:30 | Grundtaktiken II | – |
| `UPGRADE_HERO_DEF_F_HP_F_1` | Überlebensspezialisierung III *(Survival Specialization III)* | LP der Helden +30, VTD und WDS +2 | 10 | 0:30 | Grundtaktiken II | – |
| `UPGRADE_HERO_CRITP_F_1` | KRIT-Training I *(CRIT Training I)* | KRIT-Rate der Helden +1% | 10 | 0:30 | Grundtaktiken II | – |
| `UPGRADE_HERO_CRITD_F_1` | Präzisionstraining I *(Precision Training I)* | KRIT-SCH der Helden +5% | 10 | 0:30 | Grundtaktiken II | – |

### Labor-Stufe 3

| ID | Name | Beschreibung | Kosten | Zeit | Voraussetzung | Schaltet frei |
| --- | --- | --- | --- | --- | --- | --- |
| `UPGRADE_HERO_REDUCE_BLOCK_CYCLE_2` | Block-Boost II *(Block Boost II)* | Block-Spawn-Zyklus -0,1 Sek. | 40 | 0:30 | Block-Boost I | `UNLOCK_REDUCE_BLOCK_CYCLE` |
| `UPGRADE_HERO_ATTACKSPEED_F_2` | Schnelligkeitstraining II *(Speed Training II)* | Die Helden greifen schneller an. | 40 | 0:30 | Schnelligkeitstraining I | – |
| `UPGRADE_HERO_ATK_F_PENETRATEDEF_F_2` | Offensivtraining II *(Offensive Training II)* | ANG der Helden +4, Physische und magische Durchdringung +2 | 12 | 0:45 | Offensivtraining I | – |
| `UPGRADE_HERO_DEF_F_HP_F_2` | Überlebensspezialisierung IV *(Survival Specialization IV)* | LP der Helden +30, VTD und WDS +2 | 12 | 0:45 | Überlebensspezialisierung III | – |
| `UPGRADE_HERO_CRITP_F_2` | KRIT-Training II *(CRIT Training II)* | KRIT-Rate der Helden +1% | 12 | 0:45 | KRIT-Training I | – |
| `UPGRADE_HERO_CRITD_F_2` | Präzisionstraining II *(Precision Training II)* | KRIT-SCH der Helden +5% | 12 | 0:45 | Präzisionstraining I | – |
| `UPGRADE_HERO_GRADE_3` | Grundtaktiken III *(Basic Tactics III)* | Helden können auf 4-Sterne befördert werden. | 30 | 1:00 | Grundtaktiken II | `UNLOCK_HERO_GRADE` |
| `UPGRADE_HERO_PENETRATEDEF_F_3` | Durchbruchstraining III *(Breakthrough Training III)* | Physische und magische Durchdringung der Helden +4 | 20 | 0:45 | Grundtaktiken III | – |
| `UPGRADE_HERO_ATK_F_3` | Angriffstraining X *(ATK Training X)* | ANG der Helden +8 | 20 | 0:45 | Grundtaktiken III | – |
| `UPGRADE_HERO_HP_F_3` | Überlebenstraining X *(Survival Training X)* | LP der Helden +55 | 20 | 0:45 | Grundtaktiken III | – |
| `UPGRADE_HERO_DEF_F_3` | Verteidigungstraining III *(DEF Training III)* | VTD und WDS der Helden +4 | 20 | 0:45 | Grundtaktiken III | – |

### Labor-Stufe 4

| ID | Name | Beschreibung | Kosten | Zeit | Voraussetzung | Schaltet frei |
| --- | --- | --- | --- | --- | --- | --- |
| `UPGRADE_HERO_REDUCE_BLOCK_CYCLE_3` | Block-Boost III *(Block Boost III)* | Block-Spawn-Zyklus -0,1 Sek. | 60 | 1:30 | Block-Boost II | `UNLOCK_REDUCE_BLOCK_CYCLE` |
| `UPGRADE_HERO_ATTACKSPEED_F_3` | Schnelligkeitstraining III *(Speed Training III)* | Die Helden greifen schneller an. | 60 | 1:30 | Schnelligkeitstraining II | – |
| `UPGRADE_HERO_PENETRATEDEF_F_4` | Durchbruchstraining IV *(Breakthrough Training IV)* | Physische und magische Durchdringung der Helden +4 | 25 | 1:15 | Durchbruchstraining III | – |
| `UPGRADE_HERO_ATK_F_PENETRATEDEF_F_3` | Offensivtraining III *(Offensive Training III)* | ANG der Helden +8, Physische und magische Durchdringung +4 | 45 | 2:00 | Durchbruchstraining III, Angriffstraining X | – |
| `UPGRADE_HERO_DEF_F_HP_F_3` | Überlebensspezialisierung V *(Survival Specialization V)* | LP der Helden +55, VTD und WDS +4 | 45 | 2:00 | Überlebenstraining X, Verteidigungstraining III | – |
| `UPGRADE_HERO_DEF_F_4` | Verteidigungstraining IV *(DEF Training IV)* | VTD und WDS der Helden +4 | 25 | 1:15 | Verteidigungstraining III | – |
| `UPGRADE_HERO_PENETRATEDEF_F_5` | Durchbruchstraining V *(Breakthrough Training V)* | Physische und magische Durchdringung der Helden +4 | 75 | 0:10 | Durchbruchstraining IV | – |
| `UPGRADE_HERO_ATK_F_PENETRATEDEF_F_4` | Offensivtraining IV *(Offensive Training IV)* | ANG der Helden +8, Physische und magische Durchdringung +4 | 70 | 2:00 | Offensivtraining III | – |
| `UPGRADE_HERO_DEF_F_HP_F_4` | Überlebensspezialisierung VI *(Survival Specialization VI)* | LP der Helden +55, VTD und WDS +4 | 70 | 2:00 | Überlebensspezialisierung V | – |
| `UPGRADE_HERO_DEF_F_5` | Verteidigungstraining V *(DEF Training V)* | VTD und WDS der Helden +4 | 75 | 0:10 | Verteidigungstraining IV | – |
| `UPGRADE_HERO_GRADE_4` | Grundtaktiken IV *(Basic Tactics IV)* | Helden können auf 5-Sterne befördert werden. | 80 | 1:30 | Grundtaktiken III | `UNLOCK_HERO_GRADE` |
| `UPGRADE_HERO_ATK_F_4` | Angriffstraining XI *(ATK Training XI)* | ANG der Helden +10 | 50 | 1:30 | Grundtaktiken IV | – |
| `UPGRADE_HERO_HP_F_4` | Überlebenstraining XI *(Survival Training XI)* | LP der Helden +70 | 50 | 1:30 | Grundtaktiken IV | – |
| `UPGRADE_HERO_CRITP_F_3` | KRIT-Training III *(CRIT Training III)* | KRIT-Rate der Helden +1% | 50 | 1:30 | Grundtaktiken IV | – |
| `UPGRADE_HERO_CRITD_F_3` | Präzisionstraining III *(Precision Training III)* | KRIT-SCH der Helden +5% | 50 | 1:30 | Grundtaktiken IV | – |

### Labor-Stufe 5

| ID | Name | Beschreibung | Kosten | Zeit | Voraussetzung | Schaltet frei |
| --- | --- | --- | --- | --- | --- | --- |
| `UPGRADE_HERO_REDUCE_BLOCK_CYCLE_4` | Block-Boost IV *(Block Boost IV)* | Block-Spawn-Zyklus -0,1 Sek. | 80 | 3:00 | Block-Boost III | `UNLOCK_REDUCE_BLOCK_CYCLE` |
| `UPGRADE_HERO_ATTACKSPEED_F_4` | Schnelligkeitstraining IV *(Speed Training IV)* | Die Helden greifen schneller an. | 80 | 3:00 | Schnelligkeitstraining III | – |
| `UPGRADE_HERO_ATK_F_5` | Angriffstraining XII *(ATK Training XII)* | ANG der Helden +10 | 60 | 1:30 | Angriffstraining XI | – |
| `UPGRADE_HERO_HP_F_5` | Überlebenstraining XII *(Survival Training XII)* | LP der Helden +70 | 60 | 1:30 | Überlebenstraining XI | – |
| `UPGRADE_HERO_CRITP_F_4` | KRIT-Training IV *(CRIT Training IV)* | KRIT-Rate der Helden +1% | 60 | 1:30 | KRIT-Training III | – |
| `UPGRADE_HERO_CRITD_F_4` | Präzisionstraining IV *(Precision Training IV)* | KRIT-SCH der Helden +5% | 60 | 1:30 | Präzisionstraining III | – |
| `UPGRADE_HERO_ATK_F_PENETRATEDEF_F_5` | Offensivtraining V *(Offensive Training V)* | ANG der Helden +10, Physische und magische Durchdringung +5 | 70 | 1:30 | Angriffstraining XII | – |
| `UPGRADE_HERO_DEF_F_HP_F_5` | Überlebensspezialisierung VII *(Survival Specialization VII)* | LP der Helden +70, VTD und WDS +5 | 70 | 1:30 | Überlebenstraining XII | – |
| `UPGRADE_HERO_CRITP_F_5` | KRIT-Training V *(CRIT Training V)* | KRIT-Rate der Helden +1% | 70 | 1:30 | KRIT-Training IV | – |
| `UPGRADE_HERO_CRITD_F_5` | Präzisionstraining V *(Precision Training V)* | KRIT-SCH der Helden +5% | 70 | 1:30 | Präzisionstraining IV | – |
| `UPGRADE_HERO_REDUCE_BLOCK_CYCLE_5` | Block-Boost V *(Block Boost V)* | Block-Spawn-Zyklus -0,1 Sek. | 100 | 5:00 | Block-Boost IV | `UNLOCK_REDUCE_BLOCK_CYCLE` |
| `UPGRADE_HERO_GRADE_5` | Grundtaktiken V *(Basic Tactics V)* | Helden können auf 6-Sterne befördert werden. | 100 | 4:00 | Grundtaktiken IV | `UNLOCK_HERO_GRADE` |
| `UPGRADE_HERO_ATTACKSPEED_F_5` | Schnelligkeitstraining V *(Speed Training V)* | Die Helden greifen schneller an. | 100 | 5:00 | Schnelligkeitstraining IV | – |
| `UPGRADE_HERO_ACHIEVEMENTS_HERO_FINISH_1` | Perfektes Heldenkorps *(Perfect Hero Corps)* | Schaltet zusätzliche Skill-Knoten für das Heldenkorps frei. | 200 | 15:00 | – | `UNLOCK_ACHIEVEMENTS_HERO_FINISH` |

### Labor-Stufe 6

| ID | Name | Beschreibung | Kosten | Zeit | Voraussetzung | Schaltet frei |
| --- | --- | --- | --- | --- | --- | --- |
| `UPGRADE_HERO_PENETRATEDEF_F_6` | Durchbruchstraining VI *(Breakthrough Training VI)* | Physische und magische Durchdringung der Helden +5 | 100 | 5:00 | Perfektes Heldenkorps | – |
| `UPGRADE_HERO_ATK_F_6` | Angriffstraining XIII *(ATK Training XIII)* | ANG der Helden +10 | 100 | 5:00 | Perfektes Heldenkorps | – |
| `UPGRADE_HERO_CRITP_F_6` | KRIT-Training VI *(CRIT Training VI)* | KRIT-Rate der Helden +1% | 100 | 5:00 | Perfektes Heldenkorps | – |
| `UPGRADE_HERO_CRITD_F_6` | Präzisionstraining VI *(Precision Training VI)* | KRIT-SCH der Helden +5% | 100 | 5:00 | Perfektes Heldenkorps | – |
| `UPGRADE_HERO_HP_F_6` | Überlebenstraining XIII *(Survival Training XIII)* | LP der Helden +70 | 100 | 5:00 | Perfektes Heldenkorps | – |
| `UPGRADE_HERO_DEF_F_6` | Verteidigungstraining VI *(DEF Training VI)* | VTD und WDS der Helden +5 | 100 | 5:00 | Perfektes Heldenkorps | – |
| `UPGRADE_HERO_PENETRATEDEF_F_7` | Durchbruchstraining VII *(Breakthrough Training VII)* | Physische und magische Durchdringung der Helden +5 | 120 | 5:00 | Durchbruchstraining VI | – |
| `UPGRADE_HERO_ATK_F_7` | Angriffstraining XIV *(ATK Training XIV)* | ANG der Helden +10 | 120 | 5:00 | Angriffstraining XIII | – |
| `UPGRADE_HERO_CRITP_F_7` | KRIT-Training VII *(CRIT Training VII)* | KRIT-Rate der Helden +1% | 120 | 5:00 | KRIT-Training VI | – |
| `UPGRADE_HERO_CRITD_F_7` | Präzisionstraining VII *(Precision Training VII)* | KRIT-SCH der Helden +5% | 120 | 5:00 | Präzisionstraining VI | – |
| `UPGRADE_HERO_HP_F_7` | Überlebenstraining XIV *(Survival Training XIV)* | LP der Helden +70 | 120 | 5:00 | Überlebenstraining XIII | – |
| `UPGRADE_HERO_DEF_F_7` | Verteidigungstraining VII *(DEF Training VII)* | VTD und WDS der Helden +5 | 120 | 5:00 | Verteidigungstraining VI | – |
| `UPGRADE_HERO_PENETRATEDEF_F_8` | Durchbruchstraining VIII *(Breakthrough Training VIII)* | Physische und magische Durchdringung der Helden +5 | 140 | 5:00 | Durchbruchstraining VII | – |
| `UPGRADE_HERO_ATK_F_8` | Angriffstraining XV *(ATK Training XV)* | ANG der Helden +10 | 140 | 5:00 | Angriffstraining XIV | – |
| `UPGRADE_HERO_CRITP_F_8` | KRIT-Training VIII *(CRIT Training VIII)* | KRIT-Rate der Helden +1% | 140 | 5:00 | KRIT-Training VII | – |
| `UPGRADE_HERO_CRITD_F_8` | Präzisionstraining VIII *(Precision Training VIII)* | KRIT-SCH der Helden +5% | 140 | 5:00 | Präzisionstraining VII | – |
| `UPGRADE_HERO_HP_F_8` | Überlebenstraining XV *(Survival Training XV)* | LP der Helden +70 | 140 | 5:00 | Überlebenstraining XIV | – |
| `UPGRADE_HERO_DEF_F_8` | Verteidigungstraining VIII *(DEF Training VIII)* | VTD und WDS der Helden +5 | 140 | 5:00 | Verteidigungstraining VII | – |
| `UPGRADE_HERO_PENETRATEDEF_F_9` | Durchbruchstraining IX *(Breakthrough Training IX)* | Physische und magische Durchdringung der Helden +5 | 160 | 5:00 | Durchbruchstraining VIII | – |
| `UPGRADE_HERO_ATK_F_9` | Angriffstraining XVI *(ATK Training XVI)* | ANG der Helden +10 | 160 | 5:00 | Angriffstraining XV | – |
| `UPGRADE_HERO_CRITP_F_9` | KRIT-Training IX *(CRIT Training IX)* | KRIT-Rate der Helden +1% | 160 | 5:00 | KRIT-Training VIII | – |
| `UPGRADE_HERO_CRITD_F_9` | Präzisionstraining IX *(Precision Training IX)* | KRIT-SCH der Helden +5% | 160 | 5:00 | Präzisionstraining VIII | – |
| `UPGRADE_HERO_HP_F_9` | Überlebenstraining XVI *(Survival Training XVI)* | LP der Helden +70 | 160 | 5:00 | Überlebenstraining XV | – |
| `UPGRADE_HERO_DEF_F_9` | Verteidigungstraining IX *(DEF Training IX)* | VTD und WDS der Helden +5 | 160 | 5:00 | Verteidigungstraining VIII | – |
| `UPGRADE_HERO_PENETRATEDEF_F_10` | Durchbruchstraining X *(Breakthrough Training X)* | Physische und magische Durchdringung der Helden +5 | 180 | 5:00 | Durchbruchstraining IX | – |
| `UPGRADE_HERO_ATK_F_10` | Angriffstraining XVII *(ATK Training XVII)* | ANG der Helden +10 | 180 | 5:00 | Angriffstraining XVI | – |
| `UPGRADE_HERO_CRITP_F_10` | KRIT-Training X *(CRIT Training X)* | KRIT-Rate der Helden +1% | 180 | 5:00 | KRIT-Training IX | – |
| `UPGRADE_HERO_CRITD_F_10` | Präzisionstraining X *(Precision Training X)* | KRIT-SCH der Helden +5% | 180 | 5:00 | Präzisionstraining IX | – |
| `UPGRADE_HERO_HP_F_10` | Überlebenstraining XVII *(Survival Training XVII)* | LP der Helden +70 | 180 | 5:00 | Überlebenstraining XVI | – |
| `UPGRADE_HERO_DEF_F_10` | Verteidigungstraining X *(DEF Training X)* | VTD und WDS der Helden +5 | 180 | 5:00 | Verteidigungstraining IX | – |
| `UPGRADE_HERO_ATK_F_PENETRATEDEF_F_6` | Offensivtraining VI *(Offensive Training VI)* | ANG der Helden +12, Physische und magische Durchdringung +6 | 200 | 5:00 | Angriffstraining XVII, Durchbruchstraining X | – |
| `UPGRADE_HERO_ATK_F_HP_F_1` | Allgemeines Training IV *(General Training IV)* | ANG der Helden +12, LP +85 | 200 | 5:00 | Angriffstraining XVII, Überlebenstraining XVII | – |
| `UPGRADE_HERO_DEF_F_HP_F_6` | Überlebensspezialisierung VIII *(Survival Specialization VIII)* | LP der Helden +85, VTD und WDS +6 | 200 | 5:00 | Überlebenstraining XVII, Verteidigungstraining X | – |
| `UPGRADE_HERO_ATK_F_PENETRATEDEF_F_7` | Offensivtraining VII *(Offensive Training VII)* | ANG der Helden +12, Physische und magische Durchdringung +6 | 250 | 5:00 | Offensivtraining VI | – |
| `UPGRADE_HERO_ATK_F_HP_F_2` | Allgemeines Training V *(General Training V)* | ANG der Helden +12, LP +85 | 250 | 5:00 | Allgemeines Training IV | – |
| `UPGRADE_HERO_DEF_F_HP_F_7` | Überlebensspezialisierung IX *(Survival Specialization IX)* | LP der Helden +85, VTD und WDS +6 | 250 | 5:00 | Überlebensspezialisierung VIII | – |
| `UPGRADE_HERO_ATK_F_PENETRATEDEF_F_8` | Offensivtraining VIII *(Offensive Training VIII)* | ANG der Helden +12, Physische und magische Durchdringung +6 | 300 | 5:00 | Offensivtraining VII | – |
| `UPGRADE_HERO_ATK_F_HP_F_3` | Allgemeines Training VI *(General Training VI)* | ANG der Helden +12, LP +85 | 300 | 5:00 | Allgemeines Training V | – |
| `UPGRADE_HERO_DEF_F_HP_F_8` | Überlebensspezialisierung X *(Survival Specialization X)* | LP der Helden +85, VTD und WDS +6 | 300 | 5:00 | Überlebensspezialisierung IX | – |
| `UPGRADE_HERO_ATK_F_PENETRATEDEF_F_9` | Offensivtraining IX *(Offensive Training IX)* | ANG der Helden +12, Physische und magische Durchdringung +6 | 350 | 5:00 | Offensivtraining VIII | – |
| `UPGRADE_HERO_ATK_F_HP_F_4` | Allgemeines Training VII *(General Training VII)* | ANG der Helden +12, LP +85 | 350 | 5:00 | Allgemeines Training VI | – |
| `UPGRADE_HERO_DEF_F_HP_F_9` | Überlebensspezialisierung XI *(Survival Specialization XI)* | LP der Helden +85, VTD und WDS +6 | 350 | 5:00 | Überlebensspezialisierung X | – |
| `UPGRADE_HERO_ATK_F_PENETRATEDEF_F_10` | Offensivtraining XII *(Offensive Training XII)* | ANG der Helden +12, Physische und magische Durchdringung +6 | 400 | 5:00 | Offensivtraining IX | – |
| `UPGRADE_HERO_ATK_F_HP_F_5` | Allgemeines Training VIII *(General Training VIII)* | ANG der Helden +12, LP +85 | 400 | 5:00 | Allgemeines Training VII | – |
| `UPGRADE_HERO_DEF_F_HP_F_10` | Überlebensspezialisierung XII *(Survival Specialization XII)* | LP der Helden +85, VTD und WDS +6 | 400 | 5:00 | Überlebensspezialisierung XI | – |

### Labor-Stufe 7

| ID | Name | Beschreibung | Kosten | Zeit | Voraussetzung | Schaltet frei |
| --- | --- | --- | --- | --- | --- | --- |
| `UPGRADE_HERO_ATK_F_11` | Angriffstraining I *(ATK Training I)* | ANG der Helden +10 | 300 | 10:00 | – | – |
| `UPGRADE_HERO_HP_F_11` | Überlebenstraining I *(Survival Training I)* | LP der Helden +70 | 300 | 10:00 | – | – |
| `UPGRADE_HERO_ATK_F_12` | Angriffstraining II *(ATK Training II)* | ANG der Helden +10 | 300 | 10:00 | Angriffstraining I | – |
| `UPGRADE_HERO_HP_F_12` | Überlebenstraining II *(Survival Training II)* | LP der Helden +70 | 300 | 10:00 | Überlebenstraining I | – |
| `UPGRADE_HERO_ATK_F_13` | Angriffstraining III *(ATK Training III)* | ANG der Helden +10 | 300 | 10:00 | Angriffstraining II | – |
| `UPGRADE_HERO_HP_F_13` | Überlebenstraining III *(Survival Training III)* | LP der Helden +70 | 300 | 10:00 | Überlebenstraining II | – |
| `UPGRADE_HERO_ATK_F_14` | Angriffstraining IV *(ATK Training IV)* | ANG der Helden +10 | 300 | 10:00 | Angriffstraining III | – |
| `UPGRADE_HERO_HP_F_14` | Überlebenstraining IV *(Survival Training IV)* | LP der Helden +70 | 300 | 10:00 | Überlebenstraining III | – |
| `UPGRADE_HERO_ATK_F_15` | Angriffstraining V *(ATK Training V)* | ANG der Helden +10 | 400 | 15:00 | Angriffstraining IV | – |
| `UPGRADE_HERO_PENETRATEDEF_F_PENETRATERST_F_1` | Durchbruchstraining XI *(Breakthrough Training XI)* | Physische und magische Durchdringung der Helden +5 | 400 | 15:00 | Angriffstraining IV | – |
| `UPGRADE_HERO_DEF_F_RESIST_F_1` | Verteidigungstraining XI *(DEF Training XI)* | VTD und WDS der Helden +5 | 400 | 15:00 | Überlebenstraining IV | – |
| `UPGRADE_HERO_HP_F_15` | Überlebenstraining V *(Survival Training V)* | LP der Helden +70 | 400 | 15:00 | Überlebenstraining IV | – |
| `UPGRADE_HERO_ATK_F_16` | Angriffstraining VI *(ATK Training VI)* | ANG der Helden +10 | 400 | 15:00 | Angriffstraining V | – |
| `UPGRADE_HERO_PENETRATEDEF_F_PENETRATERST_F_2` | Durchbruchstraining XII *(Breakthrough Training XII)* | Physische und magische Durchdringung der Helden +5 | 400 | 15:00 | Durchbruchstraining XI | – |
| `UPGRADE_HERO_DEF_F_RESIST_F_2` | Verteidigungstraining XII *(DEF Training XII)* | VTD und WDS der Helden +5 | 400 | 15:00 | Verteidigungstraining XI | – |
| `UPGRADE_HERO_HP_F_16` | Überlebenstraining VI *(Survival Training VI)* | LP der Helden +70 | 400 | 15:00 | Überlebenstraining V | – |
| `UPGRADE_HERO_ATK_F_17` | Angriffstraining VII *(ATK Training VII)* | ANG der Helden +10 | 400 | 15:00 | Angriffstraining VI | – |
| `UPGRADE_HERO_PENETRATEDEF_F_PENETRATERST_F_3` | Durchbruchstraining XIII *(Breakthrough Training XIII)* | Physische und magische Durchdringung der Helden +5 | 400 | 15:00 | Durchbruchstraining XII | – |
| `UPGRADE_HERO_DEF_F_RESIST_F_3` | Verteidigungstraining XIII *(DEF Training XIII)* | VTD und WDS der Helden +5 | 400 | 15:00 | Verteidigungstraining XII | – |
| `UPGRADE_HERO_HP_F_17` | Überlebenstraining VII *(Survival Training VII)* | LP der Helden +70 | 400 | 15:00 | Überlebenstraining VI | – |
| `UPGRADE_HERO_ATK_F_18` | Angriffstraining XVIII *(ATK Training XVIII)* | ANG der Helden +10 | 400 | 15:00 | Angriffstraining VII | – |
| `UPGRADE_HERO_PENETRATEDEF_F_PENETRATERST_F_4` | Durchbruchstraining XIV *(Breakthrough Training XIV)* | Physische und magische Durchdringung der Helden +5 | 400 | 15:00 | Durchbruchstraining XIII | – |
| `UPGRADE_HERO_DEF_F_RESIST_F_4` | Verteidigungstraining XIV *(DEF Training XIV)* | VTD und WDS der Helden +5 | 400 | 15:00 | Verteidigungstraining XIII | – |
| `UPGRADE_HERO_HP_F_18` | Überlebenstraining XVIII *(Survival Training XVIII)* | LP der Helden +70 | 400 | 15:00 | Überlebenstraining VII | – |
| `UPGRADE_HERO_ADD_PASSIVE_1` | Potenzialentfesselung *(Potential Awakening)* | Bereitet das Erwecken des Potenzials von Helden jeder Klasse vor. | 1.000 | 25:00 | Angriffstraining XVIII, Durchbruchstraining XIV, Verteidigungstraining XIV, Überlebenstraining XVIII | `UNLOCK_ADD_PASSIVE` |

### Labor-Stufe 8

| ID | Name | Beschreibung | Kosten | Zeit | Voraussetzung | Schaltet frei |
| --- | --- | --- | --- | --- | --- | --- |
| `UPGRADE_HERO_ADD_PASSIVE_WA_1` | Seele der Bestrafung *(Soul of Punishment)* | Ein Krieger-Klassenheld gewährt der Gruppe alle 10 Sek. eine Erhöhung des kritischen Schadens um 15% für 8 Sek. (Bis zu 3 Stapel) | 2.000 | 50:00 | Potenzialentfesselung | `UNLOCK_ADD_PASSIVE_WA` |
| `UPGRADE_HERO_ADD_PASSIVE_PA_1` | Seele des Schutzes *(Soul of Protection)* | Ein Paladin-Klassenheld gewährt der Gruppe alle 10 Sek. eine Erhöhung von ATK, DEF und RES um 3% für 8 Sek. (Bis zu 3 Stapel) | 2.000 | 50:00 | Potenzialentfesselung | `UNLOCK_ADD_PASSIVE_PA` |
| `UPGRADE_HERO_ADD_PASSIVE_AR_1` | Seele des Schnellschusses *(Soul of Rapid Fire)* | Ein Bogenschütze-Klassenheld gewährt der Gruppe alle 10 Sek. eine Erhöhung von Angriffsgeschw. und Bewegungsgeschw. um 5% für 8 Sek. (Bis zu 3 Stapel) | 2.000 | 50:00 | Potenzialentfesselung | `UNLOCK_ADD_PASSIVE_AR` |
| `UPGRADE_HERO_ADD_PASSIVE_HU_1` | Seele des Todesstoßes *(Soul of the Killing Blow)* | Ein Jäger-Klassenheld gewährt der Gruppe alle 10 Sek. eine Erhöhung der CRIT-Rate um 5% für 8 Sek. (Bis zu 3 Stapel) | 2.000 | 50:00 | Potenzialentfesselung | `UNLOCK_ADD_PASSIVE_HU` |
| `UPGRADE_HERO_ADD_PASSIVE_WI_1` | Seele der Magiekraft *(Soul of Magic Power)* | Ein Zauberer-Klassenheld erzeugt alle 10 Sek. 1 Block für die Gruppe. | 2.000 | 50:00 | Potenzialentfesselung | `UNLOCK_ADD_PASSIVE_WI` |
| `UPGRADE_HERO_ADD_PASSIVE_PR_1` | Seele der Barmherzigkeit *(Soul of Benevolence)* | Ein Priester-Klassenheld heilt die Gruppe alle 10 Sek. um 30% ATK. | 2.000 | 50:00 | Potenzialentfesselung | `UNLOCK_ADD_PASSIVE_PR` |
| `UPGRADE_HERO_ATK_F_HP_F_6` | Allgemeines Training I *(General Training I)* | ANG der Helden +12, LP +85 | 500 | 25:00 | Potenzialentfesselung | – |
| `UPGRADE_HERO_PENETRATEDEF_F_PENETRATERST_F_5` | Durchbruchstraining XV *(Breakthrough Training XV)* | Physische und magische Durchdringung der Helden +6 | 500 | 25:00 | Allgemeines Training I | – |
| `UPGRADE_HERO_ATK_F_19` | Angriffstraining XIX *(ATK Training XIX)* | ANG der Helden +12 | 500 | 25:00 | Allgemeines Training I | – |
| `UPGRADE_HERO_HP_F_19` | Überlebenstraining XIX *(Survival Training XIX)* | LP der Helden +85 | 500 | 25:00 | Allgemeines Training I | – |
| `UPGRADE_HERO_DEF_F_RESIST_F_5` | Verteidigungstraining XV *(DEF Training XV)* | VTD und WDS der Helden +6 | 500 | 25:00 | Allgemeines Training I | – |
| `UPGRADE_HERO_PENETRATEDEF_F_PENETRATERST_F_6` | Durchbruchstraining XVI *(Breakthrough Training XVI)* | Physische und magische Durchdringung der Helden +6 | 500 | 25:00 | Durchbruchstraining XV | – |
| `UPGRADE_HERO_ATK_F_20` | Angriffstraining XX *(ATK Training XX)* | ANG der Helden +12 | 500 | 25:00 | Angriffstraining XIX | – |
| `UPGRADE_HERO_HP_F_20` | Überlebenstraining XX *(Survival Training XX)* | LP der Helden +85 | 500 | 25:00 | Überlebenstraining XIX | – |
| `UPGRADE_HERO_DEF_F_RESIST_F_6` | Verteidigungstraining XVI *(DEF Training XVI)* | VTD und WDS der Helden +6 | 500 | 25:00 | Verteidigungstraining XV | – |
| `UPGRADE_HERO_ATK_F_PENETRATEDEF_F_PENETRATERST_F_1` | Offensivtraining X *(Offensive Training X)* | ANG der Helden +12, Physische und magische Durchdringung +6 | 500 | 25:00 | Angriffstraining XX, Durchbruchstraining XVI | – |
| `UPGRADE_HERO_ATK_F_HP_F_7` | Allgemeines Training II *(General Training II)* | ANG der Helden +12, LP +85 | 500 | 25:00 | Angriffstraining XX, Überlebenstraining XX | – |
| `UPGRADE_HERO_DEF_F_HP_F_RESIST_F_1` | Überlebensspezialisierung I *(Survival Specialization I)* | LP der Helden +85, VTD und WDS +6 | 500 | 25:00 | Verteidigungstraining XVI, Überlebenstraining XX | – |
| `UPGRADE_HERO_ATK_F_PENETRATEDEF_F_PENETRATERST_F_2` | Offensivtraining XI *(Offensive Training XI)* | ANG der Helden +12, Physische und magische Durchdringung +6 | 500 | 25:00 | Offensivtraining X | – |
| `UPGRADE_HERO_ATK_F_HP_F_8` | Allgemeines Training III *(General Training III)* | ANG der Helden +12, LP +85 | 500 | 25:00 | Allgemeines Training II | – |
| `UPGRADE_HERO_DEF_F_HP_F_RESIST_F_2` | Überlebensspezialisierung II *(Survival Specialization II)* | LP der Helden +85, VTD und WDS +6 | 500 | 25:00 | Überlebensspezialisierung I | – |
| `UPGRADE_HERO_ATK_F_PENETRATEDEF_F_PENETRATERST_F_3` | Offensivtraining XIII *(Offensive Training XIII)* | ANG der Helden +12, Physische und magische Durchdringung +6 | 500 | 25:00 | Offensivtraining XI | – |
| `UPGRADE_HERO_ATK_F_HP_F_9` | Allgemeines Training IX *(General Training IX)* | ANG der Helden +12, LP +85 | 500 | 25:00 | Allgemeines Training III | – |
| `UPGRADE_HERO_DEF_F_HP_F_RESIST_F_3` | Überlebensspezialisierung XIII *(Survival Specialization XIII)* | LP der Helden +85, VTD und WDS +6 | 500 | 25:00 | Überlebensspezialisierung II | – |
| `UPGRADE_HERO_ATK_F_PENETRATEDEF_F_PENETRATERST_F_4` | Offensivtraining XIV *(Offensive Training XIV)* | ANG der Helden +12, Physische und magische Durchdringung +6 | 500 | 25:00 | Offensivtraining XIII | – |
| `UPGRADE_HERO_ATK_F_HP_F_10` | Allgemeines Training X *(General Training X)* | ANG der Helden +12, LP +85 | 500 | 25:00 | Allgemeines Training IX | – |
| `UPGRADE_HERO_DEF_F_HP_F_RESIST_F_4` | Überlebensspezialisierung XIV *(Survival Specialization XIV)* | LP der Helden +85, VTD und WDS +6 | 500 | 25:00 | Überlebensspezialisierung XIII | – |

## Erweiterte Stadtverwaltung (MANAGE2)

### Labor-Stufe 5

| ID | Name | Beschreibung | Kosten | Zeit | Voraussetzung | Schaltet frei |
| --- | --- | --- | --- | --- | --- | --- |
| `UPGRADE_MANAGE2_TRAINING_CENTER_1` | Debüt-Bühne *(Debut Stage)* | Hers, ein Mann mit einer Vogelscheuchen-Maske, wartet. | 1.000 | 5:00 | – | `UNLOCK_TRAINING_CENTER` |
| `UPGRADE_MANAGE2_SOULMONSTER_1` | Aura des Herrn der Seelen *(Aura of the Lord of Souls)* | Beschwöre von Soltar, dem Herrn der Seelen, verzehrte Monster, um Transzendenzwaffen-Materialien zu erhalten. | 1.000 | 5:00 | – | `UNLOCK_SOULMONSTER` |
| `UPGRADE_MANAGE2_PORTAL_ADD_1` | Zusätzliches Portal III *(Additional Portal III)* | Maximale Anzahl baubarer Portale wird erhöht. | 1.000 | 5:00 | – | `UNLOCK_PORTAL_ADD` |

### Labor-Stufe 6

| ID | Name | Beschreibung | Kosten | Zeit | Voraussetzung | Schaltet frei |
| --- | --- | --- | --- | --- | --- | --- |
| `UPGRADE_MANAGE2_HERO_TRAINING_SPEED_1` | Trainingsgeschwindigkeit des Heldentrainingszentrums erhöht I *(Hero Training Center Speed Increase I)* | Die Trainingsgeschwindigkeit auf der Debüt-Bühne erhöht sich. | 1.000 | 25:00 | Debüt-Bühne | `UNLOCK_HERO_TRAINING_SPEED` |
| `UPGRADE_MANAGE2_GODDESS_ROOM_1` | Heldenunterkunft XXI *(Hero's Rest XXI)* | Der Goddess Room im Town Hall wird vergrößert. | 1.000 | 25:00 | Debüt-Bühne | `UNLOCK_GODDESS_ROOM` |
| `UPGRADE_MANAGE2_MONSTER_WEAPON_CHANCE_1` | Waffenglück XVI *(Weapon Luck XVI)* | Erhöht die Waffen-Droprate beim Besiegen von Monstern. | 1.000 | 25:00 | Zusätzliches Portal III | `UNLOCK_MONSTER_WEAPON_CHANCE` |
| `UPGRADE_MANAGE2_MONSTER_BREAD_CHANCE_1` | Feldversorgung XVI *(Field Supply XVI)* | Erhöht die Brot-Droprate beim Besiegen von Monstern. | 1.000 | 25:00 | Zusätzliches Portal III | `UNLOCK_MONSTER_BREAD_CHANCE` |
| `UPGRADE_MANAGE2_HERO_TRAINING_SPEED_2` | Trainingsgeschwindigkeit des Heldentrainingszentrums erhöht II *(Hero Training Center Speed Increase II)* | Die Trainingsgeschwindigkeit auf der Debüt-Bühne erhöht sich. | 1.200 | 26:40 | Trainingsgeschwindigkeit des Heldentrainingszentrums erhöht I | `UNLOCK_HERO_TRAINING_SPEED` |
| `UPGRADE_MANAGE2_GODDESS_ROOM_2` | Heldenunterkunft XXII *(Hero's Rest XXII)* | Der Goddess Room im Town Hall wird vergrößert. | 1.200 | 26:40 | Heldenunterkunft XXI | `UNLOCK_GODDESS_ROOM` |
| `UPGRADE_MANAGE2_SOULBOUND_WEAPON_1` | Licht der Wiedererweckung *(Light of Revival)* | Ermöglicht das Herstellen von Transzendenzwaffen in der Schmiede. | 2.000 | 8:20 | Aura des Herrn der Seelen | `UNLOCK_SOULBOUND_WEAPON` |
| `UPGRADE_MANAGE2_MONSTER_WEAPON_CHANCE_2` | Waffenglück XVII *(Weapon Luck XVII)* | Erhöht die Waffen-Droprate beim Besiegen von Monstern. | 1.200 | 26:40 | Waffenglück XVI | `UNLOCK_MONSTER_WEAPON_CHANCE` |
| `UPGRADE_MANAGE2_MONSTER_BREAD_CHANCE_2` | Feldversorgung XVII *(Field Supply XVII)* | Erhöht die Brot-Droprate beim Besiegen von Monstern. | 1.200 | 26:40 | Feldversorgung XVI | `UNLOCK_MONSTER_BREAD_CHANCE` |

### Labor-Stufe 7

| ID | Name | Beschreibung | Kosten | Zeit | Voraussetzung | Schaltet frei |
| --- | --- | --- | --- | --- | --- | --- |
| `UPGRADE_MANAGE2_HERO_TRAINING_SPEED_3` | Trainingsgeschwindigkeit des Heldentrainingszentrums erhöht III *(Hero Training Center Speed Increase III)* | Die Trainingsgeschwindigkeit auf der Debüt-Bühne erhöht sich. | 1.200 | 28:20 | Trainingsgeschwindigkeit des Heldentrainingszentrums erhöht II | `UNLOCK_HERO_TRAINING_SPEED` |
| `UPGRADE_MANAGE2_GODDESS_ROOM_3` | Heldenunterkunft XXIII *(Hero's Rest XXIII)* | Der Goddess Room im Town Hall wird vergrößert. | 1.200 | 28:20 | Heldenunterkunft XXII | `UNLOCK_GODDESS_ROOM` |
| `UPGRADE_MANAGE2_MONSTER_WEAPON_CHANCE_3` | Waffenglück XVIII *(Weapon Luck XVIII)* | Erhöht die Waffen-Droprate beim Besiegen von Monstern. | 1.200 | 28:20 | Waffenglück XVII | `UNLOCK_MONSTER_WEAPON_CHANCE` |
| `UPGRADE_MANAGE2_MONSTER_BREAD_CHANCE_3` | Feldversorgung XVIII *(Field Supply XVIII)* | Erhöht die Brot-Droprate beim Besiegen von Monstern. | 1.200 | 28:20 | Feldversorgung XVII | `UNLOCK_MONSTER_BREAD_CHANCE` |

### Labor-Stufe 8

| ID | Name | Beschreibung | Kosten | Zeit | Voraussetzung | Schaltet frei |
| --- | --- | --- | --- | --- | --- | --- |
| `UPGRADE_MANAGE2_HERO_TRAINING_SLOT_1` | Slots des Heldentrainingszentrums erhöht I *(Hero Training Center Slot Increase I)* | Die Anzahl der Helden, die auf der Debüt-Bühne trainieren können, erhöht sich. | 5.000 | 15:00 | Trainingsgeschwindigkeit des Heldentrainingszentrums erhöht III, Heldenunterkunft XXIII | `UNLOCK_HERO_TRAINING_SLOT` |
| `UPGRADE_MANAGE2_SOUL_FORTRESS_1` | Erwachende Festung der Seelen *(Awakening Fortress of Souls)* | Errichte das Seelenheiligtum, in dem du Soltar, den Herrn der Seelen, herausfordern kannst. | 5.000 | 15:00 | Licht der Wiedererweckung | `UNLOCK_SOUL_FORTRESS` |
| `UPGRADE_MANAGE2_PORTAL_ADD_2` | Zusätzliches Portal IV *(Additional Portal IV)* | Maximale Anzahl baubarer Portale wird erhöht. | 5.000 | 15:00 | Zusätzliches Portal III | `UNLOCK_PORTAL_ADD` |

### Labor-Stufe 9

| ID | Name | Beschreibung | Kosten | Zeit | Voraussetzung | Schaltet frei |
| --- | --- | --- | --- | --- | --- | --- |
| `UPGRADE_MANAGE2_HERO_TRAINING_SPEED_4` | Trainingsgeschwindigkeit des Heldentrainingszentrums erhöht IV *(Hero Training Center Speed Increase IV)* | Die Trainingsgeschwindigkeit auf der Debüt-Bühne erhöht sich. | 1.500 | 30:00 | Trainingsgeschwindigkeit des Heldentrainingszentrums erhöht III | `UNLOCK_HERO_TRAINING_SPEED` |
| `UPGRADE_MANAGE2_GODDESS_ROOM_4` | Heldenunterkunft XXIV *(Hero's Rest XXIV)* | Der Goddess Room im Town Hall wird vergrößert. | 1.500 | 30:00 | Heldenunterkunft XXIII | `UNLOCK_GODDESS_ROOM` |
| `UPGRADE_MANAGE2_MONSTER_MATERIAL_CHANCE_1` | Sammelndes Licht I *(Gathering Light I)* | Beim Besiegen seelengebundener Monster steigt die Chance, dass Materialien für Transzendenzwaffen erscheinen. | 1.500 | 30:00 | Licht der Wiedererweckung | `UNLOCK_MONSTER_MATERIAL_CHANCE` |
| `UPGRADE_MANAGE2_MONSTER_WEAPON_CHANCE_4` | Waffenglück XIX *(Weapon Luck XIX)* | Erhöht die Waffen-Droprate beim Besiegen von Monstern. | 1.500 | 30:00 | Waffenglück XVIII | `UNLOCK_MONSTER_WEAPON_CHANCE` |
| `UPGRADE_MANAGE2_MONSTER_BREAD_CHANCE_4` | Feldversorgung XIX *(Field Supply XIX)* | Erhöht die Brot-Droprate beim Besiegen von Monstern. | 1.500 | 30:00 | Feldversorgung XVIII | `UNLOCK_MONSTER_BREAD_CHANCE` |
| `UPGRADE_MANAGE2_HERO_TRAINING_SPEED_5` | Trainingsgeschwindigkeit des Heldentrainingszentrums erhöht V *(Hero Training Center Speed Increase V)* | Die Trainingsgeschwindigkeit auf der Debüt-Bühne erhöht sich. | 1.500 | 31:40 | Trainingsgeschwindigkeit des Heldentrainingszentrums erhöht IV | `UNLOCK_HERO_TRAINING_SPEED` |
| `UPGRADE_MANAGE2_GODDESS_ROOM_5` | Heldenunterkunft XXV *(Hero's Rest XXV)* | Der Goddess Room im Town Hall wird vergrößert. | 1.500 | 31:40 | Heldenunterkunft XXIV | `UNLOCK_GODDESS_ROOM` |
| `UPGRADE_MANAGE2_MONSTER_MATERIAL_CHANCE_2` | Sammelndes Licht II *(Gathering Light II)* | Beim Besiegen seelengebundener Monster steigt die Chance, dass Materialien für Transzendenzwaffen erscheinen. | 1.500 | 31:40 | Sammelndes Licht I | `UNLOCK_MONSTER_MATERIAL_CHANCE` |
| `UPGRADE_MANAGE2_MONSTER_WEAPON_CHANCE_5` | Waffenglück XX *(Weapon Luck XX)* | Erhöht die Waffen-Droprate beim Besiegen von Monstern. | 1.500 | 31:40 | Waffenglück XIX | `UNLOCK_MONSTER_WEAPON_CHANCE` |
| `UPGRADE_MANAGE2_MONSTER_ADD_GOLD_1` | Goldrausch XVI *(Gold Rush XVI)* | Beim Besiegen von Monstern erhaltenes Gold wird um 5 % erhöht. | 1.500 | 31:40 | Zusätzliches Portal IV | `UNLOCK_MONSTER_ADD_GOLD` |
| `UPGRADE_MANAGE2_MONSTER_BREAD_CHANCE_5` | Feldversorgung XX *(Field Supply XX)* | Erhöht die Brot-Droprate beim Besiegen von Monstern. | 1.500 | 31:40 | Feldversorgung XIX | `UNLOCK_MONSTER_BREAD_CHANCE` |
| `UPGRADE_MANAGE2_HERO_TRAINING_SPEED_6` | Trainingsgeschwindigkeit des Heldentrainingszentrums erhöht VI *(Hero Training Center Speed Increase VI)* | Die Trainingsgeschwindigkeit auf der Debüt-Bühne erhöht sich. | 1.800 | 33:20 | Trainingsgeschwindigkeit des Heldentrainingszentrums erhöht V | `UNLOCK_HERO_TRAINING_SPEED` |
| `UPGRADE_MANAGE2_GODDESS_ROOM_6` | Heldenunterkunft XXVI *(Hero's Rest XXVI)* | Der Goddess Room im Town Hall wird vergrößert. | 1.800 | 33:20 | Heldenunterkunft XXV | `UNLOCK_GODDESS_ROOM` |
| `UPGRADE_MANAGE2_MONSTER_MATERIAL_CHANCE_3` | Sammelndes Licht III *(Gathering Light III)* | Beim Besiegen seelengebundener Monster steigt die Chance, dass Materialien für Transzendenzwaffen erscheinen. | 1.800 | 33:20 | Sammelndes Licht II | `UNLOCK_MONSTER_MATERIAL_CHANCE` |
| `UPGRADE_MANAGE2_MONSTER_WEAPON_CHANCE_6` | Waffenglück XXI *(Weapon Luck XXI)* | Erhöht die Waffen-Droprate beim Besiegen von Monstern. | 1.800 | 33:20 | Waffenglück XX | `UNLOCK_MONSTER_WEAPON_CHANCE` |
| `UPGRADE_MANAGE2_MONSTER_ADD_GOLD_2` | Goldrausch XVII *(Gold Rush XVII)* | Beim Besiegen von Monstern erhaltenes Gold wird um 5 % erhöht. | 1.800 | 33:20 | Goldrausch XVI | `UNLOCK_MONSTER_ADD_GOLD` |
| `UPGRADE_MANAGE2_MONSTER_BREAD_CHANCE_6` | Feldversorgung XXI *(Field Supply XXI)* | Erhöht die Brot-Droprate beim Besiegen von Monstern. | 1.800 | 33:20 | Feldversorgung XX | `UNLOCK_MONSTER_BREAD_CHANCE` |

### Labor-Stufe 10

| ID | Name | Beschreibung | Kosten | Zeit | Voraussetzung | Schaltet frei |
| --- | --- | --- | --- | --- | --- | --- |
| `UPGRADE_MANAGE2_HERO_TRAINING_SPEED_7` | Trainingsgeschwindigkeit des Heldentrainingszentrums erhöht VII *(Hero Training Center Speed Increase VII)* | Die Trainingsgeschwindigkeit auf der Debüt-Bühne erhöht sich. | 1.800 | 35:00 | Trainingsgeschwindigkeit des Heldentrainingszentrums erhöht VI | `UNLOCK_HERO_TRAINING_SPEED` |
| `UPGRADE_MANAGE2_GODDESS_ROOM_7` | Heldenunterkunft XXVII *(Hero's Rest XXVII)* | Der Goddess Room im Town Hall wird vergrößert. | 1.800 | 35:00 | Heldenunterkunft XXVI | `UNLOCK_GODDESS_ROOM` |
| `UPGRADE_MANAGE2_MONSTER_MATERIAL_CHANCE_4` | Sammelndes Licht IV *(Gathering Light IV)* | Beim Besiegen seelengebundener Monster steigt die Chance, dass Materialien für Transzendenzwaffen erscheinen. | 1.800 | 35:00 | Sammelndes Licht III | `UNLOCK_MONSTER_MATERIAL_CHANCE` |
| `UPGRADE_MANAGE2_MONSTER_WEAPON_CHANCE_7` | Waffenglück XXII *(Weapon Luck XXII)* | Erhöht die Waffen-Droprate beim Besiegen von Monstern. | 1.800 | 35:00 | Waffenglück XXI | `UNLOCK_MONSTER_WEAPON_CHANCE` |
| `UPGRADE_MANAGE2_MONSTER_ADD_GOLD_3` | Goldrausch XVIII *(Gold Rush XVIII)* | Beim Besiegen von Monstern erhaltenes Gold wird um 5 % erhöht. | 1.800 | 35:00 | Goldrausch XVII | `UNLOCK_MONSTER_ADD_GOLD` |
| `UPGRADE_MANAGE2_MONSTER_BREAD_CHANCE_7` | Feldversorgung XXII *(Field Supply XXII)* | Erhöht die Brot-Droprate beim Besiegen von Monstern. | 1.800 | 35:00 | Feldversorgung XXI | `UNLOCK_MONSTER_BREAD_CHANCE` |
| `UPGRADE_MANAGE2_HERO_TRAINING_SPEED_8` | Trainingsgeschwindigkeit des Heldentrainingszentrums erhöht VIII *(Hero Training Center Speed Increase VIII)* | Die Trainingsgeschwindigkeit in der Debüt-Phase wird erhöht. | 2.000 | 36:40 | Trainingsgeschwindigkeit des Heldentrainingszentrums erhöht VII | `UNLOCK_HERO_TRAINING_SPEED` |
| `UPGRADE_MANAGE2_GODDESS_ROOM_8` | Heldenunterkunft XXVIII *(Hero's Rest XXVIII)* | Der Goddess Room im Town Hall wird vergrößert. | 2.000 | 36:40 | Heldenunterkunft XXVII | `UNLOCK_GODDESS_ROOM` |
| `UPGRADE_MANAGE2_MONSTER_MATERIAL_CHANCE_5` | Sammelndes Licht V *(Gathering Light V)* | Beim Besiegen seelengebundener Monster steigt die Chance, dass Materialien für Transzendenzwaffen erscheinen. | 2.000 | 36:40 | Sammelndes Licht IV | `UNLOCK_MONSTER_MATERIAL_CHANCE` |
| `UPGRADE_MANAGE2_MONSTER_WEAPON_CHANCE_8` | Waffenglück XXIII *(Weapon Luck XXIII)* | Erhöht die Waffen-Droprate beim Besiegen von Monstern. | 2.000 | 36:40 | Waffenglück XXII | `UNLOCK_MONSTER_WEAPON_CHANCE` |
| `UPGRADE_MANAGE2_MONSTER_ADD_GOLD_4` | Goldrausch XIX *(Gold Rush XIX)* | Beim Besiegen von Monstern erhaltenes Gold wird um 5 % erhöht. | 2.000 | 36:40 | Goldrausch XVIII | `UNLOCK_MONSTER_ADD_GOLD` |
| `UPGRADE_MANAGE2_MONSTER_BREAD_CHANCE_8` | Feldversorgung XXIII *(Field Supply XXIII)* | Erhöht die Brot-Droprate beim Besiegen von Monstern. | 2.000 | 36:40 | Feldversorgung XXII | `UNLOCK_MONSTER_BREAD_CHANCE` |
| `UPGRADE_MANAGE2_HERO_TRAINING_SLOT_2` | Slots des Heldentrainingszentrums erhöht II *(Hero Training Center Slot Increase II)* | Erhöht die Anzahl der Helden, die in der Debüt-Phase trainieren können. | 6.000 | 16:40 | Trainingsgeschwindigkeit des Heldentrainingszentrums erhöht VIII, Heldenunterkunft XXVIII | `UNLOCK_HERO_TRAINING_SLOT` |
| `UPGRADE_MANAGE2_MONSTER_MATERIAL_CHANCE_6` | Sammelndes Licht VI *(Gathering Light VI)* | Beim Besiegen seelengebundener Monster steigt die Chance, dass Materialien für Transzendenzwaffen erscheinen. | 2.000 | 38:20 | Sammelndes Licht V | `UNLOCK_MONSTER_MATERIAL_CHANCE` |
| `UPGRADE_MANAGE2_MONSTER_WEAPON_CHANCE_9` | Waffenglück XXIV *(Weapon Luck XXIV)* | Erhöht die Waffen-Droprate beim Besiegen von Monstern. | 2.000 | 38:20 | Waffenglück XXIII | `UNLOCK_MONSTER_WEAPON_CHANCE` |
| `UPGRADE_MANAGE2_MONSTER_ADD_GOLD_5` | Goldrausch XX *(Gold Rush XX)* | Beim Besiegen von Monstern erhaltenes Gold wird um 5 % erhöht. | 2.000 | 38:20 | Goldrausch XIX | `UNLOCK_MONSTER_ADD_GOLD` |
| `UPGRADE_MANAGE2_MONSTER_BREAD_CHANCE_9` | Feldversorgung XXIV *(Field Supply XXIV)* | Erhöht die Brot-Droprate beim Besiegen von Monstern. | 2.000 | 38:20 | Feldversorgung XXIII | `UNLOCK_MONSTER_BREAD_CHANCE` |
| `UPGRADE_MANAGE2_HERO_TRAINING_SLOT_3` | Slots des Heldentrainingszentrums erhöht III *(Hero Training Center Slot Increase III)* | Erhöht die Anzahl der Helden, die in der Debüt-Phase trainieren können. | 7.000 | 20:00 | Slots des Heldentrainingszentrums erhöht II | `UNLOCK_HERO_TRAINING_SLOT` |
| `UPGRADE_MANAGE2_MONSTER_MATERIAL_CHANCE_7` | Sammelndes Licht VII *(Gathering Light VII)* | Beim Besiegen seelengebundener Monster steigt die Chance, dass Materialien für Transzendenzwaffen erscheinen. | 2.000 | 38:20 | Sammelndes Licht VI | `UNLOCK_MONSTER_MATERIAL_CHANCE` |
| `UPGRADE_MANAGE2_MONSTER_WEAPON_CHANCE_10` | Waffenglück XXV *(Weapon Luck XXV)* | Erhöht die Waffen-Droprate beim Besiegen von Monstern. | 2.000 | 40:00 | Waffenglück XXIV | `UNLOCK_MONSTER_WEAPON_CHANCE` |
| `UPGRADE_MANAGE2_MONSTER_BREAD_CHANCE_10` | Feldversorgung XXV *(Field Supply XXV)* | Erhöht die Brot-Droprate beim Besiegen von Monstern. | 2.000 | 40:00 | Feldversorgung XXIV | `UNLOCK_MONSTER_BREAD_CHANCE` |
| `UPGRADE_MANAGE2_HERO_TRAINING_SPEED_9` | Trainingsgeschwindigkeit des Heldentrainingszentrums erhöht IX *(Hero Training Center Speed Increase IX)* | Die Trainingsgeschwindigkeit in der Debüt-Phase wird erhöht. | 2.000 | 38:20 | Trainingsgeschwindigkeit des Heldentrainingszentrums erhöht VIII | `UNLOCK_HERO_TRAINING_SPEED` |
| `UPGRADE_MANAGE2_GODDESS_ROOM_9` | Heldenunterkunft XXIX *(Hero's Rest XXIX)* | Der Goddess Room im Town Hall wird vergrößert. | 2.000 | 38:20 | Heldenunterkunft XXVIII | `UNLOCK_GODDESS_ROOM` |
| `UPGRADE_MANAGE2_MONSTER_MATERIAL_CHANCE_8` | Sammelndes Licht VIII *(Gathering Light VIII)* | Beim Besiegen seelengebundener Monster steigt die Chance, dass Materialien für Transzendenzwaffen erscheinen. | 2.000 | 38:20 | Sammelndes Licht VII | `UNLOCK_MONSTER_MATERIAL_CHANCE` |
| `UPGRADE_MANAGE2_HERO_TRAINING_SPEED_10` | Trainingsgeschwindigkeit des Heldentrainingszentrums erhöht X *(Hero Training Center Speed Increase X)* | Die Trainingsgeschwindigkeit in der Debüt-Phase wird erhöht. | 2.000 | 40:00 | Trainingsgeschwindigkeit des Heldentrainingszentrums erhöht IX | `UNLOCK_HERO_TRAINING_SPEED` |
| `UPGRADE_MANAGE2_GODDESS_ROOM_10` | Heldenunterkunft XXX *(Hero's Rest XXX)* | Der Goddess Room im Town Hall wird vergrößert. | 2.000 | 40:00 | Heldenunterkunft XXIX | `UNLOCK_GODDESS_ROOM` |
| `UPGRADE_MANAGE2_MONSTER_MATERIAL_CHANCE_9` | Sammelndes Licht IX *(Gathering Light IX)* | Beim Besiegen seelengebundener Monster steigt die Chance, dass Materialien für Transzendenzwaffen erscheinen. | 2.000 | 38:20 | Sammelndes Licht VIII | `UNLOCK_MONSTER_MATERIAL_CHANCE` |
| `UPGRADE_MANAGE2_HERO_TRAINING_SLOT_4` | Slots des Heldentrainingszentrums erhöht IV *(Hero Training Center Slot Increase IV)* | Erhöht die Anzahl der Helden, die in der Debüt-Phase trainieren können. | 8.000 | 23:20 | Slots des Heldentrainingszentrums erhöht III | `UNLOCK_HERO_TRAINING_SLOT` |
| `UPGRADE_MANAGE2_MONSTER_MATERIAL_CHANCE_10` | Sammelndes Licht X *(Gathering Light X)* | Beim Besiegen seelengebundener Monster steigt die Chance, dass Materialien für Transzendenzwaffen erscheinen. | 2.000 | 38:20 | Sammelndes Licht IX | `UNLOCK_MONSTER_MATERIAL_CHANCE` |

## Erweiterte Helden-Upgrades (HERO2)

### Labor-Stufe 1

| ID | Name | Beschreibung | Kosten | Zeit | Voraussetzung | Schaltet frei |
| --- | --- | --- | --- | --- | --- | --- |
| `UPGRADE_HERO2_SISTER_SKILL_1` | Göttin von Hasla *(Goddess of Hasla)* | Schaltet den Göttinnen-Skill frei. (Kann im Rathaus eingestellt werden.) | 1.000 | 5:00 | – | `UNLOCK_SISTER_SKILL` |

### Labor-Stufe 5

| ID | Name | Beschreibung | Kosten | Zeit | Voraussetzung | Schaltet frei |
| --- | --- | --- | --- | --- | --- | --- |
| `UPGRADE_HERO2_ATK_F_1` | Angriffstraining XXI *(ATK Training XXI)* | ANG des Helden steigt um 12. | 1.000 | 25:00 | – | – |
| `UPGRADE_HERO2_COSTUME_1` | Schicksalszweig *(Branch of Fate)* | Schaltet ein alternatives Aussehen für fortgeschrittene Helden frei. | 1.000 | 5:00 | – | `UNLOCK_HERO_COSTUME` |
| `UPGRADE_HERO2_HP_F_1` | Überlebenstraining XXI *(Survival Training XXI)* | LP des Helden steigt um 72. | 1.000 | 25:00 | – | – |

### Labor-Stufe 6

| ID | Name | Beschreibung | Kosten | Zeit | Voraussetzung | Schaltet frei |
| --- | --- | --- | --- | --- | --- | --- |
| `UPGRADE_HERO2_ATK_F_2` | Angriffstraining XXII *(ATK Training XXII)* | ANG des Helden steigt um 12. | 1.200 | 26:40 | Angriffstraining XXI | – |
| `UPGRADE_HERO2_ATTACKSPEED_F_1` | Angriffsgeschwindigkeitstraining VI *(Attack Speed Training VI)* | Das Angriffsintervall des Helden wird verkürzt. | 2.000 | 50:00 | – | – |
| `UPGRADE_HERO2_CRITP_F_1` | Krit-Power-Training XI *(Crit Power Training XI)* | Krit. Rate des Helden steigt um 1%. | 2.000 | 50:00 | – | – |
| `UPGRADE_HERO2_HP_F_2` | Überlebenstraining XXII *(Survival Training XXII)* | LP des Helden steigt um 72. | 1.200 | 26:40 | Überlebenstraining XXI | – |

### Labor-Stufe 7

| ID | Name | Beschreibung | Kosten | Zeit | Voraussetzung | Schaltet frei |
| --- | --- | --- | --- | --- | --- | --- |
| `UPGRADE_HERO2_ATK_F_3` | Angriffstraining XXIII *(ATK Training XXIII)* | ANG des Helden steigt um 12. | 1.200 | 28:20 | Angriffstraining XXII | – |
| `UPGRADE_HERO2_PENETRATEDEF_F_PENETRATERST_F_1` | Durchschlagstraining XVII *(Penetration Training XVII)* | Phys. Durchschlag und Mag. Durchschlag des Helden steigen um 6. | 1.200 | 28:20 | – | – |
| `UPGRADE_HERO2_DEF_F_RESIST_F_1` | Verteidigungstraining XVII *(Defense Training XVII)* | VTD und WID des Helden steigen um 6. | 1.200 | 28:20 | – | – |
| `UPGRADE_HERO2_HP_F_3` | Überlebenstraining XXIII *(Survival Training XXIII)* | LP des Helden steigt um 72. | 1.200 | 28:20 | Überlebenstraining XXII | – |

### Labor-Stufe 8

| ID | Name | Beschreibung | Kosten | Zeit | Voraussetzung | Schaltet frei |
| --- | --- | --- | --- | --- | --- | --- |
| `UPGRADE_HERO2_ATK_F_4` | Angriffstraining XXIV *(ATK Training XXIV)* | ANG des Helden steigt um 14. | 1.500 | 30:00 | Angriffstraining XXIII | – |
| `UPGRADE_HERO2_PENETRATEDEF_F_PENETRATERST_F_2` | Durchschlagstraining XVIII *(Penetration Training XVIII)* | Phys. Durchschlag und Mag. Durchschlag des Helden steigen um 7. | 1.500 | 30:00 | Durchschlagstraining XVII | – |
| `UPGRADE_HERO2_COSTUME_PROMOTE_CHANCE_1` | Schicksalszug I *(Pull of Fate I)* | Die Chance, dass ein alternatives Aussehen für fortgeschrittene Helden erscheint, steigt. | 1.000 | 8:20 | Schicksalszweig | `UNLOCK_HERO_COSTUME_PROMOTE_CHANCE` |
| `UPGRADE_HERO2_REDUCE_SISTER_SKILL_TIME_1` | Göttinnentraining I *(Goddess Training I)* | Die Abklingzeit des Göttinnen-Skills verringert sich. | 1.000 | 8:20 | Göttin von Hasla | `UNLOCK_REDUCE_SISTER_SKILL_TIME` |
| `UPGRADE_HERO2_DEF_F_RESIST_F_2` | Verteidigungstraining XVIII *(Defense Training XVIII)* | VTD und WID des Helden steigen um 7. | 1.500 | 30:00 | Verteidigungstraining XVII | – |
| `UPGRADE_HERO2_HP_F_4` | Überlebenstraining XXIV *(Survival Training XXIV)* | LP des Helden steigt um 84. | 1.500 | 30:00 | Überlebenstraining XXIII | – |

### Labor-Stufe 9

| ID | Name | Beschreibung | Kosten | Zeit | Voraussetzung | Schaltet frei |
| --- | --- | --- | --- | --- | --- | --- |
| `UPGRADE_HERO2_ATK_F_5` | Angriffstraining XXV *(ATK Training XXV)* | ANG des Helden steigt um 16. | 1.500 | 31:40 | Angriffstraining XXIV | – |
| `UPGRADE_HERO2_ATTACKSPEED_F_2` | Angriffsgeschwindigkeitstraining VII *(Attack Speed Training VII)* | Das Angriffsintervall des Helden wird verkürzt. | 2.500 | 50:00 | Angriffsgeschwindigkeitstraining VI | – |
| `UPGRADE_HERO2_CRITP_F_2` | Krit-Power-Training XII *(Crit Power Training XII)* | Krit. Rate des Helden steigt um 1%. | 2.500 | 50:00 | Krit-Power-Training XI | – |
| `UPGRADE_HERO2_HP_F_5` | Überlebenstraining XXV *(Survival Training XXV)* | LP des Helden steigt um 128. | 1.500 | 31:40 | Überlebenstraining XXIV | – |
| `UPGRADE_HERO2_PENETRATEDEF_F_PENETRATERST_F_3` | Durchschlagstraining XIX *(Penetration Training XIX)* | Phys. Durchschlag und Mag. Durchschlag des Helden steigen um 8. | 1.500 | 31:40 | Durchschlagstraining XVIII | – |
| `UPGRADE_HERO2_COSTUME_PROMOTE_CHANCE_2` | Schicksalszug II *(Pull of Fate II)* | Die Chance, dass ein alternatives Aussehen für fortgeschrittene Helden erscheint, steigt. | 1.250 | 12:30 | Schicksalszug I | `UNLOCK_HERO_COSTUME_PROMOTE_CHANCE` |
| `UPGRADE_HERO2_REDUCE_SISTER_SKILL_TIME_2` | Göttinnentraining II *(Goddess Training II)* | Die Abklingzeit des Göttinnen-Skills verringert sich. | 1.250 | 12:30 | Göttinnentraining I | `UNLOCK_REDUCE_SISTER_SKILL_TIME` |
| `UPGRADE_HERO2_DEF_F_RESIST_F_3` | Verteidigungstraining XIX *(Defense Training XIX)* | VTD und WID des Helden steigen um 8. | 1.500 | 31:40 | Verteidigungstraining XVIII | – |
| `UPGRADE_HERO2_ATK_F_6` | Angriffstraining XXVI *(ATK Training XXVI)* | ANG des Helden steigt um 16. | 1.700 | 33:20 | Angriffstraining XXV | – |
| `UPGRADE_HERO2_PENETRATEDEF_F_PENETRATERST_F_4` | Durchschlagstraining XX *(Penetration Training XX)* | Phys. Durchschlag und Mag. Durchschlag des Helden steigen um 8. | 1.700 | 33:20 | Durchschlagstraining XIX | – |
| `UPGRADE_HERO2_DEF_F_RESIST_F_4` | Verteidigungstraining XX *(Defense Training XX)* | VTD und WID des Helden steigen um 8. | 1.700 | 33:20 | Verteidigungstraining XIX | – |
| `UPGRADE_HERO2_HP_F_6` | Überlebenstraining XXVI *(Survival Training XXVI)* | LP des Helden steigt um 128. | 1.700 | 33:20 | Überlebenstraining XXV | – |
| `UPGRADE_HERO2_PENETRATEDEF_F_PENETRATERST_F_5` | Durchschlagstraining XXI *(Penetration Training XXI)* | Phys. Durchschlag und Mag. Durchschlag des Helden steigen um 9. | 1.700 | 35:00 | Durchschlagstraining XX | – |
| `UPGRADE_HERO2_COSTUME_PROMOTE_CHANCE_3` | Schicksalszug III *(Pull of Fate III)* | Die Chance, dass ein alternatives Aussehen für fortgeschrittene Helden erscheint, steigt. | 1.500 | 16:40 | Schicksalszug II | `UNLOCK_HERO_COSTUME_PROMOTE_CHANCE` |
| `UPGRADE_HERO2_REDUCE_SISTER_SKILL_TIME_3` | Göttinnentraining III *(Goddess Training III)* | Die Abklingzeit des Göttinnen-Skills verringert sich. | 1.500 | 16:40 | Göttinnentraining II | `UNLOCK_REDUCE_SISTER_SKILL_TIME` |
| `UPGRADE_HERO2_DEF_F_RESIST_F_5` | Verteidigungstraining XXI *(Defense Training XXI)* | VTD und WID des Helden steigen um 9. | 1.700 | 35:00 | Verteidigungstraining XX | – |
| `UPGRADE_HERO2_ATK_F_7` | Angriffstraining XXVII *(ATK Training XXVII)* | ANG des Helden steigt um 18. | 1.700 | 35:00 | Angriffstraining XXVI | – |
| `UPGRADE_HERO2_ATTACKSPEED_F_3` | Angriffsgeschwindigkeitstraining VIII *(Attack Speed Training VIII)* | Das Angriffsintervall des Helden wird verkürzt. | 3.000 | 50:00 | Angriffsgeschwindigkeitstraining VII | – |
| `UPGRADE_HERO2_CRITP_F_3` | Krit-Power-Training XIII *(Crit Power Training XIII)* | Krit. Rate des Helden steigt um 1%. | 3.000 | 50:00 | Krit-Power-Training XII | – |
| `UPGRADE_HERO2_HP_F_7` | Überlebenstraining XXVII *(Survival Training XXVII)* | LP des Helden steigt um 144. | 1.700 | 35:00 | Überlebenstraining XXVI | – |
| `UPGRADE_HERO2_ATK_F_8` | Angriffstraining XXVIII *(ATK Training XXVIII)* | ANG des Helden steigt um 18. | 2.000 | 36:40 | Angriffstraining XXVII | – |
| `UPGRADE_HERO2_PENETRATEDEF_F_PENETRATERST_F_6` | Durchschlagstraining XXII *(Penetration Training XXII)* | Phys. Durchschlag und Mag. Durchschlag des Helden steigen um 9. | 2.000 | 36:40 | Durchschlagstraining XXI | – |
| `UPGRADE_HERO2_DEF_F_RESIST_F_6` | Verteidigungstraining XXII *(Defense Training XXII)* | VTD und WID des Helden steigen um 9. | 2.000 | 36:40 | Verteidigungstraining XXI | – |
| `UPGRADE_HERO2_HP_F_8` | Überlebenstraining XXVIII *(Survival Training XXVIII)* | LP des Helden steigt um 144. | 2.000 | 36:40 | Überlebenstraining XXVII | – |
| `UPGRADE_HERO2_ATK_F_9` | Angriffstraining XXIX *(ATK Training XXIX)* | ANG des Helden steigt um 20. | 2.000 | 38:20 | Angriffstraining XXVIII | – |
| `UPGRADE_HERO2_PENETRATEDEF_F_PENETRATERST_F_7` | Durchschlagstraining XXIII *(Penetration Training XXIII)* | Phys. Durchschlag und Mag. Durchschlag des Helden steigen um 10. | 2.000 | 38:20 | Durchschlagstraining XXII | – |
| `UPGRADE_HERO2_DEF_F_RESIST_F_7` | Verteidigungstraining XXIII *(Defense Training XXIII)* | VTD und WID des Helden steigen um 10. | 2.000 | 38:20 | Verteidigungstraining XXII | – |
| `UPGRADE_HERO2_HP_F_9` | Überlebenstraining XXIX *(Survival Training XXIX)* | LP des Helden steigt um 160. | 2.000 | 38:20 | Überlebenstraining XXVIII | – |

### Labor-Stufe 10

| ID | Name | Beschreibung | Kosten | Zeit | Voraussetzung | Schaltet frei |
| --- | --- | --- | --- | --- | --- | --- |
| `UPGRADE_HERO2_COSTUME_PROMOTE_CHANCE_4` | Schicksalszug IV *(Pull of Fate IV)* | Die Chance, dass ein alternatives Aussehen für fortgeschrittene Helden erscheint, steigt. | 2.000 | 20:00 | Schicksalszug III | `UNLOCK_HERO_COSTUME_PROMOTE_CHANCE` |
| `UPGRADE_HERO2_REDUCE_SISTER_SKILL_TIME_4` | Göttinnentraining IV *(Goddess Training IV)* | Die Abklingzeit des Göttinnen-Skills verringert sich. | 2.000 | 20:00 | Göttinnentraining III | `UNLOCK_REDUCE_SISTER_SKILL_TIME` |
| `UPGRADE_HERO2_ATK_F_10` | Angriffstraining XXX *(ATK Training XXX)* | ANG des Helden steigt um 20. | 2.000 | 40:00 | Angriffstraining XXIX | – |
| `UPGRADE_HERO2_PENETRATEDEF_F_PENETRATERST_F_8` | Durchschlagstraining XXIV *(Penetration Training XXIV)* | Phys. Durchschlag und Mag. Durchschlag des Helden steigen um 10. | 2.000 | 40:00 | Durchschlagstraining XXIII | – |
| `UPGRADE_HERO2_DEF_F_RESIST_F_8` | Verteidigungstraining XXIV *(Defense Training XXIV)* | VTD und WID des Helden steigen um 10. | 2.000 | 40:00 | Verteidigungstraining XXIII | – |
| `UPGRADE_HERO2_HP_F_10` | Überlebenstraining XXX *(Survival Training XXX)* | LP des Helden steigt um 160. | 2.000 | 40:00 | Überlebenstraining XXIX | – |
| `UPGRADE_HERO2_ATK_F_11` | Angriffstraining XXXI *(ATK Training XXXI)* | ANG des Helden steigt um 22. | 2.200 | 41:40 | Angriffstraining XXX | – |
| `UPGRADE_HERO2_PENETRATEDEF_F_PENETRATERST_F_9` | Durchschlagstraining XXV *(Penetration Training XXV)* | Phys. Durchschlag und Mag. Durchschlag des Helden steigen um 11. | 2.200 | 41:40 | Durchschlagstraining XXIV | – |
| `UPGRADE_HERO2_COSTUME_PROMOTE_CHANCE_5` | Schicksalszug V *(Pull of Fate V)* | Die Chance, dass ein alternatives Aussehen für fortgeschrittene Helden erscheint, steigt. | 2.200 | 23:20 | Schicksalszug IV | `UNLOCK_HERO_COSTUME_PROMOTE_CHANCE` |
| `UPGRADE_HERO2_REDUCE_SISTER_SKILL_TIME_5` | Göttinnentraining V *(Goddess Training V)* | Die Abklingzeit des Göttinnen-Skills verringert sich. | 2.200 | 23:20 | Göttinnentraining IV | `UNLOCK_REDUCE_SISTER_SKILL_TIME` |
| `UPGRADE_HERO2_DEF_F_RESIST_F_9` | Verteidigungstraining XXV *(Defense Training XXV)* | VTD und WID des Helden steigen um 11. | 2.200 | 41:40 | Verteidigungstraining XXIV | – |
| `UPGRADE_HERO2_HP_F_11` | Überlebenstraining XXXI *(Survival Training XXXI)* | LP des Helden steigt um 176. | 2.200 | 41:40 | Überlebenstraining XXX | – |
| `UPGRADE_HERO2_ATK_F_12` | Angriffstraining XXXII *(ATK Training XXXII)* | ANG des Helden steigt um 22. | 2.200 | 43:20 | Angriffstraining XXXI | – |
| `UPGRADE_HERO2_PENETRATEDEF_F_PENETRATERST_F_10` | Durchschlagstraining XXVI *(Penetration Training XXVI)* | Phys. Durchschlag und Mag. Durchschlag des Helden steigen um 11. | 2.200 | 43:20 | Durchschlagstraining XXV | – |
| `UPGRADE_HERO2_DEF_F_RESIST_F_10` | Verteidigungstraining XXVI *(Defense Training XXVI)* | VTD und WID des Helden steigen um 11. | 2.200 | 43:20 | Verteidigungstraining XXV | – |
| `UPGRADE_HERO2_HP_F_12` | Überlebenstraining XXXII *(Survival Training XXXII)* | LP des Helden steigt um 176. | 2.200 | 43:20 | Überlebenstraining XXXI | – |
| `UPGRADE_HERO2_ATK_F_PENETRATEDEF_F_PENETRATERST_F_1` | Offensivtraining XV *(Offensive Training XV)* | ANG des Helden steigt um 24, Phys. Durchschlag und Mag. Durchschlag um 12. | 2.500 | 50:00 | Durchschlagstraining XXVI, Angriffstraining XXXII | – |
| `UPGRADE_HERO2_ATTACKSPEED_F_4` | Angriffsgeschwindigkeitstraining IX *(Attack Speed Training IX)* | Das Angriffsintervall des Helden wird verkürzt. | 4.000 | 50:00 | Angriffsgeschwindigkeitstraining VIII | – |
| `UPGRADE_HERO2_CRITP_F_4` | Krit-Power-Training XIV *(Crit Power Training XIV)* | Krit. Rate des Helden steigt um 1%. | 4.000 | 50:00 | Krit-Power-Training XIII | – |
| `UPGRADE_HERO2_DEF_F_HP_F_RESIST_F_1` | Überlebensspezialisierung XV *(Survival Specialization XV)* | LP des Helden steigt um 192, VTD und WID um 12. | 2.500 | 50:00 | Überlebenstraining XXXII, Verteidigungstraining XXVI | – |
| `UPGRADE_HERO2_ATK_F_PENETRATEDEF_F_PENETRATERST_F_2` | Offensivtraining XVI *(Offensive Training XVI)* | ANG des Helden steigt um 24, Phys. Durchschlag und Mag. Durchschlag um 12. | 2.500 | 50:00 | Offensivtraining XV | – |
| `UPGRADE_HERO2_COSTUME_PROMOTE_CHANCE_6` | Schicksalszug VI *(Pull of Fate VI)* | Die Chance, dass ein alternatives Aussehen für fortgeschrittene Helden erscheint, steigt. | 2.400 | 25:00 | Schicksalszug V | `UNLOCK_HERO_COSTUME_PROMOTE_CHANCE` |
| `UPGRADE_HERO2_REDUCE_SISTER_SKILL_TIME_6` | Göttinnentraining VI *(Goddess Training VI)* | Die Abklingzeit des Göttinnen-Skills verringert sich. | 2.400 | 25:00 | Göttinnentraining V | `UNLOCK_REDUCE_SISTER_SKILL_TIME` |
| `UPGRADE_HERO2_DEF_F_HP_F_RESIST_F_2` | Überlebensspezialisierung XVI *(Survival Specialization XVI)* | LP des Helden steigt um 192, VTD und WID um 12. | 2.500 | 50:00 | Überlebensspezialisierung XV | – |
| `UPGRADE_HERO2_ATK_F_PENETRATEDEF_F_PENETRATERST_F_3` | Offensivtraining XVII *(Offensive Training XVII)* | ANG des Helden steigt um 24, Phys. Durchschlag und Mag. Durchschlag um 12. | 2.500 | 50:00 | Offensivtraining XVI | – |
| `UPGRADE_HERO2_ATTACKSPEED_F_5` | Angriffsgeschwindigkeitstraining X *(Attack Speed Training X)* | Das Angriffsintervall des Helden wird verkürzt. | 5.000 | 50:00 | Angriffsgeschwindigkeitstraining IX | – |
| `UPGRADE_HERO2_CRITP_F_5` | Krit-Power-Training XV *(Crit Power Training XV)* | Krit. Rate des Helden steigt um 1%. | 5.000 | 50:00 | Krit-Power-Training XIV | – |
| `UPGRADE_HERO2_DEF_F_HP_F_RESIST_F_3` | Überlebensspezialisierung XVII *(Survival Specialization XVII)* | LP des Helden steigt um 192, VTD und WID um 12. | 2.500 | 50:00 | Überlebensspezialisierung XVI | – |
| `UPGRADE_HERO2_ATK_F_PENETRATEDEF_F_PENETRATERST_F_4` | Offensivtraining XVIII *(Offensive Training XVIII)* | ANG des Helden steigt um 24, Phys. Durchschlag und Mag. Durchschlag um 12. | 2.500 | 50:00 | Offensivtraining XVII | – |
| `UPGRADE_HERO2_ATTACKSPEED_F_6` | Angriffsgeschwindigkeitstraining XI *(Attack Speed Training XI)* | Das Angriffsintervall des Helden wird verkürzt. | 6.000 | 50:00 | Angriffsgeschwindigkeitstraining X | – |
| `UPGRADE_HERO2_CRITP_F_6` | Krit-Power-Training XVI *(Crit Power Training XVI)* | Krit. Rate des Helden steigt um 1%. | 6.000 | 50:00 | Krit-Power-Training XV | – |
| `UPGRADE_HERO2_DEF_F_HP_F_RESIST_F_4` | Überlebensspezialisierung XVIII *(Survival Specialization XVIII)* | LP des Helden steigt um 192, VTD und WID um 12. | 2.500 | 50:00 | Überlebensspezialisierung XVII | – |
| `UPGRADE_HERO2_ATK_F_PENETRATEDEF_F_PENETRATERST_F_5` | Offensivtraining XIX *(Offensive Training XIX)* | ANG des Helden steigt um 24, Phys. Durchschlag und Mag. Durchschlag um 12. | 2.500 | 50:00 | Offensivtraining XVIII | – |
| `UPGRADE_HERO2_ATTACKSPEED_F_7` | Angriffsgeschwindigkeitstraining XII *(Attack Speed Training XII)* | Das Angriffsintervall des Helden wird verkürzt. | 7.000 | 50:00 | Angriffsgeschwindigkeitstraining XI | – |
| `UPGRADE_HERO2_CRITP_F_7` | Krit-Power-Training XVII *(Crit Power Training XVII)* | Krit. Rate des Helden steigt um 1%. | 7.000 | 50:00 | Krit-Power-Training XVI | – |
| `UPGRADE_HERO2_DEF_F_HP_F_RESIST_F_5` | Überlebensspezialisierung XIX *(Survival Specialization XIX)* | LP des Helden steigt um 192, VTD und WID um 12. | 2.500 | 50:00 | Überlebensspezialisierung XVIII | – |
| `UPGRADE_HERO2_ATTACKSPEED_F_8` | Angriffsgeschwindigkeitstraining XIII *(Attack Speed Training XIII)* | Das Angriffsintervall des Helden wird verkürzt. | 8.000 | 50:00 | Angriffsgeschwindigkeitstraining XII | – |
| `UPGRADE_HERO2_CRITP_F_8` | Krit-Power-Training XVIII *(Crit Power Training XVIII)* | Krit. Rate des Helden steigt um 1%. | 8.000 | 50:00 | Krit-Power-Training XVII | – |
| `UPGRADE_HERO2_ATTACKSPEED_F_9` | Angriffsgeschwindigkeitstraining XIV *(Attack Speed Training XIV)* | Das Angriffsintervall des Helden wird verkürzt. | 9.000 | 50:00 | Angriffsgeschwindigkeitstraining XIII | – |
| `UPGRADE_HERO2_CRITP_F_9` | Krit-Power-Training XIX *(Crit Power Training XIX)* | Krit. Rate des Helden steigt um 1%. | 9.000 | 50:00 | Krit-Power-Training XVIII | – |
| `UPGRADE_HERO2_ATTACKSPEED_F_10` | Angriffsgeschwindigkeitstraining XV *(Attack Speed Training XV)* | Das Angriffsintervall des Helden wird verkürzt. | 10.000 | 50:00 | Angriffsgeschwindigkeitstraining XIV | – |
| `UPGRADE_HERO2_CRITP_F_10` | Krit-Power-Training XX *(Crit Power Training XX)* | Krit. Rate des Helden steigt um 1%. | 10.000 | 50:00 | Krit-Power-Training XIX | – |
