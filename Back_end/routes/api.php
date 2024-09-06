    <?php

use App\Http\Controllers\BarangMasukAdminController;
use App\Http\Controllers\BarangMasukController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\TambahStockAdminController;
use App\Http\Controllers\TambahStockController;
use Illuminate\Http\Request;
    use Illuminate\Support\Facades\Route;
    use App\Http\Controllers\UserController;

    /*
    |--------------------------------------------------------------------------
    | API Routes
    |--------------------------------------------------------------------------
    |
    | Here is where you can register API routes for your application. These
    | routes are loaded by the RouteServiceProvider within a group which
    | is assigned the "api" middleware group. Enjoy building your API!
    |
    */

    Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
        return $request->user();
    });

    //Route Resource
    Route::apiResource('/users', UserController::class);
    Route::post('/login', [UserController::class, 'login']);
    Route::post('/store', [UserController::class, 'store']);

    // Bagian Users
    Route::delete('/users/{id}', [UserController::class, 'destroy']);
    Route::put('/users/{id}', [UserController::class, 'update']);
    Route::get('/total-users', [UserController::class, 'getTotalUsers']);
    
    // Bagian Product
    Route::get('/total-stock', [ProductController::class, 'getTotalStock']);
    Route::get('/product', [ProductController::class, 'getProducts']);
    Route::delete('/product/{id}', [ProductController::class, 'destroy']);
    Route::post('/create', [ProductController::class, 'create']);
    Route::post('/product/{id_product}', [ProductController::class, 'update']);

    // Barang Masuk Untuk Supplier
    Route::get('/barang_masuk/{id_user}', [BarangMasukController::class, 'getBarangMasuk']);
    Route::post('/barang_masuk/create/{id_user}', [BarangMasukController::class, 'create']);
    Route::post('/barang_masuk/update/{id_barang_masuk}', [BarangMasukController::class, 'edit']);
    Route::delete('/barang_masuk/{id_barang_masuk}', [BarangMasukController::class, 'destroy']);

    // Barang Masuk Konfirmasi untuk admin
    Route::get('/barang_masuk_admin', [BarangMasukAdminController::class, 'getBarangMasuk']);
    Route::post('/barang_masuk/konfirmasi_barang_masuk', [BarangMasukAdminController::class, 'konfirmasiBarangMasuk']);

    // Tambah Stock Untuk Supplier
    Route::get('/tambah_stock/', [TambahStockController::class, 'getTambahStock']);
    Route::post('/tambah_stock/create/{id_user}', [TambahStockController::class, 'create']);
    Route::get('/tambah_stock/data_stock_supplier/{user_id}', [TambahStockController::class, 'getTambahStockSupplier']);

    // Tambah Stock Konfirmasi untuk admin
    Route::get('/tambah_stock_admin', [TambahStockAdminController::class, 'getTambahStock']);
    Route::post('/tambah_stock_admin/konfirmasi_tambah_stock', [TambahStockAdminController::class, 'konfirmasiTambahStock']);     
    Route::delete('/tambah_stock/destroy/{id}', [TambahStockAdminController::class, 'destroy']);
  


