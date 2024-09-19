"use server"

import { authOptions } from "@/lib/auth"
import { db } from "@/lib/prisma"
import { getServerSession } from "next-auth"

interface UserProps {
  id: string
  email: string
  city: string
  accountType: string
}

export const addInfoUser = async ({
  id,
  email,
  city,
  accountType,
}: UserProps) => {
  const userServer = await getServerSession(authOptions)

  if (!userServer) {
    throw new Error("Nenhum usuário encontrado.")
  }

  if (!id || !email || !city || !accountType) {
    throw new Error("Está falando informações do usuário.")
  }

  const userExists = await db.user.findUnique({
    where: {
      id,
    },
  })

  if (!userExists) {
    throw new Error("Nenhum usuário encontrado.")
  }

  await db.user.update({
    where: {
      id,
    },
    data: {
      city,
      accountType,
    },
  })
}
