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
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  const refreshFees = async () => {
    try {
      setLoading(true);

      const data = await getFees();
      setFees(data);
    } catch (error) {
      console.error("Failed to fetch fees:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void refreshFees();
  }, []);

  const handleDelete = async (id: number) => {
    await deleteFee(id);
    await refreshFees();
  };

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;

  const currentFees = fees.slice(indexOfFirstRow, indexOfLastRow);

  const totalPages = Math.ceil(fees.length / rowsPerPage);

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
            {loading ? (
              <tr>
                <td colSpan={6} className="loading-cell">
                  Loading fees...
                </td>
              </tr>
            ) : (
              currentFees.map((f) => (
                <tr key={f.id}>
                  <td>{f.id}</td>
                  <td>{f.student_id}</td>
                  <td>{f.amount}</td>
                  <td>{new Date(f.due_date).toLocaleDateString()}</td>
                  <td>{f.status}</td>

                  <td className="actions">
                    <button
                      className="edit-btn"
                      onClick={() => setEditingFee(f)}
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
              ))
            )}
          </tbody>
        </table>
      </div>
      {!loading && fees.length > rowsPerPage && (
        <div className="pagination">
          <button
            disabled={currentPage === 1}
            onClick={() => setCurrentPage(currentPage - 1)}
          >
            Prev
          </button>

          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i + 1}
              className={currentPage === i + 1 ? "active-page" : ""}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </button>
          ))}

          <button
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage(currentPage + 1)}
          >
            Next
          </button>
        </div>
      )}

      {showAddModal && (
        <AddFeeModal
          onClose={() => setShowAddModal(false)}
          refreshFees={refreshFees}
        />
      )}

      {editingFee && (
        <EditFeeModal
          fee={editingFee}
          onClose={() => setEditingFee(null)}
          refreshFees={refreshFees}
        />
      )}
    </div>
  );
}
