import React, { useRef, useState } from "react";
import "./index.css";
import "./Login.css";

import { useNavigate } from "react-router-dom";
import axiosClient from "./axiosClient";
import { useStateContext } from "./contexts/contextprovider";
import toast, { Toaster } from "react-hot-toast";

export default function Register() {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/");
  };

  const namaRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const no_telponRef = useRef();
  const kotaRef = useRef();
  const alamatRef = useRef();

  // Register

  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    no_telpon: "",
    kota: "",
    alamat: "",
    password: "",
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Fields that should not be empty
    const requiredFields = [
      { field: "nama", message: "Nama must be filled" },
      { field: "password", message: "Password must be filled" },
      { field: "no_telpon", message: "Nomor HP must be filled" },
      { field: "kota", message: "Kota must be filled" },
      { field: "alamat", message: "Alamat must be filled" },
    ];

    // Check if any required field is empty
    for (let { field, message } of requiredFields) {
      if (!formData[field] || formData[field].trim() === "") {
        toast.error(message);
        return;
      }
    }

    // Check if assword is less than 6 characters
    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    if (formData.no_telpon.length < 10) {
      toast.error("Nomor HP must be at least 10 characters long");
      return;
    }

    if (formData.alamat.length < 8) {
      toast.error("Alamat must be at least 8 characters long");
      return;
    }
    try {
      const response = await fetch("http://localhost:8000/api/store_user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      // Redirect if it success
      const result = await response.json();
      console.log("Result:", result);
      // Redirect to login page with success state
      navigate("/", { state: { registrationSuccess: true } });
    } catch (error) {
      setError("An unexpected error occurred.");
    }
  };

  return (
    <section className="bg-gray-50 min-h-screen flex items-center justify-center p-12">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="shadow-2xl bg-white rounded-md">
        <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
          <div className="m l lg:max-w-3xl">
            <form
              onSubmit={handleSubmit}
              className="grid grid-cols-6 gap-6 max-w-md mx-auto"
            >
              <div className="col-span-6 flex justify-center">
                <h1 className="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
                  Create Account 😁
                </h1>
              </div>

              <div className="col-span-6">
                <label
                  htmlFor="FirstName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Nama
                </label>

                <input
                  ref={namaRef}
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
                  ref={emailRef}
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
                  ref={passwordRef}
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
                  ref={no_telponRef}
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
                  ref={kotaRef}
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
                  ref={alamatRef}
                  type="text"
                  id="Alamat"
                  name="alamat"
                  value={formData.alamat}
                  onChange={handleChange}
                  className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                />
              </div>

              <div className="col-span-6">
                <label htmlFor="MarketingAccept" className="flex gap-4">
                  <input
                    type="checkbox"
                    id="MarketingAccept"
                    name="marketing_accept"
                    className="size-5 rounded-md border-gray-200 bg-white shadow-sm"
                  />

                  <span className="text-sm text-gray-700">
                    I want to receive emails about events, product updates and
                    company announcements.
                  </span>
                </label>
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
                    onClick={handleLoginClick}
                  >
                    Log in
                  </a>
                  .
                </p>
              </div>
            </form>
          </div>
        </main>
      </div>
    </section>

    // <div className="bg-gradient-to-l bg-gray-100">
    //   <div className="flex justify-center items-center min-h-screen">
    //     <div className="w-full sm:w-3/4 md:w-2/4 lg:w-1/3 xl:w-1/4 p-6 shadow-2xl bg-white rounded-md">
    //       <h1 className="text-3xl block text-center font-semibold">
    //         <i className="fa-solid fa-user-plus"></i> Register
    //       </h1>
    //       <hr className="mt-3" />

    //       {/* Add your registration form fields here */}

    //       <div className="mt-3 flex justify-between items-center">
    //         <div>
    //           <p>Already have an account? </p>
    //         </div>
    //         <div>
    //           <button
    //             className="text-gray-400 font-semibold hover:text-indigo-600"
    //             onClick={handleLoginClick}
    //           >
    //             Login Here
    //           </button>
    //         </div>
    //       </div>
    //     </div>
    //   </div>
    // </div>

    // <div class="flex justify-center items-center min-h-screen bg-gray-100">
    //   <div class="w-full sm:w-3/4 md:w-2/4 lg:w-1/3 xl:w-1/4 p-6 shadow-2xl bg-white rounded-md text-center">
    //     <h1 class="text-3xl font-semibold mb-6">SIGN UP</h1>
    //     <hr class="mt-3" />

    //     <form action="">
    //       <div class="mt-6 shadow-xl rounded-md">
    //         <input
    //           type="text"
    //           id="username"
    //           class="rounded-md  w-full text-base px-2 py-1 Focus:outline-none focus:ring-0 focus:border-gray-600"
    //           placeholder=" Username"
    //         />
    //       </div>

    //       <div class="mt-6 shadow-xl rounded-md">
    //         <input
    //           type="password"
    //           id="password"
    //           class="rounded-md  w-full text-base px-2 py-1 Focus:outline-none Focus:ring-0 focus:border-gray-600 "
    //           placeholder=" Email"
    //         />
    //       </div>

    //       <div class="mt-6 shadow-xl rounded-md">
    //         <input
    //           type="password"
    //           id="password"
    //           class="rounded-md w-full text-base px-2 py-1 Focus:outline-none Focus:ring-0 focus:border-gray-600 "
    //           placeholder=" Password"
    //         />
    //       </div>

    //       <div class="mt-6 shadow-xl rounded-md">
    //         <input
    //           type="password"
    //           id="password"
    //           class="rounded-md w-full text-base px-2 py-1 Focus:outline-none Focus:ring-0 focus:border-gray-600 "
    //           placeholder=" Confirm Password"
    //         />
    //       </div>

    //       <div class="mt-8">
    //         <button
    //           type="submit"
    //           class="border-2 border-sky-500 bg-sky-500 text-white py-1 px-5 w-full rounded-md hover:bg-sky-600"
    //         >
    //           Login
    //         </button>
    //       </div>

    //       <div class="mt-4">
    //         <h1 class="">
    //           Already have an account
    //           <button
    //             className="ml-1 text-gray-400 font-semibold hover:text-indigo-600"
    //             onClick={() => navigate("/login")}
    //           >
    //             Login
    //           </button>
    //         </h1>
    //       </div>
    //     </form>
    //   </div>
    // </div>
  );
}
