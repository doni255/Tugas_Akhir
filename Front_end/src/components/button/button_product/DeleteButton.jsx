import React from "react";

 function DeleteButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-300 transition mx-2"
    >
      Delete
    </button>
  );
}

export default DeleteButton;
