import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import {
  FaProjectDiagram,
  FaCalendarDay,
  FaArrowRight,
  FaColumns,
  FaGraduationCap,
  FaCaretLeft,
  FaCaretRight,
} from "react-icons/fa";
import "./App.css";
import ForwardPlanner from "./features/fowardplanner/ForwardPlanner";
import ForwardPlannerCard from "./features/temp/ForwardPlannerCard";
import CourseInfoPage from "./pages/CourseInfoPage";
import YearPlannerPage from "./pages/YearPlannerPage";
import MyTimetablePage from "./pages/MyTimetablePage";
import SearchPage from "./pages/SearchPage";
import ExtendedCourseFlow from "./pages/ExtendedCourseFlow";
import CurriculumGraph from "./pages/CurriculumGraph";

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
        <header className="bg-[#314638] text-white py-2 px-4">VUWPlanIt</header>

        <div className="flex flex-1 relative">
          <nav
            className={`bg-light-green p-4  flex flex-col gap-4 absolute h-full pt-16 transition-all duration-300 
              ${collapsed ? "w-20" : "w-64"}`}
          >
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
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="!bg-[#78b97c] !border-0"
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
