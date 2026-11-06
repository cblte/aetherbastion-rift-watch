// =====================================================================
//  UI: Rendering, Navigation, Eingaben
//  Prinzip: Jede Ansicht erzeugt HTML-Strings; ein Bereich wird nur neu
//  gesetzt, wenn sich sein HTML geändert hat. Solange ein Finger auf dem
//  Bildschirm liegt, wird nicht neu gerendert (keine verlorenen Taps).
// =====================================================================
import {
  GAME, CURRENCIES, ROLES, CLASSES, HEROES, HERO_BY_ID, ZONES, COMBAT, F, BUILDINGS, BUILDING_ORDER,
  TENTS, TENT_SIZE, MYSTIC, MYSTIC_ORDER, ONBOARDING, RETIRE_MIN_LEVEL, LEVEL_CAP_MAX,
} from './config.js';
import {
  createNewState, save, exportSave, importSave, replaceState, getHero, heroStats, levelCap,
  activeHeroCount, reserveHeroes, isOwned, nextRecruitCost, isZoneAvailable, buildingCost, canAfford,
  pay, createHero, addLog, squadOf,
} from './state.js';
import { squadMembers, spawnMonster, setZone, reviveHero, assignHero, teamProfile, fmt } from './combat.js';
import { runOffline } from './offline.js';

let S = null;
let hooks = {};
let tab = 'portal';
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
  for (const b of document.querySelectorAll('#tabs [data-tab]')) {
    b.classList.toggle('active', b.dataset.tab === tab);
    b.setAttribute('aria-selected', b.dataset.tab === tab);
  }
}

function renderHud() {
  $('#hud-gold').textContent = fmt(S.gold);
  $('#hud-shards').textContent = fmt(S.shards);
  $('#hud-coins').textContent = fmt(S.coins);
  $('#hud-cap').textContent = `${levelCap(S)}/${LEVEL_CAP_MAX}`;
  $('#hud-heroes').textContent = `${activeHeroCount(S)}/${TENTS.length * TENT_SIZE}`;
}

// ---------- Onboarding ------------------------------------------------
const QUESTS = [
  null,
  { icon: '🏛️', text: 'Errichte die <b>Gildenhalle</b> – das Herz eures Lagers.', btn: 'Errichten (kostenlos)', action: 'ob-hall' },
  { icon: '🛡️', text: () => `Rekrutiere deinen ersten Helden: <b>${esc(HERO_BY_ID[ONBOARDING.tank].name)}</b>, ${CLASSES[HERO_BY_ID[ONBOARDING.tank].cls].name} (Tank).`, btn: 'Rekrutieren (kostenlos)', action: 'ob-recruit' },
  { icon: '⛺', text: 'Schlage das <b>Zeltlager</b> auf. Es bestimmt das Level-Cap deiner Helden (Lv. 10).', btn: 'Aufschlagen (kostenlos)', action: 'ob-camp' },
  { icon: '🌀', text: () => `Zwei Rekruten melden sich: <b>${esc(HERO_BY_ID[ONBOARDING.healer].name)}</b> (Heiler) und <b>${esc(HERO_BY_ID[ONBOARDING.dps].name)}</b> (Schaden). Nimm sie in Zelt 1 auf und aktiviere das <b>Riss-Portal</b>.`, btn: 'Aufnehmen & Portal aktivieren', action: 'ob-finish' },
];

function renderQuest() {
  const q = $('#quest');
  const overlay = $('#start-overlay');
  overlay.hidden = S.onboarding !== 0;
  const step = QUESTS[S.onboarding];
  if (!step) { q.hidden = true; setHTML(q, ''); return; }
  q.hidden = false;
  const text = typeof step.text === 'function' ? step.text() : step.text;
  setHTML(q, `
    <div class="quest-step">Quest ${S.onboarding}/4</div>
    <div class="quest-body"><span class="quest-icon">${step.icon}</span><p>${text}</p></div>
    <button class="btn primary block" data-action="${step.action}">${step.btn}</button>`);
}

// ---------- Ansichten -------------------------------------------------
const SKELETONS = {
  portal: `
    <section class="arena-wrap" id="arena-wrap"><div id="arena"></div><div id="arena-fx" aria-hidden="true"></div></section>
    <section id="squad-cards" class="squad-cards"></section>
    <h2 class="sec">Riss-Zonen <small id="zone-for"></small></h2>
    <section id="zones" class="zones"></section>
    <section id="portal-up"></section>
    <h2 class="sec">Kampf-Chronik</h2>
    <ol id="chronicle" class="chronicle"></ol>`,
  camp: `<h2 class="sec">Gildenlager</h2><section id="camp-stats"></section><section id="buildings"></section>`,
  squads: `<h2 class="sec">Zelte</h2><section id="tents"></section>
    <h2 class="sec">Reserve</h2><section id="reserve"></section>
    <h2 class="sec">Rekrutieren</h2><section id="recruit"></section>`,
  forge: `<h2 class="sec">✨ Mystische Schmiede</h2><section id="mystic"></section>
    <h2 class="sec">Einstellungen</h2><section id="settings"></section>`,
};

function renderView() {
  const view = $('#view');
  if (view.dataset.tab !== tab) {
    view.innerHTML = SKELETONS[tab];
    view.dataset.tab = tab;
    view.scrollTop = 0;
  }
  if (tab === 'portal') renderPortal();
  else if (tab === 'camp') renderCamp();
  else if (tab === 'squads') renderSquads();
  else if (tab === 'forge') renderForge();
}

// ---------- Portal ----------------------------------------------------
function waveLabel(sq) {
  return sq.wave > COMBAT.WAVES_PER_ZONE ? '👑 Boss' : `Welle ${sq.wave}/${COMBAT.WAVES_PER_ZONE}`;
}

function sprite(tag, extra = '') {
  return `<div class="sprite ${extra}"><span>[SPRITE: ${tag}]</span></div>`;
}

function hpBar(cur, max, cls = '') {
  const pct = max > 0 ? Math.max(0, Math.min(100, (cur / max) * 100)) : 0;
  return `<div class="bar ${cls}"><i style="width:${pct.toFixed(1)}%"></i></div>`;
}

const clock = (ms) => {
  const s = Math.max(0, Math.ceil(ms / 1000));
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
};

let lastHit = { squad: -1, monsterId: -1, t: 0 };

function renderPortal() {
  const i = S.selectedSquad;
  const sq = S.squads[i];
  const locked = i >= S.tentsUnlocked;
  const zone = ZONES[sq.zone - 1];
  let stage;

  if (locked) {
    stage = `<div class="stage-msg">🔒 Zelt ${i + 1} ist noch nicht aufgeschlagen.<br><small>Gildenhalle Stufe ${TENTS[i].hall} · ${fmt(TENTS[i].gold)} 🪙</small></div>`;
  } else if (S.buildings.portal < 1) {
    stage = `<div class="stage-msg">🌀 Das Riss-Portal ist noch nicht aktiv.<br><small>Folge der Quest oben.</small></div>`;
  } else if (!sq.slots.some(u => u != null)) {
    stage = `<div class="stage-msg">⛺ Dieses Zelt ist leer.<br><button class="btn" data-action="tab" data-tab="squads">Helden einteilen</button></div>`;
  } else if (sq.status === 'retreat') {
    const left = Math.max(0, ...squadMembers(S, sq).map(h => (h.woundedUntil || 0) - S.lastTickMs));
    stage = `<div class="stage-msg retreat">🏕️ Rückzug ins Lager<br><small>Rückkehr in ${clock(left)} · Welle zurückgesetzt</small></div>`;
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
        </div>
      </div>`;
  } else {
    stage = `<div class="stage-msg">Der Trupp sammelt sich …</div>`;
  }

  const heroes = locked ? '' : sq.slots.map((uid, slot) => {
    const h = uid != null ? getHero(S, uid) : null;
    if (!h) return `<button class="arena-hero empty" data-action="slot" data-squad="${i}" data-slot="${slot}"><span>＋</span><small>frei</small></button>`;
    const st = heroStats(S, h);
    const def = st.def;
    const wounded = !!h.woundedUntil;
    return `
      <button class="arena-hero ${wounded ? 'wounded' : ''}" style="--c:${CLASSES[def.cls].color}" data-action="slot" data-squad="${i}" data-slot="${slot}">
        ${sprite(CLASSES[def.cls].sprite, 'hero-sprite')}
        <div class="ah-name">${ROLES[def.role].icon} ${esc(def.name)}</div>
        <div class="ah-lv">Lv. ${h.level}</div>
        ${hpBar(h.hp, st.maxHp, 'hero-hp')}
        ${hpBar(h.exp, F.expToNext(h.level), 'exp')}
        <div class="ah-status">${wounded ? `💢 ${clock(h.woundedUntil - S.lastTickMs)}` : sq.status === 'fighting' ? 'Kämpft' : 'Bereit'}</div>
      </button>`;
  }).join('');

  setHTML($('#arena'), `
    <div class="arena-head">
      <button class="icon-btn" data-action="squad-step" data-dir="-1" aria-label="Vorheriger Trupp">‹</button>
      <div class="arena-title"><b>⛺ Zelt ${i + 1}</b><small>${locked ? 'gesperrt' : `${esc(zone.name)} · ${waveLabel(sq)}`}</small></div>
      <button class="icon-btn" data-action="squad-step" data-dir="1" aria-label="Nächster Trupp">›</button>
    </div>
    <div class="stage zone-${sq.zone}">${stage}</div>
    <div class="arena-heroes">${heroes}</div>`);

  // Trupp-Karten
  setHTML($('#squad-cards'), S.squads.map((q, k) => {
    if (k >= S.tentsUnlocked) {
      return `<button class="sq-card locked ${k === i ? 'sel' : ''}" data-action="select-squad" data-squad="${k}">
        <b>🔒 ${k + 1}</b><small>GH ${TENTS[k].hall}</small></button>`;
    }
    const n = q.slots.filter(u => u != null).length;
    const status = !n ? '💤 leer' : q.status === 'retreat' ? '🏕️ Rückzug' : q.status === 'fighting' ? '⚔️ Kampf' : '⏸️';
    return `<button class="sq-card ${k === i ? 'sel' : ''}" data-action="select-squad" data-squad="${k}">
      <b>⛺ ${k + 1}</b><small>${ZONES[q.zone - 1].short}</small><small>${q.wave > COMBAT.WAVES_PER_ZONE ? 'Boss' : `W ${q.wave}/10`}</small><small>${status}</small></button>`;
  }).join(''));

  // Zonen
  $('#zone-for').textContent = `für Zelt ${i + 1}`;
  setHTML($('#zones'), ZONES.map(z => {
    const avail = isZoneAvailable(S, z.id);
    const reason = S.buildings.portal < z.portal
      ? `Riss-Portal Stufe ${z.portal}`
      : `Boss in ${ZONES[z.id - 2]?.name} besiegen`;
    const d0 = F.difficulty(z.id, 1);
    const cur = !locked && sq.zone === z.id;
    return `<button class="zone ${cur ? 'sel' : ''} ${avail ? '' : 'locked'}" data-action="zone" data-zone="${z.id}" ${avail && !locked ? '' : 'disabled'}>
      <span class="zone-num">${z.id}</span>
      <span class="zone-txt"><b>${esc(z.name)}</b><small>${avail ? `Schwierigkeit ${d0}–${d0 + 9} + Boss` : `🔒 ${reason}`}</small></span>
      <span class="zone-flag">${S.zonesCleared[z.id] ? '✓' : ''}</span>
    </button>`;
  }).join(''));

  setHTML($('#portal-up'), S.onboarding >= 5 ? buildingCard('portal') : '');

  setHTML($('#chronicle'), S.log.length
    ? S.log.map(l => `<li class="log ${l.kind || ''}">${l.s != null ? `<span class="tag">Z${l.s + 1}</span>` : '<span class="tag">✦</span>'}<span>${esc(l.msg)}</span></li>`).join('')
    : '<li class="log muted">Noch ist es still an den Rissen …</li>');
}

// ---------- Gildenlager ----------------------------------------------
function effectText(key, lvl, short = false) {
  switch (key) {
    case 'hall': return short ? `Stufe ${lvl}` : lvl ? `Gebäude max. Stufe ${lvl}` : 'Noch nicht errichtet';
    case 'camp': return `${short ? '' : 'Level-Cap '}Lv. ${F.levelCap(lvl)}`;
    case 'kitchen': return `+${Math.round(lvl * BUILDINGS.kitchen.bonusPerLevel * 100)} %${short ? '' : ' EXP'}`;
    case 'forge': return `+${Math.round(lvl * BUILDINGS.forge.bonusPerLevel * 100)} %${short ? '' : ' ATK'}`;
    case 'portal': return lvl ? `${short ? '' : 'Zonen bis '}${ZONES[lvl - 1].name}` : 'Inaktiv';
    default: return '';
  }
}

function costText(cost) {
  return Object.entries(cost).map(([c, v]) => `${CURRENCIES[c].icon} ${fmt(v)}`).join(' · ');
}

function buildingCard(key) {
  const b = BUILDINGS[key];
  const lvl = S.buildings[key];
  const maxed = lvl >= b.max;
  const next = lvl + 1;
  let btn = '', note = '';
  if (maxed) {
    btn = `<button class="btn" disabled>Maximal</button>`;
  } else {
    const cost = buildingCost(key, next);
    const needHall = key !== 'hall' && next > S.buildings.hall;
    const blocked = S.onboarding < 5 || needHall;
    if (needHall) note = `Benötigt Gildenhalle Stufe ${next}`;
    if (S.onboarding < 5) note = 'Erst die Quest abschließen';
    btn = `<button class="btn primary" data-action="build" data-key="${key}" ${blocked || !canAfford(S, cost) ? 'disabled' : ''}>
      Stufe ${next}<small>${costText(cost)}</small></button>`;
  }
  return `<div class="card building">
    <div class="b-icon">${b.icon}</div>
    <div class="b-body">
      <div class="b-title"><b>${b.name}</b><span class="lv">Stufe ${lvl}/${b.max}</span></div>
      <div class="b-desc">${b.desc}</div>
      <div class="b-eff">${effectText(key, lvl)}${!maxed ? ` <span class="arrow">→</span> ${effectText(key, next, true)}` : ''}</div>
      ${note ? `<div class="b-note">${note}</div>` : ''}
    </div>
    <div class="b-act">${btn}</div>
  </div>`;
}

function renderCamp() {
  setHTML($('#camp-stats'), `<div class="card stats-row">
    <span>⚔️ Siege <b>${fmt(S.stats.kills)}</b></span>
    <span>👑 Bosse <b>${fmt(S.stats.bosses)}</b></span>
    <span>🌅 Ruhestand <b>${S.stats.retired}</b></span></div>`);
  setHTML($('#buildings'), BUILDING_ORDER.map(buildingCard).join(''));
}

// ---------- Trupps -----------------------------------------------------
function heroMini(h, opts = {}) {
  const st = heroStats(S, h);
  const def = st.def;
  const wounded = !!h.woundedUntil;
  return `<div class="hero-mini ${wounded ? 'wounded' : ''}" style="--c:${CLASSES[def.cls].color}">
    ${sprite(CLASSES[def.cls].sprite, 'mini-sprite')}
    <div class="hm-body">
      <div class="hm-name"><b>${esc(def.name)}</b> <span class="lv">Lv. ${h.level}</span></div>
      <div class="hm-sub">${ROLES[def.role].icon} ${ROLES[def.role].name} · ${CLASSES[def.cls].name}</div>
      ${opts.bars === false ? '' : hpBar(h.hp, st.maxHp, 'hero-hp')}
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

function renderSquads() {
  setHTML($('#tents'), S.squads.map((sq, i) => {
    if (i >= S.tentsUnlocked) {
      const t = TENTS[i];
      const canBuy = i === S.tentsUnlocked && S.buildings.hall >= t.hall;
      return `<div class="card tent locked">
        <div class="tent-head"><b>🔒 Zelt ${i + 1}</b><small>Gildenhalle Stufe ${t.hall}</small></div>
        ${canBuy
          ? `<button class="btn primary block" data-action="buy-tent" data-squad="${i}" ${S.gold >= t.gold ? '' : 'disabled'}>Zelt aufschlagen · 🪙 ${fmt(t.gold)}</button>`
          : `<div class="muted small">${i > S.tentsUnlocked ? `Erst Zelt ${i} aufschlagen.` : `Gildenhalle auf Stufe ${t.hall} ausbauen.`}</div>`}
      </div>`;
    }
    const warn = tentWarnings(sq);
    const prof = teamProfile(S, squadMembers(S, sq));
    return `<div class="card tent">
      <div class="tent-head"><b>⛺ Zelt ${i + 1}</b><small>${ZONES[sq.zone - 1].name} · ${waveLabel(sq)}</small></div>
      <div class="slots">${sq.slots.map((uid, slot) => {
        const h = uid != null ? getHero(S, uid) : null;
        return `<button class="slot" data-action="slot" data-squad="${i}" data-slot="${slot}">${h ? heroMini(h) : '<span class="slot-empty">＋ Platz frei</span>'}</button>`;
      }).join('')}</div>
      <div class="tent-foot"><span>⚔️ ~${fmt(prof.dps)} DPS</span><span>✚ ${fmt(prof.heal)}/s</span><span>❤ ${fmt(prof.hpPool)}</span></div>
      ${warn ? `<div class="b-note">${warn}</div>` : ''}
    </div>`;
  }).join(''));

  const res = reserveHeroes(S).sort((a, b) => b.level - a.level);
  setHTML($('#reserve'), res.length
    ? res.map(h => `<button class="card hero-row" data-action="hero" data-uid="${h.uid}">${heroMini(h)}<span class="chev">›</span></button>`).join('')
    : '<div class="card muted small">Keine Helden in Reserve. Neue Rekruten landen hier, sobald alle Zelte voll sind.</div>');

  const cost = nextRecruitCost(S);
  const open = HEROES.filter(d => !isOwned(S, d.id));
  const blocked = S.onboarding < 5;
  setHTML($('#recruit'), `
    <div class="card small">Nächster Rekrut kostet <b>🪙 ${fmt(cost)}</b>. Jeder weitere wird teurer (×2,2).${blocked ? ' <br>Zuerst die Quest abschließen.' : ''}</div>
    ${open.length ? open.map(d => `
      <div class="card recruit" style="--c:${CLASSES[d.cls].color}">
        ${sprite(CLASSES[d.cls].sprite, 'mini-sprite')}
        <div class="hm-body">
          <div class="hm-name"><b>${esc(d.name)}</b></div>
          <div class="hm-title">„${esc(d.title)}“</div>
          <div class="hm-sub">${ROLES[d.role].icon} ${ROLES[d.role].name} · ${CLASSES[d.cls].name}${d.buff ? ` · ${d.buff === 'macht' ? 'Macht' : 'Eile'}` : ''}</div>
          <div class="hm-sub">❤ ${d.baseHp} · ⚔️ ${d.baseAtk}${d.crit ? ` · Krit ${Math.round(d.crit * 100)} %` : ''}</div>
        </div>
        <button class="btn primary" data-action="recruit" data-hero="${d.id}" ${blocked || S.gold < cost ? 'disabled' : ''}>Anwerben</button>
      </div>`).join('') : '<div class="card muted small">Alle Helden des Katalogs sind bereits im Lager.</div>'}`);
}

// ---------- Schmiede ---------------------------------------------------
function renderForge() {
  setHTML($('#mystic'), `
    <div class="card small">Schicke Helden ab Lv. ${RETIRE_MIN_LEVEL} in den Ruhestand, um 💠 Mystische Münzen zu erhalten (Lv.²/100). Die Boni hier sind dauerhaft.</div>
    ${MYSTIC_ORDER.map(k => {
      const m = MYSTIC[k];
      const lvl = S.mystic[k];
      const maxed = lvl >= m.costs.length;
      const cost = m.costs[lvl];
      return `<div class="card building">
        <div class="b-icon">${m.icon}</div>
        <div class="b-body">
          <div class="b-title"><b>${m.name}</b><span class="lv">${lvl}/${m.costs.length}</span></div>
          <div class="pips">${m.costs.map((_, j) => `<i class="${j < lvl ? 'on' : ''}"></i>`).join('')}</div>
          <div class="b-eff">${m.sign}${Math.round(lvl * m.per * 100)} %${maxed ? '' : ` <span class="arrow">→</span> ${m.sign}${Math.round((lvl + 1) * m.per * 100)} %`}<div class="b-desc">${m.unit.replace('% ', '')}</div></div>
        </div>
        <div class="b-act">${maxed ? '<button class="btn" disabled>Maximal</button>'
          : `<button class="btn primary" data-action="mystic" data-key="${k}" ${S.coins >= cost ? '' : 'disabled'}>Stufe ${lvl + 1}<small>💠 ${cost}</small></button>`}</div>
      </div>`;
    }).join('')}`);

  setHTML($('#settings'), `
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
      <div class="b-title"><b>🧪 Debug</b></div>
      <button class="btn block" data-action="debug-offline">15 Min. Offline simulieren</button>
    </div>
    <div class="card">
      <button class="btn danger block" data-action="reset">Spielstand zurücksetzen</button>
    </div>
    <p class="muted small center">${GAME.title} · Spielstand v${S.version}<br>Nicht-kommerzielles Fanprojekt. Guild Wars 2 ist eine Marke von ArenaNet/NCSOFT; dieses Projekt ist nicht mit ihnen verbunden.</p>`);
}

// ---------------------------------------------------------------------
//  Modals & Toasts
// ---------------------------------------------------------------------
function openModal(html) {
  const root = $('#modal-root');
  root.innerHTML = `<div class="modal-backdrop" data-action="modal-bg"><div class="modal" role="dialog" aria-modal="true">${html}</div></div>`;
  root.hidden = false;
}
function closeModal() {
  const root = $('#modal-root');
  root.hidden = true;
  root.innerHTML = '';
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
  const st = heroStats(S, h);
  const d = st.def;
  const i = squadOf(S, h.uid);
  return `
    <div class="detail" style="--c:${CLASSES[d.cls].color}">
      ${sprite(CLASSES[d.cls].sprite, 'detail-sprite')}
      <div>
        <div class="hm-name"><b>${esc(d.name)}</b> <span class="lv">Lv. ${h.level}/${levelCap(S)}</span></div>
        <div class="hm-title">„${esc(d.title)}“ · ${esc(d.account || '')}</div>
        <div class="hm-sub">${ROLES[d.role].icon} ${ROLES[d.role].name} · ${CLASSES[d.cls].name}${d.buff ? ` · ${d.buff === 'macht' ? 'Macht (+ATK)' : 'Eile (Tempo)'}` : ''}</div>
      </div>
    </div>
    <div class="stat-grid">
      <span>❤ LP</span><b>${fmt(h.hp)} / ${fmt(st.maxHp)}</b>
      <span>⚔️ ATK</span><b>${fmt(st.atk)}</b>
      <span>🎯 Krit</span><b>${Math.round(st.crit * 100)} %</b>
      <span>✨ EXP</span><b>${fmt(h.exp)} / ${fmt(F.expToNext(h.level))}</b>
      <span>📍 Ort</span><b>${i === -1 ? 'Reserve' : `Zelt ${i + 1}`}</b>
    </div>
    ${h.woundedUntil ? `<div class="b-note">💢 Verwundet – regeneriert in ${clock(h.woundedUntil - S.lastTickMs)}</div>` : ''}`;
}

function heroActions(h, { inSlot = false } = {}) {
  const btns = [];
  if (h.woundedUntil) {
    const c = F.reviveCost(h.level);
    btns.push(`<button class="btn primary" data-action="revive" data-uid="${h.uid}" ${S.gold >= c ? '' : 'disabled'}>⚡ Sofort beleben · 🪙 ${fmt(c)}</button>`);
  } else if (inSlot) {
    btns.push(`<button class="btn" data-action="unassign" data-uid="${h.uid}">In die Reserve</button>`);
  }
  if (h.level >= RETIRE_MIN_LEVEL) {
    btns.push(`<button class="btn danger" data-action="retire" data-uid="${h.uid}">🌅 Ruhestand · +💠 ${F.retireCoins(h.level)}</button>`);
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
      : '<p class="muted small">Die Reserve ist leer. Rekrutiere neue Helden im Reiter 🛡️ Trupps.</p>'}`);
}

function openHeroModal(uid) {
  const h = getHero(S, uid);
  if (!h) return;
  const free = [];
  S.squads.slice(0, S.tentsUnlocked).forEach((sq, i) => sq.slots.forEach((u, slot) => { if (u == null) free.push({ i, slot }); }));
  openModal(`
    <div class="modal-head"><h3>Held</h3><button class="icon-btn" data-action="modal-close" aria-label="Schließen">✕</button></div>
    ${heroDetailHtml(h)}
    ${heroActions(h)}
    ${!h.woundedUntil && squadOf(S, uid) === -1 && free.length ? `<h4>In ein Zelt setzen</h4><div class="btn-row wrap">${free.map(f => `<button class="btn" data-action="assign" data-squad="${f.i}" data-slot="${f.slot}" data-uid="${uid}">Zelt ${f.i + 1} · Platz ${f.slot + 1}</button>`).join('')}</div>` : ''}`);
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
      <div class="tent-head"><b>⛺ Zelt ${r.squad + 1}</b><small>${esc(r.zoneName)} · W ${r.startWave > 10 ? 'Boss' : r.startWave} → ${r.endWave > 10 ? 'Boss' : r.endWave}</small></div>
      <div class="report-grid">
        <span>🪙 +${fmt(r.gold)}</span><span>🔮 +${r.shards}</span>
        <span>✨ +${fmt(r.expPerHero)} EXP/Held</span><span>⚔️ ${fmt(r.kills)} Siege${r.bosses ? ` · 👑 ${r.bosses}` : ''}</span>
      </div>
      <div class="eff"><span>Effizienz</span>${hpBar(r.minEff, 1, effPct < 100 ? 'warn' : 'ok')}<b>${effPct} %</b></div>
      ${effPct < 100 ? '<div class="b-note">Diese Zone ist zu schwer – der Trupp musste sich immer wieder zurückziehen.</div>' : ''}
      ${r.levelUps.length ? `<ul class="lvlups">${r.levelUps.map(l => `<li>⬆️ ${esc(l.name)} Lv. ${l.from} → ${l.to}</li>`).join('')}</ul>` : ''}
    </div>`;
  }).join('');
  openModal(`
    <h3>🌙 Offline-Rissbericht</h3>
    <p class="muted small">${debug ? 'Simuliert: ' : 'Abwesend: '}${fmtDuration(report.elapsedMs)}${report.capped ? ` · gewertet max. ${fmtDuration(GAME.OFFLINE_MAX_MS)}` : ''}</p>
    <div class="card report-total"><span>🪙 +${fmt(t.gold)}</span><span>🔮 +${t.shards}</span><span>⬆️ ${t.levelUps}</span></div>
    ${squads || '<p class="muted">Keine Trupps im Einsatz – nichts passiert.</p>'}
    <button class="btn primary block" data-action="modal-close">Weiter kämpfen</button>`);
}

// Effekte für den aktuell sichtbaren Trupp (Schadenszahlen)
export function showTickFx(ev) {
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
    case 'tab': tab = d.tab; closeModal(); render(); break;
    case 'modal-close': case 'modal-bg': closeModal(); break;
    case 'reload': location.reload(); break;

    // Onboarding
    case 'ob-start': S.onboarding = 1; changed(); break;
    case 'ob-hall':
      if (S.onboarding !== 1) break;
      S.buildings.hall = 1; S.onboarding = 2; tab = 'camp';
      addLog(S, '🏛️ Die Gildenhalle steht.', null, 'info'); changed('Gildenhalle errichtet!'); break;
    case 'ob-recruit': {
      if (S.onboarding !== 2) break;
      const h = createHero(S, ONBOARDING.tank);
      S.squads[0].slots[0] = h.uid; S.onboarding = 3; tab = 'squads';
      changed(`${esc(HERO_BY_ID[h.heroId].name)} tritt der Wacht bei!`); break;
    }
    case 'ob-camp':
      if (S.onboarding !== 3) break;
      S.buildings.camp = 1; S.onboarding = 4; tab = 'camp';
      changed('Zeltlager aufgeschlagen – Level-Cap 10.'); break;
    case 'ob-finish': {
      if (S.onboarding !== 4) break;
      const hl = createHero(S, ONBOARDING.healer);
      const dp = createHero(S, ONBOARDING.dps);
      S.squads[0].slots[1] = hl.uid; S.squads[0].slots[2] = dp.uid;
      S.buildings.portal = 1; S.onboarding = 5; S.selectedSquad = 0; tab = 'portal';
      S.squads[0].status = 'fighting'; spawnMonster(S, S.squads[0]);
      addLog(S, '🌀 Das Riss-Portal flackert auf – der erste Kryptis-Riss öffnet sich!', null, 'boss');
      changed('Der erste Kampf beginnt!'); break;
    }

    // Portal
    case 'select-squad': S.selectedSquad = num(d.squad); render(); break;
    case 'squad-step': stepSquad(num(d.dir)); break;
    case 'zone':
      if (setZone(S, S.selectedSquad, num(d.zone))) changed(); break;

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
    case 'recruit': recruit(d.hero); break;
    case 'retire': {
      const h = getHero(S, num(d.uid));
      if (!h) break;
      confirmModal('🌅 Ruhestand', `${esc(HERO_BY_ID[h.heroId].name)} (Lv. ${h.level}) verlässt das Lager und hinterlässt <b>💠 ${F.retireCoins(h.level)}</b> Mystische Münzen. Der Held kann später neu rekrutiert werden.`, 'retire-confirm', { uid: h.uid });
      break;
    }
    case 'retire-confirm': retire(num(d.uid)); break;

    // Schmiede & Einstellungen
    case 'mystic': {
      const m = MYSTIC[d.key];
      const lvl = S.mystic[d.key];
      if (lvl >= m.costs.length || S.coins < m.costs[lvl]) break;
      S.coins -= m.costs[lvl];
      S.mystic[d.key] += 1;
      changed(`${m.name} Stufe ${lvl + 1}`); break;
    }
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
        closeModal(); tab = 'portal'; changed('Spielstand importiert.');
      } catch (err) { toast(`Import fehlgeschlagen: ${esc(err.message)}`, 3500); }
      break;
    case 'reset':
      confirmModal('⚠️ Zurücksetzen', 'Der komplette Spielstand wird gelöscht. Das kann nicht rückgängig gemacht werden. Vorher exportieren?', 'reset-do');
      break;
    case 'reset-do':
      replaceState(S, createNewState());
      hooks.afterReplace?.();
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
  render();
}

function build(key) {
  if (S.onboarding < 5) return;
  const b = BUILDINGS[key];
  const next = S.buildings[key] + 1;
  if (next > b.max) return;
  if (key !== 'hall' && next > S.buildings.hall) { toast(`Benötigt Gildenhalle Stufe ${next}.`); return; }
  if (!pay(S, buildingCost(key, next))) { toast('Nicht genug Ressourcen.'); return; }
  S.buildings[key] = next;
  addLog(S, `${b.icon} ${b.name} auf Stufe ${next} ausgebaut.`, null, 'info');
  changed(`${b.name} Stufe ${next}!`);
}

function recruit(heroId) {
  if (S.onboarding < 5 || isOwned(S, heroId) || !HERO_BY_ID[heroId]) return;
  if (!pay(S, { gold: nextRecruitCost(S) })) { toast('Nicht genug Gold.'); return; }
  S.heroesPaid += 1;
  const h = createHero(S, heroId);
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
  if (!h || h.level < RETIRE_MIN_LEVEL) return;
  const i = squadOf(S, uid);
  if (i !== -1) {
    const sq = S.squads[i];
    sq.slots[sq.slots.indexOf(uid)] = null;
    if (!sq.slots.some(u => u != null)) { sq.status = 'idle'; sq.monster = null; }
  }
  const coins = F.retireCoins(h.level);
  S.coins += coins;
  S.heroes = S.heroes.filter(x => x.uid !== uid);
  S.stats.retired += 1;
  addLog(S, `🌅 ${HERO_BY_ID[h.heroId].name} geht in den Ruhestand (+${coins}💠).`, null, 'info');
  closeModal();
  changed(`+💠 ${coins} Mystische Münzen`);
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
