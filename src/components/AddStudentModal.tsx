import { useState, useEffect } from "react";
import { addStudent } from "../services/studentsApi";
import { getClasses } from "../services/ClassesApi";
import { getSections } from "../services/SectionApi";
type Props = Readonly<{
  onClose: () => void;
  refreshStudents: () => void;
}>;

export default function AddStudentModal({
  onClose,
  refreshStudents,
}: Props) {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [classId, setClassId] = useState("");
  const [sectionId, setSectionId] = useState("");
  const [classes, setClasses] = useState<any[]>([]);
const [sections, setSections] = useState<any[]>([]);

useEffect(() => {
  fetchClasses();
  fetchSections();
}, []);
 const handleAddStudent = async () => {

  await addStudent(
    name,
    email,
    phone,
    Number(classId),
    Number(sectionId)
  );

  refreshStudents();

  onClose();
};
const fetchClasses = async () => {
  const data = await getClasses();
  setClasses(data);
};

const fetchSections = async () => {
  const data = await getSections();
  setSections(data);
};

  return (
  <div className="modal-overlay">
    <div className="modal-box">

      <h2>Add Student</h2>

      <div className="form-group">
  <label htmlFor="name">Name</label>
  <input
    id="name"
    value={name}
    onChange={(e) => setName(e.target.value)}
  />
</div>

      <div className="form-group">
  <label htmlFor="email">Email</label>
  <input
    id="email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
  />
</div>

      <div className="form-group">
  <label htmlFor="phone">Phone</label>
  <input
    id="phone"
    value={phone}
    onChange={(e) => setPhone(e.target.value)}
  />
</div>

      <div className="form-group">
  <label htmlFor="classId">Class ID</label>

  <select
    id="classId"
    value={classId}
    onChange={(e) => setClassId(e.target.value)}
  >
  <option value="">Select Class</option>

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
  <label htmlFor="sectionId">Section ID</label>

  <select
    id="sectionId"
    value={sectionId}
    onChange={(e) => setSectionId(e.target.value)}
  >
  <option value="">Select Section</option>

  {sections
    .filter((s) => s.class_id === Number(classId))
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
          onClick={handleAddStudent}
          className="modal-add-btn"
        >
          Add
        </button>

        <button
          onClick={onClose}
          className="modal-cancel-btn"
        >
          Cancel
        </button>
      </div>

    </div>
  </div>
);
}