import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Navigation,
  ExternalLink,
} from "lucide-react";
import { getDbAsync } from "@/lib/db/mongodb";

export const metadata: Metadata = {
  title: "Contact & Locations | Dr. Nisarg Parmar",
  description:
    "Reach out for appointments, inquiries, or emergency consultations. Locations in Surat and Ahmedabad. 24/7 emergency neurosurgery.",
};

const SETTINGS_KEY = "contact_settings";

// Defaults if no settings configured yet
const DEFAULT_SETTINGS = {
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

async function getContactData() {
  try {
    const db = await getDbAsync();

    const [settingsDoc, locationsDocs] = await Promise.all([
      db.collection("settings").findOne({ key: SETTINGS_KEY }),
      db
        .collection("locations")
        .find({ isActive: true })
        .sort({ order: 1 })
        .toArray(),
    ]);

    const settings = settingsDoc
      ? { ...DEFAULT_SETTINGS, ...settingsDoc }
      : DEFAULT_SETTINGS;

    return { settings, locations: locationsDocs };
  } catch (error) {
    console.error("Error fetching contact data:", error);
    return { settings: DEFAULT_SETTINGS, locations: [] };
  }
}

export default async function ContactPage() {
  const { settings, locations } = await getContactData();

  // Separate full-listing locations from "Also Available At"
  const mainLocations = locations.filter((loc: any) => !loc.isAvailableAt);
  const alsoAvailableAt = locations.filter((loc: any) => loc.isAvailableAt);

  return (
    <div className="pt-10 pb-20 md:pt-16 md:pb-24">
      <div className="container mx-auto px-4">
        <SectionHeading
          title="Contact & Locations"
          subtitle="Reach out for appointments, inquiries, or emergency consultations."
          className="mb-12"
        />

        {/* Emergency strip */}
        {settings.showEmergencyStrip && (
          <div className="mb-10 p-5 rounded-xl bg-destructive/10 border border-destructive/20">
            <p className="font-semibold text-foreground">
              {settings.emergencyTitle}
            </p>
            <p className="text-sm text-muted-foreground mt-1">
              {settings.emergencyMessage}
            </p>
            <a
              href={`tel:${settings.emergencyPhoneTel}`}
              className="inline-flex items-center gap-2 mt-3 text-destructive font-medium hover:underline focus-visible:ring-2 ring-ring rounded"
            >
              <Phone className="h-4 w-4" aria-hidden />
              {settings.emergencyPhone}
            </a>
          </div>
        )}

        {/* Quick contact cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="border-border rounded-xl">
            <CardContent className="pt-6 pb-6 text-center">
              <Phone
                className="h-8 w-8 mx-auto mb-2 text-secondary"
                aria-hidden
              />
              <h3 className="font-semibold text-foreground mb-1">Primary</h3>
              <a
                href={`tel:${settings.primaryPhoneTel}`}
                className="text-muted-foreground hover:text-foreground hover:underline"
              >
                {settings.primaryPhone}
              </a>
            </CardContent>
          </Card>
          <Card className="border-border rounded-xl">
            <CardContent className="pt-6 pb-6 text-center">
              <Phone
                className="h-8 w-8 mx-auto mb-2 text-destructive"
                aria-hidden
              />
              <h3 className="font-semibold text-foreground mb-1">Emergency</h3>
              <a
                href={`tel:${settings.emergencyPhoneTel}`}
                className="text-destructive font-medium hover:underline"
              >
                {settings.emergencyPhone}
              </a>
            </CardContent>
          </Card>
          <Card className="border-border rounded-xl">
            <CardContent className="pt-6 pb-6 text-center">
              <Mail
                className="h-8 w-8 mx-auto mb-2 text-secondary"
                aria-hidden
              />
              <h3 className="font-semibold text-foreground mb-1">Email</h3>
              <a
                href={`mailto:${settings.email}`}
                className="text-muted-foreground hover:text-foreground hover:underline text-sm"
              >
                {settings.email}
              </a>
            </CardContent>
          </Card>
        </div>

        {/* Locations grid */}
        {mainLocations.length > 0 && (
          <>
            <h2
              id="locations"
              className="text-2xl font-bold text-foreground mb-6"
            >
              Our Locations
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {mainLocations.map((loc: any) => (
                <Card
                  key={loc._id.toString()}
                  className={`border-border rounded-xl flex flex-col hover:shadow-md transition-shadow overflow-hidden h-full ${
                    loc.isPrimary
                      ? "ring-2 ring-secondary/30 border-secondary/20"
                      : ""
                  }`}
                >
                  {/* Embedded Google Map */}
                  {loc.gmapEmbedCode && (
                    <div
                      className="w-full bg-muted"
                      dangerouslySetInnerHTML={{
                        __html: loc.gmapEmbedCode
                          .replace(/width="[^"]*"/g, 'width="100%"')
                          .replace(/height="[^"]*"/g, 'height="180"'),
                      }}
                    />
                  )}

                  <CardContent className="pt-5 pb-5 flex-grow flex flex-col">
                    <div className="flex items-start justify-between gap-3 flex-wrap">
                      <div className="flex-1 w-full">
                        <h3 className="text-lg font-semibold text-foreground mb-1 flex items-center gap-2 flex-wrap">
                          {loc.name}
                          {loc.isPrimary && (
                            <span className="inline-flex items-center rounded-full bg-secondary/10 px-2 py-0.5 text-xs font-medium text-secondary ring-1 ring-inset ring-secondary/20">
                              Primary
                            </span>
                          )}
                        </h3>
                        <p className="text-slate-900 font-medium text-sm flex items-start gap-2">
                          <MapPin
                            className="h-4 w-4 shrink-0 mt-0.5"
                            aria-hidden
                          />
                          {loc.address}
                          {loc.city && `, ${loc.city}`}
                        </p>
                      </div>
                    </div>

                    {loc.operatingHours && (
                      <p className="text-sm text-slate-900 font-medium mt-2 flex items-center gap-2">
                        <Clock
                          className="h-4 w-4 shrink-0 text-slate-700"
                          aria-hidden
                        />
                        {loc.operatingHours}
                      </p>
                    )}

                    {loc.phone && (
                      <p className="text-sm mt-3 flex items-center gap-2 text-slate-900 font-medium">
                        <Phone
                          className="h-4 w-4 shrink-0 text-slate-700"
                          aria-hidden
                        />
                        <a
                          href={`tel:${loc.phone.replace(/\s/g, "")}`}
                          className="hover:underline"
                        >
                          {loc.phone}
                        </a>
                      </p>
                    )}

                    {loc.email && (
                      <p className="text-sm mt-2 flex items-center gap-2 text-slate-900 font-medium">
                        <Mail
                          className="h-4 w-4 shrink-0 text-slate-700"
                          aria-hidden
                        />
                        <a
                          href={`mailto:${loc.email}`}
                          className="hover:underline break-all"
                        >
                          {loc.email}
                        </a>
                      </p>
                    )}

                    {/* Action buttons */}
                    <div className="flex flex-wrap gap-2 mt-auto pt-5">
                      <a
                        href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(`${loc.name}, ${loc.address}${loc.city ? `, ${loc.city}` : ""}`)}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm bg-primary text-primary-foreground font-medium px-4 py-2 rounded-lg hover:bg-primary/90 transition-colors shadow-sm w-full sm:w-auto justify-center"
                      >
                        <Navigation className="h-4 w-4" aria-hidden />
                        Get Directions
                      </a>
                      {loc.gmapLink && (
                        <a
                          href={loc.gmapLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-sm bg-secondary text-secondary-foreground font-medium px-4 py-2 rounded-lg hover:bg-secondary/90 transition-colors shadow-sm w-full sm:w-auto justify-center"
                        >
                          <MapPin className="h-4 w-4" aria-hidden />
                          View on Map
                        </a>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        )}

        {/* Also available at */}
        {alsoAvailableAt.length > 0 && (
          <>
            <h2 className="text-2xl font-bold text-foreground mb-4">
              Also available at
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-10">
              {alsoAvailableAt.map((loc: any) => (
                <Card
                  key={loc._id.toString()}
                  className="border-border rounded-xl hover:shadow-sm transition-shadow"
                >
                  <CardContent className="pt-4 pb-4 flex items-center justify-between gap-3 h-full">
                    <div>
                      <p className="font-semibold text-foreground">
                        {loc.name}
                      </p>
                      <p className="text-sm text-slate-800 font-medium flex items-start gap-1.5 mt-1">
                        <MapPin
                          className="h-3.5 w-3.5 shrink-0 mt-0.5 text-slate-600"
                          aria-hidden
                        />
                        {loc.address}
                        {loc.city && `, ${loc.city}`}
                      </p>
                      {loc.phone && (
                        <p className="text-sm text-slate-800 font-medium mt-1.5 flex items-center gap-1.5">
                          <Phone
                            className="h-3.5 w-3.5 shrink-0 text-slate-600"
                            aria-hidden
                          />
                          <a
                            href={`tel:${loc.phone.replace(/\s/g, "")}`}
                            className="hover:underline"
                          >
                            {loc.phone}
                          </a>
                        </p>
                      )}
                    </div>
                    {loc.gmapLink && (
                      <a
                        href={loc.gmapLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs font-semibold bg-secondary/10 text-secondary hover:bg-secondary/20 px-3 py-1.5 rounded-md transition-colors shrink-0 flex items-center gap-1"
                      >
                        Map <ExternalLink className="h-3 w-3" />
                      </a>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </>
        )}

        {/* WhatsApp floating action */}
        {settings.showWhatsapp && settings.whatsappNumber && (
          <div className="fixed bottom-6 right-6 z-50">
            <a
              href={`https://wa.me/${settings.whatsappNumber}?text=${encodeURIComponent(
                settings.whatsappMessage ||
                  "Hello, I would like to book an appointment.",
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-green-500 text-white px-5 py-3 rounded-full shadow-lg hover:bg-green-600 transition-colors font-medium text-sm"
            >
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
              </svg>
              WhatsApp Us
            </a>
          </div>
        )}

        {/* Bottom CTA */}
        <div className="text-center mt-8">
          <Button variant="secondary" className="rounded-full" asChild>
            <Link href="/appointments">Book an Appointment</Link>
          </Button>
          <a
            href={`mailto:${settings.email}`}
            className="inline-flex items-center gap-2 ml-4 text-secondary font-medium hover:underline"
          >
            <Mail className="h-4 w-4" aria-hidden />
            {settings.email}
          </a>
        </div>
      </div>

      {/* JSON-LD Structured Data for each location */}
      {mainLocations.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              mainLocations.map((loc: any) => ({
                "@context": "https://schema.org",
                "@type": "MedicalClinic",
                name: loc.name,
                address: {
                  "@type": "PostalAddress",
                  streetAddress: loc.address,
                  addressLocality: loc.city || "",
                  addressCountry: "IN",
                },
                telephone: loc.phone || settings.primaryPhone,
                ...(loc.email && { email: loc.email }),
                ...(loc.latitude &&
                  loc.longitude && {
                    geo: {
                      "@type": "GeoCoordinates",
                      latitude: loc.latitude,
                      longitude: loc.longitude,
                    },
                  }),
                ...(loc.operatingHours && {
                  openingHours: loc.operatingHours,
                }),
                ...(loc.gmapLink && { hasMap: loc.gmapLink }),
                medicalSpecialty: "Neurosurgery",
              })),
            ),
          }}
        />
      )}
    </div>
  );
}
