"use client";
import { fetchApi } from "@/lib/api-client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export function AdminSignOutButton() {
  const router = useRouter();

  async function handleSignOut() {
    await fetchApi("/auth/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      className="rounded-full"
      onClick={handleSignOut}
    >
      Sign out
    </Button>
  );
}
