import { useEffect, useState } from "react";

import {
  getClasses,
  addClass,
  updateClass,
  deleteClass,
} from "../services/ClassesApi";

import "../assets/css/viewClasses.css"

export default function ViewClasses() {
  const [classes, setClasses] = useState<any[]>([]);

 const [className, setClassName] = useState<number | "">("");
  const [editId, setEditId] = useState<number | null>(null);

  useEffect(() => {
    fetchClasses();
  }, []);

  const fetchClasses = async () => {
    const data = await getClasses();
    setClasses(data);
  };

  const handleAdd = async () => {
    await addClass(Number(className));
    setClassName("");
    fetchClasses();
  };

  const handleDelete = async (id: number) => {
    await deleteClass(id);
    fetchClasses();
  };

  const handleEdit = (c: any) => {
    setEditId(c.class_id);
    setClassName(c.class_name);
  };

  const handleUpdate = async () => {
    if (!editId) return;

    await updateClass(editId, className.toString());

    setEditId(null);
    setClassName("");
    fetchClasses();
  };

  return (
    <div className="students-page">

      <div className="students-header">
        <h2>Classes</h2>
      </div>

      {/* ADD / EDIT */}
      <div style={{ marginBottom: "20px" }}>
        <input
  className="class-input"
  value={className}
  onChange={(e) =>
    setClassName(
      e.target.value === ""
        ? ""
        : Number(e.target.value)
    )
  }
  placeholder="Enter class name"
/>

        {editId ? (
          <button className="update-btn" onClick={handleUpdate}>Update</button>
        ) : (
          <button className="add-btn" onClick={handleAdd}>Add</button>
        )}
      </div>

      {/* TABLE */}
      <table className="students-table">
        <thead>
          <tr>
            <th>Class Name</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {classes.map((c) => (
            <tr key={c.class_id}>
              <td>{c.class_name}</td>

              <td>
  <button
    className="edit-btn"
    onClick={() => handleEdit(c)}
  >
    Edit
  </button>

  <button
    className="delete-btn"
    onClick={() => handleDelete(c.class_id)}
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