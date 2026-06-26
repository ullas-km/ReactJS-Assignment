import { describe, it, expect, vi, beforeEach } from "vitest";
import api from "../services/axiosInstance";

import {
  getAttendance,
  addAttendance,
  bulkAddAttendance,
  getAttendanceByFilters,
} from "../services/attendanceApi";

vi.mock("../services/axiosInstance", () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
  },
}));

describe("attendanceApi", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("getAttendance", () => {
    it("should fetch attendance records", async () => {
      const mockData = [{ id: 1, status: "Present" }];

      vi.mocked(api.get).mockResolvedValue({
        data: mockData,
      });

      const result = await getAttendance();

      expect(api.get).toHaveBeenCalledWith(
        "/attendance/get-attendance"
      );
      expect(result).toEqual(mockData);
    });
  });

  describe("addAttendance", () => {
    it("should add attendance record", async () => {
      const attendanceData = {
        student_id: 1,
        date: "2026-06-22",
        status: "Present",
      };

      vi.mocked(api.post).mockResolvedValue({
        data: { success: true },
      });

      const result = await addAttendance(attendanceData);

      expect(api.post).toHaveBeenCalledWith(
        "/attendance/post-attendance",
        attendanceData
      );

      expect(result).toEqual({ success: true });
    });
  });

  describe("bulkAddAttendance", () => {
    it("should add multiple attendance records", async () => {
      const records = [
        {
          student_id: 1,
          date: "2026-06-22",
          status: "Present",
        },
        {
          student_id: 2,
          date: "2026-06-22",
          status: "Absent",
        },
      ];

      vi.mocked(api.post).mockResolvedValue({
        data: { inserted: 2 },
      });

      const result = await bulkAddAttendance(records);

      expect(api.post).toHaveBeenCalledWith(
        "/attendance/bulk-post-attendance",
        records
      );

      expect(result).toEqual({ inserted: 2 });
    });
  });

  describe("getAttendanceByFilters", () => {
    it("should fetch attendance using filters", async () => {
      const mockData = [
        {
          student_id: 1,
          status: "Present",
        },
      ];

      vi.mocked(api.get).mockResolvedValue({
        data: mockData,
      });

      const result = await getAttendanceByFilters(
        1,
        2,
        "2026-06-22"
      );

      expect(api.get).toHaveBeenCalledWith(
        "/attendance/view-attendance",
        {
          params: {
            class_id: 1,
            section_id: 2,
            date: "2026-06-22",
          },
        }
      );

      expect(result).toEqual(mockData);
    });
  });
});