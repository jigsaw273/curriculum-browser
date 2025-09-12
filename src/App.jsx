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
import ForwardPlannerCard from "./features/temp/ForwardPlannerCard";
import CourseInfoPage from "./pages/CourseInfoPage";
import RequisiteFinder from "./features/temp/RequisiteFinder";
import YearPlannerPage from "./pages/YearPlannerPage";
import DragDropPage from "./pages/DragDropPage";

function App() {
  const [navVisible, setNavVisible] = useState(true);
  const toggleNav = () => setNavVisible(!navVisible);

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-off-white">
        {/* Top bar */}
        <header className="w-full h-12 bg-gray-200 flex items-center px-4 justify-between">
          <h1 className="text-lg font-semibold">Logo</h1>
          <button
            onClick={toggleNav}
            className="px-2 py-1 text-sm bg-dark-green rounded hover:bg-gray-400"
          >
            {navVisible ? "<" : ">"}
          </button>
        </header>

        {/* Sidebar + main content */}
        <div className="flex flex-1 relative">
          {/* Sidebar */}
          <nav
            className={`bg-dark-green w-64 p-4 flex flex-col gap-4 absolute top-0 left-0 h-full transform transition-transform duration-300 ${
              navVisible ? "translate-x-0" : "-translate-x-full"
            }`}
          >
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
            <Link
              to="/yearplanner"
              className="text-white px-4 py-2 rounded hover:bg-[#0e2424]"
            >
              Year Planner
            </Link>
            {/* <button
              onClick={toggleNav}
              className="px-2 py-1 text-sm bg-dark-green rounded hover:bg-gray-400"
            >
              {navVisible ? "<" : ">"}
            </button> */}
          </nav>

          {/* Main content */}
          <main
            className={`flex-1 p-4 transition-all duration-300 ${navVisible ? "ml-64" : "ml-0"}`}
          >
            <Routes>
              <Route path="/search" element={<SearchPage />} />
              <Route path="/tree" element={<ForwardPlannerCard />} />
              <Route path="/degree" element={<ForwardPlanner />} />
              <Route path="/requisites" element={<DragDropPage />} />
              <Route path="/yearplanner" element={<YearPlannerPage />} />
              <Route path="/" element={<Navigate to="/search" replace />} />
              <Route
                path="/course/:courseCode/:courseNum"
                element={<CourseInfoPage />}
              />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;
