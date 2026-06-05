import { render, screen, waitFor } from "@testing-library/react";

import userEvent from "@testing-library/user-event";

import { describe, it, expect, vi } from "vitest";

import ViewSubjects from "../pages/ViewSubjects";

import {
  getSubjects,
  addSubject,
  updateSubject,
  deleteSubject,
} from "../services/SubjectApi";

vi.mock("../services/SubjectApi", () => ({
  getSubjects: vi.fn(),
  addSubject: vi.fn(),
  updateSubject: vi.fn(),
  deleteSubject: vi.fn(),
}));

describe("ViewSubjects", () => {
  it("should render subjects", async () => {
    vi.mocked(getSubjects).mockResolvedValue([
      {
        sub_id: 1,
        subject_name: "Maths",
      },
    ]);

    render(<ViewSubjects />);

    await waitFor(() => {
      expect(screen.getByText("Maths")).toBeInTheDocument();
    });
  });

it("should add subject", async () => {
  vi.mocked(getSubjects).mockResolvedValue([]);

  vi.mocked(addSubject).mockResolvedValue({});

  render(<ViewSubjects />);

  await userEvent.click(
    screen.getByRole("button", {
      name: /add subject/i,
    }),
  );

  const input = screen.getByPlaceholderText(
    "Subject Name",
  );

  await userEvent.type(input, "Science");

  const addButton = screen.getByRole("button", {
    name: /^add$/i,
  });

  await userEvent.click(addButton);

  expect(addSubject).toHaveBeenCalledWith("Science");
});

  it("should delete subject", async () => {
    vi.mocked(getSubjects).mockResolvedValue([
      {
        sub_id: 1,
        subject_name: "Maths",
      },
    ]);

    vi.mocked(deleteSubject).mockResolvedValue({});

    render(<ViewSubjects />);

    await waitFor(() => {
      expect(screen.getByText("Maths")).toBeInTheDocument();
    });

    const deleteButton = screen.getByRole("button", {
      name: "Delete",
    });

    await userEvent.click(deleteButton);

    expect(deleteSubject).toHaveBeenCalledWith(1);
  });

  it("should update subject", async () => {
    vi.mocked(getSubjects).mockResolvedValue([
      {
        sub_id: 1,
        subject_name: "Maths",
      },
    ]);

    vi.mocked(updateSubject).mockResolvedValue({});

    render(<ViewSubjects />);

    await waitFor(() => {
      expect(screen.getByText("Maths")).toBeInTheDocument();
    });

    const editButton = screen.getByRole("button", {
      name: "Edit",
    });

    await userEvent.click(editButton);

    const input = screen.getByPlaceholderText("Subject Name");

    await userEvent.clear(input);

    await userEvent.type(input, "Physics");

    const updateButton = screen.getByRole("button", {
      name: "Update",
    });

    await userEvent.click(updateButton);

    expect(updateSubject).toHaveBeenCalledWith(1, "Physics");
  });
});
