"use client";

import { useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { cn } from "@/lib/utils";
import { Shield, Clock, Brain, Stethoscope, Zap, Heart } from "lucide-react";

const POINTS = [
  {
    title: "NIMHANS Trained",
    desc: "Trained at India's premier neuroscience institution in Bangalore.",
    icon: Shield,
    color: "bg-blue-500/10 text-blue-600",
  },
  {
    title: "8+ Years Experience",
    desc: "Deep expertise across thousands of complex neurological cases.",
    icon: Clock,
    color: "bg-teal-500/10 text-teal-600",
  },
  {
    title: "2000+ Surgeries",
    desc: "Proven track record with successful brain and spine procedures.",
    icon: Brain,
    color: "bg-purple-500/10 text-purple-600",
  },
  {
    title: "24/7 Availability",
    desc: "Round-the-clock emergency neurosurgical care when you need it.",
    icon: Stethoscope,
    color: "bg-red-500/10 text-red-600",
  },
  {
    title: "Advanced Techniques",
    desc: "Minimally invasive approaches for faster recovery and less pain.",
    icon: Zap,
    color: "bg-amber-500/10 text-amber-600",
  },
  {
    title: "Patient-Centered Care",
    desc: "Compassionate communication and personalized treatment plans.",
    icon: Heart,
    color: "bg-pink-500/10 text-pink-600",
  },
] as const;

export function WhyChoose() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduce = useReducedMotion();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section
      id="why-choose"
      className="py-12 md:py-16 bg-muted/30"
      aria-labelledby="why-heading"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <SectionHeading
          id="why-heading"
          title="Why Choose Dr. Parmar"
          subtitle="Expertise, availability, and a commitment to your care."
          className="mb-10"
        />

        {/* Desktop: grid with hover expand/fade effect */}
        <div
          ref={ref}
          className="hidden md:grid md:grid-cols-2 lg:grid-cols-3 gap-5"
          onMouseLeave={() => setHoveredIndex(null)}
        >
          {POINTS.map(({ title, desc, icon: Icon, color }, i) => (
            <motion.div
              key={title}
              initial={reduce ? false : { opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.45, delay: i * 0.08, ease: "easeOut" }}
              onMouseEnter={() => setHoveredIndex(i)}
              className={cn(
                "group relative rounded-2xl bg-card border border-border p-6 cursor-pointer transition-all duration-300 overflow-hidden",
                hoveredIndex === null
                  ? "hover:shadow-xl hover:-translate-y-1"
                  : hoveredIndex === i
                    ? "shadow-2xl scale-105 -translate-y-2 z-10 border-secondary/30"
                    : "scale-[0.96] opacity-50 grayscale",
              )}
            >
              <div
                className="absolute inset-0 bg-gradient-to-br from-secondary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                aria-hidden="true"
              />
              <div className="relative z-10">
                <div
                  className={cn(
                    "h-12 w-12 rounded-xl flex items-center justify-center mb-4",
                    color,
                  )}
                >
                  <Icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <h3 className="text-base font-semibold text-foreground mb-1.5">
                  {title}
                </h3>
                <p className="text-sm text-foreground/60 leading-relaxed">
                  {desc}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Mobile: sticky stacking cards */}
        <div className="md:hidden">
          {POINTS.map(({ title, desc, icon: Icon, color }, i) => (
            <div
              key={title}
              className="sticky"
              style={{ top: `${80 + i * 14}px`, zIndex: i + 1 }}
            >
              <motion.div
                initial={reduce ? false : { opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: "-20px" }}
                transition={{ duration: 0.35, ease: "easeOut" }}
                className="rounded-2xl bg-card border border-border p-6 shadow-lg mb-4"
                style={{
                  transform: `rotate(${i % 2 === 0 ? -0.4 : 0.4}deg)`,
                }}
              >
                <div className="flex items-start gap-5">
                  <div
                    className={cn(
                      "h-12 w-12 rounded-xl flex items-center justify-center shrink-0",
                      color,
                    )}
                  >
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-foreground mb-1.5">
                      {title}
                    </h3>
                    <p className="text-sm text-foreground/60 leading-relaxed">
                      {desc}
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          ))}
          {/* Spacer so last card can be scrolled into view */}
          <div className="h-8" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
