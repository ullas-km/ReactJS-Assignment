import { useEffect, useState } from "react";
import { getClasses } from "../services/ClassesApi";
import { getSectionsByClass } from "../services/SectionApi";
import { getStudentsByClassSection } from "../services/studentsApi";
import { getMonthlyReport } from "../services/attendanceApi";
import "../assets/css/MonthlyAttendanceReport.css";

export default function MonthlyAttendanceReport() {
  const [classes, setClasses] = useState<ClassItem[]>([]);
  const [sections, setSections] = useState<SectionItem[]>([]);
  const [students, setStudents] = useState<StudentItem[]>([]);

  const [classId, setClassId] = useState("");
  const [sectionId, setSectionId] = useState("");
  const [studentId, setStudentId] = useState("");

  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  const [report, setReport] = useState<AttendanceReport | null>(null);
  type ClassItem = {
    class_id: number;
    class_name: string;
  };

  type SectionItem = {
    section_id: number;
    section_name: string;
  };

  type StudentItem = {
    student_id: number;
    name: string;
  };

  type AttendanceReport = {
    total: number;
    present: number;
    percentage: number;
  };

  useEffect(() => {
    getClasses().then(setClasses);
  }, []);

  const handleClassChange = async (id: string) => {
    setClassId(id);
    setSectionId("");
    setStudentId("");
    setStudents([]);

    const data = await getSectionsByClass(Number(id));
    setSections(data);
  };

  const handleSectionChange = async (id: string) => {
    setSectionId(id);
    setStudentId("");

    const data = await getStudentsByClassSection(Number(classId), Number(id));

    setStudents(data);
  };

  const handleGenerate = async () => {
    if (!studentId || !month || !year) {
      alert("Please select all fields");
      return;
    }

    const data = await getMonthlyReport(
      Number(studentId),
      Number(month),
      Number(year),
    );

    setReport(data);
  };

  return (
    <div className="report-page">
      <div className="report-container">
        <h2 className="report-title">Monthly Attendance Report</h2>

        <div className="report-card">
          <select
            className="report-select"
            value={classId}
            onChange={(e) => handleClassChange(e.target.value)}
          >
            <option value="">Select Class</option>
            {classes.map((c) => (
              <option key={c.class_id} value={c.class_id}>
                {c.class_name}
              </option>
            ))}
          </select>

          <select
            className="report-select"
            value={sectionId}
            onChange={(e) => handleSectionChange(e.target.value)}
          >
            <option value="">Select Section</option>
            {sections.map((s) => (
              <option key={s.section_id} value={s.section_id}>
                {s.section_name}
              </option>
            ))}
          </select>

          <select
            className="report-select"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
          >
            <option value="">Select Student</option>
            {students.map((s) => (
              <option key={s.student_id} value={s.student_id}>
                {s.name}
              </option>
            ))}
          </select>

          <div className="report-row">
            <input
              className="report-input"
              type="number"
              placeholder="Month (1-12)"
              value={month}
              onChange={(e) => setMonth(e.target.value)}
            />

            <input
              className="report-input"
              type="number"
              placeholder="Year"
              value={year}
              onChange={(e) => setYear(e.target.value)}
            />
          </div>

          <button className="report-btn" onClick={handleGenerate}>
            Generate Report
          </button>
        </div>

        {report && (
          <div className="report-result">
            <h3>Result</h3>

            <div className="report-stats">
              <div>
                <span>Total Classes</span>
                <p>{report.total}</p>
              </div>
              <div>
                <span>Present</span>
                <p>{report.present}</p>
              </div>
              <div>
                <span>Percentage</span>
                <p>{report.percentage.toFixed(2)}%</p>
              </div>
            </div>

            <div
              className={`report-status ${report.percentage < 75 ? "danger" : "good"}`}
            >
              {report.percentage < 75 ? "⚠ Low Attendance" : "✅ Good Standing"}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
