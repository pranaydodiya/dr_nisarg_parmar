import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book an Appointment | Dr. Nisarg Parmar",
  description: "Schedule a consultation. We'll confirm within 2 hours.",
};

export default function AppointmentsLayout({
  children,
}: { children: React.ReactNode }) {
  return children;
}
