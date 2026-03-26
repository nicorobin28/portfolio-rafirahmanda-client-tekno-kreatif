import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export async function POST(req: Request, routeParams: { params: Promise<{ id: string }> }) {
  const params = await routeParams.params;
  try {
    const session = await getServerSession(authOptions)
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    const { title, body } = await req.json()

    const newContent = await prisma.portfolioContent.create({
      data: {
        portfolioId: params.id,
        title,
        body,
        order: 0
      }
    })

    return NextResponse.json(newContent, { status: 201 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function PUT(req: Request, routeParams: { params: Promise<{ id: string }> }) {
  const params = await routeParams.params;
  try {
    const session = await getServerSession(authOptions)
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    const { contentId, title, body } = await req.json()

    if (!contentId) return NextResponse.json({ error: "Content ID is required" }, { status: 400 })

    const updated = await prisma.portfolioContent.update({
      where: { id: contentId },
      data: { title, body }
    })

    return NextResponse.json(updated)
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function DELETE(req: Request, routeParams: { params: Promise<{ id: string }> }) {
  await routeParams.params;
  try {
    const session = await getServerSession(authOptions)
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    const { searchParams } = new URL(req.url)
    const contentId = searchParams.get('contentId')
    
    if (!contentId) return NextResponse.json({ error: "Content ID required" }, { status: 400 })

    await prisma.portfolioContent.delete({
      where: { id: contentId }
    })

    return NextResponse.json({ success: true })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
