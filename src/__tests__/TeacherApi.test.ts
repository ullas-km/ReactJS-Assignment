import {
  describe,
  it,
  expect,
  vi,
  beforeEach,
} from "vitest";

import axiosInstance from "../services/axiosInstance";

import {
  getTeachers,
  addTeacher,
  updateTeacher,
  deleteTeacher,
  getTeacherStats,
} from "../services/TeacherApi";

vi.mock("../services/axiosInstance", () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
  },
}));

describe("TeacherApi", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should get teachers", async () => {
    vi.mocked(axiosInstance.get).mockResolvedValue({
      data: [{ teacher_name: "John" }],
    } as any);

    const result = await getTeachers();

    expect(axiosInstance.get).toHaveBeenCalledWith(
      "/teacher/get-teachers"
    );

    expect(result).toEqual([
      { teacher_name: "John" },
    ]);
  });

  it("should add teacher", async () => {
    vi.mocked(axiosInstance.post).mockResolvedValue({
      data: { success: true },
    } as any);

    const result = await addTeacher("John");

    expect(axiosInstance.post).toHaveBeenCalledWith(
      "/teacher/post-teachers",
      {
        teacher_name: "John",
      }
    );

    expect(result).toEqual({
      success: true,
    });
  });

  it("should update teacher", async () => {
    vi.mocked(axiosInstance.put).mockResolvedValue({
      data: { success: true },
    } as any);

    const result = await updateTeacher(
      1,
      "John Updated"
    );

    expect(axiosInstance.put).toHaveBeenCalledWith(
      "/teacher/put-teachers/1",
      {
        teacher_name: "John Updated",
      }
    );

    expect(result).toEqual({
      success: true,
    });
  });

  it("should delete teacher", async () => {
    vi.mocked(axiosInstance.delete).mockResolvedValue({
      data: { success: true },
    } as any);

    const result = await deleteTeacher(1);

    expect(
      axiosInstance.delete
    ).toHaveBeenCalledWith(
      "/teacher/delete-teachers/1"
    );

    expect(result).toEqual({
      success: true,
    });
  });

  it("should get teacher stats", async () => {
    vi.mocked(axiosInstance.get).mockResolvedValue({
      data: {
        total: 20,
      },
    } as any);

    const result = await getTeacherStats();

    expect(axiosInstance.get).toHaveBeenCalledWith(
      "/teacher/get-teacher-stats"
    );

    expect(result).toEqual({
      total: 20,
    });
  });
});