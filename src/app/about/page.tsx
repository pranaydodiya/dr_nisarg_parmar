import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { SectionReveal } from "@/components/shared/SectionReveal";
import { Button } from "@/components/ui/button";
import { Phone, ChevronDown } from "lucide-react";
import { EMERGENCY_PHONE } from "@/content/site";
import { PhilosophySection } from "@/components/about/PhilosophySection";
import { DnaSection } from "@/components/about/DnaSection";
import { JourneySection } from "@/components/about/JourneySection";

export const metadata: Metadata = {
  title: "About Dr. Nisarg Parmar | Neurosurgeon | Brain & Spine Specialist",
  description:
    "NIMHANS-trained neurosurgeon. Full bio, education, achievements, and core values. Expert neurological care in Gujarat.",
};

export default function AboutPage() {
  return (
    <div className="bg-[#FAFAF8] text-slate-900 overflow-x-clip">

      {/* HERO */}
      <section className="relative overflow-clip pt-6 pb-4 md:pt-20 md:pb-16">
        <div className="container mx-auto max-w-5xl px-4">
          <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-navy to-slate-900">
            <div className="flex flex-col items-center justify-center px-5 py-12 text-center sm:px-8 md:py-20">

              <SectionReveal>
                <div className="inline-flex items-center justify-center rounded-full bg-white/10 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.3em] text-secondary ring-1 ring-white/20 backdrop-blur">
                  About the neurosurgeon
                </div>
              </SectionReveal>

              <SectionReveal delay={0.1}>
                <h1 className="mt-6 text-3xl font-semibold tracking-tight text-white sm:text-4xl md:text-5xl">
                  Precise brain and spine surgery,
                  <span className="block italic text-secondary">deeply human care.</span>
                </h1>
              </SectionReveal>

              <SectionReveal delay={0.18}>
                <p className="mt-4 max-w-2xl text-sm leading-relaxed text-slate-200 sm:text-base">
                  NIMHANS-trained neurosurgeon providing expert neurological care in
                  Gujarat combining advanced surgery with calm, clear guidance for every
                  patient and family.
                </p>
              </SectionReveal>

              <SectionReveal delay={0.26} className="w-full">
                <div className="mt-8 grid grid-cols-3 gap-3 text-left text-slate-100 sm:gap-6">
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-secondary/80 sm:text-[11px]">Surgeries</p>
                    <p className="text-xl font-semibold sm:text-2xl">2000+</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-secondary/80 sm:text-[11px]">Experience</p>
                    <p className="text-xl font-semibold sm:text-2xl">8+ yrs</p>
                  </div>
                  <div>
                    <p className="text-[10px] font-semibold uppercase tracking-[0.25em] text-secondary/80 sm:text-[11px]">Training</p>
                    <p className="text-xl font-semibold sm:text-2xl">NIMHANS</p>
                  </div>
                </div>
              </SectionReveal>

              <SectionReveal delay={0.34} className="w-full">
                <div className="mt-8 flex flex-wrap items-center justify-center gap-3 text-xs text-slate-200/90 sm:gap-4 sm:text-sm">
                  <Button
                    size="sm"
                    className="rounded-full bg-secondary px-5 py-2 text-xs font-semibold tracking-[0.18em] text-secondary-foreground hover:bg-secondary/90"
                    asChild
                  >
                    <Link href="/appointments">Book an appointment</Link>
                  </Button>
                  <span className="flex items-center gap-2">
                    <Phone className="h-4 w-4" aria-hidden />
                    <span className="text-xs sm:text-sm">24/7 Emergency: {EMERGENCY_PHONE}</span>
                  </span>
                </div>
              </SectionReveal>

              <SectionReveal delay={0.42}>
                <a
                  href="#philosophy"
                  className="mt-10 flex flex-col items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.25em] text-slate-200/70 transition-colors hover:text-secondary"
                >
                  <span>Scroll to explore</span>
                  <span className="flex h-8 w-8 items-center justify-center rounded-full border border-white/30">
                    <ChevronDown className="h-4 w-4 animate-bounce" />
                  </span>
                </a>
              </SectionReveal>

            </div>
          </div>
        </div>
      </section>

      {/* PHILOSOPHY + STATS */}
      <PhilosophySection />

      <section className="bg-white py-4 md:py-20">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="grid gap-6 md:gap-10 md:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] md:items-start">

            <SectionReveal className="md:sticky md:top-28">
              <div className="relative overflow-hidden rounded-3xl bg-slate-900 shadow-xl">
                <div className="relative h-72 w-full sm:h-80">
                  <Image
                    src="/dr-nisarg-parmar.png"
                    alt="Dr. Nisarg Parmar - Neurosurgeon"
                    fill
                    className="object-cover grayscale"
                    sizes="(max-width: 768px) 100vw, 400px"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/50 to-transparent" />
                </div>
                <div className="absolute inset-x-0 bottom-0 p-5 text-slate-100 sm:p-6">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-secondary">
                    Doctor profile
                  </p>
                  <p className="mt-2 text-sm leading-relaxed">
                    Every patient deserves not just the best medical treatment, but
                    also compassion, clear communication, and hope. I believe in treating
                    the whole person, not just the condition.
                  </p>
                  <p className="mt-2 text-xs text-slate-300">Dr. Nisarg Parmar</p>
                </div>
              </div>
            </SectionReveal>

            <div className="space-y-5 sm:space-y-6">
              {[
                {
                  chapter: "MCh (Neurosurgery)",
                  title: "NIMHANS, Bangalore",
                  body: "Super-specialization in neurosurgery at NIMHANS, India's leading neurosurgical institute, shaped his approach to complex brain and spine surgeries with evidence-based practice and meticulous planning.",
                },
                {
                  chapter: "MS (General Surgery)",
                  title: "Strong surgical foundation",
                  body: "Postgraduate training in General Surgery built a strong base in safe, precise surgical care before focusing on neurosurgery.",
                },
                {
                  chapter: "MBBS and practice in Gujarat",
                  title: "Serving patients and families",
                  body: "From MBBS onwards, clinical experience in Gujarat has centered on listening to patients, guiding families, and planning treatment journeys together.",
                },
              ].map((item, idx) => (
                <SectionReveal key={item.title} delay={0.08 * idx}>
                  <div className="rounded-2xl border border-slate-200 bg-white/80 p-5 shadow-sm transition-shadow duration-300 hover:shadow-md">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-secondary">
                      {item.chapter}
                    </p>
                    <h3 className="mt-2 text-lg font-semibold text-slate-900 sm:text-xl">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-slate-600 sm:text-base">
                      {item.body}
                    </p>
                  </div>
                </SectionReveal>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* OUR DNA */}
      <DnaSection />

      {/* JOURNEY */}
      <JourneySection />

      {/* FAQ */}
      <section className="bg-white py-6 md:py-20">
        <div className="container mx-auto max-w-4xl px-4">
          <SectionReveal>
            <div className="text-center">
              <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-secondary">
                FAQ
              </p>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-slate-900 sm:text-3xl md:text-4xl">
                Questions patients often ask
              </h2>
            </div>
          </SectionReveal>

          <div className="mt-8 space-y-4">
            {[
              {
                q: "What conditions does Dr. Parmar treat?",
                a: "Brain tumors, spine problems (disc, deformity, trauma), neurotrauma, pediatric neurosurgical conditions, vascular neurosurgery, and minimally invasive brain and spine procedures.",
              },
              {
                q: "Is emergency neurosurgical care available 24/7?",
                a: "Yes. Emergency neurosurgery for head injuries, spinal trauma, and stroke is available 24/7. In an emergency, call the emergency number listed on this site so care can be coordinated immediately.",
              },
              {
                q: "How can I book an appointment?",
                a: "You can book through the appointments page on this website, call the clinic numbers, or contact the listed hospitals where Dr. Parmar practices. After you submit a request, the team will confirm your slot and share visit details.",
              },
            ].map((item, index) => (
              <SectionReveal key={item.q} delay={0.08 * index}>
                <details className="group rounded-2xl border border-slate-200 bg-white/90 p-4 shadow-sm transition-shadow duration-300 hover:shadow-md sm:p-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4">
                    <span className="text-sm font-semibold text-slate-900 group-open:text-secondary sm:text-base">
                      {item.q}
                    </span>
                    <ChevronDown className="h-4 w-4 shrink-0 flex-none text-slate-400 transition-transform group-open:rotate-180" />
                  </summary>
                  <p className="mt-3 text-sm leading-relaxed text-slate-600">
                    {item.a}
                  </p>
                </details>
              </SectionReveal>
            ))}
          </div>
        </div>
      </section>

    </div>
  );
}