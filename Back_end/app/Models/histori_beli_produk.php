<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class histori_beli_produk extends Model
{
    use HasFactory;
    protected $table = 'histori_beli_produk';
    protected $primaryKey = 'id_histori_beli_produk';

    protected $fillable = [
        'id_user',
        'nama_product',
        'gambar',
        'harga_jual',
        'jumlah',
        'harga_total_jual',
        'tanggal',        
    ];

    public $timestamps = false; // Jika Anda tidak menggunakan created_at dan updated_at

    protected $appends = ['konten_base64'];

    public function user()
    {
        return
        $this->belongsTo(User::class, 'id_user', 'id_user');
    }

    public function getKontenBase64AttributeGambar()
    {
        return base64_encode($this->attributes['gambar']);
    }
    

}
