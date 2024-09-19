import React, { useState, useEffect } from "react";
import axios from "axios";
import { Transition } from "@headlessui/react";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

const CartProduct = () => {
  const [formKeranjangData, setFormKeranjangData] = useState({
    id_user: "",
    id_product: "",
    harga_beli: "",
    konten_base64: "",
  });

  const [cartProducts, setCartProducts] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  // Bagian Gambar
  const [imagePreview, setImagePreview] = useState(null); // State for image preview
  const [imageOrientation, setImageOrientation] = useState("landscape"); // Default orientation
  const [isImageVisible, setIsImageVisible] = useState(true); // State for image visibility

  // const { id_beli_produk } = useParams(); // Get the id from the URL
  const [selectedFile, setSelectedFile] = useState(null);
  const navigate = useNavigate();

  const [selectedIdBeliProduk, setSelectedIdBeliProduk] = useState(null); // New state to hold selected product ID

  const fetchCartProduct = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/api/keranjang_pembelian/` +
          localStorage.getItem("id_user")
      );

      // Debugging: Check API response data structure
      console.log("API response data:", response.data);

      if (response.data.message === "Retrieve data success") {
        setCartProducts(response.data.data); // Set the cartProducts state
      } else {
        toast.error("No data found.");
      }

      setIsLoaded(true);
    } catch (error) {
      console.error("Error fetching cart products:", error);
      setIsLoaded(true);
      toast.error("Failed to load cart data.");
    }
  };

  const deleteCartProduct = async (id_beli_produk) => {
    try {
      const response = await axios.delete(
        `http://localhost:8000/api/hapus_keranjang/${id_beli_produk}`
      );
      toast.success("Produk berhasil dihapus dari keranjang.");

      // Fetch ulang data keranjang setelah berhasil menghapus produk
      fetchCartProduct();
    } catch (error) {
      console.error("Error delete cart products:", error);
      toast.error("Failed to delete cart data.");
    }
  };

  const paymentProduct = async (id_beli_produk, file) => {
    const formData = new FormData();
    formData.append("bukti_pembayaran", file);

    try {
      const response = await axios.post(
        `http://localhost:8000/api/keranjang_pembelian/beli_product/${id_beli_produk}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success("Produk berhasil dibeli.");
    } catch (error) {
      console.error(
        "Error purchasing product:",
        error.response ? error.response.data : error.message
      );
      toast.error("Gagal membeli produk.");
    }
  };

  const handlePaymentClick = (id_beli_produk) => {
    setSelectedIdBeliProduk(id_beli_produk); // Store the selected product's ID
    setIsPaymentModalOpen(true); // Open the payment modal
    console.log("Selected product ID for payment:", id_beli_produk); // Log the selected product ID
  };

  const handleSubmitPayment = (e) => {
    e.preventDefault();
    if (selectedFile && selectedIdBeliProduk) {
      paymentProduct(selectedIdBeliProduk, selectedFile);
    } else {
      toast.error("Please select a file to upload.");
    }
  };
  // Handle file input change and preview image
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedFile(file); // Fix this line

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result); // Set the image preview to the file content

        // Check the orientation (landscape/portrait)'
        const img = new Image();
        img.src = reader.result;
        img.onload = () => {
          if (img.width > img.height) {
            setImageOrientation("landscape");
          } else {
            setImageOrientation("portrait");
          }
        };
      };
      reader.readAsDataURL(file); // Convert the file to base64
    } else {
      setImagePreview(null); // Reset if no file selected
    }
  };

  // Function to toggle image visibility
  const toggleImageVisibility = (event) => {
    event.preventDefault(); // Prevent default behavior if inside a form
    setIsImageVisible(!isImageVisible);
  };

  useEffect(() => {
    fetchCartProduct();
  }, []);

  return (
    <div className="container mx-auto px-4 p-6 flex flex-col items-center">
      <h1 className="text-4xl font-bold mb-8">Keranjang Pembelian</h1>

      {/* Modal with Transition */}
      <Transition
        show={isPaymentModalOpen}
        enter="transition ease-out duration-300 transform"
        enterFrom="opacity-0 scale-70"
        enterTo="opacity-100 scale-100"
        leave="transition ease-in duration-200 transform"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-60"
      >
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60"
          onClick={() => setIsPaymentModalOpen(false)} // Close modal when clicking outside
        >
          <div
            className="relative bg-white p-6 sm:p-10 rounded-lg shadow-2xl w-full max-w-lg max-h-screen overflow-y-auto"
            onClick={(e) => e.stopPropagation()} // Prevent click inside modal from closing
          >
            {/* Close button (x) */}
            <button
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 transition-transform hover:scale-110"
              onClick={() => setIsPaymentModalOpen(false)}
            >
              &#x2715;
            </button>

            {/* Modal Header */}
            <h2 className="text-2xl font-bold text-gray-800 mb-5 text-center">
              Complete Your Payment
            </h2>

            {/* Form */}
            <form onSubmit={handleSubmitPayment}>
              {/* File Input */}
              <div className="mt-5">
                <label
                  htmlFor="file-upload"
                  className="block text-lg font-medium text-gray-700 mb-2"
                >
                  Upload File
                </label>
                <div className="flex items-center justify-center w-full">
                  <label
                    htmlFor="file-upload"
                    className="cursor-pointer flex flex-col items-center justify-center w-full h-36 bg-gray-50 rounded-md border-2 border-dashed border-gray-300 text-gray-500 hover:bg-gray-100 hover:border-indigo-500 transition-all"
                  >
                    <svg
                      className="w-12 h-12 text-gray-400"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M7 16V12M7 12V8m0 4l10 10M7 16H3m4 0a3 3 0 01-3-3V5a3 3 0 013-3h10a3 3 0 013 3v10a3 3 0 01-3 3H7z"
                      />
                    </svg>
                    <span className="mt-2 text-sm leading-normal">
                      Drag & Drop or Click to Upload
                    </span>
                    <input
                      id="file-upload"
                      type="file"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                  </label>
                </div>
              </div>

              {/* Image Preview */}
              {imagePreview && (
                <div className="mt-5">
                  <h3 className="text-lg font-semibold text-gray-700 mb-3">
                    Image Preview:
                  </h3>

                  <button
                    onClick={toggleImageVisibility}
                    className="mb-4 py-2 px-4 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                  >
                    {isImageVisible ? "Hide Image" : "Show Image"}
                  </button>

                  {isImageVisible && (
                    <div>
                      <img
                        src={imagePreview}
                        alt="Upload Preview"
                        className={`rounded-lg shadow-md ${
                          imageOrientation === "landscape"
                            ? "w-full max-w-3xl max-h-72 object-contain"
                            : "w-full max-w-xs max-h-96 object-contain"
                        }`}
                      />
                    </div>
                  )}
                </div>
              )}

              {/* Submit Button */}
              <div className="mt-6">
                <button
                  type="submit"
                  className="w-full py-3 bg-indigo-600 text-white text-lg font-semibold rounded-md shadow-lg hover:bg-indigo-500 transition-all transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Submit
                </button>
              </div>
            </form>

            {/* Divider */}
            <div className="mt-8 border-t border-gray-200"></div>

            {/* Bank Account Information */}
            <div className="mt-6 text-center">
              <h3 className="text-xl font-semibold text-gray-800">
                Bank Account Information
              </h3>
              <p className="mt-2 text-lg text-gray-600">
                BRI: <span className="font-bold">DONI WIJAYA</span>
              </p>
              <p className="text-lg text-gray-600">(1162 0102 7946 501)</p>
            </div>
          </div>
        </div>
      </Transition>

      <Transition
        show={isLoaded}
        enter="transition ease-out duration-300 transform"
        enterFrom="opacity-0 scale-45"
        enterTo="opacity-100 scale-100"
        leave="transition ease-in duration-200 transform"
        leaveFrom="opacity-100 scale-100"
        leaveTo="opacity-0 scale-60"
      >
        {isLoaded && cartProducts.length > 0 ? (
          <div className="w-full max-w-5xl bg-white shadow-md rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-800 mb-6">
              Produk di Keranjang
            </h2>
            <div className="space-y-4">
              {cartProducts.map((item) => (
                <div
                  key={item.id_beli_produk}
                  className="flex items-center justify-between border-b border-gray-200 pb-4"
                >
                  <div className="flex items-center gap-4">
                    <img
                      src={
                        item.product?.konten_base64
                          ? `data:image/jpeg;base64,${item.product.konten_base64}`
                          : "https://via.placeholder.com/150"
                      }
                      alt={item.product?.nama_product}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                    <div className="flex flex-col max-w-xs">
                      <h3 className="text-lg font-semibold truncate w-56">
                        {item.product?.nama_product}
                      </h3>
                      <p className="text-gray-500">
                        {item.product?.kategori_produk}
                      </p>
                    </div>
                  </div>
                  <div>
                    <p className="text-lg font-semibold mt-2">
                      Rp. {item.product?.harga_jual}
                    </p>
                  </div>
                  <div className="flex flex-col gap-2">
                    <button
                      onClick={() => handlePaymentClick(item.id_beli_produk)} // Set product for payment
                      className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
                    >
                      Bayar Sekarang
                    </button>
                    <button>
                      <button
                        onClick={() => deleteCartProduct(item.id_beli_produk)}
                        className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600 w-full" // Tambahkan w-full agar tombol penuh lebar
                      >
                        Hapus
                      </button>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <p>Keranjang kosong</p>
        )}
      </Transition>
    </div>
  );
};

export default CartProduct;
