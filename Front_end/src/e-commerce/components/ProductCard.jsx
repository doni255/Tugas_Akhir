import React from "react";

import { AiFillStar, AiOutlineStar, AiOutlineShopping } from "react-icons/ai";
import { useCartContext } from "../context/cartContext";
import { useState } from "react";
import Modal from "./Modal";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const ProductCard = ({ product }) => {
  const { addToCart } = useCartContext();
  const [isModalVisible, setModalVisible] = useState(false);

  const tambahKeranjang = (idProduct) => {
    const idUser = localStorage.getItem("id_user"); // Get id_user from localStorage

    // Debugging: Print the values
    console.log("idUser:", idUser);
    console.log("idProduct:", idProduct);

    axios
      .post(
        `http://localhost:8000/api/keranjang_pembelian/tambah_keranjang/${idUser}`, // Use template literal with backticks
        {
          id_user: idUser, // Send the correct user ID
          id_product: idProduct, // Send the correct product ID
          harga_beli: product.harga_jual,
          konten_base64: product.gambar,
        }
      )
      .then((response) => {
        console.log("Response tambah keranjang:", response.data);

        // Correct the message check to match the backend response
        if (response.data.message === "Product added to cart") {
          toast.success("Produk berhasil ditambahkan ke keranjang.");
          // fetchCartProduct(); // Assuming this function updates your cart display
        }
      })
      .catch((error) => {
        console.error("Error tambah keranjang:", error); // Debugging
        if (error.response) {
          console.log("Error response data:", error.response.data); // Log the error response
          console.log("Error status:", error.response.status);
        }
      });
  };

  return (
    <div className="border border-gray-200 hover:border-gray-300 hover:scale-105 transition-transform rounded-lg relative">
      <img
        src={`data:image/jpeg;base64,${product.gambar}`}
        alt={product.nama_product}
        className="w-full h-auto object-contain"
      />

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

        <p className="text-gray-500 mb-2">Rp {product.harga_jual}</p>

        <p className="text-sm text-gray-500">Stock: {product.jumlah_stock}</p>

        <button
          className="mt-4 bg-accent text-white py-2 px-4 rounded hover:bg-accent-dark transition-colors hover:bg-green-900  "
          onClick={() => tambahKeranjang(product.id_product)}
        >
          + Keranjang
        </button>

        <Modal
          isVisible={isModalVisible}
          onClose={() => setModalVisible(false)}
          product={product}
        />
      </div>
    </div>
  );
};

export default ProductCard;
