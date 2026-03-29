import { SectionReveal } from "@/components/shared/SectionReveal";
import { Hero } from "@/components/home/Hero";
import { TrustIndicators } from "@/components/home/TrustIndicators";
import { AboutSection } from "@/components/home/AboutSection";
import { WhyChoose } from "@/components/home/WhyChoose";
import { SpecialtiesSection } from "@/components/home/SpecialtiesSection";
import { TestimonialsSection } from "@/components/home/TestimonialsSection";
import { VideoTestimonialsSection } from "@/components/home/VideoTestimonialsSection";
import { AppointmentCTA } from "@/components/home/AppointmentCTA";
import { ContactLocationsSection } from "@/components/home/ContactLocationsSection";
import { FAQSection } from "@/components/home/FAQSection";
import { MedicalDisclaimer } from "@/components/home/MedicalDisclaimer";
import { getHomeContactSectionData } from "@/lib/contact-data";

export default async function Home() {
  const { locations, settings } = await getHomeContactSectionData();

  return (
    <>
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
