import bcrypt from "bcrypt"
import { NextRequest, NextResponse } from "next/server"
import { db } from "@/lib/prisma"

interface User {
  email: string
  name: string
  password: string
  confirmPassword: string
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { email, name, password, confirmPassword }: User = body

    if (!email || !name || !password || !confirmPassword) {
      return NextResponse.json({ error: "Missing fields" }, { status: 400 })
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters long" },
        { status: 400 },
      )
    }

    if (password !== confirmPassword) {
      return NextResponse.json(
        { error: "Passwords do not match" },
        { status: 400 },
      )
    }

    const existingUser = await db.user.findUnique({
      where: {
        email,
      },
    })

    if (existingUser) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 400 },
      )
    }

    const hashedPassword = await bcrypt.hash(password, 12)

    const user = await db.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
      },
    })

    return NextResponse.json(user, { status: 201 })
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 },
    )
  }
}
