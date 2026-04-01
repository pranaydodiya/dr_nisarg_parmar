"use client";

import { useState } from "react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { cn } from "@/lib/utils";
import { ChevronDown } from "lucide-react";
import { FAQ_ITEMS } from "@/content/faq";

export function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="py-12 md:py-16 bg-muted/30" aria-labelledby="faq-heading">
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
        <SectionHeading
          id="faq-heading"
          title="Frequently Asked Questions"
          subtitle="Common questions about our practice and services."
          className="mb-10"
        />
        <div className="max-w-2xl mx-auto space-y-3">
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={cn(
                  "group relative border border-border rounded-2xl bg-card/90 overflow-hidden",
                  "transition-all duration-300 ease-out",
                  "hover:-translate-y-0.5 hover:shadow-lg hover:border-secondary/50",
                  isOpen && "border-secondary/60 shadow-lg"
                )}
              >
                <div
                  className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-secondary/5 via-secondary/0 to-transparent"
                  aria-hidden
                />
                <button
                  type="button"
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className={cn(
                    "relative z-10 w-full flex items-center justify-between gap-4 py-4 px-5 text-left font-medium text-foreground text-sm sm:text-base",
                    "focus-visible:ring-2 ring-ring ring-inset rounded-2xl"
                  )}
                  aria-expanded={isOpen}
                  aria-controls={`faq-answer-${index}`}
                  id={`faq-question-${index}`}
                >
                  <span className="flex items-center gap-3">
                    <span
                      className={cn(
                        "inline-flex h-6 w-6 items-center justify-center rounded-full border text-xs font-semibold",
                        "transition-colors duration-300",
                        isOpen
                          ? "bg-secondary text-secondary-foreground border-secondary"
                          : "bg-background/60 text-foreground/60 border-border"
                      )}
                    >
                      {index + 1}
                    </span>
                    <span className="relative">
                      <span className="block group-hover:text-foreground transition-colors">
                        {item.q}
                      </span>
                    </span>
                  </span>
                  <ChevronDown
                    className={cn(
                      "h-5 w-5 shrink-0 transition-transform duration-300",
                      isOpen ? "rotate-180" : "rotate-0"
                    )}
                    aria-hidden
                  />
                </button>
                <div
                  id={`faq-answer-${index}`}
                  role="region"
                  aria-labelledby={`faq-question-${index}`}
                  className={cn(
                    "grid transition-all duration-300 ease-out bg-card/80 relative z-10",
                    isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  )}
                >
                  <div className="overflow-hidden">
                    <p className="pb-4 px-5 pt-0 text-foreground/65 text-sm">{item.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
