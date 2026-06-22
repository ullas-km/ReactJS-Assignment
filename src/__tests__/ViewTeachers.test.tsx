import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";

import ViewTeachers from "../pages/ViewTeachers";

import {
  getTeachers,
  addTeacher,
  updateTeacher,
  deleteTeacher,
  getTeacherById,
} from "../services/TeacherApi";

import { getSubjects } from "../services/SubjectApi";

vi.mock("../services/TeacherApi", () => ({
  getTeachers: vi.fn(),
  addTeacher: vi.fn(),
  updateTeacher: vi.fn(),
  deleteTeacher: vi.fn(),
  getTeacherById: vi.fn(),
}));

vi.mock("../services/SubjectApi", () => ({
  getSubjects: vi.fn(),
}));

vi.mock("../services/axiosInstance", () => ({
  default: {},
}));

describe("ViewTeachers", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    vi.mocked(getSubjects).mockResolvedValue([
      {
        sub_id: 1,
        subject_name: "Math",
      },
    ]);
  });

  it("renders teachers", async () => {
    vi.mocked(getTeachers).mockResolvedValue([
      {
        teacher_id: 1,
        teacher_name: "John",
        email: "john@test.com",
        phone: 1234567890,
        subjects: "Math",
      },
    ]);

    render(<ViewTeachers />);

    expect(
      await screen.findByText("John")
    ).toBeInTheDocument();
  });

  it("adds teacher", async () => {
    vi.mocked(getTeachers).mockResolvedValue([]);
    vi.mocked(addTeacher).mockResolvedValue({});

    render(<ViewTeachers />);

    await userEvent.click(
      screen.getByRole("button", {
        name: /add teacher/i,
      })
    );

    await userEvent.type(
      screen.getByPlaceholderText("Teacher Name"),
      "John"
    );

    await userEvent.type(
      screen.getByPlaceholderText("Email"),
      "john@test.com"
    );

    await userEvent.type(
      screen.getByPlaceholderText("Phone"),
      "1234567890"
    );

    await userEvent.type(
      screen.getByPlaceholderText("Password"),
      "123456"
    );

    await userEvent.click(
      screen.getByRole("button", {
        name: /^add$/i,
      })
    );

    await waitFor(() => {
      expect(addTeacher).toHaveBeenCalledWith(
        "John",
        "john@test.com",
        "1234567890",
        "123456",
        []
      );
    });
  });

  it("deletes teacher", async () => {
    vi.mocked(getTeachers).mockResolvedValue([
      {
        teacher_id: 1,
        teacher_name: "John",
        email: "john@test.com",
        phone: 1234567890,
        subjects: "Math",
      },
    ]);

    vi.mocked(deleteTeacher).mockResolvedValue({});

    render(<ViewTeachers />);

    expect(
      await screen.findByText("John")
    ).toBeInTheDocument();

    await userEvent.click(
      screen.getByRole("button", {
        name: /delete/i,
      })
    );

    await waitFor(() => {
      expect(deleteTeacher).toHaveBeenCalledWith(1);
    });
  });

  it("edits teacher", async () => {
    vi.mocked(getTeachers).mockResolvedValue([
      {
        teacher_id: 1,
        teacher_name: "John",
        email: "john@test.com",
        phone: 1234567890,
        subjects: "Math",
      },
    ]);

    vi.mocked(getTeacherById).mockResolvedValue({
      subject_ids: "1",
    });

    vi.mocked(updateTeacher).mockResolvedValue({});

    render(<ViewTeachers />);

    expect(
      await screen.findByText("John")
    ).toBeInTheDocument();

    await userEvent.click(
      screen.getByRole("button", {
        name: /edit/i,
      })
    );

    const nameInput =
      await screen.findByPlaceholderText(
        "Teacher Name"
      );

    await userEvent.clear(nameInput);

    await userEvent.type(
      nameInput,
      "John Updated"
    );

    await userEvent.click(
      screen.getByRole("button", {
        name: /update/i,
      })
    );

    await waitFor(() => {
      expect(updateTeacher).toHaveBeenCalledWith(
        1,
        "John Updated",
        "john@test.com",
        "1234567890",
        [1]
      );
    });
  });

  it("shows no teachers found", async () => {
    vi.mocked(getTeachers).mockResolvedValue([]);

    render(<ViewTeachers />);

    expect(
      await screen.findByText(/no teachers found/i)
    ).toBeInTheDocument();
  });

  it("filters teachers using search", async () => {
    vi.mocked(getTeachers).mockResolvedValue([
      {
        teacher_id: 1,
        teacher_name: "John",
        email: "john@test.com",
        phone: 1234567890,
        subjects: "Math",
      },
      {
        teacher_id: 2,
        teacher_name: "David",
        email: "david@test.com",
        phone: 9999999999,
        subjects: "Science",
      },
    ]);

    render(<ViewTeachers />);

    await screen.findByText("John");

    await userEvent.type(
      screen.getByPlaceholderText(
        /search teacher/i
      ),
      "David"
    );

    expect(
      screen.getByText("David")
    ).toBeInTheDocument();

    expect(
      screen.queryByText("John")
    ).not.toBeInTheDocument();
  });
});