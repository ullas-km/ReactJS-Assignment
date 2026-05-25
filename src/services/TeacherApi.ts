import axiosInstance from "./axiosInstance";

// GET all teachers
export const getTeachers = async () => {
  const res = await axiosInstance.get("/teacher/get-teachers");
  return res.data;
};

// ADD teacher
export const addTeacher = async (teacher_name: string) => {
  const res = await axiosInstance.post("/teacher/post-teachers", {
    teacher_name,
  });

  return res.data;
};

// UPDATE teacher
export const updateTeacher = async (id: number, teacher_name: string) => {
  const res = await axiosInstance.put(`/teacher/put-teachers/${id}`, {
    teacher_name,
  });

  return res.data;
};

// DELETE teacher
export const deleteTeacher = async (id: number) => {
  const res = await axiosInstance.delete(
    `/teacher/delete-teachers/${id}`
  );

  return res.data;
};

// GET teacher stats
export const getTeacherStats = async () => {
  const res = await axiosInstance.get("/teacher/get-teacher-stats");
  return res.data;
};