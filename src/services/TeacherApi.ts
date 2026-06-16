import axiosInstance from "./axiosInstance";

// GET all teachers
export const getTeachers = async () => {
  try {
    const res = await axiosInstance.get("/teacher/get-teachers");
    return res.data;
  } catch (error) {
    console.error("Error fetching teachers:", error);
    throw error;
  }
};

// ADD teacher
// ADD teacher
export const addTeacher = async (
  teacher_name: string,
  email: string,
  phone: string,
  password: string,
  subjectIds: number[]
) => {
  const res = await axiosInstance.post("/teacher/post-teachers", {
    teacher_name,
    email,
    phone,
    password,
    subject_ids: subjectIds,
  });

  return res.data;
};

// UPDATE teacher
// export const updateTeacher = async (
//   id: number,
//   teacher_name: string,
//   email: string,
//   phone: string
// ) => {
//   const res = await axiosInstance.put(`/teacher/put-teachers/${id}`, {
//     teacher_name,
//     email,
//     phone,
//   });

//   return res.data;
// };

// export const updateTeacher = async (
//   id: number,
//   teacher_name: string,
//   email: string,
//   phone: string,
//   subjectIds: number[]
// ) => {
//   const res = await axiosInstance.put(
//     `/teacher/put-teachers/${id}`,
//     {
//       teacher_name,
//       email,
//       phone,
//       subject_ids: subjectIds,
//     }
//   );

//   return res.data;
// };

export const updateTeacher = async (
  id: number,
  teacher_name: string,
  email: string,
  phone: string,
  subjectIds: number[]
) => {
  const res = await axiosInstance.put(
    `/teacher/put-teachers/${id}`,
    {
      teacher_name,
      email,
      phone,
      subject_ids: subjectIds,
    }
  );

  return res.data;
};

// DELETE teacher
export const deleteTeacher = async (id: number) => {
  try {
    const res = await axiosInstance.delete(`/teacher/delete-teachers/${id}`);

    return res.data;
  } catch (error) {
    console.error("Error deleting teacher:", error);
    throw error;
  }
};

// GET teacher stats
export const getTeacherStats = async () => {
  try {
    const res = await axiosInstance.get("/teacher/get-teacher-stats");
    return res.data;
  } catch (error) {
    console.error("Error fetching teacher stats:", error);
    throw error;
  }
};

export const getTeacherById = async (id: number) => {
  const res = await axiosInstance.get(`/teacher/get-teachers/${id}`);
  return res.data;
};