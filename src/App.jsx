import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import "./App.css";
import ForwardPlanner from "./features/fowardplanner/ForwardPlanner";
import DegreePlanner from "./pages/DegreePlanner";
import ExplorationPage from "./pages/ExplorationPage";
import SearchPage from "./pages/SearchPage";
//import YearPlanner from "./pages/YearPlanner";
import ForwardPlannerCard from "./features/temp/ForwardPlannerCard";
import CourseInfoPage from "./pages/CourseInfoPage";
import RequisiteFinder from "./features/temp/RequisiteFinder";

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-off-white">
        <nav className="bg-dark-green p-4 flex gap-4">
          <Link
            to="/search"
            className="text-white px-4 py-2 rounded hover:bg-[#0e2424]"
          >
            Course Search
          </Link>
          <Link
            to="/tree"
            className="text-white px-4 py-2 rounded hover:bg-[#0e2424]"
          >
            Dependency Graph
          </Link>
          <Link
            to="/degree"
            className="text-white px-4 py-2 rounded hover:bg-[#0e2424]"
          >
            Forward Planner
          </Link>
          <Link
            to="/requisites"
            className="text-white px-4 py-2 rounded hover:bg-[#0e2424]"
          >
            Requisite Finder
          </Link>
        </nav>

        <main className="flex-1 p-4">
          <Routes>
            <Route path="/search" element={<SearchPage />} />
            <Route path="/tree" element={<ForwardPlannerCard />} />
            <Route path="/degree" element={<ForwardPlanner />} />
            <Route path="/requisites" element={<ExplorationPage />} />

            <Route path="/" element={<Navigate to="/search" replace />} />
            <Route
              path="/course/:courseCode/:courseNum"
              element={<CourseInfoPage />}
            />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
