// import { useState } from "react";
// import { getMonthlyReport } from "../services/attendanceApi";

// export default function MonthlyAttendanceReport() {
//   const [studentId, setStudentId] = useState("");
//   const [month, setMonth] = useState("");
//   const [year, setYear] = useState("");
//   const [report, setReport] = useState<any>(null);

//   const handleGenerate = async () => {
//     if (!studentId || !month || !year) {
//       alert("Please fill all fields");
//       return;
//     }

//     try {
//       const data = await getMonthlyReport(
//         Number(studentId),
//         Number(month),
//         Number(year)
//       );

//       setReport(data);
//     } catch (error) {
//       console.error(error);
//       alert("Failed to fetch report");
//     }
//   };

//   return (
//     <div className="page-container">
//       <h2>Monthly Attendance Report</h2>

//       <div className="filter-card">
//         <div className="filter-group">
//           <label>Student ID</label>
//           <input
//             type="number"
//             value={studentId}
//             onChange={(e) => setStudentId(e.target.value)}
//           />
//         </div>

//         <div className="filter-group">
//           <label>Month</label>
//           <input
//             type="number"
//             min="1"
//             max="12"
//             value={month}
//             onChange={(e) => setMonth(e.target.value)}
//           />
//         </div>

//         <div className="filter-group">
//           <label>Year</label>
//           <input
//             type="number"
//             value={year}
//             onChange={(e) => setYear(e.target.value)}
//           />
//         </div>

//         <button onClick={handleGenerate}>
//           Generate Report
//         </button>
//       </div>

//       {report && (
//         <div className="attendance-table-card">
//           <p>
//             <strong>Total Classes:</strong> {report.total}
//           </p>

//           <p>
//             <strong>Present Days:</strong> {report.present}
//           </p>

//           <p>
//             <strong>Attendance Percentage:</strong>{" "}
//             {Number(report.percentage).toFixed(2)}%
//           </p>

//           <p>
//             <strong>Status:</strong>{" "}
//             {report.percentage < 75
//               ? "⚠ Low Attendance"
//               : "✅ Good Standing"}
//           </p>
//         </div>
//       )}
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { getClasses } from "../services/ClassesApi";
import { getSectionsByClass } from "../services/SectionApi";
import { getStudentsByClassSection } from "../services/studentsApi";
import { getMonthlyReport } from "../services/attendanceApi";
import "../assets/css/MonthlyAttendanceReport.css"

export default function MonthlyAttendanceReport() {
  const [classes, setClasses] = useState<any[]>([]);
  const [sections, setSections] = useState<any[]>([]);
  const [students, setStudents] = useState<any[]>([]);

  const [classId, setClassId] = useState("");
  const [sectionId, setSectionId] = useState("");
  const [studentId, setStudentId] = useState("");

  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  const [report, setReport] = useState<any>(null);

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

      <select className="report-select" value={classId} onChange={(e) => handleClassChange(e.target.value)}>
        <option value="">Select Class</option>
        {classes.map((c) => (
          <option key={c.class_id} value={c.class_id}>
            {c.class_name}
          </option>
        ))}
      </select>

      <select className="report-select" value={sectionId} onChange={(e) => handleSectionChange(e.target.value)}>
        <option value="">Select Section</option>
        {sections.map((s) => (
          <option key={s.section_id} value={s.section_id}>
            {s.section_name}
          </option>
        ))}
      </select>

      <select className="report-select" value={studentId} onChange={(e) => setStudentId(e.target.value)}>
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
          <div><span>Total Classes</span><p>{report.total}</p></div>
          <div><span>Present</span><p>{report.present}</p></div>
          <div><span>Percentage</span><p>{report.percentage.toFixed(2)}%</p></div>
        </div>

        <div className={`report-status ${report.percentage < 75 ? "danger" : "good"}`}>
          {report.percentage < 75 ? "⚠ Low Attendance" : "✅ Good Standing"}
        </div>
      </div>
    )}

  </div>
</div>
  );
}
