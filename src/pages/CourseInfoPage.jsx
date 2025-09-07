import { useParams } from "react-router-dom";
import { courseDependencies } from "../data/courses";
import CourseTree from "../features/courseTree/CourseTree";

export default function CourseInfoPage() {
  const { courseCode, courseNum } = useParams();
  const courseName = courseCode + courseNum;
  console.log(courseName);
  return (
    <div>
      <h1>Welcome to {courseName}</h1>
      <CourseTree
        course={courseName}
        prereqData={courseDependencies[courseName].prerequisites}
        postreqData={[]} // temp
      />
    </div>
  );
}
