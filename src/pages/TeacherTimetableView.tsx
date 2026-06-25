import { useEffect, useState } from "react";
import { getTeacherTimetable } from "../services/teacherTimetableApi";
import "../assets/css/timetable.css";

type TimetableType = {
  day: string;
  period: number;
  class_name: string;
  section_name: string;
  subject_name: string;
};

type User = {
  teacher_id: number;
};

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const periods = [1, 2, 3, 4, 5, 6];

export default function TeacherTimetableView() {
  const [timetable, setTimetable] = useState<TimetableType[]>([]);

  const user: User | null = JSON.parse(localStorage.getItem("user") || "null");

  useEffect(() => {
    if (!user?.teacher_id) return;

    const loadTimetable = async () => {
      try {
        const data = await getTeacherTimetable(user.teacher_id);
        setTimetable(data);
      } catch (err) {
        console.error(err);
      }
    };

    loadTimetable();
  }, [user?.teacher_id]);

  const getCell = (day: string, period: number) => {
    return timetable.find(
      (t) => t.day === day && Number(t.period) === Number(period),
    );
  };

  return (
    <div className="tt-wrapper">
      <div className="tt-header">
        <h2>📅 My Teaching Schedule</h2>
        <p>Weekly timetable overview</p>
      </div>

      <div className="tt-table-container">
        <table className="tt-table">
          <thead>
            <tr>
              <th>Day</th>
              {periods.map((p) => (
                <th key={p}>P{p}</th>
              ))}
            </tr>
          </thead>

          <tbody>
            {days.map((day) => (
              <tr key={day}>
                <td className="day-cell">{day}</td>

                {periods.map((period) => {
                  const cell = getCell(day, period);

                  return (
                    <td key={period}>
                      {cell ? (
                        <div className="tt-card">
                          <div className="subject">{cell.subject_name}</div>

                          <div className="class">
                            {cell.class_name} - {cell.section_name}
                          </div>
                        </div>
                      ) : (
                        <span className="empty">Free</span>
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
  );
}
