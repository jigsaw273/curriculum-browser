import { useState } from "react";
import "./SearchBar.css";

export default function SearchBar({ setSearchInput }) {
  const [input, setInput] = useState("");

  const handleChange = (value) => {
    setInput(value); // replacing the state (not mutating)
    setSearchInput(value); // passing value to parent
  };

  return (
    <div className="search-bar-wrapper">
      <input
        placeholder="Type to search..."
        value={input}
        onChange={(e) => handleChange(e.target.value)}
      />
    </div>
  );
}
