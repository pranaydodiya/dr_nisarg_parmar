import type { Metadata } from "next";
import { SpecialtiesShowcase } from "@/components/specialties/SpecialtiesShowcase";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildPageMetadata, getSiteUrl, SITE_NAME } from "@/lib/seo";

const specDesc =
  "Brain tumor surgery, spine surgery, neurotrauma, pediatric neurosurgery, vascular neurosurgery, minimally invasive surgery. Expert care in Gujarat.";

export const metadata: Metadata = buildPageMetadata({
  path: "/specialties",
  title: `Specialties | ${SITE_NAME}`,
  description: specDesc,
  keywords: [
    "brain tumor surgery Gujarat",
    "spine surgery Surat",
    "minimally invasive neurosurgery",
    "pediatric neurosurgery",
  ],
});

export default function SpecialtiesPage() {
  const base = getSiteUrl();
  const medicalWebPage = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    name: `Neurosurgery specialties | ${SITE_NAME}`,
    description: specDesc,
    url: `${base}/specialties`,
    about: {
      "@type": "MedicalSpecialty",
      name: "Neurosurgery",
    },
    mainEntity: {
      "@type": "Physician",
      name: "Dr. Nisarg Parmar",
      url: base,
      medicalSpecialty: "Neurosurgery",
    },
  };

  return (
    <>
      <JsonLd data={medicalWebPage} />
      <SpecialtiesShowcase />
    </>
  );
}
