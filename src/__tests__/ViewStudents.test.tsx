import {
  render,
  screen,
  fireEvent,
  waitFor,
} from "@testing-library/react";

import ViewStudents from "../pages/ViewStudents";

import * as studentsApi from "../services/studentsApi";
import * as classesApi from "../services/ClassesApi";
import * as sectionsApi from "../services/SectionApi";

jest.mock("../services/studentsApi");
jest.mock("../services/ClassesApi");
jest.mock("../services/SectionApi");

describe("ViewStudents", () => {

  beforeEach(() => {
    jest.clearAllMocks();

    (studentsApi.getStudents as jest.Mock).mockResolvedValue([
      {
        student_id: 1,
        name: "John",
        email: "john@test.com",
        phone: "9999999999",
        class_id: 1,
        section_id: 1,
        class_name: "10",
        section_name: "A",
      },
    ]);

    (classesApi.getClasses as jest.Mock).mockResolvedValue([
      {
        class_id: 1,
        class_name: "10",
      },
    ]);

    (sectionsApi.getSections as jest.Mock).mockResolvedValue([
      {
        section_id: 1,
        section_name: "A",
        class_id: 1,
      },
    ]);
  });

  test("renders students table", async () => {

    render(<ViewStudents />);

    expect(
      await screen.findByText("John")
    ).toBeInTheDocument();

    expect(
      screen.getByText("john@test.com")
    ).toBeInTheDocument();

    expect(
      screen.getByText("9999999999")
    ).toBeInTheDocument();
  });

  test("opens edit form", async () => {

    render(<ViewStudents />);

    const editButton = await screen.findByText("Edit");

    fireEvent.click(editButton);

    expect(
      screen.getByDisplayValue("John")
    ).toBeInTheDocument();

    expect(
      screen.getByDisplayValue("john@test.com")
    ).toBeInTheDocument();
  });

  test("calls deleteStudent", async () => {

    (studentsApi.deleteStudent as jest.Mock)
      .mockResolvedValue({});

    render(<ViewStudents />);

    const deleteButton =
      await screen.findByText("Delete");

    fireEvent.click(deleteButton);

    await waitFor(() => {

      expect(
        studentsApi.deleteStudent
      ).toHaveBeenCalledWith(1);

    });
  });

}); 