import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export async function PUT(req: Request, routeParams: { params: Promise<{ id: string }> }) {
  const params = await routeParams.params;
  try {
    const session = await getServerSession(authOptions)
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    const { label, color } = await req.json()

    if (!label) return NextResponse.json({ error: "Label is required" }, { status: 400 })

    const updated = await prisma.tag.update({
      where: { id: params.id },
      data: { label, color }
    })

    return NextResponse.json(updated)
  } catch (error: any) {
    if (error.code === 'P2002') {
      return NextResponse.json({ error: "Tag with this label already exists" }, { status: 400 })
    }
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function DELETE(req: Request, routeParams: { params: Promise<{ id: string }> }) {
  const params = await routeParams.params;
  try {
    const session = await getServerSession(authOptions)
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    await prisma.tag.delete({ where: { id: params.id } })
    return NextResponse.json({ success: true })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
