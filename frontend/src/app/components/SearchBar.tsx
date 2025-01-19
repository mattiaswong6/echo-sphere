'use client'

import React, { useState } from "react";

export default function SearchBar() {
    const [searchQuery, setSearchQuery] = useState("");

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
      };
    
    //   const handleSearch = () => {
    //     alert(`Searching for: ${searchQuery}`);
    //   };

  return (
    <div>
        <input
            type="text"
            value={searchQuery}
            onChange={handleInputChange}
            placeholder="Search..."
            className="w-96 px-4 py-2 border rounded-2xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
          />
    </div>
  )
}