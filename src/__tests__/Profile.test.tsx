import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import Profile from "../pages/Profile";

vi.mock("../services/userApi", () => ({
  changePassword: vi.fn(),
}));

describe("Profile", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();
    localStorage.clear();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  const teacherUser = {
    user_id: 1,
    name: "John",
    email: "john@test.com",
    role: "teacher",
  };

  it("renders nothing when no user exists", () => {
    render(<Profile />);
    expect(screen.queryByText("Change Password")).not.toBeInTheDocument();
  });

  it("renders profile information", () => {
    localStorage.setItem("user", JSON.stringify(teacherUser));
    render(<Profile />);
    // Use role-based query to avoid duplicate matches
    expect(screen.getByRole("heading", { name: "John" })).toBeInTheDocument();
    expect(screen.getByText("john@test.com")).toBeInTheDocument();
    expect(screen.getByText("teacher")).toBeInTheDocument();
  });

  it("shows change password button for teacher", () => {
    localStorage.setItem("user", JSON.stringify(teacherUser));
    render(<Profile />);
    expect(
      screen.getByRole("button", { name: /change password/i })
    ).toBeInTheDocument();
  });

  it("does not show change password button for admin", () => {
    localStorage.setItem(
      "user",
      JSON.stringify({ ...teacherUser, role: "admin" })
    );
    render(<Profile />);
    expect(
      screen.queryByRole("button", { name: /change password/i })
    ).not.toBeInTheDocument();
  });

  it("opens and closes modal", () => {
    localStorage.setItem("user", JSON.stringify(teacherUser));
    render(<Profile />);
    fireEvent.click(screen.getByText("Change Password"));
    expect(screen.getByText("Update Password")).toBeInTheDocument();
    fireEvent.click(screen.getByText("Cancel"));
    expect(screen.queryByText("Update Password")).not.toBeInTheDocument();
  });

  it("shows required validation", () => {
    localStorage.setItem("user", JSON.stringify(teacherUser));
    render(<Profile />);
    fireEvent.click(screen.getByText("Change Password"));
    fireEvent.click(screen.getByText("Update Password"));
    expect(screen.getByText("All fields are required")).toBeInTheDocument();
  });

  it("shows password length validation", () => {
    localStorage.setItem("user", JSON.stringify(teacherUser));
    render(<Profile />);
    fireEvent.click(screen.getByText("Change Password"));
    fireEvent.change(screen.getByLabelText("Current Password"), {
      target: { value: "oldpass123" },
    });
    fireEvent.change(screen.getByLabelText("New Password"), {
      target: { value: "123" },
    });
    fireEvent.change(screen.getByLabelText("Confirm New Password"), {
      target: { value: "123" },
    });
    fireEvent.click(screen.getByText("Update Password"));
    expect(
      screen.getByText("New password must be at least 8 characters")
    ).toBeInTheDocument();
  });

  it("shows mismatch validation", () => {
    localStorage.setItem("user", JSON.stringify(teacherUser));
    render(<Profile />);
    fireEvent.click(screen.getByText("Change Password"));
    fireEvent.change(screen.getByLabelText("Current Password"), {
      target: { value: "oldpassword" },
    });
    fireEvent.change(screen.getByLabelText("New Password"), {
      target: { value: "newpassword" },
    });
    fireEvent.change(screen.getByLabelText("Confirm New Password"), {
      target: { value: "anotherpassword" },
    });
    fireEvent.click(screen.getByText("Update Password"));
    expect(screen.getByText("New passwords do not match")).toBeInTheDocument();
  });

  it("shows same password validation", () => {
    localStorage.setItem("user", JSON.stringify(teacherUser));
    render(<Profile />);
    fireEvent.click(screen.getByText("Change Password"));
    fireEvent.change(screen.getByLabelText("Current Password"), {
      target: { value: "password123" },
    });
    fireEvent.change(screen.getByLabelText("New Password"), {
      target: { value: "password123" },
    });
    fireEvent.change(screen.getByLabelText("Confirm New Password"), {
      target: { value: "password123" },
    });
    fireEvent.click(screen.getByText("Update Password"));
    expect(
      screen.getByText("New password must be different from current password")
    ).toBeInTheDocument();
  });
});
