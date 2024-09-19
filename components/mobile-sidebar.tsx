"use client"

import { InfoIcon } from "lucide-react"

import Image from "next/image"

import { Avatar, AvatarImage } from "./ui/avatar"

import { SheetClose, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet"
import ItemSidebar from "./item-sidebar"
import { signOut, useSession } from "next-auth/react"
import { Button } from "./ui/button"
import Link from "next/link"

const MobileSidebar = () => {
  const { data } = useSession()

  const handleLogoutClik = () => signOut()

  return (
    <SheetContent className="overflow-y-auto bg-[#030829] text-white">
      <SheetHeader>
        <SheetTitle className="text-left font-bold text-white">
          <SheetClose className="flex items-center gap-3">
            <Link href={"/"} className="flex items-center gap-3">
              <Image
                src="/logo.svg"
                alt="ServiceFy logo"
                width={30}
                height={30}
                priority
              />
              <h1 className="text-lg font-bold">ServiceFy</h1>
            </Link>
          </SheetClose>
        </SheetTitle>
      </SheetHeader>

      <div className="flex items-center justify-between gap-3 border-b border-solid py-5">
        {data?.user ? (
          <div className="flex items-center gap-2">
            <Avatar>
              <AvatarImage
                className="object-cover"
                src={
                  data.user?.image ??
                  " https://definicion.de/wp-content/uploads/2019/07/perfil-de-usuario.png"
                }
              />
            </Avatar>
            <div>
              <p className="font-bold">{data.user.name}</p>
              <p className="text-xs">{data.user.email}</p>
            </div>
          </div>
        ) : (
          <>
            <div>
              <h2 className="text-lg font-bold">Realize seu login</h2>
              <p className="text-sm">
                ServiceFy, conectando quem oferece e quem busca serviços.
              </p>
            </div>
          </>
        )}
      </div>

      <div className="flex flex-col gap-2 border-b border-solid py-5">
        <h2 className="font-bold">Áreas de interesse</h2>

        <ItemSidebar
          title="Administração e Contabilidade"
          link="/freelancers?categoria=administracao-e-contabilidade"
        />

        <ItemSidebar
          title="Advogados & Leis"
          link="/freelancers?categoria=advogados-e-leis"
        />

        <ItemSidebar
          title="Atendimento ao Consumidor"
          link="/freelancers?categoria=atendimento-ao-consumidor"
        />

        <ItemSidebar
          title="Design & Criação"
          link="/freelancers?categoria=design-e-criacao"
        />

        <ItemSidebar
          title="Educação & Consultoria"
          link="/freelancers?categoria=educacao-e-consultoria"
        />

        <ItemSidebar
          title="Engenharia & Arquitetura"
          link="/freelancers?categoria=engenharia-e-arquitetura"
        />

        <ItemSidebar title="Escrita" link="/freelancers?categoria=escrita" />

        <ItemSidebar
          title="Fotografia & AudioVisual"
          link="/freelancers?categoria=fotografia-e-audiovisual"
        />

        <ItemSidebar
          title="Suporte Administrativo"
          link="/freelancers?categoria=suporte-administrativo"
        />

        <ItemSidebar title="Tradução" link="/freelancers?categoria=traducao" />

        <ItemSidebar
          title="Vendas & Marketing"
          link="/freelancers?categoria=vendas-e-marketing"
        />

        <ItemSidebar
          title="Web, Mobile & Software"
          link="/freelancers?categoria=web-mobile-e-software"
        />
      </div>

      <div className="flex flex-col gap-2 border-b border-solid py-5">
        <ItemSidebar title="sobre nós" link="/about" Icon={InfoIcon} />
      </div>

      {data?.user && (
        <div className="flex flex-col gap-2 border-b border-solid py-5">
          <Button variant={"destructive"} onClick={handleLogoutClik}>
            Sair
          </Button>
        </div>
      )}
    </SheetContent>
  )
}

export default MobileSidebar
