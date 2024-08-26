import React from "react";
import { IoBagHandle } from "react-icons/io5";
import { useEffect, useState } from "react";

function DashboardStatsGrid() {
  const [totalStock, setTotalStock] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);

  useEffect(() => {
    const fetchTotalUsers = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/total-users");
        const data = await response.json();
        setTotalUsers(data.totalUsers);
      } catch (error) {
        console.error("Error fetching total users: ", error);
      }
    };

    fetchTotalUsers();
  }, []);

  useEffect(() => {
    const fetchTotalStock = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/total-stock");
        const data = await response.json();
        setTotalStock(data.totalStock);
      } catch (error) {
        console.error("Error fetching total stock:", error);
      }
    };

    fetchTotalStock();
  }, []);

  return (
    <div className="flex gap-4 w-full ">
      <BoxWrapper>
        <div className="rounded-full h-12 w-12 flex items-center justify-center bg-sky-500">
          <IoBagHandle className="text-2xl text-white" />
        </div>
        <div className="pl-4">
          <span className="text-sm text-gray-500 font-light">
            Total Data Mesin
          </span>
          <div className="flex items-center">
            <strong className="text-xl text-gray-700 font-semibold">
              {totalStock}
            </strong>
            <span className="text-sm text-green-500 pl-2">+234</span>
          </div>
        </div>
      </BoxWrapper>
      <BoxWrapper>
        <div className="rounded-full h-12 w-12 flex items-center justify-center bg-sky-500">
          <IoBagHandle className="text-2xl text-white" />
        </div>
        <div className="pl-4">
          <span className="text-sm text-gray-500 font-light">
            Total Data User
          </span>
          <div className="flex items-center">
            <strong className="text-xl text-gray-700 font-semibold">
              {totalUsers}
            </strong>
            <span className="text-sm text-green-500 pl-2">+234</span>
          </div>
        </div>
      </BoxWrapper>
      <BoxWrapper>
        <div className="rounded-full h-12 w-12 flex items-center justify-center bg-sky-500">
          <IoBagHandle />
        </div>
        <div className="pl-4">
          <span className="text-sm text-gray-500 font-light">
            Total Stok Barang
          </span>
          <div className="flex items-center">
            <strong className="text-xl text-gray-700 font-semibold"></strong>
            <span className="text-sm text-green-500 pl-2">+234</span>
          </div>
        </div>
      </BoxWrapper>
      <BoxWrapper>
        <div className="rounded-full h-12 w-12 flex items-center justify-center bg-sky-500">
          <IoBagHandle />
        </div>
        <div className="pl-4">
          <span className="text-sm text-gray-500 font-light">Total User</span>
          <div className="flex items-center">
            <strong className="text-xl text-gray-700 font-semibold"></strong>
            <span className="text-sm text-green-500 pl-2">+234</span>
          </div>
        </div>
      </BoxWrapper>
    </div>
  );
}

export default DashboardStatsGrid;

function BoxWrapper({ children }) {
  return (
    <div className="bg-white rounded-sm p-4 flex-1 border border-gray-200 flex items-center">
      {children}
    </div>
  );
}
