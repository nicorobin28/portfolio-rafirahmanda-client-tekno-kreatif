import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export async function PATCH(req: Request, routeParams: { params: Promise<{ id: string }> }) {
  const params = await routeParams.params;
  try {
    const session = await getServerSession(authOptions)
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    const { images } = await req.json() // Array of { id: string, anchorContentId: string | null, anchorPosition: "BEFORE" | "AFTER" | null }

    if (!images || !Array.isArray(images)) {
        return NextResponse.json({ error: "Invalid payload" }, { status: 400 })
    }

    // Update individual images metadata
    const updates = images.map((img: any) => 
        prisma.portfolioImage.update({
            where: { id: img.id },
            data: {
                anchorContentId: img.anchorContentId || null,
                anchorPosition: img.anchorPosition || null
            }
        })
    )

    await prisma.$transaction(updates)

    const updatedPortfolio = await prisma.portfolio.findUnique({
        where: { id: params.id },
        include: { images: true, contents: true }
    })

    return NextResponse.json(updatedPortfolio)
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
