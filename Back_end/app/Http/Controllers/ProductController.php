<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Support\Facades\Log;


class ProductController extends Controller
{
    public function index()
    {
         // Mendapatkan semua data dari tabel users
        $product = Product::all();
        
        // Mengembalikan data dalam bentuk JSON response
        return response()->json($product);
    }

    public function getTotalStock()
    {
        // Menghitung total jumlah_stock dari semua produk
        $totalStock = Product::sum('jumlah_stock');

        // Mengembalikan hasil dalam format JSON
        return response()->json(['totalStock' => $totalStock]);
    }

    public function getProducts()
    {
        $products = Product::all();

        if ($products->isEmpty()) {
            return response([
                'message' => 'No data',
                'data' => []
            ], 404);
        }

        $productsArray = $products->map(function($product) {
            $product->gambar = $product->konten_base64;
            return $product;
        })->values()->all();

        return response([
            'message' => 'Retrieve data success',
            'data' => $productsArray
        ], 200);
    }

    public function create(Request $request){
        // Validasi input dari permintaa
        $validator = Validator::make($request -> all(), [
            'nama_product' => 'required|string|max:255',
            'kategori_produk' => 'required|string',
            'harga_beli' => 'required|numeric', // Validasi harga sebagai angka
            'harga_jual' => 'required|numeric', // Validasi harga sebagai angka
            'konten_base64' => 'nullable|string', // Misalkan ini untuk gambar dalam format base64
            'jumlah_stock' => 'required|string'
        ]);

        // Jika validasi gagal, kembalikan respons error
        if ($validator->fails()) {
            return response([
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 400);
        }
    

     // Mengonversi base64 ke binary data
     $binaryImage = $request->konten_base64 ? base64_decode($request->konten_base64) : null;
    
     // Buat produk baru dengan data yang diberikan
     $product = new Product();
     $product->nama_product = $request->nama_product;
     $product->kategori_produk = $request->kategori_produk;
     $product->harga_beli = $request->harga_beli; // Ini harus menerima harga sebagai string tanpa simbol dolar
     $product->harga_jual = $request->harga_jual; // Ini harus menerima harga sebagai string tanpa simbol dolar
     $product->gambar = $binaryImage; // Menggunakan kolom gambar
     $product->jumlah_stock = $request->jumlah_stock;
     $product->save();

    // Kembalikan respons sukses dengan data produk yang baru dibuat
    return response()-> json([
        'message' => 'Product created successfully',
        'data' => $product
    ], 200);

    }

    public function destroy($id_product)
    {
        // Temukan produk berdasarkan ID
        $product = Product::find($id_product);
    
        // Jika produk tidak ditemukan, kembalikan respons error
        if (!$product) {
            return response([
                'message' => 'Product not found',
            ], 404);
        }
    
        // Hapus produk
        $product->delete();
    
        // Kembalikan respons sukses
        return response([
            'message' => 'Product deleted successfully',
        ], 200);
    }
    
    public function update(Request $request, $id_product)
    {

            $product = Product::find($id_product);
    
            if (!$product) {
                return response()->json(['message' => 'Product not found'], 404);
            }
    
            // Validasi data
            $request->validate([
                'nama_product' => 'required|string|max:255',
                'kategori_produk' => 'required|string|max:255',
                'harga_beli' => 'required|numeric', // Validasi harga sebagai angka
                'harga_jual' => 'required|numeric', // Validasi harga sebagai angka
                'harga' => 'required|string|max:255',
                'jumlah_stock' => 'required|string|max:255',
                'gambar' => 'sometimes|file|mimes:jpeg,png,jpg,gif|max:2048',
            ]);
    
            // Mengupdate data produk
            $product->nama_product = $request->input('nama_product');
            $product->kategori_produk = $request->input('kategori_produk');
            $product->harga_beli = $request->input('harga_beli');
            $product->harga_jual = $request->input('harga_jual');
            $product->harga = $request->input('harga');
            $product->jumlah_stock = $request->input('jumlah_stock');
    
            // Jika ada file gambar yang diunggah, update gambar
            if ($request->hasFile('gambar')) {
                $image = $request->file('gambar');
                $imageContent = file_get_contents($image->getRealPath());
                $product->gambar = $imageContent; // Simpan sebagai biner
            }

            $product->save();
    
            return response()->json([
                'message' => 'Product updated successfully', 
                'product' => $product
            ], 200);
    
        
    }
   
}