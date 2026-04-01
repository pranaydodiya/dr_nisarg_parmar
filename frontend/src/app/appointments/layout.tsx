import type { Metadata } from "next";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildPageMetadata, getSiteUrl, SITE_NAME } from "@/lib/seo";

const apptDesc =
  "Schedule a neurosurgery or spine consultation. We confirm appointment requests quickly via phone or WhatsApp.";

export const metadata: Metadata = buildPageMetadata({
  path: "/appointments",
  title: `Book an Appointment | ${SITE_NAME}`,
  description: apptDesc,
  keywords: ["book neurosurgeon appointment", "spine consultation Surat", "WhatsApp appointment"],
});

export default function AppointmentsLayout({
  children,
}: { children: React.ReactNode }) {
  const base = getSiteUrl();
  const howTo = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "Book an appointment with Dr. Nisarg Parmar",
    description: apptDesc,
    step: [
      {
        "@type": "HowToStep",
        position: 1,
        name: "Fill the form",
        text: "Enter your name, phone, preferred date, and a short note about your condition.",
      },
      {
        "@type": "HowToStep",
        position: 2,
        name: "Send via WhatsApp",
        text: "Submit to open WhatsApp with your details pre-filled for the clinic team.",
      },
      {
        "@type": "HowToStep",
        position: 3,
        name: "Confirmation",
        text: "The team typically confirms within two hours during working hours.",
      },
    ],
    totalTime: "PT2H",
  };

  const crumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: base },
      { "@type": "ListItem", position: 2, name: "Appointments", item: `${base}/appointments` },
    ],
  };

  return (
    <>
      <JsonLd data={howTo} />
      <JsonLd data={crumbs} />
      {children}
    </>
  );
}
