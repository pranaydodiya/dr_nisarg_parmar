"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Brain,
  Activity,
  HeartPulse,
  Stethoscope,
  Sparkles,
} from "lucide-react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { cn } from "@/lib/utils";

type Stat = {
  label: string;
  value: string;
};

type Program = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  stats: Stat[];
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
};

const PROGRAMS: Program[] = [
  {
    id: "01",
    title: "Brain Tumor Surgery",
    subtitle: "Advanced brain tumor care",
    description:
      "Advanced surgical treatment for brain tumors with precision and care, from diagnosis to recovery.",
    imageUrl: "/images/specialties/brain_tumor_1773115872282.png",
    stats: [
      { label: "Brain tumor surgeries", value: "2000+" },
      { label: "Years of experience", value: "8+ yrs" },
    ],
    icon: Brain,
  },
  {
    id: "02",
    title: "Spine Surgery",
    subtitle: "Disc, deformity & trauma",
    description:
      "Comprehensive spine solutions for disc, deformity, and trauma cases, focused on stability and mobility.",
    imageUrl: "/images/specialties/spine_surgery_1773115892132.png",
    stats: [
      { label: "Spine surgeries", value: "2,000+" },
      { label: "Minimally invasive cases", value: "60%" },
    ],
    icon: Activity,
  },
  {
    id: "03",
    title: "Neurotrauma Care",
    subtitle: "Head & spine emergencies",
    description:
      "Emergency neurosurgical care for head and spine injuries with 24/7 availability.",
    imageUrl: "/images/specialties/neurotrauma_1773115905596.png",
    stats: [
      { label: "Emergency cases handled", value: "3,000+" },
      { label: "Hospitals on call", value: "5+" },
    ],
    icon: HeartPulse,
  },
  {
    id: "04",
    title: "Pediatric Neurosurgery",
    subtitle: "Child-focused brain & spine",
    description:
      "Specialized care for children with neurological conditions, tailored to growth and development.",
    imageUrl: "/images/specialties/pediatric_neuro_1773115930365.png",
    stats: [
      { label: "Pediatric cases", value: "800+" },
      { label: "Age range", value: "Newborn–18" },
    ],
    icon: Sparkles,
  },
  {
    id: "05",
    title: "Vascular Neurosurgery",
    subtitle: "Aneurysms & AVMs",
    description:
      "Treatment of aneurysms, AVMs, and other vascular brain conditions.",
    imageUrl: "/images/specialties/vascular_neuro_1773115947748.png",
    stats: [
      { label: "Vascular procedures", value: "1,000+" },
      { label: "Stroke interventions", value: "24/7" },
    ],
    icon: Stethoscope,
  },
  {
    id: "06",
    title: "Minimally Invasive Surgery",
    subtitle: "Smaller cuts, faster recovery",
    description:
      "Advanced minimally invasive techniques that aim for faster recovery and minimal scarring.",
    imageUrl: "/images/specialties/minimally_invasive_1773115964253.png",
    stats: [
      { label: "Keyhole / endoscopic cases", value: "800+" },
      { label: "Typical hospital stay", value: "2–4 days" },
    ],
    icon: Activity,
  },
];

function ScrollIndicator() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="flex flex-col items-center gap-4 text-xs tracking-[0.25em] uppercase text-slate-500">
      <span>Scroll to explore</span>
      <div className="relative h-16 w-px overflow-hidden rounded-full bg-slate-300/70">
        {!reduceMotion && (
          <motion.div
            className="absolute left-0 right-0 h-6 rounded-full bg-slate-900"
            initial={{ y: -24, opacity: 0 }}
            animate={{ y: 40, opacity: [0, 1, 0.2] }}
            transition={{
              duration: 1.6,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        )}
      </div>
    </div>
  );
}

function ProgramCard({
  program,
  index,
  onOpen,
}: {
  program: Program;
  index: number;
  onOpen: () => void;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 80%", "end 20%"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [0.94, 1]);
  const y = useTransform(scrollYProgress, [0, 1], [40, 0]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.12, 1]);

  const Icon = program.icon;

  return (
    <motion.article
      ref={ref}
      style={{ scale, y }}
      className={cn(
        "relative mx-auto w-full max-w-6xl rounded-[32px] border border-slate-200/80 bg-white/80 cursor-pointer",
        "shadow-[0_24px_80px_rgba(15,23,42,0.18)] backdrop-blur-md",
        "overflow-hidden",
      )}
      onClick={onOpen}
      role="button"
      tabIndex={0}
    >
      <div className="grid h-full grid-cols-1 lg:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]">
        {/* Left: text & stats */}
        <div className="relative px-8 py-10 md:px-10 md:py-12">
          {/* Big faint number */}
          <div className="pointer-events-none absolute inset-y-0 -left-6 flex items-center opacity-10 md:-left-10">
            <span className="text-7xl font-semibold text-slate-900 md:text-8xl">
              {program.id}
            </span>
          </div>

          <div className="relative flex h-full flex-col justify-between gap-8">
            <div className="space-y-5">
              <div className="inline-flex items-center gap-3 rounded-full bg-slate-900 text-slate-50 px-4 py-2 shadow-sm">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Icon className="h-4 w-4" aria-hidden />
                </span>
                <span className="text-[11px] font-semibold uppercase tracking-[0.25em]">
                  {program.subtitle}
                </span>
              </div>

              <div>
                <h3 className="text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
                  {program.title}
                </h3>
                <p className="mt-3 max-w-xl text-sm leading-relaxed text-slate-600 md:text-base">
                  {program.description}
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <dl className="grid gap-4 text-left sm:grid-cols-2">
                {program.stats.map((stat) => (
                  <div key={stat.label} className="space-y-1">
                    <dt className="text-[11px] font-semibold uppercase tracking-[0.25em] text-slate-500">
                      {stat.label}
                    </dt>
                    <dd className="text-2xl font-semibold text-slate-900 md:text-3xl">
                      {stat.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>

        {/* Right: cinematic image */}
        <motion.div
          style={{ scale: imageScale }}
          className="relative min-h-[260px] overflow-hidden bg-slate-900/90"
        >
          <div
            className="absolute inset-0 bg-cover bg-center grayscale-[0.3] contrast-[1.15]"
            style={{
              backgroundImage: `url(${program.imageUrl})`,
            }}
            aria-hidden
          />
          <div
            className="absolute inset-0 bg-gradient-to-tr from-black/80 via-black/40 to-transparent"
            aria-hidden
          />
        </motion.div>
      </div>
    </motion.article>
  );
}

export function SpecialtiesShowcase() {
  const reduceMotion = useReducedMotion();
  const [activeProgram, setActiveProgram] = useState<Program | null>(null);

  return (
    <main className="bg-[#f7f3ee] text-slate-900">
      {/* Hero */}
      <section className="relative overflow-hidden pt-32 pb-20 md:pt-40 md:pb-24">
        {/* Noise / texture overlay */}
        <div className="pointer-events-none absolute inset-0 opacity-70 mix-blend-multiply">
          <div className="h-full w-full bg-[radial-gradient(circle_at_1px_1px,#00000014_1px,transparent_0)] bg-[length:3px_3px]" />
        </div>

        <div className="container relative z-10 mx-auto flex min-h-[78vh] flex-col items-center justify-between px-4">
          <div className="mx-auto max-w-3xl text-center">
            <div className="inline-flex items-center gap-2 rounded-full bg-slate-900 text-slate-50 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.3em]">
              <span className="inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary/15 text-primary">
                <Sparkles className="h-3 w-3" aria-hidden />
              </span>
              <span>Holistic brain &amp; spine strategy</span>
            </div>

            <motion.h1
              initial={reduceMotion ? undefined : { opacity: 0, y: 24 }}
              animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.05 }}
              className="mt-8 text-4xl font-semibold tracking-tight text-slate-900 md:text-5xl lg:text-6xl"
            >
              Our Care Pillars
            </motion.h1>

            <motion.p
              initial={reduceMotion ? undefined : { opacity: 0, y: 18 }}
              animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: "easeOut", delay: 0.15 }}
              className="mx-auto mt-5 max-w-2xl text-sm leading-relaxed text-slate-600 md:text-base"
            >
              A small set of focused programs – from brain tumors to spine,
              emergencies, children, and minimally invasive care. Each one is
              designed to feel calm, clear, and deeply personal, even in the
              most complex situations.
            </motion.p>
          </div>

          <div className="mb-4 mt-10 md:mb-0">
            <ScrollIndicator />
          </div>
        </div>
      </section>

      {/* Programs / pillars */}
      <section className="pb-20 pt-4 md:pb-28 md:pt-6">
        <div className="container mx-auto space-y-10 px-4 md:space-y-14">
          {PROGRAMS.map((program, index) => (
            <ProgramCard
              key={program.id}
              program={program}
              index={index}
              onOpen={() => setActiveProgram(program)}
            />
          ))}
        </div>
      </section>

      {/* CTA section */}
      <section className="bg-[#f7f3ee] text-slate-900 py-16 md:py-20">
        <div className="container mx-auto px-4">
          <div className="mx-auto max-w-2xl rounded-3xl border border-slate-200 bg-white/95 px-6 py-8 shadow-sm md:px-10 md:py-10 text-center">
            <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.3em] text-secondary">
              Book an appointment
            </p>
            <h2 className="mx-auto max-w-xl text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl">
              Ready to discuss your brain or spine concern?
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-slate-700 md:text-base">
              Schedule a consultation. We&apos;ll review your reports, answer
              your questions, and help you plan the next step. Appointment
              requests are confirmed within a few hours.
            </p>

            <div className="mt-8 flex justify-center">
              <Link
                href="/appointments"
                className="inline-flex items-center gap-2 rounded-full bg-secondary px-8 py-3 text-sm font-semibold tracking-[0.18em] text-secondary-foreground transition-colors duration-200 hover:bg-secondary/90 md:px-10 md:py-3.5"
              >
                <span>Book consultation</span>
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Detail overlay for each specialty */}
      {activeProgram && (
        <div
          className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 md:p-8"
          onClick={() => setActiveProgram(null)}
          role="dialog"
          aria-modal="true"
          aria-label={`${activeProgram.title} details`}
        >
          <div
            className="w-full max-w-2xl rounded-3xl bg-white shadow-2xl border border-slate-200 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="relative h-40 w-full bg-slate-900">
              <div
                className="absolute inset-0 bg-cover bg-center opacity-60"
                style={{ backgroundImage: `url(${activeProgram.imageUrl})` }}
                aria-hidden
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
              <div className="relative z-10 flex h-full flex-col justify-end px-6 pb-5">
                <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-primary/90">
                  {activeProgram.subtitle}
                </p>
                <h2 className="mt-1 text-2xl font-semibold text-white">
                  {activeProgram.title}
                </h2>
              </div>
            </div>
            <div className="px-6 py-6 md:px-8 md:py-7 space-y-5">
              <p className="text-sm leading-relaxed text-slate-700">
                {activeProgram.title === "Brain Tumor Surgery" &&
                  "Brain tumor surgery focuses on safely removing or reducing tumors while protecting healthy brain tissue. Advanced imaging, neuronavigation, and microsurgical techniques help plan each step so that treatment is as accurate and safe as possible."}
                {activeProgram.title === "Spine Surgery" &&
                  "Spine surgery addresses disc problems, deformity, and trauma with a stepwise approach. The goal is to relieve pressure on nerves, stabilize the spine, and restore movement so that day-to-day life becomes more comfortable again."}
                {activeProgram.title === "Neurotrauma Care" &&
                  "Neurotrauma care covers emergencies such as head injuries and spinal trauma. Rapid assessment, CT/MRI imaging, and timely surgery when needed are key to protecting the brain and spinal cord and improving long-term outcomes."}
                {activeProgram.title === "Pediatric Neurosurgery" &&
                  "Pediatric neurosurgery focuses on brain and spine conditions in children, from newborns to teenagers. Treatment plans are tailored to growth, development, and schooling, with clear guidance for parents at every stage."}
                {activeProgram.title === "Vascular Neurosurgery" &&
                  "Vascular neurosurgery treats aneurysms, arteriovenous malformations (AVMs), and other vessel-related problems in the brain. Depending on the case, options may include microsurgical clipping, endovascular procedures, or combined approaches."}
                {activeProgram.title === "Minimally Invasive Surgery" &&
                  "Minimally invasive neurosurgery uses smaller openings, tubular retractors, and endoscopes to reach the problem area through the safest possible corridor. This often means less pain, smaller scars, and a quicker return to normal activity."}
              </p>

              <div className="grid gap-4 text-sm text-slate-700 sm:grid-cols-2">
                <ul className="list-disc list-inside space-y-1">
                  <li>Individualized evaluation and treatment planning</li>
                  <li>Clear explanation of options, risks, and recovery</li>
                  <li>Coordination with anesthesia and intensive care teams</li>
                </ul>
                <ul className="list-disc list-inside space-y-1">
                  <li>Focus on safety and long-term quality of life</li>
                  <li>Postoperative follow-up and rehabilitation guidance</li>
                  <li>Emergency support for urgent cases where needed</li>
                </ul>
              </div>

              <div className="flex flex-col gap-3 pt-2 sm:flex-row sm:items-center sm:justify-between">
                <div className="text-xs text-slate-500">
                  For appointments and case discussion, you can share your
                  reports and imaging before the visit.
                </div>
                <Link
                  href="/appointments"
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90"
                >
                  <span>Book consultation</span>
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
