"use client";

import { useState } from "react";
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
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
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
    accent: "bg-blue-500",
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
    accent: "bg-teal-500",
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
    accent: "bg-red-500",
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
    accent: "bg-amber-500",
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
    accent: "bg-rose-500",
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
    accent: "bg-violet-500",
    procedures: [
      "Neuroendoscopy",
      "Keyhole craniotomy",
      "Minimally invasive spine procedures",
      "Image-guided surgery",
    ],
  },
] as const;

function SpecialtyCard({
  spec,
  index,
}: {
  spec: (typeof SPECIALTIES)[number];
  index: number;
}) {
  const Icon = spec.icon;
  const reduce = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);
  const [isTapped, setIsTapped] = useState(false);

  // Desktop: hover to expand. Mobile: tap to toggle.
  const isExpanded = isHovered || isTapped;

  return (
    <motion.article
      initial={reduce ? false : { opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.4, delay: index * 0.08, ease: "easeOut" }}
      className="group relative rounded-2xl bg-white border border-slate-200/80 shadow-sm hover:shadow-xl transition-shadow duration-500 overflow-hidden flex flex-col"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => setIsTapped((prev) => !prev)}
    >
      {/* Image — clickable to /specialties */}
      <Link
        href="/specialties"
        className="relative block h-44 sm:h-48 w-full overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={spec.image}
          alt={spec.title}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
        />
        <div
          className={cn(
            "absolute inset-0 bg-gradient-to-t opacity-40 group-hover:opacity-55 transition-opacity duration-500",
            spec.color,
          )}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />

        {/* Icon badge */}
        <div className="absolute top-3 right-3 h-10 w-10 rounded-xl bg-white/15 backdrop-blur-lg border border-white/25 flex items-center justify-center shadow-lg transition-transform duration-300 group-hover:scale-110">
          <Icon className="h-5 w-5 text-white drop-shadow-md" aria-hidden="true" />
        </div>
      </Link>

      {/* Title bar — prominent, outside image */}
      <div className="px-5 pt-4 pb-2 flex items-center justify-center gap-3">
        <div className={cn("h-10 w-1 rounded-full shrink-0", spec.accent)} />
        <h3 className="text-lg sm:text-xl font-bold text-foreground leading-snug text-center">
          {spec.title}
        </h3>
      </div>

      {/* Content */}
      <div className="px-5 pb-5 flex flex-col flex-1">
        <p className="text-foreground/60 text-sm leading-relaxed mb-3">
          {spec.description}
        </p>

        {/* Auto-expand procedures on hover / tap */}
        <AnimatePresence initial={false}>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <div className="flex flex-wrap gap-2 pb-4" role="list" aria-label={`${spec.title} procedures`}>
                {spec.procedures.map((proc) => (
                  <span
                    key={proc}
                    role="listitem"
                    className={cn(
                      "inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-[13px] font-medium transition-colors",
                      "bg-slate-50 border-slate-200 text-foreground/80",
                    )}
                  >
                    <span className={cn("h-1.5 w-1.5 rounded-full shrink-0", spec.accent)} aria-hidden="true" />
                    {proc}
                  </span>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Explore link */}
        <Link
          href="/specialties"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-secondary hover:text-secondary/80 group-hover:gap-2.5 transition-all duration-300 mt-auto"
          onClick={(e) => e.stopPropagation()}
        >
          Explore treatments
          <ArrowRight
            className="h-3.5 w-3.5 transition-transform duration-300 group-hover:translate-x-1"
            aria-hidden="true"
          />
        </Link>
      </div>
    </motion.article>
  );
}

export function SpecialtiesSection() {
  return (
    <section id="specialties" aria-labelledby="specialties-heading" className="bg-background relative z-[1]">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8 py-16 md:py-20">
        <SectionHeading
          id="specialties-heading"
          title="Our Specialties"
          subtitle="Comprehensive neurological and spine care powered by expertise."
          className="mb-10 md:mb-12"
        />

        {/* 3×2 grid on desktop, 2×3 on tablet, 1×6 on mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {SPECIALTIES.map((spec, i) => (
            <SpecialtyCard
              key={spec.title}
              spec={spec}
              index={i}
            />
          ))}
        </div>

        <div className="text-center mt-10 md:mt-12">
          <Button variant="outline" className="rounded-full text-sm gap-2" asChild>
            <Link href="/specialties">
              View All Specialties
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
