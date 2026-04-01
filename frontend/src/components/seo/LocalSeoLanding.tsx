import Link from "next/link";
import { Button } from "@/components/ui/button";
import { JsonLd } from "@/components/seo/JsonLd";
import { getSiteUrl, SITE_NAME } from "@/lib/seo";
import { physicianSameAsUrls } from "@/content/local-seo";

type Section = { readonly heading: string; readonly body: string };
type Faq = { readonly q: string; readonly a: string };

type Props = {
  path: string;
  h1: string;
  intro: string;
  sections: readonly Section[];
  faq: readonly Faq[];
  cityName: "Surat" | "Ahmedabad";
  otherCity: { href: string; label: string };
};

export function LocalSeoLanding({ path, h1, intro, sections, faq, cityName, otherCity }: Props) {
  const base = getSiteUrl();
  const url = `${base}${path}`;

  const webPageLd = {
    "@context": "https://schema.org",
    "@type": "MedicalWebPage",
    name: h1,
    description: intro,
    url,
    about: { "@type": "MedicalSpecialty", name: "Neurosurgery" },
    mainEntity: { "@id": `${url}#physician` },
  };

  const physicianLd = {
    "@context": "https://schema.org",
    "@type": "Physician",
    "@id": `${url}#physician`,
    name: "Dr. Nisarg Parmar",
    url: base,
    jobTitle: "Neurosurgeon",
    medicalSpecialty: ["Neurosurgery", "Neurological Surgery"],
    knowsAbout: [
      "Brain tumor surgery",
      "Spine surgery",
      "Neurotrauma",
      "Stroke care",
      "Minimally invasive spine surgery",
    ],
    areaServed: [
      { "@type": "City", name: cityName, containedInPlace: { "@type": "AdministrativeArea", name: "Gujarat" } },
      { "@type": "AdministrativeArea", name: "Gujarat", containedInPlace: { "@type": "Country", name: "India" } },
    ],
    sameAs: physicianSameAsUrls(),
  };

  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((item) => ({
      "@type": "Question",
      name: item.q,
      acceptedAnswer: { "@type": "Answer", text: item.a },
    })),
  };

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: base },
      { "@type": "ListItem", position: 2, name: h1, item: url },
    ],
  };

  return (
    <>
      <JsonLd data={webPageLd} />
      <JsonLd data={physicianLd} />
      <JsonLd data={faqLd} />
      <JsonLd data={breadcrumbLd} />

      <div className="pt-10 pb-20 md:pt-16 md:pb-24">
        <div className="container mx-auto px-4 max-w-3xl">
          <nav className="text-sm text-muted-foreground mb-6" aria-label="Breadcrumb">
            <ol className="flex flex-wrap gap-1 items-center">
              <li>
                <Link href="/" className="hover:text-foreground focus-visible:ring-2 ring-ring rounded">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="text-foreground font-medium">{h1}</li>
            </ol>
          </nav>

          <header className="space-y-3 mb-10 text-left">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground tracking-tight">{h1}</h1>
            <p className="text-foreground/60 text-base md:text-lg leading-relaxed">{intro}</p>
          </header>

          <div className="prose prose-neutral dark:prose-invert max-w-none mb-10">
            {sections.map((s) => (
              <section key={s.heading} className="mb-8">
                <h2 className="text-xl font-semibold text-foreground mt-0">{s.heading}</h2>
                <p className="text-muted-foreground leading-relaxed">{s.body}</p>
              </section>
            ))}
          </div>

          <div className="flex flex-wrap gap-3 mb-14">
            <Button asChild className="rounded-full">
              <Link href="/appointments">Book appointment</Link>
            </Button>
            <Button variant="outline" asChild className="rounded-full">
              <Link href="/contact">Contact &amp; locations</Link>
            </Button>
            <Button variant="secondary" asChild className="rounded-full">
              <Link href={otherCity.href}>{otherCity.label}</Link>
            </Button>
            <Button variant="ghost" asChild className="rounded-full">
              <Link href="/blog">Read neurosurgery articles</Link>
            </Button>
          </div>

          <section aria-labelledby="local-faq-heading">
            <h2 id="local-faq-heading" className="text-xl font-semibold text-foreground mb-4">
              Frequently asked questions — {cityName}
            </h2>
            <ul className="space-y-6 list-none p-0 m-0">
              {faq.map((item) => (
                <li key={item.q} className="border-b border-border pb-6 last:border-0">
                  <h3 className="text-base font-semibold text-foreground mb-2">{item.q}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed m-0">{item.a}</p>
                </li>
              ))}
            </ul>
          </section>

          <p className="text-xs text-muted-foreground mt-12 leading-relaxed">
            Medical specialties: neurosurgery (brain and spine). {SITE_NAME} — NIMHANS-trained neurosurgeon
            serving Surat, Ahmedabad, and Gujarat.
          </p>
        </div>
      </div>
    </>
  );
}
