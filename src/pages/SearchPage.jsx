import React from 'react'

import { FaSearch } from "react-icons/fa"
import "./SearchBar.css"

function SearchBar() {
    return (
      <>
        <div className='input-wrapper'>
            <FaSearch id="search-id"/> 
            <input placeholder="Type to search..."/>
          <div>Search Results</div>
        </div>
      </>
    )
  }
  
  export default SearchBar();
  