// src/EditButton.js
import React from "react";

const EditButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="bg-yellow-500 text-white px-3 py-2 rounded hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
    >
      Pembelian
    </button>
  );
};

export default EditButton;
