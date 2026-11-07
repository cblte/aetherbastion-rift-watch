// Handgeschrieben: Hinweise für den GW2↔CQHT-Abgleich (tools/build-gw2-monsters.mjs).
// Zonen, Bosse und Schergen kommen aus js/data/stages.js (Zonen 1–10) und
// tools/data/zones-expansion.json (Entwurf Zonen 11–20) – hier nichts davon doppeln.

// Feste CQHT-Vorlage statt der Zuordnung nach Rang (Name → ID aus dev-data/archiv/cqht-monsters.json)
export const CQHT_OVERRIDES = {};

// Wiki-Seite unter anderem Namen (Spielname → Titel in wiki-de.guildwars2.com).
// Ergebnis zählt als 🟡: Gegner existiert, heißt in der Wiki aber anders.
export const WIKI_HINTS = {
  'Rankenzorn': 'Mordrem-Rankenzorn',
  'Talwächter': 'Tal-Wächter',
  'Gaheron Baelfire': 'Gaheron Baelfeuer',
  'Ruinen von Arah': 'Arah',
};
