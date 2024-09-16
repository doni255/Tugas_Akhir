import { useState, useRef } from "react";
// import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast"; // Import toast

export const useRegister = () => {
  const navigate = useNavigate();

  const namaRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const no_telponRef = useRef();
  const kotaRef = useRef();
  const alamatRef = useRef();

  const [formData, setFormData] = useState({
    nama: "",
    email: "",
    no_telpon: "",
    kota: "",
    alamat: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation logic
    const requiredFields = [
      { field: "nama", message: "Nama must be filled" },
      { field: "password", message: "Password must be filled" },
      { field: "no_telpon", message: "Nomor HP must be filled" },
      { field: "kota", message: "Kota must be filled" },
      { field: "alamat", message: "Alamat must be filled" },
    ];

    for (let { field, message } of requiredFields) {
      if (!formData[field] || formData[field].trim() === "") {
        toast.error(message);
        return;
      }
    }

    if (formData.password.length < 6) {
      toast.error("Password must be at least 6 characters long");
      return;
    }

    if (formData.no_telpon.length < 10) {
      toast.error("Nomor HP must be at least 10 characters long");
      return;
    }

    if (formData.alamat.length < 10) {
      toast.error("Alamat must be at least 10 characters long");
      return;
    }

    // Submit logic
    try {
      const response = await fetch("http://localhost:8000/api/store_user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      console.log("Result:", result);

      // Show success toast
      toast.success("Registration successful!");

      navigate("/e-commerce", { state: { registrationSuccess: true } });
      setTimeout(() => {
        window.location.reload(); // Reload the page after a short delay
      }, 1000); // Adjust the delay if needed
    } catch (error) {
      console.error("An unexpected error occurred.", error);
      toast.error("An error occurred during registration.");
    }
  };

  return {
    formData,
    handleChange,
    handleSubmit,
  };
};
