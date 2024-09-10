<?php

namespace App\Http\Controllers;
use App\Models\Product;
use App\Models\Tambah_Stock;
use App\Models\Uang;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use carbon\Carbon;

class TambahStockAdminController extends Controller
{
    //
    public function getTambahStock(){

        // Mengambil data Tambah_Stock beserta relasi id_user dan id_product
        $getTambahStock = Tambah_Stock::with(['product', 'user'])->get();

        // Memeriksa apakah data kosong
        if ($getTambahStock->isEmpty()) {
            return response([
                'message' => 'No data',
                'data' => []
            ], 404);
        };

        // Memproses data untuk ditampilkan
        $productsArray = $getTambahStock->map(function($stock) {
            return [
                'id_tambah_stock' => $stock->id_tambah_stock,
                'id_product' => $stock->id_product,
                'id_user' => $stock->id_user,
                'jumlah_stock' => $stock->jumlah_stock,
                'tanggal_kirim' => $stock->tanggal_kirim,
                'product' => [
                    'id_product' => $stock->product->id_product,
                    'gambar' => $stock->product->konten_base64, // Mengakses gambar dalam bentuk base64
                    'nama_product' => $stock->product->nama_product,
                    'harga_beli' => $stock->product->harga_beli,
                    'harga_jual' => $stock->product->harga_jual,
                    'kategori_produk' => $stock->product->kategori_produk,
                    'jumlah_stock' => $stock->product->jumlah_stock,
                ],
                'user' => [
                    'id_user' => $stock->user->id_user,
                    'nama' => $stock->user->nama,
                    'email' => $stock->user->email,
                    'no_telpon' => $stock->user->no_telpon,
                    'role' => $stock->user->role,
                    'kota' => $stock->user->kota,
                    'alamat' => $stock->user->alamat,
                    'password' => $stock->user->password,
                ],
            ];
        })->all();

          // Mengembalikan response dengan data yang diproses
          return response([
            'message' => 'Retrieve data success',
            'data' => $productsArray,
        ], 200);
    }
    
    public function destroy($id)
    {
        // Find the stock record by its ID
        $tambahStock = Tambah_Stock::find($id);

        // Check if the stock record exists
        if (!$tambahStock) {
            return response([
                'message' => 'Stock record not found',
            ], 404);
        }

        // Delete the record from the database
        $tambahStock->delete();

        // Return success response
        return response([
            'message' => 'Stock has been successfully rejected and deleted.',
        ], 200);
    }

    public function konfirmasiTambahStock(Request $request)
    {

        $uang = Uang::all()->first();

        // Validasi input
        $validator = Validator::make($request->all(), [
            'id_product' => 'required',
        ]);
    
        // Jika validasi gagal, kembalikan respons error
        if ($validator->fails()) {
            return response([
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 400);
        }
    
        // Ambil data tambah stock berdasarkan id_product
        $tambahStock = Tambah_Stock::where('id_product', $request->id_product)->first();
    
        // Cek apakah tambahStock ada
        if (!$tambahStock) {
            return response([
                'message' => 'Data tambah stok tidak ditemukan'
            ], 404);
        }
    
        // Ambil data produk
        $product = Product::where('id_product', $request->id_product)->first();
    
        // Tambahkan jumlah stock produk
        $product->jumlah_stock += $tambahStock->jumlah_stock;

        $uang->jumlah_uang = $uang->jumlah_uang - ($product->harga_beli * $tambahStock->jumlah_stock);

        $uang->save();
    
        // Simpan perubahan pada produk
        $product->save();
    
        // Hapus data dari tabel tambah_stock setelah konfirmasi
        $tambahStock->delete();
    
        // Kembalikan respons sukses
        return response([
            'message' => 'Tambah stok produk success',
            'data' => [
                'product' => $product->jumlah_stock,
                'uang' => $uang
            ]
        ], 201);
    }
    
}
