import { useForwardPlanner } from "../../hooks/useForwardPlanner.js";
import { courseDependencies } from "../../data/courseDependencies.js";
import "./ForwardPlannerCard.css";

export default function ForwardPlanner() {
  const { selectedCourses, toggleCourse, possibleUnlocks, unlockedCourses } =
    useForwardPlanner();

  return (
    <div className="App">
      <header className="App-header">
        {Object.keys(courseDependencies).map((courseId) => (
          <button
            key={courseId}
            onClick={() => toggleCourse(courseId)}
            className={selectedCourses.includes(courseId) ? "selected" : ""}
          >
            {courseId}
          </button>
        ))}

        <div className="card">
          <h3>True Unlock</h3>
          {unlockedCourses.map((e) => (
            <p key={e}>{e}</p>
          ))}
        </div>

        <div className="card">
          <h3>Possible Unlocks</h3>
          {possibleUnlocks.map((e) => (
            <p key={e}>{e}</p>
          ))}
        </div>
      </header>
    </div>
  );
}
