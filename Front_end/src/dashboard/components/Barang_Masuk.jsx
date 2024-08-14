import TambahBarang from "./button/button_tambah_barang_masuk/TambahBarang";
import Pagination from "../consts/Pagination.jsx";
import React, { useState } from "react";
import EditButton from "./button/button_product/EditButton";
import DeleteButton from "./button/button_product/DeleteButton";
import Modal from "./Modal";
import { barangMasuk } from "./hook/barang_masuk/dataBarangMasuk";
import useBarangMasukData from "./hook/barang_masuk/useBarangMasuk.jsx";

export default function Barang_Masuk() {
  const {
    barangMasukData,
    isModalOpen,
    selectedBarangMasuk,
    currentItems,
    currentPage,
    itemsPerPage,
    isEditModalOpen,
    editedBarangMasuk,
    handleCloseEditModal,
    handleEditSubmit,
    handleEditClick,
    setEditedBarangMasuk,
    handleDeleteClick,
    handleDelete,
    handleCloseModal,
    paginate,
  } = useBarangMasukData();

  return (
    <main>
      <div className="bg-white px-4 pt-3 pb-4 rounded-sm border-gray-200 ">
        <div className="flex items-center justify-between mb-2 py-7 px-8">
          <strong className="text-2xl font-semibold loading-relaxed text-gray-800">
            Riwayat Data Barang Masuk
          </strong>

          <TambahBarang />
        </div>
        {/*
    Heads up! 👋

  This component comes with some `rtl` classes. Please remove them if they are not needed in your project.
*/}

        <div className="rounded-lg border border-gray-200">
          <div className="overflow-x-auto rounded-t-lg">
            <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
              <thead className="ltr:text-left rtl:text-right">
                <tr className={"font-semibold"}>
                  <th className="px-4 py-4 text-center">No</th>
                  <th className="px-4 py-4 text-center">Nama Barang</th>
                  <th className="px-4 py-4 text-center">Tanggal Masuk</th>
                  <th className="px-4 py-4 text-center">Harga Beli</th>
                  <th className="px-4 py-4 text-center">Harga Jual</th>
                  <th className="px-4 py-4 text-center">Jumlah Masuk</th>
                  <th className="px-4 py-4 text-center">Supplier</th>
                  <th className="px-4 py-4 text-center"></th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                {currentItems.map((barang) => (
                  <tr key={barang.id} className="hover:bg-gray-100  ">
                    <td
                      className={
                        "whitespace-nowrap px-4 py-4 text-center font-medium text-gray-900"
                      }
                    >
                      {barang.No}
                    </td>
                    <td
                      className={
                        "whitespace-nowrap px-4 py-4 text-center font-medium text-gray-900"
                      }
                    >
                      {barang.name}
                    </td>
                    <td
                      className={
                        "whitespace-nowrap px-4 py-4 text-center font-medium text-gray-900"
                      }
                    >
                      {barang.tanggal_masuk}
                    </td>
                    <td
                      className={
                        "whitespace-nowrap px-4 py-4 text-center font-medium text-gray-900"
                      }
                    >
                      {barang.harga_beli}
                    </td>
                    <td
                      className={
                        "whitespace-nowrap px-4 py-4 text-center font-medium text-gray-900"
                      }
                    >
                      {barang.harga_jual}
                    </td>
                    <td
                      className={
                        "whitespace-nowrap px-4 py-4 text-center font-medium text-gray-900"
                      }
                    >
                      {barang.jumlah_masuk}
                    </td>
                    <td
                      className={
                        "whitespace-nowrap px-4 py-4 text-center font-medium text-gray-900"
                      }
                    >
                      {barang.nama_supplier}
                    </td>
                    <td
                      className={
                        "whitespace-nowrap px-4 py-4 text-center font-medium text-gray-900"
                      }
                    >
                      <EditButton onClick={() => handleEditClick(barang.id)} />
                      <DeleteButton
                        onClick={() => handleDeleteClick(barang.id)}
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <Pagination
            itemsPerPage={itemsPerPage}
            totalItems={barangMasuk.length}
            paginate={paginate}
            currentPage={currentPage}
          />
        </div>
      </div>

      {/* Modal for Edit Form */}
      <Modal open={isEditModalOpen} onClose={handleCloseEditModal}>
        <h2 className="text-lg font-semibold mb-4">Edit Product</h2>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            if (editedBarangMasuk) {
              handleEditSubmit(editedBarangMasuk);
            } else {
              console.error("editedBarangMasuk is undefined");
            }
          }}
          action="#"
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
              value={editedBarangMasuk.name}
              onChange={(e) =>
                setEditedBarangMasuk({
                  ...editedBarangMasuk,
                  name: e.target.value,
                })
              }
              className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
            />
          </div>

          <div className="col-span-6 sm:col-span-6 ">
            <label
              htmlFor="ProductName"
              className="block text-sm font-medium text-gray-700"
            >
              Tanggal Masuk:
            </label>
            <input
              type="date"
              value={editedBarangMasuk.tanggal_masuk}
              onChange={(e) =>
                setEditedBarangMasuk({
                  ...editedBarangMasuk,
                  tanggal_masuk: e.target.value,
                })
              }
              className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
            />
          </div>

          <div className="col-span-6 sm:col-span-6 ">
            <label
              htmlFor="Category"
              className="block text-sm font-medium text-gray-700"
            >
              Harga Beli:
            </label>
            <input
              type="text"
              value={editedBarangMasuk.harga_beli}
              onChange={(e) =>
                setEditedBarangMasuk({
                  ...editedBarangMasuk,
                  harga_beli: e.target.value,
                })
              }
              className="mt-1 w-full rounded-md border-gray-200 bg-white text-sm text-gray-700 shadow-sm"
            />
          </div>

          <div className="col-span-6">
            <label
              htmlFor="Price"
              className="block text-sm font-medium text-gray-700"
            >
              Harga Jual:
            </label>
            <input
              type="text"
              value={editedBarangMasuk.harga_jual}
              onChange={(e) =>
                setEditedBarangMasuk({
                  ...editedBarangMasuk,
                  harga_jual: e.target.value,
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
              Jumlah Masuk:
            </label>
            <input
              type="text"
              value={editedBarangMasuk.jumlah_masuk}
              onChange={(e) =>
                setEditedBarangMasuk({
                  ...editedBarangMasuk,
                  jumlah_masuk: e.target.value,
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
              Nama Supplier:
            </label>
            <input
              type="text"
              value={editedBarangMasuk.nama_supplier}
              onChange={(e) =>
                setEditedBarangMasuk({
                  ...editedBarangMasuk,
                  nama_supplier: e.target.value,
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
              onClick={handleCloseEditModal}
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
          Are you sure you want to delete this barang masuk? This action cannot
          be undone.
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
