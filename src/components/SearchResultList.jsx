import { useState } from "react";
import { Table } from "react-bootstrap";

export const SearchResultList = ({ results }) => {
    return (
        <div className="search-results">
             <Table>
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
                    <tr key={item.faculty+item.code}>
                        <td>{item.course_code}</td>
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

// results.map((result, id) => {
                //     return <div key={id}>{result.name}</div>
                // })