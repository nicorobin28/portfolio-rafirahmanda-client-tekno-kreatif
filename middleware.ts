// src/middleware.ts

import { NextResponse } from "next/server"
import { getToken } from "next-auth/jwt"

export default async function middleware(req: any) {
  // Gunakan getToken langsung dari next-auth/jwt untuk Edge (sangat aman)
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET || process.env.AUTH_SECRET })
  
  const isLoggedIn = !!token
  const nextUrl = req.nextUrl

  const isDashboard = nextUrl.pathname.startsWith("/dashboard")
  const isApiProtected = nextUrl.pathname.startsWith("/api/posts") ||
                         nextUrl.pathname.startsWith("/api/media")

  // Proteksi halaman dashboard
  if (isDashboard && !isLoggedIn) {
    return NextResponse.redirect(new URL("/login", nextUrl))
  }

  // Proteksi API routes
  if (isApiProtected && !isLoggedIn) {
    return NextResponse.json(
      { error: "Unauthorized. Silakan login terlebih dahulu." },
      { status: 401 }
    )
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/dashboard/:path*", "/api/posts/:path*", "/api/media/:path*"],
}