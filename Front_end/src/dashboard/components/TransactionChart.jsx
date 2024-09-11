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

function TransactionChart() {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetching data from the backend
    const fetchData = async () => {
      try {
        // Fetch income data
        const incomeResponse = await axios.get(
          "http://localhost:8000/api/grafik_pendapatan"
        );

        // Fetch expense data
        const expenseResponse = await axios.get(
          "http://localhost:8000/api/grafik_pengeluaran"
        );

        // Merge income and expense data by month
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
  return (
    <div className="h-[22rem] bg-white p-4 rounded-sm border border-gray-200 flex flex-col flex-1">
      <strong className="text-gray-700 font-medium">Transactions</strong>
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
