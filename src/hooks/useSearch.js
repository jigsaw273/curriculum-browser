import { useState, useMemo, useCallback } from "react";

export function useSearch(data, searchKeys = []) {
  const [searchInput, setSearchInput] = useState("");

  const searchResults = useMemo(() => {
    // Nothing is being searched
    if (!searchInput.trim()) {
      return data;
    }

    return data;
  });
}
