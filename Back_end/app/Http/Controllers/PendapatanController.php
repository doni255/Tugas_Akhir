<?php

namespace App\Http\Controllers;
use App\Models\Pendapatan;
use Illuminate\Http\Request;

class PendapatanController extends Controller
{
    public function getPendapatan()
    {
        $pendapatan = Pendapatan::all();

        if ($pendapatan->isEmpty()) {
            return response([
                'message' => 'No data',
                'data' => []
            ], 404);
        }

        return response()->json($pendapatan);

        // Di controller atau route API
        return response()->json(Pendapatan::all());
    }

    public function     getGrafikPendapatanPerbulanDiTahunini()
    {
        $bulan = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];

        // Mengambil data pendapatan berdasarkan bulan
        $pendapatanPerbulan = Pendapatan::selectRaw('MONTH(tanggal) as bulan, SUM(harga_total) as total_pendapatan')
            ->whereYear('tanggal', date('Y'))
            ->groupBy('bulan')
            ->get();

        // Menginisialisasi array untuk menampung data pendapatan per bulan
        $pendapatanPerbulanArray = [];

        // Memproses data pendapatan per bulan
        foreach ($bulan as $key => $value) {
            $pendapatanPerbulanArray[$key]['bulan'] = $value;
            $pendapatanPerbulanArray[$key]['total_pendapatan'] = 0;

            foreach ($pendapatanPerbulan as $pendapatan) {
                if ($pendapatan->bulan == $key + 1) {
                    $pendapatanPerbulanArray[$key]['total_pendapatan'] = $pendapatan->total_pendapatan;
                }
            }
        }

        return response()->json($pendapatanPerbulanArray);
    }

    public function getGrafikPendapatanPertahun()
    {
        $tahun = Pendapatan::selectRaw('YEAR(tanggal) as tahun')
            ->groupBy('tahun')
            ->get();

        // Mengambil data pendapatan berdasarkan tahun
        $pendapatanPertahun = Pendapatan::selectRaw('YEAR(tanggal) as tahun, SUM(harga_total) as total_pendapatan')
            ->groupBy('tahun')
            ->get();

        // Menginisialisasi array untuk menampung data pendapatan per tahun
        $pendapatanPertahunArray = [];

        // Memproses data pendapatan per tahun
        foreach ($tahun as $key => $value) {
            $pendapatanPertahunArray[$key]['tahun'] = $value->tahun;
            $pendapatanPertahunArray[$key]['total_pendapatan'] = 0;

            foreach ($pendapatanPertahun as $pendapatan) {
                if ($pendapatan->tahun == $value->tahun) {
                    $pendapatanPertahunArray[$key]['total_pendapatan'] = $pendapatan->total_pendapatan;
                }
            }
        }
        return response()->json($pendapatanPertahunArray);
    }
}
