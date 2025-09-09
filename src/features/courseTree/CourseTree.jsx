import React from "react";

// Recursively builds the tree structure, inspiration from NUSMODs
const Tree = ({ prereq }) => {
  if (!prereq) return null;

  if (prereq.type == "COURSE") {
    return <span className="course-node">{prereq.course}</span>;
  }

  if ((prereq.type == "AND" || prereq.type == "OR") && prereq.clauses) {
    const multiple = prereq.clauses.length > 1;

    return (
      <ul className="tree-container">
        <li className="tree-branch">
          {multiple && (
            <span className="connector">
              {prereq.type == "AND" ? "all of" : "one of"}
            </span>
          )}
          <ul className="tree-branch-vertical">
            {prereq.clauses.map((clause, i) => (
              <li key={i}>
                <Tree prereq={clause} />
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
  return (
    <div className="course-tree">
      <ul>
        {prereqData ? (
          postreqData.map((course, i) => <li key={i}>{course}</li>)
        ) : (
          <p>No Unlocks</p>
        )}
      </ul>
      <h2>
        <b>{course}</b>
      </h2>
      {prereqData && prereqData.clauses.length > 0 ? (
        <Tree prereq={prereqData} />
      ) : (
        <p>No Prerequisites</p>
      )}
    </div>
  );
}
