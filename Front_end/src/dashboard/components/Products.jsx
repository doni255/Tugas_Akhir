import React, { useState, useEffect, useContext, createContext } from "react";
import { FiLayers } from "react-icons/fi";

import EditButton from "./button/button_product/EditButton";
import DeleteButton from "./button/button_product/DeleteButton";
import PembelianButton from "./button/button_product/PembelianProduct";
import Modal from "./Modal";

import { Menu } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import toast, { Toaster } from "react-hot-toast";
import { useAuth } from "../../App";

import axios from "axios";

import {
  HiFilter,
  HiOutlineEyeOff,
  HiOutlineMail,
  HiOutlinePencilAlt,
  HiOutlineXCircle,
  HiPlus,
} from "react-icons/hi";

import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  // DropdownSection,
  DropdownItem,
} from "@nextui-org/dropdown";

import Pagination from "../consts/Pagination";
import TambahStockProduct from "./button/button_product/TambahStockProduct";

const role = localStorage.getItem("role"); // Ambil role dari localStorage

const status = [
  { name: "Published", icon: <FiLayers className="w-6 h-6" /> },
  { name: "Draft", icon: <HiOutlinePencilAlt className="w-6 h-6" /> },
  { name: "Hidden", icon: <HiOutlineEyeOff className="w-6 h-6" /> },
  { name: "Rejected", icon: <HiOutlineXCircle className="w-6 h-6" /> },
  { name: "Under Review", icon: <HiOutlineMail className="w-6 h-6" /> },
];

export default function Products({ productId, userId }) {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpenCreate, setIsModalOpenCreate] = useState(false);
  const [isModalOpenDelete, setIsModalOpenDelete] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBuyModalOpen, setIsBuyModalOpen] = useState(false);
  const [isModalTambahStokOpen, setisModalTambahStockOpen] = useState(false);
  const [selectedTambahStock, setSelectedTambahStock] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [existingImage, setExistingImage] = useState(""); // State untuk menyimpan gambar yang ada
  const [userRole, setUserRole] = useState(null);

  useEffect(() => {
    // Fetch user role from an API or some source
    fetchUserRole().then((role) => setUserRole(role));
  }, []);

  // Define fetchUserRole function or import it
  const fetchUserRole = async () => {
    // Mock function: Replace with actual API call
    return "supplier"; // Or 'admin'
  };
  // const [isModalOpen, setIsModalOpen] = useState(false);

  const [imageError, setImageError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    category: "",
    harga_beli: "",
    harga_jual: "",
    imageUrl: null,
    price: "",
    stock: "",
  });

  const [formDataStock, setFormDataStock] = useState({
    jumlah_stock: "",
  });

  const toggleModalCreate = () => {
    setIsModalOpenCreate(!isModalOpenCreate);
  };

  const toggleModalTambahStock = () => {
    setisModalTambahStockOpen(isModalTambahStokOpen);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    console.log(`Selected category: ${category}`); // Debugging atau untuk melakukan sesuatu dengan category
    // Tambahkan logika untuk fetch data atau filter produk berdasarkan category di sini
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

  const handleFileChangeEdit = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setSelectedProduct({
          ...selectedProduct,
          gambar: reader.result.split(",")[1], // Simpan hanya bagian base64
        });
      };
      reader.readAsDataURL(file);
    } else {
      setImageError("Image file is required");
    }
  };

  // Function to handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, category, harga_beli, harga_jual, stock, imageUrl } =
      formData;

    // Validasi input kosong termasuk gambar
    if (!name || !category || !harga_beli || !harga_jual || !stock) {
      alert("Please fill in all the fields.");
      return;
    }

    // Convert base64 image data from data URL
    const base64Image = formData.imageUrl
      ? formData.imageUrl.split(",")[1]
      : null;

    const newItem = {
      nama_product: name,
      kategori_produk: category,
      harga_beli: harga_beli,
      harga_jual: harga_jual,
      konten_base64: base64Image,
      jumlah_stock: stock,
    };

    console.log(newItem); // Debug log to check the structure of newItem

    axios
      .post("http://localhost:8000/api/create", newItem, {
        headers: {
          Accept: "application/json",
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(response);
        toggleModalCreate();
        fetchProducts();
        toast.success("Product berhasil di tambahkan !", {
          duration: 5000,
        });
        // resetForm();
        // window.location.reload();
      })
      .catch((error) => {
        console.log(error);
        toggleModalCreate();
        window.location.reload();
      });
  };

  const handleTambahStockClick = (id_product) => {
    console.log(`handleTambahStockClick called with id_product: ${id_product}`);
    setSelectedProduct(id_product);
    setisModalTambahStockOpen(true);
  };

  const closeTambahStockClick = () => {
    setisModalTambahStockOpen(false);
  };

  const handleSubmitStock = async (e) => {
    e.preventDefault();
    const { jumlah_stock, id_product } = formDataStock;

    // Validate inputs
    if (!jumlah_stock) {
      alert("Jumlah stock harus di isi!");
      return;
    }

    const newItem = {
      jumlah_stock: jumlah_stock,
      id_product: selectedProduct,
    };
    console.log(newItem);

    try {
      // Make the POST request to your API endpoint
      const response = await axios.post(
        "http://localhost:8000/api/tambah_stock/create/" + // Adjust the endpoint URL as needed
          localStorage.getItem("id_user"),
        newItem,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Accept: "application/json",
          },
        }
      );
      // Handle successful response
      if (response.status === 200 || response.status === 201) {
        toast.success("Jumlah stock berhasil ditambahkan !", {
          duration: 5000,
        });
        setisModalTambahStockOpen(false);
      }
      // Optionally refresh the list or fetch updated data
      fetchProducts(); // Ensure this function is defined and works correctly
    } catch (error) {
      // Handle errors (network issues, server errors, etc.)
      console.error("Error updating stock:", error);
      alert("Terjadi kesalahan saat menambahkan stock");
    }
  };

  // Ensure `handleStockChange` updates the correct state
  const handleStockChange = (e) => {
    const { name, value } = e.target;
    setFormDataStock((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleCategoryChangeEdit = (category) => {
    setSelectedCategory(category);
    setFormData({ ...formData, kategori_produk: category }); // Ensure the correct field name is used
  };

  const handleEditClick = (product) => {
    setSelectedProduct(product); // Set produk yang dipilih
    setSelectedCategory(product.kategori_produk); // Set kategori produk
    setExistingImage(product.gambar); // Set gambar yang sudah ada
    setIsEditModalOpen(true); // Buka modal edit
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();

    // Membuat FormData baru
    const formData = new FormData();
    formData.append("nama_product", selectedProduct.nama_product);
    formData.append("kategori_produk", selectedCategory);
    formData.append("harga_beli", selectedProduct.harga_beli);
    formData.append("harga_jual", selectedProduct.harga_jual);
    formData.append("jumlah_stock", selectedProduct.jumlah_stock);

    // Hanya menambahkan file gambar jika ada
    if (selectedProduct.gambar) {
      formData.append("gambar", selectedProduct.gambar); // Mengirim file sebagai file
    }

    try {
      // Mengirim FormData melalui axios
      const response = await axios.post(
        `http://localhost:8000/api/product/${selectedProduct.id_product}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("Response data:", response.data);
      fetchProducts();
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

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

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

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:8000/api/product");
      setProducts(response.data.data || []); // Mengakses array produk di dalam response.data.data
    } catch (error) {
      console.error("Error fetching products:", error);
      setProducts([]); // Menghindari products menjadi undefined
    }
  };

  const handleDeleteClick = (id_product) => {
    console.log(`handleDeleteClick called with id_product: ${id_product}`);
    setSelectedProduct(id_product);
    setIsModalOpen(true);
  };

  const handleDelete = () => {
    console.log(`handleDelete called with selectedProduct: ${selectedProduct}`);
    if (selectedProduct) {
      destroyProduct(selectedProduct);
    }
  };

  const destroyProduct = async (id_product) => {
    try {
      console.log(`destroyProduct called with id_product: ${id_product}`);
      // Send DELETE request to the backend
      await axios.delete(`http://localhost:8000/api/product/${id_product}`);

      // Update the frontend state
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product.id_product !== id_product)
      );
      toast.success("Product berhasil di hapus !", {
        duration: 5000,
      });
      // Close the confirmation modal
      handleCloseModal();

      // Optionally, show a success message
      console.log("Product deleted successfully");
    } catch (error) {
      console.error("Error deleting product:", error);
      // Optionally, show an error message to the user
    }
  };

  const handlePembelianClick = (id_product) => {
    console.log(`handlePembelianClick called with id_product: ${id_product}`);
    setSelectedProduct(id_product);
    setIsBuyModalOpen(true);
  };

  const handlePembelianProduct = async (e, id_product) => {
    e.preventDefault();
    const { jumlah_stock } = formDataStock; // Hapus id_product jika tidak dibutuhkan

    // Validate inputs
    if (!jumlah_stock) {
      alert("Jumlah stock harus di isi!");
      return;
    }

    const newItem = {
      jumlah_stock: jumlah_stock,
    };
    console.log(newItem);

    console.log(setSelectedProduct());
    try {
      const response = await axios.put(
        `http://localhost:8000/api/product/pembelian_product/${id_product}`, // Gunakan id_product dari parameter
        newItem,
        {
          headers: {
            Accept: "application/json",
          },
        }
      );

      // Handle successful response
      if (response.status === 200 || response.status === 201) {
        toast.success("Pembelian Produk Berhasil", {
          duration: 5000,
        });
        setIsBuyModalOpen(false);
      }

      // Optionally refresh the list or fetch updated data
      fetchProducts(); // Pastikan fungsi ini ada dan bekerja dengan benar
    } catch (error) {
      // Handle errors (network issues, server errors, etc.)
      console.error("Error updating stock:", error);
      alert("Terjadi kesalahan");
    }
  };

  return (
    <main className="relative ">
      <button>
        {/* make me blue button */}
        <div></div>
      </button>
      <Toaster position="top-right" reverseOrder={false} />
      <div className="bg-white px-4 pb-4 rounded-sm border-gray-200 max-h-screen overflow-y-auto">
        <div className="flex items-center justify-between py-7 px-10">
          <div>
            <h1 className="text-2xl font-semibold loading-relaxed text-gray-800">
              Products
            </h1>
            <p className="text-sm font-medium text-gray-500">
              Let's grow to your business! Create your product and upload here
            </p>
          </div>

          {role === "admin" && (
            <button
              onClick={toggleModalCreate}
              className="inline-flex gap-x-2 items-center py-2.5 px-5 text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1"
            >
              <HiPlus className="w-4 h-4 fill-current" />
              <span className="text-sm font-semibold tracking-wide">
                Create Item
              </span>
            </button>
          )}

          {isModalTambahStokOpen && (
            <Modal
              open={isModalTambahStokOpen}
              onClose={closeTambahStockClick}
              type="tambah_stock"
            >
              <h2 className="text-lg font-semibold mb-4">
                Tambah Jumlah Stock
              </h2>
              <form
                onSubmit={handleSubmitStock}
                className="mt-8 grid grid-cols-6 gap-6"
              >
                <div className="col-span-6">
                  <label
                    htmlFor="stock"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Jumlah Stock
                  </label>
                  <input
                    type="number"
                    id="jumlah_stock"
                    name="jumlah_stock"
                    value={formDataStock.jumlah_stock}
                    onChange={handleStockChange}
                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
                  />
                </div>
                <div className="flex gap-2.5">
                  <button
                    type="button"
                    onClick={closeTambahStockClick}
                    className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="inline-block rounded bg-indigo-600 px-8 py-3 text-sm font-medium text-white transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:bg-indigo-500"
                  >
                    Tambah
                  </button>
                </div>
              </form>
            </Modal>
          )}

          {isModalOpenCreate && (
            <Modal
              open={isModalOpenCreate}
              onClose={toggleModalCreate}
              type="create"
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
                          "Mesin Kapal",
                          "Pompa Air",
                          "Gergaji",
                          "Pemotong Rumput",
                          "Spare Part Genset",
                          "Spare Part Mesin Kapal",
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
                    htmlFor="harga_jual"
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
        {/* <ul className="flex gap-x-24 items-center px-4 border-y border-gray-200">
        {status.map((Published, index) => (
          <li key={index} className="flex items-center gap-4 text-gray-700">
            <button className="flex gap-x-2 items-center py-5 px-6 text-gray-500 hover:text-indigo-600 relative group">
              {Published.icon}
              <span className="font-medium">{Published.name}</span>
              <span className="absolute w-full h-0.5 left-3 bg-indigo-600 rounded bottom-0 scale-x-0 group-hover:scale-x-100 transition-transform ease-in-out"></span>
            </button>
          </li>
        ))}
      </ul> */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-sm font-medium text-gray-700 border-b border-gray-200">
                <td className="pl-10 py-4">
                  <div className="gap-x-4 items-center py-4 pl-5 font-semibold">
                    ID
                  </div>
                </td>
                <td className="font-semibold">&nbsp; &nbsp; Gambar</td>
                <td className=" text-center font-semibold">Product Name</td>
                <td className="text-center font-semibold">Kategori Produk</td>
                <td className="text-center font-semibold">Harga Beli</td>
                <td className="text-center font-semibold">Harga Jual</td>
                <td className=" text-center font-semibold">Stock</td>
                <td></td>
                <td></td>
              </tr>
            </thead>

            <tbody>
              {currentItems.map((product) => (
                <tr key={product.id_product} className="hover:bg-gray-100">
                  <td className="gap-x-4 items-center py-4   pl-10">
                    <span className="py-3 px-4 text-center">
                      {product.id_product}
                    </span>
                    {/* <img
                    src={product.imageUrl}
                    alt={product.name}
                    className="w-48 aspect-[3/2 rounded-lg object-cover object-top border border-gray-200"
                  /> */}
                  </td>
                  <td className="">
                    <img
                      src={`data:image/png;base64,${product.gambar}`}
                      className="w-20 justify-center aspect-auto rounded-lg object-cover object-top border border-gray-200"
                    />
                  </td>
                  <td className="text-center">{product.nama_product}</td>
                  <td className="text-center">{product.kategori_produk}</td>
                  <td className="text-center">{product.harga_beli}</td>
                  <td className="text-center">{product.harga_jual}</td>
                  <td className="text-center">{product.jumlah_stock}</td>
                  {/* <td className="py-4 px-4 text-center">{product.createdAt}</td> */}
                  <td className="py-4 px-4 text-center">
                    {role === "admin" && (
                      <EditButton onClick={() => handleEditClick(product)} />
                    )}
                    {role === "admin" && (
                      <DeleteButton
                        onClick={() => handleDeleteClick(product.id_product)}
                      />
                    )}
                    {role === "admin" && (
                      <PembelianButton
                        onClick={() => handlePembelianClick(product.id_product)}
                      />
                    )}
                    {/* BUTTON CREATE ITEM */}
                    {role === "supplier" && (
                      <TambahStockProduct
                        onClick={() =>
                          handleTambahStockClick(product.id_product)
                        }
                      />
                    )}
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
                value={selectedProduct.nama_product || ""}
                onChange={(e) =>
                  setSelectedProduct({
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
                      "Pemotong Rumput",
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
                htmlFor="harga_beli"
                className="block text-sm font-medium text-gray-700"
              >
                Harga Beli
              </label>
              <input
                type="number"
                id="harga_beli"
                name="harga_beli" // Pastikan name sesuai
                value={selectedProduct.harga_beli || ""}
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
                value={selectedProduct.harga_jual || ""}
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
                onChange={(e) =>
                  setSelectedProduct({
                    ...selectedProduct,
                    gambar: e.target.files[0], // Mendapatkan file dari input
                  })
                }
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
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
                value={selectedProduct.jumlah_stock || ""}
                onChange={(e) =>
                  setSelectedProduct({
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

      <Modal open={isBuyModalOpen} onClose={() => setIsModalOpen(false)}>
        <h2 className="text-lg font-semibold mb-4">Pembelian</h2>
        <form
          onSubmit={(e) => handlePembelianProduct(e, selectedProduct)} // Pastikan selectedProduct adalah id_product
          className="mt-8 grid grid-cols-6 gap-6"
        >
          <div className="col-span-6">
            <label
              htmlFor="stock"
              className="block text-sm font-medium text-gray-700"
            >
              Jumlah Stock
            </label>
            <input
              type="number"
              id="jumlah_stock"
              name="jumlah_stock"
              value={formDataStock.jumlah_stock}
              onChange={handleStockChange}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm"
            />
          </div>
          <div className="flex gap-2.5">
            <button
              type="button"
              onClick={() => setIsBuyModalOpen(false)}
              className="px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="inline-block rounded bg-indigo-600 px-8 py-3 text-sm font-medium text-white transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:bg-indigo-500"
            >
              Konfirmasi
            </button>
          </div>
        </form>
      </Modal>
    </main>
  );
}
