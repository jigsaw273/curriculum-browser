import React from "react"

const courses = ['SWEN', 'COMP', 'NWEN','AIML', 'CYBR']
const yearlvl = ['100', '200', '300', '400']

function handleFilter(value){
    console.log(value)
}

export default function Filters(){ 
    return (
        <div>
            {courses.map((course) => (
                <label className="filter-checkbox" key={course}>
                    <input type="checkbox" 
                        value={course}
                        onChange={() => onCourseFilter(course)}    
                    />
                    <span>{course}</span>
                </label>
            ))}
            {yearlvl.map((year) => (
                <label className="filter-checkbox" key={year}>
                    <input type="checkbox" 
                        value={year}
                        onChange={() => onYearFilter(year)}    
                    />
                    <span>{year}</span>
                </label>
            ))}
        </div>
    )
}

// export default function SearchBar({setResults}) {   
//   const [input, setInput] = useState("");
//   // Show all data by default
//   useEffect(() => {setResults(data);}, []);

//   const filterData = (value) => {
//     if (!value) {
//         setResults(data); // Show all if input is cleared
//         return;
//     }

//     const results = data.filter((course) => {
//         return (
//             value &&
//             course &&
//             (((course.course_code+course.course_num) && 
//             (course.course_code+course.course_num).toLowerCase().includes(value.toLowerCase())) ||
//             (course.course_name && 
//             course.course_name.toLowerCase().includes(value.toLowerCase()))) 
//         )
//     })
//     setResults(results);
//   }

//   const handleChange = (value) => {
//     setInput(value)
//     //fetchData(value)
//     filterData(value)
//     console.log(results)
//   };

//   return (
//     <div className='input-wrapper'>
//         <input 
//             placeholder="Type to search..." 
//             value={input} 
//             onChange={(e) => handleChange(e.target.value)}
//         /> 
//     </div>
//   );
// };
