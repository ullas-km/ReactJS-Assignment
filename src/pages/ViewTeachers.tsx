import { useEffect, useState } from "react";

import {
  getTeachers,
  addTeacher,
  updateTeacher,
  deleteTeacher,
} from "../services/TeacherApi";

import "../assets/css/viewTeachers.css";

export default function ViewTeachers() {
  const [teachers, setTeachers] = useState<any[]>([]);
  const [teacherName, setTeacherName] = useState("");

  const [editId, setEditId] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);

  const fetchTeachers = async () => {
    const data = await getTeachers();
    setTeachers(data);
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  const handleAdd = async () => {
    if (!teacherName.trim()) return;

    await addTeacher(teacherName);

    setTeacherName("");
    setShowModal(false);

    fetchTeachers();
  };

  const handleDelete = async (id: number) => {
    await deleteTeacher(id);
    fetchTeachers();
  };

  const handleEdit = (t: any) => {
    setEditId(t.teacher_id);
    setTeacherName(t.teacher_name);
    setShowModal(true);
  };

  const handleUpdate = async () => {
    if (editId === null) return;

    await updateTeacher(editId, teacherName);

    setEditId(null);
    setTeacherName("");
    setShowModal(false);

    fetchTeachers();
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

        <button
          className="add-btn"
          onClick={handleOpenAddModal}
        >
          Add Teacher
        </button>

      </div>

      {showModal && (
        <div className="modal-overlay">

          <div className="modal-box">

            <h2>
              {editId === null
                ? "Add Teacher"
                : "Edit Teacher"}
            </h2>

            <div className="form-group">

              <label htmlFor="teacher-name">
                Teacher Name
              </label>

              <input
                id="teacher-name"
                value={teacherName}
                onChange={(e) =>
                  setTeacherName(e.target.value)
                }
                placeholder="Teacher Name"
              />

            </div>

            <div className="modal-actions">

              <button
                className="modal-add-btn"
                onClick={
                  editId === null
                    ? handleAdd
                    : handleUpdate
                }
              >
                {editId === null
                  ? "Add"
                  : "Update"}
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
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>

          {teachers.map((t) => (
            <tr key={t.teacher_id}>

              <td>{t.teacher_name}</td>

              <td>

                <button
                  className="edit-btn"
                  onClick={() => handleEdit(t)}
                >
                  Edit
                </button>

                <button
                  className="delete-btn"
                  onClick={() =>
                    handleDelete(t.teacher_id)
                  }
                >
                  Delete
                </button>

              </td>

            </tr>
          ))}

        </tbody>

      </table>

    </div>
  );
}