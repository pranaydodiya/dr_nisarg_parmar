"use client";

import { useState } from "react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { EMERGENCY_PHONE, EMERGENCY_PHONE_TEL } from "@/content/site";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";

export default function AppointmentsPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", date: "", time: "", condition: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const target = e.target as HTMLFormElement;
    const name = (target.elements.namedItem("name") as HTMLInputElement)?.value ?? "";
    const phone = (target.elements.namedItem("phone") as HTMLInputElement)?.value ?? "";
    const date = (target.elements.namedItem("date") as HTMLInputElement)?.value ?? "";
    setFormData((prev) => ({ ...prev, name, phone, date }));
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="pt-10 pb-20 md:pt-16 md:pb-24">
        <div className="container mx-auto px-4 max-w-xl">
          <Card className="border-green-200 bg-green-50 dark:bg-green-950/20 dark:border-green-800">
            <CardContent className="pt-8 pb-8 text-center">
              <h2 className="text-xl font-bold text-foreground mb-2">Thank you, {formData.name}.</h2>
              <p className="text-muted-foreground">
                We have received your request for {formData.date}. We will contact you at {formData.phone} within 2 hours.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-10 pb-20 md:pt-16 md:pb-24">
      <div className="container mx-auto px-4">
        <SectionHeading
          title="Book an Appointment"
          subtitle="Schedule a consultation. We'll confirm within 2 hours."
          className="mb-10"
        />

        <div className="mb-8 p-4 rounded-xl bg-destructive/10 border border-destructive/20 flex gap-3">
          <AlertCircle className="h-5 w-5 text-destructive shrink-0 mt-0.5" aria-hidden />
          <div>
            <p className="font-semibold text-foreground">24/7 Emergency?</p>
            <p className="text-sm text-muted-foreground">For head injuries, spinal trauma, or stroke, call our emergency number directly.</p>
            <a href={`tel:${EMERGENCY_PHONE_TEL}`} className="text-destructive font-medium hover:underline">Emergency: {EMERGENCY_PHONE}</a>
          </div>
        </div>

        <Card className="max-w-2xl mx-auto border-border rounded-xl">
          <CardContent className="pt-8 pb-8">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name *</Label>
                  <Input id="name" name="name" required placeholder="Your name" className="rounded-lg" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone *</Label>
                  <Input id="phone" name="phone" type="tel" required placeholder="Your phone" className="rounded-lg" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" name="email" type="email" placeholder="your@email.com" className="rounded-lg" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="date">Preferred Date *</Label>
                  <Input id="date" name="date" type="date" required className="rounded-lg" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="time">Preferred Time</Label>
                  <Input id="time" name="time" type="time" className="rounded-lg" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="condition">Condition / Reason</Label>
                <Input id="condition" name="condition" placeholder="Brief reason for visit" className="rounded-lg" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="message">Additional message</Label>
                <textarea
                  id="message"
                  name="message"
                  rows={4}
                  placeholder="Any other details"
                  className="flex w-full rounded-lg border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                />
              </div>
              <Button type="submit" variant="secondary" className="rounded-full w-full sm:w-auto">
                Submit Request
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
