import Link from "next/link";

export default function AdminDashboardPage() {
  return (
    <div>
      <h1 className="text-2xl font-semibold text-foreground">Dashboard</h1>
      <p className="mt-2 text-muted-foreground">
        Welcome to the admin panel. Content management (blog, locations, testimonials) will appear here as you implement Phase 2.2+.
      </p>
      <ul className="mt-6 list-inside list-disc space-y-2 text-sm text-muted-foreground">
        <li>
          <Link href="/admin/login" className="text-secondary hover:underline">
            Login
          </Link>{" "}
          (you are already signed in)
        </li>
        <li>
          <Link href="/" className="text-secondary hover:underline">
            Back to site
          </Link>
        </li>
      </ul>
    </div>
  );
}
