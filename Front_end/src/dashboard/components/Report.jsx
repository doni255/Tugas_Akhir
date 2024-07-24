import React from "react";

export default function Report() {
  return (
    <main>
      <div className="flex items-center justify-between py-7 px-10">
        <div>
          <h1 className="text-2xl font-semibold loading-relaxed text-gray-800">
            Here`s Your Report 
          </h1>
          <p className="text-sm font-medium text-gray-500">
            Let's grow to your business! Create your product and upload here
          </p>
        </div>
      </div>

      <div className="overflow-x-auto">
        <div className="w-full">
          <table className="w-full text-gray-700 border-x border-gray-200 rounded-sm"></table>
        </div>
      </div>
    </main>
  );
}
