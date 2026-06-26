import {
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";

import TeacherStudents from "../pages/TeacherStudents";
import { getStudents } from "../services/studentsApi";

vi.mock("../services/studentsApi", () => ({
  getStudents: vi.fn(),
}));

describe("TeacherStudents", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("shows loading initially", () => {
    vi.mocked(getStudents).mockImplementation(
      () => new Promise(() => {})
    );

    render(<TeacherStudents />);

    expect(
      screen.getByText("Loading students...")
    ).toBeInTheDocument();
  });

  it("renders students after successful API call", async () => {
    vi.mocked(getStudents).mockResolvedValue([
      {
        student_id: 1,
        name: "John Doe",
        email: "john@test.com",
        phone: "9876543210",
        class_name: "Class 10",
        section_name: "A",
        class_id: 10,
        section_id: 1,
      },
      {
        student_id: 2,
        name: "Jane Smith",
        email: "jane@test.com",
        phone: "9999999999",
        class_name: "Class 9",
        section_name: "B",
        class_id: 9,
        section_id: 2,
      },
    ]);

    render(<TeacherStudents />);

    expect(await screen.findByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("Jane Smith")).toBeInTheDocument();

    expect(screen.getByText("john@test.com")).toBeInTheDocument();
    expect(screen.getByText("jane@test.com")).toBeInTheDocument();

    expect(screen.getByText("9876543210")).toBeInTheDocument();
    expect(screen.getByText("9999999999")).toBeInTheDocument();

    expect(screen.getByText("Class 10")).toBeInTheDocument();
    expect(screen.getByText("Class 9")).toBeInTheDocument();

    expect(screen.getByText("A")).toBeInTheDocument();
    expect(screen.getByText("B")).toBeInTheDocument();

    expect(
      screen.queryByText("Loading students...")
    ).not.toBeInTheDocument();
  });

  it("handles API failure", async () => {
    const errorSpy = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});

    vi.mocked(getStudents).mockRejectedValue(
      new Error("API Error")
    );

    render(<TeacherStudents />);

    await waitFor(() => {
      expect(errorSpy).toHaveBeenCalledWith(
        "Failed to load data:",
        expect.any(Error)
      );
    });

    expect(
      screen.queryByText("Loading students...")
    ).not.toBeInTheDocument();

    errorSpy.mockRestore();
  });

  it("renders table headers", async () => {
    vi.mocked(getStudents).mockResolvedValue([]);

    render(<TeacherStudents />);

    expect(await screen.findByText("ID")).toBeInTheDocument();
    expect(screen.getByText("Name")).toBeInTheDocument();
    expect(screen.getByText("Email")).toBeInTheDocument();
    expect(screen.getByText("Phone")).toBeInTheDocument();
    expect(screen.getByText("Class")).toBeInTheDocument();
    expect(screen.getByText("Section")).toBeInTheDocument();
  });
});