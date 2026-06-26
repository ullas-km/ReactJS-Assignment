import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";

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

vi.mock("../components/AddStudentModal", () => ({
  default: () => <div>Add Student Modal</div>,
}));

vi.mock("../components/EditStudentModal", () => ({
  default: () => <div>Edit Student Modal</div>,
}));

vi.mock("../components/Pagination", () => ({
  default: () => <div>Pagination</div>,
}));

import { getStudents, deleteStudent } from "../services/studentsApi";
import { getClasses } from "../services/ClassesApi";
import { getSections } from "../services/SectionApi";

describe("ViewStudents", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render students", async () => {
    vi.mocked(getStudents).mockResolvedValue([
      {
        student_id: 1,
        name: "John",
        email: "john@gmail.com",
        phone: "9999999999",
        class_name: "10A",
        section_name: "A",
        class_id: 1,
        section_id: 1,
      },
    ]);

    vi.mocked(getClasses).mockResolvedValue([]);
    vi.mocked(getSections).mockResolvedValue([]);

    render(<ViewStudents />);

    await waitFor(() => {
      expect(screen.getByText("John")).toBeInTheDocument();
    });
  });

  it("should delete student after confirmation", async () => {
    vi.mocked(getStudents).mockResolvedValue([
      {
        student_id: 1,
        name: "John",
        email: "john@gmail.com",
        phone: "9999999999",
        class_name: "10A",
        section_name: "A",
        class_id: 1,
        section_id: 1,
      },
    ]);

    vi.mocked(deleteStudent).mockResolvedValue({});

    vi.mocked(getClasses).mockResolvedValue([]);
    vi.mocked(getSections).mockResolvedValue([]);

    render(<ViewStudents />);

    await waitFor(() => {
      expect(screen.getByText("John")).toBeInTheDocument();
    });

    const deleteButtons = screen.getAllByRole("button", {
      name: /delete/i,
    });

    await userEvent.click(deleteButtons[0]);

    expect(
      screen.getByText(/are you sure you want to delete/i),
    ).toBeInTheDocument();

    const confirmDeleteButton = screen.getAllByRole("button", {
      name: /delete/i,
    })[1];

    await userEvent.click(confirmDeleteButton);

    await waitFor(() => {
      expect(deleteStudent).toHaveBeenCalledWith(1);
    });
  });

  it("should open add student modal", async () => {
    vi.mocked(getStudents).mockResolvedValue([]);
    vi.mocked(getClasses).mockResolvedValue([]);
    vi.mocked(getSections).mockResolvedValue([]);

    render(<ViewStudents />);

    await userEvent.click(
      screen.getByRole("button", {
        name: /add student/i,
      }),
    );

    expect(
      screen.getByText("Add Student Modal"),
    ).toBeInTheDocument();
  });

  it("should open edit student modal", async () => {
    vi.mocked(getStudents).mockResolvedValue([
      {
        student_id: 1,
        name: "John",
        email: "john@gmail.com",
        phone: "9999999999",
        class_name: "10A",
        section_name: "A",
        class_id: 1,
        section_id: 1,
      },
    ]);

    vi.mocked(getClasses).mockResolvedValue([]);
    vi.mocked(getSections).mockResolvedValue([]);

    render(<ViewStudents />);

    await waitFor(() => {
      expect(screen.getByText("John")).toBeInTheDocument();
    });

    await userEvent.click(
      screen.getByRole("button", {
        name: /edit/i,
      }),
    );

    expect(
      screen.getByText("Edit Student Modal"),
    ).toBeInTheDocument();
  });
});