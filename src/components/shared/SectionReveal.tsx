"use client";

import { useRef } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

const defaultVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const reducedMotionVariants = {
  hidden: { opacity: 1, y: 0 },
  visible: { opacity: 1, y: 0 },
};

interface SectionRevealProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
}

export function SectionReveal({
  children,
  className,
  delay = 0,
  duration = 0.4,
}: SectionRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const reduceMotion = useReducedMotion();
  const variants = reduceMotion ? reducedMotionVariants : defaultVariants;
  const transitionDuration = reduceMotion ? 0 : duration;

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={variants}
      transition={{
        duration: transitionDuration,
        delay: reduceMotion ? 0 : delay,
        ease: "easeOut",
      }}
      className={cn("origin-center", className)}
    >
      {children}
    </motion.div>
  );
}
