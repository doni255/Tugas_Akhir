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
    <div className="container mx-auto px-4 p-6 flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-8">Riwayat Transaksi Anda</h1>

      <Transition
        show={isLoaded}
        enter="transition ease-out duration-300 transform"
        enterFrom="opacity-0 scale-45"
        enterTo="opacity-100 scale-100"
        leave="transition ease-in duration-200 transform"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-60"
      >
        {isLoaded && historyCustomer.length > 0 ? (
          <div className="w-full bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Riwayat Pembelian
            </h2>
            <div className="space-y-4">
              {historyCustomer.map((item) => (
                <div
                  key={item.id_histori_beli_produk}
                  className="flex items-center justify-between border-b border-gray-200 pb-4"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={
                        item.konten_base64
                          ? `data:image/jpeg;base64,${item.konten_base64}`
                          : "https://via.placeholder.com/150"
                      }
                      alt={item.user?.nama || "Produk"}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                    <div className="flex flex-col max-w-xs">
                      <h3 className="text-lg font-semibold truncate w-56">
                        {item.user?.nama_pro || "Nama Tidak Diketahui"}
                      </h3>
                    </div>
                  </div>
                  <div>
                    <p className="text-lg font-semibold mt-2">
                      Status Pembayaran
                      <br />
                      <span className="font-extralight">{item.status}</span>
                    </p>
                  </div>
                  <div>
                    <p className="text-lg font-semibold mt-2">
                      Tanggal Pembelian
                      <br />
                      <span className="font-extralight">{item.tanggal}</span>
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p>Tidak ada riwayat pembelian</p>
        )}
      </Transition>
    </div>
  );
};

export default History;
