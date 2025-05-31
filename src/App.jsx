import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import './App.css';
import CourseFlow from './pages/CourseFlow';
import SearchContainer from './components/SearchContainer';
import TableSearchResults from './components/TableSearchResults';

function App() {
  const [results, setResults] = useState([]);

  return (
    <Router>
      <div className="app">
        <nav className="app-nav">
          <Link to="/search" className="nav-link">Course Search</Link>
          <Link to="/prerequisites" className="nav-link">Dependency Graph</Link>
        </nav>

        <main className="app-content">
          <Routes>
            <Route path="/search" element={
              <>
                <SearchContainer setResults={setResults} />
                <TableSearchResults results={results} />
              </>
            } />
            <Route path="/prerequisites" element={<CourseFlow />} />
            <Route path="/" element={<Navigate to="/search" replace />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;


// import React, { useState } from 'react'
// import './App.css'
// //import Search from './components/SearchBar'
// import CourseFlow from './pages/CourseFlow.jsx'
// import SearchContainer from './components/SearchContainer.jsx'
// // import Filters from './components/Filters.jsx'
// // import {data} from './data.js'
// //import { SearchResultList } from './components/SearchResultList.jsx'
// import TableSearchResults from './components/TableSearchResults.jsx'


// function App() {
//   const [results, setResults] = useState([])

//   return (
//     <>
//       <nav>
//         <a href="/html/">Search</a> 
//         <a href="/css/">Prerequistes</a> 
//       </nav>
//       <div className='search-container'>
//         <SearchContainer setResults={setResults}/>
//         <TableSearchResults results ={results}/>
//         <CourseFlow/>
//       </div>
//       <div id='courseflow-container'>
        
//       </div> 
//     </>
//   )
// }

// export default App
