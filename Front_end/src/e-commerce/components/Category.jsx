import React from "react";
// import { initialProducts } from "../../dashboard/components/Products.jsx";
import CategoryCard from "./CategoryCard.jsx";
import sparepartSawImage from "../assets/images/sparepart_saw.jpg";

const data = [
  {
    id: 0,
    name: "Chain Saw",
    count: "12 Products",
    img: "https://media.monotaro.id/mid01/full/Perkakas%20Tangan%2C%20Pneumatik%20%26%20Listrik/Perkakas%20Bermesin/Gergaji%20Mesin/TCMEC%20Chainsaw%2058SP%20Series%20(Gergaji%20Mesin)/hdP104048625-1.jpg",
  },
  {
    id: 1,
    name: "Small Boats Motor",
    count: "14 Products",
    img: "https://onlineoutboards.com/cdn/shop/products/mercury_5_hp_0ccaeee6-46ae-497d-af92-eb1c62f6dfa5.jpg?v=1643642523",
  },
  {
    id: 2,
    name: "Generators",
    count: "21 Products",
    img: "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcS_gnYdObpJ7tujCmwqe0rImI75NUF9BnqvAK_8xoloeXU-ERyFbaxOp13q0zjKDwWGVuZBSR84gK_jiw-61EjKllL2cfFWOD65R86tJxRr72yNjom84RPu&usqp=CAE",
  },
];

// const Category = () => {
//   // Group products by category
//   const groupedProducts = initialProducts.reduce((acc, product) => {
//     if (!acc[product.category]) {
//       acc[product.category] = [];
//     }
//     acc[product.category].push(product);
//     return acc;
//   }, {});

//   return (
//     <div className="container pt-6">
//       {Object.entries(groupedProducts).map(([category, products]) => (
//         <div key={category} className="mb-8">
//           <h2 className="text-2xl font-bold mb-4">{category}</h2>
//           <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
//             {products.map((product) => (
//               <CategoryCard
//                 key={product.id}
//                 name={product.name}
//                 count={`$${product.price}`}
//                 img={product.imageUrl}
//               />
//             ))}
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

const Category = () => {
  return (
    <div className="container pt-16 ">
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {data.map((el) => (
          <CategoryCard
            key={el.id}
            img={el.img}
            name={el.name}
            count={el.count}
          />
        ))}
      </div>
    </div>
  );
};

export default Category;
