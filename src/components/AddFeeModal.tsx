// src/components/AddFeeModal.tsx

import { useState } from "react";

import { addFee } from "../services/FeesApi";

type Props = {
  onClose: () => void;
  refreshFees: () => void;
};

export default function AddFeeModal({
  onClose,
  refreshFees,
}: Props) {

  const [studentId, setStudentId] =
    useState("");

  const [amount, setAmount] =
    useState("");

  const [dueDate, setDueDate] =
    useState("");

  const [status, setStatus] =
    useState("pending");

  const handleAddFee = async () => {

    await addFee(
      Number(studentId),
      Number(amount),
      dueDate,
      status
    );

    refreshFees();

    onClose();
  };

  return (

    <div className="modal-overlay">

      <div className="modal-box">

        <h2>Add Fee</h2>

        <div className="form-group">

          <label>
            Student ID
          </label>

          <input
            value={studentId}
            onChange={(e) =>
              setStudentId(e.target.value)
            }
          />

        </div>

        <div className="form-group">

          <label>
            Amount
          </label>

          <input
            type="number"
            value={amount}
            onChange={(e) =>
              setAmount(e.target.value)
            }
          />

        </div>

        <div className="form-group">

          <label>
            Due Date
          </label>

          <input
            type="date"
            value={dueDate}
            onChange={(e) =>
              setDueDate(e.target.value)
            }
          />

        </div>

        <div className="form-group">

          <label>
            Status
          </label>

          <select
            value={status}
            onChange={(e) =>
              setStatus(e.target.value)
            }
          >

            <option value="pending">
              Pending
            </option>

            <option value="paid">
              Paid
            </option>

            <option value="overdue">
              Overdue
            </option>

          </select>

        </div>

        <div className="modal-actions">

          <button
            className="modal-add-btn"
            onClick={handleAddFee}
          >
            Add
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