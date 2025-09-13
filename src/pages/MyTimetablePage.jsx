import Timetable from "../features/timetable/Timetable";
import useTimetableStore from "../hooks/useTimetableStore";
import { useState, useEffect } from "react";

export default function MyTimetablePage() {
  const [activeTab, setActiveTab] = useState("t1");
  const myCourses = useTimetableStore((state) => state.courses);
  const tri1Courses = myCourses.filter((c) => c.trimester == "Trimester 1");
  const tri2Courses = myCourses.filter((c) => c.trimester == "Trimester 2");
  const hydrate = useTimetableStore.persist.rehydrate;

  useEffect(() => {
    hydrate();
  }, [hydrate]);

  return (
    <div>
      <div>
        <button onClick={() => setActiveTab("t1")}>Trimester 1</button>
        <button onClick={() => setActiveTab("t2")}>Trimester 2</button>
      </div>

      {activeTab === "t1" && (
        <div>
          <Timetable offering={tri1Courses} />
        </div>
      )}
      {activeTab === "t2" && (
        <div>
          <Timetable offering={tri2Courses} />
        </div>
      )}
    </div>
  );
}
