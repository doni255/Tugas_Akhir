import React from "react";
import RecentOrders from "./RecentOrders";
import DeleteButton from "./button/button_product/DeleteButton";

const CustomerData = [
  {
    no: "1",
    
  },
];

export default function Customers() {
  return (
    <main>
      <div className="flex items-center justify-between py-7 px-10">
        <div>
          <h1 className="text-2xl font-semibold loading-relaxed text-gray-800">
            Here`s Your Customers 😁
          </h1>
          <p className="text-sm font-medium text-gray-500">
            Let's grow to your business! Create your product and upload here
          </p>
        </div>
      </div>

      <div className="bg-white px-4 pt-3 pb-4 rounded-sm border-gray-200 flex-1">
        <strong className="text-gray-700 font-medium">Recent Orders</strong>
        <div className="mt-3">
          <table className="w-full text-gray-700 border-x border-gray-200 rounded-sm">
            <thead>
              <tr className="font-semibold">
                <td>ID</td>
                <td>Kode Pelanggan</td>
                <td>Nama</td>
                <td>Tanggal Daftar</td>
                <td>Alamat</td>
                <td>Kota</td>
                <td>No Telepon</td>
                <td>Lihat/Hapus</td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>sadsa</td>
                <td>sadsa</td>
                <td>sadsa</td>
                <td>sadsa</td>
                <td>sadsa</td>
                <td>sadsa</td>
                <td>sadsa</td>
                <td></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
}
