import React, { useState, useEffect } from "react";
import Filters from "../features/search/Filters.jsx";
import SearchBar from "../features/search/SearchBar.jsx";
import useCourseSearch from "../hooks/useCourseSearch.js";
import TableSearchResults from "../features/search/TableSearchResults.jsx";
import CardSearchResults from "../features/search/CardSearchResults.jsx";

export default function SearchPage() {
  const { searchInput, setSearchInput, filters, setFilters, results } =
    useCourseSearch();
  const [displayResults, setDisplayResults] = useState([]);
  const [tableDisplay, setTableDisplay] = useState(true);

  useEffect(() => {
    setDisplayResults(results);
  }, [results]);

  return (
    <>
      <div className="flex justify-center gap-8 p-6">
        <div className="flex-1">
          <SearchBar setSearchInput={setSearchInput} />
          {tableDisplay ? (
            <TableSearchResults results={results} />
          ) : (
            <CardSearchResults results={results} />
          )}
        </div>
        <div className="w-64 shrink-0">
          <button
            className="w-full !m-0 !mb-5 !bg-dark-green text-white !py-4"
            onClick={() => {
              setTableDisplay(!tableDisplay);
            }}
          >
            {tableDisplay ? "Show as Cards" : "Show as Table"}
          </button>
          <Filters onFilterChange={setFilters} />
        </div>
      </div>
    </>
  );
}
