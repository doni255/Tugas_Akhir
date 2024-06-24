// src/button/button_product/Modal.js
import React, { useEffect, useRef } from "react";

const Modal = ({ open, onClose, children }) => {
  const modalRef = useRef(null);

  if (!open) return null;

  const handleOverlayClick = (e) => {
    if (modalRef.current === e.target) {
      onClose();
    }
  };

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center z-50 ${
        open ? "opacity-100" : "opacity-0 pointer-events-none"
      }`}
    >
      <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300"></div>

      {/* Modal Content */}
      <div
        className={`bg-white p-6 rounded-lg shadow-lg transform transition-transform ease-in-out duration-300 max-w-md ${
          open ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <button
          onClick={onClose}
          aria-label="Close modal"
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 focus:outline-none"
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
