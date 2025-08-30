import React, { useState } from "react";
import "./Filters.css";

const filterOptions = {
  courses: ["SWEN", "ENGR", "COMP", "NWEN", "AIML", "CYBR", "RESE"],
  yearlvl: ["100", "200", "300", "400", "500"],
  trimester: ["Trimester 1", "Trimester 2", "Trimester 3"],
};

export default function Filters({ onFilterChange }) {
  const [selectedFilters, setSelectedFilters] = useState({
    courses: [],
    yearlvl: [],
    trimester: [],
  });

  const handleFilterChange = (type, value) => {
    const newSelectedFilters = selectedFilters[type].includes(value)
      ? selectedFilters[type].filter((i) => i !== value)
      : [...selectedFilters[type], value];

    const newState = { ...selectedFilters, [type]: newSelectedFilters };
    setSelectedFilters(newState);
    onFilterChange(newState);
  };

  return (
    <div className="filter-container">
      {Object.entries(filterOptions).map(([category, options]) => (
        <div key={category}>
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
