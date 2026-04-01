import { safeJsonLd } from "@/lib/sanitize";

type Props = { data: unknown };

export function JsonLd({ data }: Props) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: safeJsonLd(data) }}
    />
  );
}
