// Timetable.test.jsx
import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import Timetable from "./Timetable";

// Mock react-big-calendar to avoid rendering the actual calendar component
vi.mock("react-big-calendar", () => ({
  Calendar: () => <div data-testid="calendar">Mock Calendar</div>,
  momentLocalizer: () => () => {},
}));

// Mock moment correctly by returning an object with default key
vi.mock("moment", () => ({
  __esModule: true,
  default: () => ({
    day: () => ({
      day: () => 1,
      hour: () => ({
        minute: () => ({
          toDate: () => new Date("2024-01-01T10:00:00"),
        }),
      }),
    }),
    add: () => ({
      toDate: () => new Date("2024-01-01T10:50:00"),
    }),
    toDate: () => new Date("2024-01-01T10:00:00"),
  }),
}));

describe("Timetable", () => {
  const mockOffering = {
    courseName: "Test Course",
    lectureDays: ["Monday"],
    lectureTimes: ["10:00"],
  };

  const mockMultipleOfferings = [
    {
      courseName: "Course 1",
      lectureDays: ["Monday"],
      lectureTimes: ["10:00"],
    },
    {
      courseName: "Course 2",
      lectureDays: ["Tuesday"],
      lectureTimes: ["11:00"],
    },
  ];

  it("renders calendar component", () => {
    render(<Timetable offering={mockOffering} />);
    expect(screen.getByTestId("calendar")).toBeInTheDocument();
  });

  it("renders with empty array", () => {
    render(<Timetable offering={[]} />);
    expect(screen.getByTestId("calendar")).toBeInTheDocument();
  });

  it("renders with multiple offerings", () => {
    render(<Timetable offering={mockMultipleOfferings} />);
    expect(screen.getByTestId("calendar")).toBeInTheDocument();
  });
});
