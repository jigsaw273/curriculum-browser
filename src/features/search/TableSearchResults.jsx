import "./TableSearchResults.css";

export default function TableSearchResults({ results }) {
  const handleRowClick = (course) => {
    window.open(`/course/${course.courseCode}/${course.courseNum}`, "_blank");
    // window.open(
    //   `https://www.wgtn.ac.nz/courses/${course.courseCode}/${course.courseNum}`,
    //   "_blank"
    // );
  };

  return (
    <div className="search-results">
      <table className="custom-table">
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
              key={item.courseId}
              onClick={() => handleRowClick(item)}
              className="clickable-row"
            >
              <td>{item.courseId}</td>
              <td>{item.courseName}</td>
              <td>
                {item.offerings.find((o) => o.courseCoordinator)
                  ?.courseCoordinator || ""}
              </td>
              <td>
                {Array.isArray(item.trimestersOffered)
                  ? [
                      ...new Set(
                        item.trimestersOffered.flatMap((t) =>
                          t
                            .split(/[\|,]/) // split on | or ,
                            .map((s) => s.trim())
                            .filter(Boolean)
                        )
                      ),
                    ].join(", ")
                  : item.trimestersOffered}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
