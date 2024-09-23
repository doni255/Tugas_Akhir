<?php

namespace App\Http\Controllers;
use App\Models\histori_beli_produk;
use App\Models\User;

use Illuminate\Http\Request;

class HistoriBeliProdukController extends Controller
{
    // Menampilkan histori hasil pembelian produk yang sudah dikonfirmasi sama admin berdasarkan id_user
    public function historiBeliProduk($id_user) {
        // Cari user berdasarkan id_user
        $user = User::find($id_user);

        if (!$user) {
            return response()->json([
                'message' => 'User tidak ditemukan',
                'data' => []
            ], 404);
        }

        // Cari data histori pembelian produk berdasarkan id_user
        $histori_beli_produk = histori_beli_produk::where('id_user', $id_user)->with('user')->get();

        if ($histori_beli_produk->isEmpty()) {
            return response()->json([
                'message' => 'Data histori pembelian produk tidak ditemukan',
                'data' => []
            ], 404);
        }

        // Tampilkan data histori pembelian
        return response()->json([
            'message' => 'Berhasil menampilkan data histori pembelian produk',
            'data' => $histori_beli_produk
        ], 200);
    }
}

