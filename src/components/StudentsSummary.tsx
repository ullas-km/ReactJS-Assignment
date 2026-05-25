import { useEffect, useState } from "react";
import { getStudents } from "../services/studentsApi";

export default function StudentsSummary() {
  const [students, setStudents] = useState<any[]>([]);

  useEffect(() => {
    fetchStudents();
  }, []);

  const fetchStudents = async () => {
    try {
      const data = await getStudents();
      setStudents(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Students Summary</h2>

      <div className="card-container">
        <div className="card">
          <h3>Total Students</h3>
          <p>{students.length}</p>
        </div>

        <div className="card">
          <h3>Active Classes</h3>
          <p>10</p>
        </div>
      </div>
    </div>
  );
}
