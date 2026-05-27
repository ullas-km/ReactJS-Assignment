import { useEffect, useState } from "react";

import AddStudentModal from "../components/AddStudentModal";
import { getClasses } from "../services/ClassesApi";
import { getSections } from "../services/SectionApi";

import {
  getStudents,
  deleteStudent,
  updateStudent,
} from "../services/studentsApi";

import "../assets/css/viewstudents.css";

export default function ViewStudents() {

  const [students, setStudents] = useState<any[]>([]);

  const [showAddModal, setShowAddModal] = useState(false);

  const [editId, setEditId] = useState<number | null>(null);

  const [classes, setClasses] = useState<any[]>([]);
const [sections, setSections] = useState<any[]>([]);

 const [classId, setClassId] = useState<number | "">("");
const [sectionId, setSectionId] = useState<number | "">("");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  useEffect(() => {
  fetchStudents();
  fetchClasses();
  fetchSections();
}, []);

  const fetchStudents = async () => {
    const data = await getStudents();
    setStudents(data);
  };

  const handleDelete = async (id: number) => {
    await deleteStudent(id);
    fetchStudents();
  };

  const fetchClasses = async () => {
  const data = await getClasses();
  setClasses(data);
};

const fetchSections = async () => {
  const data = await getSections();
  setSections(data);
};

  const handleEditClick = (student: any) => {

    setEditId(student.student_id);

    setClassId(student.class_id);
    setSectionId(student.section_id);

    setName(student.name);
    setEmail(student.email);
    setPhone(student.phone);
  };

  const handleUpdate = async () => {

    if (editId === null) return;

    await updateStudent(
      editId,
      Number(classId),
      Number(sectionId),
      name,
      email,
      phone
    );

    setEditId(null);

    fetchStudents();
  };

  return (
    <div className="students-page">

      <div className="students-header">

        <h2 className="students-title">
          Students List
        </h2>

        <button
  className="header-add-btn"
  onClick={() => setShowAddModal(true)}
>
  Add Student
</button>

      </div>

      {editId !== null && (
  <div className="edit-box">

    <h3>Edit Student</h3>

    <div className="form-group">
      <label htmlFor="student-name">Name</label>

      <input
      id="student-name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
    </div>

    <div className="form-group">
      <label htmlFor="student-email">Email</label>

      <input
      id="student-email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
    </div>

    <div className="form-group">
      <label htmlFor="student-phone">Phone</label>

      <input
      id="student-phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
      />
    </div>

    <div className="form-group">
      <label htmlFor="student-class">Class</label>

      <select
      id="student-class"
  value={classId}
  onChange={(e) => setClassId(Number(e.target.value))}
>
  <option value="">Select Class</option>

  {classes.map((c) => (
    <option
      key={c.class_id}
      value={c.class_id}
    >
      {c.class_name}
    </option>
  ))}
</select>
    </div>

    <div className="form-group">
      <label htmlFor="student-section">Section</label>

      <select id="student-section"
  value={sectionId}
  onChange={(e) => setSectionId(Number(e.target.value))}
>
  <option value="">Select Section</option>

  {sections
    .filter((s) => s.class_id === Number(classId))
    .map((s) => (
      <option
        key={s.section_id}
        value={s.section_id}
      >
        {s.section_name}
      </option>
    ))}
</select>
    </div>

    <div className="modal-actions">

      <button onClick={handleUpdate}>
        Update
      </button>

      <button onClick={() => setEditId(null)}>
        Cancel
      </button>

    </div>

  </div>
)}
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
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>

            {students.map((s: any) => (
              <tr key={s.student_id}>

                <td>{s.student_id}</td>
                <td>{s.name}</td>
                <td>{s.email}</td>
                <td>{s.phone}</td>
                <td>{s.class_name}</td>
                <td>{s.section_name}</td>
<td className="actions">
                <div className="modal-actions">



  <button
    onClick={() => handleEditClick(s)}
    className="edit-btn"
  >
    Edit
  </button>

  <button
    onClick={() => handleDelete(s.student_id)}
    className="delete-btn"
  >
    Delete
  </button>
</div>
</td>



              </tr>
            ))}

          </tbody>

        </table>

      </div>

      {showAddModal && (
        <AddStudentModal
          onClose={() => setShowAddModal(false)}
          refreshStudents={fetchStudents}
        />
      )}

    </div>
  );
}