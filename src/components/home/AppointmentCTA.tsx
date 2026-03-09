"use client";

import { useRef } from "react";
import Link from "next/link";
import { Calendar } from "lucide-react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";

export function AppointmentCTA() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduce = useReducedMotion();

  return (
    <section
      id="book-appointment"
      className="relative overflow-hidden py-14 md:py-20 bg-primary text-primary-foreground"
      aria-labelledby="cta-heading"
    >
      <div
        className="pointer-events-none absolute -top-24 -right-24 h-64 w-64 rounded-full bg-secondary/10 blur-3xl"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute -bottom-16 -left-16 h-48 w-48 rounded-full bg-white/5 blur-3xl"
        aria-hidden="true"
      />
      <div ref={ref} className="relative z-10 mx-auto max-w-7xl px-5 sm:px-6 lg:px-8 text-center">
        <motion.h2
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.45 }}
          id="cta-heading"
          className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3"
        >
          Ready to Schedule Your Consultation?
        </motion.h2>
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.45, delay: 0.1 }}
          className="text-sm sm:text-base text-primary-foreground/85 max-w-xl mx-auto mb-6"
        >
          Book an appointment today. We&apos;ll confirm within 2&nbsp;hours.
        </motion.p>
        <motion.div
          initial={reduce ? false : { opacity: 0, scale: 0.95 }}
          animate={inView ? { opacity: 1, scale: 1 } : undefined}
          transition={{ duration: 0.35, delay: 0.2 }}
        >
          <Button
            variant="secondary"
            size="lg"
            className="rounded-full gap-2 text-sm font-semibold"
            asChild
          >
            <Link href="/appointments">
              <Calendar className="h-4 w-4" aria-hidden="true" />
              Book an Appointment
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
