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

    // MOCK SECTIONS
    (
      sectionApi.getSections as jest.Mock
    ).mockResolvedValue([
      {
        section_id: 1,
        section_name: "A",
        class_id: 1,
      },
    ]);

    // MOCK CLASSES
    (
      classApi.getClasses as jest.Mock
    ).mockResolvedValue([
      {
        class_id: 1,
        class_name: "10",
      },
    ]);
  });

  test("renders sections table", async () => {

    render(<ViewSections />);

    expect(
      await screen.findByText("A")
    ).toBeInTheDocument();

    expect(
      screen.getByText("10")
    ).toBeInTheDocument();

  });

  test("adds new section", async () => {

    (
      sectionApi.addSection as jest.Mock
    ).mockResolvedValue({});

    render(<ViewSections />);

    // WAIT FOR SELECT TO LOAD
    await screen.findByText("Class 10");

    // INPUT
    const input =
      screen.getByPlaceholderText(
        "Section Name (A/B/C)"
      );

    fireEvent.change(input, {
      target: {
        value: "B",
      },
    });

    // SELECT CLASS
    const select =
      screen.getByRole("combobox");

    fireEvent.change(select, {
      target: {
        value: "1",
      },
    });

    // CLICK ADD
    fireEvent.click(
      screen.getByText("Add")
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

    (
      sectionApi.updateSection as jest.Mock
    ).mockResolvedValue({});

    render(<ViewSections />);

    fireEvent.click(
      await screen.findByText("Edit")
    );

    const input =
      screen.getByDisplayValue("A");

    fireEvent.change(input, {
      target: {
        value: "C",
      },
    });

    const select =
      screen.getByRole("combobox");

    fireEvent.change(select, {
      target: {
        value: "1",
      },
    });

    fireEvent.click(
      screen.getByText("Update")
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

    (
      sectionApi.deleteSection as jest.Mock
    ).mockResolvedValue({});

    render(<ViewSections />);

    fireEvent.click(
      await screen.findByText("Delete")
    );

    await waitFor(() => {

      expect(
        sectionApi.deleteSection
      ).toHaveBeenCalledWith(1);

    });

  });

});