import { useEffect, useState } from "react";

import {
  getSections,
  addSection,
  updateSection,
  deleteSection,
} from "../services/SectionApi";

import { getClasses } from "../services/ClassesApi";

import "../assets/css/viewSections.css";

export default function ViewSections() {
  const [sections, setSections] = useState<any[]>([]);
  const [classes, setClasses] = useState<any[]>([]);

  const [sectionName, setSectionName] = useState("");
  const [classId, setClassId] = useState<number | "">("");

  const [editId, setEditId] = useState<number | null>(null);

  useEffect(() => {
    fetchSections();
    fetchClasses();
  }, []);

  const fetchSections = async () => {
    const data = await getSections();
    setSections(data);
  };

  const fetchClasses = async () => {
    const data = await getClasses();
    setClasses(data);
  };

  // ADD
  const handleAdd = async () => {
    if (!sectionName || !classId) return;

    await addSection(sectionName, Number(classId));

    setSectionName("");
    setClassId("");
    fetchSections();
  };

  // DELETE
  const handleDelete = async (id: number) => {
    await deleteSection(id);
    fetchSections();
  };

  // EDIT
  const handleEdit = (s: any) => {
    setEditId(s.section_id);
    setSectionName(s.section_name);
    setClassId(s.class_id);
  };

  // UPDATE
  const handleUpdate = async () => {
    if (editId === null) return;

    await updateSection(editId, sectionName, Number(classId));

    setEditId(null);
    setSectionName("");
    setClassId("");
    fetchSections();
  };

  return (
    <div className="students-page">

      <div className="students-header">
        <h2>Sections</h2>
      </div>

      {/* FORM */}
      <div className="section-form">

        <input
          className="section-input"
          value={sectionName}
          onChange={(e) => setSectionName(e.target.value)}
          placeholder="Section Name (A/B/C)"
        />

        <select
          className="section-input"
          value={classId}
          onChange={(e) => setClassId(Number(e.target.value))}
        >
          <option value="">Select Class</option>
          {classes.map((c) => (
            <option key={c.class_id} value={c.class_id}>
              Class {c.class_name}
            </option>
          ))}
        </select>

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
            <th>Section</th>
            <th>Class name</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {sections.map((s) => (
            <tr key={s.section_id}>
              <td>{s.section_name}</td>
             <td>
  {classes.find((c) => c.class_id === s.class_id)?.class_name}
</td>

              <td>
                <button
                  className="edit-btn"
                  onClick={() => handleEdit(s)}
                >
                  Edit
                </button>

                <button
                  className="delete-btn"
                  onClick={() => handleDelete(s.section_id)}
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