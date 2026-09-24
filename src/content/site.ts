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
  file: "hero-tour.mp4",
  poster: undefined, // e.g. "/media/hero-poster.webp"
  width: 1120,
  height: 700,
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
      kind: "gif",
      file: "feature-tasks.webm",
      width: 640,
      height: 480,
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
      kind: "gif",
      file: "feature-notes.webm",
      width: 640,
      height: 480,
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
      file: "feature-debrief.webp",
      width: 1280,
      height: 960,
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
      kind: "gif",
      file: "feature-habits.webm",
      width: 640,
      height: 480,
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
      file: "feature-ai.webp",
      width: 1280,
      height: 800,
      alt: "A study note in kanso with a recommended video, article and exercise",
      brief: "A study note with the three recommended resources beside it.",
    },
  },
  {
    id: "calendar",
    label: "Big-picture calendar",
    chipClass: "bg-sky-wash text-[#171717]",
    title: "See your whole year, and this term",
    body: "Year and month views of your tasks, habits and notes, plus a term tracker that counts down to the end of the semester or quarter.",
    media: {
      kind: "image",
      file: "feature-calendar.webp",
      width: 1280,
      height: 800,
      alt: "kanso’s year calendar with a term countdown",
      brief: "The year view with the current month highlighted and the term countdown.",
    },
  },
];

export const CUSTOMIZATIONS: { title: string; body: string; media: MediaSpec }[] = [
  {
    title: "21 accent colors",
    body: "Pick the color of your buttons, links and highlights.",
    media: { kind: "gif", file: "accent.webm", width: 480, height: 300, alt: "Changing kanso’s accent color", brief: "Switching accent colors in Settings." },
  },
  {
    title: "Six paper styles",
    body: "Graph, dot grid, college rule, wide rule, isometric or blank.",
    media: { kind: "gif", file: "page-styles.webm", width: 480, height: 300, alt: "Switching kanso’s notebook paper style", brief: "Cycling through the page rulings." },
  },
  {
    title: "A dashboard you arrange",
    body: "Drag and resize the stats tiles you care about.",
    media: { kind: "gif", file: "dashboard.webm", width: 480, height: 300, alt: "Rearranging kanso’s dashboard tiles", brief: "Dragging and resizing a stats tile." },
  },
  {
    title: "Focus mode and doodles",
    body: "Hide everything but today, or sketch on a blank canvas.",
    media: { kind: "gif", file: "focus-doodle.webm", width: 480, height: 300, alt: "kanso’s focus mode and doodle canvas", brief: "Toggling focus mode, then a quick doodle." },
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

export const PRIVACY_POINTS = [
  "Every request is checked and scoped to your account alone.",
  "Demo sandboxes are private and deleted after a day.",
  "Sign in with email and a strong password, or with Google.",
  "Delete your account and data from Settings at any time.",
];

export const PRICING = {
  // [CONFIRM] pricing model before launch.
  headline: "[CONFIRM: pricing model — e.g. free while in beta]",
  price: "[PRICE]",
  period: "[/ month]",
  includes: [
    "Unlimited tasks, notes and habits",
    "Daily debrief and big-picture calendar",
    "AI learning resources [CONFIRM: limits]",
    "PDF export, themes and paper styles",
  ],
};

// [CONFIRM] Replace with real quotes (with permission). Never ship invented testimonials.
export const TESTIMONIALS: { quote: string; name: string; role: string }[] = [];

export const FAQ: { q: string; a: string }[] = [
  {
    q: "What is kanso?",
    a: "kanso is a web app that combines a to-do list, a notes app and a habit tracker. It adds a daily debrief that shows what’s overdue, what’s due today and what to focus on next. The name is Japanese for “simplicity.”",
  },
  {
    q: "Is kanso free?",
    a: "[CONFIRM pricing answer.] You can try everything in the demo without signing up.",
  },
  {
    q: "Can I try kanso without creating an account?",
    a: "Yes. “Try the demo” opens a private sandbox with sample tasks, notes and habit streaks. It isn’t shared with anyone and is deleted after a day. Create an account when you want to keep your work.",
  },
  {
    q: "How does the daily debrief decide what I should do next?",
    a: "It uses clear rules, not an AI model. It looks at overdue tasks, what’s due today, priorities and time estimates, checks them against the hours you have, and lists a few tasks to focus on next.",
  },
  {
    q: "Does the AI make up links?",
    a: "No. The AI only plans what to search for. The results come from a real web search, and code filters them, checks each link works and ranks them before you see one video, one article and one exercise.",
  },
  {
    q: "Is my data private?",
    a: "Yes. Every request is verified and limited to your own account, so other users can’t see your tasks or notes. You can delete your account and its data at any time from Settings.",
  },
  {
    q: "Can I export my notes?",
    a: "Yes. Any note exports to PDF, with its formatting, tables and images.",
  },
  {
    q: "Does kanso work on my phone?",
    a: "[CONFIRM: kanso runs in any modern browser; describe the mobile layout.]",
  },
];
