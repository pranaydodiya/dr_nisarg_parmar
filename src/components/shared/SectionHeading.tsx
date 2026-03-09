import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  id?: string;
  title: string;
  subtitle?: string;
  className?: string;
  centered?: boolean;
}

export function SectionHeading({
  id,
  title,
  subtitle,
  className,
  centered = true,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "space-y-3",
        centered && "text-center max-w-2xl mx-auto",
        className
      )}
    >
      <h2 id={id} className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="text-foreground/60 text-base md:text-lg">{subtitle}</p>
      )}
    </div>
  );
}
