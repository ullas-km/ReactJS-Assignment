import {
  render,
  screen,
  fireEvent,
  act,
} from "@testing-library/react";
import { vi, describe, it, expect, beforeEach, afterEach } from "vitest";
import PaymentModal from "../components/PaymentModal";

describe("PaymentModal", () => {
  const onSuccess = vi.fn();
  const onClose = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.useFakeTimers();

    vi.spyOn(window, "alert").mockImplementation(() => {});
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  it("renders payment modal", () => {
    render(
      <PaymentModal
        amount={500}
        onSuccess={onSuccess}
        onClose={onClose}
      />,
    );

    expect(screen.getByText("Payment Gateway")).toBeInTheDocument();
    expect(screen.getByText("Amount: ₹500")).toBeInTheDocument();
  });

  it("calls onClose when Cancel is clicked", () => {
    render(
      <PaymentModal
        amount={500}
        onSuccess={onSuccess}
        onClose={onClose}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: /cancel/i }));

    expect(onClose).toHaveBeenCalledTimes(1);
  });

  it("shows alert for invalid payment details", () => {
    render(
      <PaymentModal
        amount={500}
        onSuccess={onSuccess}
        onClose={onClose}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: /pay/i }));

    expect(window.alert).toHaveBeenCalledWith(
      "Please enter valid card details",
    );
    expect(onSuccess).not.toHaveBeenCalled();
  });

  it("accepts only digits in card number", () => {
    render(
      <PaymentModal
        amount={500}
        onSuccess={onSuccess}
        onClose={onClose}
      />,
    );

    const cardInput = screen.getByPlaceholderText("Card Number");

    fireEvent.change(cardInput, {
      target: {
        value: "1234abcd5678efgh",
      },
    });

    expect(cardInput).toHaveValue("12345678");
  });

  it("accepts only digits in cvv", () => {
    render(
      <PaymentModal
        amount={500}
        onSuccess={onSuccess}
        onClose={onClose}
      />,
    );

    const cvvInput = screen.getByPlaceholderText("CVV");

    fireEvent.change(cvvInput, {
      target: {
        value: "1a2b3",
      },
    });

    expect(cvvInput).toHaveValue("123");
  });

  it("processes payment successfully", async () => {
    render(
      <PaymentModal
        amount={500}
        onSuccess={onSuccess}
        onClose={onClose}
      />,
    );

    fireEvent.change(screen.getByPlaceholderText("Card Number"), {
      target: {
        value: "1234567812345678",
      },
    });

    fireEvent.change(screen.getByPlaceholderText("Card Holder Name"), {
      target: {
        value: "John Doe",
      },
    });

    fireEvent.change(screen.getByPlaceholderText("MM/YY"), {
      target: {
        value: "12/30",
      },
    });

    fireEvent.change(screen.getByPlaceholderText("CVV"), {
      target: {
        value: "123",
      },
    });

    fireEvent.click(screen.getByRole("button", { name: /pay/i }));

    expect(
      screen.getByRole("button", { name: /processing/i }),
    ).toBeDisabled();

    await act(async () => {
      vi.runAllTimers();
    });

    expect(onSuccess).toHaveBeenCalledTimes(1);
  });
});