import { NextResponse } from "next/server"
import prisma from "@/lib/prisma"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { promises as fs } from "fs"
import path from "path"
import crypto from "crypto"

export async function PUT(req: Request, routeParams: { params: Promise<{ id: string }> }) {
  const params = await routeParams.params;
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
    const companyLogoUrl = (formData.get("companyLogoUrl") as string) || null


    // Accept multiple image files
    const files = formData.getAll("images") as File[]

    // Hanya upload file baru jika ada file yang di-submit
    const coverIndex = parseInt(formData.get("coverIndex") as string) || 0
    const imageUrls: { url: string; altText: string; order: number; isCover: boolean }[] = []

    if (files.length > 0 && files[0].size > 0) {
        const uploadDir = path.join(process.cwd(), "public", "uploads", "portfolios")
        await fs.mkdir(uploadDir, { recursive: true })

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
    }

    const updated = await prisma.portfolio.update({
      where: { id: params.id },
      data: {
        title, subTitle, role, company, companyLogoUrl, year,
        ...(imageUrls.length > 0 ? {
            // Hapus gambar lama (bisa ditaruh logic unlink file lama jika perlu)
            images: { deleteMany: {}, create: imageUrls }
        } : {}),
        tags: {
            deleteMany: {},
            create: tags.map((tagId: string) => ({
                tag: { connect: { id: tagId } }
            }))
        }
      },
      include: { images: true, contents: true, tags: { include: { tag: true } } }
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

    await prisma.portfolio.delete({ where: { id: params.id } })
    return NextResponse.json({ success: true })
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}

export async function GET(req: Request, routeParams: { params: Promise<{ id: string }> }) {
  const params = await routeParams.params;
  try {
    const portfolio = await prisma.portfolio.findUnique({
      where: { id: params.id },
      include: {
        contents: {
          orderBy: { order: "asc" },
        },
        images: {
          orderBy: { order: "asc" },
        },
        tags: {
          include: { tag: true }
        }
      },
    });

    if (!portfolio) {
      return NextResponse.json({ error: "Portfolio not found" }, { status: 404 });
    }

    return NextResponse.json(portfolio);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
