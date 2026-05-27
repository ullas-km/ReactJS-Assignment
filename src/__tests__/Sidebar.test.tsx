import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { MemoryRouter } from "react-router-dom";

import Sidebar from "../components/Sidebar";

// mock navigate
const mockNavigate = vi.fn();

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual<
    typeof import("react-router-dom")
  >("react-router-dom");

  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe("Sidebar", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should open and close students dropdown", async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <Sidebar role="admin" />
      </MemoryRouter>
    );

    const studentsBtn = screen.getByRole("button", {
      name: /students/i,
    });

    // open
    await user.click(studentsBtn);

    expect(
      screen.getByText(/view students/i)
    ).toBeInTheDocument();

    // close
    await user.click(studentsBtn);

    expect(
      screen.queryByText(/view students/i)
    ).not.toBeInTheDocument();
  });

  it("should close previous menu when opening another", async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <Sidebar role="admin" />
      </MemoryRouter>
    );

    const studentsBtn = screen.getByRole("button", {
      name: /students/i,
    });

    const feesBtn = screen.getByRole("button", {
      name: /fees/i,
    });

    await user.click(studentsBtn);

    expect(
      screen.getByText(/view students/i)
    ).toBeInTheDocument();

    await user.click(feesBtn);

    expect(
      screen.queryByText(/view students/i)
    ).not.toBeInTheDocument();

    expect(
      screen.getByText(/view fees/i)
    ).toBeInTheDocument();
  });

  it("should navigate when menu clicked", async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <Sidebar role="admin" />
      </MemoryRouter>
    );

    await user.click(
      screen.getByRole("button", {
        name: /students/i,
      })
    );

    expect(mockNavigate).toHaveBeenCalledWith(
      "/welcome/students"
    );
  });

  it("should render only home for non-admin", () => {
    render(
      <MemoryRouter>
        <Sidebar role="user" />
      </MemoryRouter>
    );

    expect(
      screen.getByText(/home/i)
    ).toBeInTheDocument();

    expect(
      screen.queryByText(/students/i)
    ).not.toBeInTheDocument();
  });

  it("should open mobile sidebar", async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <Sidebar role="admin" />
      </MemoryRouter>
    );

    const hamburger = screen.getByRole("button", {
      name: "☰",
    });

    await user.click(hamburger);

    expect(
      document.querySelector(".sidebar.open")
    ).toBeInTheDocument();
  });
});