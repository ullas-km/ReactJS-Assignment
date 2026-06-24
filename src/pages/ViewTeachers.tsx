import { useEffect, useState } from "react";

import {
  getTeachers,
  addTeacher,
  updateTeacher,
  deleteTeacher,
  getTeacherById,
} from "../services/TeacherApi";
import { getSubjects } from "../services/SubjectApi";

import "../assets/css/viewTeachers.css";
import Pagination from "../components/Pagination";

export default function ViewTeachers() {
  const [loading, setLoading] = useState(true);
  interface Teacher {
    subjects: string;
    teacher_id: number;
    teacher_name: string;
    email: string;
    phone: number;
  }
  interface Subject {
    sub_id: number;
    subject_name: string;
  }
  const [teachers, setTeachers] = useState<Teacher[]>([]);
  const [teacherName, setTeacherName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");

  const [editId, setEditId] = useState<number | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [subjectIds, setSubjectIds] = useState<number[]>([]);
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  const [teacherNameError, setTeacherNameError] = useState("");
  const [emailError, setEmailError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [subjectError, setSubjectError] = useState("");

  const [showDeleteModal, setShowDeleteModal] = useState(false);
const [teacherToDelete, setTeacherToDelete] = useState<number | null>(null);

  const clearFormErrors = () => {
    setTeacherNameError("");
    setEmailError("");
    setPhoneError("");
    setPasswordError("");
    setSubjectError("");
  };

  const fetchTeachers = async () => {
    try {
      setLoading(true);

      const data = await getTeachers();
      setTeachers(data);

      const pages = Math.ceil(data.length / rowsPerPage);

      if (currentPage > pages && pages > 0) {
        setCurrentPage(pages);
      }
    } catch (error) {
      console.error("Failed to fetch teachers:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchTeachers();

    const loadSubjects = async () => {
      try {
        const data = await getSubjects();
        setSubjects(data);
      } catch (error) {
        console.error(error);
      }
    };

    void loadSubjects();
  }, []);

  // const handleAdd = async () => {
  //   if (!teacherName.trim()) return;

  //   try {
  //     await addTeacher(teacherName, email, phone, password, subjectIds);

  //     setTeacherName("");
  //     setShowModal(false);

  //     fetchTeachers();
  //   } catch (error) {
  //     console.error("Failed to add teacher:", error);
  //   }
  // };

  const handleAdd = async () => {
    if (!validateForm()) return;

    try {
      await addTeacher(teacherName, email, phone, password, subjectIds);

      clearFormErrors();

      fetchTeachers();

      setTeacherName("");
      setEmail("");
      setPhone("");
      setPassword("");
      setSubjectIds([]);
      setShowModal(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async () => {
  if (teacherToDelete === null) return;

  try {
    await deleteTeacher(teacherToDelete);

    setShowDeleteModal(false);
    setTeacherToDelete(null);

    fetchTeachers();
  } catch (error) {
    console.error("Failed to delete teacher:", error);
  }
};

  const handleSubjectSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedIds = Array.from(e.target.selectedOptions, (option) =>
      Number(option.value),
    );

    setSubjectIds(selectedIds);
  };

  const handleEdit = async (t: Teacher) => {
    setEditId(t.teacher_id);
    setTeacherName(t.teacher_name);
    setEmail(t.email || "");
    setPhone(t.phone ? String(t.phone) : "");

    try {
      const teacherData = await getTeacherById(t.teacher_id);
      if (teacherData.subject_ids) {
        const ids = teacherData.subject_ids
          .split(",")
          .map((id: string) => Number(id.trim()))
          .filter((id: number) => !Number.isNaN(id));
        setSubjectIds(ids);
      } else {
        setSubjectIds([]);
      }
    } catch (error) {
      console.error("Failed to fetch teacher subjects:", error);
      setSubjectIds([]);
    }

    setShowModal(true);
  };

  // const handleUpdate = async () => {
  //   if (editId === null) return;

  //   try {
  //     await updateTeacher(editId, teacherName, email, phone, subjectIds);

  //     setEditId(null);
  //     setTeacherName("");
  //     setEmail("");
  //     setPhone("");
  //     setShowModal(false);

  //     fetchTeachers();
  //   } catch (error) {
  //     console.error("Failed to update teacher:", error);
  //   }
  // };

  const handleUpdate = async () => {
    if (editId === null) return;

    if (!validateForm()) return;

    try {
      await updateTeacher(editId, teacherName, email, phone, subjectIds);

      clearFormErrors();

      fetchTeachers();

      setShowModal(false);
      setEditId(null);
    } catch (error) {
      console.error(error);
    }
  };

  const handleOpenAddModal = () => {
    setEditId(null);

    setTeacherName("");
    setEmail("");
    setPhone("");
    setPassword("");
    setSubjectIds([]);

    clearFormErrors();

    setShowModal(true);
  };

  const validateForm = () => {
    let valid = true;

    setTeacherNameError("");
    setEmailError("");
    setPhoneError("");
    setPasswordError("");
    setSubjectError("");

    if (!teacherName.trim()) {
      setTeacherNameError("Teacher name is required");
      valid = false;
    } else if (!/^[A-Za-z ]+$/.test(teacherName.trim())) {
      setTeacherNameError("Teacher name can contain only letters");
      valid = false;
    }

    if (!email.trim()) {
      setEmailError("Email is required");
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError("Enter a valid email");
      valid = false;
    }

    if (!phone.trim()) {
      setPhoneError("Phone number is required");
      valid = false;
    } else if (!/^[0-9]{10}$/.test(phone)) {
      setPhoneError("Phone number must be 10 digits");
      valid = false;
    }

    if (editId === null) {
      if (!password.trim()) {
        setPasswordError("Password is required");
        valid = false;
      } else if (password.length < 6) {
        setPasswordError("Password must be at least 6 characters");
        valid = false;
      }
    }

    if (subjectIds.length === 0) {
      setSubjectError("Select at least one subject");
      valid = false;
    }

    return valid;
  };

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;

  const filteredTeachers = teachers.filter(
    (teacher) =>
      teacher.teacher_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      teacher.subjects.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const totalPages = Math.ceil(filteredTeachers.length / rowsPerPage);

  const currentTeachers = filteredTeachers.slice(
    indexOfFirstRow,
    indexOfLastRow,
  );

  let tableRows;

  if (loading) {
    tableRows = (
      <tr>
        <td colSpan={4} className="loading-cell">
          Loading teachers...
        </td>
      </tr>
    );
  } else if (currentTeachers.length > 0) {
    tableRows = currentTeachers.map((t) => (
      <tr key={t.teacher_id}>
        <td>{t.teacher_name}</td>
        <td>{t.email}</td>
        <td>{t.phone}</td>
        <td>{t.subjects || "No Subjects"}</td>

        <td>
          <button className="edit-btn" onClick={() => handleEdit(t)}>
            Edit
          </button>

          <button
            className="delete-btn"
            onClick={() => {
  setTeacherToDelete(t.teacher_id);
  setShowDeleteModal(true);
}}
          >
            Delete
          </button>
        </td>
      </tr>
    ));
  } else {
    tableRows = (
      <tr>
        <td colSpan={5} className="loading-cell">
          No teachers found
          {searchTerm && ` for "${searchTerm}"`}
        </td>
      </tr>
    );
  }

  return (
    <div className="students-page">
      <div className="students-header">
        <h2>Teachers</h2>

        <button className="add-btn" onClick={handleOpenAddModal}>
          Add Teacher
        </button>
      </div>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h2>{editId === null ? "Add Teacher" : "Edit Teacher"}</h2>

            <div className="form-group">
              <label htmlFor="teacher-name">Teacher Name</label>

              <input
                id="teacher-name"
                value={teacherName}
                onChange={(e) => setTeacherName(e.target.value)}
                placeholder="Teacher Name"
              />
              {teacherNameError && (
                <span className="error-text">{teacherNameError}</span>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="emailvt">Email</label>
              <input
                id="emailvt"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
              />
              {emailError && <span className="error-text">{emailError}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="phonevt">Phone</label>
              <input
                id="phonevt"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Phone"
              />
              {phoneError && <span className="error-text">{phoneError}</span>}
            </div>

            {editId === null && (
              <div className="form-group">
                <label htmlFor="passwordvt">Password</label>
                <input
                  id="passwordvt"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                />
                {passwordError && (
                  <span className="error-text">{passwordError}</span>
                )}
              </div>
            )}
            <div className="form-group">
              <label htmlFor="subjectsvt">Subjects</label>

              <select
                id="subjectsvt"
                multiple
                value={subjectIds.map(String)}
                onChange={handleSubjectSelect}
                className="subject-select"
              >
                {subjects.map((subject) => (
                  <option key={subject.sub_id} value={subject.sub_id}>
                    {subject.subject_name}
                  </option>
                ))}
              </select>
              {subjectError && (
                <span className="error-text">{subjectError}</span>
              )}
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

                  setTeacherName("");
                  setEmail("");
                  setPhone("");
                  setPassword("");
                  setSubjectIds([]);

                  clearFormErrors();
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="search-container">
        <input
          type="text"
          placeholder="Search teacher..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
        />
      </div>
      {
  showDeleteModal && (
    <div className="modal-overlay">
      <div className="delete-modal-box">
        <h3>Delete Teacher</h3>

        <p>
          Are you sure you want to delete this teacher?
        </p>

        <div className="modal-actions">
          <button
            className="modal-delete-btn"
            onClick={handleDelete}
          >
            Yes, Delete
          </button>

          <button
            className="modal-cancel-btn"
            onClick={() => {
              setShowDeleteModal(false);
              setTeacherToDelete(null);
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
}
      <table className="students-table">
        <thead>
          <tr>
            <th>Teacher Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Subjects</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>{tableRows}</tbody>
      </table>
      {!loading && filteredTeachers.length > rowsPerPage && (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
        />
      )}
    </div>
  );
}
