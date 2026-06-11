import axios from "axios";

const API = "http://localhost:3000/attendance";

export const getAttendance = async () => {
  const token = localStorage.getItem("token");

  const res = await axios.get(
    `${API}/get-attendance`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};

export const addAttendance = async (
  attendanceData: {
    student_id: number;
    date: string;
    status: string;
  }
) => {
  const token = localStorage.getItem("token");

  const res = await axios.post(
    `${API}/post-attendance`,
    attendanceData,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  return res.data;
};