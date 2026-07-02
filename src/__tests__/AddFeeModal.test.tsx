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
    render(<AddFeeModal refreshFees={vi.fn()} onClose={vi.fn()} />);

    expect(screen.getByText("Add Fee")).toBeInTheDocument();

    expect(await screen.findByLabelText(/student/i)).toBeInTheDocument();

    expect(screen.getByLabelText(/amount/i)).toBeInTheDocument();
  });

  it("adds fee successfully", async () => {
    const user = userEvent.setup();

    const refreshFees = vi.fn();
    const onClose = vi.fn();

    vi.mocked(feesApi.addFee).mockResolvedValue({
      success: true,
    });

    render(<AddFeeModal refreshFees={refreshFees} onClose={onClose} />);

    const studentSelect = await screen.findByLabelText(/student/i);

    await user.selectOptions(studentSelect, "1");

    await user.type(screen.getByLabelText(/amount/i), "5000");

    const future = new Date();
    future.setDate(future.getDate() + 7);

    const futureDate = future.toISOString().split("T")[0];

    await user.type(screen.getByLabelText(/due date/i), futureDate);

    await user.selectOptions(screen.getByLabelText(/status/i), "paid");

    await user.click(
      screen.getByRole("button", {
        name: /^add$/i,
      }),
    );

    await waitFor(() => {
      expect(feesApi.addFee).toHaveBeenCalledWith(1, 5000, futureDate, "paid");
    });

    expect(refreshFees).toHaveBeenCalled();
    expect(onClose).toHaveBeenCalled();
  });

  it("loads students on mount", async () => {
    render(<AddFeeModal refreshFees={vi.fn()} onClose={vi.fn()} />);

    await waitFor(() => {
      expect(getStudents).toHaveBeenCalled();
    });

    expect(await screen.findByText(/John/i)).toBeInTheDocument();
  });

  it("closes modal when cancel clicked", async () => {
    const user = userEvent.setup();

    const onClose = vi.fn();

    render(<AddFeeModal refreshFees={vi.fn()} onClose={onClose} />);

    await user.click(
      screen.getByRole("button", {
        name: /cancel/i,
      }),
    );

    expect(onClose).toHaveBeenCalled();
  });
});

it("shows validation errors when form is empty", async () => {
  const user = userEvent.setup();

  render(<AddFeeModal refreshFees={vi.fn()} onClose={vi.fn()} />);

  await user.click(
    screen.getByRole("button", {
      name: /^add$/i,
    }),
  );

  expect(
    await screen.findByText("Please select a student"),
  ).toBeInTheDocument();

  expect(screen.getByText("Amount is required")).toBeInTheDocument();

  expect(screen.getByText("Please select a due date")).toBeInTheDocument();

  expect(feesApi.addFee).not.toHaveBeenCalled();
});

it("shows error when amount is 0", async () => {
  const user = userEvent.setup();

  render(<AddFeeModal refreshFees={vi.fn()} onClose={vi.fn()} />);

  await user.selectOptions(await screen.findByLabelText(/student/i), "1");

  await user.type(screen.getByLabelText(/amount/i), "0");

  await user.type(screen.getByLabelText(/due date/i), "2026-05-26");

  await user.click(
    screen.getByRole("button", {
      name: /^add$/i,
    }),
  );

  expect(
    await screen.findByText("Amount must be greater than 0"),
  ).toBeInTheDocument();

  expect(feesApi.addFee).not.toHaveBeenCalled();
});

it("shows error for past due date", async () => {
  const user = userEvent.setup();

  render(<AddFeeModal refreshFees={vi.fn()} onClose={vi.fn()} />);

  await user.selectOptions(await screen.findByLabelText(/student/i), "1");

  await user.type(screen.getByLabelText(/amount/i), "5000");

  await user.type(screen.getByLabelText(/due date/i), "2024-01-01");

  await user.click(
    screen.getByRole("button", {
      name: /^add$/i,
    }),
  );

  expect(
    await screen.findByText("Due date cannot be in the past"),
  ).toBeInTheDocument();

  expect(feesApi.addFee).not.toHaveBeenCalled();
});

it("clears amount error after entering a valid value", async () => {
  const user = userEvent.setup();

  render(<AddFeeModal refreshFees={vi.fn()} onClose={vi.fn()} />);

  await user.click(
    screen.getByRole("button", {
      name: /^add$/i,
    }),
  );

  expect(await screen.findByText("Amount is required")).toBeInTheDocument();

  await user.type(screen.getByLabelText(/amount/i), "5000");

  await waitFor(() => {
    expect(screen.queryByText("Amount is required")).not.toBeInTheDocument();
  });
});
