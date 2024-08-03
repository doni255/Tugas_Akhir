import React from "react";
import { useCartContext } from "../context/cartContext";

interface propsType {
  size: string;
}

const CartCountBadge: React.FC<propsType> = ({ size }) => {
  // Mengambil produk dari CartContext
  const { product } = useCartContext();

  // Menentukan jumlah produk dalam keranjang
  const itemCount = product.length;

  return (
    <div
      className={`absolute bg-red-600 text-white text-[14px] ${size} -right-3 -top-1 rounded-full grid place-items-center`}
    >
      {itemCount}
    </div>
  );
};

export default CartCountBadge;
