import React from "react";

 function TambahStockProduct({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="inline-flex gap-x-2 items-center py-2.5 px-5 text-white bg-yellow-400 rounded-xl hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1"
    >
      Tambah Stock
    </button>
  );
}

export default TambahStockProduct;
