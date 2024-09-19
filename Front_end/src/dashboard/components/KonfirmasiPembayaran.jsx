import React, { useState, useEffect, useContext, createContext } from "react";
import { FiLayers } from "react-icons/fi";
import Modal from "./Modal";
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
import { Menu } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import ConfirmButton from "./button/button_product/ConfirmButton";
import ConfirmProduct from "./button/button_product/ConfirmProduct";
import RejectedButton from "./button/button_product/RejectedButton";
import toast, { Toaster } from "react-hot-toast";

const status = [
  { name: "Published", icon: <FiLayers className="w-6 h-6" /> },
  { name: "Draft", icon: <HiOutlinePencilAlt className="w-6 h-6" /> },
  { name: "Hidden", icon: <HiOutlineEyeOff className="w-6 h-6" /> },
  { name: "Rejected", icon: <HiOutlineXCircle className="w-6 h-6" /> },
  { name: "Under Review", icon: <HiOutlineMail className="w-6 h-6" /> },
];

export default function KonfirmasiPembayaran() {
  const [isOpenInformasiKontak, setIsOpenInformasiKontak] = useState(false);
  const [isConfirmationModalOpen, setisConfirmationModalOpen] = useState(false);
  const [selectedKonfirmasiPembayaran, setSelectedKonfirmasiPembayaran] =
    useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedUserConfirm, setSelectedUserConfirm] = useState(null);
  const [beliProducts, setBeliProducts] = useState([]);

  const handleConfirmButton = (beli_product) => {
    console.log(beli_product.id_beli_produk);
    setSelectedUserConfirm(beli_product.id_user);
    setSelectedKonfirmasiPembayaran(beli_product.id_beli_produk);
    setisConfirmationModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedKonfirmasiPembayaran(null);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  // Bagian Paginasi
  // Menginisialisasi products sebagai array kosong untuk menghindari undefined
  const [tambahStocks, setTambahStocks] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = Array.isArray(tambahStocks)
    ? tambahStocks.slice(indexOfFirstItem, indexOfLastItem)
    : [];

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    fetchBeliProduct();
  }, []);

  // Fungsi untuk fetch data status beli produk
  const fetchBeliProduct = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8000/api/status_beli_product"
      );
      setBeliProducts(response.data.data || []); // Menyimpan data produk ke dalam state
    } catch (error) {
      console.error("Error fetching products:", error);
      setBeliProducts([]); // Jika error, set data menjadi kosong
    }
  };

  const konfirmasiPembayaran = () => {
    console.log(selectedKonfirmasiPembayaran);

    axios
      .post(
        `http://localhost:8000/api/konfirmasi_pembayaran/${selectedKonfirmasiPembayaran}`,

        {
          headers: {
            Accept: "application/json",
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((response) => {
        console.log(response);
        // fetchTambahStock();
        setisConfirmationModalOpen(false);
        toast.success("Product berhasil di tambahkan !", {
          duration: 5000,
        });
        // resetForm();
        // window.location.reload();
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.data); // Pesan error dari server
          console.log(error.response.status); // Status HTTP (400)
          console.log(error.response.headers); // Header respons
        } else {
          console.log(error.message); // Pesan error umum
        }
      });
  };

  // Fungsi untuk membuka modal
  // const handleOpenModalKontak = (product) => {
  //   setSelectedUser(product.user); // Set the specific user's data when clicking the contact icon
  //   setIsOpenInformasiKontak(true); // Assuming this is the state that controls the modal visibility
  // };

  // // Fungsi untuk menutup modal
  // const handleCloseModalKontak = () => {
  //   setIsOpenInformasiKontak(false);
  //   setSelectedUser(null); // Clear the selected user data when closing the modal
  // };

  // const handleDeleteClick = (product) => {
  //   console.log(`handleDeleteClick called with product:`, product);
  //   console.log(`Product name: ${product.product_name}`); // Adjust the property name as necessary
  //   setSelectedKonfirmasiPembayaran(product); // Set the entire product object
  //   setIsModalOpen(true); // Open the modal
  // };

  //   const handleDelete = async () => {
  //     if (selectedKonfirmasiPembayaran) {
  //       try {
  //         console.log(
  //           `handleDelete called with id_tambah_stock: ${selectedKonfirmasiPembayaran.id_tambah_stock}`
  //         );
  //         await axios.delete(
  //           `http://localhost:8000/api/tambah_stock/destroy/${selectedKonfirmasiPembayaran.id_tambah_stock}`
  //         );
  //         toast.success("Product berhasil di tolak !", {
  //           duration: 5000,
  //         });
  //         // Optionally refresh the products list
  //         fetchTambahStock();

  //         // Close the modal
  //         handleCloseModal();
  //       } catch (error) {
  //         console.error("Error deleting product:", error);
  //       }
  //     }
  //   };

  return (
    <main className="relative ">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="bg-white px-4  pb-4 rounded-sm border-gray-200 max-h-screen overflow-y-auto">
        <div className="flex items-center justify-between py-7 px-10">
          <div>
            <h1 className="text-2xl font-semibold loading-relaxed text-gray-800">
              Barang Masuk
            </h1>
            <p className="text-sm font-medium text-gray-500">
              Let's grow to your business! Create your product and upload here
            </p>
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
                <td className=" text-center font-semibold">ID Beli Produk</td>
                <td className="text-center font-semibold">ID Product</td>
                <td className=" text-center font-semibold">ID User</td>
                <td className=" text-center font-semibold">Bukti Pembayaran</td>
                <td className=" text-center font-semibold">Tanggal</td>
                <td className=" text-center font-semibold">Status</td>
                <td className=" text-center font-semibold"></td>
                <td></td>
                <td></td>
              </tr>
            </thead>

            <tbody>
              {/* Looping data yang diambil dari API */}
              {beliProducts.map((beli_product) => (
                <tr
                  key={beli_product.id_beli_produk}
                  className="hover:bg-blue-50 transition duration-300 ease-in-out transform hover:scale-[1.02] shadow-lg border-b border-gray-200 last:border-none"
                >
                  <td className="py-3 px-6 text-center font-semibold text-gray-700">
                    {beli_product.id_beli_produk}
                  </td>
                  <td className="py-3 px-6 text-center font-semibold text-gray-700">
                    {beli_product.id_product}
                  </td>
                  <td className="py-3 px-6 text-center font-semibold text-gray-700">
                    {beli_product.id_user}
                  </td>
                  <td className="py-3 px-6 text-center font-semibold text-gray-700">
                    {beli_product.bukti_pembayaran}
                  </td>
                  <td className="py-3 px-6 text-center font-semibold text-gray-700">
                    {beli_product.tanggal}
                  </td>
                  <td
                    className={`py-3 px-6 text-center font-semibold ${
                      beli_product.status === "lunas"
                        ? "text-green-600 bg-green-100 rounded-lg"
                        : "text-red-600 bg-red-100 rounded-lg"
                    }`}
                  >
                    {beli_product.status}
                  </td>
                  <td className="py-3 px-6 text-center">
                    {/* Jika ada konten base64, tampilkan gambar */}
                    {beli_product.kontent_base64 ? (
                      <img
                        src={`data:image/jpeg;base64,${beli_product.kontent_base64}`}
                        alt="Product Image"
                        className="w-24 h-24 object-cover rounded-lg shadow-md hover:scale-105 transition transform duration-300"
                      />
                    ) : (
                      <span className="italic text-gray-400">No Image</span>
                    )}
                  </td>
                  <td className="py-4 px-4 text-center">
                    <ConfirmButton
                      onClick={() => handleConfirmButton(beli_product)}
                    />
                    <RejectedButton
                      onClick={() => handleDeleteClick(tambah_stock)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Pagination
          itemsPerPage={itemsPerPage}
          totalItems={tambahStocks.length}
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

      {/* Modal for Konfirmasi */}
      <Modal
        open={isConfirmationModalOpen}
        onClose={() => setisConfirmationModalOpen(false)}
      >
        {selectedUserConfirm && (
          <div className="sm:flex sm:items-start w-80">
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
            <div className="mt-3  sm:mt-0 sm:ml-4">
              <h3 className="text-lg leading-6 font-medium text-gray-900">
                Account Information
              </h3>
              <div className="mt-2">
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    <strong>Nama: </strong>
                    {selectedUserConfirm.nama}
                    <br />
                    <strong>Email: </strong>
                    {selectedUserConfirm.email}
                    <br />
                    <strong>No Telepon: </strong>
                    {selectedUserConfirm.no_telpon}
                    <br />
                    <strong>Kota: </strong>
                    {selectedUserConfirm.kota}
                    <br />
                    <strong>Alamat: </strong>
                    {selectedUserConfirm.alamat}
                  </p>
                </div>
              </div>
              <div className="mt-3">
                <ConfirmProduct onClick={konfirmasiPembayaran} />
              </div>
            </div>
          </div>
        )}
      </Modal>

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
          {/* <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition hover:scale-110"
          >
            Delete
          </button> */}
        </div>
      </Modal>
    </main>
  );
}
