import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
import RoleRoute from "../routes/RoleRoute";
import { useAppSelector } from "../app/hooks";

vi.mock("../app/hooks", () => ({
  useAppSelector: vi.fn(),
}));

vi.mock("react-router-dom", () => ({
  Navigate: ({ to }: { to: string }) => (
    <div data-testid="navigate">Navigate to {to}</div>
  ),
}));

describe("RoleRoute", () => {
  const mockedUseAppSelector = vi.mocked(useAppSelector);

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("redirects to login when user is not logged in", () => {
    mockedUseAppSelector.mockReturnValue(null);

    render(
      <RoleRoute allowedRoles={["admin"]}>
        <div>Protected Content</div>
      </RoleRoute>,
    );

    expect(screen.getByTestId("navigate")).toHaveTextContent("Navigate to /");
  });

  it("renders children when user has an allowed role", () => {
    mockedUseAppSelector.mockReturnValue({
      id: 1,
      role: "admin",
      name: "Admin User",
    });

    render(
      <RoleRoute allowedRoles={["admin", "teacher"]}>
        <div>Protected Content</div>
      </RoleRoute>,
    );

    expect(screen.getByText("Protected Content")).toBeInTheDocument();
  });

  it("redirects to /home when user role is not allowed", () => {
    mockedUseAppSelector.mockReturnValue({
      id: 2,
      role: "student",
      name: "Student User",
    });

    render(
      <RoleRoute allowedRoles={["admin"]}>
        <div>Protected Content</div>
      </RoleRoute>,
    );

    expect(screen.getByTestId("navigate")).toHaveTextContent(
      "Navigate to /home",
    );
  });
});