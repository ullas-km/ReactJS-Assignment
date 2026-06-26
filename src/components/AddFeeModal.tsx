import { useState, useEffect } from "react";

import { addFee } from "../services/FeesApi";
import { getStudents } from "../services/studentsApi";

import "../assets/css/addFeeModal.css"

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

  const handleAddFee = async () => {
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
    id="studentId"
    value={studentId}
    onChange={(e) => setStudentId(e.target.value)}
  >
    <option value="">Select Student</option>

    {students.map((student) => (
      <option
        key={student.student_id}
        value={student.student_id}
      >
        {student.name} (ID: {student.student_id})
      </option>
    ))}
  </select>
</div>

        <div className="fees-form-group">
          <label htmlFor="amount">Amount</label>

          <input
            id="amount"
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />
        </div>

        <div className="fees-form-group">
          <label htmlFor="duedate">Due Date</label>

          <input
            id="duedate"
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </div>

        <div className="fees-form-group">
          <label htmlFor="status">Status</label>

          <select
            id="status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="pending">Pending</option>
            <option value="paid">Paid</option>
            <option value="overdue">Overdue</option>
          </select>
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
