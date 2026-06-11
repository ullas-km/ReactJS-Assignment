import axios from "axios";

const API = "http://localhost:3000";

const getAuthHeader = () => {
  const token = localStorage.getItem("token");
  return {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
};

// STUDENTS
export const getStudents = async () => {
  const res = await axios.get(
    `${API}/students/get-students`,
    getAuthHeader()
  );
  return res.data;
};

// SUBJECTS
export const getSubjects = async () => {
  const res = await axios.get(
    `${API}/subjects/get-subjects`,
    getAuthHeader()
  );
  return res.data;
};

// EXAMS
export const getExams = async () => {
  const res = await axios.get(
    `${API}/exam/get-exams`,
    getAuthHeader()
  );
  return res.data;
};