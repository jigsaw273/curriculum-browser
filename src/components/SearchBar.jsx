import React, { useState, useEffect } from 'react';
import "./SearchBar.css";
//import {data} from '../data.js'

export default function SearchBar({setSearchInput}) {   
  const [input, setInput] = useState("");
  
  const handleChange = (value) => {
    setInput(value)
    setSearchInput(value);
    //fetchData(value)
    //filterData(value)
    //console.log(results)
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