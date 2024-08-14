// src/hooks/useCustomers.js
import { useState } from "react";
import axios from "axios";

const useCustomers = (users, setUsers) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
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

  const handleEditClick = (user) => {
    setEditUserData({
      id_user: user.id_user, // Tambahkan id_user
      nama: user.nama,
      email: user.email,
      role: user.role,
      alamat: user.alamat,
      kota: user.kota,
      no_telpon: user.no_telpon,
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
          editUserData
        );
        console.log("Update Response:", response);

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

  return {
    isModalOpen,
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
