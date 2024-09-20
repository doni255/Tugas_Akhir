    <?php

use App\Http\Controllers\BarangMasukAdminController;
use App\Http\Controllers\BarangMasukController;
use App\Http\Controllers\BeliProdukController;
use App\Http\Controllers\PendapatanController;
use App\Http\Controllers\PengeluaranController;
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
    Route::post('/store_user', [UserController::class, 'storeUser']);
    // Route::post('/check_nama', [UserController::class, 'checkNama']);

    // Bagian Users
    Route::delete('/users/{id}', [UserController::class, 'destroy']);
    Route::put('/users/{id}', [UserController::class, 'update']);
    Route::get('/total-users', [UserController::class, 'getTotalUsers']);
    Route::get('/getDataUserByID/{id_user}', [UserController::class, 'getDataUserByID']);
    
    // Bagian Product
    Route::get('/total-stock', [ProductController::class, 'getTotalStock']);
    Route::get('/product', [ProductController::class, 'getProducts']);
    Route::post('/product/categories', [ProductController::class, 'getProductsByMultipleCategories']);
    Route::delete('/product/{id}', [ProductController::class, 'destroy']);
    Route::post('/create', [ProductController::class, 'create']);
    Route::post('/product/{id_product}', [ProductController::class, 'update']);
    Route::put('/product/pembelian_product/{id_product}', [ProductController::class, 'pembelianBarang']);

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

    // Pendapatan 
    Route::get('/pendapatan', [PendapatanController::class, 'getPendapatan']);
    Route::get('/grafik_pendapatan', [PendapatanController::class, 'getGrafikPendapatanPerbulanDiTahunIni']);
    Route::get('/grafik_pendapatan_pertahun', [PendapatanController::class, 'getGrafikPendapatanPertahun']);

    // Pengeluaran
    Route::get('/pengeluaran', [PengeluaranController::class, 'getPengeluaran']);
    Route::get('/grafik_pengeluaran', [PengeluaranController::class, 'getGrafikPengeluaranPerbulanDiTahunIni']);
    Route::get('/grafik_pengeluaran_pertahun', [PengeluaranController::class, 'getGrafikPengeluaranPertahun']);

    // Beli Produk
    Route::get('/keranjang_pembelian/{id_user}', [BeliProdukController::class, 'getKeranjangPembelian']);
    Route::post('/keranjang_pembelian/tambah_keranjang/{id_user}', [BeliProdukController::class, 'keranjangPembelian']);
    Route::post('/keranjang_pembelian/beli_product/{id_beli_produk}', [BeliProdukController::class, 'beliProduct']);
    Route::get('/status_beli_product', [BeliProdukController::class, 'getBeliProductByStatus']);
    Route::delete('/hapus_keranjang/{id_beli_produk}', [BeliProdukController::class, 'destroyEvidentPayment']);
    Route::post("/konfirmasi_pembayaran/{id_beli_produk}", [BeliProdukController::class, 'konfirmasiPembayaran']);


