import {
  render,
  screen,
  fireEvent,
  waitFor,
} from "@testing-library/react";

import ViewFees from "../pages/ViewFees";

import * as feesApi from "../services/FeesApi";

jest.mock("../services/FeesApi");

// mock AddFeeModal
jest.mock("../components/AddFeeModal", () => {
  return function MockAddFeeModal({
    onClose,
    refreshFees,
  }: any) {
    return (
      <div>
        <p>Add Fee Modal</p>

        <button
          onClick={() => {
            refreshFees();
            onClose();
          }}
        >
          Close Modal
        </button>
      </div>
    );
  };
});

describe("ViewFees", () => {
  beforeEach(() => {
    jest.clearAllMocks();

    (feesApi.getFees as jest.Mock)
      .mockResolvedValue([
        {
          id: 1,
          student_id: 101,
          amount: 5000,
          due_date: "2026-05-25",
          status: "pending",
        },
      ]);
  });

  test("renders fees table", async () => {
    render(<ViewFees />);

    expect(
      await screen.findByText("5000")
    ).toBeInTheDocument();

    expect(
      screen.getByText("pending")
    ).toBeInTheDocument();
  });

  test("opens add fee modal", async () => {
    render(<ViewFees />);

    fireEvent.click(
      screen.getByRole("button", {
        name: "Add Fee",
      })
    );

    expect(
      screen.getByText("Add Fee Modal")
    ).toBeInTheDocument();
  });

  test("edits fee", async () => {
    (feesApi.updateFee as jest.Mock)
      .mockResolvedValue({});

    render(<ViewFees />);

    const editButtons =
      await screen.findAllByText("Edit");

    fireEvent.click(editButtons[0]);

    const amountInput =
      screen.getByDisplayValue("5000");

    fireEvent.change(amountInput, {
      target: {
        value: "7000",
      },
    });

    fireEvent.click(
      screen.getByRole("button", {
        name: "Update",
      })
    );

    await waitFor(() => {
      expect(
        feesApi.updateFee
      ).toHaveBeenCalledWith(
        1,
        101,
        7000,
        "2026-05-25",
        "pending"
      );
    });
  });

  test("deletes fee", async () => {
    (feesApi.deleteFee as jest.Mock)
      .mockResolvedValue({});

    render(<ViewFees />);

    const deleteButtons =
      await screen.findAllByText("Delete");

    fireEvent.click(deleteButtons[0]);

    await waitFor(() => {
      expect(
        feesApi.deleteFee
      ).toHaveBeenCalledWith(1);
    });
  });
});