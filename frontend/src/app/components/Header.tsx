import Image from "next/image"
import Link from "next/link"
import SearchBar from "./SearchBar"

export default function Header() {
  return (
    <header className="bg-blue-300 text-black shadow-md h-24 flex justify-around items-center">
      <Link href="/">
          <Image
            src="/globe.svg"
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