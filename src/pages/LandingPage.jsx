// LandingPage.jsx
import { useNavigate } from "react-router-dom";

export default function LandingPage({ onContinue }) {
  return (
    <div className="fixed inset-0 z-50 bg-gradient-to-br from-[#8ee093] to-accent-purple flex flex-col items-center justify-center text-white text-center">
      <h1 className="text-5xl font-bold mb-4">VUWPlanIt</h1>
      <p className="text-lg mb-8 max-w-md">
        Plan your courses, timetables, and degree progress with ease.
      </p>
      <button
        onClick={onContinue}
        className="px-6 py-3 bg-white text-accent-purple font-semibold rounded-lg shadow-lg hover:bg-gray-200 transition"
      >
        Continue to Tool →
      </button>
    </div>
  );
}
