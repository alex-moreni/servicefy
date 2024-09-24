"use client"

import { getUserInfo } from "@/actions/get-info-user"
import AdditionalInfo from "@/components/additional-info"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"
import { useSession } from "next-auth/react"
import { useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import QuickSearch from "@/components/quick-search"
import CardSpecialist from "@/components/card-specialist"

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
    <>
      <div className="p-5">
        <header>
          <div>
            <h2 className="text-xl font-bold">
              Olá, {session?.user ? session.user.name : "Bem-vindo"}!
            </h2>
            <p>
              <span className="capitalize">
                {format(new Date(), "EEEE, dd", { locale: ptBR })}
              </span>
              <span>&nbsp;de&nbsp;</span>
              <span className="capitalize">
                {format(new Date(), "MMMM", { locale: ptBR })}
              </span>
            </p>
          </div>

          <section className="mt-6">
            <Link
              href="/freelancers"
              className="flex justify-evenly rounded-sm bg-[#5669ff] p-5 md:items-center md:justify-between"
            >
              <h1 className="max-w-[70%] text-center text-lg font-semibold text-white md:text-2xl md:uppercase">
                Encontre os melhores profissionais para o seu projeto.
              </h1>
              <Image
                src={"/specialist-img.svg"}
                alt=""
                width={80}
                height={80}
                className="rounded-lg bg-white p-2"
              />
            </Link>
          </section>
          <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
            Áreas de interesse
          </h2>
          <QuickSearch />
        </header>

        <section>
          <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
            Melhores profissionais
          </h2>

          <CardSpecialist quantity={8} index={0} />
        </section>

        <Link
          href="/freelancers"
          className="mt-6 flex justify-evenly rounded-sm bg-[#5669ff] p-5 md:items-center md:justify-between"
        >
          <h1 className="max-w-[70%] text-center text-lg font-semibold text-white md:text-2xl md:uppercase">
            Temos os melhores profissionais para o seu projeto, em diversos
            lugares do Brasil.
          </h1>
          <Image
            src={"/img-map.svg"}
            alt=""
            width={80}
            height={80}
            className="rounded-lg bg-white p-1"
          />
        </Link>

        <section>
          <h2 className="mb-3 mt-6 text-xs font-bold uppercase text-gray-400">
            Usuários mais ativos
          </h2>

          <CardSpecialist index={9} quantity={8} />
        </section>
      </div>

      {user.email && user.id && (
        <AdditionalInfo id={user.id} email={user.email} />
      )}
    </>
  )
}
