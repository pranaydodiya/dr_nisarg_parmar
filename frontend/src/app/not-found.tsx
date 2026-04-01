import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center px-4 py-20 text-center">
      <p className="text-sm font-medium uppercase tracking-widest text-secondary">404</p>
      <h1 className="mt-2 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
        Page not found
      </h1>
      <p className="mt-4 max-w-md text-muted-foreground">
        The page you are looking for does not exist or may have been moved.
      </p>
      <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
        <Button asChild className="rounded-full">
          <Link href="/">Back to home</Link>
        </Button>
        <Button variant="outline" asChild className="rounded-full">
          <Link href="/contact">Contact</Link>
        </Button>
      </div>
    </div>
  );
}
