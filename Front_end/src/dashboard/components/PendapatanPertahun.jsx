import React, { useEffect, useState, useRef } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts";
import axios from "axios";
import html2canvas from "html2canvas";

function PendapatanPertahun() {
  const [data, setData] = useState([]);
  const chartRef = useRef(); // Reference to the chart component

  useEffect(() => {
    const fetchData = async () => {
      try {
        const incomeResponse = await axios.get(
          "http://localhost:8000/api/grafik_pendapatan_pertahun"
        );
        const expenseResponse = await axios.get(
          "http://localhost:8000/api/grafik_pengeluaran_pertahun"
        );

        const combinedData = incomeResponse.data.map((income) => {
          const expense = expenseResponse.data.find(
            (exp) => exp.tahun === income.tahun
          );
          return {
            year: income.tahun,
            Income: income.total_pendapatan || 0,
            Expense: expense ? expense.total_pengeluaran || 0 : 0,
          };
        });

        setData(combinedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  // Function to handle printing
  const handlePrint = () => {
    const printContents = chartRef.current.innerHTML;
    const printWindow = window.open("", "_blank");

    if (printWindow) {
      // Set up HTML and styles for the print window
      printWindow.document.write(`
        <html>
          <head>
            <title>Revenue Graph</title>
            <style>
              body {
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 20px;
              }
              .chart-container {
                display: flex;
                justify-content: center;
                align-items: center;
                height: auto;
              }
            </style>
          </head>
          <body>
            <div class="chart-container">${printContents}</div>
          </body>
        </html>
      `);
      printWindow.document.close();
      printWindow.focus();
      printWindow.print();
      printWindow.close();
    }
  };

  return (
    <div className="h-[22rem] bg-white p-4 rounded-sm border border-gray-200 flex flex-col flex-1">
      <div className="flex justify-between items-center mb-4">
        <strong className="text-gray-700 font-medium">
          Pendapatan PerTahun
        </strong>
        <button
          onClick={handlePrint}
          className="flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white font-medium py-2 px-4 rounded-lg shadow transition duration-300 focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M16 9V5a2 2 0 00-2-2H6a2 2 0 00-2 2v4H1v6a2 2 0 002 2h14a2 2 0 002-2v-6h-3zM6 5h8v4H6V5zm9 11H5v-3h10v3z" />
          </svg>
          Print Graph
        </button>
      </div>
      <div className="w-full mt-3 flex-1 text-xs" ref={chartRef}>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <Tooltip />
            <Legend />
            <Bar dataKey="Income" fill="#0ea5e9" />
            <Bar dataKey="Expense" fill="#ea580c" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default PendapatanPertahun;
