# Food Project - Tách Backend & Frontend + Python Analysis API

## Tổng quan

Dự án đã được tách thành 2 phần riêng biệt:
- **Backend**: Laravel API (trả JSON) — `backend/`
- **Frontend**: React SPA (Vite + TailwindCSS + React Router) — `frontend/`
- **Analysis**: Python FastAPI (phân tích dữ liệu) — `ai_analysis/`

---

## Cấu trúc thư mục

```
d:\LARAVEL\trang\food\
├── backend/                    # Laravel API Backend
│   ├── app/                    # Controllers, Models, Middleware
│   │   ├── Http/Controllers/Api/
│   │   │   ├── AuthController.php
│   │   │   ├── ProductController.php
│   │   │   ├── CategoryController.php
│   │   │   ├── OrderController.php
│   │   │   ├── UserController.php
│   │   │   ├── DashboardController.php
│   │   │   └── AnalyticsController.php    # Proxy Python API
│   │   ├── Http/Middleware/
│   │   │   └── AdminMiddleware.php        # Check admin role
│   │   └── Models/
│   │       ├── User.php                    # HasApiTokens trait
│   │       ├── Product.php
│   │       ├── Category.php
│   │       ├── Order.php
│   │       └── OrderItem.php
│   ├── bootstrap/app.php                  # Đăng ký API routes + middleware
│   ├── routes/api.php                      # Tất cả API routes
│   ├── database/
│   │   └── database.sqlite                 # SQLite (hoặc MySQL)
│   ├── artisan
│   ├── composer.json
│   └── .env                               # DB_CONNECTION=mysql, DB_DATABASE=food
│
├── frontend/                   # React Frontend
│   ├── src/
│   │   ├── pages/
│   │   │   ├── Home.jsx                     # Trang chủ
│   │   │   ├── Menu.jsx                     # Menu sản phẩm
│   │   │   ├── Category.jsx                 # Danh sách danh mục
│   │   │   ├── Detail.jsx                   # Chi tiết sản phẩm
│   │   │   ├── Cart.jsx                     # Giỏ hàng + Checkout
│   │   │   ├── Blog.jsx                     # Blog (static)
│   │   │   ├── About.jsx                    # About (static)
│   │   │   ├── Login.jsx                    # Đăng nhập
│   │   │   ├── Register.jsx                 # Đăng ký
│   │   │   └── admin/
│   │   │       ├── Dashboard.jsx             # Admin dashboard
│   │   │       ├── Categories.jsx           # CRUD Categories
│   │   │       ├── Products.jsx             # CRUD Products
│   │   │       ├── Users.jsx                # CRUD Users
│   │   │       ├── Orders.jsx               # CRUD Orders
│   │   │       └── Analytics.jsx            # Biểu đồ phân tích (recharts)
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   └── Toast.jsx
│   │   ├── context/
│   │   │   └── AuthContext.jsx              # Quản lý auth state
│   │   ├── utils/
│   │   │   └── cart.js                      # Cart logic (localStorage)
│   │   ├── api.js                           # Axios instance (proxy /api, /storage)
│   │   ├── App.jsx                          # React Router config
│   │   ├── main.jsx                         # Entry point
│   │   └── index.css                        # TailwindCSS import
│   ├── vite.config.js                       # Proxy /api, /storage → backend
│   ├── package.json
│   └── index.html
│
└── ai_analysis/               # Python Analysis API
    ├── analysis_api.py                      # FastAPI + SQLAlchemy + Pandas
    ├── requirements.txt
    └── test_db.py (đã xóa)
```

---

## API Routes (Backend Laravel)

### Public Routes
- `GET /api/products` — Danh sách sản phẩm (filter, search, pagination)
- `GET /api/products/{id}` — Chi tiết sản phẩm
- `GET /api/categories` — Danh sách danh mục
- `POST /api/login` — Đăng nhập → trả token
- `POST /api/register` — Đăng ký → trả token

### Authenticated Routes (Bearer Token)
- `POST /api/logout` — Đăng xuất
- `GET /api/user` — Thông tin user hiện tại
- `POST /api/checkout` — Đặt hàng

### Admin Routes (role = 1)
- `GET /api/admin/dashboard` — Thống kê (counts)
- `GET /api/admin/categories` — CRUD Categories
- `GET /api/admin/products` — CRUD Products
- `GET /api/admin/users` — CRUD Users
- `GET /api/admin/orders` — CRUD Orders
- `GET /api/admin/analytics/customer-interest` — Proxy Python API
- `GET /api/admin/analytics/category-popularity` — Proxy Python API
- `GET /api/admin/analytics/revenue-by-category` — Proxy Python API
- `GET /api/admin/analytics/order-trends` — Proxy Python API
- `GET /api/admin/analytics/top-customers` — Proxy Python API

---

## Python Analysis API (FastAPI)

**Port**: 8001  
**Database**: MySQL `food` (root:123456@127.0.0.1:3306)

### Endpoints
- `GET /api/analysis/customer-interest` — Sản phẩm được đặt nhiều nhất
- `GET /api/analysis/category-popularity` — Danh mục phổ biến
- `GET /api/analysis/revenue-by-category` — Doanh thu theo danh mục
- `GET /api/analysis/order-trends` — Xu hướng đơn hàng theo thời gian
- `GET /api/analysis/top-customers` — Top khách hàng

---

## Cách chạy dự án

### 1. Python Analysis API
```bash
cd d:\LARAVEL\trang\food\ai_analysis
pip install -r requirements.txt
python analysis_api.py
# → http://0.0.0.0:8001
```

### 2. Laravel Backend
```bash
cd d:\LARAVEL\trang\food\backend
composer install
php artisan key:generate
php artisan migrate
php artisan storage:link    # Tạo symlink cho images
php artisan serve
# → http://127.0.0.1:8000
```

### 3. React Frontend
```bash
cd d:\LARAVEL\trang\food\frontend
npm install
npm run dev
# → http://localhost:5173 (hoặc port khác nếu bị trùng)
```

---

## Tài khoản Admin

- **Username**: `admin`
- **Password**: `admin123`
- **Role**: 1 (admin)

---

## Lưu ý quan trọng

### Database
- Dự án dùng **MySQL** (không phải SQLite mặc định)
- Config trong `.env`: `DB_CONNECTION=mysql`, `DB_DATABASE=food`
- User: `root`, Password: `123456`, Host: `127.0.0.1:3306`

### Images
- Ảnh sản phẩm lưu trong `backend/storage/app/public/products/`
- Symlink: `backend/public/storage` → `backend/storage/app/public`
- Frontend truy cập qua `/storage/products/xxx.jpg` (proxy qua Vite)

### CORS
- Laravel chưa cấu hình CORS (vì dùng proxy Vite)
- Python API đã cấu hình CORS allow-all

### Frontend Proxy
- Vite proxy `/api` → `http://127.0.0.1:8000`
- Vite proxy `/storage` → `http://127.0.0.1:8000`

### Auth
- Laravel Sanctum cho API token authentication
- Frontend lưu token trong `localStorage` (AuthContext)

---

## Dependencies

### Backend (composer.json)
- Laravel Framework
- Laravel Sanctum (API token auth)
- MySQL driver (php_mysql)

### Frontend (package.json)
- React 19
- React Router DOM 7
- Axios (HTTP client)
- TailwindCSS v4
- Recharts (biểu đồ)
- Vite

### Python (requirements.txt)
- FastAPI 0.115.0
- Uvicorn 0.34.0
- Pandas 2.2.3
- SQLAlchemy 2.0.36
- PyMySQL 1.1.1

---

## Các bước đã thực hiện

1. ✅ Tách cấu trúc thư mục (backend/, frontend/)
2. ✅ Tạo API routes Laravel (`routes/api.php`)
3. ✅ Tạo API Controllers (`app/Http/Controllers/Api/`)
4. ✅ Tạo AdminMiddleware
5. ✅ Thêm HasApiTokens vào User model
6. ✅ Cấu hình bootstrap/app.php
7. ✅ Tạo React project structure
8. ✅ Tạo các trang public (Home, Menu, Category, Detail, Cart, Blog, About)
9. ✅ Tạo trang auth (Login, Register)
10. ✅ Tạo trang admin (Dashboard, CRUD)
11. ✅ Tạo Python Analysis API
12. ✅ Tạo Laravel AnalyticsController (proxy Python)
13. ✅ Tạo React Analytics page với recharts
14. ✅ Cài Laravel Sanctum
15. ✅ Tạo symlink storage
16. ✅ Thay ảnh Unsplash bằng ảnh backend storage
17. ✅ Tạo tài khoản admin

---

## Troubleshooting

### Port bị chiếm
- Python: Kill process `python`
- Laravel: Kill process `php`
- Frontend: Kill process `node`

### Ảnh không hiện
- Chạy `php artisan storage:link` trong backend/
- Kiểm tra backend server đang chạy (port 8000)

### Python API không kết nối DB
- Kiểm tra MySQL service đang chạy
- Xác nhận credentials trong `ai_analysis/analysis_api.py`

### Frontend không gọi được API
- Kiểm tra Vite proxy trong `vite.config.js`
- Đảm bảo backend server đang chạy

---

## URL truy cập

- Frontend: `http://localhost:5173` (hoặc port khác)
- Backend API: `http://127.0.0.1:8000/api/...`
- Python API: `http://localhost:8001/api/analysis/...`
- Admin Dashboard: `http://localhost:5173/admin`
- Analytics: `http://localhost:5173/admin/analytics`
