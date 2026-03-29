/** Shared types for contact/locations (safe to import from client components). */

export type ContactSettings = {
  emergencyPhone?: string;
  emergencyPhoneTel?: string;
  primaryPhone?: string;
  primaryPhoneTel?: string;
  email?: string;
  emergencyMessage?: string;
  emergencyTitle?: string;
  showEmergencyStrip?: boolean;
  whatsappNumber?: string;
  whatsappMessage?: string;
  showWhatsapp?: boolean;
};
