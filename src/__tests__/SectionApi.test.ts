import {
  describe,
  it,
  expect,
  vi,
  beforeEach,
} from "vitest";

import axiosInstance from "../services/axiosInstance";

import {
  getSections,
  addSection,
  updateSection,
  deleteSection,
} from "../services/SectionApi";

vi.mock("../services/axiosInstance", () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
  },
}));

describe("SectionApi", () => {

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should get sections", async () => {

    vi.mocked(axiosInstance.get).mockResolvedValue({
      data: [
        {
          section_id: 1,
          section_name: "A",
          class_id: 1,
        },
      ],
    } as any);

    const result = await getSections();

    expect(axiosInstance.get)
      .toHaveBeenCalledWith(
        "/sections/get-sections"
      );

    expect(result).toEqual([
      {
        section_id: 1,
        section_name: "A",
        class_id: 1,
      },
    ]);
  });

  it("should add section", async () => {

    vi.mocked(axiosInstance.post).mockResolvedValue({
      data: {
        success: true,
      },
    } as any);

    const result = await addSection(
      "A",
      1
    );

    expect(axiosInstance.post)
      .toHaveBeenCalledWith(
        "/sections/post-sections",
        {
          section_name: "A",
          class_id: 1,
        }
      );

    expect(result).toEqual({
      success: true,
    });
  });

  it("should update section", async () => {

    vi.mocked(axiosInstance.put).mockResolvedValue({
      data: {
        success: true,
      },
    } as any);

    const result = await updateSection(
      1,
      "B",
      1
    );

    expect(axiosInstance.put)
      .toHaveBeenCalledWith(
        "/sections/put-sections/1",
        {
          section_name: "B",
          class_id: 1,
        }
      );

    expect(result).toEqual({
      success: true,
    });
  });

  it("should delete section", async () => {

    vi.mocked(axiosInstance.delete).mockResolvedValue({
      data: {
        success: true,
      },
    } as any);

    const result = await deleteSection(1);

    expect(axiosInstance.delete)
      .toHaveBeenCalledWith(
        "/sections/delete-sections/1"
      );

    expect(result).toEqual({
      success: true,
    });
  });
});