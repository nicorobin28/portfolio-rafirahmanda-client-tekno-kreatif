import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"

export async function GET() {
  console.log("[TAGS_API] GET initiated")
  try {
    // Introspect available models to debug 'undefined' error
    const availableModels = Object.keys(prisma).filter(k => !k.startsWith('$'));
    console.log("[TAGS_API] Available models:", availableModels);

    const tagModel = (prisma as any).tag || (prisma as any).Tag || (prisma as any).tags;
    
    if (!tagModel) {
      throw new Error(`Prisma 'tag' model not found. Available: ${availableModels.join(', ')}`);
    }

    const tags = await tagModel.findMany({
      orderBy: { label: "asc" }
    })
    console.log(`[TAGS_API] GET success: found ${tags?.length || 0} tags`)
    return NextResponse.json(tags)
  } catch (error: any) {
    console.error("[TAGS_GET_ERROR]", error)
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function POST(req: Request) {
  console.log("[TAGS_API] POST initiated")
  try {
    let session;
    try {
      session = await getServerSession(authOptions)
    } catch (e: any) {
      console.error("[TAGS_AUTH_ERROR]", e)
      return NextResponse.json({ error: "Authentication check failed" }, { status: 500 })
    }
    
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    const body = await req.json()
    console.log("[TAGS_API] POST body received:", body)
    const { label, color } = body

    if (!label) return NextResponse.json({ error: "Label is required" }, { status: 400 })

    const tagModel = (prisma as any).tag || (prisma as any).Tag || (prisma as any).tags;
    if (!tagModel) throw new Error("Prisma 'tag' model missing in current client instance.");

    const newTag = await tagModel.create({
      data: {
        label,
        color: color || "#6366f1" // Default indigo
      }
    })

    return NextResponse.json(newTag, { status: 201 })
  } catch (error: any) {
    console.error("[TAGS_POST_ERROR]", error)
    if (error.code === 'P2002') {
      return NextResponse.json({ error: "Tag with this label already exists" }, { status: 400 })
    }
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
