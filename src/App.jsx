import React, { useState } from 'react'
import './App.css'
import SearchBar from './components/SearchBar'
import {data} from './data.js'
import { SearchResultList } from './components/SearchResultList.jsx'

function App() {
  const [results, setResults] = useState([])

  return (
    <>
      <div className='search-container'>
        <SearchBar setResults={setResults}/>
        <SearchResultList results ={results}/>
      </div>
    </>
  )
}

export default App
