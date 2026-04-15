import prisma from "@/lib/prisma";
import { Metadata } from "next";
import WorkDetailClient from "./WorkDetailClient";
import { notFound } from "next/navigation";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;

  const portfolio = await prisma.portfolio.findUnique({
    where: { id },
  });

  if (!portfolio) {
    return {
      title: "Project Not Found",
    };
  }

  return {
    title: portfolio.title,
    description:
      portfolio.subTitle ||
      `Explore the details of ${portfolio.title} project by Rafi Rahmanda.`,
    openGraph: {
      title: `${portfolio.title} | Rafi Rahmanda`,
      description: portfolio.subTitle || "",
      images: portfolio.companyLogoUrl ? [portfolio.companyLogoUrl] : [],
    },
  };
}

export default async function Page({ params }: PageProps) {
  const { id } = await params;

  // Verifikasi keberadaan portfolio sebelum render client component
  const portfolio = await prisma.portfolio.findUnique({
    where: { id },
  });

  if (!portfolio) {
    notFound();
  }

  return <WorkDetailClient />;
}
