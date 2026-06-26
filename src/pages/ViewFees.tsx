import { useEffect, useState } from "react";

import AddFeeModal from "../components/AddFeeModal";
import EditFeeModal from "../components/EditFeeModal";
import DeleteModal from "../components/DeleteModal";

import { getFees, deleteFee } from "../services/FeesApi";

import "../assets/css/viewfees.css";

interface Fee {
  id: number;
  student_id: number;
  student_name: string;
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
  const [deleteFeeId, setDeleteFeeId] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
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

  const confirmDelete = async () => {
    if (!deleteFeeId) return;

    try {
      await deleteFee(deleteFeeId);
      await refreshFees();
    } catch (error) {
      console.error("Failed to delete fee:", error);
    } finally {
      setDeleteFeeId(null);
    }
  };

  const indexOfLastRow = currentPage * rowsPerPage;
  const indexOfFirstRow = indexOfLastRow - rowsPerPage;

  const filteredFees = fees.filter(
    (fee) =>
      fee.student_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      fee.student_id.toString().includes(searchTerm),
  );

  const currentFees = filteredFees.slice(indexOfFirstRow, indexOfLastRow);

  const totalPages = Math.ceil(filteredFees.length / rowsPerPage);

  let tableContent: React.ReactNode;

  if (loading) {
    tableContent = (
      <tr>
        <td colSpan={6} className="loading-cell">
          Loading fees...
        </td>
      </tr>
    );
  } else if (filteredFees.length === 0) {
    tableContent = (
      <tr>
        <td colSpan={6} className="loading-cell">
          {searchTerm
            ? `No students found for "${searchTerm}"`
            : "No fee records found"}
        </td>
      </tr>
    );
  } else {
    tableContent = currentFees.map((f) => (
      <tr key={f.id}>
        <td>{f.student_id}</td>
        <td>{f.student_name}</td>
        <td>{f.amount}</td>
        <td>{new Date(f.due_date).toLocaleDateString()}</td>
        <td>{f.status}</td>

        <td className="actions">
          <button className="edit-btn" onClick={() => setEditingFee(f)}>
            Edit
          </button>

          <button className="delete-btn" onClick={() => setDeleteFeeId(f.id)}>
            Delete
          </button>
        </td>
      </tr>
    ));
  }

  return (
    <div className="students-page">
      <div className="students-header">
        <div className="header-left">
          <h2>Fees Management</h2>

          <div className="search-box">
            <input
              type="text"
              placeholder="Search by Student ID or Name..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
            />
          </div>
        </div>

        <button className="add-btn" onClick={() => setShowAddModal(true)}>
          Add Fee
        </button>
      </div>

      <div className="table-wrapper">
        <table className="students-table">
          <thead>
            <tr>
              <th>Student ID</th>
              <th>Student Name</th>
              <th>Amount</th>
              <th>Due Date</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>{tableContent}</tbody>
        </table>
      </div>
      {!loading && filteredFees.length > rowsPerPage && (
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
      <DeleteModal
        isOpen={deleteFeeId !== null}
        title="Delete Fee"
        message="Are you sure you want to delete this fee record?"
        onConfirm={confirmDelete}
        onCancel={() => setDeleteFeeId(null)}
      />
    </div>
  );
}
