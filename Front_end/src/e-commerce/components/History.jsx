import React, { useState, useEffect } from "react";
import axios from "axios";
import { Transition } from "@headlessui/react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

const History = () => {
  const { id_user } = useParams(); // Assuming id_user comes from route params
  const [historyCustomer, setHistoryCustomer] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Fetch purchase history from API
  useEffect(() => {
    const id_user = localStorage.getItem("id_user"); // Get id_user from localStorage
    const fetchHistory = async () => {
      if (!id_user) return; // Ensure id_user is not null
      try {
        const response = await axios.get(
          `http://localhost:8000/api/histori_beli_produk/${id_user}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        const data = response.data.data;
        console.log("History Data:", data); // Debug history data

        setHistoryCustomer(response.data.data || []); // Assuming the data is in response.data.data
        setIsLoaded(true);
      } catch (error) {
        // toast.error("Error fetching history data");
        setIsLoaded(true);
      }
    };

    fetchHistory();
  }, [id_user]);

  // Handle print button click
  const handlePrint = (item) => {
    // Create the HTML content for the note
    const printContent = `
      <div style="font-family: 'Georgia', serif; padding: 40px; border: 2px solid #000; max-width: 600px; margin: 0 auto;">
        <div style="text-align: center; margin-bottom: 20px;">
          <h1 style="font-size: 24px; color: #4a4a4a; border-bottom: 2px solid #000; padding-bottom: 10px;">Nota Produk</h1>
          <h2 style="font-size: 18px; color: #333; margin-top: 5px;">Melawi Marine</h2>
        </div>
        <div style="margin-bottom: 15px; display: flex; justify-content: space-between; border-bottom: 1px solid #e0e0e0; padding-bottom: 10px;">
          <span style="font-weight: bold; color: #333;">Nama Product:</span>
          <span style="color: #555;">${item.nama_product}</span>
        </div>
        <div style="margin-bottom: 15px; display: flex; justify-content: space-between; border-bottom: 1px solid #e0e0e0; padding-bottom: 10px;">
          <span style="font-weight: bold; color: #333;">Harga Produk:</span>
          <span style="color: #555;">${item.harga_jual.toLocaleString("id-ID", {
            style: "currency",
            currency: "IDR",
          })}</span>
        </div>
        <div style="margin-bottom: 15px; display: flex; justify-content: space-between; border-bottom: 1px solid #e0e0e0; padding-bottom: 10px;">
          <span style="font-weight: bold; color: #333;">Jumlah:</span>
          <span style="color: #555;">${item.jumlah}</span>
        </div>
        <div style="margin-bottom: 15px; display: flex; justify-content: space-between; border-bottom: 1px solid #e0e0e0; padding-bottom: 10px;">
          <span style="font-weight: bold; color: #333;">Harga Total:</span>
          <span style="color: #555;">${item.harga_total_jual.toLocaleString("id-ID", {
            style: "currency",
            currency: "IDR",
          })}</span>
        </div>
        <div style="margin-bottom: 15px; display: flex; justify-content: space-between; border-bottom: 1px solid #e0e0e0; padding-bottom: 10px;">
          <span style="font-weight: bold; color: #333;">Tanggal Pembelian:</span>
          <span style="color: #555;">${item.tanggal}</span>
        </div>
        <div style="text-align: center; margin-top: 20px;">
          <p style="font-style: italic; color: #888;">Thank you for your purchase!</p>
          <p style="font-size: 12px; color: #999;">Melawi Marine - Providing quality products with exceptional service.</p>
        </div>
      </div>
    `;

    // Open a new window and write the content
    const printWindow = window.open("", "_blank");
    printWindow.document.write(`
      <html>
        <head>
          <title>Nota Produk</title>
          <style>
            @media print {
              body {
                display: flex;
                justify-content: center;
                align-items: center;
                height: 100vh;
                background-color: #f9f9f9;
              }
            }
          </style>
        </head>
        <body>
          ${printContent}
        </body>
      </html>
    `);
    // Close the document and print
    printWindow.document.close();
    printWindow.print();
  };

  return (
    <div className=" mx-auto px-4 py-6 flex flex-col items-center bg-gradient-to-br from-blue-50 to-white min-h-screen">
      <h1 className="text-5xl font-extrabold mb-10 text-gray-800">
        Riwayat Transaksi Anda
      </h1>

      <Transition
        show={isLoaded}
        enter="transition ease-out duration-300 transform"
        enterFrom="opacity-0 scale-45"
        enterTo="opacity-100 scale-100"
        leave="transition ease-in duration-300 transform"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 scale-60"
      >
        {isLoaded && historyCustomer.length > 0 ? (
          <div className="w-4/5 bg-white shadow-xl rounded-2xl p-8">
            <h2 className="text-3xl font-bold text-gray-700 mb-8 border-b pb-4">
              Riwayat Pembelian
            </h2>
            <div className="grid gap-8 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 p-6">
              {historyCustomer.map((item) => (
                <div
                  key={item.id_histori_beli_produk}
                  className="bg-gradient-to-br from-gray-800 to-gray-900 text-white rounded-2xl p-6 hover:shadow-2xl transform transition duration-500 hover:scale-105 border border-gray-700 relative"
                >
                  {/* Product Image */}
                  <div className="relative flex justify-center items-center">
                    <img
                      src={
                        item.gambar
                          ? `data:image/jpeg;base64,${item.gambar}`
                          : "https://via.placeholder.com/150"
                      }
                      alt={item.nama_product || "Produk"}
                      className="w-48 h-48 object-cover rounded-xl shadow-lg border-4 border-gray-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent rounded-xl opacity-50"></div>
                  </div>

                  {/* Product Details */}
                  <div className="mt-4 text-center">
                    <h3 className="text-xl font-bold text-white truncate">
                      {item.nama_product || "Nama Tidak Diketahui"}
                    </h3>
                  </div>

                  {/* Purchase Date */}
                  <div className="mt-2 text-center">
                    <p className="text-gray-400 text-sm">Tanggal Pembelian</p>
                    <span className="text-lg font-semibold text-yellow-400">
                      {item.tanggal}
                    </span>
                  </div>

                  {/* Product Price */}
                  <div className="mt-2 text-center">
                    <p className="text-gray-400 text-sm">Harga Produk</p>
                    <span className="text-lg font-semibold text-yellow-400">
                      {item.harga_jual.toLocaleString("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      })}
                    </span>
                  </div>

                  <div className="mt-2 text-center">
                    <p className="text-gray-400 text-sm">Jumlah Produk</p>
                    <span className="text-lg font-semibold text-yellow-400">
                      {item.jumlah}
                    </span>
                  </div>

                  <div className="mt-2 text-center">
                    <p className="text-gray-400 text-sm">Harga Total</p>
                    <span className="text-lg font-semibold text-yellow-400">
                      {item.harga_total_jual.toLocaleString("id-ID", {
                        style: "currency",
                        currency: "IDR",
                      })}
                    </span>
                  </div>

                  {/* Print Note Button */}
                  <div className="mt-4 text-center">
                    <button
                      onClick={() => handlePrint(item)}
                      className="bg-green-800 hover:bg-green-700 text-gold-500 font-bold py-2 px-6 rounded-lg shadow-lg border border-gold-500 transition duration-300 ease-in-out"
                      style={{
                        backgroundColor: "#004d40", // Deep green
                        color: "#d4af37", // Gold text
                        borderColor: "#d4af37", // Gold border
                      }}
                    >
                      Cetak Nota
                    </button>
                  </div>

                  {/* Decorative Elements */}
                  <div className="absolute -top-3 -right-3 bg-yellow-500 rounded-full w-6 h-6 animate-ping opacity-75"></div>
                  <div className="absolute -bottom-3 -left-3 bg-yellow-500 rounded-full w-4 h-4 animate-pulse"></div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center h-full p-8 text-center bg-white shadow-md rounded-lg">
            <div className="w-32 h-32 mb-6 flex items-center justify-center text-6xl">
              😢
            </div>
            <h2 className="text-2xl font-semibold text-gray-700 mb-4">
              Riwayat Transaksi Anda Kosong
            </h2>
            <p className="text-gray-500 mb-6">
              Belum ada produk yang pernah anda beli. Silakan jelajahi produk
              kami dan checkout produk yang Anda sukai
            </p>
            <button
              onClick={() => navigate("/e-commerce/products")} // Replace with your actual product page route
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

export default History;
