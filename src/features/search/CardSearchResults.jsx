import { useNavigate } from "react-router-dom";

export default function CardSearchResults({ results }) {
  const handleRowClick = (course) => {
    window.open(`/course/${course.courseCode}/${course.courseNum}`, "_blank");
  };

  return (
    <div className="space-y-4">
      {results.map((item) => (
        <div
          key={item.faculty + item.code}
          className="p-6 bg-white rounded-lg border border-gray-200 hover:shadow-md transition cursor-pointer mt-4"
          onClick={() => handleRowClick(item)}
        >
          <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
            {/* Left side - details */}
            <div className="flex-1 p-4">
              <h1 className="text-lg font-base text-accent-purple hover:text-dark-purple transition">
                {item.courseId} — {item.courseName}
              </h1>
              <p className="text-sm text-gray-600 mt-1">
                <span className="font-medium">Coordinator:</span>{" "}
                {item.offerings.find((o) => o.courseCoordinator)
                  ?.courseCoordinator || "TBA"}
              </p>
              <p className="text-gray-500 mt-2 text-sm">
                {item.courseDescription}
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
