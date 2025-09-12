import { useState } from "react";
import useCourseSearch from "../hooks/useCourseSearch";
import SearchBar from "../features/search/SearchBar";
import { DndContext, useDraggable, useDroppable } from "@dnd-kit/core";

// helper for stable ids
const idFor = (c) => `${c.course_code}-${c.course_num}`;

export default function YearPlannerPage() {
  const { searchInput, setSearchInput, results } = useCourseSearch();
  const [selectedCourses, setSelectedCourses] = useState([]);

  const [columns, setColumns] = useState({
    plan: [],
    tri1: [],
    tri2: [],
  });

  function addCourse(course) {
    const alreadyExists = selectedCourses.some(
      (c) =>
        c.course_code === course.course_code &&
        c.course_num === course.course_num
    );

    if (alreadyExists) return;

    setSelectedCourses((prev) => [...prev, course]);

    setColumns((prev) => ({
      ...prev,
      plan: [...prev.plan, course],
    }));
  }

  function removeCourse(course) {
    // only remove if it's currently in plan
    const inPlan = columns.plan.some(
      (c) =>
        c.course_code === course.course_code &&
        c.course_num === course.course_num
    );
    if (!inPlan) return;

    setSelectedCourses((prev) =>
      prev.filter(
        (c) =>
          !(
            c.course_code === course.course_code &&
            c.course_num === course.course_num
          )
      )
    );

    // CORRECT: update columns object, not return an array
    setColumns((prev) => ({
      ...prev,
      plan: prev.plan.filter(
        (c) =>
          !(
            c.course_code === course.course_code &&
            c.course_num === course.course_num
          )
      ),
    }));
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

        <DndContext onDragEnd={onDragEnd}>
          <DroppableColumn
            id="plan"
            title="Plan to Take"
            courses={columns.plan}
          />
          <DroppableColumn
            id="tri1"
            title="Semester 1"
            courses={columns.tri1}
          />
          <DroppableColumn
            id="tri2"
            title="Semester 2"
            courses={columns.tri2}
          />
          <DroppableColumn
            id="bin"
            title="🗑 Drag here to remove"
            courses={[]}
          />
        </DndContext>
      </div>
    </>
  );

  function DraggableCourse({ course }) {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
      id: course.course_code + course.course_num,
      tris: course.trimestersOffered,
    });

    const style = {
      transform: transform
        ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
        : undefined,
    };

    return (
      <div
        onClick={() => removeCourse(course)}
        className="h-8 bg-violet-100 p-2 m-4"
        ref={setNodeRef}
        {...listeners}
        {...attributes}
        style={style}
      >
        <p>
          {course.course_code + course.course_num} - {course.course_name}
        </p>
      </div>
    );
  }

  function DroppableColumn({ id, title, courses, children }) {
    const { setNodeRef, isOver } = useDroppable({ id });

    return (
      <div ref={setNodeRef}>
        <h2 className="font-bold mb-2">{title}</h2>
        {courses.map((c) => (
          <DraggableCourse key={c.course_code + c.course_num} course={c} />
        ))}
        {children}
      </div>
    );
  }

  function onDragEnd({ over, active }) {
    if (!over) return;
    const columnNameMap = {
      tri1: "Trimester 1",
      tri2: "Trimester 2",
    };

    //Get id of the col where course was dropped
    const sourceCol = Object.keys(columns).find((col) =>
      columns[col].some((c) => c.course_code + c.course_num === active.id)
    );

    if (!sourceCol) return;

    //Get id of the course that's moving
    const movedCourse = columns[sourceCol].find(
      (c) => c.course_code + c.course_num === active.id
    );

    if (sourceCol === over.id) return; // dropped in same column, do nothing

    // Determine allowed trimesters
    const allowedTrimesters = movedCourse.trimestersOffered.flatMap((t) =>
      t.includes("|") ? t.split("|").map((s) => s.trim()) : t
    );

    if (over.id !== "bin" && over.id !== "plan") {
      if (!allowedTrimesters.includes(columnNameMap[over.id])) {
        console.log("does not include");
        return;
      }
    }

    setColumns((prev) => {
      const newCols = { ...prev };
      newCols[sourceCol] = newCols[sourceCol].filter(
        (c) => c.course_code + c.course_num !== active.id
      );
      // If dropped in bin, don't add anywhere else
      if (over.id !== "bin") {
        newCols[over.id] = [...newCols[over.id], movedCourse];
      }
      return newCols;
    });

    if (over.id === "bin") {
      setSelectedCourses((prev) =>
        prev.filter((c) => !(idFor(c) === idFor(movedCourse)))
      );
    }
  }
}
