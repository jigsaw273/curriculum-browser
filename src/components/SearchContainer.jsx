import React, {useState, useEffect} from "react";
import Filters from "./Filters";
import SearchBar from "./SearchBar";
import {data} from '../splitdata.js';

export default function SearchContainer({setResults}){
    const [searchInput, setSearchInput] = useState("")

    // Show all data by default
    useEffect(() => {
        filterData(searchInput);
    }, [searchInput]);

    const filterData = (value) => {
        if (!value) {
            setResults(data); // Show all if input is cleared
            return;
        }

        const search = value.toLowerCase()
        const results = data.filter((course) => {
            const code = course.course_code
            const num = course.course_num
            const name = course.course_name

            return (code+num).toLowerCase().includes(search) || name.toLowerCase().includes(search)
        })
        // const results = data.filter((course) => {
        //     return (
        //         value &&
        //         course &&
        //         (((course.course_code+course.course_num) && 
        //         (course.course_code+course.course_num).toLowerCase().includes(value.toLowerCase())) ||
        //         (course.course_name && 
        //         course.course_name.toLowerCase().includes(value.toLowerCase()))) 
        //     )
        // })
        setResults(results);
    }

   return (
    <SearchBar setSearchInput={setSearchInput} />

   )
}