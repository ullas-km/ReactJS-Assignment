import axios from "axios";
import {
  loginUser,
  type LoginPayload,
} from "../../services/authApi";

jest.mock("axios");

const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("authApi", () => {
  test("loginUser returns token data", async () => {
    const mockPayload: LoginPayload = {
      email: "test@example.com",
      password: "password123",
    };

    const mockResponse = {
      data: {
        token: "mock-token",
      },
    };

    mockedAxios.post.mockResolvedValue(mockResponse);

    const result = await loginUser(mockPayload);

    expect(mockedAxios.post).toHaveBeenCalledWith(
      "http://localhost:3000/auth/login",
      mockPayload
    );

    expect(result).toEqual({
      token: "mock-token",
    });
  });
});