import React, { useEffect, useState } from "react";
import RecentOrders from "./RecentOrders";
import axios from "axios";
import { FaFileExcel, FaFilePdf } from "react-icons/fa";
import * as XLSX from "xlsx";
import jsPDF from "jspdf";
import "jspdf-autotable"; // Import for auto table
import Pagination from "../consts/Pagination";

export default function Pendapatan() {
  const [pendapatan, setPendapatan] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;
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
    const tableColumn = [
      "No",
      "Nama Product",
      "Harga Jual",
      "Sub Total",
      "Pajak Pendapatan",
      "Tanggal",
    ];
    const tableRows = [];

    currentItems.forEach((item, index) => {
      const pendapatanData = [
        (index + 1).toString().padStart(6, "0"),
        item.nama_product,
        item.harga_jual.toLocaleString("id-ID"), // Remove currency style
        item.harga_total.toLocaleString("id-ID"), // Remove currency style
        item.pajak.toLocaleString("id-ID"), // Remove currency style
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
    const totalPendapatan = currentItems.reduce(
      (acc, item) => acc + item.harga_total,
      0
    );
    const totalPajak = currentItems.reduce((acc, item) => acc + item.pajak, 0);

    // Summary section
    const summaryY = doc.autoTable.previous.finalY + 10;
    doc.setFontSize(14);
    doc.text(
      `Total Pendapatan: ${totalPendapatan.toLocaleString("id-ID")}`, // Remove currency style
      14,
      summaryY
    );
    doc.text(
      `Total Pajak Pendapatan: ${totalPajak.toLocaleString("id-ID")}`, // Remove currency style
      14,
      summaryY + 10
    );
    doc.text(
      `Grand Total: ${(totalPendapatan + totalPajak).toLocaleString("id-ID")}`, // Remove currency style
      14,
      summaryY + 20
    );

    // Save the PDF
    doc.save("laporan-pendapatan.pdf");
  };

  const handleDownloadExcel = () => {
    const wb = XLSX.utils.book_new();

    // Define the table column headers.
    const tableColumn = [
      "No",
      "Nama Product",
      "Harga Jual",
      "Sub Total",
      "Pajak Pendapatan",
      "Tanggal",
    ];

    // Map through currentItems to create rows of data.
    const data = currentItems.map((item, index) => [
      (index + 1).toString().padStart(6, "0"),
      item.nama_product,
      item.harga_jual.toLocaleString("id-ID"),
      item.harga_total.toLocaleString("id-ID"),
      item.pajak.toLocaleString("id-ID"),
      new Date(item.tanggal).toLocaleDateString("id-ID"),
    ]);

    // Create the worksheet and set the data.
    const ws = XLSX.utils.aoa_to_sheet([tableColumn, ...data]);

    // Adjust column widths for a better layout.
    const columnWidths = [
      { wch: 22 }, // No
      { wch: 30 }, // Nama Product
      { wch: 20 }, // Harga Jual
      { wch: 20 }, // Sub Total
      { wch: 25 }, // Pajak Pendapatan
      { wch: 15 }, // Tanggal
    ];
    ws["!cols"] = columnWidths;

    // Calculate totals for all products.
    const totalPendapatan = currentItems.reduce(
      (acc, item) => acc + item.harga_total,
      0
    );
    const totalPajak = currentItems.reduce((acc, item) => acc + item.pajak, 0);
    const grandTotal = totalPendapatan + totalPajak;

    // Add the summary section below the table.
    const summaryStartRow = data.length + 5;
    XLSX.utils.sheet_add_aoa(
      ws,
      [
        ["Summary"],
        ["Total Pendapatan", totalPendapatan.toLocaleString("id-ID")],
        ["Total Pajak Pendapatan", totalPajak.toLocaleString("id-ID")],
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
          fill: { fgColor: { rgb: "4CAF50" } }, // Green background
          alignment: { horizontal: "center" },
        };
      }
    }

    // Add the worksheet to the workbook and save the file.
    XLSX.utils.book_append_sheet(wb, ws, "Laporan Pendapatan");
    XLSX.writeFile(wb, "laporan-pendapatan.xlsx");
  };

  return (
    <main className="p-6">
      <div className="bg-white px-4 pt-3 pb-4 rounded-sm border-gray-200 flex-1">
        <div className="flex justify-between items-center p-4 bg-white rounded-md">
          <div>
            <strong className="text-3xl font-bold tracking-wide text-gray-800">
              Laporan Pendapatan
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
              onClick={handleDownloadExcel}
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
                      <td className="text-center font-semibold">Harga Jual</td>
                      <td className="text-center font-semibold">Sub Total</td>
                      <td className="text-center font-semibold">
                        Pajak Pendapatan
                      </td>
                      <td className="text-center font-semibold">Tanggal</td>
                      <td className="text-center font-semibold">Nota Produk</td>
                    </tr>
                  </thead>
                  <tbody>
                    {currentItems.map((pendapatan, index) => {
                      const handlePrint = () => {
                        const printContent = `
                      <div style="font-family: 'Georgia', serif; padding: 40px; border: 2px solid #000; max-width: 600px; margin: 0 auto;">
                        <div style="text-align: center; margin-bottom: 20px;">
                          <h1 style="font-size: 24px; color: #4a4a4a; border-bottom: 2px solid #000; padding-bottom: 10px;">Nota Produk</h1>
                          <h2 style="font-size: 18px; color: #333; margin-top: 5px;">Melawi Marine</h2>
                        </div>
                        <div style="margin-bottom: 15px; display: flex; justify-content: space-between; border-bottom: 1px solid #e0e0e0; padding-bottom: 10px;">
                          <span style="font-weight: bold; color: #333;">No:</span>
                          <span style="color: #555;">${(index + 1)
                            .toString()
                            .padStart(6, "0")}</span>
                        </div>
                        <div style="margin-bottom: 15px; display: flex; justify-content: space-between; border-bottom: 1px solid #e0e0e0; padding-bottom: 10px;">
                          <span style="font-weight: bold; color: #333;">Nama Product:</span>
                          <span style="color: #555;">${
                            pendapatan.nama_product
                          }</span>
                        </div>
                        <div style="margin-bottom: 15px; display: flex; justify-content: space-between; border-bottom: 1px solid #e0e0e0; padding-bottom: 10px;">
                          <span style="font-weight: bold; color: #333;">Harga Jual:</span>
                          <span style="color: #555;">${pendapatan.harga_jual.toLocaleString(
                            "id-ID",
                            { style: "currency", currency: "IDR" }
                          )}</span>
                        </div>
                        <div style="margin-bottom: 15px; display: flex; justify-content: space-between; border-bottom: 1px solid #e0e0e0; padding-bottom: 10px;">
                          <span style="font-weight: bold; color: #333;">Sub Total:</span>
                          <span style="color: #555;">${pendapatan.harga_total.toLocaleString(
                            "id-ID",
                            { style: "currency", currency: "IDR" }
                          )}</span>
                        </div>
                        <div style="margin-bottom: 15px; display: flex; justify-content: space-between; border-bottom: 1px solid #e0e0e0; padding-bottom: 10px;">
                          <span style="font-weight: bold; color: #333;">Pajak Pendapatan:</span>
                          <span style="color: #555;">${pendapatan.pajak.toLocaleString(
                            "id-ID",
                            { style: "currency", currency: "IDR" }
                          )}</span>
                        </div>
                        <div style="margin-bottom: 15px; display: flex; justify-content: space-between; border-bottom: 1px solid #e0e0e0; padding-bottom: 10px;">
                          <span style="font-weight: bold; color: #333;">Tanggal:</span>
                          <span style="color: #555;">${formatTanggal(
                            pendapatan.tanggal
                          )}</span>
                        </div>
                        <div style="text-align: center; margin-top: 20px;">
                          <p style="font-style: italic; color: #888;">Thank you for your purchase!</p>
                          <p style="font-size: 12px; color: #999;">Melawi Marine - Providing quality products with exceptional service.</p>
                        </div>
                      </div>
                    `;

                        const printWindow = window.open("", "_blank");
                        printWindow.document.write(`
                      <html>
                        <head>
                          <title>Nota Produk</title>
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
                          key={pendapatan.id_penjualan_barang}
                          className="hover:bg-blue-50 transition duration-300 ease-in-out transform hover:scale-[1.02] shadow-sm border-b border-gray-200 last:border-none"
                        >
                          <td className="py-3 px-6 text-center text-gray-700">
                            {(indexOfFirstItem + index + 1)
                              .toString()
                              .padStart(6, "0")}
                          </td>
                          <td className="py-3 px-6 text-center text-gray-700">
                            {pendapatan.nama_product}
                          </td>
                          <td className="py-3 px-6 text-center text-gray-700">
                            {pendapatan.harga_jual.toLocaleString("id-ID", {
                              style: "currency",
                              currency: "IDR",
                            })}
                          </td>
                          <td className="py-3 px-6 text-center text-gray-700">
                            {pendapatan.harga_total.toLocaleString("id-ID", {
                              style: "currency",
                              currency: "IDR",
                            })}
                          </td>
                          <td className="py-3 px-6 text-center text-gray-700">
                            {pendapatan.pajak.toLocaleString("id-ID", {
                              style: "currency",
                              currency: "IDR",
                            })}
                          </td>
                          <td className="py-3 px-6 text-center text-gray-700">
                            {formatTanggal(pendapatan.tanggal)}
                          </td>
                          <td className="py-3 px-6 text-center">
                            <button
                              onClick={handlePrint}
                              className="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-4 rounded"
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
                  totalItems={pendapatan.length}
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
