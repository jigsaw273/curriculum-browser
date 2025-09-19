import React, { useState, useEffect, useRef } from "react";
import Timetable from "../features/timetable/Timetable";
import useTimetableStore from "../hooks/useTimetableStore";
import html2canvas from "html2canvas";

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

  // Map trimesters to filtered courses

  const trimesterCourses = {
    t1: myCourses.filter((c) => c.trimester === "Trimester 1"),
    t2: myCourses.filter((c) => c.trimester === "Trimester 2"),
  };
  const activeCourses = trimesterCourses[activeTab];

  const exportPNG = async () => {
    if (!timetableRef.current) return;
    const canvas = await html2canvas(timetableRef.current);
    const link = document.createElement("a");
    link.download = "timetable.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <div className="bg-white px-10 py-12 rounded-xl">
      <div className="flex">
        <div className="min-w-[80%] pl-8 pr-4">
          <div className="flex justify-between items-center mb-6">
            <div className="">
              <h1 className="text-2xl font-semibold text-gray-800 mb-1">
                My Timetable
              </h1>
              <p className="text-gray-600 text-base">
                Build, view and export your course timetable
              </p>
            </div>
            <div className="">
              <button
                onClick={() => setActiveTab("t1")}
                className={`${
                  activeTab === "t1"
                    ? "!bg-[#f6f3ff] text-accent-purple !border-accent-purple !border-2"
                    : "bg-gray-200 text-gray-600 border-gray-300 hover:bg-gray-300 !border-2"
                }`}
              >
                Trimester 1
              </button>
              <button
                onClick={() => setActiveTab("t2")}
                className={`${
                  activeTab === "t2"
                    ? "!bg-[#f6f3ff] text-accent-purple !border-accent-purple !border-2"
                    : "bg-gray-200 text-gray-600 border-gray-300 hover:bg-gray-300 !border-2"
                }`}
              >
                Trimester 2
              </button>
            </div>
          </div>
          <div ref={timetableRef}>
            <Timetable offering={activeCourses} />
          </div>
        </div>
        <div className="flex flex-col gap-2 pl-8 w-full">
          <button
            onClick={() => removeManyCourses(activeCourses)}
            className="px-4 py-2 !bg-error-red text-white hover:!bg-red-hover hover:!border-red-hover"
          >
            Clear All
          </button>
          <button className="!border-2 !border-gray-400" onClick={exportPNG}>
            Export as PNG
          </button>
          <div className="mt-4">
            <h2 className="text-lg font-semibold mb-3 ml-2 items-center text-center">
              Selected Courses
            </h2>
            {activeCourses.map((course) => (
              <button
                className="w-full flex justify-between items-center !p-2"
                key={course.courseName}
                onClick={() => {
                  removeCourse(course.courseName);
                }}
              >
                <span className="m-4">{course.courseName}</span>
                <span className="font-bold mr-4">✕</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
