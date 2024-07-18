// hooks/useBarangMasukData.js
import { useState } from "react";
import { barangMasuk } from "./dataBarangMasuk";

const formatDateForInput = (dateString) => {
  if (!dateString) {
    console.error("dateString is undefined or null");
    return "";
  }
  const [day, month, year] = dateString.split("-");
  return `${year}-${month}-${day}`;
};

const formatDateForDisplay = (dateString) => {
  if (!dateString) {
    console.error("dateString is undefined or null");
    return "";
  }
  const [year, month, day] = dateString.split("-");
  return `${day}-${month}-${year}`;
};

const useBarangMasukData = () => {
  // const [barangMasukData, setBarangMasukData] = useState(barangMasuk);
  const [barangMasukData, setBarangMasukData] = useState(
    barangMasuk.map((item) => ({
      ...item,
      tanggal_masuk: item.tanggal_masuk || "01-01-1970", // Menggunakan nilai default jika tanggal_masuk kosong atau undefined
    }))
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBarangMasuk, setSelectedBarangMasuk] = useState(null);

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editedBarangMasuk, setEditedBarangMasuk] = useState({
    id: null,
    No: "",
    name: "",
    tanggal_masuk: "",
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
      console.log("Select barang for editing:", barang);
      if (barang.tanggal_masuk) {
        setEditedBarangMasuk({
          ...barang,
          tanggal_masuk: formatDateForInput(barang.tanggal_masuk),
        });
      } else {
        console.error("Tanggal masuk is undefined or invalid");
        setEditedBarangMasuk({
          ...barang,
          tanggal_masuk: "",
        });
      }
      setIsEditModalOpen(true);
    } else {
      console.error(`Barang Masuk with ID: ${id} not found.`);
    }
  };

  const handleEditSubmit = (editedData) => {
    console.log("Submitting edited data:", editedData);

    // Update the product in the products state
    const updatedBarangMasuk = barangMasuk.map((barang) =>
      barang.id === editedData.id
        ? {
            ...editedData,
            tanggal_masuk: formatDateForDisplay(editedData.tanggal_masuk),
          }
        : barang
    );
    setBarangMasukData(updatedBarangMasuk);
    setIsEditModalOpen(false); // Mengubah menjadi setIsEditModalOpen
    setEditedBarangMasuk({
      id: null,
      name: "",
      tanggal_masuk: "",
      harga_beli: "",
      harga_jual: "",
      jumlah_masuk: "",
      nama_supplier: "",
    });
  };

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false); // Mengubah menjadi setEditModaOpen
    setEditedBarangMasuk({
      id: null,
      No: "",
      name: "",
      tanggal_masuk: "",
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

  currentItems.forEach((item) => {
    console.log("Current item:", item);
  });

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
