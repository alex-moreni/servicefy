import { db } from "@/lib/prisma"
import { MapPin } from "lucide-react"

interface CardSpecialistProps {
  quantity: number
  index: number
}

const CardSpecialist = async ({ quantity, index }: CardSpecialistProps) => {
  const specialists = await db.user.findMany({})

  return (
    <div className="lg:grid-ro mt-4 flex items-center gap-6 overflow-x-auto lg:grid-cols-2 lg:flex-wrap lg:justify-center [&::-webkit-scrollbar]:hidden">
      {specialists.slice(index, quantity + index).map((specialist, index) => (
        <div
          className="h-[350px] w-[270px] cursor-pointer rounded-lg shadow-xl"
          key={index}
        >
          <img
            src={specialist.image ? specialist.image : ""}
            alt=""
            className="h-[230px] w-full object-contain"
          />

          <div className="space-y-2 p-3">
            <p className="text-lg font-bold">{specialist.name}</p>
            <p className="flex gap-2">
              <MapPin color="blue" /> {specialist.city}
            </p>
            <p className="truncate text-sm text-gray-500">{specialist.about}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default CardSpecialist
