<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class beli_produk extends Model
{
    use HasFactory;
    protected $table = 'beli_produk';
    protected $primaryKey = 'id_beli_produk';

    protected $fillable = [
        'id_product',
        'id_user',
        'bukti_pembayaran',
        'harga_jual',
        'harga_total',
        'jumlah',
        'tanggal',
        'status',
        'status_pengiriman',
    ];

    public $timestamps = false;

    protected $appends = ['kontent_base64'];

    public function getKontentBase64Attribute()
    {
        return base64_encode($this->attributes['bukti_pembayaran']);
    }

    public function product()
    {
        return 
        $this->belongsTo(Product::class, 'id_product', 'id_product');
    }

    public function user()
    {
        return 
        $this->belongsTo(User::class, 'id_user', 'id_user');
    }
}
