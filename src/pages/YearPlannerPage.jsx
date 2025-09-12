import { useState } from "react";
import useCourseSearch from "../hooks/useCourseSearch";
import SearchBar from "../features/search/SearchBar";
import { DndContext, useDraggable, useDroppable } from "@dnd-kit/core";

export default function YearPlannerPage() {
  const { searchInput, setSearchInput, results } = useCourseSearch();
  const [selectedCourses, setSelectedCourses] = useState([]);

  function addCourse(course) {
    setSelectedCourses((prev) => {
      // Avoid duplicates
      if (
        prev.some(
          (c) =>
            c.course_code === course.course_code &&
            c.course_num === course.course_num
        )
      ) {
        return prev;
      }
      return [...prev, course];
    });
  }

  function removeCourse(course) {
    setSelectedCourses((prev) =>
      // Avoid duplicates
      prev.filter(
        (c) =>
          !(
            c.course_code === course.course_code &&
            c.course_num === course.course_num
          )
      )
    );
  }

  return (
    <>
      <SearchBar setSearchInput={setSearchInput} />
      <div className="flex gap-8 mt-4">
        <div>
          {results.map((course) => (
            <div
              className="p-4 bg-gray-200 m-4 hover:bg-gray-300"
              key={course.course_code + course.course_num}
              onClick={() => addCourse(course)}
            >
              <h1>
                {course.course_code + course.course_num} - {course.course_name}
              </h1>
            </div>
          ))}
        </div>
        <div>
          <h1>
            <b>Plan to Take Courses</b>
          </h1>
          {selectedCourses.map((selected) => (
            <div
              className="p-4 bg-indigo-200 m-4 hover:bg-indigo-400"
              key={selected.course_code + selected.course_num}
              onClick={() => removeCourse(selected)}
            >
              <h1>
                {selected.course_code + selected.course_num} -{" "}
                {selected.course_name}
              </h1>
            </div>
          ))}
        </div>
        <div className="flex max-w-1/3 bg-lime-100">Sem 1</div>
        <div className="flex max-w-1/3 bg-fuchsia-100">Sem 2</div>
      </div>
    </>
  );
}
