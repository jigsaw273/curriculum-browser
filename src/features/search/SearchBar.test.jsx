// SearchBar.test.jsx
import React from "react";
import { describe, it, expect, vi, afterEach } from "vitest";
import { render, screen, cleanup } from "@testing-library/react"; // Add cleanup
import userEvent from "@testing-library/user-event";
import SearchBar from "./SearchBar";
import "@testing-library/jest-dom"; // Add this import

describe("SearchBar", () => {
  // Clean up after each test
  afterEach(() => {
    cleanup();
  });

  it("renders an input field with the correct placeholder", () => {
    const mockSetSearchInput = vi.fn();
    render(<SearchBar setSearchInput={mockSetSearchInput} />);

    const inputElement = screen.getByPlaceholderText(/search for courses/i);
    expect(inputElement).toBeInTheDocument();
  });

  it("calls setSearchInput when user types", async () => {
    const user = userEvent.setup();
    const mockSetSearchInput = vi.fn();
    render(<SearchBar setSearchInput={mockSetSearchInput} />);

    const inputElement = screen.getByPlaceholderText(/search for courses/i);
    await user.type(inputElement, "SWEN");

    expect(mockSetSearchInput).toHaveBeenCalledTimes(4);
    expect(mockSetSearchInput).toHaveBeenLastCalledWith("SWEN");
  });
});
