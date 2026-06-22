import { useState, useEffect } from "react";
import { getClasses } from "../services/ClassesApi";
import { getSectionsByClass } from "../services/SectionApi";
import { getAttendanceByFilters } from "../services/attendanceApi";

import "../assets/css/teacherviewattendance.css"

export default function TeacherViewAttendance() {
  const [classes, setClasses] = useState<any[]>([]);
  const [sections, setSections] = useState<any[]>([]);
  const [records, setRecords] = useState<any[]>([]);

  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [date, setDate] = useState("");

  useEffect(() => {
    getClasses().then(setClasses);
  }, []);

  const handleClassChange = async (classId: string) => {
    setSelectedClass(classId);

    const data = await getSectionsByClass(Number(classId));
    setSections(data);
  };

  const handleSearch = async () => {
    const data = await getAttendanceByFilters(
      Number(selectedClass),
      Number(selectedSection),
      date
    );

    setRecords(data);
  };

  return (
  <div className="view-attendance-page">
    <div className="view-attendance-container">

      <div className="view-attendance-header">
        <h2>View Attendance</h2>
      </div>

      <div className="filter-card">

        <div className="filter-group">
          <label htmlFor="classt">Class</label>
          <select
          id="classt"
            value={selectedClass}
            onChange={(e) => handleClassChange(e.target.value)}
          >
            <option value="">Select Class</option>

            {classes.map((c) => (
              <option key={c.class_id} value={c.class_id}>
                {c.class_name}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="sectiont">Section</label>
          <select
          id="sectiont"
            value={selectedSection}
            onChange={(e) => setSelectedSection(e.target.value)}
          >
            <option value="">Select Section</option>

            {sections.map((s) => (
              <option key={s.section_id} value={s.section_id}>
                {s.section_name}
              </option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label htmlFor="datet">Date</label>
          <input
          id="datet"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "end",
          }}
        >
          <button
            className="search-btn"
            onClick={handleSearch}
          >
            Search
          </button>
        </div>
      </div>

      <div className="attendance-table-card">

        <table className="attendance-table">
          <thead>
            <tr>
              <th>Student Name</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {records.length > 0 ? (
              records.map((r) => (
                <tr key={r.student_id}>
                  <td>{r.name}</td>

                  <td
                    className={
                      r.status === "present"
                        ? "present"
                        : "absent"
                    }
                  >
                    {r.status === "present"
                      ? "✅ Present"
                      : "❌ Absent"}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={2}
                  className="empty-state"
                >
                  Select filters and click Search
                </td>
              </tr>
            )}
          </tbody>
        </table>

      </div>

    </div>
  </div>
);
}