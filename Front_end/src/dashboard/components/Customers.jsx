// src/components/Customers.jsx
import React from "react";
import DeleteButton from "./button/button_product/DeleteButton";
import Modal from "./Modal";
import useCustomers from "./hook/customers/useCustomers";
import usePagination from "./hook/usePagination";
import EditButton from "./button/button_product/EditButton";
import login from "../../hooks/login";

export default function Customers() {
  const { users, setUsers } = login(); // Ambil users dan setUsers dari hook login
  const itemsPerPage = 6;

  // Menggunakan custom hook untuk paginasi
  const { currentItems, paginate, pageNumbers, currentPage } = usePagination(
    users,
    itemsPerPage
  );

  // Menggunakan hook kustom untuk logika customers
  const {
    isModalOpen,
    isEditModalOpen,
    handleCloseModal,
    handleCloseEditModal,
    handleDeleteClick,
    handleDelete,
    handleEditClick,
    handleEditChange,
    handleUpdate,
    editUserData,
  } = useCustomers(users, setUsers);

  return (
    <main>
      <div className="flex items-center justify-between py-7 px-10">
        <div>
          <h1 className="text-2xl font-semibold loading-relaxed text-gray-800">
            Data Users 😁
          </h1>
        </div>
      </div>

      <div className="bg-white px-4 pt-3 pb-4 rounded-sm border-gray-200 flex-1">
        <div className="mt-3">
          <table className="w-full text-gray-700 border-x border-gray-200 rounded-sm">
            <thead>
              <tr className="font-semibold">
                <td className="text-center">ID</td>
                <td className="text-center">Nama</td>
                <td className="text-center">Email</td>
                <td className="text-center">Tanggal Daftar</td>
                <td className="text-center">Alamat</td>
                <td className="text-center">Kota</td>
                <td className="text-center">No Telepon</td>
                <td className="text-center">Lihat/Hapus</td>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((user, index) => (
                <tr key={user.id_user}>
                  <td className="text-center">
                    {index + 1 + (currentPage - 1) * itemsPerPage}
                  </td>
                  <td className="text-center">{user.nama}</td>
                  <td className="text-center">{user.email}</td>
                  <td className="text-center">{user.role}</td>
                  <td className="text-center">{user.alamat}</td>
                  <td className="text-center">{user.kota}</td>
                  <td className="text-center">{user.no_telpon}</td>
                  <td className="text-center">
                    <EditButton onClick={() => handleEditClick(user)} />
                    <DeleteButton
                      onClick={() => handleDeleteClick(user.id_user)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* UI untuk Pagination */}
        <div className={"rounded-b-lg border-t border-gray-200 px-4 py-2"}>
          <ol className="flex justify-end gap-1 text-xs font-medium">
            <li>
              <button
                onClick={() => paginate(currentPage - 1)}
                disabled={currentPage === 1}
                className={`inline-flex size-8 items-center justify-center rounded border ${
                  currentPage === 1
                    ? "border-gray-100 bg-white text-gray-400 cursor-not-allowed"
                    : "border-gray-100 bg-white text-gray-900 hover:bg-gray-100"
                }`}
              >
                <span className="sr-only">Prev Page</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3 w-3"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </li>

            {pageNumbers.map((number) => (
              <li key={number}>
                <button
                  onClick={() => paginate(number)}
                  className={`block size-8 rounded border ${
                    currentPage === number
                      ? "border-blue-600 bg-blue-600 text-white"
                      : "border-gray-100 bg-white text-gray-900 hover:bg-gray-100"
                  }`}
                >
                  {number}
                </button>
              </li>
            ))}

            <li>
              <button
                onClick={() => paginate(currentPage + 1)}
                disabled={currentPage === pageNumbers.length}
                className={`inline-flex size-8 items-center justify-center rounded border ${
                  currentPage === pageNumbers.length
                    ? "border-gray-100 bg-white text-gray-400 cursor-not-allowed"
                    : "border-gray-100 bg-white text-gray-900 hover:bg-gray-100"
                }`}
              >
                <span className="sr-only">Next Page</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-3 w-3"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </li>
          </ol>
        </div>

        {/* Modal for Edit Form */}
        <Modal open={isEditModalOpen} onClose={handleCloseEditModal}>
          <h2 className="text-lg font-semibold mb-4">Edit User</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleUpdate(); // Mengirim data pembaruan ke hook
            }}
            className="mt-8 grid grid-cols-6 gap-6"
          >
            <div className="col-span-6 sm:col-span-6">
              <label
                htmlFor="nama"
                className="block text-sm font-medium text-gray-700"
              >
                Nama:
              </label>
              <input
                type="text"
                id="nama"
                name="nama"
                value={editUserData.nama}
                onChange={handleEditChange}
                className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
              />
            </div>

            <div className="col-span-6 sm:col-span-6">
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email:
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={editUserData.email}
                onChange={handleEditChange}
                className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
              />
            </div>

            <div className="col-span-6">
              <label
                htmlFor="alamat"
                className="block text-sm font-medium text-gray-700"
              >
                Alamat:
              </label>
              <input
                type="text"
                id="alamat"
                name="alamat"
                value={editUserData.alamat}
                onChange={handleEditChange}
                className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
              />
            </div>

            <div className="col-span-6">
              <label
                htmlFor="kota"
                className="block text-sm font-medium text-gray-700"
              >
                Kota:
              </label>
              <input
                type="text"
                id="kota"
                name="kota"
                value={editUserData.kota}
                onChange={handleEditChange}
                className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
              />
            </div>

            <div className="col-span-6">
              <label
                htmlFor="no_telpon"
                className="block text-sm font-medium text-gray-700"
              >
                No Telepon:
              </label>
              <input
                type="text"
                id="no_telpon"
                name="no_telpon"
                value={editUserData.no_telpon}
                onChange={handleEditChange}
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
                onClick={handleCloseEditModal}
                type="button"
                className="inline-block rounded border border-current px-8 py-3 text-sm font-medium text-indigo-600 transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:text-indigo-500"
              >
                Cancel
              </button>
            </div>
          </form>
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
      </div>
    </main>
  );
}
