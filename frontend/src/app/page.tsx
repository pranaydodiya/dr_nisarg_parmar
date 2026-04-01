import dynamic from "next/dynamic";
import type { Metadata } from "next";
import Link from "next/link";
import { SectionReveal } from "@/components/shared/SectionReveal";
import { Hero } from "@/components/home/Hero";
import { TrustIndicators } from "@/components/home/TrustIndicators";
import { AboutSection } from "@/components/home/AboutSection";
import { WhyChoose } from "@/components/home/WhyChoose";
import { SpecialtiesSection } from "@/components/home/SpecialtiesSection";
import { getHomeContactSectionData } from "@/lib/contact-data";
import { JsonLd } from "@/components/seo/JsonLd";
import { FAQ_ITEMS } from "@/content/faq";
import { physicianSameAsUrls, LOCAL_KEYWORDS_PRIMARY } from "@/content/local-seo";
import { buildPageMetadata, getSiteUrl, SITE_NAME } from "@/lib/seo";

const TestimonialsSection = dynamic(() =>
  import("@/components/home/TestimonialsSection").then((m) => m.TestimonialsSection),
);
const VideoTestimonialsSection = dynamic(() =>
  import("@/components/home/VideoTestimonialsSection").then((m) => m.VideoTestimonialsSection),
);
const AppointmentCTA = dynamic(() =>
  import("@/components/home/AppointmentCTA").then((m) => m.AppointmentCTA),
);
const ContactLocationsSection = dynamic(() =>
  import("@/components/home/ContactLocationsSection").then((m) => m.ContactLocationsSection),
);
const FAQSection = dynamic(() =>
  import("@/components/home/FAQSection").then((m) => m.FAQSection),
);
const MedicalDisclaimer = dynamic(() =>
  import("@/components/home/MedicalDisclaimer").then((m) => m.MedicalDisclaimer),
);

const homeDesc =
  "NIMHANS-trained neurosurgeon Dr. Nisarg Parmar offers brain tumor surgery, spine surgery, neurotrauma, and 24/7 emergency neurosurgery in Surat and Ahmedabad, Gujarat.";

export const metadata: Metadata = buildPageMetadata({
  path: "/",
  title: `Neurosurgeon in Surat & Ahmedabad, Gujarat | ${SITE_NAME} | Brain & Spine Specialist`,
  description: homeDesc,
  keywords: [
    ...LOCAL_KEYWORDS_PRIMARY,
    "brain tumor surgery Surat",
    "spine surgery Ahmedabad",
    "emergency neurosurgery Gujarat",
  ],
});

export default async function Home() {
  const { locations, settings } = await getHomeContactSectionData();
  const base = getSiteUrl();

  const structuredData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebSite",
        "@id": `${base}/#website`,
        url: base,
        name: SITE_NAME,
        description: homeDesc,
        inLanguage: "en-IN",
        publisher: { "@id": `${base}/#physician` },
      },
      {
        "@type": "Physician",
        "@id": `${base}/#physician`,
        name: "Dr. Nisarg Parmar",
        url: base,
        jobTitle: "Neurosurgeon",
        medicalSpecialty: ["Neurosurgery", "Neurological Surgery"],
        sameAs: physicianSameAsUrls(),
        alumniOf: {
          "@type": "EducationalOrganization",
          name: "National Institute of Mental Health and Neurosciences (NIMHANS)",
          address: { "@type": "PostalAddress", addressLocality: "Bangalore", addressCountry: "IN" },
        },
        knowsAbout: [
          "Brain tumor surgery",
          "Spine surgery",
          "Neurotrauma",
          "Pediatric neurosurgery",
          "Minimally invasive neurosurgery",
        ],
        areaServed: [
          {
            "@type": "City",
            name: "Surat",
            containedInPlace: { "@type": "AdministrativeArea", name: "Gujarat", containedInPlace: { "@type": "Country", name: "India" } },
          },
          {
            "@type": "City",
            name: "Ahmedabad",
            containedInPlace: { "@type": "AdministrativeArea", name: "Gujarat", containedInPlace: { "@type": "Country", name: "India" } },
          },
          { "@type": "AdministrativeArea", name: "Gujarat", containedInPlace: { "@type": "Country", name: "India" } },
        ],
      },
      {
        "@type": "FAQPage",
        "@id": `${base}/#faq`,
        mainEntity: FAQ_ITEMS.map((item) => ({
          "@type": "Question",
          name: item.q,
          acceptedAnswer: {
            "@type": "Answer",
            text: item.a,
          },
        })),
      },
    ],
  };

  return (
    <>
      <JsonLd data={structuredData} />
      <section className="sr-only" aria-label="Summary for search and assistive tools">
        <h2>Practice overview</h2>
        <p>{homeDesc}</p>
        <p>
          <Link href="/neurosurgeon-in-surat">Neurosurgeon in Surat</Link>
          {" · "}
          <Link href="/neurosurgeon-in-ahmedabad">Neurosurgeon in Ahmedabad</Link>
          {" · "}
          <Link href="/blog">Neurosurgery blog</Link>
        </p>
      </section>
      <Hero />
      <TrustIndicators />
      <AboutSection />
      <WhyChoose />
      <SpecialtiesSection />
      <TestimonialsSection />
      <VideoTestimonialsSection />
      <AppointmentCTA />
      <ContactLocationsSection
        initialLocations={locations}
        initialSettings={settings}
      />
      <SectionReveal>
        <FAQSection />
      </SectionReveal>
      <SectionReveal delay={0.1}>
        <MedicalDisclaimer />
      </SectionReveal>
    </>
  );
}
