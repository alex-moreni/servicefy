import Image from "next/image"
import { useEffect, useState } from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import axios from "axios"
import { Button } from "./ui/button"
import Modal from "./modal"
import { Label } from "./ui/label"
import { addInfoUser } from "@/actions/add-info-user"
import { toast } from "sonner"

const AdditionalInfo = ({ id, email }: any) => {
  const [optionRole, setOptionRole] = useState("")
  const [optionUserUF, setOptionUserUF] = useState("")
  const [optionUserCity, setOptionUserCity] = useState("")

  const [optionsCity, setOptionsCity] = useState([])
  const [optionsUF, setOptionsUF] = useState([])

  const [modalOpen, setModalOpen] = useState(true)
  const closeModal = () => {
    setModalOpen(false)
  }

  useEffect(() => {
    const fetch = async () => {
      await axios
        .get("https://brasilapi.com.br/api/ibge/uf/v1")
        .then((response) => {
          setOptionsUF(response.data)
        })
    }

    fetch()
  }, [])

  useEffect(() => {
    if (!optionUserUF) {
      return
    }

    const fetch = async () => {
      await axios
        .get(`https://brasilapi.com.br/api/ibge/municipios/v1/${optionUserUF}`)
        .then((response) => {
          setOptionsCity(response.data)
        })
    }
    fetch()
  }, [optionUserUF])

  const saveInfoCepAndRole = async () => {
    try {
      await addInfoUser({
        id,
        email,
        accountType: optionRole,
        city: optionUserCity,
      })
      toast.success("Informações adicionais salvas com sucesso!")
      closeModal()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <Modal isOpen={modalOpen} onClose={closeModal}>
      <main className="flex flex-col items-center justify-center space-y-5 p-5">
        <h1 className="text-2xl">Informações adicionais</h1>

        {!optionRole ? (
          <>
            {" "}
            <button
              onClick={() => setOptionRole("client")}
              className="flex max-w-md items-center rounded-md bg-[#5669FF] p-3 text-foreground hover:bg-[#5669FF]/90"
            >
              <div>
                <h1 className="text-xl font-bold">
                  Procurando um especialista
                </h1>
                <p className="text-sm text-black">
                  Para fazer qualquer tipo de pedido ou para procurar um
                  profissional.
                </p>
              </div>
              <Image src={"/client-img.svg"} alt="" width={200} height={200} />
            </button>
            <button
              onClick={() => setOptionRole("specialist")}
              className="flex max-w-md items-center rounded-md bg-[#5669FF] p-3 text-foreground hover:bg-[#5669FF]/90"
            >
              <div>
                <h1 className="text-xl font-bold">
                  Eu quero encontrar um emprego
                </h1>
                <p className="text-sm text-black">
                  Pesquise e execute ordens no seu ramo de atividade
                </p>
              </div>
              <Image
                src={"/specialist-img.svg"}
                alt=""
                width={200}
                height={200}
              />
            </button>
          </>
        ) : (
          <>
            <div className="mx-auto space-y-6">
              <div>
                <Label>Estado:</Label>
                <Select onValueChange={setOptionUserUF}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Qual seu estado?" />
                  </SelectTrigger>
                  <SelectContent>
                    {optionsUF?.map((uf) => (
                      <SelectItem key={uf["id"]} value={uf["sigla"]}>
                        {uf["nome"]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Cidade:</Label>
                <Select
                  disabled={!optionUserUF}
                  onValueChange={setOptionUserCity}
                >
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Qual sua cidade?" />
                  </SelectTrigger>
                  <SelectContent>
                    {optionsCity?.map((city) => (
                      <SelectItem
                        key={city["codigo_ibge"]}
                        value={city["nome"]}
                      >
                        {city["nome"]}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </>
        )}

        <div className="flex space-x-5">
          {optionRole && (
            <Button
              onClick={() => {
                setOptionRole("")
                setOptionUserUF("")
                setOptionUserCity("")
              }}
              variant={"destructive"}
            >
              Voltar
            </Button>
          )}
          {optionUserCity && (
            <Button onClick={saveInfoCepAndRole} variant={"outline"}>
              Salvar
            </Button>
          )}
        </div>
      </main>
    </Modal>
  )
}

export default AdditionalInfo
