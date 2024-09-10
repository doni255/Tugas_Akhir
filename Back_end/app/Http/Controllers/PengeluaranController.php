<?php

namespace App\Http\Controllers;
use App\Models\Pengeluaran;

use Illuminate\Http\Request;

class PengeluaranController extends Controller
{

    public function getPengeluaran()
    {
        $pengeluaran = Pengeluaran::all();

        if ($pengeluaran->isEmpty()) {
            return response([
                'message' => 'No data',
                'data' => []
            ], 404);
        }
        
        return response()->json($pengeluaran);
    }

    public function getGrafikPengeluaranPerbulanDiTahunini()
    {
        $bulan = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];

        // Mengambil data pengeluaran berdasarkan bulan
        $pengeluaranPerbulan = Pengeluaran::selectRaw('MONTH(tanggal) as bulan, SUM(harga_total) as total_pengeluaran')
            ->whereYear('tanggal', date('Y'))
            ->groupBy('bulan')
            ->get();

        // Menginisialisasi array untuk menampung data pengeluaran per bulan
        $pengeluaranPerbulanArray = [];

        // Memproses data pengeluaran per bulan
        foreach ($bulan as $key => $value) {
            $pengeluaranPerbulanArray[$key]['bulan'] = $value;
            $pengeluaranPerbulanArray[$key]['total_pengeluaran'] = 0;

            foreach ($pengeluaranPerbulan as $pengeluaran) {
                if ($pengeluaran->bulan == $key + 1) {
                    $pengeluaranPerbulanArray[$key]['total_pengeluaran'] = $pengeluaran->total_pengeluaran;
                }
            }
        }

        return response()->json($pengeluaranPerbulanArray);
    }

    public function getGrafikPengeluaranPertahun()
    {
       
        $tahun = Pengeluaran::selectRaw('YEAR(tanggal) as tahun')
            ->groupBy('tahun')
            ->get();

        // Mengambil data pengeluaran berdasarkan tahun

        $pengeluaranPertahun = Pengeluaran::selectRaw('YEAR(tanggal) as tahun, SUM(harga_total) as total_pengeluaran')
            ->groupBy('tahun')
            ->get();

        // Menginisialisasi array untuk menampung data pengeluaran per tahun
        $pengeluaranPertahunArray = [];

        // Memproses data pengeluaran per tahun     
        foreach ($tahun as $key => $value) {
            $pengeluaranPertahunArray[$key]['tahun'] = $value->tahun;
            $pengeluaranPertahunArray[$key]['total_pengeluaran'] = 0;

            foreach ($pengeluaranPertahun as $pengeluaran) {
                if ($pengeluaran->tahun == $value->tahun) {
                    $pengeluaranPertahunArray[$key]['total_pengeluaran'] = $pengeluaran->total_pengeluaran;
                }
            }
        }

        return response()->json($pengeluaranPertahunArray);
    }

}
