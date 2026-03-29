"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { EMERGENCY_PHONE, EMERGENCY_PHONE_TEL } from "@/content/site";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/specialties", label: "Specialties" },
  { href: "/testimonials", label: "Testimonials" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
  { href: "/appointments", label: "Appointments" },
] as const;

function LogoImage() {
  const [error, setError] = useState(false);
  if (error) {
    return (
      <span
        className="h-full w-full bg-primary/20 flex items-center justify-center text-primary font-bold text-lg"
        aria-hidden
      >
        NP
      </span>
    );
  }
  return (
    <Image
      src="/dr-nisarg-parmar.png"
      alt="Dr. Nisarg Parmar - Neurosurgeon"
      fill
      className="object-cover"
      sizes="40px"
      onError={() => setError(true)}
    />
  );
}

export function Header() {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-5 sm:px-6 lg:px-8 pt-4">
      <div className="mx-auto max-w-7xl">
        {/* Pill-shaped menu bar: single cohesive unit */}
        <div className="flex items-center justify-between gap-4 rounded-full bg-muted/90 px-4 py-2 shadow-sm md:px-6 md:py-2.5">
          {/* Logo (left): circular icon + name */}
          <Link
            href="/"
            className="flex items-center gap-3 shrink-0 focus-visible:ring-2 ring-ring ring-offset-2 rounded-full"
          >
            <div className="relative h-10 w-10 md:h-11 md:w-11 rounded-full overflow-hidden bg-muted shrink-0 flex items-center justify-center">
              <LogoImage />
            </div>
            <div className="block">
              <span className="font-bold text-sm sm:text-base md:text-lg text-foreground block leading-tight">
                Dr. Nisarg Parmar
              </span>
              <span className="text-[9px] sm:text-[10px] md:text-xs text-muted-foreground block">
                Neurosurgeon | Brain & Spine
              </span>
            </div>
          </Link>

          {/* Center: nav links in a lighter rounded container (desktop) */}
          <div className="hidden lg:flex items-center flex-1 justify-center">
            <div className="flex items-center gap-0.5 rounded-full bg-background/95 px-2 py-1.5 shadow-sm">
              {NAV_LINKS.map(({ href, label }) => {
                const isActive =
                  pathname === href ||
                  (href !== "/" && pathname.startsWith(href));
                return (
                  <Link
                    key={href}
                    href={href}
                    prefetch
                    className={cn(
                      "px-3 py-2 text-sm font-medium rounded-full min-h-[44px] inline-flex items-center justify-center transition-all duration-200 focus-visible:ring-2 ring-ring ring-offset-2",
                      isActive
                        ? "bg-[#1b988d] text-white shadow-sm"
                        : "text-muted-foreground hover:text-foreground hover:bg-muted/50"
                    )}
                  >
                    {label}
                  </Link>
                );
              })}
            </div>
          </div>

          {/* Right: primary CTA button (teal) */}
          <div className="hidden lg:flex items-center gap-2 shrink-0">
            <Button
              variant="secondary"
              size="sm"
              className="rounded-full gap-1.5 bg-secondary text-secondary-foreground hover:bg-secondary/90"
              asChild
            >
              <Link href="/appointments">
                <Calendar className="h-4 w-4" aria-hidden />
                Book Appointment
              </Link>
            </Button>
            <a
              href={`tel:${EMERGENCY_PHONE_TEL}`}
              className="text-xs font-medium text-muted-foreground hover:text-destructive focus-visible:ring-2 ring-ring rounded px-2 py-1"
            >
              Emergency
            </a>
          </div>

          {/* Mobile: hamburger */}
          <button
            type="button"
            onClick={() => setMobileOpen((o) => !o)}
            className="lg:hidden p-2.5 rounded-full text-foreground hover:bg-background/80 focus-visible:ring-2 ring-ring ring-offset-2 min-h-[44px] min-w-[44px] inline-flex items-center justify-center"
            aria-expanded={mobileOpen}
            aria-controls="mobile-menu"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu: same pill style content in a dropdown */}
      <div
        id="mobile-menu"
        className={cn(
          "lg:hidden mx-auto max-w-7xl mt-2 rounded-3xl bg-muted/95 shadow-lg overflow-hidden transition-all duration-200",
          mobileOpen ? "max-h-[85vh] opacity-100" : "max-h-0 opacity-0"
        )}
        aria-hidden={!mobileOpen}
      >
        <div className="p-4 space-y-1">
          {NAV_LINKS.map(({ href, label }) => {
            const isActive =
              pathname === href || (href !== "/" && pathname.startsWith(href));
            return (
              <Link
                key={href}
                href={href}
                prefetch
                onClick={() => setMobileOpen(false)}
                className={cn(
                  "block py-3 px-4 text-base font-medium rounded-xl focus-visible:ring-2 ring-ring ring-offset-2",
                  isActive
                    ? "bg-[#1b988d] text-white"
                    : "text-muted-foreground hover:text-foreground hover:bg-background/50"
                )}
              >
                {label}
              </Link>
            );
          })}
          <div className="flex flex-col gap-2 pt-4 mt-2 border-t border-border">
            <Button variant="secondary" className="w-full rounded-full" asChild>
              <Link href="/appointments" onClick={() => setMobileOpen(false)}>
                <Calendar className="h-4 w-4 mr-2" />
                Book Appointment
              </Link>
            </Button>
            <a
              href={`tel:${EMERGENCY_PHONE_TEL}`}
              onClick={() => setMobileOpen(false)}
              className="text-center text-sm font-medium text-destructive py-2"
            >
              Emergency: {EMERGENCY_PHONE}
            </a>
          </div>
        </div>
      </div>
    </header>
  );
}
