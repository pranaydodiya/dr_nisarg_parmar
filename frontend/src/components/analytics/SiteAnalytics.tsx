"use client";

import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { ConsentAwareGa } from "@/components/analytics/ConsentAwareGa";
import { CookieConsentBanner } from "@/components/analytics/CookieConsentBanner";

/**
 * Vercel Web Analytics + Speed Insights (enable in Vercel dashboard).
 * GA4 loads only after opt-in via CookieConsentBanner when NEXT_PUBLIC_GA_MEASUREMENT_ID is set.
 */
export function SiteAnalytics() {
  return (
    <>
      <Analytics />
      <SpeedInsights />
      <ConsentAwareGa />
      <CookieConsentBanner />
    </>
  );
}
