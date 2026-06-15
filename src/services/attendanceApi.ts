import api from "./axiosInstance";

export const getAttendance = async () => {
  const res = await api.get("/attendance/get-attendance");
  return res.data;
};

export const addAttendance = async (
  attendanceData: {
    student_id: number;
    date: string;
    status: string;
  }
) => {
  const res = await api.post(
    "/attendance/post-attendance",
    attendanceData
  );

  return res.data;
};

export const bulkAddAttendance = async (
  records: any[]
) => {
  const res = await api.post(
    "/attendance/bulk-post-attendance",
    records
  );

  return res.data;
};

export const getAttendanceByFilters = async (
  classId: number,
  sectionId: number,
  date: string
) => {
  const res = await api.get(
    "/attendance/view-attendance",
    {
      params: {
        class_id: classId,
        section_id: sectionId,
        date,
      },
    }
  );

  return res.data;
};