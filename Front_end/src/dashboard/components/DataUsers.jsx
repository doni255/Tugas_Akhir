// src/components/Customers.jsx
import React, { useEffect } from "react";
import DeleteButton from "./button/button_product/DeleteButton";
import Modal from "./Modal";
import useCustomers from "./hook/customers/useCustomers";
import usePagination from "./hook/usePagination";
import EditButton from "./button/button_product/EditButton";
import login from "../../hooks/login";
import axios from "axios";

import {
  HiOutlinePause,
  HiOutlinePlusCircle,
  HiPlus,
  HiPlusCircle,
  HiPlusSm,
} from "react-icons/hi";

export default function DataUsers() {
  const { users, setUsers } = login(); // Ambil users dan setUsers dari hook login

  const itemsPerPage = 6;

  // Menggunakan custom hook untuk paginasi
  const { currentItems, paginate, pageNumbers, currentPage } = usePagination(
    users,
    itemsPerPage
  );

  // Menggunakan hook kustom untuk logika customers
  const {
    handleSubmit,
    formData,
    Toaster,
    handleChange,
    namaRef,
    emailRef,
    passwordRef,
    no_telponRef,
    kotaRef,
    alamatRef,
    toggleModal,
    isModalOpen,
    isCreateModalOpen,
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

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get("http://localhost:8000/api/users");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };

    fetchUsers();
  }, [setUsers]); // Add setUsers to the dependency array

  return (
    <main>
      <Toaster position="top-right" reverseOrder={false} />
      <div className="flex items-center justify-between py-7 px-10">
        <div>
          <h1 className="text-2xl font-semibold loading-relaxed text-gray-800">
            Data Users 😁
          </h1>
        </div>

        <div className="flex justify-end">
          <button
            className="inline-flex gap-x-2 items-center py-2.5 px-5 text-white bg-indigo-600 rounded-xl hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-1"
            onClick={toggleModal}
          >
            <HiPlus className="w-4 h-4 fill-current" />
            <span className="text-sm font-semibold tracking-wide">
              Create Item
            </span>
          </button>
        </div>

        {/* Modal for Create Item */}

        <Modal open={isCreateModalOpen} onClose={toggleModal} type="create">
          <main className="flex items-center justify-center px-8 py-8 sm:px-12 lg:col-span-7 lg:px-16 lg:py-12 xl:col-span-6 h-2/4">
            <div className="m-0 lg:max-w-3xl">
              <form
                onSubmit={handleSubmit}
                className="grid grid-cols-6 gap-4 max-w-md mx-auto"
              >
                <div className="col-span-6">
                  <label
                    htmlFor="FirstName"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Nama
                  </label>

                  <input
                    ref={namaRef}
                    type="text"
                    id="Nama"
                    name="nama"
                    value={formData.nama}
                    onChange={handleChange}
                    className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                  />
                </div>

                <div className="col-span-6">
                  <label
                    htmlFor="Email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Email
                  </label>

                  <input
                    ref={emailRef}
                    type="email"
                    id="Email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                    placeholder="..Email Boleh Kosong"
                  />
                </div>

                <div className="col-span-6 sm:col-span-6">
                  <label
                    htmlFor="Password"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Password
                  </label>

                  <input
                    ref={passwordRef}
                    type="password"
                    id="Password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                  />
                </div>

                {/* <div className="col-span-6 sm:col-span-6">
                <label
                  htmlFor="Password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Role
                </label>

                <input
                  ref={roleRef}
                  type="text"
                  id="role"
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                  required
                />
              </div> */}

                <div className="col-span-6">
                  <label
                    htmlFor="noHp"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Nomor HP
                  </label>

                  <input
                    ref={no_telponRef}
                    type="text"
                    id="No_telpon"
                    name="no_telpon"
                    value={formData.no_telpon}
                    onChange={handleChange}
                    className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                  />
                </div>

                <div className="col-span-6">
                  <label
                    htmlFor="Kota"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Kota
                  </label>

                  <input
                    ref={kotaRef}
                    type="text"
                    id="Kota"
                    name="kota"
                    value={formData.kota}
                    onChange={handleChange}
                    className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                  />
                </div>

                <div className="col-span-6">
                  <label
                    htmlFor="Alamat"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Alamat
                  </label>

                  <input
                    ref={alamatRef}
                    type="text"
                    id="Alamat"
                    name="alamat"
                    value={formData.alamat}
                    onChange={handleChange}
                    className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
                  />
                </div>

                <div className="col-span-6 sm:flex sm:items-center sm:gap-4">
                  <button className="inline-block shrink-0 rounded-md border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white transition hover:bg-transparent hover:text-blue-600 focus:outline-none focus:ring active:text-blue-500">
                    Create an account
                  </button>
                </div>
              </form>
            </div>
          </main>
        </Modal>
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
