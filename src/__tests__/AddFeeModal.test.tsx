import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, beforeEach } from "vitest";

import AddFeeModal from "../components/AddFeeModal";

import * as feesApi from "../services/FeesApi";
import { getStudents } from "../services/studentsApi";

vi.mock("../services/FeesApi", () => ({
  addFee: vi.fn(),
}));

vi.mock("../services/studentsApi", () => ({
  getStudents: vi.fn(),
}));

describe("AddFeeModal", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    vi.mocked(getStudents).mockResolvedValue([
      {
        student_id: 1,
        name: "John",
      },
    ]);
  });

  it("renders modal", async () => {
    render(
      <AddFeeModal
        refreshFees={vi.fn()}
        onClose={vi.fn()}
      />
    );

    expect(
      screen.getByText("Add Fee")
    ).toBeInTheDocument();

    expect(
      await screen.findByLabelText(/student/i)
    ).toBeInTheDocument();

    expect(
      screen.getByLabelText(/amount/i)
    ).toBeInTheDocument();
  });

  it("adds fee successfully", async () => {
    const user = userEvent.setup();

    const refreshFees = vi.fn();
    const onClose = vi.fn();

    vi.mocked(feesApi.addFee).mockResolvedValue({
      success: true,
    });

    render(
      <AddFeeModal
        refreshFees={refreshFees}
        onClose={onClose}
      />
    );

    const studentSelect =
      await screen.findByLabelText(/student/i);

    await user.selectOptions(studentSelect, "1");

    await user.type(
      screen.getByLabelText(/amount/i),
      "5000"
    );

    await user.type(
      screen.getByLabelText(/due date/i),
      "2026-05-26"
    );

    await user.selectOptions(
      screen.getByLabelText(/status/i),
      "paid"
    );

    await user.click(
      screen.getByRole("button", {
        name: /^add$/i,
      })
    );

    await waitFor(() => {
      expect(feesApi.addFee).toHaveBeenCalledWith(
        1,
        5000,
        "2026-05-26",
        "paid"
      );
    });

    expect(refreshFees).toHaveBeenCalled();
    expect(onClose).toHaveBeenCalled();
  });

  it("loads students on mount", async () => {
    render(
      <AddFeeModal
        refreshFees={vi.fn()}
        onClose={vi.fn()}
      />
    );

    await waitFor(() => {
      expect(getStudents).toHaveBeenCalled();
    });

    expect(
      await screen.findByText(/John/i)
    ).toBeInTheDocument();
  });

  it("closes modal when cancel clicked", async () => {
    const user = userEvent.setup();

    const onClose = vi.fn();

    render(
      <AddFeeModal
        refreshFees={vi.fn()}
        onClose={onClose}
      />
    );

    await user.click(
      screen.getByRole("button", {
        name: /cancel/i,
      })
    );

    expect(onClose).toHaveBeenCalled();
  });
});