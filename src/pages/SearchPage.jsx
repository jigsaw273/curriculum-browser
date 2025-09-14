// import { useState } from "react";
// import SearchLogicContainer from "../features/search/SearchLogicContainer";
// import TableSearchResults from "../features/search/TableSearchResults";
// import CardSearchResults from "../features/search/CardSearchResults";

// export default function SearchPage() {
//   const [results, setResults] = useState([]);
//   return (
//     <>
//       <SearchLogicContainer setResults={setResults} />
//       <TableSearchResults results={results} />
//       {/* <CardSearchResults results={results} /> */}
//     </>
//   );
// }

import React, { useState, useEffect } from "react";
import Filters from "../features/search/Filters.jsx";
import SearchBar from "../features/search/SearchBar.jsx";
import useCourseSearch from "../hooks/useCourseSearch.js";
import TableSearchResults from "../features/search/TableSearchResults.jsx";

export default function SearchPage() {
  const { searchInput, setSearchInput, filters, setFilters, results } =
    useCourseSearch();
  const [displayResults, setDisplayResults] = useState([]);

  useEffect(() => {
    setDisplayResults(results);
  }, [results]);

  return (
    <>
      <div className="flex justify-center gap-8 p-6">
        <div className="flex-1">
          <SearchBar setSearchInput={setSearchInput} />
          <TableSearchResults results={results} />
        </div>
        <div className="w-64 shrink-0">
          <Filters onFilterChange={setFilters} />
        </div>
      </div>
    </>
  );
}
