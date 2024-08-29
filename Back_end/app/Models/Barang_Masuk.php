<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Barang_Masuk extends Model
{
    use HasFactory;


    public $timestamps = false;
    protected $table = 'barang_masuk';
    protected $primaryKey = 'id_barang_masuk';
    protected $fillable = [
        'id_user',
        'nama_product',
        'kategori_produk',
        'harga_beli',
        'tanggal_kirim',
        'jumlah_stock',
    ];

    public function user()
    {
        return $this->belongsTo(User::class, 'id_user', 'id_user');
    }

}
