// =====================================================================
//  Boss-Simulation (#047): Welches Helden-Level braucht ein Trupp, um den
//  Boss jeder Stufe im Zeitlimit zu besiegen?
//
//  node tools/sim-bosses.mjs [runs] [--team h01,h02,h04] [--hard] [--hard-scale X]
//  --hard: nur schwere/legendäre Stufen · --normal: nur normale · --hard-scale: Zuschlag der normalen Lv.-60-Stufen testweise × X statt COMBAT.ENDGAME_DIFF_SCALE
//
//  Nutzt die echte Kampflogik (combat.js / state.js). Ein Trupp aus drei
//  Helden (Standard: Tank, Heiler, Schaden) kämpft frisch gegen den Boss.
//  „Mindest-Level“ = kleinstes Level, bei dem ≥ 80 % der Versuche gewinnen.
//  Drei Ausbau-Profile: einfach, mittel, maximal (Seltenheit, Waffe,
//  Forschung, Mystische Schmiede).
// =====================================================================
globalThis.localStorage = { getItem: () => null, setItem() {}, removeItem() {} };

const C = await import('../js/config.js');
const S = await import('../js/state.js');
const K = await import('../js/combat.js');

const args = process.argv.slice(2);
const RUNS = Number(args[0]) || 10;
const teamArg = args[args.indexOf('--team') + 1];
const TEAM = args.includes('--team') && teamArg ? teamArg.split(',') : ['h01', 'h02', 'h04'];
const WIN_RATE = 0.8;
// --hard-scale X: ersetzt COMBAT.ENDGAME_DIFF_SCALE testweise (Zuschlag der Lv.-60-Stufen)
const hsArg = args.includes('--hard-scale') ? Number(args[args.indexOf('--hard-scale') + 1]) : null;
const ONLY_HARD = args.includes('--hard');
const ONLY_NORMAL = args.includes('--normal');
if (hsArg != null) for (const z of C.ZONES) for (const st of z.stages) {
  if (st.level >= 60 && !st.hard) st.d = 60 * C.COMBAT.LEVEL_DIFF + (st.cost - 1000) / 500 * hsArg;
}

const PROFILES = {
  einfach: { rarity: 2, weapon: 2, research: 0, mystic: 0 },
  mittel:  { rarity: 4, weapon: 4, research: 0.5, mystic: 2 },
  maxT4:   { rarity: 6, weapon: 4, research: 1, mystic: 5 }, // alles maximal, aber nur T4-Waffe
  maxT5:   { rarity: 6, weapon: 5, research: 1, mystic: 5 },
  maximal: { rarity: 6, weapon: 6, research: 1, mystic: 5 },
};

function makeState(profile, level) {
  const st = S.createNewState(0);
  Object.assign(st.buildings, { hall: 9, camp: C.BUILDINGS.camp.levels.length, portal: 4, lab: 10, forge: 3, kitchen: 0 });
  st.onboarding = 5;
  for (const tree of Object.values(C.RESEARCH)) {
    for (const [k, n] of Object.entries(tree.nodes)) st.research[k] = Math.round(n.max * profile.research);
  }
  for (const k of C.MYSTIC_ORDER) st.mystic[k] = profile.mystic;
  const sq = st.squads[0];
  TEAM.forEach((id, i) => {
    const h = S.createHero(st, id, profile.rarity);
    h.level = level;
    const w = C.WEAPONS.find(x => x.type === S.weaponType(h) && x.grade === profile.weapon);
    h.weapon = w ? w.id : null;
    h.hp = S.heroStats(st, h).maxHp;
    sq.slots[i] = h.uid;
  });
  return st;
}

// Ein Bosskampf: true = Sieg im Zeitlimit
function fight(profile, level, zone, stage) {
  const st = makeState(profile, level);
  const sq = st.squads[0];
  for (let z = 1; z < zone; z++) st.progress[z] = C.ZONES[z - 1].stages.length;
  st.progress[zone] = stage - 1;
  Object.assign(sq, { zone, stage, mode: 'boss', status: 'fighting', bossTime: 0 });
  K.spawnMonster(st, sq);
  const ticks = (C.COMBAT.BOSS_TIME_LIMIT + 5) * 1000 / C.GAME.TICK_MS;
  for (let t = 0; t < ticks; t++) {
    K.tick(st);
    if ((st.progress[zone] || 0) >= stage) return true;
    if (sq.mode !== 'boss') return false;
  }
  return false;
}

function minLevel(profile, zone, stage) {
  const rate = (L) => { let w = 0; for (let r = 0; r < RUNS; r++) if (fight(profile, L, zone, stage)) w++; return w / RUNS; };
  if (rate(C.LEVEL_CAP_MAX) < WIN_RATE) return null;
  let lo = 1, hi = C.LEVEL_CAP_MAX; // binäre Suche (Siegrate steigt mit dem Level)
  while (lo < hi) {
    const mid = (lo + hi) >> 1;
    if (rate(mid) >= WIN_RATE) hi = mid; else lo = mid + 1;
  }
  return lo;
}

const names = Object.keys(PROFILES);
console.log(`Trupp: ${TEAM.map(id => C.HERO_BY_ID[id].name + ' (' + C.HERO_BY_ID[id].role + ')').join(', ')} · ${RUNS} Versuche je Level, Sieg ≥ ${WIN_RATE * 100} %`);
console.log(['Zone', 'Stufe', 'Art', 'Lv.', 'd', ...names.map(n => `min. ${n}`)].join('\t'));
for (const z of C.ZONES) {
  for (const s of z.stages) {
    if (ONLY_HARD && !s.hard) continue;
    if (ONLY_NORMAL && s.hard) continue;
    const kind = s.legend ? 'legendär' : s.hard ? 'schwer' : 'normal';
    const res = names.map(n => minLevel(PROFILES[n], z.id, s.index) ?? '>60');
    console.log([z.id, s.index, kind, s.level, s.d.toFixed(1), ...res].join('\t'));
  }
}
