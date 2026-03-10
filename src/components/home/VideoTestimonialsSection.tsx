import Link from "next/link";
import { Play, Youtube } from "lucide-react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { SectionReveal } from "@/components/shared/SectionReveal";
import { getDbAsync } from "@/lib/db/mongodb";

export async function VideoTestimonialsSection() {
  const db = await getDbAsync();
  const videos = await db
    .collection("testimonials")
    .find({ isPublished: true })
    .sort({ createdAt: -1 })
    .limit(3)
    .toArray();

  if (videos.length === 0) return null;

  return (
    <section
      className="py-12 md:py-16 bg-muted/20"
      aria-labelledby="video-testimonials-heading"
    >
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
            {videos.map((item) => {
              return (
                <a
                  key={item._id.toString()}
                  href={item.videoUrl}
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
                          {item.platform === "instagram"
                            ? "Instagram Reel"
                            : "Video testimonial"}
                        </span>
                      </div>
                    )}
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 transition-colors group-hover:bg-black/40">
                      <div className="flex h-12 w-16 items-center justify-center rounded-xl bg-[#FF0000] shadow-lg transition-transform group-hover:scale-110">
                        <Play
                          className="h-6 w-6 fill-white text-white"
                          aria-hidden
                        />
                      </div>
                    </div>
                  </div>
                  <div className="bg-card p-4">
                    <p className="font-medium text-slate-900">
                      {item.patientName}
                    </p>
                    {item.condition && (
                      <p className="text-sm font-medium text-slate-600 mb-2">
                        {item.condition}
                      </p>
                    )}
                    {item.summary && (
                      <p className="mt-1 mb-3 text-sm text-slate-500 italic line-clamp-2">
                        "{item.summary}"
                      </p>
                    )}
                    <p className="mt-1 text-xs text-secondary font-medium flex items-center gap-1.5 uppercase tracking-widest">
                      Watch on{" "}
                      {item.platform === "youtube"
                        ? "YouTube →"
                        : "Instagram →"}
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
