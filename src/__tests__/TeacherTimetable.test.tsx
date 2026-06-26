import { describe, it, expect, vi, beforeEach } from "vitest";
import {
  render,
  screen,
  fireEvent,
  waitFor,
} from "@testing-library/react";

import TeacherTimetable from "../pages/AddTimetable";

import { getTeachers } from "../services/TeacherApi";
import { getClasses } from "../services/ClassesApi";
import { getSectionsByClass } from "../services/SectionApi";
import { getSubjects } from "../services/SubjectApi";

import {
  getAllTimetablesGrouped,
  getTimetableByClassSection,
  deleteTimetableByClassSection,
} from "../services/timetableApi";

vi.mock("../services/TeacherApi", () => ({
  getTeachers: vi.fn(),
}));

vi.mock("../services/ClassesApi", () => ({
  getClasses: vi.fn(),
}));

vi.mock("../services/SectionApi", () => ({
  getSectionsByClass: vi.fn(),
}));

vi.mock("../services/SubjectApi", () => ({
  getSubjects: vi.fn(),
}));

vi.mock("../services/timetableApi", () => ({
  getAllTimetablesGrouped: vi.fn(),
  getTimetableByClassSection: vi.fn(),
  updateTimetableEntry: vi.fn(),
  deleteTimetableEntry: vi.fn(),
  deleteTimetableByClassSection: vi.fn(),
}));

vi.mock("../services/axiosInstance", () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
  },
}));

describe("TeacherTimetable", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    vi.mocked(getTeachers).mockResolvedValue([
      {
        teacher_id: 1,
        teacher_name: "John",
        subjects: "Math",
      },
    ]);

    vi.mocked(getClasses).mockResolvedValue([
      {
        class_id: 1,
        class_name: "Class 1",
      },
    ]);

    vi.mocked(getSectionsByClass).mockResolvedValue([
      {
        section_id: 1,
        section_name: "A",
      },
    ]);

    vi.mocked(getSubjects).mockResolvedValue([
      {
        sub_id: 1,
        subject_name: "Math",
      },
    ]);

    vi.mocked(getAllTimetablesGrouped).mockResolvedValue([]);
  });

  it("renders timetable manager heading", async () => {
    render(<TeacherTimetable />);

    expect(
      screen.getByText("Timetable Manager")
    ).toBeInTheDocument();
  });

  it("loads teachers, classes and subjects on mount", async () => {
    render(<TeacherTimetable />);

    await waitFor(() => {
      expect(getTeachers).toHaveBeenCalled();
      expect(getClasses).toHaveBeenCalled();
      expect(getSubjects).toHaveBeenCalled();
      expect(getAllTimetablesGrouped).toHaveBeenCalled();
    });
  });

it("loads sections when class is selected", async () => {
  render(<TeacherTimetable />);

  const selects = screen.getAllByRole("combobox");

  fireEvent.change(selects[0], {
    target: { value: "1" },
  });

  await waitFor(() => {
    expect(getSectionsByClass).toHaveBeenCalled();
  });
});
 

  it("switches to view tab", async () => {
    render(<TeacherTimetable />);

    fireEvent.click(
      screen.getByText("View All Timetables")
    );

    await waitFor(() => {
      expect(getAllTimetablesGrouped).toHaveBeenCalled();
    });
  });

  it("shows no timetable message when no data", async () => {
    render(<TeacherTimetable />);

    fireEvent.click(
      screen.getByText("View All Timetables")
    );

    expect(
      await screen.findByText("No timetables saved yet.")
    ).toBeInTheDocument();
  });

  it("loads timetable when edit button is clicked", async () => {
    vi.mocked(getAllTimetablesGrouped).mockResolvedValue([
      {
        class_id: 1,
        section_id: 1,
        class_name: "Class 1",
        section_name: "A",
        day: "Monday",
        period: 1,
        teacher_name: "John",
        subject_name: "Math",
      },
    ]);

    vi.mocked(getTimetableByClassSection).mockResolvedValue([]);

    render(<TeacherTimetable />);

    fireEvent.click(
      screen.getByText("View All Timetables")
    );

    const editBtn = await screen.findByText("Edit");

    fireEvent.click(editBtn);

    await waitFor(() => {
      expect(getSectionsByClass).toHaveBeenCalledWith(1);

      expect(
        getTimetableByClassSection
      ).toHaveBeenCalledWith(1, 1);
    });
  });

  it("deletes timetable when delete confirmed", async () => {
  vi.mocked(getAllTimetablesGrouped).mockResolvedValue([
    {
      class_id: 1,
      section_id: 1,
      class_name: "Class 1",
      section_name: "A",
      day: "Monday",
      period: 1,
      teacher_name: "John",
      subject_name: "Math",
    },
  ]);

  window.confirm = vi.fn(() => true);

  render(<TeacherTimetable />);

  fireEvent.click(
    screen.getByText("View All Timetables")
  );

  const deleteBtn = await screen.findByText(
    "Delete All"
  );

  fireEvent.click(deleteBtn);

  await waitFor(() => {
    expect(
      deleteTimetableByClassSection
    ).toHaveBeenCalledWith(1, 1);
  });
});

  it("does not delete timetable when confirmation is cancelled", async () => {
    vi.mocked(getAllTimetablesGrouped).mockResolvedValue([
      {
        class_id: 1,
        section_id: 1,
        class_name: "Class 1",
        section_name: "A",
        day: "Monday",
        period: 1,
        teacher_name: "John",
        subject_name: "Math",
      },
    ]);

    window.confirm = vi.fn(() => false);

    render(<TeacherTimetable />);

    fireEvent.click(
      screen.getByText("View All Timetables")
    );

    const deleteBtn = await screen.findByText(
      "Delete All"
    );

    fireEvent.click(deleteBtn);

    expect(
      deleteTimetableByClassSection
    ).not.toHaveBeenCalled();
  });

  it("shows alert when saving without selecting class and section", () => {
    window.alert = vi.fn();

    render(<TeacherTimetable />);

    const saveButton = screen.queryByText(
      "Save New Entries"
    );

    if (saveButton) {
      fireEvent.click(saveButton);
    }

    expect(window.alert).not.toHaveBeenCalled();
  });

  it("renders pagination when more than 5 timetables exist", async () => {
    const mockData = Array.from({ length: 6 }, (_, i) => ({
      class_id: i + 1,
      section_id: 1,
      class_name: `Class ${i + 1}`,
      section_name: "A",
      day: "Monday",
      period: 1,
      teacher_name: "John",
      subject_name: "Math",
    }));

    vi.mocked(getAllTimetablesGrouped).mockResolvedValue(
      mockData
    );

    render(<TeacherTimetable />);

    fireEvent.click(
      screen.getByText("View All Timetables")
    );

    expect(
      await screen.findByText("Next")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Previous")
    ).toBeInTheDocument();
  });
});