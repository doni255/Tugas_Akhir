import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";
import axios from "axios";

const FeatureSectionGenerators_SparePart = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch products by category "Genset"
    axios
      .post("http://localhost:8000/api/product/categories", {
        categories: ["Genset", "Spare Part Genset"],
      })
      .then((response) => {
        setProducts(response.data.data);
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
    <div className="container pt-16">
      <div className="lg:flex justify-between items-center">
        <div>
          <h3 className="font-medium text-2xl">Genset & SparePart</h3>
          <p className="text-gray-600 mt-2">
            Buy farm fresh fruits and vegetables online at the best prices
          </p>
        </div>
      </div>
      <div className="grid sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-4 pt-8 gap-2">
        {products.map((product) => (
          <ProductCard key={product.id_product} product={product} />
        ))}
      </div>
    </div>
  );
};

export default FeatureSectionGenerators_SparePart;
