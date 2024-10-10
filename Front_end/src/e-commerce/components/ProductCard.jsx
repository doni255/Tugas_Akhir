import React from "react";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { useState } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const ProductCard = ({ product }) => {
  const [isModalVisible, setModalVisible] = useState(false);

  const tambahKeranjang = (idProduct) => {
    const idUser = localStorage.getItem("id_user");

    if (!idUser) {
      toast.error("Anda harus login terlebih dahulu.");
      return;
    }

    axios
      .post(
        `http://localhost:8000/api/keranjang_pembelian/tambah_keranjang/${idUser}`,
        {
          id_user: idUser,
          id_product: idProduct,
          harga_beli: product.harga_jual,
          konten_base64: product.gambar,
        }
      )
      .then((response) => {
        if (response.data.message === "Product added to cart") {
          toast.success("Produk berhasil ditambahkan ke keranjang.");
        }
      })
      .catch((error) => {
        console.error("Error tambah keranjang:", error);
        if (error.response) {
          console.log("Error response data:", error.response.data);
        }
      });
  };

  return (
    <div className="border border-gray-200 hover:border-gray-300 hover:scale-105 transition-transform rounded-lg relative shadow-sm">
      {product.gambar ? (
        <img
          src={`data:image/jpeg;base64,${product.gambar}`}
          alt={product.nama_product}
          className="w-full  object-contain"
        />
      ) : (
        <div className="flex items-center justify-center w-full h-2/4 bg-gray-200 rounded-lg">
          <span className="text-gray-500">Gambar tidak tersedia</span>
        </div>
      )}

      <div className="space-y-2 relative p-4">
        <div className="text-yellow-400 flex gap-[2px] text-[20px]">
          <AiFillStar />
          <AiFillStar />
          <AiFillStar />
          <AiFillStar />
          <AiOutlineStar />
        </div>
        <h4 className="text-lg font-semibold mb-2 text-gray-800">
          {product.nama_product}
        </h4>
        {/* Price section */}
        <p className="text-gray-800 text-xl font-bold mb-2">
          {product.harga_jual !== null
            ? product.harga_jual.toLocaleString("id-ID", {
                style: "currency",
                currency: "IDR",
              })
            : "Harga belum ditentukan"}
        </p>

        <p className="text-sm text-gray-500">Stock: {product.jumlah_stock}</p>

        <button
          className="mt-4 bg-green-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-green-800 transition-colors"
          onClick={() => tambahKeranjang(product.id_product)}
        >
          + Keranjang
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
