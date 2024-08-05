    <?php

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
    // Rute untuk login
    Route::post('/login', [UserController::class, 'login']);
    Route::get('/product', [ProductController::class, 'getProducts']);
    Route::delete('/product/{id}', [ProductController::class, 'destroy']);
