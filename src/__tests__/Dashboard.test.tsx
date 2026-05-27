import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";
import { describe, it, expect, beforeEach, vi } from "vitest";

import WelcomePage from "../pages/Dashboard";

// MOCK COMPONENTS
vi.mock("../components/Sidebar", () => ({
  default: ({ role }: { role: string }) => (
    <div>Sidebar Role: {role}</div>
  ),
}));

vi.mock("../components/Header", () => ({
  default: ({ name }: { name: string }) => (
    <div>Header Name: {name}</div>
  ),
}));

describe("WelcomePage", () => {

  beforeEach(() => {
    localStorage.clear();
  });

  it("should render dashboard when user exists", () => {

    localStorage.setItem(
      "user",
      JSON.stringify({
        name: "Ullas",
        role: "admin",
      })
    );

    render(
      <MemoryRouter initialEntries={["/welcome"]}>
        <Routes>

          <Route path="/welcome" element={<WelcomePage />}>
            <Route
              index
              element={<h1>Dashboard Content</h1>}
            />
          </Route>

        </Routes>
      </MemoryRouter>
    );

    expect(
      screen.getByText(/sidebar role: admin/i)
    ).toBeInTheDocument();

    expect(
      screen.getByText(/header name: ullas/i)
    ).toBeInTheDocument();

    expect(
      screen.getByText(/dashboard content/i)
    ).toBeInTheDocument();
  });

  it("should render nothing when user does not exist", () => {

    const { container } = render(
      <MemoryRouter>
        <WelcomePage />
      </MemoryRouter>
    );

    expect(container.firstChild).toBeNull();
  });

});