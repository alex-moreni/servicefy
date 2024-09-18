"use client"

import { useCallback, useEffect, useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { signIn, useSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import axios, { AxiosError } from "axios"
import { toast } from "sonner"

const Auth = () => {
  const { data: session } = useSession()

  const router = useRouter()

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  const [variant, setVariant] = useState<string>("login")

  const toggleVariant = useCallback(() => {
    setVariant((currentVariant) =>
      currentVariant === "login" ? "register" : "login",
    )
  }, [])

  const login = useCallback(async () => {
    try {
      const result = await signIn("credentials", {
        email,
        password,
        callbackUrl: "/",
        redirect: false,
      })

      if (!result) {
        toast.error(
          "Houve um erro inesperado ao realizar o login, tente novamente mais tarde.",
        )

        return
      }

      if (result.error) {
        if (result.error === "Email and password is required") {
          toast.error("Preencha todos os campos")
        } else if (result.error === "Email does not exist") {
          toast.error("Usuário não encontrado")
        } else {
          toast.error("Senha incorreta")
        }
        return
      }
    } catch (err) {
      console.error(err)
    }
  }, [email, password])

  const register = useCallback(async () => {
    try {
      await axios.post("/api/register", {
        email,
        name,
        password,
        confirmPassword,
      })

      login()
    } catch (error) {
      //@ts-ignore
      const errorString = (error as AxiosError).response?.data.error

      if (errorString === "Passwords do not match") {
        toast.error("As senhas precisam ser iguais")
      } else if (errorString === "User already exists") {
        toast.error("Esse usuário ja existe")
      } else if (
        errorString === "Password must be at least 6 characters long"
      ) {
        toast.error("A senha precisa ter pelo menos 6 caracteres")
      } else {
        toast.error("Preencha todos os campos")
      }
    }
  }, [email, name, password, login, confirmPassword])

  useEffect(() => {
    if (session) {
      router.push("/")
    }
  }, [session])

  return (
    <main className="flex h-screen w-full items-center justify-evenly p-5">
      <section className="mx-auto md:mx-0">
        <div className="flex items-center gap-3">
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
        </div>

        <div className="mt-5">
          <h2 className="text-3xl font-bold">
            {variant === "login" ? "Entrar" : "Cadastrar"}
          </h2>
          <p className="text-sm text-gray-500">
            ServiceFy, conectando quem oferece e quem busca serviços.
          </p>
        </div>
        <hr className="opacity-1 mt-5" />

        <div className="mt-5 flex flex-col items-center justify-center gap-3">
          {variant === "register" && (
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="name">Nome</Label>
              <Input
                type="text"
                id="name"
                placeholder="Nome"
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          )}

          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="email">Email</Label>
            <Input
              type="email"
              id="email"
              placeholder="Email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="grid w-full max-w-sm items-center gap-1.5">
            <Label htmlFor="password">Senha</Label>
            <Input
              type="password"
              id="password"
              placeholder="Senha"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {variant === "register" && (
            <div className="grid w-full max-w-sm items-center gap-1.5">
              <Label htmlFor="confirmPassword">Confirme sua senha</Label>
              <Input
                type="password"
                id="confirmPassword"
                placeholder="Confirme sua senha"
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          )}

          <Button
            className="text-bold w-full max-w-sm text-gray-50"
            variant={"submit"}
            onClick={variant === "login" ? login : register}
          >
            {variant === "login" ? "Entrar" : "Cadastrar"}
          </Button>
        </div>
        <p className="mt-6 text-neutral-500">
          {variant === "login" ? "Novo por aqui?" : "Já tem uma conta?"}

          <span
            onClick={toggleVariant}
            className="ml-1 cursor-pointer font-bold text-[#5669FF] hover:underline"
          >
            {variant === "login" ? "Cadastre-se." : "Entrar"}
          </span>
        </p>
      </section>
      <Image
        src="/auth-bg.svg"
        alt="ServiceFy logo"
        width={300}
        height={300}
        priority
        className="hidden md:block"
      />
    </main>
  )
}

export default Auth
