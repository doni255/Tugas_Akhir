import React from "react";
import { Link } from "react-router-dom";
import { getOrderStatus } from "../lib/utils/index";

const recentOrderData = [
  {
    id: "1",
    product_id: "4324",
    customer_id: "23143",
    customer_name: "Shirley A. Lape",
    order_date: "2002-05-17T03:24:00",
    order_total: "$435.50",
    current_order_status: "PLACED",
    shipment_address: "Cottage Grave, OR 97424",
  },
  {
    id: "2",
    product_id: "4324",
    customer_id: "23143",
    customer_name: "John Rick",
    order_date: "2002-05-14T05:24:00",
    order_total: "$435.50",
    current_order_status: "CONFIRMED",
    shipment_address: "Cottage Grave, OR 97424",
  },
  {
    id: "3",
    product_id: "4324",
    customer_id: "23143",
    customer_name: "Taylor Swift",
    order_date: "2002-05-17T07:24:00",
    order_total: "$435.50",
    current_order_status: "SHIPPED",
    shipment_address: "Cottage Grave, OR 97424",
  },
  {
    id: "4",
    product_id: "4324",
    customer_id: "23143",
    customer_name: "Jason",
    order_date: "2002-05-17T12:40:00",
    order_total: "$435.50",
    current_order_status: "OUT_FOR_DELIVERY",
    shipment_address: "Cottage Grave, OR 97424",
  },
  {
    id: "5",
    product_id: "4324",
    customer_id: "23143",
    customer_name: "Shirley A. Lape",
    order_date: "2002-05-17T03:24:00",
    order_total: "$435.50",
    current_order_status: "DELIVERED",
    shipment_address: "Cottage Grave, OR 97424",
  },
];

function RecentOrders() {
  return (
    <div className="bg-white px-4 pt-3 pb-4 rounded-sm border-gray-200 flex-1">
      <strong className="text-gray-700 font-medium">Recent Orders</strong>
      <div className="mt-3">
        <table className="w-full text-gray-700 border-x border-gray-200 rounded-sm">
          <thead>
            <tr className="font-semibold">
              <td className="py-4 px-4 text-center">ID</td>
              <td className="py-4 px-4 text-center">Product ID</td>
              <td className="py-4 px-4 text-center">Customer Name</td>
              <td className="py-4 px-4 text-center">Order Date</td>
              <td className="py-4 px-4 text-center">Order Total</td>
              <td className="py-4 px-4 text-center">Products</td>
              <td className="py-4 px-4 text-center">Order Status</td>
            </tr>
          </thead>
          <tbody>
            {recentOrderData.map((order) => (
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
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default RecentOrders;
