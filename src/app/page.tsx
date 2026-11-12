import { DayTimeline } from "@/components/sections/DayTimeline";
import { Everything } from "@/components/sections/Everything";
import { Faq } from "@/components/sections/Faq";
import { FinalCta } from "@/components/sections/FinalCta";
import { Hero } from "@/components/sections/Hero";
import { InsteadOfApps } from "@/components/sections/InsteadOfApps";
import { SiteFooter } from "@/components/sections/SiteFooter";
import { SiteHeader } from "@/components/sections/SiteHeader";
import { Trust } from "@/components/sections/Trust";
import { WhoItsFor } from "@/components/sections/WhoItsFor";
import { buildJsonLd } from "@/lib/jsonld";

// Direction A, "A day with kanso": hero → the day → who it's for → instead of four apps →
// everything else → trust → FAQ → final CTA.
export default function HomePage() {
  const jsonLd = JSON.stringify(buildJsonLd()).replace(/</g, "\\u003c");

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <SiteHeader />
      <main id="main">
        <Hero />
        <DayTimeline />
        <WhoItsFor />
        <InsteadOfApps />
        <Everything />
        <Trust />
        <Faq />
        <FinalCta />
      </main>
      <SiteFooter />
    </>
  );
}
