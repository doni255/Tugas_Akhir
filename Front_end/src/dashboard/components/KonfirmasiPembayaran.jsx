import React, { useState, useEffect } from "react";

import Modal from "./Modal";
import axios from "axios";

import Pagination from "../consts/Pagination";

import ConfirmButton from "./button/button_product/ConfirmButton";

import RejectedButton from "./button/button_product/RejectedButton";
import toast, { Toaster } from "react-hot-toast";

export default function KonfirmasiPembayaran() {
  const [isOpenInformasiKontak, setIsOpenInformasiKontak] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmationModalOpen, setisConfirmationModalOpen] = useState(false);

  const [isDeleteConfirmationModalOpen, setIsDeleteConfirmationModalOpen] =
    useState(false);
  const [selectedKonfirmasiPembayaran, setSelectedKonfirmasiPembayaran] =
    useState(null);
  const [idBeliProduk, setIdBeliProduk] = useState(null);
  const [selectedUserConfirm, setSelectedUserConfirm] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [beliProducts, setBeliProducts] = useState([]);

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
    console.log("fetching data");
    // get all data from beli product

    try {
      const response = await axios.get(
        "http://localhost:8000/api/status_beli_product"
      );  
      const data = response.data.data || [];
      console.log("data", data);

      setBeliProducts(response.data.data || []); // Menyimpan data produk ke dalam state
    } catch (error) {
      console.error("Error fetching products:", error);
      setBeliProducts([]); // Jika error, set data menjadi kosong
    }
  };

  const handleConfirmButton = (beli_product) => {
    console.log(beli_product.id_beli_produk);
    setSelectedUserConfirm(beli_product);
    setSelectedKonfirmasiPembayaran(beli_product.id_beli_produk);
    setisConfirmationModalOpen(true);
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
        fetchBeliProduct();
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

  const handleDeleteConfirmation = (beli_product) => {
    console.log(beli_product.id_beli_produk);
    setIdBeliProduk(beli_product.id_beli_produk);
    setIsDeleteConfirmationModalOpen(true);
  };
  const hapusKonfirmasiPembayaran = () => {
    if (!idBeliProduk) return; // Ensure the ID is defined

    console.log(idBeliProduk); // Log the ID to confirm it’s available

    axios
      .delete(`http://localhost:8000/api/hapus_keranjang/${idBeliProduk}`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        if (response.status === 200) {
          console.log("Deletion successful");
          setIsDeleteConfirmationModalOpen(false);
          toast.success("Pembayaran berhasil di tolak!", { duration: 4000 });
          fetchBeliProduct();
          // Optionally refresh the data here
        }
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response.data);
        } else {
          console.log(error.message);
        }
      });
  };
  return (
    <main className="relative ">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="bg-white px-4  pb-4 rounded-sm border-gray-200 max-h-screen overflow-y-auto">
        <div className="flex items-center justify-between py-7 px-10">
          <div>
            <h1 className="text-2xl font-semibold loading-relaxed text-gray-800">
              Bukti Pembayaran
            </h1>
            <p className="text-sm font-medium text-gray-500">
              Let's grow to your business! Create your product and upload here
            </p>
          </div>
        </div>
        <div className="overflow-hidden">
          <table className="w-full text-gray-700 border-x border-gray-200 rounded-sm">
            <thead>
              <tr className="text-sm font-medium text-gray-700 border-b border-gray-200">
                <td className="text-center font-semibold">ID Product</td>
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
                  className="hover:bg-blue-50 transition duration-300 ease-in-out transform hover:scale-[1.05] shadow-sm border-b border-gray-200 last:border-none"
                >
                  <td className="py-3 px-6 text-center text-gray-700">
                    {beli_product.id_product}
                  </td>
                  <td className="py-3 px-6 text-center text-gray-700">
                    {beli_product.bukti_pembayaran ? (
                      <img
                        src={`data:image/jpeg;base64,${beli_product.bukti_pembayaran}`}
                        alt="Product Image"
                        className="w-44 h-auto object-cover rounded-lg shadow-md hover:scale-125 transition transform duration-300"
                      />
                    ) : (
                      <span className="italic text-gray-400">No Image</span>
                    )}
                  </td>
                  <td className="py-3 px-6 text-center text-gray-700">
                    {beli_product.tanggal}
                  </td>
                  <td>
                    <div
                      className={`py-3 px-6 text-center font-semibold ${
                        beli_product.status === "lunas"
                          ? "text-green-600 bg-green-100 rounded-lg"
                          : "text-red-600 bg-red-100 rounded-lg"
                      }`}
                    >
                      {" "}
                      {beli_product.status}
                    </div>
                  </td>
                  <td></td>
                  <td className="py-4 px-4 text-center">
                    <ConfirmButton
                      onClick={() => handleConfirmButton(beli_product)}
                    />
                    <RejectedButton
                      onClick={() => {
                        console.log("babi");
                        handleDeleteConfirmation(beli_product);
                      }}
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
          totalItems={tambahStocks.length}
          paginate={paginate}
          currentPage={currentPage}
        />
        <div className="mb-16"></div>
      </div>

      {/* Modal for Konfirmasi */}
      <Modal
        open={isConfirmationModalOpen}
        onClose={() => setisConfirmationModalOpen(false)}
      >
        {selectedUserConfirm && (
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
                Confirm Payment
              </h3>
              <div className="mt-2">
                <p className="text-sm text-gray-500">
                  Are you sure you want to confirm the payment for{" "}
                  <strong>{selectedUserConfirm.name}</strong>? This action
                  cannot be undone.
                </p>
              </div>

              {/* Confirmation button */}
              <div className="mt-4 sm:flex sm:justify-end">
                <button
                  onClick={konfirmasiPembayaran}
                  className="inline-flex w-full justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:w-auto sm:text-sm"
                >
                  Confirm Payment
                </button>
                <button
                  onClick={() => setisConfirmationModalOpen(false)}
                  className="mt-3 sm:mt-0 sm:ml-3 inline-flex w-full justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:w-auto sm:text-sm"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </Modal>

      <Modal
        open={isDeleteConfirmationModalOpen}
        onClose={() => setIsDeleteConfirmationModalOpen(false)}
      >
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
              Reject The Payment
            </h3>
            <div className="mt-2">
              <p className="text-sm text-gray-500">
                Are you sure you want to confirm the payment for ? This action
                cannot be undone.
              </p>
            </div>

            {/* Confirmation button */}
            <div className="mt-4 sm:flex sm:justify-end">
              <button
                onClick={hapusKonfirmasiPembayaran}
                className="inline-flex w-full justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:w-auto sm:text-sm"
              >
                Reject The Evident
              </button>
              <button
                onClick={() => setIsDeleteConfirmationModalOpen(false)}
                className="mt-3 sm:mt-0 sm:ml-3 inline-flex w-full justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:w-auto sm:text-sm"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </Modal>
    </main>
  );
}
