import React from "react";

import CategoryCard from "./CategoryCard.jsx";

const Category = () => {
  return (
    <div className="container pt-16 ">
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        <CategoryCard />
      </div>
    </div>
  );
};

export default Category;
