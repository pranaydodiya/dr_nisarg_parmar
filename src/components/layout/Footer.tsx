import Link from "next/link";
import { EMERGENCY_PHONE, EMERGENCY_PHONE_TEL } from "@/content/site";

const currentYear = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground" role="contentinfo">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Column 1: Brand */}
          <div>
            <h3 className="font-bold text-lg mb-2">Dr. Nisarg Parmar</h3>
            <p className="text-primary-foreground/90 text-sm">
              Neurosurgeon | Brain & Spine Specialist
            </p>
            <p className="text-primary-foreground/80 text-sm mt-1">
              NIMHANS (Bangalore) trained Neurosurgeon providing expert neurological care in Gujarat.
            </p>
          </div>

          {/* Column 2: Quick links */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider text-primary-foreground/90 mb-3">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li>
                <Link prefetch href="/about" className="text-primary-foreground/90 hover:text-primary-foreground text-sm focus-visible:ring-2 ring-primary-foreground ring-offset-2 ring-offset-primary rounded">
                  About
                </Link>
              </li>
              <li>
                <Link prefetch href="/specialties" className="text-primary-foreground/90 hover:text-primary-foreground text-sm focus-visible:ring-2 ring-primary-foreground ring-offset-2 ring-offset-primary rounded">
                  Specialties
                </Link>
              </li>
              <li>
                <Link prefetch href="/testimonials" className="text-primary-foreground/90 hover:text-primary-foreground text-sm focus-visible:ring-2 ring-primary-foreground ring-offset-2 ring-offset-primary rounded">
                  Testimonials
                </Link>
              </li>
              <li>
                <Link prefetch href="/blog" className="text-primary-foreground/90 hover:text-primary-foreground text-sm focus-visible:ring-2 ring-primary-foreground ring-offset-2 ring-offset-primary rounded">
                  Blog
                </Link>
              </li>
              <li>
                <Link prefetch href="/appointments" className="text-primary-foreground/90 hover:text-primary-foreground text-sm focus-visible:ring-2 ring-primary-foreground ring-offset-2 ring-offset-primary rounded">
                  Book Appointment
                </Link>
              </li>
              <li>
                <Link prefetch href="/contact" className="text-primary-foreground/90 hover:text-primary-foreground text-sm focus-visible:ring-2 ring-primary-foreground ring-offset-2 ring-offset-primary rounded">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact & Emergency */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider text-primary-foreground/90 mb-3">
              Contact & Emergency
            </h3>
            <p className="text-primary-foreground/90 text-sm mb-2">
              24/7 Emergency Neurosurgery — Head injuries, spinal trauma, stroke — immediate care available.
            </p>
            <p className="text-sm">
              <a
                href={`tel:${EMERGENCY_PHONE_TEL}`}
                className="font-medium hover:underline focus-visible:ring-2 ring-primary-foreground ring-offset-2 ring-offset-primary rounded"
              >
                Emergency: {EMERGENCY_PHONE}
              </a>
            </p>
            <p className="text-sm mt-1">
              <a
                href="mailto:contact@drnisargparmar.com"
                className="text-primary-foreground/90 hover:text-primary-foreground hover:underline focus-visible:ring-2 ring-primary-foreground ring-offset-2 ring-offset-primary rounded"
              >
                contact@drnisargparmar.com
              </a>
            </p>
          </div>

          {/* Column 4: Legal */}
          <div>
            <h3 className="font-semibold text-sm uppercase tracking-wider text-primary-foreground/90 mb-3">
              Legal & Disclaimer
            </h3>
            <p className="text-primary-foreground/80 text-sm">
              The information provided on this website is for educational purposes only and should not be considered as medical advice. Always consult a qualified healthcare provider for proper diagnosis and treatment.
            </p>
            <p className="text-primary-foreground/80 text-sm mt-4">
              © {currentYear} Dr. Nisarg Parmar. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
