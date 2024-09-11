import React, { useEffect, useState } from "react";
import RecentOrders from "./RecentOrders";
import axios from "axios";

import { FaFileExcel, FaFilePdf } from "react-icons/fa";

export default function Pengeluaran() {
  const [pengeluaran, setPengeluaran] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = Array.isArray(pengeluaran)
    ? pengeluaran.slice(indexOfFirstItem, indexOfLastItem)
    : [];

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const fetchPengeluaran = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/pengeluaran");
      console.log("Data fetched from API:", response.data); // Tambahkan log ini
      setPengeluaran(response.data);
    } catch (error) {
      console.log(error);
      setPengeluaran([]);
    }
  };
  useEffect(() => {
    fetchPengeluaran();
  }, []);

  const formatTanggal = (tanggal) => {
    const date = new Date(tanggal);
    return date.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  return (
    <main>
      {/* <div className="flex items-center justify-between py-7 px-10">
        <div>
          <h1 className="text-2xl font-semibold loading-relaxed text-gray-800">
            Here`s Your Customers 😁
          </h1>
          <p className="text-sm font-medium text-gray-500">
            Let's grow to your business! Create your product and upload here
          </p>
        </div>
      </div> */}

      <div className="bg-white px-4 pt-3 pb-4 rounded-sm border-gray-200 flex-1">
        <strong className="text-2xl font-semibold loading-relaxed text-gray-800">
          Pengeluaran
        </strong>

        <div className="mt-3"></div>
        <div className="overflow-x-auto">
          <div className="w-full">
            <div className="bg-white px-4  pb-4 rounded-sm border-gray-200 max-h-screen overflow-y-auto">
              {/* <strong className="text-gray-700 font-medium">Recent Orders</strong> */}
              <div className="mt-3">
                <table className="w-full text-gray-700 border-x border-gray-200 rounded-sm">
                  <thead>
                    <tr className="font-semibold">
                      <td className="py-2 px-2 text-center">No</td>
                      <td className="py-2 px-2 text-center">Nama Product</td>
                      <td className="py-2 px-2 text-center">Sub Total</td>
                      {/* <td className="py-4 px-4 text-center">Jumlah</td> */}
                      <td className="py-2 px-2 text-center">Tanggal</td>
                      <td className="py-2 px-2 text-center">Tools</td>
                    </tr>
                  </thead>
                  <tbody>
                    {currentItems.map((pengeluaran, index) => {
                      console.log(`Item #${index}:`, pengeluaran); // Tambahkan log ini
                      return (
                        <tr
                          key={pengeluaran.id_pembelian_barang}
                          className="hover:bg-gray-100"
                        >
                          <td className="text-center">
                            {(index + 1).toString().padStart(6, "0")}
                          </td>
                          <td className="text-center">
                            {pengeluaran.nama_product}
                          </td>

                          <td className="text-center">
                            {pengeluaran.harga_total}
                          </td>
                          {/* <td></td> */}
                          <td className="text-center">{formatTanggal(pengeluaran.tanggal)}</td>
                          <td className="relative">
                            <div className="absolute inset-0 flex items-center justify-center">
                              <FaFilePdf className="mx-1" />
                              <FaFileExcel className="mx-1" />
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
