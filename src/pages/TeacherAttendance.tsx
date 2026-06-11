import { useEffect, useState } from "react";

import { getAttendance, addAttendance } from "../services/attendanceApi";
import "../assets/css/teacherattendance.css";
import { getStudents } from "../services/studentsApi";

export default function TeacherAttendance() {
  const [attendance, setAttendance] = useState([]);
  const [students, setStudents] = useState([]);

  const [studentId, setStudentId] = useState("");

  const [date, setDate] = useState("");

  const [status, setStatus] = useState("present");
  const [selectedDate, setSelectedDate] = useState("");

  const loadData = async () => {
    const attendanceData = await getAttendance();

    const studentsData = await getStudents();

    setAttendance(attendanceData);
    setStudents(studentsData);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    await addAttendance({
      student_id: Number(studentId),
      date,
      status,
    });

    setStudentId("");
    setDate("");
    setStatus("present");

    loadData();
  };

  return (
    <div className="attendance-page">
      <h2>Attendance</h2>

      <form onSubmit={handleSubmit}>
        <select
          value={studentId}
          onChange={(e) => setStudentId(e.target.value)}
        >
          <option value="">Select Student</option>

          {students.map((s: any) => (
            <option key={s.student_id} value={s.student_id}>
              {s.name}
            </option>
          ))}
        </select>

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <select value={status} onChange={(e) => setStatus(e.target.value)}>
          <option value="present">Present</option>

          <option value="absent">Absent</option>
        </select>

        <button type="submit">Mark Attendance</button>
      </form>

      <table>
        <thead>
          <tr>
            <th>Student</th>
            <th>Date</th>
            <th>Status</th>
          </tr>
        </thead>

        <tbody>
          {attendance.map((a: any) => (
            <tr key={a.id}>
              <td>{a.student_name}</td>
              <td>{new Date(a.date).toLocaleDateString()}</td>
              <td
                className={
                  a.status === "absent" ? "status absent" : "status present"
                }
              >
                {a.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
