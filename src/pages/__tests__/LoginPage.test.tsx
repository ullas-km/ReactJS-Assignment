import {
  render,
  screen,
  fireEvent,
  waitFor,
} from "@testing-library/react";

import { BrowserRouter } from "react-router-dom";

import LoginPage from "../../pages/Login";

import * as authApi from "../../services/authApi";

const mockedNavigate = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),

  useNavigate: () => mockedNavigate,
}));

jest.mock("../../services/authApi");

describe("LoginPage", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    localStorage.clear();
  });

  test("renders login form", () => {
    render(
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>
    );

    expect(
      screen.getByRole("heading", {
        name: "Login",
      })
    ).toBeInTheDocument();

    expect(
      screen.getByPlaceholderText("Email")
    ).toBeInTheDocument();

    expect(
      screen.getByPlaceholderText("Password")
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", {
        name: /login/i,
      })
    ).toBeInTheDocument();
  });

  test("updates input fields", () => {
    render(
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>
    );

    const emailInput =
      screen.getByPlaceholderText("Email");

    const passwordInput =
      screen.getByPlaceholderText("Password");

    fireEvent.change(emailInput, {
      target: {
        value: "test@example.com",
      },
    });

    fireEvent.change(passwordInput, {
      target: {
        value: "password123",
      },
    });

    expect(emailInput).toHaveValue(
      "test@example.com"
    );

    expect(passwordInput).toHaveValue(
      "password123"
    );
  });

  test("successful login navigates to welcome page", async () => {
    (
      authApi.loginUser as jest.Mock
    ).mockResolvedValue({
      token: "mock-token",
    });

    render(
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>
    );

    fireEvent.change(
      screen.getByPlaceholderText("Email"),
      {
        target: {
          value: "test@example.com",
        },
      }
    );

    fireEvent.change(
      screen.getByPlaceholderText("Password"),
      {
        target: {
          value: "password123",
        },
      }
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: /login/i,
      })
    );

    await waitFor(() => {
      expect(
        authApi.loginUser
      ).toHaveBeenCalledWith({
        email: "test@example.com",
        password: "password123",
      });

      expect(
        localStorage.getItem("token")
      ).toBe("mock-token");

      expect(
        mockedNavigate
      ).toHaveBeenCalledWith("/welcome");
    });
  });

  test("shows error message on failed login", async () => {
    (
      authApi.loginUser as jest.Mock
    ).mockRejectedValue(
      new Error("Invalid")
    );

    render(
      <BrowserRouter>
        <LoginPage />
      </BrowserRouter>
    );

    fireEvent.change(
      screen.getByPlaceholderText("Email"),
      {
        target: {
          value: "wrong@example.com",
        },
      }
    );

    fireEvent.change(
      screen.getByPlaceholderText("Password"),
      {
        target: {
          value: "wrongpass",
        },
      }
    );

    fireEvent.click(
      screen.getByRole("button", {
        name: /login/i,
      })
    );

    await waitFor(() => {
      expect(
        screen.getByText(
          "Invalid credentials"
        )
      ).toBeInTheDocument();
    });
  });
});