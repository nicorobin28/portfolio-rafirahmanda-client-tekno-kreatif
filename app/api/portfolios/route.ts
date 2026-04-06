import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { promises as fs } from "fs"
import path from "path"
import crypto from "crypto"

export async function GET() {
  try {
    const portfolios = await prisma.portfolio.findMany({
      include: {
        images: {
          orderBy: { order: "asc" }
        },
        contents: {
          orderBy: { order: "asc" }
        },
        tags: {
          include: { tag: true }
        }
      },
      orderBy: [
        { year: "desc" },
        { createdAt: "desc" }
      ]
    })
    return NextResponse.json(portfolios)
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })

    const formData = await req.formData()
    const title = formData.get("title") as string
    const subTitle = formData.get("subTitle") as string || ""
    const role = formData.get("role") as string
    const company = formData.get("company") as string
    const year = parseInt(formData.get("year") as string)
    
    const tagsData = formData.get("tags") as string
    const tags = tagsData ? JSON.parse(tagsData) : []

    // Accept multiple image files
    const files = formData.getAll("images") as File[]

    const uploadDir = path.join(process.cwd(), "public", "uploads", "portfolios")
    await fs.mkdir(uploadDir, { recursive: true })

    const coverIndex = parseInt(formData.get("coverIndex") as string) || 0

    const imageUrls: { url: string; altText: string; order: number; isCover: boolean }[] = []

    for (let i = 0; i < files.length; i++) {
        const file = files[i]
        if (file && file.size > 0) {
            const buffer = Buffer.from(await file.arrayBuffer())
            const uniqueSuffix = crypto.randomBytes(6).toString("hex")
            const cleanName = file.name.replace(/[^a-zA-Z0-9.-]/g, "_")
            const filename = `${uniqueSuffix}-${cleanName}`
            const filepath = path.join(uploadDir, filename)

            await fs.writeFile(filepath, buffer)

            imageUrls.push({
                url: `/uploads/portfolios/${filename}`,
                altText: title,
                order: i,
                isCover: i === coverIndex
            })
        }
    }

    const newPortfolio = await prisma.portfolio.create({
      data: {
        userId: session.user.id,
        title,
        subTitle,
        role,
        company,
        year,
        images: {
          create: imageUrls
        },
        tags: {
          create: tags.map((tagId: string) => ({
            tag: { connect: { id: tagId } }
          }))
        }
      },
      include: {
        images: true,
        contents: true,
        tags: { include: { tag: true } }
      }
    })

    return NextResponse.json(newPortfolio, { status: 201 })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
