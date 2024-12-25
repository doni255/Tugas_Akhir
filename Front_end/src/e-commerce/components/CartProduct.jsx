import React, { useState, useEffect } from "react";
import axios from "axios";
import { Transition } from "@headlessui/react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

const CartProduct = () => {
  const [cartProducts, setCartProducts] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);
  const [isCheckoutAllModalOpen, setIsCheckoutAllModalOpen] = useState(false);

  // Bagian Gambar
  const [imagePreview, setImagePreview] = useState(null);
  const [imageOrientation, setImageOrientation] = useState("landscape");
  const [isImageVisible, setIsImageVisible] = useState(true);

  const [selectedFile, setSelectedFile] = useState(null);
  const navigate = useNavigate();
  const [selectedIdBeliProduk, setSelectedIdBeliProduk] = useState(null);

  const fetchCartProduct = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/keranjang_pembelian/` +
          localStorage.getItem("id_user")
      );

      if (response.data.message === "Retrieve data success") {
        setCartProducts(response.data.data);
      }

      setIsLoaded(true);
    } catch (error) {
      setIsLoaded(true);
      setCartProducts([]); // Reset the cartProducts state on error
    }
  };

  const deleteCartProduct = async (id_beli_produk) => {
    try {
      await axios.delete(
        `http://localhost:8000/api/hapus_keranjang/${id_beli_produk}`
      );
      toast.success("Produk berhasil dihapus dari keranjang.");
      fetchCartProduct();
    } catch (error) {
      console.error("Error deleting cart products:", error);
      toast.error("Failed to delete cart product.");
    }
  };

  const paymentProduct = async (id_beli_produk, file) => {
    const formData = new FormData();
    formData.append("bukti_pembayaran", file);

    try {
      await axios.post(
        `http://localhost:8000/api/keranjang_pembelian/beli_product/${id_beli_produk}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      toast.success("Produk berhasil dibeli.");
      setIsPaymentModalOpen(false);
      fetchCartProduct();
    } catch (error) {
      console.error("Error purchasing product:", error);
      toast.error("Gagal membeli produk.");
    }
  };

  const CheckOutAll = async () => {
    try {
      if (!selectedFile) {
        toast.error("Please select a payment proof file.");
        return;
      }

      const formData = new FormData();
      formData.append("bukti_pembayaran", selectedFile);

      const response = await axios.post(
        "http://localhost:8000/api/keranjang_pembelian/beli_all_products",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      toast.success("All products purchased successfully.");
      fetchCartProduct(); // Update the cart after purchase
    } catch (error) {
      console.error("Error checking out all products:", error);
      toast.error("Failed to checkout all products.");
    }
  };

  const handlePaymentClick = (id_beli_produk) => {
    setSelectedIdBeliProduk(id_beli_produk);
    setIsPaymentModalOpen(true);
  };

  const handleCheckOutAll = () => {
    setIsCheckoutAllModalOpen(true);

  };

  const handleSubmitPayment = (e) => {
    e.preventDefault();
    if (selectedFile && selectedIdBeliProduk) {
      paymentProduct(selectedIdBeliProduk, selectedFile);
    } else {
      toast.error("Please select a file to upload.");
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);

        const img = new Image();
        img.src = reader.result;
        img.onload = () => {
          setImageOrientation(
            img.width > img.height ? "landscape" : "portrait"
          );
        };
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  const toggleImageVisibility = (event) => {
    event.preventDefault();
    setIsImageVisible(!isImageVisible);
  };

  useEffect(() => {
    fetchCartProduct();
  }, []);

  return (
    <div className="mx-auto px-4 py-6 flex flex-col items-center bg-gradient-to-br from-blue-50 to-white min-h-screen">
      <h1 className="text-5xl font-extrabold mb-10 text-gray-800">
        Keranjang Pembelian
      </h1>

        {/* Modal with Transition */}
        <Transition
        show={isCheckoutAllModalOpen}
        enter="transition ease-out duration-300 transform"
        enterFrom="opacity-0 scale-70"
        enterTo="opacity-100 scale-100"
        leave="transition ease-in duration-200 transform"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-60"
      >
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60"
          onClick={() => setIsCheckoutAllModalOpen(false)} // Close modal when clicking outside
        >
          <div
            className="relative bg-white p-6 sm:p-10 rounded-lg shadow-2xl w-full max-w-lg max-h-screen overflow-y-auto"
            onClick={(e) => e.stopPropagation()} // Prevent click inside modal from closing
          >
            {/* Close button (x) */}
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 transition-transform hover:scale-110"
              onClick={() => setIsCheckoutAllModalOpen(false)}
            >
              &#x2715;
            </button>

            {/* Modal Header */}
            <h2 className="text-2xl font-bold text-gray-800 mb-5 text-center">
              Complete Your Payment
            </h2>

            {/* Form */}
            <form onSubmit={handleCheckOutAll}>
              {/* File Input */}
              <div className="mt-5">
                <div>
                  <p className="text-lg font-semibold">
                    Harga Total:{" "}
                    <span className="font-extralight">
                      Rp
                      {cartProducts
                        .reduce(
                          (acc, item) => acc + item.product.harga_total * item.jumlah,
                          0
                        )
                        .toLocaleString()}
                    </span>
                  </p>
                </div>
                <label
                  htmlFor="file-upload"
                  className="block text-lg font-medium text-gray-700 mb-2"
                >
                  Upload File
                </label>
                <div className="flex items-center justify-center w-full">
                  <label
                    htmlFor="file-upload"
                    className="cursor-pointer flex flex-col items-center justify-center w-full h-36 bg-gray-50 rounded-md border-2 border-dashed border-gray-300 text-gray-500 hover:bg-gray-100 hover:border-indigo-500 transition-all"
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

              {/* Image Preview */}
              {imagePreview && (
                <div className="mt-5">
                  <h3 className="text-lg font-semibold text-gray-700 mb-3">
                    Image Preview:
                  </h3>

                  <button
                    onClick={toggleImageVisibility}
                    className="mb-4 py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                  >
                    {isImageVisible ? "Hide Image" : "Show Image"}
                  </button>

                  {isImageVisible && (
                    <div>
                      <img
                        src={imagePreview}
                        alt="Upload Preview"
                        className={`rounded-lg shadow-md ${
                          imageOrientation === "landscape"
                            ? "w-full max-w-3xl max-h-72 object-contain"
                            : "w-full max-w-xs max-h-96 object-contain"
                        }`}
                      />
                    </div>
                  )}
                </div>
              )}

              {/* Submit Button */}
              <div className="mt-6">
                <button
                  type="submit"
                  className="w-full py-3 bg-indigo-600 text-white text-lg font-semibold rounded-md shadow-lg hover:bg-indigo-500 transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Submit
                </button>
              </div>
            </form>

            {/* Divider */}
            <div className="mt-8 border-t border-gray-200"></div>

            {/* Bank Account Information */}
            <div className="mt-6 text-center">
              <h3 className="text-xl font-semibold text-gray-800">
                Bank Account Information
              </h3>
              <p className="mt-2 text-lg text-gray-600">
                BRI: <span className="font-bold">DONI WIJAYA</span>
              </p>
              <p className="text-lg text-gray-600">(1162 0102 7946 501)</p>
            </div>
          </div>
        </div>
      </Transition>

      {/* Modal with Transition */}
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
          onClick={() => setIsPaymentModalOpen(false)} // Close modal when clicking outside
        >
          <div
            className="relative bg-white p-6 sm:p-10 rounded-lg shadow-2xl w-full max-w-lg max-h-screen overflow-y-auto"
            onClick={(e) => e.stopPropagation()} // Prevent click inside modal from closing
          >
            {/* Close button (x) */}
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 transition-transform hover:scale-110"
              onClick={() => setIsPaymentModalOpen(false)}
            >
              &#x2715;
            </button>

            {/* Modal Header */}
            <h2 className="text-2xl font-bold text-gray-800 mb-5 text-center">
              Complete Your Payment
            </h2>

            {/* Form */}
            <form onSubmit={handleSubmitPayment}>
              {/* File Input */}
              <div className="mt-5">
              <div>
        <p className="text-lg font-semibold">
          Harga Total:{" "}
          <span className="font-extralight">
            Rp
            {(() => {
              const selectedItem = cartProducts.find(
                (item) => item.id_beli_produk === selectedIdBeliProduk
              );
              return selectedItem
                ? (selectedItem.product.harga_total_jual * selectedItem.jumlah).toLocaleString()
                : "0";
            })()}
          </span>
        </p>
      </div>
                <label
                  htmlFor="file-upload"
                  className="block text-lg font-medium text-gray-700 mb-2"
                >
                  Upload File
                </label>
                <div className="flex items-center justify-center w-full">
                  <label
                    htmlFor="file-upload"
                    className="cursor-pointer flex flex-col items-center justify-center w-full h-36 bg-gray-50 rounded-md border-2 border-dashed border-gray-300 text-gray-500 hover:bg-gray-100 hover:border-indigo-500 transition-all"
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

              {/* Image Preview */}
              {imagePreview && (
                <div className="mt-5">
                  <h3 className="text-lg font-semibold text-gray-700 mb-3">
                    Image Preview:
                  </h3>

                  <button
                    onClick={toggleImageVisibility}
                    className="mb-4 py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                  >
                    {isImageVisible ? "Hide Image" : "Show Image"}
                  </button>

                  {isImageVisible && (
                    <div>
                      <img
                        src={imagePreview}
                        alt="Upload Preview"
                        className={`rounded-lg shadow-md ${
                          imageOrientation === "landscape"
                            ? "w-full max-w-3xl max-h-72 object-contain"
                            : "w-full max-w-xs max-h-96 object-contain"
                        }`}
                      />
                    </div>
                  )}
                </div>
              )}

              {/* Submit Button */}
              <div className="mt-6">
                <button
                  type="submit"
                  className="w-full py-3 bg-indigo-600 text-white text-lg font-semibold rounded-md shadow-lg hover:bg-indigo-500 transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Submit
                </button>
              </div>
            </form>

            {/* Divider */}
            <div className="mt-8 border-t border-gray-200"></div>

            {/* Bank Account Information */}
            <div className="mt-6 text-center">
              <h3 className="text-xl font-semibold text-gray-800">
                Bank Account Information
              </h3>
              <p className="mt-2 text-lg text-gray-600">
                BRI: <span className="font-bold">DONI WIJAYA</span>
              </p>
              <p className="text-lg text-gray-600">(1162 0102 7946 501)</p>
            </div>
          </div>
        </div>
      </Transition>

      <Transition
        show={isLoaded}
        enter="transition ease-out duration-300 transform"
        enterFrom="opacity-0 scale-45"
        enterTo="opacity-100 scale-100"
        leave="transition ease-in duration-300 transform"
        leaveFrom="opacity-100 scale-y-0"
        leaveTo="opacity-0 scale-60"
      >
        {isLoaded && cartProducts.length > 0 ? (
          <div className="w-full bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Produk di Keranjang
            </h2>
            <div className="space-y-4">
              {cartProducts.map((item) => (
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
                  {/* Payment Status */}
                  <div className="flex flex-col items-center p-2 rounded-lg transform transition duration-500 hover:scale-105 hover:shadow-lg">
                    <p className="text-lg font-bold text-gray-800 mb-2">
                      Bukti Pembayaran
                    </p>
                    <div
                      className={`flex items-center justify-between p-2 rounded-full w-48 ${
                        item.status === "lunas"
                          ? "bg-gradient-to-r from-green-200 to-green-100"
                          : "bg-gradient-to-r from-yellow-200 to-yellow-100"
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        <span
                          className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-white shadow-md ${
                            item.status === "lunas"
                              ? "bg-green-500"
                              : "bg-yellow-500"
                          }`}
                        >
                          {item.status === "lunas" ? (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={2}
                              stroke="currentColor"
                              className="w-4 h-4"
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
                              strokeWidth={2}
                              stroke="currentColor"
                              className="w-4 h-4"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                          )}
                        </span>
                        <span
                          className={`text-sm font-medium ${
                            item.status === "lunas"
                              ? "text-green-700"
                              : "text-yellow-700"
                          }`}
                        >
                          {item.status.charAt(0).toUpperCase() +
                            item.status.slice(1)}
                        </span>
                      </div>
                      {item.status === "lunas" && (
                        <div className="flex items-center space-x-1 animate-pulse">
                          <span className="text-green-500 text-sm font-semibold">
                            ✔ Lunas
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Confirmation Status */}
                  <div className="flex flex-col items-center p-2 rounded-lg transform transition duration-500 hover:scale-105 hover:shadow-lg">
                    <p className="text-lg font-bold text-gray-800 mb-2">
                      Status Konfirmasi
                    </p>
                    <div
                      className={`flex items-center justify-between p-2 rounded-full w-48 ${
                        item.status_pengiriman === "confirmed"
                          ? "bg-gradient-to-r from-green-200 to-green-100"
                          : "bg-gradient-to-r from-yellow-200 to-yellow-100"
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        <span
                          className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-white shadow-md ${
                            item.status_pengiriman === "confirmed"
                              ? "bg-green-500"
                              : "bg-yellow-500"
                          }`}
                        >
                          {item.status_pengiriman === "confirmed" ? (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              fill="none"
                              viewBox="0 0 24 24"
                              strokeWidth={2}
                              stroke="currentColor"
                              className="w-4 h-4"
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
                              strokeWidth={2}
                              stroke="currentColor"
                              className="w-4 h-4"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 18L18 6M6 6l12 12"
                              />
                            </svg>
                          )}
                        </span>
                        <span
                          className={`text-sm font-medium ${
                            item.status_pengiriman === "confirmed"
                              ? "text-green-700"
                              : "text-yellow-700"
                          }`}
                        >
                          {item.status_pengiriman
                            ? item.status_pengiriman.charAt(0).toUpperCase() +
                              item.status_pengiriman.slice(1)
                            : "Status tidak diketahui"}
                        </span>
                      </div>
                      {item.status_pengiriman === "sudah dikonfirmasi" && (
                        <div className="flex items-center space-x-1 animate-pulse">
                          <span className="text-green-500 text-sm font-semibold">
                            ✔ Sudah Dikonfirmasi
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div>
                    <p className="text-lg font-semibold mt-2">
                      Harga Produk
                      <br />
                      <span className="font-extralight">
                        {item.product.harga_total_jual}
                      </span>
                    </p>
                  </div>

                  <div>
                    <p className="text-lg font-semibold mt-2">
                      Jumlah
                      <br />
                      <span className="font-extralight">{item.jumlah}</span>
                    </p>
                  </div>
                  <div>
                    <p className="text-lg font-semibold mt-2">
                      Tanggal Pemesanan
                      <br />
                      <span className="font-extralight">{item.tanggal}</span>
                    </p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => handlePaymentClick(item.id_beli_produk)} // Set product for payment
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                    >
                      Bayar Sekarang
                    </button>
                    <button
                      onClick={() => deleteCartProduct(item.id_beli_produk)}
                      className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 w-full" // Add w-full to make the button full width
                    >
                      Hapus
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Checkout All Button */}
              {/* <div className="mt-6 flex justify-end">
                <button
                  onClick={handleCheckOutAll}
                  className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition font-semibold"
                >
                  Checkout Semua Produk
                </button>
              </div> */}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full p-8 text-center bg-white shadow-md rounded-lg">
            <div className="w-32 h-32 mb-6 flex items-center justify-center text-6xl">
              😢
            </div>
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              Keranjang Anda Kosong
            </h2>
            <p className="text-gray-500 mb-6">
              Belum ada produk yang ditambahkan ke keranjang. Silakan jelajahi
              produk kami dan tambahkan produk yang Anda sukai ke keranjang.
            </p>
            <button
              onClick={() => navigate("/e-commerce/products")}
              className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition font-semibold"
            >
              Belanja Sekarang
            </button>
          </div>
        )}
      </Transition>
    </div>
  );
};

export default CartProduct;
