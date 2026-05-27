import { describe, it, expect, vi, beforeEach } from "vitest";

import axiosInstance from "../services/axiosInstance";

import {
  getClasses,
  addClass,
  updateClass,
  deleteClass,
  getClassStats,
} from "../services/ClassesApi";

vi.mock("../services/axiosInstance", () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
  },
}));

describe("ClassesApi", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should get classes", async () => {
    vi.mocked(axiosInstance.get).mockResolvedValue({
      data: [{ class_id: 1, class_name: 10 }],
    });

    const result = await getClasses();

    expect(axiosInstance.get).toHaveBeenCalledWith(
      "/classes/get-classes"
    );

    expect(result).toEqual([
      { class_id: 1, class_name: 10 },
    ]);
  });

  it("should add class", async () => {
    vi.mocked(axiosInstance.post).mockResolvedValue({
      data: { success: true },
    });

    const result = await addClass(10);

    expect(axiosInstance.post).toHaveBeenCalledWith(
      "/classes/post-classes",
      {
        class_name: 10,
      }
    );

    expect(result).toEqual({
      success: true,
    });
  });

  it("should update class", async () => {
    vi.mocked(axiosInstance.put).mockResolvedValue({
      data: { success: true },
    });

    const result = await updateClass(1, "12");

    expect(axiosInstance.put).toHaveBeenCalledWith(
      "/classes/put-classes/1",
      {
        class_name: "12",
      }
    );

    expect(result).toEqual({
      success: true,
    });
  });

  it("should delete class", async () => {
    vi.mocked(axiosInstance.delete).mockResolvedValue({
      data: { success: true },
    });

    const result = await deleteClass(1);

    expect(axiosInstance.delete).toHaveBeenCalledWith(
      "/classes/delete-classes/1"
    );

    expect(result).toEqual({
      success: true,
    });
  });

  it("should get class stats", async () => {
    vi.mocked(axiosInstance.get).mockResolvedValue({
      data: {
        totalClasses: 5,
      },
    });

    const result = await getClassStats();

    expect(axiosInstance.get).toHaveBeenCalledWith(
      "/classes/class-stats"
    );

    expect(result).toEqual({
      totalClasses: 5,
    });
  });
});