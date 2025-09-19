// YearPlannerPage.test.jsx
import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom";
import YearPlannerPage from "./YearPlannerPage";

// Mock dependencies
vi.mock("../hooks/useCourseSearch", () => ({
  default: () => ({
    searchInput: "",
    setSearchInput: vi.fn(),
    results: [
      {
        courseId: "SWEN101",
        courseName: "Introduction to Software Engineering",
        trimestersOffered: ["Trimester 1", "Trimester 2"],
        offerings: [
          {
            trimester: "Trimester 1",
            lectureDays: ["Monday", "Wednesday"],
          },
        ],
      },
      {
        courseId: "COMP202",
        courseName: "Data Structures and Algorithms",
        trimestersOffered: ["Trimester 2"],
        offerings: [
          {
            trimester: "Trimester 2",
            lectureDays: ["Tuesday", "Thursday"],
          },
        ],
      },
    ],
  }),
}));

vi.mock("../features/search/SearchBar", () => ({
  default: ({ setSearchInput }) => (
    <input
      data-testid="search-bar"
      onChange={(e) => setSearchInput(e.target.value)}
    />
  ),
}));

vi.mock("../hooks/useTimetableStore", () => ({
  default: () => ({
    addCourse: vi.fn(),
    removeAllCourses: vi.fn(),
  }),
}));

vi.mock("@dnd-kit/core", () => ({
  DndContext: ({ children }) => <div data-testid="dnd-context">{children}</div>,
  useDraggable: () => ({
    attributes: {},
    listeners: {},
    setNodeRef: vi.fn(),
    transform: null,
  }),
  useDroppable: () => ({
    setNodeRef: vi.fn(),
    isOver: false,
  }),
}));

vi.mock("react-hot-toast", () => ({
  Toaster: () => <div data-testid="toaster" />,
  default: {
    success: vi.fn(),
  },
}));

describe("YearPlannerPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the year planner page", () => {
    render(<YearPlannerPage />);

    expect(screen.getByText("Year Planner")).toBeInTheDocument();
    expect(
      screen.getByText("Search, drag and drop courses into trimesters.")
    ).toBeInTheDocument();
    expect(screen.getByTestId("search-bar")).toBeInTheDocument();
    expect(screen.getByText("Plan to Take")).toBeInTheDocument();
    expect(screen.getByText("Trimester 1")).toBeInTheDocument();
    expect(screen.getByText("Trimester 2")).toBeInTheDocument();
    expect(screen.getByText("🗑 Drag here to remove")).toBeInTheDocument();
  });

  it("shows/hides trimester 3 when toggle button is clicked", async () => {
    const user = userEvent.setup();
    render(<YearPlannerPage />);

    // Initially trimester 3 should not be visible
    expect(screen.queryByText("Trimester 3")).not.toBeInTheDocument();

    // Click the toggle button
    const toggleButton = screen.getByText("Add Tri 3");
    await user.click(toggleButton);

    // Now trimester 3 should be visible
    expect(screen.getByText("Trimester 3")).toBeInTheDocument();
    expect(screen.getByText("Remove Tri 3")).toBeInTheDocument();

    // Click again to hide
    await user.click(screen.getByText("Remove Tri 3"));
    expect(screen.queryByText("Trimester 3")).not.toBeInTheDocument();
  });

  it('renders "Add to Timetable" button', () => {
    render(<YearPlannerPage />);
    expect(screen.getByText("Add to Timetable")).toBeInTheDocument();
  });

  it("renders all column headers correctly", () => {
    render(<YearPlannerPage />);

    expect(screen.getByText("Plan to Take")).toBeInTheDocument();
    expect(screen.getByText("Trimester 1")).toBeInTheDocument();
    expect(screen.getByText("Trimester 2")).toBeInTheDocument();
    expect(screen.getByText("🗑 Drag here to remove")).toBeInTheDocument();
  });

  it('shows "Drop Courses Here" message in empty columns', () => {
    render(<YearPlannerPage />);

    // All columns except bin should show the drop message when empty
    const dropMessages = screen.getAllByText("Drop Courses Here");
    expect(dropMessages.length).toBeGreaterThan(0);
  });

  it("handles drag and drop context", () => {
    render(<YearPlannerPage />);
    expect(screen.getByTestId("dnd-context")).toBeInTheDocument();
  });

  it("renders toaster component", () => {
    render(<YearPlannerPage />);
    expect(screen.getByTestId("toaster")).toBeInTheDocument();
  });
});
