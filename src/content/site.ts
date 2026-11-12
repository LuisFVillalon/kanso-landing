// All page copy lives here, so the visible FAQ and the FAQPage JSON-LD can never drift apart.
// Every claim is checked against kanso-frontend as it ships today: no testimonials, user
// counts, pricing tiers or roadmap promises.

export const SITE = {
  name: "kanso",
  tagline: "Keep it kanso.",
  secondaryTagline: "Ctrl + Zen",
  summary: "A calm planner for students: tasks, calendar, notes, habits and mood in one place.",
  title: "kanso — A Calm Student Planner That Finds Time for Your Work",
  description:
    "kanso is a free, calm planner for students. It suggests free times to work on each task around your classes and shifts, and keeps your calendar, notes, habits and mood in one place. Try the demo, no signup.",
  // The one quotable definition (GEO). Reuse it verbatim in READMEs and listings.
  definition:
    "kanso is a free, open-source web planner for students that puts tasks, a week calendar, notes, habits and mood check-ins in one place. It suggests free times to work on each task before it's due and gives you a daily brief of what to do next, using clear rules rather than a chatbot.",
};

/** What kanso does, in short names: the JSON-LD featureList and public/llms.txt. */
export const FEATURE_LIST = [
  "Suggested work times before each due date",
  "Daily brief",
  "Week calendar with work blocks",
  "Focus timer",
  "Free time today",
  "Rich-text notes with PDF export",
  "Learning resources",
  "Habit tracker with streaks",
  "Mood check-ins",
  "Reports with pace and mood patterns",
  "Google Calendar import",
  "Canvas assignments as tasks",
  "Linked tasks",
  "Notifications with quiet hours",
  "Archive and Recently deleted",
];

/** A light and a dark version of the same asset, both under /public. */
export type Themed = { light: string; dark: string };

/**
 * One media slot on the page. Every slot launches as a still (`kind: "image"`); swapping
 * in a recorded clip means adding the files and changing `kind` and `src` (plus `mp4`
 * and `poster`), with no layout change. scripts/record/ makes both, from the real app
 * with the fictional demo student Maya.
 */
export type MediaSpec = {
  /** The storyboard slot, also the scenario name in scripts/record/rec.mjs. */
  id: "A1" | "A2" | "A3" | "A4" | "A5" | "A6" | "A7";
  kind: "image" | "video";
  /** The still (WebP), or for a clip the VP9 WebM. */
  src: Themed;
  /** Clips only: H.264 fallback for browsers without VP9. */
  mp4?: Themed;
  /** Clips only: the matching still, also shown with reduced motion. */
  poster?: Themed;
  width: number;
  height: number;
  /** Hero only: the phone-width still shown in a phone frame below 640px. */
  phone?: { src: Themed; width: number; height: number };
  alt: string;
  /** What the clip that replaces the still should show (≤ 15 s, muted loop). */
  clip: string;
};

const still = (slot: string): Themed => ({ light: `/media/${slot}-light.webp`, dark: `/media/${slot}-dark.webp` });

export const HERO_MEDIA: MediaSpec = {
  id: "A1",
  kind: "image",
  src: still("a1"),
  width: 1600,
  height: 1000,
  phone: { src: still("a1-phone"), width: 780, height: 1688 },
  alt: "Adding the task “Write speech outline” in kanso: When to work on it suggests three free times before it's due and explains what's in the way of each.",
  clip: "Suggested work times: press T, title, due date, 1 hour, pick a time, Which day → Monday, Create & plan, then the Work on block on the week view.",
};

export type DayStep = {
  id: string;
  time: string;
  label: string;
  title: string;
  body: string;
  bullets: string[];
  media: MediaSpec;
};

export const DAY: DayStep[] = [
  {
    id: "brief",
    time: "8:00 AM",
    label: "Morning",
    title: "Start with the Daily brief",
    body: "What slipped, what's due today, whether your plan fits the hours you have, and a short Focus next list. Worked out by rules, not a chatbot.",
    bullets: ["Today's schedule with your classes and events", "Habits left today, each with a free time", "Gentle about slips: no red, no guilt"],
    media: {
      id: "A2",
      kind: "image",
      src: still("a2"),
      width: 1600,
      height: 1000,
      alt: "kanso's home page with the Daily brief: tasks due today, Focus next, Habits left today and today's schedule.",
      clip: "Home loads; Today's schedule with the now line; Focus next; Plan my habits puts Read 20 pages at a free time; Undo toast.",
    },
  },
  {
    id: "plan",
    time: "9:00 AM",
    label: "Plan",
    title: "Pick a time, not just a deadline",
    body: "Add a task with how long it takes, and kanso suggests up to three free times before it's due, around your classes, shifts and other work. Pick one and it lands on your week as a work block.",
    bullets: ["A Which day strip with each day's free time", "Earlier or Later, and it says what's in the way", "Linked tasks planned in order with Plan all"],
    media: {
      id: "A3",
      kind: "image",
      src: still("a3"),
      width: 1600,
      height: 1000,
      alt: "kanso's week view with classes, library shifts, Google Calendar events and planned work blocks.",
      clip: "Week view: drag a work block 30 minutes later, resize it, overlap shows the clash ring and “Move to …?”, then Move.",
    },
  },
  {
    id: "focus",
    time: "11:15 AM",
    label: "Focus",
    title: "Between classes, start a focus session",
    body: "The Focus timer runs 25, 50 or 90 minutes, or a length you pick, on a task and saves the session as a work block. The Free time widget shows how much of today is still open, with tasks that fit.",
    bullets: ["Ctrl + Zen: kanso mode hides the dashboard and leaves your lists", "A term countdown to the last day of the semester"],
    media: {
      id: "A4",
      kind: "image",
      src: still("a4"),
      width: 1600,
      height: 1000,
      alt: "kanso's home widgets: the Fall 2026 term countdown, timers, habits, the Focus timer on a task and Free time for today.",
      clip: "Start 25 minutes on “CS 160 problem set 6”; the ring fills (time-lapsed); the block is saved; Free time drops.",
    },
  },
  {
    id: "notes",
    time: "2:00 PM",
    label: "Write",
    title: "Notes that keep up with lectures",
    body: "A rich editor with tables, highlights, checklists and a slash menu. Notes file themselves into tag folders, export to PDF, and keep track of the time you spend in each.",
    bullets: ["Press the k for focus mode while you write", "Learning resources: one video, one article and one exercise, every link checked"],
    media: {
      id: "A5",
      kind: "image",
      src: still("a5"),
      width: 1600,
      height: 1000,
      alt: "A kanso note, “Cell respiration review”, with headings, a highlight and a list, filed under its BIO 210 tag.",
      clip: "Open “Cell respiration review”; / → Table; highlight “net 2 ATP”; the word count ticks; press the k for focus mode.",
    },
  },
  {
    id: "mood",
    time: "6:00 PM",
    label: "Call it a day",
    title: "Check in with yourself",
    body: "Log the day's mood in a tap, then add energy, stress and moments like Slept well or Exercised. It stays private, out of the Daily brief and away from AI.",
    bullets: ["Weekly and monthly check-ins, if you want them", "Reminders that respect your quiet hours"],
    media: {
      id: "A6",
      kind: "image",
      src: still("a6"),
      width: 1600,
      height: 1000,
      alt: "kanso's daily check-in with Good picked, energy Steady, and the moments Slept well and Exercised.",
      clip: "Tap Good, set energy, pick Slept well and Exercised, Save, Undo toast.",
    },
  },
  {
    id: "reports",
    time: "Sunday",
    label: "Look back",
    title: "See where your week went",
    body: "Reports compare your pace with last week, show where your time went across tasks, notes, habits and events, and explain your mood patterns in plain sentences.",
    bullets: ["Patterns like “Your energy was lower on Library job days”", "Any week, month or year"],
    media: {
      id: "A7",
      kind: "image",
      src: still("a7"),
      width: 1600,
      height: 1000,
      alt: "kanso Reports, Overview for the week: stat tiles, the Pace card and where the time went.",
      clip: "Overview Pace chips Tasks → Habits, then Mood › Patterns and its sentence card.",
    },
  },
];

export const SCENARIOS: { q: string; a: string }[] = [
  {
    q: "“I have a lab report, a problem set and a shift. Where does it all fit?”",
    a: "Add each one with a deadline and a length. kanso shows the free hours around your classes and shifts and suggests when to do each one.",
  },
  {
    q: "“My syllabus lives in Canvas and my life lives in Google Calendar.”",
    a: "Bring both in. Canvas assignments become tasks that follow their due dates, and Google events count toward your free time. Your Google Calendar is never changed.",
  },
  {
    q: "“I never know if I'm actually doing better.”",
    a: "Reports compare your pace with last week and show how your mood moves with your days and workload, in plain sentences.",
  },
];

/** "Instead of four apps": also the comparison AI answer engines quote. */
export const COMPARISON: { need: string; usually: string; kanso: string }[] = [
  { need: "A to-do list", usually: "Task app", kanso: "Tasks with suggested work times" },
  { need: "A calendar", usually: "Calendar app", kanso: "Week view with work blocks and Google events" },
  { need: "Notes", usually: "Notes app", kanso: "Notes filed by tag, with PDF export" },
  { need: "Habits and mood", usually: "Two trackers", kanso: "Habits, check-ins and patterns" },
  { need: "“What do I do next?”", usually: "Guesswork", kanso: "The Daily brief" },
];

export const MORE_FEATURES: { title: string; body: string }[] = [
  { title: "Google Calendar", body: "A one-way import. Tag, drag and edit your events in kanso; Google stays as it was." },
  { title: "Canvas", body: "Connect a calendar feed or a token. Assignments become tasks that follow Canvas." },
  { title: "Habits", body: "Streaks, a 30-day history you can fix, and a free time suggested each day." },
  { title: "Linked tasks", body: "Break a big project into steps that lead up to it, then plan them all at once." },
  { title: "Work blocks", body: "Drag and resize planned work on the week view. It snaps to 15 minutes and flags clashes." },
  { title: "Notifications", body: "Task, event and check-in reminders, with quiet hours." },
  { title: "Make it yours", body: "21 accent colors, six paper styles, light and dark, and a dashboard you arrange." },
  { title: "Nothing lost", body: "Archive anything. Recently deleted keeps it for 30 days." },
];

export const TRUST: { title: string; body: string }[] = [
  {
    title: "Rules, not a chatbot",
    body: "Suggested times and the Daily brief come from clear rules you can follow. AI is used only when you ask for learning resources on a note.",
  },
  {
    title: "Your notebook stays yours",
    body: "Every request is scoped to your account. No ads, no tracking cookies, and your data is never sold. Delete it all from Settings.",
  },
  {
    title: "Built in the open",
    body: "The app, the API and the AI service are open source, so you can check every claim on this page.",
  },
];

export type PolicySection = { id: string; heading: string; body?: string[]; items?: string[] };

/**
 * The /privacy page. Every claim here is checked against the code in kanso-frontend,
 * kanso-backend and kanso-ai — change them together.
 */
export const PRIVACY_POLICY: { updated: string; intro: string; sections: PolicySection[] } = {
  updated: "September 24, 2026",
  intro:
    "This page explains what kanso stores, why it stores it, which services help run it, and how to delete it. kanso’s code is public, so you can check each point here against the source.",
  sections: [
    {
      id: "what-we-store",
      heading: "What kanso stores",
      items: [
        "Your account: your email address and the name you give. If you sign in with Google, Google shares your name and email address with kanso.",
        "What you create: tasks, notes (including images you add to them), habits and their check-in history, tags, your big-picture calendar and your doodle.",
        "Note sessions: when you open and close a note, so kanso can show the time you’ve spent on it.",
        "Your settings: accent color, page style, dashboard layout, the start of your day, rest days and similar preferences, so they follow you to other devices.",
      ],
      body: [
        "Supabase Auth handles your password. kanso’s own database never stores it.",
      ],
    },
    {
      id: "what-we-dont-do",
      heading: "What kanso doesn’t do",
      items: [
        "No ads, and your data is never sold.",
        "No tracking or advertising cookies.",
        "No third-party analytics on this site or in the app. If that changes, this page will say so first.",
      ],
    },
    {
      id: "ai",
      heading: "Learning-resource recommendations",
      body: [
        "Nothing is sent to an AI model unless you ask for learning resources on a note. When you do, the note’s text goes to kanso’s AI service, which sends it to OpenAI or Google Gemini, whichever key is set on the kanso-ai Fly app, to plan a few search queries.",
        "Only those short queries go to DuckDuckGo search, never the note itself. The AI service then checks that each result link works. Those sites see kanso’s server, not you.",
        "The AI service doesn’t save your note or its results. The AI provider handles the text under its API terms, which set how long it keeps requests.",
      ],
    },
    {
      id: "providers",
      heading: "Services that help run kanso",
      body: ["Each one gets only what it needs to do its part. Your data is stored in the United States."],
      items: [
        "Supabase: sign-in and the database (AWS, US East).",
        "Fly.io: runs the kanso API and the AI service (Virginia, US).",
        "Vercel: hosts the web app and this site.",
        "Google: only if you choose “Sign in with Google.”",
        "OpenAI or Google Gemini: only the notes you ask for learning resources on.",
        "DuckDuckGo: search queries only, sent from kanso’s server.",
      ],
    },
    {
      id: "security",
      heading: "How your data is protected",
      items: [
        "Every request to the kanso API must carry a valid sign-in token, and every database query is limited to that account’s own rows.",
        "The database has no public access: only the kanso API can read it.",
        "Traffic between your browser and kanso is encrypted with HTTPS.",
        "The code is open source, so anyone can review how this works.",
      ],
    },
    {
      id: "browser-storage",
      heading: "What stays in your browser",
      body: [
        "kanso keeps your sign-in session and some preferences, like your accent color, page style and doodle, in your browser’s local storage. That lets the app open signed in and in your colors without a flash. Clearing your browser’s site data for kanso removes them.",
      ],
    },
    {
      id: "demo",
      heading: "The demo",
      body: [
        "“Try the demo” signs you in as an anonymous guest, with no email. Your sandbox is private to you, and it and its sample data are deleted automatically after about a day.",
      ],
    },
    {
      id: "your-choices",
      heading: "Keeping and deleting your data",
      items: [
        "Your data stays until you delete it. Deleting a task, note or habit removes it from the database. kanso doesn’t keep a hidden copy.",
        "Delete your account from Settings at any time. kanso erases everything tied to it, then removes your login.",
        "Export any note as a PDF.",
        "Our hosting providers keep short-lived server logs, such as errors and rejected sign-ins, for debugging.",
      ],
    },
    {
      id: "children",
      heading: "Children",
      body: ["kanso isn’t meant for children under 13, and doesn’t knowingly collect their data."],
    },
    {
      id: "changes",
      heading: "Changes and questions",
      body: [
        "If this policy changes, the date at the top changes with it.",
        "For questions, or to ask for a copy of your data, email lvillalon1179@sdsu.edu.",
      ],
    },
  ],
};

/** The visible FAQ and the FAQPage JSON-LD (lib/jsonld.ts) both come from this list. */
export const FAQ: { q: string; a: string }[] = [
  {
    q: "Is kanso free?",
    a: "Yes. kanso is free and open source. There are no plans to pick and no card to enter.",
  },
  {
    q: "Can I try kanso without an account?",
    a: "Yes. “Try the demo” opens a private sandbox with sample tasks, notes, habits and events, with no email needed. It's deleted after about a day. Canvas and Google Calendar aren't available in the demo.",
  },
  {
    q: "Does AI plan my day?",
    a: "No. Suggested work times, the Daily brief and the Free time widget come from clear rules about your work hours, events and deadlines. AI is used only when you ask for learning resources on a note, and mood check-ins are never sent to it.",
  },
  {
    q: "Will kanso change my Google Calendar?",
    a: "No. The Google Calendar import is one-way. Imported events show on your kanso calendar, where you can tag, edit, drag or archive them, but those changes stay in kanso. Nothing is ever written to Google.",
  },
  {
    q: "Is my data private?",
    a: "Yes. Every request is checked and limited to your own account, so no one else can see your tasks, notes or check-ins. There are no ads or tracking cookies, your data is never sold, and you can delete your account and everything in it from Settings.",
  },
  {
    q: "Can I export my notes?",
    a: "Yes. Any note exports to PDF with its formatting, tables and images.",
  },
  {
    q: "Does kanso work on my phone?",
    a: "Yes. kanso runs in any modern mobile browser, with layouts made for small screens, and there's nothing to install. It's at its best on a laptop, where you plan the week.",
  },
  {
    q: "Does kanso work with Canvas?",
    a: "Yes. In Settings → Canvas, connect with your private calendar feed link (read-only, no school approval needed) or, if your school allows it, a personal access token. Assignments you add become tasks that follow Canvas: the due date moves when Canvas changes it, and the task completes when Canvas counts the work done.",
  },
];
