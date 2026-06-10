import type { Metadata } from "next";
import { CASE_STUDIES } from "@/lib/constants";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const study = CASE_STUDIES.find((s) => s.slug === slug);
  if (!study) {
    return { title: "Case study | Modern Web Systems" };
  }
  const title = `${study.title} — ${study.client} | Modern Web Systems`;
  return {
    title,
    description: study.description,
    openGraph: {
      title,
      description: study.description,
      images: [{ url: `/work/screenshots/${study.slug}/thumb.jpg` }],
    },
  };
}

export default function CaseStudyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
