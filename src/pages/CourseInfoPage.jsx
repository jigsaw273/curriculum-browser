import { useParams } from "react-router-dom";
import { act, useState } from "react";
import { courseDependencies } from "../data/courses";
import { courseDetails } from "../data/courseDetails";
import { unlockGraph } from "../data/unlocks";
import CourseTree from "../features/courseTree/CourseTree";
import Timetable from "../features/timetable/Timetable";
import useTimetableStore from "../hooks/useTimetableStore";

export default function CourseInfoPage() {
  const { courseCode, courseNum } = useParams();
  const courseName = courseCode + courseNum;
  const course = courseDetails[courseName];
  const addCourse = useTimetableStore((state) => state.addCourse);
  const validOfferings = courseDetails[courseName].offerings.filter(
    (off) => off.lectureDays.length > 0
  );

  const [activeTab, setActiveTab] = useState(
    validOfferings[0]?.examPeriodEnd || null
  );

  const activeOffering = validOfferings.find(
    (off) => off.examPeriodEnd === activeTab
  );

  return (
    <div className="p-12">
      <h1 className="text-2xl font-bold">{courseName}</h1>
      <h1 className="text-2xl font-bold">
        {courseDetails[courseName].course_name}
      </h1>
      <h2 className="mt-4 mb-1 text-xl">Course Description</h2>
      <p className="w-4xl">{courseDetails[courseName].courseDescription}</p>
      <p className="mt-4 text-xl">Prerequisites</p>
      <div className="bg-gray-200 px-8 py-4">
        <CourseTree
          course={courseName}
          prereqData={courseDependencies[courseName]?.prerequisites}
          postreqData={unlockGraph[courseName]?.unlocks || []}
        />
      </div>
      <div className="w-full mx-auto">
        <p className="mt-4 text-xl">Offerings</p>
        {validOfferings.length == 0 && <p>No timetable data for this course</p>}
        <div className="border-b border-gray-300 flex">
          {validOfferings.map(
            (offering) =>
              offering.lectureDays.length > 0 && (
                <button
                  key={offering.examPeriodEnd}
                  onClick={() => setActiveTab(offering.examPeriodEnd)}
                  className={`px-4 py-2 -mb-px border-b-2 transition-colors
                ${
                  activeTab === offering.examPeriodEnd
                    ? "border-[#4e307e] text-[#5115b1] font-medium"
                    : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                }`}
                >
                  {offering.trimester}
                </button>
              )
          )}
        </div>

        {/* Tab content */}
        {activeOffering && (
          <div className="p-4 bg-white border border-t-0 border-gray-300 rounded-b">
            <p>
              <span className="font-semibold">Coordinator:</span>{" "}
              {activeOffering.courseCoordinator}
            </p>
            <p>
              <span className="font-semibold">Lecture Days:</span>{" "}
              {activeOffering.lectureDays.join(", ")}
            </p>
            <p>
              <span className="font-semibold">Lecture Times:</span>{" "}
              {activeOffering.lectureTimes.join(", ")}
            </p>
            <div className="p-8">
              {/* <Timetable
                days={activeOffering.lectureDays}
                times={activeOffering.lectureTimes}
                courseName={courseName}
              /> */}
              <Timetable
                offering={{
                  ...activeOffering,
                  courseName: courseName,
                  courseTitle: course.course_name,
                }}
              />
            </div>
            <button
              onClick={() =>
                addCourse({
                  ...activeOffering,
                  courseName: courseName,
                  courseTitle: course.course_name,
                })
              }
            >
              Add to my timetable
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
