import React, { useEffect, useState } from "react";
import RecentOrders from "./RecentOrders";
import axios from "axios";

import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';


export default function Pendapatan() {
  const [pendapatan, setPendapatan] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = Array.isArray(pendapatan)
    ? pendapatan.slice(indexOfFirstItem, indexOfLastItem)
    : [];

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const fetchPendapatan = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/pendapatan");
      console.log("Data fetched from API:", response.data); // Tambahkan log ini
      setPendapatan(response.data);
    } catch (error) {
      console.log(error);
      setPendapatan([]);
    }
  };
  useEffect(() => {
    fetchPendapatan();
  }, []);

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
          Pendapatan
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
                      <td className="py-4 px-4 text-center">No</td>
                      <td className="py-4 px-4 text-center">Tanggal</td>
                      <td className="py-4 px-4 text-center">Nama Product</td>
                      {/* <td className="py-4 px-4 text-center">Jumlah</td> */}
                      <td className="py-4 px-4 text-center">Subtotal</td>
                      <td className="py-4 px-4 text-center">Tools</td>
                    </tr>
                  </thead>
                  <tbody>
                    {currentItems.map((pendapatan, index) => {
                      console.log(`Item #${index}:`, pendapatan); // Tambahkan log ini
                      return (
                        <tr
                          key={pendapatan.id_penjualan_barang}
                          className="hover:bg-gray-100"
                        >
                          <td className="text-center">
                            {pendapatan.id_penjualan_barang}
                          </td>
                          <td className="text-center">{pendapatan.tanggal}</td>
                          <td className="text-center">
                            {pendapatan.nama_product}
                          </td>
                          {/* <td></td> */}
                          <td className="text-center">
                            {pendapatan.harga_total}
                          </td>
                          <td>
                            <PictureAsPdfIcon />
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
