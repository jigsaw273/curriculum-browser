import React, { useState } from "react"
import "./Filter.css";

const courses = ['SWEN', 'COMP', 'NWEN', 'AIML', 'CYBR']
const yearlvl = ['100', '200', '300', '400']

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
            {courses.map((course) => (
                <label className="filter-checkbox" key={course}>
                    <input
                        type="checkbox"
                        value={course}
                        checked={selectedCourses.includes(course)}
                        onChange={() => handleCourseChange(course)}
                    />
                    <span>{course}</span>
                </label>
            ))}
            
            {yearlvl.map((year) => (
                <label className="filter-checkbox" key={year}>
                    <input
                        type="checkbox"
                        value={year}
                        checked={selectedYears.includes(year)}
                        onChange={() => handleYearChange(year)}
                    />
                    <span>{year}</span>
                </label>
            ))}
        </div>
    )
}