import React from "react";
import "./index.css";
import "./Login.css";

import { useNavigate } from "react-router-dom";


export default function Login() {

  // Deklarasi
  const navigate = useNavigate()


  return (
    <div className="bg-gradient-to-l bg-gray-100">
      <div class="flex justify-center items-center min-h-screen">
        <div class="w-full sm:w-3/4 md:w-2/4 lg:w-1/3 xl:w-1/4 p-6 shadow-2xl bg-white rounded-md">
          <h1 class="text-3xl block text-center font-semibold">
            <i class="fa-solid fa-user"></i> Login
          </h1>
          <hr class="mt-3" />

          <form action="">
            <div class="mt-3">
              <label for="username" class="block text-base mb-2">
                Username
              </label>
              <input
                type="text"
                id="username"
                class="shadow-xl w-full text-base px-2 py-1 Focus:outline-none focus:ring-0 focus:border-gray-600 rounded"
                placeholder=" Username..."
              />
            </div>

            <div class="mt-3">
              <label for="password" class="block text-base mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                class="shadow-xl w-full text-base px-2 py-1 Focus:outline-none Focus:ring-0 focus:border-gray-600 rounded"
                placeholder=" Password..."
              />
            </div>

            <div class="mt-7">
              <button
                type="submit"
                class="border-2 border-sky-500 bg-sky-500 text-white py-1 px-5 w-full rounded-md hover:bg-sky-600"
              >
                Login
              </button>
            </div>
          </form>

          <div class="mt-3 flex justify-between items-center">
            <div>
              <p>Dont have an account? </p>
            </div>

            <div>
              <button
                className="text-gray-400 font-semibold hover:text-indigo-600"
                onClick={() => navigate("/register")}
              >
                Register Here
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
