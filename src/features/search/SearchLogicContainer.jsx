import React, { useState, useEffect } from "react";
import Filters from "./Filters.jsx";
import SearchBar from "./SearchBar.jsx";
import useCourseSearch from "../../hooks/useCourseSearch.js";
// import "./SearchContainer.css";

export default function SearchLogicContainer({ setResults }) {
  const { searchInput, setSearchInput, filters, setFilters, results } =
    useCourseSearch();
  const [displayResults, setDisplayResults] = useState([]);

  useEffect(() => {
    setDisplayResults(results);
  }, [results]);

  return (
    <>
      <SearchBar setSearchInput={setSearchInput} />
      <div className="filters-sidebar">
        <Filters onFilterChange={setFilters} />
      </div>
      <TableSearchResults results={results} />
    </>
  );
}
