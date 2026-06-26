import { describe, it, expect, vi, beforeEach } from "vitest";
import axiosInstance from "../services/axiosInstance";
import { getTeacherTimetable } from "../services/teacherTimetableApi";

vi.mock("../services/axiosInstance", () => ({
  default: {
    get: vi.fn(),
  },
}));

describe("teacherTimetableApi", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should fetch teacher timetable", async () => {
    const mockData = [
      {
        day: "Monday",
        period: 1,
        subject_name: "Maths",
      },
    ];

    vi.mocked(axiosInstance.get).mockResolvedValue({
      data: mockData,
    });

    const result = await getTeacherTimetable(5);

    expect(axiosInstance.get).toHaveBeenCalledWith(
      "/timetable/teacher/5"
    );

    expect(result).toEqual(mockData);
  });

  it("should throw when API fails", async () => {
    vi.mocked(axiosInstance.get).mockRejectedValue(
      new Error("API Error")
    );

    await expect(
      getTeacherTimetable(5)
    ).rejects.toThrow("API Error");
  });
});