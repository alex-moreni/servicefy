"use client"

import Link from "next/link"
import Image from "next/image"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"
import { useSession } from "next-auth/react"
import { Sheet, SheetTrigger } from "./ui/sheet"
import { MenuIcon, Search } from "lucide-react"
import MobileSidebar from "./mobile-sidebar"
import { Input } from "./ui/input"
import { Button } from "./ui/button"
import { useState } from "react"

const Header = () => {
  const { data: session } = useSession()
  const [search, setSearch] = useState("")

  const handleSubmit = () => {}

  return (
    <header className="flex items-center justify-between bg-[#5669FF] p-5">
      <div className="flex items-center gap-3">
        <Link href={"/"} className="flex items-center gap-3">
          <Image
            src="/logo.svg"
            alt="ServiceFy logo"
            width={30}
            height={30}
            priority
          />
          <h1 className="text-lg font-bold text-white">ServiceFy</h1>
        </Link>
      </div>

      <form
        onSubmit={handleSubmit}
        className="hidden w-[400px] bg-white md:flex"
      >
        <Input
          placeholder="O que você está procurando?"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <Button variant={"outline"} size="icon" type="submit">
          <Search />
        </Button>
      </form>

      <div className="flex items-center space-x-3">
        <Avatar>
          <AvatarImage
            src={
              session?.user?.image ||
              "https://definicion.de/wp-content/uploads/2019/07/perfil-de-usuario.png"
            }
            className="object-cover"
          />
        </Avatar>
        <Sheet>
          <SheetTrigger>
            {" "}
            <MenuIcon color="white" />
          </SheetTrigger>
          <MobileSidebar />
        </Sheet>
      </div>
    </header>
  )
}

export default Header
