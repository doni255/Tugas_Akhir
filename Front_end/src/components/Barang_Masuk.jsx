import React from "react";
import TambahBarang from "./button/button_tambah_barang_masuk/TambahBarang";

export const barangMasuk = [
  {
    id: 1,
    No: "1",
    name: "Mesin pompa air",
    harga_beli: "550.000",
    harga_jual: "600.600",
    jumlah_masuk: "5 mesin",
    nama_supplier: "eko",
  },
  {
    id: 2,
    No: "2",  
    name: "Mitsubishi",
    harga_beli: "550.000",
    harga_jual: "600.600",
    jumlah_masuk: "5 mesin",
    nama_supplier: "ahen",
  },
  {
    id: 3,
    No: "3",
    name: "Organic Landing page",
    harga_beli: "550.000",
    harga_jual: "600.600",
    jumlah_masuk: "5 mesin",
    nama_supplier: "eko",
  },
  {
    id: 4,
    No: "4",
    name: "Organic Landing page",
    harga_beli: "550.000",
    harga_jual: "600.600",
    jumlah_masuk: "5 mesin",
    nama_supplier: "eko",
  },
];

export default function Barang_Masuk() {
  return (
    <main>
      {/* <div className={"flex justify-center py-2"}>
        <strong className="text-xl font-semibold loading-relaxed text-gray-500">
          BARANG MASUK
        </strong>
      </div> */}

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
                  <th className="">
                    No
                  </th>
                  <th className="">
                    Nama Barang
                  </th>
                  <th className="">
                    Harga Beli
                  </th>
                  <th className="">
                    Harga Jual
                  </th>
                  <th className="">
                    Jumlah Masuk
                  </th>
                  <th className="">
                    Supplier
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-200">
                {barangMasuk.map((barang) => (
                  <tr key={barang.id}>
                    <td className={"whitespace-nowrap px-4 py-2 font-medium text-gray-900"}>
                      {barang.No}
                    </td>
                    <td className={"whitespace-nowrap px-4 py-2 font-medium text-gray-900"}>
                      {barang.name}
                    </td>
                    <td className={"whitespace-nowrap px-4 py-2 font-medium text-gray-900"}>
                      {barang.harga_beli}
                    </td>
                    <td className={"whitespace-nowrap px-4 py-2 font-medium text-gray-900"}>
                      {barang.harga_jual}
                    </td>
                    <td className={"whitespace-nowrap px-4 py-2 font-medium text-gray-900"}>
                      {barang.jumlah_masuk}
                    </td>
                    <td className={"whitespace-nowrap px-4 py-2 font-medium text-gray-900"}>    
                      {barang.nama_supplier}
                    </td>
                  </tr>
                ))}
                {/* <tr>
                  <td className="whitespace-nowrap px-4 py-2 font-medium text-gray-900">
                    1
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    24/05/1995
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    Web Developer
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    $120,000
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    $120,000
                  </td>
                  <td className="whitespace-nowrap px-4 py-2 text-gray-700">
                    $120,000
                  </td>
                </tr> */}
              </tbody>
            </table>
          </div>

          <div className="rounded-b-lg border-t border-gray-200 px-4 py-2">
            <ol className="flex justify-end gap-1 text-xs font-medium">
              <li>
                <a
                  href="#"
                  className="inline-flex size-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180"
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
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="block size-8 rounded border border-gray-100 bg-white text-center leading-8 text-gray-900"
                >
                  1
                </a>
              </li>

              <li className="block size-8 rounded border-blue-600 bg-blue-600 text-center leading-8 text-white">
                2
              </li>

              <li>
                <a
                  href="#"
                  className="block size-8 rounded border border-gray-100 bg-white text-center leading-8 text-gray-900"
                >
                  3
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="block size-8 rounded border border-gray-100 bg-white text-center leading-8 text-gray-900"
                >
                  4
                </a>
              </li>

              <li>
                <a
                  href="#"
                  className="inline-flex size-8 items-center justify-center rounded border border-gray-100 bg-white text-gray-900 rtl:rotate-180"
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
                </a>
              </li>
            </ol>
          </div>
        </div>
      </div>
    </main>
  );
}
