import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";

import ClassesSummary from "../components/ClassesSummary";

import * as classesApi from "../services/ClassesApi";

vi.mock("../services/ClassesApi", () => ({
  getClassStats: vi.fn(),
}));

describe("ClassesSummary", () => {

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render total classes", async () => {

    vi.mocked(classesApi.getClassStats).mockResolvedValue({
      total: 12,
    });

    render(<ClassesSummary />);

    expect(
      screen.getByText(/classes dashboard/i)
    ).toBeInTheDocument();

    expect(
      screen.getByText(/total classes/i)
    ).toBeInTheDocument();

    await waitFor(() => {
      expect(
        screen.getByText("12")
      ).toBeInTheDocument();
    });

    expect(
      classesApi.getClassStats
    ).toHaveBeenCalled();
  });

});