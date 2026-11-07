// =====================================================================
//  Fortschritt außerhalb des Kampfes:
//  Bauen (mit Bauzeit), Charr-Schmiede (Laden, Waffenkammer, Ausrüsten),
//  Proviant, Asura-Labor (Forschung)
// =====================================================================
import {
  BUILDINGS, RESEARCH, TIER_LAB, F, WEAPONS, WEAPON_BY_ID, WEAPON_GRADES, SHOP, DROP_GRADES, RATIONS,
  HEROES, HERO_BY_ID, RECRUIT, QUESTS, ONBOARDING, REROLL_RESET_CLOVER,
} from './config.js';
import {
  getHero, heroStats, pay, researchLevel, addLog, buildingCost, buildLock, weaponType, gainExp,
  isOwned, createHero, armoryFree, heroTotalExp,
} from './state.js';

// ---------- Bauen ----------------------------------------------------
export function startBuild(state, key) {
  if (buildLock(state, key)) return false;
  const to = state.buildings[key] + 1;
  if (!pay(state, buildingCost(key, to))) return false;
  const secs = BUILDINGS[key].levels[to - 1].time;
  if (!secs) { finishBuild(state, key, to); return 'done'; }
  state.construction = { key, to, doneAt: state.lastTickMs + secs * 1000 };
  addLog(state, `🔨 ${BUILDINGS[key].name} Stufe ${to} wird gebaut.`, null, 'info');
  return 'started';
}

function finishBuild(state, key, to) {
  state.buildings[key] = to;
  addLog(state, `${BUILDINGS[key].icon} ${BUILDINGS[key].name} ${to === 1 ? 'fertig gebaut' : `auf Stufe ${to} ausgebaut`}.`, null, 'info');
  if (key === 'forge') restockShop(state);
}

// Prüft, ob der Bau fertig ist (now = Spielzeit). Gibt den Bauauftrag zurück.
export function checkConstruction(state, now) {
  const c = state.construction;
  if (!c || now < c.doneAt) return null;
  state.construction = null;
  finishBuild(state, c.key, c.to);
  return c;
}

// ---------- Charr-Schmiede: Waffen ------------------------------------
export const grade = (wid) => WEAPON_GRADES[WEAPON_BY_ID[wid].grade];

function pickWeighted(pool, rnd = Math.random) {
  const total = pool.reduce((n, w) => n + w.weight, 0);
  let r = rnd() * total;
  for (const w of pool) { r -= w.weight; if (r <= 0) return w; }
  return pool[pool.length - 1];
}

export function restockShop(state, manual = false) {
  const pool = WEAPONS.filter(w => w.smithy <= state.buildings.forge);
  if (!pool.length) return;
  state.shop.offers = Array.from({ length: SHOP.offers }, () => pickWeighted(pool).id);
  if (!manual) {
    state.shop.refreshes = 0;
    state.shop.nextRestockMs = state.lastTickMs + SHOP.restockMs;
  }
}

export function checkShop(state, now) {
  if (state.buildings.forge < 1 || now < state.shop.nextRestockMs) return false;
  restockShop(state);
  return true;
}

export const refreshCost = (state) => SHOP.refreshBase * Math.pow(2, state.shop.refreshes);

export function refreshShop(state) {
  if (state.buildings.forge < 1 || !pay(state, { gold: refreshCost(state) })) return false;
  state.shop.refreshes += 1;
  restockShop(state, true);
  return true;
}

// slot: Index im Angebot; currency: 'gold' oder 'rp'
export function buyWeapon(state, slot, currency = 'gold') {
  const wid = state.shop.offers[slot];
  const w = WEAPON_BY_ID[wid];
  if (!w || w[currency] == null || armoryFree(state) < 1) return false;
  if (!pay(state, { [currency]: w[currency] })) return false;
  state.shop.offers.splice(slot, 1);
  state.armory.push(wid);
  addLog(state, `⚒️ ${w.name} (${WEAPON_GRADES[w.grade].name}) gekauft.`, null, 'info');
  return true;
}

export const sellPrice = (wid) => Math.round((WEAPON_BY_ID[wid].gold || 0) * SHOP.sellFactor);

export function sellWeapon(state, index) {
  const wid = state.armory[index];
  if (!wid) return false;
  state.armory.splice(index, 1);
  state.gold += sellPrice(wid);
  return true;
}

// Mehrere Waffen auf einmal verkaufen (Indizes in der Waffenkammer); gibt das Gold zurück
export function sellWeapons(state, indices) {
  const drop = new Set(indices.filter(k => state.armory[k]));
  let gold = 0;
  for (const k of drop) gold += sellPrice(state.armory[k]);
  state.armory = state.armory.filter((_, k) => !drop.has(k));
  state.gold += gold;
  return { count: drop.size, gold };
}

// Waffen, die für einen Helden besser wären als seine jetzige (höhere Güte).
// Je Held höchstens eine, die beste – diese schützt „Aufräumen“. Ergebnis: Index → Held
export function upgradeIndices(state) {
  const out = new Map();
  const heroes = [...state.heroes].sort((a, b) => b.level - a.level);
  for (const h of heroes) {
    const cur = h.weapon ? WEAPON_BY_ID[h.weapon].grade : 0;
    let best = -1;
    state.armory.forEach((wid, k) => {
      if (out.has(k) || !fitsHero(h, wid) || WEAPON_BY_ID[wid].grade <= cur) return;
      if (best < 0 || WEAPON_BY_ID[wid].grade > WEAPON_BY_ID[state.armory[best]].grade) best = k;
    });
    if (best >= 0) out.set(best, h);
  }
  return out;
}

export const fitsHero = (hero, wid) => WEAPON_BY_ID[wid].type === weaponType(hero);

// Waffe aus der Waffenkammer (Index) anlegen; die alte wandert zurück
export function equipWeapon(state, uid, index) {
  const h = getHero(state, uid);
  const wid = state.armory[index];
  if (!h || !wid || !fitsHero(h, wid)) return false;
  const oldMax = heroStats(state, h).maxHp;
  state.armory.splice(index, 1);
  if (h.weapon) state.armory.push(h.weapon);
  h.weapon = wid;
  if (!h.woundedUntil) h.hp = Math.max(1, h.hp + heroStats(state, h).maxHp - oldMax);
  return true;
}

export function unequipWeapon(state, uid) {
  const h = getHero(state, uid);
  if (!h || !h.weapon || armoryFree(state) < 1) return false;
  state.armory.push(h.weapon);
  h.weapon = null;
  h.hp = Math.min(h.hp, heroStats(state, h).maxHp);
  return true;
}

// Boss-Drop: Güte nach Zonen-tier (schwer/legendär: höchste Güten).
// Ist die Waffenkammer voll, bleibt der Rest liegen (lost).
export function dropWeapons(state, tier, hard, count) {
  const [lo, hi] = hard ? DROP_GRADES.hard : DROP_GRADES[tier];
  const pool = WEAPONS.filter(w => w.grade >= lo && w.grade <= hi);
  const got = [];
  let lost = 0;
  for (let i = 0; i < count; i++) {
    if (armoryFree(state) < 1) { lost += 1; continue; }
    const w = pickWeighted(pool);
    state.armory.push(w.id);
    got.push(w);
  }
  return { got, lost };
}

// ---------- Gildenhalle: Rekrutierung --------------------------------
// Aktuelle Angebots-Stufe nach Gildenhalle (null = noch keine Rekrutierung)
export function recruitTier(state) {
  let t = null;
  for (const x of RECRUIT.tiers) if (state.buildings.hall >= x.hall) t = x;
  return t;
}

// Helden, die (noch) nicht angeboten werden: schon im Lager, schon in der Liste,
// oder als kostenloser Rekrut fürs Onboarding bzw. einen offenen Auftrag vorgesehen.
function recruitPool(state) {
  const done = new Set(state.questsDone || []);
  const reserved = new Set([ONBOARDING.tank,
    ...QUESTS.filter(q => q.goal.type === 'freeHero' && !done.has(q.id)).map(q => q.goal.hero)]);
  const offered = new Set(state.recruits.offers.map(o => o.heroId));
  return HEROES.filter(d => !isOwned(state, d.id) && !offered.has(d.id) && !reserved.has(d.id));
}

// Würfel-Gewichte der Seltenheiten für die aktuelle Gildenhallen-Stufe ({ Seltenheit: % })
export function recruitOdds(state) {
  let o = RECRUIT.odds[0];
  for (const x of RECRUIT.odds) if (state.buildings.hall >= x.hall) o = x;
  return o.w;
}

function rollRarity(state, rnd = Math.random) {
  const pool = Object.entries(recruitOdds(state)).filter(([, w]) => w > 0).map(([r, w]) => ({ r: Number(r), weight: w }));
  return pickWeighted(pool, rnd).r;
}

function addRecruitOffers(state, n) {
  for (let i = 0; i < n; i++) {
    const pool = recruitPool(state);
    if (!pool.length) return;
    const d = pool[Math.floor(Math.random() * pool.length)];
    state.recruits.offers.push({ heroId: d.id, rarity: rollRarity(state) });
  }
}

export function restockRecruits(state, now, manual = false) {
  const t = recruitTier(state);
  if (!t) return;
  state.recruits.offers = [];
  addRecruitOffers(state, t.slots);
  state.recruits.slots = t.slots;
  if (!manual) {
    state.recruits.refreshes = 0;
    state.recruits.nextRestockMs = now + t.restockMin * 60_000;
  }
}

// Läuft jeden Tick: Nachschub nach Timer; nach einem Gildenhallen-Ausbau kommen die neuen Plätze sofort dazu.
export function checkRecruits(state, now) {
  const t = recruitTier(state);
  if (!t) return false;
  if (now >= state.recruits.nextRestockMs) { restockRecruits(state, now); return true; }
  if (t.slots > state.recruits.slots) {
    addRecruitOffers(state, t.slots - state.recruits.slots);
    state.recruits.slots = t.slots;
    return true;
  }
  return false;
}

export const recruitRefreshCost = (state) => RECRUIT.refreshBase * Math.pow(2, state.recruits.refreshes);

export function refreshRecruits(state) {
  if (!recruitTier(state) || !pay(state, { gold: recruitRefreshCost(state) })) return false;
  state.recruits.refreshes += 1;
  restockRecruits(state, state.lastTickMs, true);
  return true;
}

export const recruitCost = (rarity) => RECRUIT.rarities[rarity].cost;

// Angebot anwerben → neuer Held (oder null). Das Angebot verschwindet aus der Liste.
export function hireRecruit(state, slot) {
  const o = state.recruits.offers[slot];
  if (!o || !HERO_BY_ID[o.heroId] || isOwned(state, o.heroId)) return null;
  if (!pay(state, { gold: recruitCost(o.rarity) })) return null;
  state.recruits.offers.splice(slot, 1);
  return createHero(state, o.heroId, o.rarity);
}

// ---------- Würfel-Preis zurücksetzen (🍀) ------------------------------
// which: 'shop' (Waffenladen) oder 'recruits' (Rekruten). Nur wenn schon erneuert wurde.
export function resetRerollCost(state, which) {
  const box = which === 'shop' ? state.shop : which === 'recruits' ? state.recruits : null;
  if (!box || box.refreshes < 1 || !pay(state, { clover: REROLL_RESET_CLOVER })) return false;
  box.refreshes = 0;
  return true;
}

// ---------- Proviant (CQHT Bread) --------------------------------------
export function feedRation(state, uid, g) {
  const h = getHero(state, uid);
  if (!h || state.rations[g] < 1) return false;
  state.rations[g] -= 1;
  state.stats.rationsFed = (state.stats.rationsFed || 0) + 1;
  const before = heroTotalExp(h);
  gainExp(state, h, RATIONS[g].exp);
  h.fedExp = (h.fedExp || 0) + Math.max(0, heroTotalExp(h) - before); // #046
  return true;
}

// ---------- Asura-Labor ----------------------------------------------
export function researchInfo(state, treeKey, nodeKey) {
  const node = RESEARCH[treeKey].nodes[nodeKey];
  const lvl = researchLevel(state, nodeKey);
  const to = lvl + 1;
  const cost = F.researchCost(node.base, to);
  let reason = '';
  if (lvl >= node.max) reason = 'Maximal';
  else if (state.buildings.lab < TIER_LAB[node.tier]) reason = `Asura-Labor Stufe ${TIER_LAB[node.tier]}`;
  else if (node.req && researchLevel(state, node.req[0]) < node.req[1]) {
    reason = `${RESEARCH[treeKey].nodes[node.req[0]].name} Stufe ${node.req[1]}`;
  }
  return { node, lvl, to, cost, reason, ok: !reason && state.rp >= cost };
}

export function doResearch(state, treeKey, nodeKey) {
  const info = researchInfo(state, treeKey, nodeKey);
  if (!info.ok) return false;
  state.rp -= info.cost;
  state.research[nodeKey] = info.to;
  addLog(state, `🔬 Forschung: ${info.node.name} Stufe ${info.to}.`, null, 'info');
  return true;
}
