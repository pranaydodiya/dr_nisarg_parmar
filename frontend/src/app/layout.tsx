import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "@/app/globals.css";
import { ScrollToTop } from "@/components/ScrollToTop";
import { ClientLayout } from "@/components/layout/ClientLayout";
import { FloatingWidgets } from "@/components/shared/FloatingWidgets";
import { SiteAnalytics } from "@/components/analytics/SiteAnalytics";
import { getSiteUrl, SITE_NAME, defaultOgImage } from "@/lib/seo";

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

const rootDesc =
  "NIMHANS-trained neurosurgeon in Gujarat. Brain and spine surgery, emergency neurosurgery, and minimally invasive options in Surat and Ahmedabad.";

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: `Neurosurgeon in Surat & Ahmedabad | ${SITE_NAME} | Brain & Spine`,
    template: `%s | ${SITE_NAME}`,
  },
  description: rootDesc,
  keywords: [
    "neurosurgeon Surat",
    "best neurosurgeon Surat",
    "neurosurgeon Ahmedabad",
    "brain surgeon Gujarat",
    "spine surgeon Gujarat",
    "top neurosurgeon Gujarat",
    "NIMHANS neurosurgeon",
    "Dr Nisarg Parmar",
    "brain and spine specialist",
  ],
  authors: [{ name: "Dr. Nisarg Parmar" }],
  creator: "Dr. Nisarg Parmar",
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: getSiteUrl(),
    siteName: SITE_NAME,
    title: `Neurosurgeon in Surat & Ahmedabad | ${SITE_NAME}`,
    description: rootDesc,
    ...(defaultOgImage() && {
      images: [{ url: defaultOgImage()!, width: 1200, height: 630, alt: SITE_NAME }],
    }),
  },
  twitter: {
    card: defaultOgImage() ? "summary_large_image" : "summary",
    title: `${SITE_NAME} | Neurosurgeon`,
    description: rootDesc,
    ...(defaultOgImage() && { images: [defaultOgImage()!] }),
  },
  robots: { index: true, follow: true },
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
        <SiteAnalytics />
      </body>
    </html>
  );
}
