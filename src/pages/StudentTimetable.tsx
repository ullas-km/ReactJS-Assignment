import { useEffect, useState } from "react";
import { getTimetableByClassSection } from "../services/timetableApi";

type TimetableType = {
  day: string;
  period: number;
  teacher_name: string;
  subject_name: string;
};

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const periods = [1, 2, 3, 4, 5, 6];

export default function StudentTimetable() {
  const [timetable, setTimetable] = useState<TimetableType[]>([]);

  const user = JSON.parse(localStorage.getItem("user") || "null");

  useEffect(() => {
    if (!user?.class_id || !user?.section_id) return;
    loadTimetable();
  }, []);

  const loadTimetable = async () => {
    try {
      const data = await getTimetableByClassSection(
        Number(user.class_id),
        Number(user.section_id)
      );
      setTimetable(data);
    } catch (err) {
      console.error(err);
    }
  };

  const getCell = (day: string, period: number) =>
    timetable.find((t) => t.day === day && t.period === period);

  return (
    <div style={{ padding: "2rem", background: "#f0f7ff", minHeight: "100vh" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>

        <h2 style={{ fontSize: 22, fontWeight: 700, color: "#1e3a5f", marginBottom: "0.25rem" }}>
          My Timetable
        </h2>
        <p style={{ fontSize: 13, color: "#6b7280", marginBottom: "1.5rem" }}>
          {user?.name && `${user.name} · `}Class {user?.class_name} · Section {user?.section_name}
        </p>

        <div style={{ background: "#fff", borderRadius: 12, border: "1px solid #dbeafe", overflow: "auto" }}>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead>
              <tr style={{ background: "#1e3a8a" }}>
                <th style={{ padding: "12px 16px", color: "#fff", fontWeight: 600, textAlign: "left", whiteSpace: "nowrap" }}>
                  Day
                </th>
                {periods.map((p) => (
                  <th key={p} style={{ padding: "12px 16px", color: "#fff", fontWeight: 600, textAlign: "center" }}>
                    Period {p}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {days.map((day, i) => (
                <tr key={day} style={{ background: i % 2 === 0 ? "#fff" : "#f8faff" }}>
                  <td style={{ padding: "12px 16px", fontWeight: 600, color: "#1e3a5f", borderBottom: "1px solid #e0eeff", whiteSpace: "nowrap" }}>
                    {day}
                  </td>
                  {periods.map((period) => {
                    const cell = getCell(day, period);
                    return (
                      <td key={period} style={{ padding: "10px 12px", textAlign: "center", borderBottom: "1px solid #e0eeff", borderLeft: "1px solid #e0eeff" }}>
                        {cell ? (
                          <div style={{ borderRadius: 6, padding: "6px 8px" }}>
                            <div style={{ fontWeight: 600, color: "#1d4ed8", fontSize: 12 }}>{cell.subject_name}</div>
                            <div style={{ color: "#6b7280", fontSize: 11, marginTop: 2 }}>{cell.teacher_name}</div>
                          </div>
                        ) : (
                          <span style={{ color: "#d1d5db" }}>—</span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}