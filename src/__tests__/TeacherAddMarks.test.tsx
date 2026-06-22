import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { vi, describe, it, expect, beforeEach } from "vitest";
import TeacherAddMarks from "../pages/TeacherAddMarks";

import * as dropdownApi from "../services/dropdownsApi";
import * as marksApi from "../services/marksApi";
import axios from "axios";

vi.mock("axios");

vi.mock("../services/dropdownsApi", () => ({
  getStudents: vi.fn(),
  getSubjects: vi.fn(),
  getExams: vi.fn(),
}));

vi.mock("../services/marksApi", () => ({
  addMarks: vi.fn(),
  updateMarks: vi.fn(),
  deleteMarks: vi.fn(),
}));

describe("TeacherAddMarks", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    vi.mocked(dropdownApi.getStudents).mockResolvedValue([
      {
        student_id: 1,
        name: "John",
      },
    ]);

    vi.mocked(dropdownApi.getSubjects).mockResolvedValue([
      {
        sub_id: 1,
        subject_name: "Maths",
      },
    ]);

    vi.mocked(dropdownApi.getExams).mockResolvedValue([
      {
        id: 1,
        exam_name: "Mid Term",
      },
    ]);

    vi.mocked(axios.get).mockResolvedValue({
      data: [
        {
          id: 1,
          student_id: 1,
          subject_id: 1,
          exam_id: 1,
          student_name: "John",
          subject_name: "Maths",
          exam_name: "Mid Term",
          marks: 90,
        },
      ],
    });
  });

  it("renders Add Marks page", async () => {
    render(<TeacherAddMarks />);

    expect(
      screen.getByText("📘 Add Marks Module")
    ).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText("Marks List")).toBeInTheDocument();
    });
  });

  it("loads marks table data", async () => {
    render(<TeacherAddMarks />);

    await waitFor(() => {
      expect(screen.getByText("John")).toBeInTheDocument();
      expect(screen.getByText("Maths")).toBeInTheDocument();
      expect(screen.getAllByText("Mid Term")).toHaveLength(2);
      expect(screen.getByText("90")).toBeInTheDocument();
    });
  });

  it("moves through form steps", async () => {
    render(<TeacherAddMarks />);

    await waitFor(() =>
      expect(screen.getByText("Choose Exam")).toBeInTheDocument()
    );

    fireEvent.change(screen.getByRole("combobox"), {
      target: { value: "1" },
    });

    fireEvent.click(screen.getByText("Continue →"));

    await waitFor(() =>
      expect(screen.getByText("Select Subject")).toBeInTheDocument()
    );
  });

  it("calls addMarks when submitting new marks", async () => {
    vi.mocked(marksApi.addMarks).mockResolvedValue({} as any);

    render(<TeacherAddMarks />);

    await waitFor(() =>
      expect(screen.getByText("Choose Exam")).toBeInTheDocument()
    );

    fireEvent.change(screen.getByRole("combobox"), {
      target: { value: "1" },
    });

    fireEvent.click(screen.getByText("Continue →"));

    fireEvent.change(screen.getByRole("combobox"), {
      target: { value: "1" },
    });

    fireEvent.click(screen.getByText("Continue →"));

    fireEvent.change(screen.getByRole("combobox"), {
      target: { value: "1" },
    });

    fireEvent.click(screen.getByText("Continue →"));

    fireEvent.change(screen.getByPlaceholderText(/enter marks/i), {
      target: { value: "95" },
    });

    fireEvent.click(screen.getByText("Save Marks"));

    await waitFor(() => {
      expect(marksApi.addMarks).toHaveBeenCalledWith({
        exam_id: 1,
        subject_id: 1,
        student_id: 1,
        marks: 95,
      });
    });
  });

  it("enters edit mode when edit button clicked", async () => {
    render(<TeacherAddMarks />);

    await waitFor(() =>
      expect(screen.getByText("Edit")).toBeInTheDocument()
    );

    fireEvent.click(screen.getByText("Edit"));

    await waitFor(() => {
      expect(screen.getByText("Step 1 of 4")).toBeInTheDocument();
    });
  });

  it("calls deleteMarks when delete confirmed", async () => {
    window.confirm = vi.fn(() => true);

    vi.mocked(marksApi.deleteMarks).mockResolvedValue({} as any);

    render(<TeacherAddMarks />);

    await waitFor(() =>
      expect(screen.getByText("Delete")).toBeInTheDocument()
    );

    fireEvent.click(screen.getByText("Delete"));

    await waitFor(() => {
      expect(marksApi.deleteMarks).toHaveBeenCalledWith(1);
    });
  });

  it("does not delete when confirmation cancelled", async () => {
    window.confirm = vi.fn(() => false);

    render(<TeacherAddMarks />);

    await waitFor(() =>
      expect(screen.getByText("Delete")).toBeInTheDocument()
    );

    fireEvent.click(screen.getByText("Delete"));

    expect(marksApi.deleteMarks).not.toHaveBeenCalled();
  });
});