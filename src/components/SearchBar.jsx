import React, { useState } from 'react';
import "./SearchBar.css";
import {data} from '../data.js'

const SearchBar = ({setResults}) => {   
  const [input, setInput] = useState("");

    //   const fetchData = (value) => {
    //     fetch("https://jsonplaceholder.typicode.com/users")
    //     .then((response) => response.json())
    //     .then((json) => {
    //             const results = json.filter((user) => {
    //             return value && user && user.name && user.name.toLowerCase().includes(value)
    //         });
    //         setResults(results)
    //     });
    //   };
  const filterData = (value) => {
    const results = data.filter((course) => {
        return (
            value &&
            course &&
            ((course.course_code && 
            course.course_code.toLowerCase().includes(value.toLowerCase())) ||
            (course.course_name && 
            course.course_name.toLowerCase().includes(value.toLowerCase()))) 
        )
    })
    setResults(results);
  }

  const handleChange = (value) => {
    setInput(value)
    //fetchData(value)
    filterData(value)
    console.log(results)
  };

  return (
    <div className='input-wrapper'>
        <input 
            placeholder="Type to search..." 
            value={input} 
            onChange={(e) => handleChange(e.target.value)}
        /> 
    </div>
  );
};

export default SearchBar;
