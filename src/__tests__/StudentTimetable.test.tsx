import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";

import StudentTimetable from "../pages/StudentTimetable";
import { getTimetableByClassSection } from "../services/timetableApi";

vi.mock("../services/timetableApi", () => ({
  getTimetableByClassSection: vi.fn(),
}));

describe("StudentTimetable", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    localStorage.setItem(
      "user",
      JSON.stringify({
        name: "John",
        class_id: 1,
        section_id: 1,
        class_name: "Class 10",
        section_name: "A",
      })
    );
  });

  it("renders heading and student info", async () => {
    vi.mocked(getTimetableByClassSection).mockResolvedValue([]);

    render(<StudentTimetable />);

    expect(
      screen.getByText("My Timetable")
    ).toBeInTheDocument();

    expect(
      screen.getByText(/John · Class Class 10 · Section A/i)
    ).toBeInTheDocument();
  });

  it("calls timetable API on mount", async () => {
    vi.mocked(getTimetableByClassSection).mockResolvedValue([]);

    render(<StudentTimetable />);

    await waitFor(() => {
      expect(getTimetableByClassSection).toHaveBeenCalledWith(
        1,
        1
      );
    });
  });

  it("renders timetable data", async () => {
    vi.mocked(getTimetableByClassSection).mockResolvedValue([
      {
        day: "Monday",
        period: 1,
        teacher_name: "John Sir",
        subject_name: "Math",
      },
    ]);

    render(<StudentTimetable />);

    expect(
      await screen.findByText("Math")
    ).toBeInTheDocument();

    expect(
      screen.getByText("John Sir")
    ).toBeInTheDocument();
  });

  it("renders all weekdays", async () => {
    vi.mocked(getTimetableByClassSection).mockResolvedValue([])

    render(<StudentTimetable />);

    expect(await screen.findByText("Monday")).toBeInTheDocument();
    expect(screen.getByText("Tuesday")).toBeInTheDocument();
    expect(screen.getByText("Wednesday")).toBeInTheDocument();
    expect(screen.getByText("Thursday")).toBeInTheDocument();
    expect(screen.getByText("Friday")).toBeInTheDocument();
  });

  it("renders all periods", async () => {
    vi.mocked(getTimetableByClassSection).mockResolvedValue([]);

    render(<StudentTimetable />);

    expect(await screen.findByText("Period 1")).toBeInTheDocument();
    expect(screen.getByText("Period 2")).toBeInTheDocument();
    expect(screen.getByText("Period 3")).toBeInTheDocument();
    expect(screen.getByText("Period 4")).toBeInTheDocument();
    expect(screen.getByText("Period 5")).toBeInTheDocument();
    expect(screen.getByText("Period 6")).toBeInTheDocument();
  });

  it("shows empty cells when no timetable data exists", async () => {
    vi.mocked(getTimetableByClassSection).mockResolvedValue([]);

    render(<StudentTimetable />);

    await waitFor(() => {
      expect(getTimetableByClassSection).toHaveBeenCalled();
    });

    const emptyCells = screen.getAllByText("—");

    expect(emptyCells.length).toBeGreaterThan(0);
  });

  it("does not call API if class_id is missing", () => {
    localStorage.setItem(
      "user",
      JSON.stringify({
        name: "John",
        section_id: 1,
      })
    );

    render(<StudentTimetable />);

    expect(
      getTimetableByClassSection
    ).not.toHaveBeenCalled();
  });

  it("handles API error gracefully", async () => {
    const consoleSpy = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});

    vi.mocked(getTimetableByClassSection).mockRejectedValue(
      new Error("API Error")
    );

    render(<StudentTimetable />);

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalled();
    });

    consoleSpy.mockRestore();
  });
});