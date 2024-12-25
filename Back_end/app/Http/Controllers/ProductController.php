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

    public function create(Request $request)
{
    // Validasi data
    $request->validate([
        'nama_product' => 'required|string|max:255',
        'kategori_produk' => 'required|string|max:255',
        'harga_beli' => 'required|numeric',
        'harga_jual' => 'required|numeric',
        'jumlah_stock' => 'required|string|max:255',
        'gambar' => 'nullable|file', // Pastikan ini diterima sebagai file
    ]);

    try {
        $storeData = $request->all();
        $storeData['nama_product'] = $storeData['nama_product'];
        $storeData['kategori_produk'] = $storeData['kategori_produk'];
        $storeData['harga_beli'] = $storeData['harga_beli'];
        $storeData['harga_jual'] = $storeData['harga_jual'];
        $storeData['jumlah_stock'] = $storeData['jumlah_stock'];
        $storeData['pajak'] = $storeData['harga_jual'] * 25 / 100;
        $storeData['harga_total_jual'] = $storeData['harga_jual'] + $storeData['pajak'];

        // Jika ada file gambar yang diunggah, tambahkan ke database
        if ($request->hasFile('gambar')) {
            $file = $request->file('gambar');
            $storeData['gambar'] = file_get_contents($file->getRealPath());
        } else {
            $storeData['gambar'] = null; // Pastikan null jika tidak ada gambar
        }

        // Simpan produk baru
        $product = Product::create($storeData);

        // Simpan ke tabel pengeluaran
        $pengeluaran = new Pengeluaran();
        $pengeluaran->nama_product = $storeData['nama_product'];
        $pengeluaran->harga_beli = $storeData['harga_beli'] + ($storeData['harga_beli'] * 25 / 100);
        $pengeluaran->harga_total = $storeData['harga_beli'];
        $pengeluaran->pajak = $storeData['harga_beli'] * 25 / 100;
        $pengeluaran->tanggal = date('Y-m-d');
        $pengeluaran->save();

        // Response sukses
        return response()->json([
            'message' => 'Product created successfully',
            'data' => [
                'id_product' => $product->id_product,
                'nama_product' => $product->nama_product,
                'kategori_produk' => $product->kategori_produk,
                'harga_beli' => $product->harga_beli,
                'harga_jual' => $product->harga_jual,
                'jumlah_stock' => $product->jumlah_stock,
                'konten_base64' => $product->konten_base64, // Base64 untuk gambar
            ],
            'pengeluaran' => $pengeluaran,
        ], 200);
    } catch (\Exception $e) {
        return response()->json([
            'message' => 'Failed to create product',
            'error' => $e->getMessage(),
        ], 500);
    }
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

     
        try{
        $storeData = $request->all();
        $storeData['nama_product'] = $storeData['nama_product'];
        $storeData['kategori_produk'] = $storeData['kategori_produk'];
        $storeData['harga_beli'] = $storeData['harga_beli'];
        $storeData['harga_jual'] = $storeData['harga_jual'];
        $storeData['jumlah_stock'] = $storeData['jumlah_stock'];

           // Hitung pajak
           $pajak = $storeData['harga_beli'] * 25 / 100; // Pajak 25%
           $harga_total = $storeData['harga_beli'] + $pajak;
   
           // Tambahkan hasil perhitungan pajak ke data
           $storeData['pajak'] = $pajak;
           $storeData['harga_total'] = $harga_total;

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
                'pajak' => $pajak,
                'harga_total' => $harga_total,
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

         // Check if requested stock exceeds available stock
    if ($request->jumlah_stock > $product->jumlah_stock) {
        return response()->json([
            'message' => 'Jumlah stock melebihi stock yang tersedia',
            'available_stock' => $product->jumlah_stock,
        ], 400);
    }

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
        $pendapatan->jumlah = $request->jumlah_stock;
        $pendapatan->harga_jual = $product->harga_jual;
        $pendapatan->pajak = $product->pajak * $request->jumlah_stock;
        $pendapatan->harga_total_jual = $product->harga_total_jual * $request->jumlah_stock;
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