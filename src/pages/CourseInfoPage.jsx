import { useParams } from "react-router-dom";
import { courseDependencies } from "../data/courses";
import { courseDetails } from "../data/courseDetails";
import { unlockGraph } from "../data/unlocks";
import CourseTree from "../features/courseTree/CourseTree";

export default function CourseInfoPage() {
  const { courseCode, courseNum } = useParams();
  const courseName = courseCode + courseNum;
  console.log(courseName);
  return (
    <div>
      <h1>Welcome to {courseName}</h1>
      <h2>Course Description</h2>
      <p>{courseDetails[courseName].courseDescription}</p>
      <CourseTree
        course={courseName}
        prereqData={courseDependencies[courseName]?.prerequisites}
        postreqData={unlockGraph[courseName]?.unlocks || []}
      />
    </div>
  );
}
