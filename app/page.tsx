"use client"

import { getUserInfo } from "@/actions/get-info-user"
import AdditionalInfo from "@/components/additional-info"
import { Button } from "@/components/ui/button"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"

interface User {
  id: string
  email: string
  city: string | null
  accountType: string | null
}

export default function Home() {
  const { data: session } = useSession()
  const [user, setUser] = useState<User>({} as User)

  useEffect(() => {
    if (!session?.user) {
      return
    }

    const fetch = async () => {
      const userExists = await getUserInfo({
        email: session?.user?.email!,
      })

      if (userExists) {
        setUser(userExists)
      }
    }

    fetch()
  }, [session?.user])

  return (
    <div>
      {user.email && user.id && (
        <AdditionalInfo id={user.id} email={user.email} />
      )}
    </div>
  )
}
