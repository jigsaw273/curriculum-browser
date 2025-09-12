import { useState } from "react";
import SearchLogicContainer from "../features/search/SearchLogicContainer";
import TableSearchResults from "../features/search/TableSearchResults";
import CardSearchResults from "../features/search/CardSearchResults";

export default function SearchPage() {
  const [results, setResults] = useState([]);
  return (
    <>
      <SearchLogicContainer setResults={setResults} />
      <TableSearchResults results={results} />
      {/* <CardSearchResults results={results} /> */}
    </>
  );
}
