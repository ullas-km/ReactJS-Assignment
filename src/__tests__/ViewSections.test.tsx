import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";

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

vi.mock("../components/Pagination", () => ({
  default: () => <div>Pagination</div>,
}));

describe("ViewSections", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render sections", async () => {
    vi.mocked(getSections).mockResolvedValue([
      {
        section_id: 1,
        section_name: "A",
        class_id: 1,
      },
    ]);

    vi.mocked(getClasses).mockResolvedValue([
      {
        class_id: 1,
        class_name: "10",
      },
    ]);

    render(<ViewSections />);

    expect(await screen.findByText("A")).toBeInTheDocument();
    expect(screen.getByText("10")).toBeInTheDocument();
  });

  it("should add section", async () => {
    vi.mocked(getSections)
      .mockResolvedValueOnce([])
      .mockResolvedValueOnce([
        {
          section_id: 1,
          section_name: "A",
          class_id: 1,
        },
      ]);

    vi.mocked(getClasses).mockResolvedValue([
      {
        class_id: 1,
        class_name: "10",
      },
    ]);

    vi.mocked(addSection).mockResolvedValue({});

    render(<ViewSections />);

    await userEvent.click(
      await screen.findByRole("button", {
        name: /add section/i,
      }),
    );

    await userEvent.type(
      screen.getByPlaceholderText("Section Name (A/B/C)"),
      "A",
    );

    await userEvent.selectOptions(
      screen.getByRole("combobox"),
      "1",
    );

    await userEvent.click(
      screen.getByRole("button", {
        name: "Add",
      }),
    );

    await waitFor(() => {
      expect(addSection).toHaveBeenCalledWith("A", 1);
    });
  });

  it("should open edit modal and update section", async () => {
    vi.mocked(getSections)
      .mockResolvedValueOnce([
        {
          section_id: 1,
          section_name: "A",
          class_id: 1,
        },
      ])
      .mockResolvedValueOnce([
        {
          section_id: 1,
          section_name: "B",
          class_id: 1,
        },
      ]);

    vi.mocked(getClasses).mockResolvedValue([
      {
        class_id: 1,
        class_name: "10",
      },
    ]);

    vi.mocked(updateSection).mockResolvedValue({});

    render(<ViewSections />);

    expect(await screen.findByText("A")).toBeInTheDocument();

    await userEvent.click(
      screen.getByRole("button", {
        name: "Edit",
      }),
    );

    const input = screen.getByPlaceholderText(
      "Section Name (A/B/C)",
    );

    await userEvent.clear(input);
    await userEvent.type(input, "B");

    await userEvent.selectOptions(
      screen.getByRole("combobox"),
      "1",
    );

    await userEvent.click(
      screen.getByRole("button", {
        name: "Update",
      }),
    );

    await waitFor(() => {
      expect(updateSection).toHaveBeenCalledWith(
        1,
        "B",
        1,
      );
    });
  });

  it("should delete section after confirmation", async () => {
  vi.mocked(getSections).mockResolvedValue([
    {
      section_id: 1,
      section_name: "A",
      class_id: 1,
    },
  ]);

  vi.mocked(getClasses).mockResolvedValue([
    {
      class_id: 1,
      class_name: "10",
    },
  ]);

  vi.mocked(deleteSection).mockResolvedValue({});

  const { container } = render(<ViewSections />);

  expect(await screen.findByText("A")).toBeInTheDocument();

  await userEvent.click(
    screen.getByRole("button", { name: "Delete" }),
  );

  expect(
    await screen.findByText(
      "Are you sure you want to delete this section?",
    ),
  ).toBeInTheDocument();

  const confirmDeleteButton =
    container.querySelector(".modal-delete-button");

  expect(confirmDeleteButton).not.toBeNull();

  await userEvent.click(confirmDeleteButton as HTMLButtonElement);

  await waitFor(() => {
    expect(deleteSection).toHaveBeenCalledWith(1);
  });
});

  it("should show validation errors when fields are empty", async () => {
    vi.mocked(getSections).mockResolvedValue([]);

    vi.mocked(getClasses).mockResolvedValue([
      {
        class_id: 1,
        class_name: "10",
      },
    ]);

    render(<ViewSections />);

    await userEvent.click(
      await screen.findByRole("button", {
        name: /add section/i,
      }),
    );

    await userEvent.click(
      screen.getByRole("button", {
        name: "Add",
      }),
    );

    expect(
      await screen.findByText("Section name is required"),
    ).toBeInTheDocument();

    expect(
      screen.getByText("Please select a class"),
    ).toBeInTheDocument();
  });

  it("should show duplicate section validation", async () => {
    vi.mocked(getSections).mockResolvedValue([
      {
        section_id: 1,
        section_name: "A",
        class_id: 1,
      },
    ]);

    vi.mocked(getClasses).mockResolvedValue([
      {
        class_id: 1,
        class_name: "10",
      },
    ]);

    render(<ViewSections />);

    await userEvent.click(
      await screen.findByRole("button", {
        name: /add section/i,
      }),
    );

    await userEvent.type(
      screen.getByPlaceholderText("Section Name (A/B/C)"),
      "A",
    );

    await userEvent.selectOptions(
      screen.getByRole("combobox"),
      "1",
    );

    await userEvent.click(
      screen.getByRole("button", {
        name: "Add",
      }),
    );

    expect(
      await screen.findByText(
        "Section already exists for this class",
      ),
    ).toBeInTheDocument();

    expect(addSection).not.toHaveBeenCalled();
  });
});