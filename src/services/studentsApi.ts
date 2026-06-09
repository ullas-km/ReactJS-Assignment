import axiosInstance from "./axiosInstance";

// GET
export const getStudents = async () => {
  try {
    const res = await axiosInstance.get("/students/get-students");
    return res.data;
  } catch (error) {
    console.error("Error fetching students:", error);
    throw error;
  }
};

// ADD
export const addStudent = async (
  name: string,
  email: string,
  phone: string,
  class_id: number,
  section_id: number,
  password: string
) => {
  try {
    const res = await axiosInstance.post("/students/post-students", {
      name,
      email,
      phone,
      class_id,
      section_id,
      password
    });

    return res.data;
  } catch (error) {
    console.error("Error adding student:", error);
    throw error;
  }
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
  try {
    const res = await axiosInstance.put(`/students/put-students/${id}`, {
      class_id,
      section_id,
      name,
      email,
      phone,
    });

    return res.data;
  } catch (error) {
    console.error("Error updating student:", error);
    throw error;
  }
};

// DELETE
export const deleteStudent = async (id: number) => {
  try {
    const res = await axiosInstance.delete(`/students/delete-students/${id}`);

    return res.data;
  } catch (error) {
    console.error("Error deleting student:", error);
    throw error;
  }
};
