import { useState } from "react";
import { getLowAttendanceStudents } from "../services/attendanceApi";

export default function LowAttendanceReport() {
  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");
  const [students, setStudents] = useState<any[]>([]);

  const handleSearch = async () => {
    if (!month || !year) {
      alert("Please enter month and year");
      return;
    }

    try {
      const data = await getLowAttendanceStudents(
        Number(month),
        Number(year)
      );

      setStudents(data);
    } catch (error) {
      console.error(error);
      alert("Failed to fetch report");
    }
  };

  return (
    <div className="page-container">
      <h2>Low Attendance Report</h2>

      <div className="filter-card">
        <div className="filter-group">
          <label>Month</label>
          <input
            type="number"
            min="1"
            max="12"
            value={month}
            onChange={(e) => setMonth(e.target.value)}
          />
        </div>

        <div className="filter-group">
          <label>Year</label>
          <input
            type="number"
            value={year}
            onChange={(e) => setYear(e.target.value)}
          />
        </div>

        <button onClick={handleSearch}>
          Search
        </button>
      </div>

      <div className="attendance-table-card">
        <table className="attendance-table">
          <thead>
            <tr>
              <th>Student ID</th>
              <th>Name</th>
              <th>Attendance %</th>
            </tr>
          </thead>

          <tbody>
            {students.length > 0 ? (
              students.map((student) => (
                <tr key={student.student_id}>
                  <td>{student.student_id}</td>
                  <td>{student.name}</td>
                  <td>{student.percentage}%</td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={3}
                  className="empty-state"
                >
                  No data found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}