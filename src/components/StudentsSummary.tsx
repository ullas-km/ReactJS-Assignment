import { useEffect, useState } from "react";
import { getStudents } from "../services/studentsApi";
import withLoading from "../hoc/withLoading";

function StudentsSummary() {
  type Student = {
    id: number;
    name: string;
    email: string;
    phone: string;
    class_id: number;
    section_id: number;
  };
  const [students, setStudents] = useState<Student[]>([]);

  const fetchStudents = async () => {
    try {
      const data = await getStudents();
      setStudents(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

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
          <p>{students.length}</p>
        </div>
      </div>
    </div>
  );
}

const StudentsSummaryWithLoading = withLoading(StudentsSummary);

export default StudentsSummaryWithLoading;
