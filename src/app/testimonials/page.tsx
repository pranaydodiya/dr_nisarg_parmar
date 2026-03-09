import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { SectionReveal } from "@/components/shared/SectionReveal";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Play, Youtube } from "lucide-react";
import { TestimonialsColumn } from "@/components/ui/testimonials-columns-1";

export const metadata: Metadata = {
  title: "Patient Testimonials | Dr. Nisarg Parmar",
  description: "What patients say about Dr. Nisarg Parmar. Written and video testimonials from neuro and spine surgery patients.",
};

// Mock written testimonials
const WRITTEN = [
  {
    name: "Rahul Shah",
    location: "Surat",
    rating: 5,
    quote:
      "Exceptional care and clear communication. One of the best neurosurgeons in Gujarat for complex spine surgery.",
    date: "Mar 2026",
    role: "Lumbar spine surgery patient",
    image:
      "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&w=200&q=80",
  },
  {
    name: "Priya Desai",
    location: "Ahmedabad",
    rating: 5,
    quote:
      "My family is grateful for the expert neurotrauma care and timely emergency brain surgery after a road traffic accident.",
    date: "Feb 2026",
    role: "Neurotrauma and emergency care patient",
    image:
      "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=200&q=80",
  },
  {
    name: "Ankit Mehta",
    location: "Vadodara",
    rating: 5,
    quote:
      "From diagnosis to recovery, my brain tumor surgery was handled with professionalism, clear explanation, and careful follow-up.",
    date: "Jan 2026",
    role: "Brain tumor surgery patient",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
  },
  {
    name: "Sneha Patel",
    location: "Rajkot",
    rating: 5,
    quote:
      "Minimally invasive spine surgery meant less pain, smaller scars, and a quicker return to my normal routine.",
    date: "Dec 2025",
    role: "Minimally invasive spine surgery patient",
    image:
      "https://images.unsplash.com/photo-1544723795-3fb0b90cff2f?auto=format&fit=crop&w=200&q=80",
  },
  {
    name: "Vivek Trivedi",
    location: "Bhavnagar",
    rating: 5,
    quote:
      "We travelled to Dr. Parmar for cervical spine decompression and are thankful for the safe surgery and detailed follow-up plan.",
    date: "Nov 2025",
    role: "Cervical spine decompression patient",
    image:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80",
  },
  {
    name: "Nirali Shah",
    location: "Surat",
    rating: 5,
    quote:
      "Very approachable neurosurgeon who takes time to explain MRI findings, surgery options, and recovery in simple language.",
    date: "Aug 2025",
    role: "Spine consultation patient",
    image:
      "https://images.unsplash.com/photo-1544723795-432537dc569c?auto=format&fit=crop&w=200&q=80",
  },
  {
    name: "Jignesh Patel",
    location: "Navsari",
    rating: 5,
    quote:
      "For chronic back pain and disc prolapse, Dr. Parmar suggested the right spine procedure and guided me through every step.",
    date: "Jul 2025",
    role: "Disc prolapse surgery patient",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
  },
  {
    name: "Aarti Mehra",
    location: "Anand",
    rating: 5,
    quote:
      "Our child’s pediatric neurosurgery was handled with great care, and the team made sure we understood every stage of treatment.",
    date: "Jun 2025",
    role: "Pediatric neurosurgery parent",
    image:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=200&q=80",
  },
  {
    name: "Sanjay Kulkarni",
    location: "Gandhinagar",
    rating: 5,
    quote:
      "After a road traffic accident, the emergency neurotrauma care and ICU coordination were life-saving for our family member.",
    date: "May 2025",
    role: "Neurotrauma emergency family member",
    image:
      "https://images.unsplash.com/photo-1499996860823-5214fcc65f8f?auto=format&fit=crop&w=200&q=80",
  },
  {
    name: "Kavita Joshi",
    location: "Bharuch",
    rating: 5,
    quote:
      "Brain tumor surgery and recovery were explained clearly, with realistic expectations about rehabilitation and follow-up scans.",
    date: "Apr 2025",
    role: "Brain tumor patient",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
  },
  {
    name: "Manish Verma",
    location: "Jamnagar",
    rating: 5,
    quote:
      "I was looking for an experienced neurosurgeon in Gujarat for lumbar canal stenosis and found excellent care here.",
    date: "Mar 2025",
    role: "Lumbar canal stenosis patient",
    image:
      "https://images.unsplash.com/photo-1544723795-3fb6469f5b39?auto=format&fit=crop&w=200&q=80",
  },
  {
    name: "Pooja Rana",
    location: "Nadiad",
    rating: 5,
    quote:
      "The team ensured my mother’s spine surgery was as safe as possible, with detailed pre-operative counselling and post-op visits.",
    date: "Feb 2025",
    role: "Family member of spine surgery patient",
    image:
      "https://images.unsplash.com/photo-1525134479668-1bee5c7c6845?auto=format&fit=crop&w=200&q=80",
  },
  {
    name: "Ravi Chawla",
    location: "Mehsana",
    rating: 5,
    quote:
      "Stroke-related neurovascular issues were addressed promptly, and we received clear guidance on long-term prevention.",
    date: "Jan 2025",
    role: "Stroke and neurovascular patient",
    image:
      "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
  },
  {
    name: "Bhavika Shah",
    location: "Valsad",
    rating: 5,
    quote:
      "From first consultation to discharge, the staff and doctor were kind, professional, and focused on my spine health.",
    date: "Dec 2024",
    role: "Spine surgery patient",
    image:
      "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=200&q=80",
  },
  {
    name: "Hitesh Parmar",
    location: "Junagadh",
    rating: 5,
    quote:
      "We appreciated the honest, transparent opinion about when surgery was needed and when conservative treatment was enough.",
    date: "Nov 2024",
    role: "Second-opinion neurosurgery patient",
    image:
      "https://images.unsplash.com/photo-1544723795-432537dc569c?auto=format&fit=crop&w=200&q=80",
  },
  {
    name: "Minal Thakkar",
    location: "Bhuj",
    rating: 5,
    quote:
      "Pediatric brain surgery for our son was a frightening idea, but Dr. Parmar’s calm approach and clear answers helped us a lot.",
    date: "Oct 2024",
    role: "Pediatric neurosurgery parent",
    image:
      "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80",
  },
  {
    name: "Ashish Upadhyay",
    location: "Surendranagar",
    rating: 5,
    quote:
      "Post-operative follow-up after cervical spine surgery was thorough, and the rehabilitation plan was easy to follow.",
    date: "Sep 2024",
    role: "Cervical spine surgery patient",
    image:
      "https://images.unsplash.com/photo-1499996860823-5214fcc65f8f?auto=format&fit=crop&w=200&q=80",
  },
  {
    name: "Roshni Patel",
    location: "Ankleshwar",
    rating: 5,
    quote:
      "We felt reassured by the detailed explanation of risks and benefits before going ahead with minimally invasive brain surgery.",
    date: "Aug 2024",
    role: "Minimally invasive brain surgery patient",
    image:
      "https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?auto=format&fit=crop&w=200&q=80",
  },
  {
    name: "Nikhil Soni",
    location: "Patan",
    rating: 5,
    quote:
      "The clinic helped us coordinate scans, surgery, and discharge smoothly, which made a big difference during a stressful time.",
    date: "Jul 2024",
    role: "Spine and neuro care patient",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
  },
  {
    name: "Sejal Desai",
    location: "Ahmedabad",
    rating: 5,
    quote:
      "If you are searching for a trusted neurosurgeon for brain or spine problems in Gujarat, I would strongly recommend Dr. Parmar.",
    date: "Jun 2024",
    role: "Brain and spine consultation patient",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=200&q=80",
  },
];

// Mock video testimonials: YouTube + Instagram (placeholder thumbnails; click opens link)
const VIDEO_MOCK = [
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

export default function TestimonialsPage() {
  return (
    <div className="bg-[#FAFAF8] text-slate-900 pb-16">
      {/* Hero / intro */}
      <section className="pt-8 pb-12 md:pt-12 md:pb-16">
        <div className="container mx-auto px-4">
          <SectionReveal>
            <SectionHeading
              title="Patient Testimonials"
              subtitle="Real experiences from patients and families who trusted Dr. Nisarg Parmar with their brain and spine care."
              className="mb-10"
            />
          </SectionReveal>
        </div>
      </section>

      {/* Written testimonials - animated columns */}
      <section className="pb-12 md:pb-16">
        <div className="container mx-auto px-4">
          <SectionReveal>
            <h2 className="text-lg font-semibold tracking-tight text-slate-900 mb-4 md:text-xl">
              Written stories
            </h2>
            <p className="mb-8 max-w-2xl text-sm leading-relaxed text-slate-600">
              Every surgery and consultation is a personal story. These written testimonials
              highlight what patients valued most&mdash;clear communication, calm guidance,
              and careful follow-up before and after surgery.
            </p>
          </SectionReveal>
          <SectionReveal delay={0.05}>
            {(() => {
              const firstColumn = WRITTEN.slice(0, 2).map((t) => ({
                text: `“${t.quote}”`,
                image: t.image,
                name: t.name,
                role: t.role,
              }));
              const secondColumn = WRITTEN.slice(2, 4).map((t) => ({
                text: `“${t.quote}”`,
                image: t.image,
                name: t.name,
                role: t.role,
              }));
              const thirdColumn = WRITTEN.map((t) => ({
                text: `“${t.quote}”`,
                image: t.image,
                name: t.name,
                role: t.role,
              }));

              return (
                <div className="mt-6 flex justify-center gap-6 [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)] max-h-[620px] overflow-hidden">
                  <TestimonialsColumn testimonials={firstColumn} duration={18} />
                  <TestimonialsColumn
                    testimonials={secondColumn}
                    duration={22}
                    className="hidden md:block"
                  />
                  <TestimonialsColumn
                    testimonials={thirdColumn}
                    duration={28}
                    className="hidden lg:block"
                  />
                </div>
              );
            })()}
          </SectionReveal>
        </div>
      </section>

      {/* Video testimonials */}
      <section id="video" className="pb-12 md:pb-16">
        <div className="container mx-auto px-4">
          <SectionReveal>
            <h2 className="text-lg font-semibold tracking-tight text-slate-900 mb-4 md:text-xl">
              Video testimonials
            </h2>
            <p className="mb-8 max-w-2xl text-sm leading-relaxed text-slate-600">
              Some patients and families chose to share their journey on video. Click a
              thumbnail to watch their story on YouTube or Instagram.
            </p>
          </SectionReveal>
          <SectionReveal delay={0.05}>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {VIDEO_MOCK.map((item, index) => {
                const href =
                  item.type === "youtube" ? item.videoUrl : item.instagramReelUrl!;
                return (
                  <a
                    key={index}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group block overflow-hidden rounded-2xl border border-slate-200 bg-white/95 shadow-sm transition-transform duration-200 hover:-translate-y-1 hover:shadow-md focus-visible:ring-2 ring-secondary"
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
                      <p className="font-medium text-slate-900">
                        {item.patientName}
                      </p>
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
        </div>
      </section>

      {/* CTA card */}
      <section className="pb-12 md:pb-16">
        <div className="container mx-auto px-4">
          <SectionReveal>
            <div className="mx-auto max-w-2xl rounded-3xl border border-slate-200 bg-white/95 px-6 py-8 text-center shadow-sm md:px-10 md:py-10">
              <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.3em] text-secondary">
                Next step
              </p>
              <h2 className="text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl">
                Need an opinion or follow-up?
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-slate-700 md:text-base">
                If you or a family member has been advised brain or spine surgery, or if
                you&apos;re recovering and need a review, you can book a consultation to
                discuss your reports and next steps.
              </p>
              <div className="mt-8 flex justify-center">
                <Link
                  href="/appointments"
                  className="inline-flex items-center gap-2 rounded-full bg-secondary px-8 py-3 text-sm font-semibold tracking-[0.18em] text-secondary-foreground transition-colors duration-200 hover:bg-secondary/90 md:px-10 md:py-3.5"
                >
                  <span>Book an appointment</span>
                </Link>
              </div>
            </div>
          </SectionReveal>
        </div>
      </section>
    </div>
  );
}
