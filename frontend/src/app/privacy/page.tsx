import type { Metadata } from "next";
import Link from "next/link";
import { buildPageMetadata, SITE_NAME } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  path: "/privacy",
  title: `Privacy & cookies | ${SITE_NAME}`,
  description:
    "How Dr. Nisarg Parmar’s website uses analytics, cookies, and your choices — neurosurgeon practice in Surat and Ahmedabad, Gujarat.",
  keywords: ["privacy policy", "cookies", "analytics", SITE_NAME],
});

export default function PrivacyPage() {
  return (
    <div className="pt-10 pb-20 md:pt-16 md:pb-24">
      <div className="container mx-auto px-4 max-w-2xl prose prose-neutral dark:prose-invert">
        <h1 className="text-3xl font-bold text-foreground">Privacy &amp; cookies</h1>
        <p className="text-muted-foreground text-sm">Last updated: April 2026</p>

        <h2 className="text-xl font-semibold mt-8">Who we are</h2>
        <p>
          This website represents the medical practice of <strong>{SITE_NAME}</strong> (neurosurgeon,
          Surat and Ahmedabad, Gujarat). For questions about this policy, contact us via the{" "}
          <Link href="/contact" className="text-secondary underline-offset-2 hover:underline">
            contact page
          </Link>
          .
        </p>

        <h2 className="text-xl font-semibold mt-8">Analytics</h2>
        <p>
          When you deploy this site on <strong>Vercel</strong>, Web Analytics and Speed Insights may
          collect performance and usage metrics as described in{" "}
          <a
            href="https://vercel.com/docs/analytics/privacy-policy"
            className="text-secondary underline-offset-2 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Vercel’s documentation
          </a>
          .
        </p>
        <p>
          <strong>Google Analytics 4</strong> is used only if a measurement ID is configured and you choose
          &quot;Accept analytics&quot; in the cookie banner. If you decline, GA scripts are not loaded in
          your browser.
        </p>

        <h2 className="text-xl font-semibold mt-8">Cookies &amp; local storage</h2>
        <p>
          The optional consent choice is stored in your browser&apos;s <code>localStorage</code> so we
          remember your preference. Essential cookies required for the site to function (for example admin
          login for staff) are separate from marketing/analytics consent.
        </p>

        <h2 className="text-xl font-semibold mt-8">Medical information</h2>
        <p>
          This site provides general information and is not a substitute for professional medical advice.
          Emergency care: use the emergency number shown on the site or local emergency services.
        </p>

        <p className="mt-10">
          <Link href="/" className="text-secondary font-medium underline-offset-2 hover:underline">
            ← Back to home
          </Link>
        </p>
      </div>
    </div>
  );
}
