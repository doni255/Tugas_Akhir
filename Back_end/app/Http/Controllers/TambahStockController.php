<?php

namespace App\Http\Controllers;
use App\Models\Product;
use App\Models\Tambah_Stock;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use carbon\Carbon;

class TambahStockController extends Controller
{
    //

    public function getTambahStock()
    {
        // Mengambil data Tambah_Stock beserta relasi id_user dan id_product
        $getTambahStock = Tambah_Stock::with(['product', 'user'])->get();
    
        // Memeriksa apakah data kosong
        if ($getTambahStock->isEmpty()) {
            return response([
                'message' => 'No data',
                'data' => []
            ], 404);
        }
    
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
            'data' => $productsArray
        ], 200);
    }
    


    public function create(Request $request, $id_user){
        $user = User::find($id_user);
        $product = Product::all();

        if ($user) {
            // Validasi input dari permintaan
            $validator = Validator::make($request->all(), [
                'jumlah_stock' => 'required|numeric', // Ensure stock is also numeric
                'id_product' => 'required'
            ]);

            if (!$product){
                return response([
                    'message' => 'Product not found',
                ], 404);
            }

            // Jika validasi gagal, kembalikan respons error
            if ($validator->fails()) {
                return response([
                    'message' => 'Validation failed',
                    'errors' => $validator->errors()
                ], 400);
            }

            // Buat produk baru dengan data yang diberikan
            $tambah_stock = new Tambah_Stock();
            $tambah_stock->id_product = $request->id_product;
            $tambah_stock->jumlah_stock = $request->jumlah_stock;
            $tambah_stock->tanggal_kirim = Carbon::now();
            $tambah_stock->id_user = $request->id_user;
            $tambah_stock->save();

            // Kembalikan respons sukses dengan data produk yang baru dibuat
            return response()->json([
                'message' => 'Tambah Stock berhasil',
                'data' => $tambah_stock
            ], 200);
        }

        return response([
            'message' => 'User not found',
            'data' => null
        ], 404);
    }

}
