import ProductCard from "./ProductCard";
import ringPiston from "../assets/images/chainsaw/ring-piston.png";

const data = [
  {
    id: 0,
    img: ringPiston,
    name: "Ring Piston",
    price: "Rp.500.000",
  },
  {
    id: 1,
    img: "https://ae01.alicdn.com/kf/HLB10fqtbzDuK1Rjy1zjq6zraFXa9/3pcs-Tool-Parts-Metal-Chainsaw-Spare-Part-Chain-Saw-Sprocket-Rim-Power-Mate-325-7-For.jpg",
    name: "Pithon Gear",
    price: "1.600.000",
  },
  {
    id: 2,
    img: "https://images.tokopedia.net/img/cache/700/product-1/2019/8/16/6586075/6586075_fdd2e8aa-3b9e-4976-aec4-c3d564949299_1920_1920.jpg",
    name: "Chain Saw Matari",
    price: "950.000",
  },
  {
    id: 3,
    img: "https://images.tokopedia.net/img/cache/700/VqbcmM/2021/12/24/71e508f0-b879-4f91-903e-07979b77def8.jpg",
    name: "Rantai + Pisau",
    price: "250.000",
  },
];

const FeatureSectionSaw_SparePart = () => {
  return (
    <div className="container pt-16">
      <div className="lg:flex justify-between items-center">
        <div>
          <h3 className="font-medium text-2xl">ChainSaw & SparePart</h3>
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
      <div className="grid sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5 pt-8 gap-2">
        <div>
          <img
            className="w-full h-full object-contain"
            alt="banner"
            src="https://s.alicdn.com/@sc04/kf/Hb1778a45b15445cb80687fd3d827b5565.jpg_720x720q50.jpg"
          />
        </div>

        {data.map((el) => (
          <ProductCard
            key={el.id}
            img={el.img}
            name={el.name}
            price={el.price}
          />
        ))}
      </div>
    </div>
  );
};

export default FeatureSectionSaw_SparePart;
