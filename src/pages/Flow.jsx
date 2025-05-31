import React from 'react';
import ReactFlow, {
  Background,
  Controls,
  useNodesState,
  useEdgesState,
  MarkerType
} from 'reactflow';
import { courseData } from '../prereq';
import 'reactflow/dist/style.css';
import './Flow.css';

const CourseFlow = () => {
  const [nodes, setNodes, onNodesChange] = useNodesState(
    courseData.courses.map((course, index) => ({
      id: course.id,
      data: { label: `${course.id}\n${course.name}` },
      position: { 
        x: 100 + (index % 3) * 300, 
        y: 100 + Math.floor(index / 3) * 150 
      },
      className: 'course-node',
      draggable: true
    }))
  );

  const [edges] = useEdgesState(
    courseData.courses.flatMap(course => 
      course.prerequisites.map(prereq => ({
        id: `e${prereq}-${course.id}`,
        source: prereq,
        target: course.id,
        markerEnd: { type: MarkerType.ArrowClosed },
        className: 'course-edge'
      }))
  ));

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