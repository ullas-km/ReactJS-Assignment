import { useState, useEffect } from "react";
import { addStudent } from "../services/studentsApi";
import { getClasses } from "../services/ClassesApi";
import { getSections } from "../services/SectionApi";
import "../assets/css/addstudentmoda.css"
type Props = Readonly<{
  onClose: () => void;
  refreshStudents: () => void;
}>;

type ClassItem = {
  class_id: number;
  class_name: string;
};

type SectionItem = {
  section_id: number;
  section_name: string;
  class_id: number;
};

export default function AddStudentModal({ onClose, refreshStudents }: Props) {
  const [errors, setErrors] = useState({
  name: "",
  email: "",
  phone: "",
  classId: "",
  sectionId: "",
  password: "",
});
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [classId, setClassId] = useState("");
  const [sectionId, setSectionId] = useState("");
  const [classes, setClasses] = useState<ClassItem[]>([]);
  const [sections, setSections] = useState<SectionItem[]>([]);
  const [password, setPassword] = useState("");

  useEffect(() => {
    const loadData = async () => {
      const [classesData, sectionsData] = await Promise.all([
        getClasses(),
        getSections(),
      ]);

      setClasses(classesData);
      setSections(sectionsData);
    };

    loadData();
  }, []);
  const handleAddStudent = async () => {
  const newErrors = {
    name: "",
    email: "",
    phone: "",
    classId: "",
    sectionId: "",
    password: "",
  };

  if (!name.trim()) {
    newErrors.name = "Name is required";
  }

  if (!email.trim()) {
    newErrors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    newErrors.email = "Invalid email address";
  }

  if (!/^\d{10}$/.test(phone)) {
    newErrors.phone = "Phone number must be 10 digits";
  }

  if (!classId) {
    newErrors.classId = "Please select a class";
  }

  if (!sectionId) {
    newErrors.sectionId = "Please select a section";
  }

  if (password.length < 6) {
    newErrors.password = "Password must be at least 6 characters";
  }

  setErrors(newErrors);

  if (Object.values(newErrors).some((error) => error !== "")) {
    return;
  }

  await addStudent(
    name,
    email,
    phone,
    Number(classId),
    Number(sectionId),
    password,
  );

  refreshStudents();
  onClose();
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

{errors.name && <p className="error-text">{errors.name}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
  id="email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
/>

{errors.email && <p className="error-text">{errors.email}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input
  id="password"
  type="password"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
/>

{errors.password && (
  <p className="error-text">{errors.password}</p>
)}
        </div>

        <div className="form-group">
          <label htmlFor="phone">Phone</label>
          <input
  id="phone"
  value={phone}
  onChange={(e) => setPhone(e.target.value)}
/>

{errors.phone && <p className="error-text">{errors.phone}</p>}
        </div>

        <div className="form-group">
          <label htmlFor="classId">Class</label>

          <select
            id="classId"
            value={classId}
            onChange={(e) => setClassId(e.target.value)}
          >
            {errors.classId && (
  <p className="error-text">{errors.classId}</p>
)}
            <option value="">Select Class</option>

            {classes.map((c) => (
              <option key={c.class_id} value={c.class_id}>
                {c.class_name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="sectionId">Section</label>

          <select
            id="sectionId"
            value={sectionId}
            onChange={(e) => setSectionId(e.target.value)}
          >
            {errors.sectionId && (
  <p className="error-text">{errors.sectionId}</p>
)}
            <option value="">Select Section</option>

            {sections
              .filter((s) => s.class_id === Number(classId))
              .map((s) => (
                <option key={s.section_id} value={s.section_id}>
                  {s.section_name}
                </option>
              ))}
          </select>
        </div>

        <div className="modal-actions">
          <button onClick={handleAddStudent} className="modal-add-btn">
            Add
          </button>

          <button onClick={onClose} className="modal-cancel-btn">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
