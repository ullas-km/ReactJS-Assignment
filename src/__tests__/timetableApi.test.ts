import { describe, it, expect, vi, beforeEach } from "vitest";
import axiosInstance from "../services/axiosInstance";

import {
  createTimetable,
  getTimetableByClassSection,
  getAllTimetablesGrouped,
  updateTimetableEntry,
  deleteTimetableEntry,
  deleteTimetableByClassSection,
  getSubjectsByTeacher,
  getTeacherSubjects,
} from "../services/timetableApi";

vi.mock("../services/axiosInstance", () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
  },
}));

describe("timetableApi", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should create timetable", async () => {
    const timetableData = {
      class_id: 1,
      section_id: 1,
      subject_id: 2,
      teacher_id: 3,
      day: "Monday",
      period: 1,
    };

    const mockResponse = { success: true };

    vi.mocked(axiosInstance.post).mockResolvedValue({
      data: mockResponse,
    });

    const result = await createTimetable(timetableData);

    expect(axiosInstance.post).toHaveBeenCalledWith(
      "/timetable/post-timetables",
      timetableData
    );

    expect(result).toEqual(mockResponse);
  });

  it("should get timetable by class and section", async () => {
    const mockData = [{ id: 1 }];

    vi.mocked(axiosInstance.get).mockResolvedValue({
      data: mockData,
    });

    const result = await getTimetableByClassSection(1, 2);

    expect(axiosInstance.get).toHaveBeenCalledWith(
      "/timetable/get-by-class-section/1/2"
    );

    expect(result).toEqual(mockData);
  });

  it("should get all grouped timetables", async () => {
    const mockData = [{ class_name: "10" }];

    vi.mocked(axiosInstance.get).mockResolvedValue({
      data: mockData,
    });

    const result = await getAllTimetablesGrouped();

    expect(axiosInstance.get).toHaveBeenCalledWith(
      "/timetable/get-all-grouped"
    );

    expect(result).toEqual(mockData);
  });

  it("should update timetable entry", async () => {
    const mockData = { success: true };

    vi.mocked(axiosInstance.put).mockResolvedValue({
      data: mockData,
    });

    const result = await updateTimetableEntry(1, 2, 3);

    expect(axiosInstance.put).toHaveBeenCalledWith(
      "/timetable/put-timetable/1",
      {
        teacher_id: 2,
        subject_id: 3,
      }
    );

    expect(result).toEqual(mockData);
  });

  it("should delete timetable entry", async () => {
    const mockData = { success: true };

    vi.mocked(axiosInstance.delete).mockResolvedValue({
      data: mockData,
    });

    const result = await deleteTimetableEntry(1);

    expect(axiosInstance.delete).toHaveBeenCalledWith(
      "/timetable/delete-timetable/1"
    );

    expect(result).toEqual(mockData);
  });

  it("should delete timetable by class and section", async () => {
    const mockData = { success: true };

    vi.mocked(axiosInstance.delete).mockResolvedValue({
      data: mockData,
    });

    const result = await deleteTimetableByClassSection(1, 2);

    expect(axiosInstance.delete).toHaveBeenCalledWith(
      "/timetable/delete-by-class-section/1/2"
    );

    expect(result).toEqual(mockData);
  });

  it("should get subjects by teacher", async () => {
    const mockData = {
      teacher_id: 1,
      subject_ids: "1,2,3",
    };

    vi.mocked(axiosInstance.get).mockResolvedValue({
      data: mockData,
    });

    const result = await getSubjectsByTeacher(1);

    expect(axiosInstance.get).toHaveBeenCalledWith(
      "/teacher/get-teachers/1"
    );

    expect(result).toEqual(mockData);
  });

  it("should get teacher subject ids", async () => {
    vi.mocked(axiosInstance.get).mockResolvedValue({
      data: {
        subject_ids: "1,2,3",
      },
    });

    const result = await getTeacherSubjects(1);

    expect(axiosInstance.get).toHaveBeenCalledWith(
      "/teacher/get-teachers/1"
    );

    expect(result).toEqual([1, 2, 3]);
  });

  it("should return empty array when teacher has no subjects", async () => {
    vi.mocked(axiosInstance.get).mockResolvedValue({
      data: {},
    });

    const result = await getTeacherSubjects(1);

    expect(result).toEqual([]);
  });

  it("should throw when create timetable fails", async () => {
    vi.mocked(axiosInstance.post).mockRejectedValue(
      new Error("API Error")
    );

    await expect(
      createTimetable({
        class_id: 1,
        section_id: 1,
        subject_id: 1,
        teacher_id: 1,
        day: "Monday",
        period: 1,
      })
    ).rejects.toThrow("API Error");
  });
});