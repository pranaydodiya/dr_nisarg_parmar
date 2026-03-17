"use client";

import { useRef, useEffect, useState } from "react";
import { Award, Activity, Clock, GraduationCap } from "lucide-react";
import { motion, useInView, useReducedMotion } from "framer-motion";

const STATS = [
  { label: "Years Experience", value: 8 as number | string, suffix: "+", icon: Award },
  { label: "Successful Surgeries", value: 2000 as number | string, suffix: "+", icon: Activity },
  { label: "Emergency Available", value: "24/7" as number | string, suffix: "", icon: Clock },
  { label: "Banglore", value: "NIMHANS " as number | string, suffix: "", icon: GraduationCap },
];

function AnimatedCounter({ target, suffix = "" }: { target: number | string; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true });

  useEffect(() => {
    if (!inView || typeof target !== "number") return;
    const end = target;
    const duration = 1400;
    const startTime = performance.now();

    function step(now: number) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }, [inView, target]);

  if (typeof target === "string") {
    return (
      <span ref={ref} className="text-2xl sm:text-3xl font-bold text-foreground">
        {target}
      </span>
    );
  }

  return (
    <span ref={ref} className="text-2xl sm:text-3xl font-bold text-foreground tabular-nums">
      {inView ? count.toLocaleString() : "0"}
      {suffix}
    </span>
  );
}

export function TrustIndicators() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const reduce = useReducedMotion();

  return (
    <section id="trust" className="py-8 md:py-12 bg-muted/30" aria-label="Trust indicators">
      <div ref={ref} className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-5">
          {STATS.map(({ label, value, suffix, icon: Icon }, i) => (
            <motion.div
              key={label}
              initial={reduce ? false : { opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.4, delay: i * 0.1, ease: "easeOut" }}
              className="flex flex-col items-center text-center gap-2 rounded-2xl bg-card border border-border p-4 sm:p-6 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300"
            >
              <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-full bg-foreground/10 flex items-center justify-center">
                <Icon className="h-5 w-5 sm:h-6 sm:w-6 text-foreground" aria-hidden="true" />
              </div>
              <AnimatedCounter target={value} suffix={suffix} />
              <p className="text-xs sm:text-sm font-medium text-foreground/60">{label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
