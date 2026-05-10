<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\DashboardController;
use App\Http\Controllers\Api\AnalyticsController;
use Illuminate\Support\Facades\Http;

/*
|--------------------------------------------------------------------------
| Public API Routes
|--------------------------------------------------------------------------
*/
Route::get('/products', [ProductController::class, 'index']);
Route::get('/products/{id}', [ProductController::class, 'show']);
Route::get('/categories', [CategoryController::class, 'index']);

// Diagnostic endpoint - shows current Python API URL config and connection test
Route::get('/_debug/python', function () {
    $url = rtrim(env('PYTHON_API_URL', 'http://localhost:8001'), '/');
    $endpoint = '/api/analysis/customer-interest';
    $result = ['python_api_url' => $url, 'test_url' => $url . $endpoint];
    try {
        $response = Http::timeout(60)->connectTimeout(60)->get($url . $endpoint);
        $result['status'] = $response->status();
        $result['successful'] = $response->successful();
        $result['body_preview'] = substr($response->body(), 0, 300);
    } catch (\Throwable $e) {
        $result['error'] = $e->getMessage();
    }
    return response()->json($result);
});

Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);

/*
|--------------------------------------------------------------------------
| Authenticated API Routes
|--------------------------------------------------------------------------
*/
Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/user', [AuthController::class, 'user']);
    Route::post('/checkout', [OrderController::class, 'checkout']);

    /*
    |--------------------------------------------------------------------------
    | Admin API Routes
    |--------------------------------------------------------------------------
    */
    Route::middleware('admin')->prefix('admin')->group(function () {
        Route::get('/dashboard', [DashboardController::class, 'index']);

        Route::apiResource('categories', CategoryController::class)->except(['index']);
        Route::post('products', [ProductController::class, 'store']);
        Route::put('products/{product}', [ProductController::class, 'update']);
        Route::delete('products/{product}', [ProductController::class, 'destroy']);
        Route::apiResource('users', UserController::class);
        Route::apiResource('orders', OrderController::class);

        Route::prefix('analytics')->group(function () {
            Route::get('/customer-interest', [AnalyticsController::class, 'customerInterest']);
            Route::get('/category-popularity', [AnalyticsController::class, 'categoryPopularity']);
            Route::get('/revenue-by-category', [AnalyticsController::class, 'revenueByCategory']);
            Route::get('/order-trends', [AnalyticsController::class, 'orderTrends']);
            Route::get('/top-customers', [AnalyticsController::class, 'topCustomers']);
        });
    });
});
