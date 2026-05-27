import {
  describe,
  it,
  expect,
  vi,
  beforeEach,
} from "vitest";

import axiosInstance from "../services/axiosInstance";

import {
  getFees,
  addFee,
  updateFee,
  deleteFee,
  getFeeStats,
} from "../services/FeesApi";

vi.mock("../services/axiosInstance", () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
    delete: vi.fn(),
  },
}));

describe("FeesApi", () => {

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should get fees", async () => {

    vi.mocked(axiosInstance.get).mockResolvedValue({
      data: [
        {
          id: 1,
          student_id: 1,
          amount: 5000,
        },
      ],
    } as any);

    const result = await getFees();

    expect(axiosInstance.get)
      .toHaveBeenCalledWith(
        "/fees/get-fees"
      );

    expect(result).toEqual([
      {
        id: 1,
        student_id: 1,
        amount: 5000,
      },
    ]);
  });

  it("should add fee", async () => {

    vi.mocked(axiosInstance.post).mockResolvedValue({
      data: {
        success: true,
      },
    } as any);

    const result = await addFee(
      1,
      5000,
      "2026-05-26",
      "pending"
    );

    expect(axiosInstance.post)
      .toHaveBeenCalledWith(
        "/fees/post-fees",
        {
          student_id: 1,
          amount: 5000,
          due_date: "2026-05-26",
          status: "pending",
        }
      );

    expect(result).toEqual({
      success: true,
    });
  });

  it("should update fee", async () => {

    vi.mocked(axiosInstance.put).mockResolvedValue({
      data: {
        success: true,
      },
    } as any);

    const result = await updateFee(
      1,
      1,
      7000,
      "2026-05-26",
      "paid"
    );

    expect(axiosInstance.put)
      .toHaveBeenCalledWith(
        "/fees/put-fees/1",
        {
          student_id: 1,
          amount: 7000,
          due_date: "2026-05-26",
          status: "paid",
        }
      );

    expect(result).toEqual({
      success: true,
    });
  });

  it("should delete fee", async () => {

    vi.mocked(axiosInstance.delete).mockResolvedValue({
      data: {
        success: true,
      },
    } as any);

    const result = await deleteFee(1);

    expect(axiosInstance.delete)
      .toHaveBeenCalledWith(
        "/fees/delete-fees/1"
      );

    expect(result).toEqual({
      success: true,
    });
  });

  it("should get fee stats", async () => {

    vi.mocked(axiosInstance.get).mockResolvedValue({
      data: {
        total: 10000,
      },
    } as any);

    const result = await getFeeStats();

    expect(axiosInstance.get)
      .toHaveBeenCalledWith(
        "/fees/fee-stats"
      );

    expect(result).toEqual({
      total: 10000,
    });
  });
});