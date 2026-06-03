import { useEffect, useState } from "react";

import {
  getClasses,
  addClass,
  updateClass,
  deleteClass,
} from "../services/ClassesApi";

import "../assets/css/viewClasses.css";

export default function ViewClasses() {
  const [classes, setClasses] = useState<any[]>([]);

  const [showModal, setShowModal] = useState(false);

  const [className, setClassName] = useState("");

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
    setShowModal(false);

    fetchClasses();
  };

  const handleDelete = async (id: number) => {
    await deleteClass(id);
    fetchClasses();
  };

  const handleEdit = (c: any) => {
    setEditId(c.class_id);
    setClassName(c.class_name.toString());

    setShowModal(true);
  };

  const handleUpdate = async () => {
    if (!editId) return;

    await updateClass(editId, className);

    setEditId(null);
    setClassName("");
    setShowModal(false);

    fetchClasses();
  };

  return (
    <div className="students-page">
      <div className="students-header">
        <h2>Classes</h2>

        <button
          className="add-btn"
          onClick={() => {
            setEditId(null);
            setClassName("");
            setShowModal(true);
          }}
        >
          Add Class
        </button>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h2>
              {editId ? "Edit Class" : "Add Class"}
            </h2>

            <div className="form-group">
              <label htmlFor="className">
                Class Name
              </label>

              <input
                id="className"
                value={className}
                onChange={(e) =>
                  setClassName(e.target.value)
                }
                placeholder="Enter class name"
              />
            </div>

            <div className="modal-actions">
              <button
                className="modal-add-btn"
                onClick={
                  editId
                    ? handleUpdate
                    : handleAdd
                }
              >
                {editId ? "Update" : "Add"}
              </button>

              <button
                className="modal-cancel-btn"
                onClick={() => {
                  setShowModal(false);
                  setEditId(null);
                  setClassName("");
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
                  onClick={() =>
                    handleDelete(c.class_id)
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