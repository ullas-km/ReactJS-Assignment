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

  const [sectionError, setSectionError] = useState("");
  const [classError, setClassError] = useState("");
  const [duplicateError, setDuplicateError] = useState("");

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [sectionToDelete, setSectionToDelete] = useState<Section | null>(null);

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

  const validateForm = () => {
    let valid = true;

    setSectionError("");
    setClassError("");
    setDuplicateError("");

    const trimmedSection = sectionName.trim();

    if (!trimmedSection) {
      setSectionError("Section name is required");
      valid = false;
    } else if (!/^[A-Za-z0-9]+$/.test(trimmedSection)) {
      setSectionError("Section name can contain only letters and numbers");
      valid = false;
    }

    if (!classId) {
      setClassError("Please select a class");
      valid = false;
    }

    const duplicate = sections.some(
      (s) =>
        s.class_id === Number(classId) &&
        s.section_name.trim().toLowerCase() === trimmedSection.toLowerCase() &&
        s.section_id !== editId,
    );

    if (duplicate) {
      setDuplicateError("Section already exists for this class");
      valid = false;
    }

    return valid;
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
    if (!validateForm()) return;

    try {
      await addSection(sectionName.trim(), Number(classId));

      setSectionName("");
      setClassId("");
      setShowModal(false);

      fetchSections();
    } catch (error) {
      console.error("Failed to add section:", error);
    }
  };

  const handleDelete = async () => {
  console.log("DELETE CLICKED");
  console.log("sectionToDelete =", sectionToDelete);

  if (!sectionToDelete) return;

  try {
    await deleteSection(sectionToDelete.section_id);

    setShowDeleteModal(false);
    setSectionToDelete(null);

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

    if (!validateForm()) return;

    try {
      await updateSection(editId, sectionName.trim(), Number(classId));

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
                onChange={(e) => {
                  setSectionName(e.target.value);
                  setSectionError("");
                  setDuplicateError("");
                }}
                placeholder="Section Name (A/B/C)"
              />

              {sectionError && (
                <span className="error-text">{sectionError}</span>
              )}
              {duplicateError && (
                <span className="error-text">{duplicateError}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="class-select">Class</label>

              <select
                id="class-select"
                value={classId}
                onChange={(e) => {
                  setClassId(Number(e.target.value));
                  setClassError("");
                  setDuplicateError("");
                }}
              >
                <option value="">Select Class</option>

                {classes.map((c) => (
                  <option key={c.class_id} value={c.class_id}>
                    Class {c.class_name}
                  </option>
                ))}
              </select>

              {classError && <span className="error-text">{classError}</span>}
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

      {showDeleteModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h2>Delete Section</h2>

            <p className="delete-message">
              Are you sure you want to delete this section?
            </p>

            <div className="modal-actions">
              <button
                className="modal-cancel-button"
                onClick={() => {
  setShowDeleteModal(false);
  setSectionToDelete(null);
}}
              >
                Cancel
              </button>

              <button className="modal-delete-button" onClick={handleDelete}>
                Delete
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
                    onClick={() => {
                      setSectionToDelete(s);
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
