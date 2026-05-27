import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

import StudentsSummary from "../components/StudentsSummary";

vi.mock("../services/studentsApi", () => ({
  getStudents: vi.fn(),
}));

import { getStudents } from "../services/studentsApi";

describe("StudentsSummary", () => {
  it("should render total students", async () => {
    (getStudents as any).mockResolvedValue([
      { id: 1 },
      { id: 2 },
    ]);

    render(<StudentsSummary />);

    await waitFor(() => {
      expect(screen.getByText("2")).toBeInTheDocument();
    });

    expect(
      screen.getByText("Total Students")
    ).toBeInTheDocument();
  });
});