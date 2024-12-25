<?php

namespace App\Http\Controllers;
use App\Models\histori_beli_produk;

use Illuminate\Http\Request;

use function PHPSTORM_META\map;

class HistoriBeliProdukController extends Controller
{
    public function getHistoriBeliProduk($id_user)
    {
        $histori_beli_produk = histori_beli_produk::with(['user'])
            ->where('id_user', $id_user)
            ->get();

        if ($histori_beli_produk->isEmpty()) {
            return response()->json([
                'message' => 'No data',
                'data' => []
            ], 404);
        }

        $historiBeliProdukArray = $histori_beli_produk->map(function ($item) {
            return [
                'id_histori_beli_produk' => $item->id_histori_beli_produk,
                'id_user' => $item->id_user,
                'harga_jual' => $item->harga_jual,
                'harga_total_jual' => $item->harga_total_jual,
                'jumlah' => $item->jumlah,
                'nama_product' => $item->nama_product,
                'gambar' => $item->gambar,
                'bukti_pembayaran' => base64_encode($item->bukti_pembayaran), // Convert BLOB to base64
                'tanggal' => $item->tanggal,
                'status' => $item->status,
                'user' => [
                    'id_user' => $item->user->id_user,
                    'nama' => $item->user->nama,
                ]
            ];
        });

        return response()->json([
            'message' => 'Success',
            'data' => $historiBeliProdukArray
        ]);
    }
}

