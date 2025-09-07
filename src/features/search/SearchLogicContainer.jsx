import React, { useState, useEffect } from "react";
import Filters from "./Filters.jsx";
import SearchBar from "./SearchBar.jsx";
import { data } from "../../data/splitdata.js";
// import "./SearchContainer.css";

export default function SearchLogicContainer({ setResults }) {
  const [searchInput, setSearchInput] = useState("");
  const [filters, setFilters] = useState({
    courses: [],
    yearlvl: [],
    trimester: [],
  });

  useEffect(() => {
    filterData(searchInput, filters);
  }, [searchInput, filters]);

  const filterData = (value, { courses, yearlvl, trimester }) => {
    let filtered = data;

    // Apply search filter
    if (value) {
      const search = value.toLowerCase();
      filtered = filtered.filter((course) => {
        const code = course.course_code || "";
        const num = course.course_num || "";
        const name = course.course_name || "";
        return (
          (code + num).toLowerCase().includes(search) ||
          name.toLowerCase().includes(search)
        );
      });
    }

    // Apply course filters if any are selected
    if (courses.length > 0) {
      filtered = filtered.filter((course) =>
        courses.includes(course.course_code)
      );
    }

    if (trimester.length > 0) {
      filtered = filtered.filter((course) =>
        trimester.includes(course.trimesterOffered)
      );
    }

    // Apply year filters if any are selected
    if (yearlvl.length > 0) {
      filtered = filtered.filter((course) => {
        const courseNum = parseInt(course.courseLevel, 10);
        return yearlvl.some((year) => {
          const yearNum = parseInt(year, 10);
          return courseNum == yearNum;
        });
      });
    }

    setResults(filtered);
  };

  const handleFilters = (selectedFilters) => {
    setFilters(selectedFilters);
  };

  return (
    <>
      <SearchBar setSearchInput={setSearchInput} />
      <div className="filters-sidebar">
        <Filters onFilterChange={setFilters} />
      </div>
    </>
  );
}
