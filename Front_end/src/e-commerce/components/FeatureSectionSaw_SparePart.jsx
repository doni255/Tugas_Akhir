import React, { useEffect, useState } from "react";
import axios from "axios";
import ProductCard from "./ProductCard";

const FeatureSectionSaw_SparePart = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .post("http://localhost:8000/api/product/categories", {
        categories: ["Gergaji", "Spare Part Gergaji"],
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
    <div className="container pt-6 mx-auto">
      <div className="lg:flex justify-between items-center">
        <div>
          <h3 className="font-medium text-2xl bg-green-200 p-3  border-green-500 rounded-lg">
            Gergaji & SparePart
          </h3>

          <p className="text-gray-600 mt-2">
            Buy our products and order online at the best prices
          </p>
        </div>
      </div>
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 pt-8 gap-6">
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

export default FeatureSectionSaw_SparePart;
