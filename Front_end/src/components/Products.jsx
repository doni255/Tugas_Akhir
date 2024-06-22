import React from "react";
import { Link } from "react-router-dom";
import {
  HiFilter,
  HiOutlineEyeOff,
  HiOutlineMail,
  HiOutlinePencilAlt,
  HiOutlineXCircle,
  HiPlus,
} from "react-icons/hi";

import { FiLayers } from "react-icons/fi";

const status = [
  { name: "Published", icon: <FiLayers className="w-6 h-6" /> },
  { name: "Draft", icon: <HiOutlinePencilAlt className="w-6 h-6" /> },
  { name: "Hidden", icon: <HiOutlineEyeOff className="w-6 h-6" /> },
  { name: "Rejected", icon: <HiOutlineXCircle className="w-6 h-6" /> },
  { name: "Under Review", icon: <HiOutlineMail className="w-6 h-6" /> },
];

const products = [
  {
    name: "Organic Landing page",
    category: "Web Design",
    imageUrl: "/images/galery-1.jpg",
    price: 20,
    stock: 793,
  },
  {
    name: "Organic Landing page",
    category: "Web Design",
    imageUrl: "/images/galery-1.jpg",
    price: 20,
    stock: 793,
  },
  {
    name: "Organic Landing page",
    category: "Web Design",
    imageUrl: "/images/galery-1.jpg",
    price: 20,
    stock: 793,
  },
  {
    name: "Organic Landing page",
    category: "Web Design",
    imageUrl: "/images/galery-1.jpg",
    price: 20,
    stock: 793,
  },
];

export default function Products() {
  return (
    // <div>
    //    this is product page <Link to="/dashboard_admin" className="underline">go to dashboard</Link>
    // </div>

    <main>
      <div className="flex items-center justify-between py-7 px-10">
        <div>
          <h1 className="text-2xl font-semibold loading-relaxed text-gray-800">
            Products
          </h1>
          <p className="text-sm font-medium text-gray-500">
            Let's grow to your business! Create your product and upload here
          </p>
        </div>
        <button className="inline-flex gap-x-2 items-center py-2.5 px-6 text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1">
          <HiPlus className="w-6 h-6 fill-current" />
          <span className="text-sm font-semibold tracking-wide">
            Create Item
          </span>
        </button>
      </div>

      <ul className="flex gap-x-24 items-center px-4 border-y border-gray-200">
        {status.map((Published) => (
          <li
            key={Published.icon}
            className="flex items-center gap-4 text-gray-700"
          >
            <button className="flex gap-x-2 items-center py-5 px-6 text-gray-500 hover:text-indigo-600 relative group">
              {Published.icon}
              <span className="font-medium">{Published.name}</span>
              <span className="absolute w-full h-0.5 left-3 bg-indigo-600 rounded bottom-0 scale-x-0 group-hover:scale-x-100 transition-transform ease-in-out"></span>
            </button>
          </li>
        ))}
      </ul>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="text-sm font-medium text-gray-700 border-b border-gray-200">
              <td className="pl-10 py-4">
                <div className="flex items-center gap-x-4">
                  <input
                    type="checkbox"
                    className="w-6 h-6 text-indigo-600 rounded-md border-gray-300"
                  />
                  <span>Product Name</span>
                </div>
              </td>
              <td className="py-4 px-4 text-center">Pricing</td>
              <td className="py-4 px-4 text-center">Stock</td>
              <td className="py-4 px-4 text-center"></td>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr key={index} className="border-b border-t-gray-200">
                <td className="flex gap-x-4 items-center py-4 pl-10">
                  <input
                    type="checkbox"
                    className="w-6 h-6 text-indigo-600 rounded-md border-gray-300"
                  />
                  <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-48 aspect-[3/2 rounded-lg object-cover object-top border border-gray-200"
                  />
                  <span>{product.name}</span>
                </td>
                <td className="py-4 px-4 text-center">{product.price}</td>
                <td className="py-4 px-4 text-center">{product.stock}</td>
                <td className="py-4 px-4 text-center">{product.createdAt}</td>
                <td>
                  <button className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded inline-flex items-center">
                    <svg
                      className="w-4 h-4 mr-2"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M2 5a1 1 0 011-1h5a1 1 0 011 1v1a1 1 0 01-1 1H3v10a1 1 0 001 1h12a1 1 0 001-1V7h-5a1 1 0 01-1-1V5a1 1 0 011-1h7a1 1 0 011 1v12a3 3 0 01-3 3H5a3 3 0 01-3-3V5z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Edit
                  </button>
                  <span className="ml-2">
                    <button className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded inline-flex items-center">
                      <svg
                        className="w-4 h-4 mr-2"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M7 3a1 1 0 011-1h4a1 1 0 011 1v1h2a1 1 0 011 1v12a2 2 0 01-2 2H6a2 2 0 01-2-2V5a1 1 0 011-1h2V3zm5 2H8v11h4V5zm-3 3a1 1 0 011 1v5a1 1 0 11-2 0V9a1 1 0 011-1zm2-2a1 1 0 11-2 0 1 1 0 012 0z"
                          clipRule="evenodd"
                        />
                      </svg>
                      Delete
                    </button>
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </main>
  );
}
