import api from "./axiosInstance";

export const addMarks = async (data: any) => {
  return api.post("/marks/post-marks", data);
};

export const updateMarks = async (id: number, data: any) => {
  return api.put(`/marks/edit-marks/${id}`, data);
};

export const deleteMarks = async (id: number) => {
  return api.delete(`/marks/delete-marks/${id}`);
};

export const getStudentMarks = async () => {
  const res = await api.get("/marks/student-marks");
  return res.data;
};