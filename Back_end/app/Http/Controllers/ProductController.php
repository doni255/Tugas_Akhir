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
    



}
