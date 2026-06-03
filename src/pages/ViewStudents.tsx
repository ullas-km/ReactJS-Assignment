import { useEffect, useState } from "react";

import AddStudentModal from "../components/AddStudentModal";
import EditStudentModal from "../components/EditStudentModal";

import { getClasses } from "../services/ClassesApi";
import { getSections } from "../services/SectionApi";

import {
  getStudents,
  deleteStudent,
} from "../services/studentsApi";

import "../assets/css/viewstudents.css";

export default function ViewStudents() {
  const [students, setStudents] = useState<any[]>([]);

  const [showAddModal, setShowAddModal] =
    useState(false);

  const [editingStudent, setEditingStudent] =
    useState<any | null>(null);

  const [classes, setClasses] = useState<any[]>([]);
  const [sections, setSections] = useState<any[]>([]);

  useEffect(() => {
    fetchStudents();
    fetchClasses();
    fetchSections();
  }, []);

  const fetchStudents = async () => {
    const data = await getStudents();
    setStudents(data);
  };

  const fetchClasses = async () => {
    const data = await getClasses();
    setClasses(data);
  };

  const fetchSections = async () => {
    const data = await getSections();
    setSections(data);
  };

  const handleDelete = async (id: number) => {
    await deleteStudent(id);
    fetchStudents();
  };

  return (
    <div className="students-page">
      <div className="students-header">
        <h2 className="students-title">
          Students List
        </h2>

        <button
          className="header-add-btn"
          onClick={() => setShowAddModal(true)}
        >
          Add Student
        </button>
      </div>

      <div className="table-wrapper">
        <table className="students-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Class</th>
              <th>Section</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {students.map((s: any) => (
              <tr key={s.student_id}>
                <td>{s.student_id}</td>
                <td>{s.name}</td>
                <td>{s.email}</td>
                <td>{s.phone}</td>
                <td>{s.class_name}</td>
                <td>{s.section_name}</td>

                <td className="actions">
                  <div className="modal-actions">
                    <button
                      onClick={() =>
                        setEditingStudent(s)
                      }
                      className="edit-btn"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() =>
                        handleDelete(
                          s.student_id
                        )
                      }
                      className="delete-btn"
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showAddModal && (
        <AddStudentModal
          onClose={() =>
            setShowAddModal(false)
          }
          refreshStudents={fetchStudents}
        />
      )}

      {editingStudent && (
        <EditStudentModal
          student={editingStudent}
          classes={classes}
          sections={sections}
          onClose={() =>
            setEditingStudent(null)
          }
          refreshStudents={fetchStudents}
        />
      )}
    </div>
  );
}