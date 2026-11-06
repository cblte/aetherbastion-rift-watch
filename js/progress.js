// =====================================================================
//  Fortschritt außerhalb des Kampfes:
//  Bauen (mit Bauzeit), Charr-Schmiede (Laden, Waffenkammer, Ausrüsten),
//  Proviant, Asura-Labor (Forschung)
// =====================================================================
import {
  BUILDINGS, RESEARCH, TIER_LAB, F, WEAPONS, WEAPON_BY_ID, WEAPON_GRADES, SHOP, DROP_GRADES, RATIONS,
} from './config.js';
import {
  getHero, heroStats, pay, researchLevel, addLog, buildingCost, buildLock, weaponType, gainExp,
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
  if (!w || w[currency] == null) return false;
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
  if (!h || !h.weapon) return false;
  state.armory.push(h.weapon);
  h.weapon = null;
  h.hp = Math.min(h.hp, heroStats(state, h).maxHp);
  return true;
}

// Boss-Drop: Güte nach Zonen-tier (schwer/legendär: höchste Güten)
export function dropWeapons(state, tier, hard, count) {
  const [lo, hi] = hard ? DROP_GRADES.hard : DROP_GRADES[tier];
  const pool = WEAPONS.filter(w => w.grade >= lo && w.grade <= hi);
  const got = [];
  for (let i = 0; i < count; i++) {
    const w = pickWeighted(pool);
    state.armory.push(w.id);
    got.push(w);
  }
  return got;
}

// ---------- Proviant (CQHT Bread) --------------------------------------
export function feedRation(state, uid, g) {
  const h = getHero(state, uid);
  if (!h || state.rations[g] < 1) return false;
  state.rations[g] -= 1;
  gainExp(state, h, RATIONS[g].exp);
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
