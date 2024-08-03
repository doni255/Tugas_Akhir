import React from "react";
import { RxCross1 } from "react-icons/rx";
import CartProduct from "./CartProduct";
import { useCartContext } from "../context/cartContext";

interface CartProps {
  setShowCart: (show: boolean) => void;
}

const Cart: React.FC<CartProps> = ({ setShowCart }) => {
  const { product, removeFromCart } = useCartContext();

  const handleRemoveProduct = (id: string) => {
    removeFromCart(id); // Remove the product with the given ID
  };

  return (
    <div
      className="bg-[#0000007d] w-full h-screen fixed left-0 top-0 z-20"
      onClick={() => setShowCart(false)}
    >
      <div
        className="max-w-[400px] w-full h-full bg-white absolute right-0 top-0 p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <RxCross1
          className="absolute right-0 top-0 m-6 text-[24px] cursor-pointer"
          onClick={() => setShowCart(false)}
        />

        <h3 className="pt-6 text-lg font-medium text-gray-600 uppercase">
          Your Cart
        </h3>

        <div className="mt-6">
          {product.map((el: Product) => (
            <CartProduct
              id={el.id} // Pass the unique product ID
              key={el.id} // Use the unique product ID as the key
              img={el.img} // Product image
              name={el.name} // Product name
              price={el.price} // Product price
              onRemove={handleRemoveProduct} // Pass the remove function
            />
          ))}
        </div>

        <button className="bg-accent text-white text-center w-full rounded-3xl py-2 hover:bg-accentDark mt-4">
          View Cart
        </button>
        <button className="bg-accent text-white text-center w-full rounded-3xl py-2 hover:bg-accentDark mt-4">
          CheckOut
        </button>
      </div>
    </div>
  );
};

export default Cart;
