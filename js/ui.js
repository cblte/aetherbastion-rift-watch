// =====================================================================
//  UI: Rendering, Navigation, Eingaben
//  Prinzip: Jede Ansicht erzeugt HTML-Strings; ein Bereich wird nur neu
//  gesetzt, wenn sich sein HTML geändert hat. Solange ein Finger auf dem
//  Bildschirm liegt, wird nicht neu gerendert (keine verlorenen Taps).
// =====================================================================
import {
  GAME, CURRENCIES, ROLES, CLASSES, HEROES, HERO_BY_ID, ZONES, COMBAT, F, BUILDINGS, BUILDING_ORDER,
  TENTS, TENT_SIZE, MYSTIC, MYSTIC_ORDER, ONBOARDING, RETIRE_MIN_LEVEL, LEVEL_CAP_MAX, FEATURES,
  RESEARCH, RESEARCH_ORDER, TIER_LAB, WEAPON_BY_ID, WEAPON_GRADES, WEAPON_TYPES, RATIONS, NORMAL_STAGES,
  TOTAL_NORMAL, CYCLE_MS, QUESTS as MAIN_QUESTS, RECRUIT, REROLL_RESET_CLOVER,
} from './config.js';
import { currentQuest, questProgress, questNumber, claimQuest, questDone } from './quests.js';
import { manualChapters } from './manual.js';
import {
  createNewState, exportSave, importSave, replaceState, getHero, heroStats, levelCap,
  activeHeroCount, reserveHeroes, isOwned, rarityBonus, isZoneAvailable, isStageAvailable, stageBeaten,
  stageLock, buildingCost, buildLock, canAfford, pay, createHero, addLog, squadOf, buildingUnlocked,
  featureUnlocked, normalCleared, hallGold, weaponType,
} from './state.js';
import {
  squadMembers, spawnMonster, setStage, reviveHero, assignHero, teamProfile, heroOutput, fmt, stageOf,
  challengeBoss, canChallengeBoss, abortBoss, bossCost, bossCooldownLeft, toggleAutoBoss,
} from './combat.js';
import {
  researchInfo, doResearch, startBuild, refreshShop, refreshCost, buyWeapon, sellWeapon, sellPrice,
  equipWeapon, unequipWeapon, fitsHero, feedRation,
  recruitTier, recruitRefreshCost, refreshRecruits, recruitCost, hireRecruit, resetRerollCost, recruitOdds,
} from './progress.js';
import { runOffline } from './offline.js';

let S = null;
let hooks = {};
let tab = 'portal';
let viewZone = 1;           // welche Zone in der Stufenauswahl gezeigt wird
let pointerDown = false;
let pendingRender = false;
let pointerTimer = 0;
let suppressClickUntil = 0; // nach einem Wischen keinen Tipp auslösen

const $ = (sel, root = document) => root.querySelector(sel);
const esc = (s) => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

function setHTML(el, html) {
  if (!el || el.__html === html) return;
  el.innerHTML = html;
  el.__html = html;
}

// ---------------------------------------------------------------------
//  Init
// ---------------------------------------------------------------------
export function initUI(state, h) {
  S = state;
  hooks = h;
  viewZone = S.squads[S.selectedSquad].zone;
  const app = $('#app');

  const down = () => {
    pointerDown = true;
    clearTimeout(pointerTimer);
    pointerTimer = setTimeout(up, 1500); // Sicherheitsnetz
  };
  const up = () => {
    pointerDown = false;
    clearTimeout(pointerTimer);
    if (pendingRender) { pendingRender = false; requestAnimationFrame(() => render()); }
  };
  document.addEventListener('pointerdown', down, true);
  document.addEventListener('pointerup', up, true);
  document.addEventListener('pointercancel', up, true);

  $('#build-info').textContent = versionText();
  app.addEventListener('click', onClick);
  setupSwipe();
  render();
}

// ---------------------------------------------------------------------
//  Render
// ---------------------------------------------------------------------
export function render() {
  if (!S) return;
  if (pointerDown) { pendingRender = true; return; }
  renderHud();
  renderQuest();
  renderView();
  if (modalRefresh) modalRefresh(); // offenes Helden-/Zelt-Modal live aktualisieren
  $('#app').dataset.tab = tab; // Akzentfarbe je Reiter (CSS)
  const goal = goalTab();
  let shown = 0;
  for (const b of document.querySelectorAll('#tabs [data-tab]')) {
    const t = b.dataset.tab;
    const vis = tabVisible(t);
    b.hidden = !vis;
    if (vis) shown++;
    b.classList.toggle('active', t === tab);
    b.setAttribute('aria-selected', t === tab);
    b.classList.toggle('goal', t === goal && t !== tab);
    const lock = (t === 'lab' && S.buildings.lab < 1) || (t === 'forge' && S.buildings.forge < 1 && !featureUnlocked(S, 'mystic'));
    b.classList.toggle('locked', lock);
  }
  $('#tabs').style.setProperty('--n', Math.max(1, shown));
}

function renderHud() {
  $('#hud-gold').textContent = fmt(S.gold);
  $('#hud-shards').textContent = fmt(S.shards);
  $('#hud-clover').textContent = fmt(S.clover);
  $('#hud-rp').textContent = fmt(S.rp);
  $('#hud-rp-chip').hidden = S.buildings.lab < 1 && S.rp < 1;
  $('#hud-cap').textContent = `${levelCap(S)}/${LEVEL_CAP_MAX}`;
  $('#hud-heroes').textContent = `${activeHeroCount(S)}/${TENTS.length * TENT_SIZE}`;
}

// ---------- Onboarding ------------------------------------------------
// Das Banner führt nur hin („Hingehen“); ausgelöst wird der Schritt auf der Seite selbst.
// tab = Reiter des Schritts · key = Gebäudekarte im Lager, die den Schritt auslöst (btn = ihr Knopf)
const QUESTS = [
  null,
  { icon: '🏛️', tab: 'camp', key: 'hall', text: 'Errichte die <b>Gildenhalle</b>.', btn: 'Errichten', action: 'ob-hall' },
  { icon: '⛺', tab: 'camp', key: 'camp', text: 'Schlage dein <b>erstes Zelt</b> auf. Hier wohnen deine Helden.', btn: 'Aufschlagen', action: 'ob-camp' },
  { icon: '🛡️', tab: 'squads', text: () => `Nimm <b>${esc(HERO_BY_ID[ONBOARDING.tank].name)}</b> als ersten Helden in Zelt 1 auf. Als Tank steht dieser Held vorn.`, action: 'ob-recruit' },
  { icon: '🌀', tab: 'camp', key: 'portal', text: 'Aktiviere das <b>Riss-Portal</b> im Lager. Dann beginnt der erste Kampf.', btn: 'Aktivieren', action: 'ob-finish' },
];

// Onboarding und Aufträge zählen durchgehend: Auftrag 1–4 = Onboarding, danach QUESTS aus config.js
const OB_STEPS = QUESTS.length - 1;
const questTotal = () => OB_STEPS + MAIN_QUESTS.length;

// Reiter erscheinen erst, wenn das Tutorial sie braucht (Wert = Onboarding-Schritt).
// Labor und Schmiede zusätzlich erst, wenn sie gebaut sind (Schmiede auch mit Mystischer Schmiede).
const TAB_FROM = { camp: 1, squads: 3, portal: 5, inv: 5, lab: 5, forge: 5 };
const tabVisible = (t) => S.onboarding >= TAB_FROM[t]
  && (t !== 'lab' || S.buildings.lab >= 1)
  && (t !== 'forge' || S.buildings.forge >= 1 || featureUnlocked(S, 'mystic'));

// Reiter, in dem es gerade weitergeht (bekommt einen Punkt in der Navigation)
function goalTab() {
  const step = QUESTS[S.onboarding];
  if (step) return step.tab;
  const q = currentQuest(S);
  if (!q || questDone(S, q)) return null;
  return q.tab || null;
}

// Stufen-Auftrag: nächste zu besiegende Stufe { zone, stage } oder null
function questStageTarget() {
  const q = currentQuest(S);
  if (!q || q.goal.type !== 'stage' || questDone(S, q)) return null;
  return { zone: q.goal.zone, stage: Math.min((S.progress[q.goal.zone] || 0) + 1, q.goal.stage) };
}

function renderQuest() {
  const q = $('#quest');
  $('#start-overlay').hidden = S.onboarding !== 0;
  const step = QUESTS[S.onboarding];
  if (!step) { renderMainQuest(q); return; }
  q.hidden = false;
  const text = typeof step.text === 'function' ? step.text() : step.text;
  setHTML(q, `
    <div class="quest-step">Auftrag ${S.onboarding}/${questTotal()}</div>
    <div class="quest-body"><span class="quest-icon">${step.icon}</span><p>${text}</p></div>
    ${tab !== step.tab ? `<button class="btn primary block" data-action="tab" data-tab="${step.tab}">Hingehen</button>` : ''}`);
}

const versionText = () => `v${GAME.VERSION} · Build ${GAME.BUILD}`;

// Aufträge nach dem Onboarding
const rewardText = (r) => Object.entries(r).map(([k, v]) => `+${fmt(v)} ${CURRENCIES[k].icon}`).join(' ');
function renderMainQuest(q) {
  const quest = currentQuest(S);
  if (!quest) { q.hidden = true; setHTML(q, ''); return; }
  q.hidden = false;
  const { have, need } = questProgress(S, quest);
  const done = have >= need;
  // Das Banner führt nur hin; aufgenommen/gebaut wird auf der Seite selbst (nur Belohnungen holt man hier ab)
  const btn = done
    ? `<button class="btn primary block" data-action="quest-claim">${Object.keys(quest.reward).length ? `Belohnung abholen · ${rewardText(quest.reward)}` : 'Weiter'}</button>`
    : quest.tab && quest.tab !== tab ? `<button class="btn block" data-action="tab" data-tab="${quest.tab}">Hingehen</button>` : '';
  const target = questStageTarget();
  const targetLine = target
    ? `<div class="quest-target">🎯 ${esc(ZONES[target.zone - 1].name)} · Stufe ${target.stage}</div>` : '';
  setHTML(q, `
    <div class="quest-step">Auftrag ${OB_STEPS + questNumber(quest)}/${questTotal()}${done ? ' · erfüllt ✓' : ''}</div>
    <div class="quest-body"><span class="quest-icon">${quest.icon}</span><p><b>${esc(quest.title)}</b><br>${esc(quest.text)}</p></div>
    ${targetLine}
    ${quest.goal.type === 'freeHero' ? '' : `<div class="quest-progress"><span style="width:${Math.round(have / need * 100)}%"></span><small>${fmt(have)}/${fmt(need)} · ${rewardText(quest.reward)}</small></div>`}
    ${btn}`);
}

// ---------- Ansichten -------------------------------------------------
const SKELETONS = {
  portal: `
    <section class="arena-wrap" id="arena-wrap"><div id="arena"></div><div id="arena-fx" aria-hidden="true"></div></section>
    <section id="boss-bar"></section>
    <section id="squad-cards" class="squad-cards"></section>
    <h2 class="sec">Riss-Zonen & Stufen <small id="zone-for"></small></h2>
    <section id="zone-tabs" class="zone-tabs"></section>
    <section id="stages" class="stages"></section>
    <section id="portal-up"></section>
    <h2 class="sec">Kampf-Chronik</h2>
    <ol id="chronicle" class="chronicle"></ol>`,
  camp: `<h2 class="sec">Gildenlager</h2><section id="camp-stats"></section><section id="buildings"></section>`,
  inv: `<h2 class="sec">🎒 Inventar</h2><section id="inventory"></section>`,
  squads: `<h2 class="sec">Zelte</h2><section id="tents"></section>
    <div id="squads-more"><h2 class="sec">Reserve</h2><section id="reserve"></section>
    <h2 class="sec">Rekrutieren</h2><section id="recruit"></section></div>`,
  lab: `<h2 class="sec">🔬 Asura-Labor</h2><section id="lab"></section>`,
  forge: `<h2 class="sec">⚒️ Charr-Schmiede</h2><section id="weapons"></section>
    <h2 class="sec">✨ Mystische Schmiede</h2><section id="mystic"></section>`,
};

function renderView() {
  if (!tabVisible(tab)) tab = QUESTS[S.onboarding]?.tab || 'camp';
  const view = $('#view');
  if (view.dataset.tab !== tab) {
    view.innerHTML = SKELETONS[tab];
    view.dataset.tab = tab;
    view.scrollTop = 0;
  }
  ({ portal: renderPortal, camp: renderCamp, squads: renderSquads, inv: renderInventory, lab: renderLab, forge: renderForge })[tab]();
}

// ---------- Bausteine -------------------------------------------------
function sprite(tag, extra = '') {
  return `<div class="sprite ${extra}"><span>[SPRITE: ${tag}]</span></div>`;
}

function hpBar(cur, max, cls = '') {
  const pct = max > 0 ? Math.max(0, Math.min(100, (cur / max) * 100)) : 0;
  return `<div class="bar ${cls}"><i style="width:${pct.toFixed(1)}%"></i></div>`;
}

function pips(lvl, max) {
  return `<div class="pips">${Array.from({ length: max }, (_, j) => `<i class="${j < lvl ? 'on' : ''}"></i>`).join('')}</div>`;
}

const clock = (ms) => {
  const s = Math.max(0, Math.ceil(ms / 1000));
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
};

function costText(cost) {
  return Object.entries(cost).map(([c, v]) => `${CURRENCIES[c].icon} ${fmt(v)}`).join(' · ');
}

const range = ([a, b]) => (a === b ? `${a}` : `${a}–${b}`);
const stageLabel = (sq) => `${ZONES[sq.zone - 1].name} · Stufe ${sq.stage}`;

function lockedCard(icon, title, text) {
  return `<div class="card locked-card"><div class="b-icon">${icon}</div><div><b>${title}</b><div class="muted small">${text}</div></div></div>`;
}

// ---------- Portal ----------------------------------------------------
let lastHit = { squad: -1, monsterId: -1, t: 0 };

function renderPortal() {
  const i = S.selectedSquad;
  const sq = S.squads[i];
  const locked = i >= S.tentsUnlocked;
  const st = stageOf(sq.zone, sq.stage);
  let stage;

  if (locked) {
    stage = `<div class="stage-msg">🔒 Zelt ${i + 1} ist noch nicht aufgeschlagen.<br><small>Gildenhalle Stufe ${TENTS[i].hall} · ${fmt(TENTS[i].gold)} 🟡</small></div>`;
  } else if (S.buildings.portal < 1) {
    stage = `<div class="stage-msg">🌀 Das Riss-Portal ist noch nicht aktiv.<br><small>Folge der Quest oben.</small></div>`;
  } else if (!sq.slots.some(u => u != null)) {
    stage = `<div class="stage-msg">⛺ Dieses Zelt ist leer.<br><button class="btn" data-action="tab" data-tab="squads">Helden einteilen</button></div>`;
  } else if (sq.status === 'retreat') {
    const left = Math.max(0, Math.min(...squadMembers(S, sq).map(h => (h.woundedUntil || 0) - S.lastTickMs)));
    stage = `<div class="stage-msg retreat">🏕️ Rückzug ins Lager<br><small>Rückkehr in ${clock(left)}</small></div>`;
  } else if (sq.monster) {
    const m = sq.monster;
    const hit = lastHit.squad === i && lastHit.monsterId === m.id && S.lastTickMs - lastHit.t <= 1000;
    stage = `
      <div class="mob ${m.boss ? 'boss' : ''}">
        ${sprite(m.sprite, `mob-sprite ${hit ? 'hit' : ''}`)}
        <div class="mob-info">
          <div class="mob-name">${m.boss ? '👑 ' : ''}${esc(m.name)}</div>
          ${hpBar(m.hp, m.maxHp, 'mob-hp')}
          <div class="mob-nums">${fmt(Math.max(0, m.hp))} / ${fmt(m.maxHp)} LP · ⚔️ ${fmt(m.atk)}</div>
          ${m.boss ? `<div class="boss-timer">⌛ noch ${Math.max(0, COMBAT.BOSS_TIME_LIMIT - sq.bossTicks)} s</div>` : ''}
        </div>
      </div>`;
  } else {
    stage = `<div class="stage-msg">Der Trupp sammelt sich …</div>`;
  }

  const heroes = locked ? '' : sq.slots.map((uid, slot) => {
    const h = uid != null ? getHero(S, uid) : null;
    if (!h) return `<button class="arena-hero empty" data-action="slot" data-squad="${i}" data-slot="${slot}"><span>＋</span><small>frei</small></button>`;
    const hs = heroStats(S, h);
    const def = hs.def;
    const wounded = !!h.woundedUntil;
    return `
      <button class="arena-hero ${wounded ? 'wounded' : ''}" style="--c:${WEAPON_GRADES[h.rarity].color}" data-action="slot" data-squad="${i}" data-slot="${slot}">
        ${sprite(CLASSES[def.cls].sprite, 'hero-sprite')}
        <div class="ah-name">${ROLES[def.role].icon} ${esc(def.name)}</div>
        <div class="ah-lv">Lv. ${h.level}${h.weapon ? ` · ★${WEAPON_BY_ID[h.weapon].grade}` : ''}</div>
        ${hpBar(h.hp, hs.maxHp, 'hero-hp')}
        ${hpBar(h.exp, F.expToNext(h.level), 'exp')}
        <div class="ah-status">${wounded ? `💢 ${clock(h.woundedUntil - S.lastTickMs)}` : sq.status === 'fighting' ? 'Kämpft' : 'Bereit'}</div>
      </button>`;
  }).join('');

  setHTML($('#arena'), `
    <div class="arena-head">
      <button class="icon-btn" data-action="squad-step" data-dir="-1" aria-label="Vorheriger Trupp">‹</button>
      <div class="arena-title"><b>⛺ Zelt ${i + 1}</b><small>${locked ? 'gesperrt' : `${esc(stageLabel(sq))}${sq.mode === 'boss' ? ' · 👑 Boss' : ''}`}</small></div>
      <button class="icon-btn" data-action="squad-step" data-dir="1" aria-label="Nächster Trupp">›</button>
    </div>
    <div class="stage zone-${ZONES[sq.zone - 1].theme || ZONES[sq.zone - 1].tier}">${stage}</div>
    <div class="arena-heroes">${heroes}</div>`);

  // Boss-Leiste
  let bossBar = '';
  if (!locked && S.onboarding >= 5 && sq.slots.some(u => u != null)) {
    const beaten = stageBeaten(S, sq.zone, sq.stage);
    if (sq.mode === 'boss') {
      bossBar = `<div class="card boss-card active">
        <div><b>👑 ${esc(st.boss.name)}</b><div class="muted small">Herausforderung läuft – noch ${Math.max(0, COMBAT.BOSS_TIME_LIMIT - sq.bossTicks)} s.${sq.autoBoss ? '<br>🔁 Wird danach automatisch wiederholt.' : ''}</div></div>
        <button class="btn" data-action="boss-abort">Abbrechen</button></div>`;
    } else {
      const can = canChallengeBoss(S, i);
      const cost = bossCost(S, i);
      const cd = bossCooldownLeft(S, i);
      const r = st.rewards;
      const tg = questStageTarget();
      const isGoal = tg && tg.zone === sq.zone && tg.stage === sq.stage;
      const nextTxt = sq.stage === NORMAL_STAGES ? 'die nächste Zone' : sq.stage < ZONES[sq.zone - 1].stages.length ? `Stufe ${sq.stage + 1}` : '';
      bossBar = `<div class="card boss-card ${beaten ? '' : 'fresh'}">
        <div><b>👑 ${esc(st.boss.name)}</b> <span class="lv">Lv. ${st.level}</span>
          <div class="muted small">${beaten ? 'Schon besiegt – lohnt sich erneut.' : nextTxt ? `Sieg öffnet ${nextTxt}.` : 'Letzte Stufe.'}</div>
          <div class="reward-line">📜 ${range(r.rp)} · ⚒️ ${r.weapons} Waffe${r.weapons > 1 ? 'n' : ''} · 🍞 ${r.rations}${r.tickets[1] ? ` · 🎟️ ${range(r.tickets)}` : ''}</div></div>
        <div class="btn-col tight">
          <button class="btn ${beaten ? '' : 'primary'} ${isGoal ? 'goal' : ''}" data-action="boss" ${can && S.gold >= cost ? '' : 'disabled'}>Herausfordern<small>${cd ? `⏳ ${clock(cd)}` : `🟡 ${fmt(cost)}`}</small></button>
          <button class="btn ${sq.autoBoss ? 'primary' : ''}" data-action="boss-auto" aria-pressed="${sq.autoBoss}">🔁 Auto ${sq.autoBoss ? 'an' : 'aus'}</button>
        </div></div>
        ${sq.autoBoss && !cd && S.gold < cost ? '<div class="muted small">🔁 Wartet auf genug Gold.</div>' : ''}`;
    }
  }
  setHTML($('#boss-bar'), bossBar);

  // Trupp-Karten
  setHTML($('#squad-cards'), S.squads.map((q, k) => {
    if (k >= S.tentsUnlocked) {
      return `<button class="sq-card locked ${k === i ? 'sel' : ''}" data-action="select-squad" data-squad="${k}">
        <b>🔒 ${k + 1}</b><small>GH ${TENTS[k].hall}</small></button>`;
    }
    const n = q.slots.filter(u => u != null).length;
    const status = (!n ? '💤 leer' : q.status === 'retreat' ? '🏕️ Rückzug' : q.mode === 'boss' ? '👑 Boss' : q.status === 'fighting' ? '⚔️ Kampf' : '⏸️') + (n && q.autoBoss ? ' 🔁' : '');
    return `<button class="sq-card ${k === i ? 'sel' : ''}" data-action="select-squad" data-squad="${k}">
      <b>⛺ ${k + 1}</b><small>${ZONES[q.zone - 1].short}</small><small>Stufe ${q.stage}</small><small>${status}</small></button>`;
  }).join(''));

  // Zonen-Reiter
  $('#zone-for').textContent = `für Zelt ${i + 1}`;
  setHTML($('#zone-tabs'), ZONES.map(z => {
    const avail = isZoneAvailable(S, z.id);
    const done = (S.progress[z.id] || 0) >= NORMAL_STAGES;
    return `<button class="zone-tab ${viewZone === z.id ? 'sel' : ''} ${avail ? '' : 'locked'}" data-action="view-zone" data-zone="${z.id}">
      <b>${avail ? z.id : '🔒'}</b><small>${z.short}${done ? ' ✓' : ''}</small></button>`;
  }).join(''));

  // Stufen der angezeigten Zone
  const z = ZONES[viewZone - 1];
  let stagesHtml;
  if (!isZoneAvailable(S, z.id)) {
    const prev = ZONES[z.id - 2];
    stagesHtml = lockedCard('🌀', z.name, S.buildings.portal < z.portal
      ? `Benötigt Riss-Portal Stufe ${z.portal}${prev ? ` und alle Stufen in ${prev.name}` : ''}.`
      : `Besiege zuerst alle ${NORMAL_STAGES} Bosse in ${prev.name}.`);
  } else {
    const tg = questStageTarget();
    const bossLock = !locked && sq.mode === 'boss'; // Bosskampf läuft → Zone/Stufe nicht wechselbar
    stagesHtml = (bossLock ? `<p class="card lock-note small">👑 Der Bosskampf läuft. Zone und Stufe lassen sich erst danach wechseln – oder oben „Abbrechen“.</p>` : '')
      + (z.lore && z.lore !== 'Entwurf' ? `<p class="muted small lore">${esc(z.lore)}</p>` : '') + z.stages.map((stg, k) => {
      const n = k + 1;
      const goal = tg && tg.zone === z.id && tg.stage === n;
      const lock = stageLock(S, z.id, n);
      const avail = !lock;
      const beaten = stageBeaten(S, z.id, n);
      const cur = !locked && sq.zone === z.id && sq.stage === n;
      const tag = stg.legend ? '⭐' : stg.hard ? '☠️' : '';
      const head = n === NORMAL_STAGES + 1 ? `<h4 class="hard-head">${z.stages.some(s => s.legend) ? '☠️ Schwer & ⭐ Legendär' : '☠️ Schwer'}</h4>` : '';
      return `${head}<button class="stage-row ${cur ? 'sel' : ''} ${avail ? '' : 'locked'} ${stg.hard ? 'hard' : ''} ${goal && !cur && !bossLock ? 'goal' : ''}" data-action="stage" data-zone="${z.id}" data-stage="${n}" ${avail && !locked && !bossLock ? '' : 'disabled'}>
        <span class="zone-num">${n > NORMAL_STAGES ? tag : n}</span>
        <span class="zone-txt">
          <b>${avail || beaten ? `👑 ${esc(stg.boss.name)}` : '🔒 Unbekannter Boss'} <span class="lv">Lv. ${stg.level}</span></b>
          <small>${avail ? `Schergen: ${stg.minions.map(m => esc(m.name)).join(', ')}` : esc(lock)}</small>
          ${avail && stg.info ? `<small class="info">${esc(stg.info)}</small>` : ''}
        </span>
        <span class="zone-flag">${beaten ? '✓' : goal ? '🎯' : cur ? '⚔️' : ''}</span>
      </button>`;
    }).join('');
  }
  setHTML($('#stages'), stagesHtml);

  setHTML($('#portal-up'), S.onboarding >= 5 ? buildingCard('portal') : '');

  setHTML($('#chronicle'), S.log.length
    ? S.log.map(l => `<li class="log ${l.kind || ''}">${l.s != null ? `<span class="tag">Z${l.s + 1}</span>` : '<span class="tag">✦</span>'}<span>${esc(l.msg)}</span></li>`).join('')
    : '<li class="log muted">Noch ist es still an den Rissen …</li>');
}

// ---------- Gildenlager ----------------------------------------------
function effectText(key, lvl, short = false) {
  const L = BUILDINGS[key].levels[lvl - 1];
  switch (key) {
    case 'hall': return lvl ? `${short ? '' : 'Gildenkasse '}${fmt(L.gold)} 🟡/10 Min.` : 'Noch nicht errichtet';
    case 'camp': return `${short ? '' : 'Level-Cap '}Lv. ${lvl ? L.cap : 10}`;
    case 'kitchen': return `+${Math.round(lvl * BUILDINGS.kitchen.bonusPerLevel * 100)} %${short ? '' : ' EXP'}`;
    case 'lab': return `${short ? '' : 'Forschung bis '}Stufe ${lvl >= TIER_LAB[3] ? 'III' : lvl >= TIER_LAB[2] ? 'II' : lvl ? 'I' : '–'}`;
    case 'forge': return lvl ? `${short ? '' : 'Laden: Waffen bis '}${WEAPON_GRADES[[0, 3, 5, 6][lvl]].name}` : 'Noch nicht gebaut';
    case 'portal': return lvl ? `${short ? '' : 'Zonen bis '}${ZONES.filter(z => z.portal <= lvl).at(-1).name}` : 'Inaktiv';
    default: return '';
  }
}

function hallUnlocks(level) {
  const out = [];
  for (const [k, b] of Object.entries(BUILDINGS)) if (b.unlockHall === level && k !== 'hall') out.push(`${b.icon} ${b.name}`);
  for (const [k, b] of Object.entries(BUILDINGS)) {
    if (k === 'hall' || b.unlockHall === level) continue;
    const n = b.levels.filter((l, i) => i > 0 && l.hall === level).length;
    if (n) out.push(`${b.name} bis Stufe ${b.levels.findLastIndex(l => l.hall <= level) + 1}`);
  }
  TENTS.forEach((t, i) => { if (i > 0 && t.hall === level) out.push(`⛺ Zelt ${i + 1}`); });
  for (const f of Object.values(FEATURES)) if (f.unlockHall === level) out.push(`✨ ${f.name}`);
  return out;
}

function buildingCard(key) {
  const b = BUILDINGS[key];
  const lvl = S.buildings[key];
  if (!buildingUnlocked(S, key) && lvl === 0) {
    return `<div class="card building locked-b"><div class="b-icon">${b.icon}</div><div class="b-body">
      <div class="b-title"><b>${b.name}</b><span class="lv">🔒</span></div>
      <div class="b-desc">${b.desc}</div><div class="b-note">Ab Gildenhalle Stufe ${b.unlockHall}</div></div></div>`;
  }
  const maxed = lvl >= b.max;
  const next = lvl + 1;
  const c = S.construction;
  const building = c && c.key === key;
  let btn = '', note = '';
  if (building) {
    const total = b.levels[c.to - 1].time * 1000;
    btn = `<div class="build-timer">🔨 ${clock(c.doneAt - S.lastTickMs)}${hpBar(total - (c.doneAt - S.lastTickMs), total, 'ok')}</div>`;
  } else if (S.onboarding < 5) {
    // Im Tutorial: nur der aktuelle Schritt hat einen Knopf
    const step = QUESTS[S.onboarding];
    if (step?.key === key) btn = `<button class="btn primary goal" data-action="${step.action}">${step.btn}<small>kostenlos</small></button>`;
  } else if (maxed) {
    btn = `<button class="btn" disabled>Maximal</button>`;
  } else {
    const cost = buildingCost(key, next);
    const lock = buildLock(S, key);
    if (lock && !lock.startsWith('Es wird')) note = lock;
    const secs = b.levels[next - 1].time;
    btn = `<button class="btn primary" data-action="build" data-key="${key}" ${lock || !canAfford(S, cost) ? 'disabled' : ''}>
      ${lvl ? `Stufe ${next}` : 'Bauen'}<small>${costText(cost)}</small>${secs ? `<small>⏱ ${fmtTime(secs)}</small>` : ''}</button>`;
  }
  return `<div class="card building ${building ? 'building-now' : ''}">
    <div class="b-icon">${b.icon}</div>
    <div class="b-body">
      <div class="b-title"><b>${b.name}</b><span class="lv">Stufe ${lvl}/${b.max}</span></div>
      <div class="b-desc">${b.desc}</div>
      <div class="b-eff">${effectText(key, lvl)}${!maxed ? ` <span class="arrow">→</span> ${effectText(key, next, true)}` : ''}</div>
      ${building ? `<div class="b-unlock">Wird auf Stufe ${c.to} ausgebaut …</div>` : ''}
      ${note ? `<div class="b-note">${note}</div>` : ''}
    </div>
    <div class="b-act">${btn}</div>
  </div>`;
}

const fmtTime = (secs) => secs >= 60 ? `${Math.floor(secs / 60)} Min.${secs % 60 ? ` ${secs % 60} s` : ''}` : `${secs} s`;

function renderCamp() {
  if (S.onboarding < 5) {
    // Tutorial: nur Gildenhalle, ab Schritt 2 Zeltlager, ab Schritt 4 Riss-Portal; keine Statistik
    setHTML($('#camp-stats'), '');
    setHTML($('#buildings'), BUILDING_ORDER.filter(k => k === 'hall' || (k === 'camp' && S.onboarding >= 2) || (k === 'portal' && S.onboarding >= 4)).map(buildingCard).join(''));
    return;
  }
  const next = S.nextCycleMs - S.lastTickMs;
  setHTML($('#camp-stats'), `<div class="card stats-row">
    <span>⚔️ Siege <b>${fmt(S.stats.kills)}</b></span>
    <span>👑 Stufen <b>${normalCleared(S)}/${TOTAL_NORMAL}</b></span>
    <span>🌅 Ruhestand <b>${S.stats.retired}</b></span></div>
    <div class="card small cycle">💰 Gildenkasse in <b>${clock(next)}</b>: +${fmt(hallGold(S))} 🟡</div>`);
  setHTML($('#buildings'), BUILDING_ORDER.map(buildingCard).join(''));
}

// ⚙️ Einstellungen als Dialog (Zahnrad oben rechts)
function openSettings() {
  const refresh = () => openModal(settingsHtml(), refresh);
  refresh();
}

function settingsHtml() {
  return `${modalHead('⚙️ Einstellungen')}
    <div class="card"><button class="btn block" data-action="manual">📖 Handbuch</button></div>
    <div class="card setting">
      <span>📳 Vibration bei Level-Ups</span>
      <button class="toggle ${S.settings.vibrate ? 'on' : ''}" data-action="toggle-vibrate" role="switch" aria-checked="${S.settings.vibrate}"><i></i></button>
    </div>
    <div class="card">
      <div class="b-title"><b>💾 Spielstand</b></div>
      <div class="btn-row">
        <button class="btn" data-action="export">Exportieren</button>
        <button class="btn" data-action="import">Importieren</button>
      </div>
    </div>
    <div class="card">
      <div class="b-title"><b>🛠️ Debug</b></div>
      <button class="btn block" data-action="debug-offline">15 Min. Offline simulieren</button>
    </div>
    <div class="card">
      <button class="btn danger block" data-action="reset">Spielstand zurücksetzen</button>
    </div>
    <p class="muted small center">${GAME.title} · ${versionText()} · Spielstand v${S.version}<br>Nicht-kommerzielles Fanprojekt. Guild Wars 2 ist eine Marke von ArenaNet/NCSOFT; dieses Projekt ist nicht mit ihnen verbunden.</p>`;
}

// ---------- Trupps -----------------------------------------------------
function heroMini(h, opts = {}) {
  const hs = heroStats(S, h);
  const def = hs.def;
  const wounded = !!h.woundedUntil;
  return `<div class="hero-mini ${wounded ? 'wounded' : ''}" style="--c:${WEAPON_GRADES[h.rarity].color}">
    ${sprite(CLASSES[def.cls].sprite, 'mini-sprite')}
    <div class="hm-body">
      <div class="hm-name"><b>${esc(def.name)}</b> <span class="lv">Lv. ${h.level}</span>${h.weapon ? ` <span class="wpn" style="color:${WEAPON_GRADES[WEAPON_BY_ID[h.weapon].grade].color}">★${WEAPON_BY_ID[h.weapon].grade}</span>` : ''}</div>
      <div class="hm-sub"><span style="color:${WEAPON_GRADES[h.rarity].color}">◆</span> ${ROLES[def.role].icon} ${ROLES[def.role].name} · ${CLASSES[def.cls].name}</div>
      ${opts.bars === false ? '' : hpBar(h.hp, hs.maxHp, 'hero-hp')}
      ${wounded ? `<div class="hm-wound">💢 Verwundet · ${clock(h.woundedUntil - S.lastTickMs)}</div>` : ''}
    </div>
  </div>`;
}

function tentWarnings(sq) {
  const ms = squadMembers(S, sq);
  if (!ms.length) return 'Leeres Zelt – dieser Trupp kämpft nicht.';
  const roles = new Set(ms.map(h => HERO_BY_ID[h.heroId].role));
  const w = [];
  if (ms.length < TENT_SIZE) w.push(`Nur ${ms.length}/3 Helden`);
  if (!roles.has('tank')) w.push('kein Tank');
  if (!roles.has('healer')) w.push('kein Heiler');
  return w.join(' · ');
}

// Auftrag „Verstärkung“: kostenloser Held, der auf der Trupp-Seite aufgenommen wird (oder null)
function questFreeHero() {
  const q = currentQuest(S);
  return q && q.goal.type === 'freeHero' && !isOwned(S, q.goal.hero) ? HERO_BY_ID[q.goal.hero] : null;
}

function renderSquads() {
  const tutorial = S.onboarding < 5;
  $('#squads-more').hidden = tutorial;
  const free = questFreeHero();
  const freeSlot = free ? S.squads[0].slots.indexOf(null) : -1; // quest-hero setzt in Zelt 1, sonst Reserve
  setHTML($('#tents'), S.squads.map((sq, i) => {
    if (i >= S.tentsUnlocked) {
      if (tutorial) return '';
      const t = TENTS[i];
      const canBuy = i === S.tentsUnlocked && S.buildings.hall >= t.hall;
      return `<div class="card tent locked">
        <div class="tent-head"><b>🔒 Zelt ${i + 1}</b><small>Gildenhalle Stufe ${t.hall}</small></div>
        ${canBuy
          ? `<button class="btn primary block" data-action="buy-tent" data-squad="${i}" ${S.gold >= t.gold ? '' : 'disabled'}>Zelt aufschlagen · 🟡 ${fmt(t.gold)}</button>`
          : `<div class="muted small">${i > S.tentsUnlocked ? `Erst Zelt ${i} aufschlagen.` : `Gildenhalle auf Stufe ${t.hall} ausbauen.`}</div>`}
      </div>`;
    }
    const warn = tentWarnings(sq);
    const prof = teamProfile(S, squadMembers(S, sq), sq);
    return `<div class="card tent">
      <div class="tent-head"><b>⛺ Zelt ${i + 1}</b><small>${esc(stageLabel(sq))}</small></div>
      <div class="slots">${sq.slots.map((uid, slot) => {
        const h = uid != null ? getHero(S, uid) : null;
        if (!h && S.onboarding === 3 && i === 0 && slot === 0) {
          return `<button class="slot goal" data-action="ob-recruit"><span class="slot-empty">＋ ${esc(HERO_BY_ID[ONBOARDING.tank].name)} aufnehmen</span></button>`;
        }
        if (!h && free && i === 0 && slot === freeSlot) {
          return `<button class="slot goal" data-action="quest-hero"><span class="slot-empty">＋ ${esc(free.name)} aufnehmen</span></button>`;
        }
        if (!h && tutorial) return `<div class="slot"><span class="slot-empty">Platz frei</span></div>`;
        return `<button class="slot" data-action="slot" data-squad="${i}" data-slot="${slot}">${h ? heroMini(h) : '<span class="slot-empty">＋ Platz frei</span>'}</button>`;
      }).join('')}</div>
      ${tutorial ? '' : `<div class="tent-foot"><span>⚔️ ~${fmt(prof.dps)} Schaden/s</span><span>✚ ${fmt(prof.heal)} Heilung/s</span><span>❤ ${fmt(prof.hpPool)} LP</span></div>
      ${warn ? `<div class="b-note">${warn}</div>` : ''}`}
    </div>`;
  }).join(''));

  const res = reserveHeroes(S).sort((a, b) => b.level - a.level);
  const joinCard = free && freeSlot < 0
    ? `<button class="card btn primary block goal" data-action="quest-hero">＋ ${esc(free.name)} aufnehmen (Reserve)</button>` : '';
  setHTML($('#reserve'), joinCard + (res.length
    ? res.map(h => `<button class="card hero-row" data-action="hero" data-uid="${h.uid}">${heroMini(h)}<span class="chev">›</span></button>`).join('')
    : joinCard ? '' : '<div class="card muted small">Keine Helden in Reserve.</div>'));

  setHTML($('#recruit'), recruitHtml());
}

// Seltenheit eines Helden: Name und Farbe wie bei den Waffen-Güten
const rarityTag = (r) => `<span class="rar" style="color:${WEAPON_GRADES[r].color}">◆ ${WEAPON_GRADES[r].name}</span>`;

function recruitHtml() {
  const t = recruitTier(S);
  if (!t) return '<div class="card muted small">Die Gildenhalle wird noch errichtet.</div>';
  const blocked = S.onboarding < 5;
  const next = RECRUIT.tiers.find(x => x.hall > S.buildings.hall);
  const offers = S.recruits.offers.map((o, k) => {
    const d = HERO_BY_ID[o.heroId];
    const cost = recruitCost(o.rarity);
    const m = 1 + rarityBonus(o.rarity);
    return `<div class="card recruit" style="--c:${WEAPON_GRADES[o.rarity].color};--r:${WEAPON_GRADES[o.rarity].color}">
        ${sprite(CLASSES[d.cls].sprite, 'mini-sprite')}
        <div class="hm-body">
          <div class="hm-name"><b>${esc(d.name)}</b></div>
          <div class="hm-sub">${rarityTag(o.rarity)}</div>
          <div class="hm-title">„${esc(d.title)}“</div>
          <div class="hm-sub">${ROLES[d.role].icon} ${ROLES[d.role].name} · ${CLASSES[d.cls].name}${d.buff ? ` · ${d.buff === 'macht' ? 'Macht' : 'Eile'}` : ''}</div>
          <div class="hm-sub">❤ ${fmt(d.baseHp * m)} · ⚔️ ${fmt(d.baseAtk * m)}${d.crit ? ` · Krit ${Math.round(d.crit * 100)} %` : ''}</div>
        </div>
        <button class="btn primary" data-action="recruit" data-slot="${k}" ${blocked || S.gold < cost ? 'disabled' : ''}>Anwerben<small>🟡 ${fmt(cost)}</small></button>
      </div>`;
  }).join('') || '<div class="card muted small">Keine Angebote mehr. Neue Rekruten kommen bald.</div>';
  const rc = recruitRefreshCost(S);
  const odds = Object.entries(recruitOdds(S)).filter(([, w]) => w > 0)
    .map(([r, w]) => `<span style="color:${WEAPON_GRADES[r].color}">◆</span> ${w} %`).join(' · ');
  const nextOdds = RECRUIT.odds.find(x => x.hall > S.buildings.hall);
  const better = Math.min(next?.hall ?? Infinity, nextOdds?.hall ?? Infinity);
  return `
    <div class="card small">Neue Rekruten in <b>${clock(S.recruits.nextRestockMs - S.lastTickMs)}</b>${blocked ? '<br>Zuerst die Quest abschließen.' : ''}
      <div class="odds">${odds}${better < Infinity ? `<br><span class="muted">Mehr und seltenere ab Gildenhalle ${better}.</span>` : ''}</div></div>
    ${offers}
    ${rerollRow(`<button class="btn" data-action="recruit-refresh" ${S.gold >= rc ? '' : 'disabled'}>Liste erneuern<small>🟡 ${fmt(rc)}</small></button>`, 'recruits', S.recruits.refreshes)}`;
}

// Erneuern-Knopf; nach dem ersten Erneuern daneben „Preis zurücksetzen“ für 🍀
function rerollRow(refreshBtn, which, refreshes) {
  if (refreshes < 1) return `<div class="btn-row">${refreshBtn}</div>`;
  return `<div class="btn-row">${refreshBtn}<button class="btn" data-action="reroll-reset" data-which="${which}" ${S.clover >= REROLL_RESET_CLOVER ? '' : 'disabled'}>Preis zurücksetzen<small>🍀 ${REROLL_RESET_CLOVER}</small></button></div>`;
}

// ---------- Asura-Labor ------------------------------------------------
function researchEffect(node, lvl) {
  const v = node.flat ? node.per * lvl : Math.round(node.per * lvl * 100);
  return `${node.sign || '+'}${v}${node.unit}`;
}

function renderLab() {
  if (S.buildings.lab < 1) {
    setHTML($('#lab'), lockedCard('🔬', 'Asura-Labor noch nicht gebaut',
      buildingUnlocked(S, 'lab')
        ? 'Baue das Asura-Labor im Gildenlager. Dort setzt du 📜 Forschungsnotizen aus Boss-Siegen und Level-Ups ein.'
        : `Verfügbar ab Gildenhalle Stufe ${BUILDINGS.lab.unlockHall}. Hier erforschst du später mehr ATK, DEF, HP, Angriffstempo und kürzere Regeneration.`));
    return;
  }
  setHTML($('#lab'), `
    <div class="card lab-head">
      <div><b>📜 ${fmt(S.rp)}</b> Forschungsnotizen</div>
      <div class="muted small">Stufe II ab Labor ${TIER_LAB[2]}, III ab Labor ${TIER_LAB[3]}.</div>
    </div>
    ${RESEARCH_ORDER.map(tk => {
      const tree = RESEARCH[tk];
      return `<h3 class="tree-title">${tree.icon} ${tree.name}</h3>
      <div class="tree">${Object.keys(tree.nodes).map(nk => {
        const info = researchInfo(S, tk, nk);
        const n = info.node;
        const maxed = info.lvl >= n.max;
        return `<div class="card node tier-${n.tier} ${info.reason && !maxed ? 'blocked' : ''}">
          <div class="b-body">
            <div class="b-title"><b>${n.name}</b><span class="lv">${'I'.repeat(n.tier)}</span></div>
            ${pips(info.lvl, n.max)}
            <div class="b-eff">${researchEffect(n, info.lvl)}${maxed ? '' : ` <span class="arrow">→</span> ${researchEffect(n, info.to)}`}</div>
            ${info.reason && !maxed ? `<div class="b-note">🔒 ${info.reason}</div>` : ''}
          </div>
          <div class="b-act">${maxed ? '<button class="btn" disabled>Maximal</button>'
            : `<button class="btn primary" data-action="research" data-tree="${tk}" data-node="${nk}" ${info.ok ? '' : 'disabled'}>Erforschen<small>📜 ${fmt(info.cost)}</small></button>`}</div>
        </div>`;
      }).join('')}</div>`;
    }).join('')}`);
}

// ---------- Schmiede ---------------------------------------------------
function weaponLabel(h) {
  if (!h.weapon) return `<span class="muted">Keine Waffe</span> ${WEAPON_TYPES[weaponType(h)].icon}`;
  return weaponName(h.weapon);
}
function weaponName(wid) {
  const w = WEAPON_BY_ID[wid];
  const g = WEAPON_GRADES[w.grade];
  return `${WEAPON_TYPES[w.type].icon} <span style="color:${g.color}">${esc(w.name)}</span> <span class="lv">★${w.grade}</span>`;
}
const weaponBonus = (wid) => {
  const g = WEAPON_GRADES[WEAPON_BY_ID[wid].grade];
  return `+${Math.round(g.atk * 100)} % ATK · +${Math.round(g.hp * 100)} % HP`;
};

// Waffenkammer: ungenutzte Waffen, gleiche zusammengefasst. back='inv' → aus dem Inventar geöffnet
function armoryCards(back = '') {
  const groups = {};
  S.armory.forEach((wid, idx) => (groups[wid] = groups[wid] || []).push(idx));
  const b = back ? ` data-back="${back}"` : '';
  return Object.entries(groups)
    .sort((x, y) => WEAPON_BY_ID[y[0]].grade - WEAPON_BY_ID[x[0]].grade)
    .map(([wid, idxs]) => `<div class="card weapon-offer">
      <div class="w-info"><div>${weaponName(wid)}${idxs.length > 1 ? ` <b>×${idxs.length}</b>` : ''}</div><div class="muted small">${WEAPON_TYPES[WEAPON_BY_ID[wid].type].name} · ${weaponBonus(wid)}</div></div>
      <div class="b-act btn-col tight">
        <button class="btn primary" data-action="equip-pick" data-idx="${idxs[0]}"${b}>Ausrüsten</button>
        <button class="btn" data-action="sell" data-idx="${idxs[0]}"><small>Verkaufen 🟡 ${fmt(sellPrice(wid))}</small></button>
      </div></div>`).join('') || '<div class="card muted small">Noch leer. Waffen gibt es von Bossen und im Laden.</div>';
}

function renderForge() {
  const armory = `<h3 class="tree-title">🗄️ Waffenkammer (${S.armory.length})</h3>${armoryCards()}`;
  if (S.buildings.forge < 1) {
    setHTML($('#weapons'), lockedCard('⚒️', 'Charr-Schmiede noch nicht gebaut',
      buildingUnlocked(S, 'forge')
        ? 'Baue die Charr-Schmiede im Gildenlager. Dann verkaufen die Charr hier Waffen. Boss-Beute landet schon jetzt in der Waffenkammer.'
        : `Verfügbar ab Gildenhalle Stufe ${BUILDINGS.forge.unlockHall}. Hier verkaufen die Charr Waffen für deine Helden. Boss-Beute landet schon jetzt in der Waffenkammer.`) + armory);
  } else {
    const offers = S.shop.offers.map((wid, k) => {
      const w = WEAPON_BY_ID[wid];
      return `<div class="card weapon-offer">
        <div class="w-info"><div>${weaponName(wid)}</div><div class="muted small">${WEAPON_TYPES[w.type].name} · ${weaponBonus(wid)}</div></div>
        <div class="b-act btn-col tight">
          <button class="btn primary" data-action="buy" data-slot="${k}" data-cur="gold" ${S.gold >= w.gold ? '' : 'disabled'}>Kaufen<small>🟡 ${fmt(w.gold)}</small></button>
          ${w.rp != null ? `<button class="btn" data-action="buy" data-slot="${k}" data-cur="rp" ${S.rp >= w.rp ? '' : 'disabled'}><small>oder 📜 ${w.rp}</small></button>` : ''}
        </div></div>`;
    }).join('') || '<div class="card muted small">Ausverkauft. Neue Ware kommt bald.</div>';
    setHTML($('#weapons'), `
      <div class="card small">Neue Ware in <b>${clock(S.shop.nextRestockMs - S.lastTickMs)}</b></div>
      ${offers}
      ${rerollRow(`<button class="btn" data-action="shop-refresh" ${S.gold >= refreshCost(S) ? '' : 'disabled'}>Ware auffrischen<small>🟡 ${fmt(refreshCost(S))}</small></button>`, 'shop', S.shop.refreshes)}
      ${armory}`);
  }

  if (!featureUnlocked(S, 'mystic')) {
    setHTML($('#mystic'), lockedCard('✨', 'Mystische Schmiede versiegelt', `Öffnet sich ab Gildenhalle Stufe ${FEATURES.mystic.unlockHall}. Dann kannst du Helden ab Lv. ${RETIRE_MIN_LEVEL} in den Ruhestand schicken und dauerhafte Boni kaufen.`));
    return;
  }
  setHTML($('#mystic'), `
    <div class="card small">Ruhestand ab Lv. ${RETIRE_MIN_LEVEL} bringt 🍀. Die Boni hier sind dauerhaft.</div>
    ${MYSTIC_ORDER.map(k => {
      const m = MYSTIC[k];
      const lvl = S.mystic[k];
      const maxed = lvl >= m.costs.length;
      const cost = m.costs[lvl];
      return `<div class="card building">
        <div class="b-icon">${m.icon}</div>
        <div class="b-body">
          <div class="b-title"><b>${m.name}</b><span class="lv">${lvl}/${m.costs.length}</span></div>
          ${pips(lvl, m.costs.length)}
          <div class="b-eff">${m.sign}${Math.round(lvl * m.per * 100)} %${maxed ? '' : ` <span class="arrow">→</span> ${m.sign}${Math.round((lvl + 1) * m.per * 100)} %`}<div class="b-desc">${m.unit.replace('% ', '')}</div></div>
        </div>
        <div class="b-act">${maxed ? '<button class="btn" disabled>Maximal</button>'
          : `<button class="btn primary" data-action="mystic" data-key="${k}" ${S.clover >= cost ? '' : 'disabled'}>Stufe ${lvl + 1}<small>🍀 ${cost}</small></button>`}</div>
      </div>`;
    }).join('')}`);
}

// Mit Zurück-Ziel nur ← (führt in den vorigen Dialog), sonst nur ✕ – nie beides
function modalHead(title, back = '') {
  return back
    ? `<div class="modal-head back"><button class="icon-btn" data-action="${back}" aria-label="Zurück">←</button><h3>${title}</h3></div>`
    : `<div class="modal-head"><h3>${title}</h3><button class="icon-btn" data-action="modal-close" aria-label="Schließen">✕</button></div>`;
}

function openEquipPicker(idx, back = '') {
  const wid = S.armory[idx];
  if (!wid) return;
  const heroes = S.heroes.filter(h => fitsHero(h, wid)).sort((a, b) => b.level - a.level);
  const b = back ? ` data-back="${back}"` : '';
  openModal(`
    ${modalHead('Ausrüsten', back ? 'inventory' : '')}
    <p>${weaponName(wid)}<br><span class="muted small">${weaponBonus(wid)} · passt zu: ${WEAPON_TYPES[WEAPON_BY_ID[wid].type].name}-Trägern</span></p>
    ${heroes.length ? `<div class="pick-list">${heroes.map(h => `<button class="card hero-row" data-action="equip" data-uid="${h.uid}" data-idx="${idx}"${b}>
      ${heroMini(h, { bars: false })}<span class="small">${h.weapon ? `ersetzt ★${WEAPON_BY_ID[h.weapon].grade}` : 'frei'}</span></button>`).join('')}</div>`
      : '<p class="muted small">Kein Held kann diese Waffenart tragen.</p>'}`);
}

// 🎒 Inventar-Reiter: Waffenkammer, ausgerüstete Waffen und Vorräte an einem Ort
function renderInventory() {
  setHTML($('#inventory'), inventoryHtml());
}

function inventoryHtml() {
  const equipped = S.heroes.filter(h => h.weapon).sort((a, b) => b.level - a.level);
  const rations = RATIONS.map((r, g) => S.rations[g] > 0 ? `<div class="card weapon-offer">
      <div class="w-info"><div>🍞${g + 1} ${esc(r.name)} <b>×${S.rations[g]}</b></div><div class="muted small">+${fmt(r.exp)} EXP pro Stück</div></div>
      <div class="b-act"><button class="btn primary" data-action="feed-pick" data-g="${g}">Verfüttern</button></div></div>` : '').join('');
  return `
    <h3 class="tree-title">🍞 Proviant</h3>
    ${rations || '<div class="card muted small">Kein Proviant. Den gibt es von Bossen.</div>'}
    <div class="card muted small">🍎 Früchte <b>${S.fruit}</b> · 🎟️ Arena-Tickets <b>${S.tickets}</b> (Funktion folgt)</div>
    <h3 class="tree-title">🗄️ Waffenkammer (${S.armory.length})</h3>
    ${armoryCards('inv')}
    ${equipped.length ? `<h3 class="tree-title">⚔️ Ausgerüstet (${equipped.length})</h3>
      ${equipped.map(h => `<div class="card weapon-offer">
        <div class="w-info"><div>${weaponName(h.weapon)}</div><div class="muted small">${esc(HERO_BY_ID[h.heroId].name)} · Lv. ${h.level}</div></div>
        <div class="b-act"><button class="btn" data-action="unequip" data-uid="${h.uid}">Ablegen</button></div></div>`).join('')}` : ''}`;
}

// Zurück zum Inventar-Reiter (aus Ausrüsten/Verfüttern)
function openInventory() {
  closeModal();
  if (tabVisible('inv')) tab = 'inv';
  render();
}

// Proviant aus dem Inventar an einen Helden geben
function openFeedPicker(g) {
  const build = () => {
    const r = RATIONS[g];
    if (!(S.rations[g] > 0)) return null;
    const cap = levelCap(S);
    const heroes = [...S.heroes].sort((a, b) => b.level - a.level);
    return `
      ${modalHead(`🍞${g + 1} verfüttern`, 'inventory')}
      <p>${esc(r.name)} <b>×${S.rations[g]}</b><br><span class="muted small">+${fmt(r.exp)} EXP pro Stück</span></p>
      <div class="pick-list">${heroes.map(h => {
        const full = h.level >= cap;
        return `<button class="card hero-row${full ? ' disabled' : ''}" data-action="feed" data-uid="${h.uid}" data-g="${g}" ${full ? 'disabled' : ''}>
          ${heroMini(h, { bars: false })}<span class="small">${full ? 'Level-Cap' : `+${fmt(r.exp)} EXP`}</span></button>`;
      }).join('')}</div>`;
  };
  const refresh = () => { const html = build(); if (html) openModal(html, refresh); else openInventory(); };
  refresh();
}

// ---------------------------------------------------------------------
//  Modals & Toasts
// ---------------------------------------------------------------------
let modalRefresh = null; // Funktion, die das offene Modal neu aufbaut (läuft auch bei jedem render())

// Das Modal-Gerüst bleibt stehen; der Inhalt wird per Diff gesetzt. So kann ein offenes
// Modal live mitlaufen, ohne zu flackern oder die Scroll-Position zu verlieren.
function openModal(html, refresh = null) {
  const root = $('#modal-root');
  let box = root.hidden ? null : root.querySelector('.modal');
  if (!box) {
    root.innerHTML = '<div class="modal-backdrop" data-action="modal-bg"><div class="modal" role="dialog" aria-modal="true"></div></div>';
    box = root.querySelector('.modal');
  }
  setHTML(box, html);
  root.hidden = false;
  modalRefresh = refresh;
}
function closeModal() {
  const root = $('#modal-root');
  root.hidden = true;
  root.innerHTML = '';
  modalRefresh = null;
}

let toastTimer = 0;
export function toast(msg, ms = 2200) {
  const t = $('#toast');
  t.innerHTML = msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), ms);
}

export function showUpdateAvailable() {
  toast('Neue Version verfügbar. <button class="btn small-btn" data-action="reload">Neu laden</button>', 15000);
}

function heroDetailHtml(h) {
  const hs = heroStats(S, h);
  const d = hs.def;
  const i = squadOf(S, h.uid);
  const out = heroOutput(S, h);
  const pct = (x) => `${Math.round(x * 100)} %`;
  const roleHint = {
    tank: 'Steht vorn und fängt die Treffer ab.',
    dps: 'Greift jede Sekunde an.',
    support: `Greift mit ${pct(COMBAT.SUPPORT_ATK_FACTOR)} ATK an und stärkt den Trupp.`,
    healer: `Heilt jede Sekunde den schwächsten Verbündeten und greift mit ${pct(COMBAT.HEALER_ATK_FACTOR)} ATK an (ohne Krit).`,
  }[d.role];
  return `
    <div class="detail" style="--c:${WEAPON_GRADES[h.rarity].color}">
      ${sprite(CLASSES[d.cls].sprite, 'detail-sprite')}
      <div>
        <div class="hm-name"><b>${esc(d.name)}</b> <span class="lv">Lv. ${h.level}/${levelCap(S)}</span></div>
        <div class="hm-title">„${esc(d.title)}“ · ${esc(d.account || '')}</div>
        <div class="hm-sub">${rarityTag(h.rarity)}${rarityBonus(h.rarity) ? ` · +${Math.round(rarityBonus(h.rarity) * 100)} % LP/ATK` : ''}</div>
        <div class="hm-sub">${ROLES[d.role].icon} ${ROLES[d.role].name} · ${CLASSES[d.cls].name}${d.buff ? ` · ${d.buff === 'macht' ? 'Macht (+ATK)' : 'Eile (Tempo)'}` : ''}</div>
      </div>
    </div>
    <div class="stat-grid">
      <span>❤ LP</span><b>${fmt(h.hp)} / ${fmt(hs.maxHp)}</b>
      <span>⚔️ ATK</span><b>${fmt(hs.atk)}</b>
      <span>💥 Schaden</span><b>${fmt(out.hit)} pro Sekunde</b>
      ${out.heal ? `<span>✚ Heilung</span><b>${fmt(out.heal)} LP pro Sekunde</b>` : ''}
      <span>🛡️ DEF</span><b>−${Math.round(hs.defense * 100)} % Schaden</b>
      ${out.canCrit ? `<span>🎯 Krit</span><b>${Math.round(hs.crit * 100)} % · ×${hs.critMult.toFixed(1).replace('.', ',')}</b>` : ''}
      <span>⚒️ Waffe</span><b>${weaponLabel(h)}</b>
      <span>✨ EXP</span><b>${fmt(h.exp)} / ${fmt(F.expToNext(h.level))}</b>
      <span>📍 Ort</span><b>${i === -1 ? 'Reserve' : `Zelt ${i + 1}`}</b>
    </div>
    <div class="muted small">${ROLES[d.role].icon} ${roleHint} Werte ohne Trupp-Boni.</div>
    ${h.woundedUntil ? `<div class="b-note">💢 Verwundet – regeneriert in ${clock(h.woundedUntil - S.lastTickMs)}</div>` : ''}`;
}

function heroActions(h, { inSlot = false } = {}) {
  const btns = [];
  if (h.woundedUntil) {
    const c = F.reviveCost(h.level);
    btns.push(`<button class="btn primary" data-action="revive" data-uid="${h.uid}" ${S.gold >= c ? '' : 'disabled'}>⚡ Sofort beleben · 🟡 ${fmt(c)}</button>`);
  } else if (inSlot) {
    btns.push(`<button class="btn" data-action="unassign" data-uid="${h.uid}">In die Reserve</button>`);
  }
  const fitting = S.armory.map((wid, idx) => ({ wid, idx })).filter(o => fitsHero(h, o.wid))
    .sort((a, b) => WEAPON_BY_ID[b.wid].grade - WEAPON_BY_ID[a.wid].grade);
  const seen = new Set();
  const opts = fitting.filter(o => !seen.has(o.wid) && seen.add(o.wid)).slice(0, 4);
  if (opts.length || h.weapon) {
    btns.push(`<div class="sub-title">⚒️ Waffe wechseln</div>${opts.map(o =>
      `<button class="btn" data-action="equip" data-uid="${h.uid}" data-idx="${o.idx}">${weaponName(o.wid)}</button>`).join('')}
      ${h.weapon ? `<button class="btn" data-action="unequip" data-uid="${h.uid}">Waffe ablegen</button>` : ''}`);
  }
  if (S.rations.some(n => n > 0) && h.level < levelCap(S)) {
    btns.push(`<div class="sub-title">🍞 Proviant geben (EXP)</div><div class="btn-row wrap">${RATIONS.map((r, g) => S.rations[g] > 0
      ? `<button class="btn" data-action="feed" data-uid="${h.uid}" data-g="${g}">🍞${g + 1} ×${S.rations[g]}<small>+${fmt(r.exp)} EXP</small></button>` : '').join('')}</div>`);
  }
  if (!featureUnlocked(S, 'mystic')) {
    btns.push(`<div class="muted small">Ruhestand ab Gildenhalle ${FEATURES.mystic.unlockHall} (Mystische Schmiede).</div>`);
  } else if (h.level >= RETIRE_MIN_LEVEL) {
    btns.push(`<button class="btn danger" data-action="retire" data-uid="${h.uid}">🌅 Ruhestand · +🍀 ${F.retireClover(h.level)}</button>`);
  } else {
    btns.push(`<div class="muted small">Ruhestand ab Lv. ${RETIRE_MIN_LEVEL}.</div>`);
  }
  return `<div class="btn-col">${btns.join('')}</div>`;
}

function openSlotModal(i, slot) {
  if (i >= S.tentsUnlocked) return;
  const sq = S.squads[i];
  const h = sq.slots[slot] != null ? getHero(S, sq.slots[slot]) : null;
  const res = reserveHeroes(S).sort((a, b) => b.level - a.level);
  const locked = h && h.woundedUntil;
  openModal(`
    <div class="modal-head"><h3>⛺ Zelt ${i + 1} · Platz ${slot + 1}</h3><button class="icon-btn" data-action="modal-close" aria-label="Schließen">✕</button></div>
    ${h ? heroDetailHtml(h) + heroActions(h, { inSlot: true }) : '<p class="muted">Dieser Platz ist frei.</p>'}
    <h4>${h ? 'Tauschen mit Held aus der Reserve' : 'Held aus der Reserve wählen'}</h4>
    ${locked ? '<p class="muted small">Verwundete Helden können nicht getauscht werden.</p>' : res.length
      ? `<div class="pick-list">${res.map(r => `<button class="card hero-row ${r.woundedUntil ? 'disabled' : ''}" data-action="assign" data-squad="${i}" data-slot="${slot}" data-uid="${r.uid}" ${r.woundedUntil ? 'disabled' : ''}>${heroMini(r)}<span class="chev">＋</span></button>`).join('')}</div>`
      : '<p class="muted small">Die Reserve ist leer. Rekrutiere neue Helden im Reiter 🛡️ Trupps.</p>'}`,
  () => openSlotModal(i, slot));
}

function openHeroModal(uid) {
  const h = getHero(S, uid);
  if (!h) { closeModal(); return; }
  const free = [];
  S.squads.slice(0, S.tentsUnlocked).forEach((sq, i) => sq.slots.forEach((u, slot) => { if (u == null) free.push({ i, slot }); }));
  openModal(`
    <div class="modal-head"><h3>Held</h3><button class="icon-btn" data-action="modal-close" aria-label="Schließen">✕</button></div>
    ${heroDetailHtml(h)}
    ${heroActions(h)}
    ${!h.woundedUntil && squadOf(S, uid) === -1 && free.length ? `<h4>In ein Zelt setzen</h4><div class="btn-row wrap">${free.map(f => `<button class="btn" data-action="assign" data-squad="${f.i}" data-slot="${f.slot}" data-uid="${uid}">Zelt ${f.i + 1} · Platz ${f.slot + 1}</button>`).join('')}</div>` : ''}`,
  () => openHeroModal(uid));
}

function openManual() {
  openModal(`
    <div class="modal-head"><h3>📖 Handbuch</h3><button class="icon-btn" data-action="modal-close" aria-label="Schließen">✕</button></div>
    <div class="manual">${manualChapters().map(c => `
      <details class="manual-ch"><summary><span>${c.icon}</span>${c.title}</summary><div class="manual-body">${c.html}</div></details>`).join('')}
    </div>
    <p class="muted small center">${versionText()}</p>`);
}

function confirmModal(title, text, action, data = {}, danger = true) {
  const attrs = Object.entries(data).map(([k, v]) => `data-${k}="${esc(v)}"`).join(' ');
  openModal(`
    <h3>${title}</h3><p>${text}</p>
    <div class="btn-row">
      <button class="btn" data-action="modal-close">Abbrechen</button>
      <button class="btn ${danger ? 'danger' : 'primary'}" data-action="${action}" ${attrs}>Bestätigen</button>
    </div>`);
}

const fmtDuration = (ms) => {
  const m = Math.floor(ms / 60000);
  const h = Math.floor(m / 60);
  return h ? `${h} Std. ${m % 60} Min.` : `${m} Min.`;
};

export function showOfflineReport(report, { debug = false } = {}) {
  const t = report.totals;
  const squads = report.squads.map(r => {
    const effPct = Math.round(r.minEff * 100);
    return `<div class="card report-squad">
      <div class="tent-head"><b>⛺ Zelt ${r.squad + 1}</b><small>${esc(r.zoneName)} · Stufe ${r.stage}</small></div>
      <div class="report-grid">
        <span>🟡 +${fmt(r.gold)}</span><span>🔮 +${r.shards}</span>
        <span>✨ +${fmt(r.expPerHero)} EXP/Held</span><span>⚔️ ${fmt(r.kills)} Siege</span>
      </div>
      <div class="eff"><span>Effizienz</span>${hpBar(r.minEff, 1, effPct < 100 ? 'warn' : 'ok')}<b>${effPct} %</b></div>
      ${effPct < 100 ? '<div class="b-note">Diese Stufe ist zu schwer – der Trupp erbeutet nur einen Teil. Wähle eine leichtere Stufe.</div>' : ''}
      ${r.levelUps.length ? `<ul class="lvlups">${r.levelUps.map(l => `<li>⬆️ ${esc(l.name)} Lv. ${l.from} → ${l.to}</li>`).join('')}</ul>` : ''}
    </div>`;
  }).join('');
  openModal(`
    <h3>🌙 Offline-Rissbericht</h3>
    <p class="muted small">${debug ? 'Simuliert: ' : 'Abwesend: '}${fmtDuration(report.elapsedMs)}${report.capped ? ` · gewertet max. ${fmtDuration(report.maxMs)}` : ''}</p>
    <div class="card report-total"><span>🟡 +${fmt(t.gold)}</span><span>🔮 +${t.shards}</span>${report.rp >= 1 ? `<span>📜 +${fmt(report.rp)}</span>` : ''}<span>⬆️ ${t.levelUps}</span></div>
    ${report.cycles ? `<p class="small">💰 Gildenkasse: ${report.cycles}× ausgezahlt, +${fmt(report.cycleGold)} 🟡</p>` : ''}
    ${report.built ? `<p class="small">🔨 ${BUILDINGS[report.built.key].name} Stufe ${report.built.to} ist fertig.</p>` : ''}
    ${squads || '<p class="muted">Keine Trupps im Einsatz.</p>'}
    <p class="muted small">Offline farmen die Trupps nur Schergen. Bosse forderst du live heraus.</p>
    <button class="btn primary block" data-action="modal-close">Weiter kämpfen</button>`);
}

// Effekte für den aktuell sichtbaren Trupp (Schadenszahlen)
export function showTickFx(ev) {
  if (ev.built) toast(`🔨 ${BUILDINGS[ev.built.key].name} Stufe ${ev.built.to} ist fertig!`, 3000);
  for (const b of ev.bossWins || []) {
    if (b.first) toast(`👑 Boss besiegt! ${b.stage < ZONES[b.zone - 1].stages.length ? `Stufe ${b.stage + 1} freigeschaltet.` : 'Zone befreit!'}`, 3000);
  }
  if (tab !== 'portal' || document.hidden) return;
  const fx = $('#arena-fx');
  if (!fx) return;
  for (const hit of ev.hits) {
    if (hit.squad !== S.selectedSquad) continue;
    const m = S.squads[hit.squad].monster;
    lastHit = { squad: hit.squad, monsterId: m ? m.id : -1, t: S.lastTickMs };
    const el = document.createElement('span');
    el.className = `float ${hit.crit ? 'crit' : ''}`;
    el.textContent = `-${fmt(hit.dmg)}${hit.crit ? '!' : ''}`;
    el.style.left = `${45 + Math.random() * 20}%`;
    fx.appendChild(el);
    setTimeout(() => el.remove(), 1000);
  }
  for (const lu of ev.levelUps) {
    if (squadOf(S, lu.uid) !== S.selectedSquad) continue;
    const el = document.createElement('span');
    el.className = 'float level';
    el.textContent = `LEVEL ${lu.to}!`;
    el.style.left = '50%';
    fx.appendChild(el);
    setTimeout(() => el.remove(), 1400);
  }
}

// ---------------------------------------------------------------------
//  Aktionen
// ---------------------------------------------------------------------
function changed(msg) {
  hooks.save?.();
  if (msg) toast(msg);
  render();
}

function onClick(e) {
  const el = e.target.closest('[data-action]');
  if (!el || el.disabled) return;
  if (performance.now() < suppressClickUntil && el.closest('#arena-wrap')) return;
  const a = el.dataset.action;
  const d = el.dataset;
  if (a === 'modal-bg' && e.target !== el) return;
  const num = (v) => Number(v);

  switch (a) {
    case 'tab': if (!tabVisible(d.tab)) break; tab = d.tab; closeModal(); render(); break;
    case 'modal-close': case 'modal-bg': closeModal(); break;
    case 'reload': location.reload(); break;

    // Onboarding
    case 'ob-start': S.onboarding = 1; changed(); break;
    case 'ob-hall':
      if (S.onboarding !== 1) break;
      S.buildings.hall = 1; S.onboarding = 2; tab = 'camp';
      addLog(S, '🏛️ Die Gildenhalle steht.', null, 'info'); changed('Gildenhalle errichtet!'); break;
    case 'ob-camp':
      if (S.onboarding !== 2) break;
      S.buildings.camp = 1; S.onboarding = 3; tab = 'squads';
      changed('Erstes Zelt steht – neu: Trupps.'); break;
    case 'ob-recruit': {
      if (S.onboarding !== 3) break;
      const h = createHero(S, ONBOARDING.tank);
      S.squads[0].slots[0] = h.uid; S.onboarding = 4; tab = 'squads';
      changed(`${esc(HERO_BY_ID[h.heroId].name)} tritt der Wacht bei!`); break;
    }
    case 'ob-finish': {
      if (S.onboarding !== 4) break;
      S.buildings.portal = 1; S.onboarding = 5; S.selectedSquad = 0; viewZone = 1; tab = 'portal';
      S.squads[0].status = 'fighting'; spawnMonster(S, S.squads[0]);
      addLog(S, '🌀 Das Riss-Portal flackert auf – über dem Königintal öffnet sich der erste Riss!', null, 'boss');
      changed('Der erste Kampf beginnt! Unten wählst du Stufe und Boss.'); break;
    }
    case 'quest-hero': {
      const quest = currentQuest(S);
      if (!quest || quest.goal.type !== 'freeHero' || isOwned(S, quest.goal.hero)) break;
      const h = createHero(S, quest.goal.hero);
      const sq = S.squads[0], free = sq.slots.indexOf(null);
      if (free >= 0) sq.slots[free] = h.uid; // sonst Reserve
      claimQuest(S);
      addLog(S, `🛡️ ${HERO_BY_ID[h.heroId].name} tritt der Wacht bei!`, null, 'info');
      changed(`${esc(HERO_BY_ID[h.heroId].name)} tritt der Wacht bei!`); break;
    }
    case 'quest-claim': {
      const q = claimQuest(S);
      if (q) {
        addLog(S, `📜 Auftrag erfüllt: ${q.title} · ${rewardText(q.reward)}`, null, 'info');
        changed(`📜 ${esc(q.title)} erfüllt! ${rewardText(q.reward)}`);
      }
      break;
    }

    // Portal
    case 'select-squad':
      S.selectedSquad = num(d.squad);
      viewZone = S.squads[S.selectedSquad].zone;
      render(); break;
    case 'squad-step': stepSquad(num(d.dir)); break;
    case 'view-zone': viewZone = num(d.zone); render(); break;
    case 'stage':
      if (setStage(S, S.selectedSquad, num(d.zone), num(d.stage))) changed(); break;
    case 'boss': {
      const r = challengeBoss(S, S.selectedSquad);
      if (r === true) changed();
      else toast(r === 'gold' ? 'Nicht genug Gold für die Herausforderung.' : bossCooldownLeft(S, S.selectedSquad) ? 'Der Trupp verschnauft noch.' : 'Gerade nicht möglich – der Trupp muss kämpfen.');
      break;
    }
    case 'boss-abort': if (abortBoss(S, S.selectedSquad)) changed(); break;
    case 'boss-auto': if (toggleAutoBoss(S, S.selectedSquad)) changed(); break;

    // Gebäude
    case 'build': build(d.key); break;
    case 'buy-tent': {
      const i = num(d.squad);
      const t = TENTS[i];
      if (i !== S.tentsUnlocked || S.buildings.hall < t.hall) break;
      if (!pay(S, { gold: t.gold })) { toast('Nicht genug Gold.'); break; }
      S.tentsUnlocked += 1;
      addLog(S, `⛺ Zelt ${i + 1} aufgeschlagen.`, null, 'info');
      changed(`Zelt ${i + 1} steht bereit!`); break;
    }

    // Trupps
    case 'slot': openSlotModal(num(d.squad), num(d.slot)); break;
    case 'hero': openHeroModal(num(d.uid)); break;
    case 'assign':
      if (assignHero(S, num(d.squad), num(d.slot), num(d.uid))) { closeModal(); changed(); }
      else toast('Das geht gerade nicht (verwundet?).');
      break;
    case 'unassign': {
      const uid = num(d.uid);
      const i = squadOf(S, uid);
      if (i !== -1 && assignHero(S, i, S.squads[i].slots.indexOf(uid), null)) { closeModal(); changed(); }
      else toast('Verwundete Helden können nicht getauscht werden.');
      break;
    }
    case 'revive':
      if (reviveHero(S, num(d.uid))) { closeModal(); changed('⚡ Wiederbelebt!'); }
      else toast('Nicht genug Gold.');
      break;
    case 'recruit': recruit(num(d.slot)); break;
    case 'recruit-refresh': if (refreshRecruits(S)) changed('Neue Rekruten!'); break;
    case 'reroll-reset': if (resetRerollCost(S, d.which)) changed('🍀 Preis zurückgesetzt'); else toast('Nicht genug Mystischen Klee.'); break;
    case 'retire': {
      const h = getHero(S, num(d.uid));
      if (!h) break;
      confirmModal('🌅 Ruhestand', `${esc(HERO_BY_ID[h.heroId].name)} (Lv. ${h.level}) verlässt das Lager und hinterlässt <b>🍀 ${F.retireClover(h.level)}</b> Mystischen Klee. Die Waffe kommt in die Waffenkammer; der Held kann später neu rekrutiert werden (ab Lv. 1).`, 'retire-confirm', { uid: h.uid });
      break;
    }
    case 'retire-confirm': retire(num(d.uid)); break;

    // Schmiede & Labor
    case 'buy':
      if (buyWeapon(S, num(d.slot), d.cur)) changed('⚒️ Gekauft – liegt in der Waffenkammer.');
      else toast('Nicht genug Ressourcen.');
      break;
    case 'shop-refresh': if (refreshShop(S)) changed('Neue Ware!'); break;
    case 'sell': {
      const wid = S.armory[num(d.idx)];
      if (wid && sellWeapon(S, num(d.idx))) changed(`Verkauft für 🟡 ${fmt(sellPrice(wid))}`);
      break;
    }
    case 'equip-pick': openEquipPicker(num(d.idx), d.back || ''); break;
    case 'equip':
      if (equipWeapon(S, num(d.uid), num(d.idx))) {
        hooks.save?.(); toast('⚒️ Ausgerüstet!');
        if (d.back === 'inv') openInventory();
        else if (modalRefresh) modalRefresh(); else closeModal();
        render();
      }
      break;
    case 'inventory': openInventory(); break;
    case 'settings': openSettings(); break;
    case 'feed-pick': openFeedPicker(num(d.g)); break;
    case 'unequip':
      if (unequipWeapon(S, num(d.uid))) { hooks.save?.(); if (modalRefresh) modalRefresh(); render(); }
      break;
    case 'feed':
      if (feedRation(S, num(d.uid), num(d.g))) {
        hooks.save?.(); toast('🍞 Lecker!');
        if (modalRefresh) modalRefresh();
        render();
      }
      break;
    case 'research':
      if (doResearch(S, d.tree, d.node)) changed('🔬 Forschung abgeschlossen!');
      else toast('Nicht genug Forschungsnotizen.');
      break;
    case 'mystic': {
      const m = MYSTIC[d.key];
      const lvl = S.mystic[d.key];
      if (lvl >= m.costs.length || S.clover < m.costs[lvl]) break;
      S.clover -= m.costs[lvl];
      S.mystic[d.key] += 1;
      changed(`${m.name} Stufe ${lvl + 1}`); break;
    }

    // Einstellungen
    case 'manual': openManual(); break;
    case 'toggle-vibrate': S.settings.vibrate = !S.settings.vibrate; changed(); break;
    case 'export':
      openModal(`<h3>💾 Export</h3><p class="small muted">Diesen Code sicher aufbewahren. Er enthält den kompletten Spielstand.</p>
        <textarea id="save-code" readonly>${exportSave(S)}</textarea>
        <div class="btn-row"><button class="btn" data-action="modal-close">Schließen</button><button class="btn primary" data-action="copy-save">Kopieren</button></div>`);
      break;
    case 'copy-save': {
      const ta = $('#save-code');
      ta.select();
      (navigator.clipboard?.writeText(ta.value) || Promise.reject()).then(() => toast('Kopiert!'), () => {
        try { document.execCommand('copy'); toast('Kopiert!'); } catch { toast('Bitte manuell kopieren.'); }
      });
      break;
    }
    case 'import':
      openModal(`<h3>📥 Import</h3><p class="small muted">Füge einen exportierten Code ein. Der aktuelle Spielstand wird ersetzt.</p>
        <textarea id="import-code" placeholder="Code hier einfügen …"></textarea>
        <div class="btn-row"><button class="btn" data-action="modal-close">Abbrechen</button><button class="btn primary" data-action="import-do">Importieren</button></div>`);
      break;
    case 'import-do':
      try {
        const st = importSave($('#import-code').value);
        replaceState(S, st);
        hooks.afterReplace?.();
        viewZone = S.squads[S.selectedSquad].zone;
        closeModal(); tab = 'portal'; changed('Spielstand importiert.');
      } catch (err) { toast(`Import fehlgeschlagen: ${esc(err.message)}`, 3500); }
      break;
    case 'reset':
      confirmModal('⚠️ Zurücksetzen', 'Der komplette Spielstand wird gelöscht. Das kann nicht rückgängig gemacht werden. Vorher exportieren?', 'reset-do');
      break;
    case 'reset-do':
      replaceState(S, createNewState());
      hooks.afterReplace?.();
      viewZone = 1;
      closeModal(); tab = 'portal'; changed('Neues Gildenlager.'); break;
    case 'debug-offline': {
      const rep = runOffline(S, GAME.DEBUG_OFFLINE_MS);
      hooks.save?.();
      render();
      showOfflineReport(rep, { debug: true });
      hooks.onLevelUps?.(rep.totals.levelUps);
      break;
    }
  }
}

function stepSquad(dir) {
  const n = S.tentsUnlocked;
  S.selectedSquad = ((S.selectedSquad + dir) % n + n) % n;
  viewZone = S.squads[S.selectedSquad].zone;
  render();
}

function build(key) {
  if (S.onboarding < 5) return;
  const b = BUILDINGS[key];
  const lock = buildLock(S, key);
  if (lock) { toast(lock); return; }
  const r = startBuild(S, key);
  if (!r) { toast('Nicht genug Ressourcen.'); return; }
  const next = S.buildings[key] + (r === 'done' ? 0 : 1);
  const unlocked = key === 'hall' && r === 'done' ? hallUnlocks(next) : [];
  changed(r === 'started' ? `🔨 ${b.name} wird gebaut …` : unlocked.length ? `${b.name} Stufe ${next}! Neu: ${unlocked.join(', ')}` : `${b.name} Stufe ${next}!`);
}

function recruit(slot) {
  if (S.onboarding < 5) return;
  const h = hireRecruit(S, slot);
  if (!h) { toast('Nicht genug Gold.'); return; }
  const heroId = h.heroId;
  let placed = '';
  outer: for (let i = 0; i < S.tentsUnlocked; i++) {
    for (let slot = 0; slot < TENT_SIZE; slot++) {
      if (S.squads[i].slots[slot] == null) { S.squads[i].slots[slot] = h.uid; placed = ` → Zelt ${i + 1}`; break outer; }
    }
  }
  addLog(S, `🛡️ ${HERO_BY_ID[heroId].name} wurde angeworben${placed}.`, null, 'info');
  changed(`${esc(HERO_BY_ID[heroId].name)} angeworben${placed || ' (Reserve)'}!`);
}

function retire(uid) {
  const h = getHero(S, uid);
  if (!h || h.level < RETIRE_MIN_LEVEL || !featureUnlocked(S, 'mystic')) return;
  const i = squadOf(S, uid);
  if (i !== -1) {
    const sq = S.squads[i];
    sq.slots[sq.slots.indexOf(uid)] = null;
    if (!sq.slots.some(u => u != null)) { sq.status = 'idle'; sq.monster = null; sq.mode = 'farm'; }
  }
  const clover = F.retireClover(h.level);
  S.clover += clover;
  if (h.weapon) S.armory.push(h.weapon);
  S.heroes = S.heroes.filter(x => x.uid !== uid);
  S.stats.retired += 1;
  addLog(S, `🌅 ${HERO_BY_ID[h.heroId].name} geht in den Ruhestand (+${clover} 🍀).`, null, 'info');
  closeModal();
  changed(`+🍀 ${clover} Mystischer Klee`);
}

// ---------------------------------------------------------------------
//  Wischen in der Arena wechselt den Trupp
// ---------------------------------------------------------------------
function setupSwipe() {
  let sx = 0, sy = 0, active = false;
  const view = $('#view');
  view.addEventListener('touchstart', (e) => {
    if (!e.target.closest('#arena-wrap') || e.touches.length !== 1) { active = false; return; }
    active = true;
    sx = e.touches[0].clientX; sy = e.touches[0].clientY;
  }, { passive: true });
  view.addEventListener('touchend', (e) => {
    if (!active) return;
    active = false;
    const t = e.changedTouches[0];
    const dx = t.clientX - sx, dy = t.clientY - sy;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) {
      pointerDown = false;
      suppressClickUntil = performance.now() + 400;
      stepSquad(dx < 0 ? 1 : -1);
    }
  }, { passive: true });
}

export const getTab = () => tab;
