import { useState, useEffect, useCallback } from "react";
import ReactFlow, {
  Background,
  Controls,
  useNodesState,
  useEdgesState,
} from "reactflow";
import { useForwardPlanner } from "../hooks/useForwardPlanner";
import { courseData } from "../data/prereq";
import { unlockGraph } from "../data/unlocks";

const initialNodes = courseData.courses.map((course, idx) => ({
  id: course.id,
  data: { label: course.id },
  position: { x: (idx % 6) * 180, y: Math.floor(idx / 6) * 100 },
  draggable: true,
}));

const initialEdges = [];

export default function DegreePlanner() {
  const { selectedCourses, toggleCourse, possibleUnlocks, unlockedCourses } =
    useForwardPlanner();

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const updateNodeColours = useCallback(() => {
    setNodes((nds) =>
      nds.map((node) => {
        if (selectedCourses.includes(node.id)) {
          return {
            ...node,
            style: {
              ...node.style,
              backgroundColor: "#4e4cafff",
              color: "white",
            },
          };
        }
        if (unlockedCourses.includes(node.id)) {
          return {
            ...node,
            style: {
              ...node.style,
              backgroundColor: "#1fa660ff",
              color: "black",
            },
          };
        }
        if (possibleUnlocks.includes(node.id)) {
          return {
            ...node,
            style: {
              ...node.style,
              backgroundColor: "#c2c2c7ff",
              color: "black",
            },
          };
        }
        return {
          ...node,
          style: { ...node.style, backgroundColor: "#fff", color: "black" },
        };
      })
    );
  }, [selectedCourses, unlockedCourses, possibleUnlocks, setNodes]);

  useEffect(() => {
    updateNodeColours();
  }, [selectedCourses, unlockedCourses, possibleUnlocks, updateNodeColours]); //, updateNodeColurs as arg?

  useEffect(() => {
    const newEdges = [];

    selectedCourses.forEach((courseId) => {
      //Get the data for each selected course
      const entry = unlockGraph[courseId];

      if (entry?.unlocks) {
        entry.unlocks.forEach((targetId) => {
          if (
            !newEdges.some((e) => e.id === `${courseId}-${targetId}`) &&
            !selectedCourses.includes(targetId)
          ) {
            newEdges.push({
              id: `${courseId}-${targetId}`,
              source: courseId,
              target: targetId,
              animated: !unlockedCourses.includes(targetId),
              style: { stroke: "#313039ff" },
            });
          }
        });
      }
    });

    setEdges(newEdges);
  }, [selectedCourses, unlockedCourses]);

  return (
    <div style={{ width: "100%", height: "90vh" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={(_, node) => toggleCourse(node.id)}
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}
