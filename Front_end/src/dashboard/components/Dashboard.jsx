import React from "react";
import { Link } from "react-router-dom";
import DashboardStatsGrid from "./DashboardStatsGrid";
import TransactionChart from "./TransactionChart";
import BuyerProfileChart from "./BuyerProfileChart";
import RecentOrders from "./RecentOrders";
import PopularProducts from "./PopularProducts";
import { useAuth } from "../../App";

export default function Dashboard() {
  const { role } = useAuth(); // Dapatkan role pengguna

  return (
    <div className="h-screen flex flex-col overflow-hidden gap- 4">
      <div className="flex flex-col gap-4 h-full overflow-y-auto p-4">
        <DashboardStatsGrid />

        {role == "admin" && (
          <>
            <div className="flex flex-row gap-4 w-full">
              <TransactionChart />
              <BuyerProfileChart />
            </div>
            <div className="flex flex-row gap-4 w-full">
              <RecentOrders />
              <PopularProducts />
            </div>
          </>
        )}
      </div>
    </div>
  );
}
