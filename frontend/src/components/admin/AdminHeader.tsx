"use client";

import Link from "next/link";
import { AdminSignOutButton } from "@/components/admin/AdminSignOutButton";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const NAV_LINKS = [
  { href: "/admin", label: "Dashboard" },
  { href: "/admin/blogs", label: "Blogs" },
  { href: "/admin/testimonials", label: "Testimonials" },
  { href: "/admin/locations", label: "Locations" },
  { href: "/admin/contact-settings", label: "Contact" },
];

export function AdminHeader({ email }: { email: string }) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="border-b border-border bg-background">
      <div className="container mx-auto px-4">
        {/* Top bar */}
        <div className="flex items-center justify-between h-14">
          {/* Logo / brand */}
          <Link href="/admin" className="font-semibold text-foreground text-sm shrink-0">
            Admin Dashboard
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-5">
            {NAV_LINKS.slice(1).map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </nav>

          {/* Desktop: email + sign out */}
          <div className="hidden md:flex items-center gap-3">
            <span className="text-xs text-muted-foreground truncate max-w-[180px]">{email}</span>
            <AdminSignOutButton />
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 rounded-lg text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile drawer */}
        {mobileOpen && (
          <div className="md:hidden border-t border-border py-3 space-y-1 pb-4">
            {NAV_LINKS.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setMobileOpen(false)}
                className="block px-2 py-2.5 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors"
              >
                {l.label}
              </Link>
            ))}
            <div className="pt-2 mt-2 border-t border-border flex items-center justify-between gap-3 px-2">
              <span className="text-xs text-muted-foreground truncate">{email}</span>
              <AdminSignOutButton />
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
