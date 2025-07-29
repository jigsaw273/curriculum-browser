import { useState, useEffect } from 'react';
import { unlockGraph } from '../../data/unlocks.js';
import { courses } from '../../data/courses.js';
import './ForwardPlanner.css'

function ForwardPlanner() {
const [selectedCourses, setSelectedCourses] = useState([])
const [possibleUnlocks, setPossibleUnlocks] = useState([])
const [unlockedCourses, setUnlockedCourses] = useState([])

function toggleCourse(courseId){
    setSelectedCourses((prev) => {
    if (prev.includes(courseId)) { 
        return prev.filter(id => id !== courseId); // If already selected, remove it
    } else {
        return [...prev, courseId]; // If not selected, add it
    }
    });
};

//for each true unlock, if it in selectedCourses, remove frmo trueUnlock

// Run this whenever selectedCourses changes
useEffect(() => {
    const unlockCandidates = getUnlockedCourses(selectedCourses);

    const trueUnlocked = unlockCandidates.filter((courseId) => 
    checkTrueUnlock(courseId, selectedCourses)
    );
    
    const filteredTrueUnlocked = trueUnlocked.filter((courseId) => !selectedCourses.includes(courseId))

    setPossibleUnlocks(unlockCandidates);
    setUnlockedCourses(filteredTrueUnlocked);
}, [selectedCourses]);


function checkTrueUnlock(courseId, selectedCourses) {
    const course = courses[courseId];
    const prereqs = course?.prerequisites;

    if (!prereqs || (prereqs.type === "AND" && prereqs.clauses.length === 0)) {
    return true;
    }

    return evaluateClause(prereqs, selectedCourses);
}

function evaluateClause(clause, selectedCourses) {
    if (clause.type === "AND") {
    return clause.clauses.every(sub => evaluateClause(sub, selectedCourses));
    }

    if (clause.type === "OR") {
    return clause.clauses.some(sub => evaluateClause(sub, selectedCourses));
    }

    if (clause.type === "COURSE") {
    return selectedCourses.includes(clause.course);
    }

    if (clause.type === "POINTS") {
    const relevantCourses = selectedCourses
        .map(id => courses[id])
        .filter(c => 
        clause.subjects.includes(c.subject) &&
        (!clause.level || c.level >= clause.level)
        );

    const totalPoints = relevantCourses.reduce((sum, c) => sum + c.points, 0);
    return totalPoints >= clause.minPoints;
    }

    return false;
}

//Note: AI Generate Function for now, replace later
function getUnlockedCourses(selectedCourses) {
const unlockedSet = new Set();

selectedCourses.forEach(course => {
    const entry = unlockGraph[course];
    if (entry && entry.unlocks) {
    entry.unlocks.forEach(unlockedCourse => unlockedSet.add(unlockedCourse));
    }
});
return Array.from(unlockedSet);
}

return (
    <div className="App">
    <header className="App-header">
        {Object.keys(courses).map(courseId => (
        <button
            key={courseId}
            onClick={() => toggleCourse(courseId)}
            className={selectedCourses.includes(courseId) ? 'selected' : ''} //if the id is in the list of selected courses then mark className as 'selected'
        >
            {courseId}
        </button> 
        ))}
        <div className='card'>
        <h3>True Unlock</h3>
        {unlockedCourses.map(e => (
            <p key={e}>{e}</p>
        ))}
        </div>
        <div className='card'>
        <h3>Possible Unlocks</h3>
        {possibleUnlocks.map(e => (
            <p key={e}>{e}</p>
        ))}
        </div>
        
    </header>
    </div>
)


}

export default ForwardPlanner;