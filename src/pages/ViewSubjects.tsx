import { useEffect, useState } from "react";

import {
  getSubjects,
  addSubject,
  updateSubject,
  deleteSubject,
} from "../services/SubjectApi";

import "../assets/css/viewSubjects.css";

export default function ViewSubjects() {

  const [subjects, setSubjects] = useState<any[]>([]);

  const [subjectName, setSubjectName] =
    useState("");

  const [editId, setEditId] =
    useState<number | null>(null);

    const fetchSubjects = async () => {
    const data = await getSubjects();
    setSubjects(data);
  };
  
  useEffect(() => {
    fetchSubjects();
  }, []);

  

  const handleAdd = async () => {

    await addSubject(subjectName);

    setSubjectName("");

    fetchSubjects();
  };

  const handleDelete = async (id: number) => {

    await deleteSubject(id);

    fetchSubjects();
  };

  const handleEdit = (s: any) => {

    setEditId(s.sub_id);

    setSubjectName(s.subject_name);
  };

  const handleUpdate = async () => {

    if (editId === null) return;

    await updateSubject(
      editId,
      subjectName
    );

    setEditId(null);

    setSubjectName("");

    fetchSubjects();
  };

  return (
    <div className="students-page">

      <div className="students-header">
        <h2>Subjects</h2>
      </div>

      <div className="form-box">

        <input
          className="input-box"
          value={subjectName}
          onChange={(e) =>
            setSubjectName(e.target.value)
          }
          placeholder="Subject Name"
        />

        {editId !== null ? (
          <button
            className="update-btn"
            onClick={handleUpdate}
          >
            Update
          </button>
        ) : (
          <button
            className="add-btn"
            onClick={handleAdd}
          >
            Add
          </button>
        )}
      </div>

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