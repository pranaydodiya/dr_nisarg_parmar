"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { getStoredConsent, type CookieConsentValue } from "@/lib/cookie-consent";

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim();

/**
 * Loads GA4 only after explicit opt-in (localStorage). No scripts until consent === accepted.
 */
export function ConsentAwareGa() {
  const [consent, setConsent] = useState<CookieConsentValue | null | "unset">("unset");

  useEffect(() => {
    setConsent(getStoredConsent() ?? null);
    const onChange = () => setConsent(getStoredConsent() ?? null);
    window.addEventListener("drnp-cookie-consent", onChange);
    return () => window.removeEventListener("drnp-cookie-consent", onChange);
  }, []);

  if (!GA_ID || consent !== "accepted") return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        strategy="afterInteractive"
      />
      <Script id="ga-gtag" strategy="afterInteractive">
        {`
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', '${GA_ID}');
`}
      </Script>
    </>
  );
}
