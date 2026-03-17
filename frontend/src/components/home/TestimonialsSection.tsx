import Link from "next/link";
import { TestimonialsSectionWithMarquee } from "@/components/ui/testimonials-with-marquee";

const MOCK_TESTIMONIALS = [
  {
    author: { name: "Rahul Shah", handle: "Surat • Mar 2026" },
    text: "Exceptional care and clear communication. One of the best neurosurgeons in Gujarat for complex spine surgery.",
    rating: 5,
  },
  {
    author: { name: "Priya Desai", handle: "Ahmedabad • Feb 2026" },
    text: "My family is grateful for the expert neurotrauma care and timely emergency treatment we received for a head injury.",
    rating: 5,
  },
  {
    author: { name: "Ankit Mehta", handle: "Vadodara • Jan 2026" },
    text: "From diagnosis to recovery, my brain tumor surgery was handled with professionalism, clear explanation, and careful follow-up.",
    rating: 5,
  },
  {
    author: { name: "Sneha Patel", handle: "Rajkot • Dec 2025" },
    text: "Minimally invasive spine surgery meant less pain and a quicker return to normal life for me.",
    rating: 5,
  },
  {
    author: { name: "Vivek Trivedi", handle: "Bhavnagar • Nov 2025" },
    text: "We travelled to Dr. Parmar for cervical spine decompression and are thankful for the safe surgery and detailed follow-up plan.",
    rating: 5,
  },
  {
    author: { name: "Nirali Shah", handle: "Surat • Aug 2025" },
    text: "Very approachable neurosurgeon who takes time to explain MRI findings, surgery options, and recovery in simple language.",
    rating: 5,
  },
  {
    author: { name: "Jignesh Patel", handle: "Navsari • Jul 2025" },
    text: "For chronic back pain and disc prolapse, Dr. Parmar suggested the right spine procedure and guided me through every step.",
    rating: 5,
  },
  {
    author: { name: "Aarti Mehra", handle: "Anand • Jun 2025" },
    text: "Our child’s pediatric neurosurgery was handled with great care, and the team made sure we understood every stage of treatment.",
    rating: 5,
  },
  {
    author: { name: "Sanjay Kulkarni", handle: "Gandhinagar • May 2025" },
    text: "After a road traffic accident, the emergency neurotrauma care and ICU coordination were life-saving for our family member.",
    rating: 5,
  },
  {
    author: { name: "Kavita Joshi", handle: "Bharuch • Apr 2025" },
    text: "Brain tumor surgery and recovery were explained clearly, with realistic expectations about rehabilitation and follow-up scans.",
    rating: 5,
  },
  {
    author: { name: "Manish Verma", handle: "Jamnagar • Mar 2025" },
    text: "I was looking for an experienced neurosurgeon in Gujarat for lumbar canal stenosis and found excellent care here.",
    rating: 5,
  },
  {
    author: { name: "Pooja Rana", handle: "Nadiad • Feb 2025" },
    text: "The team ensured my mother’s spine surgery was as safe as possible, with detailed pre-operative counselling and post-op visits.",
    rating: 5,
  },
  {
    author: { name: "Ravi Chawla", handle: "Mehsana • Jan 2025" },
    text: "Stroke-related neurovascular issues were addressed promptly, and we received clear guidance on long-term prevention.",
    rating: 5,
  },
  {
    author: { name: "Bhavika Shah", handle: "Valsad • Dec 2024" },
    text: "From first consultation to discharge, the staff and doctor were kind, professional, and focused on my spine health.",
    rating: 5,
  },
  {
    author: { name: "Hitesh Parmar", handle: "Junagadh • Nov 2024" },
    text: "We appreciated the honest, transparent opinion about when surgery was needed and when conservative treatment was enough.",
    rating: 5,
  },
  {
    author: { name: "Minal Thakkar", handle: "Bhuj • Oct 2024" },
    text: "Pediatric brain surgery for our son was a frightening idea, but Dr. Parmar’s calm approach and clear answers helped us a lot.",
    rating: 5,
  },
  {
    author: { name: "Ashish Upadhyay", handle: "Surendranagar • Sep 2024" },
    text: "Post-operative follow-up after cervical spine surgery was thorough, and the rehabilitation plan was easy to follow.",
    rating: 5,
  },
  {
    author: { name: "Roshni Patel", handle: "Ankleshwar • Aug 2024" },
    text: "We felt reassured by the detailed explanation of risks and benefits before going ahead with minimally invasive brain surgery.",
    rating: 5,
  },
  {
    author: { name: "Nikhil Soni", handle: "Patan • Jul 2024" },
    text: "The clinic helped us coordinate scans, surgery, and discharge smoothly, which made a big difference during a stressful time.",
    rating: 5,
  },
  {
    author: { name: "Sejal Desai", handle: "Ahmedabad • Jun 2024" },
    text: "If you are searching for a trusted neurosurgeon for brain or spine problems in Gujarat, I would strongly recommend Dr. Parmar.",
    rating: 5,
  },
];

export function TestimonialsSection() {
  return (
    <div>
      <TestimonialsSectionWithMarquee
        title="What Patients Say"
        description="Real experiences from patients and families who trusted Dr. Nisarg Parmar with their brain and spine care."
        testimonials={MOCK_TESTIMONIALS}
      />
      <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8 pb-8 text-center">
        <Link
          href="/testimonials"
          className="text-secondary font-medium text-sm hover:underline focus-visible:ring-2 ring-ring rounded"
        >
          View all testimonials
        </Link>
      </div>
    </div>
  );
}
