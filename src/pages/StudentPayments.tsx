import { useEffect, useState } from "react";
import { getFees } from "../services/FeesApi";
import { makePayment } from "../services/PaymentsApi";
import "../assets/css/studentPayments.css";
import PaymentModal from "../components/PaymentModal";
import "../assets/css/paymentmodal.css";

interface Fee {
  id: number;
  student_id: number;
  amount: number;
  due_date: string;
  status: string;
}

interface User {
  student_id: number;
}

export default function StudentPayments() {
  const [fees, setFees] = useState<Fee[]>([]);
  const [loading, setLoading] = useState(true);

  const [showPaymentModal, setShowPaymentModal] = useState(false);

  const [selectedFee, setSelectedFee] = useState<Fee | null>(null);

  const user: User = JSON.parse(localStorage.getItem("user") || "{}");

  const handlePaymentSuccess = async () => {
    if (!selectedFee) return;

    try {
      await makePayment(user.student_id, selectedFee.id, selectedFee.amount);

      setFees((prev) =>
        prev.map((f) =>
          f.id === selectedFee.id ? { ...f, status: "paid" } : f,
        ),
      );

      setShowPaymentModal(false);

      alert("Payment Successful");
    } catch (error) {
      console.error(error);
      alert("Payment Failed");
    }
  };

  useEffect(() => {
    const loadFees = async () => {
      const data = await getFees();

      const myFees = data.filter(
        (fee: Fee) => fee.student_id === user.student_id,
      );

      setFees(myFees);
      setLoading(false);
    };

    void loadFees();
  }, [user.student_id]);

  return (
    <div className="payment-wrapper">
      <div className="payment-header">
        <h2>My Fees</h2>
        <p>Fee payment details</p>
      </div>

      {loading ? (
        <div className="loading">Loading fees...</div>
      ) : (
        <div className="table-container">
          <table className="payment-table">
            <thead>
              <tr>
                <th>Fee ID</th>
                <th>Amount</th>
                <th>Due Date</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>

            <tbody>
              {fees.length === 0 ? (
                <tr>
                  <td
                    colSpan={5}
                    style={{ textAlign: "center", padding: "20px" }}
                  >
                    No fee records found
                  </td>
                </tr>
              ) : (
                fees.map((fee) => (
                  <tr key={fee.id}>
                    <td>{fee.id}</td>
                    <td>₹{fee.amount}</td>
                    <td>{new Date(fee.due_date).toLocaleDateString()}</td>

                    <td>
                      <span className={`badge ${fee.status}`}>
                        {fee.status}
                      </span>
                    </td>

                    <td>
                      {fee.status === "paid" ? (
                        <button className="paid-btn" disabled>
                          Paid
                        </button>
                      ) : (
                        <button
                          className="pay-btn"
                          onClick={() => {
                            setSelectedFee(fee);
                            setShowPaymentModal(true);
                          }}
                        >
                          Pay Now
                        </button>
                      )}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
      {showPaymentModal && selectedFee && (
        <PaymentModal
          amount={selectedFee.amount}
          onSuccess={handlePaymentSuccess}
          onClose={() => setShowPaymentModal(false)}
        />
      )}
    </div>
  );
}
