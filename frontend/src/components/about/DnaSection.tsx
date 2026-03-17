"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { SectionReveal } from "@/components/shared/SectionReveal";
import { ChevronDown } from "lucide-react";

const VALUES = [
  {
    num: "01",
    title: "Compassion first",
    body: "Every conversation is calm, respectful, and paced so patients and families never feel rushed.",
  },
  {
    num: "02",
    title: "Clear explanations",
    body: "Imaging, diagnoses, and surgical plans are explained in simple language, with room for every question.",
  },
  {
    num: "03",
    title: "Evidence-based surgery",
    body: "Decisions are grounded in current neurosurgical standards and tailored to each patient's situation.",
  },
  {
    num: "04",
    title: "Family-centered follow-up",
    body: "Support continues beyond the operation, with guidance on recovery, rehabilitation, and long-term care.",
  },
];

/*
  Layout math (mobile):
  ─ Navbar (fixed): pt-4 + pill(~56px) + buffer ≈ 76px
  ─ Sticky title bar: compact 72px
  ─ Cards stick at 76 + 72 = 148px from viewport top
  ─ Card height = 100vh - 148px - 16px (bottom padding) = calc(100vh - 164px)
  ─ Each card wrapper is 60vh tall to create stacking scroll distance
  ─ Total scroll container = 4 × 60vh + one viewport to finish
*/
const NAV_H = 76;
const TITLE_H = 72;
const CARD_TOP = NAV_H + TITLE_H;

const CARD_BG = ["bg-white", "bg-slate-50", "bg-white", "bg-slate-50"];

export function DnaSection() {
  const titleRef = useRef<HTMLDivElement>(null);
  const titleInView = useInView(titleRef, { once: true, margin: "-40px" });

  return (
    <section aria-label="Our DNA" className="bg-[#FAFAF8]">

      {/* ── MOBILE: sticky title + stacking cards ───────────────────── */}
      <div className="relative md:hidden">
        {/* Spacer to create scroll distance: each card needs ~60vh of scroll */}
        <div style={{ height: `calc(${VALUES.length} * 60vh + 100vh)` }}>

          {/* Sticky title — pins right below navbar */}
          <div
            ref={titleRef}
            className="sticky z-30 bg-[#FAFAF8]/95 backdrop-blur-sm border-b border-slate-200/50"
            style={{ top: `${NAV_H}px`, height: `${TITLE_H}px` }}
          >
            <div className="flex h-full flex-col items-center justify-center px-4">
              <motion.p
                initial={{ opacity: 0, y: 6 }}
                animate={titleInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.3 }}
                className="text-[10px] font-semibold uppercase tracking-[0.3em] text-secondary"
              >
                Our DNA
              </motion.p>
              <motion.h2
                initial={{ opacity: 0, y: 10 }}
                animate={titleInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.35, delay: 0.06 }}
                className="mt-0.5 text-base font-semibold tracking-tight text-slate-900 text-center leading-tight"
              >
                How care feels in this practice
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

          {/* Stacking cards — each sticks at CARD_TOP, higher z-index covers previous */}
          {VALUES.map((value, index) => (
            <div
              key={value.title}
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
                  <span className="text-[2.5rem] font-bold leading-none text-slate-100 select-none">
                    {value.num}
                  </span>
                  <div className="mt-3 flex h-9 w-9 items-center justify-center rounded-full bg-secondary/10 text-secondary">
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                      aria-hidden
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <h3 className="mt-3 text-lg font-semibold text-slate-900">
                    {value.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    {value.body}
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
            <div className="text-center mb-10">
              <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-secondary">
                Our DNA
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 lg:text-4xl">
                How care feels in this practice
              </h2>
            </div>
          </SectionReveal>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {VALUES.map((value, index) => (
              <SectionReveal key={value.title} delay={0.08 * index}>
                <div className="group relative overflow-hidden rounded-2xl border border-slate-200 bg-white/80 p-6 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:border-secondary/40 hover:shadow-lg">
                  <span className="pointer-events-none absolute top-3 right-4 text-4xl font-bold text-slate-100 select-none">
                    {value.num}
                  </span>
                  <div className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-secondary/10 text-secondary">
                    <svg
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                      aria-hidden
                    >
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-slate-900">
                    {value.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-slate-600">
                    {value.body}
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
