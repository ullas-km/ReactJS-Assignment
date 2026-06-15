import axiosInstance from "./axiosInstance";

export const createTimetable = async (data: {
  class_id: number;
  section_id: number;
  subject_id: number;
  teacher_id: number;
  day: string;
  period: number;
}) => {
  const res = await axiosInstance.post(
    "/timetable/post-timetables",
    data
  );

  return res.data;
};

export const getTimetableByClassSection = async (
  classId: number,
  sectionId: number
) => {
  const res = await axiosInstance.get(
    `/timetable/get-by-class-section/${classId}/${sectionId}`
  );

  return res.data;
};

export const getAllTimetablesGrouped = async () => {
  const res = await axiosInstance.get("/timetable/get-all-grouped");
  return res.data;
};