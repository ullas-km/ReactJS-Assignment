import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import TeacherTimetableView from "../pages/TeacherTimetableView";
import { getTeacherTimetable } from "../services/teacherTimetableApi";

vi.mock("../services/teacherTimetableApi", () => ({
  getTeacherTimetable: vi.fn(),
}));

describe("TeacherTimetableView", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it("renders timetable header", () => {
    localStorage.setItem(
      "user",
      JSON.stringify({ teacher_id: 1 })
    );

    vi.mocked(getTeacherTimetable).mockResolvedValue([]);

    render(<TeacherTimetableView />);

    expect(
      screen.getByText("📅 My Teaching Schedule")
    ).toBeInTheDocument();

    expect(
      screen.getByText("Weekly timetable overview")
    ).toBeInTheDocument();
  });

  it("calls API when teacher_id exists", async () => {
    localStorage.setItem(
      "user",
      JSON.stringify({ teacher_id: 10 })
    );

    vi.mocked(getTeacherTimetable).mockResolvedValue([]);

    render(<TeacherTimetableView />);

    await waitFor(() => {
      expect(getTeacherTimetable).toHaveBeenCalledWith(10);
    });
  });

  it("does not call API when teacher_id is missing", () => {
    localStorage.setItem(
      "user",
      JSON.stringify({})
    );

    render(<TeacherTimetableView />);

    expect(getTeacherTimetable).not.toHaveBeenCalled();
  });

  it("renders timetable data correctly", async () => {
    localStorage.setItem(
      "user",
      JSON.stringify({ teacher_id: 1 })
    );

    vi.mocked(getTeacherTimetable).mockResolvedValue([
      {
        day: "Monday",
        period: 1,
        class_name: "10",
        section_name: "A",
        subject_name: "Mathematics",
      },
    ]);

    render(<TeacherTimetableView />);

    await waitFor(() => {
      expect(
        screen.getByText("Mathematics")
      ).toBeInTheDocument();
    });

    expect(
      screen.getByText("10 - A")
    ).toBeInTheDocument();
  });

  it("shows Free for empty slots", async () => {
    localStorage.setItem(
      "user",
      JSON.stringify({ teacher_id: 1 })
    );

    vi.mocked(getTeacherTimetable).mockResolvedValue([]);

    render(<TeacherTimetableView />);

    await waitFor(() => {
      expect(getTeacherTimetable).toHaveBeenCalled();
    });

    const freeCells = screen.getAllByText("Free");
    expect(freeCells.length).toBeGreaterThan(0);
  });

  it("renders all weekdays", () => {
    localStorage.setItem(
      "user",
      JSON.stringify({ teacher_id: 1 })
    );

    vi.mocked(getTeacherTimetable).mockResolvedValue([]);

    render(<TeacherTimetableView />);

    expect(screen.getByText("Monday")).toBeInTheDocument();
    expect(screen.getByText("Tuesday")).toBeInTheDocument();
    expect(screen.getByText("Wednesday")).toBeInTheDocument();
    expect(screen.getByText("Thursday")).toBeInTheDocument();
    expect(screen.getByText("Friday")).toBeInTheDocument();
  });

  it("renders all periods", () => {
    localStorage.setItem(
      "user",
      JSON.stringify({ teacher_id: 1 })
    );

    vi.mocked(getTeacherTimetable).mockResolvedValue([]);

    render(<TeacherTimetableView />);

    expect(screen.getByText("P1")).toBeInTheDocument();
    expect(screen.getByText("P2")).toBeInTheDocument();
    expect(screen.getByText("P3")).toBeInTheDocument();
    expect(screen.getByText("P4")).toBeInTheDocument();
    expect(screen.getByText("P5")).toBeInTheDocument();
    expect(screen.getByText("P6")).toBeInTheDocument();
  });

  it("handles API errors", async () => {
    const errorSpy = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});

    localStorage.setItem(
      "user",
      JSON.stringify({ teacher_id: 1 })
    );

    vi.mocked(getTeacherTimetable).mockRejectedValue(
      new Error("API Error")
    );

    render(<TeacherTimetableView />);

    await waitFor(() => {
      expect(errorSpy).toHaveBeenCalled();
    });

    errorSpy.mockRestore();
  });
});