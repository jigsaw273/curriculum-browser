import Timetable from "../features/timetable/Timetable";
import useTimetableStore from "../hooks/useTimetableStore";

export default function MyTimetablePage() {
  const myCourses = useTimetableStore((state) => state.courses);
  return <Timetable offering={myCourses} />;
}
