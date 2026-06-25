import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";

import TeacherViewAttendance from "../pages/TeacherViewAttendance";

import { getClasses } from "../services/ClassesApi";
import { getSectionsByClass } from "../services/SectionApi";
import { getAttendanceByFilters } from "../services/attendanceApi";

vi.mock("../services/ClassesApi", () => ({
  getClasses: vi.fn(),
}));

vi.mock("../services/SectionApi", () => ({
  getSectionsByClass: vi.fn(),
}));

vi.mock("../services/attendanceApi", () => ({
  getAttendanceByFilters: vi.fn(),
}));

describe("TeacherViewAttendance", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    vi.mocked(getClasses).mockResolvedValue([
      {
        class_id: 1,
        class_name: "Class 1",
      },
    ]);

    vi.mocked(getSectionsByClass).mockResolvedValue([
      {
        section_id: 1,
        section_name: "A",
      },
    ]);

    vi.mocked(getAttendanceByFilters).mockResolvedValue([
      {
        student_id: 1,
        name: "John",
        status: "present",
      },
      {
        student_id: 2,
        name: "Mary",
        status: "absent",
      },
    ]);
  });

  it("renders attendance page", async () => {
    render(<TeacherViewAttendance />);

    expect(
      screen.getByText("View Attendance")
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: /search/i })
    ).toBeInTheDocument();

    await waitFor(() => {
      expect(getClasses).toHaveBeenCalled();
    });
  });

  it("loads classes on mount", async () => {
    render(<TeacherViewAttendance />);

    expect(
      await screen.findByText("Class 1")
    ).toBeInTheDocument();
  });

  it("displays attendance records after search", async () => {
    const user = userEvent.setup();

    render(<TeacherViewAttendance />);

    await user.click(
      screen.getByRole("button", {
        name: /search/i,
      })
    );

    expect(
      await screen.findByText("John")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Mary")
    ).toBeInTheDocument();

    expect(
      screen.getByText("✅ Present")
    ).toBeInTheDocument();

    expect(
      screen.getByText("❌ Absent")
    ).toBeInTheDocument();
  });

  it("shows empty state initially", () => {
    render(<TeacherViewAttendance />);

    expect(
      screen.getByText("Select filters and click Search")
    ).toBeInTheDocument();
  });

  it("shows empty state when no records found", async () => {
    const user = userEvent.setup();

    vi.mocked(getAttendanceByFilters).mockResolvedValue([]);

    render(<TeacherViewAttendance />);

    await user.click(
      screen.getByRole("button", {
        name: /search/i,
      })
    );

    await waitFor(() => {
      expect(
        screen.getByText("Select filters and click Search")
      ).toBeInTheDocument();
    });
  });
});