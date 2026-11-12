// Mock kanso API for the landing-page stills and clips. Fictional demo student "Maya", Fall 2026
// term (Aug 24 – Dec 11). No real user data, ever.
//
// Every date is relative to NOW, a frozen Thursday 9:05 AM (KANSO_NOW, default 2026-11-12T09:05),
// in America/Los_Angeles. rec.mjs freezes the page's clock to the same instant, so every take
// shows the same week, the same suggested times and the same "29 days left" on any day.
//
// usage: node mock.mjs            (MOCK_PORT, default 4991)
// GET /__reset puts work blocks, tasks and check-ins back between takes.
import http from 'node:http';

process.env.TZ = 'America/Los_Angeles';

const PORT = Number(process.env.MOCK_PORT || 4991);
const NOW = new Date(process.env.KANSO_NOW || '2026-11-12T09:05:00');
const pad = n => String(n).padStart(2, '0');
const T0 = new Date(NOW); T0.setHours(0, 0, 0, 0);
const day = off => { const d = new Date(T0); d.setDate(d.getDate() + off); return d; };
const ds = off => { const d = day(off); return `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`; };
const dsOf = d => `${d.getFullYear()}-${pad(d.getMonth() + 1)}-${pad(d.getDate())}`;
const at = (off, h) => { const d = day(off); d.setMinutes(Math.round(h * 60)); return d; };
// Offset of the next given weekday (Sun=0..Sat=6) on or after `from`.
const nextDow = (dow, from = 0) => { for (let i = from; i < from + 8; i++) if (day(i).getDay() === dow) return i; return from; };
const MON = nextDow(1, -6); // Monday of this week
let seed = 11; const rnd = () => { seed = (seed * 16807) % 2147483647; return seed / 2147483647; };

const COMM = { id: 1, name: 'COMM 103', color: '#8B5CF6' }, BIO = { id: 2, name: 'BIO 210', color: '#14B8A6' },
  WORK = { id: 3, name: 'Library job', color: '#E11D74' }, SPAN = { id: 4, name: 'Spanish', color: '#D97706' },
  CS = { id: 5, name: 'CS 160', color: '#3B82F6' };
const TAGS = [COMM, BIO, WORK, SPAN, CS];

// ---- Events: Maya's classes, lab and library shifts (kanso), study group and advisor (Google) ----
const ev = (series, title, off, s, e, tags, x = {}) => {
  const a = at(off, s), b = at(off, e);
  return { event_id: series, occurrence_date: ds(off), title, description: null, tags, all_day: false, date: ds(off), end_date: ds(off),
    start_time: `${pad(a.getHours())}:${pad(a.getMinutes())}:00`, end_time: `${pad(b.getHours())}:${pad(b.getMinutes())}:00`,
    starts_at: a.toISOString(), ends_at: b.toISOString(), time_zone: 'America/Los_Angeles', repeat_days: [], repeat_interval: 1,
    reminder_minutes: null, edited: false, past: b < NOW, archived: false, source: 'kanso', ...x };
};
const events = [];
for (let w = -63; w <= 21; w += 7) {
  const m = MON + w;
  events.push(ev(1, 'COMM 103 lecture', m, 10, 11.25, [COMM]), ev(1, 'COMM 103 lecture', m + 2, 10, 11.25, [COMM]));
  events.push(ev(2, 'CS 160 lecture', m + 1, 13, 14.25, [CS]), ev(2, 'CS 160 lecture', m + 3, 13, 14.25, [CS]));
  events.push(ev(3, 'BIO 210 lab', m + 4, 9, 12, [BIO]));
  events.push(ev(4, 'Shift at the library', m, 14, 17, [WORK]), ev(4, 'Shift at the library', m + 2, 14, 17, [WORK]), ev(4, 'Shift at the library', m + 3, 15, 18, [WORK]));
  events.push(ev(5, 'Study group', m + 1, 16, 17, [BIO], { source: 'google' }), ev(6, 'Advisor check-in', m + 3, 11.5, 12, [], { source: 'google' }));
}
events.sort((a, b) => a.starts_at.localeCompare(b.starts_at));

// ---- Tasks: what's open now, plus eight weeks of finished work for Reports ----
const task = (id, title, dueOff, due_time, est, tags = [], x = {}) => ({ id, title, description: '', completed: false, priority: null,
  due_date: dueOff == null ? null : ds(dueOff), due_time, tags, created_date: `${ds(-5)}T09:00:00`, completed_date: null,
  estimated_time: est, parent_task_id: null, archived_at: null, category: null, ...x });
const OPEN = [
  task(11, 'BIO 210 lab report', nextDow(2, 1), '11:00:00', 2, [BIO], { priority: 1 }),
  task(12, 'CS 160 problem set 6', nextDow(5, 1), '17:00:00', 1.5, [CS], { priority: 2 }),
  task(13, 'Read ch. 7 and take notes', nextDow(1, 1), '10:00:00', 1, [COMM]),
  task(14, 'Spanish vocab quiz', nextDow(3, 1), '09:00:00', 0.5, [SPAN]),
  task(15, 'Email advisor about spring classes', 0, '17:00:00', 0.25, []),
  task(16, 'Submit timesheet', 0, '18:00:00', 0.25, [WORK]),
];
const DONE_TITLES = [['BIO 210 reading', BIO], ['CS 160 lab', CS], ['COMM 103 reflection', COMM], ['Spanish worksheet', SPAN], ['Restock returns cart', WORK], ['Review lecture notes', null]];
const done = [];
let tid = 100;
for (let off = -63; off < 0; off++) {
  const w = day(off).getDay();
  const n = w === 0 || w === 6 ? Math.floor(rnd() * 2) : 1 + Math.floor(rnd() * 3);
  for (let i = 0; i < n; i++) {
    const [t, tag] = DONE_TITLES[Math.floor(rnd() * DONE_TITLES.length)];
    // This week's land in the evening, so the week view (A3) stays readable.
    const fin = at(off, off >= MON - 1 ? 19 + i * 0.5 : 10 + Math.floor(rnd() * 9));
    done.push(task(tid++, `${t} ${1 + (tid % 9)}`, off, null, [0.5, 1, 1.5][Math.floor(rnd() * 3)], tag ? [tag] : [], { completed: true, completed_date: fin.toISOString() }));
  }
}
// This week is going well: a couple more finished each day, so Reports' Pace reads ahead of last week.
for (let off = MON; off < 0; off++) for (const [t, tag] of [['BIO 210 pre-lab', BIO], ['CS 160 reading', CS], ['COMM 103 peer review', COMM]]) {
  done.push(task(tid++, t, off, null, 1, [tag], { completed: true, completed_date: at(off, 20 + (tid % 3) * 0.5).toISOString() }));
}
let tasks = [...OPEN];

// ---- Habits, with streaks that match their history ----
const habits = [
  { id: 1, title: 'Morning run', current_streak: 12, max_streak: 20, logged_today: true, tags: [], estimated_time: 0.5, planned_time: null, archived_at: null },
  { id: 2, title: 'Read 20 pages', current_streak: 5, max_streak: 9, logged_today: false, tags: [], estimated_time: 0.5, planned_time: null, archived_at: null },
  { id: 3, title: 'Spanish practice', current_streak: 21, max_streak: 21, logged_today: false, tags: [SPAN], estimated_time: 0.25, planned_time: null, archived_at: null },
  { id: 4, title: 'Drink water', current_streak: 30, max_streak: 34, logged_today: false, tags: [], estimated_time: 0, planned_time: null, archived_at: null },
];
const habitDone = [];
for (let off = -63; off <= 0; off++) {
  const streakDay = (h) => off > -h.current_streak - (h.logged_today ? 0 : 1) && (off < 0 || h.logged_today);
  for (const h of habits) {
    const gap = off === -h.current_streak - (h.logged_today ? 0 : 1); // the day before the streak began was missed
    if (streakDay(h) || (!gap && off < 0 && rnd() < 0.65)) habitDone.push({ habit_id: h.id, habit_title: h.title, date: ds(off), estimated_time: h.estimated_time });
  }
}

// ---- Notes and the time spent in them ----
const note = (id, title, tags, html, off) => ({ id, title, content: html, tags, created_date: `${ds(off)}T17:00:00`, updated_date: `${ds(off)}T18:30:00`, archived_at: null, is_pinned: false });
const notes = [
  note(1, 'Cell respiration review', [BIO], '<h2>Glycolysis</h2><p>Happens in the cytoplasm. 1 glucose → 2 pyruvate, <mark>net 2 ATP</mark>.</p><ul><li><p>Investment phase: uses 2 ATP</p></li><li><p>Payoff phase: makes 4 ATP and 2 NADH</p></li></ul><h2>Krebs cycle</h2><p>In the mitochondrial matrix. Each pyruvate becomes acetyl-CoA first, then the cycle turns twice per glucose.</p><ul><li><p>2 ATP, 6 NADH, 2 FADH₂ per glucose</p></li><li><p>CO₂ is released here</p></li></ul><h2>Electron transport chain</h2><p>Most of the ATP comes from here: about 26 to 28 per glucose. Oxygen is the final electron acceptor.</p>', -1),
  note(2, 'Speech outline: campus food waste', [COMM], '<h2>Hook</h2><p>Every day the dining hall throws out…</p><h2>Three points</h2><ol><li><p>What we waste</p></li><li><p>Why it happens</p></li><li><p>What we can change</p></li></ol>', -2),
  note(3, 'Recursion notes', [CS], '<p>Base case first. Then trust the recursive call.</p>', -3),
  note(4, 'Verbos irregulares', [SPAN], '<table><tbody><tr><td><p>ser</p></td><td><p>fui</p></td></tr><tr><td><p>ir</p></td><td><p>fui</p></td></tr></tbody></table>', -4),
];
const sessions = [];
let sid = 1;
for (let off = -63; off < 0; off++) {
  if (rnd() < 0.45) continue;
  const n = notes[Math.floor(rnd() * notes.length)];
  const st = at(off, 19 + rnd()); const mins = 15 + Math.floor(rnd() * 60); const en = new Date(st.getTime() + mins * 60000);
  sessions.push({ id: sid++, note_id: n.id, note_title: n.title, started_at: st.toISOString(), ended_at: en.toISOString(), duration_seconds: mins * 60 });
}

// ---- Mood check-ins: energy and mood dip on library shift days, so Patterns has something true to say ----
const SHIFT = new Set([1, 3, 4]);
const MOMENTS = ['Slept well', 'Exercised', 'Outdoors', 'Social', 'Focused', 'Busy', 'Tired'];
const baseCheckins = [];
let mid = 1;
for (let off = -62; off < 0; off++) {
  if (off < MON && rnd() < 0.25) continue; // every day this week is logged
  const w = day(off).getDay(); const shift = SHIFT.has(w);
  const mood = Math.max(1, Math.min(5, (shift ? 3 : 4) + (rnd() < 0.3 ? 1 : 0) - (rnd() < 0.2 ? 1 : 0)));
  const energy = Math.max(1, Math.min(5, (shift ? 2 : 4) + (rnd() < 0.25 ? 1 : 0)));
  const stress = Math.max(1, Math.min(5, (shift ? 4 : 2) - (rnd() < 0.3 ? 1 : 0)));
  const tags = MOMENTS.filter(() => rnd() < 0.22).concat(shift ? ['Busy'] : []).filter((t, i, a) => a.indexOf(t) === i);
  baseCheckins.push({ id: mid++, period_kind: 'day', period_start: ds(off), mood, energy, stress, workload: null, highlight: null, progress: null, word: null, note: null, tags,
    created_at: at(off, 18.5).toISOString(), updated_at: at(off, 18.5).toISOString() });
}
let checkins = [...baseCheckins];

// ---- Work blocks: this week's planned work, one of them clashing with Study group (A3) ----
const block = (id, task_id, off, s, e) => { const t = OPEN.find(x => x.id === task_id); return { id, task_id, habit_id: null, title: t.title, tags: t.tags, date: ds(off), start_time: s, end_time: e, time_zone: 'America/Los_Angeles', starts_at: '', ends_at: '' }; };
const BASE_BLOCKS = [
  block(1, 13, MON + 1, '10:00', '11:00'),
  block(2, 11, MON + 1, '15:30', '16:30'), // runs into Study group at 4 PM
  block(3, 12, MON + 4, '13:00', '14:30'),
  block(4, 14, MON + 2, '08:30', '09:00'),
];
let blocks = BASE_BLOCKS.map(b => ({ ...b }));
let nextId = 50;

const minutes = e => (new Date(e.ends_at) - new Date(e.starts_at)) / 60000;
const profile = { name: 'Maya', day_start_time: '08:00', shutoff_time: '19:00', rest_days: [0, 6], day_windows: {}, mood_checkins: { weekly: false, monthly: false }, avatar: null };
const stat = {
  'get-tags': TAGS, 'get-notes': notes, 'get-profile': profile,
  'get-notifications': [], 'get-notification-preferences': { types: { mood_reminder: true, task_reminder: true, event_reminder: true, missed_mood: true }, quiet_hours_start: '22:00', quiet_hours_end: '07:00', default_reminder_minutes: 120, mood_reminder_minutes: 60 },
  'get-mood-tags': { defaults: ['Slept well', 'Exercised', 'Outdoors', 'Social', 'Focused', 'Busy', 'Tired', 'Anxious', 'Sick', 'Family'], custom: [] },
  'get-archived-terms': [], 'get-trash': [], 'get-term-rollover': {}, 'get-drawing': {},
  'get-calendar-settings': { id: 1, title: 'Fall 2026', start_date: '2026-08-24', end_date: '2026-12-11' },
  'canvas/connection': { connected: false, status: null, base_url: null, token_last4: null },
  'google-calendar/status': { configured: true, connected: true, email: 'maya@example.com', last_synced_at: at(0, 8.9).toISOString(), last_error: null },
  'google-calendar/calendars': [{ id: 'maya@example.com', name: 'Maya', color: '#4285F4', selected: true, default_tag: null }],
};

const body = req => new Promise(r => { let d = ''; req.on('data', c => d += c); req.on('end', () => { try { r(JSON.parse(d || '{}')); } catch { r({}); } }); });
http.createServer(async (req, res) => {
  const u = new URL(req.url, 'http://x'); const p = u.pathname.slice(1); const q = k => u.searchParams.get(k);
  const json = (c, b) => { res.writeHead(c, { 'content-type': 'application/json', 'access-control-allow-origin': '*', 'access-control-allow-headers': '*', 'access-control-allow-methods': '*' }); res.end(JSON.stringify(b)); };
  if (req.method === 'OPTIONS') return json(200, {});
  const inR = x => x >= q('start_date') && x <= q('end_date');
  const dayOf = iso => dsOf(new Date(iso));

  if (p === 'get-tasks') return json(200, tasks);
  if (p === 'get-habits') return json(200, habits);
  if (p === 'get-events') return json(200, []);
  if (p === 'get-calendar-activity') {
    const all = [...tasks, ...done];
    return json(200, { start_date: q('start_date'), end_date: q('end_date'),
      scheduled_tasks: all.filter(t => t.due_date && inR(t.due_date)), completed_tasks: done.filter(t => inR(dayOf(t.completed_date))),
      note_sessions: sessions.filter(s => inR(dayOf(s.started_at))), habit_completions: habitDone.filter(h => inR(h.date)),
      notes: notes.map(({ id, title, tags }) => ({ id, title, tags })), habits: habits.map(({ id, title, estimated_time, tags }) => ({ id, title, estimated_time, tags })),
      events: events.filter(e => inR(e.date)), work_blocks: blocks.filter(b => inR(b.date)) });
  }
  if (p === 'get-event-report') {
    const list = events.filter(e => inR(e.date)); const total = list.reduce((s, e) => s + minutes(e), 0);
    const byTag = new Map(); for (const e of list) for (const t of e.tags.length ? e.tags : [null]) { const k = t ? t.id : 0; const v = byTag.get(k) || { tag: t, minutes: 0, count: 0 }; v.minutes += minutes(e); v.count++; byTag.set(k, v); }
    return json(200, { start_date: q('start_date'), end_date: q('end_date'), event_count: list.length, archived_count: 0, total_minutes: total, window_minutes: 0, event_window_minutes: 0, free_minutes: 0, free_pct: null, busiest_day: null,
      by_tag: [...byTag.values()], by_day: [], by_week: [], by_month: [] });
  }
  if (p === 'get-mood-checkins') return json(200, checkins.filter(c => inR(c.period_start)));
  if (p === 'save-mood-checkin') { const b = await body(req); const c = { id: mid++, workload: null, highlight: null, progress: null, word: null, note: null, energy: null, stress: null, tags: [], ...b, created_at: NOW.toISOString(), updated_at: NOW.toISOString() }; checkins = checkins.filter(x => !(x.period_kind === c.period_kind && x.period_start === c.period_start)).concat(c); return json(200, c); }
  if (p.startsWith('del-mood-checkin/')) { const id = Number(p.split('/')[1]); checkins = checkins.filter(x => x.id !== id); return json(200, {}); }
  if (p.startsWith('habit-history/')) { const id = Number(p.split('/')[1]); const n = Number(q('days') || 30); return json(200, Array.from({ length: n }, (_, i) => ({ date: ds(i - n + 1), logged: habitDone.some(h => h.habit_id === id && h.date === ds(i - n + 1)) }))); }
  if (p === 'note-session/totals-range') { const t = new Map(); for (const s of sessions.filter(s => inR(dayOf(s.started_at)))) t.set(s.note_id, (t.get(s.note_id) || 0) + s.duration_seconds); return json(200, [...t].map(([note_id, total_seconds]) => ({ note_id, total_seconds }))); }
  if (p.startsWith('note-session/total/')) { const id = Number(p.split('/')[2]); return json(200, { note_id: id, total_seconds: sessions.filter(s => s.note_id === id).reduce((s, x) => s + x.duration_seconds, 0) }); }
  if (p === 'note-session/start') return json(200, { id: 9999, started_at: NOW.toISOString() });
  if (p === 'daily-debrief') {
    const today = events.filter(e => e.date === ds(0)); const evMin = today.reduce((s, e) => s + minutes(e), 0); const win = 11 * 60;
    return json(200, { report_date: ds(0), overdue_tasks: [], due_today_tasks: tasks.filter(t => t.due_date === ds(0)), completed_today_tasks: [], notes_worked_today: [],
      habit_status: habits.map(h => ({ ...h })), workload: { is_rest_day: false, window_minutes: win, event_minutes: evMin, available_minutes: win - evMin, committed_minutes: 30, free_minutes: win - evMin - 30, utilization_pct: Math.round(100 * (evMin + 30) / win), is_overcommitted: false },
      focus_next: OPEN.slice(0, 3), events_today: today, passed_events_today: today.filter(e => e.past), event_minutes_by_tag: [], passed_event_minutes_by_tag: [], work_blocks: blocks.filter(b => b.date === ds(0)) });
  }
  if (p === 'create-work-block') { const b = await body(req); const h = habits.find(x => x.id === b.habit_id), t = tasks.find(x => x.id === b.task_id); const blk = { id: nextId++, task_id: b.task_id ?? null, habit_id: b.habit_id ?? null, title: (h || t || { title: '?' }).title, tags: (h || t || { tags: [] }).tags, date: b.date, start_time: b.start_time, end_time: b.end_time, time_zone: b.time_zone, starts_at: '', ends_at: '' }; blocks.push(blk); return json(200, blk); }
  if (p.startsWith('update-work-block/')) { const id = Number(p.split('/')[1]); const b = await body(req); blocks = blocks.map(x => x.id === id ? { ...x, ...b } : x); return json(200, blocks.find(x => x.id === id)); }
  if (p.startsWith('delete-work-block/')) { const id = Number(p.split('/')[1]); blocks = blocks.filter(x => x.id !== id); return json(200, {}); }
  if (p === 'create-task') { const b = await body(req); const t = { ...task(300 + nextId++, b.title, null, null, b.estimated_time ?? null), ...b }; tasks.push(t); return json(200, t); }
  if (p === '__blocks') return json(200, blocks);
  if (p === '__reset') { blocks = BASE_BLOCKS.map(b => ({ ...b })); tasks = [...OPEN]; checkins = [...baseCheckins]; return json(200, { ok: 1, now: NOW.toISOString() }); }
  if (p in stat) return json(200, stat[p]);
  return req.method === 'GET' ? json(404, { detail: 'Not found' }) : json(200, {});
}).listen(PORT, () => console.log(`mock on ${PORT}, now ${NOW.toString()}`));
