# Zonen-Erweiterung (Entwurf) – Aetherbastion: Rift Watch

> Interne Entwicklungs-Referenz für **Aetherbastion: Rift Watch**. **Geplant, noch nicht im Spiel.** Erzeugt aus `tools/data/zones-expansion.json` mit `node tools/gen-devdata.mjs .` – Änderungen dort vornehmen, nicht hier. Die Zonen 1–10 (Portal 1–4) sind im Spiel; ihre Daten stehen in `tools/gen-zones.mjs`.

## Ausgangslage

Im Spiel sind 10 Zonen hinter 4 Portal-Stufen:

| Portal | Region | Zonen |
| --- | --- | --- |
| 1 | Kryta, Caledon & Zittergipfel | Königintal, Caledon-Wald, Wanderer-Hügel |
| 2 | Metrica, Aschfurt & Anwesen | Provinz Metrica, Ebenen von Aschfurt, Caudecus’ Anwesen |
| 3 | Ascalon & Harathi | Katakomben von Ascalon, Harathi-Hinterland |
| 4 | Küste & Sümpfe von Orr | Blutstrom-Küste, Funkenschwärmersumpf |

Die Erweiterung hängt **Portal 5–8** mit den **Zonen 11–20** an. Wie bei den Zonen 1–10 hat jede Zone 5 Bosse und einen **Zonen-Endboss** (★).

## Erweiterung 1: Portal 5–6 (Lv. 61–70)

### Portal 5 – Das Land der Charr (Lv. 61–65)

| # | Zone | Typ | Lv. | Bosse | ★ Endboss | Schergen (Vorschlag) |
| --- | --- | --- | --- | --- | --- | --- |
| 11 | Eisensuperiorität | Offene Welt | 61–63 | Gebrandmarkte Verschlinger-Königin, Champion Brand-Goliath, Separatisten-Anführer, Flammenlegion-Kultist, Gebrandmarkter Zerschmetterer-Leutnant | Der Zerschmetterer | Gebrandmarkte, Verschlinger, Flammenlegion |
| 12 | Zitadelle der Flamme | Verlies | 64–65 | Sklavenmeister, Gaheron-Eiferer, Schmiedemeister, Evolvierter Flammen-Schamane, Magister des Baelfire | Gaheron Baelfire | Flammenlegion, Oger, Feuerelementare |

### Portal 6 – Hoher Norden & Vorstoß nach Orr (Lv. 66–70)

| # | Zone | Typ | Lv. | Bosse | ★ Endboss | Schergen (Vorschlag) |
| --- | --- | --- | --- | --- | --- | --- |
| 13 | Eisklamm-Sund | Offene Welt | 66–67 | Champion Eisbrut-Kodan, Dredge-Generaldirektor, Champion Svanir-Hexenmeister, Unterwasser-Krake Svanir, Eisbrut-Koloss | Klaue von Jormag | Eisbrut, Söhne Svanirs, Schaufler |
| 14 | Umarmung der Betrübnis | Verlies | 68–69 | Vorarbeiter Spur, Targa der Peiniger, General Molotov, Dredge-Kriegsgolem, Inquestur-Chef Kudu | Der Eiserne Schlächter | Schaufler, Inquestur, Golems |
| 15 | Ruinen von Arah | Verlies / epische Zone | 70 | Auge des Zhaitan, Maul des Zhaitan, Hohepriester des Balthasar, Hohepriesterin der Dwayna, Hohepriester der Grenth | Zhaitan | Auferstandene, Auferstandene Abscheulichkeit, Knochenmonstrum |

## Erweiterung 2: Portal 7–8 (Lv. 71–80)

Alternativ als **„Schwer+“**-Stufe statt eigener Erweiterung.

### Portal 7 – Maguuma-Dschungel (Lv. 71–75)

| # | Zone | Typ | Lv. | Bosse | ★ Endboss | Schergen (Vorschlag) |
| --- | --- | --- | --- | --- | --- | --- |
| 16 | Silberwüste | Offene Welt | 71–73 | Mordrem-Hüllen-Champion, Mordrem-Rankenbrecher, Mordrem-Teragriff, Blasenwerfender Mordrem-Wolf, Großer Züchter | Rankenzorn | Mordrem, Mordrem-Wolf, Mordrem-Scharfschütze |
| 17 | Grasgrüne Schwelle | Offene Welt | 74–75 | Patriarch der Wyvern, Axthauer-Champion, Mordrem-Kommandeur Diarmid, Mordrem-Kommandeur Stabmeister, Flügel-Schrecken | Matriarchin der Wyvern | Mordrem, Wyvern, Rauchschuppen |

### Portal 8 – Wüste, Geistertal & Weltende (Lv. 76–80)

| # | Zone | Typ | Lv. | Bosse | ★ Endboss | Schergen (Vorschlag) |
| --- | --- | --- | --- | --- | --- | --- |
| 18 | Geistertal | Schlachtzug | 76–77 | Talwächter, Gorseval der Facettenreiche, Zunder-Bandit, Kern-Spaltmonstrum, Turmwächter Karde | Sabetha die Saboteurin | Geister, Banditen, Untote |
| 19 | Kristalloase & Flusslande | Offene Welt | 78–79 | Gebrandmarkte Hydra, Choya-Piñata, Champion Erweckter Kanopen-Wächter, Verschlinger-Matriarchin, Herold von Balthasar | Doppelgänger | Erweckte, Geschmiedete, Gebrandmarkte |
| 20 | Drachensturz (Die Nebel) | Epische Zone | 80 | Ley-infundierter Zorn, Befallenes Riss-Monstrum, Kristallflügel-General, Gebrandmarkter Aurene-Schatten, Geißel der Schöpfung | Kralkatorrik | Gebrandmarkte, Kristall-Drachenbrut, Erweckte |

## Was der Einbau braucht

- **Level-Cap über 60:** `MAX_HERO_LEVEL` und die EXP-Tabelle in `js/data/heroLevels.js` enden bei Lv. 60, das Zeltlager auch. Für Lv. 61–80 brauchen wir neue Zeilen (EXP, Gold/Zyklus, Belohnungen) und weitere Zeltlager-Stufen.
- **Stufen-Werte:** Die CQHT-Daten reichen nur bis Kapitel 5. Level, Kosten und Belohnungen für die Zonen 11–20 müssen wir selbst festlegen (oder an `dev-data/archiv/cqht-monsters.*` anlehnen).
- **Riss-Portal:** Stufe 5–8 in `js/data/buildings.js` ergänzen, Ätherscherben in `PORTAL_SHARDS`.
- **Schwere und legendäre Stufen:** gleiches Muster wie Zonen 1–10 (☠️ Boss 5 und „Verderbt: Endboss“, ⭐ „Schatten: Endboss“), oder Erweiterung 2 als „Schwer+“.
- **Zonen-Daten:** in `tools/gen-zones.mjs` ergänzen; der Generator muss dafür Stufen ohne CQHT-Vorlage erzeugen können.

## Namen geprüft / angepasst

- „Umarmung des Betrübnis“ → **Umarmung der Betrübnis** (deutscher Name von Sorrow’s Embrace).
- Englische Zusätze in Klammern entfernt (Shatterer, Vinewrath, Forsaken Thicket, Vale Guardian).
- „Blistering Mordrem Wolf“ → *Blasenwerfender Mordrem-Wolf*, „Stavemaster“ → *Stabmeister*, „Branded Aurene-Schatten“ → *Gebrandmarkter Aurene-Schatten*, „Canopic“ → *Kanopen*: eigene Übersetzungen, nicht mit dem deutschen Client abgeglichen.
- „Eisbrut-Kodann“ → *Eisbrut-Kodan* (die Kodan sind das Volk); „Champion Eisbrut-Kodan“ gibt es so in der DE-Wiki.
- Alle übrigen Bosse ohne Quellenprüfung übernommen.
