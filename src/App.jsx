import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import './App.css';
import CourseFlow from './pages/CourseFlow';
import SearchPage from './pages/SearchPage';

function App() {
  const [results, setResults] = useState([]);

  return (
    <Router>
      <div className="app">
        <nav className="app-nav">
          <Link to="/search" className="nav-link">Course Search</Link>
          <Link to="/prerequisites" className="nav-link">Dependency Graph</Link>
          <Link to="/degree" className="nav-link">Degree Pathways</Link>
        </nav>

        <main className="app-content">
          <Routes>
            <Route path="/search" element={<SearchPage />} /> 
            <Route path="/prerequisites" element={<CourseFlow />} />
            <Route path="/degree"/> 
            <Route path="/" element={<Navigate to="/search" replace />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;