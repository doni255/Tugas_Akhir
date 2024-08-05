import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const login = () => {
  const [users, setUsers] = useState([]);
  const [nama, setNama] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

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
    console.log("Login button clicked"); // Debug log
    try {
      const response = await axios.post("http://localhost:8000/api/login", {
        nama: nama, // Nama pengguna
        password: password, // Password pengguna
      });
      if (response.status === 200) {
        // Arahkan pengguna ke halaman setelah login sukses
        console.log("Login successful"); // Debug log
        navigate("/register"); // Ubah ke rute tujuan Anda
      }
    } catch (error) {
      if (error.response) {
        setError(error.response.data.message);
        console.error("Login error:", error.response.data.message); // Debug log
      } else {
        setError("Terjadi kesalahan, coba lagi nanti.");
        console.error("Unexpected error:", error); // Debug log
      }
    }
  };

  return {
    users,
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
