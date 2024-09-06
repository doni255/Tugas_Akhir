import React, { useState, useEffect, useContext, createContext } from "react";
import { FiLayers } from "react-icons/fi";
import Modal from "../Modal";
import axios from "axios";

import {
  HiFilter,
  HiOutlineEyeOff,
  HiOutlineMail,
  HiOutlinePencilAlt,
  HiOutlineXCircle,
  HiPlus,
} from "react-icons/hi";
import Pagination from "../../consts/Pagination";
import { Menu } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import ConfirmButton from "../button/button_product/ConfirmButton";
import ConfirmProduct from "../button/button_product/ConfirmProduct";
import RejectedButton from "../button/button_product/RejectedButton";
import toast, { Toaster } from "react-hot-toast";

const status = [
  { name: "Published", icon: <FiLayers className="w-6 h-6" /> },
  { name: "Draft", icon: <HiOutlinePencilAlt className="w-6 h-6" /> },
  { name: "Hidden", icon: <HiOutlineEyeOff className="w-6 h-6" /> },
  { name: "Rejected", icon: <HiOutlineXCircle className="w-6 h-6" /> },
  { name: "Under Review", icon: <HiOutlineMail className="w-6 h-6" /> },
];

export default function DataTambahStock() {
  const [isOpenInformasiKontak, setIsOpenInformasiKontak] = useState(false);
  const [isConfirmationModalOpen, setisConfirmationModalOpen] = useState(false);
  const [selectedBarangMasuk, setSelectedBarangMasuk] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedUserConfirm, setSelectedUserConfirm] = useState(null);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedBarangMasuk(null);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

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
    console.log(localStorage.getItem("id_user"));
    try {
      const response = await axios.get(
        "http://localhost:8000/api/tambah_stock/data_stock_supplier/" + 
        localStorage.getItem("id_user"),
      );
    console.log(response.data.data);
      setProducts(response.data.data || []); // Mengakses array produk di dalam response.data.data
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]); // Menghindari products menjadi undefined
    }
  };

  // Fungsi untuk menutup modal
  const handleCloseModalKontak = () => {
    setIsOpenInformasiKontak(false);
    setSelectedUser(null); // Clear the selected user data when closing the modal
  };

  const handleDeleteClick = (product) => {
    console.log(`handleDeleteClick called with product:`, product);
    console.log(`Product name: ${product.product_name}`); // Adjust the property name as necessary
    setSelectedBarangMasuk(product); // Set the entire product object
    setIsModalOpen(true); // Open the modal
  };

  const handleDelete = async () => {
    if (selectedBarangMasuk) {
      try {
        console.log(
          `handleDelete called with id_tambah_stock: ${selectedBarangMasuk.id_tambah_stock}`
        );
        await axios.delete(
          `http://localhost:8000/api/tambah_stock/destroy/${selectedBarangMasuk.id_tambah_stock}`
        );
        toast.success("Product berhasil di batal !", {
          duration: 5000,
        });
        // Optionally refresh the products list
        fetchProducts();

        // Close the modal
        handleCloseModal();
      } catch (error) {
        console.error("Error deleting product:", error);
      }
    }
  };

  return (
    <main className="relative ">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="bg-white px-4  pb-4 rounded-sm border-gray-200 max-h-screen overflow-y-auto">
        <div className="flex items-center justify-between py-7 px-10">
          <div>
            <h1 className="text-2xl font-semibold loading-relaxed text-gray-800">
              Konfirmasi Stock
            </h1>
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-sm font-medium text-gray-700 border-b border-gray-200">
                {/* <td className="pl-10 py-4">
                  <div className="flex items-center gap-x-4">
                    <input
                      type="checkbox"
                      className="w-6 h-6 text-indigo-600 rounded-md border-gray-300"
                    />
                    <span>ID</span>
                  </div>
                </td> */}
                <td className=" text-center font-semibold">Product Name</td>
                <td className="text-center font-semibold">Kategori Produk</td>
                <td className=" text-center font-semibold">Jumlah</td>
                <td className=" text-center font-semibold">Tanggal Kirim</td>
                <td className=" text-center font-semibold">Actions</td>
                <td className=" text-center font-semibold"></td>
              </tr>
            </thead>

            <tbody>
              {currentItems
                .filter((tambah_stock) => tambah_stock.status !== "confirmed") // Filter hanya yang belum "confirmed"
                .map((tambah_stock) => (
                  <tr
                    key={tambah_stock.id_tambah_stock}
                    className="hover:bg-gray-100"
                  >
                    <td className="text-center">
                      {tambah_stock.product.nama_product}
                    </td>
                    <td className="text-center">
                      {tambah_stock.product.kategori_produk}
                    </td>
                    <td className="text-center">{tambah_stock.jumlah_stock}</td>
                    <td className=" text-center">
                      {tambah_stock.tanggal_kirim}
                    </td>
                    <td className="py-4 px-4 text-center">
                      <RejectedButton
                        onClick={() => handleDeleteClick(tambah_stock)}
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

      {selectedUser && (
        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex items-center justify-center min-h-screen px-4 text-center">
            <div className="fixed inset-0 transition-opacity">
              <div className="fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300"></div>
            </div>
            <div className="inline-block align-middle bg-white rounded-lg overflow-hidden shadow-xl transform transition-all sm:max-w-lg sm:w-full">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-red-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3 className="text-lg leading-6 font-medium text-gray-900">
                      Account Information
                    </h3>
                    <div className="mt-2">
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">
                          <strong>Nama: </strong>
                          {selectedUser.nama}
                          <br />
                          <strong>Email: </strong>
                          {selectedUser.email}
                          <br />
                          <strong>No Telepon: </strong>
                          {selectedUser.no_telpon}
                          <br />
                          <strong>Kota: </strong>
                          {selectedUser.kota}
                          <br />
                          <strong>Alamat: </strong>
                          {selectedUser.alamat}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                <button
                  type="button"
                  onClick={handleCloseModalKontak}
                  className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 sm:ml-3 sm:w-auto sm:text-sm"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal untuk konfirmasi menolak produk dari supplier */}
      <Modal open={isModalOpen} onClose={handleCloseModal}>
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Konfirmasi Delete
        </h2>
        <p className="text-sm text-gray-600 mb-6">
          Apakah kamu yakin menolak produk tawaran dari supplier ?
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
