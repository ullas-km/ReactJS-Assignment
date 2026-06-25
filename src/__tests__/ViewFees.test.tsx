import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";

import ViewFees from "../pages/ViewFees";

import { getFees, deleteFee } from "../services/FeesApi";

vi.mock("../services/FeesApi", () => ({
  getFees: vi.fn(),
  deleteFee: vi.fn(),
}));

vi.mock("../components/AddFeeModal", () => ({
  default: () => <div>Add Fee Modal</div>,
}));

vi.mock("../components/EditFeeModal", () => ({
  default: () => <div>Edit Fee Modal</div>,
}));

vi.mock("../components/DeleteModal", () => ({
  default: ({
    isOpen,
    onConfirm,
  }: {
    isOpen: boolean;
    onConfirm: () => void;
  }) =>
    isOpen ? (
      <div>
        <button onClick={onConfirm}>Confirm Delete</button>
      </div>
    ) : null,
}));

describe("ViewFees", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render fees", async () => {
    vi.mocked(getFees).mockResolvedValue([
      {
        id: 1,
        student_id: 1,
        amount: 5000,
        due_date: "2026-05-26",
        status: "pending",
      },
    ]);

    render(<ViewFees />);

    await waitFor(() => {
      expect(screen.getByText("5000")).toBeInTheDocument();
    });

    expect(screen.getByText("pending")).toBeInTheDocument();
  });

  it("should delete fee after confirmation", async () => {
    vi.mocked(getFees).mockResolvedValue([
      {
        id: 1,
        student_id: 1,
        amount: 5000,
        due_date: "2026-05-26",
        status: "pending",
      },
    ]);

    vi.mocked(deleteFee).mockResolvedValue({});

    render(<ViewFees />);

    await waitFor(() => {
      expect(screen.getByText("5000")).toBeInTheDocument();
    });

    await userEvent.click(
      screen.getByRole("button", {
        name: /delete/i,
      }),
    );

    const confirmButton = await screen.findByRole("button", {
      name: /confirm delete/i,
    });

    await userEvent.click(confirmButton);

    await waitFor(() => {
      expect(deleteFee).toHaveBeenCalledWith(1);
    });
  });

  it("should open edit fee modal", async () => {
    vi.mocked(getFees).mockResolvedValue([
      {
        id: 1,
        student_id: 1,
        amount: 5000,
        due_date: "2026-05-26",
        status: "pending",
      },
    ]);

    render(<ViewFees />);

    await waitFor(() => {
      expect(screen.getByText("5000")).toBeInTheDocument();
    });

    await userEvent.click(
      screen.getByRole("button", {
        name: /edit/i,
      }),
    );

    expect(screen.getByText("Edit Fee Modal")).toBeInTheDocument();
  });

  it("should open add fee modal", async () => {
    vi.mocked(getFees).mockResolvedValue([]);

    render(<ViewFees />);

    await userEvent.click(
      screen.getByRole("button", {
        name: /add fee/i,
      }),
    );

    expect(screen.getByText("Add Fee Modal")).toBeInTheDocument();
  });
});