import api from "./axiosInstance";

export interface MarksPayload {
  exam_id: number;
  subject_id: number;
  student_id: number;
  marks: number;
}

export const addMarks = async (data: MarksPayload) => {
  return api.post("/marks/post-marks", data);
};

export const updateMarks = async (
  id: number,
  data: MarksPayload,
) => {
  return api.put(`/marks/edit-marks/${id}`, data);
};

export const deleteMarks = async (id: number) => {
  return api.delete(`/marks/delete-marks/${id}`);
};

export const getStudentMarks = async () => {
  const res = await api.get("/marks/student-marks");
  return res.data;
};