<?php

namespace App\Http\Controllers;

use App\Models\Barang_Masuk;
use App\Models\Product;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use carbon\Carbon;

class BarangMasukController extends Controller
{
    //
   


    public function getBarangMasuk($id_user)
{
    $user = User::find($id_user);

    if ($user) {
        // Filter barang_masuk berdasarkan id_user
        $barang_masuk = Barang_Masuk::where('id_user', $id_user)->get();

        if ($barang_masuk->isEmpty()) {
            return response([
                'message' => 'No data',
                'data' => []
            ], 404);
        }

        return response([
            'message' => 'Retrieve data success',
            'data' => $barang_masuk
        ], 200);
    }

    return response([
        'message' => 'User Not Found :(',
        'data' => []
    ], 404);
}
    public function create(Request $request, $id_user)
    {
        $user = User::find($id_user);

        if ($user) {
            // Validasi input dari permintaan
            $validator = Validator::make($request->all(), [
                'nama_product' => 'required|string|max:255',
                'kategori_produk' => 'required|string',
                'harga_beli' => 'required|numeric', // Validasi harga sebagai angka
                'jumlah_stock' => 'required|numeric' // Ensure stock is also numeric
            ]);

            // Jika validasi gagal, kembalikan respons error
            if ($validator->fails()) {
                return response([
                    'message' => 'Validation failed',
                    'errors' => $validator->errors()
                ], 400);
            }

            // Periksa apakah nama produk sudah ada di tabel product
            $existingProduct = Product::where('nama_product', $request->nama_product)->first();

            if ($existingProduct) {
                return response([
                    'message' => 'Product ini sudah ada di toko',
                    'errors' => ['nama_product' => ['Produk dengan nama ini sudah ada']]
                ], 400);
            }

            // Buat produk baru dengan data yang diberikan
            $barang_masuk = new Barang_Masuk();
            $barang_masuk->id_user = $request->id_user;
            $barang_masuk->nama_product = $request->nama_product;
            $barang_masuk->kategori_produk = $request->kategori_produk;
            $barang_masuk->harga_beli = $request->harga_beli; // Ini harus menerima harga sebagai angka
            $barang_masuk->tanggal_kirim = Carbon::now();
            $barang_masuk->jumlah_stock = $request->jumlah_stock;
            $barang_masuk->save();

            // Kembalikan respons sukses dengan data produk yang baru dibuat
            return response()->json([
                'message' => 'Product created successfully',
                'data' => $barang_masuk
            ], 200);
        }

        return response([
            'message' => 'User not found',
            'data' => null
        ], 404);
    }

    public function edit(Request $request, $id_barang_masuk){

        $barang_masuk = Barang_Masuk::find($id_barang_masuk);

        if($barang_masuk){
             // Validasi input dari permintaa
            $validator = Validator::make($request -> all(), [
           
                'nama_product' => 'required|string|max:255',
                'kategori_produk' => 'required|string',
                'harga_beli' => 'required|numeric', // Validasi harga sebagai angka
                'jumlah_stock' => 'required'
            ]);

            // Jika validasi gagal, kembalikan respons error
            if ($validator->fails()) {
                return response([
                    'message' => 'Validation failed',
                    'errors' => $validator->errors()
                ], 400);
            }

          
            $barang_masuk->nama_product = $request->nama_product;
            $barang_masuk->kategori_produk = $request->kategori_produk;
            $barang_masuk->harga_beli = $request->harga_beli; // Ini harus menerima harga sebagai string tanpa simbol dolar
            $barang_masuk->tanggal_kirim = Carbon::now();
            $barang_masuk->jumlah_stock = $request->jumlah_stock;
            $barang_masuk->save();

            
            // Kembalikan respons sukses dengan data produk yang baru dibuat
            return response()-> json([
                'message' => 'Product edit successfully',
                'data' => $barang_masuk
            ], 200);

            }

            return response([
                'message' => 'No data',
                'data' => null
            ], 404);
    }

    public function destroy($id_barang_masuk)
    {
        $barang_masuk = Barang_Masuk::find($id_barang_masuk);

        if (!$barang_masuk) {
            return response([
                'message' => 'Barang Masuk not found',
            ], 404);
        }

        // Hapus Barang Masuk
        $barang_masuk->delete();

        return response([
            'message' => 'Barang Masuk deleted successfully',
        ], 200);
    }
}
