import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { MemoryRouter } from "react-router-dom";

import LoginPage from "../pages/Login";
import * as authApi from "../services/authApi";

const mockNavigate = vi.fn();
const mockDispatch = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual =
    await vi.importActual<typeof import("react-router-dom")>(
      "react-router-dom"
    );

  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

vi.mock("../services/authApi", () => ({
  loginUser: vi.fn(),
}));

vi.mock("../app/hooks", () => ({
  useAppDispatch: () => mockDispatch,
}));

vi.mock("../features/auth/authSlice", () => ({
  loginSuccess: vi.fn((payload) => ({
    type: "auth/loginSuccess",
    payload,
  })),
}));

describe("LoginPage", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.clear();
  });

  it("renders login form", () => {
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );

    expect(
      screen.getByRole("heading", { name: /login/i })
    ).toBeInTheDocument();

    expect(
      screen.getByLabelText(/email/i)
    ).toBeInTheDocument();

    expect(
      screen.getByLabelText(/password/i)
    ).toBeInTheDocument();
  });

  it("shows required validation errors", async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );

    await user.click(
      screen.getByRole("button", {
        name: /login/i,
      })
    );

    expect(
      await screen.findByText(/email is required/i)
    ).toBeInTheDocument();

    expect(
      await screen.findByText(/password is required/i)
    ).toBeInTheDocument();
  });

  it("shows invalid email validation", async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );

    await user.type(
      screen.getByLabelText(/email/i),
      "invalid-email"
    );

    expect(
      await screen.findByText(/invalid email format/i)
    ).toBeInTheDocument();
  });

  it("shows password length validation", async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );

    await user.type(
      screen.getByLabelText(/password/i),
      "123"
    );

    expect(
      await screen.findByText(
        /minimum 6 characters required/i
      )
    ).toBeInTheDocument();
  });

  it("logs in successfully", async () => {
    const user = userEvent.setup();

    vi.mocked(authApi.loginUser).mockResolvedValue({
      token: "abc123",
      user: {
        name: "Ullas",
        role: "admin",
      },
    });

    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );

    await user.type(
      screen.getByLabelText(/email/i),
      "test@gmail.com"
    );

    await user.type(
      screen.getByLabelText(/password/i),
      "123456"
    );

    await user.click(
      screen.getByRole("button", {
        name: /login/i,
      })
    );

    await waitFor(() => {
      expect(authApi.loginUser).toHaveBeenCalledWith({
        email: "test@gmail.com",
        password: "123456",
      });
    });

    expect(
      localStorage.getItem("token")
    ).toBe("abc123");

    expect(
      JSON.parse(localStorage.getItem("user")!)
    ).toEqual({
      name: "Ullas",
      role: "admin",
    });

    expect(mockDispatch).toHaveBeenCalled();

    expect(mockNavigate).toHaveBeenCalledWith(
      "/home"
    );
  });

  it("shows server error when login fails", async () => {
    const user = userEvent.setup();

    vi.mocked(authApi.loginUser).mockRejectedValue(
      new Error("Invalid credentials")
    );

    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );

    await user.type(
      screen.getByLabelText(/email/i),
      "test@gmail.com"
    );

    await user.type(
      screen.getByLabelText(/password/i),
      "123456"
    );

    await user.click(
      screen.getByRole("button", {
        name: /login/i,
      })
    );

    expect(
      await screen.findByText(/invalid credentials/i)
    ).toBeInTheDocument();
  });

  it("renders back to home link", () => {
    render(
      <MemoryRouter>
        <LoginPage />
      </MemoryRouter>
    );

    expect(
      screen.getByRole("link", {
        name: /back to home/i,
      })
    ).toBeInTheDocument();
  });
});