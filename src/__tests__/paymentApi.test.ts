import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import axiosInstance from "../services/axiosInstance";
import { makePayment } from "../services/PaymentsApi";

vi.mock("../services/axiosInstance", () => ({
  default: {
    post: vi.fn(),
  },
}));

describe("paymentApi", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("should make payment successfully", async () => {
    const mockDate = new Date("2026-06-22T10:00:00.000Z");

    vi.spyOn(Date, "now").mockReturnValue(123456789);

    vi.useFakeTimers();
    vi.setSystemTime(mockDate);

    vi.mocked(axiosInstance.post).mockResolvedValue({
      data: {
        success: true,
      },
    });

    const result = await makePayment(1, 10, 500);

    expect(axiosInstance.post).toHaveBeenCalledWith(
      "/payments/post-payments",
      expect.objectContaining({
        student_id: 1,
        fee_id: 10,
        amount: 500,
        payment_date: "2026-06-22",
        payment_method: "UPI",
        status: "success",
        transaction_id: expect.stringMatching(/^TXN\d+$/),
      }),
    );

    expect(result).toEqual({
      success: true,
    });

    vi.useRealTimers();
  });

  it("should throw when payment request fails", async () => {
    vi.mocked(axiosInstance.post).mockRejectedValue(
      new Error("Payment Failed"),
    );

    await expect(makePayment(1, 10, 500)).rejects.toThrow("Payment Failed");
  });
});
