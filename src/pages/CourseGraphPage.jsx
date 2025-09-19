import React, { useState, useEffect } from "react";
import ForwardCourseGraph from "../features/fowardplanner/ForwardCourseGraph";

export default function CourseGraphPage() {
  //   const [tableDisplay, setTableDisplay] = useState(true);

  //   useEffect(() => {
  //     setDisplayResults(results);
  //   }, [results]);

  return (
    <>
      <ForwardCourseGraph></ForwardCourseGraph>
    </>
  );
}
