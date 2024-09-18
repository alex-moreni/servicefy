import NextAuth from "next-auth/next"
import Credentials from "next-auth/providers/credentials"
import { compare } from "bcrypt"

import { db } from "./prisma"

export const authOptions = {
  providers: [
    Credentials({
      id: "credentials",
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
        },
        password: {
          label: "Password",
          type: "password",
        },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Email and password is required")
        }
        const user = await db.user.findUnique({
          where: {
            email: credentials.email,
          },
        })

        if (!user) {
          throw new Error("Email does not exist")
        }

        const isCorrectPassword = await compare(
          credentials.password,
          user.password!,
        )

        if (!isCorrectPassword) {
          throw new Error("Incorrect password")
        }

        return user
      },
    }),
  ],
  pages: {
    signIn: "/auth",
  },
  debug: process.env.NODE_ENV === "development",
  session: {
    strategy: "jwt",
  },
  jwt: {
    secret: process.env.NEXTAUTH_JWT_SECRET,
  },
  secret: process.env.NEXTAUTH_SECRET,
}
