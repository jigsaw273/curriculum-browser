// Filters.test.jsx
import React from "react";
import { render, screen, cleanup } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Filters from "./Filters";
import "@testing-library/jest-dom";

describe("Filters", () => {
  afterEach(() => {
    cleanup();
  });

  it("renders all filter categories and options", () => {
    const mockOnFilterChange = vi.fn();
    render(<Filters onFilterChange={mockOnFilterChange} />);

    // Check category headers
    expect(screen.getByText("Filters")).toBeInTheDocument();
    expect(screen.getByText("Clear Filters")).toBeInTheDocument();
    expect(screen.getByText("Courses")).toBeInTheDocument();
    expect(screen.getByText("Year")).toBeInTheDocument();
    expect(screen.getByText("Trimester")).toBeInTheDocument();

    // Check some specific options
    expect(screen.getByLabelText("SWEN")).toBeInTheDocument();
    expect(screen.getByLabelText("COMP")).toBeInTheDocument();
    expect(screen.getByLabelText("100")).toBeInTheDocument();
    expect(screen.getByLabelText("300")).toBeInTheDocument();
    expect(screen.getByLabelText("Trimester 1")).toBeInTheDocument();
    expect(screen.getByLabelText("Trimester 3")).toBeInTheDocument();
  });

  it("calls onFilterChange when a checkbox is checked", async () => {
    const user = userEvent.setup();
    const mockOnFilterChange = vi.fn();
    render(<Filters onFilterChange={mockOnFilterChange} />);

    const swenCheckbox = screen.getByLabelText("SWEN");
    await user.click(swenCheckbox);

    expect(mockOnFilterChange).toHaveBeenCalledWith({
      courses: ["SWEN"],
      year: [],
      trimester: [],
    });
  });

  it("calls onFilterChange when a checkbox is unchecked", async () => {
    const user = userEvent.setup();
    const mockOnFilterChange = vi.fn();
    render(<Filters onFilterChange={mockOnFilterChange} />);

    // Check and then uncheck a box
    const swenCheckbox = screen.getByLabelText("SWEN");
    await user.click(swenCheckbox); // Check it
    await user.click(swenCheckbox); // Uncheck it

    // Should be called twice: once for check, once for uncheck
    expect(mockOnFilterChange).toHaveBeenCalledTimes(2);

    // Second call should be with empty array
    expect(mockOnFilterChange).toHaveBeenLastCalledWith({
      courses: [],
      year: [],
      trimester: [],
    });
  });

  it("allows multiple selections within the same category", async () => {
    const user = userEvent.setup();
    const mockOnFilterChange = vi.fn();
    render(<Filters onFilterChange={mockOnFilterChange} />);

    const swenCheckbox = screen.getByLabelText("SWEN");
    const compCheckbox = screen.getByLabelText("COMP");

    await user.click(swenCheckbox);
    await user.click(compCheckbox);

    // Should include both selected courses
    expect(mockOnFilterChange).toHaveBeenLastCalledWith({
      courses: ["SWEN", "COMP"],
      year: [],
      trimester: [],
    });
  });

  it("allows selections across different categories", async () => {
    const user = userEvent.setup();
    const mockOnFilterChange = vi.fn();
    render(<Filters onFilterChange={mockOnFilterChange} />);

    await user.click(screen.getByLabelText("SWEN")); // Courses
    await user.click(screen.getByLabelText("300")); // Year
    await user.click(screen.getByLabelText("Trimester 1")); // Trimester

    expect(mockOnFilterChange).toHaveBeenLastCalledWith({
      courses: ["SWEN"],
      year: ["300"],
      trimester: ["Trimester 1"],
    });
  });

  it("clears all filters when Clear Filters is clicked", async () => {
    const user = userEvent.setup();
    const mockOnFilterChange = vi.fn();
    render(<Filters onFilterChange={mockOnFilterChange} />);

    // Select some filters first
    await user.click(screen.getByLabelText("SWEN"));
    await user.click(screen.getByLabelText("300"));
    await user.click(screen.getByLabelText("Trimester 1"));

    // Clear the mock to reset call count before testing clear
    mockOnFilterChange.mockClear();

    // Click the clear button
    const clearButton = screen.getByText("Clear Filters");
    await user.click(clearButton);

    expect(mockOnFilterChange).toHaveBeenCalledTimes(1);
    expect(mockOnFilterChange).toHaveBeenCalledWith({
      courses: [],
      year: [],
      trimester: [],
    });
  });

  it("handles multiple interactions correctly", async () => {
    const user = userEvent.setup();
    const mockOnFilterChange = vi.fn();
    render(<Filters onFilterChange={mockOnFilterChange} />);

    // Complex interaction sequence
    await user.click(screen.getByLabelText("SWEN"));
    await user.click(screen.getByLabelText("COMP"));
    await user.click(screen.getByLabelText("200"));
    await user.click(screen.getByLabelText("Trimester 2"));
    await user.click(screen.getByLabelText("COMP")); // Uncheck COMP
    await user.click(screen.getByLabelText("400"));

    expect(mockOnFilterChange).toHaveBeenLastCalledWith({
      courses: ["SWEN"], // COMP was unchecked
      year: ["200", "400"],
      trimester: ["Trimester 2"],
    });
  });
});
