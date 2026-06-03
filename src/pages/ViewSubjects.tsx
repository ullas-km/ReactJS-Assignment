import { useEffect, useState } from "react";

import {
  getSubjects,
  addSubject,
  updateSubject,
  deleteSubject,
} from "../services/SubjectApi";

export default function ViewSubjects() {
  const [subjects, setSubjects] = useState<any[]>([]);

  const [subjectName, setSubjectName] =
    useState("");

  const [editId, setEditId] =
    useState<number | null>(null);

  const [showModal, setShowModal] =
    useState(false);

  const fetchSubjects = async () => {
    const data = await getSubjects();
    setSubjects(data);
  };

  useEffect(() => {
    fetchSubjects();
  }, []);

  const handleAdd = async () => {
    if (!subjectName.trim()) return;

    await addSubject(subjectName);

    setSubjectName("");
    setShowModal(false);

    fetchSubjects();
  };

  const handleDelete = async (id: number) => {
    await deleteSubject(id);
    fetchSubjects();
  };

  const handleEdit = (s: any) => {
    setEditId(s.sub_id);
    setSubjectName(s.subject_name);
    setShowModal(true);
  };

  const handleUpdate = async () => {
    if (editId === null) return;

    await updateSubject(
      editId,
      subjectName
    );

    setEditId(null);
    setSubjectName("");
    setShowModal(false);

    fetchSubjects();
  };

  const handleOpenAddModal = () => {
    setEditId(null);
    setSubjectName("");
    setShowModal(true);
  };

  return (
    <div className="students-page">

      <div className="students-header">

        <h2>Subjects</h2>

        <button
          className="add-btn"
          onClick={handleOpenAddModal}
        >
          Add Subject
        </button>

      </div>

      {showModal && (
        <div className="modal-overlay">

          <div className="modal-box">

            <h2>
              {editId === null
                ? "Add Subject"
                : "Edit Subject"}
            </h2>

            <div className="form-group">

              <label htmlFor="subject-name">
                Subject Name
              </label>

              <input
                id="subject-name"
                value={subjectName}
                onChange={(e) =>
                  setSubjectName(
                    e.target.value
                  )
                }
                placeholder="Subject Name"
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

          {subjects.map((s) => (
            <tr key={s.sub_id}>

              <td>{s.subject_name}</td>

              <td>

                <button
                  className="edit-btn"
                  onClick={() =>
                    handleEdit(s)
                  }
                >
                  Edit
                </button>

                <button
                  className="delete-btn"
                  onClick={() =>
                    handleDelete(s.sub_id)
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