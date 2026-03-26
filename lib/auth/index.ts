import NextAuth, { NextAuthOptions, getServerSession } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import prisma from "../prisma"
import bcrypt from "bcryptjs"
import { loginSchema } from "@/validations/auth.schema"

export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/login",
  },
  session: { strategy: "jwt" },
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { type: "text" },
        password: { type: "password" }
      },
      async authorize(credentials) {
        const validated = loginSchema.safeParse(credentials)
        if (!validated.success) return null

        const { username, password } = validated.data

        const user = await prisma.user.findUnique({
          where: { username }
        })
        if (!user) return null

        const isValid = await bcrypt.compare(password, user.password)
        if (!isValid) return null

        return {
          id: user.id,
          name: user.name,
          username: user.username
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id
        token.username = user.username
      }
      return token
    },
    async session({ session, token }) {
      if (session.user && token) {
        session.user.id = token.id as string
        session.user.username = token.username as string
      }
      return session
    }
  }
}

const handler = NextAuth(authOptions)

export const handlers = {
  GET: handler,
  POST: handler,
}

export const auth = (...args: any[]) => {
  return (getServerSession as any)(...args, authOptions)
}