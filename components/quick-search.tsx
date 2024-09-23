import Link from "next/link"
import { Button } from "./ui/button"
import Image from "next/image"
import { quickSearchOptions } from "@/constants/search"

const QuickSearch = () => {
  return (
    <div className="custom-scrollbar [&::-webkit-scrollbar-thumb] flex gap-4 overflow-auto pb-3 [&::-webkit-scrollbar]:hidden">
      {quickSearchOptions.map((option) => (
        <Button
          className="max-w-[250px] gap-2"
          variant="secondary"
          key={option.title}
          asChild
        >
          <Link href={`/freelancers?categoria=${option.link}`}>
            <Image
              src={option.imageUrl}
              width={16}
              height={16}
              alt={option.title}
            />
            {option.title}
          </Link>
        </Button>
      ))}
    </div>
  )
}

export default QuickSearch
