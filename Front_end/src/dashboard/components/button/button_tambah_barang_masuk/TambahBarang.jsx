import React, { useState } from "react";
import { HiPlus } from "react-icons/hi";
import Modal from "../../Modal";

function TambahBarang() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => setIsModalOpen(false);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const [formData, setFormData] = useState({
    name: "",
    harga_beli: "",
    harga_jual: "",
    jumlah_masuk: "",
    nama_supplier: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Assuming addItem is a function that returns a promise
    addItem(formData)
      .then(() => {
        setFormData({
          name: "",
          harga_beli: "",
          harga_jual: "",
          jumlah_masuk: "",
          nama_supplier: "",
        });
        closeModal();
      })
      .catch((error) => {
        console.error("Error adding item:", error);
        // Handle the error appropriately
      });
  };

  const addItem = (item) => {
    return new Promise((resolve, reject) => {
      // simulasi an async operation, e.g., API call
      console.log("Item added: ", item);
      resolve();
      // if there is an error, call reject(error);
    });
    // Logika untuk menambahkan item ke daftar barangMasuk bisa diterapkan di sini
  };

  return (
    <>
      <button
        className="inline-flex gap-x-2 items-center py-2.5 px-5 text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1"
        onClick={toggleModal}
      >
        <HiPlus className="w-4 h-4 fill-current" />
        <span className="text-sm font-semibold tracking-wide">Tambah Item</span>
      </button>

      <Modal open={isModalOpen} onClose={closeModal} type="create">
        <h2 className="text-lg font-semibold mb-4">Create New Item</h2>
        <form onSubmit={handleSubmit} className="mt-8 grid grid-cols-6 gap-6">
          <div className="col-span-6 sm:col-span-6">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Nama
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              required
            />
          </div>
          <div className="col-span-6">
            <label
              htmlFor="harga_beli"
              className="block text-sm font-medium text-gray-700"
            >
              Kategori Produk
            </label>
            <input
              type="text"
              id="kategori_produk"
              name="kategori_produk"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              required
            />
          </div>
          <div className="col-span-6">
            <label
              htmlFor="harga_beli"
              className="block text-sm font-medium text-gray-700"
            >
              Harga Beli
            </label>
            <input
              type="text"
              id="harga_beli"
              name="harga_beli"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              required
            />
          </div>
          <div className="col-span-6">
            <label
              htmlFor="jumlah_masuk"
              className="block text-sm font-medium text-gray-700"
            >
              Jumlah Stock
            </label>
            <input
              type="number"
              id="jumlah_stock"
              name="jumlah_stock"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              required
            />
          </div>
          <div className="flex gap-2.5">
            <button
              type="button"
              onClick={toggleModal}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-block rounded bg-indigo-600 px-8 py-3 text-sm font-medium text-white transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:bg-indigo-500"
            >
              Create
            </button>
          </div>
        </form>
      </Modal>
    </>
  );
}

export default TambahBarang;
