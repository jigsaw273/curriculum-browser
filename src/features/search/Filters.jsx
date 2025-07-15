import React, { useState } from "react"
import "./Filters.css";

const courses = ['SWEN', 'ENGR', 'COMP', 'NWEN', 'AIML', 'CYBR', 'RESE']
const yearlvl = ['100', '200', '300', '400', '500']

export default function Filters({ onCourseFilter, onYearFilter }) {
    const [selectedCourses, setSelectedCourses] = useState([])
    const [selectedYears, setSelectedYears] = useState([])

    const handleCourseChange = (course) => {
        const newSelectedCourses = selectedCourses.includes(course)
            ? selectedCourses.filter(c => c !== course)
            : [...selectedCourses, course]
        setSelectedCourses(newSelectedCourses)
        onCourseFilter(newSelectedCourses)
    }

    const handleYearChange = (year) => {
        const newSelectedYears = selectedYears.includes(year)
            ? selectedYears.filter(y => y !== year)
            : [...selectedYears, year]
        setSelectedYears(newSelectedYears)
        onYearFilter(newSelectedYears)
    }

    return (
        <div className="filter-container">
            {/* <h4>Course Code</h4> */}
            {courses.map((course) => (
                <label className="filter-checkbox" key={course}>
                    <input
                        type="checkbox"
                        value={course}
                        checked={selectedCourses.includes(course)}
                        onChange={() => handleCourseChange(course)}
                    />
                    <span className="checkmark">{course}</span>
                </label>
            ))}

            {/* <h4>Year Level</h4> */}
            {yearlvl.map((year) => (
                <label className="filter-checkbox" key={year}>
                    <input
                        type="checkbox"
                        value={year}
                        checked={selectedYears.includes(year)}
                        onChange={() => handleYearChange(year)}
                    />
                    <span className="checkmark">{year}</span>
                </label>
            ))}
        </div>
    )
}