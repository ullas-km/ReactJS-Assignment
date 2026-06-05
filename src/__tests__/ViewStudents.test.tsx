import { render, screen, waitFor } from "@testing-library/react";

import userEvent from "@testing-library/user-event";

import { describe, it, expect, vi } from "vitest";

import ViewStudents from "../pages/ViewStudents";

vi.mock("../services/studentsApi", () => ({
  getStudents: vi.fn(),
  deleteStudent: vi.fn(),
  updateStudent: vi.fn(),
}));

vi.mock("../services/ClassesApi", () => ({
  getClasses: vi.fn(),
}));

vi.mock("../services/SectionApi", () => ({
  getSections: vi.fn(),
}));

import { getStudents, deleteStudent } from "../services/studentsApi";

import { getClasses } from "../services/ClassesApi";
import { getSections } from "../services/SectionApi";

describe("ViewStudents", () => {
  it("should render students", async () => {
    vi.mocked(getStudents).mockResolvedValue([
      {
        student_id: 1,
        name: "John",
        email: "john@gmail.com",
        phone: "9999999999",
        class_name: "10A",
        section_name: "A",
      },
    ]);

    vi.mocked(getClasses).mockResolvedValue([]);
    vi.mocked(getSections).mockResolvedValue([]);

    render(<ViewStudents />);

    await waitFor(() => {
      expect(screen.getByText("John")).toBeInTheDocument();
    });
  });

  it("should delete student", async () => {
    vi.mocked(getStudents).mockResolvedValue([
      {
        student_id: 1,
        name: "John",
        email: "john@gmail.com",
        phone: "9999999999",
        class_name: "10A",
        section_name: "A",
      },
    ]);

    vi.mocked(deleteStudent).mockResolvedValue({});

    vi.mocked(getClasses).mockResolvedValue([]);
    vi.mocked(getSections).mockResolvedValue([]);

    render(<ViewStudents />);

    await waitFor(() => {
      expect(screen.getByText("John")).toBeInTheDocument();
    });

    const buttons = screen.getAllByText("Delete");

    await userEvent.click(buttons[0]);

    expect(deleteStudent).toHaveBeenCalledWith(1);
  });
});
