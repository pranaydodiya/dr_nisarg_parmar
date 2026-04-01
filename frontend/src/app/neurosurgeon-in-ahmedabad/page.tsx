import type { Metadata } from "next";
import { LocalSeoLanding } from "@/components/seo/LocalSeoLanding";
import { buildPageMetadata, SITE_NAME } from "@/lib/seo";
import { LOCAL_KEYWORDS_PRIMARY, ahmedabadPage, ahmedabadLocalFaq, suratPage } from "@/content/local-seo";

export const revalidate = 3600;

export const metadata: Metadata = buildPageMetadata({
  path: ahmedabadPage.path,
  title: ahmedabadPage.title,
  description: ahmedabadPage.description,
  keywords: [
    ...LOCAL_KEYWORDS_PRIMARY,
    "brain doctor Ahmedabad",
    "spine specialist Ahmedabad",
    "neurosurgery Ahmedabad",
    `${SITE_NAME} Ahmedabad`,
  ],
});

export default function NeurosurgeonAhmedabadPage() {
  return (
    <LocalSeoLanding
      path={ahmedabadPage.path}
      h1={ahmedabadPage.h1}
      intro={ahmedabadPage.intro}
      sections={ahmedabadPage.sections}
      faq={ahmedabadLocalFaq}
      cityName="Ahmedabad"
      otherCity={{ href: suratPage.path, label: "Neurosurgeon in Surat" }}
    />
  );
}
