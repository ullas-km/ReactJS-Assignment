import { useEffect, useState } from "react";

import {
  getTeachers,
  addTeacher,
  updateTeacher,
  deleteTeacher,
} from "../services/TeacherApi";

import "../assets/css/viewTeachers.css";

export default function ViewTeachers() {
  const [loading, setLoading] = useState(true);
  interface Teacher {
    teacher_id: number;
    teacher_name: string;
    email: string;
    phone: number;
  }
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [teacherName, setTeacherName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const [editId, setEditId] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);

  const fetchTeachers = async () => {
    try {
      setLoading(true);

      const data = await getTeachers();
      setTeachers(data);
    } catch (error) {
      console.error("Failed to fetch teachers:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchTeachers();
  }, []);

  const handleAdd = async () => {
    if (!teacherName.trim()) return;

    try {
      await addTeacher(teacherName, email, phone, password);

      setTeacherName("");
      setShowModal(false);

      fetchTeachers();
    } catch (error) {
      console.error("Failed to add teacher:", error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteTeacher(id);
      fetchTeachers();
    } catch (error) {
      console.error("Failed to delete teacher:", error);
    }
  };

  const handleEdit = (t: Teacher) => {
    setEditId(t.teacher_id);

    setTeacherName(t.teacher_name);
    setEmail(t.email || "");
    setPhone(t.phone ? String(t.phone) : "");

    setShowModal(true);
  };

  const handleUpdate = async () => {
    if (editId === null) return;

    try {
      await updateTeacher(editId, teacherName, email, phone);

      setEditId(null);
      setTeacherName("");
      setEmail("");
      setPhone("");
      setShowModal(false);

      fetchTeachers();
    } catch (error) {
      console.error("Failed to update teacher:", error);
    }
  };

  const handleOpenAddModal = () => {
    setEditId(null);
    setTeacherName("");
    setShowModal(true);
  };

  return (
    <div className="students-page">
      <div className="students-header">
        <h2>Teachers</h2>

        <button className="add-btn" onClick={handleOpenAddModal}>
          Add Teacher
        </button>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h2>{editId === null ? "Add Teacher" : "Edit Teacher"}</h2>

            <div className="form-group">
              <label htmlFor="teacher-name">Teacher Name</label>

              <input
                id="teacher-name"
                value={teacherName}
                onChange={(e) => setTeacherName(e.target.value)}
                placeholder="Teacher Name"
              />
            </div>

            <div className="form-group">
              <label>Email</label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
              />
            </div>

            <div className="form-group">
              <label>Phone</label>
              <input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Phone"
              />
            </div>

            {editId === null && (
              <div className="form-group">
                <label>Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                />
              </div>
            )}

            <div className="modal-actions">
              <button
                className="modal-add-btn"
                onClick={editId === null ? handleAdd : handleUpdate}
              >
                {editId === null ? "Add" : "Update"}
              </button>

              <button
                className="modal-cancel-btn"
                onClick={() => {
                  setShowModal(false);
                  setEditId(null);
                  setTeacherName("");
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <table className="students-table">
        <thead>
          <tr>
            <th>Teacher Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {loading ? (
            <tr>
              <td colSpan={4} className="loading-cell">
                Loading teachers...
              </td>
            </tr>
          ) : (
            teachers.map((t) => (
              <tr key={t.teacher_id}>
                <td>{t.teacher_name}</td>
                <td>{t.email}</td>
                <td>{t.phone}</td>

                <td>
                  <button className="edit-btn" onClick={() => handleEdit(t)}>
                    Edit
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(t.teacher_id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
