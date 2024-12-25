<?php

namespace App\Models;

use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Passport\HasApiTokens;
use Carbon\Carbon;

class Product extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $table = 'products';
    protected $primaryKey = 'id_product';
    protected $fillable = [
        'gambar',
        'nama_product',
        'kategori_produk',
        'harga_beli',
        'harga_jual',
        'pajak',
        'harga_total_jual',
        'jumlah_stock', 
    ];
    
    public $timestamps = false; // Jika Anda tidak menggunakan created_at dan updated_at

    protected $appends = ['konten_base64'];


    public function getKontenBase64Attribute()
    {
        return base64_encode($this->attributes['gambar']);
    }
}
