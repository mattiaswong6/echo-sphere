import Image from "next/image"
import Link from "next/link"
import SearchBar from "./SearchBar"
import logo from './echosphere.png'

export default function Header() {
  return (
    <header className="bg-[#1A181B] text-black shadow-md h-24 mb-4 flex justify-between w-11/12 items-center">
      <Link href="/">
          <Image
            src={logo}
            alt="Logo"
            width={70}
            height={70}
          />
      </Link>
      <SearchBar/>
      <Link href="/">
          <Image
            src="user-assets/default-profile.svg"
            alt="Profile Picture"
            width={50}
            height={50}
          />
      </Link>
    </header>
  )
}