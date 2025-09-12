import { useState } from "react";
import { DndContext, useDraggable, useDroppable } from "@dnd-kit/core";
import useCourseSearch from "../hooks/useCourseSearch";
import SearchBar from "../features/search/SearchBar";

export default function YearPlannerPage() {
  const { searchInput, setSearchInput, results } = useCourseSearch();

  const [columns, setColumns] = useState({
    plan: [],
    sem1: [],
    sem2: [],
  });

  function addCourse(course) {
    setColumns((prev) => {
      // Avoid duplicates in "plan"
      if (
        prev.plan.some(
          (c) =>
            c.course_code === course.course_code &&
            c.course_num === course.course_num
        )
      ) {
        return prev;
      }
      return {
        ...prev,
        plan: [...prev.plan, course],
      };
    });
  }

  function onDragEnd({ over, active }) {
    if (!over) return;

    const sourceCol = Object.keys(columns).find((col) =>
      columns[col].some((c) => c.course_code + c.course_num === active.id)
    );

    if (!sourceCol) return;

    const movedCourse = columns[sourceCol].find(
      (c) => c.course_code + c.course_num === active.id
    );

    if (sourceCol === over.id) return; // dropped in same column, do nothing

    setColumns((prev) => {
      const newCols = { ...prev };
      newCols[sourceCol] = newCols[sourceCol].filter(
        (c) => c.course_code + c.course_num !== active.id
      );
      newCols[over.id] = [...newCols[over.id], movedCourse];
      return newCols;
    });
  }

  return (
    <>
      <SearchBar setSearchInput={setSearchInput} />

      <div className="flex gap-8 mt-4">
        <div>
          <h1 className="font-bold mb-2">Search Results</h1>
          {results.map((course) => (
            <div
              className="p-2 bg-gray-200 mb-2 hover:bg-gray-300 rounded cursor-pointer"
              key={course.course_code + course.course_num}
              onClick={() => addCourse(course)}
            >
              {course.course_code + course.course_num} - {course.course_name}
            </div>
          ))}
        </div>

        <DndContext onDragEnd={onDragEnd}>
          <DroppableColumn
            id="plan"
            title="Plan to Take"
            courses={columns.plan}
          />
          <DroppableColumn
            id="sem1"
            title="Semester 1"
            courses={columns.sem1}
          />
          <DroppableColumn
            id="sem2"
            title="Semester 2"
            courses={columns.sem2}
          />
        </DndContext>
      </div>
    </>
  );

  function DraggableCourse({ course }) {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
      id: course.course_code + course.course_num,
    });

    const style = {
      transform: transform
        ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
        : undefined,
      padding: "12px",
      marginBottom: "8px",
      background: "rgb(199 210 254)", // indigo-200
      borderRadius: "8px",
      cursor: "grab",
    };

    return (
      <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
        {course.course_code + course.course_num} - {course.course_name}
      </div>
    );
  }

  function DroppableColumn({ id, title, courses, children }) {
    const { setNodeRef, isOver } = useDroppable({ id });

    return (
      <div
        ref={setNodeRef}
        className={`p-4 w-64 min-h-[200px] rounded ${
          isOver ? "bg-green-200" : "bg-gray-100"
        }`}
      >
        <h2 className="font-bold mb-2">{title}</h2>
        {courses.map((c) => (
          <DraggableCourse key={c.course_code + c.course_num} course={c} />
        ))}
        {children}
      </div>
    );
  }
}
