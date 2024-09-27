import React from "react";
import FeatureCard from "./FeatureCard";
import {
  LiaShippingFastSolid,
  LiaMoneyBillWaveSolid,
  LiaGiftSolid,
} from "react-icons/lia";
import { FiPhoneCall } from "react-icons/fi";
import ContactUs from "./ContactUs";

// Define the data with correct icon usage
const data = [
  {
    title: "Free shipping",
    icon: <LiaShippingFastSolid />,
  },
  {
    title: "Best Price Guarantee",
    icon: <LiaMoneyBillWaveSolid />,
  },
  {
    title: "Free Curbside Pickup",
    icon: <LiaGiftSolid />,
  },
  {
    title: "Support 24/7",
    icon: <FiPhoneCall />,
  },
];

// Feature component
const Feature = () => {
  return (
    <div className="bg-[#1F2326] w-full">
      {/* <div className="container mx-auto p-8">
        <div className="grid justify-items-center gap-6 md:grid-cols-2 lg:grid-cols-4">
          {data.map((el) => (
            <FeatureCard key={el.title} title={el.title} icon={el.icon} />
          ))}
        </div>
      </div> */}

      <ContactUs />

      {/* Footer Section */}
      <footer className="bg-[#1F2326] text-white p-8 mt-8 rounded-tl-xl rounded-tr-xl shadow-lg">
        {/* <h2 className="text-2xl font-bold mb-4 text-center">Contact Us</h2> */}
        <div className="container mx-auto flex flex-col items-center">
          <div className="flex w-full justify-start gap-48">
            <div>
              <strong className="text-2xl text-gray-500">Alamat</strong>
              <p className="text-lg mb-2">
                jl.cempaka dalam, no.154, Kabupaten Melawi, <br />
                Kalimantan Barat
              </p>
            </div>
            <div>
              <strong className="text-2xl text-gray-500">Email: </strong>
              <p className="text-lg mb-2">wijayadoni37@gmail.com</p>
            </div>
            <div>
              <strong className="text-2xl text-gray-500">Nomor Telpon </strong>
              <p className="text-lg mb-2">(082154164970)</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Feature;
