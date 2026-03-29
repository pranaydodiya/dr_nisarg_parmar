import "server-only";

import type { ContactSettings } from "./contact-types";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

/** Cached server fetches — avoids client waterfall and leverages Vercel/Next data cache. */
const PUBLIC_REVALIDATE_SEC = 120;

const fetchPublic = (path: string) =>
  fetch(`${API_BASE}${path}`, {
    next: { revalidate: PUBLIC_REVALIDATE_SEC },
  });

export const DEFAULT_CONTACT_SETTINGS: ContactSettings = {
  emergencyPhone: "+91 99741 11089",
  emergencyPhoneTel: "+919974111089",
  primaryPhone: "+91 99741 11089",
  primaryPhoneTel: "+919974111089",
  email: "contact@drnisargparmar.com",
  emergencyMessage:
    "Head injuries, spinal trauma, stroke — immediate care available.",
  emergencyTitle: "24/7 Emergency Neurosurgery",
  showEmergencyStrip: true,
  whatsappNumber: "",
  whatsappMessage: "",
  showWhatsapp: false,
};

export type { ContactSettings } from "./contact-types";

export async function getPublicLocations(): Promise<any[]> {
  try {
    const res = await fetchPublic("/locations");
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch {
    return [];
  }
}

export async function getPublicContactSettings(): Promise<ContactSettings> {
  try {
    const res = await fetchPublic("/contact-settings");
    if (!res.ok) return { ...DEFAULT_CONTACT_SETTINGS };
    const doc = await res.json();
    return { ...DEFAULT_CONTACT_SETTINGS, ...doc };
  } catch {
    return { ...DEFAULT_CONTACT_SETTINGS };
  }
}

/** Full contact page: settings + all active locations. */
export async function getContactPageData() {
  const [settings, locations] = await Promise.all([
    getPublicContactSettings(),
    getPublicLocations(),
  ]);
  return { settings, locations };
}

/** Home hero section: settings + up to 6 primary locations (excludes “also available at”). */
export async function getHomeContactSectionData() {
  const { settings, locations } = await getContactPageData();
  const homeLocations = locations
    .filter((l: { isAvailableAt?: boolean }) => !l.isAvailableAt)
    .slice(0, 6);
  return { settings, locations: homeLocations };
}
