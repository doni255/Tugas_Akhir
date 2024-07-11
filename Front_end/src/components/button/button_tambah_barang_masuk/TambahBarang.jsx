import React from "react";
import { HiPlus } from "react-icons/hi";

function TambahBarang() {
  return (
    <div className="">
      <button className="inline-flex gap-x-2 items-center py-2.5 px-5 text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1">
        <HiPlus className="w-4 h-4 fill-current" />
        <span className="text-sm font-semibold tracking-wide">Tambah Item</span>
      </button>
    </div>
  );
}

export default TambahBarang;
