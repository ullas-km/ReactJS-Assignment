import {
  describe,
  it,
  expect,
  vi,
  beforeEach,
} from "vitest";

import axiosInstance from "../services/axiosInstance";

import {
  getSubjects,
  addSubject,
  updateSubject,
  deleteSubject,
} from "../services/SubjectApi";

vi.mock("../services/axiosInstance", () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
  },
}));

describe("SubjectApi", () => {

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should get subjects", async () => {

    vi.mocked(axiosInstance.get).mockResolvedValue({
      data: [
        {
          sub_id: 1,
          subject_name: "Maths",
        },
      ],
    } as any);

    const result = await getSubjects();

    expect(axiosInstance.get)
      .toHaveBeenCalledWith(
        "/subjects/get-subjects"
      );

    expect(result).toEqual([
      {
        sub_id: 1,
        subject_name: "Maths",
      },
    ]);
  });

  it("should add subject", async () => {

    vi.mocked(axiosInstance.post).mockResolvedValue({
      data: {
        success: true,
      },
    } as any);

    const result = await addSubject(
      "Science"
    );

    expect(axiosInstance.post)
      .toHaveBeenCalledWith(
        "/subjects/post-subjects",
        {
          subject_name: "Science",
        }
      );

    expect(result).toEqual({
      success: true,
    });
  });

  it("should update subject", async () => {

    vi.mocked(axiosInstance.put).mockResolvedValue({
      data: {
        success: true,
      },
    } as any);

    const result = await updateSubject(
      1,
      "Physics"
    );

    expect(axiosInstance.put)
      .toHaveBeenCalledWith(
        "/subjects/put-subjects/1",
        {
          subject_name: "Physics",
        }
      );

    expect(result).toEqual({
      success: true,
    });
  });

  it("should delete subject", async () => {

    vi.mocked(axiosInstance.delete).mockResolvedValue({
      data: {
        success: true,
      },
    } as any);

    const result = await deleteSubject(1);

    expect(axiosInstance.delete)
      .toHaveBeenCalledWith(
        "/subjects/delete-subjects/1"
      );

    expect(result).toEqual({
      success: true,
    });
  });
});