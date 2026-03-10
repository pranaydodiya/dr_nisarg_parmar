"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { TestimonialForm } from "@/components/admin/TestimonialForm";

export default function EditTestimonialPage() {
  const params = useParams();
  const [testimonial, setTestimonial] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchTestimonial() {
      try {
        const res = await fetch(`/api/admin/testimonials/${params.id}`);
        if (res.ok) {
          const data = await res.json();
          setTestimonial(data);
        } else {
          console.error("Failed to load testimonial");
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    if (params.id) fetchTestimonial();
  }, [params.id]);

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Edit Testimonial</h2>
        <p className="text-sm text-slate-500">
          Update video URL and meta-details.
        </p>
      </div>

      {loading ? (
        <div className="p-8 text-center text-slate-500">Loading editor...</div>
      ) : testimonial ? (
        <TestimonialForm initialData={testimonial} />
      ) : (
        <div className="text-red-500">Testimonial not found.</div>
      )}
    </div>
  );
}
