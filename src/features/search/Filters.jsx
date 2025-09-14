import React, { useState } from "react";
import "./Filters.css";

const filterOptions = {
  courses: ["SWEN", "ENGR", "COMP", "NWEN", "AIML", "CYBR", "RESE", "EEEN"],
  year: ["100", "200", "300", "400", "500"],
  trimester: ["Trimester 1", "Trimester 2", "Trimester 3"],
};

// Just changes the "selected filters" but doesnt apply those changes to the search results
export default function Filters({ onFilterChange }) {
  const [selectedFilters, setSelectedFilters] = useState({
    courses: [],
    year: [],
    trimester: [],
  });

  const handleFilterChange = (category, value) => {
    const newSelectedFilters = selectedFilters[category].includes(value)
      ? selectedFilters[category].filter((i) => i !== value)
      : [...selectedFilters[category], value];

    const newState = { ...selectedFilters, [category]: newSelectedFilters };
    setSelectedFilters(newState);
    onFilterChange(newState);
  };

  return (
    <div className="filter-container">
      <h2 className="font-[Lexend]">Filters</h2>
      {Object.entries(filterOptions).map(([category, options]) => (
        <div key={category}>
          <h4 className="my-2">
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </h4>
          {options.map((option) => (
            <label className="filter-checkbox" key={option}>
              <input
                type="checkbox"
                value={option}
                checked={selectedFilters[category].includes(option)}
                onChange={() => handleFilterChange(category, option)}
              />
              <span className="checkmark">{option}</span>
            </label>
          ))}
        </div>
      ))}
    </div>
  );
}
