// MyTimetablePage.test.jsx
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import MyTimetablePage from "./MyTimetablePage";

// Mock Timetable component with a simple implementation
vi.mock("../features/timetable/Timetable", () => ({
  __esModule: true,
  default: ({ offering }) => (
    <div data-testid="timetable">
      {offering.length ? offering.map((c) => c.courseName).join(", ") : "empty"}
    </div>
  ),
}));

// Mock html2canvas
vi.mock("html2canvas", () => ({
  __esModule: true,
  default: vi.fn(() =>
    Promise.resolve({
      toDataURL: () => "data:image/png;base64,fakeimage",
    })
  ),
}));

// Mock useTimetableStore - all variables defined inside to avoid hoisting issues
vi.mock("../hooks/useTimetableStore", () => {
  const mockRemoveCourse = vi.fn();
  const mockRemoveManyCourses = vi.fn();
  const mockHydrate = vi.fn();

  const mockCourses = [
    { courseName: "COMP101", trimester: "Trimester 1" },
    { courseName: "COMP202", trimester: "Trimester 2" },
    { courseName: "COMP303", trimester: "Trimester 1" },
  ];

  const mockStore = vi.fn((selector) => {
    const state = {
      courses: mockCourses,
      removeCourse: mockRemoveCourse,
      removeManyCourses: mockRemoveManyCourses,
    };
    return selector(state);
  });

  mockStore.persist = {
    rehydrate: mockHydrate,
  };

  return {
    __esModule: true,
    default: mockStore,
    // Export the mock functions for testing
    mockRemoveCourse,
    mockRemoveManyCourses,
    mockHydrate,
  };
});

// Import the mock functions from the store mock
const { mockRemoveCourse, mockRemoveManyCourses, mockHydrate } = vi.mocked(
  import("../hooks/useTimetableStore")
);

describe("MyTimetablePage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders header and description", () => {
    render(<MyTimetablePage />);

    expect(
      screen.getByRole("heading", { name: /my timetable/i })
    ).toBeInTheDocument();

    expect(
      screen.getByText(/build, view and export your course timetable/i)
    ).toBeInTheDocument();
  });

  it("renders trimester tabs", () => {
    render(<MyTimetablePage />);

    expect(
      screen.getByRole("button", { name: /trimester 1/i })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /trimester 2/i })
    ).toBeInTheDocument();
  });

  it("shows courses for selected trimester", () => {
    render(<MyTimetablePage />);

    // Default should be trimester 1
    expect(screen.getByTestId("timetable")).toHaveTextContent(
      "COMP101, COMP303"
    );

    // Switch to trimester 2
    fireEvent.click(screen.getByRole("button", { name: /trimester 2/i }));
    expect(screen.getByTestId("timetable")).toHaveTextContent("COMP202");
  });
});
