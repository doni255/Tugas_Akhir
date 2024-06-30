// src/EditButton.js
import React from "react";

const EditButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300 transition"
    >
      Edit
    </button>
  );
};

export default EditButton;
