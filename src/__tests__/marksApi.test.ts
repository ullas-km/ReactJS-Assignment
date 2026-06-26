import { describe, it, expect, vi, beforeEach } from "vitest";
import api from "../services/axiosInstance";

import {
  addMarks,
  updateMarks,
  deleteMarks,
  getStudentMarks,
} from "../services/marksApi";

vi.mock("../services/axiosInstance", () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
  },
}));

describe("marksApi", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("addMarks", () => {
    it("should add marks", async () => {
      const payload = {
        student_id: 1,
        subject_id: 2,
        marks: 95,
      };

      const response = { data: { success: true } };

      vi.mocked(api.post).mockResolvedValue(response);

      const result = await addMarks(payload);

      expect(api.post).toHaveBeenCalledWith(
        "/marks/post-marks",
        payload,
      );
      expect(result).toEqual(response);
    });

    it("should throw when addMarks fails", async () => {
      vi.mocked(api.post).mockRejectedValue(new Error("API Error"));

      await expect(
        addMarks({ student_id: 1, marks: 90 }),
      ).rejects.toThrow("API Error");
    });
  });

  describe("updateMarks", () => {
    it("should update marks", async () => {
      const payload = {
        marks: 98,
      };

      const response = { data: { success: true } };

      vi.mocked(api.put).mockResolvedValue(response);

      const result = await updateMarks(1, payload);

      expect(api.put).toHaveBeenCalledWith(
        "/marks/edit-marks/1",
        payload,
      );
      expect(result).toEqual(response);
    });

    it("should throw when updateMarks fails", async () => {
      vi.mocked(api.put).mockRejectedValue(new Error("API Error"));

      await expect(
        updateMarks(1, { marks: 100 }),
      ).rejects.toThrow("API Error");
    });
  });

  describe("deleteMarks", () => {
    it("should delete marks", async () => {
      const response = { data: { success: true } };

      vi.mocked(api.delete).mockResolvedValue(response);

      const result = await deleteMarks(1);

      expect(api.delete).toHaveBeenCalledWith(
        "/marks/delete-marks/1",
      );
      expect(result).toEqual(response);
    });

    it("should throw when deleteMarks fails", async () => {
      vi.mocked(api.delete).mockRejectedValue(new Error("API Error"));

      await expect(deleteMarks(1)).rejects.toThrow("API Error");
    });
  });

  describe("getStudentMarks", () => {
    it("should fetch student marks", async () => {
      const mockData = [
        {
          student_id: 1,
          marks: 95,
        },
      ];

      vi.mocked(api.get).mockResolvedValue({
        data: mockData,
      });

      const result = await getStudentMarks();

      expect(api.get).toHaveBeenCalledWith(
        "/marks/student-marks",
      );
      expect(result).toEqual(mockData);
    });

    it("should throw when getStudentMarks fails", async () => {
      vi.mocked(api.get).mockRejectedValue(new Error("API Error"));

      await expect(getStudentMarks()).rejects.toThrow(
        "API Error",
      );
    });
  });
});