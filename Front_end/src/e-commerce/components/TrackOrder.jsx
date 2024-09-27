import React, { useState, useEffect } from "react";
import axios from "axios";
import { Transition } from "@headlessui/react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const TrackOrder = () => {
  const [TrackOrders, setTrackOrders] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);
  const navigate = useNavigate();
  const [selectedIdBeliProduk, setSelectedIdBeliProduk] = useState(null);

  const fetchTrackOrder = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/status_pengiriman_produk/${localStorage.getItem(
          "id_user"
        )}`
      );
      if (response.data.message === "Retrieve data success") {
        setTrackOrders(response.data.data);
      }
      setIsLoaded(true);
    } catch (error) {
      setIsLoaded(true);
      setTrackOrders([]);
    }
  };

  const handleSubmitPesanan = () => {
    console.log("id produk in handel submit", selectedIdBeliProduk);

    

    try {
      const response = axios.post(
        `http://localhost:8000/api/konfirmasi_penerimaan_produk/${selectedIdBeliProduk}`
      );
      toast.success("Pesanan Diterima");
      fetchTrackOrder();
    } catch (error) {
      toast.error("Gagal menerima pesanan");
    }
  };

  const handleTerimaPesanan = (id_beli_produk) => {
    console.log("Terima Pesanan", id_beli_produk);
    setSelectedIdBeliProduk(id_beli_produk);
    setIsPaymentModalOpen(true);
  };

  // const handleSubmitPayment = (e) => {
  //   e.preventDefault();
  //   if (selectedFile && selectedIdBeliProduk) {
  //     paymentProduct(selectedIdBeliProduk, selectedFile);
  //   } else {
  //     toast.error("Please select a file to upload.");
  //   }
  // };

  const getStatusFlags = (status) => {
    const trimmedStatus = status.trim().toLowerCase();
    return {
      confirmed: ["confirmed", "shipped", "delivered"].includes(trimmedStatus),
      shipped: ["shipped", "delivered"].includes(trimmedStatus),
      delivered: trimmedStatus === "delivered",
    };
  };

  useEffect(() => {
    fetchTrackOrder();
  }, []);

  return (
    <div className="mx-auto px-4 py-6 flex flex-col items-center bg-gradient-to-br from-blue-50 to-white min-h-screen">
      <h1 className="text-5xl font-extrabold mb-10 text-gray-800">
        Keranjang Pembelian
      </h1>

      {/* Payment Modal */}
      <Transition
        show={isPaymentModalOpen}
        enter="transition ease-out duration-300 transform"
        enterFrom="opacity-0 scale-70"
        enterTo="opacity-100 scale-100"
        leave="transition ease-in duration-200 transform"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-60"
      >
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60"
          onClick={() => setIsPaymentModalOpen(false)}
        >
          <div className="relative bg-white p-6 sm:p-10 rounded-lg shadow-2xl w-1/2b max-w-lg max-h-screen overflow-y-auto">
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 transition-transform hover:scale-110"
              onClick={() => setIsPaymentModalOpen(false)}
            >
              &#x2715;
            </button>
            <h2 className="text-2xl font-bold text-gray-800 mb-5 text-center">
              Selesaikan Pemesanan
            </h2>
            <button
              type="submit"
              className="w-full py-3 bg-indigo-600 text-white text-lg font-semibold rounded-md shadow-lg hover:bg-indigo-500 transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              onClick={handleSubmitPesanan}
            >
              Submit
            </button>
            {/* <form onSubmit={handleSubmitPayment}>
              <div className="mt-5">
                <label
                  htmlFor="file-upload"
                  className="block text-lg font-medium text-gray-700 mb-2"
                >
                  Upload File
                </label>
                <div className="flex items-center justify-center w-full">
                  <label
                    htmlFor="file-upload"
                    className="cursor-pointer flex flex-col items-center justify-center w-full h-36 bg-gray-50 rounded-md border-2 border-dashed border-gray-300 text-gray-500 hover:bg-gray-100 transition-all"
                  >
                    <svg
                      className="w-12 h-12 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M7 16V12M7 12V8m0 4l10 10M7 16H3m4 0a3 3 0 01-3-3V5a3 3 0 013-3h10a3 3 0 013 3v10a3 3 0 01-3 3H7z"
                      />
                    </svg>
                    <span className="mt-2 text-sm leading-normal">
                      Drag & Drop or Click to Upload
                    </span>
                    <input
                      id="file-upload"
                      type="file"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                  </label>
                </div>
              </div>
              <div className="mt-6">
                <button
                  type="submit"
                  className="w-full py-3 bg-indigo-600 text-white text-lg font-semibold rounded-md shadow-lg hover:bg-indigo-500 transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Submit
                </button>
              </div>
            </form> */}
          </div>
        </div>
      </Transition>

      {/* Track Orders Display */}
      <Transition
        show={isLoaded}
        enter="transition ease-out duration-300 transform"
        enterFrom="opacity-0 scale-45"
        enterTo="opacity-100 scale-100"
        leave="transition ease-in duration-300 transform"
        leaveFrom="opacity-100 scale-y-0"
        leaveTo="opacity-0 scale-60"
      >
        {isLoaded && TrackOrders.length > 0 ? (
          <div className="w-full bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Produk di Keranjang
            </h2>
            <div className="space-y-4">
              {TrackOrders.map((item) => {
                const statusFlags = getStatusFlags(item.status_pengiriman);

                return (
                  <div
                    key={item.id_beli_produk}
                    className="flex items-center justify-between border-b border-gray-200 pb-4"
                  >
                    <div className="flex items-center gap-4">
                      <img
                        src={
                          item.product.konten_base64
                            ? `data:image/jpeg;base64,${item.product.konten_base64}`
                            : "https://via.placeholder.com/150"
                        }
                        alt={item.product?.nama_product}
                        className="w-24 h-24 object-cover rounded-lg"
                      />
                      <div className="flex flex-col max-w-xs">
                        <h3 className="text-lg font-semibold truncate w-56">
                          {item.product.nama_product}
                        </h3>
                        <p className="text-gray-500">
                          {item.product.kategori_produk}
                        </p>
                      </div>
                    </div>

                    {/* Status Pengiriman */}
                    <div className="flex flex-col items-center">
                      <h2 className="text-2xl font-bold text-gray-800 mb-2">
                        Status Pengiriman
                      </h2>
                      <div className="flex items-center space-x-6">
                        {["confirmed", "shipped", "delivered"].map(
                          (status_pengiriman, index) => {
                            const isActive = statusFlags[status_pengiriman];
                            const bgColor = isActive
                              ? "bg-gradient-to-r from-green-300 to-green-200"
                              : "bg-gradient-to-r from-gray-200 to-gray-100";

                            return (
                              <div
                                key={index}
                                className={`flex flex-col items-center p-4 rounded-lg transition duration-500 transform hover:scale-105 hover:shadow-lg ${bgColor}`}
                              >
                                <div
                                  className={`flex items-center justify-center w-16 h-16 rounded-full shadow-md ${
                                    isActive ? "bg-green-500" : "bg-gray-300"
                                  }`}
                                >
                                  {isActive ? (
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                      strokeWidth="2"
                                      className="w-8 h-8 text-white"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M5 13l4 4L19 7"
                                      />
                                    </svg>
                                  ) : (
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      fill="none"
                                      viewBox="0 0 24 24"
                                      stroke="currentColor"
                                      strokeWidth="2"
                                      className="w-8 h-8 text-gray-500"
                                    >
                                      <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M3 12h18m-6 6l6-6-6-6"
                                      />
                                    </svg>
                                  )}
                                </div>
                                <span
                                  className={`mt-2 text-sm font-semibold ${
                                    isActive
                                      ? "text-green-700"
                                      : "text-gray-500"
                                  }`}
                                >
                                  {status_pengiriman.charAt(0).toUpperCase() +
                                    status_pengiriman.slice(1)}
                                </span>
                              </div>
                            );
                          }
                        )}
                      </div>
                    </div>

                    <div>
                      <p className="text-lg font-semibold mt-2">
                        Tanggal Pengiriman
                        <br />
                        <span className="font-extralight">{item.tanggal}</span>
                      </p>
                    </div>

                    {/* Payment Button */}
                    <button
                      className="px-6 py-2 bg-gradient-to-r from-green-400 to-green-500 text-white font-bold rounded-lg shadow-lg hover:shadow-xl hover:from-green-500 hover:to-green-600 transition-all transform hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-opacity-50"
                      onClick={() => handleTerimaPesanan(item.id_beli_produk)}
                    >
                      Terima Pesanan
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <p className="text-gray-500 mt-10">
            No trackable orders found. Please try again later.
          </p>
        )}
      </Transition>
    </div>
  );
};

export default TrackOrder;
