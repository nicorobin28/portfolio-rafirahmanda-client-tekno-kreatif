import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export async function GET() {
  try {
    const areas = await prisma.areaOfFocus.findMany({ orderBy: { order: "asc" } })
    return NextResponse.json(areas)
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    const { label, order } = await req.json()
    const newArea = await prisma.areaOfFocus.create({
      data: { userId: session.user.id, label, order: parseInt(order) || 0 }
    })
    return NextResponse.json(newArea, { status: 201 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
