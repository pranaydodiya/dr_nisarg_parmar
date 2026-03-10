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
    title: "Understanding Brain Tumor Surgery: What You Need to Know",
    excerpt: "A comprehensive guide to modern, advanced approaches in brain tumor diagnosis, targeted surgical treatment, and post-operative recovery.",
    featuredImage: "/images/blogs/blog_brain_tumor_1773116271130.png",
    publishDate: "2025-01-15",
    category: "Brain & Spine",
    tags: ["brain tumor", "neurosurgery", "advanced treatment", "neurology"],
  },
  {
    slug: "minimally-invasive-spine-surgery",
    title: "Minimally Invasive Spine Surgery: A Path to Faster Recovery",
    excerpt: "Discover how minimally invasive spinal techniques provide essential relief from chronic back pain with smaller incisions, less scarring, and a quicker return to daily activities.",
    featuredImage: "/images/blogs/blog_spine_surgery_1773116292277.png",
    publishDate: "2024-12-01",
    category: "Spine",
    tags: ["spine surgery", "minimally invasive", "back pain", "recovery"],
  },
  {
    slug: "when-to-seek-emergency-neurosurgery",
    title: "Critical Signs: When to Seek Emergency Neurosurgery",
    excerpt: "Learn the warning signs of neurological emergencies. Timely neurotrauma care can significantly impact treatment outcomes for head and spinal injuries.",
    featuredImage: "/images/blogs/blog_emergency_neuro_1773116313088.png",
    publishDate: "2024-11-10",
    category: "Emergency",
    tags: ["emergency neurosurgery", "neurotrauma", "head injury", "stroke"],
  },
] as const;

export const MOCK_BLOG_POST_BODIES: Record<string, string> = {
  "understanding-brain-tumor-surgery": `
    <h2>Advanced Brain Tumor Diagnostics and Surgical Treatment</h2>
    <p>Brain tumor surgery has evolved significantly with the advent of state-of-the-art imaging and microsurgical techniques. At our advanced neurosurgical practice, we prioritize a combination of robust precision and uncompromising patient safety when addressing complex intracranial tumors.</p>
    
    <h3>What to Expect During Your Neurosurgical Consultation</h3>
    <p>Your dedicated care team will guide you through comprehensive diagnostics, exploring various treatment options. These may encompass watchful waiting, targeted radiation therapy, or intricate neurosurgery. We employ high-resolution intraoperative MRI, neuro-navigation systems, and awake craniotomy techniques to plan and execute surgery with maximum tumor resection and minimal risk to healthy brain tissue.</p>
    
    <h3>Types of Brain Tumors We Treat</h3>
    <ul>
      <li><strong>Meningiomas:</strong> Typically benign tumors originating from the meninges.</li>
      <li><strong>Gliomas:</strong> Ranging from low-grade astrocytomas to glioblastoma multiforme (GBM).</li>
      <li><strong>Pituitary Adenomas:</strong> Addressed often through a minimally invasive transsphenoidal approach.</li>
      <li><strong>Metastatic Brain Tumors:</strong> Cancers that have spread from other organs directly to the brain.</li>
    </ul>

    <h3>The Journey to Recovery</h3>
    <p>Recovery timelines from brain tumor surgery vary profoundly depending on the surgical approach and tumor location. You can expect a focused rehabilitation program, closely monitored neurological follow-ups, and unwavering support from our clinical team every step of the way.</p>
  `,
  "minimally-invasive-spine-surgery": `
    <h2>Transforming Spine Care with Minimally Invasive Spinal Surgery (MISS)</h2>
    <p>Minimally invasive spine surgery (MISS) utilizes specialized instruments, such as tubular retractors and endoscopic cameras, to precisely target spinal pathology through incisions that are often less than an inch long. This modern approach to spine care dramatically mitigates the collateral damage to surrounding muscles and connective tissues, presenting overwhelming benefits compared to traditional open spine surgery.</p>
    
    <h3>Key Benefits of Minimally Invasive Procedures</h3>
    <ul>
      <li><strong>Reduced Post-Operative Pain:</strong> Less tissue disruption leads to substantially lower reliance on pain medication.</li>
      <li><strong>Shorter Hospital Stays:</strong> Many MISS procedures are performed on an outpatient basis or require merely a subtle overnight stay.</li>
      <li><strong>Quicker Return to Daily Life:</strong> Faster rehabilitation curves allow patients to return to work and light activities within weeks, not months.</li>
      <li><strong>Fewer Complications:</strong> Noticeably lower infection rates and less intra-operative blood loss.</li>
    </ul>

    <h3>Common Conditions Properly Addressed via MISS</h3>
    <p>We successfully leverage minimally invasive spine solutions to treat a large variety of debilitating conditions including herniated discs (via microdiscectomy), spinal stenosis (via laminotomy), degenerative disc disease, and minor spinal deformities. </p>
    
    <h3>Is Minimally Invasive Spine Surgery Right For You?</h3>
    <p>While the benefits are undeniable, not every spinal affliction is suited for MISS. Complex deformities or extensive multi-level disease may still necessitate traditional approaches. We provide rigorous, individualized clinical evaluations to determine the safest, most effective surgical intervention for your unique anatomy and pathology.</p>
  `,
  "when-to-seek-emergency-neurosurgery": `
    <h2>Recognizing the Urgent Need for Emergency Neurosurgery</h2>
    <p>Neurological emergencies—ranging from severe traumatic brain injury (TBI) to acute spinal cord trauma and spontaneous intracranial hemorrhage—demand immediate, specialized intervention. Providing robust 24/7 emergency neurosurgical care fundamentally alters patient prognosis. Knowing exactly when to seek immediate medical attention is a critical, life-saving measure.</p>
    
    <h3>Traumatic Head Injuries and Concussions</h3>
    <p>If you or a loved one sustains a significant blow to the head causing a rapid deceleration force, seek emergency treatment instantly if accompanied by:</p>
    <ul>
      <li>Sudden, severe, or worsening headache</li>
      <li>Repeated vomiting or prolonged nausea</li>
      <li>Profound confusion, noticeable agitation, or slurred speech</li>
      <li>Loss of consciousness, unequal pupil size, or clear fluid draining from the nose or ears.</li>
    </ul>

    <h3>Acute Spinal Trauma</h3>
    <p>Any impact resulting in neck or back pain coupled with neurological deficits—such as numbness, tingling, or acute weakness in the arms or legs—requires immediate immobilization and emergency evaluation to prevent permanent paralysis.</p>
    
    <h3>Stroke and Sudden Neurological Deficits</h3>
    <p>An ischemic or hemorrhagic stroke is an absolute medical emergency. Use the "FAST" acronym (Face drooping, Arm weakness, Speech difficulty, Time to call). Immediate endovascular intervention or emergency craniotomy at a specialized center can decompress swelling and restore vital cerebral blood flow.</p>
  `,
};
