import type { Metadata } from "next";
import { LocalSeoLanding } from "@/components/seo/LocalSeoLanding";
import { buildPageMetadata, SITE_NAME } from "@/lib/seo";
import { LOCAL_KEYWORDS_PRIMARY, suratPage, suratLocalFaq, ahmedabadPage } from "@/content/local-seo";

export const revalidate = 3600;

export const metadata: Metadata = buildPageMetadata({
  path: suratPage.path,
  title: suratPage.title,
  description: suratPage.description,
  keywords: [
    ...LOCAL_KEYWORDS_PRIMARY,
    "brain doctor Surat",
    "spine doctor Surat",
    "neurosurgery hospital Surat",
    `${SITE_NAME} Surat`,
  ],
});

export default function NeurosurgeonSuratPage() {
  return (
    <LocalSeoLanding
      path={suratPage.path}
      h1={suratPage.h1}
      intro={suratPage.intro}
      sections={suratPage.sections}
      faq={suratLocalFaq}
      cityName="Surat"
      otherCity={{ href: ahmedabadPage.path, label: "Neurosurgeon in Ahmedabad" }}
    />
  );
}
