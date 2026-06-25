import { useEffect, useState } from "react";
import axios from "axios";
import { addMarks, updateMarks, deleteMarks } from "../services/marksApi";
import { getStudents, getSubjects, getExams } from "../services/dropdownsApi";
import "../assets/css/teachermarks.css";

const API = "http://localhost:3000";

type Student = {
  student_id: number;
  name: string;
};

type Subject = {
  sub_id: number;
  subject_name: string;
};

type Exam = {
  id: number;
  exam_name: string;
};

type Mark = {
  id: number;
  student_id: number;
  student_name: string;
  subject_id: number;
  subject_name: string;
  exam_id: number;
  exam_name: string;
  marks: number;
};

type FormData = {
  exam_id: string;
  subject_id: string;
  student_id: string;
  marks: string;
};

export default function TeacherAddMarks() {
  const [step, setStep] = useState(1);

  const [students, setStudents] = useState<Student[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [exams, setExams] = useState<Exam[]>([]);
  const [marksList, setMarksList] = useState<Mark[]>([]);
  const [editingId, setEditingId] = useState<number | null>(null);

  const [form, setForm] = useState<FormData>({
    exam_id: "",
    subject_id: "",
    student_id: "",
    marks: "",
  });

  const fetchMarks = async () => {
    try {
      const res = await axios.get(`${API}/marks/get-marks`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setMarksList(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      const [s, sub, e] = await Promise.all([
        getStudents(),
        getSubjects(),
        getExams(),
      ]);

      setStudents(s);
      setSubjects(sub);
      setExams(e);
    };

    loadData();
    fetchMarks();
  }, []);

  const handleEdit = (mark: Mark) => {
    setEditingId(mark.id);

    setForm({
      exam_id: String(mark.exam_id),
      subject_id: String(mark.subject_id),
      student_id: String(mark.student_id),
      marks: String(mark.marks),
    });

    setStep(1);
  };
  const handleDelete = async (id: number) => {
    const confirmDelete = globalThis.confirm(
      "Are you sure you want to delete this mark?",
    );

    if (!confirmDelete) return;

    try {
      await deleteMarks(id);

      alert("Marks deleted");

      fetchMarks();
    } catch (err) {
      console.log(err);
      alert("Failed to delete marks");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      if (
        !form.exam_id ||
        !form.subject_id ||
        !form.student_id ||
        !form.marks
      ) {
        alert("Fill all fields");
        return;
      }

      const payload = {
        exam_id: Number(form.exam_id),
        subject_id: Number(form.subject_id),
        student_id: Number(form.student_id),
        marks: Number(form.marks),
      };

      if (editingId) {
        await updateMarks(editingId, payload);
        alert("Marks updated");
      } else {
        await addMarks(payload);
        alert("Marks added");
      }

      setEditingId(null);

      setForm({
        exam_id: "",
        subject_id: "",
        student_id: "",
        marks: "",
      });

      setStep(1);

      fetchMarks();
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        alert(err.response?.data || "Error");
      } else {
        alert("Error");
      }
    }
  };

  return (
    <div className="marks-page">
      {/* HEADER */}
      <div className="marks-header">
        <h2>📘 Add Marks Module</h2>
        <p>Step {step} of 4</p>
      </div>

      {/* MAIN CONTAINER */}
      <div className="marks-container">
        {/* LEFT: FORM SECTION */}
        <div className="marks-form-card">
          <div className="form-header">
            <h3>Add Student Marks</h3>
            <p>Complete the steps below</p>
          </div>

          {step === 1 && (
            <div className="form-step">
              <label htmlFor="selectexam">Select Exam</label>

              <select
                id="selectexam"
                className="marks-select"
                name="exam_id"
                value={form.exam_id}
                onChange={handleChange}
              >
                <option value="">Choose Exam</option>
                {exams.map((e) => (
                  <option key={e.id} value={e.id}>
                    {e.exam_name}
                  </option>
                ))}
              </select>

              <button className="next-btn" onClick={() => setStep(2)}>
                Continue →
              </button>
            </div>
          )}

          {step === 2 && (
            <div className="form-step">
              <label htmlFor="selectsub">Select Subject</label>

              <select
                id="selectsub"
                className="marks-select"
                name="subject_id"
                value={form.subject_id}
                onChange={handleChange}
              >
                <option value="">Choose Subject</option>
                {subjects.map((s) => (
                  <option key={s.sub_id} value={s.sub_id}>
                    {s.subject_name}
                  </option>
                ))}
              </select>

              <div className="btn-group">
                <button className="back-btn" onClick={() => setStep(1)}>
                  ← Back
                </button>

                <button className="next-btn" onClick={() => setStep(3)}>
                  Continue →
                </button>
              </div>
            </div>
          )}

          {step === 3 && (
            <div className="form-step">
              <label htmlFor="selectstudent">Select Student</label>

              <select
                id="selectstudent"
                className="marks-select"
                name="student_id"
                value={form.student_id}
                onChange={handleChange}
              >
                <option value="">Choose Student</option>
                {students.map((s) => (
                  <option key={s.student_id} value={s.student_id}>
                    {s.name}
                  </option>
                ))}
              </select>

              <div className="btn-group">
                <button className="back-btn" onClick={() => setStep(2)}>
                  ← Back
                </button>

                <button className="next-btn" onClick={() => setStep(4)}>
                  Continue →
                </button>
              </div>
            </div>
          )}

          {step === 4 && (
            <div className="form-step">
              <label htmlFor="entermarks">Enter Marks</label>

              <input
                id="entermarks"
                className="marks-input"
                type="number"
                name="marks"
                value={form.marks}
                onChange={handleChange}
                placeholder="Enter marks out of 100"
              />

              <div className="btn-group">
                <button className="back-btn" onClick={() => setStep(3)}>
                  ← Back
                </button>

                <button className="submit-btn" onClick={handleSubmit}>
                  {editingId ? "Update Marks" : "Save Marks"}
                </button>
              </div>
            </div>
          )}
        </div>

        {/* RIGHT: TABLE SECTION */}
        <div className="marks-table-card">
          <h2>Marks List</h2>

          <table className="marks-table">
            <thead>
              <tr>
                <th>ID</th>
                <th>Student</th>
                <th>Subject</th>
                <th>Exam</th>
                <th>Marks</th>
                <th>Actions</th>
              </tr>
            </thead>

            <tbody>
              {marksList.map((m) => (
                <tr key={m.id}>
                  <td>{m.id}</td>
                  <td>{m.student_name}</td>
                  <td>{m.subject_name}</td>
                  <td>{m.exam_name}</td>
                  <td>{m.marks}</td>

                  <td>
                    <button className="edit-btn" onClick={() => handleEdit(m)}>
                      Edit
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(m.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
