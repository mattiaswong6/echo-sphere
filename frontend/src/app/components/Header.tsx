import Image from "next/image"
import Link from "next/link"
import SearchBar from "./SearchBar"
import logo from './echosphere.png'

export default function Header() {
  return (
    <header className="bg-[#1A181B] text-black shadow-md h-24 flex justify-around items-center">
      <Link href="/">
          <Image
            src={logo}
            alt="Logo"
            width={50}
            height={50}
          />
      </Link>
      <SearchBar/>
      <Link href="/">
          <Image
            src="/empty-profile.svg"
            alt="Profile Picture"
            width={50}
            height={50}
          />
      </Link>
    </header>
  )
}