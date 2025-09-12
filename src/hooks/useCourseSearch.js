import React, { useState, useEffect, useMemo } from "react";
import { courseDetails } from "../data/courseDetails.js";

export default function useCourseSearch(
  initialSearch = "",
  initialFilters = null
) {
  const [searchInput, setSearchInput] = useState(initialSearch);
  const [filters, setFilters] = useState(
    initialFilters || {
      courses: [],
      yearlvl: [],
      trimester: [],
    }
  );

  const results = useMemo(() => {
    let filtered = Object.values(courseDetails);

    // Apply search filter
    if (searchInput) {
      const search = searchInput.toLowerCase();
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
    // Make this modular later
    if (filters.courses.length > 0) {
      filtered = filtered.filter((course) =>
        filters.courses.includes(course.course_code)
      );
    }

    if (filters.trimester.length > 0) {
      filtered = filtered.filter((course) =>
        filters.trimester.includes(course.trimesterOffered)
      );
    }

    // Apply year filters if any are selected
    if (filters.yearlvl.length > 0) {
      filtered = filtered.filter((course) => {
        const courseNum = parseInt(course.courseLevel, 10);
        return filters.yearlvl.some((year) => {
          const yearNum = parseInt(year, 10);
          return courseNum == yearNum;
        });
      });
    }

    return filtered;
  }, [searchInput, filters]);

  return { searchInput, setSearchInput, filters, setFilters, results };
}
