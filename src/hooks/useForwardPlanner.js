import { useState, useEffect } from "react";
import { unlockGraph } from "../data/unlocks.js";
import { courseDependencies } from "../data/courseDependencies.js";

export function useForwardPlanner() {
  const [selectedCourses, setSelectedCourses] = useState([]);
  const [possibleUnlocks, setPossibleUnlocks] = useState([]);
  const [unlockedCourses, setUnlockedCourses] = useState([]);

  function toggleCourse(courseId) {
    setSelectedCourses((current) => {
      if (current.includes(courseId)) {
        return current.filter((id) => id !== courseId); // If already selected, remove it
      } else {
        return [...current, courseId]; //append courseId to the curernt array
      }
    });
  }

  // Triggers whenever the selected courses change
  useEffect(() => {
    const unlockCandidates = getUnlockedCourses(selectedCourses);
    const trueUnlocked = unlockCandidates.filter(
      (courseId) =>
        checkTrueUnlock(courseId, selectedCourses) &&
        !selectedCourses.includes(courseId)
    );

    setPossibleUnlocks(unlockCandidates);
    setUnlockedCourses(trueUnlocked);
  }, [selectedCourses]);

  function getUnlockedCourses(selectedCourses) {
    const unlockedCourses = new Set();
    selectedCourses.forEach((course) => {
      const entry = unlockGraph[course];
      if (entry && entry.unlocks) {
        entry.unlocks.forEach((c) => unlockedCourses.add(c));
      }
    });
    return Array.from(unlockedCourses);
  }

  function checkTrueUnlock(courseId, selectedCourses) {
    const prerequisites = courseDependencies[courseId]?.prerequisites;

    if (
      !prerequisites ||
      (prerequisites.type === "AND" && prerequisites.clauses.length === 0)
    ) {
      return true;
    }

    return evaluateClause(prerequisites, selectedCourses);
  }

  //function to recursively call
  function evaluateClause(clause, selectedCourses) {
    if (clause.type == "AND") {
      return clause.clauses.every((subclause) =>
        evaluateClause(subclause, selectedCourses)
      );
    }

    if (clause.type == "OR") {
      return clause.clauses.some((subclause) =>
        evaluateClause(subclause, selectedCourses)
      );
    }

    if (clause.type == "COURSE") {
      return selectedCourses.includes(clause.course);
    }

    if (clause.type === "POINTS") {
      const relevantCourses = selectedCourses
        .map((id) => courseDependencies[id])
        .filter(
          (c) =>
            clause.subjects.includes(c.subject) &&
            (!clause.level || c.level >= clause.level) // >= or == ??
        );

      const totalPoints = relevantCourses.reduce((sum, c) => sum + c.points, 0);
      return totalPoints >= clause.minPoints;
    }
    return false;
  }

  return {
    selectedCourses,
    toggleCourse,
    possibleUnlocks,
    unlockedCourses,
  };
}
