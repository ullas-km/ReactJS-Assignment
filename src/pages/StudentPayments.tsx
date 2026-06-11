import { useEffect, useState } from "react";
import { getFees } from "../services/FeesApi";
import { makePayment } from "../services/PaymentsApi"

interface Fee {
  id: number;
  student_id: number;
  amount: number;
  due_date: string;
  status: string;
}

export default function StudentPayments() {
  const [fees, setFees] = useState<Fee[]>([]);

  const user = JSON.parse(localStorage.getItem("user") || "null");

   const handlePay = async (fee: Fee) => {
  try {
    await makePayment(
      user.student_id,
      fee.id,
      fee.amount
    );

    setFees((prev) =>
      prev.map((f) =>
        f.id === fee.id
          ? { ...f, status: "paid" }
          : f
      )
    );

    alert("Payment successful");
  } catch (error: any) {
  console.error("PAYMENT ERROR:", error);

  console.log(error.response?.data);

  alert(error.response?.data || "Payment failed");
}
};

  useEffect(() => {
    const loadFees = async () => {
      const data = await getFees();

      const myFees = data.filter(
        (fee: Fee) => fee.student_id === user.student_id,
      );

      setFees(myFees);
    };

    void loadFees();
  }, []);

  return (
    <div className="students-page">
      <h2>My Fees</h2>

      <table className="students-table">
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
          {fees.map((fee) => (
            <tr key={fee.id}>
              <td>{fee.id}</td>
              <td>₹{fee.amount}</td>
              <td>{new Date(fee.due_date).toLocaleDateString()}</td>
              <td>{fee.status}</td>

<td>
  {fee.status === "pending" && (
    <button onClick={() => handlePay(fee)}>
  Pay Now
</button>
  )}
</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
