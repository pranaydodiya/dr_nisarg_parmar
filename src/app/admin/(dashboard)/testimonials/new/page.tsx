import { TestimonialForm } from "@/components/admin/TestimonialForm";

export default function NewTestimonialPage() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">
          Add Video Testimonial
        </h2>
        <p className="text-sm text-slate-500">
          Record a new patient journey for your public profile.
        </p>
      </div>
      <TestimonialForm />
    </div>
  );
}
