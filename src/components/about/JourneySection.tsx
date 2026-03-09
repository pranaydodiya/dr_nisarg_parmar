"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { SectionReveal } from "@/components/shared/SectionReveal";
import { ChevronDown } from "lucide-react";

const JOURNEY_STEPS = [
  {
    label: "Phase 1",
    title: "Foundations in medicine",
    description:
      "MBBS and MS (General Surgery) built a strong base in safe, precise surgical care.",
    ghost: "01",
  },
  {
    label: "Phase 2",
    title: "Neurosurgery at NIMHANS",
    description:
      "MCh (Neurosurgery) at NIMHANS, Bangalore, deepened expertise in complex brain and spine surgery.",
    ghost: "02",
  },
  {
    label: "Phase 3",
    title: "Practice in Gujarat",
    description:
      "Focused neurosurgical practice combining emergency care, brain tumors, spine surgery, and pediatric cases.",
    ghost: "03",
  },
  {
    label: "Phase 4",
    title: "Advanced techniques",
    description:
      "Adoption of minimally invasive and vascular techniques to reduce pain, scarring, and recovery time.",
    ghost: "04",
  },
];

const NAV_H = 76;
const TITLE_H = 72;
const CARD_TOP = NAV_H + TITLE_H;

const CARD_BG = ["bg-[#FAFAF8]", "bg-white", "bg-[#FAFAF8]", "bg-white"];

export function JourneySection() {
  const titleRef = useRef<HTMLDivElement>(null);
  const titleInView = useInView(titleRef, { once: true, margin: "-40px" });

  return (
    <section className="bg-white">

      {/* ── MOBILE: sticky title + stacking cards ───────────────────── */}
      <div className="relative md:hidden">
        <div style={{ height: `calc(${JOURNEY_STEPS.length} * 60vh + 100vh)` }}>

          {/* Sticky heading — pins right below navbar */}
          <div
            ref={titleRef}
            className="sticky z-30 bg-white/95 backdrop-blur-sm border-b border-slate-200/50"
            style={{ top: `${NAV_H}px`, height: `${TITLE_H}px` }}
          >
            <div className="flex h-full flex-col items-center justify-center px-4">
              <motion.p
                initial={{ opacity: 0, y: 6 }}
                animate={titleInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.3 }}
                className="text-[10px] font-semibold uppercase tracking-[0.3em] text-secondary"
              >
                Journey
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={titleInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.35, delay: 0.06 }}
                className="mt-0.5 text-base font-semibold tracking-tight text-slate-900 text-center leading-tight"
              >
                From training to trusted care
              </motion.h2>
              <motion.div
                initial={{ opacity: 0 }}
                animate={titleInView ? { opacity: 1 } : {}}
                transition={{ duration: 0.3, delay: 0.15 }}
                className="mt-1 flex items-center gap-1 text-[10px] text-slate-400"
              >
                <ChevronDown className="h-3 w-3 animate-bounce" aria-hidden />
                <span>Scroll</span>
              </motion.div>
            </div>
          </div>

          {/* Stacking journey cards */}
          {JOURNEY_STEPS.map((item, index) => (
            <div
              key={item.title}
              className="sticky px-3"
              style={{
                top: `${CARD_TOP}px`,
                zIndex: 10 + index,
                height: "60vh",
              }}
            >
              <div
                className={`${CARD_BG[index]} rounded-2xl border border-slate-200/70 shadow-lg overflow-hidden transition-shadow duration-300`}
                style={{ height: `calc(100vh - ${CARD_TOP + 16}px)` }}
              >
                <div className="flex h-full flex-col justify-center px-5 py-6">
                  <span className="text-[2.5rem] font-bold leading-none text-slate-200 select-none">
                    {item.ghost}
                  </span>
                  <p className="mt-3 text-[10px] font-semibold uppercase tracking-[0.3em] text-secondary">
                    {item.label}
                  </p>
                  <h3 className="mt-2 text-lg font-semibold text-slate-900">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    {item.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── DESKTOP: animated grid ──────────────────────────────────── */}
      <div className="hidden md:block">
        <div className="container mx-auto max-w-6xl px-4 py-14 lg:py-20">
          <SectionReveal>
            <div className="mb-10">
              <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-secondary">
                Journey
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 lg:text-4xl">
                From training to trusted care
              </h2>
            </div>
          </SectionReveal>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {JOURNEY_STEPS.map((item, index) => (
              <SectionReveal key={item.title} delay={0.08 * index}>
                <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-[#FAFAF8] px-6 py-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md">
                  <span className="pointer-events-none absolute top-3 right-4 text-4xl font-bold text-slate-200/90 select-none">
                    {item.ghost}
                  </span>
                  <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-secondary">
                    {item.label}
                  </p>
                  <h3 className="mt-2 text-lg font-semibold text-slate-900">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    {item.description}
                  </p>
                </div>
              </SectionReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
