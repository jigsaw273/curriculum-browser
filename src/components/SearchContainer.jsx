import React, { useState, useEffect } from "react";
import Filters from "./Filters";
import SearchBar from "./SearchBar";
import { data } from '../splitdata.js';

export default function SearchContainer({ setResults }) {
    const [searchInput, setSearchInput] = useState("");
    const [courseFilters, setCourseFilters] = useState([]);
    const [yearFilters, setYearFilters] = useState([]);

    useEffect(() => {
        filterData(searchInput, courseFilters, yearFilters);
    }, [searchInput, courseFilters, yearFilters]);

    const filterData = (value, courses, years) => {
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

        // Apply year filters if any are selected
        if (years.length > 0) {
            filtered = filtered.filter(course => {
                const courseNum = parseInt(course.course_num, 10);
                return years.some(year => {
                    const yearNum = parseInt(year, 10);
                    return courseNum >= yearNum && courseNum < yearNum + 100;
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

    return (
        <>
            <SearchBar setSearchInput={setSearchInput} />
            <Filters 
                onCourseFilter={handleCourseFilter} 
                onYearFilter={handleYearFilter} 
            />
        </>
    )
}