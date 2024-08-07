import React, { useState, useEffect, useContext, createContext } from "react";
import { FiLayers } from "react-icons/fi";

import EditButton from "./button/button_product/EditButton";
import DeleteButton from "./button/button_product/DeleteButton";
import Modal from "./Modal";
import CreateItem from "./button/button_product/CreateItem";

import axios from "axios";

import {
  HiFilter,
  HiOutlineEyeOff,
  HiOutlineMail,
  HiOutlinePencilAlt,
  HiOutlineXCircle,
  HiPlus,
} from "react-icons/hi";
import Pagination from "../consts/Pagination";

const status = [
  { name: "Published", icon: <FiLayers className="w-6 h-6" /> },
  { name: "Draft", icon: <HiOutlinePencilAlt className="w-6 h-6" /> },
  { name: "Hidden", icon: <HiOutlineEyeOff className="w-6 h-6" /> },
  { name: "Rejected", icon: <HiOutlineXCircle className="w-6 h-6" /> },
  { name: "Under Review", icon: <HiOutlineMail className="w-6 h-6" /> },
];

export default function Products() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [editedProduct, setEditedProduct] = useState({
    id: null,
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

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const handleAddItem = (newItem) => {
    setProducts([...products, newItem]);
  };

  // Bagian Paginasi
  // Menginisialisasi products sebagai array kosong untuk menghindari undefined
  const [products, setProducts] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = Array.isArray(products)
    ? products.slice(indexOfFirstItem, indexOfLastItem)
    : [];

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/product");
      setProducts(response.data.data || []); // Mengakses array produk di dalam response.data.data
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]); // Menghindari products menjadi undefined
    }
  };

  const handleDeleteClick = (id_product) => {
    console.log(`handleDeleteClick called with id_product: ${id_product}`);
    setSelectedProduct(id_product);
    setIsModalOpen(true);
  };

  const handleDelete = () => {
    console.log(`handleDelete called with selectedProduct: ${selectedProduct}`);
    if (selectedProduct) {
      destroyProduct(selectedProduct);
    }
  };

  const destroyProduct = async (id_product) => {
    try {
      console.log(`destroyProduct called with id_product: ${id_product}`);
      // Send DELETE request to the backend
      await axios.delete(`http://localhost:8000/api/product/${id_product}`);

      // Update the frontend state
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.id_product !== id_product)
      );

      // Close the confirmation modal
      handleCloseModal();

      // Optionally, show a success message
      console.log("Product deleted successfully");
    } catch (error) {
      console.error("Error deleting product:", error);
      // Optionally, show an error message to the user
    }
  };
  return (
    <main className="relative ">
      <div className="bg-white px-4  pb-4 rounded-sm border-gray-200 max-h-screen overflow-y-auto">
        <div className="flex items-center justify-between py-7 px-10">
          <div>
            <h1 className="text-2xl font-semibold loading-relaxed text-gray-800">
              Products
            </h1>
            <p className="text-sm font-medium text-gray-500">
              Let's grow to your business! Create your product and upload here
            </p>
          </div>
          <CreateItem onAddItem={handleAddItem} />
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
                    <span>ID</span>
                  </div>
                </td>
                <td className="">&nbsp; &nbsp; Gambar</td>
                <td className=" text-center">Product Name</td>
                <td className="text-center">Kategori Produk</td>
                <td className=" text-center">Pricing</td>
                <td className=" text-center">Stock</td>
                <td></td>
                <td></td>
              </tr>
            </thead>

            <tbody>
              {currentItems.map((product) => (
                <tr key={product.id} className="hover:bg-gray-100">
                  <td className="gap-x-4 items-center py-4   pl-10">
                    <input
                      type="checkbox"
                      className="w-6 h-6 text-indigo-600 rounded-md border-gray-300"
                    />
                    <span className="py-3 px-4 text-center">
                      {product.id_product}
                    </span>
                    {/* <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-48 aspect-[3/2 rounded-lg object-cover object-top border border-gray-200"
                  /> */}
                  </td>
                  <td className="">
                    <img
                      src={`data:image/png;base64,${product.gambar}`}
                      className="w-20 justify-center aspect-auto rounded-lg object-cover object-top border border-gray-200"
                    />
                  </td>
                  <td className="text-center">{product.nama_product}</td>
                  <td className="text-center">{product.kategori_produk}</td>
                  <td className=" text-center ">{product.harga}</td>
                  <td className="text-center">{product.jumlah_stock}</td>
                  {/* <td className="py-4 px-4 text-center">{product.createdAt}</td> */}
                  <td className="py-4 px-4 text-center">
                    <EditButton onClick={() => handleEditClick(product)} />
                    <DeleteButton
                      onClick={() => handleDeleteClick(product.id_product)}
                    />
                  </td>
                  <td></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Pagination
          itemsPerPage={itemsPerPage}
          totalItems={products.length}
          paginate={paginate}
          currentPage={currentPage}
        />
        <div className="mb-16"></div>
      </div>

      {/* Modal for Edit Form */}
      <Modal open={isEditModalOpen} onClose={handleCloseEditModal}>
        <h2 className="text-lg font-semibold mb-4">Edit Product</h2>
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

          <div className="col-span-6 sm:col-span-6 ">
            <label
              htmlFor="Category"
              className="block text-sm font-medium text-gray-700"
            >
              Kategori Produk:
            </label>
            <input
              type="text"
              value={editedProduct.category}
              onChange={(e) =>
                setEditedProduct({ ...editedProduct, category: e.target.value })
              }
              className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
            />
          </div>

          <div className="col-span-6">
            <label
              htmlFor="imageUrl"
              className="block text-sm font-medium text-gray-700"
            >
              Image URL
            </label>
            <input
              type="file"
              id="imageUrl"
              name="imageUrl"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
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
              className="inline-block rounded bg-blue-500 px-8 py-3 text-sm font-medium text-white transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:bg-indigo-500"
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
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400  transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition hover:scale-110"
          >
            Delete
          </button>
        </div>
      </Modal>
    </main>
  );
}
