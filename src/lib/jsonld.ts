import { FAQ, FEATURE_LIST, SITE } from "@/content/site";
import { LINKS, SITE_URL } from "@/lib/config";

export function buildJsonLd() {
  return [
    {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      name: SITE.name,
      applicationCategory: "ProductivityApplication",
      operatingSystem: "Web",
      url: SITE_URL,
      description: SITE.definition,
      featureList: FEATURE_LIST,
      offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      // The same array the FAQ section renders, so the two can't drift apart.
      mainEntity: FAQ.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a },
      })),
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: SITE.name,
      url: SITE_URL,
      publisher: {
        "@type": "Organization",
        name: SITE.name,
        logo: `${SITE_URL}/icon-512.png`,
        sameAs: Object.values(LINKS.github),
      },
    },
  ];
}
