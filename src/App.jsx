import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import "./App.css";
import CourseFlow from "./pages/CourseFlow";
import DegreePlanner from "./pages/DegreePlanner";
import ExplorationPage from "./pages/ExplorationPage";
import SearchPage from "./pages/SearchPage";
import PlannerPage from "./pages/PlannerPage";
import ForwardPlanner from "./features/forwardplanner/ForwardPlanner";
import RequisiteFinder from "./features/forwardplanner/RequisiteFinder";

function App() {
  return (
    <Router>
      <div className="app">
        <nav className="app-nav">
          <Link to="/search" className="nav-link">
            Course Search
          </Link>
          <Link to="/tree" className="nav-link">
            Dependency Graph
          </Link>
          <Link to="/degree" className="nav-link">
            Forward Planner
          </Link>
          <Link to="/requisites" className="nav-link">
            Requisite Finder
          </Link>
        </nav>

        <main className="app-content">
          <Routes>
            <Route path="/search" element={<SearchPage />} />
            <Route path="/tree" element={<ForwardPlanner />} />
            <Route path="/degree" element={<CourseFlow />} />
            <Route path="/requisites" element={<RequisiteFinder />} />
            <Route path="/" element={<Navigate to="/search" replace />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
