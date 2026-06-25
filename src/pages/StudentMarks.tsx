import { useEffect, useState } from "react";
import { getStudentMarks } from "../services/marksApi";
import { getExams } from "../services/dropdownsApi";
import "../assets/css/studentMarks.css";
 type Mark = {
  id: number;
  exam_id: number;
  exam_name: string;
  subject_name: string;
  marks: number;
};

type Exam = {
  id: number;
  exam_name: string;
};
export default function StudentMarks() {
const [marks, setMarks] = useState<Mark[]>([]);
const [exams, setExams] = useState<Exam[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedExam, setSelectedExam] = useState("all");

  const loadData = async () => {
    try {
      const [marksData, examsData] = await Promise.all([
        getStudentMarks(),
        getExams(),
      ]);

      setMarks(marksData);
      setExams(examsData);
    } finally {
      setLoading(false);
    }
  };

 useEffect(() => {
  void loadData();
}, []);

  // 🔥 dynamic filtering
  const filteredMarks =
    selectedExam === "all"
      ? marks
      :marks.filter((m) => String(m.exam_id) === selectedExam);

  return (
    <div className="marks-wrapper">
      <div className="marks-card">
        <div className="marks-header">
          <h2>📊 My Academic Performance</h2>
          <p>View your exam results and subject-wise marks</p>
        </div>

        {loading ? (
          <div className="loading">Loading marks...</div>
        ) : (
          <>
            {/* FILTER */}
            <div className="filter-box">
              <label htmlFor="filterbyexam">Filter by Exam:</label>

              <select
              id="filterbyexam"
                value={selectedExam}
                onChange={(e) => setSelectedExam(e.target.value)}
              >
                <option value="all">All Exams</option>

                {exams.map((exam) => (
                  <option key={exam.id} value={exam.id}>
                    {exam.exam_name}
                  </option>
                ))}
              </select>
            </div>

            {/* TABLE */}
            <div className="table-container">
              <table className="marks-table">
                <thead>
                  <tr>
                    <th>Exam</th>
                    <th>Subject</th>
                    <th>Marks</th>
                    <th>Status</th>
                  </tr>
                </thead>

                <tbody>
                  {filteredMarks.length === 0 ? (
                    <tr>
                      <td colSpan={4}>No marks found</td>
                    </tr>
                  ) : (
                    filteredMarks.map((m) => (
                      <tr key={m.id}>
                        <td>{m.exam_name}</td>
                        <td>{m.subject_name}</td>
                        <td>{m.marks}</td>
                        <td>
                          <span
                            className={
                              m.marks >= 40 ? "badge pass" : "badge fail"
                            }
                          >
                            {m.marks >= 40 ? "Pass" : "Fail"}
                          </span>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </>
        )}
      </div>
    </div>
  );
}