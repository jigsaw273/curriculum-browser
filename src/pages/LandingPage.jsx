import { useNavigate } from "react-router-dom";

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-br from-[#1fd656] to-accent-purple flex flex-col items-center justify-center text-white text-center">
      <h1 className="text-5xl font-bold mb-4">VUWPlanIt</h1>
      <p className="text-lg mt-4 mb-10 max-w-md">
        Plan, organize, and explore your academic year. From courses to
        timetables to forward planning, everything you need in one tool.
      </p>
      <button
        onClick={() => navigate("/search")}
        className="px-6 py-3 bg-white text-accent-purple font-semibold rounded-lg shadow-lg hover:bg-gray-200 transition"
      >
        Continue to Tool →
      </button>
    </div>
  );
}
