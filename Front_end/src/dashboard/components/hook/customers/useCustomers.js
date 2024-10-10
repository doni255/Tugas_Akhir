// src/hooks/useCustomers.js
import { useState, useRef } from "react";
import axios from "axios";
import toast, { Toaster } from "react-hot-toast";

const useCustomers = (users, setUsers) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [editUserData, setEditUserData] = useState({
    id_user: "",
    nama: "",
    email: "",
    role: "",
    alamat: "",
    kota: "",
    no_telpon: "",
  });

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedUser(null);
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    setEditUserData({
      nama: "",
      email: "",
      role: "",
      alamat: "",
      kota: "",
      no_telpon: "",
    });
  };

  const handleDeleteClick = (id_user) => {
    setSelectedUser(id_user);
    setIsModalOpen(true);
  };

  const handleDelete = async () => {
    if (selectedUser) {
      try {
        await axios.delete(`http://localhost:8000/api/users/${selectedUser}`);
        setUsers((prevUsers) =>
          prevUsers.filter((user) => user.id_user !== selectedUser)
        );

        handleCloseModal();
      } catch (error) {
        console.error("Error deleting users: ", error);
      }
    }
  };

  // const handleEditClick = (user) => {
  //   setEditUserData({
  //     id_user: user.id_user, // Tambahkan id_user
  //     nama: user.nama,
  //     email: user.email,
  //     role: user.role,
  //     alamat: user.alamat,
  //     kota: user.kota,
  //     no_telpon: user.no_telpon,
  //   });
  //   setIsEditModalOpen(true);
  // };

  const handleEditClick = (user) => {
    setEditUserData({
      id_user: user.id_user || "", // Pastikan id_user tidak null
      nama: user.nama || "", // Inisialisasi dengan string kosong jika null
      email: user.email || null, // Pastikan email tidak null
      role: user.role || "", // Pastikan role tidak null
      alamat: user.alamat || "", // Pastikan alamat tidak null
      kota: user.kota || "", // Pastikan kota tidak null
      no_telpon: user.no_telpon || "", // Pastikan no_telpon tidak null
    });
    setIsEditModalOpen(true);
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;

    // Hanya izinkan angka untuk no_telpon
    if (name === "no_telpon" && !/^[0-9]*$/.test(value)) {
      return; // Jika value tidak sesuai regex, jangan update state
    }

    setEditUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    if (editUserData.id_user) {
      console.log("Selected User ID:", editUserData.id_user);
      console.log("Edit User Data:", editUserData);

      try {
        const response = await axios.put(
          `http://localhost:8000/api/users/${editUserData.id_user}`,
          {
            ...editUserData,
            email: editUserData.email === "" ? null : editUserData.email, // Send null if email is empty
          }
        );
        console.log("Update Response:", response);

        // Update the state with the modified user data without refreshing the page
        setUsers((prevUsers) =>
          prevUsers.map((user) =>
            user.id_user === editUserData.id_user
              ? { ...user, ...editUserData }
              : user
          )
        );
        handleCloseEditModal(); // Menutup modal setelah update
      } catch (error) {
        console.error("Error updating user: ", error);
      }
    } else {
      console.error("Edit user ID is missing");
    }
  };

  const toggleModal = () => {
    setIsCreateModalOpen(!isCreateModalOpen); // Toggle the modal state
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

  // Section adding new user
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

  return {
    isModalOpen,
    handleSubmit,
    formData,
    Toaster,
    handleChange,
    namaRef,
    emailRef,
    passwordRef,
    no_telponRef,
    kotaRef,
    alamatRef,
    toggleModal,
    isCreateModalOpen,
    setIsCreateModalOpen,
    isEditModalOpen,
    handleCloseModal,
    handleCloseEditModal,
    handleDeleteClick,
    handleDelete,
    handleEditClick,
    handleEditChange,
    handleUpdate,
    editUserData,
  };
};

export default useCustomers;
