// import { useEffect, useState } from "react";

// import { getAttendance, addAttendance } from "../services/attendanceApi";
// import "../assets/css/teacherattendance.css";
// import { getStudents } from "../services/studentsApi";

// export default function TeacherAttendance() {
//   const [attendance, setAttendance] = useState([]);
//   const [students, setStudents] = useState([]);

//   const [studentId, setStudentId] = useState("");

//   const [date, setDate] = useState("");

//   const [status, setStatus] = useState("present");
//   const [selectedDate, setSelectedDate] = useState("");

//   const loadData = async () => {
//     const attendanceData = await getAttendance();

//     const studentsData = await getStudents();

//     setAttendance(attendanceData);
//     setStudents(studentsData);
//   };

//   useEffect(() => {
//     loadData();
//   }, []);

//   const handleSubmit = async (e: React.FormEvent) => {
//     e.preventDefault();

//     await addAttendance({
//       student_id: Number(studentId),
//       date,
//       status,
//     });

//     setStudentId("");
//     setDate("");
//     setStatus("present");

//     loadData();
//   };

//   return (
//     <div className="attendance-page">
//       <h2>Attendance</h2>

//       <form onSubmit={handleSubmit}>
//         <select
//           value={studentId}
//           onChange={(e) => setStudentId(e.target.value)}
//         >
//           <option value="">Select Student</option>

//           {students.map((s: any) => (
//             <option key={s.student_id} value={s.student_id}>
//               {s.name}
//             </option>
//           ))}
//         </select>

//         <input
//           type="date"
//           value={date}
//           onChange={(e) => setDate(e.target.value)}
//         />

//         <select value={status} onChange={(e) => setStatus(e.target.value)}>
//           <option value="present">Present</option>

//           <option value="absent">Absent</option>
//         </select>

//         <button type="submit">Mark Attendance</button>
//       </form>

//       <table>
//         <thead>
//           <tr>
//             <th>Student</th>
//             <th>Date</th>
//             <th>Status</th>
//           </tr>
//         </thead>

//         <tbody>
//           {attendance.map((a: any) => (
//             <tr key={a.id}>
//               <td>{a.student_name}</td>
//               <td>{new Date(a.date).toLocaleDateString()}</td>
//               <td
//                 className={
//                   a.status === "absent" ? "status absent" : "status present"
//                 }
//               >
//                 {a.status}
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// }

import { useEffect, useState } from "react";
import { getAttendance, bulkAddAttendance } from "../services/attendanceApi";
import { getClasses } from "../services/ClassesApi";
import { getSectionsByClass } from "../services/SectionApi";
import { getStudentsByClassSection } from "../services/studentsApi";

type Student = { student_id: number; name: string };

export default function TeacherAttendance() {
  const [classes, setClasses] = useState<any[]>([]);
  const [sections, setSections] = useState<any[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [attendance, setAttendance] = useState<Record<number, "present" | "absent">>({});

  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    getClasses().then(setClasses);
  }, []);

  const handleClassChange = async (classId: string) => {
    setSelectedClass(classId);
    setSelectedSection("");
    setStudents([]);
    setAttendance({});
    const data = await getSectionsByClass(Number(classId));
    setSections(data);
  };

  const handleSectionChange = async (sectionId: string) => {
    setSelectedSection(sectionId);
    setAttendance({});
    const data = await getStudentsByClassSection(Number(selectedClass), Number(sectionId));
    setStudents(data);
    // default all to present
    const defaults: Record<number, "present" | "absent"> = {};
    data.forEach((s: Student) => { defaults[s.student_id] = "present"; });
    setAttendance(defaults);
  };

  const toggle = (studentId: number) => {
    setAttendance((prev) => ({
      ...prev,
      [studentId]: prev[studentId] === "present" ? "absent" : "present",
    }));
  };

  const handleSubmit = async () => {
    if (!selectedClass || !selectedSection || !date) {
      alert("Please select class, section and date");
      return;
    }
    const records = students.map((s) => ({
      student_id: s.student_id,
      date,
      status: attendance[s.student_id] || "absent",
    }));
    await bulkAddAttendance(records);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const selectStyle: React.CSSProperties = {
    fontSize: 13, padding: "7px 10px", border: "1px solid #dbeafe",
    borderRadius: 6, background: "#fff", color: "#1e3a5f", cursor: "pointer", width: "100%",
  };

  return (
    <div style={{ padding: "2rem", background: "#f0f7ff", minHeight: "100vh" }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: "#1e3a5f", marginBottom: "1.5rem" }}>
          Mark Attendance
        </h2>

        {/* FILTERS */}
        <div style={{ background: "#fff", borderRadius: 12, border: "1px solid #dbeafe", padding: "1.25rem", marginBottom: "1.25rem", display: "flex", gap: 12, flexWrap: "wrap" }}>
          <div style={{ flex: 1, minWidth: 140 }}>
            <label style={{ fontSize: 12, color: "#6b7280", display: "block", marginBottom: 4 }}>Class</label>
            <select style={selectStyle} value={selectedClass} onChange={(e) => handleClassChange(e.target.value)}>
              <option value="">Select Class</option>
              {classes.map((c) => <option key={c.class_id} value={c.class_id}>{c.class_name}</option>)}
            </select>
          </div>
          <div style={{ flex: 1, minWidth: 140 }}>
            <label style={{ fontSize: 12, color: "#6b7280", display: "block", marginBottom: 4 }}>Section</label>
            <select style={selectStyle} value={selectedSection} onChange={(e) => handleSectionChange(e.target.value)} disabled={!selectedClass}>
              <option value="">Select Section</option>
              {sections.map((s) => <option key={s.section_id} value={s.section_id}>{s.section_name}</option>)}
            </select>
          </div>
          <div style={{ flex: 1, minWidth: 140 }}>
            <label style={{ fontSize: 12, color: "#6b7280", display: "block", marginBottom: 4 }}>Date</label>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)}
              style={{ ...selectStyle, fontFamily: "inherit" }} />
          </div>
        </div>

        {/* STUDENT LIST */}
        {students.length > 0 && (
          <div style={{ background: "#fff", borderRadius: 12, border: "1px solid #dbeafe", overflow: "hidden" }}>
            <div style={{ padding: "1rem 1.25rem", borderBottom: "1px solid #dbeafe", background: "#eff6ff", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <span style={{ fontSize: 14, fontWeight: 700, color: "#1e3a5f" }}>
                {students.length} Students
              </span>
              <div style={{ display: "flex", gap: 8 }}>
                <button onClick={() => { const all: any = {}; students.forEach((s) => { all[s.student_id] = "present"; }); setAttendance(all); }}
                  style={{ fontSize: 12, fontWeight: 600, padding: "5px 12px", background: "#dcfce7", color: "#16a34a", border: "none", borderRadius: 5, cursor: "pointer" }}>
                  All Present
                </button>
                <button onClick={() => { const all: any = {}; students.forEach((s) => { all[s.student_id] = "absent"; }); setAttendance(all); }}
                  style={{ fontSize: 12, fontWeight: 600, padding: "5px 12px", background: "#fee2e2", color: "#dc2626", border: "none", borderRadius: 5, cursor: "pointer" }}>
                  All Absent
                </button>
              </div>
            </div>

            {students.map((s, i) => {
              const status = attendance[s.student_id] || "present";
              return (
                <div key={s.student_id} onClick={() => toggle(s.student_id)}
                  style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "0.9rem 1.25rem",
                    borderBottom: i < students.length - 1 ? "1px solid #e0eeff" : "none",
                    background: i % 2 === 0 ? "#fff" : "#f8faff", cursor: "pointer" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ width: 32, height: 32, borderRadius: "50%", background: "#dbeafe", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700, color: "#2563eb" }}>
                      {s.name.charAt(0).toUpperCase()}
                    </div>
                    <span style={{ fontSize: 14, fontWeight: 500, color: "#1e3a5f" }}>{s.name}</span>
                  </div>
                  <div style={{ padding: "4px 14px", borderRadius: 20, fontSize: 12, fontWeight: 600,
                    background: status === "present" ? "#dcfce7" : "#fee2e2",
                    color: status === "present" ? "#16a34a" : "#dc2626" }}>
                    {status === "present" ? "Present" : "Absent"}
                  </div>
                </div>
              );
            })}

            <div style={{ padding: "1rem 1.25rem", borderTop: "1px solid #dbeafe" }}>
              <button onClick={handleSubmit}
                style={{ fontSize: 14, fontWeight: 600, padding: "9px 24px", background: "#2563eb", color: "#fff", border: "none", borderRadius: 6, cursor: "pointer" }}>
                {saved ? "Saved ✓" : "Submit Attendance"}
              </button>
            </div>
          </div>
        )}

        {selectedSection && students.length === 0 && (
          <p style={{ color: "#6b7280", fontSize: 14 }}>No students found in this class/section.</p>
        )}
      </div>
    </div>
  );
}