import React, { useEffect, useState } from "react";
import axios from "axios";
import { FaFileExcel, FaFilePdf } from "react-icons/fa";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable"; // Import for auto table
import Pagination from "../consts/Pagination";

export default function Pengeluaran() {
  const [pengeluaran, setPengeluaran] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
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

  // Sort the pendapatan data by tanggal (newest first)
  const sortedData = pengeluaran
    ? pengeluaran.sort((a, b) => new Date(b.tanggal) - new Date(a.tanggal))
    : [];

  useEffect(() => {
    fetchPengeluaran(); // Fetch the data when the component mounts
  }, []);

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
      "Sub Total",
      "Pajak",
      "jumlah",
      "Tanggal",
    ];
    const tableRows = [];

    currentItems.forEach((item, index) => {
      const pengeluaranData = [
        (index + 1).toString().padStart(6, "0"),
        item.nama_product,
        item.harga_beli.toLocaleString("id-ID"), // Remove currency style
        item.harga_total_beli.toLocaleString("id-ID"), // Remove currency style
        item.pajak.toLocaleString("id-ID"), // Remove currency style
        item.jumlah,

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
      (acc, item) => acc + item.harga_total_beli,
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

  const handleDownloadExcel = () => {
    const wb = XLSX.utils.book_new();

    // Define the table column headers.
    const tableColumn = [
      "No",
      "Nama Product",
      "Harga Beli",
      "Sub Total",
      "Pajak",
      "Jumlah",
      "Tanggal",
    ];

    // Map through currentItems to create rows of data.
    const data = currentItems.map((item, index) => [
      (index + 1).toString().padStart(6, "0"),
      item.nama_product,
      item.harga_beli.toLocaleString("id-ID"),
      item.harga_total_beli.toLocaleString("id-ID"),
      item.pajak.toLocaleString("id-ID"),
      item.jumlah,
      new Date(item.tanggal).toLocaleDateString("id-ID"),
    ]);

    // Create the worksheet and set the data.
    const ws = XLSX.utils.aoa_to_sheet([tableColumn, ...data]);

    // Adjust column widths for a better layout.
    const columnWidths = [
      { wch: 22 }, // No
      { wch: 30 }, // Nama Product
      { wch: 20 }, // Harga Beli
      { wch: 20 }, // Sub Total
      { wch: 15 }, // Pajak
      { wch: 15 }, // Jumlah
      { wch: 15 }, // Tanggal
    ];
    ws["!cols"] = columnWidths;

    // Calculate totals for all products.
    const totalPengeluaran = currentItems.reduce(
      (acc, item) => acc + item.harga_total_beli,
      0
    );
    const totalPajak = currentItems.reduce((acc, item) => acc + item.pajak, 0);
    const grandTotal = totalPengeluaran + totalPajak;

    // Add the summary section below the table.
    const summaryStartRow = data.length + 5;
    XLSX.utils.sheet_add_aoa(
      ws,
      [
        ["Summary"],
        ["Total Pengeluaran", totalPengeluaran.toLocaleString("id-ID")],
        ["Total Pajak", totalPajak.toLocaleString("id-ID")],
        ["Grand Total", grandTotal.toLocaleString("id-ID")],
      ],
      { origin: `A${summaryStartRow}` }
    );

    // Style the summary section for better appearance.
    const summaryColumnWidths = [
      { wch: 20 }, // Adjusted width for "Summary" label
      { wch: 25 }, // Adjusted width for the totals values
    ];
    ws["!cols"] = columnWidths.concat(summaryColumnWidths);

    const range = XLSX.utils.decode_range(
      `A${summaryStartRow}:B${summaryStartRow + 3}`
    );
    for (let R = range.s.r; R <= range.e.r; ++R) {
      for (let C = range.s.c; C <= range.e.c; ++C) {
        const cellAddress = XLSX.utils.encode_cell({ r: R, c: C });
        if (!ws[cellAddress]) continue;
        ws[cellAddress].s = {
          font: { bold: true, color: { rgb: "FFFFFF" } },
          fill: { fgColor: { rgb: "FF5733" } }, // Orange background for Pengeluaran
          alignment: { horizontal: "center" },
        };
      }
    }

    // Add the worksheet to the workbook and save the file.
    XLSX.utils.book_append_sheet(wb, ws, "Laporan Pengeluaran");
    XLSX.writeFile(wb, "laporan-pengeluaran.xlsx");
  };

  return (
    <main className="bg-gray-100 min-h-screen p-6">
      <div className="bg-white px-4 pt-3 pb-4 rounded-sm border-gray-200 flex-1">
        <div className="flex justify-between items-center p-4 bg-white rounded-md">
          <div>
            <strong className="text-3xl font-bold tracking-wide text-gray-800">
              Laporan Pengeluaran
            </strong>
          </div>
          <div className="flex space-x-4">
            <button
              onClick={handleDownloadPdf}
              className="flex items-center justify-center bg-red-500 hover:bg-red-600 text-white p-2 rounded-md shadow-lg transform hover:scale-105 transition-transform duration-300"
              title="Download as PDF"
            >
              <FaFilePdf size={25} />
            </button>
            <button
              onClick={handleDownloadExcel}
              className="flex items-center justify-center bg-green-500 hover:bg-green-600 text-white p-2 rounded-md shadow-lg transform hover:scale-105 transition-transform duration-300"
              title="Download as Excel"
            >
              <FaFileExcel size={25} />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <div className="w-full">
            <div className="bg-white px-4 pb-4 rounded-sm border-gray-200 max-h-screen overflow-y-auto">
              <div className="mt-3">
                <table className="w-full text-gray-700 border-x border-gray-200 rounded-sm">
                  <thead>
                    <tr className="text-sm font-medium text-gray-700 border-b border-gray-200">
                      <td className="text-center font-semibold">No</td>
                      <td className="text-center font-semibold">
                        Nama Product
                      </td>
                      <td className="text-center font-semibold">Harga Beli</td>
                      <td className="text-center font-semibold">Pajak</td>
                      <td className="text-center font-semibold">Jumlah</td>
                      <td className="text-center font-semibold">Sub Total</td>
                      <td className="text-center font-semibold">Tanggal</td>
                      <td className="text-center font-semibold">Nota Produk</td>
                    </tr>
                  </thead>
                  <tbody>
                    {currentItems.map((item, index) => {
                      const handlePrint = () => {
                        const printContent = `
                        <div style="font-family: 'Georgia', serif; padding: 40px; border: 2px solid #000; max-width: 600px; margin: 0 auto;">
                          <div style="text-align: center; margin-bottom: 20px;">
                            <h1 style="font-size: 24px; color: #4a4a4a; border-bottom: 2px solid #000; padding-bottom: 10px;">Nota Pengeluaran</h1>
                            <h2 style="font-size: 18px; color: #333; margin-top: 5px;">Melawi Marine</h2>
                          </div>
                        
                          <div style="margin-bottom: 15px; display: flex; justify-content: space-between; border-bottom: 1px solid #e0e0e0; padding-bottom: 10px;">
                            <span style="font-weight: bold; color: #333;">Nama Product:</span>
                            <span style="color: #555;">${
                              item.nama_product
                            }</span>
                          </div>
                          
                          <div style="margin-bottom: 15px; display: flex; justify-content: space-between; border-bottom: 1px solid #e0e0e0; padding-bottom: 10px;">
                            <span style="font-weight: bold; color: #333;">Harga Beli:</span>
                            <span style="color: #555;">${formatIDR(
                              item.harga_beli
                            )}</span>
                          </div>
                          <div style="margin-bottom: 15px; display: flex; justify-content: space-between; border-bottom: 1px solid #e0e0e0; padding-bottom: 10px;">
                            <span style="font-weight: bold; color: #333;">Pajak:</span>
                            <span style="color: #555;">${formatIDR(
                              item.pajak
                            )}</span>
                          </div>
                          <div style="margin-bottom: 15px; display: flex; justify-content: space-between; border-bottom: 1px solid #e0e0e0; padding-bottom: 10px;">
                            <span style="font-weight: bold; color: #333;">Jumlah:</span>
                            <span style="color: #555;">${item.jumlah}</span>
                          </div>
                          <div style="margin-bottom: 15px; display: flex; justify-content: space-between; border-bottom: 1px solid #e0e0e0; padding-bottom: 10px;">
                            <span style="font-weight: bold; color: #333;">Sub Total:</span>
                            <span style="color: #555;">${formatIDR(
                              item.harga_total_beli
                            )}</span>
                          </div>
                          <div style="margin-bottom: 15px; display: flex; justify-content: space-between; border-bottom: 1px solid #e0e0e0; padding-bottom: 10px;">
                            <span style="font-weight: bold; color: #333;">Tanggal:</span>
                            <span style="color: #555;">${formatTanggal(
                              item.tanggal
                            )}</span>
                          </div>
                          <div style="text-align: center; margin-top: 20px;">
                            <p style="font-style: italic; color: #888;">Thank you for your business!</p>
                            <p style="font-size: 12px; color: #999;">Melawi Marine - Providing quality products with exceptional service.</p>
                          </div>
                        </div>
                      `;

                        const printWindow = window.open("", "_blank");
                        printWindow.document.write(`
                        <html>
                          <head>
                            <title>Nota Pengeluaran</title>
                            <style>
                              @media print {
                                body {
                                  display: flex;
                                  justify-content: center;
                                  align-items: center;
                                  height: 100vh;
                                  background-color: #f9f9f9;
                                }
                              }
                            </style>
                          </head>
                          <body>
                            ${printContent}
                          </body>
                        </html>
                      `);
                        printWindow.document.close();
                        printWindow.print();
                      };

                      return (
                        <tr
                          key={item.id_pembelian_barang}
                          className="hover:bg-blue-50 transition duration-300 ease-in-out transform hover:scale-[1.02] shadow-sm border-b border-gray-200 last:border-none"
                        >
                          {/* Sequential Number */}
                          <td className="py-3 px-6 text-center text-gray-700">
                            {String(
                              index + 1 + (currentPage - 1) * itemsPerPage
                            ).padStart(6, "0")}
                          </td>
                          {/* Product Name */}
                          <td className="py-3 px-6 text-center text-gray-700">
                            {item.nama_product}
                          </td>

                          {/* Purchase Price */}
                          <td className="py-3 px-6 text-right text-gray-700">
                            {formatIDR(item.harga_beli)}
                          </td>
                          {/* Tax */}
                          <td className="py-3 px-6 text-right text-gray-700">
                            {formatIDR(item.pajak)}
                          </td>
                          {/* Purchase Price */}
                          <td className="py-3 px-6 text-right text-gray-700">
                            {item.jumlah}
                          </td>
                          {/* Total Price */}
                          <td className="py-3 px-6 text-right text-gray-700">
                            {formatIDR(item.harga_total_beli)}
                          </td>
                          {/* Date */}
                          <td className="py-3 px-6 text-center text-gray-700">
                            {formatTanggal(item.tanggal)}
                          </td>
                          {/* Print Button */}
                          <td className="py-3 px-6 text-center">
                            <button
                              onClick={handlePrint}
                              className="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-4 rounded transition duration-300"
                              title="Cetak Nota"
                              aria-label={`Cetak Nota untuk ${item.nama_product}`}
                            >
                              Cetak Nota
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                <Pagination
                  itemsPerPage={itemsPerPage}
                  totalItems={pengeluaran.length}
                  paginate={paginate}
                  currentPage={currentPage}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
