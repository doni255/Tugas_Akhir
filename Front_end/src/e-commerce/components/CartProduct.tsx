import React from "react";
import { RxCross1 } from "react-icons/rx";

interface CartProductProps {
  id: string;
  img: string;
  name: string;
  price: string;
  onRemove?: (id: string) => void; // Membuat onRemove opsional
}

const CartProduct: React.FC<CartProductProps> = ({
  id,
  img,
  name,
  price,
  onRemove,
}) => {
  const handleRemove = () => {
    if (onRemove && typeof onRemove === "function") {
      onRemove(id); // Memastikan ID yang tepat diteruskan
    } else {
      console.warn("onRemove function is not provided or is not a function");
    }
  };

  return (
    <div className="flex justify-between items-center">
      <div className="flex items-center gap-4">
        <img className="h-[100px]" src={img} alt={name} />
        <div>
          <h3 className="font-medium">{name}</h3>
          <p className="text-gray-600">1 x {price}</p>
        </div>
      </div>
      <button
        onClick={handleRemove} // Panggil handleRemove untuk menghapus item
        className="text-gray-600 hover:text-red-500 transition-colors"
        aria-label="Remove item"
      >
        <RxCross1 />
      </button>
    </div>
  );
};

export default CartProduct;
