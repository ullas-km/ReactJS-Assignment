import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, beforeEach } from "vitest";
import EditFeeModal from "../components/EditFeeModal";
import { updateFee } from "../services/FeesApi";

vi.mock("../services/FeesApi", () => ({
  updateFee: vi.fn(),
}));

describe("EditFeeModal", () => {
  const onClose = vi.fn();
  const refreshFees = vi.fn();

  const fee = {
    id: 1,
    student_id: 101,
    amount: 5000,
    due_date: "2026-06-30T00:00:00",
    status: "pending",
  };

  beforeEach(() => {
    vi.clearAllMocks();

    vi.mocked(updateFee).mockResolvedValue({});
  });

  it("renders all fields with initial values", () => {
    render(
      <EditFeeModal
        fee={fee}
        onClose={onClose}
        refreshFees={refreshFees}
      />,
    );

    expect(screen.getByText("Edit Fee")).toBeInTheDocument();

    expect(screen.getByLabelText("Student ID")).toHaveValue("101");
    expect(screen.getByLabelText("Amount")).toHaveValue(5000);
    expect(screen.getByLabelText("Due Date")).toHaveValue("2026-06-30");
    expect(screen.getByLabelText("Status")).toHaveValue("pending");
  });

  it("updates form fields", () => {
    render(
      <EditFeeModal
        fee={fee}
        onClose={onClose}
        refreshFees={refreshFees}
      />,
    );

    fireEvent.change(screen.getByLabelText("Student ID"), {
      target: { value: "202" },
    });

    fireEvent.change(screen.getByLabelText("Amount"), {
      target: { value: "7000" },
    });

    fireEvent.change(screen.getByLabelText("Due Date"), {
      target: { value: "2026-07-15" },
    });

    fireEvent.change(screen.getByLabelText("Status"), {
      target: { value: "paid" },
    });

    expect(screen.getByLabelText("Student ID")).toHaveValue("202");
    expect(screen.getByLabelText("Amount")).toHaveValue(7000);
    expect(screen.getByLabelText("Due Date")).toHaveValue("2026-07-15");
    expect(screen.getByLabelText("Status")).toHaveValue("paid");
  });

  it("calls updateFee, refreshFees and onClose when Update is clicked", async () => {
    render(
      <EditFeeModal
        fee={fee}
        onClose={onClose}
        refreshFees={refreshFees}
      />,
    );

    fireEvent.change(screen.getByLabelText("Student ID"), {
      target: { value: "202" },
    });

    fireEvent.change(screen.getByLabelText("Amount"), {
      target: { value: "7000" },
    });

    fireEvent.change(screen.getByLabelText("Due Date"), {
      target: { value: "2026-07-15" },
    });

    fireEvent.change(screen.getByLabelText("Status"), {
      target: { value: "paid" },
    });

    fireEvent.click(screen.getByRole("button", { name: /update/i }));

    await waitFor(() => {
      expect(updateFee).toHaveBeenCalledWith(
        1,
        202,
        7000,
        "2026-07-15",
        "paid",
      );

      expect(refreshFees).toHaveBeenCalledTimes(1);
      expect(onClose).toHaveBeenCalledTimes(1);
    });
  });

  it("calls onClose when Cancel is clicked", () => {
    render(
      <EditFeeModal
        fee={fee}
        onClose={onClose}
        refreshFees={refreshFees}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: /cancel/i }));

    expect(onClose).toHaveBeenCalledTimes(1);
  });
});