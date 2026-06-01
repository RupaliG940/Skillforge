import NextAuth, { DefaultSession } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import { prisma } from './prisma'
import { compare } from 'bcryptjs'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
    } & DefaultSession['user']
  }
}

export const authOptions = {
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null

        const normalizedEmail = String(credentials.email).trim().toLowerCase()
        const user = await prisma.user.findUnique({
          where: { email: normalizedEmail }
        })

        if (!user || !user.password) return null

        const isMatch = await compare(String(credentials.password), user.password)
        if (!isMatch) return null

        return {
          id: user.id,
          email: user.email,
          name: user.name,
        }
      }
    })
  ],
  session: { strategy: 'jwt' as const },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: '/login',
  },
  callbacks: {
    async jwt({ token, user }: { token: any; user?: any }) {
      if (user) token.id = user.id
      return token
    },
    async session({ session, token }: { session: any; token: any }) {
      if (token && session.user) session.user.id = token.id as string
      return session
    }
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth(authOptions)