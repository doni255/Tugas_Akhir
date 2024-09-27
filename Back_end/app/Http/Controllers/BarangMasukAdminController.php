<?php

namespace App\Http\Controllers;
use App\Models\Barang_Masuk;
use App\Models\Product;
use App\Models\Uang;
use App\Models\Pendapatan;
use App\Models\Pengeluaran;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class BarangMasukAdminController extends Controller
{
    //
    public function getBarangMasuk()
    {

        // Mengambil data barang_masuk beserta data user yang terkait
        $barang_masuk = Barang_Masuk::with('user')->get();

        if ($barang_masuk->isEmpty()) {
            return response([
                'message' => 'No data',
                'data' => []
            ], 404);
        }

        // Map data barang_masuk untuk menambahkan data user
        $productsArray = $barang_masuk->map(function($barang_masuk) {
            return [
                'id_barang_masuk' => $barang_masuk->id_barang_masuk,
                'id_user' => $barang_masuk->id_user,
                'nama_product' => $barang_masuk->nama_product,
                'kategori_produk' => $barang_masuk->kategori_produk,
                'harga_beli' => $barang_masuk->harga_beli,
                'tanggal_kirim' => $barang_masuk->tanggal_kirim,
                'jumlah_stock' => $barang_masuk->jumlah_stock,
                'user' => [
                    'id_user' => $barang_masuk->user->id_user,
                    'nama' => $barang_masuk->user->nama,
                    'email' => $barang_masuk->user->email,
                    'no_telpon' => $barang_masuk->user->no_telpon,
                    'kota' => $barang_masuk->user->kota,
                    'alamat' => $barang_masuk->user->alamat,
                    // Tambahkan atribut user lain yang ingin Anda tampilkan
                ]
            ];
        })->values()->all();

        return response([
            'message' => 'Retrieve data success',
            'data' => $productsArray
        ], 200);
    }

    public function konfirmasiBarangMasuk(Request $request)
{

    $uang = Uang::all()->first();

    // Validasi input
    $validator = Validator::make($request->all(), [
        'id_barang_masuk' => 'required',    
    ]);

    // Jika validasi gagal, kembalikan respons error
    if ($validator->fails()) {
        return response([
            'message' => 'Validation failed',
            'errors' => $validator->errors()
        ], 400);
    }

    // Ambil ID barang_masuk dari request
    $id_barang_masuk = $request->input('id_barang_masuk');

    // Cari data Barang_Masuk berdasarkan ID
    $barang_masuk = Barang_Masuk::find($id_barang_masuk);

    if (!$barang_masuk) {
        return response([
            'message' => 'Barang masuk not found',
            'data' => []
        ], 404);
    }

    // Salin data dari Barang_Masuk ke Product
    $product = new Product();
    $product->gambar = $barang_masuk->gambar;
    $product->nama_product = $barang_masuk->nama_product;
    $product->kategori_produk = $barang_masuk->kategori_produk;
    $product->harga_beli = $barang_masuk->harga_beli;    
    $product->jumlah_stock = $barang_masuk->jumlah_stock;
    $uang->jumlah_uang = $uang->jumlah_uang - ($barang_masuk->harga_beli * $barang_masuk->jumlah_stock);

    $pengeluaran = new Pengeluaran();

    $pengeluaran->nama_product = $barang_masuk->nama_product;
    $pengeluaran->harga_beli = $product->harga_beli; // Tambahkan harga_total
    $pengeluaran->pajak = $product->harga_beli * 25 / 100;
    $pengeluaran->harga_total = (($barang_masuk->harga_beli + $pengeluaran->pajak) * $barang_masuk->jumlah_stock);
    $pengeluaran->tanggal = date('Y-m-d');
    $pengeluaran->save();

    // Simpan data ke tabel uang
    $uang->save();

    // Simpan data ke tabel products
    $product->save();

    // Hapus data Barang_Masuk setelah disalin
    $barang_masuk->delete();

    return response([
        'message' => 'Product confirmation success and Barang Masuk deleted',
        'data' => [
            'product' => $product,
            'uang' => $uang,
            'pengeluaran' => $pengeluaran
        ]
    ], 201);
}


}
