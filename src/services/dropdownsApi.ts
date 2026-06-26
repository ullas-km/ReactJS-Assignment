import api from "./axiosInstance";

export const getStudents = async () => {
  const res = await api.get("/students/get-students");
  return res.data;
};

export const getSubjects = async () => {
  const res = await api.get("/subjects/get-subjects");
  return res.data;
};

export const getExams = async () => {
  const res = await api.get("/exam/get-exams");
  return res.data;
};