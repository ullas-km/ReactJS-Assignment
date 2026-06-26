import { describe, it, expect, vi, beforeEach } from "vitest";
import axiosInstance from "../services/axiosInstance";
import { changePassword } from "../services/userApi";

vi.mock("../services/axiosInstance", () => ({
  default: {
    put: vi.fn(),
  },
}));

describe("changePassword", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("calls the change password API and returns data", async () => {
    const response = {
      data: {
        success: true,
        message: "Password changed successfully",
      },
    };

    vi.mocked(axiosInstance.put).mockResolvedValue(response);

    const result = await changePassword(
      1,
      "oldPassword",
      "newPassword",
    );

    expect(axiosInstance.put).toHaveBeenCalledWith(
      "/users/change-password",
      {
        user_id: 1,
        currentPassword: "oldPassword",
        newPassword: "newPassword",
      },
    );

    expect(result).toEqual(response.data);
  });
});