import React from "react";
import "./index.css";
import "./Login.css";

import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <section className="bg-gray-50 min-h-screen flex items-center justify-center p-12">
      <div className="shadow-2xl bg-white rounded-md">
        <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6">
          <div className="m l lg:max-w-3xl">
            <form
              action="#"
              className="grid grid-cols-6 gap-6 max-w-md mx-auto"
            >
              <div className="col-span-6 flex justify-center">
                <h1 className="mt-6 text-2xl font-bold text-gray-900 sm:text-3xl md:text-4xl">
                  Create Account 😁
                </h1>
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="FirstName"
                  className="block text-sm font-medium text-gray-700"
                >
                  First Name
                </label>

                <input
                  type="text"
                  id="FirstName"
                  name="first_name"
                  className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="LastName"
                  className="block text-sm font-medium text-gray-700"
                >
                  Last Name
                </label>

                <input
                  type="text"
                  id="LastName"
                  name="last_name"
                  className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                />
              </div>

              <div className="col-span-6">
                <label
                  htmlFor="Email"
                  className="block text-sm font-medium text-gray-700"
                >
                  {" "}
                  Email{" "}
                </label>

                <input
                  type="email"
                  id="Email"
                  name="email"
                  className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="Password"
                  className="block text-sm font-medium text-gray-700"
                >
                  {" "}
                  Password{" "}
                </label>

                <input
                  type="password"
                  id="Password"
                  name="password"
                  className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                />
              </div>

              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="PasswordConfirmation"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password Confirmation
                </label>

                <input
                  type="password"
                  id="PasswordConfirmation"
                  name="password_confirmation"
                  className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                />
              </div>

              <div className="col-span-6">
                <label
                  htmlFor="Email"
                  className="block text-sm font-medium text-gray-700"
                >
                  {" "}
                  No HP{" "}
                </label>

                <input
                  type="email"
                  id="Email"
                  name="email"
                  className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                />
              </div>

              <div className="col-span-6">
                <label
                  htmlFor="Email"
                  className="block text-sm font-medium text-gray-700"
                >
                  {" "}
                  Kota{" "}
                </label>

                <input
                  type="email"
                  id="Email"
                  name="email"
                  className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                />
              </div>

              <div className="col-span-6">
                <label
                  htmlFor="Email"
                  className="block text-sm font-medium text-gray-700"
                >
                  {" "}
                  Alamat{" "}
                </label>

                <input
                  type="email"
                  id="Email"
                  name="email"
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
