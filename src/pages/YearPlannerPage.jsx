import { useState } from "react";
import useCourseSearch from "../hooks/useCourseSearch";
import SearchBar from "../features/search/SearchBar";
import { DndContext, useDraggable, useDroppable } from "@dnd-kit/core";
import "./Extended.css";

export default function YearPlannerPage() {
  const { searchInput, setSearchInput, results } = useCourseSearch();
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [activeCourse, setActiveCourse] = useState(null);

  const [columns, setColumns] = useState({
    plan: [],
    tri1: [],
    tri2: [],
    tri3: [],
  });

  const columnNameMap = {
    tri1: "Trimester 1",
    tri2: "Trimester 2",
    tri3: "Trimester 3",
  };

  function addCourse(course) {
    const alreadyExists = selectedCourses.some(
      (c) => c.courseId === course.courseId
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
    const inPlan = columns.plan.some((c) => c.courseId === course.courseId);
    if (!inPlan) return;

    setSelectedCourses((prev) =>
      prev.filter((c) => !(c.courseId === course.courseId))
    );

    setColumns((prev) => ({
      ...prev,
      plan: prev.plan.filter((c) => !(c.courseId === course.courseId)),
    }));
  }

  function DraggableCourse({ course }) {
    const { attributes, listeners, setNodeRef, transform } = useDraggable({
      id: course.courseId,
      tris: course.trimestersOffered,
    });

    const style = {
      transform: transform
        ? `translate3d(${transform.x}px, ${transform.y}px, 0)`
        : undefined,
    };

    return (
      <div
        className="bg-light-green rounded-md p-4 shadow-sm cursor-pointer hover:shadow-md"
        ref={setNodeRef}
        {...listeners}
        {...attributes}
        style={style}
      >
        {/* <div className="h-10 bg-light-green "> */}
        <p>
          {course.courseId} - {course.courseName}
        </p>
        {/* </div> */}
      </div>
    );
  }

  function DroppableColumn({ id, title, courses, activeCourse }) {
    const { setNodeRef, isOver } = useDroppable({ id });

    let isValidDrop = id === "plan" || id === "bin";
    if ((id === "tri1" || id === "tri2" || id === "tri3") && activeCourse) {
      isValidDrop = activeCourse.trimestersOffered.includes(columnNameMap[id]);
    }
    return (
      <div
        ref={setNodeRef}
        className={`flex-1 min-w-[200px] p-4 rounded-lg border border-gray-300
        ${isOver && isValidDrop ? "bg-green-200" : "bg-gray-100"}
        flex flex-col gap-2`}
      >
        <h2 className="font-bold mb-2">{title}</h2>
        {courses.map((c) => (
          <DraggableCourse key={c.courseId} course={c} />
        ))}
        {/* {children} */}
      </div>
    );
  }

  function onDragEnd({ over, active }) {
    if (!over) return;

    //Get id of the col where course was dropped
    const sourceCol = Object.keys(columns).find((col) =>
      columns[col].some((c) => c.courseId === active.id)
    );

    if (!sourceCol) return;

    //Get id of the course that's moving
    const movedCourse = columns[sourceCol].find(
      (c) => c.courseId === active.id
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
        (c) => c.courseId !== active.id
      );
      // If dropped in bin, don't add anywhere else
      if (over.id !== "bin") {
        newCols[over.id] = [...newCols[over.id], movedCourse];
      }
      return newCols;
    });

    if (over.id === "bin") {
      setSelectedCourses((prev) =>
        prev.filter((c) => !(c.courseId === movedCourse.courseId))
      );
    }
  }

  return (
    <>
      <div className="relative w-80">
        <div className="special-search">
          <SearchBar setSearchInput={setSearchInput} />
        </div>
        {searchInput && results.length > 0 && (
          <div className="absolute top-full mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-56 overflow-y-auto">
            {results.map((course) => (
              <div
                key={course.courseId}
                className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                onClick={() => {
                  addCourse(course);
                }}
              >
                {course.courseId} - {course.courseName}
              </div>
            ))}
          </div>
        )}
      </div>
      {/* need to change the layout of this!!! */}
      <div className="flex gap-8 mt-4">
        <DndContext
          onDragStart={({ active }) => {
            const course = Object.values(columns)
              .flat()
              .find((c) => c.courseId === active.id);
            setActiveCourse(course || null);
          }}
          onDragEnd={onDragEnd}
          onDragCancel={() => setActiveCourse(null)}
        >
          <DroppableColumn
            id="plan"
            title="Plan to Take"
            courses={columns.plan}
            activeCourse={activeCourse}
          />
          <DroppableColumn
            id="tri1"
            title="Trimester 1"
            courses={columns.tri1}
            activeCourse={activeCourse}
          />
          <DroppableColumn
            id="tri2"
            title="Trimester 2"
            courses={columns.tri2}
            activeCourse={activeCourse}
          />
          <DroppableColumn
            id="tri3"
            title="Trimester 3"
            courses={columns.tri3}
            activeCourse={activeCourse}
          />
          <DroppableColumn
            id="bin"
            title="🗑 Drag here to remove"
            courses={[]}
            activeCourse={activeCourse}
          />
        </DndContext>
      </div>
    </>
  );
}
