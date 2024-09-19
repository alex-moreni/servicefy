"use server"

import { authOptions } from "@/lib/auth"
import { db } from "@/lib/prisma"
import { getServerSession } from "next-auth"

interface getUserInfoProps {
  email: string
}

export const getUserInfo = async ({ email }: getUserInfoProps) => {
  const userServer = await getServerSession(authOptions)

  if (!userServer) {
    throw new Error("Nenhum usuário encontrado.")
  }

  const userExists = await db.user.findUnique({
    where: {
      email,
    },
  })

  if (!userExists) {
    throw new Error("Nenhum usuário encontrado.")
  }

  if (!userExists.accountType || !userExists.city) {
    return {
      id: userExists.id,
      email: userExists.email,
      city: userExists.city,
      accountType: userExists.accountType,
    }
  }
}
