import axiosInstance from "./axiosInstance";

// GET
export const getStudents = async () => {
  const res = await axiosInstance.get("/students/get-students");
  return res.data;
};

// ADD
export const addStudent = async (
  name: string,
  email: string,
  phone: string,
  class_id: number,
  section_id: number,
) => {
  const res = await axiosInstance.post("/students/post-students", {
    name,
    email,
    phone,
    class_id,
    section_id,
  });

  return res.data;
};

// UPDATE
export const updateStudent = async (
  id: number,
  class_id: number,
  section_id: number,
  name: string,
  email: string,
  phone: string,
) => {
  const res = await axiosInstance.put(`/students/put-students/${id}`, {
    class_id,
    section_id,
    name,
    email,
    phone,
  });

  return res.data;
};

// DELETE
export const deleteStudent = async (id: number) => {
  const res = await axiosInstance.delete(`/students/delete-students/${id}`);

  return res.data;
};
