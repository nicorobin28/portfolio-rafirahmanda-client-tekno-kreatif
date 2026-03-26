import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export async function GET() {
  try {
    const experiences = await prisma.experience.findMany({ orderBy: { order: "asc" } })
    return NextResponse.json(experiences)
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    const { company, position, startDate, endDate, isCurrent, order } = await req.json()
    const newExp = await prisma.experience.create({
      data: { 
        userId: session.user.id, 
        company, position, startDate, endDate: isCurrent ? null : endDate, 
        isCurrent: Boolean(isCurrent), order: parseInt(order) || 0 
      }
    })
    return NextResponse.json(newExp, { status: 201 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
