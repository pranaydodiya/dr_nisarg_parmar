/** localStorage key for analytics cookie choice (client-only). */
export const COOKIE_CONSENT_KEY = "drnp_analytics_consent";

export type CookieConsentValue = "accepted" | "rejected";

export function getStoredConsent(): CookieConsentValue | null {
  if (typeof window === "undefined") return null;
  const v = localStorage.getItem(COOKIE_CONSENT_KEY);
  if (v === "accepted" || v === "rejected") return v;
  return null;
}

export function setStoredConsent(value: CookieConsentValue): void {
  localStorage.setItem(COOKIE_CONSENT_KEY, value);
  window.dispatchEvent(new Event("drnp-cookie-consent"));
}
