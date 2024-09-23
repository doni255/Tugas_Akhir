<?php

namespace App\Http\Controllers;
use App\Models\histori_beli_produk;
use App\Models\User;

use Illuminate\Http\Request;

class HistoriBeliProdukController extends Controller
{
    // Menampilkan histori hasil pembelian produk yang sudah dikonfirmasi sama admin berdasarkan id_user
    public function getHistoriBeliProduk($id_user) {
        $histori_beli_produk = histori_beli_produk::with(['user'])
        ->where('id_user', $id_user)
        ->get();

        return response()->json([
            'message' => 'Success',
            'data' => $histori_beli_produk
        ]);
    }
}

