import { render, screen, waitFor } from "@testing-library/react";

import userEvent from "@testing-library/user-event";

import { describe, it, expect, vi, beforeEach } from "vitest";

import ViewClasses from "../pages/ViewClasses";

import * as classesApi from "../services/ClassesApi";

vi.mock("../services/ClassesApi");

describe("ViewClasses", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    vi.mocked(classesApi.getClasses).mockResolvedValue([
      {
        class_id: 1,
        class_name: 10,
      },
    ]);
  });

  it("should render classes", async () => {
    render(<ViewClasses />);

    expect(await screen.findByText("10")).toBeInTheDocument();
  });

  it("should add class", async () => {
    vi.mocked(classesApi.addClass).mockResolvedValue({
      success: true,
    });

    render(<ViewClasses />);

// Open modal first
await userEvent.click(
  screen.getByRole("button", {
    name: /add class/i,
  }),
);

const input = screen.getByPlaceholderText(
  "Enter class name",
);

await userEvent.type(input, "12");

const addButton = screen.getByRole("button", {
  name: /^add$/i,
});

await userEvent.click(addButton);

    await waitFor(() => {
      expect(classesApi.addClass).toHaveBeenCalledWith(12);
    });
  });

  it("should delete class", async () => {
    vi.mocked(classesApi.deleteClass).mockResolvedValue({
      success: true,
    });

    render(<ViewClasses />);

    const deleteButton = await screen.findByText("Delete");

    await userEvent.click(deleteButton);

    await waitFor(() => {
      expect(classesApi.deleteClass).toHaveBeenCalledWith(1);
    });
  });

  it("should update class", async () => {
    vi.mocked(classesApi.updateClass).mockResolvedValue({
      success: true,
    });

    render(<ViewClasses />);

    const editButton = await screen.findByText("Edit");

    await userEvent.click(editButton);

    const input = screen.getByPlaceholderText("Enter class name");

    await userEvent.clear(input);

    await userEvent.type(input, "15");

    const updateButton = screen.getByText("Update");

    await userEvent.click(updateButton);

    await waitFor(() => {
      expect(classesApi.updateClass).toHaveBeenCalledWith(1, "15");
    });
  });
});
