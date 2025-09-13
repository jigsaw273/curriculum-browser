import { useNavigate } from "react-router-dom";

export default function CardSearchResults({ results }) {
  const navigate = useNavigate();

  const handleRowClick = (course) => {
    navigate(`/course/${course.courseCode}/${course.courseNum}`);
  };

  return (
    <div className="search-results">
      {results.map((item) => (
        <div
          key={item.faculty + item.code}
          className="rounded-xl bg-off-white text-black white p-8 my-4"
        >
          <h1 className="text-xl">{item.courseId}</h1>
          <h1>{item.courseName}</h1>
          <p>{item.courseCoordinator}</p>
          <p>{item.trimesterOffered}</p>
        </div>
      ))}
    </div>
  );
}
