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

import ViewSections from "../pages/ViewSections";

import {
  getSections,
  addSection,
  updateSection,
  deleteSection,
} from "../services/SectionApi";

import { getClasses } from "../services/ClassesApi";

vi.mock("../services/SectionApi", () => ({
  getSections: vi.fn(),
  addSection: vi.fn(),
  updateSection: vi.fn(),
  deleteSection: vi.fn(),
}));

vi.mock("../services/ClassesApi", () => ({
  getClasses: vi.fn(),
}));

describe("ViewSections", () => {

  it("should render sections", async () => {

    vi.mocked(getSections).mockResolvedValue([
      {
        section_id: 1,
        section_name: "A",
        class_id: 1,
      },
    ] as any);

    vi.mocked(getClasses).mockResolvedValue([
      {
        class_id: 1,
        class_name: "10",
      },
    ] as any);

    render(<ViewSections />);

    await waitFor(() => {
      expect(
        screen.getByText("A")
      ).toBeInTheDocument();
    });

    expect(
      screen.getByText("10")
    ).toBeInTheDocument();
  });

  it("should add section", async () => {

    vi.mocked(getSections).mockResolvedValue(
      [] as any
    );

    vi.mocked(getClasses).mockResolvedValue([
      {
        class_id: 1,
        class_name: "10",
      },
    ] as any);

    vi.mocked(addSection).mockResolvedValue(
      {} as any
    );

    render(<ViewSections />);

    const input =
      screen.getByPlaceholderText(
        "Section Name (A/B/C)"
      );

    await userEvent.type(input, "A");

    const select =
      screen.getByRole("combobox");

    await userEvent.selectOptions(
      select,
      "1"
    );

    const addButton =
      screen.getByRole("button", {
        name: "Add",
      });

    await userEvent.click(addButton);

    expect(addSection)
      .toHaveBeenCalledWith(
        "A",
        1
      );
  });

  it("should delete section", async () => {

    vi.mocked(getSections).mockResolvedValue([
      {
        section_id: 1,
        section_name: "A",
        class_id: 1,
      },
    ] as any);

    vi.mocked(getClasses).mockResolvedValue([
      {
        class_id: 1,
        class_name: "10",
      },
    ] as any);

    vi.mocked(deleteSection).mockResolvedValue(
      {} as any
    );

    render(<ViewSections />);

    await waitFor(() => {
      expect(
        screen.getByText("A")
      ).toBeInTheDocument();
    });

    const deleteButton =
      screen.getByRole("button", {
        name: "Delete",
      });

    await userEvent.click(deleteButton);

    expect(deleteSection)
      .toHaveBeenCalledWith(1);
  });

  it("should update section", async () => {

    vi.mocked(getSections).mockResolvedValue([
      {
        section_id: 1,
        section_name: "A",
        class_id: 1,
      },
    ] as any);

    vi.mocked(getClasses).mockResolvedValue([
      {
        class_id: 1,
        class_name: "10",
      },
    ] as any);

    vi.mocked(updateSection).mockResolvedValue(
      {} as any
    );

    render(<ViewSections />);

    await waitFor(() => {
      expect(
        screen.getByText("A")
      ).toBeInTheDocument();
    });

    const editButton =
      screen.getByRole("button", {
        name: "Edit",
      });

    await userEvent.click(editButton);

    const input =
      screen.getByPlaceholderText(
        "Section Name (A/B/C)"
      );

    await userEvent.clear(input);

    await userEvent.type(input, "B");

    const select =
      screen.getByRole("combobox");

    await userEvent.selectOptions(
      select,
      "1"
    );

    const updateButton =
      screen.getByRole("button", {
        name: "Update",
      });

    await userEvent.click(updateButton);

    expect(updateSection)
      .toHaveBeenCalledWith(
        1,
        "B",
        1
      );
  });
});