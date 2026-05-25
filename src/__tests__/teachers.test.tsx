import {
  render,
  screen,
  fireEvent,
  waitFor,
} from "@testing-library/react";

import ViewTeachers from "../pages/ViewTeachers";

import * as teacherApi from "../services/TeacherApi";

jest.mock("../services/TeacherApi");

describe("ViewTeachers", () => {

  beforeEach(() => {
    jest.clearAllMocks();
  });

  test("renders teachers table", async () => {

    (teacherApi.getTeachers as jest.Mock)
      .mockResolvedValue([
        {
          teacher_id: 1,
          teacher_name: "John",
        },
      ]);

    render(<ViewTeachers />);

    expect(
      screen.getByText("Teachers")
    ).toBeInTheDocument();

    await waitFor(() => {

      expect(
        screen.getByText("John")
      ).toBeInTheDocument();

    });
  });

  test("adds new teacher", async () => {

    (teacherApi.getTeachers as jest.Mock)
      .mockResolvedValue([]);

    (teacherApi.addTeacher as jest.Mock)
      .mockResolvedValue({});

    render(<ViewTeachers />);

    const input =
      screen.getByPlaceholderText(
        "Teacher Name"
      );

    fireEvent.change(input, {
      target: {
        value: "David",
      },
    });

    fireEvent.click(
      screen.getByRole("button", {
        name: /add/i,
      })
    );

    await waitFor(() => {

      expect(
        teacherApi.addTeacher
      ).toHaveBeenCalledWith(
        "David"
      );

    });
  });

  test("edits teacher", async () => {

    (teacherApi.getTeachers as jest.Mock)
      .mockResolvedValue([
        {
          teacher_id: 1,
          teacher_name: "John",
        },
      ]);

    (teacherApi.updateTeacher as jest.Mock)
      .mockResolvedValue({});

    render(<ViewTeachers />);

    await waitFor(() => {

      expect(
        screen.getByText("John")
      ).toBeInTheDocument();

    });

    fireEvent.click(
      screen.getByText("Edit")
    );

    const input =
      screen.getByDisplayValue("John");

    fireEvent.change(input, {
      target: {
        value: "Joseph",
      },
    });

    fireEvent.click(
      screen.getByRole("button", {
        name: /update/i,
      })
    );

    await waitFor(() => {

      expect(
        teacherApi.updateTeacher
      ).toHaveBeenCalledWith(
        1,
        "Joseph"
      );

    });
  });

  test("deletes teacher", async () => {

    (teacherApi.getTeachers as jest.Mock)
      .mockResolvedValue([
        {
          teacher_id: 1,
          teacher_name: "John",
        },
      ]);

    (teacherApi.deleteTeacher as jest.Mock)
      .mockResolvedValue({});

    render(<ViewTeachers />);

    await waitFor(() => {

      expect(
        screen.getByText("John")
      ).toBeInTheDocument();

    });

    fireEvent.click(
      screen.getByText("Delete")
    );

    await waitFor(() => {

      expect(
        teacherApi.deleteTeacher
      ).toHaveBeenCalledWith(1);

    });
  });

});