"use client";

import { useRef } from "react";
import Link from "next/link";
import { Phone, Calendar, ChevronDown } from "lucide-react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { HeroImage } from "./HeroImage";
import { EMERGENCY_PHONE, EMERGENCY_PHONE_TEL } from "@/content/site";

export function Hero() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true });
  const reduce = useReducedMotion();

  const fade = (delay: number) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          animate: inView ? { opacity: 1, y: 0 } : undefined,
          transition: { duration: 0.5, delay, ease: "easeOut" },
        };

  return (
    <section
      id="hero"
      className="relative overflow-hidden bg-primary text-primary-foreground -mt-16 md:-mt-20"
      aria-labelledby="hero-heading"
    >
      {/* Decorative blurred shapes */}
      <div className="pointer-events-none absolute -top-40 -right-40 h-[500px] w-[500px] rounded-full bg-secondary/10 blur-3xl" aria-hidden="true" />
      <div className="pointer-events-none absolute -bottom-32 -left-32 h-[400px] w-[400px] rounded-full bg-white/5 blur-3xl" aria-hidden="true" />

      <div
        ref={ref}
        className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6 lg:px-8 flex flex-col lg:flex-row items-center gap-5 lg:gap-14 pt-24 md:pt-28 lg:pt-36 pb-12 md:pb-20"
      >
        {/* ── Mobile-only: badge + name at very top ── */}
        <div className="lg:hidden w-full text-center space-y-3">
          <motion.p
            {...fade(0.1)}
            className="inline-block text-xs font-medium tracking-wide text-primary-foreground/85 bg-white/10 rounded-full px-4 py-1.5"
          >
            NIMHANS Alumni, Bangalore
          </motion.p>
          <motion.h1
            {...fade(0.15)}
            id="hero-heading"
            className="text-3xl sm:text-4xl font-bold tracking-tight leading-[1.1]"
          >
            Dr. Nisarg Parmar
          </motion.h1>
        </div>

        {/* ── Image — below name on mobile, right column on desktop ── */}
        <motion.div
          {...fade(0.22)}
          className="relative w-44 h-56 sm:w-52 sm:h-64 lg:w-80 lg:h-96 flex-shrink-0 rounded-2xl lg:rounded-3xl overflow-hidden ring-4 ring-white/10 shadow-2xl mx-auto lg:mx-0 lg:order-2"
        >
          <HeroImage />
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-primary/60 to-transparent pointer-events-none hidden lg:block" aria-hidden="true" />
        </motion.div>

        {/* ── Text column — desktop: full left column; mobile: subtitle + desc + buttons ── */}
        <div className="flex-1 w-full space-y-5 text-center lg:text-left lg:order-1">
          {/* Desktop-only badge + name */}
          <div className="hidden lg:block space-y-4">
            <motion.p
              {...fade(0.1)}
              className="inline-block text-sm font-medium tracking-wide text-primary-foreground/85 bg-white/10 rounded-full px-4 py-1.5"
            >
              NIMHANS Alumni, Bangalore
            </motion.p>
            <motion.h1
              {...fade(0.15)}
              id="hero-heading"
              className="text-5xl lg:text-6xl font-bold tracking-tight leading-[1.1]"
            >
              Dr. Nisarg Parmar
            </motion.h1>
          </div>

          <motion.p
            {...fade(0.22)}
            className="text-base sm:text-lg md:text-xl text-primary-foreground/95 font-medium"
          >
            Neurosurgeon &bull; Brain &amp; Spine Specialist
          </motion.p>

          <motion.p
            {...fade(0.28)}
            className="text-sm sm:text-base text-primary-foreground/90 max-w-lg mx-auto lg:mx-0 leading-relaxed"
          >
            Providing expert neurological care in Gujarat with over 8&nbsp;years
            of experience in complex brain and spine surgeries.
          </motion.p>

          <motion.div
            {...fade(0.35)}
            className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start pt-2"
          >
            <Button
              variant="secondary"
              size="lg"
              className="rounded-full gap-2 text-sm font-semibold w-full sm:w-auto"
              asChild
            >
              <Link href="/appointments">
                <Calendar className="h-4 w-4" aria-hidden="true" />
                Book Appointment
              </Link>
            </Button>
            <Button
              variant="outline"
              size="lg"
              className="rounded-full gap-2 text-sm font-semibold bg-white/10 border-white/20 text-white hover:bg-white/20 hover:text-white w-full sm:w-auto"
              asChild
            >
              <a href={`tel:${EMERGENCY_PHONE_TEL}`}>
                <Phone className="h-4 w-4" aria-hidden="true" />
                Emergency: {EMERGENCY_PHONE}
              </a>
            </Button>
          </motion.div>
        </div>
      </div>

      {/* Scroll cue */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-1 text-primary-foreground/50">
        <span className="text-[10px] uppercase tracking-widest">Scroll</span>
        <ChevronDown className="h-4 w-4 animate-bounce" aria-hidden="true" />
      </div>
    </section>
  );
}
