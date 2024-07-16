// hooks/useBarangMasukData.js
import { useState } from "react";
import { barangMasuk } from "./dataBarangMasuk";
const useBarangMasukData = () => {
  const [barangMasukData, setBarangMasukData] = useState(barangMasuk);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBarangMasuk, setSelectedBarangMasuk] = useState(null);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editedBarangMasuk, setEditedBarangMasuk] = useState({
    id: null,
    No: "",
    name: "",
    harga_beli: "",
    harga_jual: "",
    jumlah_masuk: "",
    nama_supplier: "",
  });

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Edit

  const handleEditClick = (id) => {
    const barang = barangMasukData.find((item) => item.id === id);
    if (barang) {
      setEditedBarangMasuk(barang);
      setIsEditModalOpen(true);
    } else {
      console.error(`Barang Masuk with ID: ${id} not found.`);
    }
  };

  const handleEditSubmit = (editedData) => {
    // Update the product in the products state
    const updatedBarangMasuk = barangMasuk.map((barangMasuk) =>
      barangMasuk.id === editedData.id ? editedData : barangMasuk
    );
    setEditedBarangMasuk(updatedProducts);
    setIsEditModalOpen(false); // Mengubah menjadi setIsEditModalOpen
    setEditedBarangMasuk({
      id: null,
      name: "",
      category: "",
      imageUrl: "",
      price: "",
      stock: "",
    });
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false); // Mengubah menjadi setEditModaOpen
    setEditedBarangMasuk({
      id: null,
      No: "",
      name: "",
      harga_beli: "",
      harga_jual: "",
      jumlah_masuk: "",
      nama_supplier: "",
    });
  };

  // End of edit

  const handleDeleteClick = (barangMasukId) => {
    setSelectedBarangMasuk(barangMasukId);
    setIsModalOpen(true);
  };

  const handleDelete = () => {
    setBarangMasukData(
      barangMasukData.filter(
        (barangMasuk) => barangMasuk.id !== selectedBarangMasuk
      )
    );
    handleCloseModal();
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedBarangMasuk(null);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = barangMasukData.slice(indexOfFirstItem, indexOfLastItem);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return {
    barangMasukData,
    isModalOpen,
    selectedBarangMasuk,
    currentItems,
    currentPage,
    itemsPerPage,
    editedBarangMasuk,
    isEditModalOpen,
    handleCloseEditModal,
    setEditedBarangMasuk,
    handleEditSubmit,
    setIsEditModalOpen,
    handleDeleteClick,
    handleDelete,
    handleCloseModal,
    paginate,
    handleEditClick,
  };
};

export default useBarangMasukData;
