import React from "react";
import { Link } from "react-router-dom";

const popularProducts = [
  {
    id: "3432",
    product_name: "Macbook M1 Pro 14",
    product_thumbnail: "https://source.unsplash.com/100x100?macbook",
    product_price: "$1499.00",
    product_stock: 341,
  },
  {
    id: "7633",
    product_name: "Samsung Galaxy Buds 2",
    product_thumbnail: "https://source.unsplash.com/100x100?macbook",
    product_price: "$343.00",
    product_stock: 24,
  },
  {
    id: "6534",
    product_name: "Asus Zenbook Por",
    product_thumbnail: "https://source.unsplash.com/100x100?macbook",
    product_price: "$899.00",
    product_stock: 56,
  },
  {
    id: "9234",
    product_name: "MLG Flex Canvas",
    product_thumbnail: "https://source.unsplash.com/100x100?macbook",
    product_price: "$1499.00",
    product_stock: 0,
  },
  {
    id: "4314",
    product_name: "Apple Magic Touchpad",
    product_thumbnail: "https://source.unsplash.com/100x100?macbook",
    product_price: "$699.00",
    product_stock: 341,
  },
  {
    id: "4342",
    product_name: "Nothing Earbuds One",
    product_thumbnail: "https://source.unsplash.com/100x100?macbook",
    product_price: "$399.00",
    product_stock: 453,
  },
];

function PopularProducts() {
  return (
    <div className="bg-white px-4 pt-3 pb-4 rounded-sm border-gray-200 w-[20rem]">
      <strong className="text-gray-700 font-medium">Popular Products</strong>
      <div className="mt-4 flex flex-col gap-3">
        {popularProducts.map((product) => (
          <Link
            to={`/product/${product.id}`}
            className="flex hover:no-underline"
          >
            <div className="w-10 h-10 min-w-10 bg-gray-200 rounded-sm overflow-hidden">
              <img
                className="w-full h-full object-cover"
                src={product.product_thumbnail}
                alt={product.product_name}
              />
            </div>
            <div className="ml-4 flex-1">
              <p className="text-sm text-gray-800">{product.product_name}</p>
              <span
                className={`text-sm font-medium ${
                  product.product_stock === 0
                    ? "text-orange-500"
                    : "text-green-500"
                }`}
              >
                {product.product_stock === 0
                  ? "Out of stock"
                  : product.product_stock + " in stock"}
              </span>
            </div>
            <div className="text-xs-gray-400 pl-2">{product.product_price}</div>
          </Link>
        ))}
      </div>
    </div>
  );
}

export default PopularProducts;
