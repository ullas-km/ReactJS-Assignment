import axiosInstance from "./axiosInstance";

export const getTeacherTimetable = async (
  teacherId: number
) => {
  const response = await axiosInstance.get(
    `/timetable/teacher/${teacherId}`
  );

  return response.data;
};
