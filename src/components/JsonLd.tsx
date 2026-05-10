export default function JsonLd() {
  const SITE_URL = "https://ecovistalife.in";

  // Organization Schema
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "@id": `${SITE_URL}/#organization`,
    name: "EcoVistaLife",
    alternateName: "Ecovista Life Pvt Ltd",
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    image: `${SITE_URL}/Images/Gardenia/IMG_4923.JPG`,
    description:
      "Leading property developers in Coimbatore & Karamadai. Premium DTCP/RERA approved eco-friendly villa plots, gated communities, and sustainable luxury living.",
    telephone: "+919787795555",
    email: "info@ecovistalife.com",
    address: {
      "@type": "PostalAddress",
      streetAddress: "60, Thirumurugan Nagar Road, Thirumurugan Nagar",
      addressLocality: "Coimbatore",
      addressRegion: "Tamil Nadu",
      postalCode: "641048",
      addressCountry: "IN",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 11.0168,
      longitude: 76.9558,
    },
    areaServed: [
      { "@type": "City", name: "Coimbatore" },
      { "@type": "City", name: "Karamadai" },
      { "@type": "City", name: "Sulur" },
      { "@type": "City", name: "Mettupalayam" },
    ],
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday",
        ],
        opens: "10:00",
        closes: "18:30",
      },
    ],
    sameAs: [
      "https://www.instagram.com/ecovistalife/",
      "https://www.facebook.com/ecovistalife/",
    ],
    priceRange: "₹₹₹",
  };

  // WebSite Schema (enables Google Search Box)
  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    name: "EcoVistaLife",
    url: SITE_URL,
    description:
      "Premium property developers in Coimbatore — DTCP/RERA approved eco-friendly villa plots, gated communities & sustainable luxury living.",
    publisher: {
      "@id": `${SITE_URL}/#organization`,
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${SITE_URL}/blog?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };

  // SiteNavigationElement — this is what drives Google Sitelinks
  const navigationSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    "@id": `${SITE_URL}/#navigation`,
    name: "Site Navigation",
    itemListElement: [
      {
        "@type": "SiteNavigationElement",
        position: 1,
        name: "Projects",
        description:
          "Explore our premium gated community projects — Gardenia, Mount Shadows & French Ville in Coimbatore and Sulur.",
        url: `${SITE_URL}/projects`,
      },
      {
        "@type": "SiteNavigationElement",
        position: 2,
        name: "Services",
        description:
          "Land acquisition, bespoke architectural design, sustainable construction & comprehensive estate management.",
        url: `${SITE_URL}/services`,
      },
      {
        "@type": "SiteNavigationElement",
        position: 3,
        name: "About Us",
        description:
          "A decade of trust & excellence in real estate — our vision, mission, values, and leadership.",
        url: `${SITE_URL}/about`,
      },
      {
        "@type": "SiteNavigationElement",
        position: 4,
        name: "NRI Investment",
        description:
          "Seamless NRI property investment — virtual tours, digital documentation, and dedicated NRI concierge.",
        url: `${SITE_URL}/nri`,
      },
      {
        "@type": "SiteNavigationElement",
        position: 5,
        name: "Contact Us",
        description:
          "Get in touch with EcoVistaLife — schedule a site visit, request a callback, or visit our Coimbatore office.",
        url: `${SITE_URL}/contact`,
      },
      {
        "@type": "SiteNavigationElement",
        position: 6,
        name: "Blog",
        description:
          "Expert insights on sustainable living, eco-friendly homes, and smart real estate investment in Coimbatore.",
        url: `${SITE_URL}/blog`,
      },
      {
        "@type": "SiteNavigationElement",
        position: 7,
        name: "Careers",
        description:
          "Join EcoVistaLife — explore career opportunities in real estate, architecture, and sales.",
        url: `${SITE_URL}/career`,
      },
      {
        "@type": "SiteNavigationElement",
        position: 8,
        name: "FAQs",
        description:
          "Frequently asked questions about property buying, DTCP/RERA approvals, NRI investment, and home loans.",
        url: `${SITE_URL}/faqs`,
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(navigationSchema),
        }}
      />
    </>
  );
}
