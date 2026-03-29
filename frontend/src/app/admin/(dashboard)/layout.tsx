import { redirect } from "next/navigation";
import { getSession } from "@/lib/auth-server";
import { AdminHeader } from "@/components/admin/AdminHeader";

export const dynamic = "force-dynamic";

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
      <AdminHeader email={session.user.email} />
      <main className="container mx-auto px-4 py-6 md:py-8">{children}</main>
    </div>
  );
}
