import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { BsSearch } from "react-icons/bs";

import login from "../../hooks/login";
import { useRegister } from "../../hooks/useRegister";

import {
  AiOutlineUser,
  AiOutlineShoppingCart,
  AiOutlineLogin,
  AiOutlineProduct,
} from "react-icons/ai";
import { useState, useEffect } from "react";
import CartCountBadge from "./CartCountBadge";
import FeatureSectionSaw_SparePart from "./FeatureSectionSaw_SparePart";
import FeatureSpeedBoat_SparePart from "./FeatureSpeedBoat_SparePart";
import FeatureSectionGenerators_SparePart from "./FeatureSectionGenerators_SparePart";
import FeatureWaterPump_Sparepart from "./FeatureWaterPump_SparePart";
import {
  Transition,
  Popover,
  PopoverButton,
  PopoverPanel,
} from "@headlessui/react";
import toast, { Toaster } from "react-hot-toast";

interface NavbarProps {
  setShowCart: (show: boolean) => void;
}

interface UserData {
  nama: string | null;
  email: string | null;
  no_telpon: string | null;
  kota: string | null;
  alamat: string | null;
}

// Example product list (you can replace this with fetched data from an API)
const products = [
  { id: 1, name: "Genset" },
  { id: 2, name: "Gergaji" },
  { id: 3, name: "Pompa Air" },
  { id: 4, name: "Speedboat" },
];

const NavbarEcommerce = ({ setShowCart }: NavbarProps) => {
  // Memanggil hook
  const {
    userData,
    setUserData,
    users,
    nama,
    setNama,
    password,
    setPassword,
    error,
    handleRegisterClick,
    handleLogin,
  } = login();

  const { formData, handleChange, handleSubmit } = useRegister();
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [filteredProducts, setFilteredProducts] = useState<any[]>([]); // Adjust type according to your product data structure
  const [isProfileModalOpen, setisProfileModalOpen] = useState<boolean>(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] =
    useState<boolean>(false);
  const navigate = useNavigate();

  // Filter products based on search query
  useEffect(() => {
    setFilteredProducts(
      products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [searchTerm]);

  // Handle user login and redirection
  const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await handleLogin(e); // Perform login
    const role = localStorage.getItem("role");
    if (role === "user") {
      navigate("/e-commerce"); // Redirect to e-commerce page after login
    }

    // After login, store user data to localStorage
    const storedUserData = {
      nama: localStorage.getItem("nama"),
      email: localStorage.getItem("email"),
      no_telpon: localStorage.getItem("no_telpon"),
      kota: localStorage.getItem("kota"),
      alamat: localStorage.getItem("alamat"),
    };
  };

  const handleProfileClick = () => {
    navigate("/e-commerce/profile"); // Redirect to profile page
  };

  const handleProductClick = () => {
    navigate("/e-commerce/products"); // Redirect to product page
  };

  const handleCartProductClick = () => {
    navigate("/e-commerce/cartproduct"); // Redirect to cart product page
  };

  return (
    <>
      <div className="sticky top-0 bg-[#2C2F33] z-10 w-full">
        <div className="container mx-auto">
          <div className="hidden lg:flex justify-between items-center p-6">
            {/* Logo */}
            <a href="/e-commerce" className="no-underline hover:no-underline">
              <h1 className="text-4xl font-bold text-[#F1F1F1]">
                Machine Shop
              </h1>
            </a>
            <Toaster position="top-right" reverseOrder={false} />

            {/* Icons: User, Cart and login Button*/}
            <div className="flex gap-4 items-center">
              <div
                className="icon__wrapper cursor-pointer text-[#F5C300] hover:text-[#FF6B00]"
                onClick={handleProductClick}
              >
                <AiOutlineProduct size={24} />
              </div>

              <div className="flex gap-4 items-center">
                <div
                  className="icon__wrapper cursor_pointer text-[#F5C300] hover:text-[#FF6B00]"
                  onClick={handleCartProductClick}
                >
                  <AiOutlineShoppingCart size={24} />
                </div>
              </div>

              <div
                className="icon__wrapper cursor-pointer text-[#F5C300] hover:text-[#FF6B00]"
                onClick={handleProfileClick}
              >
                <AiOutlineUser size={24} />
              </div>

              {/* <div
                  className="icon__wrapper cursor-pointer relative text-[#F5C300] hover:text-[#FF6B00]"
                  onClick={() => setShowCart(true)}
                >
                  <AiOutlineShoppingCart size={24} />
                  <CartCountBadge size="w-[25px] h-[25px]" />
                </div> */}

              {/* Login Button */}
              <button
                type="submit"
                className="px-4  text-white py-3 rounded-md font-semibold hover:bg-[#FF7B00] transition duration-300 ease-in-out"
                onClick={() => setIsLoginModalOpen(true)}
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </div>

      <Outlet />

      {/* Modal PROFILE with Transition */}
      <Transition
        show={isProfileModalOpen}
        enter="transition ease-out duration-300 transform"
        enterFrom="opacity-0 scale-45"
        enterTo="opacity-100 scale-100"
        leave="transition ease-in duration-200 transform"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-60"
      >
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          onClick={() => setisProfileModalOpen(false)} // Close modal when clicking outside
        >
          <div
            className="bg-white p-8 rounded-lg shadow-lg"
            onClick={(e) => e.stopPropagation()} // Prevent click inside modal from closing
          >
            <h2 className="text-xl font-bold mb-4">Account anda</h2>

            <br />
            <br />

            {/* {userData ? (
              <>
                <p>
                  <strong>Name:</strong> {userData.nama || "No Name"}
                </p>
                <p>
                  <strong>Email:</strong> {userData.email || "No Email"}
                </p>
                <p>
                  <strong>Phone:</strong> {userData.no_telpon || "No Phone"}
                </p>
                <p>
                  <strong>City:</strong> {userData.kota || "No City"}
                </p>
                <p>
                  <strong>Address:</strong> {userData.alamat || "No Address"}
                </p>
              </>
            ) : (
              <p>Tidak ada data user</p>
            )} */}

            <button
              className="mt-4 px-4 py-2 bg-[#F5C300] hover:bg-[#FF6B00] text-white rounded-lg"
              onClick={() => setisProfileModalOpen(false)}
            >
              Logout
            </button>
          </div>
        </div>
      </Transition>

      {/* Modal with Transition */}
      <Transition
        show={isLoginModalOpen}
        enter="transition ease-out duration-300 transform"
        enterFrom="opacity-0 scale-45"
        enterTo="opacity-100 scale-100"
        leave="transition ease-in duration-200 transform"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-60"
      >
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          onClick={() => setIsLoginModalOpen(false)} // Close modal when clicking outside
        >
          <div
            className="relative bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
            onClick={(e) => e.stopPropagation()} // Prevent click inside modal from closing
          >
            {/* Close button (x) */}
            <button
              className="absolute top-2 right-2 text-gray-400  hover:text-gray-600 "
              onClick={() => setIsLoginModalOpen(false)}
            >
              &#x2715;
            </button>
            <form onSubmit={handleLoginSubmit}>
              <div className="mt-3">
                <label htmlFor="username" className="block text-base mb-2">
                  Username
                </label>
                <input
                  type="text"
                  id="username"
                  value={nama}
                  onChange={(e) => setNama(e.target.value)}
                  className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                  placeholder=" Nama..."
                />
              </div>

              <div className="mt-3">
                <label htmlFor="password" className="block text-base mb-2">
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                  placeholder=" Password..."
                />
              </div>

              {error && <p className="mt-3 text-red-500">{error}</p>}

              <div className="mt-7">
                <button
                  type="submit"
                  className="border-2 border-sky-500 bg-sky-500 text-white py-1 px-5 w-full rounded-md hover:bg-sky-600"
                >
                  Login
                </button>
              </div>
            </form>
            <div className="mt-3 flex justify-between items-center">
              <div>
                <p>Dont have an account? </p>
              </div>

              <div>
                <button
                  className="text-gray-400 font-semibold hover:text-indigo-600 "
                  onClick={() => {
                    setIsLoginModalOpen(false);
                    setIsRegisterModalOpen(true);
                  }}
                >
                  Register
                </button>
              </div>
            </div>
          </div>
        </div>
      </Transition>

      <Transition
        show={isRegisterModalOpen}
        enter="transition ease-out duration-300 transform"
        enterFrom="opacity-0 scale-45"
        enterTo="opacity-100 scale-100"
        leave="transition ease-in duration-200 transform"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-60"
      >
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
          onClick={() => setIsRegisterModalOpen(false)} // Close modal when clicking outside
        >
          <div
            className="relative bg-white p-8 rounded-lg shadow-lg w-full max-w-md"
            onClick={(e) => e.stopPropagation()} // Prevent click inside modal from closing
          >
            <button
              className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
              onClick={() => setIsRegisterModalOpen(false)}
            >
              &#x2715;
            </button>
            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-6 gap-6 max-w-md mx-auto"
            >
              {/* <div className="col-span-6 flex justify-center">
                <h1 className="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
                  Create Account 😁
                </h1>
              </div> */}

              <div className="col-span-6">
                <label
                  htmlFor="FirstName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Nama
                </label>

                <input
                  type="text"
                  id="Nama"
                  name="nama"
                  value={formData.nama}
                  onChange={handleChange}
                  className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                />
              </div>

              <div className="col-span-6">
                <label
                  htmlFor="Email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>

                <input
                  type="email"
                  id="Email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                  placeholder="..Email Boleh Kosong"
                />
              </div>

              <div className="col-span-6 sm:col-span-6">
                <label
                  htmlFor="Password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>

                <input
                  type="password"
                  id="Password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                />
              </div>

              {/* <div className="col-span-6 sm:col-span-6">
                <label
                  htmlFor="Password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Role
                </label>

                <input
                  ref={roleRef}
                  type="text"
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                  required
                />
              </div> */}

              <div className="col-span-6">
                <label
                  htmlFor="noHp"
                  className="block text-sm font-medium text-gray-700"
                >
                  Nomor HP
                </label>

                <input
                  type="text"
                  id="No_telpon"
                  name="no_telpon"
                  value={formData.no_telpon}
                  onChange={handleChange}
                  className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                />
              </div>

              <div className="col-span-6">
                <label
                  htmlFor="Kota"
                  className="block text-sm font-medium text-gray-700"
                >
                  Kota
                </label>

                <input
                  type="text"
                  id="Kota"
                  name="kota"
                  value={formData.kota}
                  onChange={handleChange}
                  className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                />
              </div>

              <div className="col-span-6">
                <label
                  htmlFor="Alamat"
                  className="block text-sm font-medium text-gray-700"
                >
                  Alamat
                </label>

                <input
                  type="text"
                  id="Alamat"
                  name="alamat"
                  value={formData.alamat}
                  onChange={handleChange}
                  className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                />
              </div>

              <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                <button className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500">
                  Create an account
                </button>

                <p className="mt-4 text-sm text-gray-500 sm:mt-0">
                  Already have an account?
                  <a
                    href="#"
                    className="text-gray-400 underline font-semibold hover:text-indigo-600"
                    onClick={() => {
                      setIsRegisterModalOpen(false);
                      setIsLoginModalOpen(true);
                    }}
                  >
                    Log in
                  </a>
                  .
                </p>
              </div>
            </form>
          </div>
        </div>
      </Transition>
    </>
  );
};

export default NavbarEcommerce;
