"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { COOKIE_CONSENT_KEY, setStoredConsent } from "@/lib/cookie-consent";

const GA_ID = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim();

export function CookieConsentBanner() {
  const [mounted, setMounted] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (!GA_ID) return;
    const read = () => {
      const v = localStorage.getItem(COOKIE_CONSENT_KEY);
      setVisible(v !== "accepted" && v !== "rejected");
    };
    read();
    window.addEventListener("drnp-cookie-consent", read);
    return () => window.removeEventListener("drnp-cookie-consent", read);
  }, []);

  if (!mounted || !GA_ID || !visible) return null;

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-[100] p-4 md:p-5 border-t border-border bg-background/95 backdrop-blur-md shadow-[0_-4px_24px_rgba(0,0,0,0.08)]"
      role="dialog"
      aria-labelledby="cookie-consent-title"
      aria-describedby="cookie-consent-desc"
    >
      <div className="container mx-auto max-w-4xl flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="text-sm text-muted-foreground space-y-1">
          <p id="cookie-consent-title" className="font-medium text-foreground">
            Analytics cookies
          </p>
          <p id="cookie-consent-desc">
            We use optional Google Analytics to understand how visitors use this site. Vercel Web Analytics
            may also run on our hosting. See our{" "}
            <Link href="/privacy" className="text-secondary underline underline-offset-2 font-medium">
              privacy page
            </Link>{" "}
            for details.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2 shrink-0">
          <Button
            type="button"
            size="sm"
            className="rounded-full"
            onClick={() => {
              setStoredConsent("rejected");
              setVisible(false);
            }}
          >
            Decline
          </Button>
          <Button
            type="button"
            size="sm"
            variant="secondary"
            className="rounded-full"
            onClick={() => {
              setStoredConsent("accepted");
              setVisible(false);
            }}
          >
            Accept analytics
          </Button>
        </div>
      </div>
    </div>
  );
}
