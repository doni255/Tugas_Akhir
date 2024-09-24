import React, { useEffect, useState } from "react";
import RecentOrders from "./RecentOrders";
import axios from "axios";
import { FaFileExcel, FaFilePdf } from "react-icons/fa";
import jsPDF from "jspdf";
import "jspdf-autotable"; // Import for auto table

export default function Pendapatan() {
  const [pendapatan, setPendapatan] = useState(null);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = Array.isArray(pendapatan)
    ? pendapatan.slice(indexOfFirstItem, indexOfLastItem)
    : [];

  const paginate = (pageNumber) => setCurrentPage(pageNumber);
  const fetchPendapatan = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/pendapatan");
      console.log("Data fetched from API:", response.data);
      setPendapatan(response.data);
    } catch (error) {
      console.log(error);
      setPendapatan([]);
    }
  };
  useEffect(() => {
    fetchPendapatan();
  }, []);

  const formatTanggal = (tanggal) => {
    const date = new Date(tanggal);
    return date.toLocaleDateString("id-ID", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    });
  };

  const handleDownloadPdf = () => {
    const doc = new jsPDF();

    // Title
    doc.setFontSize(18);
    doc.text("Laporan Pendapatan", 14, 22);

    // Define the table content
    const tableColumn = ["No", "Nama Product", "Sub Total", "Tanggal"];
    const tableRows = [];

    currentItems.forEach((item, index) => {
      const pendapatanData = [
        (index + 1).toString().padStart(6, "0"),
        item.nama_product,
        item.harga_total,
        formatTanggal(item.tanggal),
      ];
      tableRows.push(pendapatanData);
    });

    // Generate the table in the PDF
    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 30,
      theme: "grid",
    });

    // Save the PDF
    doc.save("laporan-pendapatan.pdf");
  };

  return (
    <main>
      <div className="bg-white px-4 pt-3 pb-4 rounded-sm border-gray-200 flex-1">
        <div className="flex justify-between items-center p-4 bg-white rounded-md">
          <div>
            <strong className="text-3xl font-bold tracking-wide text-gray-800">
              Pendapatan
            </strong>
          </div>
          <div className="flex space-x-4">
            <button
              onClick={handleDownloadPdf} // Handle PDF download on click
              className="flex items-center justify-center bg-red-500 hover:bg-red-600 text-white p-2 rounded-md shadow-lg transform hover:scale-105 transition-transform duration-300"
              title="Download as PDF"
            >
              <FaFilePdf size={25} />
            </button>
            <button
              className="flex items-center justify-center bg-green-500 hover:bg-green-600 text-white p-2 rounded-md shadow-lg transform hover:scale-105 transition-transform duration-300"
              title="Download as Excel"
            >
              <FaFileExcel size={25} />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <div className="w-full">
            <div className="bg-white px-4  pb-4 rounded-sm border-gray-200 max-h-screen overflow-y-auto">
              <div className="mt-3">
                <table className="w-full  text-gray-700 border-x border-gray-200 rounded-sm">
                  <thead>
                    <tr className="text-sm font-medium text-gray-700 border-b border-gray-200">
                      <td className="text-center font-semibold">No</td>
                      <td className="text-center font-semibold">
                        Nama Product
                      </td>
                      <td className="text-center font-semibold">Sub Total</td>
                      <td className="text-center font-semibold">Tanggal</td>
                    </tr>
                  </thead>
                  <tbody>
                    {currentItems.map((pendapatan, index) => {
                      return (
                        <tr
                          key={pendapatan.id_penjualan_barang}
                          className="hover:bg-blue-50 transition duration-300 ease-in-out transform hover:scale-[1.02] shadow-sm border-b border-gray-200 last:border-none"
                        >
                          <td className="py-3 px-6 text-center text-gray-700">
                            {(index + 1).toString().padStart(6, "0")}
                          </td>
                          <td className="py-3 px-6 text-center text-gray-700">
                            {pendapatan.nama_product}
                          </td>
                          <td className="py-3 px-6 text-center text-gray-700">
                            {pendapatan.harga_total}
                          </td>
                          <td className="py-3 px-6 text-center text-gray-700">
                            {formatTanggal(pendapatan.tanggal)}
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
