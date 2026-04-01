import Link from "next/link";
import { EMERGENCY_PHONE, EMERGENCY_PHONE_TEL, SOCIAL_LINKS } from "@/content/site";

const currentYear = new Date().getFullYear();

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fillRule="evenodd"
        d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fillRule="evenodd"
        d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
    </svg>
  );
}

export function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground" role="contentinfo">
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Column 1: Brand + Social */}
          <div>
            <h3 className="font-bold text-lg mb-2">Dr. Nisarg Parmar</h3>
            <p className="text-primary-foreground/90 text-sm">
              Neurosurgeon | Brain &amp; Spine Specialist
            </p>
            <p className="text-primary-foreground/80 text-sm mt-1">
              NIMHANS (Bangalore) trained Neurosurgeon providing expert neurological care in Gujarat.
            </p>

            {/* Social media links */}
            <div className="flex items-center gap-3 mt-4">
              <a
                href={SOCIAL_LINKS.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow Dr. Nisarg Parmar on Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-primary-foreground hover:bg-white/20 transition-colors focus-visible:ring-2 ring-primary-foreground ring-offset-2 ring-offset-primary"
              >
                <InstagramIcon className="h-4 w-4" />
              </a>
              <a
                href={SOCIAL_LINKS.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Follow Dr. Nisarg Parmar on Facebook"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-primary-foreground hover:bg-white/20 transition-colors focus-visible:ring-2 ring-primary-foreground ring-offset-2 ring-offset-primary"
              >
                <FacebookIcon className="h-4 w-4" />
              </a>
              <a
                href={`https://wa.me/${EMERGENCY_PHONE_TEL.replace("+", "")}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Chat with Dr. Nisarg Parmar on WhatsApp"
                className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-primary-foreground hover:bg-white/20 transition-colors focus-visible:ring-2 ring-primary-foreground ring-offset-2 ring-offset-primary"
              >
                <WhatsAppIcon className="h-4 w-4" />
              </a>
            </div>
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
                <Link prefetch href="/neurosurgeon-in-surat" className="text-primary-foreground/90 hover:text-primary-foreground text-sm focus-visible:ring-2 ring-primary-foreground ring-offset-2 ring-offset-primary rounded">
                  Neurosurgeon in Surat
                </Link>
              </li>
              <li>
                <Link prefetch href="/neurosurgeon-in-ahmedabad" className="text-primary-foreground/90 hover:text-primary-foreground text-sm focus-visible:ring-2 ring-primary-foreground ring-offset-2 ring-offset-primary rounded">
                  Neurosurgeon in Ahmedabad
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
              Contact &amp; Emergency
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
              Legal &amp; Disclaimer
            </h3>
            <p className="text-primary-foreground/80 text-sm">
              The information provided on this website is for educational purposes only and should not be considered as medical advice. Always consult a qualified healthcare provider for proper diagnosis and treatment.
            </p>
            <p className="text-primary-foreground/90 text-sm mt-3">
              <Link
                prefetch
                href="/privacy"
                className="underline underline-offset-2 hover:text-primary-foreground focus-visible:ring-2 ring-primary-foreground rounded"
              >
                Privacy &amp; cookies
              </Link>
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
