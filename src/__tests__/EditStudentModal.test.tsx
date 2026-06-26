import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import EditStudentModal from "../components/EditStudentModal";
import { updateStudent } from "../services/studentsApi";

vi.mock("../services/studentsApi", () => ({
  updateStudent: vi.fn(),
}));

describe("EditStudentModal", () => {
  const mockStudent = {
    student_id: 1,
    name: "John Doe",
    email: "john@test.com",
    phone: "1234567890",
    class_id: 1,
    section_id: 1,
  };

  const mockClasses = [
    {
      class_id: 1,
      class_name: "Class 10",
    },
    {
      class_id: 2,
      class_name: "Class 11",
    },
  ];

  const mockSections = [
    {
      section_id: 1,
      section_name: "A",
      class_id: 1,
    },
    {
      section_id: 2,
      section_name: "B",
      class_id: 1,
    },
    {
      section_id: 3,
      section_name: "C",
      class_id: 2,
    },
  ];

  const onClose = vi.fn();
  const refreshStudents = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders student details", () => {
    render(
      <EditStudentModal
        student={mockStudent}
        classes={mockClasses}
        sections={mockSections}
        onClose={onClose}
        refreshStudents={refreshStudents}
      />
    );

    expect(screen.getByDisplayValue("John Doe")).toBeInTheDocument();
    expect(screen.getByDisplayValue("john@test.com")).toBeInTheDocument();
    expect(screen.getByDisplayValue("1234567890")).toBeInTheDocument();
  });

  it("updates input values", () => {
    render(
      <EditStudentModal
        student={mockStudent}
        classes={mockClasses}
        sections={mockSections}
        onClose={onClose}
        refreshStudents={refreshStudents}
      />
    );

    const nameInput = screen.getByLabelText("Name");

    fireEvent.change(nameInput, {
      target: { value: "Jane Doe" },
    });

    expect(nameInput).toHaveValue("Jane Doe");
  });

  it("changes class and resets section", () => {
    render(
      <EditStudentModal
        student={mockStudent}
        classes={mockClasses}
        sections={mockSections}
        onClose={onClose}
        refreshStudents={refreshStudents}
      />
    );

    const classSelect = screen.getByLabelText("Class");

    fireEvent.change(classSelect, {
      target: { value: "2" },
    });

    expect(classSelect).toHaveValue("2");
  });

  it("filters sections based on selected class", () => {
    render(
      <EditStudentModal
        student={mockStudent}
        classes={mockClasses}
        sections={mockSections}
        onClose={onClose}
        refreshStudents={refreshStudents}
      />
    );

    expect(screen.getByText("A")).toBeInTheDocument();
    expect(screen.getByText("B")).toBeInTheDocument();

    fireEvent.change(screen.getByLabelText("Class"), {
      target: { value: "2" },
    });

    expect(screen.getByText("C")).toBeInTheDocument();
  });

  it("calls updateStudent and closes modal", async () => {
    vi.mocked(updateStudent).mockResolvedValue({});

    render(
      <EditStudentModal
        student={mockStudent}
        classes={mockClasses}
        sections={mockSections}
        onClose={onClose}
        refreshStudents={refreshStudents}
      />
    );

    fireEvent.change(screen.getByLabelText("Name"), {
      target: { value: "Updated Name" },
    });

    fireEvent.click(screen.getByRole("button", { name: "Update" }));

    await waitFor(() => {
      expect(updateStudent).toHaveBeenCalledWith(
        1,
        1,
        1,
        "Updated Name",
        "john@test.com",
        "1234567890"
      );
    });

    expect(refreshStudents).toHaveBeenCalled();
    expect(onClose).toHaveBeenCalled();
  });

  it("calls onClose when cancel button is clicked", () => {
    render(
      <EditStudentModal
        student={mockStudent}
        classes={mockClasses}
        sections={mockSections}
        onClose={onClose}
        refreshStudents={refreshStudents}
      />
    );

    fireEvent.click(screen.getByRole("button", { name: "Cancel" }));

    expect(onClose).toHaveBeenCalled();
  });
});