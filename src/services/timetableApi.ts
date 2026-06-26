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

export const updateTimetableEntry = async (
  timetableId: number,
  teacherId: number,
  subjectId: number  // add this
) => {
  const res = await axiosInstance.put(`/timetable/put-timetable/${timetableId}`, {
    teacher_id: teacherId,
    subject_id: subjectId,  // send it
  });
  return res.data;
};

export const deleteTimetableEntry = async (timetableId: number) => {
  const res = await axiosInstance.delete(`/timetable/delete-timetable/${timetableId}`);
  return res.data;
};

export const deleteTimetableByClassSection = async (
  classId: number,
  sectionId: number
) => {
  const res = await axiosInstance.delete(
    `/timetable/delete-by-class-section/${classId}/${sectionId}`
  );
  return res.data;
};

export const getSubjectsByTeacher = async (teacherId: number) => {
  const res = await axiosInstance.get(`/teacher/get-teachers/${teacherId}`);
  return res.data;
};

export const getTeacherSubjects = async (teacherId: number) => {
  const res = await axiosInstance.get(`/teacher/get-teachers/${teacherId}`);
  const ids = res.data.subject_ids
    ? res.data.subject_ids.split(",").map(Number)
    : [];
  return ids;
};