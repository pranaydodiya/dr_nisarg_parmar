import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "@/app/globals.css";
import { ScrollToTop } from "@/components/ScrollToTop";
import { ClientLayout } from "@/components/layout/ClientLayout";
import { FloatingWidgets } from "@/components/shared/FloatingWidgets";

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  variable: "--font-inter",
  display: "optional",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-serif",
  display: "optional",
});

export const metadata: Metadata = {
  title: "Dr. Nisarg Parmar - Neurosurgeon | Brain & Spine Specialist",
  description:
    "NIMHANS trained Neurosurgeon providing expert neurological care in Gujarat.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`} data-scroll-behavior="smooth">
      <body className="min-h-screen flex flex-col font-sans">
        <ScrollToTop />
        <FloatingWidgets />
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
