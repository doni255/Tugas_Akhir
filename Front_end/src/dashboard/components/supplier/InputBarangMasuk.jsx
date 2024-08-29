  // InputBarangMasuk.jsx
  import React, { useState } from "react";
  import TambahBarang from "../button/button_tambah_barang_masuk/TambahBarang.jsx";
  import Pagination from "../../consts/Pagination.jsx";
  import EditButton from "../button/button_product/EditButton.jsx";
  import DeleteButton from "../button/button_product/DeleteButton.jsx";
  import Modal from "../Modal.jsx";
  import useBarangMasukData from "../hook/barang_masuk/useBarangMasuk.jsx";

  export function InputBarangMasuk() {
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
                Input Data Barang Masuk Supplier
              </strong>

              <TambahBarang />
            </div>

            <div className="rounded-lg border border-gray-200">
              <div className="overflow-x-auto rounded-t-lg">
                <table className="min-w-full divide-y-2 divide-gray-200 bg-white text-sm">
                  <thead className="ltr:text-left rtl:text-right">
                    <tr className={"font-semibold"}>
                      <th className="px-4 py-4 text-center">No</th>
                      <th className="px-4 py-4 text-center">Nama Barang</th>
                      <th className="px-4 py-4 text-center">Kategori Produk</th>
                      <th className="px-4 py-4 text-center">Tanggal Kirim</th>
                      <th className="px-4 py-4 text-center">Harga Beli</th>
                      {/* <th className="px-4 py-4 text-center">Harga Jual</th> */}
                      <th className="px-4 py-4 text-center">Jumlah Masuk</th>
                      <th className="px-4 py-4 text-center">Action</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-200">
                    <tr className="hover:bg-gray-100">
                      <td className="whitespace-nowrap px-4 py-4 text-center font-medium text-gray-900"></td>
                      <td className="whitespace-nowrap px-4 py-4 text-center font-medium text-gray-900"></td>
                      <td className="whitespace-nowrap px-4 py-4 text-center font-medium text-gray-900"></td>
                      {/* <td className="whitespace-nowrap px-4 py-4 text-center font-medium text-gray-900">
                        {barang.harga_beli}
                      </td> */}
                      <td className="whitespace-nowrap px-4 py-4 text-center font-medium text-gray-900"></td>
                      <td className="whitespace-nowrap px-4 py-4 text-center font-medium text-gray-900"></td>
                      <td className="whitespace-nowrap px-4 py-4 text-center font-medium text-gray-900"></td>
                      <td className="whitespace-nowrap px-4 py-4 text-center font-medium text-gray-900">
                        <EditButton onClick={() => handleEditClick(barang.id)} />
                        <DeleteButton
                          onClick={() => handleDeleteClick(barang.id)}
                        />
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <Pagination
                itemsPerPage={itemsPerPage}
                totalItems={barangMasukData.length}
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
              <div className="col-span-6 sm:col-span-6">
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

              <div className="col-span-6 sm:col-span-6">
                <label
                  htmlFor="TanggalMasuk"
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

              <div className="col-span-6 sm:col-span-6">
                <label
                  htmlFor="HargaBeli"
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
                  htmlFor="HargaJual"
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
                  htmlFor="JumlahMasuk"
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
                  htmlFor="NamaSupplier"
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
                  type="button"
                  className="inline-block rounded bg-red-500 px-8 py-3 text-sm font-medium text-white transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:bg-rose-500"
                >
                  Cancel
                </button>
              </div>
            </form>
          </Modal>

          {/* Modal for Delete Confirmation */}
          <Modal open={isModalOpen} onClose={handleCloseModal}>
            <p>Are you sure you want to delete this product?</p>
            <div className="flex gap-2.5 mt-4">
              <button
                onClick={() => {
                  if (selectedBarangMasuk) {
                    handleDelete(selectedBarangMasuk.id);
                  } else {
                    console.error("selectedBarangMasuk is undefined");
                  }
                }}
                type="button"
                className="inline-block rounded bg-red-500 px-8 py-3 text-sm font-medium text-white transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:bg-rose-500"
              >
                Yes
              </button>
              <button
                onClick={handleCloseModal}
                type="button"
                className="inline-block rounded bg-gray-500 px-8 py-3 text-sm font-medium text-white transition hover:scale-110 hover:shadow-xl focus:outline-none focus:ring active:bg-gray-600"
              >
                No
              </button>
            </div>
          </Modal>
        </main>
      );
    }

