import React, { useLayoutEffect, useCallback, useEffect, useMemo } from "react";
import ReactFlow, {
  Background,
  Controls,
  Panel,
  useNodesState,
  useEdgesState,
  MarkerType,
} from "reactflow";
import dagre from "dagre";
import { useForwardPlanner } from "../../hooks/useForwardPlanner";
import { courseData } from "../../data/prereq";
import { unlockGraph } from "../../data/unlocks";
import "reactflow/dist/style.css"; //default styles remove later

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const nodeWidth = 172;
const nodeHeight = 36;

// Compute the layout of the dagre graph
const getLayoutedElements = (nodes, edges, direction = "TB") => {
  const isHorizontal = direction === "LR";
  dagreGraph.setGraph({
    rankdir: direction,
    nodesep: 30, // spacing between nodes
    ranksep: 100, // spacing between levels
    marginx: 10,
    marginy: 10,
  });

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  const newNodes = nodes.map((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    const newNode = {
      ...node,
      targetPosition: isHorizontal ? "left" : "top",
      sourcePosition: isHorizontal ? "right" : "bottom",
      position: {
        x: nodeWithPosition.x - nodeWidth / 2,
        y: nodeWithPosition.y - nodeHeight / 2,
      },
    };
    return newNode;
  });

  return { nodes: newNodes, edges };
};

// Memoized node types to prevent warnings
const nodeTypes = {};

export default function ForwardPlanner() {
  //Forward Planner Hook
  const { selectedCourses, toggleCourse, possibleUnlocks, unlockedCourses } =
    useForwardPlanner();

  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);

  //Memoize the base nodes (without styling)
  const baseNodes = useMemo(() => {
    return courseData.courses.map((course) => ({
      id: course.id,
      data: { label: course.id },
      draggable: true,
    }));
  }, []);

  // Memoize prerequisite edges
  const prereqEdges = useMemo(() => {
    return courseData.courses.flatMap((course) =>
      course.prerequisites.map((prereq) => ({
        id: `prereq-${prereq}-${course.id}`,
        source: prereq,
        target: course.id,
        type: "smoothstep",
        markerEnd: { type: MarkerType.Arrow },
        className: "prereq-edge",
        style: { stroke: "#9ea1bbff" },
      }))
    );
  }, []);

  //Update the node colours based on their selection/unlocked status
  const updateNodeColours = useCallback(() => {
    setNodes((nds) =>
      nds.map((node) => {
        //default unselected nodes
        let backgroundColor = "#fff";
        let color = "black";

        if (selectedCourses.includes(node.id)) {
          backgroundColor = "#3e3cafff";
          color = "white";
        } else if (unlockedCourses.includes(node.id)) {
          backgroundColor = "#1fa660ff";
          color = "black";
        } else if (possibleUnlocks.includes(node.id)) {
          backgroundColor = "#c2c2c7ff";
          color = "black";
        }

        return {
          ...node, //copies all properties from og node
          style: {
            ...node.style,
            backgroundColor,
            color,
            border: "1px solid #ddd",
            borderRadius: "5px",
            padding: "10px",
          },
        };
      })
    );
  }, [selectedCourses, unlockedCourses, possibleUnlocks, setNodes]);

  // Initialize layout with dagre
  useLayoutEffect(() => {
    const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
      baseNodes,
      prereqEdges,
      "TB"
    );

    setNodes(layoutedNodes);
    setEdges(layoutedEdges);
  }, [baseNodes, prereqEdges, setNodes, setEdges]);

  useEffect(() => {
    updateNodeColours();
  }, [selectedCourses, unlockedCourses, possibleUnlocks, updateNodeColours]); //, updateNodeColurs as arg?

  // Update edges based on selected courses
  useEffect(() => {
    const unlockEdges = [];

    selectedCourses.forEach((courseId) => {
      //Get the data for each selected course
      const course = unlockGraph[courseId];

      if (course?.unlocks) {
        course.unlocks.forEach((targetId) => {
          //if an "unlock" edge doesn't already exist and course is not selected
          if (
            !unlockEdges.some(
              (e) => e.id === `unlock-${courseId}-${targetId}`
            ) &&
            !selectedCourses.includes(targetId)
          ) {
            unlockEdges.push({
              id: `unlock-${courseId}-${targetId}`,
              source: courseId,
              target: targetId,
              animated: !unlockedCourses.includes(targetId),
              style: { stroke: "#313039ff" },
              type: "smoothstep",
            });
          }
        });
      }
    });

    // Combine prerequisite edges with unlock edges
    setEdges([...prereqEdges, ...unlockEdges]);
  }, [selectedCourses, unlockedCourses, prereqEdges, setEdges]);

  // Changes the orientation of the graph
  const onLayout = useCallback(
    (direction) => {
      const { nodes: layoutedNodes, edges: layoutedEdges } =
        getLayoutedElements(nodes, edges, direction);

      setNodes([...layoutedNodes]);
      setEdges([...layoutedEdges]);
    },
    [nodes, edges, setNodes, setEdges]
  );

  return (
    <div style={{ width: "100%", height: "90vh" }}>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={(_, node) => toggleCourse(node.id)}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: 0.2 }}
      >
        <Panel position="top-right">
          <button className="panel-button" onClick={() => onLayout("TB")}>
            vertical layout
          </button>
          <button className="panel-button" onClick={() => onLayout("LR")}>
            horizontal layout
          </button>
        </Panel>
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
}
