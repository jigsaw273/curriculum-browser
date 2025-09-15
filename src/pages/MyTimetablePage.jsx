import Timetable from "../features/timetable/Timetable";
import useTimetableStore from "../hooks/useTimetableStore";
import html2canvas from "html2canvas";
import { useState, useEffect, useRef } from "react";

export default function MyTimetablePage() {
  const [activeTab, setActiveTab] = useState("t1");
  const myCourses = useTimetableStore((state) => state.courses);
  const tri1Courses = myCourses.filter((c) => c.trimester == "Trimester 1");
  const tri2Courses = myCourses.filter((c) => c.trimester == "Trimester 2");
  const removeCourse = useTimetableStore((state) => state.removeCourse);
  const removeManyCourses = useTimetableStore(
    (state) => state.removeManyCourses
  );
  const hydrate = useTimetableStore.persist.rehydrate;
  const timetableRef = useRef();

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  const exportPNG = async () => {
    if (!timetableRef.current) return;
    const canvas = await html2canvas(timetableRef.current);
    const link = document.createElement("a");
    link.download = "timetable.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <div>
      <div>
        <button onClick={() => setActiveTab("t1")}>Trimester 1</button>
        <button onClick={() => setActiveTab("t2")}>Trimester 2</button>
      </div>

      {activeTab === "t1" && (
        <div>
          <button onClick={() => removeManyCourses(tri1Courses)}>
            Clear All
          </button>
          <button onClick={exportPNG}>Export as PNG</button>
          <div ref={timetableRef}>
            <Timetable offering={tri1Courses} />
          </div>
          {tri1Courses.map((course) => (
            <button
              key={course.courseName}
              onClick={() => {
                removeCourse(course.courseName);
              }}
            >
              {course.courseName} ✕
            </button>
          ))}
        </div>
      )}
      {activeTab === "t2" && (
        <div>
          <button onClick={() => removeManyCourses(tri2Courses)}>
            Clear All
          </button>
          <Timetable offering={tri2Courses} />
          {tri2Courses.map((course) => (
            <button
              key={course.courseName}
              onClick={() => {
                removeCourse(course.courseName);
              }}
            >
              {course.courseName} ✕
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
