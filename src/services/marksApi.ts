import axios from "axios";

const API = "http://localhost:3000/marks";

export const addMarks = async (data: any) => {
  return axios.post(`${API}/post-marks`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export const updateMarks = async (id: number, data: any) => {
  return axios.put(`${API}/edit-marks/${id}`, data, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export const deleteMarks = async (id: number) => {
  return axios.delete(`${API}/delete-marks/${id}`, {
    headers: {
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};

export const getStudentMarks = async () => {
  const res = await axios.get(
    "http://localhost:3000/marks/student-marks",
    {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );

  return res.data;
};