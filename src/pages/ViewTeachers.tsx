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

  const fetchTeachers = async () => {
    const data = await getTeachers();
    setTeachers(data);
  };

  useEffect(() => {
    fetchTeachers();
  }, []);

  

  // ADD
  const handleAdd = async () => {
    await addTeacher(teacherName);
    setTeacherName("");
    fetchTeachers();
  };

  // DELETE
  const handleDelete = async (id: number) => {
    await deleteTeacher(id);
    fetchTeachers();
  };

  // EDIT
  const handleEdit = (t: any) => {
    setEditId(t.teacher_id);
    setTeacherName(t.teacher_name);
  };

  // UPDATE
  const handleUpdate = async () => {
    if (editId === null) return;

    await updateTeacher(editId, teacherName);

    setEditId(null);
    setTeacherName("");
    fetchTeachers();
  };

  return (
    <div className="students-page">

      <div className="students-header">
        <h2>Teachers</h2>
      </div>

      {/* FORM */}
      <div className="form-box">

        <input
          className="input-box"
          value={teacherName}
          onChange={(e) => setTeacherName(e.target.value)}
          placeholder="Teacher Name"
        />

        {editId === null ? (
  <button className="add-btn" onClick={handleAdd}>
    Add
  </button>
) : (
  <button className="update-btn" onClick={handleUpdate}>
    Update
  </button>
)}
      </div>

      {/* TABLE */}
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
          ))}
        </tbody>
      </table>
    </div>
  );
}