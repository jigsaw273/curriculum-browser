import { useState } from "react";
import { unlockGraph } from "../data/unlocks.js";
import { courseDependencies } from "../data/courses.js";

export function useRequisiteFinder() {
  const [unlockedCourses, setUnlockedCourses] = useState([]);
  const [prerequisites, setPrerequisites] = useState([]);

  function findRequisites(courseId) {
    setUnlockedCourses(unlockGraph[courseId]?.unlocks || []);
    setPrerequisites(() =>
      parsePrerequisites(courseDependencies[courseId].prerequisites, [])
    );
  }

  function parsePrerequisites(prereqs, courseDependencies) {
    if (prereqs.type == "AND" || prereqs.type == "OR") {
      prereqs.clauses.forEach((clause) => {
        parsePrerequisites(clause, courseDependencies);
      });
    } else if (prereqs.type == "COURSE") {
      courseDependencies.push(prereqs.course);
    }
    return courseDependencies;
  }

  return {
    unlockedCourses,
    prerequisites,
    findRequisites,
  };
}
