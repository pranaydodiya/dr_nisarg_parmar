import type { Metadata } from "next";
import { SpecialtiesShowcase } from "@/components/specialties/SpecialtiesShowcase";

export const metadata: Metadata = {
  title: "Specialties | Dr. Nisarg Parmar - Neurosurgeon",
  description: "Brain tumor surgery, spine surgery, neurotrauma, pediatric neurosurgery, vascular neurosurgery, minimally invasive surgery. Expert care in Gujarat.",
};

export default function SpecialtiesPage() {
  return (
    <SpecialtiesShowcase />
  );
}
