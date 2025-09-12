import { useNavigate } from "react-router-dom";

export default function CardSearchResults({ results }) {
  const navigate = useNavigate();

  const handleRowClick = (course) => {
    navigate(`/course/${course.course_code}/${course.course_num}`);

    // Opens VUW official website
    // const url = `https://www.wgtn.ac.nz/courses/${course.course_code}/${course.course_num}`;
    // window.open(url, "_blank");
  };

  return (
    <div className="search-results">
      {results.map((item) => (
        <div
          key={item.faculty + item.code}
          className="rounded-xl bg-off-white text-black white p-8 my-4"
        >
          <h1 className="text-xl">{item.course_code + item.course_num}</h1>
          <h1>{item.course_name}</h1>
          <p>{item.courseCoordinator}</p>
          <p>{item.trimesterOffered}</p>
        </div>
      ))}
    </div>
  );
}
