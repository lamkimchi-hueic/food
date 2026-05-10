from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
from sqlalchemy import create_engine
import uvicorn
import os

app = FastAPI(title="Food Analysis API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Kết nối database (dùng chung DB với Laravel backend)
# Hỗ trợ cả MySQL (local dev) và PostgreSQL (Neon production)
DATABASE_URL = os.environ.get(
    "DATABASE_URL",
    "mysql+pymysql://root:123456@127.0.0.1:3306/food"
)

# Normalize DATABASE_URL for SQLAlchemy:
# - postgres://... -> postgresql+psycopg2://...
# - postgresql://... -> postgresql+psycopg2://...
if DATABASE_URL.startswith("postgres://"):
    DATABASE_URL = DATABASE_URL.replace("postgres://", "postgresql+psycopg2://", 1)
elif DATABASE_URL.startswith("postgresql://") and "+psycopg2" not in DATABASE_URL:
    DATABASE_URL = DATABASE_URL.replace("postgresql://", "postgresql+psycopg2://", 1)

IS_POSTGRES = DATABASE_URL.startswith("postgresql")

engine = create_engine(DATABASE_URL, echo=False, pool_pre_ping=True)


@app.get("/")
def health():
    return {"status": "ok", "service": "Food Analysis API", "db": "postgres" if IS_POSTGRES else "mysql"}


@app.get("/health")
def health2():
    try:
        with engine.connect() as conn:
            conn.exec_driver_sql("SELECT 1")
        return {"status": "ok", "db": "connected"}
    except Exception as e:
        return {"status": "error", "message": str(e)}


@app.get("/api/analysis/customer-interest")
def get_customer_interest():
    """Phân tích sản phẩm được đặt nhiều nhất (theo số lượt đặt và tổng số lượng)"""
    query = """
        SELECT
            p.id as product_id,
            p.name as product_name,
            c.name as category_name,
            p.price,
            COUNT(oi.id) as total_orders,
            COALESCE(SUM(oi.amount), 0) as total_quantity
        FROM products p
        LEFT JOIN categories c ON p.category_id = c.id
        LEFT JOIN order_items oi ON p.id = oi.product_id
        GROUP BY p.id, p.name, c.name, p.price
        ORDER BY total_quantity DESC
    """
    df = pd.read_sql(query, engine)

    total_qty = df["total_quantity"].sum()
    if total_qty > 0:
        df["percentage"] = (df["total_quantity"] / total_qty * 100).round(2)
    else:
        df["percentage"] = 0.0

    df["revenue"] = (df["price"] * df["total_quantity"]).round(2)

    return df.to_dict(orient="records")


@app.get("/api/analysis/category-popularity")
def get_category_popularity():
    """Phân tích danh mục phổ biến nhất"""
    query = """
        SELECT
            c.id as category_id,
            c.name as category_name,
            COUNT(DISTINCT p.id) as product_count,
            COALESCE(SUM(oi.amount), 0) as total_sold
        FROM categories c
        LEFT JOIN products p ON c.id = p.category_id
        LEFT JOIN order_items oi ON p.id = oi.product_id
        GROUP BY c.id, c.name
        ORDER BY total_sold DESC
    """
    df = pd.read_sql(query, engine)

    total_sold = df["total_sold"].sum()
    if total_sold > 0:
        df["percentage"] = (df["total_sold"] / total_sold * 100).round(2)
    else:
        df["percentage"] = 0.0

    return df.to_dict(orient="records")


@app.get("/api/analysis/revenue-by-category")
def get_revenue_by_category():
    """Phân tích doanh thu theo danh mục"""
    query = """
        SELECT
            c.name as category_name,
            COALESCE(SUM(oi.amount * p.price), 0) as total_revenue,
            COALESCE(SUM(oi.amount), 0) as total_items
        FROM categories c
        LEFT JOIN products p ON c.id = p.category_id
        LEFT JOIN order_items oi ON p.id = oi.product_id
        GROUP BY c.id, c.name
        ORDER BY total_revenue DESC
    """
    df = pd.read_sql(query, engine)
    df["total_revenue"] = df["total_revenue"].round(2)
    return df.to_dict(orient="records")


@app.get("/api/analysis/order-trends")
def get_order_trends():
    """Phân tích xu hướng đơn hàng theo thời gian"""
    query = """
        SELECT
            DATE(o.created_at) as order_date,
            COUNT(o.id) as order_count,
            COALESCE(SUM(oi.amount), 0) as total_items
        FROM orders o
        LEFT JOIN order_items oi ON o.id = oi.order_id
        GROUP BY DATE(o.created_at)
        ORDER BY order_date ASC
    """
    df = pd.read_sql(query, engine)
    return df.to_dict(orient="records")


@app.get("/api/analysis/top-customers")
def get_top_customers():
    """Phân tích khách hàng đặt hàng nhiều nhất"""
    if IS_POSTGRES:
        last_order_expr = "to_char(MAX(o.created_at), 'YYYY-MM-DD HH24:MI:SS')"
    else:
        last_order_expr = "DATE_FORMAT(MAX(o.created_at), '%%Y-%%m-%%d %%H:%%i:%%s')"

    query = f"""
        SELECT
            u.id as user_id,
            u.name as customer_name,
            u.username,
            COUNT(DISTINCT o.id) as total_orders,
            COALESCE(SUM(oi.amount), 0) as total_items,
            COALESCE(SUM(oi.amount * p.price), 0) as total_revenue,
            {last_order_expr} as last_order_at
        FROM users u
        LEFT JOIN orders o ON u.id = o.user_id
        LEFT JOIN order_items oi ON o.id = oi.order_id
        LEFT JOIN products p ON oi.product_id = p.id
        GROUP BY u.id, u.name, u.username
        ORDER BY total_revenue DESC
    """
    df = pd.read_sql(query, engine)
    df["total_items"] = df["total_items"].fillna(0).astype(int)
    df["total_revenue"] = df["total_revenue"].fillna(0).astype(float)
    df["avg_order_value"] = (df["total_revenue"] / df["total_orders"].replace(0, 1)).fillna(0).round(2)
    return df.to_dict(orient="records")


if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8001))
    uvicorn.run(app, host="0.0.0.0", port=port)
