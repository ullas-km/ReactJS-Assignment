import { useEffect, useState } from "react";

import AddFeeModal from "../components/AddFeeModal";

import {
  getFees,
  deleteFee,
  updateFee
} from "../services/FeesApi";

import "../assets/css/viewstudents.css";

export default function ViewFees() {

  const [fees, setFees] = useState<any[]>([]);

  const [showAddModal, setShowAddModal] =
    useState(false);

    const [editId, setEditId] = useState<number | null>(null);

const [studentId, setStudentId] = useState("");
const [amount, setAmount] = useState("");
const [dueDate, setDueDate] = useState("");
const [status, setStatus] = useState("");

const handleEditClick = (fee: any) => {

  setEditId(fee.id);

  setStudentId(fee.student_id);
  setAmount(fee.amount);
  setDueDate(fee.due_date?.split("T")[0]);
  setStatus(fee.status);
};
const handleUpdate = async () => {

  if (editId === null) return;

  await updateFee(
    editId,
    Number(studentId),
    Number(amount),
    dueDate,
    status
  );

  setEditId(null);

  fetchFees();
};

  useEffect(() => {
    fetchFees();
  }, []);

  const fetchFees = async () => {

    const data = await getFees();

    setFees(data);
  };

  const handleDelete = async (id: number) => {

    await deleteFee(id);

    fetchFees();
  };

  return (

    <div className="students-page">

      <div className="students-header">

        <h2>
          Fees Management
        </h2>

        <button
          className="add-btn"
          onClick={() => setShowAddModal(true)}
        >
          Add Fee
        </button>

      </div>
      {editId !== null && (

  <div className="edit-box">

    <input
      value={studentId}
      onChange={(e) => setStudentId(e.target.value)}
    />

    <input
      value={amount}
      onChange={(e) => setAmount(e.target.value)}
    />

    <input
      type="date"
      value={dueDate}
      onChange={(e) => setDueDate(e.target.value)}
    />

    <select
      value={status}
      onChange={(e) => setStatus(e.target.value)}
    >

      <option value="pending">Pending</option>
      <option value="paid">Paid</option>
      <option value="overdue">Overdue</option>

    </select>

    <button onClick={handleUpdate}>
      Update
    </button>

    <button onClick={() => setEditId(null)}>
      Cancel
    </button>

  </div>

)}

      <div className="table-wrapper">

        <table className="students-table">

          <thead>

            <tr>
              <th>ID</th>
              <th>Student ID</th>
              <th>Amount</th>
              <th>Due Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>

          </thead>

          <tbody>

            {fees.map((f: any) => (

              <tr key={f.id}>

                <td>{f.id}</td>
                <td>{f.student_id}</td>
                <td>{f.amount}</td>
                <td>{f.due_date}</td>
                <td>{f.status}</td>

                <td className="actions">

                  <button
  className="edit-btn"
  onClick={() => handleEditClick(f)}
>
  Edit
</button>

                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(f.id)}
                  >
                    Delete
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {showAddModal && (

        <AddFeeModal
          onClose={() => setShowAddModal(false)}
          refreshFees={fetchFees}
        />

      )}

    </div>
  );
}