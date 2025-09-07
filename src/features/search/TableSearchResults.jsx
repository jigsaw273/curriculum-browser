import { Table } from "react-bootstrap";
import "./TableSearchResults.css";
import { useNavigate } from "react-router-dom";

export default function TableSearchResults({ results }) {
  const navigate = useNavigate();

  const handleRowClick = (course) => {
    navigate(`/course/${course.course_code}/${course.course_num}`);

    // Opens VUW official website
    // const url = `https://www.wgtn.ac.nz/courses/${course.course_code}/${course.course_num}`;
    // window.open(url, "_blank");
  };

  return (
    <div className="search-results">
      <Table className="table">
        <thead>
          <tr>
            <th>Course Code</th>
            <th>Course Name</th>
            <th>Course Coordinator</th>
            <th>Trimester</th>
          </tr>
        </thead>

        <tbody>
          {results.map((item) => (
            <tr
              key={item.faculty + item.code}
              onClick={() => handleRowClick(item)}
              style={{ cursor: "pointer" }}
            >
              <td>{item.course_code + item.course_num}</td>
              <td>{item.course_name}</td>
              <td>{item.courseCoordinator}</td>
              <td>{item.trimesterOffered}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
