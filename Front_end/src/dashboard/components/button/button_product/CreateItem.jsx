import React, { useState } from "react";
import { HiPlus } from "react-icons/hi";
import Modal from "../../Modal";
import axios from "axios";

import { Menu } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  // DropdownSection,
  DropdownItem,
} from "@nextui-org/dropdown";
import { Button } from "@nextui-org/react";

function CreateItem({ onAddItem }) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    harga_beli: "",
    harga_jual: "",
    imageUrl: null,
    price: "",
    stock: "",
  });

  const [imageError, setImageError] = useState("");

  const addItem = (newItem) => {
    // console.log("New Item Added:", newItem);
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
    const { name, category, imageUrl, harga_beli, harga_jual, stock } = formData;

    // Validasi input kosong termasuk gambar
    if (!name || !category || !harga_beli || !harga_jual || !stock || !imageUrl) {
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
      harga_beli: harga_beli,
      harga_jual: harga_jual, 
      konten_base64: base64Image,
      jumlah_stock: stock,
    };

    axios
      .post("http://localhost:8000/api/create", newItem, {
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(response);
        toggleModal();
        onAddItem(response.data.data);
      })
      .catch((error) => {
        console.log(error);
        toggleModal();
      });
  };

  const [selectedCategory, setSelectedCategory] = useState("");

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setFormData({ ...formData, category });
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
            {/* <div className="col-span-6">
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
            </div> */}

            <div className="col-span-6 sm:col-span-6">
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700"
              >
                Category
              </label>
              <Menu as="div" className="relative inline-block text-left">
                <div>
                  <Menu.Button className="inline-flex w-72 justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                    {selectedCategory || "Select Category"}
                    <ChevronDownIcon
                      aria-hidden="true"
                      className="-mr-1 h-5 w-5 text-gray-400"
                    />
                  </Menu.Button>
                </div>

                <Menu.Items className="absolute mt-2 w-full origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                  <div className="text-center">
                    {["Genset", "Speed Boat", "Pompa Air", "Gergaji", "Spare Part Genset", "Spare Part Speed Boat", "Spare Part Gergaji"].map((category) => (
                      <Menu.Item key={category}>
                        {({ active }) => (
                          <button
                            type="button"
                            onClick={() => handleCategoryChange(category)}
                            className={`block px-4 py-2 text-sm ${
                              active
                                ? "bg-gray-100 text-gray-900"
                                : "text-gray-700"
                            }`}
                          >
                            {category}
                          </button>
                        )}
                      </Menu.Item>
                    ))}
                  </div>
                </Menu.Items>
              </Menu>
            </div>

            <div className="col-span-6">
              <label
                htmlFor="harga_beli"
                className="block text-sm font-medium text-gray-700"
              >
                Harga Beli
              </label>
              <input
                type="number"
                id="harga_beli"
                name="harga_beli"
                value={formData.harga_beli}
                onChange={handleChange}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                required
              />
            </div>

            
            <div className="col-span-6">
              <label
                htmlFor="harga_beli"
                className="block text-sm font-medium text-gray-700"
              >
                Harga Jual
              </label>
              <input
                type="number"
                id="harga_jual"
                name="harga_jual"
                value={formData.harga_jual}
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
