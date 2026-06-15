// import { useEffect, useState } from "react";
// import axiosInstance from "../services/axiosInstance";
// import { getTeachers } from "../services/TeacherApi";
// import { getClasses } from "../services/ClassesApi";
// import { getSectionsByClass } from "../services/SectionApi";
// import { getAllTimetablesGrouped } from "../services/timetableApi";
// import "../assets/css/teachertimetable.css";

// type Teacher = {
//   teacher_id: number;
//   teacher_name: string;
//   subjects: string;
// };

// type ClassType = {
//   class_id: number;
//   class_name: string;
// };

// type SectionType = {
//   section_id: number;
//   section_name: string;
// };

// type CellData = {
//   teacher_id: number;
//   teacher_name: string;
//   subjects: string;
// } | null;

// const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
// const periods = [1, 2, 3, 4, 5, 6];

// export default function TeacherTimetable() {
//   const [teachers, setTeachers] = useState<Teacher[]>([]);
//   const [classes, setClasses] = useState<ClassType[]>([]);
//   const [sections, setSections] = useState<SectionType[]>([]);

//   const [selectedClass, setSelectedClass] = useState("");
//   const [selectedSection, setSelectedSection] = useState("");

//   const [timetable, setTimetable] = useState<Record<string, CellData>>({});
//   const [savedTimetable, setSavedTimetable] = useState<any[]>([]);

//   const [allTimetables, setAllTimetables] = useState<any[]>([]);
// const [showAll, setShowAll] = useState(false);

//   // LOAD INITIAL DATA
//   useEffect(() => {
//     loadTeachers();
//     loadClasses();
//   }, []);

//   const loadTeachers = async () => {
//     try {
//       const data = await getTeachers();
//       setTeachers(data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   // add fetch function
// const loadAllTimetables = async () => {
//   try {
//     const data = await getAllTimetablesGrouped();
//     setAllTimetables(data);
//     setShowAll(true);
//   } catch (err) {
//     console.error(err);
//   }
// };

// // group by class + section
// const grouped = allTimetables.reduce((acc: any, row: any) => {
//   const key = `${row.class_name} - ${row.section_name}`;
//   if (!acc[key]) acc[key] = [];
//   acc[key].push(row);
//   return acc;
// }, {});

//   const loadClasses = async () => {
//     try {
//       const data = await getClasses();
//       setClasses(data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   // CLASS CHANGE → LOAD SECTIONS
//   const handleClassChange = async (classId: string) => {
//     setSelectedClass(classId);
//     setSelectedSection("");
//     setTimetable({});

//     try {
//       const data = await getSectionsByClass(Number(classId));

//       setSections(data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   // TEACHER ASSIGN
//   const handleTeacherChange = (
//     day: string,
//     period: number,
//     teacherId: string,
//   ) => {
//     const teacher = teachers.find((t) => t.teacher_id === Number(teacherId));

//     if (!teacher) return;

//     const key = `${day}-${period}`;

//     // RULE: max 2 periods per teacher per day
//     const countForDay = Object.entries(timetable).filter(
//       ([k, v]) => k.startsWith(day) && v?.teacher_id === teacher.teacher_id,
//     ).length;

//     if (countForDay >= 2) {
//       alert(`${teacher.teacher_name} already assigned 2 periods on ${day}`);
//       return;
//     }

//     setTimetable((prev) => ({
//       ...prev,
//       [key]: {
//         teacher_id: teacher.teacher_id,
//         teacher_name: teacher.teacher_name,
//         subjects: teacher.subjects,
//       },
//     }));
//   };

//   const handleSave = async () => {
//     if (!selectedClass || !selectedSection) {
//       alert("Please select Class and Section first");
//       return;
//     }

//     const payload = Object.entries(timetable).map(([key, value]) => {
//       const [day, period] = key.split("-");

//       return {
//         class_id: Number(selectedClass),
//         section_id: selectedSection,
//         subject_id: 1,
//         teacher_id: value?.teacher_id,
//         day,
//         period: Number(period),
//       };
//     });

//     console.log("PAYLOAD:", payload);

//     try {
//       await axiosInstance.post("/timetable/bulk-post-timetables", payload);
//       alert("Timetable saved successfully");
//     } catch (err) {
//       console.error(err);
//       alert("Failed to save timetable");
//     }
//   };

//   return (
//     <div className="timetable-container">
//       <h2>Teacher Timetable Builder</h2>

//       {/* CLASS + SECTION */}
//       <div style={{ marginBottom: "15px" }}>
//         <select
//           value={selectedClass}
//           onChange={(e) => handleClassChange(e.target.value)}
//         >
//           <option value="">Select Class</option>
//           {classes.map((c) => (
//   <option key={c.class_id} value={c.class_id}>
//     {c.class_name}
//   </option>
// ))}
//         </select>

//         <select
//           value={selectedSection}
//           onChange={(e) => setSelectedSection(e.target.value)}
//           disabled={!selectedClass}
//         >
//           <option value="">Select Section</option>
//           {sections.map((s) => (
//   <option key={s.section_id} value={s.section_id}>
//     {s.section_name}
//   </option>
// ))}
//         </select>
//       </div>

//       {/* TABLE */}
//       {selectedClass && selectedSection && (
//         <>
//           <table className="timetable-table">
//             <thead>
//               <tr>
//                 <th>Day / Period</th>
//                 {periods.map((p) => (
//                   <th key={p}>Period {p}</th>
//                 ))}
//               </tr>
//             </thead>

//             <tbody>
//               {days.map((day) => (
//                 <tr key={day}>
//                   <th>{day}</th>

//                   {periods.map((period) => {
//                     const key = `${day}-${period}`;
//                     const cell = timetable[key];

//                     return (
//                       <td key={key}>
//                         <select
//                           value={cell?.teacher_id || ""}
//                           onChange={(e) =>
//                             handleTeacherChange(day, period, e.target.value)
//                           }
//                         >
//                           <option value="">Select Teacher</option>

//                           {teachers.map((t) => (
//                             <option key={t.teacher_id} value={t.teacher_id}>
//                               {t.teacher_name}
//                             </option>
//                           ))}
//                         </select>

//                         {cell && (
//                           <div style={{ marginTop: "5px" }}>
//                             <div style={{ fontWeight: 600 }}>
//                               {cell.teacher_name}
//                             </div>
//                             <small>{cell.subjects || "No Subject"}</small>
//                           </div>
//                         )}
//                       </td>
//                     );
//                   })}
//                 </tr>
//               ))}
//             </tbody>
//           </table>

//           {/* SAVE BUTTON */}
//           <button onClick={handleSave} style={{ marginTop: "15px" }}>
//             Save Timetable
//           </button>
//         </>
//       )}
//       <button onClick={loadAllTimetables} style={{ marginBottom: "20px" }}>
//   View All Saved Timetables
// </button>

// {showAll && Object.entries(grouped).map(([heading, rows]: any) => (
//   <div key={heading} style={{ marginBottom: "40px" }}>
//     <h3>{heading}</h3>
//     <table className="timetable-table">
//       <thead>
//         <tr>
//           <th>Day / Period</th>
//           {periods.map((p) => <th key={p}>Period {p}</th>)}
//         </tr>
//       </thead>
//       <tbody>
//         {days.map((day) => (
//           <tr key={day}>
//             <th>{day}</th>
//             {periods.map((period) => {
//               const cell = rows.find(
//                 (r: any) => r.day === day && r.period === period
//               );
//               return (
//                 <td key={period}>
//                   {cell ? (
//                     <>
//                       <div style={{ fontWeight: 600 }}>{cell.teacher_name}</div>
//                       <small>{cell.subject_name}</small>
//                     </>
//                   ) : "-"}
//                 </td>
//               );
//             })}
//           </tr>
//         ))}
//       </tbody>
//     </table>
//   </div>
// ))}
//     </div>
    
//   );
// }

import { useEffect, useState } from "react";
import axiosInstance from "../services/axiosInstance";
import { getTeachers } from "../services/TeacherApi";
import { getClasses } from "../services/ClassesApi";
import { getSectionsByClass } from "../services/SectionApi";
import { getAllTimetablesGrouped } from "../services/timetableApi";

type Teacher = { teacher_id: number; teacher_name: string; subjects: string };
type ClassType = { class_id: number; class_name: string };
type SectionType = { section_id: number; section_name: string };
type CellData = { teacher_id: number; teacher_name: string; subjects: string } | null;

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const periods = [1, 2, 3, 4, 5, 6];

const th = (extra?: any): React.CSSProperties => ({
  padding: "11px 14px", background: "#2563eb", color: "#fff",
  fontWeight: 600, fontSize: 13, textAlign: "left", ...extra,
});

const td = (extra?: any): React.CSSProperties => ({
  padding: "10px 12px", borderBottom: "1px solid #e0eeff",
  borderLeft: "1px solid #e0eeff", verticalAlign: "top", ...extra,
});

export default function TeacherTimetable() {
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [classes, setClasses] = useState<ClassType[]>([]);
  const [sections, setSections] = useState<SectionType[]>([]);
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSection, setSelectedSection] = useState("");
  const [timetable, setTimetable] = useState<Record<string, CellData>>({});
  const [allTimetables, setAllTimetables] = useState<any[]>([]);
  const [showAll, setShowAll] = useState(false);
  const [tab, setTab] = useState<"builder" | "view">("builder");

  useEffect(() => { loadTeachers(); loadClasses(); }, []);

  const loadTeachers = async () => { try { setTeachers(await getTeachers()); } catch (err) { console.error(err); } };
  const loadClasses = async () => { try { setClasses(await getClasses()); } catch (err) { console.error(err); } };

  const handleClassChange = async (classId: string) => {
    setSelectedClass(classId); setSelectedSection(""); setTimetable({});
    try { setSections(await getSectionsByClass(Number(classId))); } catch (err) { console.error(err); }
  };

  const handleTeacherChange = (day: string, period: number, teacherId: string) => {
    const teacher = teachers.find((t) => t.teacher_id === Number(teacherId));
    if (!teacher) return;
    const key = `${day}-${period}`;
    const countForDay = Object.entries(timetable).filter(
      ([k, v]) => k.startsWith(day) && v?.teacher_id === teacher.teacher_id
    ).length;
    if (countForDay >= 2) { alert(`${teacher.teacher_name} already assigned 2 periods on ${day}`); return; }
    setTimetable((prev) => ({ ...prev, [key]: { teacher_id: teacher.teacher_id, teacher_name: teacher.teacher_name, subjects: teacher.subjects } }));
  };

  const handleSave = async () => {
    if (!selectedClass || !selectedSection) { alert("Please select Class and Section first"); return; }
    const payload = Object.entries(timetable).map(([key, value]) => {
      const [day, period] = key.split("-");
      return { class_id: Number(selectedClass), section_id: Number(selectedSection), subject_id: 1, teacher_id: value?.teacher_id, day, period: Number(period) };
    });
    try {
      await axiosInstance.post("/timetable/bulk-post-timetables", payload);
      alert("Timetable saved successfully");
    } catch (err) { console.error(err); alert("Failed to save timetable"); }
  };

  const loadAllTimetables = async () => {
    try { setAllTimetables(await getAllTimetablesGrouped()); setShowAll(true); } catch (err) { console.error(err); }
  };

  const grouped = allTimetables.reduce((acc: any, row: any) => {
    const key = `${row.class_name} - ${row.section_name}`;
    if (!acc[key]) acc[key] = [];
    acc[key].push(row);
    return acc;
  }, {});

  const selectStyle: React.CSSProperties = {
    fontSize: 13, padding: "7px 10px", border: "1px solid #dbeafe",
    borderRadius: 6, background: "#fff", color: "#1e3a5f", cursor: "pointer", width: "100%",
  };

  return (
    <div style={{ padding: "2rem", background: "#f0f7ff", minHeight: "100vh" }}>
      <div style={{ maxWidth: 1100, margin: "0 auto" }}>

        {/* HEADER */}
        <h2 style={{ fontSize: 22, fontWeight: 700, color: "#1e3a5f", marginBottom: "1.5rem" }}>
          Timetable Manager
        </h2>

        {/* TABS */}
        <div style={{ display: "flex", gap: 8, marginBottom: "1.5rem" }}>
          {(["builder", "view"] as const).map((t) => (
            <button key={t} onClick={() => { setTab(t); if (t === "view") loadAllTimetables(); }}
              style={{ fontSize: 13, fontWeight: 600, padding: "8px 20px", borderRadius: 6, border: "none", cursor: "pointer",
                background: tab === t ? "#2563eb" : "#fff", color: tab === t ? "#fff" : "#6b7280",
                boxShadow: tab === t ? "none" : "0 0 0 1px #dbeafe" }}>
              {t === "builder" ? "Build Timetable" : "View All Timetables"}
            </button>
          ))}
        </div>

        {/* BUILDER TAB */}
        {tab === "builder" && (
          <div style={{ background: "#fff", borderRadius: 12, border: "1px solid #dbeafe", padding: "1.5rem" }}>
            <div style={{ display: "flex", gap: 12, marginBottom: "1.5rem", flexWrap: "wrap" }}>
              <div style={{ flex: 1, minWidth: 160 }}>
                <label style={{ fontSize: 12, color: "#6b7280", display: "block", marginBottom: 4 }}>Class</label>
                <select style={selectStyle} value={selectedClass} onChange={(e) => handleClassChange(e.target.value)}>
                  <option value="">Select Class</option>
                  {classes.map((c) => <option key={c.class_id} value={c.class_id}>{c.class_name}</option>)}
                </select>
              </div>
              <div style={{ flex: 1, minWidth: 160 }}>
                <label style={{ fontSize: 12, color: "#6b7280", display: "block", marginBottom: 4 }}>Section</label>
                <select style={selectStyle} value={selectedSection} onChange={(e) => setSelectedSection(e.target.value)} disabled={!selectedClass}>
                  <option value="">Select Section</option>
                  {sections.map((s) => <option key={s.section_id} value={s.section_id}>{s.section_name}</option>)}
                </select>
              </div>
            </div>

            {selectedClass && selectedSection && (
              <>
                <div style={{ overflowX: "auto" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                    <thead>
                      <tr>
                        <th style={th({ whiteSpace: "nowrap" })}>Day</th>
                        {periods.map((p) => <th key={p} style={th({ textAlign: "center" })}>Period {p}</th>)}
                      </tr>
                    </thead>
                    <tbody>
                      {days.map((day, i) => (
                        <tr key={day} style={{ background: i % 2 === 0 ? "#fff" : "#f8faff" }}>
                          <td style={{ ...td(), fontWeight: 600, color: "#1e3a5f", whiteSpace: "nowrap", borderLeft: "none" }}>{day}</td>
                          {periods.map((period) => {
                            const key = `${day}-${period}`;
                            const cell = timetable[key];
                            return (
                              <td key={key} style={td({ minWidth: 130 })}>
                                <select style={{ ...selectStyle, fontSize: 12 }} value={cell?.teacher_id || ""}
                                  onChange={(e) => handleTeacherChange(day, period, e.target.value)}>
                                  <option value="">Select</option>
                                  {teachers.map((t) => <option key={t.teacher_id} value={t.teacher_id}>{t.teacher_name}</option>)}
                                </select>
                                {cell && (
                                  <div style={{ marginTop: 6, background: "#eff6ff", borderRadius: 5, padding: "4px 7px" }}>
                                    <div style={{ fontWeight: 600, color: "#1d4ed8", fontSize: 11 }}>{cell.teacher_name}</div>
                                    <div style={{ color: "#6b7280", fontSize: 11 }}>{cell.subjects || "No subject"}</div>
                                  </div>
                                )}
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <button onClick={handleSave}
                  style={{ marginTop: "1.25rem", fontSize: 14, fontWeight: 600, padding: "9px 24px", background: "#2563eb", color: "#fff", border: "none", borderRadius: 6, cursor: "pointer" }}>
                  Save Timetable
                </button>
              </>
            )}
          </div>
        )}

        {/* VIEW ALL TAB */}
        {tab === "view" && (
          <div>
            {!showAll && (
              <p style={{ color: "#6b7280", fontSize: 14 }}>Loading timetables...</p>
            )}
            {showAll && Object.keys(grouped).length === 0 && (
              <p style={{ color: "#6b7280", fontSize: 14 }}>No timetables saved yet.</p>
            )}
            {showAll && Object.entries(grouped).map(([heading, rows]: any) => (
              <div key={heading} style={{ background: "#fff", borderRadius: 12, border: "1px solid #dbeafe", marginBottom: "1.5rem", overflow: "hidden" }}>
                <div style={{ padding: "1rem 1.25rem", borderBottom: "1px solid #dbeafe", background: "#eff6ff" }}>
                  <h3 style={{ fontSize: 15, fontWeight: 700, color: "#1e3a5f", margin: 0 }}>{heading}</h3>
                </div>
                <div style={{ overflowX: "auto" }}>
                  <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                    <thead>
                      <tr>
                        <th style={th({ whiteSpace: "nowrap" })}>Day</th>
                        {periods.map((p) => <th key={p} style={th({ textAlign: "center" })}>Period {p}</th>)}
                      </tr>
                    </thead>
                    <tbody>
                      {days.map((day, i) => (
                        <tr key={day} style={{ background: i % 2 === 0 ? "#fff" : "#f8faff" }}>
                          <td style={{ ...td(), fontWeight: 600, color: "#1e3a5f", whiteSpace: "nowrap", borderLeft: "none" }}>{day}</td>
                          {periods.map((period) => {
                            const cell = rows.find((r: any) => r.day === day && r.period === period);
                            return (
                              <td key={period} style={td({ textAlign: "center" })}>
                                {cell ? (
                                  <div style={{ background: "#eff6ff", borderRadius: 6, padding: "5px 8px" }}>
                                    <div style={{ fontWeight: 600, color: "#1d4ed8", fontSize: 12 }}>{cell.subject_name}</div>
                                    <div style={{ color: "#6b7280", fontSize: 11, marginTop: 2 }}>{cell.teacher_name}</div>
                                  </div>
                                ) : <span style={{ color: "#d1d5db" }}>—</span>}
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
}