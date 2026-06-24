import "../assets/css/deleteModal.css";

interface DeleteModalProps {
  isOpen: boolean;
  title?: string;
  message?: string;
  onConfirm: () => void;
  onCancel: () => void;
}

export default function DeleteModal({
  isOpen,
  title = "Confirm Delete",
  message = "Are you sure you want to delete this item?",
  onConfirm,
  onCancel,
}: DeleteModalProps) {
  if (!isOpen) return null;

  return (
    <div className="delete-modal-overlay">
      <div className="delete-modal-box">
        <h3>{title}</h3>

        <p>{message}</p>

        <div className="delete-modal-actions">
          <button className="delete-confirm-btn" onClick={onConfirm}>
            Delete
          </button>

          <button className="delete-cancel-btn" onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
