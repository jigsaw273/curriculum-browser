import { Table } from "react-bootstrap";
import "./TableSearchResults.css";

export default function TableSearchResults({results}){
    const handleRowClick = (course) => {
        const url = `https://www.wgtn.ac.nz/courses/${course.course_code}/${course.course_num}`;
        window.open(url, '_blank');
    };

    return (
        <div className="search-results">
             <Table className="table">

                <thead>
                    <tr>
                    <th>Course Code</th>
                    <th>Course Name</th>
                    <th>Professor</th>
                    <th>Points</th>
                    </tr>
                </thead>
    
                <tbody>
                    {results.map((item) => (
                    <tr key={item.faculty+item.code}
                        onClick={() => handleRowClick(item)}
                        style={{cursor: 'pointer'}}
                    >
                        <td>{item.course_code+item.course_num}</td>
                        <td>{item.course_name}</td>
                        <td>{item.professor_name}</td>
                        <td>{item.points}</td>
                    </tr>
                    ))}
                    
                </tbody>
            </Table>
        </div>
    )
}
