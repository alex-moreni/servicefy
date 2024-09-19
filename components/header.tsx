"use client"

import Link from "next/link"
import Image from "next/image"
import { Avatar, AvatarImage } from "./ui/avatar"
import { signOut, useSession } from "next-auth/react"
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

  const handleLogoutClick = () => signOut()

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
        className="hidden w-[370px] bg-white sm:flex md:w-[400px]"
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
        {!session?.user && (
          <Link href={"/auth"} className="flex items-center gap-3 text-white">
            Entrar
          </Link>
        )}

        {session?.user && (
          <Button
            onClick={handleLogoutClick}
            className="hidden text-white md:block"
            variant={"destructive"}
          >
            Sair
          </Button>
        )}

        {session?.user && (
          <Avatar>
            <AvatarImage
              src={
                session?.user?.image ||
                "https://definicion.de/wp-content/uploads/2019/07/perfil-de-usuario.png"
              }
              className="object-cover"
            />
          </Avatar>
        )}

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
