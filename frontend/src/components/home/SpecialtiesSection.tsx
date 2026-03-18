"use client";

import { useRef, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
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
import { cn } from "@/lib/utils";

const SPECIALTIES = [
  {
    title: "Brain Tumor Surgery",
    description:
      "Advanced surgical treatment for brain tumors with precision imaging and minimal access techniques.",
    icon: Brain,
    image: "/images/specialties/brain_tumor.png",
    color: "from-blue-600/80 to-cyan-500/80",
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
    image: "/images/specialties/spine.png",
    color: "from-teal-600/80 to-emerald-500/80",
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
    image: "/images/specialties/neurotrauma.png",
    color: "from-red-600/80 to-orange-500/80",
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
    image: "/images/specialties/pediatric.png",
    color: "from-amber-600/80 to-yellow-500/80",
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
    image: "/images/specialties/vascular.png",
    color: "from-rose-600/80 to-pink-500/80",
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
    image: "/images/specialties/minimally_invasive.png",
    color: "from-violet-600/80 to-purple-500/80",
    procedures: [
      "Neuroendoscopy",
      "Keyhole craniotomy",
      "Minimally invasive spine procedures",
      "Image-guided surgery",
    ],
  },
] as const;

/* Navbar is ~80px tall. We offset the sticky container below it. */
const NAV_HEIGHT = 100;

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
        <div
          className="sticky flex flex-col overflow-hidden pt-6"
          style={{
            top: `${NAV_HEIGHT}px`,
            height: `calc(100vh - ${NAV_HEIGHT}px)`,
          }}
        >
          {/* Heading */}
          <div className="mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8 mb-6">
            <div className="flex items-end justify-between">
              <SectionHeading
                id="specialties-heading"
                title="Our Specialties"
                subtitle="Comprehensive neurological and spine care powered by expertise."
                centered={false}
                className="mb-0"
              />
              {/* Scroll progress indicator */}
              <div className="hidden lg:flex items-center gap-3">
                <span className="text-xs font-medium text-foreground/40 uppercase tracking-wider">Scroll</span>
                <div className="h-1.5 w-28 rounded-full bg-slate-200 overflow-hidden">
                  <motion.div
                    className="h-full rounded-full bg-secondary origin-left"
                    style={{ scaleX: scrollYProgress }}
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Cards track */}
          <motion.div
            ref={trackRef}
            style={{ x }}
            className="flex gap-6 will-change-transform pl-5 sm:pl-6 lg:pl-8 xl:pl-[max(2rem,calc((100vw-80rem)/2+2rem))] pr-8"
          >
            {SPECIALTIES.map((spec, i) => {
              const Icon = spec.icon;
              return (
                <article
                  key={spec.title}
                  className="group w-[min(56vw,440px)] flex-shrink-0 rounded-3xl bg-white border border-slate-200/80 shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden flex flex-col"
                >
                  {/* Image Cover */}
                  <div className="relative h-44 lg:h-52 w-full overflow-hidden">
                    <Image
                      src={spec.image}
                      alt={spec.title}
                      fill
                      sizes="(max-width: 1024px) 56vw, 440px"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-110"
                    />
                    {/* Colored gradient overlay */}
                    <div
                      className={cn(
                        "absolute inset-0 bg-gradient-to-t opacity-50 group-hover:opacity-60 transition-opacity duration-500",
                        spec.color,
                      )}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />

                    {/* Floating icon badge */}
                    <div className="absolute top-3 right-3 h-10 w-10 rounded-xl bg-white/15 backdrop-blur-lg border border-white/25 flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3">
                      <Icon
                        className="h-5 w-5 text-white drop-shadow-md"
                        aria-hidden="true"
                      />
                    </div>

                    {/* Title on image */}
                    <div className="absolute bottom-3 left-4 right-4">
                      <span className="text-[10px] font-bold text-white/60 uppercase tracking-[0.25em]">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <h3 className="text-lg lg:text-xl font-bold text-white leading-tight drop-shadow-lg">
                        {spec.title}
                      </h3>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5 lg:p-6 flex flex-col flex-1">
                    <p className="text-foreground/65 text-sm leading-relaxed mb-4">
                      {spec.description}
                    </p>

                    <ul
                      className="space-y-2 mb-5 flex-1"
                      aria-label={`${spec.title} procedures`}
                    >
                      {spec.procedures.map((proc) => (
                        <li
                          key={proc}
                          className="flex items-start gap-2 text-[13px] text-foreground/75"
                        >
                          <span
                            className="mt-[6px] h-1.5 w-1.5 rounded-full bg-secondary shrink-0"
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
                      Explore treatments
                      <ArrowRight
                        className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
                        aria-hidden="true"
                      />
                    </Link>
                  </div>
                </article>
              );
            })}

            {/* Final CTA card */}
            <div className="w-[min(56vw,440px)] flex-shrink-0 rounded-3xl bg-gradient-to-br from-primary via-primary to-primary/90 text-primary-foreground p-8 lg:p-10 flex flex-col items-center justify-center text-center gap-5">
              <div className="h-16 w-16 rounded-2xl bg-white/15 backdrop-blur-sm flex items-center justify-center mb-2">
                <ArrowRight
                  className="h-8 w-8 text-white"
                  aria-hidden="true"
                />
              </div>
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

          {/* Bottom progress bar */}
          <div className="mx-auto w-full max-w-7xl px-5 sm:px-6 lg:px-8 mt-6">
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

          <div className="space-y-5">
            {SPECIALTIES.map((spec) => {
              const Icon = spec.icon;
              return (
                <motion.article
                  key={spec.title}
                  initial={reduce ? false : { opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ duration: 0.4, ease: "easeOut" }}
                  className="rounded-2xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-shadow overflow-hidden flex flex-col"
                >
                  {/* Mobile Image Cover */}
                  <div className="relative h-44 w-full overflow-hidden">
                    <Image
                      src={spec.image}
                      alt={spec.title}
                      fill
                      sizes="100vw"
                      className="object-cover"
                    />
                    <div
                      className={cn(
                        "absolute inset-0 bg-gradient-to-t opacity-50",
                        spec.color,
                      )}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                    <div className="absolute bottom-3 left-4 h-10 w-10 rounded-xl bg-white/20 backdrop-blur-md border border-white/20 flex items-center justify-center">
                      <Icon
                        className="h-5 w-5 text-white"
                        aria-hidden="true"
                      />
                    </div>
                    <h3 className="absolute bottom-3 left-[4.5rem] text-lg font-bold text-white drop-shadow-lg">
                      {spec.title}
                    </h3>
                  </div>

                  <div className="p-6 flex flex-col flex-1">
                    <p className="text-sm text-foreground/70 leading-relaxed mb-4">
                      {spec.description}
                    </p>

                    <ul
                      className="space-y-2 mb-5"
                      aria-label={`${spec.title} procedures`}
                    >
                      {spec.procedures.map((proc) => (
                        <li
                          key={proc}
                          className="flex items-start gap-2.5 text-sm text-foreground/80"
                        >
                          <span
                            className="mt-[6px] h-1.5 w-1.5 rounded-full bg-secondary shrink-0"
                            aria-hidden="true"
                          />
                          {proc}
                        </li>
                      ))}
                    </ul>

                    <Link
                      href="/specialties"
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-secondary hover:text-secondary/80 transition-all mt-auto"
                    >
                      Explore treatments
                      <ArrowRight
                        className="h-4 w-4"
                        aria-hidden="true"
                      />
                    </Link>
                  </div>
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