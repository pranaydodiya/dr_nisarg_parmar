/**
 * Mock data for Phase 1 (frontend only). Replace with API/DB in Phase 2.
 */

import { EMERGENCY_PHONE } from "./site";

export const MOCK_LOCATIONS = [
  { name: "Main Clinic", address: "Sample Address, Surat", phone: EMERGENCY_PHONE, mapLink: "https://maps.google.com/" },
  { name: "Hospital OPD", address: "Sample Hospital, Ahmedabad", phone: EMERGENCY_PHONE, mapLink: "https://maps.google.com/" },
] as const;

export const MOCK_ALSO_AVAILABLE_AT = [
  "City Hospital, Surat",
  "General Medical Centre, Ahmedabad",
] as const;

export const MOCK_BLOG_POSTS = [
  {
    slug: "understanding-brain-tumor-surgery",
    title: "Understanding Brain Tumor Surgery",
    excerpt: "An overview of modern approaches to brain tumor diagnosis and surgical treatment.",
    featuredImage: "/dr-nisarg-parmar.png",
    publishDate: "2025-01-15",
    category: "Brain & Spine",
    tags: ["brain tumor", "surgery", "neurosurgery"],
  },
  {
    slug: "minimally-invasive-spine-surgery",
    title: "Minimally Invasive Spine Surgery",
    excerpt: "How minimally invasive techniques can mean faster recovery and less scarring.",
    featuredImage: "/dr-nisarg-parmar.png",
    publishDate: "2024-12-01",
    category: "Spine",
    tags: ["spine", "minimally invasive", "recovery"],
  },
  {
    slug: "when-to-seek-emergency-neurosurgery",
    title: "When to Seek Emergency Neurosurgery",
    excerpt: "Signs that indicate you need immediate neurological care.",
    featuredImage: "/dr-nisarg-parmar.png",
    publishDate: "2024-11-10",
    category: "Emergency",
    tags: ["emergency", "neurotrauma", "24/7"],
  },
] as const;

export const MOCK_BLOG_POST_BODIES: Record<string, string> = {
  "understanding-brain-tumor-surgery": `
    <p>Brain tumor surgery has evolved significantly with advances in imaging and surgical techniques. At our practice, we focus on precision and patient safety.</p>
    <h3>What to expect</h3>
    <p>Your care team will guide you through diagnosis, treatment options, and recovery. We use the latest technology to plan and perform surgery with minimal risk.</p>
    <h3>Recovery</h3>
    <p>Recovery time varies. Our team supports you at every step with clear communication and follow-up care.</p>
  `,
  "minimally-invasive-spine-surgery": `
    <p>Minimally invasive spine surgery uses smaller incisions and specialized instruments. Benefits often include less pain, shorter hospital stay, and faster return to daily activities.</p>
    <h3>Conditions we treat</h3>
    <p>Disc herniation, spinal stenosis, and some deformities can be addressed with these techniques when appropriate.</p>
    <h3>Is it right for you?</h3>
    <p>Not every condition is suitable for minimally invasive surgery. A thorough evaluation will determine the best approach for your case.</p>
  `,
  "when-to-seek-emergency-neurosurgery": `
    <p>24/7 emergency neurosurgery is available for head injuries, spinal trauma, and stroke. Knowing when to seek immediate care can save lives.</p>
    <h3>Head injuries</h3>
    <p>After a significant blow to the head, watch for confusion, severe headache, vomiting, or loss of consciousness. Seek emergency care without delay.</p>
    <h3>Spinal trauma</h3>
    <p>Any injury that affects movement, sensation, or strength in the limbs warrants immediate evaluation.</p>
    <h3>Stroke</h3>
    <p>Time is critical. If you or someone else shows signs of stroke (face drooping, arm weakness, speech difficulty), call emergency services immediately.</p>
  `,
};
