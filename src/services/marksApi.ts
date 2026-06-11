import axios from "axios";

const API = "http://localhost:3000"; // change if needed

export const addMarks = async (data: {
  student_id: number;
  subject_id: number;
  exam_id: number;
  marks: number;
}) => {
  const token = localStorage.getItem("token");

  const res = await axios.post(`${API}/marks/post-marks`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return res.data;
};