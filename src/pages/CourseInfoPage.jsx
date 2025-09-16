import { useParams } from "react-router-dom";
import { useState } from "react";
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

  const validOfferings = course.offerings.filter(
    (off) => off.lectureDays.length > 0
  );
  const [activeTab, setActiveTab] = useState(
    validOfferings[0]?.examPeriodEnd || null
  );
  const activeOffering = validOfferings.find(
    (off) => off.examPeriodEnd === activeTab
  );

  return (
    <div className="bg-gray-50 pt-10">
      <div className="max-w-5xl mx-auto p-8 space-y-8 font-sans bg-gray- ">
        {/* Header */}
        <div className="space-y-1">
          <h1 className="text-3xl font-bold">{courseName}</h1>
          <h2 className="text-2xl font-semibold text-gray-700">
            {course.courseName}
          </h2>
        </div>

        {/* Course Description */}
        <section className="space-y-2">
          <h3 className="text-xl font-semibold">Course Description</h3>
          <p className="text-gray-700 leading-relaxed">
            {course.courseDescription}
          </p>
        </section>

        {/* Prerequisites */}
        <section className="space-y-2">
          <h3 className="text-xl font-semibold">Prerequisites</h3>
          <div className="bg-gray-100 p-4 rounded-md">
            <CourseTree
              course={courseName}
              prereqData={courseDependencies[courseName]?.prerequisites}
              postreqData={unlockGraph[courseName]?.unlocks || []}
            />
          </div>
        </section>

        {/* Offerings */}
        <section className="space-y-4">
          <h3 className="text-xl font-semibold">Offerings</h3>
          {validOfferings.length === 0 ? (
            <p className="text-gray-500">No timetable data for this course.</p>
          ) : (
            <>
              {/* Tabs */}
              <div className="flex border-b border-gray-300">
                {validOfferings.map(
                  (off) =>
                    off.lectureDays.length > 0 && (
                      <button
                        key={off.examPeriodEnd}
                        onClick={() => setActiveTab(off.examPeriodEnd)}
                        className={`px-4 py-2 -mb-px border-b-2 transition-colors font-medium ${
                          activeTab === off.examPeriodEnd
                            ? "border-purple-600 text-purple-700"
                            : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
                        }`}
                      >
                        {off.trimester}
                      </button>
                    )
                )}
              </div>

              {/* Tab Content */}
              {activeOffering && (
                <div className="bg-white border border-gray-100 rounded-b-md p-4 space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
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
                    </div>
                    <button
                      onClick={() =>
                        addCourse({
                          ...activeOffering,
                          courseName: courseName,
                          courseTitle: course.courseName,
                        })
                      }
                      className="px-6 py-2 bg-white text-dark-purple !border-2 !border-dark-purple font-medium !hover:bg-[#ff] transition"
                    >
                      Add to My Timetable
                    </button>
                  </div>

                  <div className="p-4">
                    <Timetable
                      offering={{
                        ...activeOffering,
                        courseName: courseName,
                        courseTitle: course.courseName,
                      }}
                    />
                  </div>
                </div>
              )}
            </>
          )}
        </section>
      </div>
    </div>
  );
}
