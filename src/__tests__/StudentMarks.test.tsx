import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";

import StudentMarks from "../pages/StudentMarks";

import { getStudentMarks } from "../services/marksApi";
import { getExams } from "../services/dropdownsApi";

vi.mock("../services/marksApi", () => ({
  getStudentMarks: vi.fn(),
}));

vi.mock("../services/dropdownsApi", () => ({
  getExams: vi.fn(),
}));

describe("StudentMarks", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("shows loading state initially", () => {
    vi.mocked(getStudentMarks).mockImplementation(
      () => new Promise(() => {})
    );

    vi.mocked(getExams).mockImplementation(
      () => new Promise(() => {})
    );

    render(<StudentMarks />);

    expect(
      screen.getByText(/loading marks/i)
    ).toBeInTheDocument();
  });
  it("shows fail badge when marks below 40", async () => {
    vi.mocked(getStudentMarks).mockResolvedValue([
      {
        id: 1,
        exam_id: 1,
        exam_name: "Mid Term",
        subject_name: "Math",
        marks: 25,
      },
    ]);

    vi.mocked(getExams).mockResolvedValue([
      {
        id: 1,
        exam_name: "Mid Term",
      },
    ]);

    render(<StudentMarks />);

    expect(
      await screen.findByText("Fail")
    ).toBeInTheDocument();
  });

  it("shows no marks found when marks array is empty", async () => {
    vi.mocked(getStudentMarks).mockResolvedValue([]);

    vi.mocked(getExams).mockResolvedValue([
      {
        id: 1,
        exam_name: "Mid Term",
      },
    ]);

    render(<StudentMarks />);

    expect(
      await screen.findByText(/no marks found/i)
    ).toBeInTheDocument();
  });

  it("filters marks by selected exam", async () => {
    const user = userEvent.setup();

    vi.mocked(getStudentMarks).mockResolvedValue([
      {
        id: 1,
        exam_id: 1,
        exam_name: "Mid Term",
        subject_name: "Math",
        marks: 80,
      },
      {
        id: 2,
        exam_id: 2,
        exam_name: "Final Exam",
        subject_name: "Science",
        marks: 90,
      },
    ]);

    vi.mocked(getExams).mockResolvedValue([
      {
        id: 1,
        exam_name: "Mid Term",
      },
      {
        id: 2,
        exam_name: "Final Exam",
      },
    ]);

    render(<StudentMarks />);

    await screen.findByText("Math");

    const select = screen.getByRole("combobox");

    await user.selectOptions(select, "2");

    await waitFor(() => {
      expect(
        screen.getByText("Science")
      ).toBeInTheDocument();
    });

    expect(
      screen.queryByText("Math")
    ).not.toBeInTheDocument();
  });

  it("shows all marks when All Exams selected", async () => {
    vi.mocked(getStudentMarks).mockResolvedValue([
      {
        id: 1,
        exam_id: 1,
        exam_name: "Mid Term",
        subject_name: "Math",
        marks: 80,
      },
      {
        id: 2,
        exam_id: 2,
        exam_name: "Final Exam",
        subject_name: "Science",
        marks: 90,
      },
    ]);

    vi.mocked(getExams).mockResolvedValue([
      {
        id: 1,
        exam_name: "Mid Term",
      },
      {
        id: 2,
        exam_name: "Final Exam",
      },
    ]);

    render(<StudentMarks />);

    expect(
      await screen.findByText("Math")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Science")
    ).toBeInTheDocument();
  });

  it("loads exams dropdown options", async () => {
    vi.mocked(getStudentMarks).mockResolvedValue([]);

    vi.mocked(getExams).mockResolvedValue([
      {
        id: 1,
        exam_name: "Mid Term",
      },
      {
        id: 2,
        exam_name: "Final Exam",
      },
    ]);

    render(<StudentMarks />);

    await screen.findByText(/no marks found/i);

    expect(
      screen.getByRole("option", {
        name: "Mid Term",
      })
    ).toBeInTheDocument();

    expect(
      screen.getByRole("option", {
        name: "Final Exam",
      })
    ).toBeInTheDocument();
  });

  it("calls APIs on mount", async () => {
    vi.mocked(getStudentMarks).mockResolvedValue([]);
    vi.mocked(getExams).mockResolvedValue([]);

    render(<StudentMarks />);

    await waitFor(() => {
      expect(getStudentMarks).toHaveBeenCalled();
      expect(getExams).toHaveBeenCalled();
    });
  });
});