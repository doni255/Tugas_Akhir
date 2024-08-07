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

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $table = 'products';
    protected $primaryKey = 'id_product';
    protected $fillable = [
        'gambar',
        'nama_product',
        'kategori_produk',
        'harga',
        'jumlah_stock',
    ];

    protected $appends = ['konten_base64'];

    public $timestamps = false; // Jika Anda tidak menggunakan created_at dan updated_at

    public function getKontenBase64Attribute()
    {
        return base64_encode($this->attributes['gambar']);
    }

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
   


}
