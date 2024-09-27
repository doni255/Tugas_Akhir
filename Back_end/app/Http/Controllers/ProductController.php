<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

use App\Http\Controllers\Controller;
use App\Models\Pendapatan;
use App\Models\Product;
use App\Models\Uang;
use App\Models\Pengeluaran;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
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

    public function getProductsByMultipleCategories(Request $request)
{

    $categories = $request->input('categories'); // Ambil data categories dari request

    if (empty($categories)) {
        return response([
            'message' => 'No categories provided',
            'data' => []
        ], 400);
    }

    $products = Product::whereIn('kategori_produk', $categories)->get();

    if ($products->isEmpty()) {
        return response([
            'message' => 'No data',
            'data' => []
        ], 404);
    }

     // Memetakan data produk, konversi gambar ke base64
     $productsArray = $products->map(function($product) {
        $productData = $product->toArray(); // Ubah produk ke array
        $productData['gambar'] = $product->konten_base64; // Ubah gambar jadi base64
        unset($productData['attributes']['gambar']); // Hapus atribut gambar asli jika perlu
        return $productData;
    })->values()->all();

    return response([
        'message' => 'Retrieve data success',
        'data' => $productsArray
    ], 200);
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
            'harga_beli' => 'required', // Validasi harga sebagai angka
            'harga_jual' => 'required', // Validasi harga sebagai angka
            'konten_base64' => 'nullable', // Misalkan ini untuk gambar dalam format base64
            'jumlah_stock' => 'required|string',            
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

     $pengeluaran = new Pengeluaran();
     $pengeluaran->nama_product = $request->nama_product;
     $pengeluaran->harga_total = $request->harga_beli;
     $pengeluaran->tanggal = date('Y-m-d');
     $pengeluaran->save();

    // Kembalikan respons sukses dengan data produk yang baru dibuat
    return response()-> json([
        'message' => 'Product created successfully',
        'data' => $product,
        'pengeluaran' => $pengeluaran
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
            'jumlah_stock' => 'required|string|max:255',
            'gambar' => 'nullable',
            // 'gambar' => 'required|file|mimes:jpeg,png,jpg,gif|max:2048',
        ]);

        // if ( $request->file('gambar')->getMimeType() != 'image/jpeg' && $request->file('gambar')->getMimeType() != 'image/png') {
        //     return response()->json([
        //         'message' => 'Gambar must be an image',
        //         'data' => null
        //     ], 400);
        // }

        // if (!$request->hasFile('gambar')) {
        //     return response()->json([
        //         'message' => 'Gambar is required',
               
        //     ], 400);
        // }
    
        try{
        // $product->nama_product = $request->input('nama_product');
        // $product->kategori_produk = $request->input('kategori_produk');
        // $product->harga_beli = $request->input('harga_beli');
        // $product->harga_jual = $request->input('harga_jual');
        // $product->jumlah_stock = $request->input('jumlah_stock');

        $storeData = $request->all();
        $storeData['nama_product'] = $storeData['nama_product'];
        $storeData['kategori_produk'] = $storeData['kategori_produk'];
        $storeData['harga_beli'] = $storeData['harga_beli'];
        $storeData['harga_jual'] = $storeData['harga_jual'];
        $storeData['jumlah_stock'] = $storeData['jumlah_stock'];

        // Jika ada file gambar yang diunggah, update gambar
        if ($request->hasFile('gambar')) {
            $file = $request->file('gambar');
            $storeData['gambar'] = file_get_contents($file->getRealPath());
            // $product->gambar = base64_encode($imageContent); // Encode sebagai base64
        }
    
        $product->update($storeData);
    
        // Return response without binary image data to avoid encoding errors
        return response()->json([
            'message' => 'Product updated successfully', 
            'product' => [
                'id_product' => $product->id_product,
                'nama_product' => $product->nama_product,
                'kategori_produk' => $product->kategori_produk,
                'harga_beli' => $product->harga_beli,
                'harga_jual' => $product->harga_jual,
                'jumlah_stock' => $product->jumlah_stock,
                'konten_base64' => $product->konten_base64,
                // Avoid returning the raw image; use URL or path if available
            ]
        ], 200);
        }catch (\Exception $e) {
            Log::error('Error updating event: ' . $e->getMessage());
            return response()->json([
                'message' => 'Server Error',
                'data' => $e->getMessage()
            ], 500);
        }
    }
              
    public function pembelianBarang(Request $request, $id_product)
    {
        $product = Product::find($id_product);
    
        $validator = Validator::make($request -> all(), [
            'jumlah_stock' => 'required|numeric',       
        ]);

        // Jika validasi gagal, kembalikan respons error
        if ($validator->fails()) {
            return response([
                'message' => 'Validation failed',
                'errors' => $validator->errors()
            ], 400);
        }

        $uang = Uang::find(1);
        $uang->jumlah_uang = $uang->jumlah_uang + ($product->harga_beli * $request->jumlah_stock);
    
        $product->jumlah_stock = $product->jumlah_stock - $request->jumlah_stock;
        $product->save();
        $uang->save();

        $pendapatan = new Pendapatan();
        $pendapatan->nama_product = $product->nama_product;
        $pendapatan->harga_total = $product->harga_beli * $request->jumlah_stock;
        $pendapatan->tanggal = date('Y-m-d');
        $pendapatan->save();
    
        return response()->json([
            'message' => 'Product stock updated successfully',
            'product' => $product->jumlah_stock,
            'pendapatan' => $pendapatan,
            'uang' => $uang
        ], 200);
    }
}