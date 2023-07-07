// src/components/SimpleModal.tsx
import React from "react";
import { SimpleModalProps } from "../types/types";

export const SimpleModal: React.FC<SimpleModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,0.3)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}>
      <div
        style={{
          backgroundColor: "white",
          padding: "1em",
          width: "80%",
          maxWidth: "400px",
        }}>
        {children}
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};
