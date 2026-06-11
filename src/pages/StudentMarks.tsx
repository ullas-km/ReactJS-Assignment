import { useEffect, useState } from "react";
import { getStudentMarks } from "../services/marksApi";
import { getExams } from "../services/dropdownsApi";
import "../assets/css/studentMarks.css";

export default function StudentMarks() {
  const [marks, setMarks] = useState<any[]>([]);
  const [exams, setExams] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedExam, setSelectedExam] = useState("all");

  useEffect(() => {
    loadData();
  }, []);

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

  // 🔥 dynamic filtering
  const filteredMarks =
    selectedExam === "all"
      ? marks
      : marks.filter((m) => m.exam_id == selectedExam);

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
              <label>Filter by Exam:</label>

              <select
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