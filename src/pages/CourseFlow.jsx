
import React, { useLayoutEffect, useState } from 'react';
import ReactFlow, {
  Background,
  Controls,
  useNodesState,
  useEdgesState,
  MarkerType
} from 'reactflow';
import dagre from 'dagre';
import { courseData } from '../prereq';
import 'reactflow/dist/style.css';
import './CourseFlow.css';

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const nodeWidth = 200;
const nodeHeight = 80;

const getLayoutedElements = (nodes, edges) => {
  dagreGraph.setGraph({ rankdir: 'TB', ranksep: 100, nodesep: 50 });

  nodes.forEach(node => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });

  edges.forEach(edge => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  return nodes.map(node => {
    const nodeWithPosition = dagreGraph.node(node.id);
    return {
      ...node,
      position: {
        x: nodeWithPosition.x - nodeWidth / 2,
        y: nodeWithPosition.y - nodeHeight / 2,
      },
    };
  });
};

const CourseFlow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState([]);
  const [edges, setEdges] = useEdgesState([]);
  const [selectedNodes, setSelectedNodes] = useState([]);

  const toggleNodeSelection = (nodeId) => {
    setSelectedNodes(prev => 
      prev.includes(nodeId)
        ? prev.filter(id => id !== nodeId)
        : [...prev, nodeId]
    );
  };

  useLayoutEffect(() => {
    const initialNodes = courseData.courses.map(course => ({
      id: course.id,
      data: { 
        label: (
          <div className="node-content" onClick={(e) => e.stopPropagation()}>
            <div className="course-id">{course.id}</div>
            <div className="course-name">{course.name}</div>
            <input
              type="checkbox"
              checked={selectedNodes.includes(course.id)}
              onChange={() => toggleNodeSelection(course.id)}
              className="node-checkbox"
            />
          </div>
        )
      },
      className: `course-node ${selectedNodes.includes(course.id) ? 'selected' : ''}`,
      draggable: true
    }));

    const initialEdges = courseData.courses.flatMap(course => 
      course.prerequisites.map(prereq => ({
        id: `e${prereq}-${course.id}`,
        source: prereq,
        target: course.id,
        type: 'smoothstep',
        markerEnd: { type: MarkerType.ArrowClosed },
        className: 'course-edge'
      }))
    );

    const layoutedNodes = getLayoutedElements(initialNodes, initialEdges);
    setNodes(layoutedNodes);
    setEdges(initialEdges);
  }, [selectedNodes]);

  return (
    <div className="flow-container">
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        fitView
      >
        <Background />
        <Controls />
      </ReactFlow>
    </div>
  );
};

export default CourseFlow;

// import React, { useLayoutEffect } from 'react';
// import ReactFlow, {
//   Background,
//   Controls,
//   useNodesState,
//   useEdgesState,
//   MarkerType
// } from 'reactflow';
// import dagre from 'dagre';
// import { courseData } from '../prereq';
// import 'reactflow/dist/style.css';
// import './CourseFlow.css';

// const dagreGraph = new dagre.graphlib.Graph();
// dagreGraph.setDefaultEdgeLabel(() => ({}));

// const nodeWidth = 200;
// const nodeHeight = 80;

// const getLayoutedElements = (nodes, edges) => {
//   dagreGraph.setGraph({ rankdir: 'TB', ranksep: 100, nodesep: 50 });

//   nodes.forEach(node => {
//     dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
//   });

//   edges.forEach(edge => {
//     dagreGraph.setEdge(edge.source, edge.target);
//   });

//   dagre.layout(dagreGraph);

//   return nodes.map(node => {
//     const nodeWithPosition = dagreGraph.node(node.id);
//     return {
//       ...node,
//       position: {
//         x: nodeWithPosition.x - nodeWidth / 2,
//         y: nodeWithPosition.y - nodeHeight / 2,
//       },
//     };
//   });
// };

// const CourseFlow = () => {
//   const [nodes, setNodes, onNodesChange] = useNodesState([]);
//   const [edges, setEdges] = useEdgesState([]);

//   useLayoutEffect(() => {
//     const initialNodes = courseData.courses.map(course => ({
//       id: course.id,
//       data: { 
//         label: (
//           <>
//             <div className="course-id">{course.id}</div>
//             <div className="course-name">{course.name}</div>
//           </>
//         )
//       },
//       className: 'course-node',
//       draggable: true
//     }));

//     const initialEdges = courseData.courses.flatMap(course => 
//       course.prerequisites.map(prereq => ({
//         id: `e${prereq}-${course.id}`,
//         source: prereq,
//         target: course.id,
//         type: 'smoothstep',
//         markerEnd: { type: MarkerType.ArrowClosed },
//         className: 'course-edge'
//       }))
//     );

//     const layoutedNodes = getLayoutedElements(initialNodes, initialEdges);
//     setNodes(layoutedNodes);
//     setEdges(initialEdges);
//   }, []);

//   return (
//     <div className="flow-container">
//       <ReactFlow
//         nodes={nodes}
//         edges={edges}
//         onNodesChange={onNodesChange}
//         fitView
//       >
//         <Background />
//         <Controls />
//       </ReactFlow>
//     </div>
//   );
// };

// export default CourseFlow;
