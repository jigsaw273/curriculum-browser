import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import {
  FaSearch,
  FaProjectDiagram,
  FaCalendarDay,
  FaList,
  FaLayerGroup,
  FaArrowRight,
} from "react-icons/fa";
import "./App.css";
import ForwardPlanner from "./features/fowardplanner/ForwardPlanner";
import ForwardPlannerCard from "./features/temp/ForwardPlannerCard";
import CourseInfoPage from "./pages/CourseInfoPage";
import YearPlannerPage from "./pages/YearPlannerPage";
import MyTimetablePage from "./pages/MyTimetablePage";
import SearchPage from "./pages/SearchPage";
import ExtendedCourseFlow from "./pages/ExtendedCourseFlow";

function App() {
  const [navVisible, setNavVisible] = useState(true);

  const navLinks = [
    { to: "/search", label: "Course Search", icon: FaSearch },
    { to: "/tree", label: "Dependency Graph", icon: FaProjectDiagram },
    { to: "/degree", label: "Forward Planner", icon: FaCalendarDay },
    { to: "/requisites", label: "My Timetable", icon: FaList },
    { to: "/yearplanner", label: "Year Planner", icon: FaLayerGroup },
    { to: "/fplanner", label: "Extended", icon: FaArrowRight },
  ];

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-off-white">
        {/* Top bar
        <header className="w-full h-12 bg-gray-200 flex items-center px-4 justify-between">
          <h1 className="text-lg font-semibold">Logo</h1>
          <button
            onClick={toggleNav}
            className="px-2 py-1 text-sm bg-dark-green rounded hover:bg-gray-400"
          >
            {navVisible ? "<" : ">"}
          </button>
        </header> */}

        {/* Sidebar + main content */}
        <div className="flex flex-1 relative">
          {/* Sidebar */}
          <nav
            className={`bg-dark-green w-64 p-4 flex flex-col gap-4 absolute top-0 left-0 h-full transform transition-transform duration-300 pt-14 ${
              navVisible ? "translate-x-0" : "-translate-x-full"
            }`}
          >
            {navLinks.map(({ to, label, icon: Icon }) => (
              <Link
                key={to}
                to={to}
                className="flex items-center gap-4 text-white px-4 py-2 rounded hover:bg-[#0e2424]"
              >
                <Icon className="w-5 h-5" />
                {label}
              </Link>
            ))}
          </nav>

          {/* Main content */}
          <main
            className={`flex-1 p-6 transition-all duration-300 ${
              navVisible ? "ml-64" : "ml-0"
            }`}
          >
            <Routes>
              <Route path="/search" element={<SearchPage />} />
              <Route path="/tree" element={<ForwardPlannerCard />} />
              <Route path="/degree" element={<ForwardPlanner />} />
              <Route path="/requisites" element={<MyTimetablePage />} />
              <Route path="/yearplanner" element={<YearPlannerPage />} />
              <Route path="/fplanner" element={<ExtendedCourseFlow />} />
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
