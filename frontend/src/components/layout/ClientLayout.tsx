"use client";

import { usePathname } from "next/navigation";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminPage = pathname?.startsWith("/admin");

  return (
    <>
      {!isAdminPage && <Header />}
      <main className={isAdminPage ? "flex-1" : "flex-1 pt-16 md:pt-20"}>
        {children}
      </main>
      {!isAdminPage && <Footer />}
    </>
  );
}
