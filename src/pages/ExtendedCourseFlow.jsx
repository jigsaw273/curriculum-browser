import { useState, useEffect, useCallback, useMemo } from "react";
import SearchBar from "../features/search/SearchBar.jsx";
import useCourseSearch from "../hooks/useCourseSearch.js";
import { useForwardPlanner } from "../hooks/useForwardPlanner.js";
import { courseData } from "../data/prereq";
import { useNavigate } from "react-router-dom";

import ReactFlow, {
  Background,
  Controls,
  Panel,
  useNodesState,
  useEdgesState,
  MarkerType,
} from "reactflow";
import dagre from "dagre";
import "reactflow/dist/style.css";

// Dagre setup
const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const nodeWidth = 172;
const nodeHeight = 36;

const getLayoutedElements = (nodes, edges, direction = "TB") => {
  const isHorizontal = direction === "LR";
  dagreGraph.setGraph({
    rankdir: direction,
    nodesep: 30,
    ranksep: 100,
  });

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  return {
    nodes: nodes.map((node) => {
      const pos = dagreGraph.node(node.id);
      return {
        ...node,
        position: { x: pos.x - nodeWidth / 2, y: pos.y - nodeHeight / 2 },
        targetPosition: isHorizontal ? "left" : "top",
        sourcePosition: isHorizontal ? "right" : "bottom",
      };
    }),
    edges,
  };
};

export default function ExtendedCourseFlow() {
  const { searchInput, setSearchInput, results } = useCourseSearch();
  const { selectedCourses, toggleCourse, possibleUnlocks, unlockedCourses } =
    useForwardPlanner();
  const [takenCourses, setTakenCourses] = useState([]);

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  //const navigate = useNavigate();

  // Add/remove from takenCourses
  function addCourse(course) {
    if (takenCourses.some((c) => c.courseId === course.courseId)) return;
    toggleCourse(course.courseId);
    setTakenCourses((prev) => [...prev, course]);
  }

  function removeCourse(course) {
    toggleCourse(course.courseId);
    setTakenCourses((prev) =>
      prev.filter((c) => c.courseId !== course.courseId)
    );
  }

  // Build the graph when "Calculate" is clicked
  function buildGraph() {
    // Collect the set of courses we want to display
    const visibleIds = new Set([
      ...selectedCourses,
      ...unlockedCourses,
      ...possibleUnlocks,
    ]);

    // Only include nodes that are visible
    const allNodes = courseData.courses
      .filter((course) => visibleIds.has(course.id))
      .map((course) => {
        let backgroundColor = "#fff";
        let color = "black";

        if (selectedCourses.includes(course.id)) {
          backgroundColor = "#3e3cafff"; // taken
          color = "white";
        } else if (unlockedCourses.includes(course.id)) {
          backgroundColor = "#1fa660ff"; // true unlock
        } else if (possibleUnlocks.includes(course.id)) {
          backgroundColor = "#c2c2c7ff"; // partial unlock
        }

        return {
          id: course.id,
          data: { label: course.id },
          draggable: true,
          style: {
            backgroundColor,
            color,
            border: "1px solid #ddd",
            borderRadius: "5px",
            padding: "10px",
          },
        };
      });

    // Only include prerequisite edges between visible nodes
    const prereqEdges = courseData.courses.flatMap((course) =>
      course.prerequisites
        .filter((prereq) => visibleIds.has(prereq) && visibleIds.has(course.id))
        .map((prereq) => ({
          id: `prereq-${prereq}-${course.id}`,
          source: prereq,
          target: course.id,
          type: "smoothstep",
          markerEnd: { type: MarkerType.Arrow },
          style: { stroke: "#9ea1bbff" },
        }))
    );

    const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
      allNodes,
      prereqEdges,
      "TB"
    );

    setNodes(layoutedNodes);
    setEdges(layoutedEdges);
  }

  return (
    <div className="App">
      {/* Search + Select */}
      <SearchBar setSearchInput={setSearchInput} />
      <div>
        {results.map((course) => (
          <div
            key={course.courseId}
            className="p-4 bg-gray-200 m-4 hover:bg-gray-300"
            onClick={() => addCourse(course)}
          >
            {course.courseId} - {course.courseName}
          </div>
        ))}
      </div>

      {/* Taken courses */}
      <div>
        {takenCourses.map((course) => (
          <button key={course.courseId} onClick={() => removeCourse(course)}>
            {course.courseName}
          </button>
        ))}
      </div>

      {/* Calculate button
      <button className="m-4 p-2 bg-blue-500 text-white" onClick={buildGraph}>
        Calculate
      </button> */}

      {/* Calculate + Clear buttons */}
      <div className="m-4 flex gap-2">
        <button
          className="p-2 bg-blue-500 text-black rounded"
          onClick={buildGraph}
        >
          Calculate
        </button>
        <button
          className="p-2 bg-gray-400 text-black rounded"
          onClick={() => {
            setTakenCourses([]);
            setNodes([]);
            setEdges([]);
            // also clear selectedCourses in hook
            selectedCourses.forEach((id) => toggleCourse(id));
          }}
        >
          Clear
        </button>
      </div>

      {/* Graph */}
      <div style={{ width: "100%", height: "70vh" }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          //onNodeClick={(_, node) => toggleCourse(node.id)}
          onNodeClick={(_, node) => {
            // navigate to /course/{SUBJECT}/{NUMBER}
            // assuming course.id looks like AIML320
            const match = node.id.match(/^([A-Z]+)(\d{3})$/);
            if (match) {
              const [, subject, number] = match;
              window.open(`/course/${subject}/${number}`, "_blank");
            }
          }}
          fitView
          fitViewOptions={{ padding: 0.2 }}
        >
          <Panel position="top-right">
            <button onClick={() => buildGraph("TB")}>Vertical</button>
            <button onClick={() => buildGraph("LR")}>Horizontal</button>
          </Panel>
          <Background />
          <Controls />
        </ReactFlow>
      </div>
    </div>
  );
}
