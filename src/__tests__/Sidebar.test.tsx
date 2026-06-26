import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";
import { MemoryRouter } from "react-router-dom";

import Sidebar from "../components/Sidebar";

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

vi.mock("../app/hooks", () => ({
  useAppDispatch: () => mockDispatch,
}));

vi.mock("../features/auth/authSlice", () => ({
  logout: vi.fn(() => ({
    type: "auth/logout",
  })),
}));

describe("Sidebar", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    localStorage.setItem(
      "user",
      JSON.stringify({
        name: "John",
        role: "admin",
      })
    );

    localStorage.setItem("token", "123");
  });

  it("renders home link", () => {
    render(
      <MemoryRouter>
        <Sidebar role="admin" />
      </MemoryRouter>
    );

    expect(screen.getByText("Home")).toBeInTheDocument();
  });

  it("renders admin menu items", () => {
    render(
      <MemoryRouter>
        <Sidebar role="admin" />
      </MemoryRouter>
    );

    expect(screen.getByText("Students")).toBeInTheDocument();
    expect(screen.getByText("Fees")).toBeInTheDocument();
    expect(screen.getByText("Classes")).toBeInTheDocument();
    expect(screen.getByText("Sections")).toBeInTheDocument();
    expect(screen.getByText("Teachers")).toBeInTheDocument();
    expect(screen.getByText("Subjects")).toBeInTheDocument();
    expect(screen.getByText("Add Timetable")).toBeInTheDocument();
  });

  it("renders student menu items", () => {
    render(
      <MemoryRouter>
        <Sidebar role="student" />
      </MemoryRouter>
    );

    expect(screen.getByText("Payments")).toBeInTheDocument();
    expect(screen.getByText("Marks")).toBeInTheDocument();
    expect(screen.getByText("Timetable")).toBeInTheDocument();

    expect(screen.queryByText("Students")).not.toBeInTheDocument();
  });

  it("renders teacher menu items", () => {
    render(
      <MemoryRouter>
        <Sidebar role="teacher" />
      </MemoryRouter>
    );

    expect(screen.getByText("Students")).toBeInTheDocument();
    expect(screen.getByText("Attendance ▼")).toBeInTheDocument();
    expect(screen.getByText("My Timetable")).toBeInTheDocument();
    expect(screen.getByText("Add Marks")).toBeInTheDocument();
  });

  it("opens attendance submenu", async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <Sidebar role="teacher" />
      </MemoryRouter>
    );

    await user.click(screen.getByText(/Attendance/i));

    expect(
      screen.getByText("Add Attendance")
    ).toBeInTheDocument();

    expect(
      screen.getByText("View Attendance")
    ).toBeInTheDocument();
  });

  it("opens mobile sidebar", async () => {
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

  it("closes mobile sidebar when overlay clicked", async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <Sidebar role="admin" />
      </MemoryRouter>
    );

    await user.click(
      screen.getByRole("button", {
        name: "☰",
      })
    );

    const overlay = document.querySelector(
      ".sidebar-overlay"
    ) as HTMLElement;

    await user.click(overlay);

    expect(
      document.querySelector(".sidebar.open")
    ).not.toBeInTheDocument();
  });

  it("shows user profile information", () => {
    render(
      <MemoryRouter>
        <Sidebar role="admin" />
      </MemoryRouter>
    );

    expect(screen.getByText("John")).toBeInTheDocument();
    expect(screen.getByText("admin")).toBeInTheDocument();
  });

  it("logs out user", async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <Sidebar role="admin" />
      </MemoryRouter>
    );

    await user.click(
      screen.getByRole("button", {
        name: /logout/i,
      })
    );

    expect(mockDispatch).toHaveBeenCalled();

    expect(localStorage.getItem("token")).toBeNull();
    expect(localStorage.getItem("user")).toBeNull();

    expect(mockNavigate).toHaveBeenCalledWith(
      "/login"
    );
  });
});