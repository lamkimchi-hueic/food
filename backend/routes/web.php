<?php

use Illuminate\Support\Facades\Route;
use App\Models\Product;
use App\Models\Category;
use Illuminate\Http\Request;
use App\Models\Order;
use App\Models\OrderItem;
use App\Models\User;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\CategoryController;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\OrderController;

/*
|--------------------------------------------------------------------------
| Quản lý Danh mục và Sản phẩm (Admin/Resource)
|--------------------------------------------------------------------------
*/
// Các route resource cho Category (index, create, store, show, edit, update, destroy)
Route::resource('categories', CategoryController::class);
// Các route resource cho Product (index, create, store, show, edit, update, destroy)
Route::resource('products', ProductController::class);
// Các route resource cho User (index, create, store, show, edit, update, destroy)
Route::resource('users', UserController::class);
// Các route resource cho Order (index, create, store, show, edit, update, destroy)
Route::resource('orders', OrderController::class);

/*
|--------------------------------------------------------------------------
| Xác thực người dùng (Authentication)
|--------------------------------------------------------------------------
*/
// Hiển thị trang đăng nhập
Route::get('/login', [AuthController::class, 'showLogin'])->name('login');
// Xử lý logic đăng nhập
Route::post('/login', [AuthController::class, 'login']);
// Hiển thị trang đăng ký
Route::get('/register', [AuthController::class, 'showRegister'])->name('register');
// Xử lý logic đăng ký
Route::post('/register', [AuthController::class, 'register']);
// Xử lý đăng xuất
Route::post('/logout', [AuthController::class, 'logout'])->name('logout');

/*
|--------------------------------------------------------------------------
| Các trang chính của Website
|--------------------------------------------------------------------------
*/
// Trang chủ: Hiển thị sản phẩm đang hot và sản phẩm đặc biệt
Route::get('/', function () {
    $trending = Product::with('category')->inRandomOrder()->limit(2)->get();
    $specials = Product::with('category')->inRandomOrder()->limit(4)->get();
    return view('welcome', compact('trending', 'specials'));
});

// Trang thực đơn (Menu): Có chức năng lọc theo danh mục và tìm kiếm theo tên
Route::get('/menu', function (Request $request) {
    $query = Product::with('category');
    if ($request->has('category') && $request->category != '') {
        $query->where('category_id', $request->category);
    }
    if ($request->has('search') && $request->search != '') {
        $query->where('name', 'like', '%' . $request->search . '%');
    }
    $products = $query->paginate(8);
    $categories = Category::all();
    return view('menu', compact('products', 'categories'));
});

// Trang hiển thị tất cả các danh mục
Route::get('/category', function () {
    $categories = Category::all();
    return view('category', compact('categories'));
});

// Trang chi tiết sản phẩm dựa trên ID
Route::get('/product/{id}', function ($id) {
    $product = Product::with('category')->findOrFail($id);
    return view('detail', compact('product'));
});

// Trang bài viết (Blog)
Route::get('/blog', function () {
    return view('blog');
});

// Trang giới thiệu (About Us)
Route::get('/about', function () {
    return view('about');
});

// Trang giỏ hàng (Cart)
Route::get('/cart', function () {
    return view('cart');
});

/*
|--------------------------------------------------------------------------
| Xử lý Đơn hàng (Checkout)
|--------------------------------------------------------------------------
*/
// Xử lý thanh toán: Kiểm tra dữ liệu, tạo đơn hàng và chi tiết đơn hàng
Route::post('/checkout', function (Request $request) {
    $request->validate([
        'receiver' => 'required|string|max:45',
        'phone' => 'nullable|string|max:45',
        'items' => 'required|array',
        'items.*.id' => 'required|exists:products,id',
        'items.*.amount' => 'required|integer|min:1',
    ]);

    // Lấy user đầu tiên làm mặc định nếu không có auth (để test)
    $user = User::first() ?? User::factory()->create();

    $order = Order::create([
        'user_id' => $user->id,
        'name' => 'Order for ' . $request->receiver,
        'status' => 0,
        'receiver' => $request->receiver,
        'desc' => 'Web order'
    ]);

    foreach ($request->items as $item) {
        OrderItem::create([
            'order_id' => $order->id,
            'product_id' => $item['id'],
            'amount' => $item['amount']
        ]);
    }
    return response()->json(['success' => true, 'order_id' => $order->id]);
});

/*
|--------------------------------------------------------------------------
| Trang Quản trị (Admin Dashboard)
|--------------------------------------------------------------------------
*/
Route::get('/admin', function () {
    if (!auth()->check() || auth()->user()->role != 1) {
        return redirect('/')->with('error', 'Unauthorized');
    }
    return view('admin.dashboard', [
        'userCount' => User::count(),
        'productCount' => Product::count(),
        'categoryCount' => Category::count(),
        'orderCount' => Order::count(),
    ]);
})->name('admin');


