import { useEffect, useState } from "react";

import {
  getSections,
  addSection,
  updateSection,
  deleteSection,
} from "../services/SectionApi";

import { getClasses } from "../services/ClassesApi";

import "../assets/css/viewSections.css";
import Pagination from "../components/Pagination";

export default function ViewSections() {
  const [loading, setLoading] = useState(true);
  interface Section {
    section_id: number;
    section_name: string;
    class_id: number;
  }

  interface Class {
    class_id: number;
    class_name: string;
  }
  const [sections, setSections] = useState<Section[]>([]);
  const [classes, setClasses] = useState<Class[]>([]);

  const [sectionName, setSectionName] = useState("");
  const [classId, setClassId] = useState<number | "">("");

  const [editId, setEditId] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  const fetchSections = async () => {
    try {
      setLoading(true);

      const data = await getSections();
      setSections(data);
    } catch (error) {
      console.error("Failed to fetch sections:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);

        const [sectionsRes, classesRes] = await Promise.all([
          getSections(),
          getClasses(),
        ]);

        setSections(sectionsRes);
        setClasses(classesRes);
      } catch (error) {
        console.error("Failed to load data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleAdd = async () => {
    if (!sectionName || !classId) return;

    try {
      await addSection(sectionName, Number(classId));

      setSectionName("");
      setClassId("");
      setShowModal(false);

      fetchSections();
    } catch (error) {
      console.error("Failed to add section:", error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await deleteSection(id);
      fetchSections();
    } catch (error) {
      console.error("Failed to delete section:", error);
    }
  };

  const handleEdit = (s: Section) => {
    setEditId(s.section_id);
    setSectionName(s.section_name);
    setClassId(s.class_id);
    setShowModal(true);
  };

  const handleUpdate = async () => {
    if (editId === null) return;

    try {
      await updateSection(editId, sectionName, Number(classId));

      setEditId(null);
      setSectionName("");
      setClassId("");
      setShowModal(false);

      fetchSections();
    } catch (error) {
      console.error("Failed to update section:", error);
    }
  };

  const handleOpenAddModal = () => {
    setEditId(null);
    setSectionName("");
    setClassId("");
    setShowModal(true);
  };

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;

  const currentSections = sections.slice(indexOfFirstRow, indexOfLastRow);

  const totalPages = Math.ceil(sections.length / rowsPerPage);

  return (
    <div className="students-page">
      <div className="students-header">
        <h2>Sections</h2>

        <button className="add-btn" onClick={handleOpenAddModal}>
          Add Section
        </button>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h2>{editId === null ? "Add Section" : "Edit Section"}</h2>

            <div className="form-group">
              <label htmlFor="section-name">Section Name</label>

              <input
                id="section-name"
                value={sectionName}
                onChange={(e) => setSectionName(e.target.value)}
                placeholder="Section Name (A/B/C)"
              />
            </div>

            <div className="form-group">
              <label htmlFor="class-select">Class</label>

              <select
                id="class-select"
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
                  setSectionName("");
                  setClassId("");
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
            <th>Section</th>
            <th>Class Name</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {loading ? (
            <tr>
              <td colSpan={3} className="loading-cell">
                Loading sections...
              </td>
            </tr>
          ) : (
            currentSections.map((s) => (
              <tr key={s.section_id}>
                <td>{s.section_name}</td>

                <td>
                  {classes.find((c) => c.class_id === s.class_id)?.class_name}
                </td>

                <td>
                  <button className="edit-btn" onClick={() => handleEdit(s)}>
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
            ))
          )}
        </tbody>
      </table>
      {!loading && sections.length > rowsPerPage && (
        <Pagination
  currentPage={currentPage}
  totalPages={totalPages}
  onPageChange={setCurrentPage}
/>
      )}
    </div>
  );
}
