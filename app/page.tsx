"use client"

import { Button } from "@/components/ui/button"
import { signOut, useSession } from "next-auth/react"

export default function Home() {
  const { data: session } = useSession()

  const handleLogoutClick = () => signOut()

  return (
    <div>
      <h1>{session?.user?.name}</h1>
      <Button onClick={handleLogoutClick}>Sair</Button>
    </div>
  )
}
