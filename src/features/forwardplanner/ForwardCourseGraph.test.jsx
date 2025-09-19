// ForwardCourseGraph.test.jsx
import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import ForwardCourseGraph from "./ForwardCourseGraph";

// --- Mock reactflow ---
vi.mock("reactflow", () => ({
  __esModule: true,
  default: ({ children }) => <div data-testid="react-flow">{children}</div>,
  Background: () => <div data-testid="background" />,
  Controls: () => <div data-testid="controls" />,
  Panel: ({ children, position }) => (
    <div data-testid={`panel-${position}`}>{children}</div>
  ),
  useNodesState: () => [[], vi.fn(), vi.fn()],
  useEdgesState: () => [[], vi.fn(), vi.fn()],
  MarkerType: { ArrowClosed: "arrowclosed" },
}));

// --- Mock dagre ---
vi.mock("dagre", () => {
  const Graph = vi.fn(() => ({
    setDefaultEdgeLabel: vi.fn(),
    setGraph: vi.fn(),
    setNode: vi.fn(),
    setEdge: vi.fn(),
    node: vi.fn(() => ({ x: 0, y: 0 })),
  }));
  return {
    __esModule: true,
    default: { graphlib: { Graph }, layout: vi.fn() },
  };
});

// --- Mock hooks and data ---
vi.mock("../../hooks/useForwardPlanner", () => ({
  useForwardPlanner: () => ({
    selectedCourses: [],
    toggleCourse: vi.fn(),
    possibleUnlocks: [],
    unlockedCourses: [],
  }),
}));

vi.mock("../../data/prereq", () => ({
  courseData: { courses: [] },
}));

vi.mock("../../data/unlocks", () => ({
  unlockGraph: {},
}));

describe("ForwardCourseGraph", () => {
  it("renders without crashing", () => {
    render(<ForwardCourseGraph />);
    expect(screen.getByTestId("react-flow")).toBeInTheDocument();
  });

  it("renders the background and controls", () => {
    render(<ForwardCourseGraph />);
    expect(screen.getByTestId("background")).toBeInTheDocument();
    expect(screen.getByTestId("controls")).toBeInTheDocument();
  });

  it("renders panels with correct positions", () => {
    render(<ForwardCourseGraph />);
    expect(screen.getByTestId("panel-top-left")).toBeInTheDocument();
    expect(screen.getByTestId("panel-top-right")).toBeInTheDocument();
  });

  it("toggles layout when button is clicked", () => {
    render(<ForwardCourseGraph />);
    const button = screen.getByRole("button", { name: /horizontal layout/i });
    expect(button).toBeInTheDocument();

    fireEvent.click(button);
    expect(
      screen.getByRole("button", { name: /vertical layout/i })
    ).toBeInTheDocument();
  });
});
