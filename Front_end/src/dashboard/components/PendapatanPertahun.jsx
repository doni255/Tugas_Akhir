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
  const handlePrint = async () => {
    if (!chartRef.current) return; // Ensure chartRef is available

    const canvas = await html2canvas(chartRef.current, {
      useCORS: true,
      scale: 2, // Increases the quality of the image
    });

    const printWindow = window.open("", "_blank");
    printWindow.document.write(`
      <html>
        <head>
          <title>Pengeluaran Per Tahun Graph</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              margin: 20px;
              padding: 0;
            }
            h1 {
              text-align: center;
            }
            .chart-container {
              display: flex;
              justify-content: center;
              align-items: center;
              margin-top: 20px;
            }
          </style>
        </head>
        <body>
          <h1>Pengeluaran Per Tahun Graph</h1>
          <div class="chart-container">
            <img src="${canvas.toDataURL()}" />
          </div>
        </body>
      </html>
    `);
    printWindow.document.close();
    printWindow.onload = () => {
      printWindow.print();
      printWindow.close(); // Close the window after printing
    };
  };

  return (
    <div className="h-[22rem] bg-white p-4 rounded-sm border border-gray-200 flex flex-col flex-1">
      <div className="flex justify-between items-center mb-4">
        <strong className="text-gray-700 font-medium">Transactions</strong>
        <button
          onClick={handlePrint}
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-300"
        >
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
