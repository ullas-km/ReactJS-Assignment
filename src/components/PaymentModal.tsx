import { useState } from "react";
import "../assets/css/paymentModal.css";

type PaymentModalProps = Readonly<{
  amount: number;
  onSuccess: () => void;
  onClose: () => void;
}>;

export default function PaymentModal({
  amount,
  onSuccess,
  onClose,
}: PaymentModalProps) {
  const [cardNumber, setCardNumber] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [loading, setLoading] = useState(false);

  const handlePayment = () => {
    if (
      cardNumber.length !== 16 ||
      cardHolder.trim() === "" ||
      expiry.trim() === "" ||
      cvv.length !== 3
    ) {
      alert("Please enter valid card details");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      onSuccess();
    }, 2000);
  };

  return (
    <div className="payment-modal-overlay">
      <div className="payment-modal">
        <h2>Payment Gateway</h2>

        <p className="payment-amount">Amount: ₹{amount}</p>

        <input
          type="text"
          placeholder="Card Number"
          maxLength={16}
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value.replaceAll(/\D/g, ""))}
        />

        <input
          type="text"
          placeholder="Card Holder Name"
          value={cardHolder}
          onChange={(e) => setCardHolder(e.target.value)}
        />

        <div className="payment-row">
          <input
            className="expiry-input"
            type="text"
            placeholder="MM/YY"
            value={expiry}
            onChange={(e) => setExpiry(e.target.value)}
          />

          <input
            className="cvv-input"
            type="password"
            placeholder="CVV"
            maxLength={3}
            value={cvv}
            onChange={(e) => setCvv(e.target.value.replaceAll(/\D/g, ""))}
          />
        </div>

        <div className="payment-actions">
          <button className="payment-cancel-btn" onClick={onClose}>
            Cancel
          </button>

          <button
            className="pay-now-btn"
            onClick={handlePayment}
            disabled={loading}
          >
            {loading ? "Processing..." : `Pay ₹${amount}`}
          </button>
        </div>
      </div>
    </div>
  );
}
