import { useForwardPlanner } from "../hooks/useForwardPlanner.js";
import { courseDependencies } from "../data/courses.js";
import useCourseSearch from "../hooks/useCourseSearch.js";
import SearchBar from "../features/search/SearchBar.jsx";
import { useState } from "react";
// import "./ForwardPlannerCard.css";

export default function ExtendedCourseFlow() {
  const { searchInput, setSearchInput, results } = useCourseSearch();
  const [takenCourses, setTakenCourses] = useState([]);
  const { selectedCourses, toggleCourse, possibleUnlocks, unlockedCourses } =
    useForwardPlanner();

  function addCourse(course) {
    const alreadyExists = takenCourses.some(
      (c) => c.courseId === course.courseId
    );

    if (alreadyExists) return;
    toggleCourse(course.courseId);
    setTakenCourses((prev) => [...prev, course]);
  }
  function removeCourse(course) {
    setTakenCourses((prev) =>
      prev.filter((c) => !(c.courseId === course.courseId))
    );
    toggleCourse(course.courseId);
  }

  return (
    <div className="App">
      <SearchBar setSearchInput={setSearchInput} />
      <div>
        {results.map((course) => (
          <div
            className="p-4 bg-gray-200 m-4 hover:bg-gray-300"
            key={course.courseId}
            onClick={() => addCourse(course)}
          >
            <h1>
              {course.courseId} - {course.courseName}
            </h1>
          </div>
        ))}
      </div>
      <header className="App-header">
        {takenCourses.map((course) => (
          <button
            key={course.courseId}
            onClick={() => removeCourse(course)}
            //if the id is in the list of selected courses then mark className as 'selected'
            // className={
            //   selectedCourses.includes(course.courseName) ? "selected" : ""
            // }
          >
            {course.courseName}
          </button>
        ))}
        <div>
          <button>Calculate</button>
        </div>

        <div className="card">
          <h3>True Unlock</h3>
          {unlockedCourses.map((e) => (
            <p key={e}>{e}</p>
          ))}
        </div>

        <div className="card">
          <h3>Possible Unlocks</h3>
          {possibleUnlocks.map((e) => (
            <p key={e}>{e}</p>
          ))}
        </div>
      </header>
    </div>
  );
}
