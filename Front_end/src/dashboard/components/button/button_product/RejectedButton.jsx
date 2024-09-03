import React from "react";

 function RejectedButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="text-red-500 hover:text-white border border-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-300"
    >
      Tolak
    </button>
  );
}

export default RejectedButton;
