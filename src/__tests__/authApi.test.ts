import axios from "axios";
import { describe, it, expect, vi, beforeEach } from "vitest";

import { loginUser, type LoginPayload } from "../services/authApi";

vi.mock("axios");

describe("authApi", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should login user successfully", async () => {
    const payload: LoginPayload = {
      email: "test@gmail.com",
      password: "123456",
    };

    const mockResponse = {
      data: {
        token: "fake-token",
        user: {
          user_id: 1,
          name: "admin",
          email: "test@gmail.com",
          role: "admin",
        },
      },
    };

    vi.mocked(axios.post).mockResolvedValue(mockResponse);

    const result = await loginUser(payload);

    expect(axios.post).toHaveBeenCalledWith(
      expect.stringContaining("/auth/login"),
      payload,
    );

    expect(result).toEqual(mockResponse.data);
  });

  it("should throw error when login fails", async () => {
    const payload: LoginPayload = {
      email: "wrong@gmail.com",
      password: "wrongpass",
    };

    vi.mocked(axios.post).mockRejectedValue(new Error("Invalid credentials"));

    await expect(loginUser(payload)).rejects.toThrow("Invalid credentials");
  });
});
