import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaFileExcel, FaFilePdf } from "react-icons/fa";
import jsPDF from "jspdf";
import "jspdf-autotable"; // Import for auto table

export default function Pengeluaran() {
  const [pengeluaran, setPengeluaran] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = Array.isArray(pengeluaran)
    ? pengeluaran.slice(indexOfFirstItem, indexOfLastItem)
    : [];

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const fetchPengeluaran = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/pengeluaran");
      console.log("Data fetched from API:", response.data);
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

  // Function to format currency in IDR
  const formatIDR = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(amount);
  };

  const handleDownloadPdf = () => {
    const doc = new jsPDF();

    // Title
    doc.setFontSize(18);
    doc.text("Laporan Pengeluaran", 14, 22);

    // Define the table content
    const tableColumn = [
      "No",
      "Nama Product",
      "Harga Beli",
      "Pajak",
      "Sub Total",
      "Tanggal",
    ];
    const tableRows = [];

    currentItems.forEach((item, index) => {
      const pengeluaranData = [
        (index + 1).toString().padStart(6, "0"),
        item.nama_product,
        item.harga_beli.toLocaleString("id-ID", {
          style: "currency",
          currency: "IDR",
        }),
        item.pajak.toLocaleString("id-ID", {
          style: "currency",
          currency: "IDR",
        }),
        item.harga_total.toLocaleString("id-ID", {
          style: "currency",
          currency: "IDR",
        }),
        formatTanggal(item.tanggal),
      ];
      tableRows.push(pengeluaranData);
    });

    // Generate the table in the PDF
    doc.autoTable({
      head: [tableColumn],
      body: tableRows,
      startY: 30,
      theme: "grid",
      styles: { cellPadding: 5, fontSize: 10 },
      columnStyles: {
        0: { halign: "center" },
        1: { halign: "left" },
        2: { halign: "right" },
        3: { halign: "right" },
        4: { halign: "right" },
        5: { halign: "center" },
      },
    });

    // Calculate totals
    const totalPengeluaran = currentItems.reduce(
      (acc, item) => acc + item.harga_total,
      0
    );
    const totalPajak = currentItems.reduce((acc, item) => acc + item.pajak, 0);

    // Format totals to IDR currency
    const formattedTotalPengeluaran = totalPengeluaran.toLocaleString("id-ID", {
      style: "currency",
      currency: "IDR",
    });
    const formattedTotalPajak = totalPajak.toLocaleString("id-ID", {
      style: "currency",
      currency: "IDR",
    });

    // Summary section
    const summaryY = doc.autoTable.previous.finalY + 10;
    doc.setFontSize(14);
    doc.text(`Total Pengeluaran: ${formattedTotalPengeluaran}`, 14, summaryY);
    doc.text(`Total Pajak: ${formattedTotalPajak}`, 14, summaryY + 10);
    doc.text(
      `Grand Total: ${(totalPengeluaran + totalPajak).toLocaleString("id-ID", {
        style: "currency",
        currency: "IDR",
      })}`,
      14,
      summaryY + 20
    );

    // Save the PDF
    doc.save("laporan-pengeluaran.pdf");
  };

  if (pengeluaran === null) {
    return (
      <main className="p-6 bg-gray-100 min-h-screen">
        <div className="bg-white p-6 rounded-lg shadow-lg text-center">
          <h1 className="text-2xl font-bold text-gray-700">
            Loading Pengeluaran Data...
          </h1>
        </div>
      </main>
    );
  }

  return (
    <main className="p-6 bg-gray-100 min-h-screen">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold text-gray-700">
            Laporan Pengeluaran
          </h1>
          <div className="flex space-x-4">
            <button
              onClick={handleDownloadPdf}
              className="flex items-center bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow-md"
            >
              <FaFilePdf className="mr-2" /> PDF
            </button>
            <button className="flex items-center bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg shadow-md">
              <FaFileExcel className="mr-2" /> Excel
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full bg-white border-collapse">
            <thead>
              <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-center">No</th>
                <th className="py-3 px-6 text-left">Nama Product</th>
                <th className="py-3 px-6 text-right">Pajak</th>
                <th className="py-3 px-6 text-right">Harga Beli</th>
                <th className="py-3 px-6 text-right">Sub Total</th>
                <th className="py-3 px-6 text-center">Tanggal</th>
              </tr>
            </thead>
            <tbody className="text-gray-700 text-sm">
              {currentItems.map((item, index) => (
                <tr
                  key={item.id_pembelian_barang}
                  className="border-b border-gray-200 hover:bg-gray-100"
                >
                  <td className="py-3 px-6 text-center">
                    {(index + 1).toString().padStart(6, "0")}
                  </td>
                  <td className="py-3 px-6 text-left">{item.nama_product}</td>
                  <td className="py-3 px-6 text-right">
                    {formatIDR(item.pajak)}
                  </td>
                  <td className="py-3 px-6 text-right">
                    {formatIDR(item.harga_beli)}
                  </td>
                  <td className="py-3 px-6 text-right">
                    {formatIDR(item.harga_total)}
                  </td>
                  <td className="py-3 px-6 text-center">
                    {formatTanggal(item.tanggal)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-6">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <button
            className="ml-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            onClick={() => paginate(currentPage + 1)}
            disabled={
              currentPage >= Math.ceil(pengeluaran.length / itemsPerPage)
            }
          >
            Next
          </button>
        </div>
      </div>
    </main>
  );
}
