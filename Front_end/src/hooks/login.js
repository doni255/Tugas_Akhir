import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../App";
import toast, { Toaster } from "react-hot-toast";

const login = () => {
  const [users, setUsers] = useState([]);
  const [nama, setNama] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const { setRole } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/users");
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const handleRegisterClick = () => {
    navigate("/register");
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    // Check if fields are empty
    if (!nama.trim() || !password.trim()) {
      toast.error("Username dan password tidak boleh kosong", {
        duration: 5000,
        position: "top-center",
      });
      return; // Stop the function execution if fields are empty
    }

    try {
      const response = await axios.post("http://localhost:8000/api/login", {
        nama: nama.trim(), // Nama pengguna
        password: password.trim(), // Password pengguna
      });

      if (response.status === 200) {
        console.log(response.data.data);
        // Arahkan pengguna ke halaman setelah login sukses

        localStorage.setItem("token", response.data.token);
        localStorage.setItem("id_user", response.data.data.id_user);
        localStorage.setItem("role", response.data.data.role);

        setRole(response.data.data.role);

        // Arahkan berdasarkan role
        if (response.data.data.role === "admin") {
          navigate("/dashboard");
        } else if (response.data.data.role === "supplier") {
          navigate("/dashboard");
        } else {
          navigate("/e-commerce"); // Jika role adalah 'user'
        }
        window.location.reload();
      }
    } catch (error) {
      // Check if error is due to wrong password or other is issues
      if (error.response && error.response.status === 401) {
        // Assuming 401 is the status code for wrong password
        toast.error("Password anda salah", {
          duration: 5000,
          position: "top-center",
        });
      } else if (error.response && error.response.status === 400) {
        // Assuming 400 is the status code for wrong username
        toast.error("ID pengguna tidak ditemukan", {
          duration: 5000,
          position: "top-center",
        });
      } else {
        // General error handling
        toast.error("Silahkan Di Isi Dengan Benar", {
          duration: 5000,
          position: "top-center",
        });
      }
      console.error("Full error:", error);
      if (error.response) {
        // console.error("Error response data:", error.response.data);
        // setError(error.response.data.message);
      } else {
        setError("Terjadi kesalahan, coba lagi nanti.");
      }
    }
  };

  return {
    users,
    setUsers,
    nama,
    setNama,
    password,
    setPassword,
    error,
    handleRegisterClick,
    handleLogin,
  };
};

export default login;
