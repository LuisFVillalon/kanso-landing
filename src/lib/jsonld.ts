import { FAQ, FEATURES, SECONDARY_FEATURES, SITE, STEPS } from "@/content/site";
import { LINKS, SITE_URL } from "@/lib/config";

// FAQ answers still marked [CONFIRM] are left out of the schema until they are real.
const isConfirmed = (text: string) => !text.includes("[CONFIRM");

export function buildJsonLd() {
  return [
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: SITE.name,
      alternateName: SITE.nameJa,
      applicationCategory: "ProductivityApplication",
      operatingSystem: "Web",
      url: SITE_URL,
      description: SITE.definition,
      featureList: [...FEATURES, ...SECONDARY_FEATURES].map((f) => f.title),
      // [CONFIRM] Add "offers" once pricing is settled, e.g.
      // offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: FAQ.filter((f) => isConfirmed(f.a)).map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "HowTo",
      name: "How to get started with kanso",
      step: STEPS.map((s, i) => ({ "@type": "HowToStep", position: i + 1, name: s.title, text: s.body })),
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: SITE.name,
      url: SITE_URL,
      publisher: {
        "@type": "Organization",
        name: SITE.name,
        logo: `${SITE_URL}/icon.svg`,
        sameAs: Object.values(LINKS.github),
      },
    },
  ];
}
