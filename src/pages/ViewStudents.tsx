import { useEffect, useState } from "react";

import AddStudentModal from "../components/AddStudentModal";
import EditStudentModal from "../components/EditStudentModal";

import { getClasses } from "../services/ClassesApi";
import { getSections } from "../services/SectionApi";

import { getStudents, deleteStudent } from "../services/studentsApi";

import "../assets/css/viewstudents.css";

export default function ViewStudents() {
  const [loading, setLoading] = useState(true);
  interface Student {
    student_id: number;
    name: string;
    email: string;
    phone: string;
    class_name: string;
    section_name: string;
    class_id: number;
    section_id: number;
  }

  interface Class {
    class_id: number;
    class_name: string;
  }

  interface Section {
    section_id: number;
    section_name: string;
    class_id: number;
  }
  const [students, setStudents] = useState<Student[]>([]);

  const [showAddModal, setShowAddModal] = useState(false);

  const [editingStudent, setEditingStudent] = useState<Student | null>(null);

  const [classes, setClasses] = useState<Class[]>([]);
  const [sections, setSections] = useState<Section[]>([]);

  const fetchStudents = async () => {
    try {
      const data = await getStudents();
      setStudents(data);
    } catch (error) {
      console.error("Failed to fetch students:", error);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);

        const [studentsRes, classesRes, sectionsRes] = await Promise.all([
          getStudents(),
          getClasses(),
          getSections(),
        ]);

        setStudents(studentsRes);
        setClasses(classesRes);
        setSections(sectionsRes);
      } catch (error) {
        console.error("Failed to load data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleDelete = async (id: number) => {
    try {
      await deleteStudent(id);
      fetchStudents();
    } catch (error) {
      console.error("Failed to delete student:", error);
    }
  };

  return (
    <div className="students-page">
      <div className="students-header">
        <h2 className="students-title">Students List</h2>

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
            {loading ? (
              <tr>
                <td colSpan={7} className="loading-cell">
                  Loading students...
                </td>
              </tr>
            ) : (
              students.map((s: Student) => (
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
                        onClick={() => setEditingStudent(s)}
                        className="edit-btn"
                      >
                        Edit
                      </button>

                      <button
                        onClick={() => handleDelete(s.student_id)}
                        className="delete-btn"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {showAddModal && (
        <AddStudentModal
          onClose={() => setShowAddModal(false)}
          refreshStudents={fetchStudents}
        />
      )}

      {editingStudent && (
        <EditStudentModal
          student={editingStudent}
          classes={classes}
          sections={sections}
          onClose={() => setEditingStudent(null)}
          refreshStudents={fetchStudents}
        />
      )}
    </div>
  );
}
