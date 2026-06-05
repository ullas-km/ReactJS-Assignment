import { describe, it, expect, vi, beforeEach } from "vitest";

import axiosInstance from "../services/axiosInstance";

import {
  getStudents,
  addStudent,
  updateStudent,
  deleteStudent,
} from "../services/studentsApi";

vi.mock("../services/axiosInstance", () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
  },
}));

describe("studentsApi", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should get students", async () => {
    vi.mocked(axiosInstance.get).mockResolvedValue({
      data: [{ name: "John" }],
    });

    const result = await getStudents();

    expect(axiosInstance.get).toHaveBeenCalledWith("/students/get-students");

    expect(result).toEqual([{ name: "John" }]);
  });

  it("should add student", async () => {
    vi.mocked(axiosInstance.post).mockResolvedValue({
      data: { success: true },
    });

    const result = await addStudent(
      "John",
      "john@gmail.com",
      "9999999999",
      1,
      1,
    );

    expect(axiosInstance.post).toHaveBeenCalled();

    expect(result).toEqual({ success: true });
  });

  it("should update student", async () => {
    vi.mocked(axiosInstance.put).mockResolvedValue({
      data: { success: true },
    });

    const result = await updateStudent(
      1,
      1,
      1,
      "John",
      "john@gmail.com",
      "9999999999",
    );

    expect(axiosInstance.put).toHaveBeenCalled();

    expect(result).toEqual({ success: true });
  });

  it("should delete student", async () => {
    vi.mocked(axiosInstance.delete).mockResolvedValue({
      data: { success: true },
    });

    const result = await deleteStudent(1);

    expect(axiosInstance.delete).toHaveBeenCalledWith(
      "/students/delete-students/1",
    );

    expect(result).toEqual({ success: true });
  });
});
