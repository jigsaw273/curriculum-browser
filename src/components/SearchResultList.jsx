import { useState } from "react";
import { Table } from "react-bootstrap";
import "./SearchResultList.css";

export default function SearchResultList({ results }) {
    return (
        <div className="search-results">
            {
                results.map((item) => (
                    <div class="course-info-card">
                        <p>{item.course_code} : {item.course_name}</p>
                        
                    </div>
                ))    
            }
        </div>
    )
}