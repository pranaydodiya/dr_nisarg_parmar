/**
 * Admin shell. Auth guard and sidebar live in (dashboard)/layout so /admin/login is public.
 */
export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
