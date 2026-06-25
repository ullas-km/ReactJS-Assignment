import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";

import StudentPayments from "../pages/StudentPayments";

import { getFees } from "../services/FeesApi";
import { makePayment } from "../services/PaymentsApi";

vi.mock("../services/FeesApi", () => ({
  getFees: vi.fn(),
}));

vi.mock("../services/PaymentsApi", () => ({
  makePayment: vi.fn(),
}));

describe("StudentPayments", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    localStorage.setItem(
      "user",
      JSON.stringify({
        student_id: 1,
        name: "John",
      }),
    );

    window.alert = vi.fn();
  });

  it("shows loading state initially", () => {
    vi.mocked(getFees).mockImplementation(() => new Promise(() => {}));

    render(<StudentPayments />);

    expect(screen.getByText(/loading fees/i)).toBeInTheDocument();
  });

  it("loads and displays student fees", async () => {
    vi.mocked(getFees).mockResolvedValue([
      {
        id: 1,
        student_id: 1,
        amount: 5000,
        due_date: "2026-06-30",
        status: "pending",
      },
    ]);

    render(<StudentPayments />);

    expect(
      await screen.findByText("5000", { exact: false }),
    ).toBeInTheDocument();

    expect(screen.getByText(/pending/i)).toBeInTheDocument();

    expect(
      screen.getByRole("button", {
        name: /pay now/i,
      }),
    ).toBeInTheDocument();
  });

  it("filters fees for logged-in student only", async () => {
    vi.mocked(getFees).mockResolvedValue([
      {
        id: 1,
        student_id: 1,
        amount: 5000,
        due_date: "2026-06-30",
        status: "pending",
      },
      {
        id: 2,
        student_id: 2,
        amount: 8000,
        due_date: "2026-06-30",
        status: "pending",
      },
    ]);

    render(<StudentPayments />);

    expect(
      await screen.findByText("5000", { exact: false }),
    ).toBeInTheDocument();

    expect(
      screen.queryByText("8000", { exact: false }),
    ).not.toBeInTheDocument();
  });

  it("shows paid button for paid fees", async () => {
    vi.mocked(getFees).mockResolvedValue([
      {
        id: 1,
        student_id: 1,
        amount: 5000,
        due_date: "2026-06-30",
        status: "paid",
      },
    ]);

    render(<StudentPayments />);

    const paidButton = await screen.findByRole("button", {
      name: /paid/i,
    });

    expect(paidButton).toBeDisabled();
  });

  it("makes payment successfully", async () => {
    const user = userEvent.setup();

    vi.mocked(getFees).mockResolvedValue([
      {
        id: 1,
        student_id: 1,
        amount: 5000,
        due_date: "2026-06-30",
        status: "pending",
      },
    ]);

    vi.mocked(makePayment).mockResolvedValue({
      success: true,
    });

    render(<StudentPayments />);

    const payButton = await screen.findByRole("button", {
      name: /pay now/i,
    });

    await user.click(payButton);

    await waitFor(() => {
      expect(makePayment).toHaveBeenCalledWith(1, 1, 5000);
    });

    expect(window.alert).toHaveBeenCalledWith("Payment successful");

    expect(
      screen.getByRole("button", {
        name: /^paid$/i,
      }),
    ).toBeDisabled();
  });

  it("shows error when payment fails", async () => {
  const user = userEvent.setup();

  vi.mocked(getFees).mockResolvedValue([
    {
      id: 1,
      student_id: 1,
      amount: 5000,
      due_date: "2026-06-30",
      status: "pending",
    },
  ]);

  vi.mocked(makePayment).mockRejectedValue(
    Object.assign(new Error("Request failed"), {
      isAxiosError: true,
      response: {
        data: "Insufficient balance",
      },
    }),
  );

  render(<StudentPayments />);

  const payButton = await screen.findByRole("button", {
    name: /pay now/i,
  });

  await user.click(payButton);

  await waitFor(() => {
    expect(makePayment).toHaveBeenCalled();
  });

  expect(window.alert).toHaveBeenCalledWith(
    "Insufficient balance",
  );
});

  it("calls getFees on mount", async () => {
    vi.mocked(getFees).mockResolvedValue([]);

    render(<StudentPayments />);

    await waitFor(() => {
      expect(getFees).toHaveBeenCalled();
    });
  });

  it("renders page heading", async () => {
    vi.mocked(getFees).mockResolvedValue([]);

    render(<StudentPayments />);

    expect(screen.getByText("My Fees")).toBeInTheDocument();

    expect(screen.getByText("Fee payment details")).toBeInTheDocument();
  });
});
