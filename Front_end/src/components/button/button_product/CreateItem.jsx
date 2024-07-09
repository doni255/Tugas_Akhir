import React, { useState } from "react";
import { HiPlus } from "react-icons/hi";
import Modal from "../../Modal";

function CreateItem({ onAddItem }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const addItem = (newItem) => {
    console.log("New Item Added:", newItem);
    // Logika untuk menambahkan item baru ke daftar produk
    // Bisa menambahkan item ke state produk di komponen induk
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      <button
        onClick={toggleModal}
        className="inline-flex gap-x-2 items-center py-2.5 px-6 text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1"
      >
        <HiPlus className="w-6 h-6 fill-current" />
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
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
              required
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

  function handleSubmit(e) {
    e.preventDefault();
    const formData = {
      name: e.target.name.value,
      category: e.target.imageUrl.value,
      imageUrl: e.target.imageUrl.value,
      price: parseFloat(e.target.price.value),
      stock: parseInt(e.target.stock.value, 10),
    };
    addItem(formData);
    toggleModal();
  }
}

export default CreateItem;
