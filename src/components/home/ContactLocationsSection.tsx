"use client";

import { useRef } from "react";
import Link from "next/link";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Phone } from "lucide-react";
import { EMERGENCY_PHONE, EMERGENCY_PHONE_TEL } from "@/content/site";
import { MOCK_LOCATIONS } from "@/content/mock-data";

export function ContactLocationsSection() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduce = useReducedMotion();

  return (
    <section id="contact" className="py-12 md:py-16" aria-labelledby="contact-heading">
      <div ref={ref} className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <SectionHeading
          id="contact-heading"
          title="Contact & Locations"
          subtitle="Reach out for appointments, inquiries, or emergency consultations."
          className="mb-10"
        />
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{ duration: 0.4 }}
          className="mb-8 p-4 sm:p-5 rounded-2xl bg-destructive/10 border border-destructive/20"
        >
          <p className="font-semibold text-foreground text-sm sm:text-base">24/7 Emergency Neurosurgery</p>
          <p className="text-xs sm:text-sm text-foreground/60 mt-1">
            Head injuries, spinal trauma, stroke — immediate care available.
          </p>
          <a
            href={`tel:${EMERGENCY_PHONE_TEL}`}
            className="inline-flex items-center gap-2 mt-2 text-destructive font-medium text-sm hover:underline"
          >
            <Phone className="h-4 w-4" aria-hidden="true" />
            {EMERGENCY_PHONE}
          </a>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {MOCK_LOCATIONS.map(({ name, address, phone, mapLink }, i) => (
            <motion.div
              key={name}
              initial={reduce ? false : { opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : undefined}
              transition={{ duration: 0.4, delay: 0.1 + i * 0.1 }}
            >
              <Card className="border-border rounded-2xl hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 h-full">
                <CardContent className="pt-6 pb-6">
                  <h3 className="text-base sm:text-lg font-semibold text-foreground mb-2">{name}</h3>
                  <p className="text-foreground/60 text-xs sm:text-sm flex items-start gap-2">
                    <MapPin className="h-4 w-4 shrink-0 mt-0.5" aria-hidden="true" />
                    {address}
                  </p>
                  <p className="text-xs sm:text-sm mt-2">{phone}</p>
                  <a
                    href={mapLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1.5 mt-3 text-secondary font-medium text-xs sm:text-sm hover:underline"
                  >
                    <MapPin className="h-4 w-4" aria-hidden="true" />
                    View on Google Maps
                  </a>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
        <motion.div
          initial={reduce ? false : { opacity: 0 }}
          animate={inView ? { opacity: 1 } : undefined}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="text-center mt-8"
        >
          <Link
            href="/contact"
            className="text-secondary font-medium text-sm hover:underline"
          >
            View all locations &amp; contact details
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
