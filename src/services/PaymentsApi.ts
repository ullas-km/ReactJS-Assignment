import axiosInstance from "./axiosInstance";

export const makePayment = async (
  student_id: number,
  fee_id: number,
  amount: number,
) => {
  const res = await axiosInstance.post("/payments/post-payments", {
    student_id,
    fee_id,
    amount,
    payment_date: new Date().toISOString().split("T")[0],
    payment_method: "UPI",
    transaction_id: `TXN${Date.now()}`,
    status: "success",
  });

  return res.data;
};
