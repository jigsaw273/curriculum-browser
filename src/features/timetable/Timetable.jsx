import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./Timetable.css";
const localizer = momentLocalizer(moment);
const COLORS = [
  "#7465c3",
  "#d88698",
  "#55977d",
  "#3f7aa0",
  "#9b6fa0",
  "#5f9b8f",
  "#d89a6a",
  "#715a99",
  "#c276b5",
  "#4a8b99",
  "#c1a05e",
  "#8266a6",
];

export default function Timetable({ offering }) {
  // Ensure we always have an array
  const offeringsArray = Array.isArray(offering) ? offering : [offering];

  // Build events for all offerings
  const events = offeringsArray.flatMap((off, offIdx) =>
    off.lectureDays.map((day, idx) => {
      const dayNum = moment().day(day).day(); // Monday=1..Sunday=7
      const [hour, minute] = off.lectureTimes[idx].split(":").map(Number);
      const start = moment().day(dayNum).hour(hour).minute(minute).toDate();
      const end = moment(start).add(50, "minutes").toDate();

      return {
        title: off.courseName,
        start,
        end,
        allDay: false,
        // Assign a colour based on offering index
        color: COLORS[offIdx % COLORS.length],
      };
    })
  );

  // Custom event style to apply color
  const eventStyleGetter = (event) => {
    return {
      style: {
        backgroundColor: event.color,
        borderRadius: "4px",
        color: "white",
        border: "none",
      },
    };
  };

  return (
    <div style={{ height: 750, overflowY: "auto" }}>
      <Calendar
        localizer={localizer}
        events={events}
        defaultView="work_week"
        views={["work_week"]}
        min={new Date(0, 0, 0, 9, 0)} // 9 AM
        max={new Date(0, 0, 0, 17, 0)} // 6 PM
        toolbar={false} // hide navigation
        eventPropGetter={eventStyleGetter} // apply color
        formats={{
          dayFormat: (date, culture, loc) => loc.format(date, "dddd"), //remove dates
        }}
      />
    </div>
  );
}
