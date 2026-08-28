import type { Metadata } from "next";
import { notFound, permanentRedirect } from "next/navigation";
import { caseStudies } from "@/lib/case-studies";
import { absoluteUrl } from "@/lib/site";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export const metadata: Metadata = {
  robots: { index: false, follow: true },
  alternates: { canonical: absoluteUrl("/casos-practicos-impresion-3d") }
};

export function generateStaticParams() {
  return caseStudies.map((study) => ({ slug: study.slug }));
}

export default async function CaseStudyRedirectPage({ params }: PageProps) {
  const { slug } = await params;
  if (!caseStudies.some((study) => study.slug === slug)) notFound();

  permanentRedirect("/casos-practicos-impresion-3d");
}
