import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth-server";
import Link from "next/link";
import { AdminSignOutButton } from "@/components/admin/AdminSignOutButton";

export default async function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();
  if (!session?.user) {
    redirect("/admin/login?callbackUrl=/admin");
  }
  if (session.user.role !== "admin") {
    redirect("/admin/login?error=forbidden");
  }

  return (
    <div className="min-h-screen bg-muted/30">
      <header className="border-b border-border bg-background px-4 py-3">
        <div className="container mx-auto flex items-center justify-between">
          <div className="flex items-center gap-6">
            <Link href="/admin" className="font-semibold text-foreground">
              Dashboard
            </Link>
            <Link
              href="/admin/blogs"
              className="text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              Blogs
            </Link>
            <Link
              href="/admin/testimonials"
              className="text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              Testimonials
            </Link>
            <Link
              href="/admin/locations"
              className="text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              Locations
            </Link>
            <Link
              href="/admin/contact-settings"
              className="text-sm font-medium text-muted-foreground hover:text-foreground"
            >
              Contact
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground">
              {session.user.email}
            </span>
            <AdminSignOutButton />
          </div>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8">{children}</main>
    </div>
  );
}
