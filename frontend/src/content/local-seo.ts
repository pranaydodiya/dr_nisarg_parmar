/**
 * Local SEO copy and FAQs for Surat / Ahmedabad / Gujarat intent.
 * Used by landing pages + JSON-LD. Keep claims factual (credentials, locations).
 */
import { SOCIAL_LINKS } from "@/content/site";

export function physicianSameAsUrls(): string[] {
  const urls = [SOCIAL_LINKS.facebook, SOCIAL_LINKS.instagram];
  const gmb = process.env.NEXT_PUBLIC_GOOGLE_BUSINESS_URL?.trim();
  if (gmb) urls.push(gmb);
  return urls;
}

export const LOCAL_KEYWORDS_PRIMARY = [
  "neurosurgeon Surat",
  "best neurosurgeon Surat",
  "brain surgeon Surat",
  "spine surgeon Surat",
  "neurosurgeon Ahmedabad",
  "brain and spine specialist Gujarat",
  "top neurosurgeon Gujarat",
  "neurologist vs neurosurgeon Surat",
  "emergency neurosurgery Surat",
  "minimally invasive spine surgery Gujarat",
] as const;

export const suratPage = {
  path: "/neurosurgeon-in-surat",
  title: "Neurosurgeon in Surat, Gujarat | Brain & Spine Specialist | Dr. Nisarg Parmar",
  description:
    "Looking for a neurosurgeon in Surat? Dr. Nisarg Parmar is NIMHANS-trained in brain tumor surgery, spine surgery, neurotrauma, and 24/7 emergency neurosurgery. Consultations and procedures serving Surat and South Gujarat.",
  h1: "Neurosurgeon in Surat, Gujarat",
  intro:
    "Dr. Nisarg Parmar is a NIMHANS (Bangalore) trained neurosurgeon providing advanced brain and spine care for patients in Surat and across South Gujarat. The practice focuses on clear communication, evidence-based surgical planning, and access to emergency neurosurgical care when minutes matter.",
  sections: [
    {
      heading: "Brain, spine, and nerve conditions in Surat",
      body:
        "Common reasons patients seek a neurosurgeon in Surat include brain tumors, spinal disc and nerve compression, spinal trauma, head injury, stroke-related surgical needs, and complex spine disorders. Care pathways are tailored to diagnosis, imaging findings, and your overall health—not one-size-fits-all surgery.",
    },
    {
      heading: "Why patients compare neurosurgeons in Surat and Gujarat",
      body:
        "When searching for the best neurosurgeon in Surat or a top neurosurgeon in Gujarat, credentials, surgical volume, and hospital support matter. Dr. Parmar combines subspecialty neurosurgical training with experience across thousands of procedures, with emphasis on safety, recovery, and follow-up.",
    },
    {
      heading: "Neurologist vs neurosurgeon — who should you see?",
      body:
        "A neurologist primarily diagnoses and manages neurological conditions with medications and non-surgical care. A neurosurgeon treats conditions that may require surgery of the brain, spine, or peripheral nerves. Many patients are referred from a neurologist or physician when surgery or a specialist opinion is appropriate.",
    },
  ] as const,
};

export const ahmedabadPage = {
  path: "/neurosurgeon-in-ahmedabad",
  title: "Neurosurgeon in Ahmedabad | Brain & Spine Surgery | Dr. Nisarg Parmar",
  description:
    "Neurosurgeon serving Ahmedabad and North Gujarat: brain tumors, spine surgery, neurotrauma, and emergency neurosurgery. NIMHANS-trained Dr. Nisarg Parmar—book a consultation or contact our team.",
  h1: "Neurosurgeon in Ahmedabad, Gujarat",
  intro:
    "Patients in Ahmedabad and North Gujarat can access neurosurgical care with Dr. Nisarg Parmar for complex brain and spine conditions, second opinions, and coordinated treatment planning alongside your existing physicians.",
  sections: [
    {
      heading: "Brain and spine care for Ahmedabad patients",
      body:
        "Whether you need evaluation for a brain tumor, spinal stenosis, disc herniation, or trauma, the goal is an accurate diagnosis and a transparent discussion of surgical and non-surgical options. Minimally invasive techniques are used when they are appropriate for the condition and anatomy.",
    },
    {
      heading: "Working with hospitals and referring doctors",
      body:
        "Care is coordinated with neurologists, orthopaedic spine specialists, intensivists, and rehabilitation teams when needed. Emergency neurosurgery pathways are available for life-threatening conditions—use the emergency contact number published on this site.",
    },
    {
      heading: "Spine doctor specialist and brain specialist",
      body:
        "People often search for a spine doctor specialist or brain doctor in Ahmedabad. Neurosurgery covers both: from microscopic spine procedures to cranial surgery. If you are unsure which specialist to see first, your primary physician or neurologist can guide referral, or contact us for triage.",
    },
  ] as const,
};

/** Extra FAQs for local landing JSON-LD (in addition to shared site FAQs if desired). */
export const suratLocalFaq = [
  {
    q: "Who is the best neurosurgeon in Surat?",
    a: "Dr. Nisarg Parmar is a NIMHANS-trained neurosurgeon with extensive experience in brain and spine surgery, serving patients in Surat and Gujarat. “Best” depends on your diagnosis and fit—book a consultation to discuss your case.",
  },
  {
    q: "Do you offer spine surgery in Surat?",
    a: "Yes. The practice evaluates and treats spinal conditions including disc disease, stenosis, deformity, and trauma, using modern techniques including minimally invasive approaches when suitable.",
  },
  {
    q: "Is emergency neurosurgery available for Surat patients?",
    a: "Yes. 24/7 emergency neurosurgical support is available for conditions such as severe head injury, spinal trauma, and stroke—call the emergency number listed on the contact page.",
  },
] as const;

export const ahmedabadLocalFaq = [
  {
    q: "Can I see a neurosurgeon in Ahmedabad with Dr. Nisarg Parmar?",
    a: "Yes. Consultations and care pathways are available for Ahmedabad and North Gujarat patients. Use the appointments or contact page to reach the team.",
  },
  {
    q: "Where can I find a brain and spine specialist in Gujarat?",
    a: "Dr. Parmar provides neurosurgical care across Gujarat with practice presence in Surat and Ahmedabad, focusing on brain tumors, spine disorders, trauma, and emergency neurosurgery.",
  },
] as const;
