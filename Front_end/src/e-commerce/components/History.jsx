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
        toast.error("Error fetching history data");
        setIsLoaded(true);
      }
    };

    fetchHistory();
  }, [id_user]);

  return (
    // <div className="container mx-auto px-4 p-6 flex flex-col items-center">
    //   <h1 className="text-4xl font-bold mb-8">Riwayat Transaksi Anda</h1>

    //   <Transition
    //     show={isLoaded}
    //     enter="transition ease-out duration-300 transform"
    //     enterFrom="opacity-0 scale-45"
    //     enterTo="opacity-100 scale-100"
    //     leave="transition ease-in duration-200 transform"
    //     leaveFrom="opacity-100 scale-100"
    //     leaveTo="opacity-0 scale-60"
    //   >
    //     {isLoaded && historyCustomer.length > 0 ? (
    //       <div className="w-full bg-white shadow-md rounded-lg p-6">
    //         <h2 className="text-2xl font-semibold text-gray-800 mb-6">
    //           Riwayat Pembelian
    //         </h2>
    //         <div className="space-y-4">
    //           {historyCustomer.map((item) => (
    //             <div
    //               key={item.id_histori_beli_produk}
    //               className="flex items-center justify-between border-b border-gray-200 pb-4"
    //             >
    //               <div className="flex items-center gap-4">
    //                 <img
    //                   src={
    //                     item.gambar
    //                       ? `data:image/jpeg;base64,${item.gambar}`
    //                       : "https://via.placeholder.com/150"
    //                   }
    //                   alt={item.nama_product || "Produk"}
    //                   className="w-24 h-24 object-cover rounded-lg"
    //                 />
    //                 <div className="flex flex-col max-w-xs">
    //                   <h3 className="text-lg font-semibold truncate w-56">
    //                     {item.nama_product || "Nama Tidak Diketahui"}
    //                   </h3>
    //                 </div>
    //               </div>
    //               <div className="p-4 border rounded-lg shadow-md bg-white w-full max-w-md">
    //                 <p className="text-xl font-bold text-gray-700 mb-2">
    //                   Status Pembayaran
    //                 </p>
    //                 <div
    //                   className={`flex items-center justify-between p-4 rounded-lg transition-all duration-300 ${
    //                     item.status === "lunas"
    //                       ? "bg-green-100 border border-green-400"
    //                       : "bg-gray-100 border border-gray-300"
    //                   }`}
    //                 >
    //                   <div className="flex items-center space-x-3">
    //                     <span
    //                       className={`inline-flex items-center justify-center w-8 h-8 rounded-full text-white ${
    //                         item.status === "lunas"
    //                           ? "bg-green-500"
    //                           : "bg-gray-500"
    //                       }`}
    //                     >
    //                       {item.status === "lunas" ? (
    //                         <svg
    //                           xmlns="http://www.w3.org/2000/svg"
    //                           fill="none"
    //                           viewBox="0 0 24 24"
    //                           strokeWidth={2}
    //                           stroke="currentColor"
    //                           className="w-5 h-5"
    //                         >
    //                           <path
    //                             strokeLinecap="round"
    //                             strokeLinejoin="round"
    //                             d="M5 13l4 4L19 7"
    //                           />
    //                         </svg>
    //                       ) : (
    //                         <svg
    //                           xmlns="http://www.w3.org/2000/svg"
    //                           fill="none"
    //                           viewBox="0 0 24 24"
    //                           strokeWidth={2}
    //                           stroke="currentColor"
    //                           className="w-5 h-5"
    //                         >
    //                           <path
    //                             strokeLinecap="round"
    //                             strokeLinejoin="round"
    //                             d="M6 18L18 6M6 6l12 12"
    //                           />
    //                         </svg>
    //                       )}
    //                     </span>
    //                     <span
    //                       className={`text-lg font-medium ${
    //                         item.status === "lunas"
    //                           ? "text-green-600"
    //                           : "text-gray-600"
    //                       }`}
    //                     >
    //                       {item.status.charAt(0).toUpperCase() +
    //                         item.status.slice(1)}
    //                     </span>
    //                   </div>

    //                   {item.status === "lunas" && (
    //                     <div className="flex items-center space-x-2 animate-pulse">
    //                       <span className="text-green-500 font-semibold">
    //                         ✔ Lunas
    //                       </span>
    //                     </div>
    //                   )}
    //                 </div>
    //               </div>

    //               <div>
    //                 <p className="text-lg font-semibold mt-2">
    //                   Tanggal Pembelian
    //                   <br />
    //                   <span className="font-extralight">{item.tanggal}</span>
    //                 </p>
    //               </div>
    //             </div>
    //           ))}
    //         </div>
    //       </div>
    //     ) : (
    //       <p>Tidak ada riwayat pembelian</p>
    //     )}
    //   </Transition>
    // </div>

    <div className=" mx-auto px-4 py-6 flex flex-col items-center bg-gradient-to-br from-blue-50 to-white min-h-screen">
      <h1 className="text-5xl font-extrabold mb-10 text-gray-800">
        Riwayat Transaksi Anda
      </h1>

      <Transition
        show={isLoaded}
        enter="transition ease-out duration-500 transform"
        enterFrom="opacity-0 translate-y-10"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-300 transform"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-10"
      >
        {isLoaded && historyCustomer.length > 0 ? (
          <div className="w-4/5 bg-white shadow-xl rounded-2xl p-8">
            <h2 className="text-3xl font-bold text-gray-700 mb-8 border-b pb-4">
              Riwayat Pembelian
            </h2>
            <div className="space-y-8">
              {historyCustomer.map((item) => (
                <div
                  key={item.id_histori_beli_produk}
                  className="flex flex-col md:flex-row items-center justify-between border-b border-gray-200 pb-6 hover:bg-gray-50 transition duration-300 rounded-xl p-4"
                >
                  {/* Product Image */}
                  <div className="flex items-center p-6 rounded-xl gap-6 mb-4 md:mb-0 transform transition duration-500 hover:scale-105 hover:shadow-2xl">
                    <img
                      src={
                        item.gambar
                          ? `data:image/jpeg;base64,${item.gambar}`
                          : "https://via.placeholder.com/150"
                      }
                      alt={item.nama_product || "Produk"}
                      className="w-32 h-32 object-cover rounded-xl shadow-md"
                    />
                    <div className="flex flex-col max-w-xs">
                      <h3 className="text-xl font-semibold truncate w-56 text-gray-700">
                        {item.nama_product || "Nama Tidak Diketahui"}
                      </h3>
                      <span className="text-sm text-gray-500">
                        ID Produk: {item.id_histori_beli_produk}
                      </span>
                    </div>
                  </div>
                  {/* Payment Status */}
                  <div className="flex flex-col  items-center p-6 rounded-xl transform transition duration-500 hover:scale-105 hover:shadow-2xl">
                    <p className="text-xl font-bold text-gray-800 mb-3">
                      Status Pembayaran
                    </p>
                    <div
                      className={`flex items-center justify-between p-4 rounded-full w-64 ${
                        item.status === "lunas"
                          ? "bg-gradient-to-r from-green-200 to-green-100"
                          : "bg-gradient-to-r from-yellow-200 to-yellow-100"
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <span
                          className={`inline-flex items-center justify-center w-10 h-10 rounded-full text-white shadow-lg ${
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
                              className="w-5 h-5"
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
                              className="w-5 h-5"
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
                          className={`text-lg font-medium ${
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
                        <div className="flex items-center space-x-2 animate-pulse">
                          <span className="text-green-500 font-semibold">
                            ✔ Lunas
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Purchase Date */}
                  <div className="flex flex-col items-center p-6 rounded-xl gap-6 mb-4 md:mb-0 transform transition duration-500 hover:scale-105 hover:shadow-2xl">
                    <p className="text-lg font-semibold text-gray-800">
                      Tanggal Pembelian
                    </p>
                    <span className="font-light text-gray-500">
                      {item.tanggal}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p className="text-center text-gray-500 mt-10">
            Tidak ada riwayat pembelian
          </p>
        )}
      </Transition>
    </div>
  );
};

export default History;
