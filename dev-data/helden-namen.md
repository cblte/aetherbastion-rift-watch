# Heldennamen

Handgeschrieben. Quelle: Namensliste mit 100 Namen (5 Völker × 5 Fantasy-Klassen × 2 Geschlechter × 2).
Seit v0.28.0 sind 60 davon im Spiel (`HEROES` in `js/config.js`), die anderen 40 sind Reserve.

Regeln:
- Charr-Namen bleiben englisch, Norn-Beinamen werden deutsch (wie im deutschen GW2-Client). Menschen, Asura und Sylvari wie in der Liste.
- Die Fantasy-Klassen der Liste sind auf GW2-Klassen und Rollen verteilt: Paladin → meist Wächter-Tank, Priester → Heiler oder Unterstützer, Bogenschütze → Waldläufer, Dieb oder Ingenieur, Magier → Elementarmagier, Mesmer oder Nekromant, Krieger → Krieger oder Widergänger.
- Das Volk (`race`) ist nur Anzeige.
- Klasse und Rolle sind unabhängig. Welche Rollen zu einer Klasse passen, steht in `CLASSES[…].roles` (nach GW2-Spezialisierungen, z. B. Mesmer-Tank = Chronomant, Dieb-Heiler = Spektral). Seit v0.30.0 gibt die Klasse einen festen Klassenbonus.
- ids nie ändern. Neue Helden bekommen `h61` und folgende.

## Im Spiel (v0.28.0)

60 Helden: 12 je Volk, 15 je Rolle (Tank, Heiler, Unterstützer, Schaden). Beim Ergänzen die Rollen gleich groß halten.

| id | Name | Volk | Liste | Klasse | Rolle |
| --- | --- | --- | --- | --- | --- |
| h01 | Lucian Halford | Mensch | Paladin | Wächter | Tank (Onboarding) |
| h02 | Valra Embersoul | Charr | Priester | Wächter | Heiler |
| h03 | Roxx Ironbreaker | Charr | Krieger | Krieger | Tank |
| h04 | Astrid Skadidottir | Norn | Krieger | Krieger | Schaden |
| h05 | Alistair Vance | Mensch | Krieger | Krieger | Unterstützer (Macht) |
| h06 | Halvar Sonnenschild (Sunshield) | Norn | Paladin | Widergänger | Tank |
| h07 | Olwen | Sylvari | Priester | Waldläufer | Heiler (Onboarding) |
| h08 | Arn Adlerauge (Eagle-Eye) | Norn | Bogenschütze | Waldläufer | Schaden |
| h09 | Diana Swift | Mensch | Bogenschütze | Dieb | Schaden |
| h10 | Snappi | Asura | Bogenschütze | Dieb | Schaden |
| h11 | Miphi | Asura | Priester | Ingenieur | Heiler |
| h12 | Zokk | Asura | Priester | Ingenieur | Unterstützer (Eile) |
| h13 | Vorek Stormcaller | Charr | Magier | Elementarmagier | Schaden (Onboarding) |
| h14 | Brynhild Frostgeboren (Blizzardborn) | Norn | Magier | Elementarmagier | Schaden |
| h15 | Branwen | Sylvari | Magier | Mesmer | Unterstützer (Eile) |
| h16 | Cassandra Delacroix | Mensch | Magier | Mesmer | Schaden |
| h17 | Niall | Sylvari | Magier | Nekromant | Schaden |
| h18 | Korak Ashpyre | Charr | Priester | Nekromant | Unterstützer (Macht) |
| h19 | Caelen | Sylvari | Krieger | Widergänger | Schaden |
| h20 | Desta Shieldbastion | Charr | Paladin | Wächter | Schaden |
| h21 | Vrakka Forgecleaver | Charr | Krieger | Krieger | Schaden |
| h22 | Garron Dawnguard | Charr | Paladin | Wächter | Tank |
| h23 | Rhok Farstrider | Charr | Bogenschütze | Waldläufer | Unterstützer (Eile) |
| h24 | Pyra Talonshot | Charr | Bogenschütze | Ingenieur | Schaden |
| h25 | Kaida Cracklebolt | Charr | Magier | Elementarmagier | Heiler |
| h26 | Elena Mercer | Mensch | Krieger | Krieger | Tank |
| h27 | Vivienne Suncrest | Mensch | Paladin | Wächter | Unterstützer (Macht) |
| h28 | Julian Croft | Mensch | Priester | Wächter | Heiler |
| h29 | Sophia Dawn | Mensch | Priester | Widergänger | Heiler |
| h30 | Garrett Fletcher | Mensch | Bogenschütze | Waldläufer | Schaden |
| h31 | Damian Voss | Mensch | Magier | Mesmer | Tank |
| h32 | Torvald Felsbrecher (Boulderkracker) | Norn | Krieger | Krieger | Tank |
| h33 | Freya Morgenwacht (Dawnguard) | Norn | Paladin | Widergänger | Tank |
| h34 | Vidar Rabenwacht (Ravenward) | Norn | Priester | Waldläufer | Heiler |
| h35 | Ingrid Wolfsang (Wolfsong) | Norn | Priester | Waldläufer | Unterstützer (Eile) |
| h36 | Silje Falkenblick (Hawksight) | Norn | Bogenschütze | Waldläufer | Heiler |
| h37 | Soren Eisweber | Norn | Magier | Elementarmagier | Unterstützer (Macht) |
| h38 | Kragg | Asura | Krieger | Krieger | Tank |
| h39 | Plikka | Asura | Krieger | Krieger | Unterstützer (Macht) |
| h40 | Vorx | Asura | Paladin | Ingenieur | Tank |
| h41 | Jazzi | Asura | Paladin | Wächter | Unterstützer (Macht) |
| h42 | Flekk | Asura | Bogenschütze | Dieb | Schaden |
| h43 | Xenn | Asura | Magier | Mesmer | Unterstützer (Eile) |
| h44 | Vizza | Asura | Magier | Elementarmagier | Schaden |
| h45 | Maeve | Sylvari | Krieger | Krieger | Tank |
| h46 | Tiernan | Sylvari | Paladin | Wächter | Tank |
| h47 | Eira | Sylvari | Paladin | Wächter | Heiler |
| h48 | Iorwerth | Sylvari | Priester | Nekromant | Unterstützer (Macht) |
| h49 | Rowan | Sylvari | Bogenschütze | Waldläufer | Heiler |
| h50 | Seren | Sylvari | Bogenschütze | Dieb | Heiler |
| h51 | Barok Lightwall | Charr | Paladin | Wächter | Tank |
| h52 | Zanna Soulsear | Charr | Priester | Widergänger | Heiler |
| h53 | Cedric Valerius | Mensch | Paladin | Ingenieur | Unterstützer (Macht) |
| h54 | Livia Thorne | Mensch | Priester | Mesmer | Heiler |
| h55 | Thyra Bärenwacht (Bearward) | Norn | Paladin | Krieger | Tank |
| h56 | Leif Geisterrufer | Norn | Priester | Waldläufer | Unterstützer (Eile) |
| h57 | Tezz | Asura | Paladin | Widergänger | Tank |
| h58 | Genni | Asura | Priester | Elementarmagier | Heiler |
| h59 | Kynan | Sylvari | Priester | Mesmer | Unterstützer (Eile) |
| h60 | Fiona | Sylvari | Priester | Nekromant | Heiler |

## Reserve

Noch nicht im Spiel. Hinweise in Klammern.

| Volk | Krieger | Paladin | Priester | Bogenschütze | Magier |
| --- | --- | --- | --- | --- | --- |
| Charr | Tybalt Steelfang (Name wie der GW2-Charakter Tybalt Leftpaw, besser umbenennen), Karkha Bloodrend | Sula Sunwarden | Morrak Cinderfaith | Drax Quickquiver, Britta Skypiercer | Jharon Sparksurge, Mirra Flameweaver |
| Mensch | Rowan Sterling (Rowan gibt es schon als Sylvari), Katrin Falk | Mara Brightwood | Matthias Greystone | Robin Westfall, Talia Ravenwing | Ronald Ashton, Selene Wintermere |
| Norn | Bjorn Frostfaust (Frostfist), Sigrid Eisenhaut (Ironhide) | Einar Lichtbringer | Signe Seelensang | Ulf Jagdmeister, Dagmar Windläuferin (Windstrider) | Kjell Donnerstimme, Ylva Runenwirker |
| Asura | Rrokk, Brena | Ruxxi | Bikk | Zappi, Pikkle | Polx, Kinnu |
| Sylvari | Branoc, Rhiannon | Gaereth, Briallen | – | Aled, Carys | Taliesin, Morwenna |
