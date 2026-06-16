import { useEffect, useState } from "react";

import {
  getClasses,
  addClass,
  updateClass,
  deleteClass,
} from "../services/ClassesApi";

import "../assets/css/viewClasses.css";

export default function ViewClasses() {
  const [loading, setLoading] = useState(true);
  interface Class {
    class_id: number;
    class_name: string;
  }

  const [classes, setClasses] = useState<Class[]>([]);

  const [showModal, setShowModal] = useState(false);

  const [className, setClassName] = useState("");

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

  const handleAdd = async () => {
    if (!className.trim()) return;

    try {
      await addClass(className);

      setClassName("");
      setShowModal(false);

      fetchClasses();
    } catch (error) {
      console.error("Failed to add class:", error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteClass(id);
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

    try {
      await updateClass(editId, className);

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
                onChange={(e) => setClassName(e.target.value)}
                placeholder="Enter class name"
              />
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
                    onClick={() => handleDelete(c.class_id)}
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
        <div className="pagination">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Prev
          </button>

          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              className={currentPage === i + 1 ? "active-page" : ""}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
