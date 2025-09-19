import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import {
  FaProjectDiagram,
  FaCalendarDay,
  FaArrowRight,
  FaColumns,
  FaGraduationCap,
  FaAngleLeft,
  FaAngleRight,
} from "react-icons/fa";

import "./App.css";
import CourseGraphPage from "./pages/CourseGraphPage";
import CourseInfoPage from "./pages/CourseInfoPage";
import YearPlannerPage from "./pages/YearPlannerPage";
import MyTimetablePage from "./pages/MyTimetablePage";
import SearchPage from "./pages/SearchPage";
import ForwardPlannerPage from "./pages/ForwardPlannerPage";
import LandingPage from "./pages/LandingPage";
import RequisiteGraph from "./pages/RequisiteGraph";

function App() {
  const [collapsed, setCollapsed] = useState(false);

  const navLinks = [
    { to: "/search", label: "Course Search", icon: FaGraduationCap },
    { to: "/timetable", label: "My Timetable", icon: FaCalendarDay },
    { to: "/year-planner", label: "Year Planner", icon: FaColumns },
    { to: "/forward-planner", label: "Forward Planner", icon: FaArrowRight },
    { to: "/dependency-tree", label: "Dependencies", icon: FaProjectDiagram },
  ];

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-off-white">
        <header className="bg-[#31463e] text-[#31463e] py-2 px-4">
          Course Planner
        </header>

        <div className="flex flex-1 relative">
          <nav
            className={`bg-light-green p-4 flex flex-col gap-4 pt-4 absolute h-full transition-all duration-300 
              ${collapsed ? "w-20" : "w-64"}`}
          >
            <div className="flex items-center justify-between mb-6">
              {!collapsed && (
                <span
                  className={`text-[#125343] font-semibold text-lg mt-1 ml-3 transition-all duration-300 overflow-hidden ${
                    collapsed ? "opacity-0 w-0" : "opacity-100 w-auto"
                  }`}
                >
                  VUWPlanIt
                </span>
              )}

              <button
                onClick={() => setCollapsed(!collapsed)}
                className="flex items-center font-bold text-[#125343] !justify-center !bg-light-green hover:!bg-[#78b97c] !border-0 !border-dark-green !aspect-square h-10"
              >
                {collapsed ? <FaAngleRight /> : <FaAngleLeft />}
              </button>
            </div>

            <div className="flex flex-col gap-4">
              {navLinks.map(({ to, label, icon: Icon }) => (
                <Link
                  key={to}
                  to={to}
                  className="flex items-center gap-4 text-[#125343] px-4 py-2 rounded hover:bg-[#78b97c] transition-all duration-100"
                >
                  <Icon className="w-5 h-5 shrink-0" />
                  <span
                    className={`whitespace-nowrap transition-all duration-300 overflow-hidden ${
                      collapsed ? "opacity-0 w-0" : "opacity-100 w-auto"
                    }`}
                  >
                    {label}
                  </span>
                </Link>
              ))}
            </div>
          </nav>

          <main
            className={`flex-1 p-6 transition-all duration-300 ${
              collapsed ? "ml-20" : "ml-64"
            }`}
          >
            <Routes>
              <Route path="/search" element={<SearchPage />} />
              <Route path="/dependency-tree" element={<CourseGraphPage />} />
              <Route path="/timetable" element={<MyTimetablePage />} />
              <Route path="/year-planner" element={<YearPlannerPage />} />
              <Route path="/forward-planner" element={<ForwardPlannerPage />} />
              <Route path="/" element={<LandingPage />} />
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
