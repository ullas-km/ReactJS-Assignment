import {
  render,
  screen,
  waitFor,
} from "@testing-library/react";

import userEvent from "@testing-library/user-event";

import {
  describe,
  it,
  expect,
  vi,
} from "vitest";

import ViewFees from "../pages/ViewFees";

import {
  getFees,
  deleteFee,
  updateFee,
} from "../services/FeesApi";

vi.mock("../services/FeesApi", () => ({
  getFees: vi.fn(),
  deleteFee: vi.fn(),
  updateFee: vi.fn(),
}));

vi.mock("../components/AddFeeModal", () => ({
  default: () => <div>Add Fee Modal</div>,
}));

describe("ViewFees", () => {

  it("should render fees", async () => {

    vi.mocked(getFees).mockResolvedValue([
      {
        id: 1,
        student_id: 1,
        amount: 5000,
        due_date: "2026-05-26",
        status: "pending",
      },
    ] as any);

    render(<ViewFees />);

    await waitFor(() => {
      expect(
        screen.getByText("5000")
      ).toBeInTheDocument();
    });

    expect(
      screen.getByText("pending")
    ).toBeInTheDocument();
  });

  it("should delete fee", async () => {

    vi.mocked(getFees).mockResolvedValue([
      {
        id: 1,
        student_id: 1,
        amount: 5000,
        due_date: "2026-05-26",
        status: "pending",
      },
    ] as any);

    vi.mocked(deleteFee).mockResolvedValue(
      {} as any
    );

    render(<ViewFees />);

    await waitFor(() => {
      expect(
        screen.getByText("5000")
      ).toBeInTheDocument();
    });

    const deleteButton =
      screen.getByRole("button", {
        name: "Delete",
      });

    await userEvent.click(deleteButton);

    expect(deleteFee)
      .toHaveBeenCalledWith(1);
  });

  it("should update fee", async () => {
  vi.mocked(getFees).mockResolvedValue([
    {
      id: 1,
      student_id: 1,
      amount: 5000,
      due_date: "2026-05-26T00:00:00",
      status: "pending",
    },
  ] as any);

  vi.mocked(updateFee).mockResolvedValue({} as any);

  render(<ViewFees />);

  await waitFor(() => {
    expect(screen.getByText("5000")).toBeInTheDocument();
  });

  const editButton = screen.getByRole("button", { name: "Edit" });
  await userEvent.click(editButton);

  const amountInput = screen.getByDisplayValue("5000");

  await userEvent.clear(amountInput);
  await userEvent.type(amountInput, "7000");

  const updateButton = screen.getByRole("button", { name: "Update" });
  await userEvent.click(updateButton);

  await waitFor(() => {
    expect(updateFee).toHaveBeenCalled();
  });
});

  it("should open add fee modal", async () => {

    vi.mocked(getFees).mockResolvedValue(
      [] as any
    );

    render(<ViewFees />);

    const addButton =
      screen.getByRole("button", {
        name: "Add Fee",
      });

    await userEvent.click(addButton);

    expect(
      screen.getByText("Add Fee Modal")
    ).toBeInTheDocument();
  });
});