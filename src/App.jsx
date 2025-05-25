import React, { useState } from 'react'
import './App.css'
//import Search from './components/SearchBar'
import SearchContainer from './components/SearchContainer.jsx'
// import Filters from './components/Filters.jsx'
// import {data} from './data.js'
//import { SearchResultList } from './components/SearchResultList.jsx'
import TableSearchResults from './components/TableSearchResults.jsx'


function App() {
  const [results, setResults] = useState([])

  return (
    <>
      <div className='search-container'>
        <SearchContainer setResults={setResults}/>
        <TableSearchResults results ={results}/>
      </div>
      
    </>
  )
}

export default App
