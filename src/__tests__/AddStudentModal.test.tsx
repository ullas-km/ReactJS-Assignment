import { render, screen, waitFor } from "@testing-library/react";

import userEvent from "@testing-library/user-event";

import { describe, it, expect, vi } from "vitest";

import AddStudentModal from "../components/AddStudentModal";

import * as studentsApi from "../services/studentsApi";
import * as classesApi from "../services/ClassesApi";
import * as sectionsApi from "../services/SectionApi";

vi.mock("../services/studentsApi");
vi.mock("../services/ClassesApi");
vi.mock("../services/SectionApi");

describe("AddStudentModal", () => {
  it("should add student", async () => {
    const refreshStudents = vi.fn();
    const onClose = vi.fn();

    vi.mocked(classesApi.getClasses).mockResolvedValue([
      {
        class_id: 1,
        class_name: "10",
      },
    ]);

    vi.mocked(sectionsApi.getSections).mockResolvedValue([
      {
        section_id: 1,
        section_name: "A",
        class_id: 1,
      },
    ]);

    vi.mocked(studentsApi.addStudent).mockResolvedValue({
      success: true,
    });

    render(
      <AddStudentModal refreshStudents={refreshStudents} onClose={onClose} />,
    );

    await waitFor(() => {
      expect(screen.getByText("Add")).toBeInTheDocument();
    });

    const inputs = screen.getAllByRole("textbox");

    await userEvent.type(inputs[0], "John");

    await userEvent.type(inputs[1], "john@gmail.com");

    await userEvent.type(inputs[2], "9999999999");

    const selects = screen.getAllByRole("combobox");

    await userEvent.selectOptions(selects[0], "1");

    await userEvent.selectOptions(selects[1], "1");

    const addButton = screen.getByText("Add");

    await userEvent.click(addButton);

    expect(studentsApi.addStudent).toHaveBeenCalled();

    expect(refreshStudents).toHaveBeenCalled();

    expect(onClose).toHaveBeenCalled();
  }, 10000);
});
