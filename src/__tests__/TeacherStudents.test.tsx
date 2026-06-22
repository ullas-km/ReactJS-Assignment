import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";

import ViewStudents from "../pages/ViewStudents";

import { getStudents } from "../services/studentsApi";
import { getClasses } from "../services/ClassesApi";
import { getSections } from "../services/SectionApi";

vi.mock("../services/studentsApi", () => ({
  getStudents: vi.fn(),
}));

vi.mock("../services/ClassesApi", () => ({
  getClasses: vi.fn(),
}));

vi.mock("../services/SectionApi", () => ({
  getSections: vi.fn(),
}));

describe("ViewStudents", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    vi.mocked(getClasses).mockResolvedValue([]);
    vi.mocked(getSections).mockResolvedValue([]);
  });

  it("shows loading state initially", () => {
    vi.mocked(getStudents).mockReturnValue(
      new Promise(() => {})
    );

    render(<ViewStudents />);

    expect(
      screen.getByText(/loading students/i)
    ).toBeInTheDocument();
  });

  it("renders students after successful fetch", async () => {
    vi.mocked(getStudents).mockResolvedValue([
      {
        student_id: 1,
        name: "John Doe",
        email: "john@test.com",
        phone: "1234567890",
        class_name: "10",
        section_name: "A",
        class_id: 1,
        section_id: 1,
      },
      {
        student_id: 2,
        name: "Jane Doe",
        email: "jane@test.com",
        phone: "9876543210",
        class_name: "11",
        section_name: "B",
        class_id: 2,
        section_id: 2,
      },
    ]);

    render(<ViewStudents />);

    await waitFor(() => {
      expect(
        screen.getByText("John Doe")
      ).toBeInTheDocument();

      expect(
        screen.getByText("Jane Doe")
      ).toBeInTheDocument();
    });

    expect(
      screen.getByText("john@test.com")
    ).toBeInTheDocument();

    expect(
      screen.getByText("jane@test.com")
    ).toBeInTheDocument();

    expect(getStudents).toHaveBeenCalledTimes(1);
    expect(getClasses).toHaveBeenCalledTimes(1);
    expect(getSections).toHaveBeenCalledTimes(1);
  });

  it("handles API error gracefully", async () => {
    const consoleSpy = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});

    vi.mocked(getStudents).mockRejectedValue(
      new Error("Failed to load")
    );

    render(<ViewStudents />);

    await waitFor(() => {
      expect(
        screen.queryByText(/loading students/i)
      ).not.toBeInTheDocument();
    });

    expect(consoleSpy).toHaveBeenCalled();

    consoleSpy.mockRestore();
  });

  it("renders table headers", async () => {
    vi.mocked(getStudents).mockResolvedValue([]);

    render(<ViewStudents />);

    await waitFor(() => {
      expect(
        screen.getByText("ID")
      ).toBeInTheDocument();
    });

    expect(
      screen.getByText("Name")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Email")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Phone")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Class")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Section")
    ).toBeInTheDocument();
  });
});