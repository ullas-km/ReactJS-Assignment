import { useEffect, useState } from "react";

import AddFeeModal from "../components/AddFeeModal";
import EditFeeModal from "../components/EditFeeModal";

import { getFees, deleteFee } from "../services/FeesApi";

import "../assets/css/viewstudents.css";
import "../assets/css/viewfees.css";

interface Fee {
  id: number;
  student_id: number;
  amount: number;
  due_date: string;
  status: string;
}

export default function ViewFees() {
  const [fees, setFees] = useState<Fee[]>([]);

  const [showAddModal, setShowAddModal] = useState(false);

  const [editingFee, setEditingFee] = useState<Fee | null>(null);

  const fetchFees = async () => {
    const data = await getFees();

    setFees(data);
  };

  useEffect(() => {
    fetchFees();
  }, []);

  const handleDelete = async (id: number) => {
    await deleteFee(id);

    fetchFees();
  };

  return (
    <div className="students-page">
      <div className="students-header">
        <h2>Fees Management</h2>

        <button className="add-btn" onClick={() => setShowAddModal(true)}>
          Add Fee
        </button>
      </div>

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
            {fees.map((f) => (
              <tr key={f.id}>
                <td>{f.id}</td>
                <td>{f.student_id}</td>
                <td>{f.amount}</td>
                <td>{new Date(f.due_date).toLocaleDateString()}</td>
                <td>{f.status}</td>

                <td className="actions">
                  <button className="edit-btn" onClick={() => setEditingFee(f)}>
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

      {editingFee && (
        <EditFeeModal
          fee={editingFee}
          onClose={() => setEditingFee(null)}
          refreshFees={fetchFees}
        />
      )}
    </div>
  );
}
