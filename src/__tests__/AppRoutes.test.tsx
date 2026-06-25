import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { describe, test, expect, vi } from "vitest";
import AppRoutes from "../routes/AppRoutes";

// Mock pages used in these tests
vi.mock("../pages/Login", () => ({
  default: () => <div>Login Page</div>,
}));

vi.mock("../pages/LandingPage", () => ({
  default: () => <div>Landing Page</div>,
}));

vi.mock("../pages/NotFound", () => ({
  default: () => <div>Not Found Page</div>,
}));

// Mock route wrappers so they don't require Redux/auth setup
vi.mock("../routes/ProtectedRoute", () => ({
  default: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

vi.mock("../routes/RoleRoute", () => ({
  default: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

describe("AppRoutes", () => {
  test("renders landing page route", async () => {
    render(
      <MemoryRouter initialEntries={["/"]}>
        <AppRoutes />
      </MemoryRouter>
    );

    expect(
      await screen.findByText("Landing Page")
    ).toBeInTheDocument();
  });

  test("renders login route", async () => {
    render(
      <MemoryRouter initialEntries={["/login"]}>
        <AppRoutes />
      </MemoryRouter>
    );

    expect(
      await screen.findByText("Login Page")
    ).toBeInTheDocument();
  });

  test("renders not found route", async () => {
    render(
      <MemoryRouter initialEntries={["/random-route"]}>
        <AppRoutes />
      </MemoryRouter>
    );

    expect(
      await screen.findByText("Not Found Page")
    ).toBeInTheDocument();
  });
});