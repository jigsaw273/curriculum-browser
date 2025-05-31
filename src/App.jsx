import React, { useState } from 'react'
import './App.css'
//import Search from './components/SearchBar'
import CourseFlow from './pages/Flow.jsx'
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
        <CourseFlow/>
      </div>
      <div id='courseflow-container'>
        
      </div> 
    </>
  )
}

export default App
