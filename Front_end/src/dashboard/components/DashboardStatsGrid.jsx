import React from "react";
import {
  IoBagHandle,
  IoCartOutline,
  IoCubeOutline,
  IoPeopleOutline,
} from "react-icons/io5";
import { useEffect, useState } from "react";
import { useAnimate } from "framer-motion";

function DashboardStatsGrid() {
  const [totalStock, setTotalStock] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalTambahStock, setTotalTambahStock] = useState(0);
  const [totalUang, setTotalUang] = useState(null);

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

  // UseEffect untuk mengambil total stock
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

  // UseEffect untuk mengambil total tambah stock
  useEffect(() => {
    const fetchTotalTambahStock = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/tambah_stock/");
        const data = await response.json();
        setTotalTambahStock(data.total_jumlah_stock);
      } catch (error) {
        console.error("Error fetching total tambah stock: ", error);
      }
    };

    fetchTotalTambahStock();
  }, []);

  const formatRupiah = (amount) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(amount);
  };

  // UseEffect untuk mengambil uang
  useEffect(() => {
    const fetchTotalUang = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/uang");
        const data = await response.json();
        console.log("Fetched Data: ", data);

        if (data.length > 0 && data[0]?.jumlah_uang !== undefined) {
          setTotalUang(data[0].jumlah_uang); // Safely access jumlah_uang
        } else {
          console.warn("Data format is unexpected or empty array.");
          setTotalUang(0); // Default to 0 if data is not as expected
        }
      } catch (error) {
        console.error("Error fetching total uang: ", error);
      }
    };

    fetchTotalUang();
  }, []);

  return (
    <div className="flex gap-6 w-full">
      <BoxWrapper>
        {/* Icon and Info for Money */}
        <div className="rounded-full h-12 w-12 flex items-center justify-center bg-green-500">
          <IoBagHandle className="text-2xl text-white" />
        </div>
        <div className="pl-4">
          <span className="text-sm text-gray-500 font-light">Total Uang</span>
          <div className="flex items-center">
            <strong className="text-xl text-gray-700 font-semibold">
              {totalUang !== null ? formatRupiah(totalUang) : "Loading..."}
            </strong>
            {/* <span className="text-sm text-green-500 pl-2">+234</span> */}
          </div>
        </div>
      </BoxWrapper>

      <BoxWrapper>
        {/* Icon and Info for Machine Data */}
        <div className="rounded-full h-12 w-12 flex items-center justify-center bg-blue-500">
          <IoCubeOutline className="text-2xl text-white" />
        </div>
        <div className="pl-4">
          <span className="text-sm text-gray-500 font-light">Data Mesin</span>
          <div className="flex items-center">
            <strong className="text-xl text-gray-700 font-semibold">
              {totalStock}
            </strong>
          </div>
        </div>
      </BoxWrapper>

      <BoxWrapper>
        {/* Icon and Info for User Supplier */}
        <div className="rounded-full h-12 w-12 flex items-center justify-center bg-yellow-500">
          <IoPeopleOutline className="text-2xl text-white" />
        </div>
        <div className="pl-4">
          <span className="text-sm text-gray-500 font-light">Total Users</span>
          <div className="flex items-center">
            <strong className="text-xl text-gray-700 font-semibold">
              {totalUsers}
            </strong>
          </div>
        </div>
      </BoxWrapper>

      <BoxWrapper>
        {/* Icon and Info for Stock Addition */}
        <div className="rounded-full h-12 w-12 flex items-center justify-center bg-red-500">
          <IoCartOutline className="text-2xl text-white" />
        </div>
        <div className="pl-4">
          <span className="text-sm text-gray-500 font-light">
            Permintaan Tambah Stock
          </span>
          <div className="flex items-center">
            <strong className="text-xl text-gray-700 font-semibold">
              {totalTambahStock}
            </strong>
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
