<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pendapatan extends Model
{
    use HasFactory;

    public $timestamps = false;
    protected $table = 'pendapatan';
    protected $primaryKey = 'id_pembelian_barang';
    protected $fillable = [
        'harga_jual',
        'pajak',
        'harga_total',
        'tanggal',
        'nama_product',
    ];
}
    