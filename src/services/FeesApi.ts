import axiosInstance from "./axiosInstance";

// GETf
export const getFees = async () => {
  const res = await axiosInstance.get("/fees/get-fees");
  return res.data;
};

// ADD
export const addFee = async (
  student_id: number,
  amount: number,
  due_date: string,
  status: string
) => {
  const res = await axiosInstance.post("/fees/post-fees", {
    student_id,
    amount,
    due_date,
    status,
  });

  return res.data;
};

// UPDATE
export const updateFee = async (
  id: number,
  student_id: number,
  amount: number,
  due_date: string,
  status: string
) => {
  const res = await axiosInstance.put(`/fees/put-fees/${id}`, {
    student_id,
    amount,
    due_date,
    status,
  });

  return res.data;
};

// DELETE
export const deleteFee = async (id: number) => {
  const res = await axiosInstance.delete(`/fees/delete-fees/${id}`);
  return res.data;
};

export const getFeeStats = async () => {
  const res = await axiosInstance.get("/fees/fee-stats");
  return res.data;
};