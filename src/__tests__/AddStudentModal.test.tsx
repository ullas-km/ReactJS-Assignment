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
      <AddStudentModal
        refreshStudents={refreshStudents}
        onClose={onClose}
      />
    );

    await waitFor(() => {
      expect(screen.getByText("Add")).toBeInTheDocument();
    });

    await userEvent.type(
      screen.getByLabelText(/name/i),
      "John"
    );

    await userEvent.type(
      screen.getByLabelText(/email/i),
      "john@gmail.com"
    );

    await userEvent.type(
      screen.getByLabelText(/password/i),
      "password123"
    );

    await userEvent.type(
      screen.getByLabelText(/phone/i),
      "9999999999"
    );

    const selects = screen.getAllByRole("combobox");

    await userEvent.selectOptions(selects[0], "1");

    await waitFor(() => {
      expect(selects[1]).toBeInTheDocument();
    });

    await userEvent.selectOptions(selects[1], "1");

    await userEvent.click(screen.getByRole("button", { name: /add/i }));

    await waitFor(() => {
      expect(studentsApi.addStudent).toHaveBeenCalledWith(
        "John",
        "john@gmail.com",
        "9999999999",
        1,
        1,
        "password123"
      );

      expect(refreshStudents).toHaveBeenCalledTimes(1);
      expect(onClose).toHaveBeenCalledTimes(1);
    });
  }, 10000);
});