import { useCallback } from "react";
import ReactFlow, { Background, Controls, useNodesState } from "reactflow";
import "reactflow/dist/style.css";

import { unlockGraph } from "../data/unlocks.js";
import { courseDependencies as courses } from "../data/courseDependencies.js";

function RequisiteGraph() {
  const initialNodes = Object.keys(courses).map((id, index) => ({
    id,
    data: { label: id },
    position: { x: (index % 5) * 200, y: Math.floor(index / 5) * 100 },
    style: { backgroundColor: "#fff", border: "1px solid #333" },
  }));

  const initialEdges = [];
  for (const [courseId, courseData] of Object.entries(courses)) {
    if (courseData.prerequisites?.type === "COURSE") {
      initialEdges.push({
        id: `${courseData.prerequisites.course}-${courseId}`,
        source: courseData.prerequisites.course,
        target: courseId,
      });
    }
  }

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);

  function parsePrerequisites(prereqs, list) {
    if (!prereqs) return list;
    if (prereqs.type === "AND" || prereqs.type === "OR") {
      prereqs.clauses.forEach((c) => parsePrerequisites(c, list));
    } else if (prereqs.type === "COURSE") {
      list.push(prereqs.course);
    }
    return list;
  }

  const highlightCourse = useCallback(
    (courseId) => {
      const unlocked = unlockGraph[courseId]?.unlocks || [];
      const prereqs = parsePrerequisites(courses[courseId].prerequisites, []);

      setNodes((nds) =>
        nds.map((node) => {
          if (node.id === courseId) {
            return {
              ...node,
              style: {
                ...node.style,
                backgroundColor: "#4CAF50",
                color: "white",
              },
            };
          } else if (prereqs.includes(node.id)) {
            return {
              ...node,
              style: {
                ...node.style,
                backgroundColor: "#2196F3",
                color: "white",
              },
            };
          } else if (unlocked.includes(node.id)) {
            return {
              ...node,
              style: {
                ...node.style,
                backgroundColor: "#FFC107",
                color: "black",
              },
            };
          } else {
            return {
              ...node,
              style: { ...node.style, backgroundColor: "#fff", color: "black" },
            };
          }
        })
      );
    },
    [setNodes]
  );

  return (
    <div style={{ width: "100%", height: "90vh" }}>
      <ReactFlow
        nodes={nodes}
        edges={initialEdges}
        onNodeClick={(_, node) => highlightCourse(node.id)}
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}

export default RequisiteGraph;
