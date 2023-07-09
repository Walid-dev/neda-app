// src/components/SimpleModal.tsx
import React from "react";
import { SimpleModalProps } from "../types/types";
import "../styles/simple_modal.css";

export const SimpleModal: React.FC<SimpleModalProps> = ({
  modalTitle,
  type,
  size,
  isSimpleModalOpen,
  onClose,
  children,
  onConfirm,
}) => {
  if (!isSimpleModalOpen) return null;

  const modalTypeClass = type ? `modal_${type}` : "";

  return (
    <div id={`${modalTypeClass}_container`} className="simple_modal_container">
      <div id={`${modalTypeClass}_content`} className={`simple_modal_content ${size}`}>
        <h2>{modalTitle}</h2>
        {children}
        <button onClick={onClose}>Close</button>
        {onConfirm && <button onClick={onConfirm}>Confirm</button>} {/* New Confirm button */}
      </div>
    </div>
  );
};
