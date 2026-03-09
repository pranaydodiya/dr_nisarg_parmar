import type { Metadata } from "next";
import Link from "next/link";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail } from "lucide-react";
import { EMERGENCY_PHONE, EMERGENCY_PHONE_TEL } from "@/content/site";
import { MOCK_LOCATIONS, MOCK_ALSO_AVAILABLE_AT } from "@/content/mock-data";

export const metadata: Metadata = {
  title: "Contact & Locations | Dr. Nisarg Parmar",
  description: "Reach out for appointments, inquiries, or emergency consultations. Locations in Surat and Ahmedabad. 24/7 emergency neurosurgery.",
};

const CONTACT_EMAIL = "contact@drnisargparmar.com";

export default function ContactPage() {
  return (
    <div className="pt-10 pb-20 md:pt-16 md:pb-24">
      <div className="container mx-auto px-4">
        <SectionHeading
          title="Contact & Locations"
          subtitle="Reach out for appointments, inquiries, or emergency consultations."
          className="mb-12"
        />

        {/* Emergency strip */}
        <div className="mb-10 p-5 rounded-xl bg-destructive/10 border border-destructive/20">
          <p className="font-semibold text-foreground">24/7 Emergency Neurosurgery</p>
          <p className="text-sm text-muted-foreground mt-1">
            Head injuries, spinal trauma, stroke — immediate care available.
          </p>
          <a
            href={`tel:${EMERGENCY_PHONE_TEL}`}
            className="inline-flex items-center gap-2 mt-3 text-destructive font-medium hover:underline focus-visible:ring-2 ring-ring rounded"
          >
            <Phone className="h-4 w-4" aria-hidden />
            {EMERGENCY_PHONE}
          </a>
        </div>

        {/* Quick contact cards: Primary, Emergency, Location */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="border-border rounded-xl">
            <CardContent className="pt-6 pb-6 text-center">
              <Phone className="h-8 w-8 mx-auto mb-2 text-secondary" aria-hidden />
              <h3 className="font-semibold text-foreground mb-1">Primary</h3>
              <a href={`tel:${EMERGENCY_PHONE_TEL}`} className="text-muted-foreground hover:text-foreground hover:underline">
                {EMERGENCY_PHONE}
              </a>
            </CardContent>
          </Card>
          <Card className="border-border rounded-xl">
            <CardContent className="pt-6 pb-6 text-center">
              <Phone className="h-8 w-8 mx-auto mb-2 text-destructive" aria-hidden />
              <h3 className="font-semibold text-foreground mb-1">Emergency</h3>
              <a href={`tel:${EMERGENCY_PHONE_TEL}`} className="text-destructive font-medium hover:underline">
                {EMERGENCY_PHONE}
              </a>
            </CardContent>
          </Card>
          <Card className="border-border rounded-xl">
            <CardContent className="pt-6 pb-6 text-center">
              <MapPin className="h-8 w-8 mx-auto mb-2 text-secondary" aria-hidden />
              <h3 className="font-semibold text-foreground mb-1">Locations</h3>
              <p className="text-sm text-muted-foreground">Surat & Ahmedabad</p>
              <Link href="#locations" className="text-secondary font-medium hover:underline">
                View on map
              </Link>
            </CardContent>
          </Card>
        </div>

        {/* Locations grid */}
        <h2 id="locations" className="text-2xl font-bold text-foreground mb-6">
          Our Locations
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {MOCK_LOCATIONS.map(({ name, address, phone, mapLink }) => (
            <Card key={name} className="border-border rounded-xl hover:shadow-md transition-shadow">
              <CardContent className="pt-6 pb-6">
                <h3 className="text-lg font-semibold text-foreground mb-2">{name}</h3>
                <p className="text-muted-foreground text-sm flex items-start gap-2">
                  <MapPin className="h-4 w-4 shrink-0 mt-0.5" aria-hidden />
                  {address}
                </p>
                <p className="text-sm mt-2">{phone}</p>
                <a
                  href={mapLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 mt-3 text-secondary font-medium hover:underline focus-visible:ring-2 ring-ring rounded"
                >
                  <MapPin className="h-4 w-4" aria-hidden />
                  View on Google Maps
                </a>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Also available at */}
        <h2 className="text-2xl font-bold text-foreground mb-4">
          Also available at
        </h2>
        <ul className="list-disc list-inside text-muted-foreground space-y-1 mb-10">
          {MOCK_ALSO_AVAILABLE_AT.map((hospital) => (
            <li key={hospital}>{hospital}</li>
          ))}
        </ul>

        <div className="text-center">
          <Button variant="secondary" className="rounded-full" asChild>
            <Link href="/appointments">Book an Appointment</Link>
          </Button>
          <a
            href={`mailto:${CONTACT_EMAIL}`}
            className="inline-flex items-center gap-2 ml-4 text-secondary font-medium hover:underline"
          >
            <Mail className="h-4 w-4" aria-hidden />
            {CONTACT_EMAIL}
          </a>
        </div>
      </div>
    </div>
  );
}
