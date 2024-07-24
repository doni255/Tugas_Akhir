import { BsArrowRight } from "react-icons/bs";
import gensetImage from "../assets/images/harga_genset.png";
import pompaImage from "../assets/images/pompa_air.jpg";
import sparePartSaw from "../assets/images/sparepart_saw.jpg";

const Hero = () => {
  return (
    <div className="container mx-auto px-4 py-8 bg-red-100">
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="md:col-span-2 lg:row-span-2 relative">
          <img
            className="w-full h-[400px] md:h-[500px] lg:h-full object-cover rounded-lg"
            src={gensetImage}
            alt="hero image"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 rounded-lg flex items-center">
            <div className="p-6 md:p-10 max-w-[80%]">
              <h2 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-4">
                Quality Generators
              </h2>
              <p className="text-gray-200 text-lg mb-2">Starting At</p>
              <div className="font-medium text-yellow-400 text-2xl md:text-3xl mb-6">
                $1,299.99
              </div>
              <button className="bg-green-600 hover:bg-green-700 text-white rounded-full flex items-center gap-2 px-6 py-3 text-sm md:text-base transition duration-300">
                Shop Now <BsArrowRight />
              </button>
            </div>
          </div>
        </div>
        <div className="relative h-full">
          <img
            className="w-full object-cover rounded-lg"
            src={pompaImage}
            alt="Water pump"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 rounded-lg flex items-center">
            <div className="p-6 max-w-[80%]">
              <h2 className="text-xl md:text-2xl font-bold text-white mb-2">
                Reliable Water Pumps
              </h2>
              <p className="text-gray-200 text-sm mb-1">Starting At</p>
              <div className="font-medium text-yellow-400 text-lg md:text-xl mb-4">
                $89.99
              </div>
              <button className="bg-green-600 hover:bg-green-700 text-white rounded-full flex items-center gap-2 px-4 py-2 text-xs md:text-sm transition duration-300">
                Shop Now <BsArrowRight />
              </button>
            </div>
          </div>
        </div>
        <div className="relative h-full">
          <img
            className="w-full h-full object-cover rounded-lg"
            src={sparePartSaw}
            alt="Spare parts"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 rounded-lg flex items-center">
            <div className="p-6 max-w-[80%]">
              <h2 className="text-xl md:text-2xl font-bold text-white mb-2">
                Quality Spare Parts
              </h2>
              <p className="text-gray-200 text-sm mb-1">Starting At</p>
              <div className="font-medium text-yellow-400 text-lg md:text-xl mb-4">
                $24.99
              </div>
              <button className="bg-green-600 hover:bg-green-700 text-white rounded-full flex items-center gap-2 px-4 py-2 text-xs md:text-sm transition duration-300">
                Shop Now <BsArrowRight />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;