import { NextResponse } from "next/server"
import { promises as fs } from "fs"
import path from "path"

export async function GET() {
  try {
    const dir = path.join(process.cwd(), "public", "uploads", "icons-company")
    const files = await fs.readdir(dir)
    const images = files
      .filter((f) => /\.(jpg|jpeg|png|webp|svg)$/i.test(f))
      .map((f) => ({
        filename: f,
        url: `/uploads/icons-company/${f}`,
      }))
    return NextResponse.json(images)
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }
}
