"use client";

import { cn } from "@/lib/utils";
import { Star } from "lucide-react";

export interface TestimonialAuthor {
  name: string;
  handle: string;
  avatar?: string;
}

export interface TestimonialCardProps {
  author: TestimonialAuthor;
  text: string;
  href?: string;
  className?: string;
  rating?: number;
}

export function TestimonialCard({
  author,
  text,
  href,
  className,
  rating = 5,
}: TestimonialCardProps) {
  const Card = href ? "a" : "div";

  return (
    <Card
      {...(href ? { href } : {})}
      className={cn(
        "flex flex-col rounded-2xl border border-border",
        "bg-card shadow-sm",
        "p-4 sm:p-5 text-start",
        "hover:shadow-md hover:-translate-y-0.5",
        "w-[280px] sm:w-[300px] flex-shrink-0",
        "transition-all duration-300",
        className
      )}
    >
      <div className="flex items-center gap-3 mb-3">
        <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={cn(
                "h-3.5 w-3.5",
                i < rating
                  ? "fill-secondary text-secondary"
                  : "fill-muted text-muted"
              )}
              aria-hidden="true"
            />
          ))}
        </div>
      </div>
      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed mb-4 line-clamp-4">
        {text}
      </p>
      <div className="mt-auto flex items-center gap-2">
        <div className="h-8 w-8 rounded-full bg-secondary/10 flex items-center justify-center text-xs font-bold text-secondary">
          {author.name.charAt(0)}
        </div>
        <div>
          <h3 className="text-sm font-semibold leading-none text-foreground">
            {author.name}
          </h3>
          <p className="text-xs text-muted-foreground">{author.handle}</p>
        </div>
      </div>
    </Card>
  );
}
