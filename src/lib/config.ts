// Every URL the site links to or publishes, read once from the environment.
// See .env.example for what each one is.

const trimSlash = (url: string) => url.replace(/\/+$/, "");

export const SITE_URL = trimSlash(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000");
export const APP_URL = trimSlash(process.env.NEXT_PUBLIC_APP_URL ?? "https://kanso-web-app.vercel.app");
export const DEMO_URL = process.env.NEXT_PUBLIC_DEMO_URL ?? `${APP_URL}/signup`;

export const LINKS = {
  demo: DEMO_URL,
  signup: `${APP_URL}/signup`,
  login: `${APP_URL}/login`,
  privacy: "/privacy",
  github: {
    frontend: "https://github.com/LuisFVillalon/kanso-frontend",
    backend: "https://github.com/LuisFVillalon/kanso-backend",
    ai: "https://github.com/LuisFVillalon/kanso-ai",
  },
} as const;
