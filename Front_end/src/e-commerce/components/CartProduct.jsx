import React, { useState, useEffect } from "react";
import axios from "axios";
import { Transition } from "@headlessui/react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const CartProduct = () => {
  const [formKeranjangData, setFormKeranjangData] = useState({
    id_user: "",
    id_product: "",
    harga_beli: "",
    konten_base64: "",
  });

  const [cartProducts, setCartProducts] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const navigate = useNavigate();

  const fetchCartProduct = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/keranjang_pembelian/` +
          localStorage.getItem("id_user")
      );

      // Debugging: Check API response data structure
      console.log("API response data:", response.data);

      if (response.data.message === "Retrieve data success") {
        setCartProducts(response.data.data); // Set the cartProducts state
      } else {
        toast.error("No data found.");
      }

      setIsLoaded(true);
    } catch (error) {
      console.error("Error fetching cart products:", error);
      setIsLoaded(true);
      toast.error("Failed to load cart data.");
    }
  };

  const deleteCartProduct = async (id_beli_produk) => {
    try {
      const response = await axios.delete(
        `http://localhost:8000/api/hapus_keranjang/${id_beli_produk}`
      );
      toast.success("Produk berhasil dihapus dari keranjang.");

      // Fetch ulang data keranjang setelah berhasil menghapus produk
      fetchCartProduct();
    } catch (error) {
      console.error("Error delete cart products:", error);
      toast.error("Failed to delete cart data.");
    } 
  };

  useEffect(() => {
    fetchCartProduct();
  }, []);

  return (
    <div className="container mx-auto px-4 p-6 flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-8">Keranjang Pembelian</h1>

      <Transition
        show={isLoaded}
        enter="transition ease-out duration-300 transform"
        enterFrom="opacity-0 scale-45"
        enterTo="opacity-100 scale-100"
        leave="transition ease-in duration-200 transform"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-60"
      >
        {cartProducts.length > 0 ? (
          <div className="w-full max-w-5xl bg-white shadow-md rounded-lg p-6">
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
                        item.product?.konten_base64
                          ? `data:image/jpeg;base64,${item.product.konten_base64}`
                          : "https://via.placeholder.com/150"
                      }
                      alt={item.product?.nama_product}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                    <div className="flex flex-col max-w-xs">
                      <h3 className="text-lg font-semibold truncate w-56">
                        {item.product?.nama_product}
                      </h3>
                      <p className="text-gray-500">
                        {item.product?.kategori_produk}
                      </p>
                    </div>
                  </div>
                  <div>
                    <p className="text-lg font-semibold mt-2">
                      Rp. {item.product?.harga_jual}
                    </p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => handlePayment(item.id_product)}
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                    >
                      Bayar Sekarang
                    </button>
                    <button>
                      <button
                        onClick={() => deleteCartProduct(item.id_beli_produk)}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 w-full" // Tambahkan w-full agar tombol penuh lebar
                      >
                        Hapus
                      </button>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p>Keranjang kosong</p>
        )}
      </Transition>
    </div>
  );
};

export default CartProduct;
