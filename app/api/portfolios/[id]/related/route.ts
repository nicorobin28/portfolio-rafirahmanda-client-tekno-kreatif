import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

// Helper to extract keywords from a string
function extractKeywords(text: string): string[] {
  if (!text) return [];
  // Tolowercase, replace special chars with space, split by whitespace
  const words = text.toLowerCase().replace(/[^a-z0-9]+/g, ' ').split(/\s+/);
  // Filtering out common stop words and short words
  const stopWords = new Set(["a", "an", "the", "and", "or", "in", "on", "at", "to", "for", "with", "by", "about", "of", "from"]);
  return words.filter(word => word.length > 2 && !stopWords.has(word));
}

export async function GET(req: Request, routeParams: { params: Promise<{ id: string }> }) {
  const params = await routeParams.params;
  try {
    const sourcePortfolio = await prisma.portfolio.findUnique({
      where: { id: params.id },
      select: { title: true, subTitle: true }
    });

    if (!sourcePortfolio) {
      return NextResponse.json({ error: "Portfolio not found" }, { status: 404 });
    }

    // Extract keywords from source
    const titleKeywords = extractKeywords(sourcePortfolio.title);
    const subTitleKeywords = extractKeywords(sourcePortfolio.subTitle);
    const allSourceKeywords = Array.from(new Set([...titleKeywords, ...subTitleKeywords]));

    if (allSourceKeywords.length === 0) {
      return NextResponse.json([]); // No keywords to compare, return empty
    }

    // Fetch all other portfolios
    const otherPortfolios = await prisma.portfolio.findMany({
      where: {
        id: { not: params.id }
      },
      select: { id: true, title: true, subTitle: true }
    });

    // Calculate score for each portfolio
    const scoredPortfolios = otherPortfolios.map(p => {
      const pText = `${p.title} ${p.subTitle}`.toLowerCase();
      let score = 0;
      allSourceKeywords.forEach(kw => {
        if (pText.includes(kw)) {
          score += 1; // Basic term frequency scoring
        }
      });
      return { ...p, score };
    });

    // Filter those with score > 0, sort by score descending, then take top 2
    const relatedPortfolios = scoredPortfolios
      .filter(p => p.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 2);

    return NextResponse.json(relatedPortfolios.map(p => ({
      id: p.id,
      title: p.title
    })));

  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
