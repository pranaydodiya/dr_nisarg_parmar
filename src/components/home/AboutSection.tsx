"use client";

import { useRef } from "react";
import Link from "next/link";
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
} from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

const GLANCE = [
  "NIMHANS, Bangalore trained neurosurgeon",
  "Complex brain & spine surgery expertise",
  "Focus on clear communication & follow-up",
];

export function AboutSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });
  const reduce = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  const fade = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 22 },
          animate: inView ? { opacity: 1, y: 0 } : {},
          transition: { duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] },
        };

  return (
    <section
      id="about"
      ref={sectionRef}
      className="relative py-16 md:py-24 overflow-hidden"
      aria-labelledby="about-heading"
    >
      <motion.div
        style={{ y: bgY }}
        className="pointer-events-none absolute inset-0 bg-gradient-to-br from-secondary/4 via-transparent to-primary/4"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">

        <div className="mb-12 text-center max-w-3xl mx-auto space-y-4">
          <motion.p
            {...fade(0)}
            className="text-xs sm:text-sm font-semibold uppercase tracking-[0.25em] text-secondary"
          >
            Meet the Doctor
          </motion.p>

          <motion.h2
            {...fade(0.1)}
            id="about-heading"
            className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-foreground leading-tight"
          >
            About Dr. Nisarg Parmar
          </motion.h2>

          <motion.p
            {...fade(0.2)}
            className="text-foreground/60 text-base md:text-lg leading-relaxed"
          >
            NIMHANS-trained neurosurgeon dedicated to expert neurological care in Gujarat.
          </motion.p>
        </div>

        <div className="max-w-5xl mx-auto grid gap-10 md:grid-cols-[1.5fr_1fr] items-start">

          <div className="space-y-5">
            <motion.p {...fade(0.25)} className="text-sm sm:text-base text-foreground/70 leading-relaxed">
              <strong className="text-foreground font-semibold">Qualifications:</strong>{" "}
              MBBS, MS (General Surgery), MCh (Neurosurgery) — NIMHANS, Bangalore.
            </motion.p>

            <motion.p {...fade(0.35)} className="text-sm sm:text-base text-foreground/70 leading-relaxed">
              Expert neurosurgeon with over 15 years of clinical experience and more than
              5,000 successful surgeries. Trusted across Gujarat for complex brain and spine
              care, combining advanced surgical techniques with a patient-centered approach.
            </motion.p>

            <motion.p {...fade(0.45)} className="text-sm sm:text-base text-foreground/70 leading-relaxed">
              Every patient receives not just the best medical treatment, but compassion,
              clear communication, and hope — treating the whole person, not just the condition.
            </motion.p>
          </div>

          <div className="space-y-4">
            <motion.div {...fade(0.35)}>
              <Card className="relative overflow-hidden border-l-4 border-l-secondary bg-muted/30">
                <motion.div
                  className="pointer-events-none absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  initial={{ x: "-100%" }}
                  animate={inView ? { x: "200%" } : {}}
                  transition={{ duration: 1.1, delay: 0.8, ease: "easeInOut" }}
                  aria-hidden="true"
                />
                <CardContent className="pt-6 pb-6">
                  <blockquote className="text-foreground italic text-sm sm:text-base leading-relaxed">
                    &ldquo;Every patient deserves not just the best medical treatment,
                    but also compassion, clear communication, and hope.&rdquo;
                  </blockquote>
                  <cite className="not-italic text-xs sm:text-sm text-foreground/50 block mt-3">
                    — Dr. Nisarg Parmar
                  </cite>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div {...fade(0.45)}>
              <Card className="bg-card border-border shadow-sm">
                <CardContent className="pt-5 pb-5">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-secondary mb-3">
                    At a glance
                  </p>
                  <ul className="space-y-2.5">
                    {GLANCE.map((item, i) => (
                      <motion.li
                        key={item}
                        className="flex items-start gap-2 text-xs sm:text-sm text-foreground/65"
                        initial={reduce ? false : { opacity: 0, x: 14 }}
                        animate={inView ? { opacity: 1, x: 0 } : {}}
                        transition={{ duration: 0.5, delay: 0.55 + i * 0.1, ease: "easeOut" }}
                      >
                        <motion.span
                          className="mt-1.5 h-1.5 w-1.5 rounded-full bg-secondary shrink-0"
                          initial={reduce ? false : { scale: 0 }}
                          animate={inView ? { scale: 1 } : {}}
                          transition={{ duration: 0.3, delay: 0.6 + i * 0.1, type: "spring" }}
                        />
                        {item}
                      </motion.li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>

        <motion.div {...fade(0.65)} className="mt-10 text-center">
          <Button variant="secondary" className="rounded-full text-sm" asChild>
            <Link href="/about">Read full profile</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
