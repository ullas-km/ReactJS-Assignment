import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { describe, it, expect, vi, beforeEach } from "vitest";

import ProtectedRoute from "../routes/ProtectedRoute";
import { useAppSelector } from "../app/hooks";

vi.mock("../app/hooks", () => ({
  useAppSelector: vi.fn(),
}));

describe("ProtectedRoute", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders children when token exists", () => {
    vi.mocked(useAppSelector).mockImplementation((selector: any) =>
      selector({
        auth: {
          token: "fake-token",
        },
      })
    );

    render(
      <MemoryRouter>
        <ProtectedRoute>
          <h1>Dashboard Page</h1>
        </ProtectedRoute>
      </MemoryRouter>
    );

    expect(
      screen.getByText(/dashboard page/i)
    ).toBeInTheDocument();
  });

  it("redirects to login when token does not exist", () => {
    vi.mocked(useAppSelector).mockImplementation((selector: any) =>
      selector({
        auth: {
          token: null,
        },
      })
    );

    render(
      <MemoryRouter initialEntries={["/protected"]}>
        <Routes>
          <Route
            path="/protected"
            element={
              <ProtectedRoute>
                <h1>Dashboard Page</h1>
              </ProtectedRoute>
            }
          />

          <Route
            path="/login"
            element={<h1>Login Page</h1>}
          />
        </Routes>
      </MemoryRouter>
    );

    expect(
      screen.getByText(/login page/i)
    ).toBeInTheDocument();

    expect(
      screen.queryByText(/dashboard page/i)
    ).not.toBeInTheDocument();
  });
});