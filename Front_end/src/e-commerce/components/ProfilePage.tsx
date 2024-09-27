import React from "react";
import axios from "axios";
import { useState, useEffect, useRef } from "react";
import toast, { Toaster } from "react-hot-toast";
import { Transition } from "@headlessui/react";
import { Navigate, useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    password: "",
    alamat: "",
    no_telpon: "",
    kota: "",
    role: "",
  });

  // const [isToastShown, setIsToastShown] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false); // state for animation
  const toastShownRef = useRef(false); // Use a ref to track if the toast has been shown
  const navigate = useNavigate();

  const setTimedLogout = () => {
    localStorage.clear(); // Clear user data
    toast.success("Logout Berhasil 😁", {
      duration: 5000,
    });

    // Set a timeout to refresh the page after 5 seconds
    setTimeout(() => {
      window.location.reload(); // Refresh the page
    }, 500); // Adjust the time as needed
  };

  const Logout = () => {
    // Check if the user is logged in
    const isLoggedIn = localStorage.getItem("id_user");

    if (!isLoggedIn) {
      toast.error("You haven't logged in yet!", {
        duration: 3000,
      });
      return; // Prevent further execution if not logged in
    }

    setTimedLogout();
  };

  const getDataUserByID = async () => {
    //buatkan dengan axios
    try {
      const response = await axios.get(
        `http://localhost:8000/api/getDataUserByID/` +
          localStorage.getItem("id_user")
      );
      const data = response.data;

      setFormData(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      await getDataUserByID();

      // Show login toast if the user is logged in and toast has not been shown yet
      const isLoggedIn = localStorage.getItem("id_user");
      const isToastShown = localStorage.getItem("isToastShown");
      if (isLoggedIn && !isToastShown) {
        toast.success("Login Berhasil", {
          duration: 1500,
        });
        localStorage.setItem("isToastShown", "true"); // Mark as shown
      }

      // Check for the logout flag and show the logout toast
      const isLoggedOut = localStorage.getItem("isLoggedOut");
      if (isLoggedOut) {
        toast.success("You have successfully logged out!", {
          duration: 3000,
        });
        localStorage.removeItem("isLoggedOut"); // Clear the logout flag
      }

      setIsLoaded(true);
    };

    fetchData();
  }, []);

  return (
    <div className="mx-auto px-4 py-6 flex flex-col items-center bg-gradient-to-br from-blue-50 to-white min-h-screen">
      <h1 className="text-4xl font-bold mb-8">Profile Page</h1>

      <Transition
        show={isLoaded}
        enter="transition ease-out duration-300 transform"
        enterFrom="opacity-0 scale-45"
        enterTo="opacity-100 scale-100"
        leave="transition ease-in duration-200 transform"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-60"
      >
        <div className="w-full max-w-lg bg-white shadow-md rounded-lg p-6">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Your Profile Information
          </h2>

          <div className="mb-4">
            <p className="text-lg font-medium text-gray-700">Nama:</p>
            <p className="text-gray-600">{formData.nama}</p>
          </div>

          <div className="mb-4">
            <p className="text-lg font-medium text-gray-700">Email:</p>
            <p className="text-gray-600">{formData.email}</p>
          </div>

          <div className="mb-4">
            <p className="text-lg font-medium text-gray-700">Alamat:</p>
            <p className="text-gray-600">{formData.alamat}</p>
          </div>

          <div className="mb-4">
            <p className="text-lg font-medium text-gray-700">No Telpon:</p>
            <p className="text-gray-600">{formData.no_telpon}</p>
          </div>

          <div className="mb-4">
            <p className="text-lg font-medium text-gray-700">Kota:</p>
            <p className="text-gray-600">{formData.kota}</p>
          </div>

          <div className="mb-6">
            <p className="text-lg font-medium text-gray-700">Role:</p>
            <p className="text-gray-600">{formData.role}</p>
          </div>

          {/* Logout Button */}
          <button
            type="button"
            className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-3 rounded-md shadow-lg transition duration-300 ease-in-out"
            onClick={Logout}
          >
            Logout
          </button>
        </div>
      </Transition>
    </div>
  );
};

export default ProfilePage;
