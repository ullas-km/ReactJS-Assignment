import { render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";

import FeesSummary from "../components/FeesSummary";

import * as feesApi from "../services/FeesApi";

vi.mock("../services/FeesApi", () => ({
  getFeeStats: vi.fn(),
}));

describe("FeesSummary", () => {

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render fees dashboard and stats", async () => {

    vi.mocked(feesApi.getFeeStats).mockResolvedValue({
      total: 100,
      paid: 70,
      pending: 20,
      overdue: 10,
    });

    render(<FeesSummary />);

    expect(
      screen.getByText(/fees dashboard/i)
    ).toBeInTheDocument();

    expect(
      screen.getByText(/total fees/i)
    ).toBeInTheDocument();

    expect(
      screen.getByText(/paid/i)
    ).toBeInTheDocument();

    expect(
      screen.getByText(/pending/i)
    ).toBeInTheDocument();

    expect(
      screen.getByText(/overdue/i)
    ).toBeInTheDocument();

    await waitFor(() => {
      expect(screen.getByText("100")).toBeInTheDocument();
      expect(screen.getByText("70")).toBeInTheDocument();
      expect(screen.getByText("20")).toBeInTheDocument();
      expect(screen.getByText("10")).toBeInTheDocument();
    });

    expect(feesApi.getFeeStats).toHaveBeenCalled();
  });

});