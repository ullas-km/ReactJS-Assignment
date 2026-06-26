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

vi.mock("../components/Pagination", () => ({
  default: () => <div>Pagination</div>,
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

    expect(await screen.findByText("John")).toBeInTheDocument();
  });

  it("adds teacher", async () => {
    const user = userEvent.setup();

    vi.mocked(getTeachers)
      .mockResolvedValueOnce([])
      .mockResolvedValueOnce([
        {
          teacher_id: 1,
          teacher_name: "John",
          email: "john@test.com",
          phone: 1234567890,
          subjects: "Math",
        },
      ]);

    vi.mocked(addTeacher).mockResolvedValue({});

    render(<ViewTeachers />);

    await user.click(
      screen.getByRole("button", {
        name: /add teacher/i,
      }),
    );

    await user.type(
      screen.getByPlaceholderText("Teacher Name"),
      "John",
    );

    await user.type(
      screen.getByPlaceholderText("Email"),
      "john@test.com",
    );

    await user.type(
      screen.getByPlaceholderText("Phone"),
      "1234567890",
    );

    await user.type(
      screen.getByPlaceholderText("Password"),
      "123456",
    );

    await user.selectOptions(
      screen.getByLabelText(/subjects/i),
      "1",
    );

    await user.click(
      screen.getByRole("button", {
        name: /^add$/i,
      }),
    );

    await waitFor(() => {
      expect(addTeacher).toHaveBeenCalledWith(
        "John",
        "john@test.com",
        "1234567890",
        "123456",
        [1],
      );
    });
  });

  it("deletes teacher", async () => {
    const user = userEvent.setup();

    vi.mocked(getTeachers)
      .mockResolvedValueOnce([
        {
          teacher_id: 1,
          teacher_name: "John",
          email: "john@test.com",
          phone: 1234567890,
          subjects: "Math",
        },
      ])
      .mockResolvedValueOnce([]);

    vi.mocked(deleteTeacher).mockResolvedValue({});

    render(<ViewTeachers />);

    expect(await screen.findByText("John")).toBeInTheDocument();

    await user.click(
      screen.getByRole("button", {
        name: /delete/i,
      }),
    );

    await user.click(
      await screen.findByRole("button", {
        name: /yes, delete/i,
      }),
    );

    await waitFor(() => {
      expect(deleteTeacher).toHaveBeenCalledWith(1);
    });
  });

  it("edits teacher", async () => {
    const user = userEvent.setup();

    vi.mocked(getTeachers)
      .mockResolvedValueOnce([
        {
          teacher_id: 1,
          teacher_name: "John",
          email: "john@test.com",
          phone: 1234567890,
          subjects: "Math",
        },
      ])
      .mockResolvedValueOnce([
        {
          teacher_id: 1,
          teacher_name: "John Updated",
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

    expect(await screen.findByText("John")).toBeInTheDocument();

    await user.click(
      screen.getByRole("button", {
        name: /edit/i,
      }),
    );

    const nameInput =
      await screen.findByPlaceholderText("Teacher Name");

    await user.clear(nameInput);

    await user.type(nameInput, "John Updated");

    await screen.findByDisplayValue("john@test.com");

    await user.click(
      screen.getByRole("button", {
        name: /update/i,
      }),
    );

    await waitFor(() => {
      expect(updateTeacher).toHaveBeenCalledWith(
        1,
        "John Updated",
        "john@test.com",
        "1234567890",
        [1],
      );
    });
  });

  it("shows no teachers found", async () => {
    vi.mocked(getTeachers).mockResolvedValue([]);

    render(<ViewTeachers />);

    expect(
      await screen.findByText(/no teachers found/i),
    ).toBeInTheDocument();
  });

  it("filters teachers using search", async () => {
    const user = userEvent.setup();

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

    await user.type(
      screen.getByPlaceholderText(/search teacher/i),
      "David",
    );

    expect(screen.getByText("David")).toBeInTheDocument();

    expect(
      screen.queryByText("John"),
    ).not.toBeInTheDocument();
  });

  it("shows validation errors when adding empty teacher", async () => {
    const user = userEvent.setup();

    vi.mocked(getTeachers).mockResolvedValue([]);

    render(<ViewTeachers />);

    await user.click(
      screen.getByRole("button", {
        name: /add teacher/i,
      }),
    );

    await user.click(
      screen.getByRole("button", {
        name: /^add$/i,
      }),
    );

    expect(
      await screen.findByText(/teacher name is required/i),
    ).toBeInTheDocument();

    expect(
      screen.getByText(/email is required/i),
    ).toBeInTheDocument();

    expect(
      screen.getByText(/phone number is required/i),
    ).toBeInTheDocument();

    expect(
      screen.getByText(/password is required/i),
    ).toBeInTheDocument();

    expect(
      screen.getByText(/select at least one subject/i),
    ).toBeInTheDocument();

    expect(addTeacher).not.toHaveBeenCalled();
  });

  it("closes add modal when cancel is clicked", async () => {
    const user = userEvent.setup();

    vi.mocked(getTeachers).mockResolvedValue([]);

    render(<ViewTeachers />);

    await user.click(
      screen.getByRole("button", {
        name: /add teacher/i,
      }),
    );

    expect(
      screen.getByPlaceholderText("Teacher Name"),
    ).toBeInTheDocument();

    await user.click(
      screen.getByRole("button", {
        name: /cancel/i,
      }),
    );

    await waitFor(() => {
      expect(
        screen.queryByPlaceholderText("Teacher Name"),
      ).not.toBeInTheDocument();
    });
  });
});