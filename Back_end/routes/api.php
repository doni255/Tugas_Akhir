    <?php

use App\Http\Controllers\BarangMasukController;
use App\Http\Controllers\ProductController;
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
    Route::get('/barang_masuk', [BarangMasukController::class, 'getBarangMasuk']);
    Route::post('/barang_masuk/create/{id_user}', [BarangMasukController::class, 'create']);
    Route::put('/barang_masuk/update/{id_barang_masuk}', [BarangMasukController::class, 'edit']);
    Route::delete('/barang_masuk/{id_barang_masuk}', [BarangMasukController::class, 'destroy']);