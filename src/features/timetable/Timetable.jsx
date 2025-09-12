import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const localizer = momentLocalizer(moment);

const COLORS = ["#1E90FF", "#32CD32", "#FFD700", "#FF69B4", "#8A2BE2"];

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
    <div style={{ height: 800, overflowY: "auto" }}>
      <Calendar
        localizer={localizer}
        events={events}
        defaultView="work_week"
        views={["work_week"]}
        min={new Date(0, 0, 0, 8, 0)} // 8 AM
        max={new Date(0, 0, 0, 19, 0)} // 7 PM
        toolbar={false} // hide navigation
        eventPropGetter={eventStyleGetter} // apply color
        // style={{ height: 1600 }} // 12 hours * 200px = 2400px
        formats={{
          dayFormat: (date, culture, loc) => loc.format(date, "dddd"), //remove dates
        }}
      />
    </div>
  );
}

// import { Calendar, momentLocalizer } from "react-big-calendar";
// import moment from "moment";
// import "react-big-calendar/lib/css/react-big-calendar.css";

// const localizer = momentLocalizer(moment);

// export default function Timetable({ days, times, courseName }) {
//   const events = days.map((day, idx) => {
//     const dayNum = moment().day(day).day(); // Monday=1..Sunday=7
//     const [hour, minute] = times[idx].split(":").map(Number);
//     const start = moment().day(dayNum).hour(hour).minute(minute).toDate();
//     const end = moment(start).add(50, "minutes").toDate();

//     return {
//       title: courseName,
//       start,
//       end,
//     };
//   });
//   return (
//     <div style={{ height: 800, overflowY: "auto" }}>
//       <Calendar
//         localizer={localizer}
//         events={events}
//         defaultView="work_week"
//         views={["work_week"]}
//         min={new Date(0, 0, 0, 8, 0)} // 8 AM
//         max={new Date(0, 0, 0, 19, 0)} // 7 PM
//         toolbar={false} // hide navigation
//         // style={{ height: 1600 }} // 12 hours * 200px = 2400px
//         formats={{
//           dayFormat: (date, culture, loc) => loc.format(date, "dddd"), //remove dates
//         }}
//       />
//     </div>
//   );
// }
