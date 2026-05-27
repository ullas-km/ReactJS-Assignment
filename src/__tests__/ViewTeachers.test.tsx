import {
  render,
  screen,
  waitFor,
} from "@testing-library/react";

import userEvent from "@testing-library/user-event";

import {
  describe,
  it,
  expect,
  vi,
} from "vitest";

import ViewTeachers from "../pages/ViewTeachers";

import {
  getTeachers,
  addTeacher,
  updateTeacher,
  deleteTeacher,
} from "../services/TeacherApi";

vi.mock("../services/TeacherApi", () => ({
  getTeachers: vi.fn(),
  addTeacher: vi.fn(),
  updateTeacher: vi.fn(),
  deleteTeacher: vi.fn(),
}));

describe("ViewTeachers", () => {

  it("should render teachers", async () => {

    vi.mocked(getTeachers).mockResolvedValue([
      {
        teacher_id: 1,
        teacher_name: "John",
      },
    ] as any);

    render(<ViewTeachers />);

    await waitFor(() => {
      expect(
        screen.getByText("John")
      ).toBeInTheDocument();
    });
  });

  it("should add teacher", async () => {

    vi.mocked(getTeachers).mockResolvedValue(
      [] as any
    );

    vi.mocked(addTeacher).mockResolvedValue(
      {} as any
    );

    render(<ViewTeachers />);

    const input =
      screen.getByPlaceholderText(
        "Teacher Name"
      );

    await userEvent.type(input, "John");

    const addButton =
      screen.getByRole("button", {
        name: "Add",
      });

    await userEvent.click(addButton);

    expect(addTeacher).toHaveBeenCalledWith(
      "John"
    );
  });

  it("should delete teacher", async () => {

    vi.mocked(getTeachers).mockResolvedValue([
      {
        teacher_id: 1,
        teacher_name: "John",
      },
    ] as any);

    vi.mocked(deleteTeacher).mockResolvedValue(
      {} as any
    );

    render(<ViewTeachers />);

    await waitFor(() => {
      expect(
        screen.getByText("John")
      ).toBeInTheDocument();
    });

    const deleteButton =
      screen.getByRole("button", {
        name: "Delete",
      });

    await userEvent.click(deleteButton);

    expect(deleteTeacher).toHaveBeenCalledWith(
      1
    );
  });

  it("should edit teacher", async () => {

    vi.mocked(getTeachers).mockResolvedValue([
      {
        teacher_id: 1,
        teacher_name: "John",
      },
    ] as any);

    vi.mocked(updateTeacher).mockResolvedValue(
      {} as any
    );

    render(<ViewTeachers />);

    await waitFor(() => {
      expect(
        screen.getByText("John")
      ).toBeInTheDocument();
    });

    const editButton =
      screen.getByRole("button", {
        name: "Edit",
      });

    await userEvent.click(editButton);

    const input =
      screen.getByPlaceholderText(
        "Teacher Name"
      );

    await userEvent.clear(input);

    await userEvent.type(
      input,
      "John Updated"
    );

    const updateButton =
      screen.getByRole("button", {
        name: "Update",
      });

    await userEvent.click(updateButton);

    expect(updateTeacher)
      .toHaveBeenCalledWith(
        1,
        "John Updated"
      );
  });
});