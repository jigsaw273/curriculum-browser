import { useRequisiteFinder } from "../../hooks/useRequisiteFinder.js";
import { courseDependencies } from "../../data/courses.js";
import "./ForwardPlannerCard.css";

export default function RequisiteFinder() {
  const { unlockedCourses, prerequisites, findRequisites } =
    useRequisiteFinder();

  return (
    <div className="App">
      <header className="App-header">
        {Object.keys(courseDependencies).map((courseId) => (
          <button key={courseId} onClick={() => findRequisites(courseId)}>
            {courseId}
          </button>
        ))}

        <div className="card">
          <h3>Prerequisites</h3>
          {prerequisites.map((e) => (
            <p key={e}>{e}</p>
          ))}
        </div>
        <div className="card">
          <h3>Unlocked Courses</h3>
          {unlockedCourses.map((e) => (
            <p key={e}>{e}</p>
          ))}
        </div>
      </header>
    </div>
  );
}
