import React from "react";
import FeatureCard from "./FeatureCard";

// Import the icons from the correct packages
import {
  LiaShippingFastSolid,
  LiaMoneyBillWaveSolid,
  LiaGiftSolid,
} from "react-icons/lia";
import { FiPhoneCall } from "react-icons/fi";

// Define the data with correct icon usage
const data = [
  {
    title: "Free shipping",
    icon: <LiaShippingFastSolid />, // Import from the correct package
  },
  {
    title: "Best Price Guarantee",
    icon: <LiaMoneyBillWaveSolid />, // Import from the correct package
  },
  {
    title: "Free Curbside Pickup",
    icon: <LiaGiftSolid />, // Import from the correct package
  },
  {
    title: "Support 24/7",
    icon: <FiPhoneCall />, // Already correct
  },
];

// Feature component
const Feature = () => {
  return (
    <div className="bg-[#2C2F33] w-full p-8">
      <div className="container grid justify-items-center gap-4 md:grid-cols-2 lg:grid-cols-4 ">
        {data.map((el) => (
          <FeatureCard key={el.title} title={el.title} icon={el.icon} />
        ))}
      </div>
    </div>
  );
};

export default Feature;
