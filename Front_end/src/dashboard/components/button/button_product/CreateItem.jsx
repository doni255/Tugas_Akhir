import React, { useState } from "react";
import { HiPlus } from "react-icons/hi";
import Modal from "../../Modal";

function CreateItem({ onAddItem }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    imageUrl: null,
    price: "",
    stock: "",
  });

  const addItem = (newItem) => {
    console.log("New Item Added:", newItem);
    // Logika untuk menambahkan item baru ke daftar produk
    // Bisa menambahkan item ke state produk di komponen induk
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, imageUrl: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, category, imageUrl, price, stock } = formData;

    // Convert base64 image data from data URL
    const base64Image = imageUrl ? imageUrl.split(",")[1] : "";

    const newItem = {
      nama_product: name,
      kategori_produk: category,
      harga: price,
      konten_base64: base64Image,
      jumlah_stock: stock,
    };

    try {
      const response = await fetch("http://localhost:8000/api/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newItem),
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Product created:", data);
        onAddItem(data.data); // Update the parent component with the new item
        toggleModal(); // Close the modal
      } else {
        console.error("Error creating product:", data);
      }
    } catch (error) {
      console.error("Network error:", error);
    }
  };

  return (
    <>
      <button
        onClick={toggleModal}
        className="inline-flex gap-x-2 items-center py-2.5 px-5 text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1"
      >
        <HiPlus className="w-4 h-4 fill-current" />
        <span className="text-sm font-semibold tracking-wide">Create Item</span>
      </button>

      <Modal
        open={isModalOpen}
        onClose={toggleModal}
        type="create"
        addItem={addItem}
      >
        <h2 className="text-lg font-semibold mb-4">Create New Item</h2>
        <form onSubmit={handleSubmit} className="mt-8 grid grid-cols-6 gap-6">
          <div className="col-span-6 sm:col-span-6">
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Product Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              required
            />
          </div>
          <div className="col-span-6">
            <label
              htmlFor="category"
              className="block text-sm font-medium text-gray-700"
            >
              Category
            </label>
            <input
              type="text"
              id="category"
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              required
            />
          </div>
          <div className="col-span-6">
            <label
              htmlFor="imageUrl"
              className="block text-sm font-medium text-gray-700"
            >
              Image URL
            </label>
            <input
              type="file"
              id="imageUrl"
              name="imageUrl"
              onChange={handleFileChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div className="col-span-6">
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-700"
            >
              Price
            </label>
            <input
              type="number"
              id="price"
              name="price"
              value={formData.price}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              required
            />
          </div>
          <div className="col-span-6">
            <label
              htmlFor="stock"
              className="block text-sm font-medium text-gray-700"
            >
              Stock
            </label>
            <input
              type="number"
              id="stock"
              name="stock"
              value={formData.stock}
              onChange={handleChange}
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

export default CreateItem;
