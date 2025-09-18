import { useState } from "react";

export default function SearchBar({ setSearchInput }) {
  const [input, setInput] = useState("");

  const handleChange = (value) => {
    setInput(value); // replacing the state (not mutating)
    setSearchInput(value); // passing value to parent
  };

  return (
    <div className="search-bar-wrapper">
      <input
        placeholder="Search for courses..."
        value={input}
        onChange={(e) => handleChange(e.target.value)}
        className="w-full py-4 px-6 border-none rounded-lg text-base bg-white text-[#2b2b2b] outline-none focus:ring-2 focus:ring-[rgb(199,230,202)] font-[Lexend]"
      />
    </div>
  );
}
