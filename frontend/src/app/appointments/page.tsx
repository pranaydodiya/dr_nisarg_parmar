"use client";

import { useState } from "react";
import { SectionHeading } from "@/components/shared/SectionHeading";
import { EMERGENCY_PHONE, EMERGENCY_PHONE_TEL, WHATSAPP_NUMBER } from "@/content/site";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, MessageCircle } from "lucide-react";

export default function AppointmentsPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    date: "",
    time: "",
    condition: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const target = e.target as HTMLFormElement;

    const data = {
      name: (target.elements.namedItem("name") as HTMLInputElement)?.value ?? "",
      phone: (target.elements.namedItem("phone") as HTMLInputElement)?.value ?? "",
      email: (target.elements.namedItem("email") as HTMLInputElement)?.value ?? "",
      date: (target.elements.namedItem("date") as HTMLInputElement)?.value ?? "",
      time: (target.elements.namedItem("time") as HTMLInputElement)?.value ?? "",
      condition: (target.elements.namedItem("condition") as HTMLInputElement)?.value ?? "",
      message: (target.elements.namedItem("message") as HTMLTextAreaElement)?.value ?? "",
    };

    setFormData(data);

    // Build WhatsApp message
    const lines = [
      `🩺 *Appointment Request – Dr. Nisarg Parmar*`,
      ``,
      `👤 *Name:* ${data.name}`,
      `📞 *Phone:* ${data.phone}`,
      data.email ? `📧 *Email:* ${data.email}` : null,
      data.date ? `📅 *Preferred Date:* ${data.date}` : null,
      data.time ? `⏰ *Preferred Time:* ${data.time}` : null,
      data.condition ? `🧠 *Condition/Reason:* ${data.condition}` : null,
      data.message ? `💬 *Additional Info:* ${data.message}` : null,
    ]
      .filter(Boolean)
      .join("\n");

    const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines)}`;

    setSubmitted(true);

    // Open WhatsApp in a new tab
    window.open(whatsappUrl, "_blank", "noopener,noreferrer");
  };

  if (submitted) {
    return (
      <div className="pt-10 pb-20 md:pt-16 md:pb-24">
        <div className="container mx-auto px-4 max-w-xl">
          <Card className="border-green-200 bg-green-50 dark:bg-green-950/20 dark:border-green-800">
            <CardContent className="pt-8 pb-8 text-center">
              <div className="flex justify-center mb-3">
                <span className="flex h-14 w-14 items-center justify-center rounded-full bg-green-100">
                  <MessageCircle className="h-7 w-7 text-green-600" />
                </span>
              </div>
              <h2 className="text-xl font-bold text-foreground mb-2">
                Thank you, {formData.name}!
              </h2>
              <p className="text-muted-foreground text-sm">
                Your appointment details have been sent via WhatsApp. We will confirm your appointment shortly.
              </p>
              <p className="text-xs text-muted-foreground mt-3">
                If WhatsApp did not open automatically,{" "}
                <button
                  className="underline text-secondary font-medium"
                  onClick={() => {
                    const lines = [
                      `🩺 *Appointment Request – Dr. Nisarg Parmar*`,
                      ``,
                      `👤 *Name:* ${formData.name}`,
                      `📞 *Phone:* ${formData.phone}`,
                      formData.email ? `📧 *Email:* ${formData.email}` : null,
                      formData.date ? `📅 *Preferred Date:* ${formData.date}` : null,
                      formData.time ? `⏰ *Preferred Time:* ${formData.time}` : null,
                      formData.condition ? `🧠 *Condition/Reason:* ${formData.condition}` : null,
                      formData.message ? `💬 *Additional Info:* ${formData.message}` : null,
                    ]
                      .filter(Boolean)
                      .join("\n");
                    window.open(
                      `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(lines)}`,
                      "_blank",
                      "noopener,noreferrer"
                    );
                  }}
                >
                  click here to open WhatsApp
                </button>
                .
              </p>
              <Button
                variant="secondary"
                className="mt-6 rounded-full"
                onClick={() => setSubmitted(false)}
              >
                Submit Another Request
              </Button>
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
          subtitle="Fill in your details and we'll connect via WhatsApp to confirm."
          className="mb-10"
        />

        <div className="mb-8 p-4 rounded-xl bg-destructive/10 border border-destructive/20 flex gap-3">
          <AlertCircle className="h-5 w-5 text-destructive shrink-0 mt-0.5" aria-hidden />
          <div>
            <p className="font-semibold text-foreground">24/7 Emergency?</p>
            <p className="text-sm text-muted-foreground">
              For head injuries, spinal trauma, or stroke, call our emergency number directly.
            </p>
            <a href={`tel:${EMERGENCY_PHONE_TEL}`} className="text-destructive font-medium hover:underline">
              Emergency: {EMERGENCY_PHONE}
            </a>
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

              <Button
                type="submit"
                variant="secondary"
                className="rounded-full w-full sm:w-auto flex items-center gap-2"
              >
                <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden>
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
                </svg>
                Send via WhatsApp
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
