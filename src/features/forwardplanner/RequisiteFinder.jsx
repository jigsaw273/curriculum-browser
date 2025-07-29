import { useState } from 'react';
import { unlockGraph } from '../../data/unlocks.js';
import { courses } from '../../data/courses.js';
import './ForwardPlanner.css'

function Requisites() {
  const [unlockedCourses, setUnlockedCourses] = useState([])
  const [prerequisites, setPrerequisites] = useState([])

  return (
    <div className="App">
      <header className="App-header">

        {Object.keys(courses).map(courseId => (
          <button 
            key={courseId} 
            onClick={() => findRequisites(courseId)}
          >
            {courseId}
          </button> 
        ))}

        <div className='card'>
          <h3>Prerequisites</h3>
          {prerequisites.map(e => (
            <p key={e}>{e}</p>
          ))}
        </div>
        <div className='card'>
          <h3>Unlocked Courses</h3>
          {unlockedCourses.map(e => (
            <p key={e}>{e}</p>
          ))}
        </div>
      </header>
    </div>
  );

  function findRequisites(courseId){
  setUnlockedCourses(unlockGraph[courseId]?.unlocks || [])
  setPrerequisites(() => parsePrerequisites(courses[courseId].prerequisites, []));
  }

  function parsePrerequisites(prereqs, courses){
      if (prereqs.type == "AND" || prereqs.type == "OR"){
          prereqs.clauses.forEach(clause => {
              parsePrerequisites(clause, courses)
          })
      } else if (prereqs.type == "COURSE"){
          courses.push(prereqs.course)
      } 
      return courses;   
  } 
}

export default Requisites;

