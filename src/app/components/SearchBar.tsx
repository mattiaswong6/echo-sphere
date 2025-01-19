'use client'

import React, { useState } from "react";
import { IoSearchSharp } from "react-icons/io5";

export default function SearchBar() {
    const [searchQuery, setSearchQuery] = useState("");

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
      };
    
    //   const handleSearch = () => {
    //     alert(`Searching for: ${searchQuery}`);
    //   };

  return (
    <div className="flex w-96 space-x-2 px-5 py-2 border rounded-2xl shadow-sm bg-[#FFFFFF]">
        <IoSearchSharp className="h-6"/>
        <input
            type="text"
            value={searchQuery}
            onChange={handleInputChange}
            placeholder="Search"
            className="mr-3 w-full outline-none"
          />
    </div>
  )
}