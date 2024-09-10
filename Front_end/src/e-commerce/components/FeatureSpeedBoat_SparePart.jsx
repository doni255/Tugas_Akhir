import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";

const FeatureSpeedBoat_SparePart = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .post("http://localhost:8000/api/product/categories", {
        categories: ["", "spare part mesin kapal"],
      })
      .then((response) => {
        setProducts(response.data.data || []); // Pastikan data di-set sebagai array
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Loading products...</p>;
  }

  return (
    <div className="container pt-16 mx-auto">
      <div className="lg:flex justify-between items-center mb-8">
        <div>
          <h3 className="font-medium text-2xl">Speed Boat & SparePart</h3>
          <p className="text-gray-600 mt-2">
            Buy farm fresh fruits and vegetables online at the best prices
          </p>
        </div>

        <div className="space-x-4 mt-8 lg:mt-0">
          <button className="feature_btn">Fruits</button>
          <button className="text-gray-600 hover:text-accent">
            Vegetables
          </button>
          <button className="text-gray-600 hover:text-accent">
            Bread & Bakery
          </button>
        </div>
      </div>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 pt-8 gap-6">
        <div>
          <img
            className="w-full h-full object-contain "
            alt="banner"
            src="https://s.alicdn.com/@sc04/kf/Hb1778a45b15445cb80687fd3d827b5565.jpg_720x720q50.jpg"
          />
        </div>

        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product.id_product} product={product} />
          ))
        ) : (
          <p>No products available</p>
        )}
      </div>
    </div>
  );
};

export default FeatureSpeedBoat_SparePart;
