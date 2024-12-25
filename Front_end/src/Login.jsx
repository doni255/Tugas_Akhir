import "./index.css";
import "./Login.css";

import login from "./hooks/login";

import { Toaster, toast } from "react-hot-toast";
import { useLocation } from "react-router-dom";
import { useEffect } from "react";
export default function Login() {
  // Memanggil hook
  const {
    users,
    nama,
    setNama,
    setId,
    password,
    setPassword,
    error,
    handleRegisterClick,
    handleLogin,
  } = login();

  const location = useLocation();

  // Show success message if redirected from registration
  useEffect(() => {
    if (location.state?.registrationSuccess) {
      toast.success("Registration successful! Please login.");
    }
  }, [location.state]);

  return (
    <div class="bg-gradient-to-l bg-gray-50">
      {/* {users.map((user) => (
        <li key={user.id}>
          <h2>{user.nama}</h2>
        </li>
      ))} */}
      <Toaster position="top-right" reverseOrder={false} />
      <div class="flex justify-center items-center min-h-screen">
        <div class="w-full sm:w-3/4 md:w-2/4 lg:w-1/3 xl:w-1/4 p-6 shadow-2xl bg-white rounded-md">
          <h1 class="text-3xl block text-center font-semibold">
            <i class="fa-solid fa-user"></i> Login
          </h1>
          <hr class="mt-3" />

          <form onSubmit={handleLogin}>
            <div class="mt-3">
              <label for="username" class="block text-base mb-2">
                Username
              </label>
              <input
                type="text"
                id="username"
                value={nama}
                onChange={(e) => setNama(e.target.value)}
                class="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                placeholder=" Nama..."
              />
            </div>

            <div class="mt-3">
              <label for="password" class="block text-base mb-2">
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                class="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
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

          <div class="mt-3 flex justify-between items-center">
            <div>
              <p>Dont have an account? </p>
            </div>

            <div>
              {/* <button
                className="text-gray-400 font-semibold hover:text-indigo-600"
                onClick={() => navigate("/register")}
              >
                Register Here
              </button> */}
              <button
                className="text-gray-400 font-semibold hover:text-indigo-600 underline"
                onClick={handleRegisterClick}
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
