<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pengeluaran extends Model
{
    use HasFactory;

    public $timestamps = false;
    protected $table = 'pengeluaran';
    protected $primaryKey = 'id_penjualan_barang';
    protected $fillable = [
        'harga_beli',
        'pajak',
        'tanggal',
        'jumlah',
        'harga_total_beli',
        'nama_product',
    ];
}
