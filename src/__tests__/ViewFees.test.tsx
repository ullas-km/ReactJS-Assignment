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
    onCancel,
  }: {
    isOpen: boolean;
    onConfirm: () => void;
    onCancel: () => void;
  }) =>
    isOpen ? (
      <div>
        <button onClick={onConfirm}>Confirm Delete</button>
        <button onClick={onCancel}>Cancel Delete</button>
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
        student_name: "John",
        amount: 5000,
        due_date: "2026-05-26",
        status: "pending",
      },
    ]);

    render(<ViewFees />);

    expect(await screen.findByText("John")).toBeInTheDocument();
    expect(screen.getByText("5000")).toBeInTheDocument();
    expect(screen.getByText("pending")).toBeInTheDocument();
  });

  it("should delete fee after confirmation", async () => {
    vi.mocked(getFees).mockResolvedValue([
      {
        id: 1,
        student_id: 1,
        student_name: "John",
        amount: 5000,
        due_date: "2026-05-26",
        status: "pending",
      },
    ]);

    vi.mocked(deleteFee).mockResolvedValue({});

    render(<ViewFees />);

    expect(await screen.findByText("John")).toBeInTheDocument();

    await userEvent.click(
      screen.getByRole("button", {
        name: /delete/i,
      }),
    );

    await userEvent.click(
      screen.getByRole("button", {
        name: /confirm delete/i,
      }),
    );

    await waitFor(() => {
      expect(deleteFee).toHaveBeenCalledWith(1);
    });

    expect(getFees).toHaveBeenCalledTimes(2);
  });

  it("should open edit fee modal", async () => {
    vi.mocked(getFees).mockResolvedValue([
      {
        id: 1,
        student_id: 1,
        student_name: "John",
        amount: 5000,
        due_date: "2026-05-26",
        status: "pending",
      },
    ]);

    render(<ViewFees />);

    expect(await screen.findByText("John")).toBeInTheDocument();

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

  it("should show no fee records message", async () => {
    vi.mocked(getFees).mockResolvedValue([]);

    render(<ViewFees />);

    expect(
      await screen.findByText(/no fee records found/i),
    ).toBeInTheDocument();
  });

  it("should search fees by student name", async () => {
    vi.mocked(getFees).mockResolvedValue([
      {
        id: 1,
        student_id: 1,
        student_name: "John",
        amount: 5000,
        due_date: "2026-05-26",
        status: "pending",
      },
      {
        id: 2,
        student_id: 2,
        student_name: "Alice",
        amount: 7000,
        due_date: "2026-05-26",
        status: "paid",
      },
    ]);

    render(<ViewFees />);

    const searchBox = await screen.findByPlaceholderText(
      /search by student id or name/i,
    );

    await userEvent.type(searchBox, "Alice");

    expect(screen.getByText("Alice")).toBeInTheDocument();
    expect(screen.queryByText("John")).not.toBeInTheDocument();
  });

  it("should search fees by student id", async () => {
    vi.mocked(getFees).mockResolvedValue([
      {
        id: 1,
        student_id: 101,
        student_name: "John",
        amount: 5000,
        due_date: "2026-05-26",
        status: "pending",
      },
      {
        id: 2,
        student_id: 202,
        student_name: "Alice",
        amount: 7000,
        due_date: "2026-05-26",
        status: "paid",
      },
    ]);

    render(<ViewFees />);

    const searchBox = await screen.findByPlaceholderText(
      /search by student id or name/i,
    );

    await userEvent.type(searchBox, "202");

    expect(screen.getByText("Alice")).toBeInTheDocument();
    expect(screen.queryByText("John")).not.toBeInTheDocument();
  });

  it("calls getFees on mount", async () => {
    vi.mocked(getFees).mockResolvedValue([]);

    render(<ViewFees />);

    await waitFor(() => {
      expect(getFees).toHaveBeenCalledTimes(1);
    });
  });

  it("renders page heading", async () => {
    vi.mocked(getFees).mockResolvedValue([]);

    render(<ViewFees />);

    expect(screen.getByText("Fees Management")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText(/search by student id or name/i),
    ).toBeInTheDocument();
  });
});