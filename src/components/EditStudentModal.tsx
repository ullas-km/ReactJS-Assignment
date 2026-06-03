import { useState } from "react";

import { updateStudent } from "../services/studentsApi";

type Props = Readonly<{
  student: any;
  classes: any[];
  sections: any[];
  onClose: () => void;
  refreshStudents: () => void;
}>;

export default function EditStudentModal({
  student,
  classes,
  sections,
  onClose,
  refreshStudents,
}: Props) {
  const [name, setName] = useState(student.name);

  const [email, setEmail] = useState(student.email);

  const [phone, setPhone] = useState(student.phone);

  const [classId, setClassId] = useState<number | "">(
    student.class_id
  );

  const [sectionId, setSectionId] = useState<number | "">(
    student.section_id
  );

  const handleUpdate = async () => {
    await updateStudent(
      student.student_id,
      Number(classId),
      Number(sectionId),
      name,
      email,
      phone
    );

    refreshStudents();

    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-box">
        <h2>Edit Student</h2>

        <div className="form-group">
          <label htmlFor="edit-student-name">
            Name
          </label>

          <input
            id="edit-student-name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
          />
        </div>

        <div className="form-group">
          <label htmlFor="edit-student-email">
            Email
          </label>

          <input
            id="edit-student-email"
            type="email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />
        </div>

        <div className="form-group">
          <label htmlFor="edit-student-phone">
            Phone
          </label>

          <input
            id="edit-student-phone"
            value={phone}
            onChange={(e) =>
              setPhone(e.target.value)
            }
          />
        </div>

        <div className="form-group">
          <label htmlFor="edit-student-class">
            Class
          </label>

          <select
            id="edit-student-class"
            value={classId}
            onChange={(e) => {
              setClassId(
                Number(e.target.value)
              );

              setSectionId("");
            }}
          >
            <option value="">
              Select Class
            </option>

            {classes.map((c) => (
              <option
                key={c.class_id}
                value={c.class_id}
              >
                {c.class_name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="edit-student-section">
            Section
          </label>

          <select
            id="edit-student-section"
            value={sectionId}
            onChange={(e) =>
              setSectionId(
                Number(e.target.value)
              )
            }
          >
            <option value="">
              Select Section
            </option>

            {sections
              .filter(
                (s) =>
                  s.class_id ===
                  Number(classId)
              )
              .map((s) => (
                <option
                  key={s.section_id}
                  value={s.section_id}
                >
                  {s.section_name}
                </option>
              ))}
          </select>
        </div>

        <div className="modal-actions">
          <button
            className="modal-add-btn"
            onClick={handleUpdate}
          >
            Update
          </button>

          <button
            className="modal-cancel-btn"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}