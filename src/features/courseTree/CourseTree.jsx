import React from "react";
import { useNavigate } from "react-router-dom";
import { courseDetails } from "../../data/courseDetails";
import "./CourseTree.css";

const formatCourseUrl = (course) => {
  const match = course.match(/^([A-Z]+)(\d+)$/i);
  if (!match) return course;
  const [, code, num] = match;
  return `/course/${code}/${num}`;
};

// Recursively builds the tree structure, inspired by NUSMODs
const Tree = ({ prereq, handleClick }) => {
  if (!prereq) return <div className="node prereq-node">No prereqs</div>;

  if (prereq.type === "COURSE") {
    return (
      <div
        className="node prereq-node clickable"
        onClick={() => handleClick(prereq.course)}
      >
        {prereq.course}
      </div>
    );
  }

  if ((prereq.type === "AND" || prereq.type === "OR") && prereq.clauses) {
    const multiple = prereq.clauses.length > 1;

    return (
      <ul className="subsection-container">
        <li className="branch">
          {multiple && (
            <div className="node conditional">
              {prereq.type === "AND" ? "all of" : "one of"}
            </div>
          )}
          <ul className="subsection-container">
            {prereq.clauses.map((clause, i) => (
              <li key={i} className="branch">
                <Tree prereq={clause} handleClick={handleClick} />
              </li>
            ))}
          </ul>
        </li>
      </ul>
    );
  }

  return null;
};

export default function CourseTree({ course, prereqData, postreqData }) {
  const navigate = useNavigate();

  const handleClick = (courseCode) => {
    if (courseDetails[courseCode]) {
      navigate(formatCourseUrl(courseCode));
    }
  };

  return (
    <div className="course-tree-container">
      {postreqData && postreqData.length > 0 ? (
        <>
          <ul className="subsection-container">
            {postreqData.map((courseName, i) => (
              <li key={i} className="branch prereq-branch">
                <div
                  className="node postreq-node clickable"
                  onClick={() => handleClick(courseName)}
                >
                  {courseName}
                </div>
              </li>
            ))}
          </ul>
          <div className="node conditional">needs</div>
        </>
      ) : (
        <>
          <ul className="subsection-container">
            <li className="branch prereq-branch">
              <div className="node postreq-node">No postreqs</div>
            </li>
          </ul>
          <div className="node conditional">needs</div>
        </>
      )}

      <ul className="tree root">
        <li className="branch">
          <div
            className="node course-node clickable"
            onClick={() => handleClick(course)}
          >
            {course}
          </div>
          {prereqData && prereqData.clauses.length > 0 ? (
            <Tree prereq={prereqData} handleClick={handleClick} />
          ) : (
            <div className="node prereq-node">No prereqs</div>
          )}
        </li>
      </ul>
    </div>
  );
}
