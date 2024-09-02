<?php

namespace App\Http\Controllers;

use App\Models\Barang_Masuk;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use carbon\Carbon;

class BarangMasukController extends Controller
{
    //
    
    public function getBarangMasuk()
    {
        $barang_masuk = Barang_Masuk::all();

        if ($barang_masuk->isEmpty()) {
            return response([
                'message' => 'No data',
                'data' => []
            ], 404);
        }

        $productsArray = $barang_masuk->map(function($barang_masuk) {
            return $barang_masuk;
        })->values()->all();

        return response([
            'message' => 'Retrieve data success',
            'data' => $productsArray
        ], 200);
    }

    public function create(Request $request, $id_user){

        $user = User::find($id_user);

        if($user){
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

            // Buat produk baru dengan data yang diberikan
            $barang_masuk = new Barang_Masuk();
            $barang_masuk->id_user = $request->id_user;
            $barang_masuk->nama_product = $request->nama_product;
            $barang_masuk->kategori_produk = $request->kategori_produk;
            $barang_masuk->harga_beli = $request->harga_beli; // Ini harus menerima harga sebagai string tanpa simbol dolar
            $barang_masuk->tanggal_kirim = Carbon::now();
            $barang_masuk->jumlah_stock = $request->jumlah_stock;
            $barang_masuk->save();

            // Kembalikan respons sukses dengan data produk yang baru dibuat
            return response()-> json([
                'message' => 'Product created successfully',
                'data' => $barang_masuk
            ], 200);
                }

                return response([
                    'message' => 'Not Found',
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
