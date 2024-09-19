import Link from "next/link"
import { Button } from "./ui/button"
import { SheetClose } from "./ui/sheet"

interface ItemSidebarProps {
  Icon?: any
  title: string
  link: string
}

const ItemSidebar = ({ Icon, title, link }: ItemSidebarProps) => {
  return (
    <SheetClose asChild>
      <Button className="justify-start gap-2" variant="ghost" asChild>
        <Link href={link}>
          {" "}
          {Icon && <Icon size={18} />}
          <span className="capitalize">{title}</span>
        </Link>
      </Button>
    </SheetClose>
  )
}

export default ItemSidebar
