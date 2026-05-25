import {
  render,
  screen,
  fireEvent,
  waitFor,
} from "@testing-library/react";

import ViewClasses from "../pages/ViewClasses";

import * as classApi from "../services/ClassesApi";

jest.mock("../services/ClassesApi");

describe("ViewClasses", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (classApi.getClasses as jest.Mock)
      .mockResolvedValue([
        {
          class_id: 1,
          class_name: 10,
        },
      ]);
  });

  test("renders classes table", async () => {
    render(<ViewClasses />);

    expect(
      await screen.findByText("10")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Class Name")
    ).toBeInTheDocument();
  });

  test("adds new class", async () => {
    (classApi.addClass as jest.Mock)
      .mockResolvedValue({});

    render(<ViewClasses />);

    const input =
      screen.getByPlaceholderText(
        "Enter class name"
      );

    fireEvent.change(input, {
      target: {
        value: "11",
      },
    });

    fireEvent.click(
      screen.getByRole("button", {
        name: "Add",
      })
    );

    await waitFor(() => {
      expect(
        classApi.addClass
      ).toHaveBeenCalledWith(11);
    });
  });

  test("edits class", async () => {
    (classApi.updateClass as jest.Mock)
      .mockResolvedValue({});

    render(<ViewClasses />);

    const editButtons =
      await screen.findAllByText("Edit");

    fireEvent.click(editButtons[0]);

    const input =
      screen.getByDisplayValue("10");

    fireEvent.change(input, {
      target: {
        value: "12",
      },
    });

    fireEvent.click(
      screen.getByRole("button", {
        name: "Update",
      })
    );

    await waitFor(() => {
      expect(classApi.updateClass).toHaveBeenCalledWith(
  1,
  "12"
);
    });
  });

  test("deletes class", async () => {
    (classApi.deleteClass as jest.Mock)
      .mockResolvedValue({});

    render(<ViewClasses />);

    const deleteButtons =
      await screen.findAllByText("Delete");

    fireEvent.click(deleteButtons[0]);

    await waitFor(() => {
      expect(
        classApi.deleteClass
      ).toHaveBeenCalledWith(1);
    });
  });
}); 