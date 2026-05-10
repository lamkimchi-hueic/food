<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\OrderController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\DashboardController;
use App\Http\Controllers\Api\AnalyticsController;

/*
|--------------------------------------------------------------------------
| Public API Routes
|--------------------------------------------------------------------------
*/
Route::get('/products', [ProductController::class, 'index']);
Route::get('/products/{id}', [ProductController::class, 'show']);
Route::get('/categories', [CategoryController::class, 'index']);

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
        Route::put('products/{product}', [ProductController::class, 'update'])->where('product', '[0-9]+');
        Route::delete('products/{product}', [ProductController::class, 'destroy'])->where('product', '[0-9]+');
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
