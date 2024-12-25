<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Tambah_Stock extends Model
{
    use HasFactory;
    
    public $timestamps = false;
    protected $table = 'tambah_stock';
    protected $primaryKey = 'id_tambah_stock';
    protected $fillable = [
        'id_product',
        'id_user',
        'jumlah_stock',
        'tanggal_kirim',
    ];

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
