# Helden-Eigenschaften (Traits) – Aetherbastion: Rift Watch

> Interne Entwicklungs-Referenz für **Aetherbastion: Rift Watch**. **Seit v0.29.0 im Spiel** (siehe „Umsetzung“ unten). Vorbild ist das Trait-System aus Crusaders Quest: Hero Town (45 Traits). Namen und Werte sind auf unser Spiel und Guild-Wars-2-Begriffe umgemünzt; die Prozentwerte sind Startwerte fürs Balancing und kommen beim Einbau nach `js/config.js`.

## Idee

Jedes Gildenmitglied, das sich in der **🏛️ Gildenhalle** zur Wacht meldet, bringt **1 bis 3 Eigenschaften** mit. Die Eigenschaften werden beim Rekrutieren gewürfelt; ein neues Angebot kostet Gold.

- **Einzel-Eigenschaften** geben den größten Bonus auf **einen** Wert.
- **Doppel-Eigenschaften** verteilen einen mittleren Bonus auf **zwei** Werte.
- **Dreifach-Eigenschaften** verteilen einen kleinen Bonus auf **drei** Werte (ähnlich den GW2-Präfixen Berserker, Marodeur oder Himmlisch).

Jede Eigenschaft gibt es in bis zu fünf **Seltenheiten**. Sie heißen wie unsere Waffen-Güten, damit Spieler nur eine Farbskala lernen müssen:

| Seltenheit | Farbe (wie Waffen) |
| --- | --- |
| Aufgestiegen | Pink |
| Exotisch | Orange |
| Selten | Gelb |
| Meisterwerk | Grün |
| Fein | Blau |

Die **Spezialisierung** eines Helden (in der Rekrutierung angezeigt) richtet sich nach seiner seltensten Eigenschaft. **Der Rekrutierungspreis steigt mit der höchsten gewürfelten Seltenheit.**

## Spezialisierungen

| Spezialisierung | Schwerpunkt | Werte im Spiel |
| --- | --- | --- |
| ⚔️ Angriff | Schaden im Riss | ATK, Krit-Chance, Krit-Schaden, Angriffstempo (Eile) |
| 🛡️ Verteidigung | Überleben im Riss | Max. LP, DEF (Schadensreduktion), Heilung, kürzere Verwundung |
| 🧭 Lager | Wirtschaft der Gilde | Gold, EXP, Ätherscherben, Proviant-Wirkung, Offline-Ertrag |
| ⚖️ Ausgeglichen | Allrounder | Mischung aus Schaden und Überleben |

Lager-Helden lohnen sich auch in der **Reserve**: Ihre Boni auf Gold und EXP könnten (Designfrage) für das ganze Lager gelten, nicht nur für ihren Trupp.

## Werte, die eine Eigenschaft verbessern kann

| Wert | Wirkung im Spiel | Gibt es schon? |
| --- | --- | --- |
| ATK | Schaden pro Angriff | ✓ |
| Krit-Chance | Chance auf doppelten Schaden | ✓ |
| Krit-Schaden | Multiplikator bei Krit | ✓ |
| Angriffstempo | Chance auf Zusatzangriff (wie *Eile*) | ✓ (als Buff) |
| Max. LP | Lebenspunkte | ✓ |
| DEF | Schadensreduktion (gedeckelt bei 75 %) | ✓ |
| Heilung | Heilleistung von Heilern | ✓ |
| Regeneration | kürzere Verwundung nach 0 LP | ✓ |
| Boss-Härte | weniger Schaden von Bossen | neu |
| Ausdauer | höhere Erschöpfungsgrenze | geplant (Erschöpfung) |
| Gold | mehr 🟡 aus Kämpfen | ✓ (Forschung) |
| EXP | mehr EXP aus Kämpfen | ✓ (Forschung) |
| Ätherscherben | höhere 🔮-Chance | ✓ (Forschung) |
| Proviant | mehr EXP aus 🍞 Proviant | neu |
| Offline | höhere Offline-Effizienz | neu |
| Beute | Chance auf eine Waffe mehr bei Bossen | neu |

## Alle 45 Eigenschaften

Die Werte gelten je Seltenheit: **Aufgestiegen / Exotisch / Selten / Meisterwerk / Fein**. Ein „–“ heißt: Diese Seltenheit gibt es für die Eigenschaft nicht.

### Einzel-Eigenschaften (14)

| Eigenschaft | Spezialisierung | Wert | Bonus |
| --- | --- | --- | --- |
| **Berserker-Kraft** | ⚔️ Angriff | ATK | 15 / 12 / 8 / 5 / 3 % |
| **Scharfes Auge** | ⚔️ Angriff | Krit-Chance | 15 / 12 / 8 / 5 / 3 % |
| **Wildheit** | ⚔️ Angriff | Krit-Schaden | 15 / 12 / 8 / 5 / 3 % |
| **Eilige Klinge** | ⚔️ Angriff | Angriffstempo | 15 / 12 / 8 / 5 / 3 % |
| **Zähigkeit** | 🛡️ Verteidigung | DEF | 15 / 12 / 8 / 5 / 3 % |
| **Vitalität** | 🛡️ Verteidigung | Max. LP | 15 / 12 / 8 / 5 / 3 % |
| **Felsenfest** | 🛡️ Verteidigung | Boss-Härte | 15 / 12 / 8 / – / – % |
| **Zähes Fleisch** | 🛡️ Verteidigung | Regeneration | 15 / 12 / 8 / 5 / 3 % |
| **Ausdauernd** | 🛡️ Verteidigung | Ausdauer | 15 / 12 / 8 / – / – % |
| **Rissläufer** | 🧭 Lager | Offline | 15 / 12 / 8 / 5 / 3 % |
| **Goldrausch** | 🧭 Lager | Gold | 15 / 12 / 8 / 5 / 3 % |
| **Nebelgelehrter** | 🧭 Lager | EXP | 15 / 12 / 8 / 5 / 3 % |
| **Feldkoch** | 🧭 Lager | Proviant | 15 / 12 / 8 / – / – % |
| **Ätherspürer** | 🧭 Lager | Ätherscherben | 15 / 12 / 8 / – / – % |

### Doppel-Eigenschaften (19)

| Eigenschaft | Spezialisierung | Werte | Bonus je Wert |
| --- | --- | --- | --- |
| **Kraftvoller Stoß** | ⚔️ Angriff | ATK, Krit-Schaden | 7,5 / 6 / 4 / 3 / – % |
| **Präzisionsschlag** | ⚔️ Angriff | ATK, Krit-Chance | 7,5 / 6 / 4 / 3 / – % |
| **Klingenwirbel** | ⚔️ Angriff | ATK, Angriffstempo | 7,5 / 6 / 4 / 3 / – % |
| **Tödlicher Fokus** | ⚔️ Angriff | Krit-Chance, Krit-Schaden | 7,5 / 6 / 4 / 3 / – % |
| **Sturmangriff** | ⚔️ Angriff | Angriffstempo, Krit-Chance | 7,5 / 6 / 4 / 3 / – % |
| **Eiserne Abwehr** | 🛡️ Verteidigung | DEF, Max. LP | 7,5 / 6 / 4 / 3 / – % |
| **Schildwall** | 🛡️ Verteidigung | DEF, Boss-Härte | 7,5 / 6 / 4 / 3 / – % |
| **Leichtfuß** | 🛡️ Verteidigung | Regeneration, DEF | 7,5 / 6 / 4 / 3 / – % |
| **Lebensquell** | 🛡️ Verteidigung | Max. LP, Heilung | 7,5 / 6 / 4 / 3 / – % |
| **Widerstandskraft** | 🛡️ Verteidigung | Max. LP, Boss-Härte | 7,5 / 6 / 4 / 3 / – % |
| **Marodeur-Drang** | ⚖️ Ausgeglichen | ATK, Max. LP | 7,5 / 6 / 4 / 3 / – % |
| **Ritterlicher Stand** | ⚖️ Ausgeglichen | ATK, DEF | 7,5 / 6 / 4 / 3 / – % |
| **Kampfsanitäter** | ⚖️ Ausgeglichen | Heilung, ATK | 7,5 / 6 / 4 / 3 / – % |
| **Pirscher-Reflexe** | ⚖️ Ausgeglichen | Krit-Chance, Regeneration | 7,5 / 6 / 4 / 3 / – % |
| **Späherzug** | 🧭 Lager | Offline, EXP | 7,5 / 6 / 4 / 3 / – % |
| **Gildenhändler** | 🧭 Lager | Gold, Offline | 7,5 / 6 / 4 / 3 / – % |
| **Beutejäger** | 🧭 Lager | Beute, Ätherscherben | 7,5 / 6 / 4 / – / – % |
| **Pakt-Effizienz** | 🧭 Lager | Gold, EXP | 7,5 / 6 / 4 / 3 / – % |
| **Quartiermeister** | 🧭 Lager | Proviant, EXP | 7,5 / 6 / 4 / 3 / – % |

### Dreifach-Eigenschaften (12)

Nur in den Seltenheiten **Aufgestiegen** und **Exotisch**.

| Eigenschaft | Spezialisierung | Werte | Bonus je Wert |
| --- | --- | --- | --- |
| **Berserker-Präzision** | ⚔️ Angriff | ATK, Krit-Chance, Krit-Schaden | 5 / 4 % |
| **Charr-Kriegsrausch** | ⚔️ Angriff | ATK, Angriffstempo, Krit-Schaden | 5 / 4 % |
| **Drachen-Zorn** | ⚔️ Angriff | ATK, Krit-Schaden, Max. LP | 5 / 4 % |
| **Assassinen-Meisterschaft** | ⚔️ Angriff | Krit-Chance, Angriffstempo, Krit-Schaden | 5 / 4 % |
| **Unerschütterlicher Ritter** | 🛡️ Verteidigung | DEF, Max. LP, Boss-Härte | 5 / 4 % |
| **Wanderer-Bollwerk** | 🛡️ Verteidigung | DEF, Max. LP, Heilung | 5 / 4 % |
| **Kavalier-Taktik** | 🛡️ Verteidigung | DEF, Max. LP, Regeneration | 5 / 4 % |
| **Marodeur-Vorstoß** | ⚖️ Ausgeglichen | ATK, Krit-Chance, Max. LP | 5 / 4 % |
| **Kreuzritter-Stand** | ⚖️ Ausgeglichen | ATK, DEF, Krit-Schaden | 5 / 4 % |
| **Himmlischer Funke** | ⚖️ Ausgeglichen | ATK, DEF, Max. LP | 5 / 4 % |
| **Glück des Verrückten Königs** | 🧭 Lager | Beute, Gold, EXP | 5 / 4 % |
| **Karawanen-Vorrat** | 🧭 Lager | Proviant, Ätherscherben, Offline | 5 / 4 % |

## Umsetzung (v0.29.0)

Die Daten stehen in `js/config.js` (`TRAITS`, `TRAIT_STATS`, `TRAIT_SPECS`, `TRAIT_RULES`), die Logik in `js/state.js` (`rollTraits`, `traitBonus`, `squadTrait`, `traitSpec`). Am Helden und am Rekrutierungsangebot: `traits: [{ id, g }]`, `g` = Güte 2–6.

Entscheidungen zu den offenen Fragen:

- **Würfeln statt fester Eigenschaften:** Die Eigenschaften werden je Angebot gewürfelt und sind im Angebot sichtbar. Kostenlose Helden (Onboarding, Aufträge) würfeln auch. Bestehende Helden haben bei der Migration (Save-Version 10) Eigenschaften nach ihrer Seltenheit bekommen.
- **Anzahl und Güte:** Anzahl nach Helden-Seltenheit (Fein/Meisterwerk 1, Selten/Exotisch 2, Aufgestiegen 3). Güte = Seltenheit des Helden mit 50 %, eine Stufe tiefer 35 %, zwei Stufen tiefer 15 % (nie unter Fein). Gibt es eine Eigenschaft in der Güte nicht, wird eine andere gewählt. Keine Eigenschaft doppelt.
- **Rolle lenkt die Spezialisierung:** `TRAIT_RULES.specWeight`, z. B. Tank/Heiler 4× Verteidigung, Schaden 4× Angriff.
- **Neu würfeln:** Nur über „Liste erneuern“ (bestehender Preis). Eigenschaften am Helden ändern geht noch nicht (Idee: Mystische Schmiede, siehe #049).
- **Ruhestand:** Eigenschaften gehen verloren; neu rekrutiert wird neu gewürfelt.
- **Lager-Boni:** Gelten für den eigenen Trupp (Summe im Zelt), nicht aus der Reserve. So konkurrieren Lager-Helden um Kampfplätze.
- **Preis:** Bleibt bei der Helden-Seltenheit; die Güte der Eigenschaften kann sie nicht übersteigen.
- **Zusatzpunkte gedämpft:** Werte, die Prozentpunkte addieren, sind mit Faktor `f` gedämpft (Krit-Chance und Angriffstempo ×0,5, DEF ×0,4), damit ein Aufgestiegen-Held nicht sofort am DEF-Deckel klebt.
- **Weggelassen:** „Ausdauernd“ und der Wert Ausdauer, bis es Erschöpfung gibt (44 statt 45 Eigenschaften).
- **Neue Werte:** Boss-Härte (weniger Schaden von Bossen), Proviant (mehr EXP aus Proviant), Offline (mehr Offline-Ertrag je Sieg), Beute (Chance auf eine Boss-Waffe mehr).

## Offene Fragen (Stand v0.29.0)

- Eigenschaften gezielt neu würfeln oder aufwerten (Mystische Schmiede, 🍀)? Passt zu legendären Helden (#049).
- Sollen Eigenschaften den Preis erhöhen, wenn alle in der höchsten Güte sind?
- Balancing: Sind die Lager-Boni als Trupp-Summe zu stark, wenn drei Gold-Helden in einem Zelt stehen?

## Ursprüngliche offene Fragen

- **Katalog-Helden vs. Würfeln:** Unsere Helden sind feste Gildenmitglieder (`HEROES` in `js/config.js`). Bekommen sie feste Eigenschaften, oder werden sie beim Rekrutieren gewürfelt?
- **Neu würfeln:** Kostet ein neues Rekrutierungsangebot Gold, und steigt der Preis wie beim Waffenladen?
- **Ruhestand:** Behält ein Held seine Eigenschaften, wenn er nach dem Ruhestand neu rekrutiert wird?
- **Lager-Boni:** Gelten Gold-/EXP-Eigenschaften nur für den eigenen Trupp oder für das ganze Lager?
- **Spielstand:** Eigenschaften brauchen ein neues Feld am Helden → `GAME.SAVE_VERSION` erhöhen und Migration ergänzen.
