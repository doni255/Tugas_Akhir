import React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
} from "recharts";

const data = [
  {
    name: "Jan",
    Expense: 4000,
    Income: 2400,
    amt: 2400,
  },
  {
    name: "Feb",
    Expense: 3000,
    Income: 1398,
    amt: 2210,
  },
  {
    name: "Mar",
    Expense: 2000,
    Income: 9800,
    amt: 2290,
  },
  {
    name: "Apr",
    Expense: 2780,
    Income: 3908,
    amt: 2000,
  },
  {
    name: "Mei",
    Expense: 1890,
    Income: 4800,
    amt: 2181,
  },
  {
    name: "Jun",
    Expense: 2390,
    Income: 3800,
    amt: 2500,
  },
  {
    name: "July",
    Expense: 3490,
    Income: 4300,
    amt: 2100,
  },
  {
    name: "Aug",
    Expense: 4500,
    Income: 7000,
    amt: 2100,
  },
  {
    name: "Sep",
    Expense: 3490,
    Income: 4300,
    amt: 2100,
  },
  {
    name: "Oct",
    Expense: 3490,
    Income: 4300,
    amt: 2100,
  },
  {
    name: "Nov",
    Expense: 3490,
    Income: 4300,
    amt: 2100,
  },
  {
    name: "Dec",
    Expense: 3490,
    Income: 4300,
    amt: 2100,
  },
];

function TransactionChart() {
  return (
    <div className="h-[22rem] bg-white p-4 rounded-sm border border-gray-200 flex flex-col flex-1">
      <strong className="text-gray-700 font-medium">Transactions</strong>
      <div className="w-full mt-3 flex-1 text-xs">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            width={500}
            height={300}
            data={data}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3 0 0" vertical={false}/>
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
