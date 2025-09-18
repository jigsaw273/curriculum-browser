import { useState, useEffect, useCallback, useMemo } from "react";
import SearchBar from "../features/search/SearchBar.jsx";
import useCourseSearch from "../hooks/useCourseSearch.js";
import { useForwardPlanner } from "../hooks/useForwardPlanner.js";
import { courseData } from "../data/prereq";
import { useNavigate } from "react-router-dom";
import "./Extended.css";

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
  const [searchClicked, setSearchClicked] = useState(false);

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
          backgroundColor = "#0A2342"; // taken
          color = "white";
        } else if (unlockedCourses.includes(course.id)) {
          backgroundColor = "#2D8B73"; // true unlock
          color = "white";
        } else if (possibleUnlocks.includes(course.id)) {
          backgroundColor = "#DEDDDC"; // partial unlock
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
    <div className="flex h-full gap-4 p-6 bg-gray-50">
      {/* Left panel */}
      <div className="w-1/4 bg-white shadow-md rounded-2xl p-7 flex flex-col">
        <h2 className="text-xl font-semibold mb-2">Course Planner</h2>
        <p className="text-m text-gray-500 mb-6">
          Search for courses you’ve already taken, then calculate your unlocks.
        </p>

        {/* Search */}
        <div className="relative mb-4">
          <div className="special-search">
            <SearchBar setSearchInput={setSearchInput} />
          </div>
          {searchInput && results.length > 0 && (
            <div className="absolute top-full mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-10 max-h-56 overflow-y-auto">
              {results.map((course) => (
                <div
                  key={course.courseId}
                  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
                  onClick={() => {
                    addCourse(course);
                    setSearchInput("");
                  }}
                >
                  {course.courseId} - {course.courseName}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Taken courses */}
        {takenCourses.length > 0 && (
          <>
            <h3 className="text-l italic font-medium my-3 text-gray-700">
              Courses You've Taken
            </h3>
            <div className="flex flex-wrap gap-1 mb-4">
              {takenCourses.map((course) => (
                <button
                  key={course.courseId}
                  onClick={() => removeCourse(course)}
                  className="px-3 py-2 text-sm bg-blue-100 text-purple-700 hover:bg-blue-200 !rounded-full"
                >
                  {course.courseId} ✕
                </button>
              ))}
            </div>
          </>
        )}

        {/* Actions */}
        <div className="flex flex-wrap gap-2 mt-auto">
          <button
            className="flex-1 py-2 text-black !border-2"
            onClick={buildGraph}
          >
            Calculate
          </button>
          <button
            className="flex-1 py-2 !border-2 !bg-error-red text-white"
            onClick={() => {
              setTakenCourses([]);
              setNodes([]);
              setEdges([]);
              selectedCourses.forEach((id) => toggleCourse(id));
            }}
          >
            Clear
          </button>
        </div>
      </div>

      {/* Graph panel */}
      <div className="flex-1 bg-white rounded-2xl shadow-md p-7 flex flex-col">
        <h2 className="text-xl font-semibold mb-2">Unlock Graph</h2>
        <p className="text-m text-gray-500 mb-4">
          Visualize which courses you’ve unlocked or partially unlocked.
        </p>
        <div className="flex-1 h-[70vh]">
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onNodeClick={(_, node) => {
              const match = node.id.match(/^([A-Z]+)(\d{3})$/);
              if (match) {
                const [, subject, number] = match;
                window.open(`/course/${subject}/${number}`, "_blank");
              }
            }}
            fitView
            fitViewOptions={{ padding: 0.2 }}
          >
            <Background />
            <Controls />
          </ReactFlow>
        </div>
      </div>
    </div>
  );
}
