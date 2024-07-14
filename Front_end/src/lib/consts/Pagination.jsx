import React from "react";

const Pagination = ({ itemsPerPage, totalItems, paginate, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <div className={"rounded-b-lg border-t border-gray-200 px-4 py-2"}>
      <ol className="flex justify-end gap-1 text-xs font-medium">
        <li>
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className={`inline-flex size-8 items-center justify-center rounded border ${
              currentPage === 1
                ? "border-gray-100 bg-white text-gray-400 cursor-not-allowed"
                : "border-gray-100 bg-white text-gray-900 hover:bg-gray-100"
            }`}
          >
            <span className="sr-only">Prev Page</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3 w-3"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </li>

        {pageNumbers.map((number) => (
          <li key={number}>
            <button
              onClick={() => paginate(number)}
              className={`block size-8 rounded border ${
                currentPage === number
                  ? "border-blue-600 bg-blue-600 text-white"
                  : "border-gray-100 bg-white text-gray-900 hover:bg-gray-100"  
              }`}
            >
              {number}
            </button>
          </li>
        ))}

        <li>
          <button
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === pageNumbers.length}
            className={`inline-flex size-8 items-center justify-center rounded border ${
              currentPage === pageNumbers.length
                ? "border-gray-100 bg-white text-gray-400 cursor-not-allowed"
                : "border-gray-100 bg-white text-gray-900 hover:bg-gray-100"
            }`}
          >
            <span className="sr-only">Next Page</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-3 w-3"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </li>
      </ol>
    </div>

    // <nav className="mt-4">
    //   <ul className="inline-flex -space-x-px">
    //     <li>
    //       <button
    //         onClick={() => paginate(currentPage - 1)}
    //         disabled={currentPage === 1}
    //         className={`px-3 py-2 ml-0 leading-tight ${
    //           currentPage === 1
    //             ? "cursor-not-allowed text-gray-400"
    //             : "bg-white text-gray-500 hover:bg-gray-100 hover:text-gray-700"
    //         } border border-gray-300`}
    //       >
    //         Previous
    //       </button>
    //     </li>
    //     {pageNumbers.map((number) => (
    //       <li key={number}>
    //         <button
    //           onClick={() => paginate(number)}
    //           className={`px-3 py-2 ml-0 leading-tight ${
    //             currentPage === number
    //               ? "bg-indigo-600 text-white"
    //               : "bg-white text-gray-500 hover:bg-gray-100 hover:text-gray-700"
    //           } border border-gray-300`}
    //         >
    //           {number}
    //         </button>
    //       </li>
    //     ))}
    //     <li>
    //       <button
    //         onClick={() => paginate(currentPage + 1)}
    //         disabled={currentPage === pageNumbers.length}
    //         className={`px-3 py-2 ml-0 leading-tight ${
    //           currentPage === pageNumbers.length
    //             ? "cursor-not-allowed text-gray-400"
    //             : "bg-white text-gray-500 hover:bg-gray-100 hover:text-gray-700"
    //         } border border-gray-300`}
    //       >
    //         Next
    //       </button>
    //     </li>
    //   </ul>
    // </nav>
  );
};

export default Pagination;
