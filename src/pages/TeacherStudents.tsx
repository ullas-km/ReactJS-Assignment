import { useEffect, useState } from "react";

import { getStudents } from "../services/studentsApi";

import "../assets/css/viewstudents.css";

export default function ViewStudents() {
  const [loading, setLoading] = useState(true);
  interface Student {
    student_id: number;
    name: string;
    email: string;
    phone: string;
    class_name: string;
    section_name: string;
    class_id: number;
    section_id: number;
  }

  const [students, setStudents] = useState<Student[]>([]);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);

        const studentsRes = await getStudents();
        setStudents(studentsRes); 
      } catch (error) {
        console.error("Failed to load data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return (
    <div className="students-page">
      <div className="students-header">
        <h2 className="students-title">Students List</h2>
      </div>

      <div className="table-wrapper">
        <table className="students-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Class</th>
              <th>Section</th>
            </tr>
          </thead>

          <tbody>
            {loading ? (
              <tr>
                <td colSpan={7} className="loading-cell">
                  Loading students...
                </td>
              </tr>
            ) : (
              students.map((s: Student) => (
                <tr key={s.student_id}>
                  <td>{s.student_id}</td>
                  <td>{s.name}</td>
                  <td>{s.email}</td>
                  <td>{s.phone}</td>
                  <td>{s.class_name}</td>
                  <td>{s.section_name}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
