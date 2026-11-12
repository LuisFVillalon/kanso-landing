// Scripted, repeatable stills and clips of the real kanso app (headless Chrome over CDP), for the
// landing page's media slots A1–A7. Demo data only: the fictional student Maya from mock.mjs.
//
//   node rec.mjs still <slot> <light|dark> <out.webp> [phone]   one still (1600×1000, or 780×1688 with "phone")
//   node rec.mjs stills <outDir>                                 every still the page uses, both themes
//   node rec.mjs clip <slot> <light|dark> <outDir>               screencast frames for encode.mjs
//
// Needs mock.mjs on MOCK (default http://localhost:4991), kanso-frontend built against it and served
// on APP (default http://localhost:3127), and Chrome with --remote-debugging-port=CDP (default 9351).
// See README.md.
//
// The page's clock is frozen at NOW (Thursday 9:05 AM, the same instant mock.mjs uses), so every
// take shows the same week. For clips it also runs SLOW times slower than real (CSS and Web
// animations via Animation.setPlaybackRate; setTimeout, setInterval, Date and performance.now via
// the init script), and the frame timestamps are divided back, so a busy machine that paints
// ~12 fps still gives a smooth 30 fps video at true speed.
import fs from 'node:fs';
import path from 'node:path';

const APP = process.env.APP || 'http://localhost:3127';
const MOCK = process.env.MOCK || 'http://localhost:4991';
const CDP = process.env.CDP || '9351';
const NOW = process.env.KANSO_NOW || '2026-11-12T09:05:00';
const TZ = 'America/Los_Angeles';
const sleepReal = ms => new Promise(r => setTimeout(r, ms));

// ---------------------------------------------------------------------------------------------
// A take: one fresh tab, signed in as Maya with a fake unsigned session, theme and clock set.
// ---------------------------------------------------------------------------------------------
export async function openTake({ theme, width, height, dpr, mobile, slow = 1 }) {
  await fetch(`${MOCK}/__reset`);
  const target = await (await fetch(`http://127.0.0.1:${CDP}/json/new?about:blank`, { method: 'PUT' })).json();
  const ws = new WebSocket(target.webSocketDebuggerUrl);
  await new Promise(r => ws.addEventListener('open', r, { once: true }));
  let id = 0; const pending = new Map(); const listeners = [];
  ws.addEventListener('message', ev => {
    const m = JSON.parse(ev.data);
    if (m.id && pending.has(m.id)) { pending.get(m.id)(m); pending.delete(m.id); return; }
    for (const l of listeners) l(m);
  });
  const send = (method, params = {}) => new Promise((res, rej) => { const i = ++id; pending.set(i, m => m.error ? rej(new Error(method + ': ' + m.error.message)) : res(m.result)); ws.send(JSON.stringify({ id: i, method, params })); });
  const js = async expr => { const r = await send('Runtime.evaluate', { expression: expr, awaitPromise: true, returnByValue: true }); if (r.exceptionDetails) throw new Error(expr.slice(0, 80) + ' :: ' + JSON.stringify(r.exceptionDetails).slice(0, 300)); return r.result.value; };

  await send('Page.enable'); await send('Runtime.enable'); await send('Animation.enable');
  await send('Emulation.setDeviceMetricsOverride', { width, height, deviceScaleFactor: dpr, mobile });
  if (mobile) await send('Emulation.setTouchEmulationEnabled', { enabled: true, maxTouchPoints: 5 });
  await send('Emulation.setTimezoneOverride', { timezoneId: TZ });
  await send('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-color-scheme', value: theme }, { name: 'prefers-reduced-motion', value: 'no-preference' }] });

  // Freeze "now" at NOW and slow every clock by `slow`.
  const CLOCK = `(() => { const S = ${slow}; const F = new Date(${JSON.stringify(NOW)}).getTime(); const RD = Date, rn = RD.now, rp = performance.now.bind(performance), b = rn(), bp = rp();
    const now = () => F + (rn() - b) / S;
    function D(...a) { return a.length ? new RD(...a) : new RD(now()); } D.prototype = RD.prototype; D.now = now; D.parse = RD.parse; D.UTC = RD.UTC;
    Object.setPrototypeOf(D, RD); globalThis.Date = D; performance.now = () => bp + (rp() - bp) / S;
    if (S !== 1) { const st = setTimeout, si = setInterval; globalThis.setTimeout = (f, ms = 0, ...a) => st(f, ms * S, ...a); globalThis.setInterval = (f, ms = 0, ...a) => si(f, ms * S, ...a); } })();`;
  await send('Page.addScriptToEvaluateOnNewDocument', { source: CLOCK });

  // Sign in as Maya without any network call: a fake, unsigned Supabase session in localStorage.
  const exp = Math.floor(Math.max(Date.now(), new Date(NOW).getTime()) / 1000) + 30 * 86400;
  const b64 = o => Buffer.from(JSON.stringify(o)).toString('base64url');
  const user = { id: 'demo-u1', aud: 'authenticated', role: 'authenticated', email: 'maya@example.com', app_metadata: { provider: 'email' }, user_metadata: { name: 'Maya' } };
  const token = `${b64({ alg: 'HS256', typ: 'JWT' })}.${b64({ sub: 'demo-u1', exp, role: 'authenticated', aud: 'authenticated', email: 'maya@example.com' })}.sig`;
  const session = { access_token: token, refresh_token: 'r', token_type: 'bearer', expires_at: exp, expires_in: 2592000, user };
  await send('Page.navigate', { url: `${APP}/login` }); await waitLoad(js);
  await js(`(() => { localStorage.clear(); localStorage.setItem('sb-placeholder-auth-token', ${JSON.stringify(JSON.stringify(session))});
    localStorage.setItem('tm_theme', ${JSON.stringify(theme)}); return 1 })()`);

  const take = { send, js, ws, target, slow, width, height, dpr, mobile, theme, listeners };
  Object.assign(take, helpers(take));
  return take;
}

async function waitLoad(js, ms = 15000) {
  const end = Date.now() + ms;
  while (Date.now() < end) { try { if (await js('document.readyState') === 'complete') return; } catch { /* navigating */ } await sleepReal(100); }
}

export async function closeTake(t) {
  await fetch(`http://127.0.0.1:${CDP}/json/close/${t.target.id}`); t.ws.close();
}

// ---------------------------------------------------------------------------------------------
// Helpers every scenario uses. Times are in video time: real time × slow.
// ---------------------------------------------------------------------------------------------
function helpers(t) {
  const { js, send } = t;
  const sleep = ms => sleepReal(ms * t.slow);
  let cx = t.width * 0.62, cy = t.height * 0.55; let cursor = false;
  const ease = k => k < 0.5 ? 4 * k * k * k : 1 - Math.pow(-2 * k + 2, 3) / 2;

  /** Waits until `cond` (a JS expression) is truthy in the page. */
  async function until(cond, ms = 15000) {
    const end = Date.now() + ms * t.slow;
    while (Date.now() < end) { try { if (await js(`!!(${cond})`)) return; } catch { /* page still loading */ } await sleepReal(120); }
    throw new Error('timed out waiting for: ' + cond);
  }
  /** Client-side navigation keeps the frozen clock; a full load re-runs the init script anyway. */
  async function go(p, ready) {
    await send('Page.navigate', { url: `${APP}${p}` }); await waitLoad(js);
    if (ready) await until(ready, 30000);
    await hideDevChrome();
  }
  async function hideDevChrome() {
    await js(`(() => { if (!document.getElementById('rec-style')) { const s = document.createElement('style'); s.id = 'rec-style';
      s.textContent = 'nextjs-portal{display:none!important} #rec-cursor{position:fixed;left:0;top:0;width:22px;height:22px;z-index:2147483647;pointer-events:none} #rec-cursor .ring{position:absolute;left:-10px;top:-12px;width:28px;height:28px;border-radius:50%;background:rgba(25,24,23,.22);transform:scale(0);opacity:0}#rec-cursor.down .ring{animation:rc .45s ease-out}@keyframes rc{0%{transform:scale(.3);opacity:1}100%{transform:scale(1.4);opacity:0}}';
      document.head.appendChild(s); } return 1 })()`);
  }
  /** Clips only: a visible cursor that follows the mouse events we send. */
  async function showCursor() {
    cursor = true;
    await js(`(() => { if (document.getElementById('rec-cursor')) return 1; const c = document.createElement('div'); c.id = 'rec-cursor';
      c.innerHTML = '<div class="ring"></div><svg width="22" height="22" viewBox="0 0 24 24"><path d="M5 3l14 8-6.2 1.6L10 19z" fill="#191817" stroke="#FBF8F1" stroke-width="1.6" stroke-linejoin="round"/></svg>';
      document.body.appendChild(c); window.__cur = (x, y) => { c.style.transform = 'translate(' + (x - 4) + 'px,' + (y - 2) + 'px)'; };
      window.__click = () => { c.classList.remove('down'); void c.offsetWidth; c.classList.add('down'); }; return 1 })()`);
    await js(`__cur(${cx}, ${cy})`);
  }
  async function moveTo(x, y, ms = 650) {
    if (!cursor) { cx = x; cy = y; await send('Input.dispatchMouseEvent', { type: 'mouseMoved', x, y }); return; }
    const x0 = cx, y0 = cy, start = Date.now(), dur = ms * t.slow;
    for (;;) {
      const k = Math.min(1, (Date.now() - start) / dur); const e = ease(k);
      const px = x0 + (x - x0) * e, py = y0 + (y - y0) * e;
      await js(`window.__cur && __cur(${px}, ${py})`); await send('Input.dispatchMouseEvent', { type: 'mouseMoved', x: px, y: py });
      if (k >= 1) break; await sleepReal(30);
    }
    cx = x; cy = y;
  }
  async function click() {
    if (cursor) await js('window.__click && __click()');
    await send('Input.dispatchMouseEvent', { type: 'mousePressed', x: cx, y: cy, button: 'left', clickCount: 1 });
    await sleep(60);
    await send('Input.dispatchMouseEvent', { type: 'mouseReleased', x: cx, y: cy, button: 'left', clickCount: 1 });
  }
  /** Center of the element `find` (a JS function expression returning an element). */
  async function center(find) {
    const r = await js(`(() => { const el = (${find})(); if (!el) return null; el.scrollIntoView({ block: 'nearest' }); const b = el.getBoundingClientRect(); return [b.x + b.width / 2, b.y + b.height / 2]; })()`);
    if (!r) throw new Error('not found: ' + find); return r;
  }
  async function clickOn(find, ms = 600) { const [x, y] = await center(find); await moveTo(x, y, ms); await sleep(110); await click(); }
  /** Typing on a schedule: if a keystroke's render lags, the next ones catch up together. */
  async function type(text, cps = 20) {
    const start = Date.now(); let i = 0;
    while (i < text.length) { const due = Math.min(text.length, Math.floor((Date.now() - start) / (1000 * t.slow / cps)) + 1); if (due > i) { await send('Input.insertText', { text: text.slice(i, due) }); i = due; } else await sleepReal(20); }
  }
  async function key(k, code, keyCode, text) {
    await send('Input.dispatchKeyEvent', { type: 'keyDown', key: k, code, text, windowsVirtualKeyCode: keyCode });
    await send('Input.dispatchKeyEvent', { type: 'keyUp', key: k, code, windowsVirtualKeyCode: keyCode });
  }
  /** Clips only: a "T · New task" style hint for a keyboard shortcut. */
  async function keyHint(k, label) {
    if (!cursor) return;
    await js(`(() => { const d=document.createElement('div'); d.id='rec-key'; d.innerHTML='<span style="display:inline-flex;align-items:center;justify-content:center;min-width:34px;height:34px;padding:0 8px;border-radius:8px;background:#191817;color:#F4EFE4;font:600 17px/1 system-ui;box-shadow:0 3px 0 #000">${k}</span><span style="margin-left:10px">${label}</span>'; d.style.cssText='position:fixed;left:50%;bottom:36px;transform:translateX(-50%);z-index:2147483646;display:flex;align-items:center;padding:8px 14px 8px 8px;border-radius:12px;background:rgba(251,248,241,.96);border:1px solid #D9D2C3;font:500 15px system-ui;color:#191817;transition:opacity .4s'; document.body.appendChild(d); setTimeout(() => { d.style.opacity = '0'; setTimeout(() => d.remove(), 500); }, 1200); return 1 })()`);
  }
  /** Sets a native date/time input the way React sees a user change it. */
  const setVal = (sel, v) => js(`(() => { const el=document.querySelector(${JSON.stringify(sel)}); Object.getOwnPropertyDescriptor(HTMLInputElement.prototype,'value').set.call(el, ${JSON.stringify(v)}); el.dispatchEvent(new Event('input',{bubbles:true})); el.dispatchEvent(new Event('change',{bubbles:true})); return 1 })()`);
  /** Waits for fonts, images and two frames, so a still never catches a half-painted state. */
  async function settle(ms = 600) {
    await js(`(async () => { await document.fonts.ready; await Promise.all([...document.images].filter(i => !i.complete).map(i => new Promise(r => { i.onload = i.onerror = r; }))); await new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r))); return 1 })()`);
    await sleep(ms);
  }
  return { sleep, until, go, showCursor, moveTo, click, center, clickOn, type, key, keyHint, setVal, settle };
}

const byText = (sel, text) => `() => [...document.querySelectorAll(${JSON.stringify(sel)})].find(e => e.offsetParent !== null && e.textContent.trim().startsWith(${JSON.stringify(text)}))`;
const ymd = d => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
const dayFromNow = (n, dow) => { const d = new Date(NOW); d.setHours(0, 0, 0, 0); d.setDate(d.getDate() + n); while (dow != null && d.getDay() !== dow) d.setDate(d.getDate() + 1); return d; };

// ---------------------------------------------------------------------------------------------
// Scenarios, one per slot. Each one drives the real UI to the slot's still. In a clip take the
// same steps play with a cursor; what each clip adds after the still is listed in README.md.
// ---------------------------------------------------------------------------------------------
const HOME_READY = `[...document.querySelectorAll('h1,h2,h3,p,span')].some(e => /Focus next|Daily Brief|Daily brief/.test(e.textContent))`;

export const SCENARIOS = {
  // Suggested work times: T → title → due date → 1 hour → pick a time.
  async A1(t) {
    await t.go('/', HOME_READY);
    await t.settle(800);
    await t.keyHint('T', 'New task');
    await t.key('t', 'KeyT', 84, 't');
    await t.until(`document.querySelector('.modal-panel input[placeholder="Enter task title"]')`);
    await t.sleep(400);
    await t.clickOn(`() => document.querySelector('.modal-panel input[placeholder="Enter task title"]')`, 450);
    await t.type('Write speech outline', 32);
    await t.sleep(200);
    await t.clickOn(`() => document.querySelector('.modal-panel input[type=date]')`, 450);
    await t.setVal('.modal-panel input[type=date]', ymd(dayFromNow(2, 3))); // next week's Wednesday
    await t.sleep(250);
    await t.clickOn(`() => document.querySelector('.modal-panel input[type=time]')`, 400);
    await t.setVal('.modal-panel input[type=time]', '10:00');
    await t.sleep(300);
    await t.clickOn(byText('.modal-panel button', '1 hour'), 500);
    await t.until(`[...document.querySelectorAll('[data-when-to-work] button')].some(b => /AM|PM/.test(b.textContent))`);
    await t.sleep(450);
    await t.js(`(() => { const p=document.querySelector('.modal-panel'); const w=document.querySelector('[data-when-to-work]'); p.scrollTo({ top: p.scrollTop + w.getBoundingClientRect().top - p.getBoundingClientRect().top - ${t.mobile ? 60 : 150}, behavior: 'smooth' }); return 1 })()`);
    await t.sleep(900);
    const row = `() => [...document.querySelectorAll('[data-when-to-work] button')].find(b => !b.getAttribute('role') && !b.getAttribute('aria-label') && /AM|PM/.test(b.textContent))`;
    await t.clickOn(row, 600);
    await t.sleep(800);
  },

  // Daily brief on the home page.
  async A2(t) {
    await t.go('/', HOME_READY);
    await t.settle(1200);
  },

  // The week view with classes, shifts, Google events and work blocks.
  async A3(t) {
    await t.js(`localStorage.setItem('tm-calendar-view:demo-u1', JSON.stringify('week')); 1`);
    await t.go('/calendar', `[...document.querySelectorAll('*')].some(e => e.children.length === 0 && /Shift at the library/.test(e.textContent))`);
    await t.settle(1200);
  },

  // Home widgets: Focus timer, Free time left, term countdown (the Widgets tab under the Daily brief).
  async A4(t) {
    await t.go('/', HOME_READY);
    await t.until(`document.querySelector('section[aria-label="Widgets"]')`);
    await t.settle(800);
    await t.js(`(() => { const s = document.querySelector('section[aria-label="Widgets"]'); scrollBy({ top: s.getBoundingClientRect().top - 24, behavior: 'instant' }); return 1 })()`);
    await t.settle(800);
  },

  // A note open in the editor.
  async A5(t) {
    await t.go('/notes', `[...document.querySelectorAll('*')].some(e => e.children.length === 0 && /Cell respiration review/.test(e.textContent))`);
    await t.settle(500);
    await t.clickOn(byText('h3', 'Cell respiration review'), 600);
    await t.until(`document.querySelector('.ProseMirror') && /Glycolysis/.test(document.querySelector('.ProseMirror').textContent)`);
    await t.settle(1000);
  },

  // The day's mood check-in, filled in.
  async A6(t) {
    await t.go('/', HOME_READY);
    await t.settle(600);
    await t.clickOn(byText('button', 'Log mood'), 600);
    await t.until(`[...document.querySelectorAll('button')].some(b => b.offsetParent && /^Good$/.test((b.getAttribute('aria-label')||b.textContent).trim()))`);
    await t.sleep(400);
    await t.clickOn(`() => [...document.querySelectorAll('button')].find(b => b.offsetParent && /^Good$/.test((b.getAttribute('aria-label')||b.textContent).trim()))`, 600);
    await t.sleep(400);
    await t.clickOn(byText('button', 'Steady'), 500);
    await t.sleep(300);
    for (const m of ['Slept well', 'Exercised']) { await t.clickOn(byText('button', m), 500); await t.sleep(300); }
    await t.moveTo(t.width - 40, t.height - 40, 400); // off the moment, and out of focus, so its edit tools hide
    await t.js('document.activeElement?.blur(); 1');
    await t.settle(800);
  },

  // Reports › Productivity › Overview for this week, with the Pace card.
  async A7(t) {
    await t.go('/reports', `[...document.querySelectorAll('*')].some(e => e.children.length === 0 && /^Pace/.test(e.textContent.trim()))`);
    await t.settle(1500);
  },
};

// ---------------------------------------------------------------------------------------------
// Stills and clips
// ---------------------------------------------------------------------------------------------
const DESKTOP = { width: 1280, height: 800 }; // ×1.25 DPR → 1600×1000
const PHONE = { width: 390, height: 844 }; // ×2 DPR → 780×1688

export async function still(slot, theme, out, phone = false) {
  const vp = phone ? PHONE : DESKTOP;
  // Desktop renders at 1.25× straight to 1600×1000: scaling a 2× capture down re-lays out the text
  // with hinted glyph advances, which spaces letters unevenly.
  const t = await openTake({ theme, ...vp, dpr: phone ? 2 : 1.25, mobile: phone });
  try {
    await SCENARIOS[slot](t);
    const r = await t.send('Page.captureScreenshot', { format: 'webp', quality: 80 });
    fs.mkdirSync(path.dirname(out), { recursive: true });
    fs.writeFileSync(out, Buffer.from(r.data, 'base64'));
    console.log(path.basename(out), (fs.statSync(out).size / 1024).toFixed(0) + ' KB');
  } finally { await closeTake(t); }
}

export async function clip(slot, theme, outDir) {
  const slow = Number(process.env.SLOW || 12);
  const t = await openTake({ theme, width: 1280, height: 800, dpr: 1.25, mobile: false, slow });
  fs.rmSync(outDir, { recursive: true, force: true });
  fs.mkdirSync(path.join(outDir, 'raw'), { recursive: true });
  const frames = []; let capturing = false;
  t.listeners.push(m => {
    if (m.method !== 'Page.screencastFrame') return;
    const { data, metadata, sessionId } = m.params;
    t.send('Page.screencastFrameAck', { sessionId });
    if (!capturing) return;
    const f = path.join(outDir, 'raw', `${String(frames.length).padStart(5, '0')}.jpg`);
    fs.writeFileSync(f, Buffer.from(data, 'base64'));
    frames.push({ t: metadata.timestamp / slow, f });
  });
  try {
    // Load the start page at full speed, then slow the animations and start capturing.
    const run = SCENARIOS[slot];
    const goReal = t.go;
    t.go = async (p, ready) => { await goReal(p, ready); await t.showCursor(); await t.send('Animation.setPlaybackRate', { playbackRate: 1 / slow }); if (!capturing) { capturing = true; await t.send('Page.startScreencast', { format: 'jpeg', quality: 90, everyNthFrame: 1 }); } };
    await run(t);
    await t.sleep(1500);
    const endT = Date.now() / 1000 / slow;
    await t.send('Page.stopScreencast'); capturing = false;
    fs.writeFileSync(path.join(outDir, 'frames.json'), JSON.stringify({ fps: 30, frames, endT }));
    console.log(slot, theme, 'frames', frames.length);
  } finally { await closeTake(t); }
}

/** Every still content/site.ts references, in both themes. */
export async function stills(outDir) {
  for (const theme of ['light', 'dark']) {
    for (const slot of Object.keys(SCENARIOS)) await still(slot, theme, path.join(outDir, `${slot.toLowerCase()}-${theme}.webp`));
    await still('A1', theme, path.join(outDir, `a1-phone-${theme}.webp`), true);
  }
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const [cmd, ...a] = process.argv.slice(2);
  if (cmd === 'still') await still(a[0], a[1], a[2], a[3] === 'phone');
  else if (cmd === 'stills') await stills(a[0]);
  else if (cmd === 'clip') await clip(a[0], a[1], a[2]);
  else { console.error('usage: node rec.mjs still <slot> <light|dark> <out.webp> [phone] | stills <outDir> | clip <slot> <light|dark> <outDir>'); process.exit(2); }
}
