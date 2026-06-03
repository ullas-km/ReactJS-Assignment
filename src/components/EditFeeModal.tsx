import { useState } from "react";

import { updateFee } from "../services/FeesApi";

type Props = Readonly<{
  fee: any;
  onClose: () => void;
  refreshFees: () => void;
}>;

export default function EditFeeModal({
  fee,
  onClose,
  refreshFees,
}: Props) {
  const [studentId, setStudentId] =
    useState(String(fee.student_id));

  const [amount, setAmount] =
    useState(String(fee.amount));

  const [dueDate, setDueDate] =
    useState(
      fee.due_date?.split("T")[0]
    );

  const [status, setStatus] =
    useState(fee.status);

  const handleUpdate = async () => {
    await updateFee(
      fee.id,
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
        <h2>Edit Fee</h2>

        <div className="form-group">
          <label htmlFor="editStudentId">
            Student ID
          </label>

          <input
            id="editStudentId"
            value={studentId}
            onChange={(e) =>
              setStudentId(
                e.target.value
              )
            }
          />
        </div>

        <div className="form-group">
          <label htmlFor="editAmount">
            Amount
          </label>

          <input
            id="editAmount"
            type="number"
            value={amount}
            onChange={(e) =>
              setAmount(
                e.target.value
              )
            }
          />
        </div>

        <div className="form-group">
          <label htmlFor="editDueDate">
            Due Date
          </label>

          <input
            id="editDueDate"
            type="date"
            value={dueDate}
            onChange={(e) =>
              setDueDate(
                e.target.value
              )
            }
          />
        </div>

        <div className="form-group">
          <label htmlFor="editStatus">
            Status
          </label>

          <select
            id="editStatus"
            value={status}
            onChange={(e) =>
              setStatus(
                e.target.value
              )
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