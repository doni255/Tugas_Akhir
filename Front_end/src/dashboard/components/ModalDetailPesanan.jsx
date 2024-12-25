import React from "react";

const ModalDetailPesanan = ({ isOpen, onClose, data }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-md p-6">
        <h2 className="text-xl font-bold text-gray-800 mb-4 text-center">
          Data User 😁
        </h2>
        <div className="space-y-4">
          <div className="space-y-4">
            <div className="flex justify-between">
              <span className="font-semibold text-gray-600">Nama:</span>
              <span className="text-gray-800">{data.user.nama_user}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold text-gray-600">Email:</span>
              <span className="text-gray-800">{data.user.email_user}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold text-gray-600">No Telpon:</span>
              <span className="text-gray-800">{data.user.no_telpon_user}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold text-gray-600">Kota:</span>
              <span className="text-gray-800">{data.user.kota_user}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-semibold text-gray-600">Alamat:</span>
              <span className="text-gray-800">{data.user.alamat_user}</span>
            </div>
          </div>
        </div>
        <button
          onClick={onClose}
          className="mt-6 w-full bg-blue-500 text-white font-semibold py-2 rounded-md hover:bg-blue-600 transition"
        >
          Tutup
        </button>
      </div>
    </div>
  );
};

export default ModalDetailPesanan;
