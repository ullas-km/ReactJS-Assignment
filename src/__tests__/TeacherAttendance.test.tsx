import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import TeacherAttendance from "../pages/TeacherAttendance";

import { getClasses } from "../services/ClassesApi";
import { getSectionsByClass } from "../services/SectionApi";
import { getStudentsByClassSection } from "../services/studentsApi";
import { bulkAddAttendance } from "../services/attendanceApi";

vi.mock("../services/ClassesApi", () => ({
  getClasses: vi.fn(),
}));

vi.mock("../services/SectionApi", () => ({
  getSectionsByClass: vi.fn(),
}));

vi.mock("../services/studentsApi", () => ({
  getStudentsByClassSection: vi.fn(),
}));

vi.mock("../services/attendanceApi", () => ({
  bulkAddAttendance: vi.fn(),
}));

describe("TeacherAttendance", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    vi.mocked(getClasses).mockResolvedValue([
      {
        class_id: 1,
        class_name: "10",
      },
    ]);

    window.alert = vi.fn();
  });

  it("loads classes on mount", async () => {
    render(<TeacherAttendance />);

    await waitFor(() => {
      expect(getClasses).toHaveBeenCalled();
    });

    expect(screen.getByText("10")).toBeInTheDocument();
  });

  it("loads sections when class is selected", async () => {
    vi.mocked(getSectionsByClass).mockResolvedValue([
      {
        section_id: 1,
        section_name: "A",
      },
    ]);

    render(<TeacherAttendance />);

    const classSelect = await screen.findByLabelText("Class");

    fireEvent.change(classSelect, {
      target: { value: "1" },
    });

    await waitFor(() => {
      expect(getSectionsByClass).toHaveBeenCalledWith(1);
    });

    expect(screen.getByText("A")).toBeInTheDocument();
  });

  it("loads students when section is selected", async () => {
    vi.mocked(getSectionsByClass).mockResolvedValue([
      {
        section_id: 1,
        section_name: "A",
      },
    ]);

    vi.mocked(getStudentsByClassSection).mockResolvedValue([
      {
        student_id: 1,
        name: "John",
      },
      {
        student_id: 2,
        name: "Mary",
      },
    ]);

    render(<TeacherAttendance />);

    fireEvent.change(await screen.findByLabelText("Class"), {
      target: { value: "1" },
    });

    fireEvent.change(await screen.findByLabelText("Section"), {
      target: { value: "1" },
    });

    await waitFor(() => {
      expect(getStudentsByClassSection).toHaveBeenCalledWith(1, 1);
    });

    expect(screen.getByText("John")).toBeInTheDocument();
    expect(screen.getByText("Mary")).toBeInTheDocument();
  });

  it("toggles attendance status", async () => {
    vi.mocked(getSectionsByClass).mockResolvedValue([
      {
        section_id: 1,
        section_name: "A",
      },
    ]);

    vi.mocked(getStudentsByClassSection).mockResolvedValue([
      {
        student_id: 1,
        name: "John",
      },
    ]);

    render(<TeacherAttendance />);

    fireEvent.change(await screen.findByLabelText("Class"), {
      target: { value: "1" },
    });

    fireEvent.change(await screen.findByLabelText("Section"), {
      target: { value: "1" },
    });

    await screen.findByText("John");

    expect(screen.getByText("Present")).toBeInTheDocument();

    fireEvent.click(screen.getByText("John"));

    expect(screen.getByText("Absent")).toBeInTheDocument();
  });

  it("marks all students absent", async () => {
    vi.mocked(getSectionsByClass).mockResolvedValue([
      {
        section_id: 1,
        section_name: "A",
      },
    ]);

    vi.mocked(getStudentsByClassSection).mockResolvedValue([
      {
        student_id: 1,
        name: "John",
      },
      {
        student_id: 2,
        name: "Mary",
      },
    ]);

    render(<TeacherAttendance />);

    fireEvent.change(await screen.findByLabelText("Class"), {
      target: { value: "1" },
    });

    fireEvent.change(await screen.findByLabelText("Section"), {
      target: { value: "1" },
    });

    await screen.findByText("John");

    fireEvent.click(screen.getByText("All Absent"));

    expect(screen.getAllByText("Absent")).toHaveLength(2);
  });

  it("marks all students present", async () => {
    vi.mocked(getSectionsByClass).mockResolvedValue([
      {
        section_id: 1,
        section_name: "A",
      },
    ]);

    vi.mocked(getStudentsByClassSection).mockResolvedValue([
      {
        student_id: 1,
        name: "John",
      },
    ]);

    render(<TeacherAttendance />);

    fireEvent.change(await screen.findByLabelText("Class"), {
      target: { value: "1" },
    });

    fireEvent.change(await screen.findByLabelText("Section"), {
      target: { value: "1" },
    });

    await screen.findByText("John");

    fireEvent.click(screen.getByText("John"));

    fireEvent.click(screen.getByText("All Present"));

    expect(screen.getByText("Present")).toBeInTheDocument();
  });

  it("submits attendance", async () => {
    vi.mocked(getSectionsByClass).mockResolvedValue([
      {
        section_id: 1,
        section_name: "A",
      },
    ]);

    vi.mocked(getStudentsByClassSection).mockResolvedValue([
      {
        student_id: 1,
        name: "John",
      },
    ]);

    vi.mocked(bulkAddAttendance).mockResolvedValue({});

    render(<TeacherAttendance />);

    fireEvent.change(await screen.findByLabelText("Class"), {
      target: { value: "1" },
    });

    fireEvent.change(await screen.findByLabelText("Section"), {
      target: { value: "1" },
    });

    await screen.findByText("John");

    fireEvent.click(screen.getByText("Submit Attendance"));

    await waitFor(() => {
      expect(bulkAddAttendance).toHaveBeenCalledTimes(1);
    });
  });
});