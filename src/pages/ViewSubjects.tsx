import { useEffect, useState } from "react";

import {
  getSubjects,
  addSubject,
  updateSubject,
  deleteSubject,
} from "../services/SubjectApi";

import "../assets/css/viewsubjects.css";
import Pagination from "../components/Pagination";

export default function ViewSubjects() {
  const [loading, setLoading] = useState(true);
  interface Subject {
    sub_id: number;
    subject_name: string;
  }

  const [subjects, setSubjects] = useState<Subject[]>([]);

  const [subjectName, setSubjectName] = useState("");

  const [editId, setEditId] = useState<number | null>(null);

  const [showModal, setShowModal] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  const fetchSubjects = async () => {
    try {
      setLoading(true);

      const data = await getSubjects();
      setSubjects(data);
    } catch (error) {
      console.error("Failed to fetch subjects:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchSubjects();
  }, []);

  const handleAdd = async () => {
    if (!subjectName.trim()) return;

    try {
      await addSubject(subjectName);

      setSubjectName("");
      setShowModal(false);

      fetchSubjects();
    } catch (error) {
      console.error("Failed to add subject:", error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteSubject(id);
      fetchSubjects();
    } catch (error) {
      console.error("Failed to delete subject:", error);
    }
  };

  const handleEdit = (s: Subject) => {
    setEditId(s.sub_id);
    setSubjectName(s.subject_name);
    setShowModal(true);
  };

  const handleUpdate = async () => {
    if (editId === null) return;

    try {
      await updateSubject(editId, subjectName);

      setEditId(null);
      setSubjectName("");
      setShowModal(false);

      fetchSubjects();
    } catch (error) {
      console.error("Failed to update subject:", error);
    }
  };

  const handleOpenAddModal = () => {
    setEditId(null);
    setSubjectName("");
    setShowModal(true);
  };

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;

  const currentSubjects = subjects.slice(indexOfFirstRow, indexOfLastRow);

  const totalPages = Math.ceil(subjects.length / rowsPerPage);

  return (
    <div className="students-page">
      <div className="students-header">
        <h2>Subjects</h2>

        <button className="add-btn" onClick={handleOpenAddModal}>
          Add Subject
        </button>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h2>{editId === null ? "Add Subject" : "Edit Subject"}</h2>

            <div className="form-group">
              <label htmlFor="subject-name">Subject Name</label>

              <input
                id="subject-name"
                value={subjectName}
                onChange={(e) => setSubjectName(e.target.value)}
                placeholder="Subject Name"
              />
            </div>

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
                  setSubjectName("");
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
            <th>Subject Name</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {loading ? (
            <tr>
              <td colSpan={2} className="loading-cell">
                Loading subjects...
              </td>
            </tr>
          ) : (
            currentSubjects.map((s) => (
              <tr key={s.sub_id}>
                <td>{s.subject_name}</td>

                <td>
                  <button className="edit-btn" onClick={() => handleEdit(s)}>
                    Edit
                  </button>

                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(s.sub_id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      {!loading && subjects.length > rowsPerPage && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
}
