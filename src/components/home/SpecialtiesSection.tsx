"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import {
  ArrowRight,
  Brain,
  Bone,
  AlertTriangle,
  Baby,
  Heart,
  Minimize2,
} from "lucide-react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Button } from "@/components/ui/button";

const SPECIALTIES = [
  {
    title: "Brain Tumor Surgery",
    description:
      "Advanced surgical treatment for brain tumors with precision imaging and minimal access techniques.",
    icon: Brain,
    procedures: [
      "Craniotomy & tumor removal",
      "Stereotactic brain biopsy",
      "Transsphenoidal pituitary surgery",
      "Awake craniotomy",
    ],
  },
  {
    title: "Spine Surgery",
    description:
      "Comprehensive spine solutions for disc, deformity, and trauma cases focused on stability and mobility.",
    icon: Bone,
    procedures: [
      "Lumbar disc herniation repair",
      "Cervical disc replacement",
      "Spinal decompression & fusion",
      "Scoliosis correction surgery",
    ],
  },
  {
    title: "Neurotrauma Care",
    description:
      "24/7 emergency neurosurgical care for head and spine injuries with rapid response.",
    icon: AlertTriangle,
    procedures: [
      "Emergency craniotomy",
      "Subdural & epidural hematoma evacuation",
      "Depressed skull fracture repair",
      "Spinal cord injury management",
    ],
  },
  {
    title: "Pediatric Neurosurgery",
    description:
      "Specialized child-focused protocols with family-centered care and developmental considerations.",
    icon: Baby,
    procedures: [
      "Hydrocephalus (VP shunt placement)",
      "Myelomeningocele repair",
      "Chiari malformation surgery",
      "Craniosynostosis correction",
    ],
  },
  {
    title: "Vascular Neurosurgery",
    description:
      "Treatment of aneurysms, AVMs, and vascular brain conditions including stroke intervention.",
    icon: Heart,
    procedures: [
      "Aneurysm clipping & coiling",
      "AVM excision",
      "Carotid endarterectomy",
      "Emergency stroke intervention",
    ],
  },
  {
    title: "Minimally Invasive Surgery",
    description:
      "Endoscopic and keyhole approaches for faster recovery, reduced scarring, and shorter hospital stays.",
    icon: Minimize2,
    procedures: [
      "Neuroendoscopy",
      "Keyhole craniotomy",
      "Minimally invasive spine procedures",
      "Image-guided surgery",
    ],
  },
] as const;

export function SpecialtiesSection() {
  const reduce = useReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [scrollDistance, setScrollDistance] = useState(0);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // Measure how far the track needs to scroll horizontally
  useEffect(() => {
    function measure() {
      if (!trackRef.current) return;
      const trackWidth = trackRef.current.scrollWidth;
      const viewWidth = window.innerWidth;
      setScrollDistance(Math.max(0, trackWidth - viewWidth));
    }
    measure();
    window.addEventListener("resize", measure);
    return () => window.removeEventListener("resize", measure);
  }, []);

  const x = useTransform(scrollYProgress, [0, 1], [0, -scrollDistance]);

  return (
    <section id="specialties" aria-labelledby="specialties-heading">
      {/* SEO-friendly hidden content for crawlers */}
      <div className="sr-only">
        <h2>Our Specialties — Neurosurgical Services by Dr. Nisarg Parmar</h2>
        {SPECIALTIES.map((spec) => (
          <div key={spec.title}>
            <h3>{spec.title}</h3>
            <p>{spec.description}</p>
            <ul>
              {spec.procedures.map((p) => (
                <li key={p}>{p}</li>
              ))}
            </ul>
          </div>
        ))}
        <p>
          <Link href="/specialties">View all specialties</Link>
        </p>
      </div>

      {/* ── Desktop: scroll-driven horizontal gallery ── */}
      <div
        ref={sectionRef}
        className="hidden md:block relative"
        style={{ height: "300vh" }}
      >
        <div className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden">
          {/* Heading */}
          <div className="mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8 mb-8">
            <SectionHeading
              id="specialties-heading"
              title="Our Specialties"
              subtitle="Comprehensive neurological and spine care powered by expertise."
              centered={false}
            />
          </div>

          {/* Cards track */}
          <motion.div
            ref={trackRef}
            style={{ x }}
            className="flex gap-7 will-change-transform pl-5 sm:pl-6 lg:pl-8 xl:pl-[max(2rem,calc((100vw-80rem)/2+2rem))]"
          >
            {SPECIALTIES.map((spec, i) => {
              const Icon = spec.icon;
              return (
                <article
                  key={spec.title}
                  className="group w-[min(68vw,540px)] flex-shrink-0 rounded-3xl bg-white border border-slate-200/80 shadow-lg hover:shadow-2xl transition-shadow duration-300 p-8 lg:p-10 flex flex-col"
                >
                  <div className="flex items-center gap-4 mb-5">
                    <div className="h-14 w-14 rounded-2xl bg-primary/10 flex items-center justify-center shrink-0">
                      <Icon
                        className="h-7 w-7 text-primary"
                        aria-hidden="true"
                      />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold text-foreground/40 uppercase tracking-[0.2em]">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h3 className="text-lg lg:text-xl font-bold text-foreground leading-tight">
                        {spec.title}
                      </h3>
                    </div>
                  </div>

                  <p className="text-foreground/65 text-sm lg:text-base leading-relaxed mb-5">
                    {spec.description}
                  </p>

                  <ul
                    className="space-y-2.5 mb-6 flex-1"
                    aria-label={`${spec.title} procedures`}
                  >
                    {spec.procedures.map((proc) => (
                      <li
                        key={proc}
                        className="flex items-start gap-2.5 text-sm text-foreground/75"
                      >
                        <span
                          className="mt-[7px] h-1.5 w-1.5 rounded-full bg-secondary shrink-0"
                          aria-hidden="true"
                        />
                        {proc}
                      </li>
                    ))}
                  </ul>

                  <Link
                    href="/specialties"
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-secondary hover:text-secondary/80 group-hover:gap-2.5 transition-all duration-300 mt-auto"
                  >
                    View all specialties
                    <ArrowRight
                      className="h-3.5 w-3.5"
                      aria-hidden="true"
                    />
                  </Link>
                </article>
              );
            })}

            {/* Final CTA card */}
            <div className="w-[min(68vw,540px)] flex-shrink-0 rounded-3xl bg-primary text-primary-foreground p-8 lg:p-10 flex flex-col items-center justify-center text-center gap-5">
              <h3 className="text-xl lg:text-2xl font-bold">
                Explore All Specialties
              </h3>
              <p className="text-primary-foreground/85 text-sm lg:text-base max-w-sm leading-relaxed">
                View detailed information about all our neurosurgical services
                and book a consultation.
              </p>
              <Button
                variant="secondary"
                className="rounded-full gap-2"
                asChild
              >
                <Link href="/specialties">
                  View All Specialties
                  <ArrowRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              </Button>
            </div>

            {/* Right spacer */}
            <div className="w-8 flex-shrink-0" aria-hidden="true" />
          </motion.div>

          {/* Scroll progress indicator */}
          <div className="mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8 mt-8">
            <div className="h-1 rounded-full bg-slate-200 overflow-hidden max-w-xs">
              <motion.div
                className="h-full rounded-full bg-secondary origin-left"
                style={{ scaleX: scrollYProgress }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* ── Mobile: vertical cards ── */}
      <div className="md:hidden py-12 bg-slate-50">
        <div className="mx-auto max-w-7xl px-5 sm:px-6">
          <SectionHeading
            title="Our Specialties"
            subtitle="Comprehensive neurological and spine care powered by expertise."
            className="mb-8"
          />

          <div className="space-y-4">
            {SPECIALTIES.map((spec) => {
              const Icon = spec.icon;
              return (
                <motion.article
                  key={spec.title}
                  initial={reduce ? false : { opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="rounded-2xl bg-white border border-slate-200 p-5 shadow-sm"
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="h-10 w-10 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                      <Icon
                        className="h-5 w-5 text-primary"
                        aria-hidden="true"
                      />
                    </div>
                    <h3 className="text-base font-semibold text-foreground">
                      {spec.title}
                    </h3>
                  </div>

                  <p className="text-sm text-foreground/65 leading-relaxed mb-3">
                    {spec.description}
                  </p>

                  <ul
                    className="space-y-1.5 mb-4"
                    aria-label={`${spec.title} procedures`}
                  >
                    {spec.procedures.map((proc) => (
                      <li
                        key={proc}
                        className="flex items-start gap-2 text-xs text-foreground/70"
                      >
                        <span
                          className="mt-1 h-1 w-1 rounded-full bg-secondary shrink-0"
                          aria-hidden="true"
                        />
                        {proc}
                      </li>
                    ))}
                  </ul>

                  <Link
                    href="/specialties"
                    className="inline-flex items-center gap-1 text-xs font-medium text-secondary"
                  >
                    Learn more
                    <ArrowRight className="h-3 w-3" aria-hidden="true" />
                  </Link>
                </motion.article>
              );
            })}
          </div>

          <div className="text-center mt-8">
            <Button
              variant="outline"
              className="rounded-full text-sm gap-2"
              asChild
            >
              <Link href="/specialties">
                View All Specialties
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}