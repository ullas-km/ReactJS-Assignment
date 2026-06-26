import { render, screen, fireEvent, cleanup } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import DashboardHome from "../pages/Home";

const mockNavigate = vi.fn();

vi.mock("react-router-dom", () => ({
  useNavigate: () => mockNavigate,
}));

describe("DashboardHome", () => {
  beforeEach(() => {
    localStorage.clear();
    mockNavigate.mockClear();
  });

  afterEach(() => {
    cleanup();
  });

  it("renders nothing when no user exists", () => {
    render(<DashboardHome />);

    expect(
      screen.queryByText(/Dashboard/i),
    ).not.toBeInTheDocument();
  });

  it("renders admin dashboard cards", () => {
    localStorage.setItem(
      "user",
      JSON.stringify({
        role: "admin",
      }),
    );

    render(<DashboardHome />);

    expect(screen.getByText("Admin Dashboard")).toBeInTheDocument();

    expect(screen.getByText("Students")).toBeInTheDocument();
    expect(screen.getByText("Teachers")).toBeInTheDocument();
    expect(screen.getByText("Classes")).toBeInTheDocument();
    expect(screen.getByText("Sections")).toBeInTheDocument();
    expect(screen.getByText("Subjects")).toBeInTheDocument();
    expect(screen.getByText("Fees")).toBeInTheDocument();
  });

  it("renders student dashboard cards", () => {
    localStorage.setItem(
      "user",
      JSON.stringify({
        role: "student",
      }),
    );

    render(<DashboardHome />);

    expect(screen.getByText("Student Dashboard")).toBeInTheDocument();

    expect(screen.getByText("My Marks")).toBeInTheDocument();
    expect(screen.getByText("My Fees")).toBeInTheDocument();
  });

  it("renders teacher dashboard cards", () => {
    localStorage.setItem(
      "user",
      JSON.stringify({
        role: "teacher",
      }),
    );

    render(<DashboardHome />);

    expect(screen.getByText("Teacher Dashboard")).toBeInTheDocument();

    expect(screen.getByText("Add Marks")).toBeInTheDocument();
    expect(screen.getByText("Attendance")).toBeInTheDocument();
    expect(screen.getByText("Students")).toBeInTheDocument();
  });

  it("navigates when an admin card is clicked", () => {
    localStorage.setItem(
      "user",
      JSON.stringify({
        role: "admin",
      }),
    );

    render(<DashboardHome />);

    fireEvent.click(screen.getByText("Students"));

    expect(mockNavigate).toHaveBeenCalledWith("/students");
  });

  it("navigates when a student card is clicked", () => {
    localStorage.setItem(
      "user",
      JSON.stringify({
        role: "student",
      }),
    );

    render(<DashboardHome />);

    fireEvent.click(screen.getByText("My Fees"));

    expect(mockNavigate).toHaveBeenCalledWith("/payments");
  });

  it("navigates when a teacher card is clicked", () => {
    localStorage.setItem(
      "user",
      JSON.stringify({
        role: "teacher",
      }),
    );

    render(<DashboardHome />);

    fireEvent.click(screen.getByText("Attendance"));

    expect(mockNavigate).toHaveBeenCalledWith("/teacher-attendance");
  });
});