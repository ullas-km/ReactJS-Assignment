import {
  render,
  screen,
  fireEvent,
  waitFor,
} from "@testing-library/react";

import ViewSections from "../pages/ViewSections";

import * as sectionApi from "../services/SectionApi";
import * as classApi from "../services/ClassesApi";

jest.mock("../services/SectionApi");
jest.mock("../services/ClassesApi");

describe("ViewSections", () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders sections table", async () => {

    (classApi.getClasses as jest.Mock)
      .mockResolvedValue([
        {
          class_id: 1,
          class_name: 10,
        },
      ]);

    (sectionApi.getSections as jest.Mock)
      .mockResolvedValue([
        {
          section_id: 1,
          section_name: "A",
          class_id: 1,
        },
      ]);

    render(<ViewSections />);

    expect(
      screen.getByText("Sections")
    ).toBeInTheDocument();

    await waitFor(() => {

      expect(
        screen.getByText("A")
      ).toBeInTheDocument();

      expect(
        screen.getByText("10")
      ).toBeInTheDocument();

    });
  });

  test("adds new section", async () => {

    (classApi.getClasses as jest.Mock)
      .mockResolvedValue([
        {
          class_id: 1,
          class_name: 10,
        },
      ]);

    (sectionApi.getSections as jest.Mock)
      .mockResolvedValue([]);

    (sectionApi.addSection as jest.Mock)
      .mockResolvedValue({});

    render(<ViewSections />);

    // wait until class renders
    await waitFor(() => {

      expect(
        screen.getByText("Class 10")
      ).toBeInTheDocument();

    });

    // input
    const sectionInput =
      screen.getByPlaceholderText(
        "Section Name (A/B/C)"
      );

    fireEvent.change(sectionInput, {
      target: {
        value: "B",
      },
    });

    // select
    const selects =
      screen.getAllByRole("combobox");

    fireEvent.change(selects[0], {
      target: {
        value: "1",
      },
    });

    // click add
    fireEvent.click(
      screen.getByRole("button", {
        name: /add/i,
      })
    );

    await waitFor(() => {

      expect(
        sectionApi.addSection
      ).toHaveBeenCalledWith(
        "B",
        1
      );

    });
  });

  test("edits section", async () => {

    (classApi.getClasses as jest.Mock)
      .mockResolvedValue([
        {
          class_id: 1,
          class_name: 10,
        },
      ]);

    (sectionApi.getSections as jest.Mock)
      .mockResolvedValue([
        {
          section_id: 1,
          section_name: "A",
          class_id: 1,
        },
      ]);

    (sectionApi.updateSection as jest.Mock)
      .mockResolvedValue({});

    render(<ViewSections />);

    await waitFor(() => {

      expect(
        screen.getByText("A")
      ).toBeInTheDocument();

    });

    fireEvent.click(
      screen.getByText("Edit")
    );

    const input =
      screen.getByDisplayValue("A");

    fireEvent.change(input, {
      target: {
        value: "C",
      },
    });

    fireEvent.click(
      screen.getByRole("button", {
        name: /update/i,
      })
    );

    await waitFor(() => {

      expect(
        sectionApi.updateSection
      ).toHaveBeenCalledWith(
        1,
        "C",
        1
      );

    });
  });

  test("deletes section", async () => {

    (classApi.getClasses as jest.Mock)
      .mockResolvedValue([
        {
          class_id: 1,
          class_name: 10,
        },
      ]);

    (sectionApi.getSections as jest.Mock)
      .mockResolvedValue([
        {
          section_id: 1,
          section_name: "A",
          class_id: 1,
        },
      ]);

    (sectionApi.deleteSection as jest.Mock)
      .mockResolvedValue({});

    render(<ViewSections />);

    await waitFor(() => {

      expect(
        screen.getByText("A")
      ).toBeInTheDocument();

    });

    fireEvent.click(
      screen.getByText("Delete")
    );

    await waitFor(() => {

      expect(
        sectionApi.deleteSection
      ).toHaveBeenCalledWith(1);

    });
  });

});