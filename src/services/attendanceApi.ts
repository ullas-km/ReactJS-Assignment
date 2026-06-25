import api from "./axiosInstance";

export interface AttendanceRecord {
  student_id: number;
  date: string;
  status: string;
}

export const getAttendance = async () => {
  const res = await api.get("/attendance/get-attendance");
  return res.data;
};

export const addAttendance = async (
  attendanceData: AttendanceRecord
) => {
  const res = await api.post(
    "/attendance/post-attendance",
    attendanceData
  );

  return res.data;
};

export const bulkAddAttendance = async (
  records: AttendanceRecord[]
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

export const getMonthlyReport = async (
  studentId: number,
  month: number,
  year: number
) => {
  const res = await api.get(
    "/attendance/monthly-report",
    {
      params: {
        student_id: studentId,
        month,
        year,
      },
    }
  );

  return res.data;
};

export const getLowAttendanceStudents = async (
  month: number,
  year: number
) => {
  const res = await api.get(
    "/attendance/low-attendance",
    {
      params: {
        month,
        year,
      },
    }
  );

  return res.data;
};