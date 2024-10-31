import React from "react";
import RecentOrders from "./RecentOrders";
import { HiPlus } from "react-icons/hi";

export default function Orders() {
  return (
    <main>
      {/* <div className="flex items-center justify-between py-7 px-10">
        <div>
          <h1 className="text-2xl font-semibold loading-relaxed text-gray-800">
            Orders from customers
          </h1>
          <p className="text-sm font-medium text-gray-500">
            Below here is the profile and product`s orders from consumen
          </p>
        </div>
      </div> */}

      <div className="overflow">
        <div className="w-full">
          <RecentOrders />
        </div>
      </div>
    </main>
  );
}
