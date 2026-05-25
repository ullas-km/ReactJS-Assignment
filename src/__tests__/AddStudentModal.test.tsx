import {
  render,
  screen,
  fireEvent,
  waitFor,
} from "@testing-library/react";

import AddStudentModal from "../components/AddStudentModal";

import * as studentsApi from "../services/studentsApi";
import * as classesApi from "../services/ClassesApi";
import * as sectionsApi from "../services/SectionApi";

jest.mock("../services/studentsApi");
jest.mock("../services/ClassesApi");
jest.mock("../services/SectionApi");

describe("AddStudentModal", () => {

  const mockClose = jest.fn();
  const mockRefresh = jest.fn();

  beforeEach(() => {

    jest.clearAllMocks();

    (classesApi.getClasses as jest.Mock)
      .mockResolvedValue([
        {
          class_id: 1,
          class_name: "10",
        },
      ]);

    (sectionsApi.getSections as jest.Mock)
      .mockResolvedValue([
        {
          section_id: 1,
          section_name: "A",
          class_id: 1,
        },
      ]);
  });

  test("renders modal fields", async () => {

    render(
      <AddStudentModal
        onClose={mockClose}
        refreshStudents={mockRefresh}
      />
    );

    // wait for async data load
    await screen.findByText("10");

    expect(
      screen.getByText("Add Student")
    ).toBeInTheDocument();

    expect(
      screen.getAllByRole("textbox").length
    ).toBe(3);

    expect(
      screen.getAllByRole("combobox").length
    ).toBe(2);
  });

  test("adds student", async () => {

    (studentsApi.addStudent as jest.Mock)
      .mockResolvedValue({});

    render(
      <AddStudentModal
        onClose={mockClose}
        refreshStudents={mockRefresh}
      />
    );

    // wait for classes to load
    await screen.findByText("10");

    const inputs = screen.getAllByRole("textbox");

    // name
    fireEvent.change(inputs[0], {
      target: {
        value: "John",
      },
    });

    // email
    fireEvent.change(inputs[1], {
      target: {
        value: "john@test.com",
      },
    });

    // phone
    fireEvent.change(inputs[2], {
      target: {
        value: "9999999999",
      },
    });

    const selects = screen.getAllByRole("combobox");

    // select class
    fireEvent.change(selects[0], {
      target: {
        value: "1",
      },
    });

    // wait for section option to appear
    await screen.findByText("A");

    // select section
    fireEvent.change(selects[1], {
      target: {
        value: "1",
      },
    });

    // click add
    fireEvent.click(
      screen.getByText("Add")
    );

    await waitFor(() => {

      expect(
        studentsApi.addStudent
      ).toHaveBeenCalledWith(
        "John",
        "john@test.com",
        "9999999999",
        1,
        1
      );

      expect(mockRefresh)
        .toHaveBeenCalled();

      expect(mockClose)
        .toHaveBeenCalled();

    });

  });

});