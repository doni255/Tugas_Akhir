<?php

namespace App\Http\Controllers;
namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use App\Http\Controllers\Controller;
use App\Models\Product;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Log;




class PendapatanPengeluaranController extends Controller
{
    //
    public function getPendapatanPengeluaranPerBulanDiTahunIni()
    {
        $currentYear = Carbon::now()->year;
        
        // Ambil data pendapatan per bulan
        $pendapatanData = TransaksiPendapatan::select(DB::raw('MONTH(tanggal) as bulan'), DB::raw('SUM(jumlah) as total'))
            ->whereYear('tanggal', $currentYear)
            ->groupBy('bulan')
            ->get();
        
        // Ambil data pengeluaran per bulan
        $pengeluaranData = TransaksiPengeluaran::select(DB::raw('MONTH(tanggal) as bulan'), DB::raw('SUM(jumlah) as total'))
            ->whereYear('tanggal', $currentYear)
            ->groupBy('bulan')
            ->get();
        
        // Inisialisasi array pendapatan dan pengeluaran untuk setiap bulan (1-12)
        $pendapatan = array_fill(1, 12, 0);
        $pengeluaran = array_fill(1, 12, 0);
        
        // Isi data pendapatan ke array
        foreach ($pendapatanData as $data) {
            $pendapatan[$data->bulan] = $data->total;
        }
        
        // Isi data pengeluaran ke array
        foreach ($pengeluaranData as $data) {
            $pengeluaran[$data->bulan] = $data->total;
        }
    
        // Kembalikan response JSON
        return response()->json([
            'message' => 'Data Pendapatan dan Pengeluaran Per Bulan di Tahun Ini berhasil diambil',
            'data' => [
                'pendapatan' => $pendapatan,
                'pengeluaran' => $pengeluaran,
            ]
        ], 200);
    }
}
