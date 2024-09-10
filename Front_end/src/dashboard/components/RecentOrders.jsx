import React from "react";
import { Link } from "react-router-dom";
import { getOrderStatus } from "../utils/index";

function RecentOrders() {
  return (
    <div className="bg-white px-4  pb-4 rounded-sm border-gray-200 max-h-screen overflow-y-auto">
      {/* <strong className="text-gray-700 font-medium">Recent Orders</strong> */}
      <div className="mt-3">
        <table className="w-full text-gray-700 border-x border-gray-200 rounded-sm">
          <thead>
            <tr className="font-semibold">
              <td className="py-4 px-4 text-center">No</td>
              <td className="py-4 px-4 text-center">Tanggal</td>
              <td className="py-4 px-4 text-center">No Penjualan</td>
              <td className="py-4 px-4 text-center">Kode Barang</td>
              <td className="py-4 px-4 text-center">Jumlah</td>
              <td className="py-4 px-4 text-center">Subtotal</td>
              <td className="py-4 px-4 text-center">Tools</td>
            </tr>
          </thead>
          <tbody>
            {/* {recentOrderData.map((order) => (
              <tr key={order.id} className="hover:bg-gray-100">
                <td className="py-4 px-4 text-center">
                  <Link to={`/order/${order.id}`}>{order.id}</Link>
                </td>
                <td className="py-4 px-4 text-center">
                  <Link to={`/product/${order.product_id}`}>
                    {order.product_id}
                  </Link>
                </td>
                <td className="py-4 px-4 text-center">
                  <Link to={`/customer/${order.customer_name}`}>
                    {order.customer_name}
                  </Link>
                </td>
                <td className="py-4 px-4 text-center">{new Date(order.order_date).toLocaleDateString()}</td>
                <td className="py-4 px-4 text-center">{order.order_total}</td>
                <td className="py-4 px-4 text-center">{order.shipment_address}</td>
                <td className="py-4 px-4 text-center">{getOrderStatus(order.current_order_status)}</td>
              </tr>
            ))} */}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default RecentOrders;
