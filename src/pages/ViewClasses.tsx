import { useEffect, useState } from "react";

import {
  getClasses,
  addClass,
  updateClass,
  deleteClass,
} from "../services/ClassesApi";

import "../assets/css/viewClasses.css";
import Pagination from "../components/Pagination";

export default function ViewClasses() {
  const [loading, setLoading] = useState(true);
  interface Class {
    class_id: number;
    class_name: number;
  }

  const [classes, setClasses] = useState<Class[]>([]);

  const [showModal, setShowModal] = useState(false);

  const [className, setClassName] = useState("");
  const [classError, setClassError] = useState("");
  const [duplicateError, setDuplicateError] = useState("");

  const [showDeleteModal, setShowDeleteModal] = useState(false);
const [deleteId, setDeleteId] = useState<number | null>(null);

  const [editId, setEditId] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  const fetchClasses = async () => {
    try {
      setLoading(true);

      const data = await getClasses();
      setClasses(data);
    } catch (error) {
      console.error("Failed to fetch classes:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClasses();
  }, []);

  const validateForm = () => {
    let valid = true;

    setClassError("");
    setDuplicateError("");

    const trimmedClass = className.trim();

    if (!trimmedClass) {
      setClassError("Class name is required");
      valid = false;
    } else if (!/^\d+$/.test(trimmedClass)) {
      setClassError("Class name must contain only numbers");
      valid = false;
    }

    const duplicate = classes.some(
      (c) => c.class_name.toString() === trimmedClass && c.class_id !== editId,
    );

    if (duplicate) {
      setDuplicateError("Class already exists");
      valid = false;
    }

    return valid;
  };

  const handleAdd = async () => {
    if (!validateForm()) return;

    try {
      await addClass(className.trim());

      setClassName("");
      setShowModal(false);

      fetchClasses();
    } catch (error) {
      console.error("Failed to add class:", error);
    }
  };

  const handleDelete = async () => {
  if (deleteId === null) return;

  try {
    await deleteClass(deleteId);

    setShowDeleteModal(false);
    setDeleteId(null);

    fetchClasses();
  } catch (error) {
    console.error("Failed to delete class:", error);
  }
};

  const handleEdit = (c: Class) => {
    setEditId(c.class_id);
    setClassName(c.class_name.toString());

    setShowModal(true);
  };

  const handleUpdate = async () => {
  if (editId === null) return;

  if (!validateForm()) return;

  try {
    await updateClass(editId, className.trim());

    setEditId(null);
    setClassName("");
    setShowModal(false);

    fetchClasses();
  } catch (error) {
    console.error("Failed to update class:", error);
  }
};

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;

  const currentClasses = classes.slice(indexOfFirstRow, indexOfLastRow);

  const totalPages = Math.ceil(classes.length / rowsPerPage);

  return (
    <div className="students-page">
      <div className="students-header">
        <h2>Classes</h2>

        <button
          className="add-btn"
          onClick={() => {
  setEditId(null);
  setClassName("");
  setClassError("");
  setDuplicateError("");
  setShowModal(true);
}}
        >
          Add Class
        </button>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h2>{editId ? "Edit Class" : "Add Class"}</h2>

            <div className="form-group">
              <label htmlFor="className">Class Name</label>

              <input
                id="className"
                value={className}
                // onChange={(e) => setClassName(e.target.value)}
                onChange={(e) => {
                  setClassName(e.target.value);
                  setClassError("");
                  setDuplicateError("");
                }}
                placeholder="Enter class name"
              />
              {classError && (
  <span className="error-text">{classError}</span>
)}

{duplicateError && (
  <span className="error-text">{duplicateError}</span>
)}
            </div>

            <div className="modal-actions">
              <button
                className="modal-add-btn"
                onClick={editId ? handleUpdate : handleAdd}
              >
                {editId ? "Update" : "Add"}
              </button>

              <button
                className="modal-cancel-btn"
                onClick={() => {
  setShowModal(false);
  setEditId(null);
  setClassName("");
  setClassError("");
  setDuplicateError("");
}}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      {showDeleteModal && (
  <div className="modal-overlay">
    <div className="modal-box">
      <h2>Delete Class</h2>

      <p className="delete-message">
        Are you sure you want to delete this class?
      </p>

      <div className="modal-actions">
        <button
          className="modal-delete-button"
          onClick={handleDelete}
        >
          Delete
        </button>
        <button
          className="modal-cancel-button"
          onClick={() => {
            setShowDeleteModal(false);
            setDeleteId(null);
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
          {loading ? (
            <tr>
              <td colSpan={2} className="loading-cell">
                Loading classes...
              </td>
            </tr>
          ) : (
            currentClasses.map((c) => (
              <tr key={c.class_id}>
                <td>{c.class_name}</td>

                <td>
                  <button className="edit-btn" onClick={() => handleEdit(c)}>
                    Edit
                  </button>

                  <button
  className="delete-btn"
  onClick={() => {
    setDeleteId(c.class_id);
    setShowDeleteModal(true);
  }}
>
  Delete
</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      {!loading && classes.length > rowsPerPage && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
}
