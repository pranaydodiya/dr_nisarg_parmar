"use client";

import React, { useRef, useEffect, useState, useCallback } from "react";
import { cn } from "@/lib/utils";
import {
  TestimonialCard,
  type TestimonialAuthor,
} from "@/components/ui/testimonial-card";

export interface TestimonialItem {
  author: TestimonialAuthor;
  text: string;
  href?: string;
  rating?: number;
}

interface TestimonialsSectionProps {
  title: string;
  description: string;
  testimonials: TestimonialItem[];
  className?: string;
}

export function TestimonialsSectionWithMarquee({
  title,
  description,
  testimonials,
  className,
}: TestimonialsSectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isPaused, setIsPaused] = useState(false);
  const animationRef = useRef<number | null>(null);
  const positionRef = useRef(0);

  // Duplicate for seamless loop
  const doubled = [...testimonials, ...testimonials];

  const animate = useCallback(() => {
    const el = scrollRef.current;
    if (!el) {
      animationRef.current = requestAnimationFrame(animate);
      return;
    }

    if (!isPaused) {
      positionRef.current += 0.5;
      const halfWidth = el.scrollWidth / 2;
      if (halfWidth > 0 && positionRef.current >= halfWidth) {
        positionRef.current = 0;
      }
      el.style.transform = `translateX(-${positionRef.current}px)`;
    }

    animationRef.current = requestAnimationFrame(animate);
  }, [isPaused]);

  useEffect(() => {
    animationRef.current = requestAnimationFrame(animate);
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [animate]);

  return (
    <section
      id="testimonials"
      className={cn("bg-background text-foreground py-12 md:py-16 relative z-10", className)}
      aria-labelledby="testimonials-heading"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8 mb-8 text-center">
        <h2
          id="testimonials-heading"
          className="text-2xl sm:text-3xl md:text-4xl font-semibold text-foreground mb-3"
        >
          {title}
        </h2>
        <p className="text-sm sm:text-base text-muted-foreground max-w-xl mx-auto">
          {description}
        </p>
      </div>

      <div
        className="relative w-full overflow-hidden"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
      >
        <div
          ref={scrollRef}
          className="flex gap-4 px-4 will-change-transform"
          style={{ width: "max-content" }}
        >
          {doubled.map((testimonial, i) => (
            <TestimonialCard
              key={`t-${i}`}
              author={testimonial.author}
              text={testimonial.text}
              href={testimonial.href}
              rating={testimonial.rating ?? 5}
            />
          ))}
        </div>
        {/* No gradient overlays — clean edges */}
      </div>
    </section>
  );
}
