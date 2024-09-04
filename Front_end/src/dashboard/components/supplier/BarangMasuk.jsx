import React, { useState, useEffect, useContext, createContext } from "react";
import { FiLayers } from "react-icons/fi";

import EditButton from "../button/button_product/EditButton";
import DeleteButton from "../button/button_product/DeleteButton";
import Modal from "../Modal";
import axios from "axios";

import toast, { Toaster } from "react-hot-toast";

import {
  HiFilter,
  HiOutlineEyeOff,
  HiOutlineMail,
  HiOutlinePencilAlt,
  HiOutlineXCircle,
  HiPlus,
} from "react-icons/hi";
import Pagination from "../../consts/Pagination";
import { Menu } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";

const notify = () => toast("Here is your toast.");

const status = [
  { name: "Published", icon: <FiLayers className="w-6 h-6" /> },
  { name: "Draft", icon: <HiOutlinePencilAlt className="w-6 h-6" /> },
  { name: "Hidden", icon: <HiOutlineEyeOff className="w-6 h-6" /> },
  { name: "Rejected", icon: <HiOutlineXCircle className="w-6 h-6" /> },
  { name: "Under Review", icon: <HiOutlineMail className="w-6 h-6" /> },
];

export default function BarangMasuk() {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedProduct, setSelectedBarangMasuk] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [barangMasuk, setBarangMasuk] = useState([]);
  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setFormData({ ...formData, category });
  };

  const handleCategoryChangeEdit = (category) => {
    setSelectedCategory(category);
    setFormData({ ...formData, kategori_produk: category });
  };

  const resetForm = () => {
    setFormData({
      name: "",
      category: "",
      harga_beli: "",
      stock: "",
    });
  };

  const handleEditClick = (product) => {
    setSelectedBarangMasuk(product);
    setIsEditModalOpen(true);
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    // formData.append("_method", "PUT");
    formData.append("nama_product", selectedProduct.nama_product);
    formData.append("kategori_produk", selectedCategory);
    formData.append("harga_beli", selectedProduct.harga_beli);
    formData.append("jumlah_stock", selectedProduct.jumlah_stock);

    try {
      const response = await axios.post(
        `http://localhost:8000/api/barang_masuk/update/${selectedProduct.id_barang_masuk}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Full response:", response); // Debugging response object
      console.log("Response data:", response.data); // Debugging response data

      // Periksa apakah response data memiliki id_barang_masuk
      if (response.data && response.data.id_barang_masuk) {
        // Perbarui state barangMasuk
        setBarangMasuk((prevBarangMasuk) =>
          prevBarangMasuk.map((item) =>
            item.id_barang_masuk === selectedProduct.id_barang_masuk
              ? { ...item, ...response.data } // Menggabungkan data lama dengan data baru
              : item
          )
        );
      } else {
        console.error(
          "Response data tidak memiliki id_barang_masuk yang valid"
        );
      }
      toast.success("Product berhasil di edit !", {
        duration: 5000,
      });
      setIsEditModalOpen(false);
    } catch (error) {
      if (error.response) {
        console.log("Error response data:", error.response.data);
        alert(`Error: ${error.response.data.message || "Validation failed"}`);
      } else {
        console.error("Error:", error.message);
      }
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedBarangMasuk(null);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleAddItem = (newItem) => {
    // Tambahkan produk baru ke array products dan perbarui state
    setProducts((prevProducts) => [...prevProducts, newItem]);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalOpenCreate, setIsModalOpenCreate] = useState(false);

  // Bagian Paginasi
  // Menginisialisasi products sebagai array kosong untuk menghindari undefined
  const [products, setProducts] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = Array.isArray(products)
    ? products.slice(indexOfFirstItem, indexOfLastItem)
    : [];

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const addItem = (newItem) => {
    // console.log("New Item Added:", newItem);
    // Logika untuk menambahkan item baru ke daftar produk
    // Bisa menambahkan item ke state produk di komponen induk
  };
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    harga_beli: "",
    stock: "",
  });

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const toggleModalCreate = () => {
    setIsModalOpenCreate(!isModalOpenCreate);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, category, harga_beli, stock } = formData;

    // Validasi input kosong termasuk gambar
    if (!name || !category || !harga_beli || !stock) {
      alert("Please fill in all the fields.");
      return;
    }

    const newItem = {
      nama_product: name,
      kategori_produk: category,
      harga_beli: harga_beli,
      jumlah_stock: stock,
    };

    axios
      .post(
        "http://localhost:8000/api/barang_masuk/create/" +
          localStorage.getItem("id_user"),
        newItem,
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((response) => {
        console.log(response.data.message);
        toggleModalCreate();
        fetchProducts();
        resetForm();
        toast.success("Product berhasil ditambahkan !", {
          duration: 5000,
        });
      })
      .catch((error) => {
        // alert(error.response.data.message || "Error occurred");
        console.log(error);
        toggleModalCreate();
        toast.error(error.response.data.message, {
          duration: 5000,
        });
      });
  };

  // End of pagination

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    console.log(localStorage.getItem("id_user"));
    try {
      const response = await axios.get(
        "http://localhost:8000/api/barang_masuk/" +
          localStorage.getItem("id_user")
      );
      setProducts(response.data.data || []); // Mengakses array produk di dalam response.data.data
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]); // Menghindari products menjadi undefined
    }
  };

  const handleDeleteClick = (id_barang_masuk) => {
    console.log(
      `handleDeleteClick called with id_barang_masuk: ${id_barang_masuk}`
    );
    setSelectedBarangMasuk(id_barang_masuk);
    setIsModalOpen(true);
  };

  const handleDelete = () => {
    console.log(`handleDelete called with selectedProduct: ${selectedProduct}`);
    if (selectedProduct) {
      destroyProduct(selectedProduct);
    }
  };

  const destroyProduct = async (id_barang_masuk) => {
    try {
      console.log(
        `destroyProduct called with id_barang_masuk: ${id_barang_masuk}`
      );
      // Send DELETE request to the backend
      await axios.delete(
        `http://localhost:8000/api/barang_masuk/${id_barang_masuk}`
      );

      // Update the frontend state
      setProducts((prevProducts) =>
        prevProducts.filter(
          (product) => product.id_barang_masuk !== id_barang_masuk
        )
      );

      // Close the confirmation modal
      handleCloseModal();

      // Optionally, show a success message
      console.log("Product deleted successfully");
      toast.error("Product berhasil dihapus!", {
        duration: 5000,
      });
    } catch (error) {
      console.error("Error deleting product:", error);
      // Optionally, show an error message to the user
    }
  };

  return (
    <main className="relative ">
      <Toaster position="top-right" reverseOrder={false} />
      <div className="bg-white px-4  pb-4 rounded-sm border-gray-200 max-h-screen overflow-y-auto">
        <div className="flex items-center justify-between py-7 px-10">
          <div>
            <h1 className="text-2xl font-semibold loading-relaxed text-gray-800">
              Barang Masuk
            </h1>
            <p className="text-sm font-medium text-gray-500">
              Let's grow to your business! Create your product and upload here
            </p>
          </div>
          <button
            onClick={toggleModalCreate}
            className="inline-flex gap-x-2 items-center py-2.5 px-5 text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1"
          >
            <HiPlus className="w-4 h-4 fill-current" />
            <span className="text-sm font-semibold tracking-wide">
              Create Item
            </span>
          </button>

          {isModalOpenCreate && (
            <Modal
              open={isModalOpenCreate}
              onClose={toggleModalCreate}
              type="create"
              addItem={addItem}
            >
              <h2 className="text-lg font-semibold mb-4">Create New Item</h2>
              <form
                onSubmit={handleSubmit}
                className="mt-8 grid grid-cols-6 gap-6"
              >
                <div className="col-span-6 sm:col-span-6">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Nama Produk
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
                    Kategori Produk
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
                        {[
                          "Genset",
                          "Speed Boat",
                          "Pompa Air",
                          "Gergaji",
                          "Spare Part Genset",
                          "Spare Part Speed Boat",
                          "Spare Part Gergaji",
                        ].map((category) => (
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
                    htmlFor="stock"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Jumlah Stock
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
                    onClick={toggleModalCreate}
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
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-sm font-medium text-gray-700 border-b border-gray-200">
                {/* <td className="pl-10 py-4">
                  <div className="flex items-center gap-x-4">
                    <input
                      type="checkbox"
                      className="w-6 h-6 text-indigo-600 rounded-md border-gray-300"
                    />
                    <span>ID</span>
                  </div>
                </td> */}
                <td className=" text-center">Product Name</td>
                <td className="text-center">Kategori Produk</td>
                <td className=" text-center">Harga Beli</td>
                <td className=" text-center">Jumlah</td>
                <td className=" text-center">Tanggal Kirim</td>
                <td className=" text-center">Actions</td>
                <td className=" text-center"></td>
              </tr>
            </thead>

            <tbody>
              {currentItems.map((product) => (
                <tr key={product.id_barang_masuk} className="hover:bg-gray-100">
                  <td className="text-center">{product.nama_product}</td>
                  <td className="text-center">{product.kategori_produk}</td>
                  <td className=" text-center ">{product.harga_beli}</td>
                  <td className="text-center">{product.jumlah_stock}</td>
                  {/* <td className="py-4 px-4 text-center">{product.createdAt}</td> */}
                  <td className=" text-center ">{product.tanggal_kirim}</td>
                  <td className="py-4 px-4 text-center">
                    <EditButton onClick={() => handleEditClick(product)} />
                    <DeleteButton
                      onClick={() => handleDeleteClick(product.id_barang_masuk)}
                    />
                  </td>
                  <td></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Pagination
          itemsPerPage={itemsPerPage}
          totalItems={products.length}
          paginate={paginate}
          currentPage={currentPage}
        />
        <div className="mb-16"></div>
      </div>

      {/* Modal for Edit Form */}
      <Modal open={isEditModalOpen} onClose={() => setIsEditModalOpen(false)}>
        <h2 className="text-lg font-semibold mb-4">Edit Product</h2>
        {selectedProduct && (
          <form
            onSubmit={handleEditSubmit}
            className="mt-8 grid grid-cols-6 gap-6"
          >
            <div className="col-span-6 sm:col-span-6 ">
              <label
                htmlFor="ProductName"
                className="block text-sm font-medium text-gray-700"
              >
                Product Name:
              </label>
              <input
                type="text"
                value={selectedProduct.nama_product}
                onChange={(e) =>
                  setSelectedBarangMasuk({
                    ...selectedProduct,
                    nama_product: e.target.value,
                  })
                }
                className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
              />
            </div>

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
                    {[
                      "Genset",
                      "Speed Boat",
                      "Pompa Air",
                      "Gergaji",
                      "Spare Part Genset",
                      "Spare Part Speed Boat",
                      "Spare Part Gergaji",
                    ].map((category) => (
                      <Menu.Item key={category}>
                        {({ active }) => (
                          <button
                            type="button"
                            onClick={() => handleCategoryChangeEdit(category)}
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
                htmlFor="Harga_Beli"
                className="block text-sm font-medium text-gray-700"
              >
                Harga Beli
              </label>
              <input
                type="number"
                value={selectedProduct.harga_beli}
                onChange={(e) =>
                  setSelectedBarangMasuk({
                    ...selectedProduct,
                    harga_beli: e.target.value,
                  })
                }
                className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
              />
            </div>
            <div className="col-span-6">
              <label
                htmlFor="Stock"
                className="block text-sm font-medium text-gray-700"
              >
                Stock:
              </label>
              <input
                type="number"
                value={selectedProduct.jumlah_stock}
                onChange={(e) =>
                  setSelectedBarangMasuk({
                    ...selectedProduct,
                    jumlah_stock: e.target.value,
                  })
                }
                className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
              />
            </div>
            <div className="flex gap-2.5">
              <button
                type="submit"
                className="inline-block rounded bg-blue-500 px-8 py-3 text-sm font-medium text-white transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:bg-indigo-500"
              >
                Update
              </button>
              <button
                onClick={() => setIsEditModalOpen(false)}
                className="inline-block rounded border border-current px-8 py-3 text-sm font-medium text-indigo-600 transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:text-indigo-500"
              >
                Cancel
              </button>
            </div>
          </form>
        )}
      </Modal>

      {/* Modal untuk konfirmasi delete */}
      <Modal open={isModalOpen} onClose={handleCloseModal}>
        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Confirm Deletion
        </h2>
        <p className="text-sm text-gray-600 mb-6">
          Are you sure you want to delete this product? This action cannot be
          undone.
        </p>
        <div className="flex justify-end gap-2">
          <button
            onClick={handleCloseModal}
            className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400  transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring"
          >
            Cancel
          </button>
          <button
            onClick={handleDelete}
            className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700 transition hover:scale-110"
          >
            Delete
          </button>
        </div>
      </Modal>
    </main>
  );
}
