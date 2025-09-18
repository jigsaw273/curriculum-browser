import React, { useState } from "react";

const filterOptions = {
  courses: ["SWEN", "ENGR", "COMP", "NWEN", "AIML", "CYBR", "RESE", "EEEN"],
  year: ["100", "200", "300", "400", "500"],
  trimester: ["Trimester 1", "Trimester 2", "Trimester 3"],
};

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

  const handleClear = () => {
    const newState = {
      courses: [],
      year: [],
      trimester: [],
    };
    setSelectedFilters(newState);
    onFilterChange(newState);
  };

  return (
    <div className="flex flex-col gap-6 bg-white p-6 rounded-[10px] shadow-md">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-normal font-[Lexend]">Filters</h2>
        <h2
          onClick={handleClear}
          className="font-[Lexend] text-error-red hover:text-red-hover cursor-pointer"
        >
          Clear Filters
        </h2>
      </div>

      {Object.entries(filterOptions).map(([category, options]) => (
        <div key={category} className="flex flex-col gap-2">
          <h4 className="text-base font-normal text-[#444] mb-1 border-b border-[#eee] pb-1">
            {category.charAt(0).toUpperCase() + category.slice(1)}
          </h4>

          {options.map((option) => (
            <label
              key={option}
              className="flex items-center gap-2 text-[0.9rem] text-[#333] font-light cursor-pointer"
            >
              <input
                type="checkbox"
                value={option}
                checked={selectedFilters[category].includes(option)}
                onChange={() => handleFilterChange(category, option)}
                className="accent-accent-purple w-4 h-4 cursor-pointer"
              />
              <span>{option}</span>
            </label>
          ))}
        </div>
      ))}
    </div>
  );
}
