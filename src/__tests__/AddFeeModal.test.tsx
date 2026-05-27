import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi } from "vitest";

import AddFeeModal from "../components/AddFeeModal";
import * as feesApi from "../services/FeesApi";

// proper mock (DON'T pre-mock inside factory)
vi.mock("../services/FeesApi", () => ({
  addFee: vi.fn(),
}));

describe("AddFeeModal", () => {
 it(
  "should add fee",
  async () => {
    const user = userEvent.setup();

    const refreshFees = vi.fn();
    const onClose = vi.fn();

    vi.mocked(feesApi.addFee).mockResolvedValue({ success: true } as any);

    render(
      <AddFeeModal
        refreshFees={refreshFees}
        onClose={onClose}
      />
    );

    await user.type(screen.getByLabelText("Student ID"), "1");
    await user.type(screen.getByLabelText("Amount"), "5000");
    await user.type(screen.getByLabelText("Due Date"), "2026-05-26");

    await user.selectOptions(
      screen.getByRole("combobox"),
      "paid"
    );

    await user.click(screen.getByRole("button", { name: /add/i }));

    await waitFor(() => {
      expect(feesApi.addFee).toHaveBeenCalledWith(
        1,
        5000,
        "2026-05-26",
        "paid"
      );

      expect(refreshFees).toHaveBeenCalled();
      expect(onClose).toHaveBeenCalled();
    });
    },
  10000
);
});