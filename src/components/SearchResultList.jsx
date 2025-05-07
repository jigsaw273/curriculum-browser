import { useState } from "react";

export const SearchResultList = ({ results }) => {
    return (
        <div className="search-results">
            {
                results.map((result, id) => {
                    return <div key={id}>{result.name}</div>
                })
            }
        </div>
    )
}