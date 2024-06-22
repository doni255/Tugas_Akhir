import React from "react";
import "./index.css";
import "./Login.css";

import { useNavigate } from "react-router-dom";

export default function Register() {

const navigate = useNavigate()

  return (
    <div class="flex justify-center items-center min-h-screen bg-gray-100">
      <div class="w-full sm:w-3/4 md:w-2/4 lg:w-1/3 xl:w-1/4 p-6 shadow-2xl bg-white rounded-md text-center">
        <h1 class="text-3xl font-semibold mb-6">SIGN UP</h1>
        <hr class="mt-3" />
    
        <form action="">
          <div class="mt-6 shadow-xl rounded-md">
            <input
              type="text"
              id="username"
              class="rounded-md  w-full text-base px-2 py-1 Focus:outline-none focus:ring-0 focus:border-gray-600"
              placeholder=" Username"
            />
          </div>

          <div class="mt-6 shadow-xl rounded-md">
            <input
              type="password"
              id="password"
              class="rounded-md  w-full text-base px-2 py-1 Focus:outline-none Focus:ring-0 focus:border-gray-600 "
              placeholder=" Email"
            />
          </div>

          <div class="mt-6 shadow-xl rounded-md">
            <input
              type="password"
              id="password"
              class="rounded-md w-full text-base px-2 py-1 Focus:outline-none Focus:ring-0 focus:border-gray-600 "
              placeholder=" Password"
            />
          </div>

          <div class="mt-6 shadow-xl rounded-md">
            <input
              type="password"
              id="password"
              class="rounded-md w-full text-base px-2 py-1 Focus:outline-none Focus:ring-0 focus:border-gray-600 "
              placeholder=" Confirm Password"
            />
          </div>

          <div class="mt-8">
            <button
              type="submit"
              class="border-2 border-sky-500 bg-sky-500 text-white py-1 px-5 w-full rounded-md hover:bg-sky-600"
            >
              Login
            </button>
          </div>

          <div class="mt-4">
            <h1 class="">
              Already have an account
              <button
                className="ml-1 text-gray-400 font-semibold hover:text-indigo-600"
                onClick={() => navigate("/login")}
              >
                Login 
              </button>
            </h1>
          </div>
        </form>
      </div>
    </div>
  );
}