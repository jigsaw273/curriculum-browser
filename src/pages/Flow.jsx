import React, { useCallback } from 'react';
import ReactFlow, {
  Background,
  Controls,
  addEdge,
  useNodesState,
  useEdgesState,
  MarkerType
} from 'reactflow';
import 'reactflow/dist/style.css';

const courseData = {
  "courses": [
    {
      "id": "cs101",
      "name": "Introduction to Computer Science",
      "prerequisites": []
    },
    {
      "id": "cs102",
      "name": "Data Structures",
      "prerequisites": ["cs101"]
    },
    {
      "id": "cs201",
      "name": "Algorithms",
      "prerequisites": ["cs102"]
    },
    {
      "id": "cs202",
      "name": "Discrete Mathematics",
      "prerequisites": ["cs101"]
    },
    {
      "id": "cs301",
      "name": "Database Systems",
      "prerequisites": ["cs201", "cs202"]
    },
    {
      "id": "cs302",
      "name": "Operating Systems",
      "prerequisites": ["cs201"]
    },
    {
      "id": "cs401",
      "name": "Software Engineering",
      "prerequisites": ["cs301", "cs302"]
    },
    {
      "id": "cs402",
      "name": "Computer Networks",
      "prerequisites": ["cs302"]
    },
    {
      "id": "cs501",
      "name": "Artificial Intelligence",
      "prerequisites": ["cs201", "cs202"]
    },
    {
      "id": "cs502",
      "name": "Capstone Project",
      "prerequisites": ["cs401", "cs402", "cs501"]
    }
  ]
};

const initialNodes = courseData.courses.map((course, index) => ({
  id: course.id,
  data: { label: `${course.id}\n${course.name}` },
  position: { 
    x: 100 + (index % 3) * 300, 
    y: 100 + Math.floor(index / 3) * 150 
  },
  style: {
    border: '1px solid #777',
    borderRadius: '5px',
    padding: '10px',
    backgroundColor: '#fff',
    width: '180px',
    fontSize: '12px',
    textAlign: 'center',
    whiteSpace: 'pre-wrap'
  }
}));

const initialEdges = courseData.courses.flatMap(course => 
  course.prerequisites.map(prereq => ({
    id: `e${prereq}-${course.id}`,
    source: prereq,
    target: course.id,
    markerEnd: {
      type: MarkerType.ArrowClosed,
    },
    style: {
      strokeWidth: 2,
    },
  }))
);

const CourseFlow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );

  return (
    <div style={{ width: '80vw', height: '80vh', backgroundColor: 'darkslateblue' }}> 
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        fitView
      >
        <Background color="#fff" gap={16} />
        <Controls style={{ backgroundColor: 'rgba(248, 247, 250, 0.8)' }} />
      </ReactFlow>
    </div>
  );
};

export default CourseFlow;