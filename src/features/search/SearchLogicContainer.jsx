import React, { useState, useEffect } from "react";
import Filters from "./Filters.jsx";
import SearchBar from "./SearchBar.jsx";
import { data } from '../../data/splitdata.js';
import "./SearchContainer.css";

export default function SearchLogicContainer({ setResults }) {
    const [searchInput, setSearchInput] = useState("");
    const [courseFilters, setCourseFilters] = useState([]);
    const [yearFilters, setYearFilters] = useState([]);
    const [triFilters, setTriFilters] = useState([]);

    useEffect(() => {
        filterData(searchInput, courseFilters, yearFilters, triFilters);
    }, [searchInput, courseFilters, yearFilters, triFilters]);

    const filterData = (value, courses, years, tris) => {
        let filtered = data;

        // Apply search filter
        if (value) {
            const search = value.toLowerCase();
            filtered = filtered.filter((course) => {
                const code = course.course_code || "";
                const num = course.course_num || "";
                const name = course.course_name || "";
                return (code + num).toLowerCase().includes(search) || 
                       name.toLowerCase().includes(search);
            });
        }

        // Apply course filters if any are selected
        if (courses.length > 0) {
            filtered = filtered.filter(course => 
                courses.includes(course.course_code)
            );
        }

        if (tris.length > 0) {
            filtered = filtered.filter(course => 
                tris.includes(course.trimesterOffered)
            );
        }

        // Apply year filters if any are selected
        if (years.length > 0) {
            filtered = filtered.filter(course => {
                const courseNum = parseInt(course.courseLevel, 10);
                return years.some(year => {
                    const yearNum = parseInt(year, 10);
                    return courseNum == yearNum;
                });
            });
        }

        setResults(filtered);
    }

    const handleCourseFilter = (selectedCourses) => {
        setCourseFilters(selectedCourses);
    }

    const handleYearFilter = (selectedYears) => {
        setYearFilters(selectedYears);
    }

    const handleTriFilter = (selectedTri) => {
        setTriFilters(selectedTri);
    }

    return (
        <>
            <SearchBar setSearchInput={setSearchInput} />
            <div className="filters-sidebar">
                <Filters 
                    onCourseFilter={handleCourseFilter} 
                    onYearFilter={handleYearFilter} 
                    onTriFilter={handleTriFilter} 
                />
            </div>
        </>
    )
}