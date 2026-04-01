"use client";

import { useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-[50vh] flex flex-col items-center justify-center px-4 py-16 text-center">
      <h1 className="text-2xl font-semibold text-foreground">Something went wrong</h1>
      <p className="mt-3 max-w-md text-sm text-muted-foreground">
        Please try again. If the problem continues, use the links below.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Button type="button" onClick={() => reset()} className="rounded-full">
          Try again
        </Button>
        <Button variant="outline" asChild className="rounded-full">
          <Link href="/">Home</Link>
        </Button>
      </div>
    </div>
  );
}
