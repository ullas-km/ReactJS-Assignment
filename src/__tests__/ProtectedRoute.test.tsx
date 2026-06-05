import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { describe, it, expect, beforeEach } from "vitest";

import ProtectedRoute from "../routes/ProtectedRoute";

describe("ProtectedRoute", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("should render children when token exists", () => {
    localStorage.setItem("token", "fake-token");

    render(
      <MemoryRouter>
        <ProtectedRoute>
          <h1>Dashboard Page</h1>
        </ProtectedRoute>
      </MemoryRouter>,
    );

    expect(screen.getByText(/dashboard page/i)).toBeInTheDocument();
  });

  it("should redirect to login when token does not exist", () => {
    render(
      <MemoryRouter initialEntries={["/welcome"]}>
        <Routes>
          <Route
            path="/welcome"
            element={
              <ProtectedRoute>
                <h1>Dashboard Page</h1>
              </ProtectedRoute>
            }
          />

          <Route path="/" element={<h1>Login Page</h1>} />
        </Routes>
      </MemoryRouter>,
    );

    expect(screen.getByText(/login page/i)).toBeInTheDocument();
  });
});
