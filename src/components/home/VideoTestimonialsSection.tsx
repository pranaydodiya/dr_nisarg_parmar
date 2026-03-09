"use client";

import Link from "next/link";
import { Play, Youtube } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { SectionReveal } from "@/components/shared/SectionReveal";

const VIDEO_TESTIMONIALS = [
  {
    patientName: "Karan Joshi",
    condition: "Lumbar spine surgery • Mar 2026",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    thumbnailUrl: "https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg",
    type: "youtube" as const,
  },
  {
    patientName: "Meera Singh",
    condition: "Brain tumor surgery • Feb 2026",
    instagramReelUrl: "https://www.instagram.com/reel/example/",
    thumbnailUrl: undefined,
    type: "instagram" as const,
  },
  {
    patientName: "Vikram Patel",
    condition: "Cervical spine decompression • Nov 2025",
    videoUrl: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
    thumbnailUrl: "https://img.youtube.com/vi/dQw4w9WgXcQ/hqdefault.jpg",
    type: "youtube" as const,
  },
];

export function VideoTestimonialsSection() {
  return (
    <section className="py-12 md:py-16 bg-muted/20" aria-labelledby="video-testimonials-heading">
      <div className="container mx-auto px-4">
        <SectionReveal>
          <SectionHeading
            id="video-testimonials-heading"
            title="Video testimonials"
            subtitle="Patients and families share their journey on video. Watch on YouTube or Instagram."
            className="mb-10"
          />
        </SectionReveal>
        <SectionReveal delay={0.05}>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {VIDEO_TESTIMONIALS.map((item, index) => {
              const href =
                item.type === "youtube" ? item.videoUrl : item.instagramReelUrl!;
              return (
                <a
                  key={index}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group block overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm transition-transform duration-200 hover:-translate-y-1 hover:shadow-md focus-visible:ring-2 ring-secondary"
                >
                  <div className="relative aspect-video bg-muted">
                    {item.thumbnailUrl ? (
                      <img
                        src={item.thumbnailUrl}
                        alt={`Video testimonial from ${item.patientName}`}
                        className="h-full w-full object-cover transition-opacity duration-200 group-hover:opacity-90"
                      />
                    ) : (
                      <div className="flex h-full w-full items-center justify-center bg-muted text-muted-foreground">
                        <span className="text-sm">
                          {item.type === "instagram" ? "Instagram Reel" : "Video testimonial"}
                        </span>
                      </div>
                    )}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30 transition-colors group-hover:bg-black/45">
                      {item.type === "youtube" ? (
                        <Youtube
                          className="h-12 w-12 text-white drop-shadow"
                          aria-hidden
                        />
                      ) : (
                        <Play
                          className="h-12 w-12 text-white fill-white drop-shadow"
                          aria-hidden
                        />
                      )}
                    </div>
                  </div>
                  <div className="bg-card p-4">
                    <p className="font-medium text-slate-900">{item.patientName}</p>
                    {item.condition && (
                      <p className="text-sm text-slate-600">{item.condition}</p>
                    )}
                    <p className="mt-1 text-xs text-slate-500">
                      Opens on {item.type === "youtube" ? "YouTube" : "Instagram"}
                    </p>
                  </div>
                </a>
              );
            })}
          </div>
        </SectionReveal>
        <div className="mt-8 text-center">
          <Link
            href="/testimonials#video"
            className="text-secondary font-medium text-sm hover:underline focus-visible:ring-2 ring-ring rounded"
          >
            View all video testimonials
          </Link>
        </div>
      </div>
    </section>
  );
}
