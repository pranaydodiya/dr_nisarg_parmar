"use client";
import { useRef } from "react";
import Link from "next/link";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Phone, Navigation, Clock } from "lucide-react";
import type { ContactSettings } from "@/lib/contact-types";

type LocationCard = {
  _id?: string;
  name?: string;
  address?: string;
  city?: string;
  phone?: string;
  gmapEmbedCode?: string;
  gmapLink?: string;
  operatingHours?: string;
  isPrimary?: boolean;
};

type Props = {
  initialLocations: LocationCard[];
  initialSettings: ContactSettings;
};

export function ContactLocationsSection({
  initialLocations,
  initialSettings: settings,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduce = useReducedMotion();

  const locations = initialLocations;

  return (
    <section
      id="contact"
      className="py-12 md:py-16"
      aria-labelledby="contact-heading"
    >
      <div ref={ref} className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <SectionHeading
          id="contact-heading"
          title="Contact & Locations"
          subtitle="Reach out for appointments, inquiries, or emergency consultations."
          className="mb-10"
        />

        {settings.showEmergencyStrip && (
          <motion.div
            initial={reduce ? false : { opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : undefined}
            transition={{ duration: 0.4 }}
            className="mb-8 p-4 sm:p-5 rounded-2xl bg-destructive/10 border border-destructive/20"
          >
            <p className="font-semibold text-foreground text-sm sm:text-base">
              {settings.emergencyTitle}
            </p>
            <p className="text-xs sm:text-sm text-foreground/60 mt-1">
              {settings.emergencyMessage}
            </p>
            <a
              href={`tel:${settings.emergencyPhoneTel}`}
              className="inline-flex items-center gap-2 mt-2 text-destructive font-medium text-sm hover:underline"
            >
              <Phone className="h-4 w-4" aria-hidden="true" />
              {settings.emergencyPhone}
            </a>
          </motion.div>
        )}

        <div
          className={`grid grid-cols-1 md:grid-cols-2 ${locations.length >= 3 ? "lg:grid-cols-3" : ""} gap-5`}
        >
          {locations.length === 0 ? (
            <p className="col-span-full text-center py-10 text-slate-500">
              Location details will appear here shortly.
            </p>
          ) : (
            locations.map((loc, i) => (
              <motion.div
                key={loc._id || loc.name}
                initial={reduce ? false : { opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : undefined}
                transition={{ duration: 0.4, delay: 0.1 + i * 0.1 }}
                className="h-full"
              >
                <Card
                  className={`border-border rounded-2xl flex flex-col hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 h-full overflow-hidden ${loc.isPrimary ? "ring-2 ring-secondary/30 border-secondary/20" : ""}`}
                >
                  <Card
                    className={`border-border rounded-2xl flex flex-col hover:shadow-lg hover:-translate-y-0.5 transition-all duration-300 h-full overflow-hidden ${loc.isPrimary ? "ring-2 ring-secondary/30 border-secondary/20" : ""}`}
                  >
                    {mapEmbedSrc && (
                      <div className="w-full bg-muted">
                        <iframe
                          src={mapEmbedSrc}
                          title={`${loc.name || "Location"} map`}
                          width="100%"
                          height="180"
                          style={{ border: 0 }}
                          loading="lazy"
                          referrerPolicy="no-referrer-when-downgrade"
                          allowFullScreen
                        />
                      </div>
                    )}
                  <CardContent className="pt-5 pb-5 flex-grow flex flex-col">
                    <h3 className="text-base sm:text-lg font-semibold text-foreground mb-2 flex items-center gap-2 flex-wrap">
                      {loc.name}
                      {loc.isPrimary && (
                        <span className="inline-flex items-center rounded-full bg-secondary/10 px-2 py-0.5 text-xs font-medium text-secondary ring-1 ring-inset ring-secondary/20">
                          Primary
                        </span>
                      )}
                    </h3>
                    <p className="text-slate-900 font-medium text-xs sm:text-sm flex items-start gap-2 mt-2">
                      <MapPin
                        className="h-4 w-4 shrink-0 mt-0.5 text-slate-700"
                        aria-hidden="true"
                      />
                      {loc.address} {loc.city ? `, ${loc.city}` : ""}
                    </p>
                    {loc.operatingHours && (
                      <p className="text-slate-900 font-medium text-xs sm:text-sm flex items-center gap-2 mt-2">
                        <Clock
                          className="h-4 w-4 shrink-0 text-slate-700"
                          aria-hidden="true"
                        />
                        {loc.operatingHours}
                      </p>
                    )}
                    {loc.phone && (
                      <p className="text-slate-900 font-medium text-xs sm:text-sm flex items-center gap-2 mt-2">
                        <Phone
                          className="h-4 w-4 shrink-0 text-slate-700"
                          aria-hidden="true"
                        />
                        <a
                          href={`tel:${loc.phone.replace(/\s/g, "")}`}
                          className="hover:underline"
                        >
                          {loc.phone}
                        </a>
                      </p>
                    )}

                    <div className="mt-auto pt-5 flex flex-wrap gap-2">
                      <a
                        href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(`${loc.name}, ${loc.address}${loc.city ? `, ${loc.city}` : ""}`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs bg-primary text-primary-foreground font-medium px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors shadow-sm"
                      >
                        <Navigation className="h-3.5 w-3.5" aria-hidden />
                        Get Directions
                      </a>
                      {loc.gmapLink && (
                        <a
                          href={loc.gmapLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-xs bg-secondary text-secondary-foreground font-medium px-4 py-2 rounded-lg hover:bg-secondary/90 transition-colors shadow-sm"
                        >
                          <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
                          View on Map
                        </a>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))
          )}
        </div>

        <motion.div
          initial={reduce ? false : { opacity: 0 }}
          animate={inView ? { opacity: 1 } : undefined}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="text-center mt-10"
        >
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 bg-secondary text-secondary-foreground font-medium px-6 py-2.5 rounded-full hover:bg-secondary/90 transition-colors shadow-sm text-sm"
          >
            View all locations &amp; contact details
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
