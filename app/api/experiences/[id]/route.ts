import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export async function PUT(req: Request, routeParams: { params: Promise<{ id: string }> }) {
  const params = await routeParams.params;
  try {
    const session = await getServerSession(authOptions)
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    const { company, position, startDate, endDate, isCurrent, order } = await req.json()
    const updated = await prisma.experience.update({
      where: { id: params.id },
      data: { company, position, startDate, endDate: isCurrent ? null : endDate, isCurrent: Boolean(isCurrent), order: parseInt(order) || 0 }
    })
    return NextResponse.json(updated)
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function DELETE(req: Request, routeParams: { params: Promise<{ id: string }> }) {
  const params = await routeParams.params;
  try {
    const session = await getServerSession(authOptions)
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    await prisma.experience.delete({ where: { id: params.id } })
    return NextResponse.json({ success: true })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
