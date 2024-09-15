import React, { useRef, useState } from "react";
import PropTypes from "prop-types";
import { Transition } from "@headlessui/react";

const Modal = ({ open, onClose, children, type, addItem }) => {
  const modalRef = useRef(null);

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    imageUrl: "",
    price: "",
    stock: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (type === "create") {
      addItem(formData);
      setFormData({
        name: "",
        category: "",
        imageUrl: "",
        price: "",
        stock: "",
      });
    }
    onClose();
  };

  const handleOverlayClick = (e) => {
    if (modalRef.current === e.target) {
      onClose();
    }
  };

  if (!open) return null;

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

// Perbaikan: Mengganti `PropTypes` dengan `propTypes`
Modal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node,
  type: PropTypes.string,
  addItem: PropTypes.func,
};

export default Modal;
