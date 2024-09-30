// PengeluaranPertahunChart.jsx
import React, { useEffect, useState } from "react";
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

function PengeluaranPertahunChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetching data from the backend
    const fetchData = async () => {
      try {
        // Fetch income data per year
        const incomeResponse = await axios.get(
          "http://localhost:8000/api/grafik_pendapatan_pertahun"
        );

        // Fetch expense data per year
        const expenseResponse = await axios.get(
          "http://localhost:8000/api/grafik_pengeluaran_pertahun"
        );

        // Merge income and expense data by year
        const combinedData = incomeResponse.data.map((income, index) => {
          const expense = expenseResponse.data.find(
            (exp) => exp.tahun === income.tahun
          );

          return {
            year: income.tahun, // Year
            Income: income.total_pendapatan || 0, // Total income
            Expense: expense ? expense.total_pengeluaran || 0 : 0, // Total expense
          };
        });

        setData(combinedData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="h-[22rem] bg-white p-4 rounded-sm border border-gray-200 flex flex-col flex-1">
      <strong className="text-gray-700 font-medium">
        Pengeluaran Per Tahun
      </strong>
      <div className="w-full mt-3 flex-1 text-xs">
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

export default PengeluaranPertahunChart;
