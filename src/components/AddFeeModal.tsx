import { useState, useEffect } from "react";

import { addFee } from "../services/FeesApi";
import { getStudents } from "../services/studentsApi";

import "../assets/css/addFeeModal.css";

type Props = Readonly<{
  onClose: () => void;
  refreshFees: () => void;
}>;

interface Student {
  student_id: number;
  name: string;
}

export default function AddFeeModal({ onClose, refreshFees }: Props) {
  const [studentId, setStudentId] = useState("");

  const [amount, setAmount] = useState("");

  const [dueDate, setDueDate] = useState("");

  const [status, setStatus] = useState("pending");
  const [students, setStudents] = useState<Student[]>([]);

  const [errors, setErrors] = useState({
    studentId: "",
    amount: "",
    dueDate: "",
    status: "",
  });

  const validate = () => {
    const newErrors = {
      studentId: "",
      amount: "",
      dueDate: "",
      status: "",
    };

    let valid = true;

    if (!studentId) {
      newErrors.studentId = "Please select a student";
      valid = false;
    }

    if (!amount) {
      newErrors.amount = "Amount is required";
      valid = false;
    } else if (Number(amount) <= 0) {
      newErrors.amount = "Amount must be greater than 0";
      valid = false;
    }

    if (!dueDate) {
      newErrors.dueDate = "Please select a due date";
      valid = false;
    } else {
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      const selectedDate = new Date(dueDate);

      if (selectedDate < today) {
        newErrors.dueDate = "Due date cannot be in the past";
        valid = false;
      }
    }

    if (!status) {
      newErrors.status = "Please select a status";
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  // const handleAddFee = async () => {
  //   await addFee(Number(studentId), Number(amount), dueDate, status);

  //   refreshFees();

  //   onClose();
  // };

  const handleAddFee = async () => {
    if (!validate()) return;

    await addFee(Number(studentId), Number(amount), dueDate, status);

    refreshFees();
    onClose();
  };

  useEffect(() => {
    const fetchStudents = async () => {
      try {
        const data = await getStudents();
        setStudents(data);
      } catch (error) {
        console.error("Failed to load students", error);
      }
    };

    void fetchStudents();
  }, []);

  return (
    <div className="fees-modal-overlay">
      <div className="fees-modal-box">
        <h2>Add Fee</h2>

        {/* <div className="form-group">
          <label htmlFor="studentId">Student ID</label>

          <input
            id="studentId"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
          />
        </div> */}
        <div className="fees-form-group">
          <label htmlFor="studentId">Student</label>

          <select
           className={errors.studentId ? "fees-error" : ""}
            id="studentId"
            value={studentId}
            onChange={(e) => {
              setStudentId(e.target.value);
              setErrors({ ...errors, studentId: "" });
            }}
          >
            <option value="">Select Student</option>

            {students.map((student) => (
              <option key={student.student_id} value={student.student_id}>
                {student.name} (ID: {student.student_id})
              </option>
            ))}
          </select>
          {errors.studentId && (
  <span className="fees-error-text">
    {errors.studentId}
  </span>
)}
        </div>

        <div className="fees-form-group">
          <label htmlFor="amount">Amount</label>

          <input
          className={errors.amount ? "fees-error" : ""}
            id="amount"
            type="number"
            value={amount}
            onChange={(e) => {
  setAmount(e.target.value);
  setErrors({ ...errors, amount: "" });
}}
          />
          {errors.amount && (
  <span className="fees-error-text">
    {errors.amount}
  </span>
)}
        </div>

        <div className="fees-form-group">
          <label htmlFor="duedate">Due Date</label>

          <input
           className={errors.dueDate ? "fees-error" : ""}
            id="duedate"
            type="date"
            value={dueDate}
           onChange={(e) => {
  setDueDate(e.target.value);
  setErrors({ ...errors, dueDate: "" });
}}
          />
          {errors.dueDate && (
  <span className="fees-error-text">
    {errors.dueDate}
  </span>
)}
        </div>

        <div className="fees-form-group">
          <label htmlFor="status">Status</label>

          <select
            className={errors.status ? "fees-error" : ""}
            id="status"
            value={status}
            onChange={(e) => {
  setStatus(e.target.value);
  setErrors({ ...errors, status: "" });
}}
          >
            <option value="pending">Pending</option>
            <option value="paid">Paid</option>
            <option value="overdue">Overdue</option>
          </select>
          {errors.status && (
  <span className="fees-error-text">
    {errors.status}
  </span>
)}
        </div>

        <div className="fees-modal-actions">
          <button className="fees-modal-add-btn" onClick={handleAddFee}>
            Add
          </button>

          <button className="fees-modal-cancel-btn" onClick={onClose}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
