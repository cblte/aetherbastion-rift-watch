// =====================================================================
//  Start & Spielschleife
//  Die Schleife verlässt sich nie auf setTimeout-Genauigkeit: Sie misst
//  die echte Zeit seit lastTickMs. Kleine Lücken werden mit festen Ticks
//  aufgeholt, große (Hintergrund, Drosselung, App geschlossen) über die
//  deterministische Offline-Berechnung.
// =====================================================================
import { GAME } from './config.js';
import { createNewState, load, save } from './state.js';
import { tick } from './combat.js';
import { runOffline } from './offline.js';
import { initUI, render, showTickFx, showOfflineReport, showUpdateAvailable } from './ui.js';

const state = load() || createNewState();
let lastSave = Date.now();
let loopTimer = 0;

function persist() {
  save(state);
  lastSave = Date.now();
}

function vibrate(levelUps) {
  if (levelUps > 0 && state.settings.vibrate && navigator.vibrate) navigator.vibrate(40);
}

// Holt verpasste Zeit nach. Gibt true zurück, wenn sich etwas geändert hat.
function catchUp({ showReport = true } = {}) {
  const now = Date.now();
  const elapsed = now - state.lastTickMs;
  if (elapsed < GAME.TICK_MS) return false;

  if (elapsed > GAME.CATCHUP_THRESHOLD_MS) {
    const report = runOffline(state, elapsed);
    state.lastTickMs = now;
    if (showReport && elapsed >= GAME.OFFLINE_REPORT_MIN_MS && report.squads.length) {
      showOfflineReport(report);
      vibrate(report.totals.levelUps);
    }
    persist();
    return true;
  }

  let levelUps = 0;
  while (state.lastTickMs + GAME.TICK_MS <= now) {
    const ev = tick(state);
    levelUps += ev.levelUps.length;
    showTickFx(ev);
  }
  vibrate(levelUps);
  return true;
}

function loop() {
  clearTimeout(loopTimer);
  if (!document.hidden) {
    if (catchUp()) render();
    if (Date.now() - lastSave >= GAME.AUTOSAVE_MS) persist();
  }
  loopTimer = setTimeout(loop, GAME.LOOP_MS);
}

document.addEventListener('visibilitychange', () => {
  if (document.hidden) persist();
  else loop(); // sofort nachholen
});
window.addEventListener('pagehide', persist);

initUI(state, {
  save: persist,
  afterReplace: () => { state.lastTickMs = Date.now(); persist(); },
  onLevelUps: vibrate,
});
loop();

// ---------------------------------------------------------------------
//  Service Worker
// ---------------------------------------------------------------------
if ('serviceWorker' in navigator && location.protocol !== 'file:') {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('./sw.js').then((reg) => {
      reg.addEventListener('updatefound', () => {
        const nw = reg.installing;
        nw?.addEventListener('statechange', () => {
          if (nw.state === 'installed' && navigator.serviceWorker.controller) showUpdateAvailable();
        });
      });
    }).catch((e) => console.warn('Service Worker nicht registriert', e));
  });
}
