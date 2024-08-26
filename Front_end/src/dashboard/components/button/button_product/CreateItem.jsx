import React, { useState } from "react";
import { HiPlus } from "react-icons/hi";
import Modal from "../../Modal";
import axios from "axios";

function CreateItem({ onAddItem }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    imageUrl: null,
    price: "",
    stock: "",
  });

  const [imageError, setImageError] = useState("");

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
    } else {
      setImageError("Image file is required");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, category, imageUrl, price, stock } = formData;

    // Validasi input kosong termasuk gambar
    if (!name || !category || !price || !stock || !imageUrl) {
      if (!imageUrl) {
        setImageError("Image file is required");
      }
      alert("Please fill in all the fields.");
      return;
    }

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
      const response = await axios.post(
        "http://localhost:8000/api/create",
        newItem,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      console.log(response);

      // const data = response.data;

      if (response.status === 200 || response.status === 201) {
        // Check if the response is OK
        console.log("Product created:", response.data.data);
        onAddItem(response.data.data); // Update the parent component with the new item
      } else {
        console.error("Error creating product:", response.data);
      }
    } catch (error) {
      console.error("Network error:", error);
      console.log("gagal idiot");
      onAddItem(response.data.data); // Update the parent component with the new item
      // if (error.response) {
      //   // Server responded with a status other than 200 range
      //   console.error("Response error:", error.response.data);
      //   console.error("Response status:", error.response.status);
      // } else if (error.request) {
      //   // Request was made but no response received
      //   console.error("Request error:", error.request);
      // } else {
      //   // Something happened in setting up the request
      //   console.error("Error message:", error.message);
      // }
    } finally {
      // Ensure modal is closed regardless of success or failure
      toggleModal();
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

      {isModalOpen && (
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
              {imageError && (
                <p className="text-red-600 text-sm mt-1">{imageError}</p>
              )}
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
      )}
    </>
  );
}

export default CreateItem;
