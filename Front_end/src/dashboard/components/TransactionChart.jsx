import React, { useEffect, useState, useRef } from "react";
import {
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  Bar,
} from "recharts";
import axios from "axios";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

function TransactionChart() {
  const [data, setData] = useState([]);
  const chartRef = useRef(); // Reference to the chart component

  useEffect(() => {
    const fetchData = async () => {
      try {
        const incomeResponse = await axios.get(
          "http://localhost:8000/api/grafik_pendapatan"
        );

        const expenseResponse = await axios.get(
          "http://localhost:8000/api/grafik_pengeluaran"
        );

        const combinedData = incomeResponse.data.map((income, index) => {
          const expense = expenseResponse.data[index];
          return {
            name: income.bulan, // Month name
            Income: income.total_pendapatan || 0, // Income amount
            Expense: expense.total_pengeluaran || 0, // Expense amount
          };
        });

        setData(combinedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const handlePrint = async () => {
    const canvas = await html2canvas(chartRef.current);
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("landscape");

    // Set up a luxurious background
    pdf.setFillColor(240, 240, 240); // Light gray background
    pdf.rect(
      0,
      0,
      pdf.internal.pageSize.width,
      pdf.internal.pageSize.height,
      "F"
    ); // Fill the background

    // Add header
    pdf.setFontSize(24);
    pdf.setTextColor(0, 0, 0); // Black text color
    pdf.text("Pendapatan selama 12 bulan", pdf.internal.pageSize.getWidth() / 2, 20, {
      align: "center",
    });

    // Add the image (chart)
    pdf.addImage(imgData, "PNG", 10, 30, 280, 150); // Adjust positioning and size

    // Add footer
    pdf.setFontSize(12);
    pdf.setTextColor(100); // Gray text color
    pdf.text(
      `Page 1`,
      pdf.internal.pageSize.getWidth() - 10,
      pdf.internal.pageSize.getHeight() - 10,
      { align: "right" }
    );

    // Save the PDF
    pdf.save("Monthly_Income_Graph.pdf");
  };

  return (
    <div className="h-[22rem] bg-white p-4 rounded-sm border border-gray-200 flex flex-col flex-1">
      <div className="flex justify-between items-center mb-4">
        <strong className="text-gray-700 font-medium">Pendapatan Perbulan</strong>
        <button
          onClick={handlePrint}
          className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded transition duration-300"
        >
          Print Graph
        </button>
      </div>

      <div className="w-full mt-3 flex-1 text-xs" ref={chartRef}>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={data}
            width={500}
            height={300}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3 0 0" vertical={false} />
            <XAxis dataKey="name" />
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

export default TransactionChart;
