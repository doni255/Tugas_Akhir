<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\User;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Support\Facades\Session;

class ProductController extends Controller
{
    public function index()
    {
         // Mendapatkan semua data dari tabel users
        $product = Product::all();
        
        // Mengembalikan data dalam bentuk JSON response
        return response()->json($product);
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
            'harga' => 'required|numeric', // Validasi harga sebagai angka
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
     $product->harga = $request->harga; // Ini harus menerima harga sebagai string tanpa simbol dolar
     $product->gambar = $binaryImage; // Menggunakan kolom gambar
     $product->jumlah_stock = $request->jumlah_stock;
     $product->save();


    // Kembalikan respons sukses dengan data produk yang baru dibuat
    return response([
        'message' => 'Product created successfully',
        'data' => $product
    ], 201);

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
    
    public function editProduct(Request $request, $id_product)
    {
        // Validasi input
        $validatedData = $request->validate([
            'nama_product' => 'required|string|max:255',
            'kategori_produk' => 'required|string|max:255',
            'harga' => 'required|numeric|min:0',
            'jumlah_stock' => 'required|integer|min:0',
            'gambar' => 'nullable|image|mimes:jpeg,png,jpg,gif|max:2048',
        ]);
    
        // Cari produk berdasarkan id_product
        $product = Product::findOrFail($id_product);
    
        // Update data produk
        $product->nama_product = $validatedData['nama_product'];
        $product->kategori_produk = $validatedData['kategori_produk'];
        $product->harga = $validatedData['harga'];
        $product->jumlah_stock = $validatedData['jumlah_stock'];
    
        // Jika ada gambar baru yang diupload
        if ($request->hasFile('gambar')) {
            $image = $request->file('gambar');
            $imageContent = file_get_contents($image->getRealPath());
            $product->gambar = $imageContent;
        }
    
        // Simpan perubahan
        $product->save();
    

         // Kirim response sukses
        return response()->json([
            'success' => true,
            'message' => 'Produk berhasil diperbarui',
            'data' => json_decode(json_encode($product, JSON_UNESCAPED_UNICODE), true)
        ], 200);
        
    }
    




}
