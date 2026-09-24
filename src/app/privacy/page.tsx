import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy",
  robots: { index: false }, // [CONFIRM] index once the real policy is written.
};

export default function PrivacyPage() {
  return (
    <main id="main" className="mx-auto max-w-2xl px-4 py-24">
      <h1 className="text-3xl font-semibold tracking-tight text-ink">Privacy</h1>
      <p className="mt-4 text-secondary">[CONFIRM: write the privacy policy before launch.]</p>
      <Link href="/" className="mt-8 inline-block text-accent">Back to kanso</Link>
    </main>
  );
}
