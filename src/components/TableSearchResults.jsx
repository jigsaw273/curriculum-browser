import { useState } from "react";
import { Table } from "react-bootstrap";
import "./TableSearchResults.css";

export const TableSearchResults = ({ results }) => {
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
