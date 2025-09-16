import React from "react";
import "./CourseTree.css";

// Recursively builds the tree structure, inspired from from NUSMODs
const Tree = ({ prereq }) => {
  if (!prereq) {
    return <div className="node prereq-node">No prereqs</div>;
  }

  if (prereq.type == "COURSE") {
    return <div className="node prereq-node">{prereq.course}</div>;
  }

  if ((prereq.type == "AND" || prereq.type == "OR") && prereq.clauses) {
    const multiple = prereq.clauses.length > 1;

    return (
      <ul className="subsection-container">
        <li className="branch">
          {multiple && (
            <div className="node conditional">
              {prereq.type == "AND" ? "all of" : "one of"}
            </div>
          )}
          <ul className="subsection-container">
            {prereq.clauses.map((clause, i) => (
              <li key={i} className="branch">
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
    <div className="course-tree-container">
      {postreqData && postreqData.length > 0 ? (
        <>
          <ul className="subsection-container">
            {postreqData.map((course, i) => (
              <li key={i} className="branch prereq-branch">
                <div className="node postreq-node">{course}</div>
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
          <div className="node course-node">{course}</div>
          {prereqData && prereqData.clauses.length > 0 ? (
            <Tree prereq={prereqData} />
          ) : (
            <div className="node prereq-node">No prereqs</div>
          )}
        </li>
      </ul>
    </div>
  );
}
