import { Customize } from "@/components/sections/Customize";
import { Faq } from "@/components/sections/Faq";
import { Features } from "@/components/sections/Features";
import { FinalCta } from "@/components/sections/FinalCta";
import { Hero } from "@/components/sections/Hero";
import { HowItWorks } from "@/components/sections/HowItWorks";
import { Privacy } from "@/components/sections/Privacy";
import { ProofStrip } from "@/components/sections/ProofStrip";
import { SiteFooter } from "@/components/sections/SiteFooter";
import { SiteHeader } from "@/components/sections/SiteHeader";
import { WhatIsKanso } from "@/components/sections/WhatIsKanso";
import { buildJsonLd } from "@/lib/jsonld";

// Funnel order: awareness → interest → desire → confidence → action.
export default function HomePage() {
  const jsonLd = JSON.stringify(buildJsonLd()).replace(/</g, "\\u003c");

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      <SiteHeader />
      <main id="main">
        <Hero />
        <ProofStrip />
        <WhatIsKanso />
        <Features />
        <Customize />
        <HowItWorks />
        <Privacy />
        <Faq />
        <FinalCta />
      </main>
      <SiteFooter />
    </>
  );
}
