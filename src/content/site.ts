// All page copy lives here, so the visible FAQ and the FAQPage JSON-LD can never drift apart.
// Anything in [BRACKETS] is a fact to confirm before launch — search the repo for "[CONFIRM".

export const SITE = {
  name: "kanso",
  nameJa: "簡素",
  tagline: "Tasks, notes and habits in one calm place.",
  title: "kanso — Tasks, Notes & Habit Tracker in One Calm App",
  description:
    "kanso puts your to-do list, notes and habit streaks in one calm web app, with a daily debrief of what to focus on next. Try the demo, no signup needed.",
  // The one quotable definition (GEO). Reuse it verbatim in READMEs and listings.
  definition:
    "kanso is a free-to-try web app that puts your to-do list, notes and habit tracker in one place, and gives you a daily debrief of what’s overdue, what’s due today and what to focus on next.",
};

export type MediaSpec = {
  kind: "video" | "gif" | "image";
  /** File name the asset should be saved as under /public/media. */
  file: string;
  /** Leave undefined until the asset exists; the placeholder shows meanwhile. */
  src?: string;
  poster?: string;
  width: number;
  height: number;
  alt: string;
  /** What to record — shown in the placeholder until `src` is set. */
  brief: string;
};

export const HERO_MEDIA: MediaSpec = {
  kind: "video",
  file: "hero.mp4",
  src: "/media/hero.mp4",
  poster: undefined, // e.g. "/media/hero-poster.webp"
  width: 2520,
  height: 1080,
  alt: "Tour of kanso: the dashboard, adding a task, a note, a habit check-in and the daily debrief",
  brief:
    "20–30 s silent, looping product tour: dashboard → add a task → open a note → check off a habit → read the daily debrief. Autoplay, muted, with a poster frame.",
};

export type Feature = {
  id: string;
  label: string;
  chipClass: string;
  title: string;
  body: string;
  bullets?: string[];
  media: MediaSpec;
};

export const FEATURES: Feature[] = [
  {
    id: "tasks",
    label: "Tasks",
    chipClass: "bg-accent-subtle text-accent",
    title: "A to-do list that knows what matters",
    body: "Add due dates and times, priorities, tags and time estimates, then filter and sort the list your way.",
    bullets: [
      "Numbered priorities you change right from the badge",
      "Time estimates add up against the hours you have",
      "Colored tags shared with your notes",
    ],
    media: {
      kind: "video",
      file: "feature-tasks.mp4",
      src: "/media/feature-tasks.mp4",
      width: 1900,
      height: 900,
      alt: "Adding a task with a due date, tag and priority in kanso",
      brief: "Adding a task with a due date and tag, then changing its priority from the badge menu.",
    },
  },
  {
    id: "notes",
    label: "Notes",
    chipClass: "bg-accent-2-subtle text-ink",
    title: "Notes that stay organized on their own",
    body: "A rich-text editor with tables, highlights, resizable images and text alignment. Notes file themselves into tag folders, export to PDF, and track how long you’ve spent on each.",
    media: {
      kind: "video",
      file: "feature-notes.mp4",
      src: "/media/feature-notes.mp4",
      width: 1580,
      height: 890,
      alt: "Formatting a note in kanso and exporting it to PDF",
      brief:
        "Writing in the rich-text editor (table, highlight, resized image), then switching to tag folders and exporting to PDF.",
    },
  },
  {
    id: "debrief",
    label: "Daily debrief",
    chipClass: "bg-marigold text-black",
    title: "Know what to focus on next, every morning",
    body: "See what’s overdue, what’s due today, whether today’s plan fits the hours you have, and a short “focus next” list. It runs on clear rules, not a chatbot, so it’s fast and predictable.",
    media: {
      kind: "image",
      file: "feature-debrief.png",
      src: "/media/feature-debrief.png",
      width: 1775,
      height: 584,
      alt: "kanso’s daily debrief listing overdue, due-today and focus-next tasks",
      brief: "The debrief panel with overdue items, today’s tasks, a capacity warning and three focus-next items.",
    },
  },
  {
    id: "habits",
    label: "Habits",
    chipClass: "bg-success-subtle text-success",
    title: "Build streaks you can actually see",
    body: "Daily check-ins, your current and best streak, and a 30-day history you can edit when life got in the way.",
    media: {
      kind: "video",
      file: "feature-habits.mp4",
      src: "/media/feature-habits.mp4",
      width: 1920,
      height: 1080,
      alt: "Checking in a habit in kanso and growing a streak",
      brief: "Checking in a habit, the streak counter ticking up, then fixing a missed day in the 30-day history.",
    },
  },
];

export const SECONDARY_FEATURES: Feature[] = [
  {
    id: "learning",
    label: "Learning resources · AI",
    chipClass: "bg-midnight-ink text-white",
    title: "Go deeper on any note",
    body: "From any note, get one video, one article and one exercise. An AI plans the search; real results are filtered, link-checked and ranked by code, so it never invents a link.",
    media: {
      kind: "image",
      file: "feature-ai.png",
      src: "/media/feature-ai.png",
      width: 1568,
      height: 892,
      alt: "A study note in kanso with a recommended video, article and exercise",
      brief: "A study note with the three recommended resources beside it.",
    },
  },
  {
    id: "calendar",
    label: "Calendar",
    chipClass: "bg-sky-wash text-[#171717]",
    title: "See where your day actually went",
    body: "Open any day to compare the plan with what you actually did, broken down by tag, with a week of each beside it. Spot which parts of your life take the most time, and adjust from there.",
    media: {
      kind: "image",
      file: "feature-calendar.png",
      src: "/media/feature-calendar.png",
      width: 932,
      height: 785,
      alt: "A day in kanso’s calendar comparing planned and actual hours by tag, with weekly trends",
      brief: "A day’s summary: plan and actual donut charts by tag, with planned and actual week charts below.",
    },
  },
];

export const CUSTOMIZATIONS: { title: string; body: string; media: MediaSpec }[] = [
  {
    title: "21 accent colors",
    body: "Pick the color of your buttons, links and highlights.",
    media: { kind: "video", file: "accent.mp4", src: "/media/accent.mp4", width: 480, height: 300, alt: "Changing kanso’s accent color", brief: "Switching accent colors in Settings." },
  },
  {
    title: "Six paper styles",
    body: "Graph, dot grid, college rule, wide rule, isometric or blank.",
    media: { kind: "video", file: "page-styles.mp4", src: "/media/page-styles.mp4", width: 480, height: 300, alt: "Switching kanso’s notebook paper style", brief: "Cycling through the page rulings." },
  },
  {
    title: "A dashboard you arrange",
    body: "Drag and resize the stats tiles you care about.",
    media: { kind: "video", file: "dashboard.mp4", src: "/media/dashboard.mp4", width: 480, height: 300, alt: "Rearranging kanso’s dashboard tiles", brief: "Dragging and resizing a stats tile." },
  },
  {
    title: "Focus mode and doodles",
    body: "Hide everything but today, or sketch on a blank canvas.",
    media: { kind: "video", file: "focus-doodle.mp4", src: "/media/focus-doodle.mp4", width: 480, height: 300, alt: "kanso’s focus mode and doodle canvas", brief: "Toggling focus mode, then a quick doodle." },
  },
];

export const COMPARISON: { need: string; usually: string; kanso: string }[] = [
  { need: "A to-do list", usually: "Task app", kanso: "Tasks" },
  { need: "Notes", usually: "Notes app", kanso: "Notes" },
  { need: "Habit streaks", usually: "Habit tracker", kanso: "Habits" },
  { need: "“What do I do next?”", usually: "Guesswork", kanso: "Daily debrief" },
];

export const STEPS: { title: string; body: string }[] = [
  { title: "Open the demo", body: "One click opens your own sandbox, already filled with sample tasks, notes and streaks. No email needed." },
  { title: "Add your own day", body: "Add a few tasks, a note and a habit. Tag them once and they line up everywhere." },
  { title: "Keep it with an account", body: "Sign up with email or Google to keep your work. Each morning, start from the daily debrief." },
];

/** Planned, not shipped. Keep these out of FEATURES, the FAQ and llms.txt until they exist in the app. */
export const ROADMAP: { title: string; body: string }[] = [
  {
    title: "Canvas integration",
    body: "Connect your Canvas account and pull assignments and due dates straight into your tasks and calendar.",
  },
  {
    title: "Projects",
    body: "Group related tasks, notes and habits in one workspace, like projects in ChatGPT. Each project is tied to a tag, so anything you tag lands there on its own.",
  },
  {
    title: "Mood tracker",
    body: "Log how you feel each day and see it next to your habits and streaks.",
  },
];

export const PRIVACY_POINTS = [
  "Every request is checked and scoped to your account alone.",
  "Demo sandboxes are private and deleted after a day.",
  "Sign in with email and a strong password, or with Google.",
  "Delete your account and data from Settings at any time.",
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


export const FAQ: { q: string; a: string }[] = [
  {
    q: "What is kanso?",
    a: "kanso is a web app that combines a to-do list, a notes app and a habit tracker. It also provides a daily debrief that shows what is overdue, what is due today and what to focus on next. The name is Japanese for “simplicity.”",
  },
  {
    q: "Is kanso free?",
    a: "Yes. kanso is free and open source.",
  },
  {
    q: "Can I try kanso without creating an account?",
    a: "Yes. “Try the demo” opens a private sandbox preloaded with sample tasks, notes and habit streaks. The sandbox is not shared with anyone and is deleted after one day. You can create an account whenever you want to keep your work.",
  },
  {
    q: "How does the daily debrief decide what I should do next?",
    a: "It uses transparent rules rather than an AI model. It reviews overdue tasks, tasks due today, priorities and time estimates, weighs them against the hours you have available, and recommends a few tasks to focus on next.",
  },
  {
    q: "Does the AI make up links?",
    a: "No. The AI only decides what to search for. Every result comes from a real web search. kanso then filters the results, verifies that each link works and ranks them without AI, so you see one video, one article and one exercise.",
  },
  {
    q: "Is my data private?",
    a: "Yes. Every request is authenticated and restricted to your own account, so other users cannot access your tasks or notes. You can delete your account and all of its data at any time from Settings.",
  },
  {
    q: "Can I export my notes?",
    a: "Yes. Any note can be exported to PDF with its formatting, tables and images intact.",
  },
  {
    q: "Does kanso work on my phone?",
    a: "Yes. kanso works in mobile browsers, although it is designed primarily for desktop use.",
  },
];
