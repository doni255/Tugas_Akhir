import React, { useState } from "react";
import { Link } from "react-router-dom";

import EditButton from "./button/button_product/EditButton";
import DeleteButton from "./button/button_product/DeleteButton";
import Modal from "./Modal";
import ProductForm from "./button/button_product/ProductForm";

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

const initialProducts = [
  {
    id: 1,
    name: "Organic Landing page",
    category: "Web Design",
    imageUrl: "/images/galery-1.jpg",
    price: 20,
    stock: 793,
  },
  {
    id: 2,
    name: "Organic Landing page",
    category: "Web Design",
    imageUrl: "/images/galery-1.jpg",
    price: 20,
    stock: 793,
  },
  {
    id: 3,
    name: "Organic Landing page",
    category: "Web Design",
    imageUrl: "/images/galery-1.jpg",
    price: 20,
    stock: 793,
  },
  {
    id: 4,
    name: "Organic Landing page",
    category: "Web Design",
    imageUrl: "/images/galery-1.jpg",
    price: 20,
    stock: 793,
  },
];

export default function Products() {
  const [products, setProducts] = useState(initialProducts);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [editedProduct, setEditedProduct] = useState({
    id: null,
    name: "",
    category: "",
    imageUrl: "",
    price: 0,
    stock: 0,
  });

  const openEditModal = (productId) => {
    const productToEdit = products.find((product) => product.id === productId);
    setEditedProduct(productToEdit);
    setIsEditModalOpen(true);
  };

  const handleEditSubmit = (editedData) => {
    // Update the product in the products state
    const updatedProducts = products.map((product) =>
      product.id === editedData.id ? editedData : product
    );
    setProducts(updatedProducts);
    setIsEditModalOpen(false); // Mengubah menjadi setIsEditModalOpen
    setEditedProduct({
      id: null,
      name: "",
      category: "",
      imageUrl: "",
      price: 0,
      stock: 0,
    });
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false); // Mengubah menjadi setEditModalOpen
    setEditedProduct({
      id: null,
      name: "",
      category: "",
      imageUrl: "",
      price: 0,
      stock: 0,
    });
  };

  const handleEditClick = (product) => {
    openEditModal(product.id);
  };

  const handleDeleteClick = (productId) => {
    setSelectedProduct(productId);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const handleDelete = () => {
    setProducts(products.filter((product) => product.id !== selectedProduct));
    handleCloseModal();
  };

  return (
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

      {/* <ul className="flex gap-x-24 items-center px-4 border-y border-gray-200">
        {status.map((Published, index) => (
          <li key={index} className="flex items-center gap-4 text-gray-700">
            <button className="flex gap-x-2 items-center py-5 px-6 text-gray-500 hover:text-indigo-600 relative group">
              {Published.icon}
              <span className="font-medium">{Published.name}</span>
              <span className="absolute w-full h-0.5 left-3 bg-indigo-600 rounded bottom-0 scale-x-0 group-hover:scale-x-100 transition-transform ease-in-out"></span>
            </button>
          </li>
        ))}
      </ul> */}

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
            {products.map((product) => (
              <tr key={product.id} className="border-b border-t-gray-200">
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

                <td className="py-4 px-4 text-center">
                  <div className="flex justify-center gap-2">
                    <EditButton onClick={() => handleEditClick(product)} />
                    <DeleteButton
                      onClick={() => handleDeleteClick(product.id)}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal for Edit Form */}
      <Modal open={isEditModalOpen} onClose={handleCloseEditModal}>
        <h2>Edit Product</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleEditSubmit(editedProduct);
          }}
          action="#"
          className="mt-8 grid grid-cols-6 gap-6"
        >
          <div className="col-span-6 sm:col-span-6 ">
            <label
              htmlFor="ProductName"
              className="block text-sm font-medium text-gray-700"
            >
              Product Name:
            </label>
            <input
              type="text"
              value={editedProduct.name}
              onChange={(e) =>
                setEditedProduct({ ...editedProduct, name: e.target.value })
              }
              className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
            />
          </div>

          <div className="col-span-6">
            <label
              htmlFor="Price"
              className="block text-sm font-medium text-gray-700"
            >
              Price:
            </label>
            <input
              type="number"
              value={editedProduct.price}
              onChange={(e) =>
                setEditedProduct({ ...editedProduct, price: e.target.value })
              }
              className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
            />
          </div>
          <div className="col-span-6">
            <label
              htmlFor="Stock"
              className="block text-sm font-medium text-gray-700"
            >
              Stock:
            </label>
            <input
              type="number"
              value={editedProduct.stock}
              onChange={(e) =>
                setEditedProduct({ ...editedProduct, stock: e.target.value })
              }
              className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
            />
          </div>
          <div className="flex gap-2.5">
            <button
              type="submit"
              className="inline-block rounded bg-indigo-500 px-8 py-3 text-sm font-medium text-white transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:bg-indigo-500"
            >
              Update
            </button>
            <button
              onClick={handleCloseEditModal}
              className="inline-block rounded border border-current px-8 py-3 text-sm font-medium text-indigo-600 transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:text-indigo-500"
            >
              Cancel
            </button>
          </div>
        </form>
      </Modal>

      {/* Modal untuk konfirmasi delete */}
      <Modal open={isModalOpen} onClose={handleCloseModal}>
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Confirm Deletion
        </h2>
        <p className="text-sm text-gray-600 mb-6">
          Are you sure you want to delete this product? This action cannot be
          undone.
        </p>
        <div className="flex justify-end gap-2">
          <button
            onClick={handleCloseModal}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </Modal>
    </main>
  );
}
