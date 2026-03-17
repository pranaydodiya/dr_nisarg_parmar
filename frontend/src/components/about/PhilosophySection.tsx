"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

const STAT_ITEMS = [
  { label: "Years of experience", value: 8, suffix: "+ yrs", type: "count" as const },
  { label: "Brain & spine surgeries", value: 2000, suffix: "+", type: "count" as const },
  { label: "Emergency availability", text: "24/7", type: "text" as const },
  { label: "Primary training", text: "NIMHANS", type: "text" as const },
];

function useCountUp(target: number, inView: boolean, duration = 700) {
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!inView) return;

    let frame: number;
    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const value = Math.floor(progress * target);
      setCurrent(value);
      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, target, duration]);

  return current;
}

function StatCard({
  stat,
  inView,
  index,
}: {
  stat: (typeof STAT_ITEMS)[number];
  inView: boolean;
  index: number;
}) {
  const countValue = useCountUp(
    stat.type === "count" ? stat.value : 0,
    inView
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{
        duration: 0.4,
        delay: inView ? 0.1 + index * 0.05 : 0,
        ease: "easeOut",
      }}
    >
      <Card className="border border-slate-200 bg-white/80 shadow-sm transition-transform duration-200 hover:-translate-y-1 hover:shadow-md">
        <CardContent className="px-2.5 py-2.5 sm:px-5 sm:py-4">
          <p className="text-[8px] font-semibold uppercase tracking-[0.12em] text-secondary/90 sm:text-[11px] sm:tracking-[0.25em]">
            {stat.label}
          </p>
          <p className="mt-1 text-xl font-semibold text-slate-900 sm:mt-2 sm:text-3xl md:text-4xl">
            {stat.type === "count"
              ? `${countValue}${stat.suffix}`
              : stat.text}
          </p>
        </CardContent>
      </Card>
    </motion.div>
  );
}

export function PhilosophySection() {
  const sectionRef = useRef<HTMLDivElement | null>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      id="philosophy"
      className="py-6 md:py-20"
      aria-labelledby="bio-heading"
    >
      <div
        ref={sectionRef}
        className="container mx-auto max-w-6xl px-4"
      >
        <div className="grid gap-10 md:grid-cols-[minmax(0,1.3fr)_minmax(0,1fr)] md:items-start">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 }}
            transition={{ duration: 0.5, ease: "easeOut" }}
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-secondary">
              Philosophy
            </p>
            <h2
              id="bio-heading"
              className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 md:text-4xl"
            >
              A calm, structured approach to complex care
            </h2>
            <div className="mt-4 space-y-4 text-sm leading-relaxed text-slate-600 md:text-base">
              <p>
                Trained at NIMHANS, Bangalore&mdash;India&apos;s leading neurosurgical
                institute&mdash;Dr. Nisarg Parmar brings academic rigor and practical
                judgement to every brain and spine case. From the first consultation, he
                focuses on listening carefully, explaining options in simple language,
                and planning each step of treatment.
              </p>
              <p>
                Many patients and families meet him at some of the most stressful
                moments of their lives. The aim is to create a calm, clear environment
                where questions are welcomed, second opinions are respected, and every
                decision is made together.
              </p>
            </div>
          </motion.div>

          <div className="grid grid-cols-2 gap-2 sm:gap-4">
            {STAT_ITEMS.map((stat, index) => (
              <StatCard key={stat.label} stat={stat} inView={inView} index={index} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

