import React from "react";

import { AiFillStar, AiOutlineStar, AiOutlineShopping } from "react-icons/ai";
import { useCartContext } from "../context/cartContext";
import { useState } from "react";
import modal from "./Modal";
import Modal from "./Modal";

const ProductCard = ({ product }) => {
  const { addToCart } = useCartContext();
  const [isModalVisible, setModalVisible] = useState(false);

  const addProductToCart = () => {
    addToCart({
      img: `data:image/jpeg;base64,${product.gambar}`, // Tambahkan prefix base64
      name: product.nama_product,
      price: product.harga_jual,
    });
    setModalVisible(true); // Tampilkan modal setelah menambahkan ke keranjang
  };

  if (!product) {
    return null; // Atau tampilkan pesan kesalahan
  }

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
          onClick={addProductToCart}
        >
          CheckOut
        </button>

        {/* <button
          className="absolute -top-4 right-2 bg-accent text-white text-[28px] w-[50px] h-[50px] rounded-full grid place-items-center cursor-pointer"
          onClick={addProductToCart}
        >
          <AiOutlineShopping />
        </button> */}

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
