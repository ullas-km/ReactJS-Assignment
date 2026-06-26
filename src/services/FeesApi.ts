import axiosInstance from "./axiosInstance";

// GET
export const getFees = async () => {
  try {
    const res = await axiosInstance.get("/fees/get-fees");
    return res.data;
  } catch (error) {
    console.error("Error fetching fees:", error);
    throw error;
  }
};

// ADD
export const addFee = async (
  student_id: number,
  amount: number,
  due_date: string,
  status: string,
) => {
  try {
    const res = await axiosInstance.post("/fees/post-fees", {
      student_id,
      amount,
      due_date,
      status,
    });

    return res.data;
  } catch (error) {
    console.error("Error adding fee:", error);
    throw error;
  }
};

// UPDATE
export const updateFee = async (
  id: number,
  student_id: number,
  amount: number,
  due_date: string,
  status: string,
) => {
  try {
    const res = await axiosInstance.put(`/fees/put-fees/${id}`, {
      student_id,
      amount,
      due_date,
      status,
    });

    return res.data;
  } catch (error) {
    console.error("Error updating fee:", error);
    throw error;
  }
};

// DELETE
export const deleteFee = async (id: number) => {
  try {
    const res = await axiosInstance.delete(`/fees/delete-fees/${id}`);
    return res.data;
  } catch (error) {
    console.error("Error deleting fee:", error);
    throw error;
  }
};

// GET STATS
export const getFeeStats = async () => {
  try {
    const res = await axiosInstance.get("/fees/fee-stats");
    return res.data;
  } catch (error) {
    console.error("Error fetching fee stats:", error);
    throw error;
  }
};
