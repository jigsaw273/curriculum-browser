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
  const [collapsed, setCollapsed] = useState(false);

  const navLinks = [
    { to: "/search", label: "Course Search", icon: FaSearch },
    { to: "/timetable", label: "My Timetable", icon: FaList },
    { to: "/year-planner", label: "Year Planner", icon: FaLayerGroup },
    { to: "/forward-planner", label: "Forward Planner", icon: FaArrowRight },
    { to: "/dependency-tree", label: "Dependencies", icon: FaCalendarDay },
  ];

  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-off-white">
        <header className="bg-[#4f5a55] text-white py-2 px-4">VUWCourse</header>

        <div className="flex flex-1 relative">
          <nav
            className={`bg-light-green p-4 flex flex-col gap-4 absolute h-full pt-16 transition-all duration-300 
              ${collapsed ? "w-20" : "w-64"}`}
          >
            {navLinks.map(({ to, label, icon: Icon }) => (
              <Link
                key={to}
                to={to}
                className="flex items-center gap-4 text-dark-green px-4 py-2 rounded hover:bg-[#90bb7c]"
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
            <button
              onClick={() => setCollapsed(!collapsed)}
              // className="!bg-light-green !border-0"
            >
              {collapsed ? ">" : "<"}
            </button>
          </nav>

          <main
            className={`flex-1 p-6 transition-all duration-300 ${
              collapsed ? "ml-20" : "ml-64"
            }`}
          >
            <Routes>
              <Route path="/search" element={<SearchPage />} />
              <Route path="/tree" element={<ForwardPlannerCard />} />
              <Route path="/dependency-tree" element={<ForwardPlanner />} />
              <Route path="/timetable" element={<MyTimetablePage />} />
              <Route path="/year-planner" element={<YearPlannerPage />} />
              <Route path="/forward-planner" element={<ExtendedCourseFlow />} />
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
