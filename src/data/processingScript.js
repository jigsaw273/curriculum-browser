import fs from "fs";
import { courseDependencies } from "./courses.js";

//MOVE TO SCRIPTS FOLDER LATER
// recursively extract all prerequisite course codes
function extractCourses(clause) {
  if (!clause) return [];

  if (clause.type === "COURSE") {
    return [clause.course];
  }

  if (clause.clauses && Array.isArray(clause.clauses)) {
    return clause.clauses.flatMap(extractCourses);
  }

  return [];
}

// Build courseData
const courseData = { courses: [] };

for (const [courseId, details] of Object.entries(courseDependencies)) {
  const prereqs = extractCourses(details.prerequisites);

  courseData.courses.push({
    id: courseId,
    prerequisites: [...new Set(prereqs)], // dedupe
  });
}

// Build unlockGraph
const unlockGraph = {};

for (const { id, prerequisites } of courseData.courses) {
  for (const prereq of prerequisites) {
    if (!unlockGraph[prereq]) {
      unlockGraph[prereq] = { unlocks: [] };
    }
    unlockGraph[prereq].unlocks.push(id);
  }
}

// Deduplicate unlocks
for (const key in unlockGraph) {
  unlockGraph[key].unlocks = [...new Set(unlockGraph[key].unlocks)];
}

// Write to prereq.js
fs.writeFileSync(
  "prereq.js",
  "export const courseData = " + JSON.stringify(courseData, null, 2) + ";\n"
);

// Write to unlocks.js
fs.writeFileSync(
  "unlocks.js",
  "export const unlockGraph = " + JSON.stringify(unlockGraph, null, 2) + ";\n"
);

console.log("Generated prereqs.js and unlocks.js");
